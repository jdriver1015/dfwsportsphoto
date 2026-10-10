# Working on the DFW Sports Photography site

A TanStack Start (Vite, React) site on Vercel. It is a marketing site plus the
client-facing half of booking. Everything behind it (the database, Stripe,
the staff screens) is shared with Ellie Mae Collective and lives in the
**EMC Portal** repo (`jdriver1015/EMCADMIN`, folder `Studio Portal`). Don't
rebuild any of that here.

## How booking works

1. `/book` (`src/routes/book.tsx`, `src/components/book/BookForm.tsx`): the
   visitor picks a package and describes the game. Packages come from the
   database (`session_types` for brand `dfw-sports`, `bookable_online = true`),
   so prices and deposits are changed in the portal, not here. Pricing-section
   buttons link to `/book?package=<slug>`.
2. `POST /api/book` (`src/routes/api.book.ts`): spam checks, then the shared
   `create_booking_request` database function, which validates everything and
   creates the lead and a *pending* booking. It then emails the client their
   private link and the studio a notice. The booking is saved even if email fails.
3. If a deposit is due the form hands off to `/booking/<token>`, which shows the
   booking, takes the deposit through Stripe Checkout (`deposit-checkout` edge
   function) and shows the balance invoice once the studio sends one.
4. The studio schedules and confirms in the EMC Portal.

DFW packages are *request* sessions: games follow the league's calendar, so the
client says when and where, and the studio confirms. There is no time picker.

## Rules

- **Cancellations go through the studio.** The Ellie Mae site has a self-serve
  "cancel and refund everything" button; the DFW FAQ says deposits are
  non-refundable except for weather, so this site deliberately has none. Don't
  copy it over without changing the policy first.
- **Browser code uses only the public Supabase key** (`VITE_SUPABASE_*`). Secrets
  (`RESEND_API_KEY` etc.) are read only in server routes, via `src/lib/mail.ts`.
- The answers a client gives about the game (sport, team, game, venue…) go in
  `p_details`; the portal shows them under "From the client". If you add a
  field, add its label in the portal's `lib/admin/lead-details.ts`.
- Staging is noindexed until `ALLOW_INDEXING=true` (see `vite.config.ts`).

## Settings (Vercel → Environment Variables; `.env.example` lists them)

`VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY` (booking and payment);
`RESEND_API_KEY`, `CONTACT_TO`, `CONTACT_FROM` (emails); optional `SITE_URL`
and `PORTAL_URL`.

## Before committing

```bash
npm run typecheck && npm run build
```
