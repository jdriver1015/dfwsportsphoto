// Transactional email, kept behind one small interface. Server-only: it reads
// secrets from the environment, so import it only from server routes.
//
// It talks to Resend over plain fetch (no SDK). Settings, in Vercel -> Settings
// -> Environment Variables (and .env.local for development):
//
//   RESEND_API_KEY  API key from resend.com
//   CONTACT_TO      where booking requests land. One address, or several
//                   separated by commas.
//   CONTACT_FROM    a sender on a domain VERIFIED IN RESEND, e.g.
//                   "DFW Sports Photography <bookings@send.dfwsportsphotography.com>".
//                   Use a subdomain so the root domain's own mail setup is untouched.
//   PORTAL_URL      the EMC Portal's address, so the studio's notification email
//                   can link straight to the booking. Optional.

const ENDPOINT = "https://api.resend.com/emails";

/** "a@x.com, b@x.com" -> ["a@x.com", "b@x.com"]. Blank entries are dropped. */
export function addresses(value: string | undefined): string[] {
  return (value ?? "")
    .split(/[,;]/)
    .map((a) => a.trim())
    .filter(Boolean);
}

export function mailConfigured() {
  return Boolean(process.env.RESEND_API_KEY && process.env.CONTACT_TO && process.env.CONTACT_FROM);
}

export async function sendMail({
  subject,
  html,
  replyTo,
  to,
}: {
  subject: string;
  html: string;
  replyTo?: string;
  /** Defaults to the studio's inbox (CONTACT_TO). */
  to?: string;
}) {
  const response = await fetch(ENDPOINT, {
    method: "POST",
    headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: process.env.CONTACT_FROM,
      to: addresses(to ?? process.env.CONTACT_TO),
      subject,
      html,
      ...(addresses(replyTo).length ? { reply_to: addresses(replyTo) } : {}),
    }),
  });
  if (!response.ok) {
    throw new Error(`Resend responded ${response.status}: ${await response.text()}`);
  }
  return response.json();
}

const escape = (v: string) => v.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");

/** A paragraph linking into the EMC Portal, or "" when PORTAL_URL isn't set (so nothing points at a missing page). */
export function portalLink(path: string, label: string): string {
  const base = process.env.PORTAL_URL?.replace(/\/+$/, "");
  return base
    ? `<p style="margin:20px 0"><a href="${escape(base + path)}" style="color:#6b5a1f">${escape(label)}</a></p>`
    : "";
}
