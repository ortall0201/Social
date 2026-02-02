#!/usr/bin/env node

import { execSync } from 'child_process';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Get folder path from command line argument
const folderPath = process.argv[2] || 'renders';

const fullFolderPath = path.resolve(process.cwd(), folderPath);

if (!fs.existsSync(fullFolderPath)) {
  console.error(`❌ Error: Folder not found: ${fullFolderPath}`);
  process.exit(1);
}

console.log(`\n🎬 Batch Rendering Devi Reels`);
console.log(`   Folder: ${folderPath}\n`);

// Find all manifest.json files in subdirectories
const reelFolders = fs.readdirSync(fullFolderPath, { withFileTypes: true })
  .filter(dirent => dirent.isDirectory())
  .map(dirent => dirent.name);

let renderedCount = 0;
let failedCount = 0;

for (const reelFolder of reelFolders) {
  const manifestPath = path.join(folderPath, reelFolder, 'manifest.json');
  const fullManifestPath = path.join(fullFolderPath, reelFolder, 'manifest.json');

  if (!fs.existsSync(fullManifestPath)) {
    console.log(`⏭️  Skipping ${reelFolder} (no manifest.json)`);
    continue;
  }

  console.log(`\n📹 Rendering: ${reelFolder}`);

  try {
    execSync(`npm run render:reel ${manifestPath}`, {
      stdio: 'inherit',
      cwd: path.resolve(__dirname, '..')
    });
    renderedCount++;
  } catch (err) {
    console.error(`❌ Failed to render ${reelFolder}`);
    failedCount++;
  }
}

console.log(`\n\n✅ Batch render complete!`);
console.log(`   Success: ${renderedCount}`);
console.log(`   Failed: ${failedCount}\n`);

process.exit(failedCount > 0 ? 1 : 0);
