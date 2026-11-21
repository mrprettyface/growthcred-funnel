/**
 * Tell IndexNow about every URL in the built sitemap.
 *
 *   node scripts/indexnow.mjs --dry-run   print the payload, do not send
 *   node scripts/indexnow.mjs             POST to https://api.indexnow.org/indexnow
 *
 * The key file is public/<32 hex chars>.txt and must already be on the live
 * site before a real ping is useful. This script does not deploy anything.
 * Do not run the send against growthcred.co.za until that file is live.
 */
import { readdir, readFile } from "node:fs/promises";

const dry = process.argv.includes("--dry-run");
const host = "growthcred.co.za";
const endpoint = "https://api.indexnow.org/indexnow";

const publicFiles = await readdir("public");
const keyFile = publicFiles.find((name) => /^[a-f0-9]{32}\.txt$/.test(name));
if (!keyFile) {
  console.error("No IndexNow key file in public/. Expected public/<32 hex chars>.txt");
  process.exit(1);
}
const key = keyFile.slice(0, -4);
const keyBody = (await readFile(`public/${keyFile}`, "utf8")).trim();
if (keyBody !== key) {
  console.error(`public/${keyFile} must contain exactly ${key}`);
  process.exit(1);
}

let sitemap;
try {
  sitemap = await readFile("dist/sitemap.xml", "utf8");
} catch {
  console.error("dist/sitemap.xml is missing. Run npm run build first.");
  process.exit(1);
}
const urlList = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);
if (!urlList.length) {
  console.error("Sitemap has no URLs.");
  process.exit(1);
}

const body = {
  host,
  key,
  keyLocation: `https://${host}/${keyFile}`,
  urlList,
};

if (dry) {
  console.log(`Dry run. ${urlList.length} URLs. Nothing was sent.`);
  console.log(JSON.stringify({ ...body, urlList: urlList.slice(0, 5).concat(urlList.length > 5 ? [`… ${urlList.length - 5} more`] : []) }, null, 2));
  process.exit(0);
}

const response = await fetch(endpoint, {
  method: "POST",
  headers: { "content-type": "application/json; charset=utf-8" },
  body: JSON.stringify(body),
});
const text = await response.text();
if (!response.ok) {
  console.error(`IndexNow replied ${response.status}. ${text.slice(0, 500)}`);
  process.exit(1);
}
console.log(`IndexNow accepted ${urlList.length} URLs (${response.status}).`);
