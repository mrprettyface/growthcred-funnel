# The two POPIA guides: what changed from the drafts

Published 13 October 2026, by Phila Ngwenya:

- `/guides/private-ai-popia-compliance`: "How does private AI help with POPIA compliance?"
- `/guides/chatgpt-client-files-popia`: "Can your staff paste client files into ChatGPT?"

Both drafts were supplied as Markdown. Their argument, structure, FAQ and
disclaimer were kept. These changes were made so they keep the site's rules
(CLAUDE.md, docs/editorial/VOICE.md, PRODUCT.md).

## Facts checked (13 Oct 2026)

| Claim | Source | Result |
|---|---|---|
| s 72: transfer abroad needs adequate protection, consent or another listed ground | popia.co.za s 72; Michalsons | Correct |
| s 21: an operator must be bound by a written contract to keep s 19 security measures | Act text; popia.co.za s 21 | Correct |
| s 19: reasonable technical and organisational security measures | Act text | Correct |
| s 22: notify the Regulator and the data subject, as soon as reasonably possible | popia.co.za s 22; Regulator guidance | Correct |
| Administrative fine up to R10 million | MJ Kotze Inc (s 109(2)(c)) | Correct. Fines issued so far are R5 million or less |
| 78% of AI users bring their own AI tools to work | Microsoft and LinkedIn, 2024 Work Trend Index (31,000 people, 31 countries) | Correct; added as the source for "staff use it anyway" |

## Changed

- **Unsourced claims removed or turned into questions** (VOICE.md rule 1):
  "Many firms have neither", "Most firms where staff use personal AI accounts
  have neither", "Most owners don't", "Most popular AI tools process data on
  servers abroad", and "a private AI ... often does better". Each is now a
  question the reader answers, a conditional ("If the tool processes it
  abroad"), or a sourced figure (the 78%).
- **Revenue range dropped.** The FAQ said "R5M to over R200M"; PRODUCT.md
  records the audience as R20M–R500M, and the homepage FAQ still says R5M+.
  The guide now says "owner-led firms" until Phila settles the range.
- **"No outside company holds your data" made exact.** GrowthCred looks after
  the system, so it may be an operator under s 21. The page says the access we
  have is agreed in writing before anything goes in (the commitment already on
  `/private-ai` and the homepage FAQ).
- **"Equipment your business owns" → "equipment inside your business"**, with
  "you own the equipment" kept where the comparison needs it. Matches
  `/private-ai` ("We choose it. We deploy it. We run it. You own it.").
- **The comparison table became three paragraphs.** Search pages have no table
  component; the six rows are all still there.
- **Bullets cut to the two real checklists** ("What you still have to do",
  "Do this this week"). The POPIA-sections list and "what counts" list are
  paragraphs, per VOICE.md.
- **Absolute links made internal.** `/call`, `/private-ai` and the other guide
  are in-site links, related cards and sidebar buttons. The WhatsApp link was
  dropped from the body: every page's footer already carries it, with the same
  number (`src/lib/contact.ts`).
- **Mid-article guide offer and closing Apply** added (VOICE.md steps 6–8). The
  offer line avoids "inside the tools you already use", which would contradict
  the article.
- **Titles fitted to 50–60 characters** for the SEO gate.

## Open, for Phila

- Neither page has first-hand evidence yet. Both are queued in
  `docs/search/HUMAN-LAYER.md` with four questions.
- Have an attorney read them before promoting them. The pages carry the
  "not legal advice" line from the drafts.
