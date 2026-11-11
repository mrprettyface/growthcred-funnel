# Gates: JCCI webinar registration funnel

OWNS: src/lib/jcciWebinar.ts, src/lib/seat.ts, src/pages/JcciWebinar.tsx,
src/pages/WebinarThanks.tsx, src/pages/WebinarVip.tsx,
src/components/webinar/Countdown.tsx, src/components/webinar/SeatForm.tsx,
src/components/webinar/ChatTrapMath.tsx, src/lib/segments.ts, src/lib/utm.ts,
scripts/verify-jcci-webinar.mjs, docs/operations/jcci-webinar-reminders.md,
docs/marketing/jcci-webinar-meta-ads.md,
public/downloads/business-brain-worksheet.pdf

SHARED (edited surgically, not owned): src/App.tsx, src/seo/routes.ts,
src/entry-server.tsx, src/lib/webinar.ts, src/lib/offers.ts, src/lib/whop.ts,
src/lib/whopReturn.ts, src/lib/videos.ts, src/lib/analytics.ts,
src/lib/supabase.ts, supabase/schema.sql, scripts/verify-seo.mjs, STATUS.md

REMOVED: src/pages/NextClass.tsx — the undated placeholder class that `/webinar`
served. This dated session supersedes it, and nothing else imported it.

Scope: build the registration funnel Phila briefed for the JCCI × GrowthCred
webinar on Wednesday 18 November 2026, 18:00 SAST. `/webinar` becomes the
registration page. Two outcomes after the form: `/webinar/thanks` for a free
seat and `/webinar/vip` for a VIP seat. The reminder sequence ships as copy in
`docs/operations/`, because nothing in this codebase sends email or WhatsApp.

The brief carries proof and money that are not yet confirmed. Those are gated,
not published: the testimonial, the WhatsApp-assistant claim and the VIP
checkout each degrade to something visible and honest rather than plausible.

- [x] G1: the project typechecks and produces a production build
  CHECK: npm run build && echo JCCI_BUILD_OK
  EXPECT: JCCI_BUILD_OK
  EVIDENCE: exit=0; shell=/bin/zsh; cwd=repo root. "Prerendered 50 complete pages;
    56 route documents generated." Two earlier runs failed first: TS6133 on the
    now-unused ToCome/ToComeBlock imports after the placeholders came off the page.

- [x] G2: /webinar prerenders as the JCCI registration page, carrying the date,
        the time, the platform, both seat options and the POPIA consent
  CHECK: node scripts/verify-jcci-webinar.mjs page
  EXPECT: page OK
  EVIDENCE: exit=0; "page OK", "page-form OK". The built HTML carries Wednesday
    18 November, 18:00 SAST, Microsoft Teams, JCCI, the headline, the Chat Trap,
    the four engines, R0 and R497, POPIA, the results-vary line and the footer's
    registration number. The seat CHOICE is step 2, so it is asserted in the
    form's source instead: both seats, the 20-seat cap, and the fact that the
    details step is ordered before the seat step, so an abandoned form still
    leaves a lead.

- [x] G3: every price on the page comes from src/lib/offers.ts, and no rand
        figure is typed into the funnel's own copy
  CHECK: node scripts/verify-jcci-webinar.mjs price
  EXPECT: price OK
  EVIDENCE: exit=0; "price-source OK", "price OK". VIP_SEAT = 49700 cents in
    offers.ts; none of the five funnel files types a rand figure (R0 and the
    calculator's own R100-R3000 slider bounds are excluded, with a positive
    control proving the detector sees a typed price). The R497 on the built page
    is computed from the cents in offers.ts, not compared to a literal.

