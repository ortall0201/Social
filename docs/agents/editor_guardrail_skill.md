# Editor guardrail skill

**Invoke:** `/editor-guardrail-skill`

**Packaged skill (source of truth):**

- `.cursor/skills/editor-guardrail-skill/SKILL.md` — Cursor
- `.claude/skills/editor-guardrail-skill/SKILL.md` — Claude Code (mirror)

**Purpose:** Review, score, and improve LinkedIn drafts **before scheduling**. Protects voice, readability, and positioning; outputs a **scorecard**, **verdict** (approve / rewrite required), and **rewrite notes**.

**Typical pipeline:** `/linkedin-native-post-skill` (or any draft) → **`/editor-guardrail-skill`** → Buffer / schedule.

**Canon docs:** [`post_scoring.md`](./post_scoring.md), [`rewrite_prompt.md`](./rewrite_prompt.md), [`rewrite_rules.md`](./rewrite_rules.md), [`persona_voice.md`](./persona_voice.md).

**Git:** use `git add -f` on the two `SKILL.md` paths under `skills/` if you edit them (same as other packaged skills).
