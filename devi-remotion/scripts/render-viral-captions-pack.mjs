#!/usr/bin/env node
/**
 * Render Viral Caption Pack
 *
 * Generates 24+ minimalistic caption images optimized for viral engagement.
 * These captions align with Devi's beauty & confidence concepts and are designed
 * to trigger emotional responses (happiness, relatability, tears, humor).
 *
 * Strategy: Build community through emotional connection before affiliate marketing.
 */

import { execSync } from "child_process";
import path from "path";
import fs from "fs";
import os from "os";

// Caption library organized by emotional impact
const CAPTION_PACK = {
  // High emotional impact - tear-jerkers (save these)
  emotional: [
    "The version of you that once felt impossible? You're becoming her.",
    "You weren't hard to love. They just weren't ready for your depth.",
    "The woman you're becoming scares the girl you used to be. That's how you know you're on the right path.",
  ],

  // Confidence boosters - relatable & shareable
  confidence: [
    "She's soft. She's tough. She's both, and she doesn't need to pick one.",
    "Main character energy isn't loud. It's quiet certainty.",
    "Not cocky. Just done pretending I'm not that girl.",
    "Romanticize your life until you fall back in love with it.",
  ],

  // Self-love reality checks - validating
  selfLove: [
    "Being 'too much' is only a problem for people who can't handle depth.",
    "You can be a masterpiece and a work in progress at the same time.",
    "Stop trying to shrink yourself to make others comfortable.",
  ],

  // Beauty & self-perception - subtle empowerment
  beauty: [
    "You look different when you stop seeking validation from people who never saw you.",
    "She doesn't wear makeup to impress anyone. She wears it to remind herself who she's becoming.",
    "The version of you that stopped apologizing for taking up space? That's the prettiest one.",
  ],

  // Funny/relatable - engagement drivers
  funny: [
    "POV: You finally understand the assignment.",
    "Being delusional and being confident is the same thing. Choose your side.",
    "Not interested in going back to the version of me that accepted crumbs.",
    "Some people deserve closure. Some people just deserve to be blocked.",
  ],

  // Quick motivation - morning posts
  morning: [
    "Start your day like you already won.",
    "Soft girl era with sharp boundaries.",
    "What if this is the year everything changes?",
  ],

  // Deep reflections - late-night posts
  night: [
    "The universe will keep giving you the same lesson until you finally learn it.",
    "You're not losing friends. You're just finding out who was never really there.",
    "One day you'll look back and realize you were never stuck. You were just planting roots.",
  ],
};

// Theme selection for variety
const THEMES = ["dark", "warm", "soft", "bold"];

console.log("🎯 Generating Viral Caption Pack for Devi");
console.log("━".repeat(60));
console.log("Strategy: Emotional connection → Community building → Future affiliates");
console.log("Format: Minimalistic text on gradient backgrounds");
console.log("Dimensions: 1080x1350 (4:5 ratio - Instagram optimized)");
console.log("━".repeat(60));
console.log("");

let renderCount = 0;
const outputDir = path.join(process.cwd(), "out", "viral-captions");

// Render function using JSON file (Windows-compatible)
function renderCaption(caption, category, index, theme) {
  const sanitizedCaption = caption
    .substring(0, 50)
    .replace(/[^a-zA-Z0-9\s]/g, "")
    .replace(/\s+/g, "-")
    .toLowerCase();

  const outputFile = `devi-caption-${category}-${index + 1}-${theme}.png`;
  const outputPath = path.join(outputDir, outputFile);

  console.log(`📸 Rendering: ${category} #${index + 1} (${theme} theme)`);
  console.log(`   "${caption.substring(0, 60)}${caption.length > 60 ? "..." : ""}"`);

  // Create temporary JSON file for props (Windows-compatible)
  const tempPropsFile = path.join(os.tmpdir(), `devi-caption-props-${Date.now()}.json`);
  const propsData = {
    caption: caption,
    theme: theme,
  };

  try {
    // Write props to temp file
    fs.writeFileSync(tempPropsFile, JSON.stringify(propsData, null, 2));

    // Render using props file
    execSync(
      `npx remotion still src/index.ts DeviViralCaptionMinimal "${outputPath}" --props="${tempPropsFile}" --width=1080 --height=1350`,
      {
        stdio: "inherit",
        cwd: process.cwd(),
      }
    );

    // Clean up temp file
    fs.unlinkSync(tempPropsFile);

    renderCount++;
    console.log(`   ✅ Saved: ${outputFile}\n`);
  } catch (error) {
    // Clean up temp file on error
    if (fs.existsSync(tempPropsFile)) {
      fs.unlinkSync(tempPropsFile);
    }
    console.error(`   ❌ Failed: ${outputFile}\n`);
  }
}

// Render each category with theme variety
Object.entries(CAPTION_PACK).forEach(([category, captions]) => {
  console.log(`\n🎨 Category: ${category.toUpperCase()}`);
  console.log("─".repeat(60));

  captions.forEach((caption, index) => {
    // Rotate through themes for variety
    const theme = THEMES[index % THEMES.length];
    renderCaption(caption, category, index, theme);
  });
});

console.log("\n" + "━".repeat(60));
console.log(`✨ Caption Pack Complete: ${renderCount} images rendered`);
console.log(`📁 Output: ${outputDir}`);
console.log("━".repeat(60));
console.log("\n📋 Usage Guide:");
console.log("   • Post 2-3x daily at peak engagement times");
console.log("   • Mix emotional/funny/motivational for variety");
console.log("   • Monitor which themes get highest saves/shares");
console.log("   • Use emotional captions for evening posts");
console.log("   • Use morning/funny for daytime posts");
console.log("   • Track engagement to refine caption style");
console.log("\n🎯 Goal: Build emotional connection → Grow community → Prepare for affiliates");
console.log("");
