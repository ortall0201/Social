# Devi feed — ImageGen batch (Buffer)

**Purpose:** Tracked **9:16** stills for **Instagram + Facebook** image posts via Buffer (`scripts/buffer/buffer-queue-image-post.ps1`).

**Source briefs:** `brain/viraly-report-20260414.md` (trends 1–5 + DEVI brief) + Phase D1 scout windows (Met countdown, tunnels, Stagecoach).

**Naming:** `devi-buffer-card-NN.png` — one **distinct** caption per file; do not reuse the same card for multiple posts in the same batch.

**Public URL (after `git push`):**`https://raw.githubusercontent.com/ortall0201/Social/main/devi-feed/imagegen-buffer-2026-04-16/<filename>`

Prefer **`iris-media…/approved/…`** when VPS promotion is available (`brain/iris-status.md`).

## Remotion overlays (headline + Devi subline on image)

From **`devi-remotion/`**:

```bash
npm run render:devi-feed-overlays
```

Copies these PNGs into `devi-remotion/public/devi-feed-buffer/` (gitignored), then writes **`devi-remotion/out/devi-feed-caption-overlays/*-with-caption.png`** + `manifest.json`. **Canonical publish still for on-image type:** copy or track **`with-caption/devi-buffer-card-NN-with-caption.png` (9:16)** so headline + subline stay in full frame.

### Buffer preview vs the real file

Buffer’s web UI often **letterboxes or masks** 9:16 previews; the **bottom** of the frame can look **cut off** even when the **PNG is complete**. To verify pixels, open the **raw image URL** in a new browser tab (full bleed). That clipping is usually **not** what Instagram/Facebook receive—unless Meta applies its own crop rules (see below).

### Instagram feed API and aspect ratio

Scheduling **9:16 single-image feed posts** through Buffer sometimes triggers Meta **media container / dimension** errors (we hit this in Apr 2026). **Facebook** is often more forgiving. If IG rejects 9:16, fall back to **`with-caption/feed-4x5/`** (taller-than-wide feed-safe) **or** use a **Reel (video)** for true 9:16 vertical.

**Optional `feed-4x5/`:** Only if you need IG feed reliability. **Do not center-crop** (that slices bottom type). Use **`manifest.json` `textZone`:** `bottom` → `crop=1080:1350:0:570`; `top` → `crop=1080:1350:0:0`.

### Switch queued Buffer posts back to 9:16

When the Buffer API isn’t rate-limited, from **repo root**:

`pwsh -File devi-feed/imagegen-buffer-2026-04-16/reschedule-buffer-feed-images-916.ps1`

That replaces **`feed-4x5`…** URLs with **`…/with-caption/devi-buffer-card-NN-with-caption.png`** on all **scheduled feed image** posts (IG + FB), keeping caption + time.
