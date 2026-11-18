import { useEffect, useId, useMemo, useState, type FormEvent, type ReactNode } from "react";
import { Link } from "react-router-dom";
import { cn } from "../components/ui";
import { BrandIcon } from "../components/BrandIcons";
import { HeroGraph } from "../components/home/HeroGraph";
import { captureLead, captureMagnetSignup } from "../lib/supabase";
import { track } from "../lib/analytics";
import { whatsappUrl } from "../lib/contact";
import { loadAccess, saveAccess, clearAccess, TOOLKIT_SLUG, type ToolkitAccess } from "../lib/toolkitAccess";
import {
  TOOLKIT,
  GROUPS,
  RESOURCES,
  INDUSTRIES,
  PAINS,
  FIRST_WEEK,
  TOOLKIT_FAQ,
  ZIP_FILE,
  resourceById,
  type Resource,
  type IndustryKey,
  type FileRef,
} from "../lib/toolkit";

/**
 * /toolkit — the JCCI members' resource vault.
 *
 * Two states on one route. Locked: a single short form (first name, email, a
 * ticked yes to one email a day). Unlocked: the whole kit, laid out so nobody
 * has to work out where to begin. The page picks for them: say what is eating
 * your week and what you do, and it hands you one file and a seven-day route.
 *
 * Prerendered in the locked state (the server has no localStorage), and noindex:
 * this is the inside of a funnel, not a search page.
 */

const INDUSTRY_KEY = "gc_toolkit_industry";

const field =
  "w-full rounded-xl border border-midnight/15 bg-white px-4 py-3.5 text-lg text-midnight placeholder:text-faint outline-none transition focus:border-gold";

const emailOk = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim());

function TopBar({ onLeave }: { onLeave?: () => void }) {
  return (
    <div className="relative z-10 border-b border-midnight/10 bg-paper/90 backdrop-blur-sm">
      <div className="mx-auto flex w-[min(1180px,calc(100%-2.5rem))] items-center justify-between gap-4 py-5">
        <Link to="/" className="no-underline">
          <span className="font-display text-xl font-extrabold tracking-[-0.04em] text-midnight">
            Growth<span className="text-gold">Cred.</span>
          </span>
        </Link>
        <div className="flex items-center gap-5">
          <span className="hidden font-mono text-[11px] uppercase tracking-[0.18em] text-muted sm:inline">
            {TOOLKIT.partner} &times; GrowthCred &middot; Members&rsquo; toolkit
          </span>
          {onLeave ? (
            <button
              type="button"
              onClick={onLeave}
              className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted underline-offset-4 hover:text-gold hover:underline"
            >
              Not you?
            </button>
          ) : null}
        </div>
      </div>
    </div>
  );
}

