import type { SearchPage } from "./searchPages";

/** New training guides and the councils page. Published 21 November 2026. */
export const TRAINING_PUBLISHED = "2026-11-21";

export const TRAINING_PAGES: SearchPage[] = [
  {
    path: "/guides/what-to-expect-corporate-ai-training-south-africa",
    kind: "guide",
    published: TRAINING_PUBLISHED,
    title: "What to Expect From Corporate AI Training | GrowthCred",
    description: "Live corporate AI training for a South African team. In Johannesburg or online. You practise on real documents. A person checks the draft. Quoted per person.",
    heading: "What should you expect from corporate AI training?",
    answer: "Corporate AI training at GrowthCred is a live session for your team. It runs in Johannesburg, or online. You practise on the documents you already produce. A person still checks the draft. We quote per person after a short call. The one-day owner workshop is R990. This is not an accredited course. We are not Growth Credit Ltd.",
    intro: "Your people already have the licence. Monday's report still takes as long as it did in March. Or someone is pasting a client file into a public chat because the deadline did not wait. You do not need a lecture. You need the team working on the real document, with a person still signing it.",
    sections: [
      {
        title: "The quiet risk is the unguided chat",
        paragraphs: [
          "Someone in HR drafts a policy note in a browser tab. Someone in operations tidies the meeting notes. Someone in finance tries to speed up a reply.",
          "That looks helpful. It is also how a name, an ID number or a salary leaves the building.",
          "One person gets a useful draft. The next person gets a confident paragraph that is wrong. Nobody shares a rule for what gets checked.",
          "Good training does not ban the tool. It gives the team one habit. Brief the work. Check the result. Keep personal information out of a public chat.",
        ],
      },
      {
        title: "What the live session actually is",
        paragraphs: [
          "We do not hand you a shelf of videos and hope someone watches them on Friday.",
          "The session is live. In the room in Johannesburg, or online if your people sit in more than one place.",
          "Before the day, we look at the work your people already do. An HR team and an operations team do not use information the same way.",
          "You bring two or three real tasks. A routine letter. A long document that needs a summary. A report. A checklist. A first draft that a person will still review.",
          "People only see where the tool fails when they try it on their own work. That is the point of being in the room.",
        ],
      },
      {
        title: "What we will not promise you",
        paragraphs: [
          "You will hear big claims about teams getting dramatically faster. I will not hand you a number before I have seen the work.",
          "3× faster is the target we train to on corporate work. We time a sample of your real documents first. Thirty days later we time them again. Your report shows the measured number.",
          "What you should leave with is plainer. A faster start on a blank page. A habit of checking names, dates and figures. A rule for what never goes into the tool. A next step for the Monday after.",
          "If someone promises magic with no effort from your team, be careful. The gain comes from the habit, and from a person who still signs the work.",
        ],
        links: [{ index: 1, phrase: "3× faster", href: "/corporate-ai-training" }],
      },
      {
        title: "POPIA and the draft stay with a person",
        paragraphs: [
          "A neat paragraph in ten seconds is not an accurate one. The tool can miss a South African detail a manager would catch.",
          "So the draft stays a draft until someone qualified reads it. Sensitive information stays inside the rules you already have.",
          "Training does not make a workflow POPIA-compliant. Your policies and your lawyer still decide. I am not your lawyer.",
          "I have given seven AI talks at WeWork Johannesburg. The rule in the room is the same. You practise on work you are allowed to use. A person checks what leaves.",
        ],
        links: [{ index: 2, phrase: "POPIA-compliant", href: "/guides/private-ai-popia" }],
      },
      {
        title: "What to prepare before the day",
        paragraphs: [
          "You do not need a technical project. You do need a little homework.",
          "Pick people whose week overlaps. Or run the day in groups, so the desk is not empty.",
          "List two or three slow jobs. The report. The letter. The document that keeps coming back.",
          "Bring the confidentiality rule you already use. Name the person who signs the work after the session.",
          "Then we can tell you whether the day fits. Corporate training is quoted per person after that conversation. There is no public team price.",
        ],
      },
      {
        title: "The owner workshop is a different offer",
        paragraphs: [
          "If you are the owner, and you want one live day for yourself, that is the online workshop. The founding rate is R990. Confirm the date, VAT and any tool costs before you pay.",
          "If the whole team needs the same habit, that is corporate training. Live. In Johannesburg or online. Quoted per person.",
          "We are GrowthCred (Pty) Ltd. We train teams and build systems from Rosebank. We are not Growth Credit Ltd. We do not lend money.",
        ],
        links: [
          { index: 0, phrase: "online workshop", href: "/workshop" },
          { index: 1, phrase: "corporate training", href: "/corporate-ai-training" },
        ],
      },
    ],
    faq: [
      { q: "Is corporate AI training at GrowthCred an accredited qualification?", a: "No. It is a practical workplace session. Your people work on real tasks. A person still reviews the draft. We do not claim an accreditation." },
      { q: "Do you train onsite in Johannesburg or online?", a: "Either. Live sessions run in the room in Johannesburg, or online if your teams sit elsewhere in South Africa." },
      { q: "How is corporate AI training priced?", a: "We quote per person after a short call. There is no published team price. The one-day online workshop for an owner is R990 at the founding rate." },
      { q: "Does the training replace human review or make us POPIA-compliant?", a: "No. Staff treat the output as a draft. A person checks it. Training does not make a workflow compliant. Your lawyer still reviews your own case." },
    ],
    ctas: [
      { to: "/corporate-ai-training", label: "Ask about team training" },
      { to: "/guides/ai-training-cost-south-africa", label: "See what training costs" },
    ],
    close: {
      line: "The licence is already on the desk. The habit is not.",
      ask: "Want the team in the room, or online? Ask for a quote.",
      cta: { to: "/corporate-ai-training", label: "Ask about team training" },
    },
    related: ["/corporate-ai-training", "/guides/ai-training-cost-south-africa", "/workshop", "/guides/popia-safe-ai-policy-staff-training-checklist", "/data-and-security", "/contact"],
  },
  {
    path: "/guides/popia-safe-ai-policy-staff-training-checklist",
    kind: "guide",
    published: TRAINING_PUBLISHED,
    title: "POPIA-Safe AI Policy & Staff Training Checklist | GrowthCred",
    description: "A plain checklist for South African teams. What staff must keep out of a public AI chat, who checks the draft, and how live training builds the habit.",
    heading: "Can your staff use AI without breaking POPIA?",
    answer: "POPIA does not ban AI. It does make you responsible for personal information. Do not paste names, ID numbers or client files into a public chat until you have approved that exact workflow. A person still checks the draft. This page is not legal advice. We are not Growth Credit Ltd.",
    intro: "If your staff already use AI at work, you already have a POPIA question. You may not have written the rule yet. The leak is rarely a dramatic hack. It is a busy person pasting a client email, an employee record or an ID number into a chat box.",
    introLink: { phrase: "POPIA", href: "/guides/private-ai-popia" },
    sections: [
      {
        title: "A chat box is not a scratchpad",
        paragraphs: [
          "Most teams get into trouble because the box feels private. It is not your filing cabinet.",
          "A name, a phone number, a home address, a disciplinary note or a client file can leave the building in one paste.",
          "A paid plan does not answer where that text goes. Read the terms for the account your staff actually use.",
          "Even with no personal information in the prompt, a wrong summary can land on a person's file. Someone still has to check it.",
        ],
      },
      {
        title: "Five rules your staff can repeat",
        paragraphs: [
          "A policy that lives in a shared drive does not change a busy afternoon. The rule has to fit in one breath.",
          "First, no raw personal information in a tool you have not approved. That means ID numbers, phone numbers, bank details, HR records, and client or member files.",
          "Second, if a made-up example is enough, use that. Strip the name, the account number and anything that points at a person.",
          "Third, work stays on the account the organisation approved. A personal login is not the company rule.",
          "Fourth, a person checks every draft before it is sent, filed or acted on.",
          "Fifth, if you are not sure, you stop and ask. You do not guess.",
        ],
        links: [{ index: 2, phrase: "made-up example", href: "/guides/can-staff-paste-client-files-into-chatgpt" }],
      },
      {
        title: "The checklist",
        paragraphs: ["Run this before you tell the team the chat box is allowed. It is a working list. It is not a legal opinion, and it is not a template I publish for download."],
        items: [
          "Name who owns the AI rule.",
          "Write the rule in words a busy person can repeat.",
          "Name the tools that are allowed. Name the ones that are not.",
          "Say what must never be pasted in.",
          "Name who signs the draft.",
          "Find who is already using a chat box.",
          "Train live, on real tasks, in Johannesburg or online.",
          "Practise stripping names before you draft.",
          "Practise checking the draft against the source.",
          "Give staff one way to ask when they are unsure.",
          "Look again after the first month.",
          "Update the rule when the tool or the work changes.",
        ],
      },
      {
        title: "Why the policy needs a live session",
        paragraphs: [
          "People under a deadline take the fastest path. If they have not practised stripping a file, they will paste it.",
          "A live session is where you do that together. In Johannesburg, or online.",
          "You rewrite one request so the structure comes back without the sensitive detail. You find the line the summary invented. A manager sees how to review the work without giving up the sign-off.",
          "I have given seven AI talks at WeWork Johannesburg. The useful hour is always the same. Your work. Your rule. A person still checks.",
        ],
        links: [{ index: 1, phrase: "live session", href: "/corporate-ai-training" }],
      },
      {
        title: "What this page will not do",
        paragraphs: [
          "I will not give you a downloadable policy and call it done. I do not publish one. You write the rule your own team can repeat.",
          "I will not tell you that training makes you compliant. Have your Information Officer and a lawyer review your own facts.",
          "We are GrowthCred (Pty) Ltd, from Rosebank. We are not Growth Credit Ltd. We do not lend money. This is practical training. It is not an accredited qualification.",
        ],
        links: [{ index: 1, phrase: "Information Officer", href: "/data-and-security" }],
      },
    ],
    faq: [
      { q: "Does POPIA ban businesses from using AI tools?", a: "No. POPIA does not ban the tool. You still have to handle personal information lawfully. Keep it out of a chat you have not approved. A person still checks the output. Get advice for your own case." },
      { q: "What should staff avoid pasting into a public AI chat?", a: "Names tied to a sensitive record. ID numbers. Contact details. HR or disciplinary notes. Bank details. Confidential client or member files. If a made-up example works, use that." },
      { q: "How does staff training help with POPIA?", a: "It turns the rule into a habit. Staff practise keeping data out of the prompt, and checking the draft before it goes out. Training is not a compliance certificate." },
      { q: "How do we get a quote for team training?", a: "Ask on the corporate training page, or contact us. We quote per person after a short call. There is no published team price." },
    ],
    ctas: [
      { to: "/call", label: "Ask for a quote" },
      { to: "/guides/private-ai-popia", label: "Read the POPIA guide" },
    ],
    close: {
      line: "A client file is not a test prompt.",
      ask: "Want the team to practise the rule together? Ask for a quote.",
      cta: { to: "/corporate-ai-training", label: "Ask about team training" },
    },
    related: ["/corporate-ai-training", "/data-and-security", "/guides/private-ai-popia", "/guides/what-to-expect-corporate-ai-training-south-africa", "/guides/staff-chatgpt-client-files-popia", "/contact"],
  },
  {
    path: "/guides/live-vs-recorded-ai-training-for-teams",
    kind: "guide",
    published: TRAINING_PUBLISHED,
    title: "Live vs Recorded AI Training for Your Team | GrowthCred",
    description: "A recorded course leaves each person alone. Live training runs in Johannesburg or online. The owner day is separate. Team training is quoted per person.",
    heading: "Should your team sit a live session, or watch a video?",
    answer: "GrowthCred does not sell a recorded training video. Live training is a session in Johannesburg, or online, on work your team already does. A person still checks the draft. Owners can take the one-day online workshop at R990. Team training is quoted per person. Neither is an accredited course.",
    intro: "You will see two offers. A library of videos people watch alone. Or a live session where the team works on a real document together. They do not leave the same habit behind.",
    sections: [
      {
        title: "What a recorded course usually is",
        paragraphs: [
          "It is videos, slides and a quiz. People watch when they can.",
          "That can suit one person who wants a look at an idea after hours, and who will actually finish it.",
          "For a team, it often stalls. The operational week wins. The module sits there.",
          "The examples are generic. They do not know your documents, your POPIA duties, or who signs your work.",
          "A video cannot answer when someone asks whether this file is safe to try. People who watch alone can leave with different habits.",
        ],
      },
      {
        title: "What the live session is",
        paragraphs: [
          "Your team is in the room, or on the call, at the same time. You can ask. You can try. You can fix a bad draft while someone is there.",
          "The tasks are the ones you already do. A report. Notes. A summary. Routine admin. A person still reviews what goes out.",
          "When the team trains together, the manager and the staff share one rule. That is harder to get from separate videos.",
          "You do have to plan the cover. Field staff and shift teams cannot all leave at once. Smaller groups keep the desk open.",
        ],
        links: [{ index: 0, phrase: "in the room", href: "/corporate-ai-training" }],
      },
      {
        title: "How to choose",
        paragraphs: [
          "Ask who you are training. You pick the format. You do not have to buy a pile of videos.",
          "A team that needs one safe habit should sit the live session. That is corporate training. We quote it per person after a short call.",
          "An owner who wants one live day for themselves can take the online workshop. The founding rate is R990. It is not a video you watch later.",
          "A cheap background video, with no shared rule, may suit a solo learner. I do not sell that. I will not pretend it lines a team up.",
          "I will not promise you a speed gain before we time your work. Any gain depends on the baseline, and on whether your people keep the habit. I have given seven AI talks at WeWork Johannesburg. The teams that move are the ones who practise, then check.",
        ],
        links: [
          { index: 1, phrase: "corporate training", href: "/corporate-ai-training" },
          { index: 2, phrase: "online workshop", href: "/workshop" },
        ],
      },
      {
        title: "What we are, and what we are not",
        paragraphs: [
          "We are GrowthCred (Pty) Ltd, from Rosebank, Johannesburg. Phila Ngwenya is the founder.",
          "We are not Growth Credit Ltd. We do not lend money.",
          "The training is practical. It is not an accredited qualification.",
        ],
      },
    ],
    faq: [
      { q: "Why does GrowthCred use live training instead of a recorded course?", a: "Staff can ask, try a real task, and leave with one shared rule for checking the work. A video cannot answer the question in the room." },
      { q: "Can the live session be online?", a: "Yes. Corporate training runs in Johannesburg or online. The owner workshop is online." },
      { q: "Is there a live option for an owner, not a whole team?", a: "Yes. The one-day online workshop is R990 at the founding rate. Confirm the date and VAT before you pay." },
      { q: "What does team training cost?", a: "We quote per person after a short call. There is no published team price. We do not sell a recorded course at a set price." },
    ],
    ctas: [
      { to: "/corporate-ai-training", label: "Ask about team training" },
      { to: "/workshop", label: "The owner workshop" },
    ],
    close: {
      line: "A video can sit unfinished. A live day cannot.",
      ask: "Want the team in one session? Ask for a quote.",
      cta: { to: "/corporate-ai-training", label: "Ask about team training" },
    },
    related: ["/corporate-ai-training", "/guides/ai-training-cost-south-africa", "/workshop", "/guides/ai-training-vs-automation", "/contact"],
  },
  {
    path: "/ai-training-for-bargaining-councils-statutory-bodies",
    kind: "service",
    published: TRAINING_PUBLISHED,
    title: "Bargaining Council AI Training in South Africa | GrowthCred",
    description: "Live AI training for bargaining councils, statutory bodies and institutes. Accurate drafts, POPIA habits, smaller groups. Quoted per person. Not accredited.",
    heading: "AI training for councils, statutory bodies and institutes.",
    answer: "This is live training for a bargaining council, a statutory body or a professional institute. Your people practise on reports, minutes and letters. A person checks every figure before it is used. Personal information stays out of a public chat. Sessions run in Johannesburg or online, in smaller groups. We quote per person. We are not Growth Credit Ltd.",
    intro: "Your reports, notices, minutes and letters feed a formal process. A sloppy sentence is not a small mistake. You still sign them. A leaked member file is worse. And your team is already stretched. Queries, research, records and the ordinary admin all land on the same desks.",
    sections: [
      {
        title: "The work that cannot be sloppy",
        paragraphs: [
          "A commercial firm can fix a clumsy email. Your notice, your circular or your minute may not get that chance.",
          "So the session is not a demo of what a tool can do on a perfect example. It is practice on the documents your people already produce.",
          "Reports. Summaries. Research notes. Routine letters. Agendas. Follow-ups. The tone stays measured. A person still signs.",
          "I will not name a council or an institute here. Nobody has given me permission to do that. This page describes the job. It does not pretend we have already done yours.",
        ],
      },
      {
        title: "What people practise",
        paragraphs: [
          "Each person works on their own role. An analyst, a coordinator and an administrator do not need the same exercise.",
          "They learn to brief the tool with the context of the organisation, and with the limits of the role.",
          "A rough note can become a first draft of a summary. A research pile can become a list of questions to verify. A routine letter can start in the house tone.",
          "You do not leave with a new product I have named for you. You leave with a way to start the draft, and a checklist for what you still check.",
          "Every figure is still yours to check. The tool does not do the maths you will stand behind.",
        ],
        links: [{ index: 3, phrase: "checklist", href: "/guides/popia-safe-ai-policy-staff-training-checklist" }],
      },
      {
        title: "Member and worker information stays out",
        paragraphs: [
          "You handle details about workers, employers, members, applicants and complaints. POPIA applies to that.",
          "Staff learn what counts as personal information. Names, ID numbers, contact details and case facts do not go into a tool you have not approved.",
          "They practise on a stripped example. The structure of the task. Not the person it is about.",
          "The session follows the confidentiality rules you already have. It does not replace them. And it does not make you compliant. Your lawyer still reviews your facts.",
        ],
        links: [{ index: 1, phrase: "POPIA", href: "/guides/private-ai-popia" }],
      },
      {
        title: "A draft is not a decision",
        paragraphs: [
          "In a formal process, a mostly right draft can still be wrong in the one place that matters.",
          "The tool can miss a nuance. It can invent a detail if the brief was loose.",
          "So staff practise the check. Every figure. Every date. Every name. Every claim, against the source you trust.",
          "They read the tone before it goes forward. A person signs anything that will be used in a proceeding, a notice or a letter that leaves the building.",
          "Faster drafting is a target we measure against your baseline. It is not a promise I make before I have seen the work.",
        ],
      },
      {
        title: "Smaller groups, so the desk stays open",
        paragraphs: [
          "The fear is fair. If half the office leaves for a full day, the queries pile up.",
          "We can run smaller groups. In Johannesburg, or online. People rotate. Field and frontline staff stay covered.",
          "You still get hands-on practice. The day's work does not stop.",
        ],
      },
      {
        title: "How we quote",
        paragraphs: [
          "Every council, body and institute uses its own words and its own process. So there is no public price on this page.",
          "We quote per person after a short call. The call tells us the headcount, the roles, the cover you need, and whether Johannesburg or online fits.",
          "The one-day online workshop at R990 is for an owner, not for this team session.",
          "I have given seven AI talks at WeWork Johannesburg. I am Phila Ngwenya. GrowthCred (Pty) Ltd is the company. We are not Growth Credit Ltd. We do not lend money. This training is not an accredited qualification.",
        ],
        links: [
          { index: 2, phrase: "one-day online workshop", href: "/workshop" },
          { index: 3, phrase: "WeWork Johannesburg", href: "/about" },
        ],
      },
    ],
    faq: [
      { q: "Can staff use AI on work that goes into a formal proceeding?", a: "They can organise notes and prepare an early draft. Personal information stays out of an unapproved tool. A qualified person checks every fact, figure and statement before it is used." },
      { q: "How do you handle member or worker information under POPIA?", a: "We train people not to paste identifiable records into an unapproved tool. They practise on a stripped example. Your own governance rules still apply. This is not legal advice." },
      { q: "Can we train in smaller groups so the front line keeps working?", a: "Yes. Sessions can run in groups, in Johannesburg or online, so field and frontline staff stay covered." },
      { q: "What does this cost a council, a statutory body or an institute?", a: "We quote per person after a short call. There is no published team price. The R990 workshop is a separate one-day session for an owner." },
    ],
    ctas: [
      { to: "/corporate-ai-training", label: "Ask about team training" },
      { to: "/contact", label: "Contact us" },
    ],
    close: {
      line: "The notice still needs a person behind it.",
      ask: "Want a short call about one team? Ask for a quote.",
      cta: { to: "/corporate-ai-training", label: "Ask about team training" },
    },
    related: ["/corporate-ai-training", "/guides/popia-safe-ai-policy-staff-training-checklist", "/guides/what-to-expect-corporate-ai-training-south-africa", "/ai-for-law-firms", "/ai-for-financial-services", "/data-and-security", "/contact"],
  },
];
