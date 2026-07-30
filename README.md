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

Phase 1 is **manual bank transfer**. There is no card on file, so there is no
true one-click upsell yet. The upsell and downsell are add-ons that adjust the
total shown on `/thank-you`. Nothing is charged automatically and no payment
secrets exist in this codebase.

Phase 2 is **Stitch**. Implement `StitchProvider` in `src/lib/payment.ts`.
Once `supportsOneClick` is true, `/upsell` and `/downsell` become real
post-purchase one-click offers with no page changes.

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
