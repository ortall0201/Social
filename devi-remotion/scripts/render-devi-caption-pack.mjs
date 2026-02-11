#!/usr/bin/env node
import { bundle } from "@remotion/bundler";
import { getCompositions, renderMedia } from "@remotion/renderer";
import fs from "node:fs";
import path from "node:path";

const outputDir = path.join(process.cwd(), "out", "devi-caption-pack-4x5");

const concepts = [
  {
    id: "01",
    set: "A",
    onScreenText: "Sheer as calm.",
    caption: "Sheer feels quieter today.",
    hashtags: ["#SheerDressing", "#QuietLuxuryMood", "#NYCOutfitDiary"],
    textPosition: "upper",
    videoSrc: "videos/beauty-reel-1.mp4",
  },
  {
    id: "02",
    set: "A",
    onScreenText: "Beauty relief.",
    caption: "Relief looks like this.",
    hashtags: ["#BeautySatisfyingReel", "#SoftGlamRoutine", "#USBeautyCreator"],
    textPosition: "lower",
    videoSrc: "videos/beauty-reel-2.mp4",
  },
  {
    id: "03",
    set: "A",
    onScreenText: "Nothing to prove.",
    caption: "Nothing to prove tonight.",
    hashtags: ["#PostConfidenceMood", "#MinimalWardrobeNotes", "#TorontoLooks"],
    textPosition: "upper",
    videoSrc: "videos/beauty-reel-3.mp4",
  },
  {
    id: "04",
    set: "A",
    onScreenText: "At ease.",
    caption: "At ease, as is.",
    hashtags: ["#AtEaseAesthetic", "#SlowBeautyVisuals", "#VancouverStyleDiary"],
    textPosition: "lower",
    videoSrc: "videos/k-style.mp4",
  },
  {
    id: "05",
    set: "A",
    onScreenText: "Saved your scroll.",
    caption: "Saved you the scroll.",
    hashtags: ["#SaveWorthyLooks", "#SheerMoodBoard", "#LAFeminineLooks"],
    textPosition: "upper",
    videoSrc: "videos/street-clothes.mp4",
  },
  {
    id: "06",
    set: "A",
    onScreenText: "none",
    caption: "Soft light, softer pace.",
    hashtags: ["#QuietEveningLooks", "#CleanBeautyMood", "#MontrealCreatorLife"],
    textPosition: "lower",
    videoSrc: "videos/reel3.mp4",
  },
  {
    id: "07",
    set: "B",
    onScreenText: "Sheer, softly.",
    caption: "Sheer, then silence.\nI saved it for you.",
    hashtags: ["#SheerOutfitMood", "#QuietLuxuryWomen", "#USReelCreator"],
    textPosition: "upper",
    videoSrc: "videos/reel1.mp4",
  },
  {
    id: "08",
    set: "B",
    onScreenText: "Beauty relief.",
    caption: "Beauty relief, no noise.\nAlready picked.",
    hashtags: ["#SatisfyingBeautyClip", "#SoftFocusMakeup", "#TorontoBeautyReels"],
    textPosition: "lower",
    videoSrc: "videos/reel2.mp4",
  },
  {
    id: "09",
    set: "B",
    onScreenText: "Nothing to prove.",
    caption: "Nothing to prove today.\nLink in bio.",
    hashtags: ["#UnderstatedDressing", "#CalmLookbook", "#NYCNightLooks"],
    textPosition: "upper",
    videoSrc: "videos/devi-fashion.mp4",
  },
  {
    id: "10",
    set: "B",
    onScreenText: "At ease.",
    caption: "At ease in every frame.\nI saved it for you.",
    hashtags: ["#SlowMotionBeauty", "#SheerDetailsOnly", "#VancouverReelMood"],
    textPosition: "lower",
    videoSrc: "videos/walk-away.mp4",
  },
];

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

const renderAll = async () => {
  console.log("Rendering Devi caption pack (4:5)...");
  const startedAt = Date.now();

  const bundleLocation = await bundle({
    entryPoint: path.resolve(process.cwd(), "./src/index.ts"),
    webpackOverride: (config) => config,
  });

  const compositions = await getCompositions(bundleLocation);
  const composition = compositions.find((c) => c.id === "DeviCaptionMinimalReel");

  if (!composition) {
    throw new Error("Composition DeviCaptionMinimalReel not found.");
  }

  for (const concept of concepts) {
    const outputFile = path.join(outputDir, `${concept.id}-${concept.set}.mp4`);
    console.log(`Rendering ${concept.id}-${concept.set} -> ${outputFile}`);

    await renderMedia({
      serveUrl: bundleLocation,
      composition,
      codec: "h264",
      outputLocation: outputFile,
      inputProps: {
        videoSrc: concept.videoSrc,
        onScreenText: concept.onScreenText,
        textPosition: concept.textPosition,
      },
    });
  }

  const manifestPath = path.join(outputDir, "captions.json");
  fs.writeFileSync(
    manifestPath,
    JSON.stringify(
      {
        createdAt: new Date().toISOString(),
        format: "1080x1350",
        style: {
          textPlacement: "upper/lower third only",
          textColor: "#F7F7F7",
          animation: "fade-in only (8 frames @ 30fps)",
          font: "Inter/Helvetica Neue/Arial, medium",
        },
        concepts,
      },
      null,
      2
    ),
    "utf8"
  );

  const elapsed = ((Date.now() - startedAt) / 1000).toFixed(1);
  console.log(`Done. Rendered ${concepts.length} reels in ${elapsed}s.`);
  console.log(`Caption manifest: ${manifestPath}`);
};

renderAll().catch((err) => {
  console.error("Render failed:", err);
  process.exit(1);
});
