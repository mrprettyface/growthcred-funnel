import { Link } from "react-router-dom";
import { Section, Eyebrow, H1 } from "../../components/ui";

/**
 * Privacy and data protection policy, written against what this site actually
 * does rather than from a template. Every claim below is checkable in the code:
 *
 *   - the fields listed are the columns in supabase/schema.sql
 *   - "no accounts, no passwords" is true because there is no auth anywhere
 *   - "card details never reach us" is true because payment happens inside
 *     Whop's iframe (src/components/WhopPay.tsx)
 *   - the anon role is INSERT-only by RLS, so one visitor cannot read another's
 *     submission even if they find the key that ships in the bundle
 *
 * If any of that changes, this page is wrong and has to change with it. A
 * privacy policy that overstates what you do is worse than none: it is a
 * written misrepresentation to every person who relied on it.
 *
 * STILL OPEN, and neither is something code can settle:
 *   1. A South African attorney should read this before ad spend scales.
 *   2. The Information Officer must be registered with the Information
 *      Regulator. Naming one here is not the same as registering them.
 */
export default function Privacy() {
  return (
    <Section className="pt-10 md:pt-14">
      <div className="mx-auto max-w-[720px]">
        <Eyebrow>Legal</Eyebrow>
        <H1 className="mt-5 text-3xl md:text-5xl">Privacy and data protection</H1>
        <p className="mt-4 font-mono text-xs text-muted">Last updated: 28 August 2026</p>

        <div className="mt-8 space-y-8 text-ink">
          {/* ---------- The short version ---------- */}
          <div className="rounded-2xl border border-midnight/10 border-l-4 border-l-gold bg-white p-6">
            <p className="font-display text-lg font-extrabold text-midnight">The short version</p>
            <p className="mt-3">
              We collect what you type into our forms &mdash; your name, email, WhatsApp number, and
              whatever you tell us about your business &mdash; and we use it to deliver what you
              signed up for and to talk to you about it. We never see your card number and there are
              no accounts or passwords on this site, so there is no login of yours for us to lose.
              We do not sell your information to anyone. You can ask us for a copy of what we hold,
              ask us to fix it, or ask us to delete it, and we will.
            </p>
            <p className="mt-3">
              The rest of this page is the detail, because under POPIA you are entitled to it.
            </p>
          </div>

          {/* ---------- 1. Who is responsible ---------- */}
          <section>
            <h2 className="text-2xl">1. Who is responsible for your information</h2>
            <p className="mt-3">
              GrowthCred (Pty) Ltd, registration number 2026/229279/07, of Rosebank, Johannesburg,
              South Africa, is the responsible party for the personal information described here, as
              that term is used in the Protection of Personal Information Act 4 of 2013 (POPIA).
            </p>
            <p className="mt-3">
              <strong>Information Officer:</strong> Phila Ngwenya.{" "}
              <a
                href="mailto:info@growthcred.co.za"
                className="text-midnight underline decoration-gold"
              >
                info@growthcred.co.za
              </a>
              . Every request, question or complaint about your personal information reaches a
              person at that address. It is not a no-reply box.
            </p>
          </section>

          {/* ---------- 2. What we collect ---------- */}
          <section>
            <h2 className="text-2xl">2. What we actually collect, and where</h2>
            <p className="mt-3">
              We only hold what you type in. We do not buy lists, we do not scrape, and we do not
              build a profile of you from anywhere other than your own submissions.
            </p>

            <ul className="mt-4 space-y-3">
              <li>
                <strong>Free class opt-in.</strong> Your email address, and which page you came
                from.
              </li>
              <li>
                <strong>Live class registration.</strong> Your name, email address, WhatsApp number,
                and which class you booked. The WhatsApp number is collected for one reason: the
                reminder an hour before, which is the thing that stops people missing it.
              </li>
              <li>
                <strong>Workshop checkout.</strong> Your name, email address, what you ordered, the
                amount, and an order reference we generate. Your card details are entered inside our
                payment provider&rsquo;s own secure form and are never sent to us, stored by us, or
                visible to us &mdash; see section 4.
              </li>
              <li>
                <strong>Custom system request.</strong> Your name, email address, WhatsApp number,
                your industry, when you are looking to start, when you are free for a call, and any
                notes you add.
              </li>
              <li>
                <strong>Done-for-you application.</strong> Your name, email address, WhatsApp
                number, your business and what it does, your team size, and your answers about what
                made you apply, what a good outcome looks like, and what has been most frustrating.
                These answers are about your business, and we treat them as confidential.
              </li>
              <li>
                <strong>When you email or WhatsApp us.</strong> Whatever you send, and our reply.
              </li>
            </ul>

            <p className="mt-4">
              <strong>What we never collect.</strong> This site has no accounts and no login, so we
              hold no username or password of yours. We never ask for and never store card numbers,
              CVV codes, banking login details, ID or passport numbers, or your address. If a page
              claiming to be us ever asks you for any of those, it is not us &mdash; tell us at{" "}
              <a
                href="mailto:info@growthcred.co.za"
                className="text-midnight underline decoration-gold"
              >
                info@growthcred.co.za
              </a>
              .
            </p>
          </section>

          {/* ---------- 3. Why, and on what lawful basis ---------- */}
          <section>
            <h2 className="text-2xl">3. Why we hold it, and on what basis</h2>
            <p className="mt-3">
              POPIA requires us to have a lawful reason for every use. Ours are:
            </p>
            <ul className="mt-4 space-y-3">
              <li>
                <strong>To do what you asked.</strong> Sending the class joining link and the
                reminder, giving you access to what you bought, running the workshop, replying to an
                application. This is necessary to carry out the agreement between us.
              </li>
              <li>
                <strong>Because you consented.</strong> Where you gave us a detail we did not need
                for the above, you gave it voluntarily and may withdraw that consent at any time.
              </li>
              <li>
                <strong>To keep the records the law requires.</strong> Invoices, payment records and
                tax records, kept for the periods set out in section 9.
              </li>
              <li>
                <strong>To run and protect the business.</strong> Answering support, preventing
                fraud and abuse, and defending a legal claim if one is ever made. This is our
                legitimate interest, and we weigh it against your privacy each time.
              </li>
            </ul>
            <p className="mt-4">
              We do not use your information to make an automated decision about you that has a
              legal or similarly significant effect, as described in section 71 of POPIA.
            </p>
          </section>

          {/* ---------- 4. Payments ---------- */}
          <section>
            <h2 className="text-2xl">4. Payments</h2>
            <p className="mt-3">
              Payments are taken by <strong>Whop</strong>, our payment provider. The card form on
              our checkout is served by Whop inside a secure frame on the page. Your card number,
              expiry and CVV go directly to Whop and their payment partners. They do not pass
              through our website, our servers, or our database, and no one at GrowthCred can see
              them.
            </p>
            <p className="mt-3">
              What we receive back is the fact that a payment succeeded, matched to the order
              reference we generated. Whop processes your payment information as a responsible party
              in its own right, under its own privacy terms.
            </p>
          </section>

          {/* ---------- 5. Who else touches it ---------- */}
          <section>
            <h2 className="text-2xl">5. Who else touches your information</h2>
            <p className="mt-3">
              We share it only with the providers we need to run the service, and only so they can
              provide that service to us. <strong>We do not sell your personal information, and
              we do not share it for anyone else&rsquo;s marketing.</strong>
            </p>
            <ul className="mt-4 space-y-3">
              <li>
                <strong>Whop</strong> &mdash; payments and checkout, and a page-view measurement
                script that runs on this site (see section 7).
              </li>
              <li>
                <strong>Supabase</strong> &mdash; the database that stores your form submissions.
              </li>
              <li>
                <strong>Our email and WhatsApp providers</strong> &mdash; so we can reach you the
                way we said we would.
              </li>
              <li>
                <strong>YouTube</strong> &mdash; the videos on our pages are embedded from YouTube
                in its no-cookie mode, which does not set tracking cookies until you press play. If
                you press play, YouTube receives that request and applies its own privacy terms.
              </li>
              <li>
                <strong>Our web host</strong> &mdash; which serves these pages and keeps ordinary
                server logs.
              </li>
            </ul>
            <p className="mt-4">
              We will also disclose information where the law requires it, or to establish, exercise
              or defend a legal claim. If we are ever bought or merged, your information moves with
              the business and this policy continues to apply to it.
            </p>
          </section>

          {/* ---------- 6. Cross-border ---------- */}
          <section>
            <h2 className="text-2xl">6. Information that leaves South Africa</h2>
            <p className="mt-3">
              Some of the providers above operate outside South Africa, so your information may be
              stored or processed in another country. Section 72 of POPIA allows this where the
              recipient is bound by rules or a contract that provide protection substantially
              similar to POPIA, or where you consented, or where the transfer is necessary to
              perform our agreement with you. We rely on those grounds and choose providers who
              contract to protect your information accordingly.
            </p>
          </section>

          {/* ---------- 7. Tracking ---------- */}
          <section>
            <h2 className="text-2xl">7. Cookies and measurement</h2>
            <p className="mt-3">
              We keep this deliberately light, and we would rather tell you exactly what runs than
              hide it behind a banner.
            </p>
            <ul className="mt-4 space-y-3">
              <li>
                <strong>Your browser&rsquo;s session storage.</strong> While you move through the
                checkout we keep your order details in your own browser so the next page knows what
                you bought and any promo code still applies. It is deleted when you close the tab
                and it never leaves your device except when you submit a form.
              </li>
              <li>
                <strong>Whop&rsquo;s measurement script.</strong> Whop loads a small script on our
                pages that records that a page was viewed, so we can tell which pages lead to
                purchases. It runs on every page of this site.
              </li>
              <li>
                <strong>Embedded video.</strong> Described in section 5.
              </li>
            </ul>
            <p className="mt-4">
              We do not run advertising retargeting pixels of our own, and we do not sell or share
              browsing data with data brokers. You can block any of the above with your browser
              settings or an extension, and the site will still work.
            </p>
          </section>

          {/* ---------- 8. Direct marketing ---------- */}
          <section>
            <h2 className="text-2xl">8. Marketing, and the promises we made when you signed up</h2>
            <p className="mt-3">
              Section 69 of POPIA restricts unsolicited electronic marketing, and we hold ourselves
              to what each form promised at the moment you filled it in:
            </p>
            <ul className="mt-4 space-y-3">
              <li>
                <strong>Free live class.</strong> That form says you get the joining link and a
                WhatsApp reminder an hour before, and nothing else. That is exactly what you get. We
                do not add live-class registrants to a newsletter.
              </li>
              <li>
                <strong>Customers.</strong> If you buy from us, we may email you about your purchase
                and about closely related offerings, as section 69(3) permits for an existing
                customer. Every one of those has a one-click way to stop, and stopping never affects
                what you already bought.
              </li>
              <li>
                <strong>Applications and requests.</strong> We contact you about the thing you
                applied for. Not about anything else.
              </li>
            </ul>
            <p className="mt-4">
              To stop hearing from us entirely, reply to any message or email{" "}
              <a
                href="mailto:info@growthcred.co.za"
                className="text-midnight underline decoration-gold"
              >
                info@growthcred.co.za
              </a>{" "}
              with &ldquo;unsubscribe&rdquo;. We action it, and we do not ask you why.
            </p>
          </section>

          {/* ---------- 9. Retention ---------- */}
          <section>
            <h2 className="text-2xl">9. How long we keep it</h2>
            <ul className="mt-3 space-y-3">
              <li>
                <strong>Payment and invoice records:</strong> five years from the end of the tax
                year they relate to, because South African tax law requires it.
              </li>
              <li>
                <strong>Customer records:</strong> for as long as you are a customer, and then for
                three years, so we can honour a guarantee claim and answer a later question.
              </li>
              <li>
                <strong>Class registrations and opt-ins:</strong> up to two years from your last
                interaction with us, then deleted.
              </li>
              <li>
                <strong>Applications we do not take forward:</strong> twelve months, then deleted.
              </li>
            </ul>
            <p className="mt-4">
              You can ask us to delete sooner, and we will unless the law requires us to keep a
              specific record. If that happens, we will tell you which record and why.
            </p>
          </section>

          {/* ---------- 10. Security ---------- */}
          <section>
            <h2 className="text-2xl">10. How your information is protected</h2>
            <p className="mt-3">
              Section 19 of POPIA requires appropriate, reasonable technical and organisational
              measures. Concretely, on this site:
            </p>
            <ul className="mt-4 space-y-3">
              <li>
                Everything you send travels over an encrypted HTTPS connection, and is encrypted
                again at rest by our database provider.
              </li>
              <li>
                Our forms can <em>write</em> to the database and cannot <em>read</em> from it. Even
                someone who inspected our website&rsquo;s code could not use it to read your
                submission, or anyone else&rsquo;s. Reading requires a separate credential that
                never leaves our control and is not part of this website.
              </li>
              <li>
                Card data is out of scope entirely, because it never reaches us (section 4).
              </li>
              <li>
                Access to submissions is limited to the people who need it to deliver what you
                asked for.
              </li>
            </ul>
            <p className="mt-4">
              No system is perfectly secure, and we will not pretend otherwise. If your personal
              information is ever accessed by someone unauthorised, section 22 of POPIA requires us
              to notify the Information Regulator and to notify you, and we will do both as soon as
              we reasonably can.
            </p>
          </section>

          {/* ---------- 11. Your rights ---------- */}
          <section>
            <h2 className="text-2xl">11. Your rights</h2>
            <p className="mt-3">Under POPIA you have the right to:</p>
            <ul className="mt-4 space-y-3">
              <li>ask whether we hold information about you, and to be given a copy of it;</li>
              <li>have information that is wrong or incomplete corrected;</li>
              <li>
                have information deleted where we no longer have a lawful reason to keep it;
              </li>
              <li>object, on reasonable grounds, to our processing of it;</li>
              <li>withdraw a consent you gave, at any time;</li>
              <li>not be subjected to unsolicited electronic marketing; and</li>
              <li>complain to the Information Regulator.</li>
            </ul>
            <p className="mt-4">
              Email{" "}
              <a
                href="mailto:info@growthcred.co.za"
                className="text-midnight underline decoration-gold"
              >
                info@growthcred.co.za
              </a>{" "}
              and we will respond within a reasonable time and in any event as the Act requires. We
              may need to confirm who you are first, so that nobody else can request your
              information. A request under the Promotion of Access to Information Act follows the
              procedure in our PAIA manual, available free on request from the same address.
            </p>
            <p className="mt-4">
              You may complain directly to the Information Regulator (South Africa) at any time, and
              you do not have to come to us first. Their current contact details and complaint forms
              are published at inforegulator.org.za.
            </p>
          </section>

          {/* ---------- 12. Children ---------- */}
          <section>
            <h2 className="text-2xl">12. Children</h2>
            <p className="mt-3">
              This site sells to business owners and is not intended for anyone under 18. We do not
              knowingly collect the personal information of a child. If you believe a child has sent
              us information, tell us and we will delete it.
            </p>
          </section>

          {/* ---------- 13. Changes ---------- */}
          <section>
            <h2 className="text-2xl">13. Changes to this policy</h2>
            <p className="mt-3">
              If we change how we handle your information, we change this page and the date at the
              top of it. Where a change materially affects information we already hold about you, we
              will tell you directly rather than relying on you noticing.
            </p>
          </section>

          <p className="border-t border-midnight/10 pt-6">
            See also our{" "}
            <Link to="/terms" className="text-midnight underline decoration-gold">
              terms and conditions
            </Link>{" "}
            and our{" "}
            <Link to="/refunds" className="text-midnight underline decoration-gold">
              refund policy
            </Link>
            . Questions or requests:{" "}
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
