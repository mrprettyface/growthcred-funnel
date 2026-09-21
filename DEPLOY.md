> Current cPanel search release: follow [docs/search/RELEASE.md](docs/search/RELEASE.md). The hosting alternatives below are historical; the current release uses prerendered HTML and explicit routes.

# Deploying without a host bill

The site is 100% static. Nothing on the server runs code: registrations go from
the browser straight to Supabase, payments go from the browser straight to Whop.
The host serves 4.7 MB of files and applies one rewrite rule. That job is free
almost everywhere, which is why the hosting bill is optional and the domain is
not.

## The actual risk

`growthcred.co.za` currently has its **DNS, email and hosting on one provider**
(`tld-ns.net` / `tld-mx.com`). One lapsed invoice takes all three:

| If the account suspends | Consequence | Recoverable? |
| --- | --- | --- |
| Website stops serving | Funnel offline | Yes — free, an afternoon |
| `info@growthcred.co.za` stops | Replies bounce silently | Yes, but mail sent meanwhile is gone |
| **Nameservers stop answering** | **Domain resolves nowhere at all** | Yes, but only via the registrar |
| Domain registration lapses | Every link ever posted dies | **Not reliably** |

The bottom two rows are the ones that matter. Moving hosting solves nothing if
the nameservers that point at the new host are on the account that lapsed.

**Order of spending, if money is tight: domain renewal (~R100/yr) first, and
nothing else is urgent.** Hosting is replaceable for free. A lost domain is not.

## Part A — done in this repo

- `public/_redirects` — SPA fallback for Cloudflare Pages, the portable twin of
  the `RewriteRule` in `dist/.htaccess`.
- `public/_headers` — Apple Pay file content-type + asset caching, matching what
  `.htaccess` does on Apache.
- `.nvmrc` — pins Node 22 so Cloudflare's builder matches local.
- `src/lib/contact.ts` — one source of truth for the WhatsApp number.
- **Failure paths no longer point at the at-risk mailbox.** "That did not save,
  email info@…" became a WhatsApp link. That message appears exactly when
  something is broken, which is exactly when that mailbox may be gone.
- Gate `host-portable` (G23) asserts all of the above survives a build.

**Nothing here changes the cPanel deploy.** `_redirects` and `_headers` are inert
on Apache. The current site keeps working while you test the new one.

## Part B — only you can do these

I can't create accounts or enter credentials. These are yours.

### 1. Back up the leads (10 min, do first)

Supabase → Table Editor → export CSV for `leads`, `webinar_registrations`,
`orders`, `applications`, `build_requests`, `upsell_events`.

Free Supabase projects **pause after ~7 days of no activity**, and a paused
project means registrations fail. Open the dashboard once before the 9th.

### 2. Cloudflare Pages (40 min, zero risk to what's live)

Create a free account → Workers & Pages → Create → Pages → Connect to Git →
`mrprettyface/growthcred-funnel`.

| Setting | Value |
| --- | --- |
| Framework preset | None |
| Build command | `npm run build` |
| Output directory | `dist` |
| Branch | `main` |

Then **Settings → Environment variables**, set for both Production and Preview:

- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`

Both are in your local `.env`. They are build-time values baked into the JS
bundle — that is fine and by design: the anon key is public, and your RLS is
insert-only, so it cannot read anyone's data back.

You get `growthcred-funnel.pages.dev`. **Test before touching DNS:**

- `/` loads the experience
- `/webinar` loads directly on refresh (this is what `_redirects` proves)
- `/workshop` redirects to `/`
- Submit a test registration, confirm the row lands in Supabase

### 3. Move DNS to Cloudflare (30 min — timing matters)

This is what decouples you from the provider permanently.

Add the domain in Cloudflare → it scans existing records → **check the scan
caught the mail records before continuing**:

- `MX  10  mx1.tld-mx.com`
- `TXT  v=spf1 +a +mx include:_spf.tld-mx.com ~all`

If either is missing, add it by hand. Miss them and email stops the moment the
nameservers switch.

Then change the nameservers at your **registrar** (where the domain is
registered — possibly a different login from hosting) to the two Cloudflare
gives you. Add `growthcred.co.za` as a custom domain on the Pages project.

> **Timing:** do this by **Sat 5 Sept**, or leave it until **after the 9th**.
> Never move nameservers in the 48 hours before a live event. If in doubt, run
> the webinar on the `pages.dev` URL — it works just as well.

### 4. Email that outlives the host (optional, 15 min)

Once DNS is on Cloudflare, **Email Routing** forwards `info@growthcred.co.za` to
any Gmail address, free, forever. Note it *replaces* the MX records, so the old
mailbox stops receiving — only switch when you're ready to let it go.

That covers receiving. For *sending* as `info@`, Zoho Mail's free tier does one
custom-domain user at no cost. Not urgent — send from Gmail until it is.

### 5. Verified purchase confirmation email

The purchase confirmation is not sent by the browser. The site stores the
customer's order details before checkout, Whop sends a signed
`payment.succeeded` event, and the Supabase Edge Function at
`supabase/functions/whop-webhook` verifies that signature before updating
`orders` and sending one personalised email through Resend.

Run the payment-email block in `supabase/schema.sql` in the
Supabase SQL editor, then deploy the function:

```bash
supabase functions deploy whop-webhook --no-verify-jwt
```

Set these as Supabase Edge Function secrets (Dashboard → Edge Functions →
Secrets):

- `WHOP_WEBHOOK_SECRET` — the signing secret for the Whop webhook
- `WHOP_COMPANY_ID` — defaults to the GrowthCred account already used by the pixel
- `RESEND_API_KEY` — a sending-only Resend key
- `PURCHASE_EMAIL_FROM` — for example `GrowthCred <info@growthcred.co.za>`
- `SUPABASE_SERVICE_ROLE_KEY` — only if it is not auto-provided by the project

In Whop → Developer → Webhooks, create a webhook for
`https://<project-ref>.supabase.co/functions/v1/whop-webhook` and subscribe to
`payment.succeeded`. Send a dashboard test event, then make one sandbox or
low-value test purchase. Confirm the Edge Function logs show a successful
delivery and Resend shows exactly one email. The webhook is deliberately
idempotent because Whop can retry the same event.

