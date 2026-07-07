# Codex handoff — Necklace product campaign + fabric swap (2026-07-07)

**For:** Codex / parallel Cursor sessions  
**From:** Iris session (Cursor) — operator Ortal  
**Mirror:** `contenty/briefs/2026-07-07-necklace-product-campaign-codex-handoff.md` (same content; contenty may be gitignored locally)  
**Session summary:** `brain/memory/session-summaries/2026-07-07-necklace-ab-fabric-swap-session.md`

---

## What was built (do not redo)

### Necklace A/B Buffer reels (LIVE in queue)

| Item | Path / ID |
|------|-----------|
| Manifest | `devi-feed/buffer-carousel-necklace-2026-07/schedule-buffer-carousel-ab.json` |
| Arm A slides | `devi-feed/buffer-carousel-necklace-2026-07/arm-a-hq/slide-01..05.jpg` |
| Arm B slides (4K draft-locked) | `devi-feed/buffer-carousel-necklace-2026-07/arm-b-draft-4k/` |
| Delivery MP4s | `buffer-delivery/necklace-carousel-arm-a-hq-reel.mp4` · `necklace-carousel-arm-b-draft-reel.mp4` |
| Buffer Arm A | post `6a4d57d0996229369d8d1957` — 2026-07-09T14:00:00Z |
| Buffer Arm B | post `6a4d57d28935ac28ce4909d5` — 2026-07-11T14:00:00Z |

**A/B design:** Same `pose-deck.json` + `prompts/slide-*.txt` from necklace pilot — **not pixel-identical** (Seedream vs nano-banana).

**Reel spec:** 2.5s/slide · 0.45s xfade · static holds · `yuv420p` 1080×1920 · raw GitHub + `?v=` · `thumbnailOffset: 0`

### Fabric / wardrobe swap pilot (local preview — NOT queued)

| Item | Path |
|------|------|
| Campaign | `contenty/product-campaigns/2026-07-07-fabric-jewelry-swap-floor/` |
| Reel | `fabric-jewelry-swap-floor-reel.mp4` (Iris Productions signed) |

---

## Pipelines (commands)

See full command blocks in `contenty/briefs/2026-07-07-necklace-product-campaign-codex-handoff.md` or session summary.

| Pipeline | Script |
|----------|--------|
| Pose carousel 1K/4K | `tools/generate-product-pose-carousel.ps1` |
| Draft-locked 4K upscale | `devi-feed/buffer-carousel-necklace-2026-07/upgrade-arm-b-draft-to-4k.ps1` |
| Buffer xfade reel | `build-necklace-carousel-reels-for-buffer.ps1` |
| Wardrobe fabric swap | `tools/generate-fabric-jewelry-swap-floor.ps1` |
| Iris Productions sign | `sign-iris-productions-slides.ps1` |
| Buffer reschedule | `reschedule-necklace-carousel-as-reels.ps1` |

---

## Home signature

**Canon:** `brain/iris-productions-signature-canon.md` — Edwardian Script `Iris` + tracked `PRODUCTIONS`. Operator home signature from 2026-07-07.

---

## Creative stack order

Strategy → Concept → Art direction → Expression deck → Commercial grammar → Gen → Taste score

**Menus:** session **6–9** · capabilities **C** + **P** (P1–P9)

---

## Review summary

| Check | Status |
|-------|--------|
| Recommendation | **Safe for staging** — resume from session summary open items |
