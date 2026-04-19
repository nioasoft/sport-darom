#!/usr/bin/env node
/**
 * Generates the `galleryImages` TypeScript block from the manifest
 * produced by `import-gallery-images.mjs`, and rewrites it inside
 * `src/lib/images.ts`.
 */

import { readFile, writeFile } from 'fs/promises';

const MANIFEST_PATH = 'scripts/gallery-manifest.json';
const IMAGES_TS = 'src/lib/images.ts';

// Per-sport generic alt text in the three supported locales.
// Images get indexed ("1", "2", ...) so screen readers can distinguish them.
const ALT_BY_SPORT = {
  athletics: {
    he: 'אימון אתלטיקה בספורט דרום',
    ar: 'تدريب ألعاب القوى في سبورت داروم',
    ru: 'Тренировка по лёгкой атлетике в Спорт Даром',
  },
  'wheelchair-basketball': {
    he: 'אימון כדורסל כיסאות גלגלים בספורט דרום',
    ar: 'تدريب كرة السلة على الكراسي المتحركة في سبورت داروم',
    ru: 'Тренировка по баскетболу на колясках в Спорт Даром',
  },
  goalball: {
    he: 'אימון כדור שער בספורט דרום',
    ar: 'تدريب كرة الهدف في سبورت داروم',
    ru: 'Тренировка по голболу в Спорт Даром',
  },
  swimming: {
    he: 'אימון שחייה בספורט דרום',
    ar: 'تدريب السباحة في سبورت داروم',
    ru: 'Тренировка по плаванию в Спорт Даром',
  },
  bocce: {
    he: "אימון בוצ'ה בספורט דרום",
    ar: 'تدريب البوتشي في سبورت داروم',
    ru: 'Тренировка по бочче в Спорт Даром',
  },
  'hand-cycling': {
    he: 'אימון אופני יד בספורט דרום',
    ar: 'تدريب الدراجات اليدوية في سبورت داروم',
    ru: 'Тренировка по ручному велоспорту в Спорт Даром',
  },
  judo: {
    he: "אימון ג'ודו בספורט דרום",
    ar: 'تدريب الجودو في سبورت داروم',
    ru: 'Тренировка по дзюдо в Спорт Даром',
  },
  archery: {
    he: 'אימון חץ וקשת בספורט דרום',
    ar: 'تدريب الرماية بالقوس في سبورت داروم',
    ru: 'Тренировка по стрельбе из лука в Спорт Даром',
  },
};

function indent(text, spaces) {
  const pad = ' '.repeat(spaces);
  return text
    .split('\n')
    .map((line) => (line.length ? pad + line : line))
    .join('\n');
}

function renderEntry(entry, index) {
  const alt = ALT_BY_SPORT[entry.slug];
  if (!alt) throw new Error(`Missing alt text for slug: ${entry.slug}`);
  const n = index + 1;
  // Use JSON.stringify so strings containing apostrophes (ג'ודו, בוצ'ה)
  // are correctly escaped into double-quoted TS string literals.
  return `{
  src: ${JSON.stringify(entry.src)},
  orientation: ${JSON.stringify(entry.orientation)},
  alt: {
    he: ${JSON.stringify(`${alt.he} #${n}`)},
    ar: ${JSON.stringify(`${alt.ar} #${n}`)},
    ru: ${JSON.stringify(`${alt.ru} #${n}`)},
  },
}`;
}

function renderSport(slug, entries) {
  const items = entries.map((e, i) => indent(renderEntry(e, i), 4)).join(',\n');
  const key = /-/.test(slug) ? `'${slug}'` : slug;
  return `  ${key}: [\n${items},\n  ],`;
}

async function main() {
  const manifest = JSON.parse(await readFile(MANIFEST_PATH, 'utf8'));
  const ts = await readFile(IMAGES_TS, 'utf8');

  // Preserve insertion order used elsewhere in the file.
  const order = [
    'athletics',
    'wheelchair-basketball',
    'goalball',
    'swimming',
    'bocce',
    'hand-cycling',
    'judo',
    'archery',
  ];

  const body = order
    .map((slug) => renderSport(slug, manifest[slug] ?? []))
    .join('\n');

  const newBlock = `export const galleryImages: Record<string, ImageConfig[]> = {\n${body}\n};`;

  // Match from `export const galleryImages` up to the first line that is
  // exactly `};` at column 0 — the existing block is formatted that way.
  const re = /export const galleryImages: Record<string, ImageConfig\[\]> = \{[\s\S]*?^\};/m;
  if (!re.test(ts)) {
    throw new Error('Could not locate existing galleryImages block in images.ts');
  }

  const updated = ts.replace(re, newBlock);
  await writeFile(IMAGES_TS, updated, 'utf8');

  const total = order.reduce((sum, s) => sum + (manifest[s]?.length ?? 0), 0);
  console.log(`✓ Rewrote galleryImages with ${total} entries across ${order.length} sports`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
