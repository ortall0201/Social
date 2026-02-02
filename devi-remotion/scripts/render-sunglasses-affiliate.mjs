#!/usr/bin/env node

/**
 * Render Sunglasses Affiliate Marketing Reel
 *
 * Viral reel promoting devisignals.com affiliate program
 * with hot couture fashion styling and direct CTA
 */

import { bundle } from "@remotion/bundler";
import { getCompositions, renderMedia } from "@remotion/renderer";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const rootDir = path.resolve(__dirname, "..");
const outputDir = path.join(rootDir, "out");
const outputFile = path.join(outputDir, "sunglasses-affiliate-reel.mp4");

console.log("🔥 Rendering Sunglasses Affiliate Marketing Reel...");
console.log(`📁 Root directory: ${rootDir}`);
console.log(`📤 Output file: ${outputFile}`);

// Ensure output directory exists
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
  console.log(`✅ Created output directory: ${outputDir}`);
}

async function render() {
  try {
    // Step 1: Bundle
    console.log("\n📦 Bundling Remotion project...");
    const bundled = await bundle({
      entryPoint: path.join(rootDir, "src", "index.ts"),
      webpackOverride: (config) => config,
    });
    console.log(`✅ Bundle created: ${bundled}`);

    // Step 2: Get composition
    console.log("\n🎨 Loading composition...");
    const compositions = await getCompositions(bundled);
    const composition = compositions.find((c) => c.id === "SunglassesAffiliateReel");

    if (!composition) {
      throw new Error("SunglassesAffiliateReel composition not found!");
    }

    console.log(`✅ Found composition: ${composition.id}`);
    console.log(`   Duration: ${composition.durationInFrames} frames (${(composition.durationInFrames / composition.fps).toFixed(1)}s)`);
    console.log(`   FPS: ${composition.fps}`);
    console.log(`   Resolution: ${composition.width}x${composition.height}`);

    // Step 3: Render
    console.log("\n🎥 Rendering affiliate marketing video...");
    console.log("This may take a few minutes...");

    await renderMedia({
      composition,
      serveUrl: bundled,
      codec: "h264",
      outputLocation: outputFile,
      onProgress: ({ progress, renderedFrames, encodedFrames }) => {
        const percentage = (progress * 100).toFixed(1);
        process.stdout.write(`\r⏳ Progress: ${percentage}% (${renderedFrames}/${composition.durationInFrames} frames rendered, ${encodedFrames} encoded)`);
      },
    });

    console.log("\n");
    console.log("✅ Rendering complete!");
    console.log(`📹 Video saved to: ${outputFile}`);

    // Get file size
    const stats = fs.statSync(outputFile);
    const fileSizeMB = (stats.size / (1024 * 1024)).toFixed(2);
    console.log(`📊 File size: ${fileSizeMB} MB`);

    console.log("\n🎉 Affiliate Marketing Reel ready to post!");
    console.log("💰 Perfect for driving traffic to devisignals.com");
    console.log("📈 Strong CTA for affiliate partnerships");

  } catch (error) {
    console.error("\n❌ Rendering failed:");
    console.error(error);
    process.exit(1);
  }
}

render();
