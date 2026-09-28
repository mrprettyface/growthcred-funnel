# Gates: house voice across the site + law-firm article

OWNS: docs/editorial/VOICE.md, docs/editorial/law-firm-article.md, CLAUDE.md, AGENTS.md, scripts/verify-voice.mjs, scripts/verify-law-article.mjs, src/content/searchPages.ts, src/pages/SearchPage.tsx, src/components/GuideOffer.tsx, src/components/PageScenes.tsx, src/components/Layout.tsx, src/lib/*.ts, src/pages/*.tsx, src/components/*.tsx, docs/search/HUMAN-LAYER.md, STATUS.md, GATES-voice.md, dist/**

Scope: write the voice guide into the repo so every future AI session uses it, rewrite every page's copy to the guide without breaking the no-invented-proof rule, and publish a sourced law-firm article in that voice.

- [x] G1: the voice guide, structure, swipe file and fact rules live in the repo, and CLAUDE.md and AGENTS.md send every writing task to it
  CHECK: node scripts/verify-law-article.mjs guide
  EXPECT: voice guide verification passed
  EVIDENCE: exit=0; shell=/bin/sh; cwd=/Users/PhilaNgwenya/Projects/growthcred-funnel; path=f306a2d5df23/16 entries; output=voice guide verification passed

- [x] G2: the law-firm article follows the eight-part structure, repeats faster/cheaper/no risk, offers the guide mid-article, ends on Apply → /call, and carries only sourced figures (none of the pitch's unverifiable claims)
  CHECK: node scripts/verify-law-article.mjs copy
  EXPECT: law article copy verification passed
  EVIDENCE: exit=0; shell=/bin/sh; cwd=/Users/PhilaNgwenya/Projects/growthcred-funnel; path=f306a2d5df23/16 entries; output=law article copy verification passed

- [x] G3: production build and prerender succeed
  CHECK: npm run build
  EXPECT: Prerendered
  EVIDENCE: exit=0; shell=/bin/sh; cwd=/Users/PhilaNgwenya/Projects/growthcred-funnel; path=f306a2d5df23/16 entries; output=[plugin vite:reporter] | (!) /Users/PhilaNgwenya/Projects/growthcred-funnel/src/seo/routes.ts is dynamically imported by /Users/PhilaNgwenya/Projects/growthcred-funnel/src/seo/Metadata.tsx but also statically imported by /Users/PhilaNgwenya

- [x] G4: every prerendered page passes the voice check (no banned words or textbook headings; avg sentence ≤ 12.5 words; ≤ 3% over 25 words; ≥ 5 you/I per 100 words), with negative controls
  CHECK: node scripts/verify-voice.mjs check
  EXPECT: voice verification passed
  EVIDENCE: exit=0; shell=/bin/sh; cwd=/Users/PhilaNgwenya/Projects/growthcred-funnel; path=f306a2d5df23/16 entries; output=voice verification passed

- [x] G5: no banned word survives anywhere in source copy, including gated funnel pages the prerender skips; bullet lists on search pages cut to real checklists (≤ 12)
  CHECK: node scripts/verify-voice.mjs source
  EXPECT: source voice verification passed
  EVIDENCE: exit=0; shell=/bin/sh; cwd=/Users/PhilaNgwenya/Projects/growthcred-funnel; path=f306a2d5df23/16 entries; output=source voice verification passed: 101 files, no banned words; 9 checklists on search pages.

- [x] G6: the article is indexed, in the sitemap, linked from /resources and /ai-for-law-firms, and its guide button opens the opt-in
  CHECK: node scripts/verify-law-article.mjs integration
  EXPECT: law article integration verification passed
  EVIDENCE: exit=0; shell=/bin/sh; cwd=/Users/PhilaNgwenya/Projects/growthcred-funnel; path=f306a2d5df23/16 entries; output=law article integration verification passed

- [x] G7: every pre-existing content verifier still passes (SEO, on-page SEO, finance-law, value articles, stories, strategy home, corporate, bundle budget), and the human layer has no failure beyond the three corporate-byline lines that already failed at HEAD 1a33a45 (five of HEAD's eight failures fixed)
  CHECK: node scripts/verify-seo.mjs && node scripts/verify-seo-onpage.mjs && node scripts/verify-finance-law.mjs copy && node scripts/verify-finance-law.mjs integration && node scripts/verify-value-articles.mjs copy && node scripts/verify-value-articles.mjs integration && node scripts/verify-stories.mjs && node scripts/verify-strategy-home.mjs && node scripts/verify-corporate.mjs page && node scripts/verify-corporate.mjs roi && node scripts/verify-bundle-budget.mjs && node scripts/verify-law-article.mjs humanlayer && echo ALL-EXISTING-VERIFIERS-PASS
  EXPECT: ALL-EXISTING-VERIFIERS-PASS
  EVIDENCE: exit=0; shell=/bin/sh; cwd=/Users/PhilaNgwenya/Projects/growthcred-funnel; path=f306a2d5df23/16 entries; output=human layer: no new failures (3 pre-existing corporate line(s) tolerated) | ALL-EXISTING-VERIFIERS-PASS

- [x] G8: the price and plan-ID rule still holds (no price text changed against src/lib/offers.ts)
  CHECK: node scripts/verify-law-article.mjs prices
  EXPECT: price verification passed
  EVIDENCE: exit=0; shell=/bin/sh; cwd=/Users/PhilaNgwenya/Projects/growthcred-funnel; path=f306a2d5df23/16 entries; output=price verification passed

- [x] G9: browser review of the article and a sample of rewritten pages: readable, guide button opens the card, no layout breakage at phone width
  EVIDENCE: 29 Sep 2026, vite preview of the built site (localhost:4173). /guides/law-firm-billing-leakage: one H1, hero and drawing render; closed the auto-opened card (0 dialogs), clicked the in-article "Send me the guide" → 1 dialog (opens despite the 14-day rest); with state=claimed the same click navigated to /ai-implementation-guide. At 375px: closing "Want us to do this for you? Apply." block renders and links /call; scrollWidth 375 on the article and on /ai-for-law-firms, /corporate-ai-training, /stories/mne-waste, /guides/ai-challenges-south-africa, /about, /, /ai-implementation-guide, /guides/how-we-work-first-30-days, each with one H1. No console errors. Read-through: copy keeps every client fact as reported (TaiAscend, MNE Waste, Macaela's quote verbatim).
