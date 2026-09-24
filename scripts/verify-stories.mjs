#!/usr/bin/env node
/**
 * The client stories ship as real, indexable articles, and say only what the
 * clients said. Reads the built dist, the manifest and the sitemap.
 */
import assert from "node:assert/strict";
import { readFile, access } from "node:fs/promises";

const manifest = JSON.parse(await readFile("dist/search-manifest.json", "utf8"));
const sitemap = await readFile("dist/sitemap.xml", "utf8");
const STORIES = ["/stories/mne-waste", "/stories/demure-international", "/stories/operators-intensive-wework-rosebank"];

for (const path of ["/stories", ...STORIES]) {
  const route = manifest.routes.find((r) => r.path === path);
  assert.ok(route, `${path} is missing from the route manifest`);
  assert.equal(route.index, true, `${path} is not indexable`);
  assert.ok(route.prerendered, `${path} is not prerendered`);
  assert.ok(sitemap.includes(`<loc>https://growthcred.co.za${path}</loc>`), `${path} is not in the sitemap`);
  const html = await readFile("dist/" + route.file, "utf8");
  assert.equal((html.match(/<h1(?:\s|>)/g) || []).length, 1, `${path} must have exactly one <h1>`);
  if (path !== "/stories") {
    const schema = JSON.parse(html.match(/<script id="site-schema" type="application\/ld\+json">([\s\S]*?)<\/script>/)[1]);
    const article = schema["@graph"].find((n) => n["@type"] === "Article");
    assert.ok(article, `${path} has no Article structured data`);
    assert.equal(article.datePublished, "2026-09-24", `${path} Article has no publish date`);
    assert.match(html, /href="\/stories"/, `${path} does not link back to the stories hub`);
    // Every image the story shows exists in the build.
    for (const m of html.matchAll(/src="(\/images\/stories\/[^"]+)"/g)) await access("dist" + m[1]);
    assert.match(html, /src="\/images\/stories\//, `${path} shows no real photograph or screenshot`);
  }
}

// Only what they said. The quote is Macaela's own words, verbatim; the
// TaiAscend figure is the one reported.
const demure = await readFile("dist/stories/demure-international.html", "utf8");
assert.match(demure, /My Claude has been operating a lot better since the last session\./, "Macaela's quote is not verbatim");
const hub = await readFile("dist/stories.html", "utf8");
assert.match(hub, /TaiAscend: a document process that took three days now takes two hours\./, "TaiAscend's result is missing or reworded");
// The hub links every story.
for (const path of STORIES) assert.match(hub, new RegExp(`href="${path}"`), `the hub does not link ${path}`);
// The nav reaches the hub from any page.
const about = await readFile("dist/about.html", "utf8");
assert.match(about, /href="\/stories"/, "the site nav does not link the stories");

console.log("stories verification passed");
