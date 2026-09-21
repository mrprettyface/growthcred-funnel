/**
 * The Business Brain: fifteen questions, and the instruction document they
 * assemble into.
 *
 * Single source of truth for the /brain builder and the downloadable
 * worksheet's slot system: same fifteen questions, same template. The
 * `brain-send` Edge Function repeats `buildBrainMarkdown` server-side (the
 * one place this rule bends) so the email it sends is always the fixed
 * template with the visitor's own answers — never arbitrary content.
 */
export type BrainAnswers = {
  q1: string;
  q2: string;
  q3: string;
  q4: string;
  q5: string;
  q6: string;
  q7: string;
  q8: string;
  q9: string;
  q10: string;
  q11: string;
  q12: string;
  q13: string;
  q14: string;
  q15: string;
};

export type BrainQuestion = {
  id: keyof BrainAnswers;
  num: number;
  part: string;
  title: string;
  hint: string;
  placeholder: string;
  /** Optional questions may be skipped; they render as a plain tone note in the MD. */
  optional?: boolean;
};

export const BRAIN_QUESTIONS: BrainQuestion[] = [
  {
    id: "q1", num: 1, part: "What you sell",
    title: "What does your business actually do, in one sentence a client would understand?",
    hint: "No industry jargon. Write it the way you would say it across a table.",
    placeholder: "We fit solar backup systems for homes in the east of Pretoria…",
  },
  {
    id: "q2", num: 2, part: "What you sell",
    title: "Which three to five things do clients pay you for most often?",
    hint: "Your money jobs. If AI only knows these, it already covers 80% of your admin.",
    placeholder: "1. Backup installs  2. Certificate of compliance  3. Panel upgrades…",
  },
  {
    id: "q3", num: 3, part: "What you sell",
    title: "What does a typical job look like, start to finish?",
    hint: "The milestones: enquiry → quote → deposit → work → handover → final payment. Your version of that chain.",
    placeholder: "Site visit → written quote within 2 days → 50% deposit → install → sign-off → invoice",
  },
  {
    id: "q4", num: 4, part: "Who you serve",
    title: "Who is your ideal client?",
    hint: "Industry, size, situation. “Owner-managed construction firms, 10–40 staff, tendering for the first time.”",
    placeholder: "Homeowners in older suburbs whose DB boards predate 2000…",
  },
  {
    id: "q5", num: 5, part: "Who you serve",
    title: "What problem do they hire you to make go away?",
    hint: "The thing they complain about at dinner, in their own words if you can.",
    placeholder: "“The power goes out and I lose a day of work every time.”",
  },
  {
    id: "q6", num: 6, part: "Who you serve",
    title: "Who is NOT your client — what do you say no to?",
    hint: "This one keeps AI from writing desperate copy that chases the wrong work.",
    placeholder: "We don't do small repairs under R2,000, and we don't work on rentals…",
  },
  {
    id: "q7", num: 7, part: "How you sound",
    title: "Three words for how you want to sound.",
    hint: "e.g. plain, warm, direct. Or: precise, calm, no-nonsense. Pick yours.",
    placeholder: "Plain, direct, calm",
  },
  {
    id: "q8", num: 8, part: "How you sound",
    title: "Words or phrases you would never use — and ones you always use.",
    hint: "Never: “synergy”, “delve”, “at your earliest convenience”. Always: your greet, your sign-off, your name for the thing you sell.",
    placeholder: "Never 'synergy' or 'solutions provider'. Always start 'Hi [name]' and sign '— Sipho'.",
  },
  {
    id: "q9", num: 9, part: "How you sound",
    title: "Paste in a message you wrote that you were proud of.",
    hint: "An email, a quote intro, a WhatsApp reply that got the job. One real example teaches tone better than any adjective.",
    placeholder: "Hi Mr Dlamini, the quote is attached. To be straight with you…",
    optional: true,
  },
  {
    id: "q10", num: 10, part: "Money",
    title: "How do you price — and what are the typical numbers?",
    hint: "Hourly, day rate, fixed per job, retainer. Give one or two real ranges so AI stops making figures up.",
    placeholder: "Fixed quote per job. Standard backup install R18k–R45k depending on size…",
  },
  {
    id: "q11", num: 11, part: "Money",
    title: "Payment terms you always use.",
    hint: "e.g. 50% deposit, 50% on handover. Invoice payable within 7 days. Your standard, written down.",
    placeholder: "50% deposit to book, 50% on handover. Invoices payable in 7 days.",
  },
  {
    id: "q12", num: 12, part: "Money",
    title: "What do you flex on, and what do you never budge on?",
    hint: "Where discounts are allowed, and the hill you will die on. AI negotiates better when it knows the fences.",
    placeholder: "Can flex on timeline for loyal clients. Never budge on deposit or COC compliance.",
  },
  {
    id: "q13", num: 13, part: "Rules & edge cases",
    title: "What must AI never do or say in your name?",
    hint: "No guarantees of outcomes? No legal or tax advice? Never mention competitors? Never invent a client name? List it.",
    placeholder: "Never promise a specific saving. Never give legal advice. Never invent prices.",
  },
  {
    id: "q14", num: 14, part: "Rules & edge cases",
    title: "The questions clients always ask — and your standard answers.",
    hint: "Two or three is enough. AI answering these correctly on the first try is the moment people gasp.",
    placeholder: "'How long will I be without power?' — Usually 4–6 hours for a standard install.",
  },
  {
    id: "q15", num: 15, part: "Rules & edge cases",
    title: "The one thing that, if AI got it wrong, would embarrass you.",
    hint: "A misquoted price, the wrong client title, a broken promise. Name it, and AI will treat it as sacred too.",
    placeholder: "Quoting a price before the site visit. Never do it.",
  },
];

