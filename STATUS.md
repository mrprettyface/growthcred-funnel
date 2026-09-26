> September 2026 search release: see [release notes](docs/search/RELEASE.md) and [growth plan](docs/search/GROWTH-PLAN.md). Those documents supersede historical event dates, referral fulfilment and deployment assumptions below.

> **25 September 2026 — three contrarian value articles.** The Resources hub
> now includes `/guides/ai-business-proposals-faster`,
> `/guides/choose-ai-tools-small-business` and
> `/guides/ai-challenges-south-africa`. Their respective arguments are: proposal
> delay is a missing-source system, not a typing problem; "best tool" lists age,
> so use a buying test; and South Africa's problem is imported workflows, not
> being behind. Unsupported claims in the supplied drafts were removed, including
> unnamed client proof, guaranteed hours/ROI, universal product privacy claims,
> stale loadshedding framing and the unsupported 95% adoption advantage. All
> three pages link to the workshop and `/call`, carry FAQs and author markup,
> and receive inbound links from the Resources hub and relevant service pages.
> Editorial decisions: [docs/editorial/value-article-audit.md](docs/editorial/value-article-audit.md).
> Gates: [GATES-value-articles.md](GATES-value-articles.md), 7/7 met.

> **25 September 2026 — financial services and law-firm market pages.**
> `/ai-for-financial-services` and `/ai-for-law-firms` are live in the generated
> site, indexed, linked from every footer and written around controlled workflow
> preparation rather than autonomous professional decisions. Both pages explain
> the problem, an alternative operating model, a safe first pilot, the boundary
> that stays with the professional, and separate calls to the workshop and the
> `/call` implementation application. Sources are visible on-page. The underlying
> segment and positioning audit is in
> [docs/market-research/finance-and-law-firms.md](docs/market-research/finance-and-law-firms.md).
> GrowthCred does **not** claim finance or legal client results on these pages.
> Gates: [GATES-finance-law.md](GATES-finance-law.md), 7/7 met.

