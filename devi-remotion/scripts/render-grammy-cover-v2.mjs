#!/usr/bin/env node
import { bundle } from "@remotion/bundler";
import { renderStill } from "@remotion/renderer";
import path from "node:path";
import fs from "node:fs";

const stillId = "GrammyConfidence-Cover-V2";
const outputDir = path.join(process.cwd(), "out", "grammy-cover");

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

console.log("Rendering Grammy Confidence Cover Image V2...\n");

const start = Date.now();

try {
  console.log("Bundling Remotion project...");
  const bundleLocation = await bundle({
    entryPoint: path.resolve(process.cwd(), "./src/index.ts"),
    webpackOverride: (config) => config,
  });
  console.log("Bundle created\n");

  console.log("Rendering cover image V2...");
  const coverFile = path.join(outputDir, "grammy-confidence-cover-v2.png");

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
  const elapsed = ((Date.now() - start) / 1000).toFixed(1);

  console.log(`Cover rendered: ${coverFile}`);
  console.log(`File size: ${coverSize} MB`);
  console.log(`Total time: ${elapsed}s`);
} catch (err) {
  console.error("Error rendering V2 cover:", err);
  process.exit(1);
}
