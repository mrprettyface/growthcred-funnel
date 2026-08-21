import { WhopCheckoutEmbed } from "@whop/checkout/react";

/**
 * Whop payment, themed to GrowthCred (gold on midnight).
 *
 * ONE checkout, no duplicates. Whop's embedded form handles every payment
 * method itself, including Apple Pay (once the domain is verified for Apple
 * Pay) and Google Pay. We deliberately do NOT add the separate express button
 * on top: it rendered a second Apple Pay button, and a "Whop Pay" button that
 * only opened this same form.
 *
 * Card details never touch our site: everything happens inside Whop's iframe.
 */

/** Lets you test with a coupon via ?promo=CODE on the checkout URL. */
function promoFromUrl(): string | undefined {
  if (typeof window === "undefined") return undefined;
  const code = new URLSearchParams(window.location.search).get("promo");
  return code ? code.trim() : undefined;
}

export function WhopPay({
  planId,
  email,
  reference,
  buttonText,
  returnPath = "/thank-you",
  onPaid,
}: {
  planId: string;
  email?: string;
  /** Our order reference, tagged onto the payment so it can be matched later. */
  reference?: string;
  buttonText?: string;
  /** Where Whop sends the customer if a payment method needs a full redirect. */
  returnPath?: string;
  onPaid: (receiptId: string | undefined) => void;
}) {
  const promoCode = promoFromUrl();

  const returnUrl =
    typeof window !== "undefined" ? window.location.origin + returnPath : undefined;

  const utm: Record<string, string> = { utm_source: "growthcred_funnel" };
  if (reference) utm.utm_content = reference;

  return (
    <div className="overflow-hidden rounded-2xl">
      <WhopCheckoutEmbed
        /* Remounts cleanly if the plan changes (e.g. the bump is toggled). */
        key={`embed-${planId}-${promoCode ?? ""}`}
        planId={planId}
        theme="dark"
        themeOptions={{
          accentColor: "#C8A04A", // brand gold
          backgroundColor: "#1A1A24", // brand midnight
          borderRadius: 14,
          ...(buttonText ? { buttonText } : {}),
        }}
        prefill={email ? { email } : undefined}
        promoCode={promoCode}
        /* Stay on our page after payment so onComplete can run. */
        skipRedirect
        returnUrl={returnUrl}
        utm={utm}
        onComplete={(_idOrPlan: string, receiptId: string | undefined) => onPaid(receiptId)}
        onPaymentError={(error) => {
          // Whop shows the customer its own message; this is for our console.
          console.error("[whop] payment error", error);
        }}
        fallback={
          <div className="grid min-h-[420px] place-items-center rounded-2xl bg-midnight">
            <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-cream/60">
              Loading secure checkout&hellip;
            </p>
          </div>
        }
      />
    </div>
  );
}
