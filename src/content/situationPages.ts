import type { SearchPage } from "./searchPages";

const PUBLISHED = "2026-10-23";

const call = {
  line: "Bring one job. We will tell you if we can take it off your desk.",
  ask: "Book a call. We will say straight whether this is a fit.",
  cta: { to: "/call", label: "Book a call" },
} as const;

/**
 * Landing pages for one buyer's week, not for everyone.
 * Order on the page: their situation, a clear answer, how we solve it, one call.
 * No named customer. No measured result we cannot show. POPIA stays factual.
 */
export const SITUATION_PAGES: SearchPage[] = [
  {
    path: "/how-to-send-ppe-quotes-faster",
    kind: "situation",
    published: PUBLISHED,
    title: "How to Send PPE Quotes Faster Without the Owner Doing Every Quote | GrowthCred",
    description:
      "How to send PPE quotes faster without the owner doing every quote. Your prices stay on equipment we set up. You still approve every quote that goes out.",
    heading: "You run a PPE or uniform supply business, and every bulk quote still waits for you to price it.",
    intro:
      "The prices live in your head. A size, a logo or a lead time is missing, and the quote stops. Your team sends it back to you. Nothing goes to the customer until you price it.",
    sections: [
      {
        title: "Why it still waits for you",
        paragraphs: [
          "You know the price. Your team knows the order. The two do not meet until you sit down. So every bulk quote joins the queue on your desk.",
          "Hiring another person does not fix that. They still have to ask you. A blank chat tool does not fix it either. It does not know your price list.",
        ],
      },
      {
        title: "What we set up",
        paragraphs: [
          "We build your own private AI on your price list and your rules. It runs on equipment we set up for you. Your documents stay in the building.",
          "It drafts the bulk quote. You read it. You change what is wrong. You approve it. The customer does not see a price you have not signed.",
          "This is the Command Core, pointed at one job. Quotes. Not a new tool for every seat.",
        ],
      },
      {
        title: "Start with one product line",
        paragraphs: [
          "Pick the line you quote most. We set the system up on that list. You watch the next quote.",
          "If it still needs you to build every line, we are not done. If it only needs your sign-off, you add the next line. You measure that yourself. We will not invent a turnaround for you.",
        ],
      },
    ],
    faq: [
      {
        q: "Will quotes go out without me?",
        a: "No. The system drafts from your price list and your rules. You approve every quote before it goes to the customer.",
      },
      {
        q: "Where do our prices go?",
        a: "Onto equipment we set up for you. We agree in writing who can reach the system before any price list goes in.",
      },
    ],
    close: { ...call, line: "The next bulk quote should not wait on your calendar." },
    ctas: [{ to: "/call", label: "Book a call" }],
    related: [
      "/quoting-uniforms-for-a-security-company",
      "/private-ai",
      "/guides/ai-business-proposals-faster",
      "/call",
    ],
  },
  {
    path: "/quoting-uniforms-for-a-security-company",
    kind: "situation",
    published: PUBLISHED,
    title: "Quoting Uniforms for a Security Company with Guards on Multiple Sites | GrowthCred",
    description:
      "Quoting uniforms for a security company with guards on multiple sites. Keep each site's kit and your prices in one place, and you still sign the quote.",
    heading:
      "You supply a security company with guards on several sites, and every new contract means re-quoting kits by hand.",
    intro:
      "Each site wants its own kit. Each role wears something else. Sizes change. The last order does not match the new one. So you build the quote again, by hand.",
    sections: [
      {
        title: "Where the quote breaks",
        paragraphs: [
          "The kit list sits in a spreadsheet. Or it sits in your head. A new site means a new list. You check every line before anyone may send a price.",
          "Your team can copy the last quote. They still do not know which line changed. So the question comes back to you.",
        ],
      },
      {
        title: "What we set up",
        paragraphs: [
          "We put the kit list and the pricing in one place. Your own private AI, on equipment we set up for you. A new contract starts from the last kit you approved.",
          "You still sign the price. The customer still gets your number, not a guess. Access is by role, so the person quoting sees the kit, not the whole business.",
          "This is the Command Core. One system for the list and the price. Not a rented seat for every clerk.",
        ],
      },
      {
        title: "Start with one contract",
        paragraphs: [
          "Pick one security customer. One set of sites. We load that kit list. You watch the next variation.",
          "We have not published a before-and-after for this. When you can measure yours, it is yours. Until then we will not pretend we have a number.",
        ],
      },
    ],
    faq: [
      {
        q: "Can it handle a different kit per site?",
        a: "Yes, if the kit is written down. Each site and each role keeps its own list. A new quote starts from the list you last approved.",
      },
      {
        q: "Who approves the price?",
        a: "You do. The draft can be prepared for you. It does not go to the customer until you sign it.",
      },
    ],
    close: { ...call, line: "A new site should start from the last kit you approved." },
    ctas: [{ to: "/call", label: "Book a call" }],
    related: ["/how-to-send-ppe-quotes-faster", "/senior-dispatcher-on-leave", "/private-ai", "/call"],
  },
  {
    path: "/chatgpt-client-files-popia-south-africa",
    kind: "situation",
    published: PUBLISHED,
    title: "Can My Staff Use ChatGPT with Client Files under POPIA South Africa | GrowthCred",
    description:
      "Can my staff use ChatGPT with client files under POPIA South Africa? There is no blanket yes or no. You stay responsible. Private AI does not make a workflow lawful by itself.",
    heading:
      "You run a law or accounting practice, and you suspect your staff already paste client files into ChatGPT.",
    intro:
      "There is no blanket yes. There is no blanket no. If you are responsible for that information, what your staff do with it stays on you. A public chat can send a client file to servers you do not run.",
    sections: [
      {
        title: "The question POPIA actually asks",
        paragraphs: [
          "POPIA does not ban every use of AI. It asks what personal information moves, why, who processes it, and how you protect it.",
          "If a file goes to another country, section 72 of POPIA sets conditions for that transfer. A paid plan does not answer section 72 for you. You have to know the route.",
          "This page is not legal advice. Ask your Information Officer or your lawyer about your own files. We build the system. We do not tell you that you are compliant.",
        ],
      },
      {
        title: "What private AI changes, and what it does not",
        paragraphs: [
          "We can set your AI up on equipment inside your business. A file can be processed there, instead of in a public chat. That can stop one trip to an outside AI company.",
          "It does not make the workflow lawful. You still choose the purpose. You still choose who may see the file. A person still checks anything that reaches a client or changes a record.",
          "Location is only one part. Weak access, a bad backup or a connected tool can still move information. You have to look at the whole path. The longer notes are on our POPIA guides, linked below.",
        ],
      },
      {
        title: "A check you can run this week",
        paragraphs: [
          "Sit with one real task. Tick these off before anyone pastes a client file into a chat you have not approved.",
        ],
        items: [
          "Name the task, and only the fields it needs.",
          "Ask if a made-up file would do the job.",
          "Write down where the prompt goes, and who can read it.",
          "If it leaves South Africa, check that transfer before you send it.",
          "Name the person who approves anything a client will see.",
        ],
      },
    ],
    faq: [
      {
        q: "Does POPIA ban ChatGPT?",
        a: "No. POPIA does not give a blanket yes or no. You still have to check the purpose, the information, the safeguards and any cross-border transfer for that workflow.",
      },
      {
        q: "Does private AI make us POPIA-compliant?",
        a: "No. It can change where some processing happens. You remain responsible for the workflow. Get advice on your own files.",
      },
      {
        q: "Does a paid ChatGPT plan make client files safe?",
        a: "A paid plan does not settle POPIA, your contracts or your professional duties. Check the route for the account your staff actually use.",
      },
    ],
    close: { ...call, line: "A client file is not a test prompt." },
    ctas: [{ to: "/call", label: "Book a call" }],
    sources: [
      {
        label: "South African Government: Protection of Personal Information Act 4 of 2013",
        href: "https://www.gov.za/documents/protection-personal-information-act",
      },
      {
        label: "Information Regulator: Condition 7 security safeguards, sections 19–22",
        href: "https://inforegulator.org.za/knowledge-base/category/popia/chapter-3-conditions-for-lawful-processing/part-a-processing-of-personal-information-in-general/condition-7-security-safeguards/",
      },
    ],
    related: [
      "/guides/can-staff-paste-client-files-into-chatgpt",
      "/guides/private-ai-popia",
      "/data-and-security",
      "/ai-for-law-firms",
      "/call",
    ],
  },
  {
    path: "/i-still-train-every-new-hire-myself",
    kind: "situation",
    published: PUBLISHED,
    title: "I Still Train Every New Hire Myself. How Do I Stop? | GrowthCred",
    description:
      "I still train every new hire myself. How do I stop? A private assistant on your scripts and SOPs takes the first questions. You still check the answer. Nothing goes to a customer.",
    heading: "You're growing, you hire every few months, and every new person still learns the job from you.",
    intro:
      "You walk them through the work. Then you do it again for the next person. While you teach, the quote and the question wait. You are the training manual.",
    sections: [
      {
        title: "What that week costs you",
        paragraphs: [
          "A new person can only learn what you have time to say. You repeat the same lesson. They wait when you are in a meeting.",
          "We do not have a measured number for how long this takes. Write down the hours you gave the last hire. That figure is yours. It is the baseline.",
        ],
      },
      {
        title: "What we set up",
        paragraphs: [
          "We build a private assistant on your scripts, your SOPs and your calls. It runs on equipment we set up for you. It stays inside the business.",
          "It does not talk to your customers. A new hire asks it first. You still check the answer when the work matters. The final say stays with you.",
          "This is the Command Core, used inside the team. Not a public chatbot. Not a course they watch alone.",
        ],
      },
      {
        title: "Start with one role",
        paragraphs: [
          "Pick the role you hire most. We load that way of working. You watch the next person.",
          "Do they still need you for every step? Then we are not done. Can they work a day while you only check? Then you measure that, and you decide on the next role.",
        ],
      },
    ],
    faq: [
      {
        q: "Will it replace the person who trains them?",
        a: "No. It answers from the material you gave it. You still check what matters. It takes the repeat questions, not your judgement.",
      },
      {
        q: "Can a customer see it?",
        a: "No. This one stays inside the business. It is for your people, on your documents. It does not face a customer.",
      },
    ],
    close: { ...call, line: "The next hire should not have to wait for you to repeat the job." },
    ctas: [{ to: "/call", label: "Book a call" }],
    related: ["/senior-dispatcher-on-leave", "/private-ai", "/guides/how-we-work-first-30-days", "/call"],
  },
  {
    path: "/senior-dispatcher-on-leave",
    kind: "situation",
    published: PUBLISHED,
    title: "What Happens to Our Operations When Our Senior Dispatcher Is on Leave | GrowthCred",
    description:
      "What happens to our operations when our senior dispatcher is on leave? The know-how sits in a few heads. Your own private AI can answer from the source document, by role.",
    heading: "You run a fleet, and when one senior person is on leave, half the questions stop moving.",
    intro:
      "Routes, drivers, the contract rule, the exception from last March. It sits in two heads. One of them is your senior dispatcher. They take leave. The questions queue.",
    sections: [
      {
        title: "Where the know-how sits",
        paragraphs: [
          "A junior can drive the route. They cannot always say why this contract is different. The answer is in a head, or in a file nobody can find.",
          "Calling the person on leave is the usual fix. It works until they do not pick up. Then the day waits.",
        ],
      },
      {
        title: "What we set up",
        paragraphs: [
          "We put that know-how on your own private AI. It runs on equipment we set up for you. It answers with the source document, so your team can see where the answer came from.",
          "Access is by role. A junior sees their job. They do not see the whole business. You decide who may ask what.",
          "It will not invent a rule you never wrote down. If the document is silent, the question still comes to a person. That is the point.",
        ],
      },
      {
        title: "Start with one team",
        paragraphs: [
          "Pick one depot, or one desk. We load the documents that desk actually uses. You see which questions still reach the senior.",
          "We will not quote you a drop in repeat questions. We have not measured one we can show you. You measure yours, then you decide.",
        ],
      },
    ],
    faq: [
      {
        q: "What if the document does not cover the question?",
        a: "The question comes back to a person. The system answers from what you gave it. It does not make up a rule.",
      },
      {
        q: "Does this run when the power is out?",
        a: "Only if we have agreed that, in writing, for your site. We will not claim it. Ask us on the call and we will tell you what your setup can and cannot do.",
      },
    ],
    close: { ...call, line: "Leave should not stop the questions your desk can already answer." },
    ctas: [{ to: "/call", label: "Book a call" }],
    related: [
      "/i-still-train-every-new-hire-myself",
      "/quoting-uniforms-for-a-security-company",
      "/private-ai",
      "/call",
    ],
  },
];
