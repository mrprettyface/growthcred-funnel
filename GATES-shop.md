# Gates: GrowthCred shop (`/shop`)

OWNS: `src/lib/shop.ts`, `src/pages/Shop.tsx`, `src/pages/ShopProduct.tsx`,
`src/components/shop/*`, `public/shop/`, `src/App.tsx`, `src/seo/routes.ts`,
`src/components/Layout.tsx`, `src/components/PageScenes.tsx`,
`src/components/GuideOffer.tsx`, `src/index.css`, `scripts/verify-shop.mjs`,
`GATES-shop.md`, `STATUS.md`

Scope: White, minimal `/shop` using Phila's 23 official `.webp` photos only
(no SVG/CSS tee mockups). GC Mark Black-only R549; Dream + FREE WiFi Black/White
R699; sizes S–3XL; payment-link placeholders with WhatsApp/mailto fallback;
rebuilt `dist/`.

- [x] G1: build prerenders `/shop` and all three product routes
- [x] G2: `node scripts/verify-shop.mjs` (23 webps in public + dist, no mockups)
- [x] G3: `npm run verify:seo`
- [x] G4: `node scripts/verify-voice.mjs check`
