// Gates for the house voice guide and the law-firm article (GATES-voice.md).
//
//   node scripts/verify-law-article.mjs guide        — VOICE.md exists and is wired in
//   node scripts/verify-law-article.mjs copy         — the article's structure and figures
//   node scripts/verify-law-article.mjs integration  — built, indexed, linked, guide button
//   node scripts/verify-law-article.mjs prices       — no price drifted from src/lib/offers.ts
import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { readFile, readdir } from "node:fs/promises";
import { join } from "node:path";

const mode = process.argv[2];
const read = (path) => readFile(path, "utf8");
const ROUTE = "/guides/law-firm-billing-leakage";

function pageBlock(source, route) {
  const start = source.indexOf(`path: "${route}"`);
  assert.notEqual(start, -1, `${route} is missing from src/content/searchPages.ts`);
  const end = source.indexOf("\n  {\n    path: ", start);
  return source.slice(start, end === -1 ? source.length : end);
}

/** Claims in the supplied pitch that could not be sourced (see docs/editorial/law-firm-article.md). */
const UNSOURCED = [
  /\b89\b|89 to 90|90 percent/i,             // collection rate: Clio 2025 says 93%
  /47 cents/i,                               // a blog's worked example, not a measurement
  /\b54 ?%|54 percent/i,                     // misread of a Rev survey about AI users' stress
  /11 ?% more admin/i,
  /25 to 35 percent|25[–-]35 ?%/i,           // admin overhead share: no source found
  /R ?600 ?k|R ?500 ?k|R ?300 ?k|R ?1[.,]4 ?million/i, // salaries: now a question, not a figure
  /law firm I walk into/i,                   // GrowthCred has no published law-firm clients
  /never had (someone|anyone)/i,             // invented proof
  /keep what I built/i,                      // extends the published guarantee
  /under 30 days/i,                          // an outcome promise
  /costs less than one hire/i,               // no published Command Core price
];