> **26 September 2026 — faster /call, contact channels, guide popup.**
> `/call` opens on a three-field form (name, mobile, email, plus one optional
> line) instead of the nine-step application; the qualifying questions move to
> the call. After sending: "Speak to a specialist" on WhatsApp, iMessage/SMS on
> +27 84 750 5788, or LinkedIn (message copied, profile opened). The header
> "Register" button is hidden on `/call`. Every contact link site-wide carries
> its channel logo (`src/components/BrandIcons.tsx`); the footer shows all five.
> A site-wide **AI Implementation Guide** card (`GuideOffer.tsx`, cover in
> `GuideCover.tsx`, copy in `src/lib/guide.ts`, guide at the unindexed
> `/ai-implementation-guide`) appears after 15 s, 50% scroll or desktop exit
> intent, never on form/checkout pages, and rests 14 days once closed.
> Opt-ins go to `magnet_signups` (slug `ai-implementation-guide`).
> **Capture (26 Sep, n8n parked):** live project `xnybzdbnbovirqwtpddn` has
> every table; anon inserts into `applications` and `magnet_signups` verified
> with rows the database had to reject (nothing written). Each /call
> application is written twice in parallel — the `applications` row and a
> `contact-autoresponder` message (source `call_application`), which emails
> info@ ("New /call application: …") and sends the applicant a confirmation.
> **Waiting on Phila:** (1) redeploy `contact-autoresponder` (dashboard → Edge
> Functions, or `supabase functions deploy contact-autoresponder`) to get the
> guide email, then set `VITE_GUIDE_EMAIL=1` and rebuild — until then guide
> opt-ins are captured but not emailed; (2) read and approve the guide copy.
> `VITE_INSTANT_CALL` stays off until an AI-call workflow exists.
> Pre-existing, not from this change: `verify-bundle-budget` fails (main chunk
> 76 KB vs 70 KB budget at HEAD) and `verify-human-layer` flags the finance
> and law pages.
>
> **25 September 2026 — corporate page reflow.** `/corporate-ai-training` now
> runs: hero + client logos → what you've tried (each card ends on a "nobody
> connected it" line) → research → "The tool was never the problem." as its own
> section (`#belief`) → mechanism + comparison → who runs the room → 3× →
> cost of the gap + ROI → stakeholders (each led by their question) → delivery
> → pack → pricing → the close (`#close`) → form → FAQ, with a second CTA. No
> existing copy was cut. **Waiting on Phila:** a told TaiAscend story (what the
> document was, who produced it, what changed) — only "3 days → 2 hrs" is
> confirmed, so no story has been written for it.
>
> **25 September 2026 — client logos.** The homepage proof strip and the same
> scrolling strip under the `/corporate-ai-training` hero show client logos, all redrawn
> in the site's midnight ink at balanced optical sizes by
> `scripts/make-logos.py` (originals in `content/client-logos/`, output in
> `public/images/clients/`, sizes in `src/content/clientLogos.json`, component
> `src/components/ClientLogos.tsx`). MpiloTech's stacked logo is recomposed
> side by side so its name stays readable. **Waiting on Phila:** Ncedo Afrika's
> file has white lettering flattened onto white, so it is typeset as a name
> until a dark or transparent version arrives; an eighth logo (a gold hook,
> lettering lost the same way) could not be identified and is not shown.
> WeWork's logo is shown at Phila's request; brand sign-off is still advisable.
>
> **25 September 2026 — favicon.** Google showed a grey globe beside
> growthcred.co.za because `/favicon.ico` was a 404 and the only icon was an SVG
> with live-text letters. The GC mark now ships as `favicon.ico` (16/32/48),
> 48/96/192px PNGs, an opaque `apple-touch-icon.png` and a 512px PNG used as the
> Organization logo in structured data, all generated by
> `scripts/make-icons.py` (Pillow + fontTools); the SVG's letters are now paths.
> `verify:seo` fails if any page stops linking the favicon or a size stops being
> a multiple of 48px. Google refreshes favicons on its own schedule after the
> homepage is recrawled — request indexing of `/` in Search Console to hurry it.
>
> **25 September 2026 — corporate AI training page.** `/corporate-ai-training`
> sells team training to organisations on a measured transformation ("Every
> employee. Every report. 3× faster."), delivered as workshops with
> follow-along packs and priced **per employee**. Copy in
> `src/lib/corporate.ts` (FAQ + Service schema text in `src/lib/corporateSeo.ts`,
> the only part in the main bundle), layout in `src/pages/Corporate.tsx`,
> 14 drawings in `src/components/CorporateScenes.tsx`, the ROI model in
> `src/components/CorporateRoi.tsx`. Proposal requests post through the
> existing `contact-autoresponder` function with "CORPORATE TRAINING ENQUIRY",
> organisation and team size at the top of the message. Linked from the header
> nav ("Corporate"; the header nav now shows from 1024px, below that it is the
> menu), the footer and `/ai-training-south-africa`. **Open for Phila:** no
> per-employee rate is published — set one and it goes in the proposal, not on
> the page, unless you decide otherwise; "3×" is worded as the target we
> measure against, never as a result; confirm in-person delivery in
> Johannesburg and the 30-day re-measurement are commitments you'll keep.
> Research figures (MIT NANDA 2025, Microsoft/LinkedIn 2024, BCG 2026) are
> attributed and linked. Gates: [GATES-corporate.md](GATES-corporate.md), 9/9.
>
> **24 September 2026 — first-page SEO pass.** 12 new indexed pages: service
> (`/ai-proposal-automation`, `/ai-follow-up-automation`, `/ai-admin-automation`),
> industry (`/ai-for-waste-management`, `/ai-for-beauty-and-cosmetics`), market
> (`/ai-automation-johannesburg`, `-uk`, `-united-states`, `-australia`, `-africa`)
> and bottom-of-funnel (`/guides/how-we-work-first-30-days`,
> `/guides/admin-assistant-vs-ai-automation`); `/data-and-security` is live and
> linked from every footer (practices confirmed by Phila, 24 Sep 2026). FAQ sections with
> matching FAQPage schema, author bios, ProfessionalService entity, a four-column
> sitemap footer, HSTS on both hosts. Fixed a live bug: `public/.htaccess` still
> 301'd `/workshop` to `/` on cPanel. supabase-js now loads on first form submit
> (main chunk 126 KB → 63 KB gzipped). Enforced by
> [GATES-seo-firstpage.md](GATES-seo-firstpage.md); owner's off-page to-do list is at the top of
> [docs/search/GROWTH-PLAN.md](docs/search/GROWTH-PLAN.md).
>
> **24 September 2026 — "The Command Core" homepage and site-wide design.**
> `/` is the high-ticket page in Phila's copy ("20–40% of your time drain.
> Gone."), every "Apply" going to `/call`. Layout in `src/pages/Home.tsx`, every
> word in `src/lib/home.ts` (also read by the crash fallback
> `src/pages/HomeFallback.tsx`). `/` renders bare with its own header/footer
> (`src/components/home/HomeChrome.tsx`). The **R990 workshop funnel lives
> intact at `/workshop`**: Proof on the page (company names, WeWork talks, Parliament,
> R3M–R10M, benchmarks, 20-hour guarantee) was supplied by Phila for
> publication; the before/after figures must keep their "Illustrative
> benchmarks" line (gate G20 enforces it). **WeWork brand use still needs
> WeWork's sign-off** per the partnership note.
>
> The design system is shared, not per-page: `Section dark` draws the blueprint
> grid + gold light (`DarkBackdrop` in `ui.tsx`, self-clipping so sections never
> need `overflow-hidden`, which would break sticky), `Eyebrow` is the gold
> hairline label, gold buttons glow, `PillLink` is the gold pill, headline
> `<span class="text-gold">` accents are burnished gold, and the site header is
> the dark bar. The CSS lives under "The Command Core" in `src/index.css`; all
> motion there is `no-preference`-only and transform/opacity-only. New homepage
> drawings are in `src/components/HomeScenes.tsx`, same hand as `sceneKit.tsx`.
>
> **Client stories (24 Sep)** are real indexed articles: `/stories` (hub),
> `/stories/mne-waste`, `/stories/demure-international`,
> `/stories/operators-intensive-wework-rosebank`, defined in
> `src/content/searchPages.ts` (kind `"story"`, with `quote`, `images`,
> `published`) and rendered by `SearchPage.tsx` with Article structured data.
> Photos are crops of Phila's slides in `public/images/stories/` (low-res,
> ~400px wide — swap in originals if you have them). TaiAscend's "3 days → 2
> hours" appears on the homepage and hub (no page of its own yet). The homepage
> carries the full site nav, the stories, "other ways in", every guide and an
> FAQ (1,177 words); the founder photo is the original `phila-event.jpg`.
>
> Gates: [GATES-reposition.md](GATES-reposition.md), 15/15 met (G15: stories). G4 also
> fails if any link about the workshop points at `/` (source and built HTML).
> Two pre-existing failures, unrelated and left as-is: `verify-mobile.mjs
> review-order` (regex case-mismatch) and `host-portable` (no SPA fallback by
> design).

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
| `/webinar` | Live class registration — scroll experience | free | — |
| `/webinar-plain` | Same class, plain document version | free | — |
| `/` | The Command Core — high-ticket, "Apply" → `/call` | — | — |
| `/workshop` | Workshop, as the scroll experience | R990 | `plan_72K2Kk6oPeLRY` |
| `/checkout` | + "Skip the Setup" bump | R1 490 combined | `plan_UCryhOI0svT2W` |
| `/upsell` | Operators Intensive (Done With You) | R9 900 | `plan_Lrt0EkLTJD5nx` |
| `/downsell` | Home study course (Do It Yourself) | R3 999 | `plan_Pbw4zu8ngelfI` |
| `/build` | Custom System — application, no price | — | — |
| `/thank-you` | Confirmation, "watch your email" | — | — |
| `/call` | Done-for-you, stepped application | — | — |