### 6. Contact form + autoresponder

`/contact` is the front door for messages. The form posts to the
`contact-autoresponder` Edge Function, which saves the message to the
`contact_messages` table and immediately emails two things: an acknowledgment
to the sender (the autoresponder), and a copy to `info@growthcred.co.za` so a
new message is seen without opening the dashboard.

One-time setup:

1. Run the **contact_messages block** at the end of `supabase/schema.sql` in the
   Supabase SQL editor (idempotent, safe to re-run).
2. Deploy the function — JWT verification stays ON, the browser sends the anon
   key, which is a valid JWT:

   ```bash
   supabase functions deploy contact-autoresponder
   ```

3. Secrets (Dashboard → Edge Functions → Secrets). `RESEND_API_KEY` and
   `PURCHASE_EMAIL_FROM` are shared with the purchase email function, so if
   section 5 is done there is nothing new to set. Optional extras:
   - `CONTACT_NOTIFY_EMAIL` — where new-message alerts go (default `info@growthcred.co.za`)
   - `SITE_URL` — the site link in email copy (default `https://growthcred.co.za`)

Test: submit the form at `/contact` with your own email. You should get the
acknowledgment within seconds, the info@ copy at the same time, and the row in
Supabase with `reply_status = 'sent'` (view: `contact_messages_recent`).

Spam handling is built in: a hidden honeypot field, a per-address limit of two
messages per ten minutes, and field/length validation. The table has no anon
policy, so the public key alone cannot write rows or bypass the limit. If
`RESEND_API_KEY` is not set, messages still save with `reply_status =
'skipped'` — nothing is lost, the acknowledgment just does not send.

### 7. The Business Brain builder (`/brain`)

The interactive version of the worksheet: fifteen questions, one at a time,
and a paste-ready instruction document assembled from the answers. Visitors
copy or download it themselves (works with zero backend); "Email it to me"
posts the structured answers to the `brain-send` Edge Function, which saves
the row to `business_brains`, rebuilds the document server-side from the
fixed template, and mails it. It also pings info@ so completions are seen.

One-time setup:

1. Run the **business_brains block** at the end of `supabase/schema.sql` in the
   Supabase SQL editor (idempotent, safe to re-run).
2. Deploy the function — JWT verification stays ON:

   ```bash
   supabase functions deploy brain-send
   ```

3. Secrets: same as section 6 — `RESEND_API_KEY` and `PURCHASE_EMAIL_FROM`
   (optional `CONTACT_NOTIFY_EMAIL`, `SITE_URL`). Nothing new to create.

> **Keep the two templates in sync.** `buildBrainMarkdown` in
> `src/lib/brain.ts` and `buildBrain` in
> `supabase/functions/brain-send/index.ts` must stay character-for-character
> identical — the on-screen copy and the emailed copy are built from them.

Without the function deployed, the builder still fully works: Copy and
Download are pure browser, and the email button just shows the "you already
have it" fallback. Drafts persist in localStorage regardless.

During the live class: say "take out your phone, go to **growthcred.co.za/brain**".
Every completion lands in the `business_brains` table with the builder's
own lead (captured into `leads` on start, source `brain_builder`).

## Rollback

The cPanel path is untouched: push to GitHub → cPanel Git → Update from Remote →
Deploy HEAD. If Pages misbehaves, point DNS back and nothing is lost.
