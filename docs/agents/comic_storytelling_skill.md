# Comic storytelling skill

**Invoke:** `/comic-storytelling-skill`

**Packaged skill (source of truth):**

- `.cursor/skills/comic-storytelling-skill/SKILL.md` — Cursor
- `.claude/skills/comic-storytelling-skill/SKILL.md` — Claude Code (mirror)

Use this skill to turn a **real builder moment** into comic **story beats**, **visual direction**, and **image caption** options. It does **not** write the full LinkedIn post. For feed-ready copy, hand off to **`/linkedin-native-post-skill`** ([`linkedin_native_post_skill.md`](./linkedin_native_post_skill.md)); before scheduling, run **`/editor-guardrail-skill`** ([`editor_guardrail_skill.md`](./editor_guardrail_skill.md)). You can also use [`generation_prompt.md`](./generation_prompt.md) / [`comic_post_template.md`](./comic_post_template.md) for manual drafting.

**Related:** [`comic_caption_rules.md`](./comic_caption_rules.md), [`ortal-linkedin-gijane-supergirl-visual-persona.md`](./ortal-linkedin-gijane-supergirl-visual-persona.md).

**Git:** the repo ignores generic `skills/` paths; these two files are tracked. If you edit them locally, commit with `git add -f` on those paths. Optionally add a sibling bullet under `/ortal-the-great-linkedin` in your local copy of that skill.
