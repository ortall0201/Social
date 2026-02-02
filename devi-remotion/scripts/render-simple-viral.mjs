#!/usr/bin/env node
import { execSync } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.join(__dirname, '..');
const outputDir = path.join(projectRoot, 'public', 'output');

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

console.log('🎬 Rendering Simple Viral Blend...\n');
console.log('📝 Approach:');
console.log('   ✅ Full videos (no trimming)');
console.log('   ✅ No speed changes');
console.log('   ✅ No effects or stabilization');
console.log('   ✅ Just smooth 2-second crossfades');
console.log('   ✅ Clean and simple\n');
console.log('📊 Details:');
console.log('   - Duration: 26 seconds');
console.log('   - Clips: 3 full makeup videos (10 sec each)');
console.log('   - Transitions: 2-second smooth fade');
console.log('   - Format: 1088x1904 at 24fps (NATIVE resolution - no scaling!)\n');

const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, -5);
const outputPath = path.join(outputDir, `simple-viral-blend-${timestamp}.mp4`);

console.log('🚀 Rendering...\n');

try {
  execSync(
    `npx remotion render src/index.ts SimpleViralBlend-WithText "${outputPath}" --overwrite`,
    {
      cwd: projectRoot,
      stdio: 'inherit'
    }
  );

  console.log(`\n✅ Done!`);
  console.log(`📁 ${outputPath}\n`);
  console.log('🎯 Ready to post at 4pm Israel (9am US)');
  console.log('💬 Caption: "Satisfying makeup blend ✨ Which technique? 1️⃣ 2️⃣ 3️⃣"\n');

} catch (error) {
  console.error('❌ Render failed:', error.message);
  process.exit(1);
}
