import { createFileRoute } from "@tanstack/react-router";
import { apiHeaders, bookingConfigured, money } from "@/lib/booking";
import { mailConfigured, portalLink, sendMail } from "@/lib/mail";

// Receives a booking request from /book, hands it to the shared database (which
// re-checks everything), then emails the client their private booking link and
// tells the studio. The booking is saved either way: email trouble must never
// make a saved request look failed.

const SUPABASE_URL = (import.meta.env.VITE_SUPABASE_URL as string | undefined)?.replace(/\/$/, "");
const SITE_NAME = "DFW Sports Photography";
const MAX_LEN = 5000;
// A person takes longer than this to fill the form in; a script does not.
const MIN_FILL_MS = 2500;
const KNOWN_ERRORS = ["session_unavailable", "invalid_input", "address_required", "location_required"];

type Created = { booking_id: string; manage_token: string };
type BookingView = { session_name: string; deposit_cents: number };

const str = (v: unknown, max = 200) => (typeof v === "string" ? v.trim().slice(0, max) : "");

const escapeHtml = (value: string) =>
  value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { "Content-Type": "application/json" } });

export const Route = createFileRoute("/api/book")({
  staticData: { sitemap: false },
  server: {
    handlers: {
      POST: async ({ request }) => {
        let body: Record<string, unknown>;
        try {
          body = await request.json();
        } catch {
          return json({ error: "invalid_input" }, 400);
        }

        // Honeypot and fill-time checks. Bots get a plain success so they learn nothing.
        const startedAt = typeof body.t === "number" ? body.t : 0;
        if (str(body.company) !== "" || Date.now() - startedAt < MIN_FILL_MS) return json({ ok: true });

        if (!bookingConfigured) return json({ error: "unavailable" }, 503);

        const name = str(body.name);
        const email = str(body.email, 320);
        const sessionTypeId = str(body.session_type_id, 64);
        if (!name || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email) || !sessionTypeId) {
          return json({ error: "invalid_input" }, 400);
        }

        const message = str(body.message, MAX_LEN);
        // What the client told us about the game. These have no column of their own;
        // the portal shows them on the booking under "From the client".
        const details = {
          sport: str(body.sport),
          team: str(body.team),
          athlete: str(body.athlete),
          players: str(body.players, 40),
          game: str(body.game, 500),
          venue: str(body.venue, 300),
          referral: str(body.referral),
          // The optional address: the database keeps it on the contact, not in these notes.
          address_line1: str(body.address_line1),
          address_line2: str(body.address_line2),
          city: str(body.city, 100),
          state: str(body.state, 40),
          postal_code: str(body.postal_code, 20),
        };

        const created = await fetch(`${SUPABASE_URL}/rest/v1/rpc/create_booking_request`, {
          method: "POST",
          headers: apiHeaders(),
          body: JSON.stringify({
            p_session_type_id: sessionTypeId,
            p_name: name,
            p_email: email,
            p_phone: str(body.phone, 40) || null,
            p_message: message,
            p_details: details,
          }),
        });

        if (!created.ok) {
          const failure = await created.json().catch(() => ({}));
          if (KNOWN_ERRORS.includes(failure.message)) return json({ error: failure.message }, 409);
          console.error("[book] create_booking_request failed", created.status, failure);
          return json({ error: "server_error" }, 500);
        }

        const booking: Created = (await created.json())[0];
        const origin = process.env.SITE_URL?.replace(/\/+$/, "") || new URL(request.url).origin;
        const manageUrl = `${origin}/booking/${booking.manage_token}`;

        // Read back what was booked, for the emails and to know if a deposit is due.
        let view: BookingView | null = null;
        try {
          const res = await fetch(`${SUPABASE_URL}/rest/v1/rpc/get_booking_by_token`, {
            method: "POST",
            headers: apiHeaders(),
            body: JSON.stringify({ p_token: booking.manage_token }),
          });
          if (res.ok) view = (await res.json())[0] ?? null;
        } catch {
          // fall through: the emails use generic wording
        }
        const packageName = view?.session_name ?? "your session";
        const deposit = view?.deposit_cents ?? 0;

        let emailed = false;
        if (mailConfigured()) {
          const font = "font-family:system-ui,-apple-system,Segoe UI,sans-serif;font-size:15px;line-height:1.6;color:#111";
          const rows: [string, string][] = [
            ["Package", packageName],
            ["Name", name],
            ["Email", email],
            ["Phone", str(body.phone, 40) || "—"],
            ["Sport", details.sport || "—"],
            ["Team / league", details.team || "—"],
            ["Athlete", details.athlete || "—"],
            ["Players", details.players || "—"],
            ["Game dates & times", details.game || "—"],
            ["Field / venue", details.venue || "—"],
            ["Heard about us", details.referral || "—"],
            ["Message", message || "—"],
          ];
          const results = await Promise.allSettled([
            sendMail({
              to: email,
              replyTo: process.env.CONTACT_TO,
              subject: `We received your request — ${SITE_NAME}`,
              html: `<div style="${font}">
  <h2 style="font-weight:700;margin:0 0 16px">Thanks, ${escapeHtml(name.split(" ")[0])}!</h2>
  <p>We’ve got your request for <strong>${escapeHtml(packageName)}</strong> and will be in touch shortly to confirm your game dates.</p>
  ${deposit > 0 ? `<p>A <strong>${money(deposit)}</strong> deposit reserves your date. You can pay it securely from your booking page.</p>` : ""}
  <p style="margin:24px 0"><a href="${manageUrl}" style="background:#0a0a0a;color:#c9a84c;padding:12px 24px;text-decoration:none;font-weight:700;letter-spacing:.08em">VIEW YOUR BOOKING${deposit > 0 ? " &amp; PAY DEPOSIT" : ""}</a></p>
  <p style="color:#666;font-size:13px">Keep this link private. It’s how you reach your booking.</p>
</div>`,
            }),
            sendMail({
              replyTo: email,
              subject: `New booking request: ${packageName} — ${name}`,
              html: `<div style="${font}">
  <h2 style="font-weight:700;margin:0 0 16px">New booking request — ${SITE_NAME}</h2>
  <table style="border-collapse:collapse">
    ${rows
      .map(
        ([k, v]) =>
          `<tr><td style="padding:6px 14px 6px 0;color:#666;white-space:nowrap;vertical-align:top">${k}</td><td style="padding:6px 0">${escapeHtml(v).replace(/\n/g, "<br>")}</td></tr>`,
      )
      .join("")}
  </table>
  ${portalLink(`/admin/bookings/${booking.booking_id}/`, "Open in the EMC Portal")}
</div>`,
            }),
          ]);
          for (const r of results) if (r.status === "rejected") console.error("[book] email failed", r.reason);
          emailed = results[0].status === "fulfilled";
        } else {
          console.error("[book] Mail is not configured; booking saved but no emails sent.", booking.booking_id);
        }

        return json({
          ok: true,
          manage_url: `/booking/${booking.manage_token}`,
          deposit_due: deposit > 0,
          emailed,
        });
      },
    },
  },
});
