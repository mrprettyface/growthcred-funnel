# Gates: GrowthCred shop (`/shop`)

OWNS: `src/lib/shop.ts`, `src/pages/Shop.tsx`, `src/pages/ShopProduct.tsx`,
`src/components/shop/*`, `src/App.tsx`, `src/seo/routes.ts`,
`src/components/Layout.tsx`, `src/components/PageScenes.tsx`,
`src/components/GuideOffer.tsx`, `src/index.css`, `scripts/verify-shop.mjs`,
`GATES-shop.md`, `STATUS.md`

Scope: A publish-ready merch storefront at `/shop` with two tees (GC Mark Tee
R549, Dream Tee R699), CSS/SVG mockups using the official GrowthCred mark from
`resources/logo/` / `public/images/growthcred-mark.svg` (no invented GC arrow),
sizes S–3XL, payment-link placeholders with WhatsApp/mailto fallback, shipping
copy from config, Shop in the nav, and a rebuilt `dist/`.

- [x] G1: the site type-checks, builds and prerenders `/shop` and both product routes
  CHECK: `npm run build`
  EXPECT: /route documents generated/
- [x] G2: shop gate oracle passes (prices, shipping, nav, mark asset, buy fallback, no invented GC arrow SVG)
  CHECK: `node scripts/verify-shop.mjs`
  EXPECT: /shop verification passed/
- [x] G3: site-wide SEO gate passes with the new routes
  CHECK: `npm run verify:seo`
  EXPECT: /SEO verification passed/
- [x] G4: voice check passes on the built shop pages
  CHECK: `node scripts/verify-voice.mjs check`
  EXPECT: /voice verification passed/
