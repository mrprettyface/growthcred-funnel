#!/usr/bin/env node
/**
 * Gate oracle for /corporate-ai-training (GATES-corporate.md).
 *
 *   page   — the built page has every section, its drawings and real photos,
 *            sourced research, no invented per-employee price, a working form,
 *            and is linked from the nav, the footer and the training page.
 *   roi    — the ROI figures baked into the HTML equal an independent
 *            recomputation from the inputs baked beside them.
 *   swept  — the new source files are in the mobile gates' sweep, and carry no
 *            blur and no sub-12px base type.
 *
 * Each rule is first run against a known-bad input, so a rule that cannot fail
 * is caught rather than trusted.
 */
import assert from "node:assert/strict";
import { readFile, access } from "node:fs/promises";

const FILE = "dist/corporate-ai-training.html";
const mode = process.argv[2];

const decode = (s) =>
  s.replace(/&amp;/g, "&").replace(/&#x27;|&#39;/g, "'").replace(/&quot;/g, '"').replace(/&lt;/g, "<").replace(/&gt;/g, ">");
const mainOf = (html) => {
  const i = html.indexOf('<main id="main-content">');
  return i < 0 ? "" : html.slice(i, html.indexOf("</main>", i));
};
const text = (html) => decode(html.replace(/<script[\s\S]*?<\/script>/g, " ").replace(/<[^>]+>/g, " ")).replace(/\s+/g, " ").trim();

/* ---------------- page ---------------- */

const SECTIONS = ["hero", "tried", "different", "target", "roi", "delivery", "pack", "stakeholders", "pricing", "trainer", "faq", "enquire"];
const SOURCES = [/fortune\.com\/2025\/08\/18\/mit-report/, /news\.microsoft\.com\/source\/2024\/05\/08/, /bcg\.com\/publications\/2026\/ai-at-work/];

function pageProblems(html) {
  const out = [];
  const main = mainOf(html);
  const body = text(main);
  const h1s = [...html.matchAll(/<h1[\s>][\s\S]*?<\/h1>/g)].map((m) => text(m[0]));
  if (h1s.length !== 1) out.push(`${h1s.length} h1`);
  else if (!/3× faster/.test(h1s[0])) out.push(`h1 does not carry the 3× promise: ${h1s[0]}`);
  for (const id of SECTIONS) if (!new RegExp(`<section[^>]*\\bid="${id}"`).test(main)) out.push(`missing section #${id}`);

  const scenes = new Set([...main.matchAll(/data-scene="([a-z]+)"/g)].map((m) => m[1]));
  if (scenes.size < 8) out.push(`only ${scenes.size} distinct drawn scenes`);

  const imgs = [...main.matchAll(/<img\b[^>]*>/g)].map((m) => m[0]);
  const real = imgs.filter((t) => /src="\/images\/[^"]+\.(jpe?g|webp|png)"/.test(t) && /\balt="[^"]{12,}"/.test(t));
  if (real.length < 3) out.push(`only ${real.length} real photos with descriptive alt text`);

  for (const re of SOURCES) if (!re.test(main)) out.push(`research source link missing: ${re}`);
  if (!/Global research/.test(body)) out.push("research is not labelled as global research");
  if (!/Illustrative/.test(body)) out.push("the 6h → 2h example is not labelled illustrative");

  // Pricing is per employee, and no rate is invented: no "R<digits> per employee/head/person".
  if (!/per employee/i.test(body)) out.push("pricing is not described per employee");
  const priced = body.match(/R\s?\d[\d,.\s]*(k|m)?\s*(per|\/)\s*(employee|head|person|learner|seat)/i);
  if (priced) out.push(`an invented per-employee price: ${priced[0]}`);
  // No accreditation claimed, except the explicit denial.
  if (/\baccredited\b/i.test(body.replace(/is the training accredited\?|not an accredited qualification|no accreditation is claimed/gi, ""))) out.push("an accreditation claim");

  if (!/<form\b/.test(main) || !/id="corporate-enquiry-organisation"/.test(main)) out.push("the enquiry form is missing");
  if (!/href="#enquire"/.test(main)) out.push("no in-page CTA to the enquiry");
  if (!/href="\/data-and-security"/.test(main)) out.push("the page body does not link data & security");
  if (!/href="\/stories"/.test(main)) out.push("the page body does not link the client stories");

  const words = body.split(" ").length;
  if (words < 1200 || words > 3200) out.push(`${words} words in the body (1,200–3,200)`);
  return out;
}

async function page() {
  // Negative controls: a stripped page must fail each rule this checks.
  assert.ok(pageProblems("<main id=\"main-content\"><h1>Hello</h1></main>").length > 10, "page rules cannot fail");
  assert.ok(
    pageProblems(`<main id="main-content"><p>Only R450 per employee</p></main>`).some((p) => p.includes("invented per-employee price")),
    "price rule cannot fail",
  );
  assert.ok(
    pageProblems(`<main id="main-content"><p>SETA accredited training</p></main>`).some((p) => p.includes("accreditation")),
    "accreditation rule cannot fail",
  );

  const html = await readFile(FILE, "utf8");
  const problems = pageProblems(html);
  for (const m of mainOf(html).matchAll(/src="(\/images\/[^"]+)"/g)) {
    try {
      await access("dist" + m[1]);
    } catch {
      problems.push(`image not shipped: ${m[1]}`);
    }
  }

  // Reachable: the header nav and footer on every page, and the training page's related links.
  for (const file of ["dist/index.html", "dist/workshop.html", "dist/ai-training-south-africa.html"]) {
    const other = await readFile(file, "utf8");
    if (!/href="\/corporate-ai-training"/.test(other)) problems.push(`${file} does not link /corporate-ai-training`);
  }
  const training = mainOf(await readFile("dist/ai-training-south-africa.html", "utf8"));
  if (!/href="\/corporate-ai-training"/.test(training)) problems.push("/ai-training-south-africa body does not link the corporate page");
  const nav = (await readFile("src/components/Layout.tsx", "utf8")).match(/const NAV = \[[\s\S]*?\];/)[0];
  if (!/\/corporate-ai-training/.test(nav)) problems.push("the header NAV does not list the corporate page");

  const sitemap = await readFile("dist/sitemap.xml", "utf8");
  if (!sitemap.includes("<loc>https://growthcred.co.za/corporate-ai-training</loc>")) problems.push("not in the sitemap");
  const schema = JSON.parse(html.match(/<script id="site-schema" type="application\/ld\+json">([\s\S]*?)<\/script>/)[1]);
  const types = schema["@graph"].map((n) => n["@type"]).flat();
  for (const t of ["Service", "FAQPage", "BreadcrumbList"]) if (!types.includes(t)) problems.push(`no ${t} structured data`);

  if (problems.length) {
    console.error(`CORPORATE PAGE FAILED (${problems.length}):\n  - ` + problems.join("\n  - "));
    process.exit(1);
  }
  const words = text(mainOf(html)).split(" ").length;
  console.log(`corporate page verification passed: ${SECTIONS.length} sections, ${new Set([...html.matchAll(/data-scene="([a-z]+)"/g)].map((m) => m[1])).size} drawn scenes, ${words} words; negative controls passed.`);
}

