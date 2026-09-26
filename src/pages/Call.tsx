import { useEffect } from "react";
import { Section, Eyebrow, H1, Faint, CheckList } from "../components/ui";
import { ApplicationForm } from "../components/ApplicationForm";
import { track } from "../lib/analytics";

/**
 * BACKEND OFFER. Locked headline: "We Take It All Off Your Plate"
 * Booked on a call, not bought in a cart. The form sits first and asks for
 * three things, because every extra step loses someone who was ready: the
 * qualifying questions are asked on the call (see ApplicationForm).
 */
export default function CallPage() {
  useEffect(() => track("call_view"), []);
  const scheduler = import.meta.env.VITE_SCHEDULER_URL;

  return (
    <>
      {/* The form first: whoever clicked "Apply" is ready now, so nothing
          stands between them and sending it. The detail follows below. */}
      <Section className="pt-8 md:pt-14">
        <div className="mx-auto grid max-w-[1040px] items-start gap-8 lg:grid-cols-[1fr_440px] lg:gap-14">
          <div className="text-center lg:pt-6 lg:text-left">
            <Eyebrow>Done for you</Eyebrow>
            <H1 className="mx-auto mt-4 max-w-[16ch] text-[length:clamp(2.25rem,6vw,4.5rem)] lg:mx-0">
              We Take It All <Faint>Off Your Plate.</Faint>
            </H1>
            <p className="mx-auto mt-5 max-w-[46ch] text-lg text-ink lg:mx-0">
              Leave your number. We'll talk to you today, not next week.
            </p>
            <p className="mx-auto mt-4 hidden max-w-[50ch] text-ink lg:mx-0 lg:block">
              You do not build it, learn it, or run it. We map it, build it, and run it with your team,
              so the time comes back without you lifting a finger.
            </p>
          </div>
          <ApplicationForm schedulerUrl={scheduler} />
        </div>
      </Section>

      {/* 5.2 What the engagement includes */}
      <Section className="pt-0">
        <div className="mx-auto max-w-[760px] rounded-2xl bg-midnight p-6 text-cream md:p-9">
          <Eyebrow dark>The engagement</Eyebrow>
          <h2 className="mt-4 text-2xl text-cream md:text-3xl">We take it all off your plate.</h2>
          <p className="mt-4 text-cream/85">
            We build, wire, and hand over the systems that run your business without you. Your brain,
            your workers, your overnight routines, done for you and tuned to how you actually
            operate. You stay in your business as the owner, not the operator.
          </p>
          <p className="mt-4 text-cream/85">
            What we are accountable to is simple: your time back, measured. We agree the hours we are
            freeing up before we start, and we are on the hook for them. This is not a project we
            hand over and disappear from. It is an outcome we own with you.
          </p>
          <p className="mt-4 text-cream/85">
            The fit, the scope, and what it costs, we work out on the call. Leave your number above
            and let us see if this is right for you.
          </p>
        </div>
      </Section>

      {/* 5.1 Who this is for, and who it is not for */}
      <Section className="pt-0">
        <div className="mx-auto grid max-w-[820px] gap-4 md:grid-cols-2">
          <div className="rounded-2xl border border-midnight/10 bg-white p-6 md:p-8">
            <h3 className="text-xl">This is for you if</h3>
            <CheckList
              className="mt-5"
              items={[
                "You are the bottleneck, and the business slows down every time you step away",
                "You already have clients and revenue, you just cannot buy back your own time",
                "You want the systems built and handed over, not a course to work through",
                "You are ready to move now, not “sometime next quarter”",
              ]}
            />
          </div>
          <div className="rounded-2xl border border-midnight/10 bg-midnight/[0.03] p-6 md:p-8">
            <h3 className="text-xl">This is not for you if</h3>
            <ul className="mt-5 grid gap-3">
              {[
                "You are looking for a magic button that needs nothing from you",
                "You have no business yet, and no work to hand over",
                "You want the cheapest option, price first, result second",
              ].map((t, i) => (
                <li key={i} className="relative pl-7 leading-relaxed text-ink">
                  <span aria-hidden="true" className="absolute left-0 top-[0.05em] text-muted">
                    &times;
                  </span>
                  {t}
                </li>
              ))}
            </ul>
            <p className="mt-6 text-sm text-muted">
              We would rather tell you now if this is not a fit than take a call that wastes your
              time.
            </p>
          </div>
        </div>
      </Section>

    </>
  );
}
