import { Link } from "react-router-dom";
import { Section, Eyebrow, H1 } from "../../components/ui";

/**
 * Terms and conditions.
 *
 * Section 1 exists to satisfy section 43 of the Electronic Communications and
 * Transactions Act 25 of 2002, which requires an online seller to publish these
 * specific details. The one field still missing is a full street address: ECTA
 * asks for a physical address, and "Rosebank, Johannesburg" is a suburb.
 *
 * The clauses about the class, the recording and the guarantee restate promises
 * the selling pages already make. They are here so the promises are contractual
 * and consistent, not so they can be quietly narrowed — if a selling page and
 * this page ever disagree, the selling page is what the customer relied on.
 *
 * Still open: a South African attorney should read this before ad spend scales.
 */
export default function Terms() {
  return (
    <Section className="pt-10 md:pt-14">
      <div className="mx-auto max-w-[720px]">
        <Eyebrow>Legal</Eyebrow>
        <H1 className="mt-5 text-3xl md:text-5xl">Terms and conditions</H1>
        <p className="mt-4 font-mono text-xs text-muted">Last updated: 28 August 2026</p>

        <div className="mt-8 space-y-8 text-ink">
          <p>
            These terms govern your use of this website and your purchase of our workshop, digital
            products and services. By buying from us or using this site, you agree to them. Please
            read them with our{" "}
            <Link to="/privacy" className="text-midnight underline decoration-gold">
              privacy and data protection policy
            </Link>{" "}
            and our{" "}
            <Link to="/refunds" className="text-midnight underline decoration-gold">
              refund policy
            </Link>
            , which form part of them.
          </p>

          {/* ---------- 1. Who you are dealing with (ECTA s43) ---------- */}
          <section>
            <h2 className="text-2xl">1. Who you are dealing with</h2>
            <ul className="mt-3 space-y-2">
              <li>
                <strong>Legal name:</strong> GrowthCred (Pty) Ltd, a private company registered in
                South Africa.
              </li>
              <li>
                <strong>Registration number:</strong> 2026/229279/07.
              </li>
              <li>
                <strong>Address:</strong> Rosebank, Johannesburg, Gauteng, South Africa.
              </li>
              <li>
                <strong>Email:</strong>{" "}
                <a
                  href="mailto:info@growthcred.co.za"
                  className="text-midnight underline decoration-gold"
                >
                  info@growthcred.co.za
                </a>
                .
              </li>
              <li>
                <strong>Phone and WhatsApp:</strong> 066 283 0289.
              </li>
              <li>
                <strong>Website:</strong> growthcred.co.za.
              </li>
            </ul>
          </section>

          {/* ---------- 2. What we sell ---------- */}
          <section>
            <h2 className="text-2xl">2. What we sell</h2>
            <p className="mt-3">
              A one-day workshop, add-ons to it, recorded training, and done-with-you and
              done-for-you services. What each one includes is described on its own page, and that
              description at the time you buy is what you are buying.
            </p>
            <p className="mt-3">
              Prices are in South African Rand and are shown in full before you pay, with no charges
              added afterwards. Where a founding or promotional rate is shown, it applies to
              purchases made while it is displayed.
            </p>
          </section>

          {/* ---------- 3. Payment and access ---------- */}
          <section>
            <h2 className="text-2xl">3. Payment and access</h2>
            <p className="mt-3">
              Payment is taken by our payment provider, Whop, inside its own secure form. Your card
              details never reach us. You confirm that you are authorised to use the payment method
              you enter.
            </p>
            <p className="mt-3">
              Your order is confirmed once that payment succeeds. On successful payment you receive
              access to what you bought, as described on its page. If a payment succeeds but you do
              not hear from us, email us with your order reference and we will sort it out.
            </p>
          </section>

          {/* ---------- 4. The free live class ---------- */}
          <section>
            <h2 className="text-2xl">4. The free live class</h2>
            <p className="mt-3">
              Registering for the free class gets you the joining link by email and a reminder on
              WhatsApp an hour before it starts. Those two messages are what registration is for,
              and we do not use that registration to add you to anything else.
            </p>
            <p className="mt-3">
              <strong>The recording.</strong> The recording goes to people who stay to the end.
              Everyone still in the room when we finish gets it. If you leave halfway, you do not,
              which is why we say to plan for the full hour rather than counting on catching up
              afterwards.
            </p>
            <p className="mt-3">
              A live class may be rescheduled or cancelled. If that happens we tell registrants by
              email. Since the class is free, no payment is involved either way.
            </p>
          </section>

          {/* ---------- 5. What you send us ---------- */}
          <section>
            <h2 className="text-2xl">5. What you send us</h2>
            <p className="mt-3">
              Our forms ask about your business, and in the workshop you may show us your own work.
              You keep ownership of everything you send us or show us. We treat it as confidential
              and use it only to deliver what you asked for, as set out in our{" "}
              <Link to="/privacy" className="text-midnight underline decoration-gold">
                privacy and data protection policy
              </Link>
              .
            </p>
            <p className="mt-3">
              We will not publish your name, your business, your results or anything you sent us as
              a testimonial or case study without asking you first and getting your yes.
            </p>
            <p className="mt-3">
              In return, you confirm that what you send us is yours to send, that you are not
              sending us someone else&rsquo;s confidential information or personal information you
              have no right to share, and that it is not unlawful. We may remove or decline anything
              that breaks this, and we may end an engagement over it.
            </p>
          </section>

          {/* ---------- 6. Our materials ---------- */}
          <section>
            <h2 className="text-2xl">6. Our materials</h2>
            <p className="mt-3">
              Our workshop materials, recordings, templates, prompts and written content stay ours.
              Buying them buys you a personal, non-transferable right to use them in your own
              business, including with your own staff.
            </p>
            <p className="mt-3">
              It does not buy you the right to resell them, republish them, share your access,
              upload them anywhere, or use them to run a competing training or agency offering. What
              you build for your own business using them is yours.
            </p>
          </section>

          {/* ---------- 7. What we do and do not promise ---------- */}
          <section>
            <h2 className="text-2xl">7. What we do and do not promise</h2>
            <p className="mt-3">
              We promise to deliver what each page describes, and we stand behind the workshop
              guarantee exactly as it is written on the page that sold it to you and in our{" "}
              <Link to="/refunds" className="text-midnight underline decoration-gold">
                refund policy
              </Link>
              .
            </p>
            <p className="mt-3">
              Beyond that guarantee, we do not promise any particular revenue, saving or business
              outcome. The results depend on you using what you build. Anything we say about time
              saved is what the systems are built to do, not a forecast of your results.
            </p>
            <p className="mt-3">
              We are not lawyers, accountants or financial advisers, and nothing we teach is legal,
              tax, financial or investment advice. Some of what we teach uses third-party AI tools,
              which can be wrong; you stay responsible for checking output before you rely on it or
              send it to a customer, and for using those tools within their own terms and within the
              law.
            </p>
          </section>

          {/* ---------- 8. Conduct ---------- */}
          <section>
            <h2 className="text-2xl">8. Conduct in the room</h2>
            <p className="mt-3">
              The workshop is a room full of other people&rsquo;s businesses. What other attendees
              share stays in the room. We may ask someone to leave, without a refund, for behaviour
              that is abusive, discriminatory, or that breaches another attendee&rsquo;s
              confidence.
            </p>
          </section>

          {/* ---------- 9. Liability ---------- */}
          <section>
            <h2 className="text-2xl">9. Liability</h2>
            <p className="mt-3">
              To the fullest extent the law allows, we are not liable for indirect or consequential
              loss, loss of profit, or loss of data arising from your use of our products, services
              or this website, and our total liability for any claim is limited to what you paid us
              for the thing the claim is about.
            </p>
            <p className="mt-3">
              Nothing in these terms limits any liability that cannot lawfully be limited, including
              liability for death or personal injury caused by our negligence, or for fraud. Nothing
              in them takes away a right you have under the Consumer Protection Act 68 of 2008 or
              the Electronic Communications and Transactions Act 25 of 2002.
            </p>
          </section>

          {/* ---------- 10. The site itself ---------- */}
          <section>
            <h2 className="text-2xl">10. This website</h2>
            <p className="mt-3">
              We work to keep this site available and accurate, but we do not promise it will be
              uninterrupted or error-free. If a price or description is obviously wrong, we may
              correct it and cancel any affected order, and where you have paid, we refund you in
              full.
            </p>
          </section>

          {/* ---------- 11. General ---------- */}
          <section>
            <h2 className="text-2xl">11. General</h2>
            <p className="mt-3">
              We may update these terms. The version on this page when you buy is the version that
              applies to that purchase, so a later change never rewrites a deal you already made.
            </p>
            <p className="mt-3">
              If any part of these terms is found unenforceable, the rest stays in force. These
              terms are governed by the laws of the Republic of South Africa, and the South African
              courts have jurisdiction.
            </p>
            <p className="mt-3">
              If something goes wrong, email us first. We would far rather fix it than argue about
              it.
            </p>
          </section>

          <p className="border-t border-midnight/10 pt-6">
            Questions:{" "}
            <a
              href="mailto:info@growthcred.co.za"
              className="text-midnight underline decoration-gold"
            >
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
