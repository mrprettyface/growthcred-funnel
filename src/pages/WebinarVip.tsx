import { lazy, Suspense, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Section, Eyebrow, ToComeBlock } from "../components/ui";
import { ShareInvite } from "../components/ShareInvite";
import { Footer } from "../components/Layout";
import { WebinarTopBar } from "../components/webinar/Countdown";
import { BrandIcon } from "../components/BrandIcons";
import { BRAIN_BUILDER_PDF } from "./WebinarThanks";
import { WEBINAR, calendarUrl, outlookCalendarUrl, sessionHasPassed } from "../lib/webinar";
import { JCCI, VIP_SEATS } from "../lib/jcciWebinar";
import { VIP_SEAT } from "../lib/offers";
import { WHOP_PLANS } from "../lib/whop";
import { readWhopReturn, claimPayment } from "../lib/whopReturn";
import { loadSeat, seatFromRouter } from "../lib/seat";
import { refCode } from "../lib/referral";
import { whatsappUrl, WHATSAPP_DISPLAY } from "../lib/contact";
import { track } from "../lib/analytics";

/** Checkout carries the Whop SDK, so it only arrives if there is a plan to pay for. */
const WhopPay = lazy(() => import("../components/WhopPay").then((m) => ({ default: m.WhopPay })));

/**
 * Where a VIP seat lands.
 *
 * The webinar seat is already saved by the time anyone reaches this page: the
 * form writes the row before it asks for money, so a VIP who never pays is
 * still registered and still reachable. This page is only about the VIP hour.
 *
 * There is no Whop plan for the VIP seat yet (WHOP_PLANS.vipSeat is null). So
 * this page does NOT render a checkout it cannot charge, and it does not tell
 * anyone they are paid up. It says plainly what is saved, what is not, and
 * offers the one thing that genuinely works today: asking Phila for a seat on
 * WhatsApp, which he honours by hand. Paste a plan id into whop.ts and the real
 * checkout takes over without another line of work here.
 */
