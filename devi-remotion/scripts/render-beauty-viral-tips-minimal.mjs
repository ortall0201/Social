#!/usr/bin/env node
import { bundle } from "@remotion/bundler";
import { renderStill } from "@remotion/renderer";
import path from "node:path";
import fs from "node:fs";

const stillId = "BeautyViralTips-Minimal";
const outputDir = path.join(process.cwd(), "out", "beauty-viral-tips");

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

console.log("Rendering minimal viral beauty tips image...\n");

const start = Date.now();

try {
  console.log("Bundling Remotion project...");
  const bundleLocation = await bundle({
    entryPoint: path.resolve(process.cwd(), "./src/index.ts"),
    webpackOverride: (config) => config,
  });
  console.log("Bundle created\n");

  console.log("Rendering minimal image...");
  const outputFile = path.join(outputDir, "beauty-viral-tips-minimal-4x5.png");

  await renderStill({
    composition: {
      id: stillId,
      width: 1080,
      height: 1350,
      fps: 30,
      durationInFrames: 1,
    },
    serveUrl: bundleLocation,
    output: outputFile,
  });

  const fileStats = fs.statSync(outputFile);
  const fileSize = (fileStats.size / 1024 / 1024).toFixed(2);
  const elapsed = ((Date.now() - start) / 1000).toFixed(1);

  console.log(`Image rendered: ${outputFile}`);
  console.log(`File size: ${fileSize} MB`);
  console.log(`Total time: ${elapsed}s`);
} catch (err) {
  console.error("Error rendering minimal viral beauty tips image:", err);
  process.exit(1);
}