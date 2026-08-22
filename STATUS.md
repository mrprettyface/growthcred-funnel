# GrowthCred funnel — where things stand

Living handover doc. Read this first if you're picking the project up cold.

## What this is

A value-ladder funnel for GrowthCred (Phila Ngwenya, Rosebank JHB).
Vite + React + TypeScript + Tailwind 4, static build, deployed to cPanel from
GitHub. Live at **https://growthcred.co.za**.

Repo: https://github.com/mrprettyface/growthcred-funnel (public, no secrets)

## The funnel

| Route | Offer | Price | Whop plan |
| --- | --- | --- | --- |
| `/class` | Free class opt-in | free | — |
| `/` | Workshop VSL (money page) | R990 | `plan_72K2Kk6oPeLRY` |
| `/checkout` | + "Skip the Setup" bump | R1 490 combined | `plan_UCryhOI0svT2W` |
| `/upsell` | Operators Intensive (Done With You) | R9 900 | `plan_Lrt0EkLTJD5nx` |
| `/downsell` | Home study course (Do It Yourself) | R3 999 | `plan_Pbw4zu8ngelfI` |
| `/build` | Custom System — application, no price | — | — |
| `/thank-you` | Confirmation, "watch your email" | — | — |
| `/call` | Done-for-you, stepped application | — | — |

Route flow: checkout → upsell → (accept ⇒ build) / (decline ⇒ downsell → build)
→ thank-you. `/upsell`, `/downsell`, `/build`, `/thank-you` are gated: no order
in sessionStorage ⇒ redirected to `/checkout`.

**Prices must match Whop exactly.** Site prices live in `src/lib/offers.ts`
(cents), plan IDs in `src/lib/whop.ts`. A mismatch has bitten us twice.

## Done and working

- Whop embedded checkout on `/checkout`, `/upsell`, `/downsell`, opening in a
  **modal** over the offer (`src/components/Modal.tsx`) so the sales content
  stays visible while paying
- Order bump swaps the Whop plan (workshop-only vs workshop+bump)
- Apple Pay verified for the domain (self-hosted file at
  `public/.well-known/apple-developer-merchantid-domain-association`, copied
  explicitly in `.cpanel.yml` because `dist/*` skips dotfiles)
- Google Pay + card + crypto, all native to Whop's embed
- Whop pixel (`biz_6zU0cw4ZzQ1SpU`) in `index.html`, auto-tracks SPA routes
- Supabase capture: `leads`, `orders`, `applications`, `build_requests`,
  `upsell_events`. Anon INSERT-only RLS; read from the dashboard
- Promo codes: `?promo=CODE` on any checkout URL, plus Whop's own
  "Add promo code" field in the form
- Three videos placed (workshop / Operators Intensive / Custom System)
- Prewritten "email us" buttons at each step to info@growthcred.co.za
- Deploy: push to GitHub → cPanel Git → Update from Remote → Deploy HEAD Commit

## Open items

1. **One-click upsells (the big one, deliberately deferred).**
   Today the card is re-entered at each paid step. The plan, researched and
   agreed:
   - Collect the card in Whop **setup mode** at `/checkout` (setup mode is the
     only mode where `onComplete` returns `payment_method_id`; a normal paid
     checkout does not)
   - Immediately charge workshop + bump so it's banked
   - Every later step is a one-click charge against the saved card
   - Needs two **Supabase Edge Functions**: `create-setup-session` and `charge`,
     with `WHOP_API_KEY` set as a Supabase secret (never in this repo, never in
     a `VITE_` var — those ship to the browser)
   - **Security:** the browser must send only an offer id, never an amount.
     Prices resolve server-side; tie each charge to a real order row
   - Known risk: the workshop charge happens after collection, so a decline
     needs a retry path
2. **Delete the `TEST120` promo code** (100% off, all products) once testing is
   done, or anyone who finds it gets everything free
3. **Scheduler for `/call`** — set `VITE_SCHEDULER_URL` to a Cal.com/Calendly
   link and the booking calendar replaces the placeholder
4. **Free class video** — `freeClass` slot in `src/lib/videos.ts` is still null
5. **Legal pages** are first drafts with `[DATE]` / `[NAME]` placeholders and
   want a lawyer's eye
6. **Supabase free tier pauses after ~7 idle days.** It has paused once already
   and silently ate every submission. Consider Pro if traffic is bursty
7. **No real sale has been taken yet.** Do one genuine low-value purchase with a
   real card and refund it, to prove the full chain end to end

## Gotchas learned the hard way

- `dist/*` in `.cpanel.yml` **skips dotfiles** — `.htaccess` and `.well-known`
  each need their own explicit copy line
- The SPA rewrite in `.htaccess` would swallow `/.well-known/...`; there's an
  explicit passthrough rule before the fallback
- `formatPrice` uses `toLocaleString("en-ZA")`, which emits a **non-breaking
  space** ("R1 490"). Plain-space regexes will not match it
- cPanel here has **no shell access**, so the GitHub repo is public to let
  cPanel clone it without credentials
- Whop silently ignores unknown promo codes rather than erroring
