#!/usr/bin/env node
/**
 * Gate oracle for the webinar referral loop (GATES-referral.md).
 *
 * Pure static checks over source files — no dev server, no network, portable
 * Node only. Each subcommand prints "<name> OK" and exits 0 when its outcome
 * holds, or prints what is missing and exits 1. The runtime behaviour of
 * refCode/activeReferrer is proven separately in the browser (gate G6), because
 * those need the real module running, not a grep.
 */
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const read = (p) => readFileSync(join(root, p), "utf8");

/** Fail with a decisive message; a gate is met only on exit 0 AND its token. */
function fail(name, missing) {
  console.error(`${name} FAILED — missing: ${missing.join(", ")}`);
  process.exit(1);
}
function pass(name) {
  console.log(`${name} OK`);
}

/** Every needle must appear in text, else report which ones did not. */
function requireAll(name, text, needles) {
  const missing = needles.filter((n) =>
    n instanceof RegExp ? !n.test(text) : !text.includes(n),
  );
  if (missing.length) fail(name, missing.map(String));
  pass(name);
}

const cmd = process.argv[2];

switch (cmd) {
  case "schema": {
    // The two referral columns must be declared on the seats table. We accept
    // either an inline column in the create-table or an ALTER ... ADD COLUMN,
    // so the check does not care how the migration is written.
    const sql = read("supabase/schema.sql");
    requireAll("schema", sql, [/ref_code/, /referred_by/]);
    break;
  }
  case "insert": {
    // registerForWebinar must put both fields on the row it inserts, and must
    // derive the code from referral.ts rather than re-implementing it.
    const src = read("src/lib/supabase.ts");
    requireAll("insert", src, [
      /from ["']\.\/referral["']/,
      /ref_code/,
      /referred_by/,
    ]);
    break;
  }
  case "lib": {
    const src = read("src/lib/referral.ts");
    requireAll("lib", src, [
      /export function refCode/,
      /export function activeReferrer/,
      /export function referralUrl/,
    ]);
    break;
  }
  case "share": {
    // Both confirmation screens must actually render the share block.
    const seat = read("src/components/webinar/SeatStepper.tsx");
    const magnet = read("src/components/magnet/MagnetStepper.tsx");
    const missing = [];
    if (!/ShareInvite/.test(seat)) missing.push("SeatStepper:ShareInvite");
    if (!/ShareInvite/.test(magnet)) missing.push("MagnetStepper:ShareInvite");
    if (missing.length) fail("share", missing);
    pass("share");
    break;
  }
  default:
    console.error(
      "usage: verify-referral.mjs <schema|insert|lib|share>",
    );
    process.exit(2);
}
