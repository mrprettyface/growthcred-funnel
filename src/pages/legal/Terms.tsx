import { Section, Eyebrow, H1 } from "../../components/ui";

/**
 * First draft. Have a South African lawyer review before publishing.
 * Fill [DATE] with the go-live date. Support email is info@growthcred.co.za.
 */
export default function Terms() {
  return (
    <Section className="pt-10 md:pt-14">
      <div className="mx-auto max-w-[720px]">
        <Eyebrow>Legal</Eyebrow>
        <H1 className="mt-5 text-3xl md:text-5xl">Terms and conditions</H1>
        <p className="mt-4 font-mono text-xs text-muted">Last updated: [DATE]</p>

        <div className="mt-8 space-y-4 text-ink">
          <p>
            These terms govern your use of the GrowthCred website and your purchase of our workshop,
            digital products, and services. By buying from us or using this site, you agree to them.
          </p>
          <p>
            <strong>Who we are.</strong> GrowthCred (Pty) Ltd, registration number 2026/229279/07,
            based in Rosebank, Johannesburg, South Africa. Contact: info@growthcred.co.za.
          </p>
          <p>
            <strong>What we provide.</strong> A paid workshop, digital training materials, and
            related services as described on the relevant page at the time of purchase. Details of
            each offer, including price, are shown before you pay.
          </p>
          <p>
            <strong>Payment.</strong> Prices are in South African Rand and include any applicable
            charges shown at checkout. Payment is processed by our payment provider. You confirm you
            are authorised to use the payment method you enter.
          </p>
          <p>
            <strong>Access.</strong> On successful payment you receive access to what you purchased,
            as described on the offer page. Access to digital materials is for your own use and may
            not be shared, resold, or redistributed.
          </p>
          <p>
            <strong>Guarantee and refunds.</strong> Our refund terms are set out in the Refunds
            policy and, where a specific guarantee applies to an offer, on that offer&rsquo;s page.
            Those terms apply.
          </p>
          <p>
            <strong>Your responsibilities.</strong> The results you get depend on you using what you
            buy. We provide the systems and the guidance. We do not guarantee any specific business
            outcome beyond the terms of a stated guarantee.
          </p>
          <p>
            <strong>Our liability.</strong> To the extent allowed by law, GrowthCred is not liable
            for indirect or consequential loss arising from your use of our products or services.
            Nothing in these terms limits liability that cannot be limited by law.
          </p>
          <p>
            <strong>Changes.</strong> We may update these terms. The version on this page at the
            time of your purchase applies to that purchase.
          </p>
          <p>
            <strong>Governing law.</strong> These terms are governed by the laws of the Republic of
            South Africa.
          </p>
          <p>
            Questions:{" "}
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
