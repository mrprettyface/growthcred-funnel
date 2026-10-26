/**
 * /ai-consulting-south-africa and the SEO fixes shipped with it.
 * Reads dist/, so run after `npm run build`.
 */
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const read = (path) => readFile(path, "utf8");
const decode = (s) => s.replaceAll("&amp;", "&").replaceAll("&#x27;", "'").replaceAll("&#39;", "'").replaceAll("&apos;", "'");
const desc = (html) => decode(html.match(/<meta name="description" content="([^"]*)"/)[1]);
const title = (html) => decode(html.match(/<title>([^<]*)<\/title>/)[1]);
const text = (html) => decode(html.replace(/<script[\s\S]*?<\/script>/g, " ").replace(/<[^>]+>/g, " ")).replace(/\s+/g, " ");

const page = await read("dist/ai-consulting-south-africa.html");
const home = await read("dist/index.html");
const resources = await read("dist/resources.html");
const terms = await read("dist/terms.html");
const privacy = await read("dist/privacy.html");
const checkout = await read("dist/checkout.html");
const sitemap = await read("dist/sitemap.xml");

assert.equal(title(page), "AI Consulting in South Africa | GrowthCred");
assert.equal(desc(page), "AI consulting for South African owner-led firms. We find where your week goes, build your own private AI around it, and train your team. Rosebank, Joburg.");
assert.match(page, /<h1[^>]*>AI consulting that ends in working systems, not a slide deck\.<\/h1>/);
const body = text(page);
assert.match(body, /If the Command Core doesn't give you back at least 20% of your week, the engagement is on us\./);
assert.match(body, /TaiAscend reported that a document process that took three days now takes two hours\./);
assert.match(body, /Sandile runs MNE Waste\s*\. Trucks, drivers, compliance, municipal contracts\. He built his Operator's Brain in one day and is now fully operational\./);
assert.match(page, /href="\/private-ai"/);
assert.match(page, /href="\/ai-proposal-automation"/);
assert.match(page, /href="\/ai-follow-up-automation"/);
assert.match(page, /href="\/ai-admin-automation"/);
assert.match(page, /href="\/corporate-ai-training"/);
assert.match(page, /href="\/call"/);
assert.equal((page.match(/"@type":"Question"/g) || []).length, 5);
assert.match(page, /"@type":"FAQPage"/);
assert.doesNotMatch(body, /Demure|Macaela|every client|hours back guaranteed/i);

assert.equal(title(home), "Private AI Implementation in South Africa | GrowthCred");
assert.ok(title(home).length <= 60, "homepage title is over 60 characters");
assert.match(home, /href="\/ai-consulting-south-africa"/);
assert.match(home, /href="\/playbook"/);
assert.match(page, /href="\/ai-consulting-south-africa"/);
assert.match(page, /href="\/playbook"/);
assert.match(resources, /href="\/playbook"/);

assert.equal(desc(terms).length, 142);
assert.match(desc(terms), /^Terms for using growthcred\.co\.za/);
assert.equal(desc(privacy).length, 138);
assert.match(desc(privacy), /We never see your card number\./);
assert.equal(desc(checkout).length, 114);
assert.match(desc(checkout), /^Register for the one-day online workshop/);

assert.match(sitemap, /<loc>https:\/\/growthcred\.co\.za\/ai-consulting-south-africa<\/loc>/);
assert.match(await read("dist/llms.txt"), /https:\/\/growthcred\.co\.za\/ai-consulting-south-africa/);

console.log("AI consulting page verification passed");
