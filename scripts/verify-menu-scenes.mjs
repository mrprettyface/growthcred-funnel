// Every header menu item shows its destination's stick figure (Layout.tsx,
// MenuScene -> PageScenes.tsx). This fails if a menu target has no drawing,
// or if two menu items would show the same drawing.
//
//   node scripts/verify-menu-scenes.mjs
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const layout = await readFile("src/components/Layout.tsx", "utf8");
const scenes = await readFile("src/components/PageScenes.tsx", "utf8");

/** Every route the header menu links to: NAV targets plus the mobile Contact link. */
function menuTargets(src) {
  const nav = src.slice(src.indexOf("const NAV ="), src.indexOf("];", src.indexOf("const NAV =")));
  const targets = [...nav.matchAll(/\bto: "([^"]+)"/g)].map((m) => m[1]);
  if (/<MenuScene path="\/contact"/.test(src)) targets.push("/contact");
  return [...new Set(targets)];
}

/** Scene bodies keyed by route, as written in PageScenes.tsx. */
function sceneBodies(src) {
  const block = src.slice(src.indexOf("export const PAGE_SCENES"), src.indexOf("export function PageScene"));
  const keys = [...block.matchAll(/^ {2}"(\/[^"]*)": \(/gm)];
  const out = new Map();
  keys.forEach((m, i) => {
    const end = i + 1 < keys.length ? keys[i + 1].index : block.length;
    const body = block.slice(m.index + m[0].length, end).replace(/\/\*[\s\S]*?\*\//g, "").replace(/\s+/g, "").replace(/\};$/, "");
    out.set(m[1], body);
  });
  return out;
}

function problems(layoutSrc, scenesSrc) {
  const out = [];
  const targets = menuTargets(layoutSrc);
  const bodies = sceneBodies(scenesSrc);
  if (targets.length < 10) out.push(`only ${targets.length} menu targets found`);
  for (const t of targets) if (!bodies.has(t)) out.push(`no drawing for menu item ${t}`);
  const seen = new Map();
  for (const t of targets) {
    const b = bodies.get(t);
    if (!b) continue;
    if (seen.has(b)) out.push(`${t} shows the same drawing as ${seen.get(b)}`);
    else seen.set(b, t);
  }
  if (!/<MenuScene path=\{link\.to\}/.test(layoutSrc)) out.push("dropdown links do not render MenuScene");
  return out;
}

// Negative controls: a scene file missing a target, and a duplicated scene, must fail.
assert.ok(problems(layout, "export const PAGE_SCENES = {\n};\nexport function PageScene").some((p) => p.startsWith("no drawing")), "missing-scene rule cannot fail");
const dup = 'export const PAGE_SCENES = {\n  "/": (\n<a/>),\n  "/private-ai": (\n<a/>),\n};\nexport function PageScene';
assert.ok(problems('const NAV = [ { to: "/" }, { to: "/private-ai" } ];', dup).some((p) => p.includes("same drawing")), "duplicate rule cannot fail");

const found = problems(layout, scenes);
if (found.length) {
  console.error(`MENU SCENES FAILED (${found.length}):\n  - ${found.join("\n  - ")}`);
  process.exit(1);
}
console.log(`menu scenes verification passed: ${menuTargets(layout).length} menu items, each with its own drawing; negative controls passed.`);
