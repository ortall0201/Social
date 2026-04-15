# LinkedIn native post skill

**Invoke:** `/linkedin-native-post-skill`

**Packaged skill (source of truth):**

- `.cursor/skills/linkedin-native-post-skill/SKILL.md` — Cursor
- `.claude/skills/linkedin-native-post-skill/SKILL.md` — Claude Code (mirror)

Turn a **comic story seed** (usually from `/comic-storytelling-skill`) into **LinkedIn-native** post text: mobile spacing, hook → scene → tension → insight → soft positioning → ending. **Does not** invent the story from scratch.

**Typical pipeline:** `/comic-storytelling-skill` → `/linkedin-native-post-skill` → [`post_scoring.md`](./post_scoring.md).

**Git:** these paths are under ignored `skills/` rules; after edits use `git add -f` on the two `SKILL.md` files.

**Related:** [`comic_storytelling_skill.md`](./comic_storytelling_skill.md), [`generation_prompt.md`](./generation_prompt.md), [`post_structure.md`](./post_structure.md), [`leadgen_soft_positioning.md`](./leadgen_soft_positioning.md).
