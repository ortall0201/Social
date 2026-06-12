# Session summary — Manychat #MyRealJob contest v5c (2026-06-12)

**Lane:** Devi Instagram · contest one-off  
**Series ID:** `manychat-myrealjob-contest-2026-06`  
**Status:** **SUBMITTED to Buffer** · operator caption refined post-queue · Manychat form pending after IG live

---

## What shipped

| Item | Value |
|------|--------|
| **Final asset** | `devi-feed/buffer-reels-fia-scene-morph-contest-manychat-2026-06/m-manychat-myrealjob-v5c.mp4` (~18s) |
| **CDN copy** | `buffer-delivery/m-manychat-myrealjob-v5c.mp4` |
| **Buffer post ID** | `6a2c6c59768f4d60d56793b8` |
| **Scheduled** | 2026-06-12T20:45:00.000Z (Instagram reel only) |
| **Git commit** | `17b15e4` — force-add mp4 + schedule scripts |

**Mechanism:** compose-on-approved-footage — sm-06 jump-land (fall/yacht/shore) + generated nail-polish click inserts + IG notification crawl overlays + Iris café BTS (`iris-bts-persona-primary`) + smoke + 💅 sticker slide payoff.

**Killed versions:** v1 (typography-only) · v4b (regen worse than v4) · v5 (regen middle + wrong Iris + black click placeholders).

---

## Contest requirements (operator-provided)

- Reel opens **IT'S NOT A REAL JOB** with emoji censor on **NOT** (💅)
- Creator-life / ops story in the middle
- End: sticker slides off → **IT'S A REAL JOB**
- Tag **@Manychat** + **#MyRealJob**
- Submit live reel URL at [manychat.com/timessquare](https://manychat.com/timessquare) (deadline Jun 30, 2026)

---

## Operator feedback (must repeat)

- **Do not regen Devi middle** when operator sm-06 reel exists — compose only
- **No black click placeholders** — real/generated hand inserts + hard cuts
- **Iris persona lock:** `tools/iris-storyteller/character/iris-bts-persona-primary.png` (NOT `iris-character-primary.jpg`)
- **Operator praised Iris café ending:** "very cool Iris !!"
- **Caption vocabulary:** real DMs, schedules, clicks, real operator — not stack jargon in feed

---

## Approved caption direction (2026-06-12, operator-refined)

One line before hashtags (Buffer / Devi caption gate):

```
IT'S NOT A REAL JOB… Building an AI influencer with real DMs, schedules, and clicks. That's the job. @Manychat

#MyRealJob
```

Alt shorter: `IT'S NOT A REAL JOB… real DMs, real clicks, real operator. That's the job. @Manychat`

**Note:** First Buffer queue used placeholder caption (`Devi glam. Iris ops.`) — operator should edit in Buffer UI or reschedule with approved line.

---

## Tools created

| Script | Purpose |
|--------|---------|
| `tools/assemble-manychat-contest-reel-v5c.ps1` | Main assembly |
| `tools/manychat-contest-compose-v5c.py` | Hook chip, IG crawl, end slide |
| `tools/generate-manychat-click-inserts.ps1` | Nail-polish click clips |
| `tools/generate-manychat-contest-reel-v5-iris-cafe.ps1` | Iris café + smoke |
| `devi-feed/.../schedule-manychat-contest-buffer-reel.ps1` | Buffer queue |
| `devi-feed/.../validate-manychat-contest-manifest-and-media.ps1` | Preflight |

---

## Iris lessons (persisted)

| Lesson | Where |
|--------|--------|
| Taste score v5c **repeat mechanism** | `brain/memory/taste-scores/2026-06-12-manychat-myrealjob-v5c.taste-score.json` |
| Contest patterns + anti-patterns | `brain/learning-patterns.md` § 2026-06-12 Manychat |
| Storyboard + submit checklist | `contenty/briefs/manychat-deploy-devi-v5-storyboard-2026-06.md` |

**Misjudgments logged:** typography-only v1 · regen approved middle · wrong Iris ref · black placeholders · Buffer before caption gate · placeholder caption without operator sign-off.

---

## Operator open items

- [ ] Confirm Buffer caption = approved line (edit in Buffer if still placeholder)
- [ ] After reel live → paste IG reel URL at [manychat.com/timessquare](https://manychat.com/timessquare)
- [ ] Optional: taste score numbers if operator wants formal calibration

---

## Retrieve next session

Keywords: `manychat` · `myrealjob` · `v5c` · `contest` · `compose-only` · `iris-bts`