export const EMPTY_ANSWERS: BrainAnswers = {
  q1: "", q2: "", q3: "", q4: "", q5: "", q6: "", q7: "",
  q8: "", q9: "", q10: "", q11: "", q12: "", q13: "", q14: "", q15: "",
};

/** A question counts as answered when it has real text (or is optional). */
export function isAnswered(q: BrainQuestion, answers: BrainAnswers): boolean {
  return q.optional || answers[q.id].trim().length > 0;
}

export function answeredCount(answers: BrainAnswers): number {
  return BRAIN_QUESTIONS.filter((q) => answers[q.id].trim().length > 0).length;
}

/**
 * Assemble the paste-ready instruction document. MUST stay character-for-
 * character identical to the template inside `supabase/functions/brain-send`,
 * which regenerates the same document server-side before emailing it.
 */
export function buildBrainMarkdown(answers: BrainAnswers): string {
  const get = (id: keyof BrainAnswers): string => {
    const value = answers[id].trim();
    return value || `[fill in: ${id.toUpperCase()}]`;
  };

  return [
    `You are the AI assistant for ${get("q1")}.`,
    ``,
    `WHO WE SERVE`,
    `Our ideal client is ${get("q4")}. They hire us to make ${get("q5")} go away.`,
    `We do not serve ${get("q6")}.`,
    ``,
    `WHAT WE DO`,
    `The work clients pay for most is ${get("q2")}. A typical job runs like this: ${get("q3")}.`,
    ``,
    `HOW I SOUND`,
    `Write ${get("q7")}. Never use ${get("q8")}.`,
    answers.q9.trim()
      ? `Match the tone of this real example of mine: "${answers.q9.trim()}"`
      : `Match a plain, human tone in everything you write for me.`,
    ``,
    `MONEY`,
    `We price by ${get("q10")}, on terms of ${get("q11")}.`,
    `We can flex on ${get("q12")}.`,
    ``,
    `RULES`,
    `Never ${get("q13")}. When clients ask ${get("q14")}, answer faithfully from what I wrote here.`,
    `Above all, never get ${get("q15")} wrong — ask me before assuming.`,
    ``,
    `If anything I ask for needs a detail you do not have, ask me one short question instead of guessing.`,
  ].join("\n");
}

/* ---------------- Email delivery ---------------- */

/**
 * Ask the `brain-send` Edge Function to email this brain to its owner. Only
 * the structured answers travel: the email body is rebuilt server-side from
 * the same fixed template, so the endpoint can never be used to send
 * arbitrary content to arbitrary addresses.
 */
export async function sendBrainEmail(
  name: string,
  email: string,
  answers: BrainAnswers,
): Promise<{ ok: boolean; error?: string }> {
  const base = import.meta.env.VITE_SUPABASE_URL ?? "";
  const key = import.meta.env.VITE_SUPABASE_ANON_KEY ?? "";
  if (!base || !key) return { ok: false, error: "not_configured" };
  try {
    const res = await fetch(`${base}/functions/v1/brain-send`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${key}`,
        apikey: key,
      },
      body: JSON.stringify({ name: name.trim(), email: email.trim(), answers }),
    });
    if (res.ok) return { ok: true };
    if (res.status === 429) return { ok: false, error: "rate_limited" };
    return { ok: false, error: `http_${res.status}` };
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : "network_error" };
  }
}

/* ---------------- Draft persistence ---------------- */

const DRAFT_KEY = "gc_brain_draft";

export function loadDraft(): { answers: BrainAnswers; step: number } | null {
  try {
    const raw = localStorage.getItem(DRAFT_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as { answers: BrainAnswers; step: number };
    if (!parsed || typeof parsed !== "object" || !parsed.answers) return null;
    return { answers: { ...EMPTY_ANSWERS, ...parsed.answers }, step: parsed.step ?? 0 };
  } catch {
    return null;
  }
}

export function saveDraft(answers: BrainAnswers, step: number): void {
  try {
    localStorage.setItem(DRAFT_KEY, JSON.stringify({ answers, step }));
  } catch {
    // Private browsing / storage blocked: the builder still works, the draft
    // just does not survive a refresh. Never fatal to UX.
  }
}

export function clearDraft(): void {
  try {
    localStorage.removeItem(DRAFT_KEY);
  } catch {
    /* same tolerance as saveDraft */
  }
}

