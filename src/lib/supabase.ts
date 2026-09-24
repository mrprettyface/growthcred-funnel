import type { SupabaseClient } from "@supabase/supabase-js";
import { postToGoogleForm } from "./forms";
import { refCode, activeReferrer } from "./referral";

const url = import.meta.env.VITE_SUPABASE_URL;
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

/** True only once the .env keys are present. Mirrors the Fumba pattern. */
export const isSupabaseConfigured = Boolean(url && anonKey);

/**
 * The client is loaded on first use, not with the page. supabase-js is only
 * needed when someone submits a form, and bundling it eagerly put it on the
 * critical path of every page on the site (speed is a ranking signal). A failed
 * download resets, so the next submit can try again.
 */
let clientPromise: Promise<SupabaseClient> | null = null;
function loadClient(): Promise<SupabaseClient> {
  clientPromise ??= import("@supabase/supabase-js")
    .then(({ createClient }) => createClient(url as string, anonKey as string))
    .catch((e) => {
      clientPromise = null;
      throw e;
    });
  return clientPromise;
}

/** The client, or the reason there isn't one — never a throw. */
async function client(): Promise<{ db: SupabaseClient } | { error: string }> {
  if (!isSupabaseConfigured) return { error: "not_configured" };
  try {
    return { db: await loadClient() };
  } catch {
    return { error: "network_error" };
  }
}

export type Lead = {
  email: string;
  source: string;
};

export type OrderRow = {
  reference: string;
  email: string;
  name: string | null;
  items: string[];
  amount_cents: number;
  status: "awaiting_payment" | "paid" | "cancelled";
  payment_method: string;
};

/**
 * Capture an email for the free class.
 * RLS allows anon INSERT only, so a failure here is never fatal to the UX.
 */
export async function captureLead(lead: Lead): Promise<{ ok: boolean; error?: string }> {
  const c = await client();
  if ("error" in c) return { ok: false, error: c.error };
  const supabase = c.db;
  const { error } = await supabase.from("leads").insert(lead);
  return error ? { ok: false, error: error.message } : { ok: true };
}

/**
 * Record an order as an INTENT. Nothing is fulfilled until the wire is
 * confirmed by a human, so this row is a request, not proof of payment.
 * We generate the reference client-side so we never need a SELECT policy.
 */
export async function createOrder(order: OrderRow): Promise<{ ok: boolean; error?: string }> {
  const c = await client();
  if ("error" in c) return { ok: false, error: c.error };
  const supabase = c.db;
  const { error } = await supabase.from("orders").insert(order);
  return error ? { ok: false, error: error.message } : { ok: true };
}

/**
 * Records that a Whop payment completed, against our order reference.
 *
 * We cannot UPDATE the orders row (anon is insert-only by design, so nobody can
 * mark their own order paid), so successful payments are appended here instead.
 * Whop's dashboard remains the authority on money; this is our matching trail.
 */
export async function recordPayment(
  reference: string,
  offer: string,
): Promise<{ ok: boolean; error?: string }> {
  const c = await client();
  if ("error" in c) return { ok: false, error: c.error };
  const supabase = c.db;
  const { error } = await supabase
    .from("upsell_events")
    .insert({ reference, offer, accepted: true });
  return error ? { ok: false, error: error.message } : { ok: true };
}

/**
 * A high-ticket application. This is the point of the exercise: the form does
 * not just collect a name, it begins the relationship. The three open
 * questions mean Phila walks into the call already understanding the goal,
 * the desired outcome, and the frustration, so the conversation starts warm.
 */
export type Application = {
  name: string;
  email: string;
  whatsapp: string;
  business: string;
  business_does: string;
  reason: string; // what made you apply today
  outcome: string; // what a successful outcome looks like
  frustration: string; // the most frustrating part so far
  team_size: string | null; // light qualifier
};

export async function submitApplication(
  app: Application,
): Promise<{ ok: boolean; error?: string }> {
  const c = await client();
  if ("error" in c) return { ok: false, error: c.error };
  const supabase = c.db;
  const { error } = await supabase.from("applications").insert(app);
  return error ? { ok: false, error: error.message } : { ok: true };
}

/**
 * A "Build It for You" request: the top tier, sold by qualification and audit
 * rather than in the cart. This is a mini application taken right after the
 * upsell is declined, so we keep it short. `reference` links it to the order.
 */
export type BuildRequest = {
  reference: string;
  name: string;
  email: string;
  whatsapp: string;
  industry: string;
  invest_timing: string; // "Today" | "Tomorrow" | "This week" | "Still exploring"
  availability: string;
  notes: string;
};

export async function submitBuildRequest(
  req: BuildRequest,
): Promise<{ ok: boolean; error?: string }> {
  const c = await client();
  if ("error" in c) return { ok: false, error: c.error };
  const supabase = c.db;
  const { error } = await supabase.from("build_requests").insert(req);
  return error ? { ok: false, error: error.message } : { ok: true };
}

/**
 * A free live class seat. Name and WhatsApp are required because that is how
 * the seat is honoured: joining link by email, reminder on WhatsApp an hour
 * before. `webinar` is the event slug, so the same table serves every future
 * live class without a migration.
 */
export type WebinarRegistration = {
  webinar: string;
  name: string;
  email: string;
  whatsapp: string;
  source?: string;
};

