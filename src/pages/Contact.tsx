import { useEffect } from "react";
import { Section, Eyebrow, H1, Faint } from "../components/ui";
import { ContactForm } from "../components/ContactForm";
import { track } from "../lib/analytics";
import { WHATSAPP_DISPLAY, whatsappUrl } from "../lib/contact";

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
      <Section className="pt-10 text-center md:pt-16">
        <Eyebrow>Contact</Eyebrow>
        <H1 className="mx-auto mt-5 max-w-[18ch]">
          Talk to a real person. <Faint>Get a real reply.</Faint>
        </H1>
        <p className="mx-auto mt-6 max-w-[54ch] text-lg text-ink">
          Questions about the workshop, the free class, or whether the Done For You is a fit — send
          it here. We’ll respond using the contact details you provide. You can also reach us directly on WhatsApp or email.
        </p>
      </Section>

      <Section className="pt-0">
        <div className="mx-auto max-w-[620px]">
          <ContactForm id="contact-form" />
        </div>
      </Section>

      <Section className="pt-0">
        <div className="mx-auto grid max-w-[820px] gap-4 md:grid-cols-2">
          <a
            href={whatsappUrl(
              "Hi Phila, I have a question about GrowthCred.",
            )}
            target="_blank"
            rel="noopener"
            className="rounded-2xl border border-midnight/10 bg-white p-6 no-underline transition hover:border-gold md:p-8"
          >
            <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted">Fastest</p>
            <h2 className="mt-2 text-xl text-midnight">WhatsApp {WHATSAPP_DISPLAY}</h2>
            <p className="mt-3 text-ink">
              Good for quick questions and anything urgent. Usually answered the same working day.
            </p>
            <p className="mt-4 font-body text-sm font-semibold text-gold">
              Open WhatsApp <span aria-hidden="true">&#8599;</span>
            </p>
          </a>
          <a
            href="mailto:info@growthcred.co.za"
            className="rounded-2xl border border-midnight/10 bg-white p-6 no-underline transition hover:border-gold md:p-8"
          >
            <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted">
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
    </>
  );
}