Route flow: checkout → upsell → (accept ⇒ build) / (decline ⇒ downsell → build)
→ thank-you. `/upsell`, `/downsell`, `/build`, `/thank-you` are gated: no order
⇒ redirected to `/checkout`. The gate reads the in-memory order first and
sessionStorage only as a fallback — `saveOrder` swallows storage failures by
design, so reading storage first ejected mid-funnel anyone whose browser refuses
to keep it (private mode, "block all cookies", an ITP purge).

**An order proves a lead, not a sale.** It is written the moment the details
form is submitted, so someone who opens the payment modal, closes it and then
types `/upsell` has one. `order.paid` is set only when Whop confirms, and
anything that tells a customer they have bought something must check it — the
"Welcome to the workshop" block on `/upsell` does. Nothing paid sits behind the
gate itself, so the gate stays deliberately loose: an order-less visitor gets
sent back to the start, and Whop's dashboard remains the authority on money.
Payment methods that take over the whole page (3-D Secure) come back to
`?paid=1`, which decides what we *say* on that page and never what we grant or
record.

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
  "Add promo code" field in the form. The code is captured once and kept in
  sessionStorage (`src/lib/promo.ts`), because React Router drops the query
  string on the way to `/upsell` — read the URL at each step and the discount
  silently applies to the first purchase only. While a code is in play the
  checkout summary strikes out its own total and says the final price is shown
  in Whop's form, rather than showing two different prices on one screen
