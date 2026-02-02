#!/usr/bin/env node
import { execSync } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.join(__dirname, '..');
const outputDir = path.join(projectRoot, 'public', 'carousel');

// Create output directory if it doesn't exist
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

console.log('🎨 Rendering Mindvalley Carousel (6 slides)...\n');

const slides = [1, 2, 3, 4, 5, 6];
const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, -5);

for (const slideNum of slides) {
  const compositionId = `Slide-${slideNum}`;
  const outputPath = path.join(outputDir, `mindvalley-slide-${slideNum}-${timestamp}.png`);

  console.log(`📸 Rendering Slide ${slideNum}...`);

  try {
    execSync(
      `npx remotion still src/index.ts ${compositionId} "${outputPath}" --overwrite`,
      {
        cwd: projectRoot,
        stdio: 'inherit'
      }
    );
    console.log(`✅ Slide ${slideNum} saved: ${outputPath}\n`);
  } catch (error) {
    console.error(`❌ Failed to render Slide ${slideNum}:`, error.message);
    process.exit(1);
  }
}

console.log('\n✨ All 6 carousel slides rendered successfully!');
console.log(`📁 Output directory: ${outputDir}`);
console.log('\n🎯 Next steps:');
console.log('1. Review the slides in the public/carousel/ folder');
console.log('2. Upload all 6 images to Instagram as a carousel post');
console.log('3. Use the caption template from DEVI-24HOUR-POSTING-GUIDE.md');
console.log('4. Schedule for 2:00am Israel time (7:00pm US EST) for maximum engagement\n');
