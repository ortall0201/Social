#!/usr/bin/env node

/**
 * Render All 3 Professional Affiliate Marketing Reels
 * Each reel has 2 versions: WithText + Clean
 * Total: 6 video files
 */

import { bundle } from "@remotion/bundler";
import { getCompositions, renderMedia, renderStill } from "@remotion/renderer";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const rootDir = path.resolve(__dirname, "..");
const outputDir = path.join(rootDir, "out", "affiliate-reels");

// Ensure output directory exists
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

const reels = [
  {
    id: "AffiliateReel1",
    name: "brand-hook-i-drive-sales",
    duration: "10s",
  },
  {
    id: "AffiliateReel2",
    name: "value-hook-sunglasses-upgrade",
    duration: "9s",
  },
  {
    id: "AffiliateReel3",
    name: "proof-vibe-irresistible",
    duration: "10s",
  },
];

async function render() {
  try {
    console.log("🎬 Rendering 3 Professional Affiliate Marketing Reels...\n");

    // Bundle
    console.log("📦 Bundling Remotion project...");
    const bundled = await bundle({
      entryPoint: path.join(rootDir, "src", "index.ts"),
      webpackOverride: (config) => config,
    });
    console.log(`✅ Bundle created\n`);

    // Get all compositions
    const compositions = await getCompositions(bundled);

    for (const reel of reels) {
      console.log(`\n${"=".repeat(60)}`);
      console.log(`🎥 REEL: ${reel.name} (${reel.duration})`);
      console.log(`${"=".repeat(60)}\n`);

      // Render WithText version
      const withTextComp = compositions.find((c) => c.id === `${reel.id}-WithText`);
      if (withTextComp) {
        const withTextFile = path.join(outputDir, `${reel.name}-with-text.mp4`);
        console.log(`📹 Rendering WITH TEXT version...`);

        await renderMedia({
          composition: withTextComp,
          serveUrl: bundled,
          codec: "h264",
          outputLocation: withTextFile,
          onProgress: ({ progress }) => {
            const percentage = (progress * 100).toFixed(1);
            process.stdout.write(`\r⏳ Progress: ${percentage}%`);
          },
        });

        const stats = fs.statSync(withTextFile);
        const sizeMB = (stats.size / (1024 * 1024)).toFixed(2);
        console.log(`\n✅ WITH TEXT: ${sizeMB} MB`);
      }

      // Render Clean version
      const cleanComp = compositions.find((c) => c.id === `${reel.id}-Clean`);
      if (cleanComp) {
        const cleanFile = path.join(outputDir, `${reel.name}-clean.mp4`);
        console.log(`📹 Rendering CLEAN version...`);

        await renderMedia({
          composition: cleanComp,
          serveUrl: bundled,
          codec: "h264",
          outputLocation: cleanFile,
          onProgress: ({ progress }) => {
            const percentage = (progress * 100).toFixed(1);
            process.stdout.write(`\r⏳ Progress: ${percentage}%`);
          },
        });

        const stats = fs.statSync(cleanFile);
        const sizeMB = (stats.size / (1024 * 1024)).toFixed(2);
        console.log(`\n✅ CLEAN: ${sizeMB} MB`);
      }

      // Render cover frame (first frame of WithText version)
      if (withTextComp) {
        const coverFile = path.join(outputDir, `${reel.name}-cover.png`);
        console.log(`🖼️  Rendering cover frame...`);

        await renderStill({
          composition: withTextComp,
          serveUrl: bundled,
          output: coverFile,
          frame: 0,
        });

        console.log(`✅ COVER: ${coverFile}`);
      }
    }

    console.log(`\n${"=".repeat(60)}`);
    console.log("🎉 ALL REELS RENDERED SUCCESSFULLY!");
    console.log(`${"=".repeat(60)}\n`);

    console.log(`📁 Output directory: ${outputDir}`);
    console.log(`\nTotal files created:`);
    console.log(`  - 3 reels with text (burnt-in captions)`);
    console.log(`  - 3 clean versions (no text)`);
    console.log(`  - 3 cover frames (thumbnails)`);
    console.log(`  = 9 files total\n`);

    console.log(`Next steps:`);
    console.log(`  1. Check output in: ${outputDir}`);
    console.log(`  2. Review SRT caption files (generated separately)`);
    console.log(`  3. Use caption copy from AFFILIATE-REELS-COPY.md`);

  } catch (error) {
    console.error("\n❌ Rendering failed:");
    console.error(error);
    process.exit(1);
  }
}

render();