- [x] G4: no unapproved proof ships, and the indexed page carries no scaffolding
  CHECK: node scripts/verify-jcci-webinar.mjs proof
  EXPECT: proof OK
  EVIDENCE: exit=0; "proof-published OK", "proof OK". "Jeff" and "WhatsApp
    assistant answers" are absent, each proven detectable first against a
    positive control built from the brief's own sentence. Every client claim on
    the page is also present verbatim in src/content/searchPages.ts, which is
    the already-published, permissioned content. No [TO COME on the page.
    CHANGED DURING THE WORK: this gate first required VISIBLE placeholders for
    the missing testimonial and the JCCI members question. verify-seo.mjs
    forbids "[TO COME:" on any INDEXED route, site-wide, and it was right —
    scaffolding in front of a registrant is worse than a column that is simply
    true. The placeholders came off the page and the unapproved claims were
    replaced with TaiAscend's and Demure International's published, named
    results. What is still owed moved to the operations doc, which this gate
    now also checks.

- [x] G5: the VIP seat cannot quietly take money
  CHECK: node scripts/verify-jcci-webinar.mjs vip
  EXPECT: vip OK
  EVIDENCE: exit=0; "vip-fallback OK", "vip OK". WHOP_PLANS.vipSeat is null, so
    no checkout renders; the built page shows "[TO COME: the VIP Seat: the
    Private Hour checkout]" and a WhatsApp claim button, says nothing about a
    payment having happened, and the registration row is written before the VIP
    route is taken. Confirmed in the browser: h1 reads "Your webinar seat is
    saved.", not "You're a VIP."

- [x] G6: both thank-you routes prerender and hand over something real
  CHECK: node scripts/verify-jcci-webinar.mjs thanks
  EXPECT: thanks OK
  EVIDENCE: exit=0; "thanks OK", "thanks-referral OK". The Brain Builder is a
    real 13-page PDF (resources/business-brain-worksheet.pdf, copied to
    public/downloads/ and present in dist/). Browser: GET
    /downloads/business-brain-worksheet.pdf -> 200, application/pdf, 237 KB.
    Both pages carry the download, the WhatsApp group, the calendar links and
    the VIP offer; the referral block needs the registrant's email, so it is
    absent from the cold prerender by design and asserted in source.

- [x] G7: consent is stored, not assumed, and a missing migration does not lose
        the lead
  CHECK: node scripts/verify-jcci-webinar.mjs capture
  EXPECT: capture OK
  EVIDENCE: exit=0; "capture-schema OK", "capture-insert OK", "capture-form OK".
    schema.sql adds business, consent and seat as idempotent ALTERs;
    registerForWebinar splits the row into `full` and `base` and retries with
    `base` if the first insert is refused, so a site deployed before the
    migration runs still keeps the registration. Browser: submitting with the
    box unticked is refused with "Tick the box and I can send you the link."

- [x] G8: the countdown never goes negative, and a passed session stops selling
  CHECK: node scripts/verify-jcci-webinar.mjs countdown
  EXPECT: countdown OK
  EVIDENCE: exit=0; "countdown-past OK" x2, "countdown OK". msUntilStart is
    60000 at one minute before, 0 at the start and 0 a day after; sessionHasPassed
    flips either side of the start; both the form and the page branch on it; the
    prerendered HTML contains no baked clock (the digits mount on the client).
    Browser: the bar ticks, reading 06D : 23H : 07M : 59S.

- [x] G9: the dated session produces real Event markup and a real calendar link
  CHECK: node scripts/verify-event-schema.mjs && echo JCCI_EVENT_OK
  EXPECT: JCCI_EVENT_OK
  EVIDENCE: exit=0; "/webinar: Event for 2026-11-18T16:00:00Z", "event-schema OK".
    This gate returned no Event for /webinar before today, because the session
    had no date.

- [x] G10: the new copy passes the house voice gate, built and in source
  CHECK: node scripts/verify-voice.mjs check && node scripts/verify-voice.mjs source
  EXPECT: source voice verification passed
  EVIDENCE: exit=0; "voice verification passed"; "source voice verification
    passed: 115 files, no banned words". /webinar scores 7.9 words a sentence,
    1% over 25 words, 6.4 you-or-I per 100 words. First run failed: /webinar/thanks
    had 6% of sentences over 25 words (the VIP paragraph), now split.

