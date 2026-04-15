# Devi feed — ImageGen batch (Buffer)

**Purpose:** Tracked **9:16** stills for **Instagram + Facebook** image posts via Buffer (`scripts/buffer/buffer-queue-image-post.ps1`).

**Source briefs:** `brain/viraly-report-20260414.md` (trends 1–5 + DEVI brief) + Phase D1 scout windows (Met countdown, tunnels, Stagecoach).

**Naming:** `devi-buffer-card-NN.png` — one **distinct** caption per file; do not reuse the same card for multiple posts in the same batch.

**Public URL (after `git push`):** `https://raw.githubusercontent.com/ortall0201/Social/main/devi-feed/imagegen-buffer-2026-04-16/<filename>`

Prefer **`iris-media…/approved/…`** when VPS promotion is available (`brain/iris-status.md`).

### Buffer not showing the latest PNG (stale refetch)

`raw.githubusercontent.com` URLs are often **cached** by URL. Deleting a post and re-adding the **same** link can still show an **old** image.

**Manual scheduling:** paste URLs **with a cache-buster** (GitHub ignores the query; Buffer treats it as a new URL). Generate nine links at once:

```powershell
powershell -File devi-feed/imagegen-buffer-2026-04-16/emit-image-urls-for-buffer.ps1 -Set 1x1
```

Use `-Set feed45` or `-Set 916` for the other Remotion sets.

**API reschedule scripts** append `?v=…` automatically on recreate so Buffer fetches fresh bytes.

### Schedule this batch to Buffer (IG + FB)

1. **API (when not rate-limited):** load `local-secrets/buffer_ids.ps1`, then from repo root:

`powershell -ExecutionPolicy Bypass -File devi-feed/imagegen-buffer-2026-04-16/schedule-feed45-buffer-batch.ps1`

Optional: `-StartUtc "2026-04-16T17:00:00Z"` for the first slot (defaults: tomorrow **17:00 UTC**, then **+1 day** per card). Each post: manifest **headline + subline +** up to **5** themed hashtags; image `with-caption-feed45` + cache-bust.

2. **If Buffer returns `RATE_LIMIT_EXCEEDED`:** run `emit-feed45-buffer-payload.ps1` and use **`feed45-buffer-queue.json`** (or schedule manually from that file). Re-run the batch script after the 24h window.

3. **Windows PC left on — local “cron” + auto-retry:** from repo root, either:
   - **Foreground retry loop** (tries every 60 min until Buffer accepts):  
     `powershell -ExecutionPolicy Bypass -File devi-feed/imagegen-buffer-2026-04-16/run-feed45-buffer-batch-retry.ps1`  
     Optional: `-RetryIntervalMinutes 45`, `-MaxAttempts 0` (default = unlimited). Logs append to `buffer-batch-retry.log` in this folder.
   - **Task Scheduler** (one-shot ~24h ahead by default):  
     `powershell -ExecutionPolicy Bypass -File devi-feed/imagegen-buffer-2026-04-16/register-feed45-buffer-windows-task.ps1`  
     Or `-OnceAt "2026-04-17 09:00"` / `-DailyAtHour 9`. Remove: `-Unregister`.

## Remotion overlays (headline + Devi subline on image)

From **`devi-remotion/`**:

```bash
npm run render:devi-feed-overlays
```

Copies these PNGs into `devi-remotion/public/devi-feed-buffer/` (gitignored), then writes **`devi-remotion/out/devi-feed-caption-overlays/*-with-caption.png`** + `manifest.json`. **Canonical publish still for on-image type:** copy or track **`with-caption/devi-buffer-card-NN-with-caption.png` (9:16)** so headline + subline stay in full frame.

### Buffer preview vs the real file