- Three videos placed (workshop / Operators Intensive / Custom System)
- Prewritten "email us" buttons at each step to info@growthcred.co.za
## Sending: paid confirmation automatic, live class fulfilment manual

Paid workshop, upsell and downsell confirmations now have a server-side path:
Whop's signed `payment.succeeded` webhook is verified by
`supabase/functions/whop-webhook`, which updates the order and sends one
personalised Resend email. The browser callback is not trusted for fulfilment.
Run the payment-email block in `supabase/schema.sql`, deploy the function, and
configure the Whop/Resend secrets before relying on it in production. Full
setup is in **[DEPLOY.md](DEPLOY.md)**.

The live-class registration form still only saves the row; it does not send the
joining link or WhatsApp reminder automatically.

So the seat confirmation says the link "goes to you before Wednesday" rather
than "is on its way" — the second reads as automatic, and someone checking an
empty inbox two minutes later concludes the form broke.

Two sends are therefore MANUAL, and nothing will remind you:

1. The joining link, some time before the class.
2. The WhatsApp reminder, an hour before.

The list is in Supabase (`webinar_registrations`), filtered by the event slug.

- Deploy: push to GitHub → cPanel Git → Update from Remote → Deploy HEAD Commit
- Deploy, alternative: Cloudflare Pages builds the same repo for free and
  survives an unpaid hosting invoice. Setup and the DNS/email caveats are in
  **[DEPLOY.md](DEPLOY.md)**. The site must stay servable by BOTH: Apache reads
  `dist/.htaccess`, Pages reads `public/_redirects` + `public/_headers`.
  DNS, MX and hosting are currently all on one provider — that single point of
  failure, not the hosting itself, is the thing worth money.

## The live class (`/webinar`)

Registration page for the free live class on **Wed 2 September 2026, 12:00–13:00
SAST**. Not in the nav on purpose: it is the page ads, WhatsApp broadcasts and
emails point at.

- Event details (date, times, calendar link) live in `src/lib/webinar.ts`.
  Moving the date is a one-line change; give each new class its own `slug`.
- Registrations go to a new Supabase table, `webinar_registrations`
  (name, email, WhatsApp, event slug), anon INSERT-only like everything else.
  **Run the new block at the bottom of `supabase/schema.sql` in the SQL editor**
  or registrations will fail with `PGRST205` (table not in schema cache).