- [x] G11: the pre-existing site checks still pass on both hosts
  CHECK: node scripts/verify-seo.mjs && node scripts/verify-referral.mjs schema && node scripts/verify-referral.mjs insert && node scripts/verify-referral.mjs lib && node scripts/verify-referral.mjs share && echo JCCI_REGRESSION_OK
  EXPECT: JCCI_REGRESSION_OK
  EVIDENCE: exit=0. "SEO verification passed: 56 routes, 42 sitemap URLs, 3467
    internal references; negative controls passed"; referral schema/insert/lib/share
    all OK.
    verify-seo.mjs NEEDED A CHANGE, and the change is part of this work: its
    rule banned Event markup on every page outright. That rule was written when
    no session on the site had a date, so no page could emit an Event; now one
    does. It is narrowed to ban AggregateRating and Review outright (nobody has
    given us ratings) and to allow Event only on a route that src/seo/routes.ts
    holds a real, still-future dated session for, with a control asserting a
    route with no session is never allowed one.
    Nested routes work on BOTH hosts: dist/_redirects gains
    "/webinar/thanks /webinar/thanks.html 200" and "/webinar/vip ... 200" for
    Pages, and .htaccess resolves them through its existing
    "%{DOCUMENT_ROOT}/$1.html -f" rule for Apache. dist/webinar/thanks.html and
    dist/webinar/vip.html both exist.
    EXCLUDED, pre-existing failures, each verified by stashing this work and
    re-running against the committed tree: verify-mobile.mjs host-portable (G23
    wants an SPA wildcard fallback in public/_redirects, which a later decision
    deliberately removed: "No wildcard 200 fallback: unknown URLs must remain
    404s"), verify-search-behavior, verify-private-ai and verify-corporate. The
    same exclusion is recorded in GATES-own-intelligence.md.

- [x] G12: the reminder sequence and everything waiting on a person are written
        down where Phila will find them
  CHECK: node scripts/verify-jcci-webinar.mjs ops
  EXPECT: ops OK
  EVIDENCE: exit=0; "ops OK". docs/operations/jcci-webinar-reminders.md holds all
    seven reminders plus the VIP one, the seven blocking confirmations (JCCI,
    the Whop plan, the migration, Sandile's testimonial, the video, the referral
    reward, the 10-vs-15-hours figure) and the table of what each row records.

- [x] G13: the page works on a phone and with reduced motion
  MANUAL: drove /webinar, /webinar/thanks and /webinar/vip in the built-in
  browser at 375x812 and at desktop width.
  EVIDENCE: no console errors on any of the three. At 375px every page reports
    documentElement.scrollWidth === clientWidth === 375, so nothing overflows
    sideways; exactly one H1 each. The form: submitting empty gives "Tell me your
    name, so I know whose seat it is."; filled but unticked gives "Tick the box
    and I can send you the link."; ticked advances to "STEP 2 OF 2 · CHOOSE YOUR
    SEAT / Which seat, Thabo? / Free Seat R0 / VIP Seat R497". Motion: the page
    runs ONE animation, the pre-existing client-logo marquee, whose keyframes
    are declared only inside @media (prefers-reduced-motion: no-preference) in
    src/index.css (line 308), so reduced motion leaves a static wrapped row. No
    element on any of the three pages sits at opacity 0, so no content is gated
    behind an animation finishing.

- [x] G14: the ad plan and the page agree on every micro-segment, no segment can
        introduce a claim, and the shared prerendered page stays generic
  CHECK: node scripts/verify-jcci-webinar.mjs segments
  EXPECT: segments OK
  EVIDENCE: exit=0; "segments-page OK", "segments OK". 15 segments defined; every
    slug the ad plan points at exists in src/lib/segments.ts (proven able to
    fail: a bogus `dentists` row appended to the plan produced "the ad plan
    points at slugs the page does not know: dentists"). A segment's `proof` is a
    KEY into PROOF, never a sentence, so a segment cannot introduce a claim of
    its own. Each PROOF entry is checked against src/content/searchPages.ts: a
    client QUOTE must appear verbatim, a reported RESULT may be rephrased into
    the house voice but every name and figure in it must be published, with a
    control asserting an invented client ("Zephyr Holdings") and an invented
    figure ("47 hours") are both caught. The H1 is never segment-driven, the
    segment resolves after mount, and no segment's copy is prerendered into the
    page everyone shares.
    Browser: /webinar?seg=logistics swapped the opener to "Trucks, drivers,
    compliance, municipal contracts..." with the H1 unmoved; ?seg=beauty lifted
    Macaela Oor's quote above TaiAscend in the proof column, with one blockquote
    on the page (no duplicate); ?seg=not-a-real-segment fell back to the generic
    hero rather than breaking.
    CHANGED DURING THE WORK: the proof check first demanded a 60-character
    verbatim match and failed on the page's own TaiAscend line, which says the
    published fact in the house voice's shorter sentences. The gate was wrong,
    not the copy: it now separates a quotation (verbatim) from a reported result
    (rephrasable, but every name and figure checked).

- [x] G15: which ad set brought a registration is captured and stored, and a
        missing migration still does not lose the registration
  CHECK: node scripts/verify-jcci-webinar.mjs attribution
  EXPECT: attribution OK
  EVIDENCE: exit=0; "attribution-schema OK", "attribution-lib OK",
    "attribution-insert OK". schema.sql adds utm_source/medium/campaign/content/
    term and segment as idempotent ALTERs, plus the
    webinar_registrations_by_adset view the weekly throttle rule reads. The
    attribution fields ride inside `extra`, which the gate asserts positionally,
    so the missing-migration retry drops them rather than losing the lead.
    FOUND AND FIXED IN THE BROWSER: attribution was first read only at submit
    time, so sessionStorage was empty on arrival (gc_utm: null) and anyone who
    clicked a link before registering would have landed on the row with no ad
    set against their name -- the row the weekly throttle needs most.
    activeAttribution() is now called on mount. Verified after: gc_utm holds all
    five fields on arrival, and after a pushState to /webinar with no query
    string, activeAttribution().utm_content still returned "beauty-r60" and the
    segment still resolved.

- [x] G16: no heading disappears into its own background
  CHECK: node scripts/verify-jcci-webinar.mjs contrast
  EXPECT: contrast OK
  EVIDENCE: exit=0; "contrast OK (149 headings across 98 dark bands)", scanned
    across every prerendered page on the site, not just this one.
    WHY IT EXISTS: Phila found five headings on /webinar rendering midnight on
    midnight -- present, correct, and invisible. src/index.css sets
    `h1, h2, h3, h4 { color: var(--color-midnight) }` in the base layer, and an
    element's own rule beats a colour inherited from its parent, so a heading in
    a <Section dark> never picks up the section's `text-cream`. The <Lead>
    component set no colour, so all five dark-band headings vanished. Every
    other gate reads TEXT, and invisible text passes all of them: the voice gate
    scored those headings, the page gate asserted their words were present.
    The fix: <Lead dark> on the five dark sections, which the component now
    requires. The gate asserts what the bug actually was -- a heading on a dark
    band with NO explicit colour decision anywhere in it or its contents.
    Two refinements, both from false positives it raised on its first run: an
    explicit `text-midnight` is allowed, because a dark band can hold a light
    card (the seat form sits on bg-paper inside the dark hero and is correctly
    midnight); and the heading's INNER markup counts, because /workshop's
    animated heading is a bare <h2> around a coloured span. Controls assert a
    colourless heading is flagged and a coloured one is not.

DEFERRED (not a gate; an honest limitation): no end-to-end test submission was
made. `registerForWebinar` dual-writes to Supabase AND posts to the live "Reserve
Your Seat" Google Form, so pressing "Confirm my seat" would put a junk row in
Phila's real Sheet and real table. The same deferral is recorded in
GATES-referral.md. Fold it into the one real test registration after deploy, and
check that the row carries `seat`, `consent` and `business` — which is also how
you confirm the schema.sql migration actually ran. Make that test registration
from a full ad link (`?seg=...&utm_content=...`) and check it lands in
`webinar_registrations_by_adset`: until one real row proves that view fills, the
weekly throttle rule in the ad plan has nothing to read.
