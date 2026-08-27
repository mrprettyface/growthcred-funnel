import { useEffect } from "react";
import { Section, Eyebrow, Faint, Faq, CheckList } from "../components/ui";
import { CostCalculator } from "../components/CostCalculator";
import { SmoothScroll } from "../components/webinar/SmoothScroll";
import { ProgressRail } from "../components/webinar/ProgressRail";
import { HeroScene } from "../components/webinar/HeroScene";
import { HoursScene } from "../components/webinar/HoursScene";
import { LiveDemo } from "../components/webinar/LiveDemo";
import { SeatStepper } from "../components/webinar/SeatStepper";
import { ImageBreak } from "../components/webinar/ImageBreak";
import { Beat } from "../components/webinar/Beat";
import { CardStack } from "../components/webinar/CardStack";
import { SeatCtaProvider, CtaBand, SeatButton } from "../components/webinar/SeatCta";
import { StickySeatBar } from "../components/webinar/StickySeatBar";
import ScrollStack, { ScrollStackItem } from "../components/reactbits/ScrollStack";
import ScrollReveal from "../components/reactbits/ScrollReveal";
import ScrollFloat from "../components/reactbits/ScrollFloat";
import ClickSpark from "../components/reactbits/ClickSpark";
import TiltedCard from "../components/reactbits/TiltedCard";
import Stepper, { Step } from "../components/reactbits/Stepper";
import { WEBINAR } from "../lib/webinar";
import { track } from "../lib/analytics";
import { useReducedMotion, useIsMobile } from "../lib/motion";

/**
 * TOP OF FUNNEL, as an experience rather than a document.
 *
 * The argument is the same one that runs at /webinar-plain, but here the page
 * makes it instead of asserting it: you meet one sentence at a time, you watch
 * ten hours a week add up, you pick the job that eats your week and see the
 * same AI answer it twice.
 *
 * The ask comes early — the seat form sits directly under the hero — and then
 * again after every point lands, as a band that opens the form in a dialog. A
 * reader who is convinced at minute one and a reader convinced at minute six
 * both have the offer within reach without ever leaving their place.
 *
 * Three rules this page must keep:
 *   1. Motion is decoration. Reduced motion gets everything, plainly.
 *   2. The seat form is never behind an animation.
 *   3. One scroll authority (SmoothScroll), never two.
 */

const SCENES = [
  { id: "hero", label: "The question" },
  { id: "register", label: "Your seat" },
  { id: "week", label: "Your week" },
  { id: "tried", label: "What you tried" },
  { id: "demo", label: "The difference" },
  { id: "brain", label: "The fix" },
  { id: "host", label: "Who I am" },
  { id: "covering", label: "The hour" },
  { id: "cost", label: "The cost" },
  { id: "seat", label: "Book it" },
];

const TRIED = [
  { t: "Better prompts.", b: "You rewrote the instruction five ways. The answer got longer, not better." },
  { t: "A video on prompt frameworks.", b: "Forty minutes. An acronym. You still rewrote the output." },
  { t: "The paid upgrade.", b: "Faster generic. Same generic." },
  { t: "Three other tools.", b: "Each one met your business for the first time, every time." },
];

const COVERING = [
  {
    t: "The 80% test",
    b: "How to look at your own week and see which parts AI can take off you right now, and which genuinely still need you. Most owners get this backwards.",
  },
  {
    t: "Why your AI keeps answering like that",
    b: "The one structural reason, and why no prompt fixes it. Once you see it you can’t unsee it.",
  },
  {
    t: "What goes into an Operator’s Brain",
    b: "The handful of things AI needs to know about your business before it becomes useful. I’ll open mine and show you what’s actually in it.",
  },
  {
    t: "Live: the same task, both ways",
    b: "A real business task through public AI and through a trained one, side by side, in the room. You see the gap yourself instead of taking my word for it.",
  },
  {
    t: "The three jobs to hand over first",
    b: "Where to start so you feel it in your week immediately, and the order that stops people quitting in week two.",
  },
];