/**
 * The "Reserve Your Seat" Google Form, written alongside the Supabase row so the
 * Sheet can be compared against the table before Supabase is retired for seats.
 * See src/lib/forms.ts for why this exists and the no-cors caveat.
 *
 * Field entry IDs read from the live form on 2026-09-06. They are NOT
 * contractual — rebuilding the form reissues them, and submissions then silently
 * vanish. If the Sheet stops filling, re-read them from the form's page source.
 *
 * Deliberately unmapped, and why the Form CANNOT yet fully replace the table:
 * - `whatsapp` — the form has no WhatsApp field, so the number is written to
 *   Supabase only. The seat page promises a WhatsApp reminder an hour before, so
 *   until a WhatsApp question is added to the form (or that promise is dropped),
 *   Supabase stays the authority for seats.
 * - Job Title and "#1 challenge" — the form asks these but the SeatStepper does
 *   not collect them, so they arrive blank. They fill in only once the form is
 *   retired or the stepper is extended.
 */
const WEBINAR_SEAT_FORM = "1FAIpQLSesfaf0wVTTRG6FATWh5INgZ16_II32IRnBfWcbXdJrgO_YKQ";
const WEBINAR_SEAT_FIELDS = {
  name: "entry.298115564",
  email: "entry.84683276",
} as const;

export async function registerForWebinar(
  reg: WebinarRegistration,
): Promise<{ ok: boolean; confirmed?: boolean; error?: string }> {
  // Dual-write: Supabase (the authority during the transition) AND the Google
  // Form (a safety net that never sleeps). Both fire in parallel, and the seat
  // counts as saved if EITHER store accepts it — so the exact failure this
  // guards against (Supabase's free tier paused, open item #6) no longer loses
  // the lead: the Form still captures name and email. whatsapp is not on the
  // form, so a Supabase outage does still lose the number for those rows.
  // Referral: everyone gets their own stable code, and anyone who arrived on a
  // `?ref=` link carries the referrer's code onto their row. A self-referral
  // (their own link) is dropped rather than credited. These two columns live in
  // Supabase only — the Google Form has no referral fields, so the form write
  // below stays name + email.
  const ref_code = refCode(reg.email);
  const referrer = activeReferrer();
  const referred_by = referrer && referrer !== ref_code ? referrer : null;
  const row = { ...reg, ref_code, referred_by };

  const gform = postToGoogleForm(WEBINAR_SEAT_FORM, {
    [WEBINAR_SEAT_FIELDS.name]: reg.name,
    [WEBINAR_SEAT_FIELDS.email]: reg.email,
  });

  const supaErr: Promise<string | null> = client()
    .then((c) =>
      "error" in c
        ? c.error
        : Promise.resolve(
            c.db.from("webinar_registrations").insert(row).abortSignal(AbortSignal.timeout(12000)),
          ).then(({ error }) => error?.message ?? null),
    )
    .catch(() => "network_error");

  const [supaResult, gformResult] = await Promise.all([supaErr, gform]);

  if (supaResult === null) return { ok: true, confirmed: true };
  // An opaque Google response proves only that a request was sent, not saved.
  if (gformResult.ok) return { ok: true, confirmed: false };
  // Both stores refused. Surface Supabase's reason; the form's is always opaque.
  return { ok: false, error: supaResult };
}

/**
 * A lead magnet opt-in: the parallel funnel's entry point.
 *
 * `consent` is stored rather than assumed. The whole value of POPIA consent is
 * being able to show, later, that it was given -- a boolean nobody wrote down
 * is not consent, it is a claim.
 *
 * `company` is optional because every required field costs opt-ins and nothing
 * downstream reads it yet.
 */
export type MagnetSignup = {
  magnet: string;
  name: string;
  email: string;
  whatsapp: string;
  company: string | null;
  consent: boolean;
  source?: string;
};

export async function captureMagnetSignup(
  signup: MagnetSignup,
): Promise<{ ok: boolean; error?: string }> {
  const c = await client();
  if ("error" in c) return { ok: false, error: c.error };
  const supabase = c.db;
  const { error } = await supabase.from("magnet_signups").insert(signup);
  return error ? { ok: false, error: error.message } : { ok: true };
}

/**
 * A contact message, sent through the `contact-autoresponder` Edge Function.
 *
 * This is the one capture that does NOT go through the anon client: the table
 * has no anon policy at all, deliberately. The function is the only door, and
 * behind it the message is validated, rate-limited, saved with the service
 * role, and acknowledged by email before the response comes back — so a 200
 * here means the autoresponder has actually fired, not merely that a row
 * might land. Deployed but unauthed? The function still rejects: JWT
 * verification stays on and the anon key (a valid JWT) is what we send.
 */
export type ContactMessage = {
  name: string;
  email: string;
  whatsapp: string | null;
  message: string;
  /** Honeypot. Real users never see this field; bots fill it and are dropped. */
  company: string;
};

export async function submitContactMessage(
  msg: ContactMessage,
): Promise<{ ok: boolean; error?: string }> {
  const base = url ?? "";
  const key = anonKey ?? "";
  if (!base || !key) return { ok: false, error: "not_configured" };
  try {
    const res = await fetch(`${base}/functions/v1/contact-autoresponder`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${key}`,
        apikey: key,
      },
      body: JSON.stringify(msg),
    });
    if (res.ok) return { ok: true };
    if (res.status === 429) return { ok: false, error: "rate_limited" };
    return { ok: false, error: `http_${res.status}` };
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : "network_error" };
  }
}
