// Builds shared/tools.md from a tools/list dump (tools/tools-list.json).
import { readFileSync, writeFileSync } from "node:fs";
const tools = JSON.parse(readFileSync("tools/tools-list.json", "utf8"));
const ai = new Set(["tailor_resume", "improve_bullet", "write_summary", "review_interview_answer"]);
let md = `# ATSPrep MCP tools\n\nEndpoint: \`https://atsprep.com/mcp\` (MCP streamable HTTP, no auth). Call any tool with:\n\n\`\`\`sh\nnode scripts/atsprep.mjs <tool> key=value key=@file.txt\n\`\`\`\n\nOr, if the ATSPrep MCP server is connected to your agent, call the tool directly by name.\nTools marked **AI** also send their text to Cloudflare Workers AI (see privacy.md); all others are rule-based.\n\n`;
for (const t of tools) {
  md += `## ${t.name}${ai.has(t.name) ? " (AI)" : ""}\n\n${t.description}\n\n`;
  const props = t.inputSchema?.properties ?? {};
  const req = new Set(t.inputSchema?.required ?? []);
  const keys = Object.keys(props);
  if (keys.length) {
    md += `| Argument | Type | Required | Notes |\n| --- | --- | --- | --- |\n`;
    for (const k of keys) {
      const p = props[k];
      const type = p.enum ? p.enum.join(" \\| ") : p.type ?? "string";
      const notes = [p.description ?? "", p.maxLength ? `max ${p.maxLength} chars` : ""].filter(Boolean).join(" ").replace(/\|/g, "\\|");
      md += `| \`${k}\` | ${type} | ${req.has(k) ? "yes" : "no"} | ${notes} |\n`;
    }
    md += "\n";
  } else md += "No arguments.\n\n";
}
writeFileSync("shared/tools.md", md);
console.log(tools.length, "tools");
