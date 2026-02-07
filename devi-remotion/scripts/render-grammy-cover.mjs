#!/usr/bin/env node
import { bundle } from "@remotion/bundler";
import { renderStill } from "@remotion/renderer";
import { createRequire } from "node:module";
import path from "node:path";
import fs from "node:fs";

const require = createRequire(import.meta.url);

const stillId = "GrammyConfidence-Cover";
const outputDir = path.join(process.cwd(), "out", "grammy-cover");

// Ensure output directory exists
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

console.log("🏆 Rendering Grammy Confidence Cover Image...\n");

const start = Date.now();

try {
  // Step 1: Bundle
  console.log("📦 Bundling Remotion project...");
  const bundleLocation = await bundle({
    entryPoint: path.resolve(process.cwd(), "./src/index.ts"),
    webpackOverride: (config) => config,
  });
  console.log("✅ Bundle created\n");

  // Step 2: Render cover image
  console.log("🖼️  Rendering cover image...");
  const coverFile = path.join(outputDir, "grammy-confidence-cover.png");

  await renderStill({
    composition: {
      id: stillId,
      width: 1080,
      height: 1920,
      fps: 30,
      durationInFrames: 1,
    },
    serveUrl: bundleLocation,
    output: coverFile,
  });

  const coverStats = fs.statSync(coverFile);
  const coverSize = (coverStats.size / 1024 / 1024).toFixed(2);
  console.log(`✅ COVER: ${coverSize} MB\n`);

  const elapsed = ((Date.now() - start) / 1000).toFixed(1);

  console.log("============================================================");
  console.log("🏆 GRAMMY CONFIDENCE COVER RENDERED SUCCESSFULLY!");
  console.log("============================================================\n");
  console.log(`📁 Output file: ${coverFile}`);
  console.log(`📊 File size: ${coverSize} MB`);
  console.log(`⏱️  Total time: ${elapsed}s\n`);
  console.log("✨ CONFIDENCE ISN'T ABOUT APPLAUSE. GRAMMYS 2026.\n");

} catch (err) {
  console.error("❌ Error rendering:", err);
  process.exit(1);
}
