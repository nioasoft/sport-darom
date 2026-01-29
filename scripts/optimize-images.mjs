#!/usr/bin/env node
/**
 * Image Optimization Script for Sport Darom
 *
 * Converts JPG/PNG images to WebP format with optimization.
 * Creates optimized versions in sports/, team/, and hero/ folders.
 *
 * Usage:
 *   node scripts/optimize-images.mjs
 *
 * Manual categorization required:
 *   After running this script, images will be in public/images/user/
 *   with .webp extension. You need to manually move them to:
 *   - public/images/sports/horizontal/ or vertical/
 *   - public/images/team/horizontal/ or vertical/
 *   - public/images/hero/
 */

import sharp from 'sharp';
import { readdir, mkdir } from 'fs/promises';
import { join, basename, extname } from 'path';
import { existsSync } from 'fs';

const INPUT_DIR = 'public/images/user';
const OUTPUT_DIR = 'public/images/optimized';

// Configuration
const CONFIG = {
  webp: {
    quality: 82,
    effort: 6,
  },
  maxWidth: 1920,
  maxHeight: 1080,
};

async function ensureDir(dir) {
  if (!existsSync(dir)) {
    await mkdir(dir, { recursive: true });
  }
}

async function optimizeImage(inputPath, outputPath) {
  try {
    const image = sharp(inputPath);
    const metadata = await image.metadata();

    // Determine if resize is needed
    let resizeOptions = {};
    if (metadata.width > CONFIG.maxWidth || metadata.height > CONFIG.maxHeight) {
      resizeOptions = {
        width: CONFIG.maxWidth,
        height: CONFIG.maxHeight,
        fit: 'inside',
        withoutEnlargement: true,
      };
    }

    await image
      .resize(resizeOptions)
      .webp(CONFIG.webp)
      .toFile(outputPath);

    const outputStats = (await sharp(outputPath).metadata());

    console.log(`✓ ${basename(inputPath)} → ${basename(outputPath)}`);
    console.log(`  Size: ${metadata.width}x${metadata.height} → ${outputStats.width}x${outputStats.height}`);

    return true;
  } catch (error) {
    console.error(`✗ Error processing ${inputPath}: ${error.message}`);
    return false;
  }
}

async function processDirectory(inputDir, outputDir) {
  const files = await readdir(inputDir);
  let processed = 0;
  let failed = 0;

  for (const file of files) {
    const ext = extname(file).toLowerCase();
    if (!['.jpg', '.jpeg', '.png', '.webp'].includes(ext)) {
      continue;
    }

    const inputPath = join(inputDir, file);
    const outputName = basename(file, ext) + '.webp';
    const outputPath = join(outputDir, outputName);

    const success = await optimizeImage(inputPath, outputPath);
    if (success) {
      processed++;
    } else {
      failed++;
    }
  }

  return { processed, failed };
}

async function main() {
  console.log('=== Sport Darom Image Optimization ===\n');

  // Process horizontal images
  const horizontalIn = join(INPUT_DIR, 'horizontal');
  const horizontalOut = join(OUTPUT_DIR, 'horizontal');

  if (existsSync(horizontalIn)) {
    await ensureDir(horizontalOut);
    console.log('\n📷 Processing horizontal images...\n');
    const hResults = await processDirectory(horizontalIn, horizontalOut);
    console.log(`\n✅ Horizontal: ${hResults.processed} processed, ${hResults.failed} failed`);
  }

  // Process vertical images
  const verticalIn = join(INPUT_DIR, 'vertical');
  const verticalOut = join(OUTPUT_DIR, 'vertical');

  if (existsSync(verticalIn)) {
    await ensureDir(verticalOut);
    console.log('\n📷 Processing vertical images...\n');
    const vResults = await processDirectory(verticalIn, verticalOut);
    console.log(`\n✅ Vertical: ${vResults.processed} processed, ${vResults.failed} failed`);
  }

  console.log('\n=== Done ===');
  console.log('\n📁 Optimized images are in: public/images/optimized/');
  console.log('\n⚠️  MANUAL STEP REQUIRED:');
  console.log('   Review the images and categorize them:');
  console.log('   1. Sports images → public/images/sports/[horizontal|vertical]/');
  console.log('   2. Team photos → public/images/team/[horizontal|vertical]/');
  console.log('   3. Hero image → public/images/hero/');
  console.log('\n   Rename files descriptively (e.g., athletics-training.webp)');
}

main().catch(console.error);
