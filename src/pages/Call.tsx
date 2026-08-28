import { useEffect } from "react";
import { Section, Eyebrow, H1, Faint, CheckList } from "../components/ui";
import { ApplicationForm } from "../components/ApplicationForm";
import { track } from "../lib/analytics";

/**
 * BACKEND OFFER. Locked headline: "We Take It All Off Your Plate"
 * Booked on a call, not bought in a cart, and the call is EARNED through a
 * thoughtful application rather than a bare "name + email + book" form.
 */
export default function CallPage() {
  useEffect(() => track("call_view"), []);
  const scheduler = import.meta.env.VITE_SCHEDULER_URL;

  return (
    <>
      <Section className="pt-10 text-center md:pt-16">
        <Eyebrow>Done for you</Eyebrow>
        <H1 className="mx-auto mt-5 max-w-[16ch]">
          We Take It All <Faint>Off Your Plate.</Faint>
        </H1>
        <p className="mx-auto mt-6 max-w-[54ch] text-lg text-ink">
          You do not build it, learn it, or run it. We map it, build it, and run it with your team,
          so the time comes back without you lifting a finger.
        </p>
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
            The fit, the scope, and what it costs, we work out on the call. Apply below and let us
            see if this is right for you.
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

      {/* Application: the form begins the relationship before the call */}
      <Section className="pt-0">
        <div className="mx-auto max-w-[820px]">
          <div className="mb-8 text-center">
            <Eyebrow>Book a time</Eyebrow>
            <h2 className="mt-4 text-3xl md:text-4xl">
              Apply first. <Faint>Then we talk.</Faint>
            </h2>
            <p className="mx-auto mt-4 max-w-[52ch] text-ink">
              We only take on a handful of these at a time, so we start with a short application
              rather than a booking link. Tell us where you are, and the call is useful from minute
              one. If we are not the right fit, we will say so and point you somewhere better.
            </p>
          </div>

          {/* No VITE_SCHEDULER_URL set? The form falls back to booking over
              WhatsApp on its own, so there is nothing to say here. */}
          <ApplicationForm schedulerUrl={scheduler} />
        </div>
      </Section>
    </>
  );
}
