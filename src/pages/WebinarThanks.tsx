import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Section, Eyebrow } from "../components/ui";
import { ShareInvite } from "../components/ShareInvite";
import { Footer } from "../components/Layout";
import { WebinarTopBar } from "../components/webinar/Countdown";
import { BrandIcon } from "../components/BrandIcons";
import { WEBINAR, calendarUrl, outlookCalendarUrl, sessionHasPassed } from "../lib/webinar";
import { JCCI, VIP_SEATS } from "../lib/jcciWebinar";
import { loadSeat, seatFromRouter } from "../lib/seat";
import { refCode } from "../lib/referral";
import { whatsappUrl } from "../lib/contact";
import { WHOP_PLANS } from "../lib/whop";
import { track } from "../lib/analytics";

/**
 * Where a free seat lands.
 *
 * Three steps, in the order that matters: take the thing you were promised, make
 * sure you can be reminded, then bring someone with you. Everything here is real
 * and works today — the Brain Builder is a file and a live builder, the reminder
 * group is a WhatsApp link, the invite link is generated from your own email.
 *
 * It is a real route, so a reminder email can link to it. That means it can be
 * opened cold, by someone whose browser never held this registration. Everything
 * except the personal invite link works in that case; the invite block is the one
 * thing that needs the email, so it is the one thing that hides.
 */
export const BRAIN_BUILDER_PDF = "/downloads/business-brain-worksheet.pdf";

function Step({
  n,
  title,
  children,
}: {
  n: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <li className="rounded-2xl border border-midnight/10 bg-white p-6 md:p-7">
      <span className="font-mono text-[12px] uppercase tracking-[0.16em] text-gold">
        Step {n}
      </span>
      <h2 className="mt-2 font-display text-xl font-extrabold tracking-[-0.03em] text-midnight md:text-2xl">
        {title}
      </h2>
      <div className="mt-3 text-ink">{children}</div>
    </li>
  );
}

const btn =
  "mt-5 inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-gold px-6 font-body text-sm font-semibold text-midnight no-underline gc-press hover:bg-gold-soft";
const btnOutline =
  "mt-5 inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-midnight/20 px-6 font-body text-sm font-semibold text-midnight no-underline gc-press hover:border-midnight";

