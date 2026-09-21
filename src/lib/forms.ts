/**
 * Fire-and-forget POST to a Google Form's public response endpoint.
 *
 * Why this exists: the free-capture side of the funnel (webinar seats, and later
 * leads and magnet opt-ins) has two Supabase-specific problems. The free tier
 * pauses after ~7 idle days and has silently eaten every submission once
 * already (STATUS.md open item #6), and a static site has no backend to send the
 * confirmation email from. A Google Form never sleeps, lands every response in a
 * Sheet you can read without a dashboard, and an `onFormSubmit` Apps Script can
 * send that email automatically. This posts to the form the visitor never sees,
 * so the custom in-flow UI stays exactly as it is.
 *
 * Constraints that shape this function:
 * - The request MUST be `no-cors`. Google's endpoint returns no CORS headers, so
 *   a readable request is blocked. The trade-off is an *opaque* response: we
 *   cannot read the HTTP status, only whether the network call itself threw.
 *   Like the Supabase inserts, a failure here is therefore never fatal to UX.
 * - The body is `URLSearchParams` (application/x-www-form-urlencoded), a "simple"
 *   request, so it triggers no CORS preflight.
 * - Field keys are `entry.<id>` strings read from the live form. These IDs are
 *   stable in practice but NOT contractual: rebuilding the form reissues them,
 *   after which submissions silently go nowhere. The mapping and the date it was
 *   read live next to each caller.
 */
export async function postToGoogleForm(
  formId: string,
  fields: Record<string, string>,
): Promise<{ ok: boolean; error?: string }> {
  const body = new URLSearchParams();
  for (const [key, value] of Object.entries(fields)) {
    // Skip empties so a blank optional field never writes an empty cell.
    if (value != null && value !== "") body.append(key, value);
  }

  try {
    await fetch(`https://docs.google.com/forms/d/e/${formId}/formResponse`, {
      method: "POST",
      mode: "no-cors",
      signal: AbortSignal.timeout(10000),
      body,
    });
    // Opaque response by design — reaching here means the request left the tab.
    return { ok: true };
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : "network_error" };
  }
}
