import { useEffect, useRef, useState, type FormEvent } from "react";
import { ArrowRight } from "lucide-react";
import { money, type SessionOption } from "@/lib/booking";

const CONTACT = "mailto:contact@dfwsportsphotography.com?subject=Booking%20Inquiry";

const SPORTS = [
  "Baseball",
  "Softball",
  "Basketball",
  "Football",
  "Soccer",
  "Volleyball",
  "Lacrosse",
  "Dance / Cheer",
  "Other",
];

const ERRORS: Record<string, string> = {
  session_unavailable: "That package isn't open for online booking right now. Email us and we'll take care of it.",
  invalid_input: "Please check your details and try again.",
  address_required: "Please fill in your full address, or leave the address blank.",
  generic: "We couldn't send that just now. Please try again, or email us and we'll help.",
};

const fieldClass =
  "w-full border border-ink/20 bg-white px-4 py-3 text-base text-ink placeholder:text-ink/35 transition-colors focus:border-accent focus:outline-none";
const labelClass = "mb-2 block font-display text-xs uppercase tracking-[0.2em] text-ink/70";

/** What a package costs, in the words the pricing section uses. */
function priceLine(s: SessionOption): string {
  if (s.price_cents == null) return "Quoted for your team";
  const deposit = s.deposit_cents ? ` · ${money(s.deposit_cents)} deposit reserves your date` : "";
  return `Starting at ${money(s.price_cents)}${deposit}`;
}

