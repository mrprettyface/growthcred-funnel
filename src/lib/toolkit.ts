/**
 * The 10 Hours Back System, as handed to the JCCI webinar room.
 *
 * Every resource here is a real file in public/downloads/toolkit/. The guides
 * (where, how, win, ideas, by industry) are written from what each file
 * actually contains, so a step on this page is always a step in the file.
 *
 * Deliberately NOT in the public kit: 12 Delivery Page Copy, 13 Research Log,
 * 14 Test Log, 15 Promise Traceability Table and 16 Promise Gaps. They are
 * GrowthCred's internal build records, marked "not for distribution".
 *
 * No invented numbers. Hour estimates quoted here are the kit's own, and are
 * labelled as estimates. The kit's promise line is repeated as written:
 * "Results vary, and what you get depends on what you do."
 */

export type FileKind = "pdf" | "docx" | "xlsx" | "zip";
export type FileRef = { kind: FileKind; href: string; cta: string };

export type IndustryKey = "pro" | "trades" | "retail" | "hospitality" | "health" | "ops";

export type GroupKey = "start" | "engines" | "kits" | "safe";

export type Resource = {
  id: string;
  num: string;
  title: string;
  /** Short name for links ("Brain Builder"). */
  short: string;
  group: GroupKey;
  type: string;
  time: string;
  promise: string;
  files: FileRef[];
  where: string;
  trigger: string;
  how: string[];
  win: string;
  inside: string[];
  ideas: string[];
  byIndustry: Record<IndustryKey, string>;
};

const D = "/downloads/toolkit/";
const pdf = (f: string, cta = "Read the PDF"): FileRef => ({ kind: "pdf", href: `${D}${f}.pdf`, cta });
const docx = (f: string, cta = "Edit in Word"): FileRef => ({ kind: "docx", href: `${D}${f}.docx`, cta });
const xlsx = (f: string, cta = "Open in Excel"): FileRef => ({ kind: "xlsx", href: `${D}${f}.xlsx`, cta });

export const TOOLKIT = {
  partner: "JCCI",
  when: "18 November 2026",
  name: "The 10 Hours Back System",
  headline: "You came for the talk. Take the whole system home.",
  sub: "The 10 Hours Back System: the playbooks, templates and trackers behind tonight’s session. It’s normally a paid GrowthCred package. If you were in the room, it’s yours.",
  welcomeTail: "Your kit is ready.",
  welcomeSub:
    "Here’s the thing about free kits. Most people download them and never open them. So this page doesn’t just hand you files. It tells you which one to open first, what to do with it, and what it looks like in a business like yours.",
  closeTitle: "Want it built for you instead?",
  closeBody:
    "The kit teaches the system. It can’t sit next to you, catch your mistakes or hold you to a deadline. If you’d rather we set it up in your business with you, apply. I’ll tell you honestly if it’s a fit.",
  promiseLine: "Results vary, and what you get depends on what you do.",
} as const;

export const INDUSTRIES: { key: IndustryKey; label: string }[] = [
  { key: "pro", label: "Professional services" },
  { key: "trades", label: "Construction & trades" },
  { key: "retail", label: "Retail & e-commerce" },
  { key: "hospitality", label: "Food, hospitality & events" },
  { key: "health", label: "Health, beauty & wellness" },
  { key: "ops", label: "Logistics, security & manufacturing" },
];

export const GROUPS: { key: GroupKey; title: string; teaser: string; line: string }[] = [
  {
    key: "start",
    title: "Start here",
    teaser: "the 10-day route, the tracker, the tool guide",
    line: "Open these first. They tell you what to do each day, which tool to use, and whether it’s working.",
  },
  {
    key: "engines",
    title: "The four engines",
    teaser: "Brain, Reply, Research and Admin playbooks",
    line: "Every hour of your week is one of four jobs. One playbook for each. The Brain comes first because the other three run on it.",
  },
  {
    key: "kits",
    title: "Copy-paste kits",
    teaser: "every prompt, plus quote, invoice and report templates",
    line: "No reading required. Copy, fill in the brackets, send.",
  },
  {
    key: "safe",
    title: "Safe & team-ready",
    teaser: "a POPIA-safe AI policy, safety rules, team training",
    line: "Use AI without leaking client information, and get your people using it the same way you do.",
  },
];

