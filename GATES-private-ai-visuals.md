# Gates: /private-ai visuals

OWNS: src/components/PrivateAiScenes.tsx, src/pages/PrivateAi.tsx, src/lib/privateAi.ts, src/index.css, scripts/verify-private-ai.mjs, scripts/verify-mobile.mjs, public/images/private-ai/**, GATES-private-ai-visuals.md, STATUS.md, dist/**

Scope: break up /private-ai with a drawn scene in every section, real GrowthCred photos where they are honest, and approved free-licence photos, so no section is a wall of text; scenes pop in on scroll only where motion is welcome.

- [x] G1: the built page shows at least 18 distinct drawn scenes, and every text section carries at least one visual
  CHECK: node scripts/verify-private-ai.mjs visuals
  EXPECT: private-ai visuals verification passed
  EVIDENCE: exit=0; shell=/bin/sh; cwd=/Users/PhilaNgwenya/Projects/growthcred-funnel; path=f306a2d5df23/16 entries; output=private-ai visuals verification passed

- [x] G2: the pop animation is CSS-only, scroll-driven, transform/opacity only, and exists only under prefers-reduced-motion: no-preference
  CHECK: node scripts/verify-private-ai.mjs motion
  EXPECT: private-ai motion verification passed
  EVIDENCE: exit=0; shell=/bin/sh; cwd=/Users/PhilaNgwenya/Projects/growthcred-funnel; path=f306a2d5df23/16 entries; output=private-ai motion verification passed

- [x] G3: every photo on the page has descriptive alt text, a caption that doesn't overclaim, and its file ships in dist
  CHECK: node scripts/verify-private-ai.mjs photos
  EXPECT: private-ai photos verification passed
  EVIDENCE: exit=0; shell=/bin/sh; cwd=/Users/PhilaNgwenya/Projects/growthcred-funnel; path=f306a2d5df23/16 entries; output=private-ai photos verification passed: 6 photos

- [x] G4: the page's copy, reach and every pre-existing check still pass
  CHECK: node scripts/verify-private-ai.mjs page && node scripts/verify-private-ai.mjs reach && node scripts/verify-own-intelligence.mjs suite
  EXPECT: own-intelligence suite passed
  EVIDENCE: exit=0; shell=/bin/sh; cwd=/Users/PhilaNgwenya/Projects/growthcred-funnel; path=f306a2d5df23/16 entries; output=private-ai reach verification passed | own-intelligence suite passed: 33 existing checks

- [x] G5: stock photos: each one approved by Phila by file, source and licence before download
  EVIDENCE: 29 Sep 2026 Phila approved 3 of 4 offered (declined the server rack, which shows hardware). Downloaded at 1200px from Unsplash under the Unsplash License: joburg-skyline.jpg (Simon Hurry, 268038 B, 1200x727), team-laptop.jpg (UK Black Tech, 138085 B, 1200x800), stacks-of-files.jpg (Wesley Tingey, 186529 B, 1200x800), all image/jpeg, viewed before use; provenance recorded in src/lib/privateAi.ts PHOTOS. On the built page all three load at naturalWidth 1200 (checked in preview), placed in #pain, #wrong-call and behind #close.

- [x] G6: visual review at desktop and phone width: scenes read at card size, photos load, nothing overflows
  EVIDENCE: 29 Sep 2026, built site via vite preview :4174. 347px pane (narrow phone): hero drawing (person beside own AI in a house) full width and legible; hero CTA no longer wraps after the whitespace-nowrap fix (height 56px, one line); #pain paste drawing (document flying to a cloud, gold document) reads above the 78% stat; #how audit/deploy/embed drawings beside 01/02/03 at opacity 1, scale 1 (computed); scrollWidth 347 = innerWidth. 1200px: hero two-column with drawing card; #fixes cards each open on a drawing. Photos: Phila (evidence) and the WeWork session (how) load with width/height set.
