import { useEffect } from "react";
import { Section, Eyebrow, H1, Faint, ButtonLink, CheckList, Faq } from "../components/ui";
import { WebinarSignup } from "../components/WebinarSignup";
import { WEBINAR } from "../lib/webinar";
import { track } from "../lib/analytics";

/**
 * TOP OF FUNNEL: registration for the live class on 2 September 2026.
 *
 * Not linked from the nav by design. This is the page the ads, the WhatsApp
 * broadcasts and the emails point at. Event details live in src/lib/webinar.ts.
 */

/**
 * Highlighted phrase inside a sentence. A shadow underlay rather than a padded
 * background, so a following comma or full stop stays tight against the word.
 */
function Hl({ children }: { children: React.ReactNode }) {
  return (
    <span className="text-midnight [box-shadow:inset_0_-0.55em_0_rgba(200,160,74,0.28)]">
      {children}
    </span>
  );
}

const COVERING = [
  {
    t: "The 80% test",
    b: "How to look at your own week and see exactly which parts AI can take off you right now, and which parts genuinely still need you. Most owners get this backwards.",
  },
  {
    t: "Why your AI keeps giving you generic answers",
    b: "The one structural reason, and why no prompt fixes it. Once you see this you can’t unsee it.",
  },
  {
    t: "What goes into an Operator’s Brain",
    b: "The handful of things about your business AI needs to know before it becomes useful. I’ll show you mine, live, and what’s actually in it.",
  },
  {
    t: "Live: the same task, both ways",
    b: "I’ll run a real business task through public AI and through a trained one, side by side, in the room, so you see the gap yourself instead of taking my word for it.",
  },
  {
    t: "The three jobs to hand over first",
    b: "Where to start so you feel it in your week immediately, and the order that stops people from quitting in week two.",
  },
];

