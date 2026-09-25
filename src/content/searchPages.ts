export type SearchSection = { title: string; paragraphs: string[]; items?: string[]; mark?: "price" | "industry" | "diy" };
export type StoryImage = { src: string; alt: string; width: number; height: number; caption?: string };
export type SearchPage = {
  path: string; title: string; description: string; heading: string; intro: string;
  kind: "service" | "guide" | "about" | "hub" | "tool" | "story";
  sections: SearchSection[]; related: string[];
  /** Client stories: the words a client actually used, and who said them. */
  quote?: { text: string; by: string };
  /** Real photographs and screenshots supplied by Phila. */
  images?: StoryImage[];
  /** ISO date first published, where it differs from REVIEWED. */
  published?: string;
  /** A visible FAQ. Also emitted as FAQPage structured data, so it must match. */
  faq?: { q: string; a: string }[];
  /** Primary and secondary next steps for pages that serve more than one offer. */
  ctas?: { to: string; label: string }[];
  /** Public evidence used for market claims on the page. */
  sources?: { label: string; href: string }[];
  /** Kept out of search and the sitemap until the owner confirms it. */
  draft?: boolean;
};
export const REVIEWED = "2026-09-20";
/** Client stories were published after the last review of the other pages. */
export const STORIES_PUBLISHED = "2026-09-24";
/** The service, industry, market and bottom-of-funnel pages added for search. */
export const SEO_PUBLISHED = "2026-09-24";
export const SEARCH_PAGES: SearchPage[] = [
  {
    path: "/ai-training-south-africa", kind: "service",
    title: "Practical AI Training for Business Owners | GrowthCred",
    description: "Explore practical AI training for South African business owners. Build business context, practise real tasks and choose between training and implementation.",
    heading: "Practical AI training for South African business owners.",
    intro: "Learn to use AI on the work your business already does: proposals, research, follow-ups and recurring admin. GrowthCred is founder-led in Rosebank, Johannesburg, and focuses on applying AI to your own workflows.",
    sections: [
      { title: "Choose the kind of help you need", paragraphs: ["The one-day workshop is guided implementation: you bring your laptop and real work, and build alongside us. Done-for-you support is a separate engagement for owners who want help mapping and implementing workflows with their team. The workshop does not require you to buy a later programme."], items: ["Workshop: learn and build your own business context and first workflows.", "Done for you: discuss scope, delivery and ongoing responsibilities before a quote.", "Team enquiry: tell us the roles, group size and location so we can confirm whether we can meet the brief."] },
      { title: "What you practise", paragraphs: ["Start by mapping repetitive tasks. Write down how your business works, then use that context to draft a proposal, prepare a follow-up or research an internal question. Compare the result with your usual process before deciding what to automate.", "The aim is a repeatable way of working, not a collection of prompts. Human review remains important for prices, client commitments and anything that leaves the business."] },
      { title: "Training that has already run", paragraphs: ["Phila has given seven AI talks at WeWork Johannesburg. The first Operator Intensive at WeWork Rosebank sold out all five seats; owners whose businesses depended entirely on them left that day with working systems.", "After a working session, Macaela Oor of Demure International wrote: “My Claude has been operating a lot better since the last session.”"] },
      { title: "Who is it for?", mark: "industry", paragraphs: ["The workshop is designed for nontechnical owners, particularly those running teams of roughly 3–50 people who still handle too much admin themselves. You should be comfortable using a browser and willing to work on your own business during the session.", "This is practical business training, not a programming qualification or an accredited machine-learning course. No accreditation is claimed."] },
      { title: "Format, tools and next dates", paragraphs: ["Our workshop offer is one full day. Delivery is online. Session dates, times and the joining link are confirmed on registration. For a team session, contact us to confirm the format and scope that fit your brief.", "Bring a laptop and a non-sensitive example of work you want to improve. Ask us to confirm the tool list and any subscription costs before buying a plan. We do not promise that all tools are free."] },
      { title: "What does training cost?", mark: "price", paragraphs: ["The workshop is currently advertised at a R990 founding rate. Confirm the next session, final booking terms, VAT treatment and any separate tool costs with us before paying. Custom implementation and team requests are scoped separately."] },
    ], faq: [
      { q: "Do I need to be technical?", a: "No. The workshop is designed for non-technical owners, particularly those running teams of roughly 3–50 people who still handle too much admin themselves. You should be comfortable using a browser." },
      { q: "Is the training online?", a: "Yes. The one-day workshop is delivered online, and session dates, times and the joining link are confirmed on registration." },
      { q: "What does AI training cost?", a: "The workshop is currently advertised at a R990 founding rate. Confirm the next session, booking terms, VAT treatment and any separate tool costs with us before paying." },
    ],
    related: ["/workshop", "/corporate-ai-training", "/guides/ai-training-cost-south-africa", "/guides/ai-training-vs-automation", "/contact"],
  },
  {
    path: "/ai-automation-south-africa", kind: "service",
    title: "AI Automation Services in South Africa | GrowthCred SA",
    description: "Discuss practical AI automation for your South African business. Scope proposals, follow-ups and recurring admin with GrowthCred in Johannesburg.",
    heading: "AI automation built around your business.",
    intro: "GrowthCred helps South African business owners identify repetitive work and build AI-assisted workflows around it. Start with a scoped conversation about your process, your tools and the result you need.",
    sections: [
      { title: "Start with one workflow", paragraphs: ["Useful starting points include proposal drafts, quote preparation, follow-up drafts and recurring internal research. We assess the actual workflow before promising an integration. A task that relies on incomplete records or constant judgement may need a process change before automation.", "The goal is a measurable reduction in manual work. We agree what to measure and what still needs your team before implementation begins."] },
      { title: "How the engagement works", paragraphs: ["We map the current task, define the inputs and approval points, then agree a scope. A working version is tested against representative examples before wider use. Handover and support responsibilities belong in the agreed scope."], items: ["Discovery: document the current process, volume and pain points.", "Scope: agree deliverables, integrations, acceptance criteria and exclusions.", "Build and test: compare output against real examples with your team.", "Handover: document operation, ownership, access and maintenance responsibilities."] },
      { title: "Results clients have reported", paragraphs: ["TaiAscend reported that a document process that took three days now takes two hours. Sandile of MNE Waste, a waste management company running trucks, drivers, compliance and municipal contracts, built his Operator's Brain in one day and is now fully operational."] },
      { title: "What will it cost?", mark: "price", paragraphs: ["There is no single price for every business. Cost depends on the workflow, data readiness, connected systems, exception handling and support. We quote after reviewing the brief. The R990 workshop price is a training offer, not the price of a custom automation project.", "Ask for setup costs, recurring service costs and third-party subscriptions separately. Agree how changes will be handled so a small first project does not grow without a decision."] },
      { title: "Your systems and your information", paragraphs: ["Tell us which tools you already use. Compatibility depends on their APIs, account permissions and the workflow you need; a mention of a tool is not a promise of an existing connector.", "Keep confidential customer data out of an initial enquiry. During scoping, agree appropriate data access, retention, human review and who can approve external actions. We do not claim that installing an AI tool alone makes a workflow compliant with any law."] },
      { title: "Training or implementation?", mark: "diy", paragraphs: ["Choose the workshop if you want to build and understand your own starting workflow. Discuss implementation if the workflow spans systems, needs testing and maintenance, or your team needs delivery support. Either way, begin with a concrete task rather than a promise to automate the entire business."] },
    ], faq: [
      { q: "What does AI automation cost in South Africa?", a: "There is no single price for every business. Cost depends on the workflow, data readiness, connected systems, exception handling and support, and we quote after reviewing the brief. The R990 workshop is a training offer, not the price of a custom project." },
      { q: "Which workflows should we automate first?", a: "Good starting points are proposal drafts, quote preparation, follow-up drafts and recurring internal research. We assess the actual workflow before promising an integration." },
      { q: "Will it connect to the tools we already use?", a: "Compatibility depends on each tool's APIs, account permissions and the workflow you need. Mentioning a tool is not a promise of an existing connector, so we check before scoping." },
    ],
    related: ["/ai-proposal-automation", "/ai-follow-up-automation", "/ai-admin-automation", "/guides/how-we-work-first-30-days", "/call", "/data-and-security"],
  },
  {
    path: "/about", kind: "about",
    title: "About GrowthCred and Founder Phila Ngwenya | Johannesburg",
    description: "Meet Phila Ngwenya, founder of GrowthCred. Practical AI workshops and business workflow support from Rosebank, Johannesburg.",
    heading: "Practical AI. A real person behind it.",
    intro: "GrowthCred is led by Phila Ngwenya in Rosebank, Johannesburg. We help South African business owners put their business knowledge into a usable form and apply AI to repetitive work.",
    sections: [
      { title: "Meet Phila Ngwenya", paragraphs: ["Phila is GrowthCred’s founder and CEO. His work focuses on helping owners move from repeatedly briefing tools to building repeatable systems around how their business operates. He shares practical demonstrations and business-system ideas through his YouTube channel and LinkedIn profile."] },
      { title: "Experience behind the work", paragraphs: ["The method on this site comes from building it, not from reading about it."], items: [
        "Built 5 companies with AI.",
        "Co-developed an AI system presented at Parliament, Cape Town.",
        "Gave 7 AI talks at WeWork Johannesburg.",
        "Ran the first Operator Intensive at WeWork Rosebank, which sold out all five seats.",
      ] },
      { title: "What we believe useful training looks like", paragraphs: ["Bring actual work. Write down the context. Build a small workflow. Review the result. Keep what works and measure it. A system should help you make progress without taking away the judgement that belongs to you.", "We distinguish demonstrations from customer results. Worked examples in our guides are illustrative unless explicitly identified as measured, permissioned case studies."] },
      { title: "Our business details", paragraphs: ["GrowthCred (Pty) Ltd · Registration 2026/229279/07. Based in Rosebank, Johannesburg, South Africa. Email info@growthcred.co.za or use our contact page to discuss a workshop or implementation brief.", "Workshops are delivered online; session details are confirmed on registration. Our Johannesburg base is not a promise of walk-in office hours."] },
      { title: "Results and evidence", paragraphs: ["We only publish named client results with permission. MNE Waste, Demure International and TaiAscend have agreed to be named, and their stories are on our client stories page in their own words or as the result they reported.", "Worked examples in our guides stay labelled as illustrative. A method is not a promise of a result, and we keep the two apart."] },
    ], related: ["/stories", "/stories/mne-waste", "/ai-automation-johannesburg", "/contact"],
  },
  {
    path: "/resources", kind: "hub",
    title: "Practical AI Guides for Business Owners | GrowthCred",
    description: "Practical guides to AI training costs, business context, proposals, follow-ups and automation decisions for South African business owners.",
    heading: "Put AI to work, one useful task at a time.",
    intro: "Start with a clear question, a real task and a way to check the result. These guides help you decide what to learn, what to build and where human review belongs.",
    sections: [{title:"Choose your next step", paragraphs:["Compare training and implementation before buying. Use the business-brain guide to document your context, then try a proposal or follow-up draft with information you can safely share. The calculator helps estimate the value of time; it does not predict a guaranteed saving."]}],
    related: ["/guides/ai-training-cost-south-africa", "/guides/business-brain", "/guides/ai-proposals-and-follow-ups", "/guides/ai-training-vs-automation", "/guides/ai-automation-cost-south-africa", "/tools/admin-time-calculator", "/stories"],
  },
  {
    path: "/guides/ai-training-cost-south-africa", kind: "guide",
    title: "AI Training Costs in South Africa: What to Compare",
    description: "Understand workshop fees, team quotes, tool subscriptions and support before choosing AI training for your South African business.",
    heading: "What does AI training cost in South Africa?",
    intro: "There is no universal training price. Compare the format, number of participants, practical work and follow-up support. GrowthCred currently advertises its one-day workshop at a R990 founding rate; confirm the next session and complete booking terms before paying.",
    sections: [
      { title: "Compare the same unit", paragraphs: ["A price per person cannot be compared directly with a price for a whole team. A recorded introduction is also different from a day spent building a workflow online with a facilitator. Start by asking what the quoted amount actually buys.", "For example, if an illustrative team quote is R6,000 for six participants, that is R1,000 per participant before any extras. That arithmetic says nothing about the quality or suitability of the programme. This example is not a GrowthCred team quote or a market average."] },
      { title: "Ask for the complete cost", paragraphs: ["Check whether the fee includes materials, implementation time and support. Confirm whether VAT is included or applicable and whether the tools used need paid accounts. A workshop fee and a software subscription are separate purchasing decisions."], items: ["Is the rate per seat, per team or per session?", "Are the date, location and duration confirmed?", "Which tools and subscriptions are required?", "What support and materials are included?", "What are the cancellation and refund terms?"] },
      { title: "What GrowthCred currently offers", paragraphs: ["The R990 founding workshop focuses on documenting your business context and using it in practical workflows. Delivery is online, with session details confirmed on registration. Confirm the requirements before subscribing to a tool.", "Done-for-you implementation is separately scoped. Buying the workshop does not commit you to a later programme. The current refund terms are available through the footer; read their conditions alongside the offer."] },
      { title: "Evaluate usefulness, not just hours in a room", paragraphs: ["Choose one task you want to improve and ask how the programme will help you practise it. A good fit gives you something you can operate after the session: an approved context document, a repeatable process and a way to assess output.", "Do not convert every claimed hour saved into cash revenue. Time only becomes financial value if you can use it productively or reduce an actual cost. Ask for the measurement method behind any claimed results."] },
    ], related: ["/workshop", "/ai-training-south-africa", "/guides/ai-training-vs-automation", "/contact"],
  },
  {
    path: "/guides/business-brain", kind: "guide",
    title: "Give AI Your Business Context: A Practical Brain Guide",
    description: "Build a clear business context document for AI: services, customers, voice, approved facts and review rules. Includes a practical starting template.",
    heading: "Give AI context about your business.",
    intro: "A business brain is a maintained context document describing how your business works. It helps you brief an AI tool consistently. It is not a guarantee that every tool remembers everything or that its answers are correct.",
    sections: [
      { title: "Write the facts once", paragraphs: ["Start with your services, ideal customers, common tasks, tone of voice and approved terms. Separate confirmed facts from ideas and examples. Include a review date and a person responsible for keeping the document current.", "Use our free Business Brain builder to work through questions and copy or download your document. Review the output before using it; the tool assembles your answers, it does not verify your business facts."] },
      { title: "A starting template", paragraphs: ["Copy these headings into a document. Keep the first version short enough to inspect and update easily."], items: ["Business: what we do, who we serve and where we operate.", "Services: scope, exclusions and where approved pricing is stored.", "Voice: a short example of writing we would actually send.", "Workflow: inputs, steps, output and the person who approves it.", "Rules: ask when information is missing; do not invent prices or commitments.", "Maintenance: owner, review date and what has changed."] },
      { title: "Use a small, safe example", paragraphs: ["Imagine a fictional maintenance business drafting a follow-up after a meeting. Give the tool a sample meeting note and approved service description. Ask it to summarise the customer's need, draft a short email and list any facts it could not confirm.", "Compare this with a draft made without context. Check accuracy, tone and the time spent correcting it. The useful result is a repeatable improvement in your work, not simply a longer answer."] },
      { title: "Connect it carefully", paragraphs: ["Tools differ in how they accept documents, instructions and knowledge sources. Check the tool's current documentation and account controls. Uploading a document does not mean every future conversation or every connected tool will automatically have access to it.", "Do not put passwords or unnecessary personal information into a reusable brief. Use a fictional or redacted example for practice. Agree appropriate sharing and access with your business before adding real client material."] },
      { title: "Keep it useful", paragraphs: ["Review the brief whenever prices, services or terms change. Keep a short test task and rerun it after important changes. If the tool repeatedly gets something wrong, clarify the source and workflow instead of adding contradictory instructions.", "A context document is a starting point. A reliable workflow also needs good inputs, human checks and a clear place for the approved output."] },
    ], related: ["/brain", "/guides/ai-proposals-and-follow-ups", "/workshop", "/ai-automation-south-africa"],
  },
  {
    path: "/guides/ai-proposals-and-follow-ups", kind: "guide",
    title: "How to Use AI for Proposals and Follow-Ups | GrowthCred",
    description: "A practical proposal and follow-up workflow: prepare context, draft, check facts and approve before sending. Includes an illustrative briefing example.",
    heading: "Use AI for proposals and follow-ups without losing control.",
    intro: "Start by using AI to draft from approved information. Keep prices, commitments and sending under human review. Measure the whole process, including corrections, before deciding whether automation helps.",
    sections: [
      { title: "Gather the inputs", paragraphs: ["You need the customer's request, the agreed scope, approved pricing and your usual terms. Missing information should remain a question, not turn into a confident assumption. Use redacted examples while testing.", "Separate client-specific notes from your reusable business brief. A previous customer's confidential details do not belong in a template used for everyone."] },
      { title: "Try this briefing structure", paragraphs: ["Ask: Draft a proposal using only the supplied scope, approved pricing and meeting notes. Use our house style. Include deliverables, exclusions, timeline and next step. Mark missing facts as questions. Do not invent dates, discounts or payment terms.", "For a follow-up, ask for a short message summarising the agreed next step. Request a list of uncertain facts separately so they cannot accidentally appear as commitments in the email."] },
      { title: "A fictional worked example", paragraphs: ["A fictional consultant has a meeting note saying the client wants a reporting template. The note contains no agreed deadline or price. A useful draft describes the proposed deliverable and asks to confirm timing and cost. An unsafe draft invents a Friday deadline and a discount.", "Both drafts may sound polished. The difference is whether the output respects what is actually known. This example illustrates a review rule; it is not a customer result."] },
      { title: "Review before sending", paragraphs: ["Check the recipient, scope, figures, dates, exclusions, attachments and tone. Recalculate totals outside the prose draft. Make one person responsible for approval and keep the final version where the team can find it."], items: ["Does every commercial claim have an approved source?", "Is anything from another customer included?", "Does the next step match the actual conversation?", "Are draft notes and unanswered questions resolved?"] },
      { title: "Measure the complete task", paragraphs: ["Record how long your usual process takes. Then measure preparation, AI drafting, correction and final review on comparable tasks. Use several examples, including messy ones. Count errors as well as minutes.", "Only automate the repeatable parts once the workflow is dependable. Automatic sending is a separate decision that needs controls for exceptions, duplicate messages and changes in customer context."] },
    ], related: ["/ai-proposal-automation", "/ai-follow-up-automation", "/guides/business-brain", "/tools/admin-time-calculator"],
  },
  {
    path: "/guides/ai-training-vs-automation", kind: "guide",
    title: "AI Workshop or Done-for-You Automation? | GrowthCred",
    description: "Compare learning to build AI workflows with hiring implementation support. Understand effort, scope, ownership and ongoing maintenance.",
    heading: "Should you choose AI training or done-for-you automation?",
    intro: "Choose training when you want to learn and operate a starting workflow yourself. Discuss implementation when the work spans systems, needs delivery support or has ongoing operational requirements. Neither removes your responsibility for business decisions.",
    sections: [
      { title: "When a workshop fits", paragraphs: ["A workshop suits an owner who can spend time practising and wants to understand the process. Bring a bounded task such as drafting a proposal from approved information. You learn how to brief, review and repeat the work.", "You still need to maintain your business information and use the workflow after the session. Training is less useful if you cannot give it time or expect a completely managed service."] },
      { title: "When implementation fits", paragraphs: ["A scoped project may fit when information moves between tools, several people approve work, or exceptions need testing. Ask the provider to demonstrate the workflow against examples from your business rather than only a polished demo.", "Agree what happens after handover. Tool changes, access permissions and inconsistent input data can all require maintenance. A delivered project and a managed service are different responsibilities."] },
      { title: "Compare the responsibilities", paragraphs: ["In training, your investment includes learning and practice. In implementation, it includes briefing, reviewing and accepting the work. Both require someone inside your business to own the process."], items: ["Time: who learns, supplies inputs and approves output?", "Scope: one task, a connected process or ongoing operation?", "Cost: training fee or project quote, plus tools and support?", "Ownership: who controls accounts, documents and workflow configuration?", "Support: what is included, for how long, and how are changes quoted?"] },
      { title: "Use one task to decide", paragraphs: ["Write down a task you do each week, its inputs, the expected output and its current effort. If you can practise it safely in a browser, a workshop may be a useful first step. If it needs multiple integrations and operational checks, ask for a scope assessment.", "GrowthCred's workshop and done-for-you engagement are separate offers. You can discuss fit without committing to a later programme. Ask us to confirm availability, the scope and all costs before making a choice."] },
    ], related: ["/ai-training-south-africa", "/ai-automation-south-africa", "/guides/ai-automation-cost-south-africa", "/contact"],
  },
  {
    path: "/guides/ai-automation-cost-south-africa", kind: "guide",
    title: "AI Automation Costs South Africa: Scope Your Project",
    description: "Understand AI automation setup costs, subscriptions, testing and maintenance. Use a scoping checklist before requesting a South African business quote.",
    heading: "What drives the cost of AI automation?",
    intro: "The cost depends on the workflow and the responsibilities around it. A drafting assistant and a connected operational system are different projects. GrowthCred quotes implementation after scoping; this guide does not invent a standard project price.",
    sections: [
      { title: "Separate setup from running costs", paragraphs: ["Setup may include process mapping, configuration, integrations and testing. Running costs may include software subscriptions, usage charges and agreed support. Ask for these separately so a low initial quote does not hide the ongoing commitment.", "Third-party prices can change. Check current provider pricing for the tools in the proposed scope rather than relying on an old screenshot or a generic monthly allowance."] },
      { title: "The main scope drivers", paragraphs: ["A reliable quote starts with enough detail to understand the work. The number of tools is only one part of the cost: exception handling, review and maintenance often matter just as much."], items: ["Process: how many steps, roles and approval points?", "Data: is it complete, consistent and accessible?", "Integrations: are supported APIs and permissions available?", "Volume: how often will it run and how much information is processed?", "Quality: what must be checked and what happens on failure?", "Support: who monitors, updates and resolves problems?"] },
      { title: "Prepare a useful brief", paragraphs: ["Describe the current task, frequency, systems used and expected result. Bring a redacted example input and a good final output. List the parts that must remain human-controlled and the exceptions you encounter most often.", "For example, preparing an internal report once a week is a different scope from answering customers continuously across channels. Do not use one project's price as a reliable estimate for the other."] },
      { title: "Evaluate the return cautiously", paragraphs: ["Estimate time saved after including review and corrections, then compare that with setup and recurring costs. Keep expected savings separate from observed results. Time value is not automatically additional revenue.", "If you estimate four hours saved each week across 48 working weeks, that is 192 hours a year. Whether that is useful depends on what your team can do with those hours. Our calculator makes its assumptions visible so you can explore your own scenario."] },
      { title: "Agree acceptance before building", paragraphs: ["Define the example tasks the system must handle, acceptable outputs, failure behaviour and who signs off. Record exclusions and the process for changes. This makes the quote easier to compare and gives you a concrete basis for evaluating delivery.", "Send GrowthCred a short description of your workflow to discuss whether a scoped implementation or practical training is the better starting point. Keep confidential records out of the initial enquiry."] },
    ], related: ["/ai-automation-south-africa", "/tools/admin-time-calculator", "/guides/ai-training-vs-automation", "/call"],
  },
  {
    path: "/stories", kind: "hub", published: STORIES_PUBLISHED,
    title: "Client Stories: AI Systems for SA Businesses | GrowthCred",
    description: "How South African owner-led businesses, from waste management to beauty and cosmetics, built AI systems from their own knowledge with GrowthCred.",
    heading: "This isn't theory. These are the businesses that built it.",
    intro: "A waste management company. A beauty and cosmetics brand. A room of owners at WeWork Rosebank whose businesses depended entirely on them. Different industries, one method: the system is built from your knowledge, not a template.",
    sections: [
      { title: "Results owners have reported", paragraphs: ["Every story here comes from a real client, in their words or in the result they reported to us. Where a figure is quoted, it is the one they gave."], items: [
        "TaiAscend: a document process that took three days now takes two hours.",
        "MNE Waste: Sandile built his Operator's Brain in one day at the first Operator Intensive, and is now fully operational.",
        "Demure International (Enigma Essentials): \u201cMy Claude has been operating a lot better since the last session.\u201d",
        "The first Operator Intensive sold out all five seats at WeWork Rosebank.",
      ] },
      { title: "Why it works across industries", paragraphs: ["Generic AI gives generic answers, because it knows nothing about your business. Every GrowthCred system starts by writing down how the business actually runs (its services, clients, rules and way of working) and giving that context to the AI before it does any work.", "That is why the same method holds for a company running trucks, drivers and municipal contracts and for a brand managing orders, inventory and bookings. The knowledge changes; the method does not."] },
    ],
    related: ["/stories/mne-waste", "/stories/demure-international", "/stories/operators-intensive-wework-rosebank"],
  },
  {
    path: "/stories/mne-waste", kind: "story", published: STORIES_PUBLISHED,
    title: "MNE Waste: An Operator's Brain Built in One Day | GrowthCred",
    description: "Sandile runs MNE Waste, a South African waste management company. He built his Operator's Brain in one day at GrowthCred's first Operator Intensive.",
    heading: "MNE Waste built its Operator's Brain in one day.",
    intro: "Sandile runs MNE Waste, a waste management company: trucks, drivers, compliance and municipal contracts. He came to GrowthCred's first Operator Intensive, built his Operator's Brain in one day, and is now fully operational.",
    images: [
      { src: "/images/stories/operators-intensive-session.jpg", alt: "Owners working through the first Operator Intensive at WeWork Rosebank", width: 1200, height: 900, caption: "The first Operator Intensive, WeWork Rosebank." },
      { src: "/images/stories/mne-waste-website.jpg", alt: "MNE Waste website: simplifying medical waste disposal for every facility", width: 344, height: 256, caption: "MNE Waste handles medical waste collection and disposal." },
    ],
    sections: [
      { title: "The business", paragraphs: ["MNE Waste handles waste collection and disposal, including medical waste for healthcare facilities. The work runs on trucks, drivers, compliance and municipal contracts. It is an operation where the owner ends up holding every detail, and every question comes back to him."] },
      { title: "What he built", paragraphs: ["At the Operator Intensive, Sandile built his Operator's Brain: one place that holds how MNE Waste actually runs, so the AI starts every task already knowing the business instead of from a blank page.", "It is built from his knowledge of his own operation, not from a template. That is the part generic AI tools skip, and the reason their answers sound like they could be about anyone."] },
      { title: "The result", paragraphs: ["He built it in one day, in the room, on his own business. He is now fully operational."] },
      { title: "What it means for your business", mark: "industry", paragraphs: ["If AI can handle trucks, drivers, compliance and municipal contracts, it can handle whatever you do. The system is built from your knowledge, not a template."] },
    ],
    related: ["/ai-for-waste-management", "/stories/operators-intensive-wework-rosebank", "/guides/business-brain", "/stories"],
  },
  {
    path: "/stories/demure-international", kind: "story", published: STORIES_PUBLISHED,
    title: "Demure International: Better AI in One Session | GrowthCred",
    description: "Macaela Oor runs Demure International (Enigma Essentials), a beauty and cosmetics business. After one GrowthCred session, her AI started working better.",
    heading: "A beauty brand whose AI got better after one session.",
    intro: "Macaela Oor runs Demure International, the company behind Enigma Essentials, a beauty and cosmetics brand: orders, inventory, client bookings and brand content. After a working session with GrowthCred, she noticed the difference in the AI she uses every day.",
    quote: { text: "My Claude has been operating a lot better since the last session.", by: "Macaela Oor, Demure International (Enigma Essentials)" },
    images: [
      { src: "/images/stories/macaela-message.jpg", alt: "WhatsApp message from Macaela Oor: my Claude has been operating a lot better since the last session", width: 992, height: 242, caption: "Macaela's message after the session, 18 July." },
    ],
    sections: [
      { title: "The business", paragraphs: ["Running a beauty and cosmetics brand means taking orders, keeping inventory straight, managing client bookings and producing a steady stream of brand content. Much of it is repetitive, and most of it lands on the owner."] },
      { title: "What changed", paragraphs: ["The AI she already used did not change. What changed was what it knew. GrowthCred's sessions build the AI around the owner's own knowledge (the products, the clients, the way the brand speaks) rather than a template.", "The difference shows up in the answers. A tool that knows your business stops giving you advice that could be for anyone."] },
      { title: "What it means for your business", mark: "industry", paragraphs: ["If AI can handle orders, inventory, client bookings and brand content, it can handle whatever you do. The system is built from your knowledge, not a template."] },
    ],
    related: ["/ai-for-beauty-and-cosmetics", "/guides/business-brain", "/stories/mne-waste", "/stories"],
  },
  {
    path: "/stories/operators-intensive-wework-rosebank", kind: "story", published: STORIES_PUBLISHED,
    title: "Operator Intensive Sold Out at WeWork Rosebank | GrowthCred",
    description: "GrowthCred's first Operator Intensive sold out all five seats at WeWork Rosebank. Owners whose businesses depended on them left with working AI systems.",
    heading: "The first Operator Intensive sold out five seats at WeWork Rosebank.",
    intro: "They all walked in with the same problem: their businesses depended entirely on them. By the end of the day, they'd built working systems.",
    images: [
      { src: "/images/stories/operators-intensive-room.jpg", alt: "The Operator Intensive room at WeWork Rosebank, set up with workbooks, and owners at work", width: 399, height: 306, caption: "The room, set for five." },
      { src: "/images/stories/operators-intensive-sold-out.jpg", alt: "GrowthCred announcement: Your week is sold out", width: 390, height: 330, caption: "All five seats went." },
    ],
    sections: [
      { title: "The problem they brought", paragraphs: ["Every owner in the room had the same bottleneck, and it was them. Proposals waited for them. Follow-ups waited for them. Decisions only they could make sat behind work anyone could do."] },
      { title: "What happened on the day", paragraphs: ["The day was spent on each owner's own business, not on theory: writing down how it runs, who it serves and how it speaks, and turning that knowledge into systems they could use.", "By the end of the day, they'd built working systems."] },
      { title: "One of the five", paragraphs: ["Sandile, who runs MNE Waste, was in that room. He built his Operator's Brain in one day and is now fully operational. If this works for waste management, it works for whatever you do."] },
    ],
    related: ["/stories/mne-waste", "/ai-automation-johannesburg", "/workshop", "/stories"],
  },
  {
    path: "/ai-proposal-automation", kind: "service", published: SEO_PUBLISHED,
    title: "AI Proposal Automation for Business | GrowthCred SA",
    description: "Cut proposal turnaround with AI drafted from your own scope, pricing and voice, with every figure checked by a person. Founder-led from Johannesburg.",
    heading: "AI proposal automation that sounds like you and checks its facts.",
    intro: "Proposals are where owner-led businesses lose days: the owner is the only one who knows the scope, the pricing logic and how the business talks. We build a proposal system from that knowledge, so first drafts arrive in your voice and your team only has to check them.",
    sections: [
      { title: "Why proposals wait for the owner", paragraphs: ["A proposal pulls together things that usually live in one head: what was agreed in the meeting, what the business can deliver, how it prices, and what it has promised before. When that knowledge is not written down anywhere, every proposal queues behind the founder's calendar.", "A generic AI tool does not fix this on its own. It has never seen your scope, your prices or your past proposals, so it writes something that could be for anyone, and someone still has to rewrite it."] },
      { title: "What we build", paragraphs: ["We start by writing down how your business actually quotes and proposes: your services, your pricing rules, your standard terms, the structure you use, and examples of proposals that won. That becomes the context the AI works from, so every draft starts from your business rather than a blank page."], items: [
        "A proposal brief that holds your services, pricing rules, terms and house style.",
        "A drafting workflow that turns meeting notes into a first draft and flags anything missing as a question.",
        "A review step: prices, dates and commitments are checked by a named person before anything is sent.",
        "A way to measure the whole task, including corrections, against how long it takes today.",
      ] },
      { title: "What clients have reported", paragraphs: ["TaiAscend reported that a document process that took three days now takes two hours. Your result depends on your process and how consistently the system is used, which is why we agree what to measure before we build."] },
      { title: "What stays human", paragraphs: ["The AI drafts; people decide. Prices, discounts, deadlines and anything contractual come from approved sources and are checked before sending. Missing information stays a question in the draft, never a confident guess."] },
    ],
    faq: [
      { q: "Will the proposals sound generic?", a: "No. The system is built from your own services, pricing rules, terms and past proposals, so drafts start in your voice. That is the difference from asking a general AI tool cold." },
      { q: "Does AI set the prices?", a: "No. Prices and commercial terms come from rules you approve, and a named person checks every figure before a proposal is sent." },
      { q: "How fast can proposals get?", a: "TaiAscend reported a document process going from three days to two hours. We agree what to measure for your process before building, rather than promising a number up front." },
      { q: "Do I need special software?", a: "Tell us which tools you use today. We assess the workflow and your tools before promising any integration, and tool costs are agreed separately." },
    ],
    related: ["/guides/ai-proposals-and-follow-ups", "/ai-follow-up-automation", "/stories", "/call"],
  },
  {
    path: "/ai-follow-up-automation", kind: "service", published: SEO_PUBLISHED,
    title: "AI Lead Follow-Up Automation for SMEs | GrowthCred SA",
    description: "Stop losing deals to slow replies. We build AI follow-up drafting from your own knowledge, with a person approving what goes out. Founder-led in Johannesburg.",
    heading: "Follow up while the lead is still warm.",
    intro: "When every follow-up waits for the owner, leads cool while the business is busy. We build a follow-up system from your knowledge: what you sell, how you talk and what you promised in the last conversation. The next message is drafted in minutes, and a person approves it.",
    sections: [
      { title: "Where follow-ups break down", paragraphs: ["Follow-ups rarely fail because nobody cares. They fail because writing a good one needs context: who the lead is, what was discussed, what the next step is and what the business can honestly offer. When that context sits with one person, the message waits for them.", "Slow response is a quiet cost. It rarely shows up in a report, but it shows up in deals that went to whoever answered first."] },
      { title: "What we build", paragraphs: ["A follow-up workflow that starts from your business brief and the notes from the last conversation, drafts the next message in your voice, and lists anything uncertain separately so it cannot slip into the email as a promise."], items: [
        "Your business context written down once: offers, tone, standard next steps.",
        "Drafts generated from meeting or call notes, not from memory.",
        "Uncertain facts listed separately for a person to confirm.",
        "Human approval before any message is sent to a customer.",
      ] },
      { title: "Start with one kind of follow-up", paragraphs: ["The fastest wins come from one repeated message: the day-after-meeting summary, the quote reminder, or the check-in after delivery. We build one, measure it against how you do it today, then decide what to add."] },
    ],
    faq: [
      { q: "Will messages go out without anyone checking?", a: "Not unless you decide that for a specific, low-risk message. By default a person approves every customer-facing message, and uncertain facts are flagged rather than guessed." },
      { q: "Does it work with WhatsApp and email?", a: "Tell us which channels and tools you use. We assess the workflow and the tools before promising any connection; mentioning a tool is not a promise of an existing connector." },
      { q: "How is this different from a CRM sequence?", a: "A sequence sends the same template to everyone. This drafts each follow-up from what was actually discussed and from your business context, then a person approves it." },
    ],
    related: ["/guides/ai-proposals-and-follow-ups", "/ai-proposal-automation", "/ai-admin-automation", "/call"],
  },
  {
    path: "/ai-admin-automation", kind: "service", published: SEO_PUBLISHED,
    title: "AI Admin Automation for Small Businesses | GrowthCred SA",
    description: "An alternative to outsourcing admin: AI systems built from your own business knowledge that take on repetitive admin, with people reviewing the output.",
    heading: "Admin that no longer waits for the owner.",
    intro: "Owner-led businesses often look at outsourcing admin when the founder is drowning in it. There is another option: build systems that do the repetitive part from your own knowledge, and keep people for the judgement. GrowthCred designs and installs those systems with your team.",
    sections: [
      { title: "The admin that traps the founder", paragraphs: ["Reports, quotes, recurring emails, internal questions, status updates, research: none of it is difficult, but much of it needs someone who knows how the business works. In an owner-led firm, that someone is usually the owner.", "The cost is not the hours alone. It is the founder doing low-value work when their decisions are worth far more."] },
      { title: "What we saw in the room", paragraphs: ["Every owner at the first Operator Intensive walked in with the same problem: their business depended entirely on them. By the end of the day they had built working systems. One of them, Sandile of MNE Waste, is now fully operational."] },
      { title: "Automation or outsourcing?", paragraphs: ["Outsourcing moves the work to another person, who still needs your knowledge to do it well. AI automation writes that knowledge down once and uses it every time. Many businesses end up with both: systems that do the repetitive drafting, and people who review, decide and handle exceptions.", "Our comparison guide walks through the trade-offs honestly, including where a person is still the better answer."] },
      { title: "How we approach it", paragraphs: ["We follow the same three steps on every engagement: audit where the founder is the bottleneck and put a rand value on the hours involved, deploy systems that replicate the founder's judgement for those tasks, then embed and track performance monthly."], items: [
        "Audit: map the admin, how often it happens and who it waits for.",
        "Deploy: build the first system on the highest-value task; the first result is targeted within 14 days.",
        "Embed: review monthly, add capabilities as the business changes.",
      ] },
    ],
    faq: [
      { q: "Is this cheaper than hiring an admin assistant?", a: "It depends on the work. Use our admin time calculator to put a value on the hours, and read the comparison guide: repetitive drafting suits automation, while judgement and relationships often suit a person." },
      { q: "Which admin tasks are good candidates?", a: "Repeated, rules-based work with clear inputs: proposal drafts, follow-ups, reports, recurring internal questions and research. Tasks that depend on incomplete records may need a process fix first." },
      { q: "Will my team lose their jobs?", a: "The aim is to take repetitive drafting off the people who are stuck doing it, including the owner. People stay responsible for review, decisions and exceptions." },
    ],
    related: ["/guides/admin-assistant-vs-ai-automation", "/tools/admin-time-calculator", "/ai-automation-south-africa", "/call"],
  },
  {
    path: "/ai-for-waste-management", kind: "service", published: SEO_PUBLISHED,
    title: "AI for Waste Management Companies in SA | GrowthCred",
    description: "How waste management companies use AI built from their own knowledge for compliance paperwork, contracts and admin. See how MNE Waste built its system.",
    heading: "AI for waste management companies.",
    intro: "Waste management runs on trucks, drivers, compliance and municipal contracts, and most of that knowledge lives with the owner. MNE Waste's founder built his Operator's Brain in one day with GrowthCred. If AI can handle that, it can handle whatever you do.",
    images: [
      { src: "/images/stories/mne-waste-website.jpg", alt: "MNE Waste website: simplifying medical waste disposal for every facility", width: 344, height: 256, caption: "MNE Waste, a GrowthCred client." },
    ],
    sections: [
      { title: "Where the owner gets stuck", paragraphs: ["A waste management business carries a heavy load of documents and coordination: compliance paperwork, contract and tender documents, client reporting, driver communication and scheduling questions. Much of it follows rules the owner knows by heart but has never written down.", "That is exactly the knowledge an AI system needs. Without it, generic tools give generic answers."] },
      { title: "Where AI helps first", paragraphs: ["The best starting points are repeated documents with clear rules and a person who can check them."], items: [
        "Drafting client reports and service summaries from the job records you already keep.",
        "Preparing first drafts of tender and contract responses from your standard information.",
        "Answering recurring internal questions about procedures, so drivers and staff are not waiting on the owner.",
        "Drafting follow-ups and quotes for new facilities in your voice.",
      ] },
      { title: "Compliance stays with people", paragraphs: ["Compliance documents carry legal weight. AI can draft and organise them from your approved information, but a responsible person checks and signs off. We agree those review points before anything is built."] },
      { title: "The MNE Waste story", paragraphs: ["Sandile runs MNE Waste, which handles waste collection and disposal including medical waste. He came to the first Operator Intensive, built his Operator's Brain in one day, and is now fully operational. Read the full story."] },
    ],
    faq: [
      { q: "Can AI handle waste management compliance?", a: "AI can draft and organise compliance paperwork from your approved information, which saves time. A responsible person still checks and signs off, because the documents carry legal weight." },
      { q: "Do you have waste management clients?", a: "Yes. MNE Waste built its Operator's Brain with GrowthCred at the first Operator Intensive and is now fully operational." },
      { q: "Where do we start?", a: "With one repeated document or question that currently waits for the owner. We measure it before and after, then decide what to build next." },
    ],
    related: ["/stories/mne-waste", "/ai-admin-automation", "/stories/operators-intensive-wework-rosebank", "/call"],
  },
  {
    path: "/ai-for-beauty-and-cosmetics", kind: "service", published: SEO_PUBLISHED,
    title: "AI for Beauty and Cosmetics Brands | GrowthCred SA",
    description: "Beauty and cosmetics brands use AI built from their own products and voice for content, bookings and customer questions. See Demure International's story.",
    heading: "AI for beauty and cosmetics brands.",
    intro: "A beauty brand runs on orders, inventory, client bookings and a constant stream of brand content, all in a voice customers recognise. Macaela Oor of Demure International (Enigma Essentials) put it simply after one session: her AI has been operating a lot better.",
    quote: { text: "My Claude has been operating a lot better since the last session.", by: "Macaela Oor, Demure International (Enigma Essentials)" },
    sections: [
      { title: "Why generic AI sounds off-brand", paragraphs: ["A beauty brand lives or dies on its voice. A general AI tool has never read your product range, your ingredient notes or the way you talk to clients, so its captions and replies sound like everyone else's.", "The fix is context: your products, your customers, your tone and your rules, written down once and given to the AI before it writes anything."] },
      { title: "Where AI helps first", paragraphs: ["Start with work that repeats every week and has a clear standard."], items: [
        "Product descriptions and social captions drafted in your brand voice.",
        "Booking confirmations, reminders and rescheduling messages.",
        "Answers to recurring customer questions about products and orders.",
        "Weekly summaries of orders and stock from the records you already keep.",
      ] },
      { title: "Claims stay checked", paragraphs: ["Anything about ingredients, results or suitability for skin types is checked by a person against your approved product information before it is published. AI drafts; you decide what your brand promises."] },
    ],
    faq: [
      { q: "Will AI content sound like my brand?", a: "Only if it is built from your brand. We write down your products, customers, tone and rules first, so drafts start in your voice instead of a generic one." },
      { q: "Can AI answer customer questions about my products?", a: "It can draft answers from your approved product information. Anything about ingredients, results or suitability is checked by a person before it goes out." },
      { q: "Do you work with beauty brands?", a: "Yes. Demure International, the company behind Enigma Essentials, worked with GrowthCred; Macaela's words about the result are on this page." },
    ],
    related: ["/stories/demure-international", "/ai-follow-up-automation", "/guides/business-brain", "/call"],
  },
  {
    path: "/ai-for-financial-services", kind: "service", published: "2026-09-25",
    title: "AI Workflows for Finance Teams & FSPs | GrowthCred SA",
    description: "Practical AI workflows for South African finance teams, accounting firms and FSPs: controlled reporting, review packs and client admin with human sign-off.",
    heading: "AI for finance work that still needs a professional at the controls.",
    intro: "Finance teams do not need another tool that produces a fast answer nobody can defend. They need a controlled way to prepare recurring work from approved information, surface what is missing and hand every consequential decision to the right person.",
    sections: [
      { title: "The real problem is the work around the decision", mark: "industry", paragraphs: ["Month-end commentary, management packs, review preparation, meeting notes, document requests and recurring client questions consume senior time. The arithmetic may already be in the system, but the explanation, checking and follow-up still wait for the same finance lead, partner or adviser.", "A general AI tool does not solve that by itself. If every person uses different prompts and sources, the firm gets inconsistent drafts, unclear data handling and more work checking what the tool invented."], items: [
        "Monthly packs are assembled and rewritten by hand for each audience.",
        "Client questions interrupt senior people because the approved answer is scattered across files and email.",
        "Onboarding and annual-review packs stall on missing documents, but nobody can safely guess what is absent.",
        "Teams measure draft speed while ignoring preparation, correction and professional review time.",
      ] },
      { title: "A better way to look at it", paragraphs: ["Do not ask whether AI can do finance. Ask which part of one repeated workflow can be prepared safely before professional judgement begins. The useful unit is not a prompt; it is a controlled handoff with approved inputs, a defined output, a named reviewer and a route for exceptions.", "This keeps the valuable judgement with accountants, finance leaders and licensed advisers. The system handles preparation and consistency; the professional checks the figures, interpretation, suitability and communication." ] },
      { title: "Start with one controlled workflow", paragraphs: ["Choose a task that happens often, has clear source material and already ends with human review. Record how long the whole task takes today, including corrections. Test a pilot on representative redacted examples, then compare elapsed time, review time, missing-input cases and errors before expanding."], items: [
        "Draft management-pack commentary from approved figures, with every variance linked back to its source.",
        "Turn meeting notes into a summary and action register for a professional to approve.",
        "Prepare onboarding or annual-review checklists that flag missing information instead of filling the gap.",
        "Draft recurring client or management updates from approved facts, with a person approving what is sent.",
      ] },
      { title: "Where the boundary belongs", paragraphs: ["GrowthCred does not replace an accountant, finance officer, compliance function or licensed financial adviser. We do not position a general AI model as a credit decision, investment recommendation, financial statement, filing or customer-impacting decision maker.", "Before implementation, your firm defines which information may be used, who may see it, what must be retained, what the system must never do and who signs off. Installing a tool does not by itself make a workflow compliant with POPIA or financial-sector rules."] },
      { title: "Workshop or implementation?", mark: "diy", paragraphs: ["Choose the one-day workshop when your team needs a shared method and wants to build the first controlled workflow themselves. Bring a fictional or redacted example. You leave with a mapped task, an approved context pack, a review checklist and a way to measure the pilot—not merely a list of prompts.", "Apply for implementation when the workflow crosses tools, needs permissions or repeatable input handling, or must be handed over across a team. We scope one workflow, define acceptance tests, build and test it with your reviewers, then agree ownership and support before wider use."] },
      { title: "Who has the strongest fit", paragraphs: ["The clearest starting fit is an accounting, bookkeeping, outsourced-finance, fractional-CFO, advisory or brokerage team of roughly 3–50 people with recurring document work and an identifiable professional reviewer. Internal finance teams in owner-led businesses can fit for the same reason.", "Large banks and insurers are investing heavily in AI, but their model-risk, procurement, security and integration requirements demand a different engagement. GrowthCred will only discuss work that matches its delivery capacity and your governance requirements."] },
    ],
    faq: [
      { q: "Can AI give financial advice or approve credit?", a: "That is not the offer. GrowthCred focuses on controlled preparation, drafting and internal workflows. Licensed advice, credit decisions, financial statements, filings and other consequential decisions stay with appropriately authorised people and the firm's compliance process." },
      { q: "What finance workflow should we start with?", a: "Choose a frequent task with approved source material and an existing human reviewer, such as management-pack commentary, meeting summaries, missing-document checklists or recurring client-update drafts." },
      { q: "Should we choose the workshop or implementation?", a: "Choose the workshop if your team wants to learn the method and build a first controlled workflow. Apply for implementation if the process crosses systems, needs permissions or must be mapped, built, tested and handed over for you." },
      { q: "Can we use real client financial data in the workshop?", a: "Bring a fictional or properly redacted example unless your organisation has explicitly approved another approach. Data access, retention and tool permissions belong in the implementation scope before real information is used." },
    ],
    ctas: [{ to: "/call", label: "Apply for implementation" }, { to: "/workshop", label: "Explore the workshop" }],
    sources: [
      { label: "SARB & FSCA: Artificial Intelligence in the South African Financial Sector (2025)", href: "https://www.resbank.co.za/en/home/publications/publication-detail-pages/prudential-authority/pa-public-awareness/Communication/2025/AI-in-the-South-African-Financial-Sector" },
      { label: "FSCA & Prudential Authority: report release and key findings (2025)", href: "https://www.fsca.co.za/News%20Documents/Press%20Release%20-%20Artificial%20Intelligence%20in%20the%20South%20African%20Financial%20Sector%20Final_24%20November%202025.pdf" },
    ],
    related: ["/guides/how-we-work-first-30-days", "/data-and-security", "/workshop", "/call"],
  },
  {
    path: "/ai-for-law-firms", kind: "service", published: "2026-09-25",
    title: "AI Workflows for South African Law Firms | GrowthCred",
    description: "Practical AI workflows for South African law firms: controlled intake, matter summaries, chronologies and client updates with practitioner verification.",
    heading: "AI for law firms, without outsourcing professional judgement.",
    intro: "A law firm does not need faster plausible text. It needs a repeatable way to collect facts, organise matter information and prepare first drafts while a legal practitioner remains responsible for every authority, proposition, deadline and client commitment.",
    sections: [
      { title: "Where legal work quietly loses time", mark: "industry", paragraphs: ["New enquiries arrive through calls, email and WhatsApp, but the facts, conflict-check information and documents are incomplete. Client updates wait while someone reconstructs the matter from notes. Partners review work that follows a different structure every time because the firm's preferred questions, precedents and escalation rules live in people's heads.", "Using a general AI tool without those controls can move the problem rather than solve it. A draft appears quickly, then a practitioner spends the saved time checking unsupported propositions, invented authorities and missing facts."], items: [
        "Intake reaches a fee earner before the matter facts and documents are complete.",
        "Chronologies and matter summaries are rebuilt from scattered notes and attachments.",
        "Client updates wait even when the underlying work is moving.",
        "Drafting practices vary by person, so partner review starts with structure instead of judgement.",
      ] },
      { title: "A better way to look at it", paragraphs: ["Separate legal judgement from workflow labour. A controlled system can collect supplied facts, identify missing documents, organise a chronology, compare a clause with an approved precedent or prepare a client-update draft. The practitioner verifies the output and makes every legal decision.", "The aim is not to trust AI more. It is to make verification visible: approved sources, source references, a review checklist, a named matter owner and an exception path when the information is incomplete." ] },
      { title: "Fix one matter workflow first", paragraphs: ["Pick one repeated stage of one practice area. Map the inputs, the firm's approved precedent or playbook, the output, prohibited actions and sign-off. Test with fictional, redacted or appropriately authorised matters. Measure the whole task, including review and correction time."], items: [
        "An intake pack that collects matter facts and flags missing conflict-check information for a person to decide.",
        "A chronology or matter summary built only from supplied documents, with references back to those documents.",
        "A first-draft structure based on an approved firm precedent, with unconfirmed facts marked as questions.",
        "A client-update draft from approved matter notes, checked and sent by the responsible practitioner.",
      ] },
      { title: "What must stay with the practitioner", paragraphs: ["Every authority, legal proposition, deadline, material fact and quotation must be checked against the authoritative source before it reaches advice, pleadings or court. GrowthCred does not offer autonomous legal research, legal advice, conflict decisions, automatic filing or trust-account actions.", "Confidentiality, privilege, supervision, access and retention requirements must be defined by the firm. The Legal Practice Council's ethics material discusses the consequences of false AI-generated authorities; a fast draft never removes the practitioner's duties."] },
      { title: "Workshop or implementation?", mark: "diy", paragraphs: ["Choose the one-day workshop when partners and staff need one safe-use method and want to build the first workflow themselves. Work on a fictional or redacted matter. The practical outputs are a mapped workflow, source-and-verification checklist, escalation rules and pilot scorecard.", "Apply for implementation when a practice group wants GrowthCred to map, build, test and hand over a repeatable intake, chronology, first-draft or client-update workflow. Your nominated practitioner defines acceptance and remains responsible for professional output."] },
      { title: "Who has the strongest fit", paragraphs: ["Boutique and small-to-mid-sized commercial, property, employment, family, conveyancing and litigation teams have the clearest starting fit when they handle repeated matter patterns and partner review is the bottleneck. The first workflow should be operational and bounded, not the firm's hardest point of law.", "National firms may have strong appetite, but their information-security, conflicts, procurement and integration requirements are substantial. We scope only work that fits GrowthCred's capacity and the firm's governance process."] },
    ],
    faq: [
      { q: "Can the system do legal research for us?", a: "GrowthCred does not offer unsupervised legal research or autonomous legal advice. Any research aid must point back to authoritative sources, and a legal practitioner must verify every authority and proposition before professional use." },
      { q: "What law-firm workflow should we start with?", a: "Start with a repeated operational stage such as intake, a chronology from supplied documents, a precedent-based first-draft structure or a client-update draft. Avoid beginning with the firm's hardest legal judgement." },
      { q: "How do we protect confidential information?", a: "Use fictional or redacted material in the workshop. For implementation, the firm must approve the tools, permissions, data access, retention and supervision rules before real matter information is used." },
      { q: "Should we choose the workshop or implementation?", a: "Choose the workshop to teach a shared method and build a first workflow with your team. Apply for implementation when you want the workflow mapped, built, tested and handed over with a practitioner-defined acceptance test." },
    ],
    ctas: [{ to: "/call", label: "Apply for implementation" }, { to: "/workshop", label: "Explore the workshop" }],
    sources: [
      { label: "Legal Practice Council: Guide for Professional Legal Ethics (2026)", href: "https://lpc.org.za/wp-content/uploads/2026/03/b-LPC-Guide-for-Professional-Legal-Ethics-ito-Regulation-610b.pdf" },
      { label: "Thomson Reuters: 2025 GenAI report for legal professionals", href: "https://legal.thomsonreuters.com/blog/genai-report-executive-summary-for-legal-professionals-tri/" },
      { label: "Clio: 2025 Legal Trends Report", href: "https://www.clio.com/resources/legal-trends/read-online/" },
    ],
    related: ["/guides/how-we-work-first-30-days", "/data-and-security", "/workshop", "/call"],
  },
  {
    path: "/ai-automation-johannesburg", kind: "service", published: SEO_PUBLISHED,
    title: "AI Automation in Johannesburg | GrowthCred, Rosebank",
    description: "Founder-led AI automation and training from Rosebank, Johannesburg. The first Operator Intensive sold out at WeWork Rosebank. Apply to work with us.",
    heading: "AI automation in Johannesburg, from Rosebank.",
    intro: "GrowthCred is founder-led from Rosebank, Johannesburg. Phila Ngwenya has given seven AI talks at WeWork Johannesburg, and the first Operator Intensive sold out all five seats at WeWork Rosebank.",
    sections: [
      { title: "Built here, with owners from here", paragraphs: ["Johannesburg runs on owner-led businesses: firms where the founder still writes the proposals, answers the questions and approves every quote. That is the bottleneck GrowthCred exists to remove.", "The first Operator Intensive ran in person at WeWork Rosebank. Five owners, whose businesses depended entirely on them, left with working systems. One of them, Sandile of MNE Waste, built his Operator's Brain that day and is now fully operational."] },
      { title: "In person or online", paragraphs: ["The one-day workshop and the free class run online, so you can join from anywhere in Gauteng. For Command Core engagements, ask on the call whether working sessions can happen in person; the audit, build and handover are scoped around your team."] },
      { title: "What working together looks like", paragraphs: ["Every engagement follows three steps: an audit that puts a rand value on the hours trapped in the founder, deploying systems that replicate the founder's judgement, and embedding them with monthly tracking."] },
      { title: "Where Johannesburg owners start", paragraphs: ["There are three ways in, depending on how ready you are. Each one is built on the same idea: AI works when it starts from your business knowledge, not a template."], items: [
        "The Command Core: an engagement for owner-led firms from R5M to over R200M in revenue, where we audit, deploy and embed across your departments.",
        "The one-day online workshop: you build your first systems yourself, guided, with your laptop and real work in hand.",
        "The free online class: a practical first hour on giving AI the context your business needs.",
      ] },
      { title: "The work that waits in a Johannesburg business", paragraphs: ["The pattern repeats across owner-led firms: proposals that queue behind the founder, follow-ups that wait until the evening, and admin only one person knows how to do. Those are the first tasks we look at, because they cost the most founder time."] },
    ],
    faq: [
      { q: "Where is GrowthCred based?", a: "Rosebank, Johannesburg. GrowthCred (Pty) Ltd is registered in South Africa, registration number 2026/229279/07." },
      { q: "Can we meet in person in Johannesburg?", a: "The first Operator Intensive ran in person at WeWork Rosebank. For an engagement, ask on the call whether in-person sessions fit your scope." },
      { q: "Do you only work with Johannesburg businesses?", a: "No. The workshop and free class are online, and engagements outside Johannesburg and South Africa are scoped on the call." },
    ],
    related: ["/stories/operators-intensive-wework-rosebank", "/ai-automation-south-africa", "/workshop", "/call"],
  },
  {
    path: "/ai-automation-uk", kind: "service", published: SEO_PUBLISHED,
    title: "AI Automation Services for UK Businesses | GrowthCred",
    description: "Founder-led AI automation for owner-led UK businesses, delivered online from Johannesburg, only one to two hours ahead of UK time. Apply to work with us.",
    heading: "AI automation for UK businesses, one or two hours away.",
    intro: "Johannesburg is only one or two hours ahead of the UK, so an engagement with GrowthCred runs inside your normal working day. We build AI systems from your own business knowledge for owner-led firms that have outgrown the founder doing everything.",
    sections: [
      { title: "Your working day, almost exactly", paragraphs: ["South Africa does not change its clocks. That puts Johannesburg two hours ahead of the UK in winter (GMT) and one hour ahead during British Summer Time. A 10:00 call in London is at 11:00 or 12:00 in Johannesburg. No early mornings, no late nights.", "In practice that means working sessions, reviews and handovers happen live, in the same working day, over video."] },
      { title: "Your data rules come first", paragraphs: ["UK businesses handling personal data work under UK GDPR and the Data Protection Act 2018. Bring those requirements to the first call. We agree which information a system may use, who can see it and where human review sits before anything is built.", "GrowthCred's own handling of personal information is governed by South Africa's POPIA; our privacy policy explains how information that crosses borders is protected."] },
      { title: "Pricing", paragraphs: ["Prices on this site are in South African rand. For UK engagements, scope and price are agreed on the call before any work starts."] },
      { title: "Why owner-led UK firms work with us", paragraphs: ["The bottleneck is the same in London as in Johannesburg: the founder is the only person who knows how the proposals are priced, what was promised and how the business talks. We write that down, build systems around it, and track the results monthly."] },
    ],
    faq: [
      { q: "What is the time difference between the UK and South Africa?", a: "Johannesburg is two hours ahead of the UK in winter and one hour ahead during British Summer Time, because South Africa does not change its clocks." },
      { q: "How do you handle UK GDPR?", a: "We agree which information a system may use, who can access it and where human review sits before anything is built. Bring your UK GDPR requirements to the first call." },
      { q: "Do you invoice in pounds?", a: "Prices on this site are in rand. Scope and price for UK engagements are agreed on the call before work starts." },
    ],
    related: ["/ai-admin-automation", "/ai-proposal-automation", "/stories", "/call", "/data-and-security"],
  },
  {
    path: "/ai-automation-united-states", kind: "service", published: SEO_PUBLISHED,
    title: "AI Automation Services for US Businesses | GrowthCred",
    description: "AI systems built from your own knowledge for owner-led US businesses, delivered online. Working hours overlap with the US East Coast every morning.",
    heading: "AI automation for owner-led US businesses.",
    intro: "GrowthCred builds AI systems from your own business knowledge for owner-led firms where the founder is the bottleneck. Johannesburg's afternoon is the US East Coast's morning, so live sessions fit the start of your day.",
    sections: [
      { title: "How the time zones work", paragraphs: ["Johannesburg is six hours ahead of New York during US daylight saving time and seven hours ahead in winter. That gives a reliable overlap in your morning: 09:00 in New York is 15:00 or 16:00 in Johannesburg.", "The overlap with the West Coast is short, because 09:00 in Los Angeles is already 18:00 or 19:00 in Johannesburg. For West Coast teams we plan fewer, well-prepared live sessions and do more of the build between them."] },
      { title: "Privacy and data", paragraphs: ["The US has no single federal privacy law; obligations depend on your state and sector, for example California's consumer privacy law. Tell us which rules apply to your business on the first call. We agree what information each system may use and where human review sits before anything is built."] },
      { title: "What you get", paragraphs: ["The same method we use everywhere: an audit that puts a value on the hours trapped in the founder, systems that replicate the founder's judgement for those tasks, and monthly tracking once they are embedded. Prices on this site are in South African rand; US engagements are scoped and priced on the call."] },
    ],
    faq: [
      { q: "What hours overlap with the US?", a: "Johannesburg is six to seven hours ahead of New York, so US East Coast mornings overlap with Johannesburg afternoons. West Coast overlap is short, so sessions are planned around it." },
      { q: "Is the work done remotely?", a: "Yes. Engagements outside South Africa run online, with live sessions scheduled inside the hours our time zones share." },
      { q: "How is pricing handled for US clients?", a: "Prices on this site are in South African rand. Scope and price for US engagements are agreed on the call before work starts." },
    ],
    related: ["/ai-follow-up-automation", "/ai-admin-automation", "/guides/how-we-work-first-30-days", "/call", "/data-and-security"],
  },
  {
    path: "/ai-automation-australia", kind: "service", published: SEO_PUBLISHED,
    title: "AI Automation for Australian Businesses | GrowthCred",
    description: "Founder-led AI automation for owner-led Australian businesses, delivered online. Your afternoon is our morning, so live sessions fit your working day.",
    heading: "AI automation for Australian businesses.",
    intro: "Your afternoon is Johannesburg's morning. GrowthCred builds AI systems from your own business knowledge for owner-led Australian firms, with live sessions scheduled at the end of your working day and the build happening overnight for you.",
    sections: [
      { title: "An afternoon-to-morning handover", paragraphs: ["Sydney is eight hours ahead of Johannesburg (nine during Australian daylight saving), and Perth is six hours ahead. So 08:00 in Johannesburg is mid-to-late afternoon on the east coast and early afternoon in Perth.", "That rhythm works in your favour: you review and give feedback in your afternoon, and the next version is ready when you start the following day."] },
      { title: "Privacy obligations", paragraphs: ["Many Australian businesses are covered by the Privacy Act 1988 and the Australian Privacy Principles. Bring your obligations to the first call; we agree which information a system may use, who can see it and where human review sits before anything is built."] },
      { title: "Scope and pricing", paragraphs: ["Prices on this site are in South African rand. For Australian engagements, scope and price are agreed on the call before any work starts. The method is the one we use everywhere: audit, deploy, embed, with monthly tracking."] },
    ],
    faq: [
      { q: "What is the time difference between Australia and South Africa?", a: "Sydney is eight hours ahead of Johannesburg, or nine during Australian daylight saving; Perth is six hours ahead. Johannesburg mornings overlap with Australian afternoons." },
      { q: "How do you work across that gap?", a: "Live sessions sit in your afternoon, and the build continues during Johannesburg's day, so updates are ready for your next morning." },
      { q: "Do you work within the Australian Privacy Principles?", a: "We agree which information each system may use and where human review sits before anything is built. Bring your Privacy Act obligations to the first call." },
    ],
    related: ["/ai-admin-automation", "/ai-proposal-automation", "/stories", "/call", "/data-and-security"],
  },
  {
    path: "/ai-automation-africa", kind: "service", published: SEO_PUBLISHED,
    title: "AI Automation for Businesses Across Africa | GrowthCred",
    description: "Founder-led AI automation for owner-led businesses across Africa, from Johannesburg. Most African business hubs sit within one or two hours of our time zone.",
    heading: "AI automation for businesses across Africa.",
    intro: "GrowthCred is an African company building AI systems for owner-led African businesses. From Lagos to Nairobi, most of the continent's business hubs sit within an hour or two of Johannesburg, so we work in your working day.",
    sections: [
      { title: "Same working day, continent-wide", paragraphs: ["Harare, Lusaka, Gaborone and Maputo share Johannesburg's time. Nairobi is one hour ahead, Lagos one hour behind and Accra two hours behind. Live working sessions fit comfortably inside normal office hours almost anywhere on the continent."] },
      { title: "Built for how African businesses actually run", paragraphs: ["Owner-led firms across Africa share a pattern: the founder holds the knowledge, the relationships and the approvals, and the business slows whenever they step away. Our systems are built from that knowledge rather than a foreign template, so they fit how you really operate.", "Our clients include MNE Waste in waste management and Demure International in beauty and cosmetics. Different industries, one method."] },
      { title: "Data protection across borders", paragraphs: ["Many African countries now have their own data protection laws, such as Nigeria's Data Protection Act 2023 and Kenya's Data Protection Act 2019. Tell us which apply to you. GrowthCred's own handling of personal information follows South Africa's POPIA, including its rules on information that crosses borders."] },
    ],
    faq: [
      { q: "Do you work with businesses outside South Africa?", a: "Yes. Engagements outside South Africa run online and are scoped on the call. Most African business hubs are within an hour or two of Johannesburg time." },
      { q: "Which data protection laws do you consider?", a: "The ones that apply to your business, such as Nigeria's Data Protection Act 2023 or Kenya's Data Protection Act 2019. We agree what information each system may use before anything is built." },
      { q: "What currency are prices in?", a: "Prices on this site are in South African rand. Scope and price for engagements outside South Africa are agreed on the call." },
    ],
    related: ["/ai-automation-south-africa", "/stories", "/ai-admin-automation", "/call", "/data-and-security"],
  },
  {
    path: "/guides/how-we-work-first-30-days", kind: "guide", published: SEO_PUBLISHED,
    title: "Working With GrowthCred: Your First 30 Days Explained",
    description: "What happens after you apply: the call, the audit, the first result in 14 days and monthly tracking. How a GrowthCred AI engagement runs from day one.",
    heading: "Working with GrowthCred: what happens in the first 30 days.",
    intro: "Before you hire anyone to change how your business runs, you should know exactly what happens next. This is how a GrowthCred engagement unfolds, from the application to the first monthly review.",
    sections: [
      { title: "Before day one: the application and the call", paragraphs: ["Engagements start with an application, not a checkout. It tells us how your business runs and where the founder is stuck, so the call is a working conversation rather than a pitch.", "On the call we work out fit, scope and cost together. Engagements are limited, and not every application is accepted."] },
      { title: "Step one: the audit", paragraphs: ["We find where the founder is the bottleneck and put a rand value on every hour trapped in low-leverage work. The output is a clear list of the tasks that wait for you, how often they happen, and what they cost the business.", "This is also where the rules get written down: how you price, what you promise, how you talk. That knowledge becomes the foundation every system is built from."] },
      { title: "Step two: deploy, with a first result in 14 days", paragraphs: ["We install operations that replicate the founder's judgement, starting with the highest-value task from the audit. The first result is due within 14 days, tested against real examples from your business with your team."], items: [
        "Inputs, approval points and review steps are agreed before building.",
        "Each system is tested against representative examples, not a demo.",
        "People stay responsible for prices, commitments and anything sent externally.",
      ] },
      { title: "Step three: embed and track", paragraphs: ["Once a system is live, performance is tracked monthly and the next capabilities are added as the business changes. The first month ends with a review of what moved, measured against where you started.", "Our guarantee: if the Command Core doesn't reclaim at least 20 hours of your week, the engagement is on us."] },
    ],
    faq: [
      { q: "How quickly will I see a result?", a: "The first result is due within 14 days of the deploy step starting, tested against real examples from your business." },
      { q: "How much of my time does it take?", a: "Most at the start: the audit needs your knowledge, because the systems are built from it. After that, your role shifts to reviewing and deciding rather than doing." },
      { q: "What if it doesn't work?", a: "If the Command Core doesn't reclaim at least 20 hours of your week, the engagement is on us." },
      { q: "How do I start?", a: "Apply. The application tells us how your business runs, and the call decides fit, scope and cost." },
    ],
    related: ["/call", "/stories", "/ai-admin-automation", "/guides/admin-assistant-vs-ai-automation"],
  },
  {
    path: "/guides/admin-assistant-vs-ai-automation", kind: "guide", published: SEO_PUBLISHED,
    title: "Hire an Admin Assistant or Automate With AI? A Guide",
    description: "Should you hire an admin assistant, outsource admin or automate it with AI? An honest comparison of cost, control and fit for owner-led businesses.",
    heading: "Hire an admin assistant or automate with AI?",
    intro: "When the founder is buried in admin, the usual answer is to hire or outsource. Sometimes that is right. Sometimes the better move is to automate the repetitive part and keep people for judgement. This guide helps you tell the difference before you spend money.",
    sections: [
      { title: "Start with the work, not the solution", paragraphs: ["List the admin that currently waits for you for two weeks: what it is, how often it happens and how long it takes. Put a value on those hours with the admin time calculator. The answer depends far more on the kind of work than on which option sounds modern."] },
      { title: "When a person is the better answer", paragraphs: ["Hire or outsource when the work is mostly judgement, relationships or physical tasks: handling upset customers, negotiating, chasing things in person, or making calls that depend on reading a situation.", "A person also makes sense when the process is still changing week to week. Automating a process nobody has settled yet just produces faster confusion."] },
      { title: "When AI automation is the better answer", paragraphs: ["Automate when the work repeats with clear inputs and a known standard: proposal and quote drafts, follow-ups, reports, recurring internal questions and research. The knowledge is written down once and used every time, so it does not walk out of the door when someone leaves.", "An assistant still needs your knowledge to do the job well. A system built from that knowledge can draft in seconds what used to wait for you, with a person reviewing it."] },
      { title: "Compare the full cost", paragraphs: ["For a hire, include salary, recruitment, onboarding and the management time it takes. For outsourcing, include the fee, the briefing and the rework. For automation, include setup, software subscriptions, usage charges and the time spent reviewing output.", "Our automation cost guide lists the drivers of an automation quote. Compare like with like, and treat estimated savings as estimates until you have measured them."] },
      { title: "The usual answer is both", paragraphs: ["Most owner-led businesses end up with a mix: systems that take the repetitive drafting, and people who review, decide and handle exceptions. That combination takes the founder out of the loop without removing human judgement from it."] },
    ],
    faq: [
      { q: "Is AI automation cheaper than hiring an admin assistant?", a: "Sometimes, for repetitive work with clear inputs. For judgement-heavy or relationship work, a person is usually better value. Value the hours first with the admin time calculator." },
      { q: "Can AI replace an admin assistant completely?", a: "Rarely. AI handles repetitive drafting well; people remain better at judgement, exceptions and relationships. Most businesses use both." },
      { q: "What about outsourcing admin overseas?", a: "Outsourcing moves the work to another person who still needs your knowledge. Automation writes that knowledge down once. Compare the full cost of each, including briefing and review time." },
    ],
    related: ["/tools/admin-time-calculator", "/guides/ai-automation-cost-south-africa", "/ai-admin-automation", "/call"],
  },
  {
    path: "/data-and-security", kind: "about", published: SEO_PUBLISHED,
    title: "Data Protection and Security at GrowthCred | POPIA",
    description: "How GrowthCred handles your information: POPIA, encryption, write-only website forms, cross-border transfers, and human review in every AI system we build.",
    heading: "How we protect your information.",
    intro: "GrowthCred holds no security certifications, and we will not pretend otherwise. What we can do is tell you exactly how information is handled, on this website and in the systems we build with you.",
    sections: [
      { title: "The law we work under", paragraphs: ["GrowthCred (Pty) Ltd is the responsible party for personal information under South Africa's Protection of Personal Information Act (POPIA). Our Information Officer is Phila Ngwenya, reachable at info@growthcred.co.za. Every request reaches a person."] },
      { title: "On this website", paragraphs: ["Everything you send travels over an encrypted HTTPS connection and is encrypted again at rest by our database provider. Our forms can write to the database but cannot read from it, so even someone inspecting the website's code could not read your submission or anyone else's. Card data never reaches us.", "Some of our providers operate outside South Africa. POPIA section 72 allows this where the recipient is bound by protection substantially similar to POPIA, where you consented, or where it is necessary to perform our agreement with you. Our privacy policy lists the providers and the grounds."] },
      { title: "In the AI systems we build", paragraphs: ["Keep confidential customer data out of your first enquiry. During scoping we agree which information each system may use, who can access it, how long it is kept, where human review sits, and who can approve anything sent outside your business.", "People stay responsible for prices, commitments, compliance documents and anything customer-facing."] },
      { title: "If something goes wrong", paragraphs: ["No system is perfectly secure. If personal information is ever accessed by someone unauthorised, POPIA requires us to notify the Information Regulator and you, and we will do both as soon as we reasonably can."] },
    ],
    related: ["/privacy", "/contact", "/guides/how-we-work-first-30-days", "/call"],
  },
  {
    path: "/tools/admin-time-calculator", kind: "tool",
    title: "Admin Time Cost Calculator for Business | GrowthCred",
    description: "Estimate the annual time value of repetitive business admin. Explore hours and hourly value with transparent assumptions, not guaranteed AI savings.",
    heading: "What is repetitive admin costing your time?",
    intro: "Use this calculator to explore the value of time spent on repetitive work. It uses your estimates, 48 working weeks a year and an eight-hour working day. It does not predict guaranteed savings or revenue.",
    sections: [
      { title: "A worked example", paragraphs: ["At 12 hours per week and R450 per hour, the annual time value is 12 × 48 × R450 = R259,200. That is 576 hours, or 72 eight-hour working days. These are illustrative inputs, not measured customer results.", "The calculator also shows a scenario for ten hours returned each week. At R450 per hour across 48 weeks, that is R216,000 in time value. You still need to test which tasks can be improved and include the time spent reviewing output."] },
      { title: "Turn an estimate into a useful baseline", paragraphs: ["Track several examples of one repetitive task. Record preparation, execution, corrections and review. Compare like-for-like examples after changing the workflow. Revisit the estimate when task volume changes.", "A reduction in hours becomes cash savings only when it reduces an actual cost; it becomes revenue only when the freed capacity leads to paid work. Use the estimate to choose a task to investigate, not as a promise of return."] },
    ], related: ["/workshop", "/guides/ai-automation-cost-south-africa", "/guides/ai-proposals-and-follow-ups"],
  },
];
export const searchPage = (path: string) => SEARCH_PAGES.find(page => page.path === path);
