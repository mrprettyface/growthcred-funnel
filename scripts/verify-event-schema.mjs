#!/usr/bin/env node
/**
 * Event markup gate for /workshop and /webinar. Run after `npm run build`.
 *
 * Event schema appears only for a session with a real date still ahead. The
 * builder is exercised with sample sessions (which never ship), then the built
 * pages are checked against what the source files actually hold today.
 */
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { eventNode, eventSession, hasFutureSession } from "../dist-ssr/entry-server.js";

const now = Date.parse("2026-10-04T08:00:00Z");
const sample = { name: "Sample", description: "d", path: "/workshop", startUtc: "2026-10-24T07:00:00Z", endUtc: "2026-10-24T14:00:00Z", online: false, venue: "WeWork Rosebank, Johannesburg", priceCents: 99000 };

/* The rules, each able to fail. */
assert.equal(eventNode(null, now), null, "no session must give no Event");
assert.equal(eventNode({ ...sample, startUtc: "" }, now), null, "an undated session must give no Event");
assert.equal(eventNode({ ...sample, startUtc: "2026-09-01T07:00:00Z" }, now), null, "a past session must give no Event");

const paid = eventNode(sample, now);
for (const key of ["name", "startDate", "endDate", "location", "eventStatus", "eventAttendanceMode", "organizer", "offers", "image"])
  assert.ok(paid[key], `Event is missing ${key}`);
assert.equal(paid.startDate, "2026-10-24T07:00:00Z");
assert.equal(paid.offers.price, "990.00");
assert.equal(paid.offers.priceCurrency, "ZAR");
assert.equal(paid.location["@type"], "Place");
assert.match(paid.eventAttendanceMode, /Offline/);
assert.match(eventNode({ ...sample, soldOut: true }, now).offers.availability, /SoldOut/);

const free = eventNode({ ...sample, path: "/webinar", online: true, priceCents: 0, startUtc: "20261024T150000Z", endUtc: "20261024T160000Z" }, now);
assert.equal(free.startDate, "2026-10-24T15:00:00Z", "calendar-format dates must become ISO");
assert.equal(free.location["@type"], "VirtualLocation");
assert.equal(free.isAccessibleForFree, true);
assert.equal(free.offers.price, "0.00");

const manifest = JSON.parse(await readFile("dist/search-manifest.json", "utf8"));
const built = (path) => readFile("dist/" + manifest.routes.find((r) => r.path === path).file, "utf8");

/* The built pages carry an Event exactly when the source has a future date. */
const events = (html) => {
  const m = html.match(/<script id="site-schema" type="application\/ld\+json">([\s\S]*?)<\/script>/);
  return JSON.parse(m[1])["@graph"].filter((n) => n["@type"] === "Event");
};
for (const path of ["/workshop", "/webinar"]) {
  const html = await built(path);
  const session = eventSession(path);
  const expected = session && hasFutureSession(session.startUtc) ? 1 : 0;
  assert.equal(events(html).length, expected, `${path}: expected ${expected} Event node(s)`);
  if (expected) {
    const e = events(html)[0];
    assert.ok(html.includes(`R${(session.priceCents / 100).toLocaleString("en-ZA")}`) || session.priceCents === 0, `${path}: Event price not visible on the page`);
    console.log(`${path}: Event for ${e.startDate}`);
  } else console.log(`${path}: no date set, no Event (correct)`);
}
for (const path of ["/", "/contact", "/private-ai"]) {
  const html = await built(path);
  assert.equal(events(html).length, 0, `${path}: unexpected Event node`);
}
console.log("event-schema OK");
