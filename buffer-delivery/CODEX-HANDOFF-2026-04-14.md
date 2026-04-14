# Codex handoff — VPS media + Buffer + roadmap backlog (2026-04-14)

**Context from Ortal:** Cursor / Composer credits are tapped; she will pick this up in **~3 days** on **Codex** with fresh credits. Until then, Iris used a **one-time** tracked folder **`buffer-delivery/`** (outside `contenty/` gitignore) so reels/stills can be pushed and scheduled via **raw GitHub** if needed.

---

## North star for this handoff

1. **Production default:** Devi images + reels for Buffer should be served from the **VPS public edge**:

   `https://iris-media.onsight-analytics.com/approved/<filename>`

   (See committed `artifacts/MEDIA-DELIVERY-VPS.md` in Social repo.)

2. **`contenty/` stays gitignored** — do not rely on committing pipeline output there.

3. **`buffer-delivery/` is temporary** — bridge only until upload-to-VPS is automated or Ortal always uploads before schedule.

---

## What Iris already did (Composer session)

- Roadmap + rules: Event Scout + Viraly refresh, caption-card rules (unique visual per caption, no `devi-face-primary` as publish creative), Buffer lane labels, VPS preference documented.
- Scheduled **4 Buffer posts** (2 caption-card PNGs × IG + FB) using **raw GitHub** after push (`artifacts/devi-captions/`).
- **Blocked earlier:** IG Buffer pending queue 10/10; reel scheduling needed HTTPS; no VPS SSH from Cursor session.
- **Copied once** from local `contenty/` into **`buffer-delivery/`** (this folder) so Ortal can **commit + push** and get raw URLs for **MP4 + JPG** without touching gitignored `contenty/`.

---

## Codex — suggested task list (when credits return)

### P0 — VPS delivery path (make Remote Iris real)

- [ ] Confirm exact **filesystem path** on Hostinger for “approved public” objects that map to `https://iris-media.onsight-analytics.com/approved/<filename>` (Traefik + volume).
- [ ] Add a **small operator script** or doc’d `scp`/`rsync` one-liner: local `contenty/...` or CI artifact → VPS `.../approved/`.
- [ ] Add a **smoke check**: `curl -I` on each URL before any Buffer call.

### P1 — Buffer scheduling

- [ ] After URLs exist on **iris-media**, schedule remaining **roadmap reels** (Coachella W2 + Stagecoach MP4s in `buffer-delivery/` or fresh Contenty output) to **Devi IG** + optional **Devi FB** mirror with agreed lane (`ig_fb_mirror` / `ig_then_fb_delay`).
- [ ] Confirm Buffer GraphQL supports **Instagram reel** with `assets.videos[0].url` + `metadata.instagram.type = "reel"` (Publisher already probed FB video path).
- [ ] Respect **IG pending cap**; surface friendly error if limit reached.

### P2 — Cleanup

- [ ] Once VPS path is trusted, **remove `buffer-delivery/`** from repo (or leave README only) so large binaries do not live in Git long-term.

### P3 — Scheduler Worker alignment

- [ ] Re-read `docs/buffer-publisher-worker.md` + `invoke-buffer-approved-*.ps1` (workspace copy): ensure **approved publish intent** flow matches Ortal’s dashboard when not using dev `buffer-queue-*.ps1` bypass.

---

## File inventory (for immediate testing after `git push`)

In repo root **`buffer-delivery/`**:

- `devi-coachella-w2-2026-04-14-reel.mp4`
- `devi-coachella-w2-2026-04-14-image.jpg`
- `devi-stagecoach-prep-reel-01.mp4`
- `devi-stagecoach-prep-image-01.jpg`

**Ortal:** `git add buffer-delivery/` → commit → push (large files; LFS optional if Git complains).

---

## Contacts / docs (repo)

- `artifacts/MEDIA-DELIVERY-VPS.md`
- `artifacts/devi-captions/README.md`
- `brain/event-scout-2026-04-14.md` (local)
- `brain/viraly-report-20260414.md` (local)
- `brain/growth-roadmap-q2-2026.md` Phase D1 (local)

---

*Handoff written by Iris (Composer) for Codex continuation ~2026-04-17.*
