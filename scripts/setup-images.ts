#!/usr/bin/env npx ts-node

/**
 * Image Setup Script for Sport Darom
 *
 * This script helps set up the image structure for the website.
 * Run with: npx ts-node scripts/setup-images.ts
 *
 * It will:
 * 1. Create the necessary folder structure
 * 2. Copy selected images from user/ to sports/ and team/ folders
 * 3. Generate a report of missing images
 */

import * as fs from 'fs';
import * as path from 'path';

const PUBLIC_IMAGES = path.join(process.cwd(), 'public', 'images');
const OPTIMIZED_DIR = path.join(PUBLIC_IMAGES, 'optimized');
const SPORTS_DIR = path.join(PUBLIC_IMAGES, 'sports');
const TEAM_DIR = path.join(PUBLIC_IMAGES, 'team');
const HERO_DIR = path.join(PUBLIC_IMAGES, 'hero');

// Sport slugs
const SPORTS = [
  'athletics',
  'wheelchair-basketball',
  'goalball',
  'swimming',
  'bocce',
  'hand-cycling',
  'judo',
  'archery',
];

// Team member IDs
const TEAM_MEMBERS = [
  'vered',
  'gadi',
  'jordan',
  'timor',
  'lihia',
  'ofer',
  'karmit',
  'avi',
  'ruti',
];

// Hero pages
const HERO_PAGES = ['main', 'about', 'contact'];

/**
 * Image mapping configuration
 * UPDATE THESE VALUES with the actual filenames from public/images/optimized/
 *
 * Example:
 *   athletics: '0c718541-6f8e-4998-83c2-3e5abbeeea85.JPG.webp'
 */
const IMAGE_MAPPING = {
  sports: {
    // Map sport slug to filename from optimized/horizontal/
    athletics: '', // Add filename here
    'wheelchair-basketball': '',
    goalball: '',
    swimming: '',
    bocce: '',
    'hand-cycling': '',
    judo: '',
    archery: '',
  },
  team: {
    // Map team member id to filename from optimized/vertical/
    vered: '',
    gadi: '',
    jordan: '',
    timor: '',
    lihia: '',
    ofer: '',
    karmit: '',
    avi: '',
    ruti: '',
  },
  hero: {
    // Map hero page to filename from optimized/horizontal/
    main: '',
    about: '',
    contact: '',
  },
};

function ensureDirectories() {
  [SPORTS_DIR, TEAM_DIR, HERO_DIR].forEach((dir) => {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
      console.log(`Created directory: ${dir}`);
    }
  });
}

function copyImages() {
  let copied = 0;
  let missing = 0;

  // Copy sport images
  console.log('\n📸 Copying sport images...');
  for (const sport of SPORTS) {
    const sourceFile = IMAGE_MAPPING.sports[sport as keyof typeof IMAGE_MAPPING.sports];
    if (sourceFile) {
      const sourcePath = path.join(OPTIMIZED_DIR, 'horizontal', sourceFile);
      const destPath = path.join(SPORTS_DIR, `${sport}.webp`);

      if (fs.existsSync(sourcePath)) {
        fs.copyFileSync(sourcePath, destPath);
        console.log(`  ✅ ${sport}.webp`);
        copied++;
      } else {
        console.log(`  ❌ Source not found: ${sourceFile}`);
        missing++;
      }
    } else {
      console.log(`  ⚠️  No mapping for: ${sport}`);
      missing++;
    }
  }

  // Copy team images
  console.log('\n👥 Copying team images...');
  for (const member of TEAM_MEMBERS) {
    const sourceFile = IMAGE_MAPPING.team[member as keyof typeof IMAGE_MAPPING.team];
    if (sourceFile) {
      const sourcePath = path.join(OPTIMIZED_DIR, 'vertical', sourceFile);
      const destPath = path.join(TEAM_DIR, `${member}.webp`);

      if (fs.existsSync(sourcePath)) {
        fs.copyFileSync(sourcePath, destPath);
        console.log(`  ✅ ${member}.webp`);
        copied++;
      } else {
        console.log(`  ❌ Source not found: ${sourceFile}`);
        missing++;
      }
    } else {
      console.log(`  ⚠️  No mapping for: ${member}`);
      missing++;
    }
  }

  // Copy hero images
  console.log('\n🏠 Copying hero images...');
  for (const page of HERO_PAGES) {
    const sourceFile = IMAGE_MAPPING.hero[page as keyof typeof IMAGE_MAPPING.hero];
    if (sourceFile) {
      const sourcePath = path.join(OPTIMIZED_DIR, 'horizontal', sourceFile);
      const destPath = path.join(HERO_DIR, `${page}.webp`);

      if (fs.existsSync(sourcePath)) {
        fs.copyFileSync(sourcePath, destPath);
        console.log(`  ✅ ${page}.webp`);
        copied++;
      } else {
        console.log(`  ❌ Source not found: ${sourceFile}`);
        missing++;
      }
    } else {
      console.log(`  ⚠️  No mapping for: ${page}`);
      missing++;
    }
  }

  console.log(`\n📊 Summary: ${copied} copied, ${missing} missing/unmapped`);
}

function listAvailableImages() {
  console.log('\n📂 Available optimized images:\n');

  console.log('Horizontal (for sports and hero):');
  const horizontal = fs.readdirSync(path.join(OPTIMIZED_DIR, 'horizontal'));
  horizontal.forEach((file) => console.log(`  ${file}`));

  console.log('\nVertical (for team):');
  const vertical = fs.readdirSync(path.join(OPTIMIZED_DIR, 'vertical'));
  vertical.forEach((file) => console.log(`  ${file}`));
}

function main() {
  console.log('🏅 Sport Darom Image Setup\n');

  if (process.argv.includes('--list')) {
    listAvailableImages();
    return;
  }

  ensureDirectories();
  copyImages();

  console.log('\n💡 Tips:');
  console.log('  - Run with --list to see available images');
  console.log('  - Update IMAGE_MAPPING in this script with your chosen images');
  console.log('  - Horizontal images → sports/ and hero/');
  console.log('  - Vertical images → team/');
}

main();
