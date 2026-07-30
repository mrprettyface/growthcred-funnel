import { Section, Eyebrow, H1 } from "../../components/ui";

/**
 * First draft. Have a South African lawyer review before publishing.
 * The 30-day window and 7 business days here MUST match the workshop
 * guarantee on the VSL (Workshop.tsx, section 1.3) word for word.
 */
export default function Refunds() {
  return (
    <Section className="pt-10 md:pt-14">
      <div className="mx-auto max-w-[720px]">
        <Eyebrow>Legal</Eyebrow>
        <H1 className="mt-5 text-3xl md:text-5xl">Refund policy</H1>
        <p className="mt-4 font-mono text-xs text-muted">Last updated: [DATE]</p>

        <div className="mt-8 space-y-4 text-ink">
          <p>
            <strong>The workshop guarantee.</strong> The workshop carries our stated guarantee: get
            10 hours a week back, or you don&rsquo;t pay. If you attend, complete the builds on the
            day, and use the systems for 30 days, and by day 30 you have not clawed back at least 10
            hours a week, you get a full refund.
          </p>
          <p>
            To claim, email info@growthcred.co.za before day 30 from your workshop date, with your
            name, your workshop date, and confirmation that you completed the builds on the day. We
            process approved refunds within 7 business days to your original payment method.
          </p>
          <p>
            <strong>Trial offer.</strong> Where you start on a free trial, you are charged only if
            you do not cancel before the trial ends, as set out in the trial terms at signup. Cancel
            any time during the trial and you are charged nothing.
          </p>
          <p>
            <strong>Digital products.</strong> Because our digital products give immediate access to
            their full contents, they are sold as final unless a specific guarantee is stated on the
            product page. Where a guarantee is stated, its terms apply.
          </p>
          <p>
            <strong>How to reach us.</strong> For any refund question, email{" "}
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
