# Iris Productions — home signature (canon)

**Established:** 2026-07-07 (operator: *"this is your home signature from now on"*)  
**Owner:** Iris  
**Status:** Default production credit on **operator-approved** Devi campaign deliverables (stills + stitched reels)

---

## What it is

**Iris Productions** is Iris's permanent cinematic credit — not a corner watermark, a **film-outro style** signature burned into delivery frames.

| Layer | Spec |
|-------|------|
| **Primary** | `Iris` — Edwardian Script ITC (`ITCEDSCR.TTF`), ~78px, white @94% |
| **Secondary** | `P R O D U C T I O N S` — tracked small caps (Segoe UI), ~14px, white @82% |
| **Placement** | Center-bottom (script ~128px from bottom; caps ~58px from bottom) |
| **Legibility** | Thin dark border + soft shadow on both lines |

---

## When to apply

| Apply | Skip |
|-------|------|
| Product campaign signed reels (pose carousel, fabric swap, wardrobe swap) | Raw gen drafts before operator approval |
| Operator asks *"sign it"* / *"put your name on it"* | Viral Pipeline A reach tests (unless operator requests) |
| Buffer-bound `buffer-delivery/` packages when Ortal wants Iris credit | Ortal LinkedIn lane (separate character pack) |
| Preview reels handed off for review when credit requested | Re-stitch of already-signed approved asset (idempotent) |

**Rule:** Signature is **post-approval craft** unless operator explicitly requests on preview.

---

## How to run (repo)

```powershell
# Sign slides (writes slides/signed/slide-01..05.jpg)
powershell -ExecutionPolicy Bypass -File contenty/product-campaigns/<campaign>/sign-iris-productions-slides.ps1

# Rebuild reel from signed slides
powershell -ExecutionPolicy Bypass -File contenty/product-campaigns/<campaign>/build-fabric-jewelry-swap-reel.ps1 -UseSignedSlides
```

**Canonical first implementation:** `contenty/product-campaigns/2026-07-07-fabric-jewelry-swap-floor/sign-iris-productions-slides.ps1`

**Fonts (copied per campaign dir):** `credit-script.ttf` · `credit-sans.ttf`

**Menu:** capabilities **P9** · session menu **option 9** (see `docs/iris-operator-capabilities-menu.md`)

---

## ffmpeg filter (reference)

```
drawtext=fontfile=credit-script.ttf:text=Iris:fontcolor=white@0.94:fontsize=78:...:x=(w-tw)/2:y=h-128,
drawtext=fontfile=credit-sans.ttf:text=P\ R\ O\ D\ U\ C\ T\ I\ O\ N\ S:fontcolor=white@0.82:fontsize=14:...:x=(w-tw)/2:y=h-58
```

Run ffmpeg from campaign directory so `fontfile=` paths resolve without Windows drive-colon escaping issues.

---

## Operator note (2026-07-07)

Operator approved cinematic script + tracked caps after rejecting plain Segoe corner watermark. **This is the home signature.**
