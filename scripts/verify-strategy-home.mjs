#!/usr/bin/env node
/**
 * The prerendered homepage sells the strategy call, and ships no unproven copy.
 *
 * Reads the built dist/index.html directly, so it proves what actually deploys,
 * not what the source intends.
 */
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const home = await readFile("dist/index.html", "utf8");

// Exactly one H1, and it is the strategy claim, prerendered (not JS-dependent).
assert.equal((home.match(/<h1(?:\s|>)/g) || []).length, 1, "homepage must have exactly one <h1>");
assert.match(home, /data-prerendered="\/"/, "homepage is not prerendered");
assert.match(home, /lost to admin/, "homepage headline does not lead with the time-lost-to-admin claim");

// The one ask is the strategy call.
assert.match(home, /href="\/call"/, "homepage has no link to the strategy call");
assert.match(home, /Apply to Work With Us/, "homepage has no 'Apply to Work With Us' CTA");

// It no longer sells the R990 workshop from the front door.
assert.doesNotMatch(home, /R990/, "homepage still prices the workshop that moved to /workshop");

// Nothing unproven is shipped: no dev-only placeholder text leaked into prod.
assert.doesNotMatch(home, /\[TO COME:/, "a [TO COME] placeholder leaked into the production homepage");

// The benchmarks are illustrative, and the page must say so beside them.
assert.match(home, /Illustrative benchmarks\. Results vary by engagement\./, "the before/after figures lost their disclaimer");
// The homepage renders bare: the site nav with the workshop Register button is not on it.
assert.doesNotMatch(home, /href="\/checkout"/, "the homepage still links into the R990 checkout");

// Every section of the site is one click from the homepage (Phila: "how do you
// navigate to the other pages?"). The header nav and the in-page sections both.
for (const path of ["/ai-automation-south-africa", "/ai-training-south-africa", "/workshop", "/stories", "/resources", "/webinar"])
  assert.match(home, new RegExp(`href="${path}"`), `homepage has no link to ${path}`);
// The stories that back the claims, each linked.
for (const path of ["/stories/mne-waste", "/stories/demure-international", "/stories/operators-intensive-wework-rosebank"])
  assert.match(home, new RegExp(`href="${path}"`), `homepage does not link the story ${path}`);
assert.match(home, /TaiAscend/, "the TaiAscend result is missing");
// Every article is reachable from the homepage.
for (const path of ["/guides/business-brain", "/guides/ai-proposals-and-follow-ups", "/guides/ai-training-cost-south-africa", "/guides/ai-training-vs-automation", "/guides/ai-automation-cost-south-africa"])
  assert.match(home, new RegExp(`href="${path}"`), `homepage does not link the guide ${path}`);
// The founder photo is the one Phila chose: with the guest, not a solo portrait.
assert.match(home, /src="\/images\/phila-event\.jpg"/, "the founder photo is not the original event photo");
assert.doesNotMatch(home, /phila-portrait/, "the founder photo was swapped for the solo portrait");

console.log("strategy home verification passed");
