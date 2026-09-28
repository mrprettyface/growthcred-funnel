#!/usr/bin/env node
/**
 * Gate oracle for GATES-own-intelligence.md: the homepage repositioned around
 * "Let us help you own your intelligence." (29 Sep 2026).
 *
 *   home   — the built homepage leads with the pitch, keeps the pain, adds the
 *            renting and ownership sections, labels proof honestly, keeps the
 *            guarantee and disclaimer verbatim, answers the new FAQs, names no
 *            hardware or model, and carries the new title and description.
 *   nav    — every built page's header has the Harvey-style groups, and the
 *            dropdown links are in the prerendered HTML for crawlers.
 *   call   — /call says the same pitch and keeps its locked headline.
 *   suite  — every pre-existing site check still passes (the three that failed
 *            before this work are excluded and named).
 *
 * Reads dist/, so run `npm run build` first. Each rule set is first run
 * against a known-bad input, so a rule that cannot fail is caught.
 */
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { spawnSync } from "node:child_process";

const mode = process.argv[2];

const decode = (s) =>
  s.replace(/&amp;/g, "&").replace(/&#x27;|&#39;|&rsquo;/g, "'").replace(/&quot;/g, '"').replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&nbsp;/g, " ");
const text = (html) => decode(html.replace(/<script[\s\S]*?<\/script>/g, " ").replace(/<[^>]+>/g, " ")).replace(/\s+/g, " ").trim();
const mainOf = (html) => {
  const i = html.indexOf('<main id="main-content">');
  return i < 0 ? "" : html.slice(i, html.indexOf("</main>", i));
};

/* ---------------- home ---------------- */

const GUARANTEE = "If the Command Core doesn't give you back at least 20% of your week, the engagement is on us.";
const PIECES = /\b(mac ?mini|mac studio|gpu|nvidia|rtx|vram|llama|qwen|mistral|deepseek|gemma|ollama|lm studio)\b/i;

function homeProblems(html) {
  const out = [];
  const main = mainOf(html);
  const body = text(main);
  const h1s = [...html.matchAll(/<h1[\s>][\s\S]*?<\/h1>/g)].map((m) => text(m[0]));
  if (h1s.length !== 1) out.push(`${h1s.length} h1`);
  else if (h1s[0] !== "Let us help you own your intelligence.") out.push(`h1 is "${h1s[0]}"`);
  if (!/Your data never leaves the building\./.test(body)) out.push("hero sub does not say the data never leaves the building");
  for (const id of ["hero", "capacity", "renting", "own", "results", "stories", "method", "stages", "founder", "guarantee", "ways", "faq", "close"])
    if (!new RegExp(`<section[^>]*\\bid="${id}"`).test(main)) out.push(`missing section #${id}`);
  if (!/Organisations we've worked with/.test(body)) out.push("the logo strip is not labelled");
  if (!/R3M–R10M/.test(body) || !/R20,000/.test(body)) out.push("the R200 vs R20,000 pain section is gone");
  if (!/Runs GrowthCred on its own private AI\./.test(body)) out.push("the founder's own-deployment line is missing");
  if (!body.includes(GUARANTEE)) out.push("the guarantee is not verbatim");
  if (!/Illustrative benchmarks\. Results vary by engagement\./.test(body)) out.push("the before/after lost its disclaimer");
  if (!/owners who worked with us through our training and builds/i.test(body)) out.push("the stories are not labelled honestly");
  if (!/href="\/corporate-ai-training"/.test(main)) out.push("the ways in do not include corporate training");
  for (const q of ["Where does our data go?", "What equipment do we need?", "What happens when a better AI model comes out?", "What is the Command Core?", "How is this different from ChatGPT?"])
    if (!body.includes(q)) out.push(`FAQ missing: ${q}`);
  const piece = body.match(PIECES);
  if (piece) out.push(`names a hardware or model piece: ${piece[0]}`);
  const title = (html.match(/<title>([^<]*)<\/title>/) || [])[1] ?? "";
  if (!/Own Your Intelligence/.test(decode(title))) out.push(`title is "${title}"`);
  const desc = decode((html.match(/<meta name="description" content="([^"]*)"/) || [])[1] ?? "");
  if (desc.length < 120 || desc.length > 160) out.push(`description is ${desc.length} chars`);
  if (!/own your intelligence/i.test(desc)) out.push("description does not carry the pitch");
  return out;
}

async function home() {
  // Negative controls: a bare page fails many rules; a page naming a model fails the pieces rule.
  assert.ok(homeProblems('<main id="main-content"><h1>Hi</h1></main>').length > 10, "home rules cannot fail");
  assert.ok(
    homeProblems('<main id="main-content"><p>Runs on a Mac mini with Llama</p></main>').some((p) => p.includes("hardware or model")),
    "pieces rule cannot fail",
  );
  const problems = homeProblems(await readFile("dist/index.html", "utf8"));
  if (problems.length) {
    console.error(`HOME FAILED (${problems.length}):\n  - ` + problems.join("\n  - "));
    process.exit(1);
  }
  console.log("own-intelligence home verification passed");
}

/* ---------------- nav ---------------- */

const GROUPS = ["Command Core", "Solutions", "Customers", "Security", "Resources"];
const MENU_LINKS = ["/", "/corporate-ai-training", "/ai-automation-south-africa", "/ai-training-south-africa", "/ai-for-law-firms", "/ai-for-financial-services", "/stories", "/data-and-security", "/resources", "/workshop", "/webinar", "/tools/admin-time-calculator", "/about"];

function navProblems(html, file) {
  const out = [];
  const header = (html.match(/<header[\s\S]*?<\/header>/) || [""])[0];
  const nav = (header.match(/<nav[^>]*aria-label="Main"[\s\S]*?<\/nav>/) || [""])[0];
  if (!nav) return [`${file}: no main nav in the header`];
  const labels = text(nav);
  let at = -1;
  for (const g of GROUPS) {
    const i = labels.indexOf(g);
    if (i < 0) out.push(`${file}: nav group "${g}" missing`);
    else if (i < at) out.push(`${file}: nav group "${g}" out of order`);
    else at = i;
  }
  for (const href of MENU_LINKS) if (!new RegExp(`href="${href}"`).test(nav)) out.push(`${file}: nav does not link ${href}`);
  if (!/aria-expanded="false"/.test(nav)) out.push(`${file}: dropdown buttons do not expose aria-expanded`);
  return out;
}

async function nav() {
  assert.ok(navProblems("<header><nav aria-label=\"Main\"><a href=\"/\">Home</a></nav></header>", "control").length > 5, "nav rules cannot fail");
  const problems = [];
  for (const f of ["dist/index.html", "dist/about.html", "dist/corporate-ai-training.html", "dist/ai-for-law-firms.html", "dist/workshop.html", "dist/contact.html"])
    problems.push(...navProblems(await readFile(f, "utf8"), f));
  const src = await readFile("src/components/Layout.tsx", "utf8");
  const navConst = (src.match(/const NAV = \[[\s\S]*?\];/) || [""])[0]; // the same pattern verify-corporate uses
  if (!/\/corporate-ai-training/.test(navConst)) problems.push("Layout.tsx NAV does not list the corporate page (verify-corporate reads it)");
  if (problems.length) {
    console.error(`NAV FAILED (${problems.length}):\n  - ` + problems.join("\n  - "));
    process.exit(1);
  }
  console.log("own-intelligence nav verification passed");
}

/* ---------------- call ---------------- */

async function call() {
  const html = await readFile("dist/call.html", "utf8");
  const body = text(mainOf(html));
  const problems = [];
  if (!/own your intelligence/i.test(body)) problems.push("/call does not carry the pitch");
  if (!/We Take It All Off Your Plate\./.test(text((html.match(/<h1[\s>][\s\S]*?<\/h1>/) || [""])[0]))) problems.push("/call lost its locked headline");
  if (!/id="apply-phone"/.test(html)) problems.push("/call lost its fast form");
  assert.ok(!/own your intelligence/i.test("We take it all off your plate"), "call rule cannot fail");
  if (problems.length) {
    console.error(`CALL FAILED:\n  - ` + problems.join("\n  - "));
    process.exit(1);
  }
  console.log("own-intelligence call verification passed");
}

/* ---------------- suite ---------------- */

/** Every existing check. review-order, host-portable and verify-human-layer failed before this work and are excluded. */
const SUITE = [
  ["verify-seo.mjs"], ["verify-seo-onpage.mjs"], ["verify-strategy-home.mjs"], ["verify-bundle-budget.mjs"],
  ["verify-voice.mjs", "check"], ["verify-search-behavior.mjs"], ["verify-stories.mjs"], ["verify-workshop-moved.mjs"],
  ["verify-hosts-reposition.mjs"],
  ...["page", "roi", "swept"].map((m) => ["verify-corporate.mjs", m]),
  ...["research", "copy", "integration"].map((m) => ["verify-finance-law.mjs", m]),
  ...["audit", "copy", "integration"].map((m) => ["verify-value-articles.mjs", m]),
  ...["no-blur", "type-floor", "sizer", "tap-targets", "static-blur-only", "drag-compare", "reveal-fails-open", "no-ignored-pt0",
    "no-invented-proof", "demo-everywhere", "workshop-route", "workshop-cta", "unique-ids", "perf-guards", "magnet-funnel"].map((g) => ["verify-mobile.mjs", g]),
];

function suite() {
  const failed = [];
  for (const [script, ...args] of SUITE) {
    const r = spawnSync(process.execPath, [`scripts/${script}`, ...args], { encoding: "utf8" });
    if (r.status !== 0) failed.push(`${script} ${args.join(" ")}: ${(r.stderr || r.stdout).trim().split("\n").slice(-2).join(" | ")}`);
  }
  if (failed.length) {
    console.error(`SUITE FAILED (${failed.length}/${SUITE.length}):\n  - ` + failed.join("\n  - "));
    process.exit(1);
  }
  console.log(`own-intelligence suite passed: ${SUITE.length} existing checks`);
}

if (mode === "home") await home();
else if (mode === "nav") await nav();
else if (mode === "call") await call();
else if (mode === "suite") suite();
else {
  console.error("usage: verify-own-intelligence.mjs home|nav|call|suite");
  process.exit(2);
}
