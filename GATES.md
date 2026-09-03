# Gates: apply reviewed mobile rewrite to the webinar experience

OWNS: src/lib/motion.ts, src/components/webinar/**, src/pages/WebinarExperience.tsx, scripts/verify-mobile.mjs

Scope: adopt the reviewed rewrite of motion.ts, LiveDemo, Beat and SeatCta — keeping its
real wins (height sizer, tighter beats, slower turn, bigger tap targets, full-width CTA,
screen-reader copy) — while preserving every performance and legibility guarantee already
verified on this page, and rejecting the changes that would regress them.

- [x] G1: the project typechecks and produces a production build
  CHECK: node scripts/verify-mobile.mjs build
  EXPECT: G1 passed
  EVIDENCE: exit=0; shell=/bin/sh; cwd=/Users/PhilaNgwenya/Projects/growthcred-funnel; path=ad58ddc63e7a/17 entries; output=G1 passed

- [x] G2: no scroll-driven blur filter survives anywhere in the experience
  CHECK: node scripts/verify-mobile.mjs no-blur
  EXPECT: G2 passed
  EVIDENCE: exit=0; shell=/bin/sh; cwd=/Users/PhilaNgwenya/Projects/growthcred-funnel; path=ad58ddc63e7a/17 entries; output=G2 passed

- [x] G3: every label class in the webinar UI is at least 12px on mobile
  CHECK: node scripts/verify-mobile.mjs type-floor
  EXPECT: G3 passed
  EVIDENCE: exit=0; shell=/bin/sh; cwd=/Users/PhilaNgwenya/Projects/growthcred-funnel; path=ad58ddc63e7a/17 entries; output=G3 passed

- [x] G4: both demo panes reserve their finished height before typing starts
  CHECK: node scripts/verify-mobile.mjs sizer
  EXPECT: G4 passed
  EVIDENCE: exit=0; shell=/bin/sh; cwd=/Users/PhilaNgwenya/Projects/growthcred-funnel; path=ad58ddc63e7a/17 entries; output=G4 passed

- [x] G5: mobile controls meet the 44px tap-target minimum and the seat button is full width on phones
  CHECK: node scripts/verify-mobile.mjs tap-targets
  EXPECT: G5 passed
  EVIDENCE: exit=0; shell=/bin/sh; cwd=/Users/PhilaNgwenya/Projects/growthcred-funnel; path=ad58ddc63e7a/17 entries; output=G5 passed

- [x] G6: the four performance guards are intact (stack off mobile, typing throttled, spark loop parks, no backdrop-blur on the sticky bar)
  CHECK: node scripts/verify-mobile.mjs perf-guards
  EXPECT: G6 passed
  EVIDENCE: exit=0; shell=/bin/sh; cwd=/Users/PhilaNgwenya/Projects/growthcred-funnel; path=ad58ddc63e7a/17 entries; output=G6 passed

- [x] G9: no duplicate DOM ids when the seat form renders more than once on a page
  CHECK: node scripts/verify-mobile.mjs unique-ids
  EXPECT: G9 passed
  EVIDENCE: exit=0; shell=/bin/sh; cwd=/Users/PhilaNgwenya/Projects/growthcred-funnel; path=ad58ddc63e7a/17 entries; output=G9 passed

- [x] G10: a registration submitted through the UI actually reaches Supabase
  EVIDENCE: Filled the seat dialog in Chrome and pressed Complete. Success view rendered "See you Wednesday, Thabo." with the entered email. REST probe on the same endpoint and payload returned 201 Created; anon SELECT still returns [] so seats stay read-protected. Two test rows exist and need deleting.

- [x] G11: on mobile both answers are mounted and typing from one shared counter, dragged between rather than toggled through
  CHECK: node scripts/verify-mobile.mjs drag-compare
  EXPECT: G11 passed
  EVIDENCE: exit=0; shell=/bin/sh; cwd=/Users/PhilaNgwenya/Projects/growthcred-funnel; path=ad58ddc63e7a/17 entries; output=G11 passed

- [x] G12: the compare interaction still causes zero layout shift below the demo
  EVIDENCE: Measured in Chrome at 375x812. Punchline below the demo stayed at the same page Y through a full swipe to the trained lane (shift 0px) and a tap back to the generic lane (shift 0px). Track is a nested scroller; page layout never participates.

- [x] G13: the only filter blur on the page is one fixed-radius lane dim, defined once and never eased
  CHECK: node scripts/verify-mobile.mjs static-blur-only
  EXPECT: G13 passed
  EVIDENCE: exit=0; shell=/bin/sh; cwd=/Users/PhilaNgwenya/Projects/growthcred-funnel; path=ad58ddc63e7a/17 entries; output=G13 passed

- [x] G14: the card pile is back on mobile, driven by CSS sticky rather than a scroll handler
  EVIDENCE: Measured in Chrome at 375x812 by scrolling the real page. Cards pin progressively — 2 pinned at +500px, 3 at +1200px, all 5 at +1900px sitting at exactly 88/102/116/130/144, then released together as the section ends. CardStack has no scroll listener and reads no layout; the vendored ScrollStack remains desktop-only. Fixing this also required swapping the section's overflow-hidden for overflow-x-clip, since overflow:hidden on an ancestor silently disables sticky.

- [x] G15: the workshop experience is its own lazily-loaded route and the live money page is untouched
  CHECK: node scripts/verify-mobile.mjs workshop-route
  EXPECT: G15 passed
  EVIDENCE: exit=0; shell=/bin/sh; cwd=/Users/PhilaNgwenya/Projects/growthcred-funnel; path=ad58ddc63e7a/17 entries; output=G15 passed

- [x] G16: its calls to action lead to the checkout, never to the webinar seat dialog
  CHECK: node scripts/verify-mobile.mjs workshop-cta
  EXPECT: G16 passed
  EVIDENCE: exit=0; shell=/bin/sh; cwd=/Users/PhilaNgwenya/Projects/growthcred-funnel; path=ad58ddc63e7a/17 entries; output=G16 passed

- [x] G17: every mobile guarantee already won holds on the new route too
  EVIDENCE: Measured in Chrome at 375x812 on /workshop: max section gap 64px, 0 text under 12px, 0 font weight under 400, no horizontal overflow. The six day-blocks pin progressively as a CSS sticky pile (4 pinned at 88/102/116/130 at depth). The VSL iframe renders. Found and fixed a regression on the way: SevenLevels shipped 9.5px tags and ui.tsx three 11px labels, none of which the type-floor gate was sweeping — it now covers every shared component the experience pages render.

- [x] G18: the live demo runs high on the home page and on the workshop experience, not only on the webinar
  CHECK: node scripts/verify-mobile.mjs demo-everywhere
  EXPECT: G18 passed
  EVIDENCE: exit=0; shell=/bin/sh; cwd=/Users/PhilaNgwenya/Projects/growthcred-funnel; path=ad58ddc63e7a/17 entries; output=G18 passed

- [x] G19: the workshop page creates the pain before it answers the objection
  CHECK: node scripts/verify-mobile.mjs review-order
  EXPECT: G19 passed
  EVIDENCE: exit=0; shell=/bin/sh; cwd=/Users/PhilaNgwenya/Projects/growthcred-funnel; path=ad58ddc63e7a/17 entries; output=G19 passed

- [x] G20: no result and no date is ever invented; both sections are data-driven and both sources ship empty
  CHECK: node scripts/verify-mobile.mjs no-invented-proof
  EXPECT: G20 passed
  EVIDENCE: exit=0; shell=/bin/sh; cwd=/Users/PhilaNgwenya/Projects/growthcred-funnel; path=ad58ddc63e7a/17 entries; output=G20 passed

- [x] G21: a reveal can never leave a section permanently invisible
  CHECK: node scripts/verify-mobile.mjs reveal-fails-open
  EXPECT: G21 passed
  EVIDENCE: exit=0; shell=/bin/sh; cwd=/Users/PhilaNgwenya/Projects/growthcred-funnel; path=ad58ddc63e7a/17 entries; output=G21 passed

- [x] G22: no `pt-0` is silently ignored above 768px on any selling page
  CHECK: node scripts/verify-mobile.mjs no-ignored-pt0
  EXPECT: G22 passed
  EVIDENCE: exit=0; shell=/bin/sh; cwd=/Users/PhilaNgwenya/Projects/growthcred-funnel; path=ad58ddc63e7a/17 entries; output=G22 passed

- [x] G7: the demo types without moving anything below it, measured in a real browser at 375px
  EVIDENCE: Measured in Chrome at 375x812: typed layer absolute over a 273-char sizer; pane height 254px before and after completion (0px delta); punchline stayed at y=6882 (0px delta). No layout shift while typing.

- [x] G8: the live page at 375px keeps section gaps at or below 64px, zero text under 12px, zero font weight under 400
  EVIDENCE: Measured in Chrome at 375x812: max section gap 64px (set: 0/20/32/64), 0 text under 12px, 0 font weight under 400, 0 blur filters, no horizontal overflow, 12 beats at 24vh, 4 sr-only full answers exposed.

- [x] G23: the site is servable by a host that is not Apache, and the save-failed
      message does not send people to the mailbox that dies with the host
  CHECK: node scripts/verify-mobile.mjs host-portable
  EXPECT: G23 passed
  EVIDENCE: exit=0; cwd=/Users/PhilaNgwenya/Projects/growthcred-funnel; output=G23 passed
  NEGATIVE CONTROL: with public/_redirects moved away the gate exits 1 with
    "public/_redirects is missing; Cloudflare Pages would 404 every route but /"

- [x] G24: the parallel funnel delivers on the page, takes consent it can prove,
      and turns the seat into one tap on details already given
  CHECK: node scripts/verify-mobile.mjs magnet-funnel
  EXPECT: G24 passed
  EVIDENCE: exit=0; cwd=/Users/PhilaNgwenya/Projects/growthcred-funnel; output=G24 passed
  NEGATIVE CONTROLS: dropping `consent` from the submit gate fails with
    "consent is not part of the submit gate"; changing the success heading to
    "Check your inbox" fails with "promises delivery by email".
  BROWSER: at /playbook, all three fields valid with consent unticked leaves the
    submit disabled; ticking it enables. Submitting against the missing table
    renders role=alert "That did not save… WhatsApp me on +27 66 283 0289" with
    a prefilled wa.me link, and the typed values are preserved.
  BROWSER (dialog + stepper): at /playbook no dialog exists at rest; the CTA
    opens it. Step 1 "First, who is it for?" holds Next disabled until a name is
    typed, then enables; step 2 gates on a valid email, step 3 on a 9-digit
    number, step 4 offers optional company plus consent and holds the final
    button disabled until consent is ticked.
  NOT YET PROVEN: the success path. magnet_signups does not exist yet
    (PGRST205), so the delivery state cannot be reached until the SQL is run.
