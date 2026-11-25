# Gates: GrowthCred shop (`/shop`)

OWNS: `src/lib/shop.ts`, `src/pages/Shop.tsx`, `src/pages/ShopProduct.tsx`,
`src/components/shop/*`, `src/App.tsx`, `src/seo/routes.ts`,
`src/components/Layout.tsx`, `src/components/PageScenes.tsx`,
`src/components/GuideOffer.tsx`, `src/index.css`, `public/images/shop/`,
`scripts/verify-shop.mjs`, `scripts/make-shop-qr.mjs`, `GATES-shop.md`,
`STATUS.md`

Scope: A white, minimal `/shop` with three tees (GC Mark R549, Dream R699,
FREE WiFi R699), Black/White colour selectors, CSS/SVG mockups using the
existing GrowthCred mark (GC arrow mark later), a real QR SVG to
growthcred.co.za, payment-link placeholders with WhatsApp/mailto fallback,
and a rebuilt `dist/`.

- [x] G1: build prerenders `/shop` and all three product routes
- [x] G2: `node scripts/verify-shop.mjs`
- [x] G3: `npm run verify:seo`
- [x] G4: `node scripts/verify-voice.mjs check`