export function BookForm({ sessions, initialPackage }: { sessions: SessionOption[]; initialPackage?: string }) {
  const [sessionId, setSessionId] = useState(
    sessions.find((s) => s.slug === initialPackage || s.id === initialPackage)?.id ?? "",
  );
  const session = sessions.find((s) => s.id === sessionId);
  const [sport, setSport] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "done">("idle");
  const [error, setError] = useState<string | null>(null);
  const [doneLink, setDoneLink] = useState<string | null>(null);
  const [emailed, setEmailed] = useState(false);
  // Set once, in the browser: how long the form has been open.
  const openedAt = useRef(0);
  useEffect(() => {
    openedAt.current = Date.now();
  }, []);

  if (sessions.length === 0) {
    return (
      <div className="border border-ink/10 bg-muted px-8 py-12 text-center">
        <p className="font-display text-2xl">Online booking isn&rsquo;t open yet</p>
        <p className="mt-3 text-muted-foreground">We&rsquo;d still love to shoot your season. Send us a note and we&rsquo;ll take it from there.</p>
        <a
          href={CONTACT}
          className="mt-8 inline-flex items-center gap-2 bg-accent px-6 py-3 font-display text-sm tracking-widest text-accent-foreground transition-colors hover:bg-ink hover:text-white"
        >
          EMAIL US <ArrowRight size={16} />
        </a>
      </div>
    );
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!session) return;
    setStatus("sending");
    setError(null);
    const data = Object.fromEntries(new FormData(event.currentTarget));
    try {
      const res = await fetch("/api/book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, session_type_id: session.id, t: openedAt.current }),
      });
      const body = await res.json().catch(() => ({}));
      if (!res.ok) {
        setStatus("idle");
        setError(ERRORS[body.error as string] ?? ERRORS.generic);
        return;
      }
      // With a deposit due, carry on to the page that takes it.
      if (body.deposit_due && body.manage_url) {
        window.location.assign(body.manage_url);
        return;
      }
      setDoneLink(body.manage_url ?? null);
      setEmailed(body.emailed === true);
      setStatus("done");
    } catch {
      setStatus("idle");
      setError(ERRORS.generic);
    }
  }

  if (status === "done") {
    return (
      <div role="status" className="border-l-2 border-accent bg-muted px-8 py-12">
        <p className="font-display text-3xl tracking-wide">Request received</p>
        <p className="mt-3 text-muted-foreground">
          Thanks! We&rsquo;ll confirm your game dates shortly, usually the same day.
          {emailed && " We've also emailed you a private link to your booking."}
        </p>
        {doneLink && (
          <a
            href={doneLink}
            className="mt-8 inline-flex items-center gap-2 bg-ink px-6 py-3 font-display text-sm tracking-widest text-accent transition-colors hover:bg-accent hover:text-accent-foreground"
          >
            VIEW YOUR BOOKING <ArrowRight size={16} />
          </a>
        )}
      </div>
    );
  }

  const spotlight = session?.slug === "athlete-spotlight";

  return (
    <form onSubmit={onSubmit} className="grid gap-12">
      <div aria-hidden className="absolute left-[-9999px]">
        <label htmlFor="company">Company</label>
        <input id="company" name="company" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <fieldset>
        <legend className="mb-5 font-display text-sm tracking-[0.3em] text-accent">1. CHOOSE YOUR PACKAGE</legend>
        <div className="grid gap-3">
          {sessions.map((s) => (
            <label
              key={s.id}
              className={`block cursor-pointer border px-6 py-5 transition-colors ${
                sessionId === s.id ? "border-accent bg-ink text-white" : "border-ink/15 bg-white hover:border-accent"
              }`}
            >
              <input
                type="radio"
                name="package"
                value={s.id}
                checked={sessionId === s.id}
                onChange={() => setSessionId(s.id)}
                className="sr-only"
              />
              <span className="block font-display text-xl tracking-wide">{s.name}</span>
              {s.description && (
                <span className={`mt-1 block text-sm ${sessionId === s.id ? "text-white/75" : "text-muted-foreground"}`}>
                  {s.description}
                </span>
              )}
              <span className={`mt-3 block font-display text-sm tracking-wider ${sessionId === s.id ? "text-accent" : "text-ink"}`}>
                {priceLine(s)}
              </span>
            </label>
          ))}
        </div>
      </fieldset>

      {session && (
        <>
          <fieldset className="grid gap-6">
            <legend className="mb-5 font-display text-sm tracking-[0.3em] text-accent">2. THE GAME</legend>
            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <label htmlFor="sport" className={labelClass}>
                  Sport <span className="text-accent">*</span>
                </label>
                <select
                  id="sport"
                  name="sport"
                  required
                  value={sport}
                  onChange={(e) => setSport(e.target.value)}
                  className={fieldClass}
                >
                  <option value="" disabled>
                    Choose…
                  </option>
                  {SPORTS.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="team" className={labelClass}>
                  Team, league or school
                </label>
                <input id="team" name="team" maxLength={200} className={fieldClass} />
              </div>
              {spotlight ? (
                <div className="sm:col-span-2">
                  <label htmlFor="athlete" className={labelClass}>
                    Athlete&rsquo;s name (and jersey number)
                  </label>
                  <input id="athlete" name="athlete" maxLength={200} className={fieldClass} />
                </div>
              ) : (
                <div>
                  <label htmlFor="players" className={labelClass}>
                    About how many players?
                  </label>
                  <input id="players" name="players" inputMode="numeric" maxLength={40} className={fieldClass} />
                </div>
              )}
              <div className="sm:col-span-2">
                <label htmlFor="game" className={labelClass}>
                  Game date(s) and time(s)
                </label>
                <textarea
                  id="game"
                  name="game"
                  rows={2}
                  maxLength={500}
                  placeholder="Saturday, Oct 24 at 10:00 AM. Or paste your schedule."
                  className={`${fieldClass} resize-y`}
                />
                <p className="mt-1.5 text-xs text-muted-foreground">Not sure yet? Leave it blank and we&rsquo;ll work it out with you.</p>
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="venue" className={labelClass}>
                  Field or venue, and city
                </label>
                <input id="venue" name="venue" maxLength={300} className={fieldClass} />
              </div>
            </div>
          </fieldset>

          <fieldset className="grid gap-6">
            <legend className="mb-5 font-display text-sm tracking-[0.3em] text-accent">3. ABOUT YOU</legend>
            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <label htmlFor="name" className={labelClass}>
                  Your name <span className="text-accent">*</span>
                </label>
                <input id="name" name="name" required autoComplete="name" className={fieldClass} />
              </div>
              <div>
                <label htmlFor="email" className={labelClass}>
                  Email <span className="text-accent">*</span>
                </label>
                <input id="email" name="email" type="email" required autoComplete="email" className={fieldClass} />
              </div>
              <div>
                <label htmlFor="phone" className={labelClass}>
                  Phone <span className="text-accent">*</span>
                </label>
                <input id="phone" name="phone" type="tel" required autoComplete="tel" className={fieldClass} />
              </div>
              <div>
                <label htmlFor="referral" className={labelClass}>
                  How did you hear about us?
                </label>
                <input id="referral" name="referral" className={fieldClass} />
              </div>
            </div>

            <details className="group">
              <summary className="cursor-pointer font-display text-xs uppercase tracking-[0.2em] text-ink/70 hover:text-ink">
                Add your address <span className="normal-case tracking-normal text-muted-foreground">(optional, keeps your details on file)</span>
              </summary>
              <div className="mt-5 grid gap-6 sm:grid-cols-6">
                <div className="sm:col-span-4">
                  <label htmlFor="address_line1" className={labelClass}>
                    Street address
                  </label>
                  <input id="address_line1" name="address_line1" autoComplete="address-line1" maxLength={200} className={fieldClass} />
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="address_line2" className={labelClass}>
                    Apt, suite or unit
                  </label>
                  <input id="address_line2" name="address_line2" autoComplete="address-line2" maxLength={200} className={fieldClass} />
                </div>
                <div className="sm:col-span-3">
                  <label htmlFor="city" className={labelClass}>
                    City
                  </label>
                  <input id="city" name="city" autoComplete="address-level2" maxLength={100} className={fieldClass} />
                </div>
                <div className="sm:col-span-1">
                  <label htmlFor="state" className={labelClass}>
                    State
                  </label>
                  <input id="state" name="state" autoComplete="address-level1" maxLength={40} defaultValue="TX" className={fieldClass} />
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="postal_code" className={labelClass}>
                    ZIP code
                  </label>
                  <input id="postal_code" name="postal_code" autoComplete="postal-code" inputMode="numeric" maxLength={20} className={fieldClass} />
                </div>
              </div>
            </details>

            <div>
              <label htmlFor="message" className={labelClass}>
                Anything else we should know?
              </label>
              <textarea id="message" name="message" rows={4} maxLength={5000} className={`${fieldClass} resize-y`} />
            </div>

            {(session.deposit_cents ?? 0) > 0 && (
              <p className="text-sm text-muted-foreground">
                A 50% deposit of {money(session.deposit_cents!)} reserves your date. You&rsquo;ll pay it securely on the next page.
              </p>
            )}

            {error && (
              <p role="alert" className="text-sm text-destructive">
                {error}
              </p>
            )}

            <div>
              <button
                type="submit"
                disabled={status === "sending"}
                className="inline-flex items-center gap-3 bg-accent px-10 py-4 font-display tracking-widest text-accent-foreground transition-colors hover:bg-ink hover:text-white disabled:cursor-not-allowed disabled:opacity-60"
              >
                {status === "sending" ? "SENDING…" : "REQUEST THIS PACKAGE"}
                {status !== "sending" && <ArrowRight size={18} />}
              </button>
            </div>
          </fieldset>
        </>
      )}
    </form>
  );
}
