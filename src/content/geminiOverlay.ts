import type { SearchPage } from "./searchPages";

export type GeminiOverlay = Partial<SearchPage> & { dropFaq?: boolean };

export const GEMINI_OVERLAY: Record<string, GeminiOverlay> = {
  "/guides/admin-assistant-vs-ai-automation": {
    "heading": "Drowning in repetitive admin? Spot when to hire vs AI automation before overspending.",
    "article": {
      "pain": "Hiring too early or automating a messy task wastes money fast.",
      "wayOut": "This guide helps you separate human judgement work from repeatable admin. You spend.",
      "learnItems": [
        "You learn how to tell when a person beats AI automation and when repeatable work should be automated first",
        "You learn how to compare true hire, outsourcing and AI automation costs without falling for guesswork"
      ],
      "why": "GrowthCred is a Johannesburg AI implementation and training company. I teach AI at Melsoft Academy. I helped build an isiZulu and English speech AI system. It was presented at Parliament in Cape Town.",
      "minutes": 5,
      "mentions": [
        {
          "text": "If you want AI automation built for a South African firm. You can hire GrowthCred after we see the work. We quote after scoping. And a person still checks what goes out.",
          "phrase": "scoping",
          "href": "/call"
        },
        {
          "text": "If you are unsure whether to hire. You train staff or build a workflow first. You share a short note on the task. We can point you to the right starting step with no obligation to build right away."
        }
      ],
      "hero": {
        "name": "scale",
        "alt": "You map the actual admin hours first. You do not automate or hire for the wrong problem",
        "caption": "You map the actual admin hours first. You do not automate or hire for the wrong problem."
      }
    },
    "sections": [
      {
        "title": "You start with the admin list before picking a hire or AI automation",
        "paragraphs": [],
        "figureCaption": "You map the actual admin hours first. You do not automate or hire for the wrong problem.",
        "points": {
          "problem": [
            "Owners guess between hiring and AI automation while recurring admin piles up.",
            "Picking a tool before mapping your task speeds up confusion."
          ],
          "fix": [
            "You list every recurring admin task over two weeks with frequency.",
            "Time spent. Value those hours using your admin time calculator before choosing a route."
          ]
        },
        "line": "Your answer depends on the kind of admin work you do. Not what sounds modern.",
        "figure": {
          "name": "scale",
          "alt": "You map the actual admin hours first. You do not automate or hire for the wrong problem",
          "caption": "You map the actual admin hours first. You do not automate or hire for the wrong problem.",
          "motion": "pointer"
        }
      },
      {
        "title": "You keep people where judgement, trust and shifting steps rule",
        "paragraphs": [],
        "figureCaption": "Human judgement and shifting workflows belong with people, not premature automation.",
        "points": {
          "problem": [
            "AI automation fails when a task needs room-reading.",
            "Relationship repair or weekly process changes. Pushing customers or messy work into rigid automation creates rework."
          ],
          "fix": [
            "You hire or outsource when the work relies on judgement.",
            "Negotiating, in-person chasing or sensitive calls. You keep humans on processes that still change every week."
          ]
        },
        "line": "Automate a process nobody has settled yet. And you just get faster confusion.",
        "figure": {
          "name": "hire",
          "alt": "Human judgement and shifting workflows belong with people, not premature automation for you",
          "caption": "Human judgement and shifting workflows belong with people, not premature automation.",
          "motion": "bubble"
        }
      },
      {
        "title": "You use AI automation when inputs are clear and work repeats",
        "paragraphs": [],
        "figureCaption": "Clear inputs plus documented rules let AI automation draft fast. People keep control.",
        "points": {
          "problem": [
            "Repeating admin like proposal drafts, follow-ups, reports and routine questions eats hours.",
            "Knowledge walks out your door. Staff leave if it stays in someone's head."
          ],
          "fix": [
            "Automate tasks with clear inputs.",
            "A known standard once you write the rules down. You let a system draft quickly. A person still checks what goes out."
          ]
        },
        "line": "Write your standards down once. Recurring drafts do not walk out when someone resigns.",
        "figure": {
          "name": "list",
          "alt": "Clear inputs plus documented rules let AI automation draft fast. People keep control for you",
          "caption": "Clear inputs plus documented rules let AI automation draft fast. People keep control.",
          "motion": "pointer"
        }
      },
      {
        "title": "You count full hire, outsourcing and automation costs side by side",
        "paragraphs": [],
        "figureCaption": "A fair comparison counts setup, ongoing run costs. Human review time together.",
        "points": {
          "problem": [
            "Comparing a monthly salary or tool fee alone hides real costs.",
            "Onboarding, briefing, rework, subscriptions, usage and review time all add up."
          ],
          "fix": [
            "You weigh full hire or outsourcing costs against setup.",
            "Running and checking costs for AI automation. You check the automation cost guide and treat savings as estimates until measured."
          ]
        },
        "line": "You compare like with like, and treat estimated savings as estimates until measured.",
        "figure": {
          "name": "split",
          "alt": "A fair comparison counts setup, ongoing run costs. Human review time together for you",
          "caption": "A fair comparison counts setup, ongoing run costs. Human review time together.",
          "motion": "ring"
        }
      },
      {
        "title": "Combine AI automation and people so you stay out of the loop",
        "paragraphs": [],
        "figureCaption": "Pairing repeatable drafting with human sign-off frees your time while protecting quality.",
        "points": {
          "problem": [
            "Owners get trapped as your bottleneck.",
            "Every draft or routine question waits on them. Removing human review completely creates different risks."
          ],
          "fix": [
            "You use a mixed setup where AI automation handles routine drafting.",
            "Your team reviews exceptions. You keep human judgement in the loop. Keeping yourself stuck in every step."
          ]
        },
        "line": "Most owner-led firms win with both: AI drafts your routine, people decide.",
        "figure": {
          "name": "split",
          "alt": "Pairing repeatable drafting with human sign-off frees your time while protecting quality",
          "caption": "Pairing repeatable drafting with human sign-off frees your time while protecting quality.",
          "motion": "pointer"
        }
      }
    ],
    "close": {
      "line": "Most owner-led firms win with both: AI drafts your routine, people decide.",
      "ask": "Check your hours with the admin time calculator or request a scoping chat about your workflow.",
      "cta": {
        "to": "/call",
        "label": "Ask for a quote"
      }
    },
    "faq": [
      {
        "q": "Should I hire an admin assistant or use AI automation first?",
        "a": "Start by listing your admin tasks over two weeks. You hire or outsource for judgement, relationships. Shifting processes. Automate clear, repeatable work with human review."
      },
      {
        "q": "Does AI automation replace human checking?",
        "a": "No. A person still checks what goes out so mistakes. Wrong details or sensitive edge cases do not slip through."
      },
      {
        "q": "How do I know what AI automation costs?",
        "a": "Costs depend on your workflow, setup, running usage, review. Maintenance rather than a single flat price,. Scope your task first and compare full costs."
      }
    ],
    "dropFaq": false
  },
  "/guides/ai-automation-cost-south-africa": {
    "heading": "Surprised by AI automation cost? Scope setup, run fees and review before quoting.",
    "article": {
      "pain": "A drafting workflow and a connected operational system do not cost your same.",
      "wayOut": "This guide shows what drives AI automation cost in South Africa. You ask for a quote.",
      "learnItems": [
        "You learn how to separate setup costs from ongoing running costs and check current tool pricing",
        "You learn how to scope workflow complexity, return and acceptance criteria before building"
      ],
      "why": "GrowthCred is a Johannesburg AI implementation and training company. I teach AI at Melsoft Academy. I helped build an isiZulu and English speech AI system. It was presented at Parliament in Cape Town.",
      "minutes": 5,
      "mentions": [
        {
          "text": "If you want a practical starting point. Send a short description of your workflow to GrowthCred. We can discuss whether a build or training fits best. Leave confidential records out of that first message.",
          "phrase": "GrowthCred",
          "href": "/call"
        },
        {
          "text": "If you are still mapping your numbers before speaking to anyone. Test your assumptions in the calculator first. You bring clear questions to any scoping chat.",
          "phrase": "calculator",
          "href": "/tools/admin-time-calculator"
        }
      ],
      "hero": {
        "name": "split",
        "alt": "Splitting setup from ongoing usage. Checking live tool prices prevents billing surprises for you",
        "caption": "Splitting setup from ongoing usage. Checking live tool prices prevents billing surprises."
      }
    },
    "sections": [
      {
        "title": "Separate setup work from ongoing AI automation cost for you",
        "paragraphs": [],
        "figureCaption": "Splitting setup from ongoing usage. Checking live tool prices prevents billing surprises.",
        "points": {
          "problem": [
            "Bundling setup and monthly usage into one number hides what runs over time.",
            "Old screenshots or generic monthly figures miss current tool pricing. The R990 workshop is training. It is not the price of a custom build."
          ],
          "fix": [
            "You ask for setup (mapping, configuration, integrations.",
            "Testing) separately from running costs (subscriptions, usage, support). You check current pricing for every tool in scope."
          ]
        },
        "line": "Separate setup from running costs. A low first quote does not hide a heavy monthly bill. You still check the result here.",
        "figure": {
          "name": "split",
          "alt": "Splitting setup from ongoing usage. Checking live tool prices prevents billing surprises for you",
          "caption": "Splitting setup from ongoing usage. Checking live tool prices prevents billing surprises.",
          "motion": "pointer"
        }
      },
      {
        "title": "Scope your six drivers behind AI automation cost",
        "paragraphs": [],
        "figureCaption": "True scope depends on data, integrations, volume, failure handling. Upkeep, not tool count alone.",
        "points": {
          "problem": [
            "Counting tools alone misses what makes a workflow expensive.",
            "Exceptions, human review and maintenance often match build effort."
          ],
          "fix": [
            "You map process steps, data readiness, integrations, volume.",
            "Quality checks and ongoing support before asking for quotes. You compare each workflow on its own merits."
          ]
        },
        "line": "Exceptions, review and maintenance often cost just as much as your build. You still check the result here.",
        "figure": {
          "name": "list",
          "alt": "True scope depends on data, integrations, volume, failure handling. Upkeep, not tool count alone for you",
          "caption": "True scope depends on data, integrations, volume, failure handling. Upkeep, not tool count alone.",
          "motion": "pointer"
        }
      },
      {
        "title": "You bring a clear brief and real examples before asking for a price",
        "paragraphs": [],
        "figureCaption": "A focused brief with a redacted example gives builders a real basis to scope accurately.",
        "points": {
          "problem": [
            "Vague requests produce vague quotes or mismatched expectations.",
            "A weekly internal report costs differently from all-day customer messaging across channels."
          ],
          "fix": [
            "You share the task, frequency, current systems, expected output.",
            "Human checkpoints and common exceptions. You include one redacted input and one good final output."
          ]
        },
        "line": "Do not use one project's price to guess another workflow's cost. You still check the result here.",
        "figure": {
          "name": "lock",
          "alt": "A focused brief with a redacted example gives builders a real basis to scope accurately for you",
          "caption": "A focused brief with a redacted example gives builders a real basis to scope accurately.",
          "motion": "pointer"
        }
      },
      {
        "title": "You measure net time saved against AI automation cost",
        "paragraphs": [],
        "figureCaption": "Real return depends on what your team does with net hours saved after checking output.",
        "points": {
          "problem": [
            "Counting raw hours without review time inflates expected savings.",
            "Saved hours also do not automatically turn into revenue."
          ],
          "fix": [
            "You subtract review and fix time.",
            "Then weigh net hours against setup and running costs. Test your own assumptions with the calculator. Separate estimates from measured results."
          ]
        },
        "line": "You keep expected savings apart from measured results. Because time is not automatically revenue. You still check the result here.",
        "figure": {
          "name": "scale",
          "alt": "Real return depends on what your team does with net hours saved after checking output",
          "caption": "Real return depends on what your team does with net hours saved after checking output.",
          "motion": "bubble"
        }
      },
      {
        "title": "You lock in acceptance criteria before any build starts",
        "paragraphs": [],
        "figureCaption": "Clear acceptance criteria protect both sides before development or configuration begins.",
        "points": {
          "problem": [
            "Unclear done-states lead to disputes, missed edge cases and endless tweaks.",
            "Without agreed failure rules, nobody knows what good delivery looks like."
          ],
          "fix": [
            "You agree example tasks, good output standards, failure handling, sign-off ownership.",
            "Exclusions and change rules upfront. You use those terms to compare quotes and judge delivery."
          ]
        },
        "line": "You agree what good looks like. What happens on failure before anything is built. You still check the result here.",
        "figure": {
          "name": "list",
          "alt": "Clear acceptance criteria protect both sides before development or configuration begins for you",
          "caption": "Clear acceptance criteria protect both sides before development or configuration begins.",
          "motion": "pointer"
        }
      }
    ],
    "close": {
      "line": "You agree what good looks like. What happens on failure before anything is built. You still check the result here.",
      "ask": "Send a short workflow description to talk through whether a build or training makes sense.",
      "cta": {
        "to": "/call",
        "label": "Ask for a quote"
      }
    },
    "faq": [
      {
        "q": "How much does AI automation cost in South Africa?",
        "a": "There is no single standard price because costs depend on workflow complexity. Integrations, usage volume, review and support. Scope your task first to get an accurate quote."
      },
      {
        "q": "Why do running costs matter as much as setup?",
        "a": "Setup builds and tests your workflow, while subscriptions. Usage charges and maintenance keep it running over time. Checking both prevents surprise monthly bills."
      },
      {
        "q": "How do I calculate if AI automation is worth it?",
        "a": "Estimate hours saved after human review and corrections. You compare them with setup and running costs. And track actual results once live."
      }
    ],
    "dropFaq": false
  },
  "/guides/ai-business-proposals-faster": {
    "heading": "Slow proposals hurting sales? Fix your scattered brief, not just writing speed.",
    "article": {
      "pain": "Typing faster does not fix proposals when pricing.",
      "wayOut": "Scope and notes sit in different places. You build a repeatable source-bound proposal system that flags gaps early.",
      "learnItems": [
        "You learn how to assemble approved proposal inputs once and brief AI strictly from verified sources",
        "You learn how to check commercial details and measure true turnaround without fooling yourself"
      ],
      "why": "GrowthCred is a Johannesburg AI implementation and training company. I teach AI at Melsoft Academy. I helped build an isiZulu and English speech AI system. It was presented at Parliament in Cape Town.",
      "minutes": 6,
      "mentions": [
        {
          "text": "If you want to build the system yourself first. The one-day workshop helps you map your inputs. You test a source-bound draft using a redacted example and approved commercial rules.",
          "phrase": "workshop",
          "href": "/workshop"
        },
        {
          "text": "If your proposals cross several people, tools or pricing controls. You can apply for implementation. We scope it. Test it and hand it over while keeping every proposal yours.",
          "phrase": "implementation",
          "href": "/call"
        }
      ],
      "hero": {
        "name": "quote",
        "alt": "Faster typing cannot fix a draft that still waits on scattered facts. Missing rules for you",
        "caption": "Faster typing cannot fix a draft that still waits on scattered facts. Missing rules."
      }
    },
    "sections": [
      {
        "title": "You stop chasing faster writing when the real bottleneck is scattered inputs",
        "paragraphs": [],
        "figureCaption": "Faster typing cannot fix a draft that still waits on scattered facts. Missing rules.",
        "points": {
          "problem": [
            "Starting with a clever prompt fails when scope is in call notes.",
            "Prices are in a sheet and tone is in someone's head. Slow assembly stalls every draft before writing even begins."
          ],
          "fix": [
            "You build a proposal system that feeds people or AI the same approved inputs every time.",
            "Surface missing details before a draft ever reaches a prospect."
          ]
        },
        "line": "Your proposal problem is not writing. It is rebuilding the brief every time.",
        "figure": {
          "name": "quote",
          "alt": "Faster typing cannot fix a draft that still waits on scattered facts. Missing rules for you",
          "caption": "Faster typing cannot fix a draft that still waits on scattered facts. Missing rules.",
          "motion": "pointer"
        }
      },
      {
        "title": "You build the four reusable proposal assets once",
        "paragraphs": [],
        "figureCaption": "Four clear proposal building blocks keep company standards consistent. Client data separated.",
        "points": {
          "problem": [
            "Mixing reusable company rules with client-specific notes creates confusion and leaks.",
            "One client's details can slip into another prospect's proposal."
          ],
          "fix": [
            "Separate reusable assets from deal-specific notes across four parts: business brief.",
            "Discovery record, commercial rules and proposal structure. You keep one approved structure and review checklist."
          ]
        },
        "line": "You keep reusable rules apart from client notes. One customer's details never leak.",
        "figure": {
          "name": "paste",
          "alt": "Four clear proposal building blocks keep company standards consistent. Client data separated for you",
          "caption": "Four clear proposal building blocks keep company standards consistent. Client data separated.",
          "motion": "pointer"
        }
      },
      {
        "title": "Force source-bound drafting that flags every missing fact for you",
        "paragraphs": [],
        "figureCaption": "Source-bound instructions keep commercial figures traceable and surface gaps before review.",
        "points": {
          "problem": [
            "Asking AI to fill in blanks invites invented prices.",
            "Dates, proof or commitments. Polished guesses are harder to catch than clear questions."
          ],
          "fix": [
            "Instruct your tool to use only supplied sources.",
            "Separate assumptions from confirmed scope and list missing facts as questions. Require source tags next to commercial figures."
          ]
        },
        "line": "Make missing facts show up as questions instead of confident guesses.",
        "figure": {
          "name": "split",
          "alt": "Source-bound instructions keep commercial figures traceable and surface gaps before review for you",
          "caption": "Source-bound instructions keep commercial figures traceable and surface gaps before review.",
          "motion": "ring"
        }
      },
      {
        "title": "You check commercial truth, scope and exclusions before sending",
        "paragraphs": [],
        "figureCaption": "Checking commercial numbers, exclusions and approval ownership protects your deal before sending.",
        "points": {
          "problem": [
            "Pretty wording hides costly mistakes in recipients.",
            "Scope, maths, dates, exclusions or payment terms. Sending internal notes or another client's info damages trust fast."
          ],
          "fix": [
            "Calculate totals outside your draft, verify permissions on proof.",
            "Strip internal notes or open questions. Assign one owner for final approval and run your pre-send checklist."
          ]
        },
        "line": "Pretty wording is not your risk. A polished mistake that changes the deal is.",
        "figure": {
          "name": "list",
          "alt": "Checking commercial numbers, exclusions and approval ownership protects your deal before sending",
          "caption": "Checking commercial numbers, exclusions and approval ownership protects your deal before sending.",
          "motion": "pointer"
        }
      },
      {
        "title": "You measure full turnaround time instead of draft speed alone",
        "paragraphs": [],
        "figureCaption": "Measuring your full cycle, including messy notes. Rework, shows what actually improved.",
        "points": {
          "problem": [
            "A fast draft that needs heavy fixing does not save real time.",
            "Faster proposals also do not guarantee a prospect will buy."
          ],
          "fix": [
            "Track baseline time from finding inputs to sending, then measure elapsed, hands-on.",
            "Fixing time and open questions across similar drafts including messy ones. Separate measured gains from expectations."
          ]
        },
        "line": "A draft that shows up fast but needs a forensic review has not fixed anything.",
        "figure": {
          "name": "check",
          "alt": "Measuring your full cycle, including messy notes. Rework, shows what actually improved for you",
          "caption": "Measuring your full cycle, including messy notes. Rework, shows what actually improved.",
          "motion": "pointer"
        }
      },
      {
        "title": "You choose between building it yourself or having it implemented",
        "paragraphs": [],
        "figureCaption": "You pick self-build training for a focused start or implementation. Multi-step controls are required.",
        "points": {
          "problem": [
            "Solo founders and multi-person teams with controlled pricing or multi-step approvals need different setups.",
            "Trying to force one approach onto every team slows adoption."
          ],
          "fix": [
            "Take the one-day workshop to build your brief, map inputs.",
            "You practise a source-bound draft on safe or redacted examples. Apply for implementation when workflows span people, tools, controlled pricing or approvals."
          ]
        },
        "line": "Every proposal you send stays yours. Whether you build the workflow or have it implemented.",
        "figure": {
          "name": "split",
          "alt": "You pick self-build training for a focused start or implementation. Multi-step controls are required for you",
          "caption": "You pick self-build training for a focused start or implementation. Multi-step controls are required.",
          "motion": "pointer"
        }
      }
    ],
    "close": {
      "line": "Every proposal you send stays yours. Whether you build the workflow or have it implemented.",
      "ask": "Join your one-day workshop or apply for proposal workflow implementation.",
      "cta": {
        "to": "/call",
        "label": "Apply"
      }
    },
    "faq": [
      {
        "q": "Why is writing speed the wrong thing to fix first in proposals?",
        "a": "Because drafting slows down when scope, pricing. Tone are scattered across notes, sheets and memory. Fixing inputs and missing-fact checks prevents rework."
      },
      {
        "q": "How do I stop AI from inventing prices or dates in a proposal?",
        "a": "Restrict it strictly to your business brief, discovery record. Commercial rules, require source links on figures. And force missing facts into a questions list."
      },
      {
        "q": "What should I check before sending a proposal?",
        "a": "You confirm commercial figures against approved sources. You match scope and next steps to the call. You remove internal notes or other client details. And get sign-off from one owner."
      }
    ],
    "dropFaq": false
  },
  "/guides/ai-challenges-south-africa": {
    "heading": "South Africa AI projects stalling? Fix imported workflows, not just tool stacks.",
    "article": {
      "pain": "Buying a global AI tool does not give your business a South African operating system.",
      "wayOut": "Adapt local data, channels, resilience. Human review to the work you actually run.",
      "learnItems": [
        "You learn why local context, POPIA rules, channels, resilience and human oversight decide South African AI outcomes",
        "You learn how to run a six-point readiness check and pick self-build or implementation safely"
      ],
      "why": "GrowthCred is a Johannesburg AI implementation and training company. I teach AI at Melsoft Academy. I helped build an isiZulu and English speech AI system. It was presented at Parliament in Cape Town.",
      "minutes": 7,
      "mentions": [
        {
          "text": "If you want to map one local workflow. You practise on safe examples first. The workshop gives your team a practical method. Claiming legal or POPIA certification.",
          "phrase": "workshop",
          "href": "/workshop"
        },
        {
          "text": "If your workflow spans systems, customer channels or strict permissions and controls. You can apply for implementation and bring your legal. Regulatory and internal requirements to scoping.",
          "phrase": "implementation",
          "href": "/call"
        }
      ],
      "hero": {
        "name": "table",
        "alt": "Local fit and clear exception ownership matter more than importing another company's setup for you",
        "caption": "Local fit and clear exception ownership matter more than importing another company's setup."
      }
    },
    "sections": [
      {
        "title": "Adapt local workflows instead of copying foreign templates for you",
        "paragraphs": [],
        "figureCaption": "Local fit and clear exception ownership matter more than importing another company's setup.",
        "points": {
          "problem": [
            "AI efforts often fail before your model runs because inputs are wrong.",
            "Channels do not match customers or nobody owns exceptions. Foreign templates miss how local operations actually run."
          ],
          "fix": [
            "Focus on one workflow that fits your customers, data, team and controls.",
            "You build around real daily operations rather than chasing a flashy demo or bigger tool stack."
          ]
        },
        "line": "A small system that survives a normal Tuesday beats an impressive demo that needs perfect inputs. You still check the result here.",
        "figure": {
          "name": "table",
          "alt": "Local fit and clear exception ownership matter more than importing another company's setup for you",
          "caption": "Local fit and clear exception ownership matter more than importing another company's setup.",
          "motion": "pointer"
        }
      },
      {
        "title": "You treat POPIA and data safeguards as workflow rules, not a paid badge",
        "paragraphs": [],
        "figureCaption": "You map personal data flows and safeguards. Connecting live information to any AI tool.",
        "points": {
          "problem": [
            "A paid AI subscription does not make personal information compliant.",
            "Sending personal data without lawful purpose, minimisation. Safeguards or clarity on operators and cross-border transfer creates risk."
          ],
          "fix": [
            "You map what fields are needed.",
            "Whose data it is. Why it is used, where it goes, who sees it. How long it stays and how updates or deletions work. You test with made-up or redacted examples before real workflows go live."
          ]
        },
        "line": "A subscription badge does not answer POPIA duties around purpose. Minimisation, safeguards or operators. You still check the result here.",
        "figure": {
          "name": "lock",
          "alt": "You map personal data flows and safeguards. Connecting live information to any AI tool for you",
          "caption": "You map personal data flows and safeguards. Connecting live information to any AI tool.",
          "motion": "bubble"
        }
      },
      {
        "title": "You match customer channels and design for real-world resilience",
        "paragraphs": [],
        "figureCaption": "Practical channel choices and failure recovery keep workflows steady during signal drops or service downtime.",
        "points": {
          "problem": [
            "Household internet access does not mean every customer wants another portal or has fibre,.",
            "Ending national loadshedding does not remove local outages. Patchy signal or tool downtime. Pushing unwanted messages or assuming cloud tools run offline breaks reliability. Statistics South Africa reported that 85.6% of households had some form of internet access in 2025. By 4 September 2026, Eskom reported 476 consecutive days without loadshedding."
          ],
          "fix": [
            "You use channels customers actually use with proper permissions.",
            "Clear opt-outs and human fallback,. You design workflows to pause, queue, alert an owner. Avoid duplicates and reconcile after outages. Do not assume offline cloud execution unless current provider docs confirm it."
          ]
        },
        "line": "Resilience is still an operating requirement, just not a slogan. You still check the result here.",
        "figure": {
          "name": "check",
          "alt": "Practical channel choices and failure recovery keep workflows steady during signal drops or service downtime for you",
          "caption": "Practical channel choices and failure recovery keep workflows steady during signal drops or service downtime.",
          "motion": "ring"
        }
      },
      {
        "title": "You pair clear process ownership and human review with expert work",
        "paragraphs": [],
        "figureCaption": "Clear process ownership and human sign-off keep accountability intact across routine and specialist work.",
        "points": {
          "problem": [
            "Hiring a specialist before mapping your work or handing decisions over to AI creates risk.",
            "Even in regulated areas like finance and law. AI cannot replace authorised professional judgement."
          ],
          "fix": [
            "You define the task, good output and review owner first.",
            "Using workshops for bounded tasks. Specialist builds for multi-system or high-risk workflows. You keep AI preparing inputs and summaries while qualified people check figures. Sources, legal points, advice, deadlines and decisions."
          ]
        },
        "line": "AI can prepare your work. But people still own your review and the decision. You still check the result here.",
        "figure": {
          "name": "check",
          "alt": "Clear process ownership and human sign-off keep accountability intact across routine and specialist work for you",
          "caption": "Clear process ownership and human sign-off keep accountability intact across routine and specialist work.",
          "motion": "pointer"
        }
      },
      {
        "title": "Run a six-point South African readiness check and pick your path",
        "paragraphs": [],
        "figureCaption": "Six readiness checks and honest baseline tracking separate working local workflows from demo hype.",
        "points": {
          "problem": [
            "Subscribing early or connecting customer channels.",
            "Baseline metrics hides flaws behind polished demos. Trying to solve every workflow at once stalls execution."
          ],
          "fix": [
            "You check work, information, channel, control, resilience and ownership,.",
            "You measure current time, effort, fixes, failures and delays against pilot metrics. You choose a workshop to map one local workflow safely. Or apply for implementation for multi-tool, customer-facing or controlled workflows."
          ]
        },
        "line": "You measure the real task before and during a pilot. A polished demo cannot hide a worse process. You still check the result here.",
        "figure": {
          "name": "list",
          "alt": "Six readiness checks and honest baseline tracking separate working local workflows from demo hype for you",
          "caption": "Six readiness checks and honest baseline tracking separate working local workflows from demo hype.",
          "motion": "pointer"
        }
      }
    ],
    "close": {
      "line": "You measure the real task before and during a pilot. A polished demo cannot hide a worse process. You still check the result here.",
      "ask": "Take your workshop to map a local workflow or apply for implementation.",
      "cta": {
        "to": "/call",
        "label": "Apply"
      }
    },
    "faq": [
      {
        "q": "Why do AI projects in South Africa often stall?",
        "a": "Usually because workflows are copied from elsewhere without fitting local data rules. Customer channels, outage handling, exception ownership and human review."
      },
      {
        "q": "Does paying for an AI tool make it POPIA compliant?",
        "a": "No. You still need a lawful purpose, data minimisation, safeguards, clear operator. Retention terms, and safe handling of cross-border data flows."
      },
      {
        "q": "When should I choose a workshop versus an implementation build?",
        "a": "Choose a workshop for a bounded task your team wants to map. You test on safe examples. Apply for implementation. Your workflow crosses systems, customer channels or strict controls."
      }
    ],
    "dropFaq": false
  },
  "/guides/ai-proposals-and-follow-ups": {
    "heading": "Risky proposal or follow-up guesses? You keep facts, pricing and send control human.",
    "article": {
      "pain": "AI can speed up proposal and follow-up drafts when fed approved facts.",
      "wayOut": "You keep prices, promises and the send button with a person. And measure your whole job including fixes.",
      "learnItems": [
        "You learn how to gather approved inputs, structure source-bound prompts and catch invented details before sending",
        "You learn how to check commercial accuracy and measure full task time before automating sends"
      ],
      "why": "GrowthCred is a Johannesburg AI implementation and training company. I teach AI at Melsoft Academy. I helped build an isiZulu and English speech AI system. It was presented at Parliament in Cape Town.",
      "minutes": 5,
      "mentions": [
        {
          "text": "If you want to test this safely on your own work. You start with a redacted example. A short follow-up or proposal draft rather than turning on automated sending."
        },
        {
          "text": "If you want help turning your notes, pricing rules. Review steps into a repeatable workflow. Share your current process and we can talk through practical next steps."
        }
      ],
      "hero": {
        "name": "lock",
        "alt": "Clean, separated inputs and redacted tests stop guesses. Cross-client leaks before drafting starts for you",
        "caption": "Clean, separated inputs and redacted tests stop guesses. Cross-client leaks before drafting starts."
      }
    },
    "sections": [
      {
        "title": "Gather approved inputs and separate client notes from reusable rules for you",
        "paragraphs": [],
        "figureCaption": "Clean, separated inputs and redacted tests stop guesses. Cross-client leaks before drafting starts.",
        "points": {
          "problem": [
            "Missing scope, pricing or terms push drafts toward guessing,.",
            "Putting one client's confidential notes into a shared template risks leaks. Testing on live data too early creates avoidable exposure."
          ],
          "fix": [
            "Collect customer request, agreed scope, approved pricing and standard terms upfront.",
            "Leaving unknowns as questions and testing with redacted examples. Keep client-specific notes separate from your reusable business brief."
          ]
        },
        "line": "If something is missing in your inputs. You keep it as a question instead of a confident guess. You still check the result here.",
        "figure": {
          "name": "lock",
          "alt": "Clean, separated inputs and redacted tests stop guesses. Cross-client leaks before drafting starts for you",
          "caption": "Clean, separated inputs and redacted tests stop guesses. Cross-client leaks before drafting starts.",
          "motion": "ring"
        }
      },
      {
        "title": "Structure proposal and follow-up prompts around approved facts only for you",
        "paragraphs": [],
        "figureCaption": "Explicit prompt boundaries keep proposal figures. Follow-up commitments tied to real discussions.",
        "points": {
          "problem": [
            "Open-ended prompts let AI invent dates, discounts, payment terms or next-step promises.",
            "A confident-sounding guess in a follow-up email can misstate what was agreed."
          ],
          "fix": [
            "Direct your draft to use only the supplied scope, approved pricing.",
            "Meeting notes in your house style, marking gaps as questions. For follow-ups, request a brief summary of agreed next steps plus a separate list of uncertain items."
          ]
        },
        "line": "Tell your draft what not to invent. A guess cannot slip into an email as a promise. You still check the result here.",
        "figure": {
          "name": "list",
          "alt": "Explicit prompt boundaries keep proposal figures. Follow-up commitments tied to real discussions for you",
          "caption": "Explicit prompt boundaries keep proposal figures. Follow-up commitments tied to real discussions.",
          "motion": "pointer"
        }
      },
      {
        "title": "Catch invented details with a concrete before-and-after check for you",
        "paragraphs": [],
        "figureCaption": "Checking drafts against original notes catches invented terms that polished prose can disguise.",
        "points": {
          "problem": [
            "A note missing a deadline.",
            "Price can produce a draft that invents a Friday deadline. A discount while sounding polished. Polished wording makes false details easier to miss."
          ],
          "fix": [
            "You compare drafts against the raw note to verify timing.",
            "Cost are asked as questions rather than invented. You treat any unverified number or date as a review failure before sending."
          ]
        },
        "line": "A draft that invents a deadline or discount sounds polished. But only a truthful draft is safe to send. You still check the result here.",
        "figure": {
          "name": "split",
          "alt": "Checking drafts against original notes catches invented terms that polished prose can disguise for you",
          "caption": "Checking drafts against original notes catches invented terms that polished prose can disguise.",
          "motion": "pointer"
        }
      },
      {
        "title": "You run a pre-send review and measure the full job before automating sends",
        "paragraphs": [],
        "figureCaption": "Pre-send checks and full-cycle timing show real value long. Any sending step is automated.",
        "points": {
          "problem": [
            "Sending drafts with wrong recipients.",
            "Scope, figures, dates, exclusions, attachments or tone creates errors. And judging speed by draft time alone hides fixing minutes. Automating sends without controls for exceptions. Duplicates or changed client situations is risky."
          ],
          "fix": [
            "Work out totals outside your draft, assign one approval owner.",
            "Store your final version clearly and run the pre-send checklist. Time prep, drafting, fixing and review on varied examples including messy ones. Considering automated sends."
          ]
        },
        "line": "You keep prices, promises and the send button with a person. Your workflow and controls are proven. You still check the result here.",
        "figure": {
          "name": "list",
          "alt": "Pre-send checks and full-cycle timing show real value long. Any sending step is automated for you",
          "caption": "Pre-send checks and full-cycle timing show real value long. Any sending step is automated.",
          "motion": "pointer"
        }
      }
    ],
    "close": {
      "line": "You keep prices, promises and the send button with a person. Your workflow and controls are proven. You still check the result here.",
      "ask": "Start with a redacted test draft or reach out to map your proposal. Follow-up workflow.",
      "cta": {
        "to": "/call",
        "label": "Ask for a quote"
      }
    },
    "faq": [
      {
        "q": "How can I use AI for proposals and follow-ups without losing control?",
        "a": "Feed it only approved scope, pricing. Meeting notes, force missing items into questions, check totals and facts manually. And keep final approval and sending with a person."
      },
      {
        "q": "What should be on a pre-send checklist for proposals and follow-ups?",
        "a": "You check recipient, scope, figures, dates, exclusions, attachments, tone, agreed next steps. Resolved questions and removal of any other client's details."
      },
      {
        "q": "When should I automate sending follow-ups or proposals?",
        "a": "Only after measuring full turnaround time. Error rates across real and messy examples. And putting safeguards in place for exceptions, duplicates and changed client details."
      }
    ],
    "dropFaq": false
  },
  "/guides/ai-training-vs-automation": {
    "heading": "Stuck choosing AI training or automation? You pick the right route before spending.",
    "article": {
      "pain": "Buying your wrong option wastes time, cash, or both.",
      "wayOut": "Here is how to match AI training or automation to your actual task. Business decisions stay yours.",
      "learnItems": [
        "You learn when a workshop fits a single task and when implementation fits a multi-step process.",
        "How five practical questions expose ownership, costs, and post-handover duties before you commit."
      ],
      "why": "GrowthCred is a Johannesburg AI implementation and training company. I teach AI at Melsoft Academy. I helped build an isiZulu and English speech AI system. It was presented at Parliament in Cape Town.",
      "minutes": 4,
      "mentions": [
        {
          "text": "If you want a workshop to practise one task or a scope check for a connected workflow. GrowthCred keeps your two offers separate. Confirms availability, scope, and every cost upfront. You can decide without pressure.",
          "phrase": "workshop",
          "href": "/workshop"
        }
      ],
      "hero": {
        "name": "table",
        "alt": "A workshop works best when one person learns. Repeats one clear task for you",
        "caption": "A workshop works best when one person learns. Repeats one clear task."
      }
    },
    "sections": [
      {
        "title": "Workshops fail when you want a managed system, not practice time",
        "paragraphs": [],
        "figureCaption": "A workshop works best when one person learns. Repeats one clear task.",
        "points": {
          "problem": [
            "Workshops need your time to practise.",
            "Brief, and check output on a real task. If you expect a managed service or have no time to run it. Training stalls."
          ],
          "fix": [
            "You pick a workshop only for one bounded task.",
            "Like drafting a proposal from approved facts. Keep your business info current. You run the workflow yourself after the session."
          ]
        },
        "line": "Training teaches you to run a bounded task. It does not run the business.",
        "figure": {
          "name": "table",
          "alt": "A workshop works best when one person learns. Repeats one clear task for you",
          "caption": "A workshop works best when one person learns. Repeats one clear task.",
          "motion": "pointer"
        }
      },
      {
        "title": "Implementation fails when you buy a demo instead of a working flow",
        "paragraphs": [],
        "figureCaption": "Multi-system workflows need real test inputs and clear post-handover support rules.",
        "points": {
          "problem": [
            "Tools change, permissions shift, and messy inputs break fragile setups.",
            "A slick demo hides how exceptions behave across connected tools and approvals."
          ],
          "fix": [
            "You choose implementation when data moves across tools.",
            "Several people approve work, or exceptions need testing. Test on your real examples. You agree on handover vs ongoing support upfront."
          ]
        },
        "line": "A delivered project and a managed service are different jobs, so agree on both.",
        "figure": {
          "name": "check",
          "alt": "Multi-system workflows need real test inputs and clear post-handover support rules for you",
          "caption": "Multi-system workflows need real test inputs and clear post-handover support rules.",
          "motion": "bubble"
        }
      },
      {
        "title": "Five questions separate clear ownership from expensive confusion for you",
        "paragraphs": [],
        "figureCaption": "Five quick checks on time, scope, cost, ownership, and support prevent surprises.",
        "points": {
          "problem": [
            "Teams rush into buying before deciding who supplies inputs.",
            "Checks work, or owns accounts. Unclear scope leaves buyers guessing what support costs after launch."
          ],
          "fix": [
            "You check time, scope, cost, ownership, and support before choosing training or implementation.",
            "You confirm who controls accounts, documents, and configuration, plus how changes get quoted."
          ]
        },
        "line": "Someone in your business must own the workflow, whatever option you pick.",
        "figure": {
          "name": "list",
          "alt": "Five quick checks on time, scope, cost, ownership, and support prevent surprises for you",
          "caption": "Five quick checks on time, scope, cost, ownership, and support prevent surprises.",
          "motion": "pointer"
        }
      },
      {
        "title": "One weekly task shows whether to start with a workshop or a scope check for you",
        "paragraphs": [],
        "figureCaption": "One weekly task reveals whether you need practice or a scoped build.",
        "points": {
          "problem": [
            "Guessing between training and implementation leads to stalled tools or mismatched expectations.",
            "Repeating a slow manual task every week without clear rules wastes hours."
          ],
          "fix": [
            "You write down one weekly task.",
            "Its inputs, what good output looks like, and current time spent. You use a safe browser test for a workshop. Or request a scope check if integrations and checks are heavy."
          ]
        },
        "line": "You start with one real weekly task. You confirm scope and costs, and keep control.",
        "figure": {
          "name": "check",
          "alt": "One weekly task reveals whether you need practice or a scoped build",
          "caption": "One weekly task reveals whether you need practice or a scoped build.",
          "motion": "bubble"
        }
      }
    ],
    "close": {
      "line": "You start with one real weekly task. You confirm scope and costs, and keep control.",
      "ask": "You ask GrowthCred for a scope check or workshop fit on one weekly task.",
      "cta": {
        "to": "/workshop",
        "label": "See the workshop"
      }
    },
    "faq": [],
    "dropFaq": false
  },
  "/guides/business-brain": {
    "heading": "Tired of generic AI answers? You give it a business brain first.",
    "article": {
      "pain": "AI gives generic replies.",
      "wayOut": "It does not know how your company operates. One clear reference document helps you brief AI consistently. Keeping checks in human hands.",
      "learnItems": [
        "How to structure a short, fact-checked business brain that you can review in five minutes.",
        "You learn how to test it on a small task and connect it safely without leaking sensitive data."
      ],
      "why": "GrowthCred is a Johannesburg AI implementation and training company. I teach AI at Melsoft Academy. I helped build an isiZulu and English speech AI system. It was presented at Parliament in Cape Town.",
      "minutes": 4,
      "mentions": [
        {
          "text": "If you want a head start drafting your document without guessing structure. You can use the free Business Brain builder. You check every line yourself before putting real workflows on it."
        }
      ],
      "hero": {
        "name": "lock",
        "alt": "You keep confirmed facts separate from ideas. Assign an owner with a review date for you",
        "caption": "You keep confirmed facts separate from ideas. Assign an owner with a review date."
      }
    },
    "sections": [
      {
        "title": "Unchecked context turns AI into a fast guesser instead of a useful draft aid for you",
        "paragraphs": [],
        "figureCaption": "You keep confirmed facts separate from ideas. Assign an owner with a review date.",
        "points": {
          "problem": [
            "Without your services, rules, and tone.",
            "AI guesses and fills gaps with generic phrasing. Mixing unconfirmed ideas with approved facts creates errors you have to clean up."
          ],
          "fix": [
            "You write confirmed facts once.",
            "Covering services, ideal customers, repeat tasks, tone, and approved terms. Separate facts from ideas, set a review date. And name who keeps it current."
          ]
        },
        "line": "A business brain gives AI a consistent starting brief, not magic memory.",
        "figure": {
          "name": "lock",
          "alt": "You keep confirmed facts separate from ideas. Assign an owner with a review date for you",
          "caption": "You keep confirmed facts separate from ideas. Assign an owner with a review date.",
          "motion": "pointer"
        }
      },
      {
        "title": "A five-minute starting template keeps your first version usable",
        "paragraphs": [],
        "figureCaption": "Six clear headings set boundaries on scope, voice, approvals, and missing facts.",
        "points": {
          "problem": [
            "Giant reference docs go unread.",
            "You get out of date, or bury the rules AI needs. Missing approval rules or pricing sources invites invented commitments."
          ],
          "fix": [
            "You use six short headings: Business, Services, Voice, Workflow, Rules, and Maintenance.",
            "Include a real sample of your writing. A rule to flag missing info instead of guessing."
          ]
        },
        "line": "You keep the first version short enough to check in five minutes.",
        "figure": {
          "name": "check",
          "alt": "Six clear headings set boundaries on scope, voice, approvals, and missing facts for you",
          "caption": "Six clear headings set boundaries on scope, voice, approvals, and missing facts.",
          "motion": "bubble"
        }
      },
      {
        "title": "Side-by-side testing on one small task proves real improvement for you",
        "paragraphs": [],
        "figureCaption": "Comparing outputs with and. Context shows whether drafting gets faster and cleaner.",
        "points": {
          "problem": [
            "Long AI answers can look helpful.",
            "Getting service details or tone wrong. Skipping a baseline test makes it hard to tell if context actually cut rework."
          ],
          "fix": [
            "You run a small task, like a maintenance follow-up email from meeting notes.",
            "With and without context. You compare accuracy, tone, and what the AI flagged as unconfirmed. Aiming for less fixing."
          ]
        },
        "line": "Judge a business brain by less fixing. Better accuracy, not longer text.",
        "figure": {
          "name": "split",
          "alt": "Comparing outputs with and. Context shows whether drafting gets faster and cleaner for you",
          "caption": "Comparing outputs with and. Context shows whether drafting gets faster and cleaner.",
          "motion": "pointer"
        }
      },
      {
        "title": "Careless connections and routine drift break your best setup",
        "paragraphs": [],
        "figureCaption": "Safe permissions, redacted tests, and regular updates keep your reference accurate.",
        "points": {
          "problem": [
            "Uploading a file once does not mean every chat or connected tool can see it or follow rules.",
            "Putting passwords or unneeded personal data in prompts creates avoidable risk. And stale docs cause drift."
          ],
          "fix": [
            "You check tool settings, test with made-up or redacted examples first.",
            "And keep passwords and unneeded personal data out. You update when prices, services, or terms change, rerun a short test. And fix conflicting rules."
          ]
        },
        "line": "Good context still needs human checking, safe access, and regular updates.",
        "figure": {
          "name": "lock",
          "alt": "Safe permissions, redacted tests, and regular updates keep your reference accurate",
          "caption": "Safe permissions, redacted tests, and regular updates keep your reference accurate.",
          "motion": "bubble"
        }
      }
    ],
    "close": {
      "line": "Good context still needs human checking, safe access, and regular updates.",
      "ask": "Try your free Business Brain builder. Check your draft against your current facts.",
      "cta": {
        "to": "/call",
        "label": "Ask for a quote"
      }
    },
    "faq": [],
    "dropFaq": false
  },
  "/guides/can-staff-paste-client-files-into-chatgpt": {
    "heading": "Staff pasting client files into ChatGPT? Pause and check your route first.",
    "article": {
      "pain": "POPIA does not ban every AI use.",
      "wayOut": "But pasting identifiable client files into an unapproved tool creates real risk. You map what data moves, who handles it,. Where it goes before staff use it.",
      "learnItems": [
        "You learn why a tool name, paid plan, or privacy toggle does not settle POPIA or confidentiality duties.",
        "You learn how to test tasks safely with de-identified data and approve one clear workflow rule."
      ],
      "why": "GrowthCred is a Johannesburg AI implementation and training company. I teach AI at Melsoft Academy. I helped build an isiZulu and English speech AI system. It was presented at Parliament in Cape Town.",
      "minutes": 4,
      "mentions": [
        {
          "text": "If you want a structured way to map the task. What information it needs before choosing a tool. You can grab the free AI Implementation Guide. Still have your Information Officer or adviser review your specific setup.",
          "phrase": "AI Implementation Guide",
          "href": "/ai-implementation-guide"
        }
      ],
      "hero": {
        "name": "lock",
        "alt": "You check confidentiality duties and remove identifying fields before testing a workflow",
        "caption": "You check confidentiality duties and remove identifying fields before testing a workflow."
      }
    },
    "sections": [
      {
        "title": "A tool name alone does not clear POPIA or confidentiality duties for you",
        "paragraphs": [],
        "figureCaption": "You check confidentiality duties and remove identifying fields before testing a workflow.",
        "points": {
          "problem": [
            "Client files can hold personal information under POPIA.",
            "Confidential business info under contracts or rules. Pasting full client files. Only a narrow task is needed exposes extra details unnecessarily."
          ],
          "fix": [
            "You check both POPIA personal information duties and contractual or professional confidentiality rules.",
            "Strip names, ID numbers, contact details,. Clues first, or test with a made-up example."
          ]
        },
        "line": "A client file is not a test prompt,. You check the task before sending real details.",
        "figure": {
          "name": "lock",
          "alt": "You check confidentiality duties and remove identifying fields before testing a workflow",
          "caption": "You check confidentiality duties and remove identifying fields before testing a workflow.",
          "motion": "bubble"
        }
      },
      {
        "title": "You must trace where prompts and attachments go, including cross-border routes",
        "paragraphs": [],
        "figureCaption": "Trace data paths, operator terms, and cross-border conditions before allowing real files.",
        "points": {
          "problem": [
            "A paid plan, company account.",
            "Or privacy toggle does not automatically answer operator or transfer questions. Sending personal information across borders triggers POPIA section 72 conditions. Alongside sections 19 to 21 safeguards and operator terms."
          ],
          "fix": [
            "You map where prompts and attachments go.",
            "You check operator status and retention terms, and read provider terms yourself. Verify cross-border recipients, contracts, and safeguards. And do not send the file if you cannot verify the route."
          ]
        },
        "line": "If you cannot verify where the information goes. Who can reach it, do not send it.",
        "figure": {
          "name": "table",
          "alt": "Trace data paths, operator terms, and cross-border conditions before allowing real files for you",
          "caption": "Trace data paths, operator terms, and cross-border conditions before allowing real files.",
          "motion": "pointer"
        }
      },
      {
        "title": "One clear, repeatable workflow rule beats vague staff reminders for you",
        "paragraphs": [],
        "figureCaption": "Clear boundaries and human sign-off keep daily staff use controlled.",
        "points": {
          "problem": [
            "Busy staff need a simple rule they can follow.",
            "Guessing what is allowed in an unapproved chat. Letting unverified outputs reach clients or change records creates avoidable mistakes."
          ],
          "fix": [
            "You name an approving business owner, set allowed data, approved accounts, access, retention,.",
            "Mistake steps, and state your rule in one line. You test with safe examples, check outputs against sources,. You keep a human approving client-facing or record-changing actions."
          ]
        },
        "line": "Set a one-line rule your team can repeat,. You keep human approval on consequential outputs.",
        "figure": {
          "name": "table",
          "alt": "Clear boundaries and human sign-off keep daily staff use controlled for you",
          "caption": "Clear boundaries and human sign-off keep daily staff use controlled.",
          "motion": "pointer"
        }
      },
      {
        "title": "When answers are unclear, pause real files and ask your right people",
        "paragraphs": [],
        "figureCaption": "Pause identifiable client files. Get advice on your specific facts when unsure.",
        "points": {
          "problem": [
            "Guessing on unclear legal or data questions leaves you exposed if terms or routes do not fit.",
            "Treating a basic control as full business-wide compliance misleads teams."
          ],
          "fix": [
            "You keep identifiable client data out for now.",
            "You use a fictional or de-identified example, or pause the task. Ask your Information Officer, privacy adviser. Or lawyer to review the workflow on your actual facts."
          ]
        },
        "line": "Pausing a risky task is a practical control. Your Information Officer reviews the facts.",
        "figure": {
          "name": "paste",
          "alt": "Pause identifiable client files. Get advice on your specific facts when unsure",
          "caption": "Pause identifiable client files. Get advice on your specific facts when unsure.",
          "motion": "bubble"
        }
      }
    ],
    "close": {
      "line": "Pausing a risky task is a practical control. Your Information Officer reviews the facts.",
      "ask": "Get the free AI Implementation Guide to map your workflow. Using real client data.",
      "cta": {
        "to": "/call",
        "label": "Ask for a quote"
      }
    },
    "faq": [],
    "dropFaq": false
  },
  "/guides/choose-ai-tools-small-business": {
    "heading": "Outdated AI tool lists waste money? Test the bottleneck before you buy.",
    "article": {
      "pain": "AI tool lists go stale fast,.",
      "wayOut": "Shiny demos rarely match messy daily operations. Score your bottleneck, pick the smallest tool type. And run a ten-example pilot before committing.",
      "learnItems": [
        "You learn how to score bottlenecks, pick the smallest tool category, and use a six-question buying test.",
        "You learn how to run a ten-example pilot and decide between a workshop or scoped implementation."
      ],
      "why": "GrowthCred is a Johannesburg AI implementation and training company. I teach AI at Melsoft Academy. I helped build an isiZulu and English speech AI system. It was presented at Parliament in Cape Town.",
      "minutes": 5,
      "mentions": [
        {
          "text": "If you want to map your bottleneck. You build a controlled first workflow yourself. The workshop helps you test and judge outputs. Subscribing to a stack of tools upfront. If your workflow crosses accounts. Permissions, or systems. GrowthCred checks compatibility and scopes third-party costs separately before implementation.",
          "phrase": "workshop",
          "href": "/workshop"
        }
      ],
      "hero": {
        "name": "tools",
        "alt": "Unsettled processes and scattered records fail faster when automated for you",
        "caption": "Unsettled processes and scattered records fail faster when automated."
      }
    },
    "sections": [
      {
        "title": "Demos flatter tools, while messy workflows expose what actually breaks for you",
        "paragraphs": [],
        "figureCaption": "Unsettled processes and scattered records fail faster when automated.",
        "points": {
          "problem": [
            "A tool demo shows its best day.",
            "Not whether your inputs are clean. Steps are settled, or exceptions have owners. Automating a weekly moving target or scattered, contradictory records creates faster confusion."
          ],
          "fix": [
            "You start with the task: what triggers it.",
            "What goes in, steps, output, reviewer, and where it breaks. Fix systems of record and settle your process before buying or automating."
          ]
        },
        "line": "Do not start with a tool list. Start with a measured bottleneck. Settled process. You still check the result here.",
        "figure": {
          "name": "tools",
          "alt": "Unsettled processes and scattered records fail faster when automated for you",
          "caption": "Unsettled processes and scattered records fail faster when automated.",
          "motion": "pointer"
        }
      },
      {
        "title": "Score bottlenecks by real delay and rework, not just longest time for you",
        "paragraphs": [],
        "figureCaption": "You measure frequency, delay, rework, and team review ability before picking software.",
        "points": {
          "problem": [
            "A task that takes many hours may matter less than a short task that holds up every sale.",
            "Buying tools when nobody on your team can judge output quality reliably creates extra checking."
          ],
          "fix": [
            "Log repeat tasks across a normal week with frequency.",
            "Hands-on minutes, delay, rework rate, and impact when late or wrong. Check that someone on your team can judge quality consistently before shopping."
          ]
        },
        "line": "A short bottleneck blocking sales can cost more than a long task. You still check the result here.",
        "figure": {
          "name": "lock",
          "alt": "You measure frequency, delay, rework, and team review ability before picking software",
          "caption": "You measure frequency, delay, rework, and team review ability before picking software.",
          "motion": "bubble"
        }
      },
      {
        "title": "You match the smallest tool category and check six buying questions",
        "paragraphs": [],
        "figureCaption": "You match the smallest tool type to the job. Verify fit, control, data, and exit terms.",
        "points": {
          "problem": [
            "Buying heavy tools for simple drafting, or picking a plan.",
            "Reading current terms, creates lock-in and risk. Overlapping product categories make old comparison articles unreliable."
          ],
          "fix": [
            "You pick the smallest fit: AI assistant for context-fed drafts.",
            "Workflow automation for predictable routing, or system of record for current status. You check current docs and contracts using six questions: Fit. Context, Control, Visibility, Data, and Exit."
          ]
        },
        "line": "You pick the smallest tool category that fits,. Verify current terms and exit options. You still check the result here.",
        "figure": {
          "name": "tools",
          "alt": "You match the smallest tool type to the job. Verify fit, control, data, and exit terms for you",
          "caption": "You match the smallest tool type to the job. Verify fit, control, data, and exit terms.",
          "motion": "pointer"
        }
      },
      {
        "title": "A ten-example pilot proves whether effort drops without losing control for you",
        "paragraphs": [],
        "figureCaption": "Real examples, exception logs,. A fallback plan show if a workflow truly helps.",
        "points": {
          "problem": [
            "Fast outputs that cause rework, hide failures.",
            "Or rely on one enthusiast are not real wins. Launching without clear owners, failure logs. Or a manual fallback leaves teams stuck when things go wrong."
          ],
          "fix": [
            "You test ten real examples, including ordinary, messy,.",
            "Awkward cases, and track setup, run, fix, and review time. Set owner, reviewer, good output, forbidden actions, exception logging. And a manual fallback before testing."
          ]
        },
        "line": "You keep a workflow only if total effort or delay drops. Quality and control hold. You still check the result here.",
        "figure": {
          "name": "check",
          "alt": "Real examples, exception logs,. A fallback plan show if a workflow truly helps for you",
          "caption": "Real examples, exception logs,. A fallback plan show if a workflow truly helps.",
          "motion": "bubble"
        }
      }
    ],
    "close": {
      "line": "You keep a workflow only if total effort or delay drops. Quality and control hold. You still check the result here.",
      "ask": "Choose a workshop to build your first controlled workflow or request a compatibility. Scope check for implementation.",
      "cta": {
        "to": "/workshop",
        "label": "See the workshop"
      }
    },
    "faq": [],
    "dropFaq": false
  },
  "/guides/free-marketing-tools-before-you-buy": {
    "heading": "Paying for marketing software? Check free tools before you buy another one.",
    "article": {
      "pain": "Many business owners pay for tools that free options already cover.",
      "wayOut": "You check free tools by question first,. Remember that reporting tools do not do the follow-up work.",
      "learnItems": [
        "You learn which free tools help answer competitor, search, site, local listing, and reporting questions.",
        "Why free reporting tools still leave manual follow-up on your desk, and how to address that bottleneck."
      ],
      "why": "GrowthCred is a Johannesburg AI implementation and training company. I teach AI at Melsoft Academy. I helped build an isiZulu and English speech AI system. It was presented at Parliament in Cape Town.",
      "minutes": 4,
      "mentions": [
        {
          "text": "When free tools show you the numbers. Your real bottleneck is quotes. Follow-ups, or repeat team questions landing on your desk. GrowthCred builds private AI that your business owns. Locking you into another generic reporting subscription.",
          "phrase": "GrowthCred",
          "href": "/call"
        }
      ],
      "hero": {
        "name": "tools",
        "alt": "Free competitor, search, and site tools show what works. Where visitors stall before you spend",
        "caption": "Free competitor, search, and site tools show what works. Where visitors stall before you spend."
      }
    },
    "sections": [
      {
        "title": "You check competitors, search demand, and site friction with free tools first",
        "paragraphs": [],
        "figureCaption": "Free competitor, search, and site tools show what works. Where visitors stall before you spend.",
        "points": {
          "problem": [
            "Buying paid tools before checking what competitors run.",
            "What people search, or where visitors drop off wastes budget. Tool terms and limits change often,. Old advice or assumptions can catch you out."
          ],
          "fix": [
            "You use ad libraries, Wayback Machine, and Trustpilot for competitor and history checks.",
            "Plus search and site tools like Search Console, Analytics, Clarity, and PageSpeed. You check current terms and limits yourself,. Answer real customer search questions on your site."
          ]
        },
        "line": "You start with free tools and current terms before paying for extra software.",
        "figure": {
          "name": "tools",
          "alt": "Free competitor, search, and site tools show what works. Where visitors stall before you spend",
          "caption": "Free competitor, search, and site tools show what works. Where visitors stall before you spend.",
          "motion": "pointer"
        }
      },
      {
        "title": "Local visibility and scattered numbers need basic order first for you",
        "paragraphs": [],
        "figureCaption": "Local profiles and consolidated reporting help you see visibility and numbers clearly.",
        "points": {
          "problem": [
            "Local buyers will not find a business with incomplete listings.",
            "And scattered metrics make decisions harder. Collecting dashboards without a clear question does not fix slow responses or missed enquiries."
          ],
          "fix": [
            "Set up and check local listings like Google Business Profile, Bing Places,.",
            "Apple Business Connect, plus directories and merchant tools. You keep existing reporting, tag,. Studio numbers in one view. Such as Search Console, Analytics, and Looker Studio."
          ]
        },
        "line": "Clear local listings and organised numbers give you a cleaner baseline than extra subscriptions.",
        "figure": {
          "name": "check",
          "alt": "Local profiles and consolidated reporting help you see visibility and numbers clearly",
          "caption": "Local profiles and consolidated reporting help you see visibility and numbers clearly.",
          "motion": "bubble"
        }
      },
      {
        "title": "Free tools show numbers. But they do not answer enquiries or send quotes for you",
        "paragraphs": [],
        "figureCaption": "Viewing numbers is only step one. Answering enquiries. Sending quotes takes action.",
        "points": {
          "problem": [
            "Reports and dashboards show data.",
            "Yet someone still has to read them. Reply to enquiries, and send quotes. When every reply and quote lands on you. The bottleneck is your workload, not a missing free tool."
          ],
          "fix": [
            "Spot where manual follow-up.",
            "Quoting pile up after you see the numbers. Put clear workflows and owned steps in place. Enquiries do not stall on one person."
          ]
        },
        "line": "Data alone does not send quotes or follow up with leads.",
        "figure": {
          "name": "quote",
          "alt": "Viewing numbers is only step one. Answering enquiries. Sending quotes takes action for you",
          "caption": "Viewing numbers is only step one. Answering enquiries. Sending quotes takes action.",
          "motion": "pointer"
        }
      },
      {
        "title": "Private AI helps stop quotes and team questions landing only on you",
        "paragraphs": [],
        "figureCaption": "Business-owned private AI helps lift repetitive quoting. Follow-up load off your owner.",
        "points": {
          "problem": [
            "Owners get bogged down answering repeat team questions.",
            "Writing quotes, and chasing follow-ups by hand. Adding more reporting tools does nothing to reduce the daily handoffs sitting on your desk."
          ],
          "fix": [
            "You focus on the bottleneck where quotes.",
            "Follow-ups, and repeat team questions pile up. Use private AI built for your business so routine quotes. Follow-ups, and team questions do not rely solely on you."
          ]
        },
        "line": "Fix your follow-up and quoting bottleneck. Everything stops running through one person.",
        "figure": {
          "name": "quote",
          "alt": "Business-owned private AI helps lift repetitive quoting. Follow-up load off your owner",
          "caption": "Business-owned private AI helps lift repetitive quoting. Follow-up load off your owner.",
          "motion": "bubble"
        }
      }
    ],
    "close": {
      "line": "Fix your follow-up and quoting bottleneck. Everything stops running through one person.",
      "ask": "Start with the free tools on your list, and talk to GrowthCred. Quoting and follow-up still land on you.",
      "cta": {
        "to": "/call",
        "label": "Ask for a quote"
      }
    },
    "faq": [],
    "dropFaq": false
  },
  "/guides/how-we-work-first-30-days": {
    "heading": "Blind AI rollouts waste cash, a clear 30-day plan protects your business.",
    "article": {
      "pain": "Before you let anyone change how your business runs.",
      "wayOut": "You should know what happens next. Here is how GrowthCred runs from application to your first monthly review.",
      "learnItems": [
        "How the application, scoping call, and audit map your bottlenecks before any build starts",
        "You learn how a 14-day first result and a 30-day review keep work tied to real business rules"
      ],
      "why": "GrowthCred is a Johannesburg AI implementation and training company. I teach AI at Melsoft Academy. I helped build an isiZulu and English speech AI system. It was presented at Parliament in Cape Town.",
      "minutes": 3,
      "mentions": [
        {
          "text": "If you want structured rollout steps you can map against your own team first. Your AI Implementation Guide lays out how to introduce AI in stages. You can read through it at your own pace. Deciding whether to apply.",
          "phrase": "AI Implementation Guide",
          "href": "/ai-implementation-guide"
        }
      ],
      "hero": {
        "name": "check",
        "alt": "You check fit and scope on a working call before any build starts",
        "caption": "You check fit and scope on a working call before any build starts."
      }
    },
    "sections": [
      {
        "title": "Before day one: skip blind pitches and scope your real bottleneck",
        "paragraphs": [],
        "figureCaption": "You check fit and scope on a working call before any build starts.",
        "points": {
          "problem": [
            "Cold pitches waste time before anyone knows how your business runs.",
            "Limited spots mean rushed builds fail when fit and scope are vague."
          ],
          "fix": [
            "Start with an application that shows where you are stuck.",
            "You use a working call to align on fit, scope, and cost together."
          ]
        },
        "line": "You start with a working scope, not a blind checkout.",
        "figure": {
          "name": "check",
          "alt": "You check fit and scope on a working call before any build starts",
          "caption": "You check fit and scope on a working call before any build starts.",
          "motion": "bubble"
        }
      },
      {
        "title": "Step one: stop guessing and price the hours stuck on you",
        "paragraphs": [],
        "figureCaption": "Map stuck hours and write down your rules before building a thing.",
        "points": {
          "problem": [
            "Owners stay trapped in routine tasks that wait on their say-so.",
            "Unwritten rules leave builds guessing on pricing, promises, and tone."
          ],
          "fix": [
            "Audit where you are the bottleneck.",
            "Put a rand value on stuck hours. Write down your rules for pricing, promises, and how you talk."
          ]
        },
        "line": "Every system builds on your written rules, not guesswork.",
        "figure": {
          "name": "scale",
          "alt": "Map stuck hours and write down your rules before building a thing",
          "caption": "Map stuck hours and write down your rules before building a thing.",
          "motion": "bubble"
        }
      },
      {
        "title": "Step two: ditch slow demos. Ship a first result in 14 days for you",
        "paragraphs": [],
        "figureCaption": "You test the highest-value task on real examples within 14 days.",
        "points": {
          "problem": [
            "Generic demos prove little when your real inputs and edge cases differ.",
            "Unchecked automation risks prices, promises, or external messages going wrong."
          ],
          "fix": [
            "Target your highest-value audit task first for a result within 14 days.",
            "Test on real examples with your team while people keep approval control."
          ]
        },
        "line": "People stay responsible for prices, commitments, and outward actions.",
        "figure": {
          "name": "check",
          "alt": "You test the highest-value task on real examples within 14 days",
          "caption": "You test the highest-value task on real examples within 14 days.",
          "motion": "pointer"
        }
      },
      {
        "title": "Step three: stop one-off launches and track what moves in month one for you",
        "paragraphs": [],
        "figureCaption": "Track live systems monthly and review month one against your baseline.",
        "points": {
          "problem": [
            "Live tools drift when business needs shift and nobody tracks results.",
            "Without a baseline, you cannot tell if the rollout actually helped. If the Command Core doesn't give you back at least 20% of your week, the engagement is on us."
          ],
          "fix": [
            "Track live systems monthly and add capabilities as needs change.",
            "End month one with a review measured against where you started."
          ]
        },
        "line": "Month one ends with a review measured against your starting baseline.",
        "figure": {
          "name": "check",
          "alt": "Track live systems monthly and review month one against your baseline",
          "caption": "Track live systems monthly and review month one against your baseline.",
          "motion": "bubble"
        }
      }
    ],
    "close": {
      "line": "Month one ends with a review measured against your starting baseline.",
      "ask": "Want to see if your workflow fits a scoped rollout? Submit an application to start a working conversation.",
      "cta": {
        "to": "/call",
        "label": "Apply"
      }
    },
    "dropFaq": true
  },
  "/guides/law-firm-billing-leakage": {
    "heading": "Working eight hours for 2.4 hours paid hurts, fix billing leakage now.",
    "article": {
      "pain": "You did not go to law school to chase invoices at 10pm or guess Friday timesheets.",
      "wayOut": "Here is where billing leaks out and how to get paid faster.",
      "learnItems": [
        "You learn where billable time, collection, and 75-day billing waits leak money in law firms",
        "You learn how to turn firm rules into faster drafts while keeping practitioners in full control"
      ],
      "why": "GrowthCred is a Johannesburg AI implementation and training company. I teach AI at Melsoft Academy. I helped build an isiZulu and English speech AI system. It was presented at Parliament in Cape Town.",
      "minutes": 5,
      "mentions": [
        {
          "text": "If you want to map how AI fits inside the tools your firm already uses. A full rebuild, get your free AI Implementation Guide first. It gives seven practical steps you can review before scoping anything.",
          "phrase": "AI Implementation Guide",
          "href": "/ai-implementation-guide"
        }
      ],
      "hero": {
        "name": "scale",
        "alt": "Uncaptured Tuesday work quietly disappears when timesheets wait until Friday for you",
        "caption": "Uncaptured Tuesday work quietly disappears when timesheets wait until Friday."
      }
    },
    "sections": [
      {
        "title": "Your week, honestly: partner hours and unbilled time slip away",
        "paragraphs": [],
        "figureCaption": "Uncaptured Tuesday work quietly disappears when timesheets wait until Friday.",
        "points": {
          "problem": [
            "Fridays turn into guesswork scrolling emails and calendars for Tuesday's work.",
            "Partners get pulled into intake, draft invoices, chasing late payers, and admin."
          ],
          "fix": [
            "Pull your own practice numbers to spot where time and money stall.",
            "You stop paying partner rates for routine admin and invoice chasing."
          ]
        },
        "line": "The law is not the hard part. Running the firm is eating you alive.",
        "figure": {
          "name": "scale",
          "alt": "Uncaptured Tuesday work quietly disappears when timesheets wait until Friday for you",
          "caption": "Uncaptured Tuesday work quietly disappears when timesheets wait until Friday.",
          "motion": "ring"
        }
      },
      {
        "title": "Billing and admin leaks: 2.4 hours paid and 75-day waits hurt cashflow for you",
        "paragraphs": [],
        "figureCaption": "Small drops from recorded time to collected cash compound across your year.",
        "points": {
          "problem": [
            "Clio's 2025 Legal Trends Report shows 8 hours in.",
            "3.0 recorded, 2.6 billed, and 2.4 collected. Firms wait a median 43 days to bill. 32 more to get paid. While 8am's 2026 report notes admin misery. Clio's 2025 Legal Trends Report also found firms bill 88% of the time they record and collect 93% of what they invoice. About R82 of every R100 recorded reaches the bank. The data is mostly from North American firms, so you check your own numbers. 8am surveyed 400 legal professionals for its 2026 Admin Misery Index. 39% lose four or more productive hours a week to admin. 63% work outside normal hours. 22% said they had missed a deadline because of admin."
          ],
          "fix": [
            "Check your own practice data against every gap between recorded hours.",
            "Paid cash. You tighten billing stages so invoices go out promptly instead of sitting unchased."
          ]
        },
        "line": "Eight hours in and 2.4 hours paid leaves real money on your table.",
        "figure": {
          "name": "scale",
          "alt": "Small drops from recorded time to collected cash compound across your year",
          "caption": "Small drops from recorded time to collected cash compound across your year.",
          "motion": "bubble"
        }
      },
      {
        "title": "Why hiring and extra software fail to fix your bottleneck",
        "paragraphs": [],
        "figureCaption": "More headcount or logins still stall if approvals wait on you.",
        "points": {
          "problem": [
            "Adding staff brings annual salaries.",
            "Leave, turnover, and more review work. Extra software adds another login to store work without actually doing it."
          ],
          "fix": [
            "You compare scoping a workflow system against the full annual cost of extra hires.",
            "Keep approvals with you so work moves forward without adding management drag."
          ]
        },
        "line": "Software stores your work. It does not do it.",
        "figure": {
          "name": "groups",
          "alt": "More headcount or logins still stall if approvals wait on you",
          "caption": "More headcount or logins still stall if approvals wait on you.",
          "motion": "pointer"
        }
      },
      {
        "title": "Write your firm rules once so prep is faster and cheaper",
        "paragraphs": [],
        "figureCaption": "Written rules power faster drafts while keeping final sign-off in your hands.",
        "points": {
          "problem": [
            "Intake, fee rules, precedents,.",
            "Chasing habits live scattered across people and files. Waiting days for proposals and weeks for billing slows cash coming in."
          ],
          "fix": [
            "You write down intake, fee rules, precedents,.",
            "Billing triggers once for your system. Draft time entries, invoices, reminders, and proposals for quick practitioner approval."
          ]
        },
        "line": "You stop doing the prep work and start approving it.",
        "figure": {
          "name": "clock",
          "alt": "Written rules power faster drafts while keeping final sign-off in your hands",
          "caption": "Written rules power faster drafts while keeping final sign-off in your hands.",
          "motion": "pointer"
        }
      },
      {
        "title": "You keep legal judgment and ethics firm while cutting risk",
        "paragraphs": [],
        "figureCaption": "Practitioners stay in charge of legal judgment. Trust money, and client data rules.",
        "points": {
          "problem": [
            "AI cannot do legal research.",
            "You give advice, file matters, or touch trust accounts. Legal Practice Council's 2026 ethics guide covers South African cases where AI invented authorities. If the Command Core doesn't give you back at least 20% of your week, the engagement is on us. The Legal Practice Council's 2026 ethics guide deals with South African cases where AI invented the authorities. A practitioner still checks every authority, deadline and client commitment."
          ],
          "fix": [
            "Require a practitioner to check every authority, deadline, and client commitment.",
            "You agree tools, access, retention, and data rules before any real matter enters."
          ]
        },
        "line": "You are the lawyer. The system prepares, and you decide.",
        "figure": {
          "name": "list",
          "alt": "Practitioners stay in charge of legal judgment. Trust money, and client data rules for you",
          "caption": "Practitioners stay in charge of legal judgment. Trust money, and client data rules.",
          "motion": "pointer"
        }
      }
    ],
    "close": {
      "line": "You are the lawyer. The system prepares, and you decide.",
      "ask": "Want us to scope how your firm's billing and intake workflow runs? Apply to start.",
      "cta": {
        "to": "/call",
        "label": "Apply"
      }
    },
    "dropFaq": true
  },
  "/guides/ppe-quotes-without-the-owner": {
    "heading": "Bulk PPE quotes bottleneck on you, draft them from your rules.",
    "article": {
      "pain": "Every bulk PPE or uniform quote still waits for you to price it.",
      "wayOut": "A Quote Engine drafts quotes from your price list. Rules while you approve the price, promise, and send.",
      "learnItems": [
        "Why bulk PPE and uniform quotes stall when pricing and lead times live in your head",
        "How a Quote Engine and one product line test keep pricing and approvals under your control"
      ],
      "why": "GrowthCred is a Johannesburg AI implementation and training company. I teach AI at Melsoft Academy. I helped build an isiZulu and English speech AI system. It was presented at Parliament in Cape Town.",
      "minutes": 3,
      "mentions": [
        {
          "text": "If you want to map one repeatable task. Changing how your team quotes, get the AI Implementation Guide. It gives you a clear starting point. Locking you into a big rollout upfront.",
          "phrase": "AI Implementation Guide",
          "href": "/ai-implementation-guide"
        }
      ],
      "hero": {
        "name": "quote",
        "alt": "Quotes stall when pricing. Lead-time answers live only in your owner's head",
        "caption": "Quotes stall when pricing. Lead-time answers live only in your owner's head."
      }
    },
    "sections": [
      {
        "title": "Why quotes still stall on your desk despite extra staff",
        "paragraphs": [],
        "figureCaption": "Quotes stall when pricing. Lead-time answers live only in your owner's head.",
        "points": {
          "problem": [
            "Prices sit in your head, sizes sit in a spreadsheet.",
            "And lead times sit in email. Juniors and new hires still stop to ask what to charge. How long it takes, or what was promised."
          ],
          "fix": [
            "Put your price list, sizes, branding rules.",
            "And lead times in one structured place. You let staff stop asking repeated pricing questions for every single quote."
          ]
        },
        "line": "Hiring another person does not move the price out of your head.",
        "figure": {
          "name": "quote",
          "alt": "Quotes stall when pricing. Lead-time answers live only in your owner's head",
          "caption": "Quotes stall when pricing. Lead-time answers live only in your owner's head.",
          "motion": "bubble"
        }
      },
      {
        "title": "How a Quote Engine drafts lines without guessing missing prices for you",
        "paragraphs": [],
        "figureCaption": "Drafts show where each line came from. Flag missing prices instead of guessing.",
        "points": {
          "problem": [
            "Guessing prices, discounts, or lead times creates risky promises customers hold you to.",
            "Re-explaining your same rules every Monday wastes time across quotes and proposals."
          ],
          "fix": [
            "Draft quotes from your price list and written rules on size.",
            "Branding, lead time, and minimums. Leave any missing price as a clear question. And store shared facts in a Company Brain."
          ]
        },
        "line": "A missing price stays a question. It does not become a guess.",
        "figure": {
          "name": "quote",
          "alt": "Drafts show where each line came from. Flag missing prices instead of guessing for you",
          "caption": "Drafts show where each line came from. Flag missing prices instead of guessing.",
          "motion": "bubble"
        }
      },
      {
        "title": "Why human sign-off protects every price, discount, and lead time for you",
        "paragraphs": [],
        "figureCaption": "Nothing goes to your customer. You approve the price, lead time, and promise.",
        "points": {
          "problem": [
            "Automated replies or unapproved discounts can lock in terms you never agreed to.",
            "Customers expect accurate delivery dates and firm commitments on bulk orders."
          ],
          "fix": [
            "You keep final approval on price, lead time,.",
            "Commitments with you before anything goes out. Have a person send your quote after checking the drafted lines."
          ]
        },
        "line": "The quote can leave your desk. The price does not leave your hands.",
        "figure": {
          "name": "quote",
          "alt": "Nothing goes to your customer. You approve the price, lead time, and promise",
          "caption": "Nothing goes to your customer. You approve the price, lead time, and promise.",
          "motion": "bubble"
        }
      },
      {
        "title": "You start with one product line and stay honest on what is proven",
        "paragraphs": [],
        "figureCaption": "Prove your rules on one product line before expanding across the catalogue.",
        "points": {
          "problem": [
            "Trying to quote your whole catalogue on day one spreads rules too thin too fast.",
            "Claiming unverified quote times or unnamed suppliers overstates what has been measured."
          ],
          "fix": [
            "You pick one weekly product line first.",
            "You write its rules, test real requests, and refine before adding more. You treat unmeasured metrics honestly until real supplier results are tracked and approved."
          ]
        },
        "line": "Start with one product line you quote every week.",
        "figure": {
          "name": "check",
          "alt": "Prove your rules on one product line before expanding across the catalogue",
          "caption": "Prove your rules on one product line before expanding across the catalogue.",
          "motion": "pointer"
        }
      }
    ],
    "close": {
      "line": "Start with one product line you quote every week.",
      "ask": "Want us to look at one product line with you? You ask for an audit.",
      "cta": {
        "to": "/call",
        "label": "Ask for a quote"
      }
    },
    "dropFaq": true
  },
  "/guides/private-ai-popia": {
    "heading": "Private AI does not make you POPIA-compliant, map data first.",
    "article": {
      "pain": "Private AI or a paid ChatGPT plan does not make you POPIA-compliant on its own.",
      "wayOut": "Keeping processing on local equipment can reduce some exposure. But you still need lawful purpose, data limits, and human checks.",
      "learnItems": [
        "You learn how to map information, purpose, access, and retention before choosing a private AI setup",
        "You learn what on-premise processing changes under POPIA and what still requires governance and legal review"
      ],
      "why": "GrowthCred is a Johannesburg AI implementation and training company. I teach AI at Melsoft Academy. I helped build an isiZulu and English speech AI system. It was presented at Parliament in Cape Town.",
      "minutes": 3,
      "mentions": [
        {
          "text": "If you need help giving a system clear business context. Choosing which information a task may use. You start with the AI Implementation Guide. It helps structure the task so your team. Lawyer have a clearer workflow to review.",
          "phrase": "AI Implementation Guide",
          "href": "/ai-implementation-guide"
        }
      ],
      "hero": {
        "name": "tools",
        "alt": "You define what data is needed, who can reach it. And who checks your result first",
        "caption": "You define what data is needed, who can reach it. And who checks your result first."
      }
    },
    "sections": [
      {
        "title": "You start with the information, purpose, and connected tools first",
        "paragraphs": [],
        "figureCaption": "You define what data is needed, who can reach it. And who checks your result first.",
        "points": {
          "problem": [
            "Buying hardware or tools first ignores personal information.",
            "Confidentiality duties in client files. Unchecked connected tools, storage,. Access can pull in data your task never needed."
          ],
          "fix": [
            "You list the information in the task.",
            "Its lawful purpose, who may use it, and connected tools. Strip unnecessary data, set access. Retention rules, and name who checks outputs."
          ]
        },
        "line": "Map the information and the workflow before you deploy.",
        "figure": {
          "name": "tools",
          "alt": "You define what data is needed, who can reach it. And who checks your result first",
          "caption": "You define what data is needed, who can reach it. And who checks your result first.",
          "motion": "pointer"
        }
      },
      {
        "title": "What private AI changes, and why location alone is not enough for you",
        "paragraphs": [],
        "figureCaption": "Local processing shifts where data runs. But security and workflow design still matter.",
        "points": {
          "problem": [
            "Sending files to outside AI tools creates one set of exposure risks.",
            "Local equipment is not automatically safe if permissions are weak. Backups are unsafe, or workflows leak."
          ],
          "fix": [
            "Use private equipment inside your business.",
            "You want local control over processing and retention. Audit permissions, backups, and workflow design across your whole setup. Not just hardware location."
          ]
        },
        "line": "Private is a design choice. Compliance is your work around it.",
        "figure": {
          "name": "check",
          "alt": "Local processing shifts where data runs. But security and workflow design still matter for you",
          "caption": "Local processing shifts where data runs. But security and workflow design still matter.",
          "motion": "bubble"
        }
      },
      {
        "title": "What POPIA and human oversight still ask of your team",
        "paragraphs": [],
        "figureCaption": "Safeguards, transfer checks, and human review stay essential even with private setups.",
        "points": {
          "problem": [
            "POPIA sections 19 to 22 require reasonable safeguards.",
            "Operator agreements, while section 72 covers cross-border transfers. Connected tools, support, backups. Or people can still move data or produce flawed outputs."
          ],
          "fix": [
            "Review operator terms, trace every data route including section 72 transfers.",
            "And have your lawyer check workflows. You keep a human responsible to review outputs. Anything reaches a client or changes a record."
          ]
        },
        "line": "You keep a human responsible for outputs. They reach a client or record.",
        "figure": {
          "name": "lock",
          "alt": "Safeguards, transfer checks, and human review stay essential even with private setups for you",
          "caption": "Safeguards, transfer checks, and human review stay essential even with private setups.",
          "motion": "pointer"
        }
      },
      {
        "title": "You run a safe test on sample data before real records",
        "paragraphs": [],
        "figureCaption": "Validate your workflow on non-personal sample data. Recheck controls when things change.",
        "points": {
          "problem": [
            "Testing a new workflow directly on live client files risks exposure.",
            "Controls are proven. Controls can drift if underlying data, tools. Or workflows change later without rechecking."
          ],
          "fix": [
            "You test one recurring task on sample data without personal information.",
            "Then get sign-off before approved data. Record chosen controls, measure improvements,. Recheck them whenever data or workflows change."
          ]
        },
        "line": "You start with a sample without personal information. And get sign-off before approved data.",
        "figure": {
          "name": "check",
          "alt": "Validate your workflow on non-personal sample data. Recheck controls when things change for you",
          "caption": "Validate your workflow on non-personal sample data. Recheck controls when things change.",
          "motion": "pointer"
        }
      }
    ],
    "close": {
      "line": "You start with a sample without personal information. And get sign-off before approved data.",
      "ask": "Want a clear view of how a workflow handles information. Changing tools. Review the workflow with your lawyer. Reach out if you want to map the process.",
      "cta": {
        "to": "/call",
        "label": "Ask for a quote"
      }
    },
    "dropFaq": true
  },
  "/guides/staff-chatgpt-client-files-popia": {
    "heading": "Staff pasting client files into ChatGPT risks POPIA, check workflows first.",
    "article": {
      "pain": "You run a South African law firm or accounting practice.",
      "wayOut": "Suspect staff paste client files into ChatGPT. There is no blanket yes or no, and you stay responsible. So review workflows with a lawyer first.",
      "learnItems": [
        "You learn why neither a paid plan nor a company login settles POPIA or confidentiality duties on its own",
        "How to run a one-task check this week before taking the workflow to your Information Officer and lawyer"
      ],
      "why": "GrowthCred is a Johannesburg AI implementation and training company. I teach AI at Melsoft Academy. I helped build an isiZulu and English speech AI system. It was presented at Parliament in Cape Town.",
      "minutes": 3,
      "mentions": [
        {
          "text": "If you want to map how a task works. Choosing any tool, get your AI Implementation Guide. It helps structure your work and data boundaries. You have a clear note to discuss internally and with your lawyer.",
          "phrase": "AI Implementation Guide",
          "href": "/ai-implementation-guide"
        }
      ],
      "hero": {
        "name": "lock",
        "alt": "Tool labels and paid accounts do not replace checking the workflow with your lawyer",
        "caption": "Tool labels and paid accounts do not replace checking the workflow with your lawyer."
      }
    },
    "sections": [
      {
        "title": "Why there is no blanket yes or no under POPIA for you",
        "paragraphs": [],
        "figureCaption": "Tool labels and paid accounts do not replace checking the workflow with your lawyer.",
        "points": {
          "problem": [
            "POPIA does not ban every AI tool.",
            "Nor does paying for a tool or using a work login clear it. Client files can carry both personal information. Protected contractual or professional secrets."
          ],
          "fix": [
            "You check what data moves, why it moves, who processes it.",
            "And where it goes in each workflow. Have a lawyer review your specific facts rather than relying on tool names or plans."
          ]
        },
        "line": "A paid plan is not your legal answer. A company login is not either.",
        "figure": {
          "name": "lock",
          "alt": "Tool labels and paid accounts do not replace checking the workflow with your lawyer",
          "caption": "Tool labels and paid accounts do not replace checking the workflow with your lawyer.",
          "motion": "bubble"
        }
      },
      {
        "title": "What private AI changes, and what it still cannot settle for you",
        "paragraphs": [],
        "figureCaption": "Private setups reduce public-chat exposure. But access, retention, and cross-border rules still apply.",
        "points": {
          "problem": [
            "Pasting files into public chat tools exposes data outside agreed controls.",
            "Even local or private systems can leak via weak access. Bad backups, exports, or section 72 transfers."
          ],
          "fix": [
            "You use private AI on approved equipment.",
            "A scoped Company Brain with source links when appropriate. You keep lawful purpose, data limits, retention rules, human output checks. And section 72 legal advice in place."
          ]
        },
        "line": "Location is not the whole job. A system in your office can still leak.",
        "figure": {
          "name": "split",
          "alt": "Private setups reduce public-chat exposure. But access, retention, and cross-border rules still apply for you",
          "caption": "Private setups reduce public-chat exposure. But access, retention, and cross-border rules still apply.",
          "motion": "bubble"
        }
      },
      {
        "title": "You run this one-task check this week before using live files",
        "paragraphs": [],
        "figureCaption": "You map one task with dummy data first. You get sign-off before live client files.",
        "points": {
          "problem": [
            "Vague habits on busy days lead staff to improvise with client information.",
            "Putting live client files into a prompt before review creates avoidable risk."
          ],
          "fix": [
            "You pick one chat task, list needed fields.",
            "You test with made-up data if enough. You name an approver. And write one clear rule line. Stop and take that note to your Information Officer. Lawyer before using live client files."
          ]
        },
        "line": "A client file is not a test prompt.",
        "figure": {
          "name": "list",
          "alt": "You map one task with dummy data first. You get sign-off before live client files",
          "caption": "You map one task with dummy data first. You get sign-off before live client files.",
          "motion": "pointer"
        }
      }
    ],
    "close": {
      "line": "A client file is not a test prompt.",
      "ask": "Want help mapping one workflow before legal sign-off? Ask for an audit, with your lawyer reviewing the legal call.",
      "cta": {
        "to": "/call",
        "label": "Ask for a quote"
      }
    },
    "dropFaq": true
  },
  "/guides/stop-training-every-new-hire": {
    "heading": "Hiring repeats the same job on you. A role trainer stops it.",
    "article": {
      "pain": "Every new hire still pulls answers out of your head one question at a time.",
      "wayOut": "A New Hire Trainer can teach one role from your own notes. Scripts and calls while you keep control.",
      "learnItems": [
        "You learn how to stop repeating basic role answers every time someone new starts",
        "Where a New Hire Trainer helps a new hire and where your sign-off stays"
      ],
      "why": "GrowthCred is a Johannesburg AI implementation and training company. I teach AI at Melsoft Academy. I helped build an isiZulu and English speech AI system. It was presented at Parliament in Cape Town.",
      "minutes": 4,
      "mentions": [
        {
          "text": "If this sounds like your hiring month. Read your AI Implementation Guide first. You can map one role on paper before changing anything else. There is no rush to overhaul your whole business at once. And you start with a single role you already know well.",
          "phrase": "AI Implementation Guide",
          "href": "/ai-implementation-guide"
        },
        {
          "text": "If you want help scoping that first role. GrowthCred can run an audit with you. You do not need every document sorted beforehand. You only need the role you hire most often. Your questions new starters ask first.",
          "phrase": "audit",
          "href": "/call"
        }
      ],
      "hero": {
        "name": "lock",
        "alt": "A handbook alone does not stop daily questions. Your real process lives in your head",
        "caption": "A handbook alone does not stop daily questions. Your real process lives in your head."
      }
    },
    "sections": [
      {
        "title": "You Are Still the Training Even After the Handbook",
        "paragraphs": [],
        "figureCaption": "A handbook alone does not stop daily questions. Your real process lives in your head.",
        "points": {
          "problem": [
            "New hires read a handbook.",
            "Still ask what to do for a client. What never to promise, or where to find a form. You hire for time back, spend the month sitting beside them. And pay for two people while getting one."
          ],
          "fix": [
            "Generic internet courses do not know your customers.",
            "Forms or exceptions, so you end up teaching it again. Put your real role rules in one place. A new starter can check approved notes first."
          ]
        },
        "line": "You hired for time back, not a full month of repeating yourself.",
        "figure": {
          "name": "lock",
          "alt": "A handbook alone does not stop daily questions. Your real process lives in your head",
          "caption": "A handbook alone does not stop daily questions. Your real process lives in your head.",
          "motion": "bubble"
        }
      },
      {
        "title": "Why Another Hire Does Not Fix It for you",
        "paragraphs": [],
        "figureCaption": "Without written notes, every hiring round pulls the same answers out of you again.",
        "points": {
          "problem": [
            "Another hire still needs your way of doing the job.",
            "So they pull it out of you one question at a time. Repeating what you already know is an easy trap,. Ignoring it leaves your next hire starting from zero."
          ],
          "fix": [
            "You write the job down once instead of re-explaining it every few months.",
            "Let a new person ask the notes before they interrupt you."
          ]
        },
        "line": "Ignoring your repeat loop just means the next hire starts from zero too.",
        "figure": {
          "name": "groups",
          "alt": "Without written notes, every hiring round pulls the same answers out of you again",
          "caption": "Without written notes, every hiring round pulls the same answers out of you again.",
          "motion": "ring"
        }
      },
      {
        "title": "What your New Hire Trainer Does Inside the Business",
        "paragraphs": [],
        "figureCaption": "A role trainer answers from approved notes. Stays quiet when a rule is not written down.",
        "points": {
          "problem": [
            "New starters get stuck on routine questions when you are busy.",
            "While existing staff also need clear company facts. Unchecked answers can drift if there is no clear boundary between a new starter's training path. Your rest of the team."
          ],
          "fix": [
            "Use a New Hire Trainer for one role using your scripts, notes.",
            "Calls, kept inside your business and never customer-facing. Point answers to approved notes. Leave gaps as questions if a note is silent. And keep broader team facts in a Company Brain."
          ]
        },
        "line": "The trainer is for someone who is new. Your Company Brain is for someone who already works here.",
        "figure": {
          "name": "split",
          "alt": "A role trainer answers from approved notes. Stays quiet when a rule is not written down for you",
          "caption": "A role trainer answers from approved notes. Stays quiet when a rule is not written down.",
          "motion": "bubble"
        }
      },
      {
        "title": "What Stays With You on Judgement and Sign-Off",
        "paragraphs": [],
        "figureCaption": "You stay in charge of sign-off. Tough calls and your accuracy of the notes.",
        "points": {
          "problem": [
            "Awkward clients, edge cases.",
            "Unrecorded exceptions need human judgement that notes alone cannot settle. If your notes are wrong. A trainer built on them will teach your wrong job."
          ],
          "fix": [
            "You keep final say on what good looks like and sign off.",
            "New hires face a customer, a site or a regulator. Own and update your source notes yourself so the role stays accurate."
          ]
        },
        "line": "You still make the judgement calls, and you own the notes.",
        "figure": {
          "name": "paste",
          "alt": "You stay in charge of sign-off. Tough calls and your accuracy of the notes",
          "caption": "You stay in charge of sign-off. Tough calls and your accuracy of the notes.",
          "motion": "bubble"
        }
      },
      {
        "title": "You start With One Role and Measure the Days",
        "paragraphs": [],
        "figureCaption": "Pick one frequent hire first and track your own before-and-after days.",
        "points": {
          "problem": [
            "Trying to fix every role at once stalls. Your first hiring cycle even finishes.",
            "Without a baseline, it is hard to see whether onboarding is actually taking fewer days of your time."
          ],
          "fix": [
            "Pick the role you hire most often.",
            "You write the first week: common questions. Tasks they must not do alone yet. You write down how many days it takes before they work. You in the chair, both before and after."
          ]
        },
        "line": "You start with one role, write the first week down. And measure your days yourself.",
        "figure": {
          "name": "list",
          "alt": "Pick one frequent hire first and track your own before-and-after days",
          "caption": "Pick one frequent hire first and track your own before-and-after days.",
          "motion": "bubble"
        }
      }
    ],
    "close": {
      "line": "You start with one role, write the first week down. And measure your days yourself.",
      "ask": "Want us to start with one role? You ask for an audit.",
      "cta": {
        "to": "/call",
        "label": "Ask for a quote"
      }
    },
    "faq": [],
    "dropFaq": false
  }
};

/** Keep titles, descriptions, answers, intros and sources. Swap in the rewrite. */
export function applyGeminiOverlay(pages: SearchPage[]): SearchPage[] {
  return pages.map((page) => {
    const overlay = GEMINI_OVERLAY[page.path];
    if (!overlay) return page;
    const { dropFaq, ...rest } = overlay;
    const next: SearchPage = {
      ...page,
      ...rest,
      title: page.title,
      description: page.description,
      answer: page.answer,
      intro: page.intro,
      sources: page.sources,
      related: page.related,
      published: page.published,
      updated: page.updated,
      noindex: page.noindex,
      introLink: page.introLink,
      guide: page.guide,
      ctas: page.ctas,
    };
    if (dropFaq) delete next.faq;
    return next;
  });
}