export default function WebinarThanks() {
  const location = useLocation();
  const seat = seatFromRouter(location.state) ?? loadSeat();
  const first = (seat?.name ?? "").trim().split(" ")[0];

  useEffect(() => track("webinar_thanks_view", { webinar: WEBINAR.slug }), []);

  return (
    <>
      <WebinarTopBar />

      <Section className="pt-10 md:pt-14">
        <Eyebrow>Your seat is saved</Eyebrow>
        <h1 className="mt-5 max-w-[24ch] text-4xl leading-[1.06] md:text-6xl">
          You’re in{first ? `, ${first}` : ""}. Here’s your head start.
        </h1>
        <p className="mt-6 max-w-[54ch] text-lg">
          {WEBINAR.dayLabel}, {WEBINAR.timeLabel}, live with {JCCI.partner} on{" "}
          {JCCI.platform}. Your joining link comes by email. Check spam if you don’t see it.
        </p>

        <ol className="mt-10 grid gap-4 lg:grid-cols-3">
          <Step n="1" title="Take your free gift now.">
            <p>
              The Brain Builder is Part 1 of my system. You teach AI your business once, so it
              never asks again. Fill in the first page before the webinar and you will get far
              more out of the hour.
            </p>
            <a
              href={BRAIN_BUILDER_PDF}
              download
              onClick={() => track("webinar_brain_claim", { via: "pdf" })}
              className={btn}
            >
              Download the Brain Builder <span aria-hidden="true">&darr;</span>
            </a>
            <p className="mt-4 text-sm text-muted">
              Would you rather fill it in on your phone?{" "}
              <Link to="/brain" onClick={() => track("webinar_brain_claim", { via: "builder" })}>
                Build it here instead
              </Link>
              .
            </p>
          </Step>

          <Step n="2" title="Join the reminder group.">
            <p>
              I send your link and your reminders on WhatsApp, so the webinar doesn’t get buried
              in your inbox on the day.
            </p>
            <a
              href={whatsappUrl(
                `Hi Phila, I have registered for the ${JCCI.partner} webinar on ${WEBINAR.shortWhen}. Please add me to the reminder group.`,
              )}
              target="_blank"
              rel="noopener"
              className={btn}
            >
              <BrandIcon name="whatsapp" /> Join on WhatsApp
            </a>
          </Step>

          <Step n="3" title="Put it in your diary.">
            <p>
              Block the hour now. It is live, and I answer questions in the room. The free gifts
              are announced at the end, so stay to the end.
            </p>
            {sessionHasPassed() ? (
              <p className="mt-5 text-sm text-muted">This session has already run.</p>
            ) : (
              <div className="flex flex-wrap gap-3">
                <a
                  href={calendarUrl()}
                  target="_blank"
                  rel="noopener"
                  onClick={() => track("webinar_calendar_add", { via: "google" })}
                  className={btnOutline}
                >
                  Google Calendar <span aria-hidden="true">&#8599;</span>
                </a>
                <a
                  href={outlookCalendarUrl()}
                  target="_blank"
                  rel="noopener"
                  onClick={() => track("webinar_calendar_add", { via: "outlook" })}
                  className={btnOutline}
                >
                  Outlook <span aria-hidden="true">&#8599;</span>
                </a>
              </div>
            )}
          </Step>
        </ol>
      </Section>

      {/* The referral ask. Needs the email to build a personal link, so it only
          appears for someone who actually registered in this browser. */}
      {seat ? (
        <Section className="pt-0">
          <div className="max-w-[720px] rounded-2xl border border-midnight/10 bg-paper p-6 md:p-8">
            <ShareInvite code={refCode(seat.email)} name={seat.name} className="border-t-0 pt-0" />
          </div>
        </Section>
      ) : null}

      {/* Last chance at a VIP seat. */}
      {sessionHasPassed() ? null : (
        <Section dark>
          <div className="max-w-[760px]">
            <Eyebrow dark>One more thing</Eyebrow>
            <h2 className="mt-5 text-3xl text-cream md:text-4xl">
              Want my eyes on your Brain Builder?
            </h2>
            <p className="mt-6 text-lg text-cream/85">
              A VIP seat is {JCCI.vipPrice}. You get a private hour with me at {JCCI.vipWindow},
              before the webinar. I go through your Brain Builder live, so you leave with it
              right. And the recording is yours. There are {VIP_SEATS} of these seats.
            </p>
            <p className="mt-4 text-cream/70">
              If the hour wasn’t worth it, email us within 7 days and we refund you in full.
            </p>
            {/* With a Whop plan, the upgrade is the real checkout on /webinar/vip,
                which reads this visit's registration and pre-fills the email.
                Without one, it falls back to asking on WhatsApp, by hand. */}
            {WHOP_PLANS.vipSeat ? (
              <Link
                to="/webinar/vip"
                className="mt-7 inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-gold px-7 font-body text-sm font-semibold text-midnight no-underline gc-press hover:bg-gold-soft"
              >
                Get my VIP seat for {JCCI.vipPrice} <span aria-hidden="true">&rarr;</span>
              </Link>
            ) : (
              <a
                href={whatsappUrl(
                  `Hi Phila, I am registered for the ${JCCI.partner} webinar on ${WEBINAR.shortWhen} and I want a VIP seat (${JCCI.vipPrice}).`,
                )}
                target="_blank"
                rel="noopener"
                onClick={() => track("webinar_vip_manual", { from: "thanks" })}
                className="mt-7 inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-gold px-7 font-body text-sm font-semibold text-midnight no-underline gc-press hover:bg-gold-soft"
              >
                <BrandIcon name="whatsapp" /> Ask me for a VIP seat
              </a>
            )}
          </div>
        </Section>
      )}

      <Footer />
    </>
  );
}
