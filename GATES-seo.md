# Gates: SEO/AEO/GEO implementation
OWNS: src/**, scripts/**, public/**, dist/**, package.json, package-lock.json, index.html, vite.config.ts, docs/search/**, GATES-seo.md, PLAN-seo.md
Scope: Publish crawlable marketing pages, current offer states, useful search content, performance fixes and tracking capability to main; identify account/evidence-dependent work explicitly.
- [x] G1: Production build emits complete public HTML with valid metadata, sitemap, robots and schema.
  CHECK: npm run verify:seo
  EXPECT: SEO verification passed
  EVIDENCE: exit=0; shell=/bin/sh; cwd=/Users/PhilaNgwenya/Projects/growthcred-funnel; path=c551e9fb680b/24 entries; output=> node scripts/verify-seo.mjs | SEO verification passed: 25 routes, 14 sitemap URLs, 530 internal references; negative controls passed.
- [x] G2: Event expiry, analytics privacy/deduplication and protected-route indexing work under positive and negative controls.
  CHECK: npm run verify:search-behavior
  EXPECT: Search behavior verification passed
  EVIDENCE: exit=0; shell=/bin/sh; cwd=/Users/PhilaNgwenya/Projects/growthcred-funnel; path=c551e9fb680b/24 entries; output=> node scripts/verify-search-behavior.mjs | Search behavior verification passed: expired/undated sessions, no-ID/no-consent analytics, PII filtering, safe page URLs, successful leads and purchase deduplication.
- [x] G3: Mobile and desktop public pages, video, navigation and existing funnel behavior are verified without real purchases.
  EVIDENCE: docs/search/VERIFICATION.md: mobile/desktop/browser checks, local Apache HTTP suite and payment/referral regressions passed; no live transaction submitted.
- [x] G4: Published copy contains no fabricated event, price, case-study or accreditation facts; account prerequisites are documented.
  EVIDENCE: docs/search/RELEASE.md and GROWTH-PLAN.md: online/R990/details on registration confirmed by owner; factual/account prerequisites explicitly identified.
- [ ] G5: Reviewed website source and reproducible dist are committed and pushed to GitHub main.
  EVIDENCE: pending
- [x] G6: Owner-controlled cPanel deployment handoff is documented, per the user clarification.
  EVIDENCE: docs/search/RELEASE.md: Update from Remote then Deploy HEAD Commit; dist plus hidden files; post-deployment verify:http. User explicitly retained cPanel deployment.
