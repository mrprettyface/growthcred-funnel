# Gates: Hyros-style homepage repositioning

OWNS: src/components/Layout.tsx, src/pages/Home.tsx, src/pages/HomeFallback.tsx, src/components/home/HomeChrome.tsx, src/index.css, src/lib/home.ts, src/lib/analytics.ts, src/App.tsx, src/seo/routes.ts, public/_redirects, scripts/verify-seo.mjs, scripts/verify-mobile.mjs, scripts/wc-home.mjs, scripts/verify-strategy-home.mjs, scripts/verify-workshop-moved.mjs, scripts/verify-hosts-reposition.mjs, scripts/verify-stories.mjs, src/content/searchPages.ts, src/components/PageScenes.tsx, src/pages/SearchPage.tsx, public/images/stories/**

Scope: Replace `/` with a high-ticket "Book a Strategy Call" page (Hyros grammar), move the R990 workshop funnel intact to `/workshop`, invent no proof, keep both hosts and all SEO/mobile gates green.

- [x] G1: the whole site builds, type-checks, and prerenders
  CHECK: npm run build
  EXPECT: /route documents generated/
  EVIDENCE: exit=0; shell=/bin/sh; cwd=/Users/PhilaNgwenya/Projects/growthcred-funnel; path=d31f0ce6dc1c/18 entries; output=✓ built in 381ms | Prerendered 37 complete pages; 43 route documents generated.

- [x] G2: SEO gate passes with the new `/` and the moved `/workshop`
  CHECK: npm run verify:seo
  EXPECT: /SEO verification passed/
  EVIDENCE: exit=0; shell=/bin/sh; cwd=/Users/PhilaNgwenya/Projects/growthcred-funnel; path=d31f0ce6dc1c/18 entries; output=> node scripts/verify-seo.mjs | SEO verification passed: 43 routes, 32 sitemap URLs, 1748 internal references; negative controls passed.

- [x] G3: the prerendered `/` is the Command Core page: one h1, Apply CTA to /call, no R990, no placeholder, disclaimer present
  CHECK: node scripts/verify-strategy-home.mjs
  EXPECT: /strategy home verification passed/
  EVIDENCE: exit=0; shell=/bin/sh; cwd=/Users/PhilaNgwenya/Projects/growthcred-funnel; path=d31f0ce6dc1c/18 entries; output=strategy home verification passed

- [x] G4: the R990 workshop funnel is intact at `/workshop`
  CHECK: node scripts/verify-workshop-moved.mjs
  EXPECT: /workshop-moved verification passed/
  EVIDENCE: exit=0; shell=/bin/sh; cwd=/Users/PhilaNgwenya/Projects/growthcred-funnel; path=d31f0ce6dc1c/18 entries; output=workshop-moved verification passed

- [x] G5: routing encodes Home at `/` and the workshop experience at `/workshop`
  CHECK: node scripts/verify-mobile.mjs workshop-route
  EXPECT: /G15 passed/
  EVIDENCE: exit=0; shell=/bin/sh; cwd=/Users/PhilaNgwenya/Projects/growthcred-funnel; path=d31f0ce6dc1c/18 entries; output=G15 passed

- [x] G6: workshop proof stays gated; the homepage benchmarks always carry their disclaimer
  CHECK: node scripts/verify-mobile.mjs no-invented-proof
  EXPECT: /G20 passed/
  EVIDENCE: exit=0; shell=/bin/sh; cwd=/Users/PhilaNgwenya/Projects/growthcred-funnel; path=d31f0ce6dc1c/18 entries; output=G20 passed

- [x] G7: the strategy page carries no scroll-driven blur utility
  CHECK: node scripts/verify-mobile.mjs no-blur
  EXPECT: /G2 passed/
  EVIDENCE: exit=0; shell=/bin/sh; cwd=/Users/PhilaNgwenya/Projects/growthcred-funnel; path=d31f0ce6dc1c/18 entries; output=G2 passed

- [x] G8: the strategy page holds the 12px type floor and weight >= 400
  CHECK: node scripts/verify-mobile.mjs type-floor
  EXPECT: /G3 passed/
  EVIDENCE: exit=0; shell=/bin/sh; cwd=/Users/PhilaNgwenya/Projects/growthcred-funnel; path=d31f0ce6dc1c/18 entries; output=G3 passed

- [x] G9: only the two sanctioned static blurs exist and no filter is eased
  CHECK: node scripts/verify-mobile.mjs static-blur-only
  EXPECT: /G13 passed/
  EVIDENCE: exit=0; shell=/bin/sh; cwd=/Users/PhilaNgwenya/Projects/growthcred-funnel; path=d31f0ce6dc1c/18 entries; output=G13 passed

- [x] G10: no bare pt-0 that Tailwind drops above 768px on the money pages
  CHECK: node scripts/verify-mobile.mjs no-ignored-pt0
  EXPECT: /G22 passed/
  EVIDENCE: exit=0; shell=/bin/sh; cwd=/Users/PhilaNgwenya/Projects/growthcred-funnel; path=d31f0ce6dc1c/18 entries; output=G22 passed

- [x] G11: both hosts serve the repositioned routes (new / and moved /workshop), no stale 301
  CHECK: node scripts/verify-hosts-reposition.mjs
  EXPECT: /hosts-reposition verification passed/
  EVIDENCE: exit=0; shell=/bin/sh; cwd=/Users/PhilaNgwenya/Projects/growthcred-funnel; path=d31f0ce6dc1c/18 entries; output=hosts-reposition verification passed

- [x] G12: the moved workshop pages keep the demo and the checkout CTA (unmoved-file regressions)
  CHECK: node scripts/verify-mobile.mjs demo-everywhere && node scripts/verify-mobile.mjs workshop-cta
  EXPECT: /G16 passed/
  EVIDENCE: exit=0; shell=/bin/sh; cwd=/Users/PhilaNgwenya/Projects/growthcred-funnel; path=d31f0ce6dc1c/18 entries; output=G18 passed | G16 passed

- [x] G13: the rendered `/` has enough context for readers and search (900–2,400 words), not a thin page
  CHECK: node scripts/wc-home.mjs
  EXPECT: /HOME_WORDCOUNT_OK/
  EVIDENCE: exit=0; shell=/bin/sh; cwd=/Users/PhilaNgwenya/Projects/growthcred-funnel; path=d31f0ce6dc1c/18 entries; output=HOME_WORDCOUNT_OK: 1288 rendered words (range 900–2400)

- [x] G14: unaffected mobile gates still pass (no collateral regression)
  CHECK: for g in sizer tap-targets drag-compare reveal-fails-open unique-ids perf-guards magnet-funnel; do node scripts/verify-mobile.mjs $g || exit 1; done
  EXPECT: /G24 passed/
  EVIDENCE: exit=0; shell=/bin/sh; cwd=/Users/PhilaNgwenya/Projects/growthcred-funnel; path=d31f0ce6dc1c/18 entries; output=G6 passed | G24 passed

- [x] G15: the client stories are indexed articles that say only what clients said, linked from the nav, the homepage and each other
  CHECK: node scripts/verify-stories.mjs
  EXPECT: /stories verification passed/
  EVIDENCE: exit=0; shell=/bin/sh; cwd=/Users/PhilaNgwenya/Projects/growthcred-funnel; path=d31f0ce6dc1c/18 entries; output=stories verification passed
