import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Section, Eyebrow, Faq, VideoSlot } from "../components/ui";
import { ResponsiveImage } from "../components/ResponsiveImage";
import { Footer } from "../components/Layout";
import { ClientLogos } from "../components/ClientLogos";
import { WebinarTopBar } from "../components/webinar/Countdown";
import { SeatForm } from "../components/webinar/SeatForm";
import { ChatTrapMath } from "../components/webinar/ChatTrapMath";
import { WEBINAR, sessionHasPassed } from "../lib/webinar";
import { ENGINES, JCCI, JCCI_FAQ, OWNERS, PROOF, proofOrder, TAKEAWAYS, VIP_SEATS, WHY_FREE } from "../lib/jcciWebinar";
import { VIDEOS } from "../lib/videos";
import { activeSegment } from "../lib/segments";
import { activeAttribution } from "../lib/utm";
import { track } from "../lib/analytics";

/**
 * The JCCI × GrowthCred registration page.
 *
 * Phila's copy, 11 November 2026, built section by section. Two things in that
 * brief are deliberately NOT on the page as written, because the project rule is
 * that proof is published only when a real person has given it, with permission:
 *
 *  - The testimonial from MNE Waste. The brief names "Jeff"; the client record
 *    and every published page name Sandile, and no quote has been approved. So
 *    the quote is a visible placeholder, not a plausible invention.
 *  - "His WhatsApp assistant answers his customers for him." That is a specific
 *    result nobody has signed off. What IS published, with permission, is that
 *    Sandile built his Operator's Brain in one day and is now fully operational.
 *    That is what the page says.
 *
 * The 10-hour figure is the one the rest of the site already uses. The brief
 * said "10 to 15"; 15 is nowhere else on the site and nobody has reported it, so
 * the page promises what the site already stands behind.
 */

/**
 * The micro-audience this visitor was advertised to, or null.
 *
 * Deliberately AFTER mount, not during render. This page is prerendered to a
 * static file that both hosts serve to everyone, so a segment resolved during
 * SSR would bake one audience's greeting into the HTML and show it to the rest.
 * Reading it in an effect also means the server HTML and the first client
 * render agree, so there is no hydration mismatch.
 *
 * The cost is one frame of the default eyebrow before a matched visitor sees
 * theirs. That is why the H1, the part a person reads first and longest, never
 * moves: only the line above it and an added line below it do.
 */
function useSegment() {
  const [segment, setSegment] = useState<ReturnType<typeof activeSegment>>(null);
  useEffect(() => setSegment(activeSegment()), []);
  return segment;
}

/** A section heading in the voice: something a person would actually say. */
function Lead({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="max-w-[22ch] text-3xl leading-[1.08] md:text-5xl">{children}</h2>
  );
}

function CtaButton({ className = "" }: { className?: string }) {
  if (sessionHasPassed()) {
    return (
      <Link
        to="/contact"
        className={`inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-gold px-7 font-body text-sm font-semibold text-midnight no-underline transition hover:bg-gold-soft ${className}`}
      >
        Tell me about the next one <span aria-hidden="true">&#8599;</span>
      </Link>
    );
  }
  return (
    <a
      href="#register"
      className={`inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-gold px-7 font-body text-sm font-semibold text-midnight no-underline transition hover:bg-gold-soft ${className}`}
    >
      Save my free seat <span aria-hidden="true">&rarr;</span>
    </a>
  );
}

