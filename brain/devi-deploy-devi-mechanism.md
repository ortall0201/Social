# Devi Deploy Devi — compose mechanism (glam + clicks + BTS reveal)

**Status:** **OPERATOR APPROVED — repeat mechanism** (2026-06-12 · Manychat v5c submit)  
**Mechanism ID:** `deploy-devi-compose`  
**Menu index:** `brain/devi-repeat-mechanisms-menu.md` (#8)  
**Worked example:** `devi-feed/buffer-reels-fia-scene-morph-contest-manychat-2026-06/m-manychat-myrealjob-v5c.mp4`  
**Taste score:** `brain/memory/taste-scores/2026-06-12-manychat-myrealjob-v5c.taste-score.json` · **repeat mechanism**

**Parent stack:** `brain/devi-bisociation-reels-rule.md` · `brain/devi-commercial-reel-grammar.md` · jump-land source footage (#4 in menu)

---

## One-line feel

**Impossible Devi glamour snaps on real operator clicks — then the camera finds you and Iris at the keyboard.**

Devi is the deployed output. The café is the control room. Every luxury beat is preceded by a **real finger click**.

---

## When to use

| Use | Don't use |
|-----|-----------|
| Meta / BTS / “how this account runs” reels | Pure editorial FIA packs with no ops layer |
| Contest or campaign needing **creator-life** proof | Typography-only reels (v1 killed) |
| Pair with **approved** jump-land or scene-morph footage | Regen Devi middle when operator reel already exists |
| Showcase **Iris BTS director** persona | Cozy reader Iris ref (`iris-character-primary.jpg`) |

**Keywords:** `deploy devi` · `deploy-devi` · `click reveal` · `ops reveal` · `iris bts café`

---

## Bisociation (required)

| | |
|--|--|
| **Matrix A** | Devi impossible glamour — fall, yacht, shore, icon destinations |
| **Matrix B** | Operator ops — clicks, DMs, schedules, Iris, laptop |
| **Shared axis** | **Deployed icon** — Devi is output; human + Iris run the system |
| **Bridge** | Real **click insert** between every glam beat |
| **Frame-0** | Devi mid-action (fall / jump exit) — no text dependency |
| **Payoff** | Iris fourth-wall smoke OR typographic “IT'S A REAL JOB” slide |

---

## Beat map (~18–22s)

| Beat | Duration | Content | Source |
|------|----------|---------|--------|
| **1 Hook** | 0–2.5s | Devi fall / jump exit + optional top chip | Approved jump-land seg A trim |
| **Click #1** | ~0.5s | Nail-polish hand · trackpad · café bokeh | Generated or filmed insert |
| **2 Glam A** | 3–6.5s | Yacht / destination 1 + IG notification crawl | Approved seg B |
| **Click #2** | ~0.5s | Second click · faster cadence | Same hand insert |
| **3 Glam B** | 7–10s | Shore / destination 2 + crawl overlays | Approved seg C |
| **4 BTS reveal** | 10–14.5s | Keyboard POV up → operator + Iris café | Iris BTS gen (`iris-bts-persona-primary`) |
| **5 Iris payoff** | 14.5–17.5s | Iris looks at camera · smoke exhale | Iris smoke segment |
| **6 End** (optional) | 17.5–19s | Sticker slide / “REAL JOB” typography | Compose-only |

**Runtime split:** ~55% Devi glam · ~45% ops reveal (operator praised Iris café ending).

---

## Hard rules

1. **Compose on approved footage** — reuse jump-land / scene-morph segments; do **not** regen Devi middle without explicit operator ask.
2. **Real click inserts** — generated or filmed nail-polish trackpad clips; **never** black placeholders between scenes.
3. **Hard cuts** at click boundaries — no crossfade through clicks.
4. **IG notification crawl** — CapCut-style dark cards from bottom on glam beats (`New lead`, `Auto-DM sent`, `Post scheduled`).
5. **Iris persona lock:** `tools/iris-storyteller/character/iris-bts-persona-primary.png` for café + smoke.
6. **Commercial grammar** — multiple visual beats; not one long walk.
7. **Caption (feed):** one line · DMs / schedules / clicks / operator vocabulary · no stack jargon.

---

## Anti-patterns (killed in v5c session)

| Anti-pattern | Why |
|--------------|-----|
| Full-screen typography-only reel | v1 killed — Manychat template is reference, not whole reel |
| Regen sm-06 when compose path exists | v5 wrong — wastes time, wrong segments |
| Black click placeholders | Breaks immersion |
| Wrong Iris character ref | Cozy reader ≠ BTS director |
| Multi-line caption before Buffer | Fails `Test-DeviFeedCaption` gate |

---

## Gen / compose pipeline

**Not a batch-slots Kling-only path** — hybrid compose:

| Step | Tool |
|------|------|
| Source glam segments | Approved `jump-land` reel (e.g. sm-06) or `tools/generate-fia-scene-morph-slot.ps1` |
| Click inserts | `tools/generate-manychat-click-inserts.ps1` |
| Iris café + smoke | `tools/generate-manychat-contest-reel-v5-iris-cafe.ps1` |
| Overlays + end card | `tools/manychat-contest-compose-v5c.py` |
| Final assembly | `tools/assemble-manychat-contest-reel-v5c.ps1` |

**Storyboard canon:** `contenty/briefs/manychat-deploy-devi-v5-storyboard-2026-06.md`  
**Session record:** `brain/memory/session-summaries/2026-06-12-manychat-myrealjob-contest-v5c.md`

---

## Batch variant (future)

Homogenous **Deploy Devi** batch = N reels sharing beat grammar, different glam sources:

- Slot fields: `glamSourceReel`, `launchFrom`, `destA`, `destB`, `crawlLabels[]`, `irisPayoffLine` (optional)
- Pilot 1 reel before N-slot batch
- Versioned filenames: `m-deploy-devi-01.mp4`, etc.

---

## Retrieve tags

`deploy-devi-compose` `click-reveal` `ops-reveal` `iris-bts-cafe` `compose-on-approved` `ig-notification-crawl` `repeat-mechanism` `operator-nailed-it`

---

*Operator 2026-06-12: “very cool Iris !!” — Deploy Devi repeats when Devi glamour must read as **output** and the real job lives behind the clicks.*
