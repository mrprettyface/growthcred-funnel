#!/usr/bin/env node
/**
 * Gate oracle for GATES-private-ai.md: the /private-ai sales page.
 *
 *   page   — the built page has its sections, carries every third-party
 *            figure beside its source link, repeats none of the research
 *            claims that failed verification, names no hardware or model,
 *            keeps the guarantee verbatim, offers the guide and the call, and
 *            ships FAQ structured data, a sitemap entry, and sane meta.
 *   reach  — the page is linked from the header nav, the footer and the
 *            homepage's ownership section.
 *
 * Reads dist/, so run `npm run build` first. Each rule set is first run
 * against a known-bad input, so a rule that cannot fail is caught.
 */
import assert from "node:assert/strict";
import { readFile, access } from "node:fs/promises";

const FILE = "dist/private-ai.html";
const mode = process.argv[2];

const decode = (s) =>
  s.replace(/&amp;/g, "&").replace(/&#x27;|&#39;|&rsquo;/g, "'").replace(/&quot;/g, '"').replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&nbsp;/g, " ");
const text = (html) => decode(html.replace(/<script[\s\S]*?<\/script>/g, " ").replace(/<[^>]+>/g, " ")).replace(/\s+/g, " ").trim();
const mainOf = (html) => {
  const i = html.indexOf('<main id="main-content">');
  return i < 0 ? "" : html.slice(i, html.indexOf("</main>", i));
};

/** Each verified figure, and the source that must be linked on the page beside it. */
const SOURCED = [
  { figure: /\$15\.5 billion/, source: /harvey\.ai\/blog\/harvey-raises/ },
  { figure: /1\.7%/, source: /hai\.stanford\.edu\/ai-index\/2025-ai-index-report/ },
  { figure: /69 months/, source: /arxiv\.org\/abs\/2509\.18101/ },
  { figure: /20 times faster/, source: /databricks\.com\/customers\/altana-ai/ },
  { figure: /78%/, source: /news\.microsoft\.com\/source\/2024\/05\/08/ },
  { figure: /section 72/i, source: /popia\.co\.za\/section-72/ },
];
/** Claims from the pasted research that failed verification on 29 Sep 2026. */
const REJECTED = [/9 to 18 months/i, /echnotek/i, /abacus/i, /\$100,?000/, /\$500,?000/, /zero external servers/i, /50 million tokens/i];
const PIECES = /\b(mac ?mini|mac studio|gpu|nvidia|h100|a100|rtx|vram|llama|qwen|mistral|deepseek|gemma|dbrx|phi-3|ollama)\b/i;
const GUARANTEE = "If the Command Core doesn't give you back at least 20% of your week, the engagement is on us.";

function pageProblems(html) {
  const out = [];
  const main = mainOf(html);
  const body = text(main);
  const h1s = [...html.matchAll(/<h1[\s>][\s\S]*?<\/h1>/g)];
  if (h1s.length !== 1) out.push(`${h1s.length} h1`);
  for (const id of ["hero", "pain", "cost-of-renting", "fixes", "own", "evidence", "cost", "who", "wrong-call", "how", "guarantee", "faq", "close"])
    if (!new RegExp(`<section[^>]*\\bid="${id}"`).test(main)) out.push(`missing section #${id}`);
  for (const { figure, source } of SOURCED) {
    if (!figure.test(body)) out.push(`figure missing: ${figure}`);
    if (!source.test(main)) out.push(`source not linked: ${source}`);
  }
  for (const re of REJECTED) if (re.test(body)) out.push(`repeats an unverified claim: ${re}`);
  const piece = body.match(PIECES);
  if (piece) out.push(`names a hardware or model piece: ${piece[0]}`);
  if (!body.includes(GUARANTEE)) out.push("the guarantee is not verbatim");
  if (!/Not our client/i.test(body)) out.push("the Altana result is not labelled as someone else's");
  if (!/I run GrowthCred on our own private AI/.test(body)) out.push("Phila's own-deployment line is missing");
  if (!/href="\/call"/.test(main)) out.push("no apply link to /call");
  if (!/data-guide-callout/.test(main)) out.push("no mid-page guide offer");
  const title = decode((html.match(/<title>([^<]*)<\/title>/) || [])[1] ?? "");
  if (!/Private AI/.test(title) || title.length > 65) out.push(`title "${title}"`);
  const desc = decode((html.match(/<meta name="description" content="([^"]*)"/) || [])[1] ?? "");
  if (desc.length < 120 || desc.length > 160) out.push(`description is ${desc.length} chars`);
  if (!/<meta name="robots" content="index/.test(html)) out.push("page is not indexable");
  const schema = (html.match(/<script id="site-schema" type="application\/ld\+json">([\s\S]*?)<\/script>/) || [])[1];
  const types = schema ? JSON.parse(schema)["@graph"].map((n) => n["@type"]).flat() : [];
  for (const t of ["FAQPage", "Service"]) if (!types.includes(t)) out.push(`no ${t} structured data`);
  return out;
}

async function page() {
  assert.ok(pageProblems('<main id="main-content"><h1>x</h1></main>').length > 15, "page rules cannot fail");
  assert.ok(
    pageProblems('<main id="main-content"><p>Breaks even in 9 to 18 months on an H100</p></main>').some((p) => p.includes("unverified")),
    "rejected-claim rule cannot fail",
  );
  assert.ok(
    pageProblems('<main id="main-content"><p>Runs on an H100</p></main>').some((p) => p.includes("hardware or model")),
    "pieces rule cannot fail",
  );
  const problems = pageProblems(await readFile(FILE, "utf8"));
  const sitemap = await readFile("dist/sitemap.xml", "utf8");
  if (!sitemap.includes("<loc>https://growthcred.co.za/private-ai</loc>")) problems.push("not in the sitemap");
  if (problems.length) {
    console.error(`PRIVATE AI PAGE FAILED (${problems.length}):\n  - ` + problems.join("\n  - "));
    process.exit(1);
  }
  console.log("private-ai page verification passed");
}

async function reach() {
  const problems = [];
  const home = await readFile("dist/index.html", "utf8");
  const header = (home.match(/<header[\s\S]*?<\/header>/) || [""])[0];
  if (!/href="\/private-ai"/.test(header)) problems.push("the header nav does not link /private-ai");
  const own = (mainOf(home).match(/<section[^>]*id="own"[\s\S]*?<\/section>/) || [""])[0];
  if (!/href="\/private-ai"/.test(own)) problems.push("the homepage ownership section does not link /private-ai");
  for (const f of ["dist/about.html", "dist/corporate-ai-training.html"]) {
    const html = await readFile(f, "utf8");
    // The site footer is the page's last <footer>; a quote's <footer> can come first.
    const footer = html.slice(html.lastIndexOf("<footer"));
    if (!/href="\/private-ai"/.test(footer)) problems.push(`${f}: footer does not link /private-ai`);
  }
  assert.ok(!/href="\/private-ai"/.test("<header></header>"), "reach rule cannot fail");
  if (problems.length) {
    console.error(`PRIVATE AI REACH FAILED:\n  - ` + problems.join("\n  - "));
    process.exit(1);
  }
  console.log("private-ai reach verification passed");
}

/* ---------------- visuals, motion, photos ---------------- */

const TEXT_SECTIONS = ["hero", "pain", "cost-of-renting", "fixes", "own", "evidence", "cost", "who", "wrong-call", "how", "close"];

function visualProblems(html) {
  const out = [];
  const main = mainOf(html);
  const scenes = new Set([...main.matchAll(/data-scene="([a-z]+)"/g)].map((m) => m[1]));
  if (scenes.size < 18) out.push(`only ${scenes.size} distinct drawn scenes (need 18)`);
  for (const id of TEXT_SECTIONS) {
    const sec = (main.match(new RegExp(`<section[^>]*id="${id}"[\\s\\S]*?</section>`)) || [""])[0];
    if (!sec) out.push(`section #${id} missing`);
    else if (!/data-scene=|<img\b/.test(sec)) out.push(`section #${id} is text only`);
  }
  return out;
}

async function visuals() {
  assert.ok(visualProblems('<main id="main-content"><section id="hero"><p>words</p></section></main>').length > 5, "visual rules cannot fail");
  const problems = visualProblems(await readFile(FILE, "utf8"));
  if (problems.length) {
    console.error(`PRIVATE AI VISUALS FAILED:\n  - ` + problems.join("\n  - "));
    process.exit(1);
  }
  console.log("private-ai visuals verification passed");
}

function motionProblems(css) {
  const out = [];
  const kf = (css.match(/@keyframes gcPop\s*\{[\s\S]*?\n\}/) || [""])[0];
  if (!kf) out.push("no gcPop keyframes");
  const props = [...kf.matchAll(/^\s+([a-z-]+):/gm)].map((m) => m[1]);
  for (const prop of props) if (!["opacity", "scale", "transform", "translate"].includes(prop)) out.push(`gcPop animates ${prop}`);
  // Every .gc-pop rule sits inside the view-timeline support check and the no-preference query.
  const uses = [...css.matchAll(/\.gc-pop\s*\{/g)].map((m) => m.index);
  if (!uses.length) out.push("no .gc-pop rule");
  for (const at of uses) {
    const before = css.slice(Math.max(0, at - 220), at);
    if (!/@supports \(animation-timeline: view\(\)\)\s*\{\s*@media \(prefers-reduced-motion: no-preference\)\s*\{\s*$/.test(before))
      out.push(".gc-pop is styled outside @supports(view()) + no-preference");
  }
  return out;
}

async function motion() {
  assert.ok(motionProblems("@keyframes gcPop {\n  from {\n    width: 0;\n  }\n}\n.gc-pop { animation: gcPop; }").length >= 2, "motion rules cannot fail");
  const problems = motionProblems(await readFile("src/index.css", "utf8"));
  if (problems.length) {
    console.error(`PRIVATE AI MOTION FAILED:\n  - ` + problems.join("\n  - "));
    process.exit(1);
  }
  console.log("private-ai motion verification passed");
}

/** Captions may say what a photo shows. They may not say a client runs private AI. */
const OVERCLAIM = /(client|customer)s?[^.]{0,60}\b(run|running|deployed|uses|using)\b[^.]{0,30}private ai/i;

async function photos() {
  assert.ok(OVERCLAIM.test("Our clients are running private AI"), "overclaim rule cannot fail");
  const main = mainOf(await readFile(FILE, "utf8"));
  const problems = [];
  const imgs = [...main.matchAll(/<img\b[^>]*>/g)].map((m) => m[0]);
  if (imgs.length < 2) problems.push(`only ${imgs.length} photos`);
  for (const tag of imgs) {
    const src = (tag.match(/src="([^"]+)"/) || [])[1];
    const alt = decode((tag.match(/alt="([^"]*)"/) || [])[1] ?? "");
    if (alt.length < 12) problems.push(`${src}: alt text too short`);
    if (!/width="\d+"/.test(tag) || !/height="\d+"/.test(tag)) problems.push(`${src}: no width/height (layout shift)`);
    try {
      await access("dist" + src);
    } catch {
      problems.push(`${src}: not shipped in dist`);
    }
  }
  for (const m of main.matchAll(/<figcaption[^>]*>([\s\S]*?)<\/figcaption>/g))
    if (OVERCLAIM.test(text(m[1]))) problems.push(`caption overclaims: ${text(m[1]).slice(0, 80)}`);
  if (problems.length) {
    console.error(`PRIVATE AI PHOTOS FAILED:\n  - ` + problems.join("\n  - "));
    process.exit(1);
  }
  console.log(`private-ai photos verification passed: ${imgs.length} photos`);
}

if (mode === "page") await page();
else if (mode === "reach") await reach();
else if (mode === "visuals") await visuals();
else if (mode === "motion") await motion();
else if (mode === "photos") await photos();
else {
  console.error("usage: verify-private-ai.mjs page|reach|visuals|motion|photos");
  process.exit(2);
}