Buffer’s web UI often **letterboxes or masks** previews and may **scale as if filling a tall phone frame** (similar to CSS `object-fit: cover`). That can **zoom** a **1:1** asset and clip the **lower third**, so on-image captions look cut off even though the **PNG** is fine. **Mitigation:** use **native 4:5** assets (`with-caption-feed45/`, below) so preview aspect matches IG feed, and keep type in the **safe band** (Remotion insets). Always sanity-check by opening the **raw GitHub URL** in a new tab.

For **9:16** stills, the **bottom** of the frame can also look cut off in Buffer; raw URL verifies pixels. Final IG crop still depends on Meta rules (see below).

### Instagram feed API and aspect ratio

Scheduling **9:16 single-image feed posts** through Buffer sometimes triggers Meta **media container / dimension** errors (we hit this in Apr 2026). **Facebook** is often more forgiving. If IG rejects 9:16, fall back to **`with-caption/feed-4x5/`** (taller-than-wide feed-safe) **or** use a **Reel (video)** for true 9:16 vertical.

**Optional `feed-4x5/`:** Only if you need IG feed reliability. **Do not center-crop** (that slices bottom type). Use **`manifest.json` `textZone`:** `bottom` → `crop=1080:1350:0:570`; `top` → `crop=1080:1350:0:0`.

### Native 4:5 (recommended for Buffer + IG feed image posts)

**1080×1350** — same aspect as IG’s primary **single-image feed** surface. The photo **fills** the frame (**`object-fit: cover`**) and headline/subline are an **on-image overlay** (gradient scrim + type), not a separate strip below.

From **`devi-remotion/`**:

```bash
npm run render:devi-feed-overlays-feed45
```

Tracked outputs: **`with-caption-feed45/devi-buffer-card-NN-with-caption-feed45.png`** (+ `manifest.json`).

**Raw URL:** `https://raw.githubusercontent.com/ortall0201/Social/main/devi-feed/imagegen-buffer-2026-04-16/with-caption-feed45/devi-buffer-card-NN-with-caption-feed45.png`

When Buffer isn’t rate-limited:

`pwsh -File devi-feed/imagegen-buffer-2026-04-16/reschedule-buffer-feed-images-feed45.ps1`

That swaps scheduled **feed image** posts from **9:16**, **1:1**, or legacy **`feed-4x5`** crop URLs to this **native Remotion 4:5** file (skips posts already on `with-caption-feed45`).

### 1:1 square (grid-friendly; watch Buffer preview zoom)

Portrait sources use **`object-fit: contain`** in **1080×1080** (pillarboxing possible). Type uses the same **safe-band** logic as 4:5. If Buffer’s queue still **zooms** the preview, prefer **`with-caption-feed45/`** above.

From **`devi-remotion/`**:

```bash
npm run render:devi-feed-overlays-1x1
```

Tracked outputs: **`with-caption-1x1/devi-buffer-card-NN-with-caption-1x1.png`** (+ `manifest.json`).

**Raw URL:** `https://raw.githubusercontent.com/ortall0201/Social/main/devi-feed/imagegen-buffer-2026-04-16/with-caption-1x1/devi-buffer-card-NN-with-caption-1x1.png`

When Buffer isn’t rate-limited, from **repo root**:

`powershell -ExecutionPolicy Bypass -File devi-feed/imagegen-buffer-2026-04-16/reschedule-buffer-feed-images-1x1.ps1`

Add **`-Force`** to re-create posts that already use `with-caption-1x1` (e.g. after a new render). Each recreate uses a fresh `?v=` on the image URL.

That swaps scheduled **feed image** posts from **9:16**, **feed-4x5**, or **feed45** to the matching **1:1** file.

### Switch queued Buffer posts back to 9:16

When the Buffer API isn’t rate-limited, from **repo root**:

`pwsh -File devi-feed/imagegen-buffer-2026-04-16/reschedule-buffer-feed-images-916.ps1`

That replaces **`feed-4x5`…** URLs with **`…/with-caption/devi-buffer-card-NN-with-caption.png`** on all **scheduled feed image** posts (IG + FB), keeping caption + time.
