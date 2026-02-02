#!/usr/bin/env node
import { execSync } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.join(__dirname, '..');
const outputDir = path.join(projectRoot, 'public', 'output');

// Create output directory if it doesn't exist
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

console.log('🎬 Rendering Viral Blend Reel (Improved Version)...\n');
console.log('📝 Details:');
console.log('   - Duration: 10 seconds (optimized for viral)');
console.log('   - Format: 1080x1920 (Instagram Reels)');
console.log('   - Clips: 3 makeup techniques');
console.log('   - Transitions: 1-second smooth crossfade');
console.log('   - Stabilization: Subtle zoom effect');
console.log('   - Target: US audience growth\n');

const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, -5);
const outputPath = path.join(outputDir, `viral-blend-${timestamp}.mp4`);

console.log('🚀 Starting render...\n');

try {
  execSync(
    `npx remotion render src/index.ts ViralBlend-WithText "${outputPath}" --overwrite`,
    {
      cwd: projectRoot,
      stdio: 'inherit'
    }
  );

  console.log(`\n✅ Viral blend rendered successfully!`);
  console.log(`📁 Saved to: ${outputPath}`);
  console.log('\n🎯 Next steps:');
  console.log('1. Review the video');
  console.log('2. Post to Instagram at 4pm Israel (9am US EST)');
  console.log('3. Use caption:');
  console.log('   "Satisfying makeup blend techniques ✨');
  console.log('   Which technique do you prefer? 1️⃣ 2️⃣ or 3️⃣');
  console.log('   #satisfying #makeuptutorial #makeupblending #asmr #beautytok"');
  console.log('4. Watch the views roll in! 🚀\n');

} catch (error) {
  console.error('❌ Failed to render viral blend:', error.message);
  process.exit(1);
}