export default function WebinarVip() {
  const location = useLocation();
  const seat = seatFromRouter(location.state) ?? loadSeat();
  const first = (seat?.name ?? "").trim().split(" ")[0];
  const planId = WHOP_PLANS.vipSeat;
  const [paid, setPaid] = useState(false);

  /*
   * The Whop checkout runs only in the browser. This page is prerendered on the
   * server (scripts/prerender.mjs renders every route not in its `interactive`
   * set), and the Whop SDK expects a window, so rendering it there would break
   * the build or ship a half-mounted frame. The site's own checkout pages dodge
   * this by not prerendering at all; this page keeps its prerendered text and
   * mounts the checkout once it is in the browser instead. Server and first
   * client render both show the loading line, so they agree.
   */
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  useEffect(() => track("webinar_vip_view", { webinar: WEBINAR.slug }), []);

  /* Coming back from Whop's hosted step. This only decides what we SAY: the
     webhook and Whop's dashboard settle who has actually paid. */
  useEffect(() => {
    const back = readWhopReturn(new URLSearchParams(location.search), "vip-seat");
    if (back?.status === "succeeded" && claimPayment(back.paymentId)) setPaid(true);
  }, [location.search]);

  const askForSeat = whatsappUrl(
    `Hi Phila, I am registered for the ${JCCI.partner} webinar on ${WEBINAR.shortWhen} and I want one of the ${VIP_SEATS} VIP seats (${JCCI.vipPrice}). How do I pay?`,
  );

  return (
    <>
      <WebinarTopBar />

      <Section className="pt-10 md:pt-14">
        <Eyebrow>VIP seat</Eyebrow>
        <h1 className="mt-5 max-w-[26ch] text-4xl leading-[1.06] md:text-6xl">
          {paid
            ? `You’re a VIP${first ? `, ${first}` : ""}. See you at ${JCCI.vipWindow}.`
            : `Your webinar seat is saved${first ? `, ${first}` : ""}.`}
        </h1>
        <p className="mt-6 max-w-[56ch] text-lg">
          {paid
            ? `The private hour runs ${JCCI.vipWindow} on ${WEBINAR.shortWhen}, before the main session at ${WEBINAR.timeLabel}. Bring your Brain Builder and I will go through it with you live.`
            : `You are registered for ${WEBINAR.dayLabel} at ${WEBINAR.timeLabel}, and your joining link comes by email. The VIP hour is the one thing still to sort out.`}
        </p>
      </Section>

      {/* ---------------- The VIP hour: pay for it, or ask for it ---------------- */}
      {paid || sessionHasPassed() ? null : (
        <Section className="pt-0">
          <div className="max-w-[760px] rounded-2xl border-2 border-gold/50 bg-gold/[0.06] p-6 md:p-8">
            <p className="font-mono text-[12px] uppercase tracking-[0.16em] text-gold-soft md:text-[11px]">
              {VIP_SEATS} seats only &middot; {JCCI.vipPrice}
            </p>
            <h2 className="mt-3 text-2xl text-midnight md:text-3xl">
              A private hour with me, before the room fills up.
            </h2>
            <ul className="mt-5 space-y-3">
              {[
                `We talk ${JCCI.vipWindow}, just before the webinar. Ask me anything about AI in your business.`,
                "I review your Brain Builder live, so you leave with it right.",
                "You get the full recording.",
              ].map((line) => (
                <li key={line} className="flex gap-3 text-ink">
                  <span aria-hidden="true" className="mt-0.5 font-mono text-gold">
                    &#10003;
                  </span>
                  <span>{line}</span>
                </li>
              ))}
            </ul>
            <p className="mt-5 text-sm leading-relaxed text-muted">
              If the hour wasn’t worth it, email us within 7 days and we refund you in full.
            </p>

            {planId && mounted ? (
              <div className="mt-7">
                <Suspense
                  fallback={
                    <p className="font-mono text-[12px] uppercase tracking-[0.16em] text-muted">
                      Loading secure checkout&hellip;
                    </p>
                  }
                >
                  <WhopPay
                    planId={planId}
                    email={seat?.email}
                    offer="vip-seat"
                    returnPath="/webinar/vip"
                    onPaid={(paymentId) => {
                      if (claimPayment(paymentId)) setPaid(true);
                    }}
                  />
                </Suspense>
              </div>
            ) : planId ? (
              <p className="mt-7 font-mono text-[12px] uppercase tracking-[0.16em] text-muted">
                Loading secure checkout&hellip;
              </p>
            ) : (
              <div className="mt-7">
                <ToComeBlock
                  label={`the ${VIP_SEAT.name} checkout`}
                  note={`The Whop plan for ${JCCI.vipPrice} is not set up yet, so nothing can be charged on this page. Message me and I will take your seat myself.`}
                />
                <a
                  href={askForSeat}
                  target="_blank"
                  rel="noopener"
                  onClick={() => track("webinar_vip_manual", { from: "vip_page" })}
                  className="mt-5 inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-gold px-7 font-body text-sm font-semibold text-midnight no-underline transition hover:bg-gold-soft"
                >
                  <BrandIcon name="whatsapp" /> Claim my VIP seat on WhatsApp
                </a>
                <p className="mt-4 text-sm text-muted">
                  Or message {WHATSAPP_DISPLAY}. Your webinar seat is saved either way.
                </p>
              </div>
            )}
          </div>
        </Section>
      )}

      {/* ---------------- Before the VIP hour ---------------- */}
      <Section dark>
        <Eyebrow dark>Before we talk</Eyebrow>
        <h2 className="mt-5 text-3xl text-cream md:text-4xl">Fill in your Brain Builder.</h2>
        <p className="mt-6 max-w-[54ch] text-lg text-cream/85">
          This is the hour’s homework, and it is the whole point. Fill it in and I review it with
          you live. Arrive without it and we spend the hour writing it instead.
        </p>
        <div className="mt-7 flex flex-wrap gap-3">
          <a
            href={BRAIN_BUILDER_PDF}
            download
            onClick={() => track("webinar_brain_claim", { via: "pdf_vip" })}
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-gold px-6 font-body text-sm font-semibold text-midnight no-underline transition hover:bg-gold-soft"
          >
            Download the Brain Builder <span aria-hidden="true">&darr;</span>
          </a>
          <Link
            to="/brain"
            onClick={() => track("webinar_brain_claim", { via: "builder_vip" })}
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-cream/25 px-6 font-body text-sm font-semibold text-cream no-underline transition hover:border-cream"
          >
            Build it on my phone <span aria-hidden="true">&#8599;</span>
          </Link>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          <div className="rounded-2xl border border-cream/15 p-6">
            <h3 className="font-display text-lg font-extrabold tracking-[-0.03em] text-cream">
              Your VIP joining link
            </h3>
            <p className="mt-3 text-cream/75">
              I send it to you directly once your seat is confirmed, with the reminder for the
              {" "}
              {JCCI.vipWindow} start.
            </p>
            <a
              href={whatsappUrl(
                `Hi Phila, please send me the VIP joining link for ${WEBINAR.shortWhen}.`,
              )}
              target="_blank"
              rel="noopener"
              className="mt-5 inline-flex items-center gap-2 font-body text-sm font-semibold text-gold no-underline hover:underline"
            >
              <BrandIcon name="whatsapp" /> Ask me for it
            </a>
          </div>
          <div className="rounded-2xl border border-cream/15 p-6">
            <h3 className="font-display text-lg font-extrabold tracking-[-0.03em] text-cream">
              Put it in your diary
            </h3>
            <p className="mt-3 text-cream/75">
              This adds the main session. The VIP hour starts {JCCI.vipWindow}, ninety minutes
              before it.
            </p>
            {sessionHasPassed() ? (
              <p className="mt-5 text-sm text-cream/60">This session has already run.</p>
            ) : (
              <div className="mt-5 flex flex-wrap gap-3">
                <a
                  href={calendarUrl()}
                  target="_blank"
                  rel="noopener"
                  onClick={() => track("webinar_calendar_add", { via: "google_vip" })}
                  className="inline-flex min-h-11 items-center justify-center rounded-full border border-cream/25 px-5 font-body text-sm font-semibold text-cream no-underline transition hover:border-cream"
                >
                  Google
                </a>
                <a
                  href={outlookCalendarUrl()}
                  target="_blank"
                  rel="noopener"
                  onClick={() => track("webinar_calendar_add", { via: "outlook_vip" })}
                  className="inline-flex min-h-11 items-center justify-center rounded-full border border-cream/25 px-5 font-body text-sm font-semibold text-cream no-underline transition hover:border-cream"
                >
                  Outlook
                </a>
              </div>
            )}
          </div>
        </div>
      </Section>

      {seat ? (
        <Section>
          <div className="max-w-[720px] rounded-2xl border border-midnight/10 bg-paper p-6 md:p-8">
            <ShareInvite code={refCode(seat.email)} name={seat.name} className="border-t-0 pt-0" />
          </div>
        </Section>
      ) : null}

      <Footer />
    </>
  );
}