export default function JcciWebinar() {
  const segment = useSegment();

  useEffect(() => {
    track("webinar_view", { webinar: WEBINAR.slug });
    /*
     * Capture which ad brought them NOW, on arrival, not at submit.
     * activeAttribution() writes what it reads to sessionStorage, and the
     * query string is gone the moment this visitor clicks anything — the
     * privacy policy, a guide, the stories page — because React Router drops
     * it on the first client navigation. Read it only at submit and a person
     * who wanders before registering arrives on the row with no ad set against
     * their name, which is exactly the row the weekly throttle needs most.
     */
    activeAttribution();
  }, []);

  return (
    <>
      <WebinarTopBar />

      {/* ---------------- HERO + the form ---------------- */}
      <Section dark className="pt-10 md:pt-16">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:gap-16">
          <div>
            <Eyebrow dark>
              {segment?.eyebrow ?? "For South African owners tired of doing everything themselves"}
            </Eyebrow>
            <h1 className="mt-6 max-w-[24ch] text-4xl leading-[1.04] text-cream md:text-6xl">
              The day I stopped typing prompts is the day I got my week back.
            </h1>

            <div className="mt-7 max-w-[56ch] space-y-4 text-lg text-cream/85">
              {segment ? (
                <p className="border-l-2 border-gold pl-4 text-cream">{segment.opener}</p>
              ) : null}
              <p>
                Most people use AI like a fancy Google. You open it. You explain your business.
                You start from zero. Every single time.
              </p>
              <p>
                I have given 7 AI talks with WeWork. I have sat with owners while they built AI
                that does their repeat work for them. On {WEBINAR.shortWhen}, live with{" "}
                {JCCI.partner}, I will show you how to set up AI that already knows your business.
                That is where the 10 hours a week come from.
              </p>
            </div>

            {VIDEOS.jcciChatTrap ? (
              <div className="mt-8 max-w-[560px]">
                <p className="mb-3 font-mono text-[12px] uppercase tracking-[0.16em] text-gold">
                  <span aria-hidden="true">&#9660;</span> Watch this first{" "}
                  <span aria-hidden="true">&#9660;</span>
                </p>
                <VideoSlot slot="jcciChatTrap" label="the Chat Trap in 60 seconds" />
              </div>
            ) : null}

            <div className="mt-8">
              <CtaButton />
              <p className="mt-4 max-w-[46ch] font-mono text-[12px] leading-relaxed text-cream/60">
                Free for the {JCCI.partner} community &middot; {WEBINAR.where} &middot; Free gifts
                for everyone who attends live
              </p>
            </div>
          </div>

          <div className="lg:pt-8">
            <SeatForm id="register" />
          </div>
        </div>

        {/* Proof row: the room, and the organisations we have worked with. */}
        <div className="mt-16 grid gap-4 sm:grid-cols-2">
          <figure className="overflow-hidden rounded-2xl bg-midnight-soft">
            <ResponsiveImage
              src="/images/phila-event.jpg"
              alt="Phila Ngwenya speaking at an AI session in Johannesburg"
              sizes="(max-width: 639px) 100vw, 550px"
              loading="lazy"
              className="h-56 w-full object-cover md:h-72"
            />
          </figure>
          <figure className="overflow-hidden rounded-2xl bg-midnight-soft">
            <ResponsiveImage
              src="/images/phila-team.jpg"
              alt="Owners building their systems in the room at an Operator Intensive"
              sizes="(max-width: 639px) 100vw, 550px"
              loading="lazy"
              className="h-56 w-full object-cover md:h-72"
            />
          </figure>
        </div>
      </Section>

      <Section className="py-10 md:py-14">
        <p className="mb-6 text-center font-mono text-[11px] uppercase tracking-[0.18em] text-muted">
          Organisations I have worked with
        </p>
        <ClientLogos />
      </Section>

      {/* ---------------- THE PROBLEM ---------------- */}
      <Section>
        <Eyebrow>The problem</Eyebrow>
        <Lead>You are using AI like a search bar.</Lead>
        <div className="mt-8 grid gap-10 md:grid-cols-2">
          <div className="space-y-5 text-lg leading-relaxed">
            <p>Here is the problem with how most owners use AI.</p>
            <p>
              You open ChatGPT. You explain your business. Again. You paste the same
              instructions. Again. You fix the answer. Again.
            </p>
            <p className="font-semibold text-midnight">Every single day.</p>
            <p>
              You save ten minutes here and there. But at the end of the week you are still
              answering the same WhatsApps. Still writing quotes at 10pm. Still the one person the
              whole business depends on.
            </p>
            <p>So you think: maybe AI just isn’t for my business.</p>
            <p className="font-semibold text-midnight">
              It is. You are stuck in what I call the Chat Trap.
            </p>
          </div>
          <div className="space-y-5 text-lg leading-relaxed">
            <p>It is the difference between a prompt and a system.</p>
            <p>
              A prompt is a question you ask AI. You have to ask it every time. A system is a job
              AI does for you. The same way. Every week. Without you starting from zero.
            </p>
            <p>
              Think about any franchise you know. Every store runs the same way, whether the
              founder is there or not. That is not because the staff are geniuses. It is because
              the system does the thinking.
            </p>
            <p>AI works the same way.</p>
            <p className="border-l-2 border-gold pl-4 text-xl font-semibold text-midnight">
              Prompts don’t save time. Systems do.
            </p>
            <p>
              When AI already knows your business — your prices, your customers, how you talk,
              your rules — it stops being a toy and starts being a team member. That is what I
              call an Operator’s Brain.
            </p>
          </div>
        </div>
      </Section>

      {/* ---------------- WHAT IT TAKES: the four engines ---------------- */}
      <Section dark>
        <Eyebrow dark>What it takes</Eyebrow>
        <Lead>To get 10 hours back, you need four engines.</Lead>
        <p className="mt-6 max-w-[54ch] text-lg text-cream/85">
          Every hour of your week is one of four jobs. Writing. Finding. Replying. Admin. An
          Operator’s Brain has one engine for each.
        </p>
        <ol className="mt-10 grid gap-4 sm:grid-cols-2">
          {ENGINES.map((engine, i) => (
            <li
              key={engine.name}
              className="rounded-2xl border border-cream/15 bg-cream/[0.04] p-6"
            >
              <span className="font-mono text-[12px] text-gold">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-2 font-display text-xl font-extrabold tracking-[-0.03em] text-cream">
                {engine.name}
              </h3>
              <p className="mt-2 text-cream/80">{engine.line}</p>
            </li>
          ))}
        </ol>
        <p className="mt-10 text-lg text-cream/85">
          All four are what we cover on {WEBINAR.shortWhen}.
        </p>
        <CtaButton className="mt-6" />
      </Section>

      {/* ---------------- THE AUTOPILOT ---------------- */}
      <Section>
        <Eyebrow>The autopilot</Eyebrow>
        <Lead>Build it once. It works every week.</Lead>
        <div className="mt-8 grid gap-10 md:grid-cols-2">
          <div className="space-y-5 text-lg leading-relaxed">
            <p>Here is the part most people miss.</p>
            <p>
              You don’t build an Operator’s Brain every day. You build it once. Then it keeps
              working.
            </p>
            <p>
              A WhatsApp comes in. It gets answered. A quote needs writing. It is drafted from a
              voice note. A client meeting is tomorrow. The research is already on one page.
            </p>
            <p>
              Sandile runs MNE Waste. Trucks, drivers, compliance, municipal contracts. He built
              his Operator’s Brain with me in one day, and he is now fully operational. If AI can
              handle that, it can handle what you do.
            </p>
            <p>
              On {WEBINAR.shortWhen} I will show you what that looks like for a normal, everyday
              business.
            </p>
          </div>
          {/* Phila's brief had a testimonial here, from "Jeff", about a WhatsApp
              assistant answering his customers. The MNE Waste contact on record
              is Sandile, no quote has been approved, and that result is not one
              anybody has signed off. So this column carries the proof that IS
              published, with permission, and the quote drops in when it exists.
              No placeholder: this page is indexed, and scaffolding in front of a
              registrant is worse than a column that is simply true. What is
              still owed is tracked in docs/operations/jcci-webinar-reminders.md. */}
          <div className="rounded-2xl border border-midnight/10 bg-paper p-6 md:p-8">
            <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted">
              What other owners built
            </p>
            {/* Every result here is already published on this site, named, with
                that client's permission. A matched visitor sees the one closest
                to their own work FIRST -- the same three results, reordered,
                never a new claim and never the same claim twice. */}
            {proofOrder(segment?.proof).map((key) => {
              const item = PROOF[key];
              return item.quote ? (
                <blockquote key={key} className="mt-5 border-l-2 border-gold pl-4">
                  <p className="text-lg leading-relaxed text-midnight">
                    &ldquo;{item.quote}&rdquo;
                  </p>
                  <footer className="mt-2 font-mono text-[12px] uppercase tracking-[0.14em] text-muted">
                    {item.who}
                  </footer>
                </blockquote>
              ) : (
                <p key={key} className="mt-4 text-lg leading-relaxed">
                  {item.line}
                </p>
              );
            })}
            <p className="mt-5 leading-relaxed text-muted">
              I only publish a client result when they have agreed to be named. MNE Waste, Demure
              International and TaiAscend agreed. You can read what each of them built on the{" "}
              <Link to="/stories">client stories page</Link>.
            </p>
          </div>
        </div>
      </Section>

      {/* ---------------- THE MISTAKE ---------------- */}
      <Section dark>
        <Eyebrow dark>The mistake most owners make</Eyebrow>
        <Lead>You think AI is about better prompts.</Lead>
        <div className="mt-8 max-w-[58ch] space-y-5 text-lg text-cream/85">
          <p>
            There are thousands of &ldquo;best ChatGPT prompts&rdquo; lists online. Most owners
            have tried a few.
          </p>
          <p>They work once. Then you are back to starting from zero.</p>
          <p>That is not your fault. Nobody told you the prompt was never the point.</p>
          <p className="border-l-2 border-gold pl-4 text-xl font-semibold text-cream">
            If AI can do the same job for you every week, why are you still doing it yourself?
          </p>
          <p>That is the question this webinar answers.</p>
        </div>
      </Section>

      {/* ---------------- ABOUT PHILA ---------------- */}
      <Section>
        <div className="grid gap-12 md:grid-cols-[minmax(0,320px)_minmax(0,1fr)] md:gap-16">
          <div>
            <ResponsiveImage
              src="/images/phila-karen.jpg"
              alt="Phila Ngwenya, founder of GrowthCred"
              sizes="(max-width: 767px) 100vw, 320px"
              loading="lazy"
              className="w-full rounded-2xl object-cover"
            />
            <p className="mt-4 font-mono text-[11px] uppercase leading-relaxed tracking-[0.14em] text-muted">
              7 AI talks with WeWork &middot; 5 companies built with AI &middot; Speech AI
              presented at Parliament
            </p>
          </div>
          <div>
            <Eyebrow>Who is talking</Eyebrow>
            <Lead>I’m Phila Ngwenya.</Lead>
            <div className="mt-7 space-y-5 text-lg leading-relaxed">
              <p>
                I founded GrowthCred in Rosebank. I flunked out of university. I have spent the
                last few years building businesses with AI, and I went through the pain so you
                don’t have to.
              </p>
              <p>
                I co-developed an isiZulu and English speech AI that was presented at Parliament
                in Cape Town. I have given 7 AI talks with WeWork Rosebank and WeWork Sandton. I
                run my own business on an Operator’s Brain: my research, my lead checks, my calls
                and my reports.
              </p>
              <p>
                I have built Operator’s Brains with owners in waste management, consulting, beauty
                and more.
              </p>
              <p className="font-semibold text-midnight">
                You are not getting theory from someone who read about AI. You are getting the
                system I run every day, while I teach it.
              </p>
            </div>
          </div>
        </div>
      </Section>

      {/* ---------------- THE MATH ---------------- */}
      <Section className="pt-0">
        <div className="mb-8 max-w-[640px]">
          <Eyebrow>The maths</Eyebrow>
          <Lead>How much is the Chat Trap costing you?</Lead>
        </div>
        <ChatTrapMath />
        <CtaButton className="mt-8" />
      </Section>

      {/* ---------------- IS THIS FOR YOU ---------------- */}
      <Section dark>
        <Eyebrow dark>Is this for you?</Eyebrow>
        <Lead>Be honest. Is one of these you?</Lead>
        <ol className="mt-10 grid gap-4 md:grid-cols-3">
          {OWNERS.map((owner, i) => (
            <li
              key={owner.label}
              className="rounded-2xl border border-cream/15 bg-cream/[0.04] p-6"
            >
              <span className="font-mono text-[12px] text-gold">Owner {i + 1}</span>
              <h3 className="mt-2 font-display text-xl font-extrabold tracking-[-0.03em] text-cream">
                {owner.label}
              </h3>
              <p className="mt-3 text-cream/80">{owner.body}</p>
            </li>
          ))}
        </ol>
        <div className="mt-10 grid gap-8 md:grid-cols-2">
          <p className="text-lg text-cream/85">
            Students, job seekers and new founders are welcome too. You will leave with something
            free that helps you start right.
          </p>
          <div className="rounded-2xl border border-cream/15 p-6">
            <h3 className="font-display text-xl font-extrabold tracking-[-0.03em] text-cream">
              Who this is not for
            </h3>
            <p className="mt-3 text-cream/80">
              Skip it if you want AI to run your business while you sleep, with zero effort. It
              takes some setup. Once it is set up, it keeps working.
            </p>
          </div>
        </div>
      </Section>

      {/* ---------------- WHAT YOU WALK AWAY WITH ---------------- */}
      <Section>
        <Eyebrow>What you walk away with</Eyebrow>
        <Lead>Sixty minutes. Six things.</Lead>
        <p className="mt-6 font-mono text-[12px] uppercase tracking-[0.14em] text-muted">
          {WEBINAR.dayLabel} &middot; {WEBINAR.timeLabel} &middot; {JCCI.length}
        </p>
        <ul className="mt-10 grid gap-5 md:grid-cols-2">
          {TAKEAWAYS.map((item) => (
            <li key={item.title} className="flex gap-3 border-t border-midnight/10 pt-5">
              <span aria-hidden="true" className="mt-0.5 font-mono text-gold">
                &#10003;
              </span>
              <span>
                <span className="block font-semibold text-midnight">{item.title}</span>
                <span className="mt-1.5 block leading-relaxed text-muted">{item.note}</span>
              </span>
            </li>
          ))}
        </ul>
        <CtaButton className="mt-10" />
      </Section>

      {/* ---------------- EVERYTHING YOU GET ---------------- */}
      <Section dark>
        <Eyebrow dark>Everything you get</Eyebrow>
        <Lead>Here is what you get for R0.</Lead>
        <div className="mt-10 grid gap-5 lg:grid-cols-2">
          <div className="rounded-2xl border border-cream/15 bg-cream/[0.04] p-7">
            <ol className="space-y-6">
              {[
                {
                  n: "01",
                  t: `The live webinar: “${WEBINAR.title}”`,
                  d: `${WEBINAR.dayLabel}, ${WEBINAR.timeLabel}, live with ${JCCI.partner}.`,
                },
                {
                  n: "02",
                  t: "Free gifts for live attendees",
                  d: "Only for the people who are there live.",
                },
                {
                  n: "03",
                  t: "A free head start: the Brain Builder",
                  d: "Part 1 of my system, yours the moment you register. Teach AI your business once, so it never asks again.",
                },
              ].map((item) => (
                <li key={item.n}>
                  <span className="font-mono text-[12px] text-gold">{item.n}</span>
                  <h3 className="mt-1.5 font-display text-lg font-extrabold tracking-[-0.03em] text-cream">
                    {item.t}
                  </h3>
                  <p className="mt-1.5 text-cream/80">{item.d}</p>
                </li>
              ))}
            </ol>
            <p className="mt-7 border-t border-cream/15 pt-5 font-mono text-sm text-cream">
              Your investment: <span className="text-gold">R0</span>
            </p>
            <CtaButton className="mt-5 w-full" />
          </div>

          <div className="rounded-2xl border-2 border-gold/50 bg-gold/[0.07] p-7">
            <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-gold">
              Want more? {VIP_SEATS} seats only
            </p>
            <h3 className="mt-3 font-display text-2xl font-extrabold tracking-[-0.03em] text-cream">
              Take a VIP seat for {JCCI.vipPrice}.
            </h3>
            <ul className="mt-5 space-y-3 text-cream/85">
              {[
                `A private hour with me before the webinar (${JCCI.vipWindow}, ${WEBINAR.shortWhen}). Ask me anything about AI in your business.`,
                "I review your Brain Builder live, so you leave with it right.",
                "The full recording.",
              ].map((line) => (
                <li key={line} className="flex gap-3">
                  <span aria-hidden="true" className="mt-0.5 font-mono text-gold">
                    &#10003;
                  </span>
                  <span>{line}</span>
                </li>
              ))}
            </ul>
            <p className="mt-6 border-t border-cream/15 pt-5 text-sm leading-relaxed text-cream/75">
              If the VIP hour wasn’t worth it, email us within 7 days and we refund you in full.
            </p>
            <a
              href="#register"
              className="mt-6 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full border border-gold bg-transparent px-6 font-body text-sm font-semibold text-gold no-underline transition hover:bg-gold hover:text-midnight"
            >
              Get my VIP seat for {JCCI.vipPrice} <span aria-hidden="true">&rarr;</span>
            </a>
          </div>
        </div>
      </Section>

      {/* ---------------- REAL TALK ---------------- */}
      <Section>
        <Eyebrow>Real talk</Eyebrow>
        <Lead>{WHY_FREE.q}</Lead>
        <p className="mt-7 max-w-[58ch] text-lg leading-relaxed">{WHY_FREE.a}</p>
      </Section>

      {/* ---------------- QUICK ANSWERS ---------------- */}
      <Section className="pt-0">
        <h2 className="mb-8 text-3xl md:text-4xl">Quick answers.</h2>
        <Faq items={JCCI_FAQ} />
        {/* "Do I need to be a JCCI member?" is deliberately not answered here.
            JCCI has not confirmed it, and a guessed answer to that question
            turns people away at the door. It is the first blocking item in
            docs/operations/jcci-webinar-reminders.md. */}
      </Section>

      {/* ---------------- FINAL CLOSE ---------------- */}
      <Section dark>
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,420px)] lg:gap-16">
          <div>
            <Lead>Stop starting from zero.</Lead>
            <div className="mt-7 max-w-[54ch] space-y-5 text-lg text-cream/85">
              <p>Your next month goes one of two ways.</p>
              <p>
                Either you keep opening ChatGPT and explaining your business again, while the
                WhatsApps and the quotes pile up.
              </p>
              <p>Or you set AI up once, and it does that work for you every week.</p>
              <p>
                You already know what your week looks like right now. Every week you wait is
                another 10 hours you don’t get back.
              </p>
              <p>
                This is one live session. {WEBINAR.dayLabel}, {WEBINAR.timeLabel}. And the free
                gifts only go to the people who show up live.
              </p>
              <p>
                Worst case, you spend an hour with us and learn how AI really works for a
                business. Best case, you never explain your business to ChatGPT again.
              </p>
              <p className="font-semibold text-cream">See you on the 18th. Phila</p>
            </div>
          </div>
          <div className="lg:pt-4">
            <SeatForm />
          </div>
        </div>

        <p className="mt-16 max-w-[70ch] border-t border-cream/15 pt-8 text-xs leading-relaxed text-cream/50">
          Results vary. What you get depends on your business, your effort and how you use what
          you learn. GrowthCred does not guarantee any specific time saved or income earned.
        </p>
      </Section>

      {/* The site footer, rendered by the page rather than the layout: this page
          is `bare` so the registration form has no nav to leak clicks into, but
          the registration number, the legal links and the address still belong
          at the bottom of it. */}
      <Footer />
    </>
  );
}
