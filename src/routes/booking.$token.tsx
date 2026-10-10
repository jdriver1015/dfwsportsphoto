import { createFileRoute } from "@tanstack/react-router";
import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowRight, Lock } from "lucide-react";
import {
  type Booking,
  type BookingStatus,
  type CheckoutError,
  bookingConfigured,
  canPay,
  depositDue,
  getBooking,
  money,
  startDepositCheckout,
  when,
} from "@/lib/booking";

// The token in this URL is the client's key to their booking: keep the page
// out of search and the sitemap, and don't hand the URL to other sites
// (Stripe, Google Fonts) in the Referer header.
export const Route = createFileRoute("/booking/$token")({
  staticData: { sitemap: false },
  head: () => ({
    meta: [
      { title: "Your Booking | DFW Sports Photography" },
      { name: "robots", content: "noindex, nofollow" },
      { name: "referrer", content: "no-referrer" },
    ],
  }),
  component: BookingPage,
});

const STATUS: Record<BookingStatus, { label: string; note: string }> = {
  pending: { label: "Request received", note: "We've got your request and will confirm the details with you shortly." },
  confirmed: { label: "Confirmed", note: "You're on the schedule. See you on game day!" },
  declined: { label: "Not available", note: "Sorry — we couldn't take this one. We'll be in touch about other options." },
  cancelled: { label: "Cancelled", note: "This booking was cancelled. We'd love to catch the next game." },
  completed: { label: "Completed", note: "Thanks for letting us shoot your season!" },
  no_show: { label: "Missed", note: "We missed you at this session. Reach out and we'll find another date." },
  expired: {
    label: "Time released",
    note: "This time was released because the deposit wasn't paid in time. Reach out and we'll find you another slot.",
  },
};

const ERRORS: Record<CheckoutError | "missing", string> = {
  missing: "We couldn't find that booking. The link may be incomplete — copy it again from your email, or reach out.",
  unavailable: "Online payments aren't available right now. Email us and we'll take care of it.",
  payment_in_progress: "Your payment is already being processed — it'll show here shortly.",
  nothing_due: "There's nothing left to pay on this booking.",
  not_payable: "This booking can't take a payment.",
  not_found: "We couldn't find that booking.",
};

const CONTACT = "mailto:contact@dfwsportsphotography.com?subject=My%20booking";

type Load =
  | { state: "loading" }
  | { state: "missing" }
  | { state: "unavailable" }
  | { state: "ready"; booking: Booking };

// After Stripe sends the client back, the webhook may land a few seconds
// later. Re-read until the payment shows, for up to this long.
const CONFIRM_POLL_MS = 2000;
const CONFIRM_POLL_TRIES = 15;

