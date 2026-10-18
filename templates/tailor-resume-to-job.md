---
name: tailor-resume-to-job
description: Tailor a resume to a specific job posting with ATSPrep - rank the posting's keywords, show which are missing, and rewrite the user's own lines in the posting's wording without inventing anything. Use when someone shares a job link or job description with their resume and asks to tailor, target, match or optimise it for that role.
license: MIT
compatibility: Needs network access to https://atsprep.com. The bundled script needs Node 18+.
metadata:
  author: ATSPrep
  homepage: https://atsprep.com/mcp
  version: "1.0.0"
---

# Tailor a resume to a job

{{HOW}}

## Steps

1. Get the job post. For a link, call `fetch_job_post` with `url`. If it says the site is blocked or the post wasn't found, ask the user to paste the post's text.
2. Get the resume as plain text (one heading, role or bullet per line).
3. Call `match_job` with `resume_text` and `job_description`. Report coverage (overall, required, preferred) and list the missing keywords, required ones first, each with the posting sentence it came from.
4. Ask which missing keywords the user genuinely has. Never assume.
5. Call `tailor_resume` (AI) with `resume_text` and `job_description`. It suggests rewrites of existing lines. Show each as original → suggestion, and keep only those the user approves. If its AI note says the model was skipped (busy, limit, budget), carry on with the rule-based result and suggest edits yourself under the honesty rules.
6. If useful, call `write_summary` (AI) with `resume_text` and `target_title` for a tailored summary.
7. Run `match_job` again on the edited resume and show the change in coverage.
8. Offer `open_in_studio` with the final text, so the user can format and download it.

{{HONEST}}
- A keyword the user doesn't have stays missing. Help them describe nearby experience truthfully instead.