if (mode === "guide") {
  const voice = await read("docs/editorial/VOICE.md");
  for (const heading of ["## The voice", "## The structure for every article", "## Who is talking", "## The rules the voice never overrides", "## How to brief an AI for a new article", "## Swipe file"])
    assert.ok(voice.includes(heading), `VOICE.md is missing ${heading}`);
  for (const banned of ["leverage", "streamline", "harness the power of", "rapidly evolving landscape", "it's important to note", "in conclusion"])
    assert.ok(voice.toLowerCase().includes(banned), `VOICE.md does not ban "${banned}"`);
  assert.match(voice, /\*\*`\/call`\*\*/, "VOICE.md must send the final CTA to /call");
  assert.match(voice, /no `\/apply` route/, "VOICE.md must warn that /apply does not exist");
  const home = await read("src/lib/home.ts");
  const body = home.match(/GUARANTEE = \{[\s\S]*?body: "([^"]+)"/)[1];
  assert.ok(voice.includes(body), "VOICE.md does not quote the published guarantee exactly");
  for (const file of ["CLAUDE.md", "AGENTS.md"])
    assert.ok((await read(file)).includes("docs/editorial/VOICE.md"), `${file} does not point writers at VOICE.md`);
  console.log("voice guide verification passed");
} else if (mode === "copy") {
  const source = await read("src/content/searchPages.ts");
  const block = pageBlock(source, ROUTE);
  const text = block.replace(/\\u2019/g, "'");

  // The eight-part structure, in order.
  const titles = [...block.matchAll(/\{ title: "([^"]+)"/g)].map((m) => m[1]);
  const order = [/week/i, /number/i, /admin/i, /hiring/i, /^The fix/i, /^Faster/, /^Cheaper/, /^No risk/, /stays with you/i];
  assert.equal(titles.length, order.length, `expected ${order.length} sections, found ${titles.length}: ${titles.join(" | ")}`);
  order.forEach((re, i) => assert.match(titles[i], re, `section ${i + 1} is "${titles[i]}"`));
  const threes = text.match(/faster[,.] cheaper[,.] (and )?no risk/gi) ?? [];
  assert.ok(threes.length >= 3, `"faster, cheaper, no risk" said ${threes.length} times (min 3)`);

  // Mid-article guide, closing line, Apply → /call.
  const guide = block.match(/guide: \{ after: (\d+), line: "([^"]+)"/);
  assert.ok(guide, "no mid-article guide offer");
  assert.ok(+guide[1] >= 2 && +guide[1] <= titles.length - 3, "guide offer is not mid-article");
  assert.match(guide[2], /^If this sounds like/, "guide line does not open with 'If this sounds like'");
  assert.match(block, /ask: "Want us to do this for you\? Apply\."/, "closing ask is missing");
  assert.match(block, /cta: \{ to: "\/call", label: "Apply" \}/, "closing CTA does not go to /call");
  assert.doesNotMatch(block, /"\/apply"/, "links to /apply, which does not exist");

  // No bullets in the article body.
  assert.doesNotMatch(block, /items: \[/, "the article uses bullet points");

  // Figures: recomputed here from Clio's published rates, not copied.
  const clio = { recorded: 3.0, invoiced: 2.6, collected: 2.4, realization: 0.88, collection: 0.93, billDays: 43, payDays: 32 };
  const leak = 50_000_000 * (1 - clio.collection);
  assert.ok(text.includes(`R${(leak / 1e6).toFixed(1)} million`), `expected R${(leak / 1e6).toFixed(1)} million uncollected on R50M`);
  const banked = Math.round(100 * clio.realization * clio.collection);
  assert.ok(text.includes(`R${banked} in the bank`), `expected R${banked} banked per R100`);
  assert.ok(text.includes(`other R${100 - banked}`), `expected R${100 - banked} leaking per R100`);
  assert.ok(text.includes(`${clio.billDays + clio.payDays} days`), "lockup total is wrong");
  for (const n of [clio.recorded.toFixed(1), String(clio.invoiced), String(clio.collected), `${clio.collection * 100}%`, `${clio.realization * 100}%`, `${clio.billDays} days`, `${clio.payDays} days`])
    assert.ok(text.includes(n), `article does not state ${n}`);
  assert.match(text, /North American/, "Clio's sample is not labelled");
  for (const n of ["400 legal professionals", "39%", "63%", "22%"]) assert.ok(text.includes(n), `8am figure missing: ${n}`);
  for (const host of ["clio.com/resources/legal-trends/benchmarks", "abovethelaw.com/2026/08", "lpc.org.za"])
    assert.ok(block.includes(host), `source missing: ${host}`);

  // The guarantee, word for word as published on /.
  const home = await read("src/lib/home.ts");
  const guarantee = home.match(/GUARANTEE = \{[\s\S]*?body: "([^"]+)"/)[1];
  assert.ok(text.includes(guarantee.replace(/’/g, "'")), "guarantee differs from the published wording");

  // None of the pitch's unsourced claims survived. Negative control first.
  const pitch = "The average law firm only collects about 89 to 90 percent. 47 cents of every rand. 54% of lawyers. Every single law firm I walk into. You keep what I built.";
  assert.ok(UNSOURCED.filter((re) => re.test(pitch)).length >= 5, "negative control: unsourced-claim patterns miss the pitch");
  const hits = UNSOURCED.filter((re) => re.test(text));
  assert.equal(hits.length, 0, `unsourced claim(s) in the article: ${hits.join(", ")}`);

  // Boundaries and first-hand evidence.
  assert.match(text, /doesn't do legal research/, "legal-research boundary missing");
  assert.match(text, /checks every authority/, "verification duty missing");
  assert.match(text, /WeWork/, "no first-hand evidence");
  assert.match(text, /haven't published one yet/, "does not admit there is no law-firm case study");
  console.log("law article copy verification passed");
} else if (mode === "integration") {
  const manifest = JSON.parse(await read("dist/search-manifest.json"));
  const record = manifest.routes.find((r) => r.path === ROUTE);
  assert.ok(record, `${ROUTE} is not in the built manifest`);
  assert.equal(record.index, true, "article is not indexed");
  assert.equal(record.prerendered, true, "article is not prerendered");
  const html = await read(`dist/${record.file}`);
  const main = html.slice(html.indexOf("<main"), html.indexOf("</main>"));
  assert.equal((main.match(/<h1[\s>]/g) ?? []).length, 1, "article must have exactly one H1");
  assert.match(main, /aria-label="The AI Implementation Guide"[\s\S]*?<button[^>]*type="button"[^>]*>Send me the guide</, "guide callout button not rendered");
  const callout = main.indexOf('aria-label="The AI Implementation Guide"');
  assert.ok(callout > main.indexOf("The fix") && callout < main.indexOf("Faster: same day"), "guide callout is not after the fix");
  assert.match(main, /aria-label="Next step"[\s\S]*?Want us to do this for you\? Apply\.[\s\S]*?href="\/call"/, "closing Apply → /call not rendered");
  assert.ok((await read("dist/sitemap.xml")).includes(`https://growthcred.co.za${ROUTE}`), "article not in sitemap");
  for (const from of ["resources.html", "ai-for-law-firms.html"])
    assert.match(await read(`dist/${from}`), new RegExp(`href="${ROUTE}"`), `${from} does not link the article`);
  // The button reaches the opt-in card through GUIDE_EVENT.
  const guide = await read("src/lib/guide.ts"), offer = await read("src/components/GuideOffer.tsx");
  assert.match(guide, /export function requestGuide/);
  assert.match(offer, /addEventListener\(GUIDE_EVENT, openNow\)/, "GuideOffer does not listen for the in-article request");
  assert.match(offer, /__gcGuideRequested\) openNow\(\)/, "a click before GuideOffer mounts would be lost");
  console.log("law article integration verification passed");
} else if (mode === "prices") {
  // offers.ts amounts must be exactly what HEAD had: this work changes words, not prices.
  const now = await read("src/lib/offers.ts");
  const head = execFileSync("git", ["show", "HEAD:src/lib/offers.ts"], { encoding: "utf8" });
  const amounts = (s) => [...s.matchAll(/amountCents: (\d+)/g)].map((m) => m[1]).join(",");
  assert.equal(amounts(now), amounts(head), "offers.ts amounts changed");
  assert.equal(amounts(now), "99000,50000,2500000,399900", "offers.ts amounts are not the Whop-matched set");
  // Every rand figure in source copy was either there before this work or is one of the article's sourced figures.
  const baseline = new Set((await read("scripts/fixtures/voice-rand-baseline.txt")).split("\n").map((l) => l.trim().replace(/^\d+\s+/, "")).filter(Boolean));
  const allowedNew = new Set(["R50 million", "R3.5 million", "R100", "R82", "R18"]);
  const files = [];
  const walk = async (dir) => { for (const e of await readdir(dir, { withFileTypes: true })) { const p = join(dir, e.name); if (e.isDirectory()) await walk(p); else if (/\.(ts|tsx)$/.test(e.name)) files.push(p); } };
  for (const dir of ["src/content", "src/lib", "src/pages", "src/components"]) await walk(dir);
  const found = new Set();
  for (const f of files) for (const m of (await read(f)).matchAll(/R ?[0-9][0-9 ,.]*[0-9](k|M| ?million)?/g)) found.add(m[0]);
  const fresh = [...found].filter((r) => !baseline.has(r) && !allowedNew.has(r));
  assert.deepEqual(fresh, [], `new rand figures not in the baseline: ${fresh.join(", ")}`);
  assert.ok(baseline.has("R990") && baseline.has("R25 000"), "baseline snapshot is missing known prices");
  console.log("price verification passed");
} else if (mode === "humanlayer") {
  // verify-human-layer failed at HEAD (1a33a45) on eight lines. This work fixed five
  // (finance, law, proposals: first-hand lines; tools, SA challenges: queued for Phila).
  // The corporate page's missing byline/author box is a layout gap that predates it,
  // so exactly those three lines are tolerated, and nothing else.
  const PRE_EXISTING = new Set([
    "/corporate-ai-training: no author byline",
    "/corporate-ai-training: no visible date",
    "/corporate-ai-training: no author box",
  ]);
  let out = "";
  try { out = execFileSync("node", ["scripts/verify-human-layer.mjs"], { encoding: "utf8", stdio: ["ignore", "pipe", "pipe"] }); }
  catch (e) { out = `${e.stdout ?? ""}${e.stderr ?? ""}`; }
  const lines = [...out.matchAll(/^\s+- (.+)$/gm)].map((m) => m[1].trim());
  const fresh = lines.filter((l) => !PRE_EXISTING.has(l));
  assert.ok(lines.length > 0 || /human layer verification passed/.test(out), `unexpected human-layer output: ${out.slice(0, 200)}`);
  assert.deepEqual(fresh, [], `new human-layer failures: ${fresh.join(" | ")}`);
  console.log(`human layer: no new failures (${lines.length} pre-existing corporate line(s) tolerated)`);
} else {
  console.error("usage: node scripts/verify-law-article.mjs guide|copy|integration|prices|humanlayer");
  process.exit(2);
}
