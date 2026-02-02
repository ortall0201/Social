#!/usr/bin/env node

import { execSync } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Get current timestamp for filename
const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, -5);

console.log('🎬 Rendering Satisfying Beauty Blend...\n');

// Render composition
const outputPath = path.join(__dirname, '..', 'out', `satisfying-beauty-blend-${timestamp}.mp4`);

try {
  execSync(
    `pnpm exec remotion render SatisfyingBeautyBlend-WithText "${outputPath}" --codec=h264 --overwrite`,
    {
      stdio: 'inherit',
      cwd: path.join(__dirname, '..')
    }
  );

  console.log('\n✅ Render complete!');
  console.log(`📁 Output: ${outputPath}`);
  console.log('\n📝 Caption Template:');
  console.log('─────────────────────────────────────────────────');
  console.log('Satisfying makeup blend techniques ✨');
  console.log('');
  console.log('Which technique do you prefer?');
  console.log('1️⃣ 2️⃣ or 3️⃣');
  console.log('');
  console.log('More curated beauty content → link in bio');
  console.log('Created by Devi AI');
  console.log('');
  console.log('#satisfying #makeuptutorial #makeupblending #asmr #beautytok #makeupartist');
  console.log('─────────────────────────────────────────────────');
  console.log('\n🎯 Post at 4pm Israel time (9am US EST) for maximum engagement!');
} catch (error) {
  console.error('❌ Render failed:', error.message);
  process.exit(1);
}
