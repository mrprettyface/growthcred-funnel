import { Section, Eyebrow, H1 } from "../../components/ui";

/**
 * First draft, POPIA-aligned. Have a South African lawyer review before
 * publishing. Fill [DATE] and [NAME] (information officer) with real details.
 */
export default function Privacy() {
  return (
    <Section className="pt-10 md:pt-14">
      <div className="mx-auto max-w-[720px]">
        <Eyebrow>Legal</Eyebrow>
        <H1 className="mt-5 text-3xl md:text-5xl">Privacy policy</H1>
        <p className="mt-4 font-mono text-xs text-muted">Last updated: [DATE]</p>

        <div className="mt-8 space-y-4 text-ink">
          <p>
            This policy explains how GrowthCred (Pty) Ltd collects and uses your personal
            information. It is aligned with the Protection of Personal Information Act (POPIA).
          </p>
          <p>
            <strong>Who is responsible.</strong> GrowthCred (Pty) Ltd, registration number
            2026/229279/07, Rosebank, Johannesburg. Information officer: [NAME], info@growthcred.co.za.
          </p>
          <p>
            <strong>What we collect.</strong> Through the forms on this site, we may collect: your
            name, email address, phone number, and any details you enter on the free class opt-in,
            the workshop checkout, and the application form on our booking page. Our payment provider
            processes your payment details directly. We do not store your card number.
          </p>
          <p>
            <strong>Why we collect it.</strong> To give you access to what you sign up for or buy,
            to contact you about it, to provide support, and to send you related information you have
            agreed to receive. We process your information on the basis of your consent and to fulfil
            our agreement with you.
          </p>
          <p>
            <strong>Who we share it with.</strong> Only the service providers we need to deliver to
            you, such as our payment processor, email provider, and scheduling tool. They may only
            use it to provide their service to us. We do not sell your personal information.
          </p>
          <p>
            <strong>How long we keep it.</strong> For as long as needed to provide our services and
            to meet legal and accounting requirements, after which we delete or anonymise it.
          </p>
          <p>
            <strong>Your rights under POPIA.</strong> You may ask to see the information we hold
            about you, ask us to correct or delete it, object to processing, or withdraw consent.
            Email info@growthcred.co.za and we will action your request as required by law.
          </p>
          <p>
            <strong>Security.</strong> We take reasonable steps to protect your information. No
            online service is perfectly secure, but we work to keep your data safe.
          </p>
          <p>
            <strong>Changes.</strong> We may update this policy. The current version always lives on
            this page.
          </p>
          <p>
            Questions or requests:{" "}
            <a href="mailto:info@growthcred.co.za" className="text-midnight underline decoration-gold">
              info@growthcred.co.za
            </a>
            .
          </p>
        </div>

        <p className="mt-8 font-mono text-xs text-muted">
          GrowthCred (Pty) Ltd &middot; Reg. 2026/229279/07 &middot; Rosebank, Johannesburg
        </p>
      </div>
    </Section>
  );
}
