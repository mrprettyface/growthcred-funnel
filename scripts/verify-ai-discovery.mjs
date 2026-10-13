import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const read = (path) => readFile(path, "utf8");
const manifest = JSON.parse(await read("dist/search-manifest.json"));
const pageHtml = new Map(await Promise.all(manifest.routes.map(async (route) => [route.path, await read(`dist/${route.file}`)])));
const home = pageHtml.get("/");
assert.ok(home, "homepage exists in the prerender manifest");
const schemaMatch = home.match(/<script id="site-schema" type="application\/ld\+json">([\s\S]*?)<\/script>/);
assert.ok(schemaMatch, "homepage contains site JSON-LD");
const graph = JSON.parse(schemaMatch[1])["@graph"];
const organization = graph.find((node) => node["@id"] === "https://growthcred.co.za/#organization");
assert.ok(organization, "existing organization entity is preserved");
assert.deepEqual(organization.alternateName, ["GrowthCred SA", "GrowthCred (Pty) Ltd"]);
assert.equal(organization.slogan, "Own your intelligence.");
assert.equal(organization.telephone, "+27662830289");
assert.equal(organization.identifier.value, "2026/229279/07");
assert.ok(organization.contactPoint.some((point) => point.url === "https://wa.me/27662830289"));
assert.deepEqual(organization.sameAs, [
  "https://www.youtube.com/@PhilaNgwenyagrowth",
  "https://www.linkedin.com/in/phila-ngwenya-908b1a179/",
]);
for (const name of ["Command Core Velocity", "Command Core Integration", "Command Core Transformation", "Corporate AI training", "Private AI deployment"]) {
  assert.ok(organization.hasOfferCatalog.itemListElement.some((offer) => offer.itemOffered.name === name), `schema includes ${name}`);
}

const llms = await read("dist/llms.txt");
const robots = await read("dist/robots.txt");
assert.match(llms, /^# GrowthCred/m);
assert.doesNotMatch(llms, /_howToUse|R5M to over R200M|engagement is free/i);
assert.match(llms, /2026\/229279\/07/);
for (const agent of ["Bingbot", "OAI-SearchBot", "Claude-SearchBot", "PerplexityBot"]) {
  assert.ok(robots.includes(`User-agent: ${agent}\nAllow: /`), `robots.txt allows ${agent}`);
}
assert.match(await read("docs/search/CRAWLER-ACCESS-REQUEST.md"), /Claude-SearchBot/);
for (const route of ["/", "/private-ai", "/about", "/stories", "/data-and-security", "/call", "/guides/can-staff-paste-client-files-into-chatgpt", "/guides/private-ai-popia"]) {
  assert.ok(llms.includes(`https://growthcred.co.za${route}`), `llms.txt includes ${route}`);
  assert.ok(pageHtml.has(route), `${route} is in the prerender manifest`);
}

const clientFiles = pageHtml.get("/guides/can-staff-paste-client-files-into-chatgpt");
const privateAi = pageHtml.get("/guides/private-ai-popia");
assert.match(clientFiles, /Can your staff paste client files into ChatGPT\?/);
assert.match(clientFiles, /does not create a blanket ban on AI tools/i);
assert.match(clientFiles, /https:\/\/www\.gov\.za\/documents\/protection-personal-information-act/);
assert.match(clientFiles, /https:\/\/inforegulator\.org\.za\/knowledge-base/);
assert.match(clientFiles, /"@type":"FAQPage"/);
assert.match(privateAi, /How can private AI help with POPIA\?/);
assert.match(privateAi, /does not make your business POPIA-compliant by itself/i);
assert.match(privateAi, /https:\/\/www\.gov\.za\/documents\/protection-personal-information-act/);
assert.match(privateAi, /"@type":"FAQPage"/);

for (const route of manifest.routes.filter((entry) => entry.prerendered)) {
  const html = pageHtml.get(route.path);
  assert.ok(html.includes('aria-label="Message GrowthCred on WhatsApp"'), `${route.path} has the shared WhatsApp action`);
}
assert.ok(clientFiles.includes("fixed bottom-24 right-4"));
assert.ok(privateAi.includes("fixed bottom-24 right-4"));

const prompts = await read("docs/search/AI-SEARCH-PROMPTS.md");
const queryLog = await read("docs/search/query-log.csv");
for (let number = 1; number <= 17; number++) assert.match(prompts, new RegExp(`\\| ${number} \\|`), `prompt ${number} exists`);
for (const product of ["ChatGPT", "Claude", "Perplexity", "Gemini"]) assert.ok(prompts.includes(product));
assert.equal(queryLog.split("\n")[0], "date,product,model,locale,exact_prompt,growthcred_mentioned,growthcred_cited,cited_urls,other_names,answer_accuracy,notes");

console.log("AI discovery verification passed");
