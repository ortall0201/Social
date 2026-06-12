# Devi Repeat Mechanisms — operator menu (canon)

**Status:** CONFIRMED / operator-approved mechanisms only — load before any new batch  
**Established:** 2026-06-02 (Iris session — scene-morph v2 “NAILED IT” + consolidation of prior wins)  
**Owner:** Iris + operator  
**Creative layer:** `brain/devi-bisociation-reels-rule.md` — Matrix A + Matrix B + shared axis **before** picking a mechanism  
**Commercial grammar (all mechanisms):** `brain/devi-commercial-reel-grammar.md` — NOT runway walk default  
**Session keyword:** **`mechanisms`** · **`repeat batch`** · **`new batch`** · **`scene-morph`** · **`scene-flash`** · **`deploy devi`** · **`deploy-devi`**

---

## How to use this menu

When the operator says *“new batch”*, *“repeat mechanism”*, or picks a number below:

1. Read **bisociation** block for the event sentence (Fashion is Art, etc.).
2. Pick **one mechanism lane** (or a paired batch: 5+5 like scene-morph).
3. Load the **canon file** + **gen runner** + **last worked batch** as template.
4. Clone batch scaffold (`batch-slots.json` pattern) — do **not** remix mechanisms without operator OK.
5. **Buffer rule:** use **versioned filenames** (`*-v2-balletart.mp4`, `*-v2-jumpland.mp4`) — never re-schedule same filename after creative pivot (cache trap).

---

## Operator menu — validated mechanisms

| # | Mechanism ID | One-line feel | Status | Canon | Gen / batch |
|---|--------------|---------------|--------|-------|-------------|
| **1** | `fia-concept-transfer` | Met/FIA **concept stays, look transfers** — PD art → Devi couture geometry, multi-stage WOW | ✅ 46-reel pack proven | `brain/devi-fashion-is-art-workflow-canon.md` | `tools/run-met-gala-fashion-is-art-2026-05-08-generate-40.ps1` · pack JSON in `contenty/briefs/` |
| **2** | `scene-flash-on-the-go` | **Paparazzi white-flash cuts** while Devi moves — **3 scenes, same outfit**, commercial micro-motion (NOT runway) | ✅ 15/15 Buffer scheduled Jun 2026 | `brain/devi-flash-swap-mechanism.md` | `tools/generate-fia-scene-flash-slot.ps1` · `tools/run-fia-scene-flash-batch-02-15.ps1` |
| **3** | `dance-morph-v2` | **Ballet-art editorial dance** in place — port de bras, arabesque, Degas/Vogue — scenes **crossfade** (0.5s), living artwork | ✅ **NAILED IT** 2026-06-02 | `brain/devi-scene-morph-mechanisms.md` § dance-morph | `tools/generate-fia-scene-morph-slot.ps1` · mechanism=`dance-morph` |
| **4** | `jump-land-v2` | **Vogue chic leap** from rooftop / plane / balcony / mezzanine → land **surprised + happy** in art destinations — snap cut (0.12s) | ✅ **NAILED IT** 2026-06-02 | `brain/devi-scene-morph-mechanisms.md` § jump-land | same gen script · mechanism=`jump-land` |
| **5** | `arm-p-parody-bisociation` | FIA **parody collisions** — security / deco lines / limo flash / afterparty — one bisociation per reel, taste-scored | ✅ T3 v8 → scene-flash template | `brain/devi-bisociation-reels-rule.md` · taste: T3 v8 score | `tools/generate-fia-parody-t*.ps1` · `devi-feed/buffer-reels-fia-parody-ab-2026-05/` |
| **6** | `flash-swap-editorial` | Parent grammar: **one dimension per flash** (color OR scene OR outfit) — light-is-art | ✅ Mechanism confirmed | `brain/devi-flash-swap-mechanism.md` | Use inside parody or scene-flash; not mixed dimensions |
| **7** | `commercial-beat-map` | Underlying **4–6 beats / 10s** — hook → reveal → escalation → payoff | ✅ Hard rule all pipelines | `brain/devi-commercial-reel-grammar.md` | Every Kling prompt — MARK A–E |
| **8** | `deploy-devi-compose` | **Glam snaps on real clicks** → IG crawl overlays → **Iris café BTS reveal** + smoke payoff | ✅ **NAILED IT** 2026-06-12 (v5c) | `brain/devi-deploy-devi-mechanism.md` | `tools/assemble-manychat-contest-reel-v5c.ps1` · compose on approved jump-land |

**Default paired batch (operator favorite 2026-06-02):** **5 × #3 dance-morph** + **5 × #4 jump-land** = 10 reels, same FIA glam rotation, bisociated art lanes per slot.

