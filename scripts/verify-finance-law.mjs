import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const mode = process.argv[2];
const read = (path) => readFile(path, "utf8");
const routes = ["/ai-for-financial-services", "/ai-for-law-firms"];

function pageBlock(source, route, nextRoute) {
  const start = source.indexOf(`path: "${route}"`);
  assert.notEqual(start, -1, `${route} is missing from search page content`);
  const end = nextRoute ? source.indexOf(`path: "${nextRoute}"`, start + 1) : source.length;
  assert.notEqual(end, -1, `could not find the end of ${route}`);
  return source.slice(start, end);
}

if (mode === "research") {
  const report = await read("docs/market-research/finance-and-law-firms.md");
  for (const heading of [
    "## Finance: where the appetite is serious",
    "## Law firms: where the appetite is serious",
    "### Priority segments and buying triggers",
    "### The problems to name on the page",
    "### The alternative GrowthCred should sell",
    "### Offer fit",
    "## Sources and claim boundaries",
  ]) assert.ok(report.includes(heading), `research is missing ${heading}`);
  for (const source of ["resbank.co.za", "fsca.co.za", "legal.thomsonreuters.com", "lpc.org.za", "clio.com"])
    assert.ok(report.includes(source), `research is missing ${source}`);
  for (const segment of ["Accounting, bookkeeping", "Independent advisers", "Boutique commercial", "Small-to-mid-sized firms"])
    assert.ok(report.includes(segment), `research is missing priority segment: ${segment}`);
  assert.match(report, /not a claim that GrowthCred has\s+already produced results/i);
  console.log("finance-law research verification passed");
} else if (mode === "copy") {
  const source = await read("src/content/searchPages.ts");
  const finance = pageBlock(source, routes[0], routes[1]);
  const law = pageBlock(source, routes[1], "/ai-automation-johannesburg");
  for (const [name, block] of [["finance", finance], ["law", law]]) {
    assert.ok(block.split(/\s+/).length > 600, `${name} page is too thin to answer the market's questions`);
    for (const phrase of ["A better way", "Workshop or implementation", "Apply for implementation", "Explore the workshop", "sources:"])
      assert.ok(block.toLowerCase().includes(phrase.toLowerCase()), `${name} page is missing ${phrase}`);
    assert.match(block, /human|person|practitioner|professional/i, `${name} page lacks human review`);
    assert.match(block, /redacted/i, `${name} page lacks safe workshop-data guidance`);
    assert.match(block, /measure|scorecard/i, `${name} page lacks a measurement plan`);
  }
  assert.match(finance, /does not replace an accountant/);
  assert.match(finance, /Start with one controlled workflow/);
  assert.match(finance, /credit decisions/);
  assert.match(law, /does not offer autonomous legal research/);
  assert.match(law, /Fix one matter workflow first/);
  assert.match(law, /verify every authority/);
  const inventedProof = /GrowthCred (?:has )?(?:helped|transformed) (?:banks|law firms)|our (?:banking|legal) clients (?:saved|achieved)/i;
  assert.doesNotMatch(finance + law, inventedProof, "industry pages contain invented GrowthCred proof");
  assert.match("GrowthCred helped banks", inventedProof, "invented-proof negative control cannot detect a known positive");
  console.log("finance-law copy verification passed");
} else if (mode === "integration") {
  const manifest = JSON.parse(await read("dist/search-manifest.json"));
  const layout = await read("src/components/Layout.tsx");
  for (const route of routes) {
    const record = manifest.routes.find((item) => item.path === route);
    assert.ok(record, `${route} is absent from the built route manifest`);
    assert.equal(record.index, true, `${route} must be indexed`);
    assert.equal(record.prerendered, true, `${route} must be prerendered`);
    const html = await read(`dist/${record.file}`);
    assert.match(html, /<h1(?:\s|>)/, `${route} has no rendered H1`);
    assert.match(html, /href="\/call"/, `${route} has no implementation application link`);
    assert.match(html, /href="\/workshop"/, `${route} has no workshop link`);
    assert.match(html, /Sources behind this page/, `${route} has no visible source section`);
    assert.ok(layout.includes(route), `${route} is not internally linked from the footer`);
  }
  const sitemap = await read("dist/sitemap.xml");
  for (const route of routes) assert.ok(sitemap.includes(`https://growthcred.co.za${route}`), `${route} is absent from the sitemap`);
  console.log("finance-law integration verification passed");
} else {
  throw new Error("Usage: node scripts/verify-finance-law.mjs research|copy|integration");
}
