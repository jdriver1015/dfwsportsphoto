// The shared booking backend, as the browser sees it: one database function
// to read a booking by its manage token, and one edge function that opens a
// Stripe Checkout page for its deposit. Both are public; the token is the
// credential. The backend lives in the Ellie Mae repo under supabase/.

const SUPABASE_URL = (import.meta.env.VITE_SUPABASE_URL as string | undefined)?.replace(/\/$/, "");
const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

export const bookingConfigured = Boolean(SUPABASE_URL && SUPABASE_KEY);

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
};

export type CheckoutError = "payment_in_progress" | "nothing_due" | "not_payable" | "not_found" | "unavailable";

export const isToken = (token: string) => /^[0-9a-f]{64}$/.test(token);

function headers(): HeadersInit {
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
    headers: headers(),
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
      headers: headers(),
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

export const money = (cents: number) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(cents / 100);

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
