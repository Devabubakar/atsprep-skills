# ATSPrep Agent Skills

Five free, open-source [Agent Skills](https://agentskills.io) that teach Claude, ChatGPT Codex, GitHub Copilot, Cursor and other agents to use [ATSPrep](https://atsprep.com)'s resume and job-search tools well: which tool to call, in what order, and to ask before adding anything to your resume.

| Skill | What it does |
| --- | --- |
| [`resume-ats-check`](skills/resume-ats-check/SKILL.md) | Scores a resume with ATSPrep's ATS rules and walks through the fixes, worst first. |
| [`tailor-resume-to-job`](skills/tailor-resume-to-job/SKILL.md) | Matches a resume to a job post (link or text), shows missing keywords and rewrites your own lines honestly. |
| [`interview-prep`](skills/interview-prep/SKILL.md) | A mock interview, one question at a time, with STAR feedback and a stronger answer. |
| [`cover-letter`](skills/cover-letter/SKILL.md) | Drafts a cover letter (or resignation letter) from your real experience and fills the gaps with you. |
| [`linkedin-profile-polish`](skills/linkedin-profile-polish/SKILL.md) | Checks your LinkedIn headline and About section and writes headline options. |

Each skill calls the free ATSPrep MCP server at `https://atsprep.com/mcp`. There's no account and no API key. If your agent has the ATSPrep MCP server connected, the skill uses its tools directly; if not, it runs the bundled `scripts/atsprep.mjs` (Node 18+, no dependencies), or plain HTTPS.

## Install

### Any agent (Claude Code, Codex, Copilot, Cursor, Gemini CLI and more)

```sh
npx skills add Devabubakar/atsprep-skills
```

The [`skills`](https://www.npmjs.com/package/skills) CLI asks which skills and which agents to install for.

### GitHub Copilot (CLI, VS Code, coding agent)

```sh
gh skill install Devabubakar/atsprep-skills --all --agent github-copilot --scope user
```

Needs a recent GitHub CLI ([`gh skill`](https://cli.github.com/manual/gh_skill_install) is in preview). Or copy any folder from `skills/` into `~/.copilot/skills/` (for you) or `.github/skills/` (for one repository).

### Claude Code

```text
/plugin marketplace add Devabubakar/atsprep-skills
/plugin install atsprep@atsprep-skills
```

Or copy folders from `skills/` into `~/.claude/skills/` (for you) or `.claude/skills/` (for one project). [Claude Code skills docs](https://code.claude.com/docs/en/skills).

### Claude.ai and the Claude desktop app

1. Download a skill's zip from the [latest release](https://github.com/Devabubakar/atsprep-skills/releases/latest), e.g. `resume-ats-check.zip`.
2. In Claude, go to **Customize → Skills**, select **Upload a skill**, and pick the zip.
3. Code execution and network access need to be on for the bundled script. If they aren't, connect the ATSPrep MCP server instead (below) and the skill will use it.

[Using skills in Claude](https://support.claude.com/en/articles/12512180-using-skills-in-claude).

### OpenAI Codex (CLI, IDE extension and app)

```sh
gh skill install Devabubakar/atsprep-skills --all --agent codex --scope user
```

Or copy folders from `skills/` into `~/.agents/skills/` (for you) or `.agents/skills/` (for one repository). Codex sandboxes network access by default, so allow it for `atsprep.com`, or connect the MCP server. [Codex skills docs](https://developers.openai.com/codex/skills).

## Connect the ATSPrep MCP server (optional, recommended)

The skills work best when your agent also has the ATSPrep tools connected. Setup for every client is at [atsprep.com/mcp](https://atsprep.com/mcp). For example:

```sh
claude mcp add --transport http atsprep https://atsprep.com/mcp   # Claude Code
codex mcp add atsprep --url https://atsprep.com/mcp                # Codex
```

## What leaves your machine

Most ATSPrep tools are rule-based. Four (`tailor_resume`, `improve_bullet`, `write_summary`, `review_interview_answer`) also send the text they rewrite to Llama 3.3 70B on Cloudflare Workers AI, which doesn't train on it. ATSPrep logs only the tool name, whether it worked and how long it took, never your text. Details: [references/privacy.md](shared/privacy.md) and [atsprep.com/privacy](https://atsprep.com/privacy#mcp).

## Layout

```text
skills/<name>/SKILL.md          the skill (built from templates/<name>.md)
skills/<name>/scripts/          atsprep.mjs, a zero-dependency MCP client
skills/<name>/references/       tools.md (every tool's arguments) and privacy.md
shared/, templates/, tools/     sources; run `node tools/sync.mjs` after editing
.claude-plugin/marketplace.json Claude Code plugin marketplace
```

Each skill folder follows the [Agent Skills specification](https://agentskills.io/specification): a `SKILL.md` with `name` and `description` frontmatter, plus optional `scripts/` and `references/`, so the same folder works in every client above. `node tools/sync.mjs` rebuilds the skills and checks their frontmatter against the spec.

## Try the script directly

```sh
node skills/resume-ats-check/scripts/atsprep.mjs list
node skills/resume-ats-check/scripts/atsprep.mjs check_resume resume_text=@my-resume.txt target_role="Product Designer"
node skills/tailor-resume-to-job/scripts/atsprep.mjs keyword_scan job_description=@job.txt
```

## License

MIT. ATSPrep and the ATSPrep logo are not covered by the license.

Issues and ideas: [open an issue](https://github.com/Devabubakar/atsprep-skills/issues) or email support@atsprep.com.
