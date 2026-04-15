# Master orchestrator skill

**Invoke:** `/master-orchestrator-skill`

**Packaged skill (source of truth):**

- `.cursor/skills/master-orchestrator-skill/SKILL.md` — Cursor
- `.claude/skills/master-orchestrator-skill/SKILL.md` — Claude Code (mirror)

**Purpose:** Run the **end-to-end** Ortal LinkedIn **comic series** pipeline: raw idea → post type → `/comic-storytelling-skill` → visual prompt (`image_prompt_style_guide` + `caption_library`) → `/linkedin-native-post-skill` → `/editor-guardrail-skill` → scheduling readiness. Decides **order**, **reject/rewrite paths**, and **final output bundle** (strategy, story base, visual package, post, scorecard).

**Does not** replace sub-skills; it **coordinates** them.

**Key docs:** [`image_prompt_style_guide.md`](./image_prompt_style_guide.md), [`forbidden_phrases.md`](./forbidden_phrases.md), [`content_pillars.md`](./content_pillars.md).

**Git:** use `git add -f` on the two `SKILL.md` paths under `skills/` when you change them.
