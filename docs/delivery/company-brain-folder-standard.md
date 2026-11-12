# BRIEF: Company Brain folder standard (structure before the model)

Owner: Phila Ngwenya (GrowthCred) · Written 2026-10-28 · Executor: Claude Code / Codex  
Source: Jake Van Clief (@lostandlucky) reel Db7AH33MHvg (ideas/instagram-vault.md). Use his **method only**: fixed folder structure + curated datasets before the model runs; one model (plus optional coding agent) over multi-agent navigation loops. His token counts, $30–47/day bill, user counts, and “90–95% efficiency” are **his claims, unverified** — never repeat them as GrowthCred facts or client promises. Caption preprint “96%” is not in the video; ignore it.

Status: delivery standard for Company Brain / Quote Engine / New Hire Trainer. Not a paid product. Not a tip-ad funnel.

---

## 0. Opening prompt (paste to the receiving AI)

```
You are the delivery engineer for GrowthCred (Phila Ngwenya). GrowthCred sells private/local AI so businesses own their intelligence — Company Brain, Quote Engine, New Hire Trainer.

Your job: turn this brief into an enforceable folder standard in the client (or demo) repo, and wire agents/CLAUDE.md to use it instead of multi-agent “explore the mess” loops.

Read this whole brief first. Then:
  1. Create the folder tree under the client knowledge root (section 2).
  2. Add the stub files with the required front matter (section 3).
  3. Add or update CLAUDE.md / AGENTS.md with the rules in section 4.
  4. Add a cheap smoke check (section 5) that fails if the structure is missing.
  5. Stop and report in plain words. Do not deploy, buy tools, or send messages.

Rules:
  - Draft only. Phila presses Send / Deploy.
  - Never invent metrics, cost savings %, or client results. Do not quote Van Clief’s numbers as ours.
  - Keep client data in the client’s own systems. No secrets in the repo.
  - Africa footprint: paths and examples may use SA/Africa business language; no US-only assumptions.
  - Prefer one model + structured retrieval over multi-agent search loops.
```

---

## 1. Why this exists (Money In)

Unstructured “let agents figure it out” burns tokens and margins. Structured folders mean:
- **Delivery margin:** inference and local compute stay predictable when GrowthCred foots the bill.
- **Sales:** owners buy “won’t wake up to a surprise AI bill” and “your people get answers from one brain,” not “we run 40 agents.”
- **Own your intelligence:** know-how lives in files the client owns, not in a vibe chat history.

Kill it if a build would rather add another agent than fix the folders. Fix structure first.

---

## 2. Canonical folder tree

Root = the client’s Company Brain knowledge root (name it `company-brain/` or the project’s existing knowledge root; do not invent a second parallel tree).

```
company-brain/
  README.md                 # what this brain is for; who owns it; how to ask it
  rules.md                  # hard rules the model must follow (access, tone, no invent)
  evidence-ledger.md        # claims → source file paths (append-only)
  index.md                  # short map of folders + when to open each
  reference/                # stable facts: SOPs, handbooks, price lists, org chart
  workspace-inputs/         # jobs in progress: briefs, tickets, drafts (writable)
  collections/              # optional topic packs (e.g. quoting/, onboarding/, safety/)
  answers/                  # optional: saved good answers with source links
  _inbox/                   # raw dumps waiting for a human/agent to file correctly
```

Rules for the tree:
- **One root.** Do not scatter SOPs across Desktop + Drive + Slack exports without filing them here.
- **`_inbox/` is temporary.** Nothing stays here more than one working day without a filing task.
- **`reference/` is read-mostly.** Agents may propose edits; humans approve before overwrite.
- **`workspace-inputs/` is for active work.** Clear or archive when the job closes.
- **No binaries of secrets.** Credentials stay in the vault / env, never under this tree.

---

## 3. Required stub files

Every new Company Brain starts with these stubs. Replace bracket text; do not leave them empty.

### `README.md`
- Client name (or “Demo — synthetic”)
- Purpose in one sentence (destination, not tools)
- Who may query it / who may edit `reference/`
- How staff ask (chat UI, Slack slash, Claude Code — pick what exists)

### `rules.md`
Must include, in plain English:
1. Answer only from files under this root (or named collections). If missing, say “not in the brain” — do not invent.
2. Cite the path you used (and add/update `evidence-ledger.md` when you assert a lasting fact).
3. Prefer one pass: open `index.md` → open the smallest set of files → answer. Do not spawn agent swarms to “search everything.”
4. No personal data in logs. POPIA: names/IDs/phones only when the task needs them, never in screenshots or status notes.
5. Prices and legal claims only from `reference/` (or the Quote Engine rulebook collection). If absent, stop and ask.

### `evidence-ledger.md`
Table or list: Date | Claim | Source path | Added by  
Append-only. Never delete rows; mark superseded.

### `index.md`
Bullet map: folder → when to open it. Keep under ~40 lines so the model can load it every turn.

---

## 4. Agent / CLAUDE.md rules (paste)

Add this block to the client app’s `CLAUDE.md` / `AGENTS.md` (alongside enterprise-app-stateless-rules.md):

```
## Company Brain folder standard
- Knowledge lives under company-brain/ (or the project’s documented knowledge root). That tree is the source of truth.
- Before answering an operational question: read company-brain/index.md, then only the files you need.
- Do not start multi-agent “explore the repo” loops to find SOPs. If index.md is wrong, fix the index in a small PR — do not paper over it with more agents.
- Write lasting facts into evidence-ledger.md with a path. Prefer updating reference/ via a proposed diff over stuffing answers into chat history.
- Raw dumps go to company-brain/_inbox/ with a one-line note of origin; file them into reference/ or collections/ before the next session ends.
- Token/cost claims: never invent %. Report measured usage only when Phila or the client dashboard provides numbers.
```

---

## 5. Smoke check (acceptance)

A cheap script or checklist the executor must leave behind:

1. Paths in section 2 exist.
2. `rules.md`, `index.md`, `evidence-ledger.md`, `README.md` are non-empty and have no leftover `[brackets]` for required fields.
3. A test question (“What is our return policy?” or synthetic equivalent) answered **only** from `reference/` files returns either a cited answer or “not in the brain” — never a free invent.
4. No second knowledge root was created “for agents.”

Done when those four pass and the executor reports path + what they changed in plain words.

---

## 6. Pitch language (optional, for humans — not for the model)

Use destination language. Draft only; Phila approves before send:

- Bad: “We use a folder structure and one LLM.”
- Better: “Your team gets answers from one company brain — same rules every time — without an AI bill that wakes you up at 3am.”

Do not paste Van Clief’s token or dollar figures into proposals.

---

## 7. Out of scope / kill list

- Building Edubamare / chat.eduba.io clones.
- Signing up for his course or “links in bio.”
- Promising any % cost cut.
- Multi-agent orchestration frameworks sold as the product.
- K Force PPE creatives (wrong lever unless Phila asks for a cost-control content hook later).

---

## 8. Checklist for the executor

- [ ] Folder tree created under the agreed root
- [ ] Stub files filled (no empty required fields)
- [ ] CLAUDE.md / AGENTS.md updated with section 4
- [ ] Smoke check passes
- [ ] Report to Phila in plain words; no deploy without his yes
- [ ] This brief kept at `ideas/briefs/company-brain-folder-standard.md` (and on growthcred-funnel under `docs/` when merged)