export const RESOURCES: Resource[] = [
  /* ---------------- Start here ---------------- */
  {
    id: "quick-start",
    num: "05",
    title: "First 10 Hours Back: Quick Start",
    short: "Quick Start",
    group: "start",
    type: "10-day plan",
    time: "30 min a day",
    promise: "Ten days, thirty minutes a day. One small job each day, in the order that pays back fastest.",
    files: [pdf("05-first-10-hours-back-quick-start"), docx("05-first-10-hours-back-quick-start")],
    where:
      "This is the map for the whole kit. Every day points you to one part of one playbook, so you never have to decide what to read next.",
    trigger: "you’ve downloaded everything and don’t know where to begin. Begin here.",
    how: [
      "Print it, or open it on your laptop next to your phone.",
      "Do Day 0 tonight: write down the ten jobs you repeat every week. Ten minutes.",
      "Each day, do the one play it names. Stop when you hit the “done when” line.",
      "Tick the day off on the printable tracker at the back. Add up your hours at the end of week two.",
    ],
    win: "A business that answers, quotes, chases and reports with AI doing the first draft, built one 30-minute block at a time. The kit’s own target is ten hours back by day ten.",
    inside: [
      "Day 0: your list of ten jobs to hand to AI",
      "Days 1–10, each with a goal, the play, the time and a ‘done when’ line",
      "Bonus days 11–14: voice AI agent, n8n, KPI reports, Reels",
      "A printable one-page tracker and a one-page prompt card",
    ],
    ideas: [
      "Do it with your business partner or manager. Same day, same play, compare answers on WhatsApp.",
      "Block 07:00–07:30 in your calendar for ten weekdays. Treat it like a client meeting.",
      "Stick the prompt card on the wall next to your desk. One prompt per day.",
    ],
    byIndustry: {
      pro: "Your Day 0 list will be full of proposals, client update emails and engagement letters. Those map straight onto Days 1, 4 and 8.",
      trades: "Your Day 0 list is probably site quotes, ‘when are you coming?’ messages and chasing deposits. Days 2, 5, 8 and 9 hit all of them.",
      retail: "Expect your Day 0 list to be stock questions, delivery questions and order follow-ups. Days 2, 3 and 5 take those first.",
      hospitality: "Bookings, quotes for functions and ‘are you open?’ messages. Days 2, 3 and 8 are your big wins.",
      health: "Booking requests, price questions and no-show follow-ups. Days 2, 3 and 5 clear most of them.",
      ops: "Quotes, tender paperwork and weekly reporting to the owner. Days 7, 8 and 10 are where your hours hide.",
    },
  },
  {
    id: "hours-tracker",
    num: "09",
    title: "Hours Saved Tracker",
    short: "Hours Tracker",
    group: "start",
    type: "Excel tracker",
    time: "5 min a week",
    promise: "Write down minutes before and minutes after. It adds up the hours you got back, automatically.",
    files: [xlsx("09-hours-saved-tracker", "Open the tracker")],
    where:
      "This is how you know the system is working, instead of hoping it is. It sits next to the Quick Start and gets one line for every system you switch on.",
    trigger: "you finish a day in the Quick Start, or it’s Friday afternoon and you want to know if this week was better.",
    how: [
      "Open it in Excel, or upload it to Google Sheets (File → Import).",
      "Read the ‘How to use’ tab. It’s one page.",
      "For each task, write the minutes it took per week before AI, then after.",
      "The sheet works out minutes and hours saved. Check the total every Friday.",
    ],
    win: "A real number for the hours you got back, per task, per week. Not a feeling.",
    inside: [
      "A tracker tab with formulas already in: before, after, minutes saved, hours saved",
      "A one-page ‘How to use’ tab",
    ],
    ideas: [
      "Put the weekly total into your Monday Report. It’s the best line in it.",
      "Give each staff member their own copy. Compare in your Monday meeting.",
      "Multiply the hours by what your hour is worth. That’s what this kit is paying you.",
    ],
    byIndustry: {
      pro: "Track the non-billable hours: proposals, admin, chasing. Those are the ones you never get paid for.",
      trades: "Track quoting and invoicing time. That’s the work you do at night after site.",
      retail: "Track time on customer messages and order admin. It usually beats your time on actual selling.",
      hospitality: "Track booking admin and function quotes. That’s time stolen from the floor.",
      health: "Track booking and reminder admin. Every minute there is a minute not with a client.",
      ops: "Track reporting and paperwork per supervisor. It adds up fast across a team.",
    },
  },
  {
    id: "tool-stack",
    num: "17",
    title: "Tool Stack & Setup Guide",
    short: "Tool Stack",
    group: "start",
    type: "Setup guide",
    time: "Read 25 min · set up 1 tool a week",
    promise: "Which tool to open, what it costs, what the free version won’t do, and the exact steps to get it working.",
    files: [pdf("17-tool-stack-and-setup-guide"), docx("17-tool-stack-and-setup-guide")],
    where:
      "Every other guide says AI can help. This one names the actual tools for each job, with the free pick, the paid step up, and where each one stops.",
    trigger: "you’re about to pay for an AI subscription, or someone in a WhatsApp group just told you about ‘the best AI tool’.",
    how: [
      "Read the tool table first. Find the one job you care about most this week.",
      "Pick the free tool it names for that job. Only that one.",
      "Follow that job’s step-by-step setup (writing, finding, replying, admin or voice).",
      "Use it for a week before you add the next. That’s how this becomes a system instead of a hobby.",
    ],
    win: "A working setup for one job, and a clear picture of what a full system costs each month before you spend a cent.",
    inside: [
      "A tool table by job: free pick, paid step up, where it stops",
      "Five step-by-step setups: writing, finding, replying, admin, voice",
      "The Brain, upgraded: three short files and seven folders",
      "One bot for the whole team, and what stays human",
      "A monthly cost sheet",
    ],
    ideas: [
      "Before renewing any software, check it against the cost sheet. You may be paying for something free.",
      "Use the team-bot section to decide what your staff may and may not hand to AI.",
      "Run the voice-agent setup on test calls only first. Free plans are for testing.",
    ],
    byIndustry: {
      pro: "Start with the writing engine setup. Proposals and client emails are your biggest drain.",
      trades: "Start with the admin engine setup. Quotes from a voice note, straight from site.",
      retail: "Start with the reply engine setup. Your customers live on WhatsApp.",
      hospitality: "Start with the reply engine, then look at the voice setup for after-hours bookings.",
      health: "Start with the reply engine. Then read the voice section with the safety playbook open next to it.",
      ops: "Start with the finding engine for tenders, then the team bot for your supervisors.",
    },
  },

  /* ---------------- The four engines ---------------- */
  {
    id: "brain",
    num: "01",
    title: "Brain Builder Playbook",
    short: "Brain Builder",
    group: "engines",
    type: "Playbook · 25 pages",
    time: "15 min to start",
    promise: "Write your business down once. Every AI chat after that starts from your Brain, not from scratch.",
    files: [pdf("01-brain-builder-playbook"), docx("01-brain-builder-playbook", "Fill in the template")],
    where:
      "This is the one the whole talk was about. Prompts don’t save time, systems do, and the Brain is the system. The Reply, Research and Admin engines all run on it.",
    trigger: "you catch yourself explaining your business to ChatGPT for the third time this week.",
    how: [
      "Open a fresh chat in ChatGPT, Claude or Gemini. The free version is fine.",
      "Fill in the One-Page Brain template in Part 3. Use the Word file so you can type straight into it.",
      "Paste it in and say: “This is my Business Brain. Remember it for every reply.”",
      "Ask it one real question about your business. If it answers right, you’re done.",
      "Then run the Voice Copy prompt in Part 5 with four of your real messages, so it sounds like you.",
    ],
    win: "AI that knows what you sell, who you sell to, your prices and how you talk. You stop re-explaining. Every reply starts closer to finished.",
    inside: [
      "The One-Page Brain template",
      "Three filled examples: a salon, an import/export business, an electrician",
      "The Voice Copy method, with before-and-after examples",
      "A POPIA-safe Rulebook, linked to the AI Policy",
      "Free-tier limits for ChatGPT, Claude and Gemini, date-stamped",
      "Your Brain as the knowledge base for a voice AI agent",
    ],
    ideas: [
      "Make a Brain for each part of the business: one for sales, one for support, one for hiring.",
      "Give a new staff member the Brain on day one. It’s the fastest induction you’ll ever write.",
      "Read your Brain out loud. If it doesn’t sound like you, the AI won’t either.",
    ],
    byIndustry: {
      pro: "Put in your services, your fee approach, how you scope work and the tone of your client emails. Then every proposal draft starts in your voice.",
      trades: "Copy the electrician example. Your rates, call-out fee, areas you cover, how you quote. Then quotes and replies come out right first time.",
      retail: "Put in your bestsellers, delivery areas and times, returns policy and payment options. That’s 80% of what customers ask.",
      hospitality: "Menu, function packages, capacity, deposit rules, trading hours. Then booking replies write themselves.",
      health: "Copy the salon example. Services, durations, prices, cancellation rules. Never put client health details in it.",
      ops: "Your services, sites, compliance documents, rates and who signs off what. The research and admin engines lean on this hard.",
    },
  },
  {
    id: "reply",
    num: "02",
    title: "Reply Playbook",
    short: "Reply Playbook",
    group: "engines",
    type: "Playbook · 21 pages",
    time: "15 min to start",
    promise: "Stop typing the same WhatsApp answer over and over. Answer once, reuse forever.",
    files: [pdf("02-reply-playbook"), docx("02-reply-playbook")],
    where:
      "This is the Reply Engine. It lives in WhatsApp Business on your phone, because that’s where your customers already are.",
    trigger: "you’ve just typed your prices, your address or your hours for the fifth time today.",
    how: [
      "Open WhatsApp Business → Settings → Business tools → Quick replies.",
      "Tap + and make a shortcut like /price. Type the full answer once. Save.",
      "Do the 15-minute Same-Question Killer in Part 1 to find your top ten questions.",
      "Turn those into Quick Replies, then switch on your greeting and away messages (Part 3).",
      "Set up the day 2, 5 and 10 follow-ups in Part 5 so no lead goes cold.",
    ],
    win: "Customers get a good answer in seconds, even at night. You stop losing leads that never got a follow-up.",
    inside: [
      "The Same-Question Killer: a 15-minute exercise",
      "30+ Quick Reply templates to copy into WhatsApp",
      "The 60-Second Reply: greeting, away message, labels, catalogue, profile",
      "An honest page on what’s free and what’s paid on WhatsApp Business",
      "The Follow-Up Loop: day 2, 5 and 10 templates plus a tracker",
      "A voice AI agent that answers your phone from the same Brain",
    ],
    ideas: [
      "Use WhatsApp labels as a mini-CRM: New lead, Quoted, Paid, Follow up.",
      "Make a /reviews quick reply that sends your Google review link after every job.",
      "Have your staff use the same quick replies, so every customer gets the same quality answer.",
    ],
    byIndustry: {
      pro: "Quick replies for ‘what do you charge?’, ‘what do you need from me?’ and ‘where are we on my matter?’. The away message sets expectations after hours.",
      trades: "A /callout reply with your call-out fee and areas, a /photos reply asking for pictures of the job, and follow-ups on every quote.",
      retail: "/delivery, /returns, /stock and /pay. Then use the WhatsApp catalogue so people can browse without asking.",
      hospitality: "/menu, /hours, /booking and /functions. Switch the away message on during service.",
      health: "/book, /prices, /cancel and a reminder template the day before. Fewer no-shows, fewer back-and-forth chats.",
      ops: "Replies for ‘where’s my delivery?’, ‘send your company docs’ and ‘can you quote this?’. Follow-ups on every tender enquiry.",
    },
  },
  {
    id: "research",
    num: "03",
    title: "Research Playbook",
    short: "Research Playbook",
    group: "engines",
    type: "Playbook · 22 pages",
    time: "15 min to start",
    promise: "Find the facts that win work: client files in five minutes, tenders read properly, funders found.",
    files: [pdf("03-research-playbook"), docx("03-research-playbook")],
    where:
      "This is the Research Engine. Use it before any big quote, tender or funding application, when getting one fact wrong costs you the deal.",
    trigger: "a tender lands, a big prospect asks for a proposal, or you’re about to apply for funding.",
    how: [
      "Open a Google Doc called “Client File, [name]”.",
      "Run the 5-Minute Client File prompt from Part 1.",
      "Check two facts against two different sources (Part 2). AI can be confidently wrong.",
      "For a tender: run the Tender Reader checklist in Part 3 and note every red flag.",
    ],
    win: "You walk into every quote, tender and funding application knowing more than the competition, and you stop missing closing dates and documents.",
    inside: [
      "The 5-Minute Client File prompt and template, plus the two-source check",
      "A Tender Reader: checklist, deadlines, scoring, red flags, draft cover letter",
      "SA tender documents explained: CIPC, CSD, SARS TCS PIN, B-BBEE, bank letter",
      "A Funder Pack: one-page profile, 12-month cash projection, funder summary",
      "SEDA/SEDFA, NEF, NYDA and IDC, checked on their official sites",
      "NotebookLM for turning notes and documents into reports",
    ],
    ideas: [
      "Build a client file for your top three clients before your next meeting with each.",
      "Keep a ‘tender documents’ folder with your CIPC, CSD, tax PIN and B-BBEE docs always current.",
      "Use the Funder Pack even if you’re not applying. It forces a clear 12-month cash view.",
    ],
    byIndustry: {
      pro: "Client files before every pitch meeting. You’ll know their business, their news and their people before you walk in.",
      trades: "The Tender Reader is your friend. Run it on every municipal or corporate tender before you spend a weekend on it.",
      retail: "Use the client-file prompt on suppliers and wholesale buyers, not just customers.",
      hospitality: "Research corporate clients before quoting year-end functions. Know their size and what they did last year.",
      health: "Use it to research medical aids, referral partners and suppliers. Never on patient details.",
      ops: "Tenders and compliance are your daily bread. The Tender Reader and the SA documents list will pay for themselves this month.",
    },
  },
  {
    id: "admin",
    num: "04",
    title: "Admin Playbook",
    short: "Admin Playbook",
    group: "engines",
    type: "Playbook · 17 pages",
    time: "15 min to start",
    promise: "Quotes from a voice note. Invoices that chase themselves. A Monday report in ten minutes.",
    files: [pdf("04-admin-playbook"), docx("04-admin-playbook")],
    where:
      "This is the Admin Engine. It turns the Friday-night jobs, quotes, invoices and reports, into templates and prompts you run in minutes.",
    trigger: "a customer asks “how much?”, an invoice is overdue, or it’s Monday morning and you don’t know your numbers.",
    how: [
      "Record a voice note of what the customer wants and the price.",
      "Paste the transcript into the Quote Machine prompt in Part 1. AI writes an itemised quote.",
      "Check the maths yourself with =SUM() in Google Sheets (Part 2). Never trust AI arithmetic.",
      "Set up the five Invoice Chaser messages in Part 3: before due, on due, 7 days, 14 days, final notice.",
      "Every Monday, run the Monday Report prompt in Part 6.",
    ],
    win: "Quotes out the same day. Invoices chased on schedule without you feeling awkward. You know your numbers every Monday.",
    inside: [
      "The Quote Machine: voice note to itemised quote",
      "The maths check: never trust AI arithmetic",
      "The Invoice Chaser: five reminders plus a tracker",
      "Payment terms and proof-of-payment wording",
      "The Monday Report: one-page template and a ten-minute prompt",
      "A voice AI agent for payment reminder calls",
    ],
    ideas: [
      "Record the quote voice note in the car right after the site visit. Quote sent before you get home.",
      "Put your payment terms in every quote. Most late payment starts with unclear terms.",
      "Send the Monday Report to your partner or bookkeeper. Someone else reading it keeps you honest.",
    ],
    byIndustry: {
      pro: "Turn meeting notes into a scoped proposal with the Quote Machine. The Invoice Chaser handles the awkward follow-up for you.",
      trades: "Voice note from site, quote out the same day. Deposit terms in every quote. This one is built for you.",
      retail: "Use the Invoice Chaser for wholesale and account customers. The Monday Report tracks sales, stock and overdue.",
      hospitality: "Function quotes from a voice note, with deposit terms. Monday Report for covers, takings and overdue accounts.",
      health: "Quote treatment packages cleanly. Use the chaser for unpaid accounts, and keep every message polite and private.",
      ops: "Quote Machine for repeat jobs, Invoice Chaser for 30-day accounts, Monday Report for the whole fleet or site.",
    },
  },

  /* ---------------- Copy-paste kits ---------------- */
  {
    id: "prompts",
    num: "10",
    title: "Prompt Vault",
    short: "Prompt Vault",
    group: "kits",
    type: "Prompt library · 9 pages",
    time: "Copy, paste, send",
    promise: "Every prompt from the kit in one place, sorted by the four jobs, each with a “use this when” line.",
    files: [pdf("10-prompt-vault"), docx("10-prompt-vault", "Copy from Word")],
    where: "Keep this one open all the time. It’s the shortcut drawer for the whole system.",
    trigger: "you know what you want AI to do but don’t want to think about how to ask.",
    how: [
      "Find the job: Writing, Finding, Replying or Admin.",
      "Read the “use this when” line. Pick the prompt that matches.",
      "Copy it, fill in the [brackets], send.",
      "Paste your One-Page Brain first if the chat doesn’t already have it.",
    ],
    win: "No more blank-page prompting. The right prompt in under a minute, every time.",
    inside: [
      "Writing: Quote Machine, Voice Copy, Monday Report, marketing posts and more",
      "Finding, Replying and Admin prompts, one card each",
      "A ‘use this when…’ line on every prompt",
    ],
    ideas: [
      "Save your five favourite prompts as notes on your phone.",
      "Turn your best prompts into WhatsApp Quick Replies to yourself, for one-tap copying.",
      "Make a team version with only the prompts your staff are allowed to use.",
    ],
    byIndustry: {
      pro: "Voice Copy and the writing prompts will carry your proposals and client updates.",
      trades: "Quote Machine and the invoice prompts. You’ll use them every week.",
      retail: "The marketing post and reply prompts. Product posts and customer answers in your voice.",
      hospitality: "Marketing posts for specials and events, plus the reply prompts for bookings.",
      health: "Reply and marketing prompts. Keep client details out, always ‘Client A’.",
      ops: "Finding prompts for tenders and suppliers, admin prompts for reports.",
    },
  },
  {
    id: "templates",
    num: "11",
    title: "Templates Pack",
    short: "Templates Pack",
    group: "kits",
    type: "Templates · Word + Excel",
    time: "Fill in and send today",
    promise: "Five templates you already do by hand: a quote, an invoice tracker, a follow-up tracker, a cash projection and a Monday report.",
    files: [
      xlsx("11-templates-workbook", "Trackers workbook"),
      docx("11-quote-template", "Quote template"),
      docx("11-monday-report-template", "Monday Report"),
      pdf("11-templates-pack", "The full pack"),
      docx("11-templates-pack", "Full pack in Word"),
    ],
    where: "These are the paperwork half of the Admin Playbook, ready to use. The spreadsheet ones live in one Excel workbook.",
    trigger: "you need to send a quote today, or you’ve lost track of who owes you money.",
    how: [
      "Download the workbook. It has three tabs: Invoice Tracker, Follow-Up Tracker and Cash Projection.",
      "Download the Quote and Monday Report templates in Word, or copy them into Google Docs.",
      "Fill in your business details once and save that as your master.",
      "For each new customer or week, copy the master and rename it. Never overwrite the master.",
    ],
    win: "Professional paperwork in minutes, and a clear view of who owes you, who needs a follow-up and what cash is coming.",
    inside: [
      "Quote template in Rands, with a maths check",
      "Invoice Tracker, Follow-Up Tracker (day 2/5/10) and 12-month Cash Projection in Excel",
      "Monday Report template: a ten-minute weekly review",
    ],
    ideas: [
      "Upload the workbook to Google Sheets so you can update it from your phone.",
      "Colour the Status column: red for overdue, amber for chased, green for paid.",
      "Show the cash projection to your bank or a funder. It answers their first question.",
    ],
    byIndustry: {
      pro: "Use the quote template for fixed-fee work and the follow-up tracker for every proposal you send.",
      trades: "Quote template for every job, invoice tracker for every deposit and balance.",
      retail: "Invoice tracker for account customers, cash projection for stock buying season.",
      hospitality: "Quote template for functions, cash projection for the quiet months.",
      health: "Follow-up tracker for enquiries that didn’t book, cash projection for planning hires.",
      ops: "Invoice tracker across all your 30-day accounts, cash projection for big contract months.",
    },
  },

  /* ---------------- Safe & team-ready ---------------- */
  {
    id: "policy",
    num: "06",
    title: "AI Policy for SA Small Business",
    short: "AI Policy",
    group: "safe",
    type: "Policy template · 3 pages",
    time: "20 min to fill in",
    promise: "A policy your staff can actually follow. POPIA-safe, in plain words, with the brackets ready to fill.",
    files: [docx("06-ai-policy-sa-small-business", "Fill in the policy"), pdf("06-ai-policy-sa-small-business")],
    where:
      "The rulebook for how your business uses AI. It covers what AI may be used for, what must never go into it, and the extra rules for voice AI on phone calls.",
    trigger: "your staff already use ChatGPT (they do), or a client asks how you protect their information.",
    how: [
      "Download the Word version.",
      "Fill in every bracket: business name, responsible person, the AI tools you use.",
      "Read section 4, ‘What must never go into public AI’, out loud at your next team meeting.",
      "Have everyone sign it. Diarise a review date one year out.",
    ],
    win: "A clear line your team won’t cross with client data, and a document you can show a client who asks. It’s a template, not legal advice, so check it with your own advisor.",
    inside: [
      "What AI may be used for, and what must never go into public AI",
      "Voice AI phone-call rules, linked to POPIA sections",
      "POPIA responsibilities: security, operators, breaches, cross-border",
      "The two-source check, and who is responsible",
      "Fill-in blanks for your business",
    ],
    ideas: [
      "Add one line to your email signature: ‘We use AI under a written POPIA-safe policy.’",
      "Make it part of every new hire’s first-day pack.",
      "Turn section 4 into a poster for the office wall.",
    ],
    byIndustry: {
      pro: "Client confidentiality is your product. This is the first file to send your partners.",
      trades: "Short and simple: no ID numbers, no bank details, ‘Client A’ instead of names.",
      retail: "Customer addresses and card details stay out of AI. This makes that rule official.",
      hospitality: "Guest details and booking info stay out of public AI. Put it in your staff induction.",
      health: "Health information is the most sensitive data there is. Fill this in before anyone on your team uses AI again.",
      ops: "Employee IDs, site access details and client contracts stay out of public AI. Sign it with every supervisor.",
    },
  },
  {
    id: "safety",
    num: "07",
    title: "AI Safety Playbook",
    short: "Safety Playbook",
    group: "safe",
    type: "Playbook · 15 pages",
    time: "15 min to start",
    promise: "Use AI without putting your clients or your business at risk. What AI gets wrong, and what never to share.",
    files: [pdf("07-ai-safety-playbook"), docx("07-ai-safety-playbook")],
    where: "The ‘why’ behind the policy. Read it once yourself, then use the short safety talk in Part 4 with your team.",
    trigger: "you’re about to hand AI to your staff, or you’re about to set up a voice agent that talks to customers.",
    how: [
      "Agree today: no ID numbers, bank details or health info into public AI.",
      "Rename every client as ‘Client A’ before you paste anything.",
      "Read Part 1 on what AI gets wrong, so you know what to double-check.",
      "Give your team the short safety talk in Part 4. Then fill in the AI Policy.",
    ],
    win: "You get the speed of AI without the headline risk. Your team knows the no-go list.",
    inside: [
      "Watch-outs: confident mistakes and what never to share",
      "Keeping client info safe: anonymising, POPIA rules, secure storage",
      "Voice AI safety: recording notices, consent, AI disclosure",
      "A short safety talk you can give your team",
    ],
    ideas: [
      "Run the safety talk as a ten-minute standing meeting on Monday.",
      "Make ‘Client A’ a house rule. Say it until it sticks.",
      "Check every AI-written price, date and deadline against your real records before it goes out.",
    ],
    byIndustry: {
      pro: "Read Part 2 before anyone pastes a client document into AI. Anonymise first, always.",
      trades: "Part 1 matters most. AI can invent prices and specs. Check every number before it reaches a client.",
      retail: "Customer data stays private. Part 2 shows how to use AI on orders without exposing anyone.",
      hospitality: "If you add a voice agent for bookings, read Part 3 first: tell callers it’s automated and recorded.",
      health: "Read every page. Part 2 and Part 3 are written for exactly your risk.",
      ops: "Use Part 4 to train supervisors. They’re the ones most likely to paste a contract into ChatGPT.",
    },
  },
  {
    id: "training",
    num: "08",
    title: "AI Training Playbook",
    short: "Training Playbook",
    group: "safe",
    type: "Playbook · 17 pages",
    time: "15 min to start",
    promise: "How you teach yourself, and your team, to use AI well. Every engine, with a printable cheat sheet.",
    files: [pdf("08-ai-training-playbook"), docx("08-ai-training-playbook")],
    where: "Your in-house training course. It walks through the Brain and all four engines in order, so your team learns the system, not random tricks.",
    trigger: "you want your staff doing this too, not just you.",
    how: [
      "Start with Part 1: build the One-Page Brain together as a team.",
      "Do one engine per week: Writing, Finding, Reply, Admin (Parts 2–5).",
      "Print the one-page cheat sheet and put it at every desk.",
      "Add voice AI last (Part 6), only once the text engines are working.",
    ],
    win: "A team that uses AI the same way you do, with the same Brain and the same rules. Trained once, used forever.",
    inside: [
      "Your One-Page Brain",
      "Writing, Finding, Reply and Admin engines, one part each",
      "Adding voice AI to your team",
      "A one-page printable cheat sheet",
    ],
    ideas: [
      "Make Friday 30 minutes ‘AI hour’ for four weeks. One engine each week.",
      "Pair your most AI-curious staff member with your most sceptical one.",
      "Ask each person to bring one task they hate. Fix it live with the playbook.",
    ],
    byIndustry: {
      pro: "Train your admin and junior staff first. They do most of the repeat writing.",
      trades: "Train whoever answers the phone and does the quotes. That’s where the hours are.",
      retail: "Train your shop and online staff on the Reply engine first.",
      hospitality: "Train front-of-house and your events person on replies and quotes.",
      health: "Train reception first, with the Safety Playbook alongside.",
      ops: "Train supervisors and the admin office on the Admin and Finding engines.",
    },
  },
];

