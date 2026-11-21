import type { SearchPage } from "./searchPages";

/** New training guides and the councils page. Published 21 November 2026. */
export const TRAINING_PUBLISHED = "2026-11-21";

/** The why-listen block from the first Gemini batch. Same facts, in the site voice. */
const WHY = "GrowthCred is a Johannesburg AI implementation and training company. I teach AI at Melsoft Academy. I helped build an isiZulu and English speech AI system. It was presented at Parliament in Cape Town.";

export const TRAINING_PAGES: SearchPage[] = [
  {
    path: "/guides/what-to-expect-corporate-ai-training-south-africa",
    kind: "guide",
    published: TRAINING_PUBLISHED,
    title: "What to Expect From Corporate AI Training | GrowthCred",
    description: "Live corporate AI training for a South African team. In Johannesburg or online. You practise on real documents. A person checks the draft. Quoted per person.",
    heading: "What to expect from corporate AI training: slow reports and risky chat tabs get a practical fix.",
    answer: "Corporate AI training at GrowthCred is a live session for your team. It runs in Johannesburg, or online. You practise on the documents you already produce. A person still checks the draft. We quote per person after a short call. The one-day owner workshop is R990. This is not an accredited course. We are not Growth Credit Ltd.",
    intro: "Your people already have the licence. Monday's report still takes as long as it did in March. Or someone is pasting a client file into a public chat because the deadline did not wait. You do not need a lecture. You need the team working on the real document, with a person still signing it.",
    article: {
      pain: "Your team already has the tool open. Monday's reports still drag. Sensitive files still slip into public chats.",
      wayOut: "A live working session on your real documents builds one clear habit. You still sign the work.",
      learnItems: [
        "You see how live practice on your own documents replaces guesswork and risky copy-pasting.",
        "You see what changes when your team sets one check rule before any draft goes out.",
      ],
      why: WHY,
      minutes: 4,
      mentions: [
        { text: "Want to see if live corporate training fits your team? Ask for a quote after a short call. There is no public team price. We look at your real tasks, your confidentiality rule and who signs off. You commit only when the fit is clear.", phrase: "Ask for a quote", href: "/call" },
        { text: "If you are the owner, and you want one live day online, that is the R990 founding rate. Confirm the date, VAT and any tool costs before you pay.", phrase: "R990 founding rate", href: "/workshop" },
      ],
    },
    sections: [
      {
        title: "Unguided chat tabs leak details and waste Monday mornings",
        paragraphs: [],
        figureCaption: "One quick paste into an unapproved chat can expose details you meant to keep in-house.",
        points: {
          problem: [
            "Your staff paste client files, names, ID numbers or salaries into public chat tabs to beat a deadline.",
            "You get uneven drafts and wrong claims. Nobody shares a rule for what gets checked.",
          ],
          fix: [
            "You keep personal information out of unapproved public chats. Use a stripped example instead.",
            "You give the team one habit. Brief the work clearly. Check the result before anything leaves.",
          ],
        },
        line: "Good training does not ban the tool. It gives your team one clear habit: brief the work, then check it.",
      },
      {
        title: "Live sessions beat recorded videos because teams practise on real tasks",
        paragraphs: [],
        figureCaption: "Practising on real tasks shows where a draft needs fixing before it reaches a client.",
        points: {
          problem: [
            "The recorded videos you bought sit unfinished once a busy week takes over. Generic examples miss your work.",
            "Your teams handle information differently. One video leaves gaps in your daily habit.",
          ],
          fix: [
            "You run a live session in Johannesburg or online. Use two or three real tasks your team already does.",
            "You let people test where the tool stumbles on real letters, summaries, reports or checklists. Someone is there.",
          ],
        },
        line: "You only spot where the tool fails when your people test it on their own real work.",
      },
      {
        title: "Real speed comes from checking habits, not empty promises",
        paragraphs: [],
        figureCaption: "Real gains come from measured checks and a person who still signs.",
        points: {
          problem: [
            "A big speed claim, before anyone sees your documents, is guesswork.",
            "Fast text you get in ten seconds can still carry a wrong name, date, figure or South African detail.",
          ],
          fix: [
            "We time a sample of your real documents first. Thirty days later we time them again. 3× faster is the target we train to on corporate work. Your report shows the measured number.",
            "You still have a person check names, dates, figures and the POPIA rule. Training alone does not make a workflow POPIA-compliant. Your policies and your lawyer still decide.",
          ],
        },
        line: "A neat paragraph in ten seconds is useless if you do not have a person check the facts.",
      },
      {
        title: "Light prep keeps desks covered and sets clear sign-off",
        paragraphs: [],
        figureCaption: "Smaller groups and a named reviewer keep the desk open.",
        points: {
          problem: [
            "If you pull everyone away at once, your desks sit empty. Vague prep wastes your live session.",
            "If you name nobody to own the sign-off, your staff do not know who approves a draft or which confidentiality rule applies.",
          ],
          fix: [
            "You group overlapping roles, or you rotate smaller groups. Bring two or three slow jobs and the confidentiality rule you already use.",
            "You name who signs the work after the session. Every draft stays a draft until that review.",
          ],
        },
        line: "A short prep list keeps your desk covered. Sign-off stays in a person's hands.",
      },
      {
        title: "Pick the right format for a team or a business owner",
        paragraphs: [],
        figureCaption: "One format is for the team. One is a live day for the owner.",
        points: {
          problem: [
            "Team training is the wrong buy if you only want one day for yourself. A solo workshop will not line up a whole department.",
            "If you guess the cost before anyone sees your real tasks, you cannot tell what the session covers.",
          ],
          fix: [
            "You choose live corporate training, in Johannesburg or online, when your whole team needs one shared habit. We quote it per person after a short call.",
            "You choose the one-day online owner workshop if you want one live day for yourself. The founding rate is R990. Confirm the date, VAT and any tool costs before you pay.",
          ],
        },
        line: "You match the format to the room. One shared habit for your team, or one live day for you.",
      },
    ],
    faq: [
      { q: "What should you expect from corporate AI training?", a: "It is a live session in Johannesburg or online. Your team practises on documents they already produce. A person still checks every draft. It is not an accredited course. GrowthCred (Pty) Ltd is not Growth Credit Ltd. We do not lend money." },
      { q: "How is corporate AI training priced?", a: "There is no public team price. We quote per person after a short call, once we have seen the tasks, the group and who signs off. The separate one-day online owner workshop is R990 at the founding rate. Confirm the date, VAT and any tool costs before you pay." },
      { q: "Does AI training make our workflows POPIA-compliant?", a: "No. Training does not make a workflow POPIA-compliant. Your own policies and your lawyer still decide." },
    ],
    ctas: [
      { to: "/corporate-ai-training", label: "Ask about team training" },
      { to: "/guides/ai-training-cost-south-africa", label: "See what training costs" },
    ],
    close: {
      line: "The licence is already on the desk. The habit is not.",
      ask: "Want your team to practise on real documents in Johannesburg or online? Ask for a quote.",
      cta: { to: "/call", label: "Ask for a quote" },
    },
    related: ["/corporate-ai-training", "/guides/ai-training-cost-south-africa", "/workshop", "/guides/popia-safe-ai-policy-staff-training-checklist", "/data-and-security", "/contact"],
  },
  {
    path: "/guides/popia-safe-ai-policy-staff-training-checklist",
    kind: "guide",
    published: TRAINING_PUBLISHED,
    title: "POPIA-Safe AI Policy & Staff Training Checklist | GrowthCred",
    description: "A plain checklist for South African teams. What staff must keep out of a public AI chat, who checks the draft, and how live training builds the habit.",
    heading: "Stop risky copy-pasting with a POPIA-safe AI policy and staff training checklist.",
    answer: "POPIA does not ban AI. It does make you responsible for personal information. Do not paste names, ID numbers or client files into a public chat until you have approved that exact workflow. A person still checks the draft. This page is not legal advice. We are not Growth Credit Ltd.",
    intro: "If your staff already use AI at work, you already have a POPIA question. You may not have written the rule yet. The leak is rarely a dramatic hack. It is a busy person pasting a client email, an employee record or an ID number into a chat box.",
    introLink: { phrase: "POPIA", href: "/guides/private-ai-popia" },
    article: {
      pain: "A busy person pasting an ID number or a client file into a chat box is more common than a dramatic hack. That is a POPIA question.",
      wayOut: "A short rule your staff can repeat, plus live practice on stripped work, is how you stay careful.",
      learnItems: [
        "You get five short rules your staff can repeat on a busy afternoon.",
        "You see how to run the checklist and a live session before you open the chat tools.",
      ],
      why: WHY,
      minutes: 4,
      mentions: [
        { text: "Want the team to practise stripping examples and checking drafts together? Ask for a quote for a live session in Johannesburg or online. We use your real tasks and the confidentiality rule you already have. You do not get a canned template you still have to adapt.", phrase: "Ask for a quote", href: "/call" },
        { text: "This page is practical guidance, not legal advice. You can start the working checklist before a formal sign-off. Your Information Officer and your lawyer should still review your facts before you roll it out.", phrase: "Information Officer", href: "/data-and-security" },
      ],
    },
    sections: [
      {
        title: "Chat boxes are not private filing cabinets",
        paragraphs: [],
        figureCaption: "A chat box is not a scratchpad. A paste can leave your approved workflow.",
        points: {
          problem: [
            "Your staff treat a browser chat box like a private scratchpad. They paste names, ID numbers, phone numbers, addresses, bank details or client files.",
            "A paid plan does not settle where your text goes. A wrong summary, even with no personal data, can still land on someone's file.",
          ],
          fix: [
            "You check the terms of the account your staff actually use. You ban raw personal information in a tool you have not approved.",
            "You have a person check every draft before it is sent, filed or acted on.",
          ],
        },
        line: "A chat box is not a scratchpad. A client file is not a test prompt.",
      },
      {
        title: "Short spoken rules beat a long policy on a shared drive",
        paragraphs: [],
        figureCaption: "Five clear habits give staff a fast check when the deadline is tight.",
        points: {
          problem: [
            "A policy on a shared drive rarely stops your people when they are rushing a deadline.",
            "If your rule is not plain, your staff guess. Or they use a personal login.",
          ],
          fix: [
            "You keep five habits they can say in one breath. No raw personal data in an unapproved tool. Use a stripped or made-up example when that is enough. Stick to the approved account. Check every draft. If you are unsure, stop and ask.",
            "Your staff stop and ask when they are unsure. They do not improvise.",
          ],
        },
        line: "If your staff cannot repeat the rule on a busy afternoon, it will not hold.",
      },
      {
        title: "A twelve-point checklist sets the ground rules first",
        paragraphs: [],
        figureCaption: "Set the boundaries before everyday drafting begins.",
        points: {
          problem: [
            "If you tell staff the chat is allowed before you name the owner, the tools, the forbidden data and the sign-off, you leave blind spots.",
            "If you skip the review points, a bad summary, or a stale rule, stays in place.",
          ],
          fix: [
            "You work through the twelve items before you allow the chat for everyday work.",
            "This is your working list. It is not a downloadable policy, and it is not a legal opinion.",
          ],
        },
        line: "Run the checklist before you allow the chat box for everyday work.",
        items: [
          "You name who owns the AI rule.",
          "You write the rule in words a busy person can repeat.",
          "You name the tools that are allowed. You name the ones that are not.",
          "You say what must never be pasted in.",
          "You name who signs the draft.",
          "You find who is already using a chat box.",
          "You train live, on real tasks, in Johannesburg or online.",
          "You practise stripping names before you draft.",
          "You practise checking the draft against the source.",
          "You give staff one way to ask when they are unsure.",
          "You look again after the first month.",
          "You update the rule when the tool or the work changes.",
        ],
      },
      {
        title: "Live practice teaches staff to strip a file before they draft",
        paragraphs: [],
        figureCaption: "Live practice makes stripping and checking a habit.",
        points: {
          problem: [
            "Under a deadline, your people take the fastest path. If they have never practised stripping a file, they paste the raw one.",
            "Your managers miss an invented line, or a slip in tone, if they have not practised checking a draft against the source.",
          ],
          fix: [
            "You practise together in a live session, in Johannesburg or online. You rewrite one request so the structure comes back without the sensitive detail.",
            "You spot the invented line in the room. You show managers how to review the draft. Final sign-off stays with a person.",
          ],
        },
        line: "Your staff will paste the whole file under pressure unless you practise stripping it first.",
      },
      {
        title: "Know what this checklist and this training do not cover",
        paragraphs: [],
        figureCaption: "Habit-building stays separate from the legal review.",
        points: {
          problem: [
            "A checklist or a training session is not legal POPIA compliance. Treating it as one is false confidence.",
            "Practical training is not an accredited qualification. It is also not a lending service.",
          ],
          fix: [
            "Your Information Officer and a lawyer review your own facts and policies. This page is not legal advice. Training does not make you compliant.",
            "GrowthCred (Pty) Ltd, in Rosebank, provides practical training. It is not an accredited qualification. We are not Growth Credit Ltd. We do not lend money.",
          ],
        },
        line: "Practical training builds safer habits. Your Information Officer and your lawyer own the legal question.",
      },
    ],
    faq: [
      { q: "Does POPIA ban staff from using AI?", a: "No. POPIA does not ban AI. It does make you responsible for personal information. Your staff should not paste names, ID numbers or client files into an unapproved public chat. You still have a person check the draft." },
      { q: "Does this page give a downloadable POPIA policy or a legal compliance guarantee?", a: "No. This page is not legal advice. It does not publish a downloadable policy. Training does not make a workflow POPIA-compliant. Your Information Officer and your lawyer must review your facts." },
    ],
    ctas: [
      { to: "/call", label: "Ask for a quote" },
      { to: "/guides/private-ai-popia", label: "Read the POPIA guide" },
    ],
    close: {
      line: "A client file is not a test prompt.",
      ask: "Want your team to practise the rule on real tasks in Johannesburg or online? Ask for a quote.",
      cta: { to: "/call", label: "Ask for a quote" },
    },
    related: ["/corporate-ai-training", "/data-and-security", "/guides/private-ai-popia", "/guides/what-to-expect-corporate-ai-training-south-africa", "/contact"],
  },
  {
    path: "/guides/live-vs-recorded-ai-training-for-teams",
    kind: "guide",
    published: TRAINING_PUBLISHED,
    title: "Live vs Recorded AI Training for Your Team | GrowthCred",
    description: "A recorded course leaves each person alone. Live training runs in Johannesburg or online. The owner day is separate. Team training is quoted per person.",
    heading: "Stalled video courses or shared team habits: live vs recorded AI training.",
    answer: "GrowthCred does not sell a recorded training video. Live training is a session in Johannesburg, or online, on work your team already does. A person still checks the draft. Owners can take the one-day online workshop at R990. Team training is quoted per person. Neither is an accredited course.",
    intro: "You will see two offers. A library of videos people watch alone. Or a live session where the team works on a real document together. They do not leave the same habit behind.",
    article: {
      pain: "A library of recorded videos often stalls on your busy week. Your staff leave with different habits.",
      wayOut: "A live session on your real work gets everyone practising the same check together.",
      learnItems: [
        "You see where a recorded course stalls for your team, and where a live session builds one shared habit.",
        "You see how to pick the format without buying videos your team will not finish.",
      ],
      why: WHY,
      minutes: 4,
      mentions: [
        { text: "Want the team to build one shared habit, rather than watch separate videos? Ask for a quote after a short call. We plan around the group size and the desk cover, so you do not have to empty the office.", phrase: "Ask for a quote", href: "/call" },
        { text: "If you only want one live day for yourself, take the online workshop at the R990 founding rate. You do not have to buy a library of recorded videos you will not finish.", phrase: "R990 founding rate", href: "/workshop" },
      ],
    },
    sections: [
      {
        title: "Recorded videos often stall when the week gets busy",
        paragraphs: [],
        figureCaption: "A solo video stalls when a real deadline hits the desk.",
        points: {
          problem: [
            "Videos, slides and quizzes you leave for when people have time often sit unfinished once your normal work takes over.",
            "Generic examples ignore your documents, your POPIA duties and who signs your work. A video cannot answer when someone asks you if a file is safe to try.",
          ],
          fix: [
            "A solo after-hours video can suit you if you will finish it. Watching alone often leaves your team with uneven habits.",
            "You choose a shared working format when your whole team needs the same safe routine.",
          ],
        },
        line: "A video can sit unfinished. Your live working session cannot.",
      },
      {
        title: "Live sessions let the whole team test real tasks at once",
        paragraphs: [],
        figureCaption: "Practising together lines up how staff draft and how you review.",
        points: {
          problem: [
            "Your people who watch separate videos can leave with clashing habits on drafting, checking and confidentiality.",
            "If you pull the whole team away at once, you can leave a desk, a field role or a shift short.",
          ],
          fix: [
            "You bring the team together live, in Johannesburg or online. You practise on real reports, notes, summaries or routine admin. Someone is there to fix a bad draft. A person still reviews what goes out.",
            "You run smaller groups, or you rotate staff, so your field and frontline cover stays in place.",
          ],
        },
        line: "When your team trains live together, your managers and your staff leave with one shared rule.",
      },
      {
        title: "Match the format to the person or the group you are training",
        paragraphs: [],
        figureCaption: "Pick the format for a team, or for one owner.",
        points: {
          problem: [
            "A pile of videos rarely gives your team one habit. A full team session is the wrong buy if you are one owner alone.",
            "If you expect a speed gain before you time the work, and before your habit sticks, you will be disappointed.",
          ],
          fix: [
            "You use live corporate training, in Johannesburg or online, when your team needs one shared habit. We quote it per person after a short call. Or you use the one-day online owner workshop, at the R990 founding rate, when you want one live day alone.",
            "You skip a background video if you want your team lined up. GrowthCred does not sell recorded training videos. You measure any speed gain against your own baseline, and against whether your habit stays.",
          ],
        },
        line: "You do not have to buy a pile of videos to get a working habit.",
      },
      {
        title: "Keep a clear line on who we are and what the training covers",
        paragraphs: [],
        figureCaption: "The session is practical training. A person still checks the draft.",
        points: {
          problem: [
            "Practical training is not an accredited qualification. A session does not replace your formal policies.",
            "A similar name, or a lending service, is a different company.",
          ],
          fix: [
            "You treat the session as hands-on training. A person still checks every draft. It is not an accredited qualification.",
            "GrowthCred (Pty) Ltd operates from Rosebank, Johannesburg. Phila Ngwenya is the founder. We are not Growth Credit Ltd. We do not lend money.",
          ],
        },
        line: "The teams that move are the ones who practise on your real work, then you check every draft.",
      },
    ],
    faq: [
      { q: "Should a team choose live AI training or a recorded video course?", a: "A live session is the better fit for your team. Your people work on real tasks at the same time and leave with one shared rule and a human review. Solo videos often stall and leave you with uneven habits. GrowthCred does not sell you recorded training videos." },
      { q: "How much do live team training and the owner workshop cost?", a: "Live corporate team training is quoted per person after a short call. It runs in Johannesburg or online. Your one-day online workshop is R990 at the founding rate. Neither is an accredited course." },
    ],
    ctas: [
      { to: "/corporate-ai-training", label: "Ask about team training" },
      { to: "/workshop", label: "The owner workshop" },
    ],
    close: {
      line: "A video can sit unfinished. A live day cannot.",
      ask: "Want the team practising together in one live session? Ask for a quote.",
      cta: { to: "/call", label: "Ask for a quote" },
    },
    related: ["/corporate-ai-training", "/guides/ai-training-cost-south-africa", "/workshop", "/guides/ai-training-vs-automation", "/contact"],
  },
  {
    path: "/ai-training-for-bargaining-councils-statutory-bodies",
    kind: "service",
    published: TRAINING_PUBLISHED,
    title: "Bargaining Council AI Training in South Africa | GrowthCred",
    description: "Live AI training for bargaining councils, statutory bodies and institutes. Accurate drafts, POPIA habits, smaller groups. Quoted per person. Not accredited.",
    heading: "Sloppy minutes and leaked member files stop with AI training for bargaining councils and statutory bodies.",
    answer: "This is live training for a bargaining council, a statutory body or a professional institute. Your people practise on reports, minutes and letters. A person checks every figure before it is used. Personal information stays out of a public chat. Sessions run in Johannesburg or online, in smaller groups. We quote per person. We are not Growth Credit Ltd.",
    intro: "Your reports, notices, minutes and letters feed a formal process. A sloppy sentence is not a small mistake. You still sign them. A leaked member file is worse. And your team is already stretched. Queries, research, records and the ordinary admin all land on the same desks.",
    article: {
      pain: "Formal notices, minutes, circulars and member records cannot take a careless draft or an exposed personal detail.",
      wayOut: "Live practice by role, with a person still signing, lets you draft more safely. Smaller groups keep the desks covered.",
      learnItems: [
        "You see how your analysts, coordinators and administrators practise safe drafting on the documents their role already produces.",
        "You see how to run live sessions in smaller rotating groups so your public desk or your member desk stays open.",
      ],
      why: WHY,
      minutes: 5,
      mentions: [
        { text: "Want to test live practice with one team, without leaving the desks empty? Ask for a short call. We map the headcount, the roles and the rotation first. You move ahead only with a plan that fits the day.", phrase: "Ask for a short call", href: "/call" },
        { text: "You do not need to hand over sensitive member files to scope the session. We work inside the confidentiality limits you already have, and on stripped examples. The one-day online workshop at the R990 founding rate is for an owner, not for this team.", phrase: "R990 founding rate", href: "/workshop" },
      ],
    },
    sections: [
      {
        title: "Formal documents cannot take a sloppy draft or a leaked file",
        paragraphs: [],
        figureCaption: "Formal records and member details need a hard line before any draft starts.",
        points: {
          problem: [
            "Your notice, your circular, your minute, your report or your formal letter carries weight. A sloppy line, or a leaked member file, is worse than a clumsy email.",
            "Your same desks handle queries, research, records and daily admin. Under pressure, your people take a shortcut.",
          ],
          fix: [
            "You practise on the documents your people already produce. Reports, summaries, research notes, routine letters, agendas and follow-ups. You keep a measured tone.",
            "You keep member, worker, employer, applicant and complaint details out of a tool you have not approved. Your lawyer reviews your facts. Training does not make you POPIA-compliant.",
          ],
        },
        line: "In your formal process, a sloppy draft is not a small mistake. Your person still signs.",
      },
      {
        title: "Role practice turns rough notes into a checked first draft",
        paragraphs: [],
        figureCaption: "Match the exercise to the role. Then check every figure against a source you trust.",
        points: {
          problem: [
            "Your analyst, your coordinator and your administrator do not do the same work. One generic exercise does not fit every desk you run.",
            "A loose prompt can put a wrong figure, date or detail into a draft that looks finished to you.",
          ],
          fix: [
            "You give each role an exercise from their own work. A rough note becomes a draft summary. A research pile becomes questions you verify. A routine letter starts in your house tone, on a stripped example.",
            "You practise checking every figure, date, name, claim and the tone against a source you trust. The tool does not do the maths you will stand behind.",
          ],
        },
        line: "A draft is not a decision until you have a person check the facts and sign it.",
      },
      {
        title: "Smaller rotating groups keep the desks and the queries covered",
        paragraphs: [],
        figureCaption: "One group practises. The desk that takes queries stays open.",
        points: {
          problem: [
            "If you pull half the office out for a full day, your queries pile up.",
            "Your frontline, field and admin teams still need cover while they get hands-on practice.",
          ],
          fix: [
            "You run smaller groups, in Johannesburg or online, so your people can rotate. Your desks and your frontline queries stay covered.",
            "You keep the practice on real work. Any speed gain is measured against your baseline. It is not a number I guess before I have seen your work.",
          ],
        },
        line: "Smaller rotating groups let your team practise without letting the queries pile up.",
      },
      {
        title: "Scope the work, and name the boundary, before any quote",
        paragraphs: [],
        figureCaption: "A short call covers headcount, roles, cover and format before a per-person quote.",
        points: {
          problem: [
            "Your council, statutory body or institute uses its own words and its own process. A flat public price does not fit you.",
            "A team session is not your solo owner workshop. Practical training is not an accredited qualification, and it is not your legal sign-off.",
          ],
          fix: [
            "We scope your team training per person after a short call. The call covers your headcount, your roles, your desk cover, and whether Johannesburg or online fits you. The R990 one-day online workshop is for an owner, not for your team session.",
            "GrowthCred (Pty) Ltd is not Growth Credit Ltd. We do not lend you money. We do not name your council or your institute without permission. This is practical training, not an accredited qualification.",
          ],
        },
        line: "Your council or body has its own process, so your quote follows a short call.",
      },
    ],
    faq: [
      { q: "Who is this AI training built for?", a: "Bargaining councils, statutory bodies and professional institutes. Your staff draft reports, notices, circulars, minutes and letters. Personal information stays out of a tool you have not approved. A person checks the work and signs it." },
      { q: "How is training priced for a council, a statutory body or an institute?", a: "There is no public team price. We quote per person after a short call on headcount, roles, cover and format. The R990 one-day online workshop is for an owner, not for this team session. GrowthCred (Pty) Ltd is not Growth Credit Ltd. We do not lend money." },
    ],
    ctas: [
      { to: "/call", label: "Ask for a quote" },
      { to: "/contact", label: "Contact us" },
    ],
    close: {
      line: "The notice still needs a person behind it.",
      ask: "Want a short call about one team in Johannesburg or online? Ask for a quote.",
      cta: { to: "/call", label: "Ask for a quote" },
    },
    related: ["/corporate-ai-training", "/guides/popia-safe-ai-policy-staff-training-checklist", "/guides/what-to-expect-corporate-ai-training-south-africa", "/ai-for-law-firms", "/ai-for-financial-services", "/data-and-security", "/contact"],
  },
];
