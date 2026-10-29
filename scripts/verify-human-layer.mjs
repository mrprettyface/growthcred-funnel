#!/usr/bin/env node
/**
 * The human layer, enforced.
 *
 * Every indexed content page must either carry first-hand evidence in its own
 * body (not in the author box, the "on this page" list or the related links),
 * or be listed in docs/search/HUMAN-LAYER.md awaiting Phila's input. And every
 * article, service, industry and market page names its author and shows a date.
 */
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

/** Things only GrowthCred can say: its clients, its rooms, its record. */
const FIRST_HAND = /MNE Waste|Sandile|Macaela|Demure International|TaiAscend|Operator Intensive|WeWork|Parliament|five seats|5 companies/i;
/** Pages that are not arguments for the business: tools, forms, hubs, policy. */
const EXEMPT = new Map([
  ["/resources", "hub: lists guides"],
  ["/stories", "hub: lists stories, each of which is checked"],
  ["/tools/admin-time-calculator", "tool: the visitor supplies the numbers"],
  ["/contact", "form"],
  ["/webinar", "registration form"],
  ["/playbook", "opt-in form"],
  ["/data-and-security", "policy: facts from the privacy policy"],
]);

const body = (html) => {
  const i = html.indexOf('<main id="main-content">');
  let m = html.slice(i, html.indexOf("</main>", i));
  m = m.replace(/<aside\b[\s\S]*?<\/aside>/g, " ");            // author box, "on this page"
  const k = m.indexOf("Keep going");                            // related-links band
  if (k > 0) m = m.slice(0, k);
  return m.replace(/<[^>]+>/g, " ");
};

// Negative controls.
assert.ok(!FIRST_HAND.test(body('<main id="main-content"><p>Generic advice.</p><aside>Phila at WeWork</aside></main>')), "author box counted as evidence");
assert.ok(!FIRST_HAND.test(body('<main id="main-content"><p>Advice.</p><h2>Keep going</h2><a>MNE Waste story</a></main>')), "related links counted as evidence");
assert.ok(FIRST_HAND.test(body('<main id="main-content"><p>TaiAscend cut three days to two hours.</p></main>')), "real evidence not detected");

const queue = await readFile("docs/search/HUMAN-LAYER.md", "utf8");
const queued = new Set([...queue.matchAll(/`(\/[a-z0-9/-]*)`/g)].map((m) => m[1]));
const manifest = JSON.parse(await readFile("dist/search-manifest.json", "utf8"));
const failures = [], waiting = [], evidenced = [];

for (const r of manifest.routes.filter((r) => r.index)) {
  if (EXEMPT.has(r.path)) continue;
  const html = await readFile("dist/" + r.file, "utf8");
  const has = FIRST_HAND.test(body(html));
  if (has) evidenced.push(r.path);
  else if (queued.has(r.path)) waiting.push(r.path);
  else failures.push(`${r.path}: no first-hand evidence and not in the human-layer queue`);

  // A named author and a date on every article, service, industry and market page.
  if (r.path !== "/" && r.path !== "/workshop" && r.path !== "/about") {
    if (!/By <a[^>]*href="\/about"[^>]*>Phila Ngwenya<\/a>/.test(html)) failures.push(`${r.path}: no author byline`);
    if (!/<time dateTime="\d{4}-\d{2}-\d{2}"/.test(html)) failures.push(`${r.path}: no visible date`);
    if (!/aria-label="About the author"/.test(html)) failures.push(`${r.path}: no author box`);
  }
}
// A page that has earned its evidence should come off the queue.
for (const p of queued) if (evidenced.includes(p)) failures.push(`${p}: has first-hand evidence now; remove it from HUMAN-LAYER.md`);

if (failures.length) {
  console.error("HUMAN LAYER FAILED:\n  - " + failures.join("\n  - "));
  process.exit(1);
}
console.log(`human layer verification passed: ${evidenced.length} pages carry first-hand evidence; ${waiting.length} await Phila's input (${waiting.join(", ")}); every article names its author and date; negative controls passed.`);