- Read them from the dashboard via `webinar_registrations_recent`.
- **Seats also dual-write to a Google Form** ("Reserve Your Seat"), alongside
  Supabase, so the response Sheet can be compared against the table before
  Supabase is retired for seats — the Form never sleeps, so a paused free tier
  (open item #6) can no longer silently eat a registration. `registerForWebinar`
  fires both in parallel and counts the seat saved if *either* accepts it; the
  transport is `src/lib/forms.ts`, the form id + field mapping (with the read
  date) sit above the function in `src/lib/supabase.ts`. Two things gate a full
  switch-off of Supabase: the form has **no WhatsApp field** (so a Supabase
  outage still loses the number, which the WhatsApp reminder needs), and the
  `entry.*` field IDs are **not contractual** — rebuilding the form reissues
  them and Form writes then stop silently while Supabase keeps working, so the
  tell is the Sheet no longer filling. Re-read the IDs from the form source if
  that happens.
- **Referral loop.** Every seat confirmation (both the seat form and the magnet
  flow) shows a share block: the registrant's own link `/webinar?ref=<code>`,
  copy + WhatsApp, promising the "Stop the Leak" pack to referrer and referred
  alike. `ref` is captured and kept in sessionStorage exactly like `?promo=`
  (`src/lib/referral.ts`), because React Router drops the query string. Each
  registrant's `ref_code` is derived from their email (stable, one-way, URL-safe
  — never the address itself, so nothing personal lands in a link), and a
  referred visitor's row carries `referred_by`. Both columns are Supabase-only
  (the Google Form has no referral fields) — run the ALTER block in
  `supabase/schema.sql`. **To reward a referral: match a row's `referred_by`
  against the referrer's `ref_code`** in `webinar_registrations_recent`;
  fulfilment of the pack is manual, like the sends below. Self-referrals (their
  own link) are dropped, not credited.
- Fulfilment is manual for now: joining link by email, reminder on WhatsApp an
  hour before. The page promises both, so send both.
- The FAQ promises the recording **only to people who stay to the end**. That is
  a promise made on the page — honour it exactly, or change the copy.
- Proof block is deliberately claim-free until Jeff, Julius and a third
  operator give a number and a line in their own words. The card grid is
  commented in `src/pages/Webinar.tsx`, ready to fill in.

**The live demo now runs on all three selling pages** — `/`, `/workshop` and
`/webinar` — high up on each, because watching the comparison is what makes the
rest of the argument land. On `/` it costs about 6.8 kB gzipped in the initial
bundle; it is eager rather than lazy because it sits above the fold-and-a-half
and a pop-in there would be worse than the bytes.

### Chunking: check what the landing page downloads

`vite.config.ts` names the vendor chunks by hand. **React must be named first.**
Left unnamed, Rollup folds it into whichever manual chunk it meets first — it
ended up inside a chunk called `vendor-motion`, so every page downloaded 44 kB
of "motion" that was really React, and the landing page appeared to need a
spring library it never used. Naming React keeps the rest honest.

The landing page should load: index, vendor-react, vendor-gsap, vendor-lenis and
its own chunk — **and not** vendor-motion or vendor-ogl. Verify in the browser
with `performance.getEntriesByType('resource')`, and read the full filename:
truncating the hash off the chunk names makes every vendor chunk look the same
and the check silently passes.

### `/workshop` — the money page as an experience

Same argument and the same locked headline as `/`, rebuilt with the experience
primitives: your week counted a line at a time, the cost worked out on your own
numbers, the day arriving as a sticky card pile. **`/` is untouched** and still
serves the original — this exists to be compared against it on real traffic
before anything replaces the page that takes money.

The one structural difference from the webinar: there is no seat to book, so
every CTA links to `/checkout`. `CtaBand` takes an `action` prop for this.

