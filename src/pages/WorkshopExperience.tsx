import { useEffect } from "react";
import { Section, Eyebrow, Faint, Faq, CheckList, ButtonLink, VideoSlot } from "../components/ui";
import { CostCalculator } from "../components/CostCalculator";
import { SevenLevels } from "../components/SevenLevels";
import { SmoothScroll } from "../components/webinar/SmoothScroll";
import { ProgressRail } from "../components/webinar/ProgressRail";
import { HoursScene } from "../components/webinar/HoursScene";
import { ImageBreak } from "../components/webinar/ImageBreak";
import { Beat } from "../components/webinar/Beat";
import { CardStack } from "../components/webinar/CardStack";
import { CtaBand } from "../components/webinar/SeatCta";
import { LiveDemo } from "../components/webinar/LiveDemo";
import ScrollFloat from "../components/reactbits/ScrollFloat";
import ClickSpark from "../components/reactbits/ClickSpark";
import TiltedCard from "../components/reactbits/TiltedCard";
import { track } from "../lib/analytics";
import { useReducedMotion, useIsMobile } from "../lib/motion";

/**
 * THE MONEY PAGE, as an experience — running at /workshop while the original
 * keeps serving / untouched.
 *
 * Same argument and the same locked headline as the live page. What changes is
 * that it is walked rather than read: your week counted out one line at a time,
 * the cost worked out on your own numbers, the day arriving as a pile of cards.
 *
 * The ask is different from the webinar's. There is no seat to book here — the
 * conversion is the checkout, so every band links to /checkout rather than
 * opening a dialog.
 *
 * The rules from the webinar build carry over unchanged, and the gates enforce
 * them on this file too: no scroll-driven blur, no layout reads in scroll
 * handlers, a plain branch under reduced motion, 44px targets, 12px type.
 */

const SCENES = [
  { id: "hero", label: "The promise" },
  { id: "demo", label: "The difference" },
  { id: "week", label: "Your week" },
  { id: "cost", label: "The cost" },
  { id: "levels", label: "The ladder" },
  { id: "day", label: "The day" },
  { id: "walk", label: "What you get" },
  { id: "guarantee", label: "The guarantee" },
  { id: "host", label: "Who runs it" },
  { id: "close", label: "Start" },
];

const BLOCKS = [
  {
    t: "Find your 10 hours",
    b: "We map where your week actually goes. Not a vague “I’m busy”, but the real list: the tasks you repeat, the questions you answer twice, the work only you can do because it all lives in your head.",
    h: "the guessing. You leave this hour knowing precisely what is getting fixed.",
  },
  {
    t: "Build your business a brain",
    b: "One place that holds everything about your business: how you work, who your clients are, what you sell, how you say it. From now on you never re-explain yourself to a tool again.",
    h: "repeating yourself. The re-typing, the re-briefing, the starting from scratch.",
  },
  {
    t: "Wire the brain to a worker",
    b: "We connect that brain to an AI that can actually do the work. It loads your whole business the moment you open it, so every task starts with full context instead of a blank page.",
    h: "the setup tax you pay every single time you sit down to work.",
  },
  {
    t: "Put it to work in front of you",
    b: "This is where you feel it. You run a real task live: research, a first draft, a follow-up, whatever eats your week. What took an hour takes minutes, in your voice, with your own work.",
    h: "the manual grind. Research, first drafts, the busy work that never needed you.",
  },
  {
    t: "Make it work while you sleep",
    b: "You set up a routine that runs overnight, so you wake to work already moving instead of a to-do list you have to kickstart. Every day it starts further ahead than the last.",
    h: "the blank Monday morning. You stop being the thing that has to start everything.",
  },
  {
    t: "Lock in the rhythm",
    b: "We turn all of it into a simple daily rhythm you can keep. You leave with the systems live, not a folder of notes and good intentions.",
    h: "the risk of going home and never using it.",
  },
];

/** The ask on this page is the checkout, not a dialog. */
function BuyButton({ className }: { className?: string }) {
  return (
    <ButtonLink to="/checkout" className={className}>
      Get my time back <span aria-hidden="true">&#8599;</span>
    </ButtonLink>
  );
}

const NOTE = "One day · R990 · Get the 10 hours back or you don’t pay";

