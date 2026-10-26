#!/usr/bin/env node
/**
 * Gate for the long-tail situation pages and the three offer pages.
 * Reads dist/, so run `npm run build` first.
 *
 * Confirms the pages exist, are indexed, keep the proof rules, and are
 * linked from the same places as their siblings. A known-bad sample has to
 * fail before a pass means anything.
 */
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const read = (path) => readFile(path, "utf8");
const decode = (s) =>
  s.replace(/&amp;/g, "&").replace(/&#x27;|&#39;|&apos;/g, "'").replace(/&quot;/g, '"');

const SITUATIONS = [
  "/guides/ppe-quotes-without-the-owner",
  "/guides/staff-chatgpt-client-files-popia",
  "/guides/stop-training-every-new-hire",
];
const OFFERS = ["/quote-engine", "/company-brain", "/new-hire-trainer"];
const PAGES = [...SITUATIONS, ...OFFERS];

const FORBIDDEN = [
  /K\s*Force/i,
  /\bSandile\b/,
  /npdigital/i,
  /Neil Patel/i,
  /book a call/i,
  /\bR\s?\d/,
];

function problems(html, path) {
  const out = [];
  const title = decode((html.match(/<title>([^<]*)<\/title>/) || [])[1] ?? "");
  const desc = decode((html.match(/<meta name="description" content="([^"]*)"/) || [])[1] ?? "");
  if (title.length < 50 || title.length > 60) out.push(`${path}: title is ${title.length} chars`);
  if (desc.length < 120 || desc.length > 160) out.push(`${path}: description is ${desc.length} chars`);
  if (!/<meta name="robots" content="index/.test(html)) out.push(`${path}: not indexable`);
  if (!html.includes('href="/call"')) out.push(`${path}: no link to /call`);
  const main = html.slice(html.indexOf("<main"), html.indexOf("</main>"));
  for (const re of FORBIDDEN) if (re.test(decode(main))) out.push(`${path}: forbidden ${re}`);
  return out;
}

const bad = `<main><title>Short</title><meta name="description" content="Short."><meta name="robots" content="noindex"><p>K Force saved 48 hrs. Book a call. R990. Neil Patel at npdigital. Sandile.</p></main>`;
assert.ok(problems(bad, "/bad").length >= 5, "long-tail rules cannot fail");

const manifest = JSON.parse(await read("dist/search-manifest.json"));
const sitemap = await read("dist/sitemap.xml");
const llms = await read("dist/llms.txt");
const resources = await read("dist/resources.html");
const home = await read("dist/index.html");
const out = [];

for (const path of PAGES) {
  const route = manifest.routes.find((r) => r.path === path);
  if (!route?.index || !route.prerendered) out.push(`${path}: missing, not indexed, or not prerendered`);
  else out.push(...problems(await read(`dist/${route.file}`), path));
  if (!sitemap.includes(`<loc>https://growthcred.co.za${path}</loc>`)) out.push(`${path}: not in the sitemap`);
  if (!llms.includes(`https://growthcred.co.za${path}`)) out.push(`${path}: not in llms.txt`);
}

const popia = await read("dist/guides/staff-chatgpt-client-files-popia.html");
for (const href of ["/guides/private-ai-popia", "/guides/can-staff-paste-client-files-into-chatgpt", "/call"]) {
  if (!popia.includes(`href="${href}"`)) out.push(`POPIA situation page does not link ${href}`);
}
if (!/lawyer/i.test(popia)) out.push("POPIA situation page does not say to have a lawyer review");
if (!/not legal advice/i.test(popia)) out.push("POPIA situation page does not say it is not legal advice");

const ppe = await read("dist/guides/ppe-quotes-without-the-owner.html");
if (!ppe.includes('href="/quote-engine"')) out.push("PPE page does not link the Quote Engine");
if (!/will not name a PPE or uniform supplier/i.test(ppe)) out.push("PPE page does not keep the supplier unnamed");

const hire = await read("dist/guides/stop-training-every-new-hire.html");
if (!hire.includes('href="/new-hire-trainer"')) out.push("new-hire guide does not link the trainer");
if (!/do not have a measured time/i.test(hire)) out.push("new-hire guide does not refuse a time-to-productivity number");

for (const path of SITUATIONS) if (!resources.includes(`href="${path}"`)) out.push(`resources grid does not link ${path}`);
for (const path of OFFERS) {
  const header = (home.match(/<header[\s\S]*?<\/header>/) || [""])[0];
  const footer = (home.match(/<footer[\s\S]*?<\/footer>/) || [""])[0];
  if (!header.includes(`href="${path}"`)) out.push(`nav does not link ${path}`);
  if (!footer.includes(`href="${path}"`)) out.push(`footer does not link ${path}`);
}

const joburg = await read("dist/ai-automation-johannesburg.html");
if (!joburg.includes('href="/guides/ppe-quotes-without-the-owner"')) out.push("Johannesburg page does not link the PPE guide");
if (!joburg.includes('href="/guides/stop-training-every-new-hire"')) out.push("Johannesburg page does not link the new-hire guide");

const privateAi = await read("dist/private-ai.html");
if (!privateAi.includes('href="/guides/staff-chatgpt-client-files-popia"')) out.push("private-ai does not link the staff ChatGPT situation");
if (!privateAi.includes('href="/company-brain"')) out.push("private-ai does not link Company Brain");

const popiaGuide = await read("dist/guides/private-ai-popia.html");
if (!popiaGuide.includes('href="/guides/staff-chatgpt-client-files-popia"')) out.push("POPIA guide does not link the situation page");

if (out.length) {
  console.error(`LONG-TAIL FAILED (${out.length}):\n  - ` + out.join("\n  - "));
  process.exit(1);
}
console.log(`long-tail verification passed: ${PAGES.length} pages indexed, linked and free of named clients, prices and borrowed pitches`);
