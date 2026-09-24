#!/usr/bin/env node
/**
 * Both hosts serve the repositioned routes: the new home at / and the moved
 * workshop at /workshop.
 *
 * Cloudflare Pages reads dist/_redirects; Apache reads dist/.htaccess. Both are
 * generated into dist by the build, and both must carry the moved workshop with
 * no stale 301 left pointing it back at /.
 */
import assert from "node:assert/strict";
import { readFile, access } from "node:fs/promises";

// The prerendered documents both hosts serve.
for (const f of ["dist/index.html", "dist/workshop.html", "dist/.htaccess", "dist/_redirects"])
  await access(f);

// Cloudflare Pages: /workshop serves its own document, and the stale redirect
// that used to send it back to / is gone.
const redirects = await readFile("dist/_redirects", "utf8");
assert.match(redirects, /^\/workshop \/workshop\.html 200$/m, "Pages: /workshop does not serve its page");
assert.doesNotMatch(redirects, /^\/workshop \/ 301$/m, "Pages: a stale /workshop -> / 301 is still present");

// The source template Pages falls back to must not carry the stale 301 either.
const src = await readFile("public/_redirects", "utf8");
assert.doesNotMatch(src, /^\/workshop \/ 301$/m, "public/_redirects still 301s /workshop back to /");

// Apache: the SPA rewrite serves index.html for client routes, and the .htaccess
// survived the build with its 404 document.
const htaccess = await readFile("dist/.htaccess", "utf8");
assert.match(htaccess, /ErrorDocument 404 \/404\.html/, "Apache: 404 document rule missing");

// Apache: nothing may redirect /workshop. public/.htaccess carried a
// `RewriteRule ^workshop/?$ / [R=301]` from before the move, which would have
// made the whole R990 funnel unreachable on cPanel while Pages served it fine.
for (const f of ["public/.htaccess", "dist/.htaccess"]) {
  const rules = await readFile(f, "utf8");
  assert.doesNotMatch(rules, /RewriteRule\s+\^?workshop/i, `${f}: /workshop is still redirected on Apache`);
  assert.match(rules, /Strict-Transport-Security "max-age=31536000"/, `${f}: no HSTS header`);
}
assert.match(await readFile("dist/_headers", "utf8"), /Strict-Transport-Security: max-age=31536000/, "Pages: no HSTS header");

console.log("hosts-reposition verification passed");
