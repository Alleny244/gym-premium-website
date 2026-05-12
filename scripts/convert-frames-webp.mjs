/**
 * Converts all dumbbell PNG frames to WebP for faster initial load.
 * Run once: node scripts/convert-frames-webp.mjs
 * Output: public/dumbbell-webp/ezgif-frame-NNN.webp
 */
import { createRequire } from "module";
import { existsSync, mkdirSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const require = createRequire(import.meta.url);
const sharp = require("sharp");

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const SRC = join(root, "public", "dumbbell");
const DEST = join(root, "public", "dumbbell-webp");
const TOTAL = 192;
// Target long edge – 1280px is plenty for a full-bleed canvas on most screens
const MAX_WIDTH = 1280;

if (!existsSync(DEST)) mkdirSync(DEST, { recursive: true });

const CONCURRENCY = 8; // parallel conversions at a time

async function convertOne(i) {
  const pad = String(i + 1).padStart(3, "0");
  const src = join(SRC, `ezgif-frame-${pad}.png`);
  const dst = join(DEST, `ezgif-frame-${pad}.webp`);
  if (!existsSync(src)) {
    console.warn(`  MISSING: ${src}`);
    return;
  }
  await sharp(src)
    .resize({ width: MAX_WIDTH, withoutEnlargement: true })
    .webp({ quality: 82, effort: 4 })
    .toFile(dst);
}

async function run() {
  console.log(`Converting ${TOTAL} frames PNG → WebP (${MAX_WIDTH}px wide, q82)…`);
  const start = Date.now();

  for (let batch = 0; batch < TOTAL; batch += CONCURRENCY) {
    const jobs = [];
    for (let j = batch; j < Math.min(batch + CONCURRENCY, TOTAL); j++) {
      jobs.push(convertOne(j));
    }
    await Promise.all(jobs);
    const done = Math.min(batch + CONCURRENCY, TOTAL);
    process.stdout.write(`\r  ${done}/${TOTAL}`);
  }

  const elapsed = ((Date.now() - start) / 1000).toFixed(1);
  console.log(`\nDone in ${elapsed}s → ${DEST}`);
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
