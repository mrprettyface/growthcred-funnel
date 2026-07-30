import { useEffect, useState } from "react";
import { Section, Eyebrow, H1, Faint, Button, ButtonLink, VideoSlot, CheckList } from "../components/ui";
import { captureLead, isSupabaseConfigured } from "../lib/supabase";
import { track } from "../lib/analytics";

/**
 * TOP OF FUNNEL: free class opt-in, then delivery.
 * Locked headline: "Get Your Time Back With AI"
 */
export default function ClassPage() {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [message, setMessage] = useState("");

  useEffect(() => track("class_view"), []);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setState("sending");
    const result = await captureLead({ email, source: "free_class" });

    // Not configured yet should not block the visitor from watching.
    if (!result.ok && result.error !== "not_configured") {
      setState("error");
      setMessage("That did not save. Please try again, or email info@growthcred.co.za.");
      return;
    }
    track("class_optin", { configured: isSupabaseConfigured });
    setState("done");
  }

  if (state === "done") {
    return (
      <Section className="pt-10 md:pt-16">
        <div className="mx-auto max-w-[860px] text-center">
          <Eyebrow>You&rsquo;re in</Eyebrow>
          <H1 className="mx-auto mt-5 max-w-[16ch]">
            Get Your Time Back <Faint>With AI.</Faint>
          </H1>
          <p className="mx-auto mt-5 max-w-[50ch] text-ink">
            Watch it now. When you are ready to actually build it, the one-day workshop is the next
            step.
          </p>
        </div>
        <div className="mx-auto mt-10 max-w-[860px]">
          <VideoSlot slot="freeClass" label="free class video" />
        </div>
        <div className="mt-8 text-center">
          <ButtonLink to="/">
            See the one-day workshop <span aria-hidden="true">&#8599;</span>
          </ButtonLink>
        </div>
      </Section>
    );
  }

  return (
    <Section className="pt-10 md:pt-16">
      <div className="mx-auto max-w-[720px] text-center">
        <Eyebrow>Free class</Eyebrow>
        <H1 className="mx-auto mt-5 max-w-[16ch]">
          Get Your Time Back <Faint>With AI.</Faint>
        </H1>
        <p className="mx-auto mt-6 max-w-[52ch] text-lg text-ink">
          A short, free class on handing your busy work to AI, so your week stops disappearing into
          admin.
        </p>

        <form onSubmit={onSubmit} className="mx-auto mt-8 flex max-w-[480px] flex-col gap-3 sm:flex-row">
          <label htmlFor="email" className="sr-only">
            Your email address
          </label>
          <input
            id="email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@yourbusiness.co.za"
            className="min-h-12 flex-1 rounded-full border border-midnight/15 bg-white px-5 text-base outline-none focus:border-gold"
          />
          <Button type="submit" disabled={state === "sending"}>
            {state === "sending" ? "Sending&hellip;" : "Watch the class"}
          </Button>
        </form>

        {state === "error" && (
          <p role="alert" className="mt-3 text-sm text-red-700">
            {message}
          </p>
        )}

        <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.14em] text-muted">
          No spam. Unsubscribe any time.
        </p>

        <div className="mx-auto mt-12 max-w-[560px] text-left">
          <CheckList
            items={[
              "Walk out knowing exactly where your 10 hours a week are leaking, and which to plug first",
              "See the difference between AI that forgets you and a system that runs your business without you",
              "Leave with the first move you can make today, before you spend a cent",
            ]}
          />
        </div>
      </div>
    </Section>
  );
}
