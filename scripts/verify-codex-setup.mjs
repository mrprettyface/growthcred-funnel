import { readFileSync, existsSync } from "node:fs";
import { spawnSync } from "node:child_process";

const mode = process.argv[2];
const read = (path) => readFileSync(new URL(`../${path}`, import.meta.url), "utf8");
const assert = (value, message) => {
  if (!value) throw new Error(message);
};

if (mode === "guidance") {
  const agents = read("AGENTS.md");
  for (const phrase of ["narrowly before broadening", "successful command output compact", "usage budget", "Use subagents only", "corrections sent during a run immediately", "PLAN-*.md", "final response"]) {
    assert(agents.includes(phrase), `missing guidance: ${phrase}`);
  }
  assert(agents.length < 3500, "AGENTS.md is too large for an efficiency-focused guide");
  console.log("guidance verification passed");
} else if (mode === "workflow") {
  const workflow = read("CODEX_WORKFLOW.md");
  const skill = read("skills/growthcred-change/SKILL.md");
  const progress = read(".codex/TASK_PROGRESS.template.md");
  const config = read(".codex/config.toml");
  assert((workflow.match(/^\d+\. \*\*/gm) ?? []).length === 11, "audit must map eleven recommendations");
  assert(skill.includes("name: growthcred-change") && skill.includes("npm run build"), "reusable skill is incomplete");
  assert(progress.includes("## Done") && progress.includes("## Next step"), "progress template is incomplete");
  assert(config.includes('default_subagent_model = "gpt-5.6-luna"'), "Luna subagent default missing");
  console.log("workflow verification passed");
} else if (mode === "audit") {
  const workflow = read("CODEX_WORKFLOW.md");
  for (let i = 1; i <= 11; i += 1) assert(new RegExp(`^${i}\\.`, "m").test(workflow), `recommendation ${i} missing`);
  assert(workflow.includes("not enabled") && workflow.includes("already enabled") && workflow.includes("implemented"), "audit statuses are incomplete");
  console.log("audit verification passed");
} else if (mode === "project") {
  assert(existsSync(new URL("../package.json", import.meta.url)), "package.json missing");
  const result = spawnSync("npm", ["run", "build"], { cwd: new URL("..", import.meta.url), encoding: "utf8", timeout: 120000 });
  if (result.status !== 0) {
    process.stderr.write(result.stdout ?? "");
    process.stderr.write(result.stderr ?? "");
    process.exit(result.status ?? 1);
  }
  console.log("project verification passed");
} else {
  throw new Error("usage: node scripts/verify-codex-setup.mjs guidance|workflow|audit|project");
}
