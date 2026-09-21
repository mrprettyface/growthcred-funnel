export type SearchSection = { title: string; paragraphs: string[]; items?: string[] };
export type SearchPage = {
  path: string; title: string; description: string; heading: string; intro: string;
  kind: "service" | "guide" | "about" | "hub" | "tool";
  sections: SearchSection[]; related: string[];
};
export const REVIEWED = "2026-09-20";
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
      { title: "Who is it for?", paragraphs: ["The workshop is designed for nontechnical owners, particularly those running teams of roughly 3–50 people who still handle too much admin themselves. You should be comfortable using a browser and willing to work on your own business during the session.", "This is practical business training, not a programming qualification or an accredited machine-learning course. No accreditation is claimed."] },
      { title: "Format, tools and next dates", paragraphs: ["Our workshop offer is one full day. Delivery is online. Session dates, times and the joining link are confirmed on registration. For a team session, contact us to confirm the format and scope that fit your brief.", "Bring a laptop and a non-sensitive example of work you want to improve. Ask us to confirm the tool list and any subscription costs before buying a plan. We do not promise that all tools are free."] },
      { title: "What does training cost?", paragraphs: ["The workshop is currently advertised at a R990 founding rate. Confirm the next session, final booking terms, VAT treatment and any separate tool costs with us before paying. Custom implementation and team requests are scoped separately."] },
    ], related: ["/", "/guides/ai-training-cost-south-africa", "/guides/ai-training-vs-automation", "/contact"],
  },
  {
    path: "/ai-automation-south-africa", kind: "service",
    title: "AI Automation Services South Africa | GrowthCred",
    description: "Discuss practical AI automation for your South African business. Scope proposals, follow-ups and recurring admin with GrowthCred in Johannesburg.",
    heading: "AI automation built around your business.",
    intro: "GrowthCred helps South African business owners identify repetitive work and build AI-assisted workflows around it. Start with a scoped conversation about your process, your tools and the result you need.",
    sections: [
      { title: "Start with one workflow", paragraphs: ["Useful starting points include proposal drafts, quote preparation, follow-up drafts and recurring internal research. We assess the actual workflow before promising an integration. A task that relies on incomplete records or constant judgement may need a process change before automation.", "The goal is a measurable reduction in manual work. We agree what to measure and what still needs your team before implementation begins."] },
      { title: "How the engagement works", paragraphs: ["We map the current task, define the inputs and approval points, then agree a scope. A working version is tested against representative examples before wider use. Handover and support responsibilities belong in the agreed scope."], items: ["Discovery: document the current process, volume and pain points.", "Scope: agree deliverables, integrations, acceptance criteria and exclusions.", "Build and test: compare output against real examples with your team.", "Handover: document operation, ownership, access and maintenance responsibilities."] },
      { title: "What will it cost?", paragraphs: ["There is no single price for every business. Cost depends on the workflow, data readiness, connected systems, exception handling and support. We quote after reviewing the brief. The R990 workshop price is a training offer, not the price of a custom automation project.", "Ask for setup costs, recurring service costs and third-party subscriptions separately. Agree how changes will be handled so a small first project does not grow without a decision."] },
      { title: "Your systems and your information", paragraphs: ["Tell us which tools you already use. Compatibility depends on their APIs, account permissions and the workflow you need; a mention of a tool is not a promise of an existing connector.", "Keep confidential customer data out of an initial enquiry. During scoping, agree appropriate data access, retention, human review and who can approve external actions. We do not claim that installing an AI tool alone makes a workflow compliant with any law."] },
      { title: "Training or implementation?", paragraphs: ["Choose the workshop if you want to build and understand your own starting workflow. Discuss implementation if the workflow spans systems, needs testing and maintenance, or your team needs delivery support. Either way, begin with a concrete task rather than a promise to automate the entire business."] },
    ], related: ["/call", "/guides/ai-automation-cost-south-africa", "/guides/ai-proposals-and-follow-ups", "/about"],
  },
  {
    path: "/about", kind: "about",
    title: "About GrowthCred & Phila Ngwenya | Johannesburg",
    description: "Meet Phila Ngwenya, founder of GrowthCred. Practical AI workshops and business workflow support from Rosebank, Johannesburg.",
    heading: "Practical AI. A real person behind it.",
    intro: "GrowthCred is led by Phila Ngwenya in Rosebank, Johannesburg. We help South African business owners put their business knowledge into a usable form and apply AI to repetitive work.",
    sections: [
      { title: "Meet Phila Ngwenya", paragraphs: ["Phila is GrowthCred’s founder and CEO. His work focuses on helping owners move from repeatedly briefing tools to building repeatable systems around how their business operates. He shares practical demonstrations and business-system ideas through his YouTube channel and LinkedIn profile."] },
      { title: "What we believe useful training looks like", paragraphs: ["Bring actual work. Write down the context. Build a small workflow. Review the result. Keep what works and measure it. A system should help you make progress without taking away the judgement that belongs to you.", "We distinguish demonstrations from customer results. Worked examples in our guides are illustrative unless explicitly identified as measured, permissioned case studies."] },
      { title: "Our business details", paragraphs: ["GrowthCred (Pty) Ltd · Registration 2026/229279/07. Based in Rosebank, Johannesburg, South Africa. Email info@growthcred.co.za or use our contact page to discuss a workshop or implementation brief.", "Workshops are delivered online; session details are confirmed on registration. Our Johannesburg base is not a promise of walk-in office hours."] },
      { title: "Results and evidence", paragraphs: ["We are building our published case-study library. We only publish named customer results with permission and enough detail to explain how an outcome was measured. Until then, our practical guides describe methods and examples, not independent proof of a guaranteed result."] },
    ], related: ["/", "/ai-automation-south-africa", "/resources", "/contact"],
  },
  {
    path: "/resources", kind: "hub",
    title: "Practical AI Guides for Business Owners | GrowthCred",
    description: "Practical guides to AI training costs, business context, proposals, follow-ups and automation decisions for South African business owners.",
    heading: "Put AI to work, one useful task at a time.",
    intro: "Start with a clear question, a real task and a way to check the result. These guides help you decide what to learn, what to build and where human review belongs.",
    sections: [{title:"Choose your next step", paragraphs:["Compare training and implementation before buying. Use the business-brain guide to document your context, then try a proposal or follow-up draft with information you can safely share. The calculator helps estimate the value of time; it does not predict a guaranteed saving."]}],
    related: ["/guides/ai-training-cost-south-africa", "/guides/business-brain", "/guides/ai-proposals-and-follow-ups", "/guides/ai-training-vs-automation", "/guides/ai-automation-cost-south-africa", "/tools/admin-time-calculator"],
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
    ], related: ["/", "/ai-training-south-africa", "/guides/ai-training-vs-automation", "/contact"],
  },
  {
    path: "/guides/business-brain", kind: "guide",
    title: "Give AI Your Business Context: A Practical Guide",
    description: "Build a clear business context document for AI: services, customers, voice, approved facts and review rules. Includes a practical starting template.",
    heading: "Give AI context about your business.",
    intro: "A business brain is a maintained context document describing how your business works. It helps you brief an AI tool consistently. It is not a guarantee that every tool remembers everything or that its answers are correct.",
    sections: [
      { title: "Write the facts once", paragraphs: ["Start with your services, ideal customers, common tasks, tone of voice and approved terms. Separate confirmed facts from ideas and examples. Include a review date and a person responsible for keeping the document current.", "Use our free Business Brain builder to work through questions and copy or download your document. Review the output before using it; the tool assembles your answers, it does not verify your business facts."] },
      { title: "A starting template", paragraphs: ["Copy these headings into a document. Keep the first version short enough to inspect and update easily."], items: ["Business: what we do, who we serve and where we operate.", "Services: scope, exclusions and where approved pricing is stored.", "Voice: a short example of writing we would actually send.", "Workflow: inputs, steps, output and the person who approves it.", "Rules: ask when information is missing; do not invent prices or commitments.", "Maintenance: owner, review date and what has changed."] },
      { title: "Use a small, safe example", paragraphs: ["Imagine a fictional maintenance business drafting a follow-up after a meeting. Give the tool a sample meeting note and approved service description. Ask it to summarise the customer's need, draft a short email and list any facts it could not confirm.", "Compare this with a draft made without context. Check accuracy, tone and the time spent correcting it. The useful result is a repeatable improvement in your work, not simply a longer answer."] },
      { title: "Connect it carefully", paragraphs: ["Tools differ in how they accept documents, instructions and knowledge sources. Check the tool's current documentation and account controls. Uploading a document does not mean every future conversation or every connected tool will automatically have access to it.", "Do not put passwords or unnecessary personal information into a reusable brief. Use a fictional or redacted example for practice. Agree appropriate sharing and access with your business before adding real client material."] },
      { title: "Keep it useful", paragraphs: ["Review the brief whenever prices, services or terms change. Keep a short test task and rerun it after important changes. If the tool repeatedly gets something wrong, clarify the source and workflow instead of adding contradictory instructions.", "A context document is a starting point. A reliable workflow also needs good inputs, human checks and a clear place for the approved output."] },
    ], related: ["/brain", "/guides/ai-proposals-and-follow-ups", "/", "/ai-automation-south-africa"],
  },
  {
    path: "/guides/ai-proposals-and-follow-ups", kind: "guide",
    title: "Use AI for Proposals and Follow-Ups | GrowthCred",
    description: "A practical proposal and follow-up workflow: prepare context, draft, check facts and approve before sending. Includes an illustrative briefing example.",
    heading: "Use AI for proposals and follow-ups without losing control.",
    intro: "Start by using AI to draft from approved information. Keep prices, commitments and sending under human review. Measure the whole process, including corrections, before deciding whether automation helps.",
    sections: [
      { title: "Gather the inputs", paragraphs: ["You need the customer's request, the agreed scope, approved pricing and your usual terms. Missing information should remain a question, not turn into a confident assumption. Use redacted examples while testing.", "Separate client-specific notes from your reusable business brief. A previous customer's confidential details do not belong in a template used for everyone."] },
      { title: "Try this briefing structure", paragraphs: ["Ask: Draft a proposal using only the supplied scope, approved pricing and meeting notes. Use our house style. Include deliverables, exclusions, timeline and next step. Mark missing facts as questions. Do not invent dates, discounts or payment terms.", "For a follow-up, ask for a short message summarising the agreed next step. Request a list of uncertain facts separately so they cannot accidentally appear as commitments in the email."] },
      { title: "A fictional worked example", paragraphs: ["A fictional consultant has a meeting note saying the client wants a reporting template. The note contains no agreed deadline or price. A useful draft describes the proposed deliverable and asks to confirm timing and cost. An unsafe draft invents a Friday deadline and a discount.", "Both drafts may sound polished. The difference is whether the output respects what is actually known. This example illustrates a review rule; it is not a customer result."] },
      { title: "Review before sending", paragraphs: ["Check the recipient, scope, figures, dates, exclusions, attachments and tone. Recalculate totals outside the prose draft. Make one person responsible for approval and keep the final version where the team can find it."], items: ["Does every commercial claim have an approved source?", "Is anything from another customer included?", "Does the next step match the actual conversation?", "Are draft notes and unanswered questions resolved?"] },
      { title: "Measure the complete task", paragraphs: ["Record how long your usual process takes. Then measure preparation, AI drafting, correction and final review on comparable tasks. Use several examples, including messy ones. Count errors as well as minutes.", "Only automate the repeatable parts once the workflow is dependable. Automatic sending is a separate decision that needs controls for exceptions, duplicate messages and changes in customer context."] },
    ], related: ["/guides/business-brain", "/tools/admin-time-calculator", "/ai-automation-south-africa", "/"],
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
    path: "/tools/admin-time-calculator", kind: "tool",
    title: "Admin Time Cost Calculator for Business | GrowthCred",
    description: "Estimate the annual time value of repetitive business admin. Explore hours and hourly value with transparent assumptions, not guaranteed AI savings.",
    heading: "What is repetitive admin costing your time?",
    intro: "Use this calculator to explore the value of time spent on repetitive work. It uses your estimates, 48 working weeks a year and an eight-hour working day. It does not predict guaranteed savings or revenue.",
    sections: [
      { title: "A worked example", paragraphs: ["At 12 hours per week and R450 per hour, the annual time value is 12 × 48 × R450 = R259,200. That is 576 hours, or 72 eight-hour working days. These are illustrative inputs, not measured customer results.", "The calculator also shows a scenario for ten hours returned each week. At R450 per hour across 48 weeks, that is R216,000 in time value. You still need to test which tasks can be improved and include the time spent reviewing output."] },
      { title: "Turn an estimate into a useful baseline", paragraphs: ["Track several examples of one repetitive task. Record preparation, execution, corrections and review. Compare like-for-like examples after changing the workflow. Revisit the estimate when task volume changes.", "A reduction in hours becomes cash savings only when it reduces an actual cost; it becomes revenue only when the freed capacity leads to paid work. Use the estimate to choose a task to investigate, not as a promise of return."] },
    ], related: ["/", "/guides/ai-automation-cost-south-africa", "/guides/ai-proposals-and-follow-ups"],
  },
];
export const searchPage = (path: string) => SEARCH_PAGES.find(page => page.path === path);
