# Gates: Corporate AI training page

OWNS: src/pages/Corporate.tsx, src/components/ui.tsx, src/lib/corporate.ts, src/lib/corporateSeo.ts, src/components/CorporateScenes.tsx, src/components/CorporateRoi.tsx, src/components/CorporateEnquiry.tsx, src/App.tsx, src/seo/routes.ts, src/components/Layout.tsx, src/components/PageScenes.tsx, src/content/searchPages.ts, src/pages/SearchPage.tsx, src/lib/analytics.ts, scripts/verify-corporate.mjs, scripts/verify-seo-onpage.mjs, scripts/verify-mobile.mjs, STATUS.md, GATES-corporate.md

Scope: A prerendered, indexed `/corporate-ai-training` page in the Command Core design system that sells per-employee AI training to corporates on a measured "3× faster documents and reports" transformation — what they tried, why this is different, a live ROI model, delivery with follow-along packs, per-employee pricing without an invented rate, stick-figure scenes and Phila's real photos — linked from the nav, the footer and the existing training page, inventing no proof.

- [x] G1: the whole site type-checks, builds and prerenders
  CHECK: npm run build
  EXPECT: /route documents generated/
  EVIDENCE: exit=0; shell=/bin/sh; cwd=/Users/PhilaNgwenya/Projects/growthcred-funnel; path=d31f0ce6dc1c/18 entries; output=✓ built in 476ms | Prerendered 38 complete pages; 44 route documents generated.

- [x] G2: the site-wide SEO gate passes with the new route (title, canonical, schema, single h1, sitemap, internal links resolve)
  CHECK: npm run verify:seo
  EXPECT: /SEO verification passed/
  EVIDENCE: exit=0; shell=/bin/sh; cwd=/Users/PhilaNgwenya/Projects/growthcred-funnel; path=d31f0ce6dc1c/18 entries; output=> node scripts/verify-seo.mjs | SEO verification passed: 44 routes, 33 sitemap URLs, 1910 internal references; negative controls passed.

- [x] G3: the on-page SEO gate passes with /corporate-ai-training in its FAQ-required list (50–60 title, 120–160 description, FAQ schema matches visible text, ≥350 words, no heading skips, alt text, CTA)
  CHECK: node scripts/verify-seo-onpage.mjs
  EXPECT: /on-page SEO verification passed/
  EVIDENCE: exit=0; shell=/bin/sh; cwd=/Users/PhilaNgwenya/Projects/growthcred-funnel; path=d31f0ce6dc1c/18 entries; output=on-page SEO verification passed: 33 indexed pages; titles, descriptions, headings, alt text, links and CTAs clean; FAQ schema on 16 pages matches visible text; market pages at most 19% shared text; negative controls passed.

- [x] G4: the built page carries every required section, ≥8 drawn scenes, ≥3 real photos that exist, sourced research links, no invented per-employee price, a working enquiry form, and is linked from nav, footer and /ai-training-south-africa (with negative controls)
  CHECK: node scripts/verify-corporate.mjs page
  EXPECT: /corporate page verification passed/
  EVIDENCE: exit=0; shell=/bin/sh; cwd=/Users/PhilaNgwenya/Projects/growthcred-funnel; path=d31f0ce6dc1c/18 entries; output=corporate page verification passed: 12 sections, 14 drawn scenes, 1936 words; negative controls passed.

- [x] G5: the ROI figures prerendered on the page equal an independent recomputation from the rendered inputs, and carry the estimate disclaimer
  CHECK: node scripts/verify-corporate.mjs roi
  EXPECT: /corporate roi verification passed/
  EVIDENCE: exit=0; shell=/bin/sh; cwd=/Users/PhilaNgwenya/Projects/growthcred-funnel; path=d31f0ce6dc1c/18 entries; output=corporate roi verification passed: headline R3.2M, figures match an independent recomputation; negative control passed.

- [x] G6: the new page files are swept by the no-blur and 12px type-floor rules and pass
  CHECK: node scripts/verify-mobile.mjs no-blur && node scripts/verify-mobile.mjs type-floor && node scripts/verify-corporate.mjs swept
  EXPECT: /corporate files swept/
  EVIDENCE: exit=0; shell=/bin/sh; cwd=/Users/PhilaNgwenya/Projects/growthcred-funnel; path=d31f0ce6dc1c/18 entries; output=G3 passed | corporate files swept: 4 files in the mobile gates, no blur, 12px type floor held.

- [x] G7: the homepage's up-front download is unchanged in kind: bundle budget still passes (the new page is lazy)
  CHECK: node scripts/verify-bundle-budget.mjs
  EXPECT: /bundle budget passed/
  EVIDENCE: exit=0; shell=/bin/sh; cwd=/Users/PhilaNgwenya/Projects/growthcred-funnel; path=d31f0ce6dc1c/18 entries; output=bundle budget passed: main chunk 64729 B gz (≤ 70000), up-front total 144325 B gz (≤ 150000); supabase-js loads on demand.

- [x] G8: unrelated gates still pass (no collateral regression)
  CHECK: node scripts/verify-strategy-home.mjs && node scripts/verify-workshop-moved.mjs && node scripts/verify-stories.mjs && node scripts/wc-home.mjs
  EXPECT: /HOME_WORDCOUNT_OK/
  EVIDENCE: exit=0; shell=/bin/sh; cwd=/Users/PhilaNgwenya/Projects/growthcred-funnel; path=d31f0ce6dc1c/18 entries; output=stories verification passed | HOME_WORDCOUNT_OK: 1291 rendered words (range 900–2400)

- [x] G9: in the browser the page renders at desktop and phone width with no horizontal scroll and no console errors, and the ROI sliders change the result
  EVIDENCE: dev server, 25 Sep 2026. Desktop 1024px and mobile 375px (innerWidth 384 = scrollWidth 384, no horizontal scroll) screenshots of every section reviewed; fixed header nav wrapping (nav now lg+), photo-frame offset, 5-card squeeze, "3×" line break, duplicated founder name, header CTA overflow on phones. Sliders: employees 50→200 moved headline R3.2M→R12.8M, 2× toggle → R9.6M and R48,000/employee (hand-checked: 200×8×0.5×46×R260.87). Empty submit shows the validation alert; no real enquiry sent. read_console_messages onlyErrors: none.