export const resourceById = (id: string) => RESOURCES.find((r) => r.id === id) ?? null;

/** "What's eating your week?" Each answer names the file to open first. */
export const PAINS: { key: string; label: string; start: string; why: string }[] = [
  {
    key: "start",
    label: "Honestly? I don’t know where to start.",
    start: "quick-start",
    why: "Good. That’s what this one is for. Ten days, thirty minutes a day, and it tells you exactly what to do each day. Do Day 0 tonight.",
  },
  {
    key: "explain",
    label: "AI gives me generic answers. I keep re-explaining my business.",
    start: "brain",
    why: "That’s the Chat Trap from the talk. The fix isn’t a better prompt. It’s writing your business down once. Fifteen minutes and AI knows you.",
  },
  {
    key: "whatsapp",
    label: "Answering the same WhatsApp questions all day.",
    start: "reply",
    why: "Most of your messages are the same ten questions. Find them in fifteen minutes, answer them once, and reuse the answers forever.",
  },
  {
    key: "admin",
    label: "Quotes, invoices and chasing people to pay.",
    start: "admin",
    why: "Quote from a voice note, chase invoices on a schedule, and know your numbers every Monday. The Friday-night jobs, gone.",
  },
  {
    key: "research",
    label: "Tenders, funding and finding the right information.",
    start: "research",
    why: "Client files in five minutes, a checklist that reads tenders properly, and SA funders checked on their official sites.",
  },
  {
    key: "safety",
    label: "My team uses ChatGPT and I’m worried about client data.",
    start: "policy",
    why: "Fill in the brackets, read section 4 to your team, get it signed. Twenty minutes and there’s a written line nobody crosses.",
  },
];

