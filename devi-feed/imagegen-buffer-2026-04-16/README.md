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

Copies these PNGs into `devi-remotion/public/devi-feed-buffer/` (gitignored), then writes **`devi-remotion/out/devi-feed-caption-overlays/*-with-caption.png`** + `manifest.json`. Use overlaid stills for Buffer if you want on-image type; plain cards stay in this folder for caption-only posts.
