import { stat } from "node:fs/promises";
import path from "node:path";

const ROOT = process.cwd();
const REQUIRED_OUTPUTS = [
  "dist/.nojekyll",
  "dist/index.html",
  "dist/assets/style.css",
  "dist/assets/img/hero-crab-trellis.webp",
  "dist/assets/img/harness-greenhouses.webp",
  "dist/assets/img/og-card.jpg",
];

async function main() {
  for (const relativePath of REQUIRED_OUTPUTS) {
    const absolutePath = path.join(ROOT, relativePath);

    try {
      const fileStat = await stat(absolutePath);

      if (!fileStat.isFile()) {
        throw new Error("not a file");
      }
    } catch {
      console.error(`Missing required build output: ${relativePath}`);
      process.exitCode = 1;
      return;
    }
  }

  console.log("Build smoke test passed.");
}

await main();
