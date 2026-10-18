// Builds skills/<name>/ from templates/ and shared/, then checks each SKILL.md
// against the Agent Skills spec (https://agentskills.io/specification).
import { copyFileSync, mkdirSync, readFileSync, readdirSync, writeFileSync } from "node:fs";

const how = readFileSync("shared/how.md", "utf8").trim();
const honest = readFileSync("shared/honesty.md", "utf8").trim();
let failed = false;

for (const file of readdirSync("templates")) {
  const name = file.replace(/\.md$/, "");
  const dir = `skills/${name}`;
  mkdirSync(`${dir}/scripts`, { recursive: true });
  mkdirSync(`${dir}/references`, { recursive: true });
  const body = readFileSync(`templates/${file}`, "utf8").replace("{{HOW}}", how).replace("{{HONEST}}", honest);
  writeFileSync(`${dir}/SKILL.md`, body);
  copyFileSync("shared/atsprep.mjs", `${dir}/scripts/atsprep.mjs`);
  copyFileSync("shared/tools.md", `${dir}/references/tools.md`);
  copyFileSync("shared/privacy.md", `${dir}/references/privacy.md`);

  const front = body.match(/^---\n([\s\S]*?)\n---\n/)?.[1] ?? "";
  const field = (key) => front.match(new RegExp(`^${key}: (.*)$`, "m"))?.[1]?.trim() ?? "";
  const errors = [];
  if (field("name") !== name) errors.push("name must match the folder");
  if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(name) || name.length > 64) errors.push("bad name");
  const description = field("description");
  if (!description || description.length > 1024) errors.push(`description length ${description.length}`);
  if (field("compatibility").length > 500) errors.push("compatibility too long");
  if (body.split("\n").length > 500) errors.push("SKILL.md over 500 lines");
  if (/\{\{/.test(body)) errors.push("unfilled placeholder");
  if (errors.length) {
    failed = true;
    console.error(`${name}: ${errors.join(", ")}`);
  } else console.log(`ok ${name} (${description.length} char description)`);
}
process.exit(failed ? 1 : 0);
