#!/usr/bin/env node

import { bundle } from "@remotion/bundler";
import { renderMedia, selectComposition } from "@remotion/renderer";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function render() {
  const compositionId = "MakeupBlend-Clean"; // Or "MakeupBlend-WithText"

  console.log(`🎬 Starting render for ${compositionId}...`);

  // Bundle the Remotion project
  const bundleLocation = await bundle({
    entryPoint: path.resolve(__dirname, "../src/index.ts"),
    webpackOverride: (config) => config,
  });

  // Get composition metadata
  const composition = await selectComposition({
    serveUrl: bundleLocation,
    id: compositionId,
  });

  console.log(`📹 Composition: ${composition.id}`);
  console.log(`⏱️  Duration: ${composition.durationInFrames} frames (${(composition.durationInFrames / composition.fps).toFixed(1)}s)`);
  console.log(`📐 Resolution: ${composition.width}x${composition.height}`);

  // Output file
  const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
  const outputLocation = path.resolve(
    __dirname,
    `../../devi-videos/videos/makeup-blend-${timestamp}.mp4`
  );

  // Ensure output directory exists
  const outputDir = path.dirname(outputLocation);
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  console.log(`💾 Output: ${outputLocation}`);

  // Render the video
  await renderMedia({
    composition,
    serveUrl: bundleLocation,
    codec: "h264",
    outputLocation,
    imageFormat: "jpeg",
    // High quality settings for satisfying visuals
    crf: 18, // Lower = better quality (18 is visually lossless)
    pixelFormat: "yuv420p",
    envVariables: {},
  });

  console.log(`✅ Render complete!`);
  console.log(`📁 File saved to: ${outputLocation}`);
}

render()
  .then(() => {
    process.exit(0);
  })
  .catch((err) => {
    console.error("❌ Render failed:");
    console.error(err);
    process.exit(1);
  });
