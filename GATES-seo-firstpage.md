# Gates: first-page SEO checklist

OWNS: src/content/searchPages.ts, src/components/PageScenes.tsx, src/pages/SearchPage.tsx, src/seo/routes.ts, src/components/Layout.tsx, src/lib/supabase.ts, src/App.tsx, src/pages/Contact.tsx, src/components/ContactForm.tsx, public/.htaccess, public/_headers, scripts/verify-seo-onpage.mjs, scripts/verify-bundle-budget.mjs, scripts/verify-hosts-reposition.mjs

Scope: Implement every on-site item of the SEO checklist honestly — technical, on-page, trust and bottom-of-funnel — and keep it enforced; off-site items are listed for the owner.

- [x] S1: the site builds, type-checks and prerenders every page
  CHECK: npm run build
  EXPECT: /route documents generated/
  EVIDENCE: exit=0; shell=/bin/sh; cwd=/Users/PhilaNgwenya/Projects/growthcred-funnel; path=d31f0ce6dc1c/18 entries; output=✓ built in 461ms | Prerendered 37 complete pages; 43 route documents generated.

- [x] S2: sitemap, robots, canonicals, schema and link integrity pass
  CHECK: npm run verify:seo
  EXPECT: /SEO verification passed/
  EVIDENCE: exit=0; shell=/bin/sh; cwd=/Users/PhilaNgwenya/Projects/growthcred-funnel; path=d31f0ce6dc1c/18 entries; output=> node scripts/verify-seo.mjs | SEO verification passed: 43 routes, 32 sitemap URLs, 1748 internal references; negative controls passed.

- [x] S3: every indexed page meets the on-page checklist; FAQ schema matches visible text; no doorway market pages; confirmed data page indexed and linked sitewide
  CHECK: node scripts/verify-seo-onpage.mjs
  EXPECT: /on-page SEO verification passed/
  EVIDENCE: exit=0; shell=/bin/sh; cwd=/Users/PhilaNgwenya/Projects/growthcred-funnel; path=d31f0ce6dc1c/18 entries; output=on-page SEO verification passed: 32 indexed pages; titles, descriptions, headings, alt text, links and CTAs clean; FAQ schema on 15 pages matches visible text; market pages at most 15% shared text; negative controls passed.

- [x] S4: page speed budget holds; supabase-js stays off the critical path
  CHECK: node scripts/verify-bundle-budget.mjs
  EXPECT: /bundle budget passed/
  EVIDENCE: exit=0; shell=/bin/sh; cwd=/Users/PhilaNgwenya/Projects/growthcred-funnel; path=d31f0ce6dc1c/18 entries; output=bundle budget passed: main chunk 63301 B gz (≤ 70000), up-front total 141869 B gz (≤ 150000); supabase-js loads on demand.

- [x] S5: HTTPS-only (HSTS) on both hosts; nothing redirects /workshop on Apache or Pages
  CHECK: node scripts/verify-hosts-reposition.mjs
  EXPECT: /hosts-reposition verification passed/
  EVIDENCE: exit=0; shell=/bin/sh; cwd=/Users/PhilaNgwenya/Projects/growthcred-funnel; path=d31f0ce6dc1c/18 entries; output=hosts-reposition verification passed

- [x] S6: client stories remain indexed articles that say only what clients said
  CHECK: node scripts/verify-stories.mjs
  EXPECT: /stories verification passed/
  EVIDENCE: exit=0; shell=/bin/sh; cwd=/Users/PhilaNgwenya/Projects/growthcred-funnel; path=d31f0ce6dc1c/18 entries; output=stories verification passed

- [x] S7: forms and analytics behaviour unchanged by the lazy database client
  CHECK: npm run verify:search-behavior
  EXPECT: /Search behavior verification passed/
  EVIDENCE: exit=0; shell=/bin/sh; cwd=/Users/PhilaNgwenya/Projects/growthcred-funnel; path=d31f0ce6dc1c/18 entries; output=> node scripts/verify-search-behavior.mjs | Search behavior verification passed: expired/undated sessions, no-ID/no-consent analytics, PII filtering, safe page URLs, successful leads and purchase deduplication.

- [x] S8: off-page actions (Search Console, Bing, Business Profile eligibility, partner links, reviews) handed to the owner as a checklist
  EVIDENCE: manual review 2026-09-24 — docs/search/GROWTH-PLAN.md, section "Owner actions for first-page rankings", nine ordered actions; each needs owner accounts, DNS or relationships, so none can be done from the repo.
