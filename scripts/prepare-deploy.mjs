/**
 * Prepares dist/ for cPanel upload.
 * Verifies the prerendered search release and Apache route rules survived the build.
 */
import { existsSync, copyFileSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const dist = resolve(root, "dist");
const htaccessDist = resolve(dist, ".htaccess");

if (!existsSync(dist)) {
  console.error("dist/ not found. Run `npm run build` first.");
  process.exit(1);
}

if (!existsSync(htaccessDist)) {
  const source = resolve(root, "public/.htaccess");
  if (!existsSync(source)) {
    console.error("public/.htaccess is missing. Deep links will 404 on cPanel.");
    process.exit(1);
  }
  copyFileSync(source, htaccessDist);
  console.log("Copied .htaccess into dist/");
}

for (const file of ["robots.txt", "sitemap.xml", "404.html", "search-manifest.json", "ai-training-south-africa.html"]) {
  if (!existsSync(resolve(dist, file))) throw new Error(`Missing ${file}; run npm run build.`);
}
console.log("dist/ is ready to upload to public_html, including .htaccess and .well-known.");
