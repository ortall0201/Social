/**
 * Opens Buffer Publish in Chromium; you log in manually, then press Enter to save storageState.
 * Writes buffer-auth.json (gitignored) in this directory.
 */
import { chromium } from "playwright";
import fs from "fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import readline from "node:readline";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const authPath = path.join(__dirname, "buffer-auth.json");

const browser = await chromium.launch({ headless: false, channel: "chrome" });
const context = await browser.newContext();
const page = await context.newPage();

await page.goto("https://publish.buffer.com/", { waitUntil: "domcontentloaded" });

console.log("\nLog in to Buffer in the browser window.");
console.log("When the dashboard is ready, press Enter here to save session ->", authPath, "\n");

const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
await new Promise((resolve) => rl.question("", resolve));
rl.close();

await context.storageState({ path: authPath });
console.log("Saved storage state.");
await browser.close();
