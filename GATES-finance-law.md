# Gates: finance and law firm market expansion

OWNS: src/content/searchPages.ts, src/pages/SearchPage.tsx, src/components/PageScenes.tsx, src/App.tsx, src/seo/routes.ts, src/components/Layout.tsx, src/lib/home.ts, scripts/verify-finance-law.mjs, docs/market-research/finance-and-law-firms.md, GATES-finance-law.md, STATUS.md

Scope: publish evidence-led finance and law-firm pages that teach useful fixes, present the workshop and implementation paths, and route qualified visitors into the existing GrowthCred funnels.

- [x] G1: the finance and law-firm market audit records sourced pains, appetite signals, priority segments, and claim boundaries
  CHECK: node scripts/verify-finance-law.mjs research
  EXPECT: finance-law research verification passed
  EVIDENCE: exit=0; shell=/bin/sh; cwd=/Users/PhilaNgwenya/Projects/growthcred-funnel; path=38edeb523bdd/24 entries; output=finance-law research verification passed

- [x] G2: both industry pages lead with specific operating problems, give a practical alternative, and explain workshop and implementation fit without invented proof
  CHECK: node scripts/verify-finance-law.mjs copy
  EXPECT: finance-law copy verification passed
  EVIDENCE: exit=0; shell=/bin/sh; cwd=/Users/PhilaNgwenya/Projects/growthcred-funnel; path=38edeb523bdd/24 entries; output=finance-law copy verification passed

- [x] G3: the production build and prerender complete successfully
  CHECK: npm run build
  EXPECT: Prerendered
  EVIDENCE: exit=0; shell=/bin/sh; cwd=/Users/PhilaNgwenya/Projects/growthcred-funnel; path=38edeb523bdd/24 entries; output=✓ built in 401ms | Prerendered 40 complete pages; 46 route documents generated.

- [x] G4: both generated industry routes are indexed, internally linked, and expose working calls to action for the workshop and implementation application
  CHECK: node scripts/verify-finance-law.mjs integration
  EXPECT: finance-law integration verification passed
  EVIDENCE: exit=0; shell=/bin/sh; cwd=/Users/PhilaNgwenya/Projects/growthcred-funnel; path=38edeb523bdd/24 entries; output=finance-law integration verification passed

- [x] G5: the repository SEO verifier passes with both new pages in the generated site
  CHECK: npm run verify:seo
  EXPECT: SEO verification passed
  EVIDENCE: exit=0; shell=/bin/sh; cwd=/Users/PhilaNgwenya/Projects/growthcred-funnel; path=38edeb523bdd/24 entries; output=> node scripts/verify-seo.mjs | SEO verification passed: 46 routes, 35 sitemap URLs, 2312 internal references; negative controls passed.

- [x] G6: search behavior remains valid after adding the industry pages
  CHECK: npm run verify:search-behavior
  EXPECT: Search behavior verification passed
  EVIDENCE: exit=0; shell=/bin/sh; cwd=/Users/PhilaNgwenya/Projects/growthcred-funnel; path=38edeb523bdd/24 entries; output=> node scripts/verify-search-behavior.mjs | Search behavior verification passed: expired/undated sessions, no-ID/no-consent analytics, PII filtering, safe page URLs, successful leads and purchase deduplication.

- [x] G7: final editorial review confirms the advice is useful, segment-specific, source-supported, and does not overstate GrowthCred results or regulated professional outcomes
  EVIDENCE: Reviewed both rendered pages in the local browser on 25 September 2026. Each names its priority segments, gives a four-step first workflow, links its public evidence, labels market research separately from GrowthCred proof, keeps regulated decisions with named professionals, and exposes both the workshop and implementation paths. The implementation CTA was clicked through to the working /call application route.
