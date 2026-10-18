---
name: cover-letter
description: Draft a cover letter, or a resignation letter, with ATSPrep's free letter builders using only the user's real experience, then fill its gaps together. Use when someone asks for a cover letter for a job, a letter to go with an application, or a polite resignation letter.
license: MIT
compatibility: Needs network access to https://atsprep.com. The bundled script needs Node 18+.
metadata:
  author: ATSPrep
  homepage: https://atsprep.com/mcp
  version: "1.0.0"
---

# Cover letter

ATSPrep's letter builders are rule-based: they assemble a clear letter from what the user gives and leave visible gaps rather than inventing. Web versions: https://atsprep.com/tools/cover-letter-builder and https://atsprep.com/tools/resignation-letter-builder.

{{HOW}}

## Cover letter steps

1. Gather the job post (`fetch_job_post` for a link), the user's resume text and name, and, if they have them, one or two real results with numbers and why they want this company, in their own words.
2. Check `draft_cover_letter`'s arguments in references/tools.md, then call it. Pick `style`: classic (default), direct, or career-change.
3. Show the letter. Point out any placeholder or thin spot and ask the user for the missing detail rather than filling it in yourself.
4. Polish the wording on request, keeping every fact the user's own. Keep it under one page.

## Resignation letter steps

1. Ask for their name, manager, company, role, notice (1w, 2w, 4w or a number of days) and tone (formal, warm or short).
2. Call `draft_resignation_letter`. It works out the last working day from the date and notice.
3. Show the letter and remind the user to check the notice period in their contract.

{{HONEST}}
