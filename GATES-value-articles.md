# Gates: three contrarian value articles

OWNS: src/content/searchPages.ts, src/pages/SearchPage.tsx, src/components/PageScenes.tsx, scripts/verify-value-articles.mjs, docs/editorial/value-article-audit.md, GATES-value-articles.md, STATUS.md, dist/**

Scope: publish three useful, evidence-safe articles with distinct contrarian theses, good internal and external links, and clear workshop and implementation next steps.

- [x] G1: the editorial audit identifies each draft's contrarian thesis, unsafe claims, revisions and search intent
  CHECK: node scripts/verify-value-articles.mjs audit
  EXPECT: value article audit verification passed
  EVIDENCE: exit=0; shell=/bin/sh; cwd=/Users/PhilaNgwenya/Projects/growthcred-funnel; path=38edeb523bdd/24 entries; output=value article audit verification passed

- [x] G2: all three articles provide actionable value, a distinct contrarian argument and no unsupported GrowthCred proof or guaranteed results
  CHECK: node scripts/verify-value-articles.mjs copy
  EXPECT: value article copy verification passed
  EVIDENCE: exit=0; shell=/bin/sh; cwd=/Users/PhilaNgwenya/Projects/growthcred-funnel; path=38edeb523bdd/24 entries; output=value article copy verification passed

- [x] G3: the production build and prerender complete successfully
  CHECK: npm run build
  EXPECT: Prerendered
  EVIDENCE: exit=0; shell=/bin/sh; cwd=/Users/PhilaNgwenya/Projects/growthcred-funnel; path=38edeb523bdd/24 entries; output=✓ built in 445ms | Prerendered 43 complete pages; 49 route documents generated.

- [x] G4: all three generated pages are indexed, internally discoverable, mutually relevant, and link to both the workshop and implementation application
  CHECK: node scripts/verify-value-articles.mjs integration
  EXPECT: value article integration verification passed
  EVIDENCE: exit=0; shell=/bin/sh; cwd=/Users/PhilaNgwenya/Projects/growthcred-funnel; path=38edeb523bdd/24 entries; output=value article integration verification passed

- [x] G5: the repository SEO verifier passes with the new articles in the generated site
  CHECK: npm run verify:seo
  EXPECT: SEO verification passed
  EVIDENCE: exit=0; shell=/bin/sh; cwd=/Users/PhilaNgwenya/Projects/growthcred-funnel; path=38edeb523bdd/24 entries; output=> node scripts/verify-seo.mjs | SEO verification passed: 49 routes, 38 sitemap URLs, 2505 internal references; negative controls passed.

- [x] G6: search behavior remains valid after publishing the articles
  CHECK: npm run verify:search-behavior
  EXPECT: Search behavior verification passed
  EVIDENCE: exit=0; shell=/bin/sh; cwd=/Users/PhilaNgwenya/Projects/growthcred-funnel; path=38edeb523bdd/24 entries; output=> node scripts/verify-search-behavior.mjs | Search behavior verification passed: expired/undated sessions, no-ID/no-consent analytics, PII filtering, safe page URLs, successful leads and purchase deduplication.

- [x] G7: final editorial and browser review confirms readable layouts, working next-step links, accurate source labelling and no conflict with the existing service pages
  EVIDENCE: Reviewed all three rendered routes in the local browser on 25 September 2026. Each has one H1, a route-specific illustration, readable section hierarchy, FAQs, author box, relevant next-reading links and visible workshop/implementation CTAs. Source labelling distinguishes public evidence from GrowthCred results. The proposal article is a detailed how-to, the existing proposal service page remains commercial, and the existing proposal-and-follow-up guide remains the concise safety primer.
