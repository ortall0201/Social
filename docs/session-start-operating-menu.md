# Session Start Operating Menu

Use this menu at the start of future sessions when the user's first message is vague, such as "hi", "what now", "let's continue", or "open Iris/Ortal" without a concrete task.

Do not show this menu when the user gives a specific task, file path, publish instruction, rewrite request, or scheduling request. In that case, read the relevant lane context and execute normally.

## Menu

```text
Choose how you want to run this session:

1. Manual mode
   The current way we work today. I follow the existing runbooks, chat with you normally, ask only when needed, and execute directly.

2. Symphony mode
   A stricter spec-driven run. I use WORKFLOW.md, declare the lane/state, follow QA gates, track blockers, and return a clean handoff.

3. Ortal LinkedIn — seed pipeline [2026-05-09 · 9 May 2026]
   Added this date so you can tell which pipeline version the menu points at. Finish a story seed into a queue-ready post: draft + guardrail + feed image + draft manifest, then you approve before Buffer. Procedure: buffer-linkedin/planning/linkedin-story-seed-full-pipeline-brief.md. Optional scaffold: buffer-linkedin/scripts/Initialize-OrtalLinkedInPostFromSeed.ps1. Active storyline handoff: brain/ortal-personal-agent-storyline-handoff-2026-05-09.md (pick Seed 1–4 or your next slug).

4. Devi "Fashion is Art" reel pack workflow [2026-05-09 · 9 May 2026]
   Concept-transfer reel pack for any cultural fashion moment with a strong artistic concept (Met Gala / Cannes / Oscars / Grammys / VMAs / fashion week). Concept stays, look transfers, AAHHH payoff. Multi-stage cinematic WOWs, mixed-batch operator review, full IP-safety stack. Optional Iris BTS reaction layer on top. Canon: brain/devi-fashion-is-art-workflow-canon.md (read end-to-end + the 2026-05-09 Met worked example linked inside). For Met Gala 2026 itself, the active pack is already in flight — see priority #29 in brain/current-focus.md and resume from contenty/briefs/met-gala-fashion-is-art-2026-05-09-codex-update-prompt.md (or the BTS correction prompt iris-bts-met-gala-fashion-is-art-2026-05-09-codex-correction-prompt.md).

5. Devi repeat mechanisms — new batch [2026-06-02]
   Pick a proven reel mechanism and run a new homogenous batch (bisociation first). Operator-approved: dance-morph v2 (ballet-art crossfade) + jump-land v2 (Vogue building/plane leap), scene-flash on-the-go, FIA concept transfer, arm-P parody. Full menu: brain/devi-repeat-mechanisms-menu.md. Default paired batch: 5+5 scene-morph. Gen: tools/generate-fia-scene-morph-slot.ps1. Keywords: "mechanisms", "repeat batch", "scene-morph", "scene-flash".

6. Devi creative stack — Strategy → AD → Gen [2026-07-07]
   Full pre-gen pipeline: Strategy (audience + emotional job) → Concept (bisociation/FIA/event) → Art Direction → Gen → 7-lens AD panel + operator taste. Canon: brain/iris-creative-roles-map.md · brain/devi-strategy-planning-canon.md · brain/devi-art-direction-canon.md. Keywords: "strategy", "art direction", "AD", "deep dive", "roles-map".

7. Devi product campaign — pose carousel from SKU [2026-07-07]
   Product image → Strategy → AD → 5-slide pose carousel (same world lock, expression deck, weird-beautiful poses). Skill: /devi-product-campaign-skill · Gen: tools/generate-product-pose-carousel.ps1. Active: contenty/product-campaigns/2026-07-07-necklace-pilot/ · Buffer pack: devi-feed/buffer-carousel-necklace-2026-07/. Keywords: "product campaign", "pose carousel", "P1", "P3".

8. Devi product campaign — 4K + fabric swap extensions [2026-07-07]
   Draft-locked 4K upscale (1K → same composition): upgrade-arm-b-draft-to-4k.ps1 · Wardrobe fabric swap (pose lock, same SKU, clothing material changes): tools/generate-fabric-jewelry-swap-floor.ps1 · Autoplay xfade reel + optional Iris Productions sign. Active pilot: contenty/product-campaigns/2026-07-07-fabric-jewelry-swap-floor/. Keywords: "4k upscale", "draft lock", "fabric swap", "wardrobe fabric", "P5", "P6".

9. Iris capabilities map (sections A–L) [2026-07-07]
   Quick pick: Strategy (C1) · Art direction (C3) · Expression deck (C6) · Product P1–P9 · Iris signature (P9) · taste panel · learning loop. Doc: docs/iris-operator-capabilities-menu.md. Keywords: "capabilities", "strategy", "AD", "emotions deck", "iris signature".

You can reply with 1–9, "manual", "symphony", "linkedin pipeline", "seed pipeline", "fashion is art", "fia", "mechanisms", "product campaign", "pose carousel", "4k upscale", "fabric swap", "iris signature", "capabilities", or just give me the task directly.
```

## Default

If the user does not choose a mode but gives a concrete task, default to Manual mode unless they use words like "Symphony", "spec-driven", "state", "workflow", or "handoff", or Ortal LinkedIn seed-pipeline cues like "linkedin pipeline", "finish the pipeline", "seed pipeline", "Ortal queue", or pointing at `linkedin-story-seed-full-pipeline-brief.md` / a draft queue JSON under `buffer-linkedin/queue/`, or **Fashion is Art** cues like "fashion is art", "fashion art", "art twist", "fia", "concept transfer reel", "another fashion-is-art pack" — those route to **option 4** and `brain/devi-fashion-is-art-workflow-canon.md`, or **repeat mechanism** cues like "mechanisms", "repeat batch", "scene-morph", "scene-flash", "new batch same mechanism" — those route to **option 5** and `brain/devi-repeat-mechanisms-menu.md`.

