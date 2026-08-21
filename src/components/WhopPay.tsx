import { WhopCheckoutEmbed } from "@whop/checkout/react";

/**
 * Whop embedded checkout, themed to GrowthCred (gold on midnight).
 *
 * Payment happens ON our page inside Whop's secure iframe: card details never
 * touch our site or our code. `skipRedirect` keeps the customer here so we can
 * advance the funnel ourselves in `onComplete` instead of bouncing them to Whop.
 */
export function WhopPay({
  planId,
  email,
  reference,
  buttonText,
  onPaid,
}: {
  planId: string;
  email?: string;
  /** Our order reference, tagged onto the payment so it can be matched later. */
  reference?: string;
  buttonText?: string;
  onPaid: (receiptId: string | undefined) => void;
}) {
  return (
    <div className="overflow-hidden rounded-2xl">
      <WhopCheckoutEmbed
        /* Remounts cleanly if the plan changes (e.g. the bump is toggled). */
        key={planId}
        planId={planId}
        theme="dark"
        themeOptions={{
          accentColor: "#C8A04A", // brand gold
          backgroundColor: "#1A1A24", // brand midnight
          borderRadius: 14,
          ...(buttonText ? { buttonText } : {}),
        }}
        prefill={email ? { email } : undefined}
        /* Stay on our page after payment so onComplete can run. */
        skipRedirect
        utm={
          reference
            ? { utm_source: "growthcred_funnel", utm_content: reference }
            : { utm_source: "growthcred_funnel" }
        }
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
