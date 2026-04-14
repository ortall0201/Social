# `buffer-delivery/` — one-time bridge (not gitignored)

**Why this folder exists:** `contenty/` is **gitignored**, so Buffer cannot use `raw.githubusercontent.com/.../contenty/...` until files live in a **tracked** path. This directory is a **temporary** copy of approved Coachella W2 + Stagecoach assets so they can be **committed + pushed** and scheduled via raw GitHub **only until** the VPS `iris-media` flow is the default.

**Do not treat this as the long-term content home.** Prefer:

- **`artifacts/MEDIA-DELIVERY-VPS.md`** — canonical VPS → `https://iris-media.onsight-analytics.com/approved/<file>` → Buffer.

**After VPS upload works for these same files:** you can delete this folder from the repo (or stop updating it) and schedule from `iris-media` URLs only.

## Files in this folder (2026-04-14 copy)

| File | Source (`contenty/` — local only) |
|------|-------------------------------------|
| `devi-coachella-w2-2026-04-14-reel.mp4` | `contenty/coachella-w2-2026-04-14/` |
| `devi-coachella-w2-2026-04-14-image.jpg` | same |
| `devi-stagecoach-prep-reel-01.mp4` | `contenty/stagecoach-prep-2026-04-14/` |
| `devi-stagecoach-prep-image-01.jpg` | same |

Post-push raw GitHub URLs (replace branch if needed; `main` assumed):

- `https://raw.githubusercontent.com/ortall0201/Social/main/buffer-delivery/devi-coachella-w2-2026-04-14-reel.mp4`
- `https://raw.githubusercontent.com/ortall0201/Social/main/buffer-delivery/devi-coachella-w2-2026-04-14-image.jpg`
- `https://raw.githubusercontent.com/ortall0201/Social/main/buffer-delivery/devi-stagecoach-prep-reel-01.mp4`
- `https://raw.githubusercontent.com/ortall0201/Social/main/buffer-delivery/devi-stagecoach-prep-image-01.jpg`
