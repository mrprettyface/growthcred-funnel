#!/usr/bin/env node
/**
 * Gate oracle for /shop (GATES-shop.md).
 *
 * Checks the config, the built HTML, nav/footer reachability, official mark
 * asset use, prices, shipping copy, size range, and Buy fallback while payment
 * links are empty. Negative controls first.
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

function configProblems(src) {
  const out = [];
  if (!/amountCents:\s*54900/.test(src)) out.push("GC Mark Tee is not R549 (54900 cents)");
  if (!/amountCents:\s*69900/.test(src)) out.push("Dream Tee is not R699 (69900 cents)");
  if (!src.includes(SHIPPING)) out.push("shipping copy missing from config");
  if (!/TODO\(Phila\):\s*paste Paystack or Yoco/.test(src)) out.push("payment-link placeholder note missing");
  if (!/"gc-mark-tee":\s*""/.test(src) || !/"dream-tee":\s*""/.test(src)) {
    // Empty placeholders are the publish-ready default; filled links are fine too.
    if (!/PAYMENT_LINKS/.test(src)) out.push("PAYMENT_LINKS missing");
  }
  for (const s of SIZES) if (!src.includes(`"${s}"`)) out.push(`size ${s} missing from config`);
  if (!/buyHref|whatsappUrl|mailto/.test(src)) out.push("buy fallback helpers missing");
  return out;
}

function pageProblems(shopHtml, markHtml, dreamHtml, layoutSrc, markAsset) {
  const out = [];
  const shop = mainOf(shopHtml);
  const mark = mainOf(markHtml);
  const dream = mainOf(dreamHtml);
  const shopBody = text(shop);

  if (![...shopHtml.matchAll(/<h1[\s>][\s\S]*?<\/h1>/g)].length) out.push("/shop missing h1");
  if (!/Wear the work/.test(shopBody)) out.push("/shop hero copy missing");
  if (!shopBody.includes(SHIPPING)) out.push("/shop missing shipping copy");
  if (!/href="\/shop\/gc-mark-tee"/.test(shop)) out.push("/shop does not link GC Mark Tee");
  if (!/href="\/shop\/dream-tee"/.test(shop)) out.push("/shop does not link Dream Tee");
  if (!/data-product-card="gc-mark-tee"/.test(shop)) out.push("GC Mark card missing");
  if (!/data-product-card="dream-tee"/.test(shop)) out.push("Dream card missing");

  // Prices appear as R549 / R699 (en-ZA may use a non-breaking space; neither needs one here).
  if (!/R549/.test(text(mark))) out.push("GC Mark product page missing R549");
  if (!/R699/.test(text(dream))) out.push("Dream product page missing R699");
  for (const s of SIZES) {
    if (!new RegExp(`>${s}<`).test(mark)) out.push(`GC Mark page missing size ${s}`);
    if (!new RegExp(`>${s}<`).test(dream)) out.push(`Dream page missing size ${s}`);
  }
  if (!mark.includes(SHIPPING)) out.push("GC Mark page missing shipping copy");
  if (!dream.includes(SHIPPING)) out.push("Dream page missing shipping copy");

  // Buy fallback while payment links are empty: WhatsApp, not a blank href.
  if (!/data-buy-mode="message"/.test(mark) && !/wa\.me\//.test(mark)) {
    out.push("GC Mark Buy is not on the message fallback");
  }
  if (!/data-buy-mode="message"/.test(dream) && !/wa\.me\//.test(dream)) {
    out.push("Dream Buy is not on the message fallback");
  }
  if (/href=""/.test(mark) || /href=""/.test(dream)) out.push("Buy button has an empty href");

  // Official mark: the G + gold stop paths from the asset, not an invented arrow mark.
  if (!/M233\.4 391Q208\.9 391/.test(markAsset)) out.push("official mark asset missing expected G path");
  if (!/M364\.1 385\.6V336\.6H413V385\.6Z/.test(markAsset)) out.push("official mark asset missing gold stop");
  const markComponent = arguments.length; // placate; real check below via files read in main
  void markComponent;

  // Nav + footer
  if (!/label: "Shop",\s*to: "\/shop"/.test(layoutSrc) && !/\{ label: "Shop", to: "\/shop" \}/.test(layoutSrc)) {
    out.push('header NAV missing { label: "Shop", to: "/shop" }');
  }
  if (!/\["\/shop", "Shop"\]/.test(layoutSrc)) out.push("footer missing Shop link");

  // Dream back quote visible somehow (product page or mockup)
  if (!/How big would you dream/.test(dream)) out.push("Dream quote missing from product page");

  return out;
}

// Negative controls
assert.ok(configProblems("").length > 3, "config rules cannot fail");
assert.ok(
  pageProblems("<main id=\"main-content\"><h1>x</h1></main>", "<main id=\"main-content\"></main>", "<main id=\"main-content\"></main>", "", "nope").length > 5,
  "page rules cannot fail",
);

const config = await readFile("src/lib/shop.ts", "utf8");
const layout = await readFile("src/components/Layout.tsx", "utf8");
const markComp = await readFile("src/components/shop/GcMark.tsx", "utf8");
const markAsset = await readFile("resources/logo/growthcred-mark.svg", "utf8");
const publicMark = await readFile("public/images/growthcred-mark.svg", "utf8");
const shopHtml = await readFile("dist/shop.html", "utf8");
const markHtml = await readFile("dist/shop/gc-mark-tee.html", "utf8");
const dreamHtml = await readFile("dist/shop/dream-tee.html", "utf8");

const problems = [
  ...configProblems(config),
  ...pageProblems(shopHtml, markHtml, dreamHtml, layout, markAsset),
];

// Mark component must reuse the official paths (not invent a GC arrow).
if (!markComp.includes("M233.4 391Q208.9 391")) problems.push("GcMark.tsx does not use the official G path");
if (!markComp.includes("M364.1 385.6V336.6H413V385.6Z")) problems.push("GcMark.tsx does not use the official gold stop");
// Flag an invented GC-arrow path implementation. Comments that refuse one are fine.
const codeOnly = markComp.replace(/\/\*[\s\S]*?\*\//g, "").replace(/\/\/.*$/gm, "");
if (/growth.?arrow|inner bar turns|letter G whose/i.test(codeOnly)) {
  problems.push("GcMark.tsx looks like an invented GC arrow mark");
}
if (publicMark !== markAsset && !publicMark.includes("M233.4 391Q208.9 391")) {
  problems.push("public mark asset does not match the official G path");
}

// Reachable from other pages via header
for (const file of ["dist/index.html", "dist/workshop.html"]) {
  const other = await readFile(file, "utf8");
  if (!/href="\/shop"/.test(other)) problems.push(`${file} does not link /shop`);
}

// Official assets exist
for (const path of [
  "resources/logo/growthcred-mark.svg",
  "public/images/growthcred-mark.svg",
  "dist/images/growthcred-mark.svg",
]) {
  try {
    await access(path);
  } catch {
    problems.push(`missing asset: ${path}`);
  }
}

// Menu scene for /shop
const scenes = await readFile("src/components/PageScenes.tsx", "utf8");
if (!/"\/shop":\s*\(/.test(scenes)) problems.push("PageScenes missing /shop drawing");

if (problems.length) {
  console.error(`SHOP FAILED (${problems.length}):\n  - ${problems.join("\n  - ")}`);
  process.exit(1);
}
console.log(
  "shop verification passed: R549/R699, shipping copy, S–3XL, Shop in nav, official mark (no invented GC arrow), Buy message fallback; negative controls passed.",
);