/** The kit's own route, from the Quick Start. Day 0 to Day 10. */
export const FIRST_WEEK: { day: string; task: string; detail: string; resource: string }[] = [
  { day: "Day 0 · tonight", task: "List 10 jobs to hand to AI", detail: "The jobs you repeat every week. Those are the ones that give hours back.", resource: "quick-start" },
  { day: "Day 1", task: "Build your Brain", detail: "Fill in the One-Page Brain and paste it into your AI. Done when it answers one question right.", resource: "brain" },
  { day: "Day 2", task: "Same-Question Killer", detail: "Find your ten most common questions. Save five Quick Replies.", resource: "reply" },
  { day: "Day 3", task: "60-Second Reply", detail: "Greeting, away message, labels and profile. Customers answered while you sleep.", resource: "reply" },
  { day: "Day 4", task: "Voice Copy", detail: "Give AI four real messages. Done when one reply sounds like you.", resource: "brain" },
  { day: "Day 5", task: "Follow-Up Loop", detail: "Day 2, 5 and 10 follow-ups plus a tracker. No lead falls through.", resource: "reply" },
  { day: "Day 6", task: "5-Minute Client File", detail: "A one-page file for your top three clients.", resource: "research" },
  { day: "Day 7", task: "Tender Reader", detail: "Run the checklist on one tender. Note every red flag.", resource: "research" },
  { day: "Day 8", task: "Quote Machine", detail: "Turn a voice note into an itemised quote. Check the maths yourself.", resource: "admin" },
  { day: "Day 9", task: "Invoice Chaser", detail: "Save the five reminder templates. Get paid on time.", resource: "admin" },
  { day: "Day 10", task: "Monday Report", detail: "Your first ten-minute weekly review. Then add up your hours.", resource: "templates" },
  { day: "Days 11–14 · bonus", task: "Voice AI and beyond", detail: "A voice agent that answers the phone, n8n, KPI reports and Reels. Only once Days 1–10 are done.", resource: "quick-start" },
];

