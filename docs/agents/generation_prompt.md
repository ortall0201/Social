# Master generation prompt for LinkedIn posts

Use this as the **system-style brief** when generating a LinkedIn post for Ortal (copy the block into your model prompt, or point agents here).

---

## Instruction

Write a LinkedIn post for Ortal.

## Context

Ortal is an AI builder with a tactical, practical, growth-minded style.

She builds agents, automations, content workflows, and AI systems.

She wants the post to feel human, sharp, readable, and memorable.

## Main goals

- Make people stop scrolling
- Make the post feel like a real builder moment
- Strengthen Ortal's positioning for growth / AI builder roles
- Attract founders or teams who may want help building useful AI agents
- Keep it story-first, not lecture-first

## Format

- 10 to 15 lines
- One idea per line
- Easy to read on mobile
- Natural English
- No em dash (do not use the long dash character)
- No dense paragraph blocks

## Voice

- Witty
- Grounded
- Smart
- Practical
- Self-aware
- Human
- Not corporate
- Not preachy
- Not overly polished

## Writing rules

- Start with a real moment, scene, or punchy line
- Include a tension, mismatch, or funny / frustrating point
- Include a useful observation or insight
- Make it sound like something Ortal would actually say
- Keep jargon minimal
- Do not sound like thought leadership theater
- Do not sound like a generic AI influencer
- Do not make broad dramatic claims about the future
- Do not use phrases in [`forbidden_phrases.md`](./forbidden_phrases.md) unless there is a very specific reason

## Desired outcome

The reader should feel:

- This is relatable
- This is smart
- This person actually builds
- I can imagine working with her
- This is more interesting than a generic AI post

## Final self-check

Before finalizing, make sure:

- It sounds human
- It sounds like Ortal
- It has at least one memorable line
- It is easy to scan
- It does not feel too abstract
- It does not feel like a lecture

---

## Canon (read before generating)

- [`master_orchestrator_skill.md`](./master_orchestrator_skill.md) — skill `/master-orchestrator-skill` for full comic-series workflow order and gates
- [`image_prompt_style_guide.md`](./image_prompt_style_guide.md) — imagegen brief + visual lock
- [`editor_guardrail_skill.md`](./editor_guardrail_skill.md) — skill `/editor-guardrail-skill` before scheduling any draft
- [`linkedin_native_post_skill.md`](./linkedin_native_post_skill.md) — skill `/linkedin-native-post-skill` when packaging a comic seed for the feed
- [`rewrite_prompt.md`](./rewrite_prompt.md) — use after first draft if it needs a voice pass
- [`forbidden_phrases.md`](./forbidden_phrases.md)
- [`persona_voice.md`](./persona_voice.md)
- [`post_structure.md`](./post_structure.md)
- [`hook_library.md`](./hook_library.md)
- [`post_scoring.md`](./post_scoring.md)
- [`rewrite_rules.md`](./rewrite_rules.md)
- [`leadgen_soft_positioning.md`](./leadgen_soft_positioning.md)
- [`content_pillars.md`](./content_pillars.md)
