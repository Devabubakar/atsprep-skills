---
name: linkedin-profile-polish
description: Check and improve a LinkedIn headline and About section with ATSPrep's rules - score what's there, explain the issues, and write keyword-rich headline options from the user's real role and skills. Use when someone asks to improve, rewrite or review their LinkedIn headline, summary, About section or profile.
license: MIT
compatibility: Needs network access to https://atsprep.com. The bundled script needs Node 18+.
metadata:
  author: ATSPrep
  homepage: https://atsprep.com/mcp
  version: "1.0.0"
---

# LinkedIn profile polish

Web versions: https://atsprep.com/tools/linkedin-headline-generator and https://atsprep.com/tools/linkedin-about-checker.

{{HOW}}

## Steps

1. Ask for the current headline, the About section, and the job title they want to be found for.
2. Call `check_linkedin_headline` with `headline` (references/tools.md lists the optional fields). Explain each issue in a line or two.
3. Call `generate_linkedin_headline` with `role` and whatever the user gave (`years`, skills, `results` with their real numbers). Offer three or four options and say why each works.
4. Call `check_linkedin_about` with `about`. Walk through the findings: the opening lines shown before "see more", keywords, proof and a call to action.
5. Help rewrite the About section in the user's voice, using only facts they've given. Run `check_linkedin_about` again on the new version.
6. If they're also job hunting, suggest the resume-ats-check skill or `check_resume`.

{{HONEST}}
- Keep the headline within LinkedIn's 220 characters and lead with the role they want to be found for.
