#!/usr/bin/env node
/**
 * One-time migration: split monolithic YAML data files into per-entry files.
 *
 * For each configured data file the script:
 *   1. Reads the YAML array from the monolithic file.
 *   2. Writes each entry as a standalone YAML file inside a same-named directory.
 *   3. Deletes the original monolithic file.
 *
 * Usage:  node scripts/split-data-files.js
 */

const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

const DATA_DIR = path.join(__dirname, '..', 'src', '_data');

const FILES = [
  { file: 'sources.yml', idField: 'id' },
  { file: 'source_summaries.yml', idField: 'source_id' },
  { file: 'people.yml', idField: 'id' },
  { file: 'citations.yml', idField: 'id' },
];

for (const { file, idField } of FILES) {
  const srcPath = path.join(DATA_DIR, file);
  if (!fs.existsSync(srcPath)) {
    console.log(`Skipping ${file} (not found)`);
    continue;
  }

  const entries = yaml.load(fs.readFileSync(srcPath, 'utf8')) || [];
  const dirName = file.replace(/\.yml$/, '');
  const destDir = path.join(DATA_DIR, dirName);

  fs.mkdirSync(destDir, { recursive: true });

  let written = 0;
  for (const entry of entries) {
    const entryId = entry[idField];
    if (!entryId) {
      console.warn(`  ⚠  Entry in ${file} missing '${idField}', skipping`);
      continue;
    }
    const destPath = path.join(destDir, `${entryId}.yml`);
    fs.writeFileSync(destPath, yaml.dump(entry, { lineWidth: 120, quotingType: "'", forceQuotes: false }), 'utf8');
    written++;
  }

  fs.unlinkSync(srcPath);
  console.log(`${file} → ${dirName}/ (${written} files written, original deleted)`);
}

console.log('\nDone. Run `npm run build` to verify.');
