import { cp, rm, writeFile } from "node:fs/promises";
import path from "node:path";

const DIST_DIR = "dist";
const SITE_FILES = ["index.html"];
const SITE_DIRS = ["assets"];

async function main() {
  await rm(DIST_DIR, { force: true, recursive: true });

  for (const dir of SITE_DIRS) {
    await cp(dir, path.join(DIST_DIR, dir), { recursive: true });
  }

  for (const file of SITE_FILES) {
    await cp(file, path.join(DIST_DIR, file));
  }

  await writeFile(path.join(DIST_DIR, ".nojekyll"), "");

  console.log(`Site built into ${DIST_DIR}/.`);
}

await main();
