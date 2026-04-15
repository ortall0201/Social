#!/usr/bin/env node
/**
 * Renders native 4:5 (1080×1350) stills: object-fit contain + type in IG/Buffer-safe band.
 * Prefer this for Buffer image posts when previews crop bottom-anchored 1:1 art.
 *
 * Usage (from devi-remotion/):
 *   npm run render:devi-feed-overlays-feed45
 */
import { bundle } from "@remotion/bundler";
import { renderStill, selectComposition } from "@remotion/renderer";
import fs from "node:fs";
import path from "node:path";

const remotionRoot = process.cwd();
const repoRoot = path.resolve(remotionRoot, "..");
const srcDir = path.join(repoRoot, "devi-feed/imagegen-buffer-2026-04-16");
const pubDir = path.join(remotionRoot, "public/devi-feed-buffer");
const outDir = path.join(remotionRoot, "out/devi-feed-caption-overlays-feed45");

const slides = [
  {
    file: "devi-buffer-card-01.png",
    headline: "Quiet. Then. Iconic.",
    subline: "Archive energy without the costume parade.",
    textZone: "bottom",
  },
  {
    file: "devi-buffer-card-02.png",
    headline: "Era. Shift. Dominance.",
    subline: "Old Hollywood restraint, new-weekend voltage.",
    textZone: "bottom",
  },
  {
    file: "devi-buffer-card-03.png",
    headline: "Clocked. Cold. Clean.",
    subline: "Editorial silence beats loud trends.",
    textZone: "top",
  },
  {
    file: "devi-buffer-card-04.png",
    headline: "Future. Finds. Devi.",
    subline: "Desert night, chrome accent, one read.",
    textZone: "bottom",
  },
  {
    file: "devi-buffer-card-05.png",
    headline: "Western. But. Weaponized.",
    subline: "Refined country — built for saves, not cosplay.",
    textZone: "bottom",
  },
  {
    file: "devi-buffer-card-06.png",
    headline: "Fashion. Is. Art.",
    subline: "Met countdown: sculpture you can wear.",
    textZone: "bottom",
  },
  {
    file: "devi-buffer-card-07.png",
    headline: "Canvas. Became. Her.",
    subline: "Wearable paint, museum-grade taste.",
    textZone: "top",
  },
  {
    file: "devi-buffer-card-08.png",
    headline: "Steps. Speak. Power.",
    subline: "Liquid silver, locked gaze, zero apology.",
    textZone: "bottom",
  },
  {
    file: "devi-buffer-card-09.png",
    headline: "Tunnel. Mode. On.",
    subline: "Sideline light, front-row wardrobe math.",
    textZone: "top",
  },
];

function syncPublicAssets() {
  if (!fs.existsSync(srcDir)) {
    throw new Error(`Missing source folder: ${srcDir}`);
  }
  if (!fs.existsSync(pubDir)) {
    fs.mkdirSync(pubDir, { recursive: true });
  }
  for (const s of slides) {
    const from = path.join(srcDir, s.file);
    const to = path.join(pubDir, s.file);
    if (!fs.existsSync(from)) {
      console.warn(`Skip (missing source): ${s.file}`);
      continue;
    }
    fs.copyFileSync(from, to);
  }
}

syncPublicAssets();

if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

const startedAt = Date.now();
console.log("Bundling Remotion (4:5 native)…");
const bundleLocation = await bundle({
  entryPoint: path.resolve(remotionRoot, "./src/index.ts"),
  webpackOverride: (config) => config,
});

const rendered = [];

for (const s of slides) {
  const srcPath = path.join(pubDir, s.file);
  if (!fs.existsSync(srcPath)) {
    console.warn(`Skipping render for ${s.file} (not in public after copy)`);
    continue;
  }

  const imageFile = `devi-feed-buffer/${s.file}`;
  const inputProps = {
    imageFile,
    headline: s.headline,
    subline: s.subline,
    textZone: s.textZone,
  };

  const baseName = s.file.replace(/\.png$/i, "-with-caption-feed45.png");
  const outputFile = path.join(outDir, baseName);

  const composition = await selectComposition({
    serveUrl: bundleLocation,
    id: "DeviFeedImageCaptionFeed4x5",
    inputProps,
  });

  await renderStill({
    composition,
    serveUrl: bundleLocation,
    output: outputFile,
    inputProps,
  });

  rendered.push({ ...s, output: baseName });
  console.log(`Rendered ${baseName}`);
}

const manifestPath = path.join(outDir, "manifest.json");
fs.writeFileSync(
  manifestPath,
  JSON.stringify(
    {
      createdAt: new Date().toISOString(),
      compositionId: "DeviFeedImageCaptionFeed4x5",
      format: "1080x1350",
      slides: rendered,
    },
    null,
    2
  ),
  "utf8"
);

const elapsed = ((Date.now() - startedAt) / 1000).toFixed(1);
console.log(
  `Done. ${rendered.length} stills in ${elapsed}s. Manifest: ${manifestPath}`
);