export default function WorkshopExperience() {
  const reduced = useReducedMotion();
  const isMobile = useIsMobile();
  useEffect(() => track("workshop_view", { variant: "experience" }), []);

  return (
    <ClickSpark sparkColor="#c8a04a" sparkSize={9} sparkRadius={18} sparkCount={7} duration={420}>
      <SmoothScroll />
      <ProgressRail scenes={SCENES} />

      {/* ---------- The promise, and the VSL ---------- */}
      <Section id="hero" dark className="pt-10 md:pt-16">
        <div className="mx-auto max-w-[860px] text-center">
          <Eyebrow dark>The one-day workshop</Eyebrow>
          <h1 className="mx-auto mt-5 max-w-[15ch] text-4xl text-cream md:text-6xl lg:text-7xl">
            Get 10 Hours a Week Back, <Faint dark>in One Day.</Faint>
          </h1>
          <p className="mx-auto mt-6 max-w-[56ch] text-lg text-cream/85">
            One day. You leave with the busy work already handed over, running without you.
          </p>
        </div>

        <div className="mx-auto mt-10 max-w-[860px]">
          <VideoSlot slot="workshopVsl" label="workshop VSL video" />
        </div>

        <div className="mt-8 flex flex-col items-center gap-3">
          <BuyButton className="w-full sm:w-auto" />
          <p className="font-mono text-[12px] uppercase tracking-[0.14em] text-cream/50">
            Get the 10 hours back, or you don&rsquo;t pay
          </p>
        </div>
      </Section>

      <CtaBand
        tone="dark"
        line="You can read the rest of this, or you can book the day and read it while you wait."
        note={NOTE}
        action={<BuyButton className="shrink-0" />}
      />

      {/* ---------- The demo. Show the gap before describing the fix. ---------- */}
      <Section id="demo" className="py-8 pb-5 md:py-24 md:pb-10">
        <LiveDemo />
      </Section>

      <CtaBand
        line="Closing that gap is what the day is for. You build it, we guide it."
        note={NOTE}
        action={<BuyButton className="shrink-0" />}
      />

      {/* ---------- Your week, counted ---------- */}
      <Section id="week" className="py-8 pb-5 md:py-24 md:pb-10">
        <HoursScene />
      </Section>

      <CtaBand
        line="That is the week the workshop is built to give you back."
        note={NOTE}
        action={<BuyButton className="shrink-0" />}
      />

      {/* ---------- The problem, one idea at a time ---------- */}
      <Section dark className="py-8 md:py-24">
        <div className="mx-auto max-w-[760px]">
          <Eyebrow dark>The problem</Eyebrow>
          <h2 className="mt-5 max-w-[18ch] text-3xl text-cream md:text-5xl">
            The work that runs your week <Faint dark>is not the work that grows it.</Faint>
          </h2>
          <Beat lead>
            <p className="max-w-[54ch] text-cream/95">
              Every owner starts out doing everything. It works, right up until it doesn&rsquo;t.
            </p>
          </Beat>
          <Beat>
            <p className="max-w-[54ch] text-cream/85">
              The follow-ups. The quotes. The scheduling. The chasing. The copy-paste admin that has
              to happen but never moves you forward.
            </p>
          </Beat>
          <Beat>
            <p className="max-w-[54ch] text-cream/85">
              You are not short on effort. You are short on hours. And the busy work has first claim
              on every one of them.
            </p>
          </Beat>
        </div>
      </Section>

      <ImageBreak
        src="/images/the-drain.jpg"
        alt="A business owner buried in admin at their desk"
        eyebrow="Right now"
        line="Every hour here is an hour not spent growing anything."
      />

      {/* ---------- Their number ---------- */}
      <Section id="cost" className="py-8 md:py-24">
        <div className="mx-auto mb-10 max-w-[46ch] text-center">
          <Eyebrow>The cost of staying stuck</Eyebrow>
          <h2 className="mt-4 text-3xl md:text-5xl">
            Work out what this <Faint>is already costing you.</Faint>
          </h2>
        </div>
        <CostCalculator />
      </Section>

      <CtaBand
        line="One day costs R990. Another year of that number costs considerably more."
        note={NOTE}
        action={<BuyButton className="shrink-0" />}
      />

      {/* ---------- The ladder ---------- */}
      <Section id="levels" className="py-8 md:py-24">
        <SevenLevels />
      </Section>

      {/* ---------- The day itself ---------- */}
      <Section id="day" dark className="overflow-x-clip py-8 md:py-24">
        <div className="mx-auto mb-10 max-w-[46ch] text-center">
          <Eyebrow dark>What happens on the day</Eyebrow>
          <h2 className="mt-4 text-3xl text-cream md:text-5xl">
            You build it, <Faint dark>not just hear about it.</Faint>
          </h2>
          <p className="mx-auto mt-5 max-w-[54ch] text-cream/80">
            You walk in an operator. You walk out an owner, with the systems already running.
          </p>
        </div>

        <CardStack className="mx-auto max-w-[760px]" gap={isMobile ? "30vh" : "26vh"}>
          {BLOCKS.map((blk, i) => (
            <div
              key={blk.t}
              className="rounded-2xl border border-cream/15 bg-midnight-soft p-6 shadow-[0_24px_50px_rgba(0,0,0,0.5)] md:p-8"
            >
              <span className="font-mono text-sm text-gold">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="mt-2 text-2xl text-cream md:text-3xl">{blk.t}</h3>
              <p className="mt-3 max-w-[52ch] text-cream/75">{blk.b}</p>
              <p className="mt-4 border-l-2 border-gold pl-3 text-sm text-cream">
                <span className="font-semibold">You hand over:</span> {blk.h}
              </p>
            </div>
          ))}
        </CardStack>

        <p className="mx-auto mt-8 max-w-[54ch] text-center text-lg font-medium text-cream">
          The 10 hours are not a promise for later. They start the same week.
        </p>
      </Section>

      <CtaBand
        tone="dark"
        line="That is the day. Six blocks, built with you in the room."
        note={NOTE}
        action={<BuyButton className="shrink-0" />}
      />

      {/* ---------- What you leave with ---------- */}
      <Section id="walk" className="py-8 md:py-24">
        <div className="mx-auto mb-10 max-w-[46ch] text-center">
          <Eyebrow>Everything you walk away with</Eyebrow>
          <h2 className="mt-4 text-3xl md:text-5xl">What you walk away with.</h2>
        </div>
        <CheckList
          className="mx-auto max-w-[720px] text-lg"
          items={[
            "Your business brain, built and live, so you never re-explain yourself to a tool again",
            "An AI worker wired to that brain, starting every task already knowing your business",
            "Your first real tasks handed over on the day, with the hours coming off in front of you",
            "An overnight routine that keeps work moving while you sleep",
            "A simple daily rhythm that keeps the systems running long after you leave",
            "The workbook you build in, so you go home with everything documented",
            "A room of other operators making the same shift, and the group that keeps going after",
          ]}
        />
      </Section>

      {/* ---------- The guarantee ---------- */}
      <Section id="guarantee" dark className="py-8 text-center md:py-24">
        <Eyebrow dark>The guarantee</Eyebrow>
        {reduced ? (
          <h2 className="mx-auto mt-5 max-w-[18ch] text-3xl text-cream md:text-5xl">
            The 10 hours back, or you don&rsquo;t pay.
          </h2>
        ) : (
          <ScrollFloat
            containerClassName="mx-auto mt-5 max-w-[18ch]"
            textClassName="font-display text-3xl md:text-5xl font-extrabold tracking-[-0.04em] text-cream"
            scrollStart="center bottom+=40%"
            scrollEnd="center center"
          >
            The 10 hours back, or you don't pay.
          </ScrollFloat>
        )}
        <div className="mx-auto mt-6 max-w-[60ch] space-y-4 text-left text-cream/85">
          <p>
            Show up, do the builds with us on the day, and use the systems for 30 days. If by day 30
            you have not clawed back at least 10 hours a week, email{" "}
            <a href="mailto:info@growthcred.co.za" className="text-gold underline">
              info@growthcred.co.za
            </a>{" "}
            and we refund you in full. No hoops, no &ldquo;prove it&rdquo; runaround.
          </p>
          <p>
            The window is 30 days from your workshop date. We refund the full price within 7
            business days.
          </p>
          <p>
            We can offer this because the systems do the work. The only way you do not get the time
            back is if you never turn them on, and we spend the whole day making sure you do.
          </p>
        </div>
        <div className="mt-8 flex justify-center">
          <BuyButton className="w-full sm:w-auto" />
        </div>
      </Section>

      {/* ---------- Who runs it ---------- */}
      <Section id="host" className="py-8 md:py-24">
        <div className="grid items-center gap-10 md:grid-cols-2 md:gap-16">
          <div className="mx-auto w-full max-w-[380px]">
            {reduced ? (
              <img
                src="/images/phila-event.jpg"
                alt="Phila Ngwenya, Founder and CEO of GrowthCred"
                loading="lazy"
                className="aspect-[4/5] w-full rounded-2xl object-cover object-[center_22%]"
              />
            ) : (
              <TiltedCard
                imageSrc="/images/phila-event.jpg"
                altText="Phila Ngwenya, Founder and CEO of GrowthCred"
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
            <Eyebrow>Who runs the day</Eyebrow>
            <h2 className="mt-5 text-3xl md:text-4xl">Phila Ngwenya.</h2>
            <span className="mt-4 block font-mono text-xs uppercase tracking-[0.08em] text-gold">
              Founder &amp; CEO, GrowthCred
            </span>
            <Beat lead>
              <p className="max-w-[52ch] text-midnight">
                I help South African business owners remove the repetitive work that eats their week.
              </p>
            </Beat>
            <Beat>
              <p className="max-w-[52ch]">
                I do not just add AI tools. I build systems, in the right order, so your goals get
                met with less of your time and none of the guesswork.
              </p>
            </Beat>
            <p className="mt-4 font-mono text-xs text-midnight">
              Founder-led. Rosebank, Johannesburg. South African owned.
            </p>
          </div>
        </div>
      </Section>

      <ImageBreak
        src="/images/the-outcome.jpg"
        alt="A calmer week, in control"
        eyebrow="The other side"
        line="A business that runs while you run it."
      />

      {/* ---------- FAQ ---------- */}
      <Section className="py-8 md:py-24">
        <div className="mx-auto mb-10 max-w-[46ch] text-center">
          <Eyebrow>Questions</Eyebrow>
          <h2 className="mt-4 text-3xl md:text-5xl">Questions people actually ask.</h2>
        </div>
        <Faq
          items={[
            {
              q: "I’m not technical. Will I keep up?",
              a: "Yes. If you can use WhatsApp and a browser, you can do this. We build everything with you in the room, step by step, on your own laptop. Nobody leaves stuck.",
            },
            {
              q: "How is this different from watching AI videos on YouTube?",
              a: "YouTube teaches you what is possible. This gets it built. You leave with live systems running your actual work, not a playlist you will never finish.",
            },
            {
              q: "Will this work for my industry?",
              a: "It works because it is built around your business, not a template. Whatever you do, the systems learn your work, your clients, and your voice.",
            },
            {
              q: "Is it done for me, or do I do it myself?",
              a: "You build it, with us guiding every step. That is the point. You leave able to run and change it yourself.",
            },
            {
              q: "What do I need to bring?",
              a: "Your laptop, and the real work you want off your plate. That is it.",
            },
            {
              q: "What happens after the day?",
              a: "You go home with the systems live and a simple daily rhythm to keep them running. You also stay in the operator group.",
            },
          ]}
        />
      </Section>

      {/* ---------- Close ---------- */}
      <Section id="close" dark className="py-8 text-center md:py-24">
        <Eyebrow dark>A good first step</Eyebrow>
        <h2 className="mx-auto mt-5 max-w-[20ch] text-3xl text-cream md:text-5xl">
          Your time back <Faint dark>starts with one day.</Faint>
        </h2>
        <p className="mx-auto mt-5 max-w-[44ch] text-cream/80">
          The bill for doing nothing is already running. This is where it stops.
        </p>
        <div className="mt-8 flex justify-center">
          <BuyButton className="w-full sm:w-auto" />
        </div>
      </Section>

      {/* Sticky CTA, mobile-first conversion aid */}
      <div className="sticky bottom-0 z-40 border-t border-midnight/10 bg-paper p-3 md:hidden">
        <BuyButton className="w-full" />
      </div>
    </ClickSpark>
  );
}
