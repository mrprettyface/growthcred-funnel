# Gates: own your intelligence (homepage repositioning)

OWNS: docs/editorial/VOICE.md, src/lib/home.ts, src/pages/Home.tsx, src/components/PageScenes.tsx, src/pages/HomeFallback.tsx, src/components/Layout.tsx, src/pages/Call.tsx, src/seo/routes.ts, scripts/verify-own-intelligence.mjs, scripts/verify-strategy-home.mjs, scripts/verify-seo.mjs, GATES-own-intelligence.md, STATUS.md, dist/**

Scope: the homepage leads with "Let us help you own your intelligence." and sells the Command Core as private AI on equipment GrowthCred deploys, the site header becomes Harvey-style groups with dropdowns, /call carries the pitch, and every pre-existing check still passes.

- [x] G1: the built homepage has the new headline, sub, sections, honest labels, verbatim guarantee, new FAQs, title and description, and names no hardware or model
  CHECK: node scripts/verify-own-intelligence.mjs home
  EXPECT: own-intelligence home verification passed
  EVIDENCE: exit=0; shell=/bin/sh; cwd=/Users/PhilaNgwenya/Projects/growthcred-funnel; path=f306a2d5df23/16 entries; output=own-intelligence home verification passed

- [x] G2: every built page's header shows Command Core, Solutions, Customers, Security, Resources in order, with the dropdown links prerendered
  CHECK: node scripts/verify-own-intelligence.mjs nav
  EXPECT: own-intelligence nav verification passed
  EVIDENCE: exit=0; shell=/bin/sh; cwd=/Users/PhilaNgwenya/Projects/growthcred-funnel; path=f306a2d5df23/16 entries; output=own-intelligence nav verification passed

- [x] G3: /call carries the pitch and keeps its locked headline and fast form
  CHECK: node scripts/verify-own-intelligence.mjs call
  EXPECT: own-intelligence call verification passed
  EVIDENCE: exit=0; shell=/bin/sh; cwd=/Users/PhilaNgwenya/Projects/growthcred-funnel; path=f306a2d5df23/16 entries; output=own-intelligence call verification passed

- [x] G4: every pre-existing site check still passes (review-order, host-portable and verify-human-layer failed before this work and are excluded)
  CHECK: node scripts/verify-own-intelligence.mjs suite
  EXPECT: own-intelligence suite passed
  EVIDENCE: exit=0; shell=/bin/sh; cwd=/Users/PhilaNgwenya/Projects/growthcred-funnel; path=f306a2d5df23/16 entries; output=own-intelligence suite passed: 33 existing checks

- [x] G5: visual review at desktop and phone width: hero, new sections, dropdowns open and close by mouse and keyboard, mobile menu groups, no horizontal scroll
  EVIDENCE: 29 Sep 2026, built site via vite preview :4174 (prerendered "/" hydrated). 1280px: h1 "Let us help you own your intelligence." on three lines; #renting and #own render; Solutions opened by click (aria-expanded true, panel top 64px = header bottom), Escape closed it and returned focus to the button, outside mousedown closed it; Resources opened on real pointer hover and closed on leave. 375px: scrollWidth 375 = innerWidth; "20–40%" no longer splits (word joiner); mobile menu shows Command Core / Solutions (7) / Customers / Security / Resources (5) / Contact and scrolls; stage line renders under the sub.
