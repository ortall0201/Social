# Playwright helper for Buffer Publish (optional, fragile)

Buffer’s **browser extension** and **Publish UI** are built for humans. This folder is a **best-effort** Playwright scaffold so you can drive **`feed45-buffer-queue.json`** from a logged-in browser session **without** using the GraphQL API (useful when the API **24h** quota is full).

## Before you use this

1. **Terms of Service:** Automating `publish.buffer.com` may **conflict with Buffer’s ToS**. Prefer the [official API](https://developers.buffer.com/guides/getting-started.html) when your Developer Dashboard shows headroom. You are responsible for compliance.
2. **Brittle:** Buffer can change DOM, A/B tests, or flows anytime. If a run fails, use **`npx playwright codegen https://publish.buffer.com`** to re-record selectors and patch `publish-from-queue.mjs`.
3. **Secrets:** `buffer-auth.json` (saved cookies/session) is **gitignored**. Never commit it.

## Setup (once)

```bash
cd devi-feed/imagegen-buffer-2026-04-16/playwright-buffer-queue
npm install
npx playwright install chromium
```

## Save a logged-in session (once per cookie rotation)

```bash
node save-session.mjs
```

A Chromium window opens on Buffer Publish. **Log in** (and complete 2FA) in that window. When the queue/dashboard loads, **press Enter** in the terminal. Session is written to **`buffer-auth.json`** (local only).

## Publish from `feed45-buffer-queue.json`

1. Regenerate URLs if needed:  
   `powershell -File ..\emit-feed45-buffer-payload.ps1`
2. Edit **`SELECTORS`** in `publish-from-queue.mjs` after you run codegen and copy stable selectors for **your** Buffer UI.
3. Run:

```bash
node publish-from-queue.mjs
```

Default queue path: `../feed45-buffer-queue.json`.

The script is intentionally conservative: if selectors are still `TODO`, it will **pause** and tell you to finish the post manually, then you press Enter to continue to the next card.

## Faster path without fixing selectors

Use Buffer’s UI manually and copy **`caption`**, **`imageUrl`**, **`dueAtUtc`** from the JSON (see main `README.md` in the parent folder). That avoids maintaining Playwright when Buffer ships UI changes.