Three sets of line drawings share one hand, defined in `src/components/
sceneKit.tsx`: the seven ladder rungs (`LevelScenes`), the six blocks of the day
plus the guarantee (`DayScenes`), and the six lines of "your week"
(`WeekScenes`). That is twenty drawings on `/`, which is the ceiling — the week
set is deliberately the quiet one, small and beside the sentence rather than
above it, and greyed until its hour has been counted. Two motifs are spoken for
and must not be reused: the week grid belongs to the day's first scene, the moon
to its fifth. Costs 628 bytes gzipped, in a chunk `/` already loads.

Costs 4.5 kB gzipped on top of shared chunks; the main bundle is unchanged.

### The two webinar routes

`/webinar` is the experience; `/webinar-plain` is the same argument as a plain
document. Both are live, both register to the same table, so they can be A/B
tested by splitting ad traffic between the two URLs.

The experience is built from [React Bits](https://reactbits.dev) components,
vendored into `src/components/reactbits/` (TS + Tailwind variants). They are
**patched local copies, not a dependency** — each file's header lists what was
changed and why. Re-downloading one from reactbits.dev will silently undo those
fixes, most importantly ScrollReveal's scoped cleanup (the stock version kills
every ScrollTrigger on the page) and ScrollStack's `manageScroll` prop.

Rules the page has to keep:

1. **One scroll authority.** `SmoothScroll` owns the single Lenis instance and
   feeds ScrollTrigger. Nothing else may construct a Lenis. Two smooth-scroll
   engines on one document fight, and the symptom is drifting, janky pins.
2. **The ask repeats, but never moves the reader.** Every CTA opens the seat
   form in a dialog (`SeatCtaProvider` / `SeatButton` / `CtaBand`) rather than
   linking to a form elsewhere on the page, so booking never costs someone their
   place in the argument. Inline forms sit under the hero and at the close.
3. **Motion is decoration.** Every scene has a plain branch under
   `prefers-reduced-motion`, and the hero has a 6-second failsafe that gives up
   on the animation and prints the words. Content is never gated behind an
   animation finishing.
4. **The seat form is never behind an effect.** If the experience chunk fails to
   load or throws, `ExperienceBoundary` renders the plain page instead.
5. **Every band declares its tone.** `<Section>` emits `data-tone`, and so do the
   image breaks and CTA strips. The fixed progress rail reads whichever band is
   under it and inverts, otherwise it disappears for the length of every dark
   section.

Cost: GSAP, motion, Lenis and ogl add ~116 kB gzipped, in a lazily-loaded chunk
that only `/webinar` pulls. The WebGL background is a further 15 kB, loaded only
on desktops that pass `skipHeavyVisuals()`. The money page at `/` is unaffected.

Scene-by-scene, `src/pages/WebinarExperience.tsx`:

| Scene | What it does |
| --- | --- |
| Hero | Question types itself, answer lands, gold WebGL rays behind |
| Your week | Six sentences, one at a time, hours ticking up to 10 in the margin |
| What you tried | Four failed fixes literally stacking up (ScrollStack) |
| The difference | **OptionWheel** picks the job that eats their week, both panes then type that job live |
| The fix | ScrollFloat line, then the Operator's Brain |
| Who I am | TiltedCard portrait, story in three beats |
| The hour | Stepper — they click through the five things |
| The cost | The existing `CostCalculator`, so the number is theirs |
| Your seat | Stepper form: name → email → WhatsApp |

**Mobile performance rules, learned the hard way (Aug 2026 audit).** Keep these
or the scroll jank comes back:

- **No `filter: blur()` on anything driven by scroll.** Blur never reaches the
  compositor fast path; it repaints. This was the main cause of the jank. Use
  `transform` and `opacity` only. ScrollReveal takes `enableBlur={false}`,
  ScrollStack takes `blurAmount={0}`.
- **No `backdrop-blur` on sticky elements.** A blurred backdrop over moving
  content recomputes every frame. The sticky seat bar uses a solid background.
