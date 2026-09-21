> September 2026 search release: see [release notes](docs/search/RELEASE.md) and [growth plan](docs/search/GROWTH-PLAN.md). Those documents supersede historical event dates, referral fulfilment and deployment assumptions below.

# GrowthCred funnel

A value-ladder funnel: free class → one-day workshop → add-ons → done-for-you.
Vite + React + TypeScript + Tailwind 4 + Supabase, deployed to cPanel from GitHub.
Same stack as the Fumba site, so the deploy is familiar.

## Quick start

```bash
npm install
cp .env.example .env   # fill in your keys
npm run dev
```

## Routes

| Route | Page | Purpose |
| --- | --- | --- |
| `/class` | Free class | Email opt-in, then class delivery |
| `/` | Workshop VSL | The money page |
| `/checkout` | Checkout | Details + order bump |
| `/upsell` | Done With You | Add-on (one-click once Stitch is live) |
| `/downsell` | 7-day trial | Only after declining the upsell |
| `/thank-you` | Confirmation | Wire instructions + backend CTA |
| `/call` | Done for you | High-ticket, booked not bought |
| `/terms` `/privacy` `/refunds` | Legal | Stubs |

`/upsell`, `/downsell` and `/thank-you` are **gated**: without an order in
session you are redirected to `/checkout`, so nobody lands mid-funnel.

## Payments

Payments are handled by Whop's embedded checkout. The browser callback only
advances the funnel; it is not proof of payment and it never sends fulfilment
email. The source of truth for fulfilment is the signed `payment.succeeded`
webhook in `supabase/functions/whop-webhook`.

The webhook updates the matching order, records the provider event, and sends a
personalised confirmation through Resend. It is idempotent so Whop retries do
not create duplicate messages. Run the payment-email block in
`supabase/schema.sql`, deploy the function, and configure the Whop webhook and
the secrets described in `DEPLOY.md` before relying on automatic email.

> **Never put a payment secret in a `VITE_` variable.** Everything prefixed
> `VITE_` is compiled into the browser bundle and is readable by anyone.
> Secrets belong in a Supabase Edge Function that the site calls over HTTPS.
> Payment status must be set by a verified webhook, never by the browser.

## Setting prices and copy

- **Prices**: `src/lib/offers.ts`. They are `null` until you set them, and
  render as `[TO COME]` so nothing fake ships.
- **Banking details**: `src/pages/ThankYou.tsx`.
- **Copy still to write**: search the codebase for `TO COME`.

```bash
grep -rn "TO COME" src/
```

## Supabase

Run `supabase/schema.sql` in the SQL editor, then put the project URL and anon
key in `.env`.

The anon key is public, so **RLS is the only protection**. The policies grant
`INSERT` and nothing else: the site can capture leads and orders but can never
read them back, and a customer can never mark their own order paid. Read your
orders in the Supabase dashboard (the `orders_awaiting_payment` view is there
for exactly that).

If Supabase is not configured, the site still runs: the client is `null` and
capture fails softly rather than crashing, matching the Fumba pattern.

## Deploy to cPanel from GitHub

```bash
npm run build
npm run deploy:prepare   # verifies .htaccess made it into dist/
```

Upload `dist/` to `public_html`. `public/.htaccess` handles the SPA fallback,
gzip and cache headers. **Without it every route except `/` returns 404**, so
if deep links break, that file is the first thing to check.

## Environment variables

| Variable | Purpose |
| --- | --- |
| `VITE_SUPABASE_URL` | Supabase project URL |
| `VITE_SUPABASE_ANON_KEY` | Public anon key, protected by RLS |
| `VITE_SCHEDULER_URL` | Cal.com / Calendly embed for `/call` |
| `VITE_PAYMENT_PROVIDER` | `manual_wire` (default) or `stitch` |

## Verified purchase confirmation email

The automated email is intentionally server-side. In Supabase, deploy
`supabase/functions/whop-webhook` with JWT verification disabled (the function
verifies Whop's signature itself), then add a Whop webhook for
`payment.succeeded` pointing at:

`https://<project-ref>.supabase.co/functions/v1/whop-webhook`

Set these Edge Function secrets in Supabase: `WHOP_WEBHOOK_SECRET`,
`RESEND_API_KEY`, `PURCHASE_EMAIL_FROM`, `WHOP_COMPANY_ID`, and a service-role
credential (`SUPABASE_SERVICE_ROLE_KEY`) if the project does not expose one to
functions automatically. `PURCHASE_EMAIL_FROM` must use a domain verified in
Resend. Never put any of these values in a `VITE_` variable or the browser
bundle.
