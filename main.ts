// main.ts — gta6-meme-x-01 entry program (Node 22, stdlib only).
// Copies POST.json from this repository to the output directory.
// The post itself (read from X by the house) is the entry; this program
// only hands the house the post's address.
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const repoRoot = dirname(fileURLToPath(import.meta.url));
const outDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";

const post = readFileSync(join(repoRoot, "POST.json"));
// Fail loudly on a malformed post file instead of handing the house one
// it cannot read: POST.json must be a JSON object with a url string.
const parsed = JSON.parse(post.toString("utf8"));
if (typeof parsed !== "object" || parsed === null || typeof parsed.url !== "string") {
  console.error("POST.json must be a JSON object with a url string");
  process.exit(1);
}
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "POST.json"), post);
