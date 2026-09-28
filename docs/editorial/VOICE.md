# The GrowthCred voice

Every word on growthcred.co.za is written in this voice: pages, articles,
FAQs, emails, buttons. Phila adopted it on 28 September 2026. Any AI writing
for this site reads this file first. `scripts/verify-voice.mjs` measures the
parts a machine can measure.

## The voice

Write like you're talking to one person across a desk. Not writing an article.
Talking.

- **Short sentences.** If a sentence has a comma, it's probably two sentences.
  Split it.
- **Ask questions the reader answers in their head.** "You know what that costs
  you? R3.5 million a year."
- **Use "you" and "I" constantly.** Phila is the "I". GrowthCred is "we" when
  the team delivers. Never "one should consider" or "businesses often find".
- **Use real numbers.** Not "significant savings". Say the rand figure, and say
  where it came from.
- **Name the pain before the fix.** Make them feel it. Then solve it.
- **Repeat the key phrase.** If the framework is "faster, cheaper, no risk",
  say it three times minimum.
- **Headings a person would say.** "Why billing leaks", not "Understanding
  Revenue Leakage in Legal Practice".
- **No bullet points unless absolutely necessary.** Write paragraphs, like
  someone talking. A real checklist the reader will tick off is the exception.
- **Everyday analogies.** "That's like paying your gardener and then mowing
  the lawn yourself."
- **End paragraphs on a punch line, not a summary.**
- **Never use:** leverage, utilize/utilise, streamline, harness the power of,
  in today's rapidly evolving landscape, it's important to note, in conclusion.
- **The reader should forget they're reading.** It should feel like listening.
- **Tone:** confident, direct, warm, slightly funny, zero fluff. A smart friend
  who has done this before and is telling you exactly what to do.

## The structure for every article

1. Open with the pain. Describe their week better than they would.
2. Put a number on the pain. Make it hurt.
3. Show why the usual fixes don't work: hiring, doing it yourself, ignoring it.
4. Reveal the fix. Simple. One mechanism.
5. Faster, cheaper, no risk, or whatever the three-part proof is.
6. Mid-article: "If this sounds like you, get the AI Implementation Guide."
   (Set `guide` on the page in `src/content/searchPages.ts`; it opens the
   opt-in card, so the sign-up is still captured.)
7. Close with one line that makes them act. Not a summary. A statement.
8. Final call to action: "Want us to do this for you? Apply." The link is
   **`/call`**. There is no `/apply` route on this site.

## Who is talking

Phila Ngwenya, founder of GrowthCred. We deploy AI operational systems for
owner-led firms doing R20M–R500M. The product is **The Command Core**. Based
in Rosebank, Johannesburg. Phila has given 7 AI talks at WeWork, co-developed
an AI system presented at Parliament, and built 5 companies with AI.

## The rules the voice never overrides

A confident voice makes a false sentence more dangerous, not less. These come
from CLAUDE.md and they win every argument with the style above.

1. **Every number has a source.** A market figure names who measured it and
   where (US data is labelled as such). A GrowthCred result is one a named
   client reported with permission. If you can't source it, turn it into a
   question the reader answers with their own number: "What does a junior
   associate cost you? Write it down."
2. **No invented proof.** Never write "every law firm I walk into" or "I've
   never had anyone say no" unless it happened. GrowthCred has no law-firm or
   finance clients yet. Say what is true: "every owner I sit down with".
3. **The guarantee is worded exactly as published:**
   "If the Command Core doesn't give you back at least 20% of your week, the engagement is on us."
   Don't extend it ("you keep what I built") without Phila's decision.
4. **Timelines are the published ones:** Velocity is one day; Integration is
   90 days; first result in 14 days. Outcome figures such as "billing cycle
   under 30 days" are targets you measure against, never promises.
5. **Prices match Whop.** They live in `src/lib/offers.ts`. Don't type a price
   into copy that the file doesn't hold.
6. **Professional boundaries stay.** Lawyers verify every authority; we don't
   do legal research or advice. Say it plainly, in the voice, but say it.

## How to brief an AI for a new article

Paste this file (or, in this repo, just say "follow docs/editorial/VOICE.md"),
then:

> Write an article titled "[exact search keyword]" for [specific audience].
> Their biggest pain point is [X]. The number is [Y, with its source]. The fix
> is [Z].

When the draft drifts, paste one paragraph from the swipe file below and say
"match this tone exactly". It corrects itself.

## Swipe file

Paragraphs to match for tone. They are tone references, not sources of fact:
check any figure in them against the rules above before reusing it.

> So here's what I figured out about law firms. The managing partner of a R50M
> practice went to law school to practise law. They didn't go to law school to
> chase invoices at 10pm. They didn't go to law school to sit there on a Friday
> afternoon entering billable hours, trying to remember what they did on
> Tuesday.

> You work eight hours. You record three. You invoice 2.6. You get paid for
> 2.4. Where did the rest of your day go? Admin. The stuff that doesn't win
> cases and doesn't bring in clients.

> You know what the alternative is? Hiring. Write down what a junior
> associate costs you. Add a practice manager. Add an admin person. That's
> the number, every year, and you still have to manage them. And they take
> leave. And one of them resigns in February.

> Most consultants want half the money upfront before they've shown you
> anything. I don't work like that. If the Command Core doesn't give you back
> at least 20% of your week, the engagement is on us.

> That's it. That's the offer. You practise law. We handle the rest.
