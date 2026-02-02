#!/usr/bin/env node

import { bundle } from "@remotion/bundler";
import { renderMedia, selectComposition } from "@remotion/renderer";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Get manifest path from command line argument
const manifestPath = process.argv[2];

if (!manifestPath) {
  console.error('❌ Error: Manifest path is required');
  console.error('Usage: npm run render:reel <path/to/manifest.json>');
  console.error('Example: npm run render:reel renders/reel-20260123/manifest.json');
  process.exit(1);
}

const fullManifestPath = path.resolve(process.cwd(), manifestPath);

if (!fs.existsSync(fullManifestPath)) {
  console.error(`❌ Error: Manifest file not found: ${fullManifestPath}`);
  process.exit(1);
}

// Read manifest to get reel_id and settings
let manifest;
try {
  manifest = JSON.parse(fs.readFileSync(fullManifestPath, 'utf-8'));
} catch (err) {
  console.error(`❌ Error reading manifest: ${err.message}`);
  process.exit(1);
}

const outputDir = path.dirname(fullManifestPath);
const outputFile = path.join(outputDir, `${manifest.reel_id}.mp4`);

console.log(`\n🎬 Rendering Devi Reel`);
console.log(`   Reel ID: ${manifest.reel_id}`);
console.log(`   Manifest: ${manifestPath}`);
console.log(`   Output: ${outputFile}`);
console.log(`   Resolution: ${manifest.width}x${manifest.height}`);
console.log(`   FPS: ${manifest.fps}`);
console.log(`   Scenes: ${manifest.scenes.length}\n`);

const entryPoint = path.resolve(__dirname, "../src/index.ts");
console.log("📦 Bundling project...");

const bundled = await bundle({
  entryPoint,
  webpackOverride: (config) => config,
});

console.log("✅ Bundle complete\n");

console.log("🔍 Selecting composition...");
const composition = await selectComposition({
  serveUrl: bundled,
  id: "DeviReel",
  inputProps: {
    manifest: manifest,
  },
});

console.log("✅ Composition selected\n");

console.log("🎥 Rendering video...");
await renderMedia({
  composition,
  serveUrl: bundled,
  codec: "h264",
  outputLocation: outputFile,
  inputProps: {
    manifest: manifest,
  },
  onProgress: ({ progress }) => {
    process.stdout.write(`\r   Progress: ${(progress * 100).toFixed(1)}%`);
  },
});

console.log("\n\n✅ Render complete!");
console.log(`   Output saved to: ${outputFile}\n`);

process.exit(0);
