#!/usr/bin/env node
/**
 * Rendered word count of the homepage.
 *
 * Two failure modes, both real. Too long and nobody reads it (the old workshop
 * homepage rendered ~2,125 words). Too short and neither a visitor nor a search
 * engine gets enough context — Phila's feedback on the 433-word version. This
 * measures the words actually rendered in the prerendered dist/index.html
 * #root, independently, and fails outside the range.
 */
import { readFile } from "node:fs/promises";

const MIN = 900;
const MAX = 2400;
const html = await readFile("dist/index.html", "utf8");

// Everything from the app root onward, minus the trailing module scripts.
const start = html.indexOf('<div id="root"');
const body = html.slice(start < 0 ? 0 : start);
const text = body
  .replace(/<script[\s\S]*?<\/script>/gi, " ")
  .replace(/<style[\s\S]*?<\/style>/gi, " ")
  .replace(/<[^>]+>/g, " ")
  .replace(/&[a-z]+;|&#\d+;/gi, " ")
  .replace(/\s+/g, " ")
  .trim();

const words = text ? text.split(" ").length : 0;

if (words < MIN || words > MAX) {
  console.error(`HOME_WORDCOUNT_OUT_OF_RANGE: ${words} rendered words (expected ${MIN}–${MAX})`);
  process.exit(1);
}
console.log(`HOME_WORDCOUNT_OK: ${words} rendered words (range ${MIN}–${MAX})`);