function FileButtons({ files, compact = false, label }: { files: FileRef[]; compact?: boolean; label: string }) {
  return (
    <div className="flex flex-wrap gap-2">
      {files.map((f) => (
        <a
          key={f.href}
          href={f.href}
          download
          onClick={() => track("toolkit_download", { file: f.href, kind: f.kind })}
          aria-label={`Download ${label} as ${f.kind.toUpperCase()}`}
          className={cn(
            "inline-flex items-center gap-2 rounded-full no-underline transition",
            f.kind === "pdf"
              ? "bg-midnight text-cream hover:bg-midnight-soft"
              : "border border-midnight/15 bg-white text-midnight hover:border-gold",
            compact ? "min-h-10 px-4 text-[13px]" : "min-h-11 px-5 text-sm",
            "font-body font-semibold",
          )}
        >
          <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-gold">{f.kind}</span>
          {f.cta}
          <span aria-hidden="true">&darr;</span>
        </a>
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Locked                                                              */
/* ------------------------------------------------------------------ */

function Gate({ onUnlock }: { onUnlock: (a: ToolkitAccess) => void }) {
  const uid = useId();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);
  const [state, setState] = useState<"idle" | "sending">("idle");
  const [touched, setTouched] = useState(false);

  const ready = name.trim().length > 0 && emailOk(email) && consent;

  async function submit(e: FormEvent) {
    e.preventDefault();
    setTouched(true);
    if (!ready || state === "sending") return;
    setState("sending");
    const row = {
      magnet: TOOLKIT_SLUG,
      name: name.trim(),
      email: email.trim().toLowerCase(),
      whatsapp: "",
      company: null,
      consent: true,
      source: "toolkit_jcci",
    };
    /* Both writes, in parallel. Neither failure keeps them out: someone who
       gave us their details and ticked the box gets the kit, every time. The
       `leads` row is the belt to magnet_signups' braces. */
    const [signup] = await Promise.all([
      captureMagnetSignup(row),
      captureLead({ email: row.email, source: "toolkit_jcci" }),
    ]);
    track("toolkit_unlock", { saved: signup.ok });
    if (!signup.ok) console.error("[toolkit] signup not saved:", signup.error);
    const access = { name: row.name, email: row.email, at: new Date().toISOString() };
    saveAccess(access);
    onUnlock(access);
  }

  const counts = useMemo(
    () => ({ total: RESOURCES.length, files: RESOURCES.reduce((n, r) => n + r.files.length, 0) }),
    [],
  );

  return (
    <div className="min-h-screen bg-paper text-midnight">
      <TopBar />
      <section className="relative isolate overflow-hidden">
        <HeroGraph />
        <div className="mx-auto flex w-[min(760px,calc(100%-2.5rem))] flex-col items-center pb-16 pt-12 text-center md:pb-24 md:pt-20">
          <span className="inline-flex items-center gap-3 font-mono text-[12px] uppercase tracking-[0.2em] text-muted">
            <span aria-hidden="true" className="h-px w-8 bg-gold" />
            For the people who were in the room
            <span aria-hidden="true" className="h-px w-8 bg-gold" />
          </span>
          <h1 className="mt-6 text-[length:clamp(2.3rem,5.4vw,4.4rem)] leading-[1.02] tracking-[-0.045em] text-midnight">
            {TOOLKIT.headlineLead} <span className="cc-marker">{TOOLKIT.headlineMark}</span>
          </h1>
          <p className="mt-7 max-w-[46ch] text-lg leading-relaxed text-ink md:text-xl">{TOOLKIT.sub}</p>

          <form
            onSubmit={submit}
            noValidate
            className="mt-10 w-full max-w-[520px] rounded-3xl border border-midnight/10 bg-white p-6 text-left shadow-[0_30px_80px_-40px_rgba(26,26,36,0.35)] md:p-8"
          >
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-gold">Two fields. Then it&rsquo;s yours.</p>
            <h2 className="mt-2 text-2xl md:text-3xl">Open the toolkit</h2>
            <p className="mt-2 text-muted">Everything opens on the next screen. No waiting for an email.</p>

            <label htmlFor={`${uid}-name`} className="mt-6 block text-sm font-semibold text-midnight">
              First name
            </label>
            <input
              id={`${uid}-name`}
              className={cn(field, "mt-2")}
              autoComplete="given-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your first name"
            />
            {touched && !name.trim() ? <p className="mt-1.5 text-sm text-red-700">Your first name, so we know who it&rsquo;s for.</p> : null}

            <label htmlFor={`${uid}-email`} className="mt-5 block text-sm font-semibold text-midnight">
              Email
            </label>
            <input
              id={`${uid}-email`}
              className={cn(field, "mt-2")}
              type="email"
              inputMode="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@yourbusiness.co.za"
            />
            {touched && !emailOk(email) ? <p className="mt-1.5 text-sm text-red-700">That email doesn&rsquo;t look right yet.</p> : null}

            <label className="mt-6 flex cursor-pointer items-start gap-3 rounded-xl border border-midnight/10 bg-paper p-4 text-[15px] leading-snug text-ink">
              <input
                type="checkbox"
                checked={consent}
                onChange={(e) => setConsent(e.target.checked)}
                className="mt-0.5 h-5 w-5 shrink-0 accent-[#c8a04a]"
              />
              <span>
                Yes, send me <strong className="text-midnight">one short email a day</strong> from Phila at GrowthCred: one
                AI idea I can use in my business that day. I can unsubscribe with one click, any time.
              </span>
            </label>
            {touched && !consent ? (
              <p className="mt-1.5 text-sm text-red-700">Tick the box to open the kit. That daily email is the deal.</p>
            ) : null}

            <button
              type="submit"
              disabled={state === "sending"}
              className="cc-shine group mt-6 inline-flex min-h-14 w-full items-center justify-center gap-3 rounded-full bg-gold px-8 font-body text-base font-semibold text-midnight shadow-[0_10px_40px_-10px_rgba(200,160,74,0.7)] transition hover:bg-gold-soft disabled:opacity-60"
            >
              {state === "sending" ? "Opening…" : "Open my toolkit"}
              <span aria-hidden="true" className="grid h-7 w-7 place-items-center rounded-full bg-midnight text-sm text-gold transition-transform group-hover:translate-x-0.5">
                &#8599;
              </span>
            </button>
            <p className="mt-4 text-center text-[13px] text-muted">
              We keep your details private. See our <Link to="/privacy" className="text-midnight underline">privacy policy</Link>.
            </p>
          </form>

          <dl className="mt-10 grid w-full max-w-[520px] grid-cols-3 divide-x divide-midnight/10 rounded-2xl border border-midnight/10 bg-white/70">
            {[
              [String(counts.total), "playbooks & tools"],
              [String(counts.files), "PDF, Word & Excel"],
              ["R0", "for you tonight"],
            ].map(([n, l]) => (
              <div key={l} className="px-3 py-4">
                <dt className="sr-only">{l}</dt>
                <dd className="font-display text-3xl font-extrabold tracking-[-0.04em] text-midnight">{n}</dd>
                <dd className="mt-1 font-mono text-[10px] uppercase tracking-[0.14em] text-muted md:text-[11px]">{l}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="border-t border-midnight/10 py-14 md:py-20">
        <div className="mx-auto w-[min(1000px,calc(100%-2.5rem))]">
          <p className="text-center font-mono text-[12px] uppercase tracking-[0.18em] text-muted">What&rsquo;s behind the door</p>
          <ul className="mt-8 grid gap-4 sm:grid-cols-2">
            {GROUPS.map((g) => (
              <li key={g.key} className="rounded-2xl border border-midnight/10 bg-white p-6">
                <p className="flex items-center gap-2 font-display text-xl font-extrabold tracking-[-0.03em] text-midnight">
                  <span aria-hidden="true" className="text-gold">&#9670;</span>
                  {g.title}
                </p>
                <p className="mt-2 text-ink">{g.line}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Unlocked                                                            */
/* ------------------------------------------------------------------ */

function Chip({ active, onClick, children }: { active: boolean; onClick: () => void; children: ReactNode }) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      className={cn(
        "min-h-11 rounded-full border px-4 text-left text-[15px] font-semibold transition",
        active
          ? "border-gold bg-gold text-midnight"
          : "border-midnight/15 bg-white text-midnight hover:border-midnight/40",
      )}
    >
      {children}
    </button>
  );
}

function SectionHead({ eyebrow, title, sub }: { eyebrow: string; title: ReactNode; sub?: ReactNode }) {
  return (
    <div className="max-w-2xl">
      <span className="inline-flex items-center gap-3 font-mono text-[12px] uppercase tracking-[0.2em] text-muted">
        <span aria-hidden="true" className="h-px w-8 bg-gold" />
        {eyebrow}
      </span>
      <h2 className="mt-4 text-3xl md:text-[2.75rem]">{title}</h2>
      {sub ? <p className="mt-4 text-lg leading-relaxed text-ink">{sub}</p> : null}
    </div>
  );
}

const TABS = [
  ["where", "Where it fits"],
  ["how", "How to use it"],
  ["win", "What you get"],
  ["ideas", "Ideas to try"],
  ["industry", "In your business"],
] as const;
type TabKey = (typeof TABS)[number][0];

function ResourceCard({ r, industry, open, onToggle }: { r: Resource; industry: IndustryKey | null; open: boolean; onToggle: () => void }) {
  const [tab, setTab] = useState<TabKey>("how");
  const ind = industry ? INDUSTRIES.find((i) => i.key === industry) : null;
  return (
    <article
      id={`r-${r.id}`}
      className={cn(
        "min-w-0 scroll-mt-24 rounded-2xl border bg-white transition",
        open ? "border-gold shadow-[0_24px_60px_-28px_rgba(26,26,36,0.45)]" : "border-midnight/10 hover:border-midnight/25",
      )}
    >
      <div className="p-5 md:p-7">
        <div className="flex items-start gap-4">
          <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-midnight font-mono text-sm text-gold">
            {r.num}
          </span>
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[11px] uppercase tracking-[0.14em] text-muted">
              <span>{r.type}</span>
              <span aria-hidden="true">&middot;</span>
              <span>{r.time}</span>
            </div>
            <h3 className="mt-1.5 text-xl leading-tight md:text-2xl">{r.title}</h3>
            <p className="mt-2 text-ink">{r.promise}</p>
            {ind ? (
              <p className="mt-3 rounded-xl border-l-2 border-gold bg-gold/[0.07] px-3 py-2 text-[15px] text-midnight">
                <span className="font-semibold">For {ind.label.toLowerCase()}: </span>
                {r.byIndustry[ind.key]}
              </p>
            ) : null}
          </div>
        </div>

        <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
          <FileButtons files={r.files} compact label={r.title} />
          <button
            type="button"
            onClick={onToggle}
            aria-expanded={open}
            aria-controls={`r-${r.id}-guide`}
            className={cn(
              "inline-flex min-h-10 items-center gap-2 rounded-full border px-4 font-body text-sm font-semibold transition",
              open ? "border-midnight/15 text-midnight hover:border-midnight" : "border-gold bg-gold/10 text-midnight hover:bg-gold/20",
            )}
          >
            {open ? "Hide the guide" : "Show me how to use it"}
            <span aria-hidden="true" className={cn("transition-transform", open && "rotate-180")}>&#8964;</span>
          </button>
        </div>
      </div>

      {open ? (
        <div id={`r-${r.id}-guide`} className="border-t border-midnight/10 bg-paper/70 px-5 pb-6 pt-4 md:px-7">
          <div role="tablist" aria-label={`${r.title} guide`} className="-mx-1 flex gap-1 overflow-x-auto pb-1">
            {TABS.map(([k, label]) => (
              <button
                key={k}
                role="tab"
                type="button"
                aria-selected={tab === k}
                onClick={() => setTab(k)}
                className={cn(
                  "shrink-0 rounded-full px-3.5 py-2 text-[13px] font-semibold transition",
                  tab === k ? "bg-midnight text-cream" : "text-ink hover:bg-midnight/5",
                )}
              >
                {label}
              </button>
            ))}
          </div>

          <div role="tabpanel" className="mt-4 text-[16px] leading-relaxed text-ink">
            {tab === "where" ? (
              <>
                <p>{r.where}</p>
                <p className="mt-3 rounded-xl border-l-2 border-gold bg-white px-4 py-3 text-midnight">
                  <span className="font-semibold">Reach for it when: </span>
                  {r.trigger}
                </p>
              </>
            ) : null}
            {tab === "how" ? (
              <ol className="grid gap-3">
                {r.how.map((step, i) => (
                  <li key={i} className="flex gap-3">
                    <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-gold/15 font-mono text-[12px] text-midnight">
                      {i + 1}
                    </span>
                    <span>{step}</span>
                  </li>
                ))}
              </ol>
            ) : null}
            {tab === "win" ? (
              <>
                <p>{r.win}</p>
                {r.inside.length ? (
                  <>
                    <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.16em] text-muted">Inside the file</p>
                    <ul className="mt-2 grid gap-1.5">
                      {r.inside.map((x) => (
                        <li key={x} className="flex gap-2">
                          <span aria-hidden="true" className="text-gold">&#8599;</span>
                          {x}
                        </li>
                      ))}
                    </ul>
                  </>
                ) : null}
              </>
            ) : null}
            {tab === "ideas" ? (
              <ul className="grid gap-3">
                {r.ideas.map((x) => (
                  <li key={x} className="rounded-xl bg-white px-4 py-3">
                    <span aria-hidden="true" className="mr-2 text-gold">&#9670;</span>
                    {x}
                  </li>
                ))}
              </ul>
            ) : null}
            {tab === "industry" ? (
              ind ? (
                <div className="rounded-xl bg-white px-4 py-4">
                  <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-gold">{ind.label}</p>
                  <p className="mt-2 text-midnight">{r.byIndustry[ind.key]}</p>
                </div>
              ) : (
                <div className="grid gap-2">
                  <p className="text-muted">Pick your industry at the top and this tab speaks to your business. Here&rsquo;s all of them:</p>
                  {INDUSTRIES.map((i) => (
                    <p key={i.key} className="rounded-xl bg-white px-4 py-3">
                      <span className="font-semibold text-midnight">{i.label}: </span>
                      {r.byIndustry[i.key]}
                    </p>
                  ))}
                </div>
              )
            ) : null}
          </div>
        </div>
      ) : null}
    </article>
  );
}

function Vault({ access, onLeave }: { access: ToolkitAccess; onLeave: () => void }) {
  const first = access.name.split(" ")[0] || "friend";
  const [industry, setIndustry] = useState<IndustryKey | null>(null);
  const [pain, setPain] = useState<string | null>(null);
  const [openId, setOpenId] = useState<string | null>(null);

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(INDUSTRY_KEY) as IndustryKey | null;
      if (saved && INDUSTRIES.some((i) => i.key === saved)) setIndustry(saved);
    } catch {
      /* fine */
    }
    track("toolkit_view", {});
  }, []);

  function pickIndustry(k: IndustryKey) {
    const next = industry === k ? null : k;
    setIndustry(next);
    try {
      if (next) window.localStorage.setItem(INDUSTRY_KEY, next);
      else window.localStorage.removeItem(INDUSTRY_KEY);
    } catch {
      /* fine */
    }
  }

  function jumpTo(id: string) {
    setOpenId(id);
    requestAnimationFrame(() => document.getElementById(`r-${id}`)?.scrollIntoView({ behavior: "smooth", block: "start" }));
  }

  const chosenPain = PAINS.find((p) => p.key === pain) ?? null;
  const pick = chosenPain ? resourceById(chosenPain.start) : null;
  const ind = industry ? INDUSTRIES.find((i) => i.key === industry) : null;

  return (
    <>
      {/* Welcome */}
      <div className="bg-paper text-midnight">
        <TopBar onLeave={onLeave} />
        <section className="relative isolate overflow-hidden">
          <HeroGraph />
          <div className="mx-auto w-[min(1180px,calc(100%-2.5rem))] pb-16 pt-12 md:pb-20 md:pt-20">
            <span className="inline-flex items-center gap-3 font-mono text-[12px] uppercase tracking-[0.2em] text-muted">
              <span aria-hidden="true" className="h-px w-8 bg-gold" />
              You&rsquo;re in
            </span>
            <h1 className="mt-5 max-w-[20ch] text-[length:clamp(2.3rem,5vw,4.35rem)] leading-[1.02] tracking-[-0.045em] text-midnight">
              Welcome, {first}. <span className="cc-marker">{TOOLKIT.welcomeTail}</span>
            </h1>
            <p className="mt-7 max-w-[52ch] text-lg leading-relaxed text-ink md:text-xl">{TOOLKIT.welcomeSub}</p>
            <div className="mt-9 flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6">
              <a
                href="#start"
                className="cc-shine group inline-flex min-h-14 items-center justify-center gap-3 rounded-full bg-gold px-8 font-body text-base font-semibold text-midnight no-underline shadow-[0_10px_40px_-10px_rgba(200,160,74,0.7)] hover:bg-gold-soft"
              >
                Tell me where to start
                <span aria-hidden="true" className="grid h-7 w-7 place-items-center rounded-full bg-midnight text-sm text-gold">&darr;</span>
              </a>
              {ZIP_FILE ? (
                <a
                  href={ZIP_FILE.href}
                  download
                  onClick={() => track("toolkit_download", { file: ZIP_FILE!.href, kind: "zip" })}
                  className="inline-flex min-h-11 items-center gap-2 self-start border-b-2 border-midnight font-semibold text-midnight no-underline hover:border-gold hover:text-gold sm:self-auto"
                >
                  Download everything <span className="font-mono text-[11px] text-muted">.zip &middot; {ZIP_FILE.size}</span>
                </a>
              ) : null}
            </div>
            <p className="mt-6 font-mono text-[12px] uppercase tracking-[0.16em] text-muted">
              Bookmark this page. It remembers you on this device.
            </p>
          </div>
        </section>
      </div>

      {/* Start here */}
      <section id="start" className="scroll-mt-4 border-t border-midnight/10 bg-paper py-16 md:py-24">
        <div className="mx-auto w-[min(1180px,calc(100%-2.5rem))]">
          <SectionHead
            eyebrow="Start here · 60 seconds"
            title={<>Two taps. I&rsquo;ll tell you which file to open first.</>}
            sub="You don't need all of it today. You need the one that pays you back this week. Answer two questions and the page does the thinking."
          />

          <div className="mt-10 grid gap-10 lg:grid-cols-2">
            <div>
              <p className="font-display text-lg font-extrabold tracking-[-0.02em] text-midnight">
                <span className="mr-2 font-mono text-sm text-gold">1</span>What&rsquo;s eating your week most?
              </p>
              <div className="mt-4 flex flex-col gap-2">
                {PAINS.map((p) => (
                  <Chip key={p.key} active={pain === p.key} onClick={() => setPain(pain === p.key ? null : p.key)}>
                    {p.label}
                  </Chip>
                ))}
              </div>
            </div>
            <div>
              <p className="font-display text-lg font-extrabold tracking-[-0.02em] text-midnight">
                <span className="mr-2 font-mono text-sm text-gold">2</span>What kind of business is it?
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {INDUSTRIES.map((i) => (
                  <Chip key={i.key} active={industry === i.key} onClick={() => pickIndustry(i.key)}>
                    {i.label}
                  </Chip>
                ))}
              </div>
              <p className="mt-4 text-sm text-muted">
                Every guide below switches to examples from your world once you pick.
              </p>
            </div>
          </div>

          <div aria-live="polite" className="mt-10">
            {pick && chosenPain ? (
              <div className="grid gap-6 rounded-3xl bg-midnight p-6 text-cream md:grid-cols-[minmax(0,1fr)_auto] md:items-center md:p-9">
                <div>
                  <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-gold">Your starting file</p>
                  <h3 className="mt-2 text-2xl text-cream md:text-3xl">
                    {pick.num} &middot; {pick.title}
                  </h3>
                  <p className="mt-3 max-w-2xl text-cream/75">{chosenPain.why}</p>
                  {ind ? (
                    <p className="mt-3 max-w-2xl border-l-2 border-gold pl-3 text-cream/90">{pick.byIndustry[ind.key]}</p>
                  ) : null}
                </div>
                <div className="flex flex-col gap-3">
                  <button
                    type="button"
                    onClick={() => jumpTo(pick.id)}
                    className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-gold px-6 font-body text-sm font-semibold text-midnight hover:bg-gold-soft"
                  >
                    Open its guide <span aria-hidden="true">&darr;</span>
                  </button>
                  <FileButtons files={pick.files.filter((f) => f.kind === "pdf").slice(0, 1)} label={pick.title} />
                </div>
              </div>
            ) : (
              <div className="rounded-3xl border border-dashed border-midnight/20 px-6 py-8 text-center text-muted">
                Pick what&rsquo;s eating your week and your starting file appears here.
              </div>
            )}
          </div>
        </div>
      </section>

      {/* The first week */}
      <section className="bg-white py-16 md:py-24">
        <div className="mx-auto w-[min(1180px,calc(100%-2.5rem))]">
          <SectionHead
            eyebrow="The route · from the Quick Start"
            title="Ten days. Thirty minutes a day."
            sub="One small job a day, in the order that pays back fastest. Do Day 0 tonight while the talk is fresh. Tap any day to open the file it uses."
          />
          <ol className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {FIRST_WEEK.map((d) => {
              const r = resourceById(d.resource);
              return (
                <li key={d.day} className="flex flex-col rounded-2xl border border-midnight/10 bg-paper p-5">
                  <span className="font-mono text-[12px] uppercase tracking-[0.16em] text-gold">{d.day}</span>
                  <p className="mt-2 font-display text-lg font-extrabold leading-snug tracking-[-0.02em] text-midnight">{d.task}</p>
                  <p className="mt-2 flex-1 text-[15px] text-ink">{d.detail}</p>
                  {r ? (
                    <button
                      type="button"
                      onClick={() => jumpTo(r.id)}
                      className="mt-4 self-start font-mono text-[11px] uppercase tracking-[0.14em] text-midnight underline decoration-gold decoration-2 underline-offset-4 hover:text-gold"
                    >
                      Uses {r.num} &middot; {r.short} &rarr;
                    </button>
                  ) : null}
                </li>
              );
            })}
          </ol>
        </div>
      </section>

      {/* The vault */}
      <section className="bg-paper py-16 md:py-24">
        <div className="mx-auto w-[min(1180px,calc(100%-2.5rem))]">
          <SectionHead
            eyebrow="The whole kit"
            title="Every file, and exactly how to use it."
            sub={
              <>
                Each one has a guide under it: where it fits, the steps, what you get, ideas to try
                {ind ? <>, and how a <strong>{ind.label.toLowerCase()}</strong> business uses it</> : <>, and how it plays out in your industry</>}.
                PDFs to read. Word and Excel files to make your own.
              </>
            }
          />

          {GROUPS.map((g) => {
            const items = RESOURCES.filter((r) => r.group === g.key);
            if (!items.length) return null;
            return (
              <div key={g.key} className="mt-14">
                <div className="flex flex-wrap items-end justify-between gap-3 border-b border-midnight/10 pb-4">
                  <div>
                    <h3 className="text-2xl md:text-3xl">{g.title}</h3>
                    <p className="mt-1.5 max-w-2xl text-ink">{g.line}</p>
                  </div>
                  <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted">
                    {items.length} {items.length === 1 ? "file" : "files"}
                  </span>
                </div>
                <div className="mt-6 grid grid-cols-1 gap-4">
                  {items.map((r) => (
                    <ResourceCard
                      key={r.id}
                      r={r}
                      industry={industry}
                      open={openId === r.id}
                      onToggle={() => setOpenId(openId === r.id ? null : r.id)}
                    />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Help + next step */}
      <section className="relative isolate overflow-hidden bg-midnight py-16 text-cream md:py-24">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
          <div className="cc-grid absolute inset-0 opacity-50" />
          <div className="cc-glow absolute -bottom-[30rem] left-1/2 h-[52rem] w-[52rem] max-w-none -translate-x-1/2" />
        </div>
        <div className="mx-auto grid w-[min(1180px,calc(100%-2.5rem))] gap-6 lg:grid-cols-2">
          <div className="rounded-3xl border border-cream/15 bg-white/[0.04] p-7 md:p-9">
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-gold">Stuck on a file?</p>
            <h2 className="mt-3 text-3xl text-cream">Ask me. On WhatsApp.</h2>
            <p className="mt-4 text-cream/75">
              Tell me which file and where you got stuck. You were in the room, so you&rsquo;re not a stranger. The
              message opens with that already typed.
            </p>
            <a
              href={whatsappUrl(`Hi Phila, I'm ${first} from the ${TOOLKIT.partner} webinar. I'm stuck on the toolkit: `)}
              target="_blank"
              rel="noreferrer"
              onClick={() => track("toolkit_whatsapp", {})}
              className="mt-7 inline-flex min-h-12 items-center gap-3 rounded-full border border-cream/30 px-6 font-body text-sm font-semibold text-cream no-underline hover:border-gold hover:text-gold"
            >
              <BrandIcon name="whatsapp" className="h-5 w-5" /> Message Phila
            </a>
          </div>
          <div className="rounded-3xl bg-gold p-7 text-midnight md:p-9">
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-midnight/60">Rather not do it yourself?</p>
            <h2 className="mt-3 text-3xl">{TOOLKIT.closeTitle}</h2>
            <p className="mt-4 text-midnight/80">{TOOLKIT.closeBody}</p>
            <Link
              to="/call"
              onClick={() => track("toolkit_apply", {})}
              className="mt-7 inline-flex min-h-12 items-center gap-3 rounded-full bg-midnight px-6 font-body text-sm font-semibold text-cream no-underline hover:bg-midnight-soft"
            >
              Apply to work with us <span aria-hidden="true">&#8599;</span>
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-paper py-16 md:py-20">
        <div className="mx-auto w-[min(820px,calc(100%-2.5rem))]">
          <h2 className="text-3xl md:text-4xl">Quick answers</h2>
          <div className="mt-8 divide-y divide-midnight/10 border-y border-midnight/10">
            {TOOLKIT_FAQ.map((f) => (
              <details key={f.q} className="group py-2">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-3 font-display text-lg font-bold tracking-[-0.02em] text-midnight">
                  {f.q}
                  <span aria-hidden="true" className="text-gold transition-transform group-open:rotate-45">+</span>
                </summary>
                <p className="pb-4 text-ink">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <footer className="bg-midnight py-10 text-cream/55">
        <div className="mx-auto flex w-[min(1180px,calc(100%-2.5rem))] flex-wrap items-center justify-between gap-4 text-sm">
          <span className="w-full text-cream/40">{TOOLKIT.promiseLine}</span>
          <span>
            GrowthCred (Pty) Ltd &middot; Rosebank, Johannesburg &middot; Made for the {TOOLKIT.partner} webinar, {TOOLKIT.when}
          </span>
          <span className="flex gap-5">
            <Link to="/privacy" className="text-cream/55 hover:text-gold">Privacy</Link>
            <Link to="/terms" className="text-cream/55 hover:text-gold">Terms</Link>
            <Link to="/" className="text-cream/55 hover:text-gold">growthcred.co.za</Link>
          </span>
        </div>
      </footer>
    </>
  );
}

export default function Toolkit() {
  /* null on the server and on first paint, so the prerendered HTML (locked)
     and the first client render match. The effect then lets a returning
     visitor straight in. */
  const [access, setAccess] = useState<ToolkitAccess | null>(null);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    setAccess(loadAccess());
    setChecked(true);
  }, []);

  useEffect(() => {
    if (checked && !access) track("toolkit_gate_view", {});
  }, [checked, access]);

  if (access) {
    return (
      <Vault
        access={access}
        onLeave={() => {
          clearAccess();
          setAccess(null);
          window.scrollTo(0, 0);
        }}
      />
    );
  }
  return (
    <Gate
      onUnlock={(a) => {
        setAccess(a);
        window.scrollTo(0, 0);
      }}
    />
  );
}
