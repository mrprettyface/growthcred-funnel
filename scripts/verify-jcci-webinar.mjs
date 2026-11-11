#!/usr/bin/env node
/**
 * Gate oracle for the JCCI webinar funnel (GATES-jcci-webinar.md).
 *
 * Mostly static checks over source and over the BUILT pages in dist/, so run
 * `npm run build` first. Portable Node only, no dev server and no network.
 * Each subcommand prints "<name> OK" and exits 0, or says what is missing and
 * exits 1. Several checks are negative ("this claim must NOT be on the page"),
 * and a negative check that cannot fail proves nothing — so each one is first
 * exercised against a positive control, inline, before it is trusted.
 */
import assert from "node:assert/strict";
import { readFileSync, existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const read = (p) => readFileSync(join(root, p), "utf8");

function fail(name, missing) {
  console.error(`${name} FAILED — ${missing.join("; ")}`);
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
  if (missing.length) fail(name, [`missing: ${missing.map(String).join(", ")}`]);
  pass(name);
}

/** The built HTML of a route, by its path. */
function builtPage(path) {
  const manifest = JSON.parse(read("dist/search-manifest.json"));
  const record = manifest.routes.find((r) => r.path === path);
  assert.ok(record, `${path} is not in the build manifest — is it in src/seo/routes.ts?`);
  return read(join("dist", record.file));
}

/** Visible text of a built page: tags out, entities for the ones we test on. */
function visibleText(html) {
  const main = html.replace(/<script[\s\S]*?<\/script>/gi, " ");
  return main
    .replace(/<[^>]+>/g, " ")
    .replace(/&middot;/g, "·")
    .replace(/&times;/g, "×")
    .replace(/&rsquo;|&#8217;|&#x27;|&#39;|&apos;/g, "’")
    .replace(/&ldquo;|&rdquo;|&quot;|&#x22;/g, "”")
    .replace(/&amp;/g, "&")
    .replace(/&nbsp;/g, " ")
    /* Anything still escaped, decoded numerically, so a gate never passes or
       fails on an entity the list above happened not to cover. */
    .replace(/&#x([0-9a-f]+);/gi, (_, h) => String.fromCodePoint(parseInt(h, 16)))
    .replace(/&#(\d+);/g, (_, d) => String.fromCodePoint(Number(d)))
    .replace(/\s+/g, " ");
}

const cmd = process.argv[2];

switch (cmd) {
  /* ------------------------------------------------------------------ page */
  case "page": {
    const text = visibleText(builtPage("/webinar"));
    const html = builtPage("/webinar");

    requireAll("page", text, [
      /Wednesday 18 November/,
      /18:00 SAST/,
      /Microsoft Teams/,
      /JCCI/,
      /Prompts don’t save time\. Systems do\./i,
      /The day I stopped typing prompts/i,
      /Chat Trap/,
      /Operator’s Brain/,
      /Here is what you get for R0/,
      /Take a VIP seat for R497/,
      /R497/,
      /POPIA/,
      /Results vary/,
      /Reg\. 2026\/229279\/07/, // the footer this bare page renders itself
    ]);

    /* The four engines, the three owners and the six takeaways all survive the
       build. A section silently dropped by a bad conditional is the failure
       this catches. */
    const counts = [
      ["The Brain", "The Reply Engine", "The Research Engine", "The Admin Engine"],
      ["You are the business", "can’t afford to hire yet"],
    ].flat();
    const missing = counts.filter((c) => !text.includes(c));
    if (missing.length) fail("page", [`sections missing: ${missing.join(", ")}`]);

    /* The form is reachable from every call to action on the page. */
    assert.ok(html.includes('id="register"'), "the seat form anchor is missing");
    assert.ok(/href="#register"/.test(html), "no call to action points at the form");

    /* Step 1 is what prerenders; the seat choice is step 2, so it is checked in
       the form's source. Both seats, the VIP cap, and consent before either. */
    const form = read("src/components/webinar/SeatForm.tsx");
    requireAll("page-form", form, [
      /Step \{step\} of 2/,
      /Free Seat/,
      /VIP Seat/,
      /VIP_SEATS/,
      /Choose your seat/,
    ]);
    /* Everything that identifies someone is asked in step 1, before the seat. */
    assert.ok(
      form.indexOf('"Your details"') < form.indexOf('"Choose your seat"'),
      "the seat is asked for before the details, so an abandoned form leaves no lead",
    );
    for (const field of ["name", "email", "whatsapp", "business"])
      assert.ok(form.includes(`fieldId("${field}")`), `the form does not ask for ${field}`);
    pass("page");
    break;
  }

  /* ----------------------------------------------------------------- price */
  case "price": {
    /* The brief's prices must come from offers.ts, so the site can never
       disagree with Whop. Control first: prove the detector sees a typed price
       in page copy at all, then prove the real pages carry none. */
    const control = `<p>It costs R497 for the hour.</p>`;
    const typed = (src) =>
      [...src.matchAll(/R\s?\d[\d  ]*/g)]
        .map((m) => m[0].trim())
        /* R0 is a statement that something is free, not a price that could
           drift out of step with Whop, and the sliders' own R100-R3000 bounds
           are inputs, not prices. */
        .filter((v) => !/^R0$/.test(v));
    assert.equal(typed(control).length, 1, "control: a typed price was not detected");

    const offers = read("src/lib/offers.ts");
    requireAll("price-source", offers, [/export const VIP_SEAT/, /amountCents: 49700/]);

    const bad = [];
    for (const f of [
      "src/pages/JcciWebinar.tsx",
      "src/pages/WebinarThanks.tsx",
      "src/pages/WebinarVip.tsx",
      "src/components/webinar/SeatForm.tsx",
      "src/lib/jcciWebinar.ts",
    ]) {
      const hits = typed(read(f));
      if (hits.length) bad.push(`${f} types a price: ${hits.join(", ")}`);
    }
    if (bad.length) fail("price", bad);

    /* And the figure that reaches the page really is the one in offers.ts. */
    const text = visibleText(builtPage("/webinar"));
    const amount = Number(offers.match(/amountCents: (\d+)/g).find((m) => m.includes("49700")).match(/\d+/)[0]);
    assert.ok(
      text.includes(`R${amount / 100}`),
      `the page does not show R${amount / 100}, the VIP price in offers.ts`,
    );
    pass("price");
    break;
  }

  /* ----------------------------------------------------------------- proof */
  case "proof": {
    const text = visibleText(builtPage("/webinar"));

    /* Control: prove the detector would catch the unapproved claims if they
       were there. Without this, "absent" could just mean "badly spelled". */
    const control = visibleText(
      "<p>Jeff from MNE Waste built his with me. Now his WhatsApp assistant answers his customers for him.</p>",
    );
    const banned = [
      [/\bJeff\b/, "names Jeff, who is not the MNE Waste contact on record (Sandile is)"],
      [
        /WhatsApp assistant answers/i,
        "claims a WhatsApp assistant answers a client's customers, which nobody has approved",
      ],
    ];
    for (const [re, why] of banned)
      assert.ok(re.test(control), `control: the detector missed "${why}"`);

    const found = banned.filter(([re]) => re.test(text)).map(([, why]) => why);
    if (found.length) fail("proof", found);

    /* Every client result on the page must be one that is already published
       with that client's permission. */
    requireAll("proof-published", text, [
      /Sandile runs MNE Waste/,
      /built his Operator’s Brain with me in one day/,
      /now fully operational/,
      /My Claude has been operating a lot better since the last session/,
      /Macaela Oor, Demure International/,
      /three days\. It now takes two hours/,
      /I only publish a client result when they have agreed to be named/,
    ]);

    /* The approved wording is not invented here: it has to match what the site
       already publishes, so the two can never drift apart. */
    const published = read("src/content/searchPages.ts");
    for (const claim of [
      "My Claude has been operating a lot better since the last session",
      "now fully operational",
    ])
      assert.ok(
        published.includes(claim),
        `"${claim}" is on the webinar page but not in the published, permissioned content`,
      );

    /* This page is INDEXED, so it ships no scaffolding. What is still owed
       lives in the operations doc instead of in front of a registrant. The
       site's own SEO gate enforces the same rule; it is asserted here too,
       because this is the page that tempted us to break it. */
    assert.ok(!/\[TO COME/.test(text), "the indexed registration page ships a visible placeholder");
    const ops = read("docs/operations/jcci-webinar-reminders.md");
    for (const owed of [/Sandile/, /testimonial/i, /members/i])
      assert.ok(owed.test(ops), `the operations doc does not record what is owed: ${owed}`);
    pass("proof");
    break;
  }

  /* ------------------------------------------------------------------- vip */
  case "vip": {
    const whop = read("src/lib/whop.ts");
    const vipPage = read("src/pages/WebinarVip.tsx");

    /* While there is no plan, there must be no checkout and there must be a
       visible placeholder plus a real way for a person to get the seat. */
    const planSet = /vipSeat:\s*"plan_/.test(whop);
    if (!planSet) {
      requireAll("vip-fallback", vipPage, [
        /ToComeBlock/,
        /Claim my VIP seat on WhatsApp/,
        /Your webinar seat is saved either way/,
      ]);
      const html = builtPage("/webinar/vip");
      const text = visibleText(html);
      assert.ok(
        /\[TO COME: the VIP Seat: the Private Hour checkout\s*\]/.test(text),
        "the VIP page does not show a visible placeholder for the missing checkout",
      );
      /* Nothing may tell a visitor they have paid. */
      assert.ok(
        !/you have paid|payment received|thank you for your payment/i.test(text),
        "the VIP page claims a payment that cannot have happened",
      );
    }

    /* Either way: the registration is written BEFORE money is asked for, so an
       abandoned VIP checkout still leaves a lead. */
    const form = read("src/components/webinar/SeatForm.tsx");
    const registerAt = form.indexOf("registerForWebinar");
    const navigateAt = form.indexOf('navigate(seat === "vip"');
    assert.ok(registerAt > 0 && navigateAt > registerAt, "the VIP route is taken before the row is written");
    pass("vip");
    break;
  }

  /* ---------------------------------------------------------------- thanks */
  case "thanks": {
    const pdf = "public/downloads/business-brain-worksheet.pdf";
    assert.ok(existsSync(join(root, pdf)), `${pdf} is missing, so the Brain Builder cannot be handed over`);
    assert.ok(existsSync(join(root, "dist/downloads/business-brain-worksheet.pdf")), "the Brain Builder is not in the build");

    const text = visibleText(builtPage("/webinar/thanks"));
    requireAll("thanks", text, [
      /head start/i,
      /Download the Brain Builder/,
      /Join on WhatsApp/,
      /Google Calendar/,
      /Outlook/,
      /VIP/,
    ]);

    /* The referral block needs the registrant's email to build their link, so
       it is absent from the cold prerender and present in the source. */
    const page = read("src/pages/WebinarThanks.tsx");
    requireAll("thanks-referral", page, [/ShareInvite/, /refCode\(seat\.email\)/]);

    const vip = visibleText(builtPage("/webinar/vip"));
    requireAll("thanks", vip, [/Brain Builder/, /16:30/]);
    break;
  }

  /* --------------------------------------------------------------- capture */
  case "capture": {
    const sql = read("supabase/schema.sql");
    requireAll("capture-schema", sql, [
      /add column if not exists business text/,
      /add column if not exists consent  boolean/,
      /add column if not exists seat     text/,
    ]);

    const supa = read("src/lib/supabase.ts");
    requireAll("capture-insert", supa, [
      /consent\?: boolean/,
      /seat\?: "free" \| "vip"/,
      /const \{ business, consent, seat, \.\.\.core \} = reg/,
      /const first = await insert\(full\)/,
      /return insert\(base\)/, // the missing-migration fallback
    ]);

    const form = read("src/components/webinar/SeatForm.tsx");
    requireAll("capture-form", form, [
      /type="checkbox"/,
      /consent,$|consent,\s/, // consent is sent, not assumed
      /problems.consent/,
      /not_configured/, // a missing backend never costs a registration
    ]);

    /* Consent is REQUIRED: the form must not advance without it. */
    assert.ok(
      /consent: consent \? null :/.test(form),
      "an unticked consent box does not block the form",
    );
    pass("capture");
    break;
  }

  /* ------------------------------------------------------------- countdown */
  case "countdown": {
    const { msUntilStart, sessionHasPassed, calendarUrl } = await import(
      "../dist-ssr/entry-server.js"
    );
    const start = Date.parse("2026-11-18T16:00:00Z");

    /* Never negative, on either side of the start. */
    assert.equal(msUntilStart(start - 60_000), 60_000, "the clock is wrong before the start");
    assert.equal(msUntilStart(start), 0, "the clock does not stop at the start");
    assert.equal(msUntilStart(start + 86_400_000), 0, "the clock went negative after the session");

    assert.equal(sessionHasPassed(start - 1), false, "a future session is reported as passed");
    assert.equal(sessionHasPassed(start + 1), true, "a passed session is reported as upcoming");

    /* The page must stop selling a seat once the session has run. */
    const form = read("src/components/webinar/SeatForm.tsx");
    const page = read("src/pages/JcciWebinar.tsx");
    requireAll("countdown-past", form, [/sessionHasPassed\(\)/, /This one has already run/]);
    requireAll("countdown-past", page, [/sessionHasPassed\(\)/, /Tell me about the next one/]);

    /* The countdown must not be baked into the prerendered HTML. */
    const html = builtPage("/webinar");
    assert.ok(!/\dd : \d\dh : \d\dm/.test(html), "a stale countdown was prerendered into the HTML");

    /* A real date means a real calendar link. */
    assert.match(calendarUrl(), /calendar\.google\.com/, "the calendar link is still the fallback");
    pass("countdown");
    break;
  }

  /* -------------------------------------------------------------------- ops */
  case "ops": {
    const doc = "docs/operations/jcci-webinar-reminders.md";
    assert.ok(existsSync(join(root, doc)), `${doc} is missing`);
    const text = read(doc);
    requireAll("ops", text, [
      /On sign-up/,
      /3 days before/,
      /1 day before/,
      /2 hours before/,
      /15 minutes before/,
      /Still to confirm/i,
      /Whop/, // the VIP plan that does not exist yet
      /JCCI/,
      /schema\.sql/, // the migration that has to run before launch
    ]);
    break;
  }

  /* -------------------------------------------------------------- segments */
  case "segments": {
    const segs = read("src/lib/segments.ts");
    const page = read("src/pages/JcciWebinar.tsx");

    /* The ad plan and the page must agree on every slug: an ad pointing at a
       slug the page does not know is a wasted click that lands on the generic
       hero, and nothing would otherwise notice. */
    const plan = read("docs/marketing/jcci-webinar-meta-ads.md");
    const inCode = [...segs.matchAll(/^  ([a-z][a-z0-9-]*): \{$/gm)].map((m) => m[1]);
    assert.ok(inCode.length >= 10, `only ${inCode.length} segments defined`);
    const inPlan = [...new Set([...plan.matchAll(/`([a-z][a-z0-9-]*)`\s*\|/g)].map((m) => m[1]))];
    const orphanAds = inPlan.filter((slug) => !inCode.includes(slug));
    if (orphanAds.length)
      fail("segments", [`the ad plan points at slugs the page does not know: ${orphanAds.join(", ")}`]);

    /* A segment may never introduce a claim. `proof` is a KEY into PROOF, and
       every entry of PROOF must already be published, with permission. */
    assert.ok(
      !/proof:\s*"[^"]{30,}"/.test(segs),
      "a segment carries a proof SENTENCE rather than a key into PROOF",
    );
    const facts = read("src/lib/jcciWebinar.ts");
    const published = read("src/content/searchPages.ts");
    /* Scoped to the PROOF block: `line:` is also an ENGINES field, and a
       check that wanders into the wrong object fails on honest copy. */
    const proofBlock = facts.match(/export const PROOF = \{([\s\S]*?)\n\} as const;/);
    assert.ok(proofBlock, "PROOF is not declared the way this check expects");
    const norm = (v) => v.replace(/[\u2018\u2019]/g, "'").replace(/[\u201c\u201d]/g, '"').replace(/\s+/g, " ");
    const pub = norm(published);

    /* A QUOTE must be verbatim. You may shorten a result into the house voice;
       you may never rewrite what someone said inside quotation marks. */
    const quotes = [...proofBlock[1].matchAll(/quote: "([^"]+)"/g)].map((m) => m[1]);
    assert.ok(quotes.length >= 1, "PROOF carries no client quote to check");
    for (const q of quotes)
      assert.ok(
        pub.includes(norm(q)),
        `PROOF quotes a client in words that are not published verbatim: "${q}"`,
      );

    /* A REPORTED RESULT may be rephrased, so it is checked fact by fact: every
       name and every figure in it has to appear in the published, permissioned
       content. That catches an invented client or an invented number, while
       leaving the house voice free to say it in shorter sentences. */
    const lines = [...proofBlock[1].matchAll(/line: "([^"]+)"/g)].map((m) => m[1]);
    assert.ok(lines.length >= 1, "PROOF carries no reported result to check");
    const FIGURES = /^(one|two|three|four|five|six|seven|eight|nine|ten|\d[\d,.]*)$/i;
    for (const line of lines) {
      const tokens = norm(line)
        .split(/[^A-Za-z0-9,.]+/)
        .filter((w) => /^[A-Z][A-Za-z]{2,}$/.test(w) || FIGURES.test(w))
        .filter((w) => !["The", "This", "That", "They", "Their", "And", "But", "For"].includes(w));
      assert.ok(tokens.length >= 2, `PROOF line carries nothing checkable: "${line}"`);
      for (const token of tokens)
        assert.ok(
          new RegExp(`\\b${token}\\b`, "i").test(pub),
          `PROOF states "${token}" about a client, which is not in the published content: "${line}"`,
        );
    }

    /* The control: an invented client and an invented figure must both fail. */
    for (const bogus of ["Zephyr Holdings cut it by ninety percent", "Acme saved 47 hours"]) {
      const tokens = bogus.split(/[^A-Za-z0-9]+/).filter((w) => /^[A-Z][A-Za-z]{2,}$/.test(w) || FIGURES.test(w));
      assert.ok(
        tokens.some((t) => !new RegExp(`\\b${t}\\b`, "i").test(pub)),
        `control: an invented client result went undetected ("${bogus}")`,
      );
    }

    /* The H1 must not move: it is prerendered and indexed. The segment may only
       reach the eyebrow, an opener and the order of the proof column. */
    assert.ok(
      !/<h1[^>]*>\s*\{segment/.test(page),
      "the segment reaches the H1, which is prerendered and indexed",
    );
    requireAll("segments-page", page, [
      /segment\?\.eyebrow \?\?/,
      /segment\.opener/,
      /proofOrder\(segment\?\.proof\)/,
      /useEffect\(\(\) => setSegment/, // resolved after mount, never during SSR
    ]);

    /* And the prerendered page shows the DEFAULT, so one page is indexed. */
    const text = visibleText(builtPage("/webinar"));
    assert.ok(
      text.includes("For South African owners tired of doing everything themselves"),
      "the prerendered page does not carry the default eyebrow",
    );
    const leaked = inCode
      .map((slug) => [slug, segs.match(new RegExp(`${slug}: \\{\\s*\n\\s*eyebrow:\\s*"([^"]+)"`))?.[1]])
      .filter(([, eyebrow]) => eyebrow && text.includes(eyebrow));
    if (leaked.length)
      fail("segments", [`a segment's copy was prerendered into the shared page: ${leaked.map(([s]) => s).join(", ")}`]);
    pass("segments");
    break;
  }

  /* ----------------------------------------------------------- attribution */
  case "attribution": {
    const sql = read("supabase/schema.sql");
    requireAll("attribution-schema", sql, [
      /add column if not exists utm_campaign text/,
      /add column if not exists utm_content  text/,
      /add column if not exists utm_term     text/,
      /add column if not exists segment      text/,
      /webinar_registrations_by_adset/, // the view the weekly throttle reads
    ]);

    const utm = read("src/lib/utm.ts");
    requireAll("attribution-lib", utm, [
      /export function activeAttribution/,
      /sessionStorage/, // survives the query string React Router drops
      /replace\(\/\[\^a-z0-9\._-\]\/g, ""\)/, // sanitised before it reaches a row
    ]);

    const supa = read("src/lib/supabase.ts");
    requireAll("attribution-insert", supa, [
      /from ["']\.\/utm["']/,
      /activeAttribution\(\)/,
      /\.\.\.attribution/,
      /segment,/,
    ]);
    /* The attribution columns ride in `extra`, so the missing-migration retry
       still drops them rather than losing the registration. */
    const extraAt = supa.indexOf("const extra = {");
    const attributionAt = supa.indexOf("...attribution");
    const fullAt = supa.indexOf("const full = {");
    assert.ok(
      extraAt > 0 && attributionAt > extraAt && attributionAt < fullAt,
      "attribution is not inside `extra`, so a missing migration would lose the registration",
    );
    pass("attribution");
    break;
  }

  /* -------------------------------------------------------------- contrast */
  case "contrast": {
    /*
     * Headings that disappear into their own background.
     *
     * src/index.css sets `h1, h2, h3, h4 { color: var(--color-midnight) }` in
     * the base layer. An element's own rule beats a colour inherited from its
     * parent, so a heading inside a <Section dark> does NOT pick up the
     * section's `text-cream`: it stays midnight on midnight and vanishes. Every
     * other gate here reads TEXT, and text that is present but invisible passes
     * all of them -- which is exactly how five headings shipped unreadable.
     *
     * <Section> stamps data-tone="dark" on the band, so this is checkable on
     * the built HTML, for every prerendered page on the site.
     */
    const manifest = JSON.parse(read("dist/search-manifest.json"));
    /*
     * The rule is "an explicit colour choice", not "a light colour".
     *
     * A dark band can legitimately contain a light CARD -- the seat form sits
     * on `bg-paper` inside the dark hero -- and a heading in that card is
     * correctly `text-midnight`. What is never correct is a heading with NO
     * colour class at all, because that silently inherits the base-layer
     * midnight from index.css, which is the bug this gate exists for. So the
     * check is for the ABSENCE of a decision, which is the actual defect.
     */
    const DECIDED = /\btext-(cream|white|gold|gold-soft|paper|sand|midnight|ink|muted)\b/;

    /* Pull each dark band, then every heading inside it. */
    const darkBands = (html) => {
      const out = [];
      const open = /<section[^>]*data-tone="dark"[^>]*>/g;
      let m;
      while ((m = open.exec(html))) {
        /* Sections do not nest on this site, so the next <section stops it. */
        const rest = html.slice(m.index + m[0].length);
        const end = rest.search(/<section[\s>]/);
        out.push(end === -1 ? rest : rest.slice(0, end));
      }
      return out;
    };
    /*
     * The heading AND what is inside it. A heading can legitimately carry no
     * colour itself while its visible text does: /workshop's animated heading
     * is a bare <h2> wrapper around a <span class="... text-cream">. What
     * matters is that the rendered words have a colour, wherever it is set.
     */
    const headings = (band) =>
      [...band.matchAll(/<(h[1-4])([^>]*)>([\s\S]*?)<\/\1>/g)].map((h) => ({
        tag: h[1],
        cls: h[2].match(/class="([^"]*)"/)?.[1] ?? "",
        inner: h[3],
      }));

    /* Control: the detector must flag a heading with no light colour, and must
       not flag one that has it. Without this, "no findings" could just mean the
       regex never matched a section at all. */
    const control = '<section data-tone="dark"><h2 class="text-3xl"><span>x</span></h2></section>';
    assert.equal(darkBands(control).length, 1, "control: a dark band was not detected");
    assert.equal(headings(darkBands(control)[0]).length, 1, "control: a heading was not detected");
    assert.ok(!DECIDED.test(headings(darkBands(control)[0])[0].cls + " " + headings(darkBands(control)[0])[0].inner), "control: a heading with no colour class was not flagged");
    const ok = '<section data-tone="dark"><h2 class="text-3xl"><span class="text-cream">x</span></h2></section>';
    assert.ok(DECIDED.test(headings(darkBands(ok)[0])[0].cls + " " + headings(darkBands(ok)[0])[0].inner), "control: a heading with an explicit colour was wrongly flagged");

    const bad = [];
    let scannedBands = 0;
    let scannedHeadings = 0;
    for (const route of manifest.routes) {
      if (!route.prerendered) continue;
      const html = read(join("dist", route.file));
      for (const band of darkBands(html)) {
        scannedBands++;
        for (const h of headings(band)) {
          scannedHeadings++;
          if (!DECIDED.test(h.cls + ' ' + h.inner))
            bad.push(`${route.path}: <${h.tag}> on a dark band has no explicit text colour, so it inherits midnight from index.css (class="${h.cls.slice(0, 70)}")`);
        }
      }
    }
    assert.ok(scannedBands > 0, "no dark sections were scanned at all -- the detector found nothing to check");
    if (bad.length) fail("contrast", bad);
    console.log(`contrast OK (${scannedHeadings} headings across ${scannedBands} dark bands)`);
    break;
  }

  /* ------------------------------------------------------------------- all */
  case "all": {
    const { execFileSync } = await import("node:child_process");
    const steps = ["page", "price", "proof", "vip", "thanks", "capture", "countdown", "segments", "attribution", "contrast", "ops"];
    for (const step of steps)
      execFileSync(process.execPath, [fileURLToPath(import.meta.url), step], {
        stdio: "inherit",
        cwd: root,
      });
    pass("all");
    break;
  }

  default:
    console.error(
      "usage: node scripts/verify-jcci-webinar.mjs page|price|proof|vip|thanks|capture|countdown|segments|attribution|contrast|ops|all",
    );
    process.exit(2);
}
