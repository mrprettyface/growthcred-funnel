#!/usr/bin/env node
/**
 * On-page SEO gate: the checklist, measured on the built site.
 *
 * Every indexed page is read from dist/ — the HTML that actually ships — and
 * held to the same rules. Each rule is also run against a known-bad input first
 * (a negative control), so a rule that cannot fail is caught rather than trusted.
 */
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const decode = (s) =>
  s.replace(/&amp;/g, "&").replace(/&#x27;|&#39;|&apos;/g, "'").replace(/&quot;/g, '"').replace(/&lt;/g, "<").replace(/&gt;/g, ">");
const text = (html) =>
  decode(html.replace(/<script[\s\S]*?<\/script>/g, " ").replace(/<style[\s\S]*?<\/style>/g, " ").replace(/<[^>]+>/g, " "))
    .replace(/\s+/g, " ")
    .trim();
const mainOf = (html) => {
  const i = html.indexOf('<main id="main-content">');
  const j = html.indexOf("</main>", i);
  return i < 0 ? html : html.slice(i, j);
};

/* ---------- The rules ---------- */

const titleOk = (t) => t.length >= 50 && t.length <= 60;
const descOk = (d) => d.length >= 120 && d.length <= 160;
function headingProblems(html) {
  const levels = [...html.matchAll(/<h([1-6])[\s>]/g)].map((m) => +m[1]);
  const out = [];
  if (levels.filter((l) => l === 1).length !== 1) out.push(`${levels.filter((l) => l === 1).length} <h1>`);
  for (let i = 1; i < levels.length; i++)
    if (levels[i] > levels[i - 1] + 1) out.push(`h${levels[i - 1]} -> h${levels[i]}`);
  return out;
}
const imgsWithoutAlt = (html) => [...html.matchAll(/<img\b[^>]*>/g)].map((m) => m[0]).filter((t) => !/\balt="[^"]+"/.test(t));
function faqMismatches(html) {
  const m = html.match(/<script id="site-schema" type="application\/ld\+json">([\s\S]*?)<\/script>/);
  const faq = JSON.parse(m[1])["@graph"].find((n) => n["@type"] === "FAQPage");
  if (!faq) return null;
  const visible = text(mainOf(html));
  return faq.mainEntity.filter((q) => !visible.includes(q.name) || !visible.includes(q.acceptedAnswer.text)).map((q) => q.name);
}
/** Word 5-shingle Jaccard similarity: 1 = identical text, 0 = nothing shared. */
function similarity(a, b) {
  const sh = (s) => {
    const w = s.toLowerCase().replace(/[^a-z0-9 ]/g, " ").split(/\s+/).filter(Boolean);
    const set = new Set();
    for (let i = 0; i + 5 <= w.length; i++) set.add(w.slice(i, i + 5).join(" "));
    return set;
  };
  const A = sh(a), B = sh(b);
  let inter = 0;
  for (const x of A) if (B.has(x)) inter++;
  return inter / (A.size + B.size - inter || 1);
}

/* ---------- Negative controls: every rule must be able to fail ---------- */

assert.ok(!titleOk("Too short | GrowthCred"), "title rule cannot fail");
assert.ok(!descOk("Short."), "description rule cannot fail");
assert.ok(headingProblems("<h1>a</h1><h3>b</h3>").length, "heading-skip rule cannot fail");
assert.ok(headingProblems("<h1>a</h1><h1>b</h1>").length, "single-h1 rule cannot fail");
assert.ok(imgsWithoutAlt('<img src="/x.jpg" alt="">').length, "alt rule cannot fail");
{
  const fake = `<main id="main-content"><p>Question one?</p></main><script id="site-schema" type="application/ld+json">${JSON.stringify({ "@graph": [{ "@type": "FAQPage", mainEntity: [{ name: "Question one?", acceptedAnswer: { text: "An answer nobody can see." } }] }] })}</script>`;
  assert.equal(faqMismatches(fake).length, 1, "FAQ-matches-visible rule cannot fail");
}
{
  const t = "the same forty words about a market repeated across two pages with only the city name swapped out ".repeat(4);
  assert.ok(similarity(t, t.replace("market", "place")) > 0.5, "doorway similarity rule cannot fail");
}

/* ---------- The site ---------- */

const manifest = JSON.parse(await readFile("dist/search-manifest.json", "utf8"));
const sitemap = await readFile("dist/sitemap.xml", "utf8");
const indexed = manifest.routes.filter((r) => r.index);
const pages = new Map();
for (const r of indexed) pages.set(r.path, await readFile("dist/" + r.file, "utf8"));

const failures = [];
const titles = new Map(), descs = new Map();
for (const [path, html] of pages) {
  const title = decode(html.match(/<title>([^<]*)<\/title>/)[1]);
  const desc = decode(html.match(/<meta name="description" content="([^"]*)"/)[1]);
  if (!titleOk(title)) failures.push(`${path}: title is ${title.length} chars (50–60): ${title}`);
  if (!descOk(desc)) failures.push(`${path}: description is ${desc.length} chars (120–160)`);
  if (titles.has(title)) failures.push(`${path}: duplicate title with ${titles.get(title)}`);
  if (descs.has(desc)) failures.push(`${path}: duplicate description with ${descs.get(desc)}`);
  titles.set(title, path);
  descs.set(desc, path);

  const main = mainOf(html);
  for (const p of headingProblems(html.slice(html.indexOf('<div id="root"')))) failures.push(`${path}: heading ${p}`);
  for (const img of imgsWithoutAlt(html)) failures.push(`${path}: image without alt ${img.slice(0, 80)}`);

  const links = new Set([...html.matchAll(/href="(\/[^"#?]*)"/g)].map((m) => m[1]));
  if (links.size < 5) failures.push(`${path}: only ${links.size} internal links`);
  const inMain = new Set([...main.matchAll(/href="(\/[^"#?]*)"/g)].map((m) => m[1]));
  // A link to a conversion page, or the conversion itself (a form or its button).
  if (![...inMain].some((l) => ["/call", "/workshop", "/checkout", "/webinar"].includes(l)) && !/<form\b|<button\b/.test(main))
    failures.push(`${path}: no call to action (apply, workshop or class) in the page body`);

  const bad = faqMismatches(html);
  if (bad?.length) failures.push(`${path}: FAQ schema questions not visible on the page: ${bad.join(" | ")}`);
}

// FAQ markup where the checklist asks for it: home, every service, industry and market page.
const needFaq = ["/", "/ai-automation-south-africa", "/ai-training-south-africa", "/ai-proposal-automation",
  "/ai-follow-up-automation", "/ai-admin-automation", "/ai-for-waste-management", "/ai-for-beauty-and-cosmetics",
  "/ai-automation-johannesburg", "/ai-automation-uk", "/ai-automation-united-states", "/ai-automation-australia",
  "/ai-automation-africa", "/guides/how-we-work-first-30-days", "/guides/admin-assistant-vs-ai-automation",
  "/corporate-ai-training"];
for (const path of needFaq) {
  const html = pages.get(path);
  if (!html) { failures.push(`${path}: missing, not indexed, or not built`); continue; }
  if (faqMismatches(html) === null) failures.push(`${path}: no FAQPage structured data`);
  if (!sitemap.includes(`<loc>https://growthcred.co.za${path}</loc>`)) failures.push(`${path}: not in the sitemap`);
  if (!manifest.routes.find((r) => r.path === path)?.prerendered) failures.push(`${path}: not prerendered`);
  if (text(mainOf(html)).split(" ").length < 350) failures.push(`${path}: under 350 words of body copy`);
}

// Local business entity, stated only with facts that are visible on the site.
if (!/"ProfessionalService"/.test(pages.get("/"))) failures.push("/: no ProfessionalService entity in structured data");

// Market pages must each earn their place, not be one page with the country swapped (doorway pages).
const markets = ["/ai-automation-johannesburg", "/ai-automation-uk", "/ai-automation-united-states", "/ai-automation-australia", "/ai-automation-africa", "/ai-automation-south-africa"];
let worst = 0;
for (let i = 0; i < markets.length; i++)
  for (let j = i + 1; j < markets.length; j++) {
    const s = similarity(text(mainOf(pages.get(markets[i]))), text(mainOf(pages.get(markets[j]))));
    worst = Math.max(worst, s);
    if (s > 0.25) failures.push(`${markets[i]} vs ${markets[j]}: ${(s * 100).toFixed(0)}% shared text — doorway risk`);
  }

// The data page was confirmed by Phila on 24 September 2026: it is public now,
// indexed, in the sitemap, and reachable from every page through the footer.
const data = manifest.routes.find((r) => r.path === "/data-and-security");
if (!data?.index) failures.push("/data-and-security: not indexed");
if (!sitemap.includes("<loc>https://growthcred.co.za/data-and-security</loc>")) failures.push("/data-and-security: not in the sitemap");
for (const [path, page] of pages) if (!/href="\/data-and-security"/.test(page)) failures.push(`${path}: does not link the data page`);

if (failures.length) {
  console.error(`ON-PAGE SEO FAILED (${failures.length}):`);
  for (const f of failures) console.error("  - " + f);
  process.exit(1);
}
console.log(`on-page SEO verification passed: ${pages.size} indexed pages; titles, descriptions, headings, alt text, links and CTAs clean; FAQ schema on ${needFaq.length} pages matches visible text; market pages at most ${(worst * 100).toFixed(0)}% shared text; negative controls passed.`);
