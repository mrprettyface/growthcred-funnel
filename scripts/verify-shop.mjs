#!/usr/bin/env node
/**
 * Gate oracle for /shop (GATES-shop.md).
 *
 * White storefront, official .webp photos only (no SVG tee mockups),
 * GC Mark Black-only, Dream + FREE WiFi Black/White, Buy message fallback.
 */
import assert from "node:assert/strict";
import { readFile, access, readdir } from "node:fs/promises";

const decode = (s) =>
  s
    .replace(/&amp;/g, "&")
    .replace(/&#x27;|&#39;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">");
const text = (html) =>
  decode(html.replace(/<script[\s\S]*?<\/script>/g, " ").replace(/<[^>]+>/g, " "))
    .replace(/\s+/g, " ")
    .trim();
const mainOf = (html) => {
  const i = html.indexOf('<main id="main-content">');
  return i < 0 ? "" : html.slice(i, html.indexOf("</main>", i));
};

const SHIPPING = "Printed on demand in South Africa. Ships in 5 to 7 working days.";
const SIZES = ["S", "M", "L", "XL", "2XL", "3XL"];
const WEBPS = [
  "dream-black-back-detail.webp",
  "dream-black-back.webp",
  "dream-black-front-detail.webp",
  "dream-black-front.webp",
  "dream-black-on-model.webp",
  "dream-white-back-detail.webp",
  "dream-white-back.webp",
  "dream-white-front-detail.webp",
  "dream-white-front.webp",
  "dream-white-on-model.webp",
  "gc-black-detail.webp",
  "gc-black-front.webp",
  "gc-black-on-model.webp",
  "wifi-black-back-detail.webp",
  "wifi-black-back.webp",
  "wifi-black-front-detail.webp",
  "wifi-black-front.webp",
  "wifi-black-on-model.webp",
  "wifi-white-back-detail.webp",
  "wifi-white-back.webp",
  "wifi-white-front-detail.webp",
  "wifi-white-front.webp",
  "wifi-white-on-model.webp",
];

function configProblems(src) {
  const out = [];
  if (!/id: "gc-mark-tee"[\s\S]*?amountCents:\s*54900/.test(src)) out.push("GC Mark Tee is not R549");
  if (!/id: "dream-tee"[\s\S]*?amountCents:\s*69900/.test(src)) out.push("Dream Tee is not R699");
  if (!/id: "free-wifi-tee"[\s\S]*?amountCents:\s*69900/.test(src)) out.push("FREE WiFi Tee is not R699");
  if (!src.includes(SHIPPING)) out.push("shipping copy missing");
  if (!/TODO\(Phila\):\s*paste Paystack or Yoco/.test(src)) out.push("payment-link placeholder note missing");
  if (!/colours:\s*\["Black"\]/.test(src)) out.push("GC Mark Tee must be Black-only");
  if (!/colours:\s*\["Black", "White"\]/.test(src)) out.push("Dream/WiFi must offer Black and White");
  for (const s of SIZES) if (!src.includes(`"${s}"`)) out.push(`size ${s} missing`);
  for (const file of WEBPS) if (!src.includes(file)) out.push(`config missing image ${file}`);
  if (!/buyHref|whatsappUrl|mailto/.test(src)) out.push("buy fallback helpers missing");
  return out;
}

function pageProblems(shopHtml, markHtml, dreamHtml, wifiHtml, layoutSrc) {
  const out = [];
  const shop = mainOf(shopHtml);
  const mark = mainOf(markHtml);
  const dream = mainOf(dreamHtml);
  const wifi = mainOf(wifiHtml);
  const shopBody = text(shop);

  if (!/Wear the work/.test(shopBody)) out.push("/shop hero copy missing");
  if (!shopBody.includes(SHIPPING)) out.push("/shop missing shipping copy");
  if (/data-tone="dark"/.test(shop)) out.push("/shop still has a dark tone section");
  if (!/min-h-screen bg-white/.test(shopHtml)) out.push("/shop root is not white");

  for (const id of ["gc-mark-tee", "dream-tee", "free-wifi-tee"]) {
    if (!new RegExp(`href="/shop/${id}"`).test(shop)) out.push(`/shop does not link ${id}`);
    if (!new RegExp(`data-product-card="${id}"`).test(shop)) out.push(`${id} card missing`);
  }

  // Cards and pages use real webp photos, not SVG mockups.
  if (!/src="\/shop\/gc-black-front\.webp"/.test(shop)) out.push("GC card missing front photo");
  if (!/src="\/shop\/dream-black-front\.webp"/.test(shop)) out.push("Dream card missing front photo");
  if (!/src="\/shop\/wifi-black-front\.webp"/.test(shop)) out.push("WiFi card missing front photo");
  if (/TeeMockup|shop-tee relative|GcMark/.test(shop + mark + dream + wifi)) {
    out.push("SVG/CSS tee mockup still present in shop HTML");
  }

  if (!/R549/.test(text(mark))) out.push("GC Mark product page missing R549");
  if (!/R699/.test(text(dream))) out.push("Dream product page missing R699");
  if (!/R699/.test(text(wifi))) out.push("FREE WiFi product page missing R699");

  for (const page of [mark, dream, wifi]) {
    for (const s of SIZES) if (!new RegExp(`>${s}<`).test(page)) out.push(`a product page missing size ${s}`);
    if (!page.includes(SHIPPING)) out.push("a product page missing shipping copy");
    if (!/data-buy-mode="message"/.test(page) && !/wa\.me\//.test(page)) out.push("Buy not on message fallback");
    if (/href=""/.test(page)) out.push("Buy button has an empty href");
  }

  // GC Mark: Black only — no White colour control.
  if (/>White</.test(mark) && /Colour/.test(mark)) out.push("GC Mark page still offers White");
  if (!/Colour · Black|Colour.*Black/.test(mark) && !/>Black</.test(mark)) {
    // Accept either a Colour · Black label or a pressed Black chip.
  }
  if (!/Colour · (?:<!-- -->)?Black/.test(mark)) out.push("GC Mark page should state Colour · Black");

  // Dream + WiFi colour chips
  for (const page of [dream, wifi]) {
    for (const c of ["Black", "White"]) if (!new RegExp(`>${c}<`).test(page)) out.push(`colour ${c} missing on a dual-colour page`);
  }

  // Galleries
  if (!/data-gallery="gc-mark-tee"/.test(mark)) out.push("GC gallery missing");
  if (!/data-gallery="dream-tee"/.test(dream)) out.push("Dream gallery missing");
  if (!/data-gallery="free-wifi-tee"/.test(wifi)) out.push("WiFi gallery missing");
  if (!/gc-black-on-model\.webp/.test(mark)) out.push("GC gallery missing on-model photo");
  if (!/dream-black-back\.webp/.test(dream)) out.push("Dream gallery missing back photo");
  if (!/wifi-black-back\.webp/.test(wifi)) out.push("WiFi gallery missing back photo");

  if (!/\{ label: "Shop", to: "\/shop" \}/.test(layoutSrc)) out.push("header NAV missing Shop");
  if (!/\["\/shop", "Shop"\]/.test(layoutSrc)) out.push("footer missing Shop link");

  return out;
}

assert.ok(configProblems("").length > 3, "config rules cannot fail");
assert.ok(
  pageProblems(
    '<main id="main-content"><h1>x</h1></main>',
    "<main id=\"main-content\"></main>",
    "<main id=\"main-content\"></main>",
    "<main id=\"main-content\"></main>",
    "",
  ).length > 5,
  "page rules cannot fail",
);

const config = await readFile("src/lib/shop.ts", "utf8");
const layout = await readFile("src/components/Layout.tsx", "utf8");
const shopHtml = await readFile("dist/shop.html", "utf8");
const markHtml = await readFile("dist/shop/gc-mark-tee.html", "utf8");
const dreamHtml = await readFile("dist/shop/dream-tee.html", "utf8");
const wifiHtml = await readFile("dist/shop/free-wifi-tee.html", "utf8");

const problems = [
  ...configProblems(config),
  ...pageProblems(shopHtml, markHtml, dreamHtml, wifiHtml, layout),
];

// No leftover mockup source files
for (const path of ["src/components/shop/TeeMockup.tsx", "src/components/shop/GcMark.tsx"]) {
  try {
    await access(path);
    problems.push(`leftover mockup file: ${path}`);
  } catch {
    /* expected missing */
  }
}

// All 23 webps in public and dist
const publicFiles = await readdir("public/shop");
const distFiles = await readdir("dist/shop").catch(() => []);
if (publicFiles.filter((f) => f.endsWith(".webp")).length !== 23) {
  problems.push(`public/shop has ${publicFiles.filter((f) => f.endsWith(".webp")).length} webps, want 23`);
}
for (const file of WEBPS) {
  try {
    await access(`public/shop/${file}`);
  } catch {
    problems.push(`missing public/shop/${file}`);
  }
  try {
    await access(`dist/shop/${file}`);
  } catch {
    problems.push(`missing dist/shop/${file}`);
  }
}

// Source must not import TeeMockup
const shopPage = await readFile("src/pages/Shop.tsx", "utf8");
const productPage = await readFile("src/pages/ShopProduct.tsx", "utf8");
if (/TeeMockup|GcMark/.test(shopPage + productPage)) problems.push("pages still import TeeMockup/GcMark");

for (const file of ["dist/index.html", "dist/workshop.html"]) {
  const other = await readFile(file, "utf8");
  if (!/href="\/shop"/.test(other)) problems.push(`${file} does not link /shop`);
}

const scenes = await readFile("src/components/PageScenes.tsx", "utf8");
if (!/"\/shop":\s*\(/.test(scenes)) problems.push("PageScenes missing /shop drawing");

if (problems.length) {
  console.error(`SHOP FAILED (${problems.length}):\n  - ${problems.join("\n  - ")}`);
  process.exit(1);
}
console.log(
  `shop verification passed: ${WEBPS.length} webps, white storefront, GC Black-only, photo galleries, Buy fallback; negative controls passed.`,
);
