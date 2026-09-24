#!/usr/bin/env node
/**
 * The R990 workshop funnel is intact at /workshop after the repositioning.
 *
 * Reads the built dist/workshop.html and the search manifest, so it proves the
 * deployed artifact and the routing table both moved together.
 */
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const workshop = await readFile("dist/workshop.html", "utf8");

// The workshop page is a complete, prerendered page with one H1.
assert.match(workshop, /data-prerendered="\/workshop"/, "/workshop is not prerendered");
assert.equal((workshop.match(/<h1(?:\s|>)/g) || []).length, 1, "/workshop must have exactly one <h1>");

// It keeps its terms: price, format and the "confirmed on registration" line.
assert.match(workshop, /R990/, "/workshop lost its price");
assert.match(workshop, /One day · Online|One-day online/, "/workshop lost its format line");
assert.match(workshop, /Confirmed on registration|confirmed on registration/, "/workshop lost its registration line");

// It still drives the same checkout, and carries no unproven placeholder.
assert.match(workshop, /href="\/checkout"/, "/workshop no longer links to checkout");
assert.doesNotMatch(workshop, /\[TO COME:/, "a [TO COME] placeholder leaked into /workshop");

// /workshop is a real indexed route now, not an alias to /.
const manifest = JSON.parse(await readFile("dist/search-manifest.json", "utf8"));
const route = manifest.routes.find((r) => r.path === "/workshop");
assert.ok(route, "/workshop is missing from the route manifest");
assert.equal(route.index, true, "/workshop should be indexable");
assert.ok(!manifest.aliases["/workshop"], "/workshop is still an alias; it should be its own route");

// No link that talks about the workshop may still point at /, which is now the
// Command Core page. Six did after the move, including checkout's way back.
const { readdir } = await import("node:fs/promises");
const stale = /<a\b[^>]*\bhref="\/"[^>]*>(?:(?!<\/a>)[\s\S])*?workshop(?:(?!<\/a>)[\s\S])*?<\/a>/i;
// Positive control: the pattern must catch the exact shape that shipped.
assert.ok(stale.test('<a class="x" href="/">&larr; Back to the workshop</a>'), "stale-link check cannot fail");
assert.ok(!stale.test('<a href="/workshop">The workshop</a>'), "stale-link check flags a correct link");
const htmlFiles = [];
const walk = async (dir) => {
  for (const e of await readdir(dir, { withFileTypes: true })) {
    const p = `${dir}/${e.name}`;
    if (e.isDirectory() && e.name !== "assets") await walk(p);
    else if (e.name.endsWith(".html")) htmlFiles.push(p);
  }
};
await walk("dist");
for (const f of htmlFiles) {
  const m = (await readFile(f, "utf8")).match(stale);
  assert.ok(!m, `${f}: a workshop link still points at / -> ${m?.[0].slice(0, 120)}`);
}

// Interactive pages (checkout, upsell, …) are not prerendered, so the scan above
// cannot see their links. Scan the source too: a to="/" or href="/" whose own
// link text mentions the workshop.
const srcStale = /\b(?:to|href)="\/"[^>]*>(?:(?!<\/)[\s\S]){0,240}?workshop/i;
assert.ok(srcStale.test('<Link\n  to="/"\n  className="a"\n>\n  &larr; Back to the workshop'), "source check cannot fail");
assert.ok(!srcStale.test('<Link to="/">Home</Link> / <span>the workshop</span>'), "source check crosses a closing tag");
const srcFiles = [];
const walkSrc = async (dir) => {
  for (const e of await readdir(dir, { withFileTypes: true })) {
    const p = `${dir}/${e.name}`;
    if (e.isDirectory()) await walkSrc(p);
    else if (e.name.endsWith(".tsx")) srcFiles.push(p);
  }
};
await walkSrc("src");
for (const f of srcFiles) {
  const m = (await readFile(f, "utf8")).match(srcStale);
  assert.ok(!m, `${f}: a workshop link still points at / -> ${m?.[0].replace(/\s+/g, " ").slice(0, 120)}`);
}

console.log("workshop-moved verification passed");