export default function WebinarPage() {
  useEffect(() => track("webinar_view", { webinar: WEBINAR.slug }), []);

  return (
    <>
      {/* ---------- Hero: the question, the answer, the seat ---------- */}
      <Section dark className="pt-10 md:pt-16">
        <div className="grid items-start gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          <div>
            <Eyebrow dark>Free live class &middot; {WEBINAR.shortWhen}</Eyebrow>
            <H1 className="mt-5 max-w-[16ch] text-cream">
              Can AI do your job for you &mdash; <Faint dark>even if it&rsquo;s complicated?</Faint>
            </H1>
            <p className="mt-6 text-2xl font-semibold text-gold md:text-3xl">
              No. But it can do about 80% of it.
            </p>
            <p className="mt-6 max-w-[46ch] text-lg text-cream/85">
              And if yours isn&rsquo;t doing that yet, it&rsquo;s not your prompts, and it&rsquo;s
              not because your business is too complicated. It&rsquo;s because{" "}
              <span className="font-semibold text-cream">the AI doesn&rsquo;t know your business.</span>
            </p>
            <p className="mt-4 max-w-[46ch] text-cream/70">
              In 60 minutes I&rsquo;ll show you exactly what that means, and what it looks like when
              you fix it.
            </p>
          </div>

          <WebinarSignup id="register" />
        </div>
      </Section>

      {/* ---------- The problem is urgent ---------- */}
      <Section>
        <div className="mx-auto max-w-[760px]">
          <Eyebrow>Let&rsquo;s start with your week</Eyebrow>
          <h2 className="mt-5 max-w-[18ch] text-3xl md:text-5xl">
            You&rsquo;re still the one <Faint>doing all of it.</Faint>
          </h2>
          <p className="mt-6 max-w-[56ch] text-lg font-medium text-midnight">
            You write the proposals. You chase the follow-ups. You fix the quote, answer the
            WhatsApps, do the invoices at 21:00, and then spend Saturday catching up on the work you
            actually get paid for.
          </p>
          <p className="mt-4 max-w-[56ch]">
            Your business can only grow to the size of your week. And your week is full.
          </p>
          <p className="mt-4 max-w-[56ch]">
            That is not standing still. Every month you stay the bottleneck, you turn down work you
            could have taken, and someone slower than you but better organised takes it instead.
          </p>
          <p className="mt-6 max-w-[56ch] border-l-2 border-gold pl-4 text-lg font-semibold text-midnight">
            A business that runs on one person doesn&rsquo;t stay the same size. It shrinks to fit
            that person&rsquo;s week.
          </p>
        </div>
      </Section>

      {/* ---------- What you've tried can't work ---------- */}
      <Section dark>
        <div className="mx-auto max-w-[760px]">
          <Eyebrow dark>And you&rsquo;ve already tried the obvious thing</Eyebrow>
          <h2 className="mt-5 max-w-[22ch] text-3xl text-cream md:text-5xl">
            You opened ChatGPT. You got something that sounded clever{" "}
            <Faint dark>and said nothing.</Faint>
          </h2>
          <div className="mt-6 max-w-[58ch] space-y-4 text-cream/85">
            <p>
              So you rewrote it. And rewriting it took longer than just writing it yourself would
              have.
            </p>
            <p>
              Then you did what everyone does. You tried better prompts. You watched a video about
              prompt frameworks. You paid for the upgrade. Maybe you tried three other tools. Same
              result every time: something generic that you had to fix before you could send it.
            </p>
            <p>
              Here is the part nobody tells you.{" "}
              <span className="font-semibold text-cream">That was never going to work.</span> Not
              because you&rsquo;re bad at prompting. Because of what a prompt actually is.
            </p>
            <p className="text-lg font-medium text-gold">
              Better prompts are you shouting louder at someone who doesn&rsquo;t speak your
              language. The volume was never the problem.
            </p>
          </div>
        </div>
      </Section>

      {/* ---------- The hidden cause, shown side by side ---------- */}
      <Section>
        <div className="mx-auto mb-10 max-w-[52ch] text-center">
          <Eyebrow>Here&rsquo;s the real reason</Eyebrow>
          <h2 className="mt-4 text-3xl md:text-5xl">
            It doesn&rsquo;t <Faint>know your business.</Faint>
          </h2>
          <p className="mx-auto mt-5 max-w-[54ch] text-ink">
            Same question. Same AI. The only difference is that one of them has been taught your
            business, and one hasn&rsquo;t. Watch what happens.
          </p>
        </div>

        <p className="mx-auto max-w-[980px] rounded-2xl bg-midnight px-6 py-4 font-mono text-sm text-cream md:text-base">
          <span className="text-gold">You ask:</span> &ldquo;Write the proposal for the Sandton
          client we met on Tuesday.&rdquo;
        </p>

        <div className="mx-auto mt-4 grid max-w-[980px] gap-4 md:grid-cols-2">
          {/* Generic */}
          <div className="rounded-2xl border border-midnight/10 bg-midnight/[0.03] p-6">
            <p className="border-b border-midnight/10 pb-3 font-mono text-[11px] uppercase tracking-[0.14em] text-muted">
              Public AI &middot; doesn&rsquo;t know you
            </p>
            <div className="mt-4 space-y-3 font-mono text-[13px] leading-relaxed text-muted">
              <p>Dear [Client Name],</p>
              <p>
                Thank you for the opportunity to submit this proposal. We are a [industry] company
                committed to delivering excellence and value to our valued clients.
              </p>
              <p>
                Our comprehensive solution includes:
                <br />
                &bull; [Service 1]
                <br />
                &bull; [Service 2]
              </p>
              <p>
                Investment: [Insert pricing]
                <br />
                Timeline: [Insert timeline]
              </p>
              <p>We look forward to partnering with you on this exciting journey.</p>
            </div>
          </div>

          {/* Trained */}
          <div className="relative overflow-hidden rounded-2xl border border-midnight/10 bg-white p-6">
            <span aria-hidden="true" className="absolute inset-y-0 left-0 w-1 bg-gold" />
            <p className="border-b border-midnight/10 pb-3 font-mono text-[11px] uppercase tracking-[0.14em] text-gold">
              AI that knows your business
            </p>
            <div className="mt-4 space-y-3 font-mono text-[13px] leading-relaxed text-ink">
              <p>Hi <Hl>Thabo</Hl>,</p>
              <p>
                Good to meet on Tuesday. You said the <Hl>two-week turnaround</Hl> is what keeps
                costing you, so I&rsquo;ve built this around that.
              </p>
              <p>
                Scope, same three phases we ran for <Hl>the Midrand job</Hl>:
                <br />
                &bull; <Hl>Phase 1 &mdash; site audit, week 1</Hl>
                <br />
                &bull; <Hl>Phase 2 &mdash; install, weeks 2&ndash;3</Hl>
              </p>
              <p>
                <Hl>R148,000</Hl>, our standard <Hl>50/50 terms</Hl>.
                <br />
                Valid 14 days, per our usual.
              </p>
              <p>Shall I send the SLA through as well?</p>
            </div>
          </div>
        </div>

        <p className="mx-auto mt-8 max-w-[30ch] text-center font-display text-xl font-extrabold tracking-[-0.03em] text-midnight md:text-2xl">
          One of these you send. The other one you rewrite.
        </p>
      </Section>

      {/* ---------- The line, repeated ---------- */}
      <Section dark className="py-12 text-center md:py-16">
        <p className="mx-auto max-w-[22ch] font-display text-3xl font-extrabold leading-[1.1] tracking-[-0.04em] text-cream md:text-5xl">
          Every hour you&rsquo;ve lost to AI wasn&rsquo;t a prompt problem.{" "}
          <span className="text-gold">It didn&rsquo;t know your business.</span>
        </p>
      </Section>

      {/* ---------- Who's teaching this ---------- */}
      <Section>
        <div className="grid items-center gap-10 md:grid-cols-2 md:gap-16">
          <img
            src="/images/phila-event.jpg"
            alt="Phila Ngwenya, Founder of GrowthCred"
            loading="lazy"
            className="aspect-[4/5] w-full rounded-2xl object-cover object-[center_22%]"
          />
          <div>
            <Eyebrow>Who&rsquo;s teaching this</Eyebrow>
            <h2 className="mt-5 text-3xl md:text-4xl">Phila Ngwenya.</h2>
            <span className="mt-4 block font-mono text-xs uppercase tracking-[0.08em] text-gold">
              Founder, GrowthCred &middot; Rosebank, Johannesburg
            </span>
            <p className="mt-5 max-w-[52ch] text-lg font-medium text-midnight">
              I&rsquo;ve built five businesses using AI. I got this wrong for about two years first.
            </p>
            <div className="mt-4 max-w-[52ch] space-y-4">
              <p>
                I did exactly what you&rsquo;re doing. Better prompts. More tools. Long clever
                instructions I&rsquo;d paste in every morning like I was briefing a temp who&rsquo;d
                forgotten everything overnight. I&rsquo;d get an answer back, sigh, and rewrite it.
              </p>
              <p>
                I&rsquo;m dyslexic, so writing has always been the slow, painful part of my day.
                Which means I had more reason than most to make this actually work, and less
                patience for anything that didn&rsquo;t.
              </p>
              <p>
                The day it changed was the day I stopped trying to explain my business in a prompt,
                and started teaching it to the AI once, properly, so it never forgot again.
              </p>
              <p className="border-l-2 border-gold pl-4 font-semibold text-midnight">
                I went through the pain so you don&rsquo;t have to. That hour on Wednesday is the
                shortcut I wish someone had given me in year one.
              </p>
            </div>
          </div>
        </div>
      </Section>

      {/* ---------- The different solution ---------- */}
      <Section dark>
        <div className="mx-auto max-w-[760px]">
          <Eyebrow dark>The thing I&rsquo;ll show you</Eyebrow>
          <h2 className="mt-5 text-3xl text-cream md:text-5xl">
            The Operator&rsquo;s <Faint dark>Brain.</Faint>
          </h2>
          <div className="mt-6 max-w-[58ch] space-y-4 text-cream/85">
            <p className="text-lg text-cream/95">
              It&rsquo;s not a prompt. It&rsquo;s not a tool. It&rsquo;s one place where your
              business is written down in a way AI can read: your clients, your pricing, your terms,
              your voice, the way you actually do the work.
            </p>
            <p>
              You build it once. Then every AI tool you use plugs into it and already knows
              everything, on day one, every time, without you explaining anything.
            </p>
            <p>
              <span className="font-semibold text-cream">
                This is a different category from what you&rsquo;ve been doing.
              </span>{" "}
              Prompting is briefing a temp every single morning. The Operator&rsquo;s Brain is a
              manager who&rsquo;s been in your business three years and knows how you like things
              done.
            </p>
            <p>You still with me? Good, because that one shift is the whole class.</p>
          </div>
        </div>
      </Section>

      {/* ---------- What we're covering ---------- */}
      <Section>
        <div className="mx-auto mb-10 max-w-[46ch] text-center">
          <Eyebrow>60 minutes &middot; free &middot; live</Eyebrow>
          <h2 className="mt-4 text-3xl md:text-5xl">
            What we&rsquo;re <Faint>covering.</Faint>
          </h2>
        </div>

        <ol className="mx-auto grid max-w-[820px] gap-4">
          {COVERING.map((item, i) => (
            <li key={i} className="rounded-2xl border border-midnight/10 bg-white p-6 md:p-8">
              <div className="flex items-baseline gap-4">
                <span className="font-mono text-sm text-gold">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="text-xl md:text-2xl">{item.t}</h3>
                  <p className="mt-3 max-w-[62ch] text-ink">{item.b}</p>
                </div>
              </div>
            </li>
          ))}
        </ol>
      </Section>

      {/* ---------- Proof ----------
          Real operators, real rooms, so the section stays. The three-card grid
          of named results is deliberately left out until Jeff, Julius and a
          third operator have given a number and a line in their own words,
          with permission. Same rule as the workshop page: no invented proof.
          When you have them, restore this:

          <div className="grid gap-px bg-cream/15 md:grid-cols-3">
            ...one card per operator: figure, quote, name and company...
          </div>
      */}
      <Section dark>
        <div className="mx-auto max-w-[760px]">
          <Eyebrow dark>This isn&rsquo;t theory</Eyebrow>
          <h2 className="mt-5 max-w-[22ch] text-3xl text-cream md:text-5xl">
            Operators in Johannesburg <Faint dark>are already running this.</Faint>
          </h2>
          <p className="mt-6 max-w-[56ch] text-cream/85">
            Waste management. Consulting. Construction. Professional services. Owners who came in
            doing everything themselves, built their brain in the room, and went home with the
            proposals, the follow-ups and the quotes coming out in their own voice.
          </p>
          <p className="mt-6 font-mono text-xs uppercase tracking-[0.14em] text-cream/50">
            Operator Intensive cohorts &middot; WeWork Rosebank
          </p>
        </div>
      </Section>

      {/* ---------- Who it's for ---------- */}
      <Section>
        <div className="mx-auto max-w-[760px]">
          <Eyebrow>Be honest with yourself here</Eyebrow>
          <h2 className="mt-5 text-3xl md:text-5xl">
            This is for you <Faint>if&hellip;</Faint>
          </h2>
          <CheckList
            className="mt-8 text-lg"
            items={[
              "You own the business, and you’re also still doing the work in it.",
              "You have somewhere between 3 and 50 people, and you’re the bottleneck for most of them.",
              "You’ve tried ChatGPT, got something generic, and quietly went back to doing it yourself.",
              "You’re not technical. You’ve never written a line of code and you don’t plan to.",
            ]}
          />
          <p className="mt-8 max-w-[56ch] text-lg font-medium text-midnight">
            Nobody in my rooms is a developer. They&rsquo;re operators: waste management,
            consulting, construction, professional services. My people. If you can send a WhatsApp
            voice note, you can do this.
          </p>
          <p className="mt-4 max-w-[56ch]">
            <span className="font-semibold text-midnight">It&rsquo;s not for you if</span> you want
            AI to run your whole business while you sit on a beach. That&rsquo;s not real, and
            I&rsquo;m not going to pretend it is on Wednesday.
          </p>
        </div>
      </Section>

      {/* ---------- The cost of not doing it ---------- */}
      <Section>
        <div className="mx-auto max-w-[760px]">
          <Eyebrow>Before you close this tab</Eyebrow>
          <h2 className="mt-5 text-3xl md:text-5xl">
            You&rsquo;re already <Faint>paying for this.</Faint>
          </h2>
          <p className="mt-5 text-lg text-ink">You&rsquo;re just paying in Saturdays.</p>

          <div className="relative mt-8 overflow-hidden rounded-2xl border border-midnight/10 bg-white p-6 md:p-8">
            <span aria-hidden="true" className="absolute inset-y-0 left-0 w-1 bg-gold" />
            {[
              ["Admin, proposals, follow-ups, quotes", "~10 hrs / week"],
              ["What an hour of your time is worth", "R750"],
              ["Weeks in a year", "48"],
            ].map(([label, value]) => (
              <div
                key={label}
                className="flex justify-between gap-6 border-b border-midnight/10 py-3 font-mono text-sm"
              >
                <span className="text-ink">{label}</span>
                <span className="text-midnight">{value}</span>
              </div>
            ))}
            <div className="flex justify-between gap-6 pt-5 font-mono text-base">
              <span className="font-medium text-midnight">
                Cost of doing it yourself for one more year
              </span>
              <span className="font-medium text-gold">R360,000</span>
            </div>
          </div>

          <p className="mt-6 max-w-[56ch]">
            Change the numbers to your own. The answer is still uncomfortable. And that&rsquo;s only
            the hours. It doesn&rsquo;t count the deals you didn&rsquo;t chase because the day ran
            out.
          </p>
          <p className="mt-4 max-w-[56ch] border-l-2 border-gold pl-4 font-semibold text-midnight">
            The hour on Wednesday costs you nothing. Another year of this costs you a number you
            just worked out yourself.
          </p>
        </div>
      </Section>

      {/* ---------- Close ---------- */}
      <Section dark>
        <div className="mx-auto max-w-[720px] text-center">
          <Eyebrow dark>{WEBINAR.shortWhen} &middot; Free</Eyebrow>
          <h2 className="mx-auto mt-5 max-w-[20ch] text-3xl text-cream md:text-5xl">
            Come find out what your AI <Faint dark>has been missing.</Faint>
          </h2>
          <p className="mx-auto mt-5 max-w-[48ch] text-cream/80">
            It&rsquo;s live, it&rsquo;s once, and I answer questions in the room. I keep the room
            small enough that I can actually get to yours.
          </p>
          <WebinarSignup
            className="mx-auto mt-10 max-w-[460px]"
            fineprint="Free. 60 minutes. Nothing to install."
          />
        </div>
      </Section>

      {/* ---------- FAQ ---------- */}
      <Section>
        <div className="mx-auto mb-10 max-w-[46ch] text-center">
          <Eyebrow>Before you ask</Eyebrow>
          <h2 className="mt-4 text-3xl md:text-5xl">Fair questions.</h2>
        </div>
        <Faq
          items={[
            {
              q: "Is this an hour-long advert?",
              a: "No. I teach the whole thing: what the problem is, why it happens, and what an Operator’s Brain is made of. I’ll show you mine. At the end I’ll mention the paid workshop where we build yours with you in a day, and then I’ll stop talking about it. If you take what I teach and go build it yourself, good. That’s a real outcome and I’m happy with it.",
            },
            {
              q: "My business is complicated. Does this work for what I do?",
              a: "Complicated is the point. Simple businesses do fine on generic AI, because generic answers are close enough. The more specific your business is, the worse public AI performs, and the more you get back from teaching it properly. Complicated isn’t the obstacle. It’s the reason.",
            },
            {
              q: "I’m not technical at all.",
              a: "Nothing on Wednesday involves code. You’re writing down how your business works in plain language. If you can explain your business to a new employee, you can do this. That’s genuinely the whole skill.",
            },
            {
              q: "Will there be a recording?",
              a: "Only if you stay to the end. Everyone still in the room when we finish gets the recording. Leave halfway and you get nothing, so plan for the full hour rather than counting on catching up later.",
            },
            {
              q: "What does it cost?",
              a: "Nothing. The class is free.",
            },
          ]}
        />

        <div className="mt-10 text-center">
          <ButtonLink href="#register">
            Save my seat <span aria-hidden="true">&#8599;</span>
          </ButtonLink>
        </div>
      </Section>

      {/* Sticky CTA, mobile-first conversion aid */}
      <div className="sticky bottom-0 z-40 border-t border-midnight/10 bg-paper/95 p-3 backdrop-blur md:hidden">
        <ButtonLink href="#register" className="w-full">
          Save my seat &middot; {WEBINAR.shortWhen.replace("Wednesday ", "")}{" "}
          <span aria-hidden="true">&#8599;</span>
        </ButtonLink>
      </div>
    </>
  );
}
