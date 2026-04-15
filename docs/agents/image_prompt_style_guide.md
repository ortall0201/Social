# Image prompt style guide (Ortal LinkedIn comic series)

## Purpose

Consolidate how to brief **imagegen** for character-driven comic LinkedIn visuals: same recurring figure, scene logic, overlay space, and tone alignment with captions.

## Canonical visual lock

- **Persona + composition:** [`ortal-linkedin-gijane-supergirl-visual-persona.md`](./ortal-linkedin-gijane-supergirl-visual-persona.md)
- **Reference still:** `docs/agents/assets/ortal-gijane-supergirl-persona-reference.png` (face/figure lock; use as `reference_image_paths` when the tool supports it)

## Before you prompt

1. Read the **story arc** from `/comic-storytelling-skill` (setup → friction → payoff).
2. Pick **emotional tone** (funny + tactical, chaotic + competent, etc.).
3. Choose **caption type** from [`caption_library.md`](./caption_library.md) (me vs agent, chaos, tone, etc.).
4. Keep [`comic_caption_rules.md`](./comic_caption_rules.md) in mind: short overlay, not the full post.

## Prompt checklist

- **Figure:** Match the G.I. Jane / Supergirl **tactical builder** (olive field kit, cargo, boots, tool + cable, long dark hair, intense accountable expression). See visual persona table.
- **Scene:** Show **action** or clear **tension** from the story beat, not a generic portrait.
- **Style:** Graphic novel / cel-shade, heavy outlines, chiaroscuro — per visual doc (not Disney/Pixar, not named heroes).
- **Composition:** Leave **negative space** or a **legible band** (usually upper or darker side) for 2–5 word overlay text if the batch uses on-image captions.
- **Hard bans:** No weapons, flags, military rank, franchise likeness (from visual doc).

## Caption alignment

- Pull 1–3 line options from [`caption_library.md`](./caption_library.md) or write new lines in the same **short, punchy** register.
- Do not put the full LinkedIn post on the image.

## Validation (before scheduling)

- Does the image show the **key action** or mismatch from the story?
- Does it **match** the emotional tone of the post?
- Is there room for a **glance-readable** caption?
- Does it feel like the **same series** protagonist as prior heroes?

## Related

- [`caption_library.md`](./caption_library.md)
- [`comic_caption_rules.md`](./comic_caption_rules.md)
- [`master_orchestrator_skill.md`](./master_orchestrator_skill.md) — full pipeline
