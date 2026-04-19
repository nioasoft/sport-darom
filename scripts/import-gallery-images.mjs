#!/usr/bin/env node
/**
 * Import Gallery Images
 *
 * Converts all images from `public/images/תמונות לאתר/<hebrew-sport>/`
 * to WebP and writes them numbered into `public/images/sports/<slug>/`.
 *
 * Deletes existing `.webp` files in each target folder first so the result
 * is deterministic and duplicate-free (source of truth = Hebrew folders).
 *
 * Emits a manifest at `scripts/gallery-manifest.json` that the images.ts
 * config can be regenerated from.
 */

import sharp from 'sharp';
import { readdir, mkdir, rm, writeFile } from 'fs/promises';
import { join, extname } from 'path';
import { existsSync } from 'fs';

const ROOT = 'public/images';
const SOURCE_DIR = join(ROOT, 'תמונות לאתר');
const TARGET_DIR = join(ROOT, 'sports');

// Hebrew folder name → sport slug used in the app.
const SLUG_MAP = {
  'שחייה': 'swimming',
  'אתלטיקה': 'athletics',
  'אופני יד': 'hand-cycling',
  'כדור שער': 'goalball',
  'חץ וקשת': 'archery',
  'כדורסל כיסאות גלגלים': 'wheelchair-basketball',
  'בוצ_ה': 'bocce',
  'ג_ודו': 'judo',
};

const WEBP_OPTS = { quality: 82, effort: 6 };
const MAX_DIM = { width: 1920, height: 1920 };

async function cleanTargetWebps(dir) {
  if (!existsSync(dir)) {
    await mkdir(dir, { recursive: true });
    return;
  }
  const entries = await readdir(dir);
  await Promise.all(
    entries
      .filter((f) => f.toLowerCase().endsWith('.webp'))
      .map((f) => rm(join(dir, f), { force: true }))
  );
}

async function convertOne(inputPath, outputPath) {
  const image = sharp(inputPath, { failOn: 'none' }).rotate();
  const metadata = await image.metadata();

  const needResize =
    metadata.width > MAX_DIM.width || metadata.height > MAX_DIM.height;

  const pipeline = needResize
    ? image.resize({
        width: MAX_DIM.width,
        height: MAX_DIM.height,
        fit: 'inside',
        withoutEnlargement: true,
      })
    : image;

  await pipeline.webp(WEBP_OPTS).toFile(outputPath);

  const out = await sharp(outputPath).metadata();
  const orientation = out.width >= out.height ? 'horizontal' : 'vertical';
  return { orientation, width: out.width, height: out.height };
}

async function processSport(hebrewName, slug) {
  const sourceDir = join(SOURCE_DIR, hebrewName);
  const targetDir = join(TARGET_DIR, slug);

  if (!existsSync(sourceDir)) {
    console.warn(`⚠  Missing source folder: ${sourceDir}`);
    return [];
  }

  await cleanTargetWebps(targetDir);

  const files = (await readdir(sourceDir))
    .filter((f) => ['.jpg', '.jpeg', '.png', '.webp'].includes(extname(f).toLowerCase()))
    // Stable order so manifests are reproducible.
    .sort((a, b) => a.localeCompare(b, 'he'));

  const entries = [];
  let index = 1;

  for (const file of files) {
    const inputPath = join(sourceDir, file);
    const pad = String(index).padStart(2, '0');
    const outputName = `${pad}.webp`;
    const outputPath = join(targetDir, outputName);

    try {
      const { orientation, width, height } = await convertOne(inputPath, outputPath);
      entries.push({
        slug,
        src: `sports/${slug}/${outputName}`,
        orientation,
        width,
        height,
        sourceFile: file,
      });
      console.log(
        `  ✓ ${slug}/${outputName}  (${orientation}, ${width}x${height})  ← ${file}`
      );
      index++;
    } catch (err) {
      console.error(`  ✗ Failed ${file}: ${err.message}`);
    }
  }

  return entries;
}

async function main() {
  console.log('=== Importing sport gallery images ===\n');

  const manifest = {};
  let total = 0;

  for (const [hebrewName, slug] of Object.entries(SLUG_MAP)) {
    console.log(`\n[${slug}] ${hebrewName}`);
    const entries = await processSport(hebrewName, slug);
    manifest[slug] = entries;
    total += entries.length;
  }

  await writeFile(
    'scripts/gallery-manifest.json',
    JSON.stringify(manifest, null, 2),
    'utf8'
  );

  console.log(`\n=== Done. ${total} images imported across ${Object.keys(manifest).length} sports ===`);
  console.log('Manifest written to scripts/gallery-manifest.json');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
