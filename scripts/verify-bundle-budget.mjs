#!/usr/bin/env node
/**
 * Page speed budget: what every page downloads before it can respond.
 *
 * On 24 September 2026 the homepage shipped 718 KB up front (126 KB gzipped
 * main chunk), because supabase-js and three single-route pages sat in the main
 * bundle. They are loaded on demand now. This keeps them out.
 */
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { gzipSync } from "node:zlib";

const html = await readFile("dist/index.html", "utf8");
const assets = [...html.matchAll(/(?:src|href)="\/(assets\/[^"]+\.(?:js|css))"/g)].map((m) => m[1]);
assert.ok(assets.length >= 2, "could not find the homepage's up-front assets");

let total = 0;
let entry = null;
for (const a of assets) {
  const buf = await readFile("dist/" + a);
  const gz = gzipSync(buf, { level: 9 }).length;
  total += gz;
  if (/^assets\/index-.*\.js$/.test(a)) entry = { a, gz, src: buf.toString("utf8") };
}
assert.ok(entry, "no entry chunk found");

// Negative control: the marker we test for really is supabase-js internals.
assert.ok(/PostgrestClient|GoTrueClient/.test("class PostgrestClient{}"), "marker test cannot fail");
assert.doesNotMatch(entry.src, /PostgrestClient|GoTrueClient|RealtimeClient/, "supabase-js is back in the main bundle");

const ENTRY_MAX = 70_000, TOTAL_MAX = 150_000;
assert.ok(entry.gz <= ENTRY_MAX, `main chunk is ${entry.gz} B gzipped (budget ${ENTRY_MAX})`);
assert.ok(total <= TOTAL_MAX, `up-front JS+CSS is ${total} B gzipped (budget ${TOTAL_MAX})`);
console.log(`bundle budget passed: main chunk ${entry.gz} B gz (≤ ${ENTRY_MAX}), up-front total ${total} B gz (≤ ${TOTAL_MAX}); supabase-js loads on demand.`);
