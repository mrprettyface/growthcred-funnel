import { useEffect } from "react";
import { Section, Eyebrow, H1, Faint } from "../components/ui";
import { ContactForm } from "../components/ContactForm";
import { track } from "../lib/analytics";
import { IMESSAGE_DISPLAY, IMESSAGE_NUMBER, LINKEDIN_URL, WHATSAPP_DISPLAY, whatsappUrl } from "../lib/contact";
import { BrandIcon } from "../components/BrandIcons";

/**
 * /contact — the front door for anything that is not a funnel step. The form
 * auto-responds by email the moment it is submitted (see
 * supabase/functions/contact-autoresponder), and the direct channels below it
 * stay for people who would rather just talk.
 */
export default function ContactPage() {
  useEffect(() => track("contact_view"), []);

  return (
    <>
      <Section className="pb-8 pt-10 text-center md:pb-10 md:pt-16">
        <Eyebrow>Contact</Eyebrow>
        <H1 className="mx-auto mt-5 max-w-[18ch]">
          Talk to a real person. <Faint>Get a real reply.</Faint>
        </H1>
        <p className="mx-auto mt-6 max-w-[54ch] text-lg text-ink">
          Questions about the workshop, the free class, or whether the Done For You is a fit — send
          it here. We’ll respond using the contact details you provide. Or reach us directly on WhatsApp, iMessage, LinkedIn or email.
        </p>
      </Section>


      <Section className="pb-6 pt-0 md:pb-8">
        <div className="mx-auto grid max-w-[620px] gap-4">
          <a
            href={whatsappUrl(
              "Hi GrowthCred, I have a question and would like to speak to a specialist.",
            )}
            target="_blank"
            rel="noopener"
            className="rounded-2xl border border-midnight/10 bg-white p-6 no-underline transition hover:border-gold md:p-8"
          >
            <BrandIcon name="whatsapp" className="h-9 w-9" />
            <p className="mt-4 font-mono text-[12px] uppercase tracking-[0.14em] text-muted">Fastest</p>
            <h2 className="mt-2 text-xl text-midnight">WhatsApp {WHATSAPP_DISPLAY}</h2>
            <p className="mt-3 text-ink">
              Good for quick questions and anything urgent. Usually answered the same working day.
            </p>
            <p className="mt-4 font-body text-sm font-semibold text-gold">
              Open WhatsApp <span aria-hidden="true">&#8599;</span>
            </p>
          </a>
          <a
            href={`sms:+${IMESSAGE_NUMBER}`}
            className="rounded-2xl border border-midnight/10 bg-white p-6 no-underline transition hover:border-gold md:p-8"
          >
            <BrandIcon name="imessage" className="h-9 w-9" />
            <p className="mt-4 font-mono text-[12px] uppercase tracking-[0.14em] text-muted">Not on WhatsApp?</p>
            <h2 className="mt-2 text-xl text-midnight">iMessage {IMESSAGE_DISPLAY}</h2>
            <p className="mt-3 text-ink">iMessage from an iPhone or Mac, or a plain text message from any phone.</p>
            <p className="mt-4 font-body text-sm font-semibold text-gold">
              Send a message <span aria-hidden="true">&#8599;</span>
            </p>
          </a>
          <a
            href={LINKEDIN_URL}
            target="_blank"
            rel="noopener"
            className="rounded-2xl border border-midnight/10 bg-white p-6 no-underline transition hover:border-gold md:p-8"
          >
            <BrandIcon name="linkedin" className="h-9 w-9" />
            <p className="mt-4 font-mono text-[12px] uppercase tracking-[0.14em] text-muted">On LinkedIn</p>
            <h2 className="mt-2 text-xl text-midnight">Message us on LinkedIn</h2>
            <p className="mt-3 text-ink">Open the profile and tap Message. Useful if you would rather keep it professional.</p>
            <p className="mt-4 font-body text-sm font-semibold text-gold">
              Open LinkedIn <span aria-hidden="true">&#8599;</span>
            </p>
          </a>
          <a
            href="mailto:info@growthcred.co.za"
            className="rounded-2xl border border-midnight/10 bg-white p-6 no-underline transition hover:border-gold md:p-8"
          >
            <BrandIcon name="email" className="h-9 w-9 text-midnight" />
            <p className="mt-4 font-mono text-[12px] uppercase tracking-[0.14em] text-muted">
              Prefer email?
            </p>
            <h2 className="mt-2 text-xl text-midnight">info@growthcred.co.za</h2>
            <p className="mt-3 text-ink">
              Write to us directly and it lands in the same inbox — you will still get a reply within
              one business day.
            </p>
            <p className="mt-4 font-body text-sm font-semibold text-gold">
              Write an email <span aria-hidden="true">&#8599;</span>
            </p>
          </a>
        </div>
      </Section>

      <Section className="pt-0">
        <div className="mx-auto max-w-[620px]">
          <ContactForm id="contact-form" />
        </div>
      </Section>
    </>
  );
}