function BookingPage() {
  const { token } = Route.useParams();
  // bookingConfigured is fixed at build time, so server and browser agree.
  const [load, setLoad] = useState<Load>({ state: bookingConfigured ? "loading" : "unavailable" });
  const [returned, setReturned] = useState<"paid" | "cancelled" | null>(null);
  const [paying, setPaying] = useState(false);
  const [payError, setPayError] = useState<CheckoutError | null>(null);

  const fetchLoad = useCallback(async (): Promise<Load> => {
    try {
      const booking = await getBooking(token);
      return booking ? { state: "ready", booking } : { state: "missing" };
    } catch {
      return { state: "unavailable" };
    }
  }, [token]);

  const refresh = useCallback(async () => {
    const next = await fetchLoad();
    setLoad(next);
    return next.state === "ready" ? next.booking : null;
  }, [fetchLoad]);

  // ?deposit= is read once and then dropped from the address bar, so a reload
  // doesn't repeat the message. A ref, because the effect below can run more
  // than once (React's dev mode does it deliberately) and the second run must
  // still know what the first one read.
  const depositParam = useRef<string | null | undefined>(undefined);

  // First load.
  useEffect(() => {
    if (!bookingConfigured) return;
    if (depositParam.current === undefined) {
      const url = new URL(window.location.href);
      depositParam.current = url.searchParams.get("deposit");
      if (depositParam.current) {
        url.searchParams.delete("deposit");
        window.history.replaceState(null, "", url.pathname + url.search);
      }
    }
    const deposit = depositParam.current;
    let gone = false;
    (async () => {
      const next = await fetchLoad();
      if (gone) return;
      setLoad(next);
      if (deposit === "paid" || deposit === "cancelled") setReturned(deposit);
    })();
    return () => {
      gone = true;
    };
  }, [fetchLoad]);

  useEffect(() => {
    if (returned !== "paid" || load.state !== "ready" || depositDue(load.booking) === 0) return;
    let tries = 0;
    const timer = setInterval(async () => {
      const booking = await refresh();
      if (++tries >= CONFIRM_POLL_TRIES || (booking && depositDue(booking) === 0)) clearInterval(timer);
    }, CONFIRM_POLL_MS);
    return () => clearInterval(timer);
    // Start once per return, not on every refresh.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [returned, load.state]);

  async function pay() {
    setPaying(true);
    setPayError(null);
    const result = await startDepositCheckout(token, window.location.origin + window.location.pathname);
    if ("url" in result) {
      window.location.assign(result.url);
      return;
    }
    setPaying(false);
    setPayError(result.error);
    if (result.error === "nothing_due" || result.error === "not_payable") refresh();
  }

  return (
    <div className="bg-background">
      <section className="bg-ink text-white">
        <div className="mx-auto max-w-3xl px-6 py-16 md:py-20">
          <p className="font-display text-xs tracking-[0.3em] text-accent">YOUR BOOKING</p>
          <h1 className="display-italic mt-4 text-4xl md:text-6xl">
            {load.state === "ready" ? load.booking.session_name.toUpperCase() : "GAME DAY, BOOKED"}
          </h1>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-6 py-14 md:py-20">
        {load.state === "loading" && (
          <p role="status" className="text-muted-foreground">
            Finding your booking…
          </p>
        )}

        {(load.state === "missing" || load.state === "unavailable") && (
          <div>
            <p className="text-lg text-muted-foreground">{ERRORS[load.state]}</p>
            <a
              href={CONTACT}
              className="mt-8 inline-flex items-center gap-2 bg-accent px-6 py-3 font-display text-sm tracking-widest text-accent-foreground transition-colors hover:bg-ink hover:text-white"
            >
              EMAIL US <ArrowRight size={16} />
            </a>
          </div>
        )}

        {load.state === "ready" && (
          <Details booking={load.booking} returned={returned} paying={paying} payError={payError} onPay={pay} />
        )}
      </section>
    </div>
  );
}

function Details({
  booking,
  returned,
  paying,
  payError,
  onPay,
}: {
  booking: Booking;
  returned: "paid" | "cancelled" | null;
  paying: boolean;
  payError: CheckoutError | null;
  onPay: () => void;
}) {
  const due = depositDue(booking);
  const payable = canPay(booking);
  const rows: [string, string][] = [
    ["Package", booking.session_name],
    ["When", booking.starts_at ? when(booking.starts_at) : "We'll confirm the game date and time with you"],
    ...(booking.photographer_name ? [["Photographer", booking.photographer_name] as [string, string]] : []),
    ...(booking.location ? [["Where", booking.location] as [string, string]] : []),
    ["Status", STATUS[booking.status].label],
  ];
  // "Due" only while it can actually be paid; a released or cancelled
  // booking shows what was paid, if anything.
  if (payable) rows.push(["Deposit due", money(due)]);
  else if (booking.deposit_paid_cents > 0) rows.push(["Deposit paid", money(booking.deposit_paid_cents)]);
  // The balance, once the studio has invoiced it (after the game).
  const invoiceUrl = booking.balance_invoice_url?.startsWith("https://") ? booking.balance_invoice_url : null;
  if (invoiceUrl) rows.push(["Balance due", money(booking.balance_invoice_cents)]);
  else if (booking.balance_paid_cents > 0) rows.push(["Balance paid", money(booking.balance_paid_cents)]);
  const active = booking.status === "pending" || booking.status === "confirmed";

  return (
    <div>
      <p className="text-lg text-muted-foreground">{STATUS[booking.status].note}</p>

      {returned === "paid" && (
        <div role="status" className="mt-8 border-l-2 border-accent bg-muted px-5 py-4">
          <p className="font-display tracking-wide">Payment received — thank you!</p>
          {due > 0 && <p className="mt-1 text-sm text-muted-foreground">It can take a moment to show here.</p>}
        </div>
      )}
      {returned === "cancelled" && payable && (
        <p role="status" className="mt-8 text-muted-foreground">
          Payment wasn't completed. You can try again whenever you're ready.
        </p>
      )}

      <dl className="mt-10 divide-y divide-ink/10 border-y border-ink/10">
        {rows.map(([label, value]) => (
          <div key={label} className="grid gap-1 py-4 sm:grid-cols-[10rem_1fr] sm:gap-6">
            <dt className="font-display text-xs tracking-[0.25em] text-accent">{label.toUpperCase()}</dt>
            <dd className="text-ink">{value}</dd>
          </div>
        ))}
      </dl>

      {invoiceUrl && (
        <div className="mt-10">
          <a
            href={invoiceUrl}
            className="inline-flex items-center gap-3 bg-accent px-8 py-4 font-display tracking-widest text-accent-foreground transition-colors hover:bg-ink hover:text-white"
          >
            PAY {money(booking.balance_invoice_cents)} BALANCE <ArrowRight size={18} />
          </a>
          <p className="mt-4 text-sm text-muted-foreground">Includes sales tax where it applies.</p>
        </div>
      )}

      {payable && (
        <div className="mt-10">
          {booking.hold_expires_at && (
            <p className="mb-6 text-muted-foreground">
              Pay by <span className="text-ink">{when(booking.hold_expires_at)}</span> to keep this time.
            </p>
          )}
          <button
            type="button"
            onClick={onPay}
            disabled={paying}
            className="inline-flex items-center gap-3 bg-accent px-8 py-4 font-display tracking-widest text-accent-foreground transition-colors hover:bg-ink hover:text-white disabled:cursor-not-allowed disabled:opacity-60"
          >
            {paying ? "OPENING SECURE CHECKOUT…" : `PAY ${money(due)} DEPOSIT`}
            {!paying && <ArrowRight size={18} />}
          </button>
          <p className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
            <Lock size={14} /> Payments are handled securely by Stripe.
          </p>
        </div>
      )}

      {payError && (
        <p role="alert" className="mt-6 text-sm text-destructive">
          {ERRORS[payError]}
        </p>
      )}

      {active && (
        <p className="mt-12 text-sm text-muted-foreground">
          Need to change a date, or cancel?{" "}
          <a href={CONTACT} className="underline underline-offset-4 hover:text-ink">
            Email us
          </a>{" "}
          and we&rsquo;ll take care of it. Rain delays reschedule at no cost.
        </p>
      )}
    </div>
  );
}
