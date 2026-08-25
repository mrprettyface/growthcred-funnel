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
| `/workshop` | Money page as an experience (A/B against `/`) | R990 | `plan_72K2Kk6oPeLRY` |
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

### `/workshop` — the money page as an experience

Same argument and the same locked headline as `/`, rebuilt with the experience
primitives: your week counted a line at a time, the cost worked out on your own
numbers, the day arriving as a sticky card pile. **`/` is untouched** and still
serves the original — this exists to be compared against it on real traffic
before anything replaces the page that takes money.

The one structural difference from the webinar: there is no seat to book, so
every CTA links to `/checkout`. `CtaBand` takes an `action` prop for this.

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
