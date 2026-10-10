// The shared booking backend, as the browser sees it. The database functions
// and Stripe edge functions live in the Studio Portal repo (supabase/); this
// site only calls them. All of it is public by design: the anon key can run
// the booking functions and nothing else, and a booking's private link token is
// its credential.

const SUPABASE_URL = (import.meta.env.VITE_SUPABASE_URL as string | undefined)?.replace(/\/$/, "");
const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

export const bookingConfigured = Boolean(SUPABASE_URL && SUPABASE_KEY);

/** Which brand this site books for (brands.slug in the shared database). */
export const BOOKING_BRAND = "dfw-sports";

export type BookingStatus =
  | "pending"
  | "confirmed"
  | "declined"
  | "cancelled"
  | "completed"
  | "no_show"
  | "expired";

export type Booking = {
  booking_id: string;
  status: BookingStatus;
  brand_slug: string;
  session_name: string;
  starts_at: string | null;
  ends_at: string | null;
  photographer_name: string | null;
  location: string;
  deposit_cents: number;
  deposit_paid_cents: number;
  hold_expires_at: string | null;
  /** Balance already paid, before tax. */
  balance_paid_cents: number;
  /** An unpaid balance invoice's total, tax included; 0 when there is none. */
  balance_invoice_cents: number;
  /** Stripe's hosted page for that invoice. */
  balance_invoice_url: string | null;
};

export type CheckoutError = "payment_in_progress" | "nothing_due" | "not_payable" | "not_found" | "unavailable";

export const isToken = (token: string) => /^[0-9a-f]{64}$/.test(token);

export function apiHeaders(): HeadersInit {
  const h: Record<string, string> = { "Content-Type": "application/json", apikey: SUPABASE_KEY! };
  // Legacy anon keys are JWTs and go in Authorization too; the newer
  // publishable keys are not and must not.
  if (SUPABASE_KEY!.startsWith("eyJ")) h.Authorization = `Bearer ${SUPABASE_KEY}`;
  return h;
}

/** null when no booking has this token. Throws if the backend can't be reached. */
export async function getBooking(token: string): Promise<Booking | null> {
  if (!bookingConfigured) throw new Error("Booking backend not configured");
  if (!isToken(token)) return null;
  const res = await fetch(`${SUPABASE_URL}/rest/v1/rpc/get_booking_by_token`, {
    method: "POST",
    headers: apiHeaders(),
    body: JSON.stringify({ p_token: token }),
    cache: "no-store",
  });
  if (!res.ok) throw new Error(`Booking lookup failed: ${res.status}`);
  const rows: Booking[] = await res.json();
  return rows[0] ?? null;
}

/** Stripe's Checkout URL to send the visitor to, or why there isn't one. */
export async function startDepositCheckout(
  token: string,
  returnUrl: string,
): Promise<{ url: string } | { error: CheckoutError }> {
  try {
    const res = await fetch(`${SUPABASE_URL}/functions/v1/deposit-checkout`, {
      method: "POST",
      headers: apiHeaders(),
      body: JSON.stringify({ token, return_url: returnUrl }),
    });
    const body = await res.json().catch(() => ({}));
    if (res.ok && typeof body.url === "string") return { url: body.url };
    const known: CheckoutError[] = ["payment_in_progress", "nothing_due", "not_payable", "not_found"];
    return { error: known.includes(body.error) ? body.error : "unavailable" };
  } catch {
    return { error: "unavailable" };
  }
}

export const depositDue = (b: Booking) => Math.max(b.deposit_cents - b.deposit_paid_cents, 0);

export const canPay = (b: Booking) =>
  (b.status === "pending" || b.status === "confirmed") &&
  (!b.starts_at || new Date(b.starts_at) > new Date()) &&
  depositDue(b) > 0;

/** "$250" for whole dollars (as the pricing section writes them), "$250.50" otherwise. */
export const money = (cents: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: cents % 100 === 0 ? 0 : 2,
  }).format(cents / 100);

/** Local DFW time, however the visitor's device clock is set. */
export const when = (iso: string) =>
  new Intl.DateTimeFormat("en-US", {
    timeZone: "America/Chicago",
    weekday: "long",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(new Date(iso));

// ------------------------------------------------------------ online booking

/** A package a visitor may book online. */
export type SessionOption = {
  id: string;
  slug: string;
  name: string;
  description: string;
  price_cents: number | null;
  deposit_cents: number | null;
};

/** Packages open for online booking, in the studio's order. Empty when none are, or the backend is down. */
export async function listSessionOptions(): Promise<SessionOption[]> {
  if (!bookingConfigured) return [];
  try {
    const res = await fetch(
      `${SUPABASE_URL}/rest/v1/session_types` +
        `?select=id,slug,name,description,price_cents,deposit_cents,brands!inner(slug)` +
        `&brands.slug=eq.${BOOKING_BRAND}&active=eq.true&bookable_online=eq.true&order=sort_order`,
      { headers: apiHeaders() },
    );
    if (!res.ok) return [];
    const rows: (SessionOption & { brands?: unknown })[] = await res.json();
    return rows.map((row) => {
      const option = { ...row };
      delete option.brands;
      return option;
    });
  } catch {
    return [];
  }
}
