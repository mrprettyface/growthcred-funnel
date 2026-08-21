import { useState } from "react";
import { WhopCheckoutEmbed, WhopExpressCheckoutButton } from "@whop/checkout/react";

/**
 * Whop payment, themed to GrowthCred (gold on midnight).
 *
 * Two ways to pay, in the order a customer wants them:
 *   1. Express button  - Apple Pay / Google Pay / Whop Pay, one tap, no typing.
 *   2. Embedded form   - card details, for everyone else.
 *
 * The express button only renders when the device can actually offer it
 * (Apple Pay needs Safari + a card in Wallet, Google Pay needs Chrome + a saved
 * card). `onExpressMethodResolved` tells us what rendered, so the "or pay by
 * card" divider only appears when there is genuinely something above it.
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
  const [expressMethod, setExpressMethod] = useState<string | null>(null);
  const promoCode = promoFromUrl();

  const returnUrl =
    typeof window !== "undefined" ? window.location.origin + returnPath : undefined;

  const utm: Record<string, string> = { utm_source: "growthcred_funnel" };
  if (reference) utm.utm_content = reference;

  const showsExpress = expressMethod !== null && expressMethod !== "none";

  return (
    <div>
      {/* 1. Apple Pay / Google Pay / Whop Pay, offered first */}
      <div className={showsExpress ? "mb-5" : ""}>
        <WhopExpressCheckoutButton
          key={`express-${planId}-${promoCode ?? ""}`}
          planId={planId}
          returnUrl={returnUrl ?? "https://growthcred.co.za/thank-you"}
          methods={["apple-pay", "google-pay", "whop-pay"]}
          theme="dark"
          themeOptions={{ accentColor: "gold" }}
          prefill={email ? { email } : undefined}
          promoCode={promoCode}
          onComplete={(_planId, receiptId) => onPaid(receiptId)}
          onPaymentError={(error) => console.error("[whop] express payment error", error)}
          onExpressMethodResolved={(info) => setExpressMethod(info.rendered)}
        />
      </div>

      {/* Divider, only when there is actually an express option above it */}
      {showsExpress && (
        <div className="mb-5 flex items-center gap-4" aria-hidden="true">
          <span className="h-px flex-1 bg-midnight/15" />
          <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted">
            or pay by card
          </span>
          <span className="h-px flex-1 bg-midnight/15" />
        </div>
      )}

      {/* 2. Card form */}
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
    </div>
  );
}
