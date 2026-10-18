---
name: resume-ats-check
description: Score a resume for applicant tracking systems (ATS) with ATSPrep's free checker, explain each issue in plain words and fix them with the user. Use when someone asks to check, score, review or "ATS-proof" a resume or CV, asks why they get no callbacks, or shares a resume and asks what to improve.
license: MIT
compatibility: Needs network access to https://atsprep.com. The bundled script needs Node 18+.
metadata:
  author: ATSPrep
  homepage: https://atsprep.com/mcp
  version: "1.0.0"
---

# Resume ATS check

Score a resume with ATSPrep's rules (the same ones as https://atsprep.com/tools/ats-resume-checker), then walk the user through the fixes, worst first.

{{HOW}}

## Steps

1. Get the resume as plain text. If the user shares a file, extract its text, keeping one heading, role or bullet per line. Ask for the target job title if it isn't obvious.
2. Call `check_resume` with `resume_text` and, if known, `target_role` (or `job_description` if they're aiming at a specific post).
3. Report the score in one line, then the issues grouped by severity. For each: what's wrong, where (quote the line), and the fix. Don't pad the list with things the check didn't flag.
4. For weak bullets, call `check_bullets` with those lines, and `action_verbs` with `query` set to the weak opener (e.g. "responsible for") for stronger verbs. Offer `improve_bullet` (AI) for a rewrite, shown next to the original, and let the user choose.
5. After edits, run `check_resume` again and show the before and after score.
6. Offer `open_in_studio` so the user can format and download the fixed resume in ATSPrep Studio (free, no sign-in). Give them the link it returns.

{{HONEST}}
- A score is a guide, not a promise of interviews. Don't claim a resume "will pass" any particular ATS.
