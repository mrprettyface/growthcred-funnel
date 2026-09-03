#!/usr/bin/env node
/**
 * Gate oracle for the webinar experience's mobile guarantees.
 *
 * Each subcommand asserts one outcome and prints a success-only marker. Every
 * assertion reads the real source; nothing here trusts a comment or a claim
 * made in a commit message.
 */
import { readFileSync, readdirSync } from "node:fs";
import { execFileSync } from "node:child_process";
import { join } from "node:path";

const WEBINAR_DIR = "src/components/webinar";
const PAGES = ["src/pages/WebinarExperience.tsx", "src/pages/WorkshopExperience.tsx"];
/** Shared components the experience pages render. Swept by the same gates. */
const SHARED = [
  "src/components/ui.tsx",
  "src/components/SevenLevels.tsx",
  "src/components/CostCalculator.tsx",
];
const read = (p) => readFileSync(p, "utf8");
/**
 * Source with comments removed. Without this the oracle matches its own
 * explanatory prose — the first run flagged "backdrop-blur" inside a comment
 * that exists precisely to say backdrop-blur was removed. A gate that fails
 * dishonestly is worth no more than one that passes dishonestly.
 */
const code = (p) =>
  read(p)
    .replace(/\/\*[\s\S]*?\*\//g, "")
    .replace(/(^|[^:])\/\/.*$/gm, "$1");
const webinarFiles = () =>
  readdirSync(WEBINAR_DIR)
    .filter((f) => f.endsWith(".tsx"))
    .map((f) => join(WEBINAR_DIR, f));

const failures = [];
const fail = (msg) => failures.push(msg);

const gate = process.argv[2];

function finish(id) {
  if (failures.length) {
    console.error(`${id} FAILED:`);
    for (const f of failures) console.error(`  - ${f}`);
    process.exit(1);
  }
  console.log(`${id} passed`);
}

switch (gate) {
  case "build": {
    execFileSync("npx", ["tsc", "--noEmit"], { stdio: "pipe" });
    execFileSync("npm", ["run", "build"], { stdio: "pipe" });
    finish("G1");
    break;
  }

  case "no-blur": {
    // Tailwind blur utilities on animated elements, and the two React Bits
    // props that turn scroll-driven blur back on.
    for (const file of [...webinarFiles(), ...PAGES]) {
      const src = code(file);
      const hits = src.match(/(?<!backdrop-)blur-\[[^\]]+\]/g) ?? [];
      if (hits.length) fail(`${file}: blur utility present -> ${hits.join(", ")}`);
    }
    const page = code("src/pages/WebinarExperience.tsx");
    if (!/blurAmount=\{0\}/.test(page)) fail("ScrollStack blurAmount is not 0");
    if (!/enableBlur=\{false\}/.test(page)) fail("ScrollReveal enableBlur is not false");
    finish("G2");
    break;
  }

  case "type-floor": {
    // A bare text-[Npx] is the mobile size. Anything under 12px fails unless a
    // md: variant is what carries the small value.
    for (const file of [...webinarFiles(), ...PAGES, ...SHARED]) {
      const src = code(file);
      for (const m of src.matchAll(/(md:)?text-\[(\d+(?:\.\d+)?)px\]/g)) {
        const [, variant, px] = m;
        if (!variant && Number(px) < 12) fail(`${file}: base text-[${px}px] is below the 12px mobile floor`);
      }
      for (const m of src.matchAll(/font-(thin|extralight|light)\b/g)) {
        fail(`${file}: ${m[0]} is below weight 400`);
      }
    }
    finish("G3");
    break;
  }

  case "sizer": {
    const src = code(`${WEBINAR_DIR}/LiveDemo.tsx`);
    if (!/invisible[^"]*whitespace-pre-wrap/.test(src))
      fail("LiveDemo: no invisible sizer paragraph reserving the finished height");
    if (!/absolute inset-0 whitespace-pre-wrap/.test(src))
      fail("LiveDemo: typed layer is not overlaid on the sizer");
    if (/min-h-\[15rem\]/.test(src))
      fail("LiveDemo: the old fixed min-height is still there, so the card can still grow");
    if (!/className="sr-only"/.test(src))
      fail("LiveDemo: no screen-reader copy of the finished answer");
    finish("G4");
    break;
  }

  case "tap-targets": {
    const demo = code(`${WEBINAR_DIR}/LiveDemo.tsx`);
    // Both interactive rows, not just the tabs. The first version of this gate
    // only checked one of them and let 42px chips through.
    const tapRows = demo.match(/min-h-1[12]/g) ?? [];
    if (tapRows.length < 2)
      fail(`LiveDemo: ${tapRows.length} of 2 mobile control rows declare a tap-target minimum`);
    // A scale-down shrinks the hit area as well as the look, so a 44px control
    // scaled to 0.92 is a 40px control. Anything scaled needs a bigger base.
    for (const m of demo.matchAll(/"[^"]*min-h-11[^"]*"/g)) {
      if (/scale-\[0\./.test(m[0]))
        fail("LiveDemo: a min-h-11 control is scaled down, putting its hit area under 44px; use min-h-12");
    }
    const cta = code(`${WEBINAR_DIR}/SeatCta.tsx`);
    if (!/w-full/.test(cta) || !/md:w-auto/.test(cta))
      fail("SeatCta: seat button is not full width on mobile and auto from md up");
    finish("G5");
    break;
  }

  case "static-blur-only": {
    // One sanctioned blur, defined once, never eased. Every other filter stays
    // banned. This gate exists so the exception cannot grow back into the rule.
    const css = readFileSync("src/index.css", "utf8");
    // Exactly two sanctioned blurs: the demo lane and the picker falloff. Both
    // fixed-radius, both cleared under reduced motion. Any third is a bug.
    const blurRules = css.match(/filter:\s*blur\(/g) ?? [];
    if (blurRules.length !== 2)
      fail(`index.css defines ${blurRules.length} blur filters; exactly 2 (.gc-lane-dim, .gc-pick-dim) are allowed`);
    if (!/\.gc-lane-dim\s*\{[^}]*filter:\s*blur\(2\.5px\)/.test(css))
      fail(".gc-lane-dim is not a fixed 2.5px radius");
    if (!/\.gc-pick-dim\s*\{[^}]*filter:\s*blur\(1\.6px\)/.test(css))
      fail(".gc-pick-dim is not a fixed 1.6px radius");
    const reducedBlock = css.match(/prefers-reduced-motion[\s\S]*?filter:\s*none/);
    if (!reducedBlock || !/gc-lane-dim/.test(reducedBlock[0]) || !/gc-pick-dim/.test(reducedBlock[0]))
      fail("both sanctioned blurs must be cleared under prefers-reduced-motion");

    for (const file of [...webinarFiles(), ...PAGES]) {
      const src = code(file);
      // transition-all would ease a filter if one ever appeared on the element.
      for (const m of src.matchAll(/transition-all/g)) fail(`${file}: transition-all can ease a filter; name the properties`);
      for (const m of src.matchAll(/transition-\[[^\]]*filter[^\]]*\]/g))
        fail(`${file}: ${m[0]} eases a filter, which re-rasterises every frame`);
    }
    finish("G13");
    break;
  }

  case "drag-compare": {
    const demo = code(`${WEBINAR_DIR}/LiveDemo.tsx`);
    // Both answers must be mounted on mobile. The old design rendered one pane
    // and swapped its tokens, which is what put the contrast in memory instead
    // of in view.
    if (/tokens=\{mobileTokens\}/.test(demo))
      fail("LiveDemo: mobile still renders a single swapped pane");
    if (!/snap-x/.test(demo) || !/snap-center|snap-start/.test(demo))
      fail("LiveDemo: no scroll-snap track for the compare gesture");
    // One counter, so the two answers race exactly as they do on desktop.
    if (/targetLength = isMobile \?/.test(demo))
      fail("LiveDemo: mobile still types to a per-side length instead of the shared counter");
    if (!/TAP BACK TO COMPARE/i.test(demo) === false)
      fail("LiveDemo: the instructional caption is still present");
    finish("G11");
    break;
  }

  case "reveal-fails-open": {
    // A reveal that starts hidden turns any JS failure into a blank section.
    // On the page that takes money that is unacceptable, so the hidden state
    // must depend on an observer actually being attached.
    const r = code("src/components/Reveal.tsx");
    // No JS may decide whether a section is visible.
    if (/IntersectionObserver|useState|useEffect/.test(r))
      fail("Reveal gates visibility on JavaScript; a failure would blank the section");
    if (!/gc-reveal/.test(r)) fail("Reveal does not use the CSS view-timeline rule");
    const css = readFileSync("src/index.css", "utf8");
    if (!/@supports \(animation-timeline: view\(\)\)[\s\S]*?\.gc-reveal/.test(css))
      fail(".gc-reveal is not inside an @supports guard, so unsupported browsers could be left hidden");
    if (!/@keyframes gcReveal[\s\S]*?opacity: 0/.test(css)) fail("no gcReveal keyframes");
    if (/\.gc-reveal\s*\{[^}]*opacity:\s*0/.test(css))
      fail(".gc-reveal sets opacity 0 outside the animation; that can strand content hidden");
    if (/gcReveal[\s\S]{0,200}filter/.test(css)) fail("the reveal animates a filter");
    finish("G21");
    break;
  }

  case "no-ignored-pt0": {
    // `pt-0` cannot override `md:py-24` — different variants, so tailwind-merge
    // keeps both. Every bare pt-0 is a section rendering at double the intended
    // gap above 768px. This shipped unnoticed on the money page for months.
    for (const file of [...PAGES, "src/pages/Workshop.tsx"]) {
      const src = code(file);
      for (const m of src.matchAll(/className="([^"]*\bpt-0\b[^"]*)"/g)) {
        if (!/md:pt-0/.test(m[1]))
          fail(`${file}: className="${m[1]}" — pt-0 without md:pt-0 is ignored above 768px`);
      }
    }
    finish("G22");
    break;
  }

  case "review-order": {
    // Pain before objection-handling. The demo answers a question nobody asks
    // until they have accepted the cost, so it must sit after the calculator.
    const page = code("src/pages/WorkshopExperience.tsx");
    const at = (marker) => page.indexOf(marker);
    const week = at('id="week"');
    const cost = at('id="cost"');
    const demo = at('id="demo"');
    const levels = at('id="levels"');
    const who = at('id="who"');
    const day = at('id="day"');
    for (const [name, i] of Object.entries({ week, cost, demo, levels, who, day }))
      if (i < 0) fail(`WorkshopExperience: no ${name} section`);
    if (!(week < cost)) fail("the week must come before the cost");
    if (!(cost < demo)) fail("the demo must come AFTER the calculator, not before it");
    if (!(demo < levels)) fail("the ladder must follow the demo");
    if (!(levels < who)) fail("who-it-is-for must follow the ladder");
    if (!(who < day)) fail("the day must follow who-it-is-for");

    // A price with no reason reads as bait.
    if (!/Founding rate/.test(page)) fail("the price is stated with no reason attached");
    // The ladder must name the rungs the day delivers.
    if (!/level two to level four/i.test(page))
      fail("the ladder does not say which level the day takes them to");

    // Identical repetition reads as a loop: the bands must not all say the same.
    const notes = [...page.matchAll(/note=\{(\w+)\}/g)].map((m) => m[1]);
    if (new Set(notes).size < 3)
      fail(`only ${new Set(notes).size} distinct CTA framings across ${notes.length} bands; vary them`);
    finish("G19");
    break;
  }

  case "no-invented-proof": {
    // Never a fabricated result and never an invented date. Both sections are
    // data-driven and both data sources ship empty.
    const data = code("src/lib/workshopEvent.ts");
    if (!/export const PROOF: ProofEntry\[\] = \[\];/.test(data))
      fail("PROOF is not empty; a testimonial may have been invented rather than given");
    if (!/export const WORKSHOP_EVENT: WorkshopEvent \| null = null;/.test(data))
      fail("WORKSHOP_EVENT is set in code; a date must come from Phila, not from here");
    const page = code("src/pages/WorkshopExperience.tsx");
    if (!/\{PROOF\.length > 0 && \(/.test(page))
      fail("the proof section is not gated on real entries existing");
    if (!/\{WORKSHOP_EVENT && \(/.test(page))
      fail("the date section is not gated on the event being set");
    finish("G20");
    break;
  }

  case "demo-everywhere": {
    // The comparison is the most persuasive thing on the site. It belongs on
    // every page that has to sell, and it belongs above the fold-and-a-half,
    // not buried at the bottom.
    for (const [file, label] of [
      ["src/pages/WebinarExperience.tsx", "webinar experience"],
      ["src/pages/WorkshopExperience.tsx", "workshop experience"],
      ["src/pages/Workshop.tsx", "the live home page"],
    ]) {
      if (!/<LiveDemo/.test(code(file))) fail(`${label} does not render the live demo`);
    }
    finish("G18");
    break;
  }

  case "workshop-route": {
    const app = code("src/App.tsx");
    if (!/lazy\(\(\) => import\("\.\/pages\/WorkshopExperience"\)\)/.test(app))
      fail("App: WorkshopExperience is not lazily imported");
    // The landing page is the experience now, but it must never be able to
    // leave a visitor with nothing: the original page is its crash fallback.
    const landing = app.slice(app.indexOf('path="/"'), app.indexOf('path="/checkout"'));
    if (!/<WorkshopExperience \/>/.test(landing))
      fail("App: / does not render the workshop experience");
    if (!/ExperienceBoundary fallback=\{<WorkshopPage \/>\}/.test(landing))
      fail("App: / has no fallback to the original page if the experience throws");
    if (!/path="\/workshop" element=\{<Navigate to="\/" replace \/>\}/.test(app))
      fail("App: /workshop no longer redirects, so old links would 404");
    finish("G15");
    break;
  }

  case "workshop-cta": {
    const page = code("src/pages/WorkshopExperience.tsx");
    if (/SeatCtaProvider|SeatButton|SeatStepper/.test(page))
      fail("WorkshopExperience: wired to the webinar seat dialog instead of the checkout");
    if (!/to="\/checkout"/.test(page)) fail("WorkshopExperience: no checkout link");
    finish("G16");
    break;
  }

  case "unique-ids": {
    // SeatStepper renders up to three times on one page. Hard-coded input ids
    // put duplicate DOM ids on the document, which breaks label association and
    // autofill. Ids must be derived per instance.
    const stepper = code(`${WEBINAR_DIR}/SeatStepper.tsx`);
    if (!/useId\(\)/.test(stepper)) fail("SeatStepper: field ids are not derived per instance (useId)");
    for (const m of stepper.matchAll(/id="seat-[a-z]+"/g)) fail(`SeatStepper: hard-coded ${m[0]}`);
    finish("G9");
    break;
  }

  case "perf-guards": {
    const page = code("src/pages/WebinarExperience.tsx");
    if (!/heavyStack\s*=\s*!reduced && !isMobile/.test(page))
      fail("WebinarExperience: the layout-reading ScrollStack is no longer gated off mobile");
    if (!/\{heavyStack \? \(/.test(page)) fail("WebinarExperience: heavyStack is computed but never used");
    // The phone must still get the pile, just not the expensive one.
    if (!/<CardStack/.test(page)) fail("WebinarExperience: mobile has no card stack at all");
    const stack = code(`${WEBINAR_DIR}/CardStack.tsx`);
    if (/addEventListener\(\s*["']scroll/.test(stack))
      fail("CardStack: has a scroll listener; it must be pure CSS sticky");
    if (/getBoundingClientRect|offsetTop/.test(stack))
      fail("CardStack: reads layout; the whole point is that it does not");
    if (!/position|sticky/.test(stack)) fail("CardStack: is not sticky-based");
    // overflow:hidden on any ancestor silently disables sticky for everything
    // inside it. This bit the stack once already.
    const triedSection = page.match(/<Section id="tried"[^>]*className="([^"]*)"/);
    if (triedSection && /overflow-hidden/.test(triedSection[1]))
      fail("the tried section uses overflow-hidden, which disables sticky; use overflow-x-clip");
    const demo = code(`${WEBINAR_DIR}/LiveDemo.tsx`);
    if (!/PAINT_INTERVAL_MS/.test(demo)) fail("LiveDemo: typing repaint throttle removed");
    const spark = code("src/components/reactbits/ClickSpark.tsx");
    if (!/runningRef\.current = false/.test(spark)) fail("ClickSpark: idle loop no longer parks");
    const bar = code(`${WEBINAR_DIR}/StickySeatBar.tsx`);
    if (/backdrop-blur/.test(bar)) fail("StickySeatBar: backdrop-blur is back on a sticky element");
    finish("G6");
    break;
  }

  /**
   * G23: the site can be served by a host that is not Apache.
   *
   * Every route except "/" is a rewrite, so a host that does not read the
   * rewrite rules serves a 404 on /webinar the day we need it most. Apache
   * reads dist/.htaccess; Cloudflare Pages reads _redirects and _headers. Both
   * must ship, and both must survive `vite build`, which empties dist.
   */
  case "host-portable": {
    const existsIn = (p) => {
      try { readFileSync(p, "utf8"); return true; } catch { return false; }
    };
    for (const p of ["public/_redirects", "public/_headers"])
      if (!existsIn(p)) fail(`${p} is missing; Cloudflare Pages would 404 every route but "/"`);
    // public/* is copied into dist by vite, so a build must reproduce them.
    for (const p of ["dist/_redirects", "dist/_headers", "dist/.htaccess",
                     "dist/.well-known/apple-developer-merchantid-domain-association"])
      if (!existsIn(p)) fail(`${p} did not survive the build; the deploy would ship broken`);
    if (existsIn("public/_redirects")) {
      const r = readFileSync("public/_redirects", "utf8");
      if (!/^\/\*\s+\/index\.html\s+200\s*$/m.test(r))
        fail("public/_redirects has no SPA fallback rule; deep links would 404");
    }
    if (existsIn("public/_headers")) {
      const h = readFileSync("public/_headers", "utf8");
      if (!/apple-developer-merchantid-domain-association/.test(h))
        fail("public/_headers does not set the Apple Pay file type; Apple Pay would fail to verify");
    }
    // The failure path must not route people to the mailbox that dies with the
    // host. That is the whole point of the WhatsApp fallback.
    for (const p of ["src/components/webinar/SeatStepper.tsx",
                     "src/components/WebinarSignup.tsx", "src/pages/Class.tsx"]) {
      const c = code(p);
      if (/did not save[\s\S]{0,160}growthcred\.co\.za/.test(c))
        fail(`${p}: the save-failed message still points at the at-risk mailbox`);
      if (!/WHATSAPP/.test(c)) fail(`${p}: no WhatsApp fallback on the failure path`);
    }
    finish("G23");
    break;
  }

  /**
   * G24: the parallel funnel keeps its two promises.
   *
   * The magnet is delivered ON the page, never promised by an email nothing
   * can send; and the seat that follows is one tap on details already given,
   * not a second form. Both are the whole reason this funnel converts, and
   * both are the kind of thing a later edit quietly undoes.
   */
  case "magnet-funnel": {
    const signup = code("src/components/MagnetSignup.tsx");
    const page = code("src/pages/Playbook.tsx");
    const magnets = code("src/lib/magnets.ts");

    // Delivery is on-page. Any "check your inbox" framing is the old lie back.
    if (/(check|watch).{0,20}(your )?(inbox|email)|on its way to|sent to your email/i.test(signup + page))
      fail("the magnet page promises delivery by email; nothing here can send one");
    if (!/isDeliverable/.test(signup))
      fail("MagnetSignup no longer guards on isDeliverable; a null file would render a dead download");
    if (!/ToComeBlock/.test(signup))
      fail("MagnetSignup lost its visible placeholder; a missing pack must never look shipped");

    // The seat is one tap, reusing what was typed.
    if (!/registerForWebinar/.test(signup))
      fail("MagnetSignup no longer offers the seat; the funnel stops at the magnet");
    if (!/form\.email/.test(signup) || !/form\.whatsapp/.test(signup))
      fail("the seat no longer reuses the details already given; that is a second form");

    // POPIA: consent is required to submit, and it is stored.
    if (!/consent/.test(signup)) fail("MagnetSignup has no consent state");
    if (!/&&\s*consent/.test(signup))
      fail("consent is not part of the submit gate; the form can be sent without it");
    if (!/consent,/.test(signup))
      fail("consent is collected but never written; unprovable consent is not consent");
    if (!/href="\/privacy"/.test(signup))
      fail("the consent line does not link the privacy policy");

    // Failure routes to WhatsApp, not the mailbox that dies with the host.
    if (/growthcred\.co\.za/.test(signup))
      fail("MagnetSignup points at the at-risk mailbox on failure");
    if (!/WHATSAPP/.test(signup)) fail("MagnetSignup has no WhatsApp fallback");

    // Packs ship empty until the PDFs exist, and the schema must be there.
    if (!/file: null/.test(magnets) && !/file: "/.test(magnets))
      fail("magnets.ts has neither a null slot nor a real file; the registry is malformed");
    const schema = read("supabase/schema.sql");
    if (!/create table if not exists public\.magnet_signups/.test(schema))
      fail("magnet_signups is missing from schema.sql; the funnel has nowhere to write");
    if (!/on public\.magnet_signups\s+for insert to anon/.test(schema))
      fail("magnet_signups has no anon insert policy");
    if (/on public\.magnet_signups for (select|update|delete)/.test(schema))
      fail("magnet_signups grants anon more than insert; the browser must only write");

    // The route must be lazy AND inside a Suspense, or it throws on open.
    const app = code("src/App.tsx");
    if (!/path="\/playbook"/.test(app)) fail("no /playbook route");
    if (!/PlaybookPage = lazy/.test(app)) fail("the playbook page is no longer lazy");
    const block = app.slice(app.indexOf('path="/playbook"'), app.indexOf('path="/playbook"') + 400);
    if (!/Suspense/.test(block))
      fail("the /playbook route has no Suspense boundary; a lazy page without one throws");
    finish("G24");
    break;
  }

  default:
    console.error(`unknown gate: ${gate}`);
    process.exit(2);
}