/* ---------------- roi ---------------- */

/** The model, written again from its definition rather than imported from it. */
function expected({ employees, docHours, monthlyCtc, speed }) {
  const weeks = 46, week = 40;
  const hoursBackPerYear = employees * docHours * (1 - 1 / speed) * weeks;
  const annualValue = hoursBackPerYear * ((monthlyCtc * 12) / (weeks * week));
  return {
    hoursBackPerYear: Math.round(hoursBackPerYear),
    annualValue: Math.round(annualValue),
    valuePerEmployee: Math.round(annualValue / employees),
    fte: Number((hoursBackPerYear / (weeks * week)).toFixed(1)),
  };
}

function roiProblems(html) {
  const out = [];
  const read = (attr) => Object.fromEntries([...html.matchAll(new RegExp(`data-roi-${attr}="([a-zA-Z]+)" data-value="([\\d.]+)"`, "g"))].map((m) => [m[1], Number(m[2])]));
  const inputs = read("input");
  const outputs = read("output");
  for (const k of ["employees", "docHours", "monthlyCtc", "speed"]) if (!(k in inputs)) out.push(`input ${k} not rendered`);
  if (out.length) return out;
  const want = expected(inputs);
  for (const [k, v] of Object.entries(want)) {
    if (!(k in outputs)) out.push(`output ${k} not rendered`);
    else if (Math.abs(outputs[k] - v) > (k === "fte" ? 0.05 : 1)) out.push(`${k}: page says ${outputs[k]}, recomputed ${v}`);
  }
  if (!/data-roi-disclaimer[^>]*>[^<]*Not a result measured at your organisation/.test(html)) out.push("the estimate disclaimer is missing");
  return out;
}

async function roi() {
  const html = await readFile(FILE, "utf8");
  // Negative control: the same page with the headline figure doubled must fail.
  const tampered = html.replace(/data-roi-output="annualValue" data-value="(\d+)"/, (_, v) => `data-roi-output="annualValue" data-value="${Number(v) * 2}"`);
  assert.notEqual(tampered, html, "control could not tamper the figure");
  assert.ok(roiProblems(tampered).length > 0, "roi rule cannot fail");

  const problems = roiProblems(html);
  if (problems.length) {
    console.error(`CORPORATE ROI FAILED:\n  - ` + problems.join("\n  - "));
    process.exit(1);
  }
  const shown = html.match(/data-roi-output="annualValue" data-value="\d+"[^>]*>([^<]+)</)[1];
  console.log(`corporate roi verification passed: headline ${shown}, figures match an independent recomputation; negative control passed.`);
}

/* ---------------- swept ---------------- */

const NEW_FILES = ["src/pages/Corporate.tsx", "src/components/CorporateRoi.tsx", "src/components/CorporateEnquiry.tsx", "src/components/CorporateScenes.tsx"];

async function swept() {
  const mobile = await readFile("scripts/verify-mobile.mjs", "utf8");
  const pages = mobile.match(/const PAGES = \[[\s\S]*?\];/)[0];
  const problems = [];
  for (const f of NEW_FILES) {
    if (!pages.includes(`"${f}"`)) problems.push(`${f} is not in verify-mobile's PAGES sweep`);
    const src = (await readFile(f, "utf8")).replace(/\/\*[\s\S]*?\*\//g, "");
    if (/(?<!backdrop-)blur|filter:/.test(src)) problems.push(`${f}: blur or filter present`);
    for (const m of src.matchAll(/(md:)?text-\[(\d+(?:\.\d+)?)px\]/g)) if (!m[1] && Number(m[2]) < 12) problems.push(`${f}: text-[${m[2]}px]`);
  }
  // Negative control for the blur rule.
  assert.ok(/(?<!backdrop-)blur|filter:/.test('className="blur-sm"'), "blur rule cannot fail");
  if (problems.length) {
    console.error(`CORPORATE SWEEP FAILED:\n  - ` + problems.join("\n  - "));
    process.exit(1);
  }
  console.log(`corporate files swept: ${NEW_FILES.length} files in the mobile gates, no blur, 12px type floor held.`);
}

if (mode === "page") await page();
else if (mode === "roi") await roi();
else if (mode === "swept") await swept();
else {
  console.error("usage: verify-corporate.mjs page|roi|swept");
  process.exit(2);
}
