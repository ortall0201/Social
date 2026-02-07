#!/usr/bin/env node
import { bundle } from "@remotion/bundler";
import { renderMedia, renderStill } from "@remotion/renderer";
import { createRequire } from "node:module";
import path from "node:path";
import fs from "node:fs";

const require = createRequire(import.meta.url);

const compositionId = "GrammyConfidence-WithText";
const compositionIdClean = "GrammyConfidence-Clean";
const outputDir = path.join(process.cwd(), "out", "grammy-confidence");

// Ensure output directory exists
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

console.log("🏆 Rendering Grammy Confidence - Caption Composition...\n");

const start = Date.now();

try {
  // Step 1: Bundle
  console.log("📦 Bundling Remotion project...");
  const bundleLocation = await bundle({
    entryPoint: path.resolve(process.cwd(), "./src/index.ts"),
    webpackOverride: (config) => config,
  });
  console.log("✅ Bundle created\n");

  // Step 2: Render WITH TEXT version
  console.log("📹 Rendering WITH TEXT version (15.5 seconds)...");
  const withTextFile = path.join(outputDir, "grammy-confidence-with-text.mp4");

  await renderMedia({
    composition: {
      id: compositionId,
      durationInFrames: 465,
      fps: 30,
      width: 1080,
      height: 1920,
    },
    serveUrl: bundleLocation,
    codec: "h264",
    outputLocation: withTextFile,
    onProgress: ({ progress }) => {
      process.stdout.write(`\r⏳ Progress: ${(progress * 100).toFixed(1)}%`);
    },
  });

  const withTextStats = fs.statSync(withTextFile);
  const withTextSize = (withTextStats.size / 1024 / 1024).toFixed(2);
  console.log(`\n✅ WITH TEXT: ${withTextSize} MB\n`);

  // Step 3: Render CLEAN version
  console.log("📹 Rendering CLEAN version (no text)...");
  const cleanFile = path.join(outputDir, "grammy-confidence-clean.mp4");

  await renderMedia({
    composition: {
      id: compositionIdClean,
      durationInFrames: 465,
      fps: 30,
      width: 1080,
      height: 1920,
    },
    serveUrl: bundleLocation,
    codec: "h264",
    outputLocation: cleanFile,
    onProgress: ({ progress }) => {
      process.stdout.write(`\r⏳ Progress: ${(progress * 100).toFixed(1)}%`);
    },
  });

  const cleanStats = fs.statSync(cleanFile);
  const cleanSize = (cleanStats.size / 1024 / 1024).toFixed(2);
  console.log(`\n✅ CLEAN: ${cleanSize} MB\n`);

  // Step 4: Render cover frame
  console.log("🖼️  Rendering cover frame...");
  const coverFile = path.join(outputDir, "grammy-confidence-cover.png");

  await renderStill({
    composition: {
      id: compositionId,
      durationInFrames: 465,
      fps: 30,
      width: 1080,
      height: 1920,
    },
    serveUrl: bundleLocation,
    output: coverFile,
    frame: 120, // Capture frame during "confidence isn't about applause" line
  });

  console.log(`✅ COVER: ${coverFile}\n`);

  const elapsed = ((Date.now() - start) / 1000).toFixed(1);

  console.log("============================================================");
  console.log("🏆 GRAMMY CONFIDENCE RENDERED SUCCESSFULLY!");
  console.log("============================================================\n");
  console.log(`📁 Output directory: ${outputDir}`);
  console.log(`⏱️  Total time: ${elapsed}s\n`);
  console.log("Files created:");
  console.log(`  - grammy-confidence-with-text.mp4 (${withTextSize} MB)`);
  console.log(`  - grammy-confidence-clean.mp4 (${cleanSize} MB)`);
  console.log(`  - grammy-confidence-cover.png\n`);
  console.log("✨ CONFIDENCE ISN'T ABOUT APPLAUSE. GRAMMYS 2026.\n");

} catch (err) {
  console.error("❌ Error rendering:", err);
  process.exit(1);
}
