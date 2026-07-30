/**
 * Prepares dist/ for cPanel upload.
 * Verifies the SPA fallback .htaccess survived the build, because without it
 * every route except "/" returns a 404 on Apache.
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

console.log("dist/ is ready to upload to public_html.");