export default function WebinarExperience() {
  const reduced = useReducedMotion();
  const isMobile = useIsMobile();
  /**
   * The vendored ScrollStack recalculates transforms for every card on every
   * scroll event, reading layout as it goes — fine on a desktop, ruinous on a
   * phone. So the pile is desktop-only, and phones get the same effect from
   * CardStack, which is pure CSS sticky and costs nothing to run.
   */
  const heavyStack = !reduced && !isMobile;
  useEffect(() => track("webinar_view", { webinar: WEBINAR.slug, variant: "experience" }), []);

  return (
    <SeatCtaProvider>
      <ClickSpark sparkColor="#c8a04a" sparkSize={9} sparkRadius={18} sparkCount={7} duration={420}>
        <SmoothScroll />
        <ProgressRail scenes={SCENES} />

        <div id="hero" data-tone="dark">
          <HeroScene />
        </div>

        {/* ---------- The ask, immediately ---------- */}
        <Section id="register" dark className="pt-0 pb-8 md:pt-0 md:pb-16">
          <div className="grid items-center gap-10 md:grid-cols-2 md:gap-16">
            <div>
              <Eyebrow dark>{WEBINAR.shortWhen} &middot; Free</Eyebrow>
              <h2 className="mt-5 max-w-[18ch] text-3xl text-cream md:text-5xl">
                Come find out what your AI <Faint dark>has been missing.</Faint>
              </h2>
              <p className="mt-6 max-w-[46ch] text-lg text-cream/85">
                Sixty minutes, live. I answer questions in the room, and I keep it small enough that
                I can actually get to yours.
              </p>
              <p className="mt-4 max-w-[46ch] text-cream/70">
                Book the seat now and read the rest of this while you wait for the email.
              </p>
              <p className="mt-6 font-mono text-xs uppercase tracking-[0.14em] text-cream/50">
                {WEBINAR.dayLabel} &middot; {WEBINAR.timeLabel} &middot; {WEBINAR.where}
              </p>
            </div>
            <SeatStepper />
          </div>
        </Section>

        {/* ---------- Your week, one sentence at a time ---------- */}
        <Section id="week" className="py-8 pb-5 md:py-24 md:pb-10">
          <HoursScene />
        </Section>

        <CtaBand line="You can keep doing this, or you can spend an hour learning to hand most of it over." />

        {/* ---------- Everything you tried, piling up ---------- */}
        <Section id="tried" dark className="overflow-x-clip py-8 pb-5 md:py-24 md:pb-10">
          <div className="mx-auto max-w-[760px]">
            <Eyebrow dark>And you&rsquo;ve already tried the obvious thing</Eyebrow>
            <h2 className="mt-5 max-w-[20ch] text-3xl text-cream md:text-5xl">
              You opened ChatGPT. <Faint dark>It sounded clever and said nothing.</Faint>
            </h2>
          </div>

          {heavyStack ? (
            <ScrollStack
              useWindowScroll
              manageScroll={false}
              itemDistance={80}
              itemStackDistance={24}
              stackPosition="22%"
              scaleEndPosition="12%"
              baseScale={0.88}
              rotationAmount={-1.2}
              blurAmount={0}
              innerClassName="pt-[6vh] pb-[12vh]"
              className="mx-auto max-w-[760px]"
            >
              {TRIED.map((item) => (
                <ScrollStackItem
                  key={item.t}
                  itemClassName="h-auto min-h-[13rem] rounded-2xl border border-cream/15 bg-midnight-soft p-8 md:p-10 shadow-[0_30px_60px_rgba(0,0,0,0.45)]"
                >
                  <h3 className="text-2xl text-cream md:text-3xl">{item.t}</h3>
                  <p className="mt-3 max-w-[46ch] text-cream/75">{item.b}</p>
                </ScrollStackItem>
              ))}
              <ScrollStackItem itemClassName="h-auto min-h-[13rem] rounded-2xl border border-gold/40 bg-gold p-8 md:p-10 shadow-[0_30px_60px_rgba(0,0,0,0.45)]">
                <h3 className="text-2xl text-midnight md:text-3xl">Same result every time.</h3>
                <p className="mt-3 max-w-[46ch] text-midnight/80">
                  Something generic that you had to fix before you could send it.
                </p>
              </ScrollStackItem>
            </ScrollStack>
          ) : (
            <CardStack className="mx-auto mt-8 max-w-[760px]">
              {[
                ...TRIED.map((item) => (
                  <div
                    key={item.t}
                    className="rounded-2xl border border-cream/15 bg-midnight-soft p-6 shadow-[0_24px_50px_rgba(0,0,0,0.5)]"
                  >
                    <h3 className="text-2xl text-cream">{item.t}</h3>
                    <p className="mt-3 max-w-[46ch] text-cream/75">{item.b}</p>
                  </div>
                )),
                <div
                  key="payoff"
                  className="rounded-2xl border border-gold/40 bg-gold p-6 shadow-[0_24px_50px_rgba(0,0,0,0.5)]"
                >
                  <h3 className="text-2xl text-midnight">Same result every time.</h3>
                  <p className="mt-3 max-w-[46ch] text-midnight/80">
                    Something generic that you had to fix before you could send it.
                  </p>
                </div>,
              ]}
            </CardStack>
          )}

          <div className="mx-auto max-w-[760px]">
            <ScrollReveal
              containerClassName="mt-6"
              textClassName="text-2xl md:text-4xl font-display font-extrabold tracking-[-0.04em] text-cream"
              baseOpacity={0.12}
              enableBlur={false}
            >
              That was never going to work, and not because you are bad at prompting.
            </ScrollReveal>
            <p className="mt-6 max-w-[54ch] text-lg text-gold">
              Better prompts are you shouting louder at someone who doesn&rsquo;t speak your
              language. The volume was never the problem.
            </p>
          </div>
        </Section>

        <CtaBand
          tone="dark"
          line="There is one reason none of that worked. I spend the first ten minutes on it."
        />

        {/* ---------- The demo. Their job, their week. ---------- */}
        <Section id="demo" className="py-8 pb-5 md:py-24 md:pb-10">
          <LiveDemo />
        </Section>

        <CtaBand line="That gap is the whole class. On Wednesday I show you how to close it." />

        {/* ---------- The line, then the fix ---------- */}
        <Section dark className="py-8 text-center md:py-24">
          {reduced ? (
            <p className="mx-auto max-w-[22ch] font-display text-3xl font-extrabold leading-[1.1] tracking-[-0.04em] text-cream md:text-5xl">
              It didn&rsquo;t know your business.
            </p>
          ) : (
            <ScrollFloat
              containerClassName="mx-auto max-w-[22ch]"
              textClassName="font-display text-3xl md:text-5xl font-extrabold tracking-[-0.04em] text-cream"
              scrollStart="center bottom+=40%"
              scrollEnd="center center"
            >
              It didn't know your business.
            </ScrollFloat>
          )}
        </Section>

        <Section id="brain" dark className="pt-0 pb-5 md:pt-0 md:pb-10">
          <div className="mx-auto max-w-[760px]">
            <Eyebrow dark>The thing I&rsquo;ll show you</Eyebrow>
            <h2 className="mt-5 text-3xl text-cream md:text-5xl">
              The Operator&rsquo;s <Faint dark>Brain.</Faint>
            </h2>
            <Beat lead>
              <p className="max-w-[56ch] text-cream/95">
                It&rsquo;s not a prompt. It&rsquo;s not a tool.
              </p>
            </Beat>
            <Beat>
              <p className="max-w-[56ch] text-cream/85">
                It&rsquo;s one place where your business is written down in a way AI can read: your
                clients, your pricing, your terms, your voice, the way you actually do the work.
              </p>
            </Beat>
            <Beat>
              <p className="max-w-[56ch] text-cream/85">
                You build it once. Every tool you use plugs into it and already knows everything, on
                day one, every time.
              </p>
            </Beat>
            <Beat>
              <p className="max-w-[56ch] border-l-2 border-gold pl-4 text-lg font-semibold text-cream">
                Prompting is briefing a temp every morning. This is a manager who has been in your
                business three years.
              </p>
            </Beat>
          </div>
        </Section>

        <CtaBand tone="dark" line="I&rsquo;ll open mine on the call and show you exactly what&rsquo;s in it." />

        {/* ---------- Who's teaching it ---------- */}
        <Section id="host" className="py-8 md:py-24">
          <div className="grid items-center gap-10 md:grid-cols-2 md:gap-16">
            <div className="mx-auto w-full max-w-[380px]">
              {reduced ? (
                <img
                  src="/images/phila-event.jpg"
                  alt="Phila Ngwenya, Founder of GrowthCred"
                  loading="lazy"
                  className="aspect-[4/5] w-full rounded-2xl object-cover object-[center_22%]"
                />
              ) : (
                <TiltedCard
                  imageSrc="/images/phila-event.jpg"
                  altText="Phila Ngwenya, Founder of GrowthCred"
                  containerHeight="440px"
                  containerWidth="100%"
                  imageHeight="440px"
                  imageWidth="100%"
                  rotateAmplitude={9}
                  scaleOnHover={1.03}
                  showMobileWarning={false}
                  showTooltip={false}
                />
              )}
            </div>

            <div>
              <Eyebrow>Who&rsquo;s teaching this</Eyebrow>
              <h2 className="mt-5 text-3xl md:text-4xl">Phila Ngwenya.</h2>
              <span className="mt-4 block font-mono text-xs uppercase tracking-[0.08em] text-gold">
                Founder, GrowthCred &middot; Rosebank, Johannesburg
              </span>
              <Beat lead>
                <p className="max-w-[46ch] text-midnight">I&rsquo;ve built five businesses using AI.</p>
                <p className="mt-3 max-w-[46ch] text-midnight">
                  I got this wrong for about two years first.
                </p>
              </Beat>
              <Beat>
                <p className="max-w-[52ch]">
                  Better prompts. More tools. Long clever instructions I&rsquo;d paste in every
                  morning like I was briefing a temp who&rsquo;d forgotten everything overnight.
                </p>
              </Beat>
              <Beat>
                <p className="max-w-[52ch]">
                  I&rsquo;m dyslexic, so writing has always been the slow, painful part of my day. I
                  had more reason than most to make this work, and less patience for anything that
                  didn&rsquo;t.
                </p>
              </Beat>
              <Beat>
                <p className="max-w-[52ch] border-l-2 border-gold pl-4 font-semibold text-midnight">
                  I went through the pain so you don&rsquo;t have to. That hour is the shortcut I
                  wish someone had given me in year one.
                </p>
              </Beat>
              <SeatButton className="mt-8">Take the shortcut</SeatButton>
            </div>
          </div>
        </Section>

        {/* ---------- The hour, at their own pace ---------- */}
        <Section id="covering" className="pt-0 pb-5 md:pt-0 md:pb-10">
          <div className="mx-auto mb-10 max-w-[46ch] text-center">
            <Eyebrow>60 minutes &middot; free &middot; live</Eyebrow>
            <h2 className="mt-4 text-3xl md:text-5xl">
              What we&rsquo;re <Faint>covering.</Faint>
            </h2>
            <p className="mx-auto mt-5 max-w-[48ch] text-ink">
              Five things. Click through them at your own pace.
            </p>
          </div>

          {reduced ? (
            <ol className="mx-auto grid max-w-[760px] gap-4">
              {COVERING.map((item, i) => (
                <li key={item.t} className="rounded-2xl border border-midnight/10 bg-white p-6">
                  <span className="font-mono text-sm text-gold">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-2 text-xl">{item.t}</h3>
                  <p className="mt-2 text-ink">{item.b}</p>
                </li>
              ))}
            </ol>
          ) : (
            <div className="mx-auto max-w-[760px] rounded-2xl border border-midnight/10 bg-white py-4">
              <Stepper
                initialStep={1}
                backButtonText="Back"
                nextButtonText="Next"
                stepCircleContainerClassName="max-w-none rounded-none bg-transparent shadow-none"
                stepContainerClassName="px-8 pt-6 pb-2"
                contentClassName="px-8"
              >
                {COVERING.map((item, i) => (
                  <Step key={item.t}>
                    <span className="font-mono text-sm text-gold">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3 className="mt-2 text-2xl md:text-3xl">{item.t}</h3>
                    <p className="mt-3 min-h-[6rem] max-w-[52ch] text-ink">{item.b}</p>
                  </Step>
                ))}
              </Stepper>
            </div>
          )}
        </Section>

        <CtaBand line="All five, in one hour, on Wednesday. It costs you nothing." />

        {/* ---------- Proof, claim-free until real numbers exist ---------- */}
        <Section dark className="py-8 pb-8 md:py-24 md:pb-16">
          <div className="mx-auto max-w-[760px]">
            <Eyebrow dark>This isn&rsquo;t theory</Eyebrow>
            <h2 className="mt-5 max-w-[22ch] text-3xl text-cream md:text-5xl">
              Operators in Johannesburg <Faint dark>are already running this.</Faint>
            </h2>
            <Beat>
              <p className="max-w-[56ch] text-cream/85">
                Waste management. Consulting. Construction. Professional services. Owners who came
                in doing everything themselves and went home with the proposals, the follow-ups and
                the quotes coming out in their own voice.
              </p>
            </Beat>
          </div>

          <div className="mx-auto mt-10 grid max-w-[860px] gap-4 sm:grid-cols-2">
            <img
              src="/images/phila-team.jpg"
              alt="A GrowthCred session in Johannesburg"
              loading="lazy"
              className="h-[320px] w-full rounded-2xl object-cover object-[center_30%]"
            />
            <img
              src="/images/phila-karen.jpg"
              alt="Phila with an operator after a session"
              loading="lazy"
              className="h-[320px] w-full rounded-2xl object-cover"
            />
          </div>

          <p className="mx-auto mt-6 max-w-[860px] font-mono text-xs uppercase tracking-[0.14em] text-cream/50">
            Operator Intensive cohorts &middot; WeWork Rosebank
          </p>
        </Section>

        {/* ---------- Who it's for ---------- */}
        <Section className="py-8 md:py-24">
          <div className="mx-auto max-w-[760px]">
            <Eyebrow>Be honest with yourself here</Eyebrow>
            <h2 className="mt-5 text-3xl md:text-5xl">
              This is for you <Faint>if&hellip;</Faint>
            </h2>
            <CheckList
              className="mt-8 text-lg"
              items={[
                { icon: "owner", text: "You own the business, and you’re also still doing the work in it." },
                {
                  icon: "bottleneck",
                  text: "You have between 3 and 50 people, and you’re the bottleneck for most of them.",
                },
                {
                  icon: "generic-ai",
                  text: "You’ve tried ChatGPT, got something generic, and quietly went back to doing it yourself.",
                },
                { icon: "no-code", text: "You’re not technical, and you don’t plan to be." },
              ]}
            />
            <Beat lead className="mt-8">
              <p className="max-w-[54ch] text-midnight">
                If you can send a WhatsApp voice note, you can do this.
              </p>
            </Beat>
            <Beat>
              <p className="max-w-[54ch]">
                <span className="font-semibold text-midnight">It&rsquo;s not for you if</span> you
                want AI to run your whole business while you sit on a beach. That&rsquo;s not real,
                and I&rsquo;m not going to pretend it is on Wednesday.
              </p>
            </Beat>
            <SeatButton className="mt-8">That&rsquo;s me &mdash; save my seat</SeatButton>
          </div>
        </Section>

        {/* ---------- Their number, not mine ---------- */}
        <Section id="cost" className="pt-0 pb-8 md:pt-0 md:pb-24">
          <div className="mx-auto mb-10 max-w-[46ch] text-center">
            <Eyebrow>Before you close this tab</Eyebrow>
            <h2 className="mt-4 text-3xl md:text-5xl">
              You&rsquo;re already <Faint>paying for this.</Faint>
            </h2>
            <p className="mt-5 text-lg text-ink">You&rsquo;re just paying in Saturdays.</p>
          </div>
          <CostCalculator />
          <p className="mx-auto mt-8 max-w-[54ch] text-center text-lg font-semibold text-midnight">
            The hour on Wednesday costs you nothing. Another year of this costs you the number you
            just worked out yourself.
          </p>
        </Section>

        <ImageBreak
          src="/images/the-outcome.jpg"
          alt="A business owner with a calm, uncluttered week"
          eyebrow="The other side"
          line="A week with ten hours in it that used to belong to admin."
        />

        {/* ---------- The close ---------- */}
        <Section id="seat" dark className="py-8 pb-8 md:py-24 md:pb-16">
          <div className="grid items-center gap-10 md:grid-cols-2 md:gap-16">
            <div>
              <Eyebrow dark>Last thing</Eyebrow>
              <h2 className="mt-5 max-w-[18ch] text-3xl text-cream md:text-5xl">
                One hour, <Faint dark>and you stop guessing.</Faint>
              </h2>
              <p className="mt-6 max-w-[46ch] text-cream/85">
                It&rsquo;s live, it&rsquo;s once, and it&rsquo;s free. Stay to the end and the
                recording is yours.
              </p>
              <p className="mt-6 font-mono text-xs uppercase tracking-[0.14em] text-cream/50">
                {WEBINAR.dayLabel} &middot; {WEBINAR.timeLabel} &middot; {WEBINAR.where}
              </p>
            </div>
            <SeatStepper />
          </div>
        </Section>

        {/* ---------- FAQ ---------- */}
        <Section className="py-8 md:py-24">
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
          <div id="faq-cta" className="mt-10 text-center">
            <SeatButton />
          </div>
        </Section>

        {/* Sticky CTA, mobile-first conversion aid. Steps aside whenever a real
            form or the closing CTA is on screen. */}
        <StickySeatBar watch={["register", "seat", "faq-cta"]} />
      </ClickSpark>
    </SeatCtaProvider>
  );
}