- **ScrollStack is desktop-only** (`heavyStack = !reduced && !isMobile`). It
  reads layout for every card on every scroll event. Phones get the same pile
  from `CardStack`, which is pure CSS `position: sticky` — no scroll handler, no
  layout read, nothing to throttle. Its row gap is the animation's runway: cards
  need scroll distance between them or the whole pile forms and releases in a
  flick. **Never put `overflow-hidden` on a section containing it** — that
  silently disables sticky for everything inside. Use `overflow-x-clip`.
- **The demo panes reserve their finished height.** Each `Pane` renders an
  invisible full-text "sizer" with the typed layer absolutely positioned on top,
  so typing never changes the card's height. Before this, the card grew as it
  typed and shoved everything below it down the screen repeatedly — the single
  worst mobile defect on the page. Verified at 0px shift.
- **The demo repaints at ~25fps, not 60** (`PAINT_INTERVAL_MS`). Each frame
  re-rendered every span in both panes; a typewriter does not need 60fps.
- **ClickSpark's loop parks itself when idle.** The stock component re-arms rAF
  forever and repaints a full-viewport canvas whether or not anyone clicked.

Mobile spacing tops out at **64px** between sections (32px each side) against
96px on desktop, and no label anywhere renders below **12px** or lighter than
weight 400.

Mobile is a different design, not a squeezed desktop one. Three places diverge
deliberately, all keyed off `useIsMobile()` (which matches Tailwind's `md`, so a
JS branch and a `md:` class always mean the same screen):

- **The hours tally** is a sticky margin card on desktop and a frosted floating
  pill on the phone, because a phone has no margin to put it in. It appears with
  the scene and leaves with it. The counter animates with `gc-tick`
  (transform only, never opacity) — a number that is only visible after its
  animation has run is a number that vanishes on a dropped frame.
- **The job picker** is the desktop option wheel laid on its side: the option
  under the needle is sharp and large, the ones either side are set back and
  softly out of focus, and scrolling-and-settling selects rather than tapping
  alone. Two sanctioned blur classes exist (`.gc-lane-dim`, `.gc-pick-dim`) and
  gate G13 forbids any third, any changed radius, or any eased filter.
- **The demo** is a side-by-side race on desktop. On a phone the two answers sit
  on a scroll-snap track you swipe between, still typing from the one shared
  counter, so the race is preserved and you drag between its two lanes. The next
  card peeks at the edge — that peek is the affordance, which is why there is no
  caption telling anyone to swipe. An earlier version showed one answer and
  swapped it, which moved the contrast out of the eye and into memory.
- **Prose blocks** (`Beat`) get roughly a third of the screen each on mobile and
  fade up as they arrive, so a four-paragraph section is walked through one
  thought at a time instead of landing as a wall. Nothing is ever hidden.

**Sections on `/` arrive as you scroll to them** via `.gc-reveal` — a CSS
view-timeline animation, no observer and no scroll handler. It is built that way
on purpose: an earlier IntersectionObserver version started hidden, which turns
any JS failure into a permanently blank section on the page that takes money.
Unsupported browsers and reduced-motion visitors simply see the content.

Vertical rhythm on this page is three values and nothing else: **40px** where a
section hands over to its CTA band (they read as one block), **96px** for a
continuation in the same tone, **160px** across a tone change. Watch out for
`pt-0` on a `<Section>` — it does *not* override `md:py-24`, because
tailwind-merge only resolves conflicts within the same variant. Write
`pt-0 md:pt-0` or the desktop padding silently survives. (The same trap is live
on the workshop page.)

Photographs (`the-outcome`, and the two event shots in the proof
block) are section breaks, not decoration — they mark the turns in the argument
and give the eye somewhere to rest in a long read. `ImageBreak` parallaxes them
gently, and sits still under reduced motion.

Content still open on both pages: the proof block makes no numerical claim until
Jeff, Julius and a third operator give a figure and a line in their own words.

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
