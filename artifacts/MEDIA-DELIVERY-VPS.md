# Media delivery — VPS first (Remote Iris / Buffer)

**Canonical rule (Ortal preference):** ship **reels and images** from the Hostinger VPS public edge, then schedule Buffer with **HTTPS URLs on that domain** — same idea as **Remote Iris**, not raw GitHub for production creative.

## Public URL shape

After a file is published on the VPS web root:

`https://iris-media.onsight-analytics.com/approved/<filename>`

Examples:

- `https://iris-media.onsight-analytics.com/approved/devi-coachella-w2-2026-04-14-reel.mp4`
- `https://iris-media.onsight-analytics.com/approved/devi-stagecoach-prep-reel-01.mp4`

Exact filesystem path on the server is defined by your Traefik + static volume layout (commonly under something like `/srv/iris/assets/public/approved/` — confirm on the VPS). **Private** archives stay under `/srv/iris/assets/private/` and must **not** be used as Buffer `image_url` / video URL unless that path is intentionally world-readable (it should not be).

## Operator workflow (human or CI with SSH)

1. **Generate** assets locally (Contenty, Motion, ImageGen caption cards, etc.).  
2. **Copy** approved binaries to the VPS **public approved** directory (same basename you want in the URL).  
3. **Verify** from any machine:

   `curl -I "https://iris-media.onsight-analytics.com/approved/<filename>"`

   Expect **HTTP 200** and a sensible `Content-Type` (`image/jpeg`, `image/png`, `video/mp4`).

4. **Schedule Buffer** (local script example — channel IDs from your Buffer account / `local-secrets`):

   ```powershell
   powershell -ExecutionPolicy Bypass -File scripts/buffer/buffer-queue-image-post.ps1 `
     -ChannelId "<IG_CHANNEL_ID>" -Service instagram -PostType post `
     -DueAt "2026-04-18T22:00:00Z" `
     -ImageUrl "https://iris-media.onsight-analytics.com/approved/<image>.jpg" `
     -Text "<caption>"
   ```

   For **reels**, use the same GraphQL contract your Publisher / Buffer integration uses for `assets.videos` + `metadata.instagram.type = "reel"` (see `docs/buffer-publisher-worker.md` when that doc is available in your workspace copy).

5. **GitHub raw** (`raw.githubusercontent.com/...`) stays an **optional fallback** for tiny static tests only — **not** the default for the roadmap grid.

## Why Cursor-local Iris sometimes skipped VPS

The agent session on Ortal’s PC **does not** have your SSH keys or Hostinger shell unless you wire them. Without upload access, Iris cannot mint `iris-media` URLs and must ask you to upload once, then schedule.

## Iris default (after this doc)

When you say **“use VPS”**: Iris assumes media is (or will be) at **`https://iris-media.onsight-analytics.com/approved/<filename>`** and will **not** rely on pushing `contenty/` to GitHub for Buffer (that folder remains **gitignored** by design).

## One-time exception (2026-04-14)

Ortal asked for a **tracked** copy of pipeline outputs **outside** `contenty/` so raw GitHub URLs exist before Codex returns. That lives in repo root **`buffer-delivery/`** (see `buffer-delivery/README.md` + `buffer-delivery/CODEX-HANDOFF-2026-04-14.md`). Remove that folder once VPS upload is routine.