**Meta / BTS batch (operator 2026-06-12):** **Deploy Devi (#8)** on top of approved **jump-land (#4)** footage — compose-only, no middle regen.

---

## Mechanism details (quick retrieve)

### 1 — FIA concept transfer
- **Bisociation:** event “Fashion is Art” + PD art reference + Devi as icon/object.
- **NOT:** celebrity copy, single carpet walk, one-beat WOW.
- **Worked example:** `brain/met-gala-fashion-is-art-2026-05-09-step-up-handoff.md`
- **Menu hook:** session option **4** · keyword **`fia`** · **`fashion is art`**

### 2 — Scene-flash on the go
- **Stitch:** 80ms **white flash** between 3 segments (~3.5/3.5/3.0s).
- **Motion:** commercial micro-beats per slot (`motionA/B/C`) — clutch, pivot, chin — **reject runway walk**.
- **Batch:** `exp-2026-fia-scene-flash-batch-v1` · `m-fia-sf-01..15` · scheduled Jun 3–17 2026.
- **Slot 01 alias:** `m-fia-parody-t3-limo-flash` v8.

### 3 — Dance-morph v2 (ballet-art)
- **Stitch:** ffmpeg **xfade 0.5s** — continuous feel, no snap teleport.
- **Motion:** ballet-art editorial — port de bras, arabesque, plié, relevé; **reject** club/tiktok dance.
- **Scenes:** art-history installations (Degas studio, Rodin garden, Klimt hall, Monet lily, white cube, Bauhaus, etc.).
- **Batch data fields:** `fiaArtLane`, `danceStyle`, `motionA/B/C`, `glam` G1–G10.
- **Worked batch:** `contenty/fia-scene-morph-batch-10-2026-06/` · pilots + batch v2 Buffer filenames `*-v2-balletart.mp4`.

### 4 — Jump-land v2 (Vogue)
- **Stitch:** **xfade 0.12s** snap at jump peak.
- **Launch:** `launchFrom` — skyscraper ledge, airplane door, art deco balcony, brutalist roof, museum mezzanine.
- **Land:** first 0.5s surprised **and happy**, chic Vogue recovery — **not** scared/panic.
- **Destinations:** yacht ocean, carnival color, riad fountain, jungle cathedral, igloo aurora, waterfall lagoon, etc.
- **Worked batch:** same folder · `*-v2-jumpland.mp4` · slot **09** pending if credit exhausted.

### 5 — Arm-P parody (bisociation one-offs)
- **T1** Security · **T2** Deco lines / Plaque · **T3** Limo flash (v8 canonical) · **T3** Afterparty variants.
- **Use when:** testing a **new collision** before scaling to 10–30 homogenous mechanism batches.
- **Folder:** `devi-feed/buffer-reels-fia-parody-ab-2026-05/`

### 6 — Flash-swap (dimension picker)
- Pick **ONE** per reel: color-flash | scene-flash | outfit-flash.
- Scene-flash v1 (#2) is the scaled homogenous expression of this lane.

### 8 — Deploy Devi compose (glam + clicks + BTS reveal)
- **Bisociation:** Devi impossible glamour (A) + operator clicks/DMs/Iris ops (B) on **deployed icon** axis.
- **Stitch:** hard cut at clicks — **no** black placeholders; ~0.5s real hand inserts between glam beats.
- **Glam source:** approved **jump-land** segments (e.g. sm-06 fall/yacht/shore) — **compose only**, do not regen middle.
- **Overlays:** IG notification crawl on glam beats (DM sent, scheduled, new lead).
- **Reveal:** keyboard POV up → operator + **Iris BTS** café (`iris-bts-persona-primary`) → smoke fourth-wall payoff.
- **Optional end:** typographic sticker slide (contest / campaign).
- **Worked example:** `m-manychat-myrealjob-v5c.mp4` · canon `brain/devi-deploy-devi-mechanism.md`
- **Assembly:** `tools/assemble-manychat-contest-reel-v5c.ps1` · clicks `generate-manychat-click-inserts.ps1` · Iris `generate-manychat-contest-reel-v5-iris-cafe.ps1`

---

## New batch checklist (any mechanism)

```
[ ] Bisociation block written (Matrix A, B, shared axis)
[ ] Mechanism ID picked from menu above
[ ] Canon file + last batch-slots.json read
[ ] Glam lane + art lane / launchFrom per slot defined
[ ] Pilot 2 reels (one per mechanism if paired batch)
[ ] Operator taste OK ("NAILED IT" bar)
[ ] Versioned buffer-delivery filenames
[ ] Buffer schedule once per slot (delete stale duplicates)
```

---

## File map (batch scaffolding)

| Artifact | Path |
|----------|------|
| **This menu** | `brain/devi-repeat-mechanisms-menu.md` |
| Deploy Devi mechanism | `brain/devi-deploy-devi-mechanism.md` |
| Deploy Devi storyboard (v5c) | `contenty/briefs/manychat-deploy-devi-v5-storyboard-2026-06.md` |
| Deploy Devi worked mp4 | `devi-feed/buffer-reels-fia-scene-morph-contest-manychat-2026-06/m-manychat-myrealjob-v5c.mp4` |
| Scene-morph v2 brief | `contenty/briefs/fia-scene-morph-batch-10-2026-06-brief.md` |
| Scene-morph slots | `contenty/fia-scene-morph-batch-10-2026-06/batch-slots.json` |
| Scene-flash brief | `contenty/briefs/fia-scene-flash-batch-30-2026-06-brief.md` |
| Scene-flash slots | `contenty/fia-scene-flash-batch-30-2026-06/batch-slots.json` |
| FIA workflow | `brain/devi-fashion-is-art-workflow-canon.md` |
| Learning / taste | `brain/learning-patterns.md` · `brain/devi-operator-taste-score.md` |

---

## Retrieve tags

`repeat-mechanisms` `mechanism-menu` `dance-morph-v2` `jump-land-v2` `scene-flash` `fia-concept-transfer` `deploy-devi-compose` `deploy-devi` `click-reveal` `iris-bts-cafe` `bisociation` `operator-nailed-it` `batch-scaffold`

---

*Operator 2026-06-02: “you finally got bisociated” — scene-morph v2 pairs FIA art lanes (Matrix A) with ballet/Vogue motion grammar (Matrix B) on shared icon/object axis. Repeat this menu before inventing new mechanism names.*
