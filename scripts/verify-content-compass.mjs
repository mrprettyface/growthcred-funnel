#!/usr/bin/env node
/**
 * Content compass: the 34 question shapes, the empty-slot placeholders,
 * and the built page a visitor can open without an account.
 */
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { transformWithEsbuild } from "vite";

const source = await readFile("src/lib/contentCompass.ts", "utf8");
const { code } = await transformWithEsbuild(source, "contentCompass.ts", { loader: "ts" });
const compass = await import("data:text/javascript;base64," + Buffer.from(code).toString("base64"));

assert.equal(compass.QUESTION_TEMPLATES.length, 34, "reel has 34 shapes");

const empty = compass.questionsFor({ service: "", company: "", competitor: "" });
const expectedEmpty = [
  "How much does [your service] cost?",
  "How long does [your service] last?",
  "Who's the best [your service] near me?",
  "When should I get [your service]?",
  "Why does my [your service] keep breaking?",
  "Which [your service] is best?",
  "Can I fix [your service] myself?",
  "Will insurance cover my [your service]?",
  "Do I ever need [your service]?",
  "Should I repair or replace [your service]?",
  "Is [your service] worth it?",
  "Is [your service] safe?",
  "[your service] versus [competitor]",
  "[your service] or [competitor]?",
  "[your service] companies like [competitor]",
  "Alternatives to [your service]",
  "[your company] reviews",
  "[your service] near me",
  "[your service] open now",
  "Same-day [your service]",
  "[your service] for beginners",
  "[your service] with bad credit",
  "[your service] without insurance",
  "Cheapest [your service]",
  "Most popular [your service]",
  "Emergency [your service]",
  "Problems with [your service]",
  "[your service] mistakes to avoid",
  "[your service] before and after",
  "How long does [your service] take?",
  "What happens after [your service]?",
  "Can I pay for [your service] monthly?",
  "Free [your service] quote",
  "Is [your company] a scam?",
];
assert.deepEqual(empty, expectedEmpty);

const filled = compass.questionsFor({ service: "  private   AI ", company: "GrowthCred", competitor: "Acme" });
assert.equal(filled[0], "How much does private AI cost?");
assert.equal(filled[12], "private AI versus Acme");
assert.equal(filled[13], "private AI or Acme?");
assert.equal(filled[14], "private AI companies like Acme");
assert.equal(filled[16], "GrowthCred reviews");
assert.equal(filled[33], "Is GrowthCred a scam?");

const serviceOnly = compass.questionsFor({ service: "conti suits", company: "", competitor: "" });
assert.equal(serviceOnly[14], "conti suits companies like [competitor]");
assert.equal(serviceOnly[16], "[your company] reviews");
assert.equal(serviceOnly[33], "Is [your company] a scam?");

const injected = compass.questionsFor({ service: "best {competitor}", company: "Co", competitor: "Rival" });
assert.equal(injected[12], "best {competitor} versus Rival");

const examples = compass.EXAMPLE_GROUPS.flatMap((group) => group.values);
assert.deepEqual(examples, ["private AI", "Company Brain", "Quote Engine", "conti suits", "security uniforms"]);
for (const example of examples) assert.doesNotMatch(example, /R\s?\d|\$\d|\bprice\b/i, `${example} invents a price`);

assert.equal(compass.downloadBasename(""), "content-compass");
assert.equal(compass.downloadBasename("  Private AI!! "), "content-compass-private-ai");
const text = compass.numberedQuestions(filled);
assert.equal(text.split("\n").length, 34);
assert.match(text, /^1\. How much does private AI cost\?/);
assert.match(text, /\n34\. Is GrowthCred a scam\?$/);
const markdown = compass.questionsMarkdown(filled, { service: "private AI", company: "GrowthCred", competitor: "Acme" });
assert.match(markdown, /^# 34 ways customers search/);
assert.match(markdown, /Competitor: Acme/);
assert.doesNotMatch(markdown, /Comment COMPASS/i);

const ui = await readFile("src/components/ContentCompass.tsx", "utf8");
assert.match(ui, /onClick=\{\(\) => setService\(example\)\}/, "preset chips must fill only the service field");
assert.doesNotMatch(ui, /setCompany\(example\)|setCompetitor\(example\)/);
assert.doesNotMatch(ui, /Comment COMPASS/i);
assert.doesNotMatch(ui, /\[PHILA/);
assert.match(ui, /href: "\/contact"|to="\/contact"/);

const html = await readFile("dist/tools/content-compass.html", "utf8");
assert.match(html, /<title>34 Ways Customers Search for You \| Content Compass<\/title>/);
assert.match(html, /content="index, follow, max-image-preview:large"/);
assert.match(html, /How much does \[your service\] cost\?/);
assert.match(html, /Is \[your company\] a scam\?/);
assert.match(html, /\[your service\] versus \[competitor\]/);
for (const example of examples) assert.ok(html.includes(example), `page is missing example ${example}`);
assert.match(html, /href="\/contact"/);
assert.match(html, /Copy all/);
assert.match(html, /Download \.txt/);
assert.match(html, /Download \.md/);
assert.match(html, /id="cc-service"/);
assert.match(html, /id="cc-company"/);
assert.match(html, /id="cc-competitor"/);
assert.doesNotMatch(html, /Comment COMPASS/i);
assert.doesNotMatch(html, /\[PHILA/);
assert.doesNotMatch(html, /websites answer/i);
assert.doesNotMatch(html, /ChatGPT will recommend/i);
assert.doesNotMatch(html, /Google will recommend/i);

const sitemap = await readFile("dist/sitemap.xml", "utf8");
assert.match(sitemap, /<loc>https:\/\/growthcred\.co\.za\/tools\/content-compass<\/loc>/);
const manifest = JSON.parse(await readFile("dist/search-manifest.json", "utf8"));
const route = manifest.routes.find((item) => item.path === "/tools/content-compass");
assert.equal(route?.index, true);
assert.equal(route?.prerendered, true);
const home = await readFile("dist/index.html", "utf8");
const resources = await readFile("dist/resources.html", "utf8");
assert.match(home, /href="\/tools\/content-compass"/);
assert.match(resources, /href="\/tools\/content-compass"/);
const calculator = await readFile("dist/tools/admin-time-calculator.html", "utf8");
assert.doesNotMatch(calculator, /id="cc-service"/, "the calculator page must stay the calculator");

console.log("content compass verification passed: 34 shapes, placeholders, presets, indexable page");
