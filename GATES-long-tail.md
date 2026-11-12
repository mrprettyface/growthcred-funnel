# Gates: long-tail situations and three offer pages

OWNS: src/content/searchPages.ts, src/components/Layout.tsx, src/components/PageScenes.tsx, src/lib/privateAi.ts, src/pages/PrivateAi.tsx, src/seo/routes.ts, public/llms.txt, scripts/verify-long-tail.mjs, STATUS.md, GATES-long-tail.md, dist/**

Scope: three buyer-situation guides and three offer pages (Quote Engine, Company Brain, New Hire Trainer). No named supplier, no invented before/after, no price, no NP Digital pitch. Phila deploys from this branch's `dist/`. Do not merge from here.

- [x] G1: the six routes are indexed, in the sitemap and llms.txt, linked from nav or the resources grid, and free of forbidden proof
  CHECK: node scripts/verify-long-tail.mjs
  EXPECT: long-tail verification passed
  EVIDENCE: exit=0; output=long-tail verification passed: 6 pages indexed, linked and free of named clients, prices and borrowed pitches

- [x] G2: house voice passes on the built site, including the new pages
  CHECK: node scripts/verify-voice.mjs check && node scripts/verify-voice.mjs source
  EXPECT: voice verification passed
  EVIDENCE: exit=0; both checks passed; 9 checklists on search pages (max 12)

- [x] G3: production build, SEO manifest and search behavior still pass
  CHECK: npm run deploy:prepare && npm run verify:seo && npm run verify:search-behavior
  EXPECT: dist ready; SEO verification passed; Search behavior verification passed
  EVIDENCE: exit=0; Prerendered 54 complete pages; 60 route documents; SEO verification passed: 60 routes, 48 sitemap URLs; search behavior verification passed

- [x] G4: a browser pass opens each new page, follows Ask for an audit to /call, and finds the guides on /resources and the offers in the Solutions menu
  EVIDENCE: Preview at http://127.0.0.1:4173 on 25 Oct 2026. All six H1s matched. No K Force, Sandile, npdigital, Neil Patel or "book a call" in main. Each audit link is /call and the click landed on /call. Resources linked all three guides. Header linked all three offers. The POPIA situation page linked both existing guides and said to have a lawyer review. Mobile 390px on that page did not overflow. Quote Engine hero background is rgb(26, 26, 36) with cream type.

`node scripts/verify-seo-onpage.mjs` still fails on two titles that were already over or under the 50–60 character rule on main: `/` (69) and `/guides/private-ai-popia` (47). This PR does not change those titles.
