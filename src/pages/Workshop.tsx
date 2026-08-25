import { useEffect } from "react";
import { Section, Eyebrow, H1, Faint, ButtonLink, VideoSlot, CheckList, Faq } from "../components/ui";
import { CostCalculator } from "../components/CostCalculator";
import { SevenLevels } from "../components/SevenLevels";
import { SocialSection } from "../components/SocialSection";
import { LiveDemo } from "../components/webinar/LiveDemo";
import { track } from "../lib/analytics";

/**
 * FRONT-END OFFER, the money page. Copy is finished.
 * Remaining to add: the VSL video embed (script in content/video-scripts.md),
 * and a real testimonial in the Proof block (kept empty until one exists).
 */
export default function WorkshopPage() {
  useEffect(() => track("workshop_view"), []);

  return (
    <>
      {/* ---------- Hero + VSL ---------- */}
      <Section className="pt-10 text-center md:pt-16">
        <Eyebrow>The one-day workshop</Eyebrow>
        <H1 className="mx-auto mt-5 max-w-[15ch]">
          Get 10 Hours a Week Back, <Faint>in One Day.</Faint>
        </H1>
        <p className="mx-auto mt-6 max-w-[56ch] text-lg text-ink">
          One day. You leave with the busy work already handed over, running without you.
        </p>

        <div className="mx-auto mt-10 max-w-[860px]">
          <VideoSlot slot="workshopVsl" label="workshop VSL video" />
        </div>

        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <ButtonLink to="/checkout">
            Get my time back <span aria-hidden="true">&#8599;</span>
          </ButtonLink>
          <ButtonLink to="/class" variant="outline">
            Watch the free class first
          </ButtonLink>
        </div>
        <p className="mt-4 font-mono text-xs uppercase tracking-[0.14em] text-muted">
          Get the 10 hours back, or you don&rsquo;t pay
        </p>
      </Section>

      {/* ---------- The difference, shown rather than described ----------
          The strongest thing we have: same question, same AI, one of them
          taught the business. It runs before the written argument, because
          watching it makes the rest of the page make sense. */}
      <Section className="pt-0">
        <LiveDemo />
      </Section>

      {/* ---------- The problem ---------- */}
      <Section className="pt-0">
        <div className="grid items-center gap-10 md:grid-cols-2 md:gap-16">
          <div>
            <Eyebrow>The problem</Eyebrow>
            <h2 className="mt-5 max-w-[16ch] text-3xl md:text-4xl">
              The work that runs your week is not the work that grows your business.
            </h2>
            <p className="mt-5 max-w-[54ch] text-lg font-medium text-midnight">
              Every owner starts out doing everything. It works, right up until it doesn&rsquo;t.
            </p>
            <p className="mt-4 max-w-[54ch]">
              The follow-ups. The quotes. The scheduling. The chasing. The copy-paste admin that has
              to happen but never moves you forward.
            </p>
            <p className="mt-4 max-w-[54ch]">
              You are not short on effort. You are short on hours. And the busy work has first claim
              on every one of them.
            </p>
          </div>
          <img
            src="/images/the-drain.jpg"
            alt="Buried in busy work"
            loading="lazy"
            className="aspect-[4/3] w-full rounded-2xl object-cover"
          />
        </div>
      </Section>

      {/* ---------- Cost of staying stuck (calculator) ---------- */}
      <Section className="pt-0">
        <CostCalculator />
      </Section>

      {/* ---------- What you'll climb (seven levels) ---------- */}
      <Section className="pt-0">
        <SevenLevels />
      </Section>

      {/* ---------- What you get on the day ---------- */}
      <Section className="pt-0">
        <div className="mx-auto mb-10 max-w-[46ch] text-center">
          <Eyebrow>What happens on the day</Eyebrow>
          <h2 className="mt-4 text-3xl md:text-5xl">
            You build it, <Faint>not just hear about it.</Faint>
          </h2>
          <p className="mx-auto mt-5 max-w-[54ch] text-ink">
            You walk in an operator. You walk out an owner, with the systems already running. Here is
            the day, block by block. Each one hands a chunk of your week over to a system you build
            right there in the room.
          </p>
        </div>

        <ol className="mx-auto grid max-w-[820px] gap-4">
          {[
            {
              t: "Find your 10 hours",
              b: "We start by mapping where your week actually goes. Not a vague “I’m busy”, but the real list: the tasks you repeat, the questions you answer twice, the work that only you can do because it all lives in your head. By the end of this block you can point at the exact 10 hours you are about to take back.",
              h: "the guessing. You leave this hour knowing precisely what is getting fixed.",
            },
            {
              t: "Build your business a brain",
              b: "You set up one place that holds everything about your business: how you work, who your clients are, what you sell, how you say it. From now on you never re-explain yourself to a tool again. This is the shift from “AI that forgets you” to a system that already knows your business.",
              h: "repeating yourself. The re-typing, the re-briefing, the starting from scratch.",
            },
            {
              t: "Wire the brain to a worker",
              b: "Now we connect that brain to an AI that can actually do the work. It loads your whole business the moment you open it, so every task starts with full context instead of a blank page. No prompts to craft, no background to paste in. You just say what you need.",
              h: "the setup tax you pay every single time you sit down to work.",
            },
            {
              t: "Put it to work in front of you",
              b: "This is where you feel it. You run a real task live: research, a first draft, a follow-up, whatever eats your week. What used to take an hour takes minutes, and it comes out in your voice because the system knows your business. You do this with your own work, not a demo.",
              h: "the manual grind. Research, first drafts, the busy work that never needed you.",
            },
            {
              t: "Make it work while you sleep",
              b: "You set up a routine that runs overnight, so you wake up to work already moving instead of a to-do list you have to kickstart. The system compounds: every day it starts further ahead than the last.",
              h: "the blank Monday morning. You stop being the thing that has to start everything.",
            },
            {
              t: "Lock in the rhythm",
              b: "We finish by turning all of it into a simple daily rhythm you can actually keep. You leave with the systems live, not a folder of notes and good intentions. This is the part most training skips, and it is the reason this one sticks.",
              h: "the risk of going home and never using it.",
            },
          ].map((blk, i) => (
            <li
              key={i}
              className="rounded-2xl border border-midnight/10 bg-white p-6 md:p-8"
            >
              <div className="flex items-baseline gap-4">
                <span className="font-mono text-sm text-gold">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="text-xl md:text-2xl">
                    Block {i + 1}: {blk.t}
                  </h3>
                  <p className="mt-3 max-w-[62ch] text-ink">{blk.b}</p>
                  <p className="mt-4 border-l-2 border-gold pl-3 text-sm text-midnight">
                    <span className="font-semibold">You hand over:</span> {blk.h}
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ol>

        <p className="mx-auto mt-8 max-w-[54ch] text-center text-lg font-medium text-midnight">
          By the end of the day the systems are built, running, and yours. The 10 hours are not a
          promise for later. They start the same week.
        </p>
      </Section>

      {/* ---------- Offer stack ---------- */}
      <Section className="pt-0">
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
            "The workbook you build in, so you go home with everything documented, not half-remembered",
            "A room of other operators making the same shift, and the group that keeps going after the day ends",
          ]}
        />
        <p className="mx-auto mt-8 max-w-[46ch] text-center text-lg font-medium text-midnight">
          You do not leave with theory. You leave with the machine running.
        </p>
      </Section>

      {/* ---------- Guarantee (locked) ---------- */}
      <Section dark className="text-center">
        <Eyebrow dark>The guarantee</Eyebrow>
        <h2 className="mx-auto mt-5 max-w-[18ch] text-3xl text-cream md:text-5xl">
          The 10 hours back, <Faint dark>or you don&rsquo;t pay.</Faint>
        </h2>
        <div className="mx-auto mt-6 max-w-[60ch] space-y-4 text-left text-cream/85">
          <p>Here is exactly what that means.</p>
          <p>
            Show up, do the builds with us on the day, and use the systems for 30 days. If by day 30
            you have not clawed back at least 10 hours a week, email us at{" "}
            <a href="mailto:info@growthcred.co.za" className="text-gold underline">
              info@growthcred.co.za
            </a>{" "}
            and we refund you in full. No hoops, no “prove it” runaround.
          </p>
          <p>
            The window is 30 days from the date of your workshop. To claim, email
            info@growthcred.co.za before day 30 with your name and workshop date, and confirmation
            that you completed the builds on the day. We refund the full workshop price within 7
            business days.
          </p>
          <p>
            We can offer this because the systems do the work. The only way you do not get the time
            back is if you never turn them on, and we spend the whole day making sure you do.
          </p>
        </div>
        <div className="mt-8">
          <ButtonLink to="/checkout">
            Get my time back <span aria-hidden="true">&#8599;</span>
          </ButtonLink>
        </div>
      </Section>

      {/* ---------- Proof ----------
          Intentionally empty until there is a real, named result shared with the
          person's written permission. When you have one, restore this block:

          <Section>
            <div className="mx-auto mb-10 max-w-[46ch] text-center">
              <Eyebrow>Proof</Eyebrow>
              <h2 className="mt-4 text-3xl md:text-5xl">It works for people like you.</h2>
            </div>
            ...real testimonial(s) here...
          </Section>
      */}

      {/* ---------- Who runs it ---------- */}
      <Section className="pt-0">
        <div className="grid items-center gap-10 md:grid-cols-2 md:gap-16">
          <img
            src="/images/phila-event.jpg"
            alt="Phila Ngwenya, Founder and CEO of GrowthCred"
            loading="lazy"
            className="aspect-[4/5] w-full rounded-2xl object-cover object-[center_22%]"
          />
          <div>
            <Eyebrow>Who runs the day</Eyebrow>
            <h2 className="mt-5 text-3xl md:text-4xl">Phila Ngwenya.</h2>
            <span className="mt-4 block font-mono text-xs uppercase tracking-[0.08em] text-gold">
              Founder &amp; CEO, GrowthCred
            </span>
            <p className="mt-5 max-w-[52ch]">
              I help South African business owners remove the repetitive work that eats their week. I
              do not just add AI tools. I build systems, in the right order, so your goals get met
              with less of your time and none of the guesswork.
            </p>
            <p className="mt-4 font-mono text-xs text-midnight">
              Founder-led. Rosebank, Johannesburg. South African owned.
            </p>
          </div>
        </div>
      </Section>

      {/* ---------- Life after ---------- */}
      <Section className="pt-0">
        <div className="grid items-center gap-10 md:grid-cols-2 md:gap-16">
          <div className="md:order-2">
            <img
              src="/images/the-outcome.jpg"
              alt="A calmer week, in control"
              loading="lazy"
              className="aspect-[4/3] w-full rounded-2xl object-cover"
            />
          </div>
          <div>
            <Eyebrow>The other side</Eyebrow>
            <h2 className="mt-5 max-w-[16ch] text-3xl md:text-4xl">
              A business that runs while you run it.
            </h2>
            <p className="mt-5 max-w-[54ch] text-lg font-medium text-midnight">
              Picture the week where the follow-ups send themselves, the admin handles itself, and
              your calendar has ten hours in it that used to belong to busy work.
            </p>
            <p className="mt-4 max-w-[54ch]">
              You are setting direction. Chasing the deal. Building the thing only you can build.
              Taking the afternoon.
            </p>
          </div>
        </div>
      </Section>

      {/* ---------- FAQ ---------- */}
      <Section className="pt-0">
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
              a: "It works because it is built around your business, not a template. Whatever you do, the systems learn your work, your clients, and your voice. We have had it done across very different businesses in the same room.",
            },
            {
              q: "Is it done for me, or do I do it myself?",
              a: "You build it, with us guiding every step. That is the point. You leave able to run and change it yourself, instead of depending on someone else every time something needs adjusting.",
            },
            {
              q: "What do I need to bring?",
              a: "Your laptop, and the real work you want off your plate. That is it. Come with the tasks you are sick of doing and we will hand them over on the day.",
            },
            {
              q: "What happens after the day?",
              a: "You go home with the systems live and a simple daily rhythm to keep them running. You also stay in the operator group, so you are not on your own when a question comes up.",
            },
            {
              q: "What if I fall behind on the day?",
              a: "You will not be left behind. We move together, block by block, and there is help in the room the whole time. If a build takes you longer, we make sure you leave with it done.",
            },
            {
              q: "Why should I pay for this when AI tools are cheap?",
              a: "The tools are cheap. Knowing how to make them run your business without you is the expensive part, and it is the only part that gives you your time back. That is what you are paying for.",
            },
          ]}
        />
      </Section>

      {/* ---------- Close ---------- */}
      <Section dark className="text-center">
        <Eyebrow dark>A good first step</Eyebrow>
        <h2 className="mx-auto mt-5 max-w-[20ch] text-3xl text-cream md:text-5xl">
          Your time back <Faint dark>starts with one day.</Faint>
        </h2>
        <p className="mx-auto mt-5 max-w-[44ch] text-cream/80">
          The bill for doing nothing is already running. This is where it stops.
        </p>
        <div className="mt-8">
          <ButtonLink to="/checkout">
            Get my time back <span aria-hidden="true">&#8599;</span>
          </ButtonLink>
        </div>
      </Section>

      {/* Insights & Content: the big YouTube / LinkedIn cards */}
      <SocialSection />

      {/* Sticky CTA, mobile-first conversion aid */}
      <div className="sticky bottom-0 z-40 border-t border-midnight/10 bg-paper/95 p-3 backdrop-blur md:hidden">
        <ButtonLink to="/checkout" className="w-full">
          Get my time back <span aria-hidden="true">&#8599;</span>
        </ButtonLink>
      </div>
    </>
  );
}