## Option 3 execution (when chosen)

**Pipeline version:** introduced **2026-05-09** (same label as menu item **3**).

In the same chat: read **`buffer-linkedin/queue/README.md`**, **`buffer-linkedin/planning/linkedin-story-seed-full-pipeline-brief.md`**, and **`brain/current-focus.md`** (see **Ortal LinkedIn seed pipeline** item). Then resume from the scaffold or handoff Seed (copy → imagegen → manifest → approval → Buffer steps in the brief). Do not schedule Buffer without explicit human approval on the package.

## Option 4 execution (when chosen)

**Pipeline version:** introduced **2026-05-09** (same label as menu item **4**).

In the same chat: read **`brain/devi-fashion-is-art-workflow-canon.md`** end-to-end (the recipe), then **`brain/met-gala-fashion-is-art-2026-05-09-step-up-handoff.md`** (the worked example), then **`brain/devi-wow-twist-canon.md`** (the WOW rules), then **`brain/devi-fashion-tryon-legal-creative-guardrails.md`** + **`brain/devi-inspiration-sources-canon.md`** (the IP-safety + sources). Ask the operator which event the pack is for. If it's Met Gala 2026 itself (already in flight), resume from `contenty/briefs/met-gala-fashion-is-art-2026-05-09-codex-update-prompt.md`. If it's a new event, follow the 6-phase recipe in the canon (Event Scout concept discovery → archetype identification → concept transfer → multi-stage WOW → mixed batch order → compliance + dry-run + ship). Do not begin generation without operator-coined WOW calibration examples persisted verbatim in the new pack JSON's `globalWowUpgradeRule.operatorCalibrationExamples`.

## Lane Notes

- Iris Manual: use `brain/iris-orchestration.md` and existing Pipeline A/B + Publisher rules.
- Iris Symphony: use `WORKFLOW.md` and `docs/specs/symphony-lite-iris-instagram.md`.
- Ortal Manual: use `docs/specs/ortal-linkedin-codex-execution-spec.md` plus the existing LinkedIn queue flow.
- Ortal Symphony: use `WORKFLOW.md` and `docs/specs/symphony-lite-ortal-linkedin.md`, while still respecting the Ortal execution spec.
- Ortal LinkedIn seed pipeline (**menu 3**, **2026-05-09**): `buffer-linkedin/planning/linkedin-story-seed-full-pipeline-brief.md` + `Initialize-OrtalLinkedInPostFromSeed.ps1` (optional). Not a substitute for Ortal Codex execution spec on voice/format — still obey `docs/specs/ortal-linkedin-codex-execution-spec.md` when drafting.
- Devi Fashion is Art reel pack workflow (**menu 4**, **2026-05-09**): `brain/devi-fashion-is-art-workflow-canon.md` (event-agnostic recipe) + `brain/met-gala-fashion-is-art-2026-05-09-step-up-handoff.md` (Met 2026 worked example) + `brain/devi-wow-twist-canon.md` (WOW rules) + `brain/devi-fashion-tryon-legal-creative-guardrails.md` + `brain/devi-inspiration-sources-canon.md`. Optional BTS reaction layer: `brain/iris-bts-met-gala-fashion-is-art-2026-05-09-session-record.md`. All compliance locks (PM #4 banned-visual-input + PM #2 5-of-11 axis + PM #3 stand-alone test) still apply.
- Devi repeat mechanisms / new batch (**menu 5**, **2026-06-02**): `brain/devi-repeat-mechanisms-menu.md` — bisociation first, then pick validated mechanism (#1–#7). Default paired batch: 5× dance-morph v2 + 5× jump-land v2. Template: `contenty/fia-scene-morph-batch-10-2026-06/batch-slots.json` + `tools/generate-fia-scene-morph-slot.ps1`. Buffer: versioned filenames only.
- Devi creative stack (**menu 6**, **2026-07-07**): Strategy → Concept → AD → Gen → panel + taste. `brain/iris-creative-roles-map.md` · `/devi-strategy-planning-skill` · `/devi-art-direction-skill` · deep dives in `brain/learning/deep-dive-tranche-*.md`.
- Devi product campaign (**menu 7**, **2026-07-07**): `/devi-product-campaign-skill` · `tools/generate-product-pose-carousel.ps1` · pose-deck + expression beats · Buffer pack `devi-feed/buffer-carousel-necklace-2026-07/`.
- Devi product campaign extensions (**menu 8**, **2026-07-07**): 4K draft-locked upscale (`upgrade-arm-b-draft-to-4k.ps1`) · wardrobe fabric swap (`generate-fabric-jewelry-swap-floor.ps1`) · xfade reel build · Iris Productions sign (`brain/iris-productions-signature-canon.md`).
- Iris capabilities sections (**menu 9**, **2026-07-07**): `docs/iris-operator-capabilities-menu.md` — A session · B viral/FIA · C creative stack (strategy, AD, expression) · D taste/panel · P product P1–P9 · O LinkedIn · L learning.

## Option 5 execution (when chosen)

**Introduced 2026-06-02.**

Read `brain/devi-repeat-mechanisms-menu.md` + `brain/devi-bisociation-reels-rule.md`. Ask operator: which mechanism # (or 5+5 paired scene-morph). Clone last worked `batch-slots.json` scaffold; new art lanes / launchFrom per slot. Pilot 2 reels before full batch. Do not schedule Buffer with duplicate filenames after creative pivot.

## Reply Style

Keep the menu short. Do not explain the whole architecture unless the user asks.
