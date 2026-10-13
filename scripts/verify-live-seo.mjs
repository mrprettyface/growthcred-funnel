#!/usr/bin/env node

import assert from "node:assert/strict";

const base = "https://growthcred.co.za";
const timeoutMs = 20_000;

async function get(path, options = {}) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    return await fetch(`${base}${path}`, {
      redirect: "manual",
      signal: controller.signal,
      ...options,
    });
  } finally {
    clearTimeout(timer);
  }
}

function expectHsts(response, label) {
  assert.match(
    response.headers.get("strict-transport-security") ?? "",
    /max-age=31536000/i,
    `${label}: one-year HSTS header is missing`,
  );
}

const home = await get("/");
assert.equal(home.status, 200, "/ must return 200");
assert.match(home.headers.get("content-type") ?? "", /text\/html/i, "/ must be HTML");
expectHsts(home, "/");
const homeHtml = await home.text();
assert.match(homeHtml, /<link[^>]+rel=["']canonical["'][^>]+href=["']https:\/\/growthcred\.co\.za\/["']/i, "home canonical is wrong");

const workshop = await get("/workshop");
assert.equal(workshop.status, 200, "/workshop must serve its own page without redirecting");
expectHsts(workshop, "/workshop");
assert.match(await workshop.text(), /R990|workshop/i, "/workshop response does not look like the workshop page");

const sitemapResponse = await get("/sitemap.xml");
assert.equal(sitemapResponse.status, 200, "/sitemap.xml must return 200");
assert.match(sitemapResponse.headers.get("content-type") ?? "", /xml/i, "sitemap MIME type is wrong");
const sitemap = await sitemapResponse.text();
const urls = [...sitemap.matchAll(/<loc>(https:\/\/growthcred\.co\.za[^<]+)<\/loc>/g)].map((match) => match[1]);
assert.ok(urls.length >= 30, `sitemap has only ${urls.length} URLs; expected at least 30`);
for (const required of [
  "/",
  "/stories",
  "/ai-proposal-automation",
  "/ai-follow-up-automation",
  "/ai-admin-automation",
  "/data-and-security",
]) {
  assert.ok(urls.includes(`${base}${required}`), `sitemap is missing ${required}`);
}

for (const url of urls) {
  const path = new URL(url).pathname;
  const response = await get(path);
  assert.equal(response.status, 200, `${path} from sitemap must return 200`);
  assert.match(response.headers.get("content-type") ?? "", /text\/html/i, `${path} from sitemap must be HTML`);
  const html = await response.text();
  assert.match(html, /<link[^>]+rel=["']canonical["']/i, `${path} has no canonical link`);
  assert.doesNotMatch(html, /<meta[^>]+name=["']robots["'][^>]+content=["'][^"']*noindex/i, `${path} is in the sitemap but noindexed`);
}

const robotsResponse = await get("/robots.txt");
assert.equal(robotsResponse.status, 200, "/robots.txt must return 200");
const robots = await robotsResponse.text();
assert.match(robots, /User-agent:\s*\*/i, "robots.txt has no default user-agent policy");
assert.match(robots, /Sitemap:\s*https:\/\/growthcred\.co\.za\/sitemap\.xml/i, "robots.txt has no production sitemap declaration");

const missing = await get("/post-launch-missing-page-check");
assert.equal(missing.status, 404, "a missing path must return a real 404");

const checkout = await get("/checkout");
assert.equal(checkout.status, 200, "/checkout must remain available");
const checkoutRobots = `${checkout.headers.get("x-robots-tag") ?? ""} ${await checkout.text()}`;
assert.match(checkoutRobots, /noindex/i, "/checkout must remain noindex");

const agencyRedirect = await get("/agency?source=post-launch-check");
assert.equal(agencyRedirect.status, 301, "/agency is the redirect positive control and must return 301");
const agencyTarget = new URL(agencyRedirect.headers.get("location"), base);
assert.equal(
  `${agencyTarget.pathname}${agencyTarget.search}`,
  "/ai-automation-south-africa?source=post-launch-check",
  "/agency redirect target is wrong",
);

for (const origin of ["http://growthcred.co.za", "https://www.growthcred.co.za"]) {
  const response = await fetch(`${origin}/resources?source=post-launch-check`, { redirect: "manual" });
  assert.equal(response.status, 301, `${origin} must redirect permanently`);
  assert.equal(
    response.headers.get("location"),
    "https://growthcred.co.za/resources?source=post-launch-check",
    `${origin} redirects to the wrong canonical URL`,
  );
}

console.log(`live SEO verification passed: ${urls.length} sitemap URLs, canonical redirects, HSTS, robots, noindex and 404 behaviour`);
