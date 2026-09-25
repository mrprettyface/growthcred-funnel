import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const mode = process.argv[2];
const read = (path) => readFile(path, "utf8");
const routes = [
  "/guides/ai-business-proposals-faster",
  "/guides/choose-ai-tools-small-business",
  "/guides/ai-challenges-south-africa",
];

function block(source, route, nextRoute) {
  const start = source.indexOf(`path: "${route}"`);
  assert.notEqual(start, -1, `${route} is missing`);
  const end = source.indexOf(`path: "${nextRoute}"`, start + 1);
  assert.notEqual(end, -1, `could not find the end of ${route}`);
  return source.slice(start, end);
}

if (mode === "audit") {
  const audit = await read("docs/editorial/value-article-audit.md");
  for (const article of ["Article 1: AI business proposals", "Article 2: choosing AI tools", "Article 3: South African AI challenges"])
    assert.ok(audit.includes(article), `audit is missing ${article}`);
  for (const heading of ["### Contrarian thesis", "### What was strong in the draft", "### What changed", "### Search role"])
    assert.equal(audit.split(heading).length - 1, 3, `audit must contain three ${heading} sections`);
  for (const unsafe of ["80/20 editing rule", "worth millions", "paid AI plans automatically", "ahead of 95%"])
    assert.ok(audit.includes(unsafe), `audit does not record unsafe claim: ${unsafe}`);
  for (const source of ["inforegulator.org.za", "statssa.gov.za", "eskom.co.za", "resbank.co.za", "docs.n8n.io"])
    assert.ok(audit.includes(source), `audit is missing ${source}`);
  console.log("value article audit verification passed");
} else if (mode === "copy") {
  const source = await read("src/content/searchPages.ts");
  const articles = [
    block(source, routes[0], routes[1]),
    block(source, routes[1], routes[2]),
    block(source, routes[2], "/stories"),
  ];
  for (const [index, article] of articles.entries()) {
    assert.ok(article.split(/\s+/).length > 650, `article ${index + 1} is too thin`);
    for (const phrase of ["The contrarian view", "Build it yourself or have it implemented", "Apply for implementation", "Build it in the workshop", "faq:", "related:"])
      assert.ok(article.includes(phrase), `article ${index + 1} is missing ${phrase}`);
    assert.match(article, /measure|record|track/i, `article ${index + 1} has no measurement method`);
    assert.match(article, /review|approve|person/i, `article ${index + 1} has no human control`);
  }
  const unsafe = /proposal should take 3 hours|worth millions a year|15[–-]20 hours back|ahead of 95%|R80k[–-]R150k|works without internet for basic tasks|automatically keep all data out of training/i;
  assert.doesNotMatch(articles.join("\n"), unsafe, "published articles retain an unsupported draft claim");
  assert.match("SA businesses are ahead of 95%", unsafe, "unsupported-claim negative control cannot detect a known positive");
  assert.doesNotMatch(articles.join("\n"), /to: "\/apply"|to: "\/guide"/, "articles use a nonexistent old CTA route");
  assert.match(articles[0], /business brief/);
  assert.match(articles[1], /six-question buying test/);
  assert.match(articles[2], /paid is not the same as compliant/);
  assert.match(articles[2], /476 consecutive days/);
  console.log("value article copy verification passed");
} else if (mode === "integration") {
  const manifest = JSON.parse(await read("dist/search-manifest.json"));
  const source = await read("src/content/searchPages.ts");
  const resourceBlock = block(source, "/resources", "/guides/ai-training-cost-south-africa");
  const sitemap = await read("dist/sitemap.xml");
  for (const route of routes) {
    const record = manifest.routes.find((item) => item.path === route);
    assert.ok(record, `${route} is absent from the build manifest`);
    assert.equal(record.index, true, `${route} must be indexed`);
    assert.equal(record.prerendered, true, `${route} must be prerendered`);
    assert.ok(resourceBlock.includes(route), `${route} is absent from the resources hub`);
    assert.ok(sitemap.includes(`https://growthcred.co.za${route}`), `${route} is absent from the sitemap`);
    const html = await read(`dist/${record.file}`);
    assert.match(html, /<h1(?:\s|>)/, `${route} has no rendered H1`);
    assert.match(html, /href="\/call"/, `${route} has no implementation CTA`);
    assert.match(html, /href="\/workshop"/, `${route} has no workshop CTA`);
    assert.match(html, /About the author/, `${route} has no author box`);
    assert.match(html, /Frequently asked questions/, `${route} has no visible FAQ`);
    assert.ok(source.split(route).length - 1 >= 3, `${route} needs inbound internal links beyond its own definition`);
  }
  console.log("value article integration verification passed");
} else {
  throw new Error("Usage: node scripts/verify-value-articles.mjs audit|copy|integration");
}
