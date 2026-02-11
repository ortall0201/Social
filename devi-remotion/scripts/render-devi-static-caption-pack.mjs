#!/usr/bin/env node
import { bundle } from "@remotion/bundler";
import { renderStill, selectComposition } from "@remotion/renderer";
import fs from "node:fs";
import path from "node:path";

const outputDir = path.join(process.cwd(), "out", "devi-static-caption-pack-4x5");

const concepts = [
  {
    id: "01",
    set: "A",
    onScreenText: "Sheer as calm.",
    caption: "Sheer feels quieter today.",
    hashtags: ["#SheerDressing", "#QuietLuxuryMood", "#NYCOutfitDiary"],
    textPosition: "upper",
  },
  {
    id: "02",
    set: "A",
    onScreenText: "Beauty relief.",
    caption: "Relief looks like this.",
    hashtags: ["#BeautySatisfyingReel", "#SoftGlamRoutine", "#USBeautyCreator"],
    textPosition: "lower",
  },
  {
    id: "03",
    set: "A",
    onScreenText: "Nothing to prove.",
    caption: "Nothing to prove tonight.",
    hashtags: ["#PostConfidenceMood", "#MinimalWardrobeNotes", "#TorontoLooks"],
    textPosition: "upper",
  },
  {
    id: "04",
    set: "A",
    onScreenText: "At ease.",
    caption: "At ease, as is.",
    hashtags: ["#AtEaseAesthetic", "#SlowBeautyVisuals", "#VancouverStyleDiary"],
    textPosition: "lower",
  },
  {
    id: "05",
    set: "A",
    onScreenText: "Saved your scroll.",
    caption: "Saved you the scroll.",
    hashtags: ["#SaveWorthyLooks", "#SheerMoodBoard", "#LAFeminineLooks"],
    textPosition: "upper",
  },
  {
    id: "06",
    set: "A",
    onScreenText: "none",
    caption: "Soft light, softer pace.",
    hashtags: ["#QuietEveningLooks", "#CleanBeautyMood", "#MontrealCreatorLife"],
    textPosition: "lower",
  },
  {
    id: "07",
    set: "B",
    onScreenText: "Sheer, softly.",
    caption: "Sheer, then silence.\nI saved it for you.",
    hashtags: ["#SheerOutfitMood", "#QuietLuxuryWomen", "#USReelCreator"],
    textPosition: "upper",
  },
  {
    id: "08",
    set: "B",
    onScreenText: "Beauty relief.",
    caption: "Beauty relief, no noise.\nAlready picked.",
    hashtags: ["#SatisfyingBeautyClip", "#SoftFocusMakeup", "#TorontoBeautyReels"],
    textPosition: "lower",
  },
  {
    id: "09",
    set: "B",
    onScreenText: "Nothing to prove.",
    caption: "Nothing to prove today.\nLink in bio.",
    hashtags: ["#UnderstatedDressing", "#CalmLookbook", "#NYCNightLooks"],
    textPosition: "upper",
  },
  {
    id: "10",
    set: "B",
    onScreenText: "At ease.",
    caption: "At ease in every frame.\nI saved it for you.",
    hashtags: ["#SlowMotionBeauty", "#SheerDetailsOnly", "#VancouverReelMood"],
    textPosition: "lower",
  },
];

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

const startedAt = Date.now();
console.log("Rendering Devi static caption pack (4:5, no image/video)...");

const bundleLocation = await bundle({
  entryPoint: path.resolve(process.cwd(), "./src/index.ts"),
  webpackOverride: (config) => config,
});

for (const concept of concepts) {
  const outputFile = path.join(outputDir, `${concept.id}-${concept.set}.png`);
  const inputProps = {
    onScreenText: concept.onScreenText,
    textPosition: concept.textPosition,
  };
  const composition = await selectComposition({
    serveUrl: bundleLocation,
    id: "DeviCaptionStaticMinimal",
    inputProps,
  });

  await renderStill({
    composition,
    serveUrl: bundleLocation,
    output: outputFile,
    inputProps,
  });

  console.log(`Rendered ${path.basename(outputFile)}`);
}

const manifestPath = path.join(outputDir, "captions.json");
fs.writeFileSync(
  manifestPath,
  JSON.stringify(
    {
      createdAt: new Date().toISOString(),
      format: "1080x1350",
      renderType: "static",
      visuals: {
        background: "solid #0F1014",
        textColor: "#F7F7F7",
        font: "Inter/Helvetica Neue/Arial",
        textWeight: "500",
        textPlacement: "upper or lower third only",
      },
      concepts,
    },
    null,
    2
  ),
  "utf8"
);

const elapsed = ((Date.now() - startedAt) / 1000).toFixed(1);
console.log(`Done. Rendered ${concepts.length} static outputs in ${elapsed}s.`);
console.log(`Manifest: ${manifestPath}`);