export const TOOLKIT_FAQ: { q: string; a: string }[] = [
  {
    q: "Is this really free?",
    a: "Yes. The kit is normally a paid GrowthCred package. Because you came to the JCCI session, it’s yours. No card, no trial. The only thing you agreed to is one short email a day, and you can stop those whenever you like.",
  },
  {
    q: "Do I need to be technical?",
    a: "No. A phone, a laptop and WhatsApp Business. Every playbook starts with free tools and tells you when, and if, a paid one is worth it.",
  },
  {
    q: "Which AI tool should I use?",
    a: "The free version of ChatGPT, Claude or Gemini is enough to start. The Tool Stack guide (17) tells you which one fits which job, and what the paid step up costs.",
  },
  {
    q: "PDF, Word or Excel: which one do I download?",
    a: "PDF to read or print. Word to fill in and make it yours, in Word or Google Docs. Excel for the trackers, in Excel or uploaded to Google Sheets.",
  },
  {
    q: "Can I share it with my team?",
    a: "Yes. You can share the complete, unaltered files with your own team or with another business owner, as long as the GrowthCred notice stays in. Please don’t sell it or rebrand it.",
  },
  {
    q: "Is the AI Policy legal advice?",
    a: "No. It’s a plain-language template written against POPIA. Fill it in, then check it with your own advisor.",
  },
  {
    q: "How do I get back to this page?",
    a: "Go to growthcred.co.za/toolkit on the same phone or laptop and it opens straight away. On a new device, just enter your name and email again.",
  },
  {
    q: "How do I stop the daily emails?",
    a: "Every email has an unsubscribe link at the bottom. One click and they stop. You keep the kit.",
  },
];

/** The whole kit in one file. Built by scripts/build-toolkit-zip.sh. */
export const ZIP_FILE: { href: string; size: string } | null = {
  href: `${D}10-hours-back-system.zip`,
  size: "7 MB",
};
