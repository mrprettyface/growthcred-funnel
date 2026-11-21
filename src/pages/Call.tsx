import { useEffect } from "react";
import { CheckList } from "../components/ui";
import { Bento, Sticker, Tile } from "../components/bento";
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
    <div className="bg-paper">
      {/* ---- Bento (22 Nov 2026): the same words and the same form, laid out
          like the homepage. The form still sits first on the right, so whoever
          clicked "Apply" can send it without scrolling. ---- */}
      <section className="mx-auto w-[min(1240px,calc(100%-1.5rem))] pb-6 pt-5 md:pt-8">
        <Bento>
          <Tile tone="gold" className="flex flex-col justify-center overflow-visible text-center lg:col-span-7 lg:px-12 lg:py-14 lg:text-left">
            <Sticker i={0} tone="night" shape="circle" className="-top-5 right-4 hidden rotate-[10deg] sm:block lg:-right-3" chipClassName="h-24 w-24 text-base">
              Today, not next week
            </Sticker>
            <p className="font-mono text-[12px] uppercase tracking-[0.22em] text-midnight/70">The Command Core</p>
            <h1 className="mx-auto mt-4 max-w-[14ch] text-[length:clamp(2.25rem,5.4vw,4.5rem)] leading-[1.1] text-midnight lg:mx-0">
              We Take It All{" "}
              <span className="rounded-[0.5rem] bg-white px-[0.18em] [-webkit-box-decoration-break:clone] [box-decoration-break:clone]">
                Off Your Plate.
              </span>
            </h1>
            <p className="mx-auto mt-6 max-w-[46ch] text-lg text-midnight/85 lg:mx-0">
              Let us help you own your intelligence. Leave your number. We'll talk to you today, not next week.
            </p>
            <p className="mx-auto mt-4 hidden max-w-[50ch] text-midnight/75 lg:mx-0 lg:block">
              You do not build it, learn it, or run it. We map it, build it, and run it with your team,
              so the time comes back without you lifting a finger.
            </p>
          </Tile>
          <div className="min-w-0 lg:col-span-5 [&>div]:rounded-[2rem] [&>form]:h-full [&>form]:rounded-[2rem] [&>form]:shadow-none">
            <ApplicationForm schedulerUrl={scheduler} />
          </div>

          {/* What the engagement includes */}
          <Tile tone="night" className="flex flex-col lg:col-span-7 lg:row-span-2 lg:p-12">
            <p className="font-mono text-[12px] uppercase tracking-[0.22em] text-gold">The engagement</p>
            <h2 className="mt-4 text-3xl text-cream md:text-4xl">We take it all off your plate.</h2>
            <p className="mt-5 leading-relaxed text-cream/80">
              We build, wire, and hand over the systems that run your business without you. Your brain,
              your workers, your overnight routines, done for you and tuned to how you actually
              operate. You stay in your business as the owner, not the operator.
            </p>
            <p className="mt-4 leading-relaxed text-cream/80">
              What we are accountable to is simple: your time back, measured. We agree the hours we are
              freeing up before we start, and we are on the hook for them. This is not a project we
              hand over and disappear from. It is an outcome we own with you.
            </p>
            <div aria-hidden="true" className="hidden min-h-6 flex-1 lg:block" />
            <p className="mt-6 rounded-[1.5rem] bg-gold-soft p-6 font-medium leading-relaxed text-midnight lg:mt-auto">
              The fit, the scope, and what it costs, we work out on the call. Leave your number above
              and let us see if this is right for you.
            </p>
          </Tile>

          {/* Who this is for, and who it is not for */}
          <Tile tone="white" className="lg:col-span-5">
            <h3 className="text-xl text-midnight">This is for you if</h3>
            <CheckList
              className="mt-5"
              items={[
                "You are the bottleneck, and the business slows down every time you step away",
                "You already have clients and revenue, you just cannot buy back your own time",
                "You want the systems built and handed over, not a course to work through",
                "You are ready to move now, not “sometime next quarter”",
              ]}
            />
          </Tile>
          <Tile tone="dashed" className="lg:col-span-5">
            <h3 className="text-xl text-midnight">This is not for you if</h3>
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
          </Tile>
        </Bento>
      </section>
      <div className="h-12 md:h-20" />
    </div>
  );
}
