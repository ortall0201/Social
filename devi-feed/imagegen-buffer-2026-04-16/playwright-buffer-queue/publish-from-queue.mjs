/**
 * Reads ../feed45-buffer-queue.json and walks each item in a logged-in Buffer session.
 *
 * Fill SELECTORS after: npx playwright codegen https://publish.buffer.com
 * Until then, the script opens Buffer and pauses so you finish each post manually.
 */
import { chromium } from "playwright";
import fs from "fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import readline from "node:readline";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const authPath = path.join(__dirname, "buffer-auth.json");
const defaultQueue = path.join(__dirname, "..", "feed45-buffer-queue.json");

const queuePath = process.argv[2] || defaultQueue;

/** @type {Record<string, string | null>} null = not set → manual pause only */
const SELECTORS = {
  openComposer: null,
  captionInput: null,
  imageUrlInput: null,
  scheduleCustom: null,
  scheduleDateTime: null,
  addToQueueOrSchedule: null,
};

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

function promptEnter(msg) {
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
  return new Promise((resolve) => {
    rl.question(msg, () => {
      rl.close();
      resolve();
    });
  });
}

if (!fs.existsSync(authPath)) {
  console.error("Missing buffer-auth.json. Run: node save-session.mjs");
  process.exit(1);
}

if (!fs.existsSync(queuePath)) {
  console.error("Missing queue file:", queuePath);
  process.exit(1);
}

const queue = JSON.parse(fs.readFileSync(queuePath, "utf8"));
const configured = Object.values(SELECTORS).every(
  (v) => typeof v === "string" && v.length > 0
);

const browser = await chromium.launch({ headless: false, channel: "chrome" });
const context = await browser.newContext({ storageState: authPath });
const page = await context.newPage();

try {
  for (const item of queue) {
    const { card, caption, imageUrl, dueAtUtc } = item;
    console.log("\n--- Card", card, "---");
    await page.goto("https://publish.buffer.com/", { waitUntil: "domcontentloaded" });
    await sleep(1500);

    if (configured) {
      await page.click(SELECTORS.openComposer);
      await page.locator(SELECTORS.captionInput).click();
      await page.locator(SELECTORS.captionInput).fill(
        typeof caption === "string" ? caption.replace(/\\n/g, "\n") : ""
      );
      if (SELECTORS.imageUrlInput) {
        await page.locator(SELECTORS.imageUrlInput).fill(imageUrl);
      }
      console.log("Filled via SELECTORS. Pick channels + confirm schedule in UI if needed.");
      console.log("Target UTC:", dueAtUtc);
    } else {
      console.log("Caption:\n", caption);
      console.log("Image URL:", imageUrl);
      console.log("Schedule (UTC):", dueAtUtc);
      console.log(
        "\nSet SELECTORS in publish-from-queue.mjs (use npm run codegen), or finish manually in the browser."
      );
    }

    await promptEnter("Press Enter when this card is scheduled (or skipped)… ");
  }
} finally {
  await browser.close();
}

console.log("\nDone.");
