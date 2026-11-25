#!/usr/bin/env node
/**
 * Gate oracle for /shop (GATES-shop.md).
 *
 * White storefront, three tees, Black/White colours, official mark (no invented
 * GC arrow), real QR asset, Buy message fallback while payment links are empty.
 */
import assert from "node:assert/strict";
import { readFile, access } from "node:fs/promises";

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
const COLOURS = ["Black", "White"];

function configProblems(src) {
  const out = [];
  if (!/id: "gc-mark-tee"[\s\S]*?amountCents:\s*54900/.test(src)) out.push("GC Mark Tee is not R549");
  if (!/id: "dream-tee"[\s\S]*?amountCents:\s*69900/.test(src)) out.push("Dream Tee is not R699");
  if (!/id: "free-wifi-tee"[\s\S]*?amountCents:\s*69900/.test(src)) out.push("FREE WiFi Tee is not R699");
  if (!src.includes(SHIPPING)) out.push("shipping copy missing from config");
  if (!/TODO\(Phila\):\s*paste Paystack or Yoco/.test(src)) out.push("payment-link placeholder note missing");
  if (!/PAYMENT_LINKS/.test(src)) out.push("PAYMENT_LINKS missing");
  for (const id of ["gc-mark-tee", "dream-tee", "free-wifi-tee"]) {
    if (!new RegExp(`"${id}":\\s*""`).test(src) && !new RegExp(`"${id}":\\s*"https?://`).test(src)) {
      out.push(`payment link key missing for ${id}`);
    }
  }
  for (const s of SIZES) if (!src.includes(`"${s}"`)) out.push(`size ${s} missing`);
  for (const c of COLOURS) if (!src.includes(`"${c}"`)) out.push(`colour ${c} missing`);
  if (!/HOW BIG/.test(src) || !/DREAM/.test(src) || !/COULD NOT FAIL\?/.test(src)) {
    out.push("Dream stacked quote missing from config");
  }
  if (!/SHOP_QR_URL\s*=\s*"https:\/\/growthcred\.co\.za"/.test(src)) out.push("QR URL missing");
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
  // White / simple: no dark hero or dark content band on the shop page.
  if (/data-tone="dark"/.test(shop)) out.push("/shop still has a dark tone section");
  if (/<section[^>]*\bbg-midnight\b/.test(shop) || /min-h-screen bg-midnight/.test(shop)) {
    out.push("/shop still uses a midnight section background");
  }
  if (!/min-h-screen bg-white/.test(shopHtml)) out.push("/shop root is not white");

  for (const id of ["gc-mark-tee", "dream-tee", "free-wifi-tee"]) {
    if (!new RegExp(`href="/shop/${id}"`).test(shop)) out.push(`/shop does not link ${id}`);
    if (!new RegExp(`data-product-card="${id}"`).test(shop)) out.push(`${id} card missing`);
  }

  if (!/R549/.test(text(mark))) out.push("GC Mark product page missing R549");
  if (!/R699/.test(text(dream))) out.push("Dream product page missing R699");
  if (!/R699/.test(text(wifi))) out.push("FREE WiFi product page missing R699");

  for (const page of [mark, dream, wifi]) {
    for (const s of SIZES) if (!new RegExp(`>${s}<`).test(page)) out.push(`a product page missing size ${s}`);
    for (const c of COLOURS) if (!new RegExp(`>${c}<`).test(page)) out.push(`a product page missing colour ${c}`);
    if (!page.includes(SHIPPING)) out.push("a product page missing shipping copy");
    if (!/data-buy-mode="message"/.test(page) && !/wa\.me\//.test(page)) out.push("Buy not on message fallback");
    if (/href=""/.test(page)) out.push("Buy button has an empty href");
  }

  if (!/HOW BIG/.test(dream) || !/DREAM/.test(dream)) out.push("Dream stacked quote missing on product page");
  if (!/FREE WiFi/.test(wifi)) out.push("FREE WiFi headline missing on product page");
  if (!/qr-growthcred/.test(wifi)) out.push("QR image missing on FREE WiFi page");

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
const markComp = await readFile("src/components/shop/GcMark.tsx", "utf8");
const markAsset = await readFile("resources/logo/growthcred-mark.svg", "utf8");
const shopHtml = await readFile("dist/shop.html", "utf8");
const markHtml = await readFile("dist/shop/gc-mark-tee.html", "utf8");
const dreamHtml = await readFile("dist/shop/dream-tee.html", "utf8");
const wifiHtml = await readFile("dist/shop/free-wifi-tee.html", "utf8");
const qrBlack = await readFile("public/images/shop/qr-growthcred.svg", "utf8");
const qrCream = await readFile("public/images/shop/qr-growthcred-cream.svg", "utf8");

const problems = [
  ...configProblems(config),
  ...pageProblems(shopHtml, markHtml, dreamHtml, wifiHtml, layout),
];

if (!markComp.includes("M233.4 391Q208.9 391")) problems.push("GcMark.tsx does not use the official G path");
if (!markComp.includes("M364.1 385.6V336.6H413V385.6Z")) problems.push("GcMark.tsx does not use the official gold stop");
const codeOnly = markComp.replace(/\/\*[\s\S]*?\*\//g, "").replace(/\/\/.*$/gm, "");
if (/growth.?arrow|inner bar turns|letter G whose/i.test(codeOnly)) {
  problems.push("GcMark.tsx looks like an invented GC arrow mark");
}
if (!/M233\.4 391Q208\.9 391/.test(markAsset)) problems.push("official mark asset missing G path");

if (!qrBlack.includes("svg") || qrBlack.length < 400) problems.push("black QR SVG looks empty");
if (!qrCream.includes("svg") || qrCream.length < 400) problems.push("cream QR SVG looks empty");
if (!/stroke="#14141c"|fill="#14141c"/.test(qrBlack) && !/#14141c/.test(qrBlack)) {
  // Accept either stroke or fill encodings from the generator.
  if (!/#000/.test(qrBlack) && !/#14141c/.test(qrBlack)) problems.push("black QR has no dark modules");
}

for (const file of ["dist/index.html", "dist/workshop.html"]) {
  const other = await readFile(file, "utf8");
  if (!/href="\/shop"/.test(other)) problems.push(`${file} does not link /shop`);
}

for (const path of [
  "resources/logo/growthcred-mark.svg",
  "public/images/growthcred-mark.svg",
  "public/images/shop/qr-growthcred.svg",
  "public/images/shop/qr-growthcred-cream.svg",
  "dist/images/growthcred-mark.svg",
  "dist/images/shop/qr-growthcred.svg",
  "dist/images/shop/qr-growthcred-cream.svg",
]) {
  try {
    await access(path);
  } catch {
    problems.push(`missing asset: ${path}`);
  }
}

const scenes = await readFile("src/components/PageScenes.tsx", "utf8");
if (!/"\/shop":\s*\(/.test(scenes)) problems.push("PageScenes missing /shop drawing");

if (problems.length) {
  console.error(`SHOP FAILED (${problems.length}):\n  - ${problems.join("\n  - ")}`);
  process.exit(1);
}
console.log(
  "shop verification passed: white storefront, R549/R699×2, colours, QR, official mark, Buy fallback; negative controls passed.",
);
