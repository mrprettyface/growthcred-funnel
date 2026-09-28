# Gates: /private-ai sales page

OWNS: scripts/verify-seo.mjs, src/lib/analytics.ts, src/lib/privateAi.ts, src/lib/privateAiSeo.ts, src/pages/PrivateAi.tsx, src/App.tsx, src/seo/routes.ts, src/components/Layout.tsx, src/lib/home.ts, src/pages/Home.tsx, scripts/verify-private-ai.mjs, scripts/verify-own-intelligence.mjs, scripts/verify-mobile.mjs, GATES-private-ai.md, STATUS.md, dist/**

Scope: a long-form, indexed sales page for the Command Core as private AI, written in the house voice, that ties only verified third-party facts to the reader's pain, and is reachable from the nav, footer and homepage.

- [x] G1: the built page has every section, each verified figure beside its linked source, none of the rejected claims, no hardware or model names, the verbatim guarantee, the guide offer, the apply link, FAQ and Service structured data, and a sitemap entry
  CHECK: node scripts/verify-private-ai.mjs page
  EXPECT: private-ai page verification passed
  EVIDENCE: exit=0; shell=/bin/sh; cwd=/Users/PhilaNgwenya/Projects/growthcred-funnel; path=f306a2d5df23/16 entries; output=private-ai page verification passed

- [x] G2: the page is linked from the header nav, the footer and the homepage ownership section
  CHECK: node scripts/verify-private-ai.mjs reach
  EXPECT: private-ai reach verification passed
  EVIDENCE: exit=0; shell=/bin/sh; cwd=/Users/PhilaNgwenya/Projects/growthcred-funnel; path=f306a2d5df23/16 entries; output=private-ai reach verification passed

- [x] G3: the homepage, nav and /call gates from GATES-own-intelligence still pass
  CHECK: node scripts/verify-own-intelligence.mjs home && node scripts/verify-own-intelligence.mjs nav && node scripts/verify-own-intelligence.mjs call
  EXPECT: own-intelligence call verification passed
  EVIDENCE: exit=0; shell=/bin/sh; cwd=/Users/PhilaNgwenya/Projects/growthcred-funnel; path=f306a2d5df23/16 entries; output=own-intelligence nav verification passed | own-intelligence call verification passed

- [x] G4: every pre-existing site check still passes, including the house-voice check on the new page
  CHECK: node scripts/verify-own-intelligence.mjs suite
  EXPECT: own-intelligence suite passed
  EVIDENCE: exit=0; shell=/bin/sh; cwd=/Users/PhilaNgwenya/Projects/growthcred-funnel; path=f306a2d5df23/16 entries; output=own-intelligence suite passed: 33 existing checks

- [x] G5: each figure on the page matches what its source says (checked against the sources on 29 Sep 2026)
  EVIDENCE: fetched 29 Sep 2026. Harvey blog: "$550M funding round at a $15.5B valuation", published September 9, 2026. Stanford HAI AI Index 2025: open-weight models "reducing the performance difference from 8% to 1.7%" in a year. arXiv 2509.18101 (Pan, Chodnekar, Roy, Wang): small models "break even within 3 months", medium "3.8 to 34 months", large "3.5–69.3 months" — page says within 3 / about 4 to 34 / up to 69; the pasted "9 to 18 months" is absent from the paper. Databricks Altana page: "training and deploying models more than 20 times faster", 20-50% better model performance, "All customer data is kept separate and private". POPIA s72(1): transfer abroad needs adequate protection (law, binding rules or agreement) or consent. Microsoft/LinkedIn WTI 2024: 78% bring their own AI tools (same source already on /corporate-ai-training). Rejected: Abacus.AI 80% (firm unnamed, no private deployment stated), Echnotek (anonymous, no results), $100k–$500k licences (untraceable video timestamp).

- [x] G6: visual review at desktop and phone width, with no horizontal scroll, and the guide button opens the opt-in card
  EVIDENCE: 29 Sep 2026, built site via vite preview :4174, /private-ai prerendered and hydrated. 1200px: hero, #pain (78% card with source), #evidence (three sourced figures), #cost (break-even table with source) reviewed; Command Core nav item active. Guide callout button click opened the opt-in dialog ("FREE GUIDE … The AI Implementation Guide"). 375px: scrollWidth 375 = innerWidth at top and at #cost; cost rows stack label-over-figure after the fix (no "set-/ups" break).
