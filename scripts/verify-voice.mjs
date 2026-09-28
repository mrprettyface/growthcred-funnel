// Scores every prerendered page against the house voice (docs/editorial/VOICE.md).
//
//   node scripts/verify-voice.mjs audit   — table of every route, worst first
//   node scripts/verify-voice.mjs check   — fails if any route breaks the rules
//
// It reads the built HTML in dist/, so run `npm run build` first. Only <main>
// is scored: the header and footer are shared chrome, and legal pages
// (terms, privacy, refunds) are held to the banned-word rule only, because
// their sentences are contractual and must not be shortened for style.
import assert from "node:assert/strict";
import { readdir, readFile } from "node:fs/promises";
import { join, relative } from "node:path";

const mode = process.argv[2] ?? "audit";
const DIST = "dist";

/** The words and phrases the voice guide bans outright. */
export const BANNED = [
  /\bleverag(e|es|ed|ing)\b/i,
  /\butili[sz](e|es|ed|ing|ation)\b/i,
  /\bstreamlin(e|es|ed|ing)\b/i,
  /harness(es|ed|ing)? the power/i,
  /rapidly evolving/i,
  /in today['’]s .{0,30}(landscape|world)/i,
  /it['’]s important to note|it is important to note/i,
  /\bin conclusion\b/i,
  /one should consider/i,
  /businesses often find/i,
];

/** Headings that read like a textbook chapter rather than a person talking. */
const TEXTBOOK = /^(understanding|exploring|the importance of|an? (guide|introduction) to)\s+\S|^(introduction|overview|conclusion|key (considerations|takeaways|benefits))\b/i;

/** Contractual pages: banned words still apply, sentence rules do not. */
const LEGAL = new Set(["/terms", "/privacy", "/refunds", "/404"]);

/** Thresholds for the sentence rules, per scored page. */
const MAX_AVG_WORDS = 12.5;
const MAX_LONG_SHARE = 0.03; // share of sentences over 25 words
const LONG = 25;
/** "you" plus "I"/"we", per 100 words. Talking to one person sounds like this. */
const MIN_PERSONAL = 5;
const PERSONAL = /\b(you|your|yours|you['’](re|ll|ve|d)|i|i['’](m|ve|ll|d)|me|my|we|we['’](re|ll|ve)|our|us)\b/gi;

async function htmlFiles(dir) {
  const out = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) out.push(...(await htmlFiles(path)));
    else if (entry.name.endsWith(".html")) out.push(path);
  }
  return out;
}

const decode = (s) => s
  .replace(/&nbsp;/g, " ").replace(/&amp;/g, "&").replace(/&quot;/g, "\"").replace(/&#x27;|&#39;/g, "'")
  .replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(+n));

/** Visible text of <main>, split into blocks at block-level tags. */
export function mainText(html) {
  const m = html.match(/<main[\s\S]*?<\/main>/i);
  let main = m ? m[0] : "";
  // Score the argument, not the chrome: the related-links band, the sidebar,
  // author box and breadcrumb are shared furniture, and a source list is citations.
  const k = main.indexOf(">Keep going<");
  if (k > 0) main = main.slice(0, k);
  const body = main
    .replace(/<(script|style|svg|noscript|aside|nav)\b[\s\S]*?<\/\1>/gi, " ")
    .replace(/<section id="sources"[\s\S]*?<\/section>/gi, " ")
    .replace(/<\/(p|li|h[1-6]|div|section|blockquote|figcaption|td|th|dt|dd|button|a|label|span)>/gi, "$&\n")
    .replace(/<br\s*\/?>/gi, "\n");
  const headings = [...body.matchAll(/<h([1-6])[^>]*>([\s\S]*?)<\/h\1>/gi)].map((h) => decode(h[2].replace(/<[^>]+>/g, "")).trim());
  const blocks = decode(body.replace(/<[^>]+>/g, " "))
    .split("\n").map((l) => l.replace(/\s+/g, " ").trim()).filter(Boolean);
  return { blocks, headings };
}

/** Sentences from blocks that are prose; labels, prices and buttons are not sentences. */
export function sentences(blocks) {
  const out = [];
  for (const block of blocks) {
    const words = block.split(" ").length;
    if (words < 6 || !/[.!?…]["”’)]?$/.test(block)) continue;
    for (const s of block.split(/(?<=[.!?…]["”’)]?)\s+(?=["“‘(]?[A-Z0-9R])/)) {
      const n = s.split(/\s+/).filter((w) => /[A-Za-z0-9]/.test(w)).length;
      if (n) out.push({ text: s, words: n });
    }
  }
  return out;
}

export function score(html, route) {
  const { blocks, headings } = mainText(html);
  const text = blocks.join("\n");
  const sents = sentences(blocks);
  const words = text.split(/\s+/).filter(Boolean).length;
  const avg = sents.length ? sents.reduce((a, s) => a + s.words, 0) / sents.length : 0;
  const long = sents.filter((s) => s.words > LONG);
  const banned = BANNED.flatMap((re) => text.match(new RegExp(re.source, "gi")) ?? []);
  const textbook = headings.filter((h) => TEXTBOOK.test(h));
  const you = (text.match(/\b(you|your|you['’](re|ll|ve|d))\b/gi) ?? []).length;
  const personal = (text.match(PERSONAL) ?? []).length;
  return {
    route, words, sentences: sents.length, avg, longShare: sents.length ? long.length / sents.length : 0,
    long, banned, textbook, youPer100: words ? (you / words) * 100 : 0, personalPer100: words ? (personal / words) * 100 : 0, legal: LEGAL.has(route),
  };
}

function routeOf(file) {
  const r = "/" + relative(DIST, file).replace(/\\/g, "/").replace(/\.html$/, "");
  return r === "/index" ? "/" : r;
}

export function failures(s) {
  const f = [];
  if (s.banned.length) f.push(`banned: ${[...new Set(s.banned.map((b) => b.toLowerCase()))].join(", ")}`);
  if (s.textbook.length) f.push(`textbook heading: ${s.textbook.join(" | ")}`);
  if (!s.legal && s.sentences >= 5) {
    if (s.avg > MAX_AVG_WORDS) f.push(`avg sentence ${s.avg.toFixed(1)} words (max ${MAX_AVG_WORDS})`);
    if (s.longShare > MAX_LONG_SHARE) f.push(`${(s.longShare * 100).toFixed(0)}% of sentences over ${LONG} words (max ${MAX_LONG_SHARE * 100}%)`);
    if (s.words >= 150 && s.personalPer100 < MIN_PERSONAL) f.push(`you/I ${s.personalPer100.toFixed(1)} per 100 words (min ${MIN_PERSONAL})`);
  }
  return f;
}

async function all() {
  const files = (await htmlFiles(DIST)).filter((f) => !f.includes(`${DIST}/assets`));
  assert.ok(files.length > 30, `expected the prerendered site in ${DIST}/, found ${files.length} pages — run npm run build`);
  const scores = [];
  for (const file of files) scores.push(score(await readFile(file, "utf8"), routeOf(file)));
  return scores.sort((a, b) => b.avg - a.avg);
}

if (mode === "audit") {
  const scores = await all();
  console.log("route".padEnd(48), "words", " sents", "  avg", " >25w", " you/100", " you+I", " banned");
  for (const s of scores)
    console.log(s.route.padEnd(48), String(s.words).padStart(5), String(s.sentences).padStart(6), s.avg.toFixed(1).padStart(5),
      `${(s.longShare * 100).toFixed(0)}%`.padStart(5), s.youPer100.toFixed(1).padStart(8), s.personalPer100.toFixed(1).padStart(6), " ", [...new Set(s.banned)].join(", "));
  if (process.argv.includes("--long"))
    for (const s of scores) for (const l of s.long) console.log(`${s.route}\t${l.words}\t${l.text}`);
} else if (mode === "check") {
  // Negative controls: the checker must catch a known-bad page before its silence means anything.
  const bad = `<main><h2>Understanding revenue leakage</h2><p>It is important to note that firms leverage tools to streamline and utilise workflows in ways that one should consider carefully because the outcomes, which are many and varied, depend on a long list of conditions that nobody has read.</p><p>Short one here. And another. Then a third. Now a fourth. Fifth.</p></main>`;
  const control = failures(score(bad, "/control"));
  assert.ok(control.some((f) => f.startsWith("banned")), "control: banned words not detected");
  assert.ok(control.some((f) => f.startsWith("textbook")), "control: textbook heading not detected");
  assert.ok(control.some((f) => f.includes("over 25 words")), "control: long sentence not detected");
  const good = `<main><h2>Why billing leaks</h2><p>You did the work. You sent the invoice late. Nobody chased it. So the money never came.</p><p>That is the leak. It is not your clients. It is the gap.</p></main>`;
  assert.deepEqual(failures(score(good, "/control-good")), [], "control: a page in the house voice was flagged");

  const bad_routes = (await all()).map((s) => [s.route, failures(s)]).filter(([, f]) => f.length);
  for (const [route, f] of bad_routes) console.log(`${route}: ${f.join("; ")}`);
  assert.equal(bad_routes.length, 0, `${bad_routes.length} route(s) break the house voice`);
  console.log("voice verification passed");
} else if (mode === "source") {
  // The gated funnel pages (checkout, upsell, downsell, build, thank-you) are
  // never prerendered, so the built HTML can't vouch for them. Scan the source.
  // The live demo's "before" pane is deliberately bad AI writing; it may keep its cliché.
  const DELIBERATE = new Set(["src/components/webinar/LiveDemo.tsx"]);
  const files = [];
  const walk = async (dir) => {
    for (const e of await readdir(dir, { withFileTypes: true })) {
      const p = join(dir, e.name);
      if (e.isDirectory()) { if (e.name !== "reactbits") await walk(p); }
      else if (/\.(ts|tsx)$/.test(e.name)) files.push(p);
    }
  };
  await walk("src");
  const strings = (src) => [...src.matchAll(/"((?:[^"\\\n]|\\.)*)"|`((?:[^`\\]|\\.)*)`|>([^<>{}]+)</g)].map((m) => m[1] ?? m[2] ?? m[3]);
  const hitsIn = (src) => strings(src).flatMap((t) => BANNED.flatMap((re) => t.match(new RegExp(re.source, "gi")) ?? []));
  assert.ok(hitsIn(`const x = "We leverage AI to streamline it."; <p>In conclusion</p>`).length === 3, "control: banned words in source not detected");
  const bad = [];
  for (const f of files) {
    if (DELIBERATE.has(f.replace(/\\/g, "/"))) continue;
    const hits = hitsIn(await readFile(f, "utf8"));
    if (hits.length) bad.push(`${f}: ${[...new Set(hits)].join(", ")}`);
  }
  for (const b of bad) console.log(b);
  assert.equal(bad.length, 0, `${bad.length} source file(s) carry banned words`);
  // Bullets only where the reader needs a real checklist.
  const lists = ((await readFile("src/content/searchPages.ts", "utf8")).match(/items: \[/g) ?? []).length;
  assert.ok(lists <= 12, `${lists} bullet lists on search pages (max 12)`);
  console.log(`source voice verification passed: ${files.length} files, no banned words; ${lists} checklists on search pages.`);
} else {
  console.error("usage: node scripts/verify-voice.mjs audit|check|source [--long]");
  process.exit(2);
}
