# Buffer queue manifests (Ortal LinkedIn)

**Lead gen:** after scheduling, add a **pin comment** + keyword CTA per [../LEAD-GEN-PLAYBOOK.md](../LEAD-GEN-PLAYBOOK.md) (§5).

**Repeatable performance export (API → CSV):** Buffer Publish GraphQL does not return impressions; use a local CSV and fill metric columns from Buffer **Sent** or LinkedIn.

```powershell
. .\local-secrets\buffer_ids.ps1
.\buffer-linkedin\scripts\buffer-list-linkedin-sent.ps1
# Optional: .\buffer-linkedin\scripts\buffer-list-linkedin-sent.ps1 -MaxPosts 500 -OutCsv .\buffer-linkedin\exports\manual.csv
```

Output defaults to `buffer-linkedin/exports/buffer-linkedin-sent-<timestamp>.csv`.

**GI Jane / tactical imagegen:** keep one locked character across heroes — [../visual-hooks/README.md](../visual-hooks/README.md).

**Sync queue JSON to Buffer + LinkedIn (live copy):** `2026-04-16-gijane-comic-five.json` can be regenerated from the LinkedIn channel in Buffer (sent since 2026-04-15 + all scheduled). Run from repo root:

```powershell
. .\local-secrets\buffer_ids.ps1
.\buffer-linkedin\scripts\Sync-GijaneQueueFromBuffer.ps1
```

This overwrites the queue file with **10 slots** when the full wave is present (6 sent + 4 scheduled); each post includes `bufferPostId`, `linkedInUrl`, `imageUrl`, and exact `text`.

**Part 2 (two continuous series — same interleave as part 1):**

| Order | `queueSlot` | Track | Manifest | New slug(s) |
|------|-------------|--------|----------|-------------|
| 1 | 11 | Tactical | [2026-04-22-ortal-part2-tactical-series-five.json](./2026-04-22-ortal-part2-tactical-series-five.json) | `ortal-tactical-series-06` |
| 2 | 12 | GI Jane comic | [2026-04-22-ortal-part2-gijane-comic-four.json](./2026-04-22-ortal-part2-gijane-comic-four.json) | `ortal-gijane-comic-2026-04-06` |
| 3 | 13 | Tactical | (same tactical file) | `ortal-tactical-series-07` |
| 4 | 14 | Comic | (same comic file) | `ortal-gijane-comic-2026-04-07` |
| 5 | 15 | Tactical | | `ortal-tactical-series-08` |
| 6 | 16 | Comic | | `ortal-gijane-comic-2026-04-08` |
| 7 | 17 | Tactical | | `ortal-tactical-series-09` |
| 8 | 18 | Comic | | `ortal-gijane-comic-2026-04-09` |
| 9 | 19 | Tactical | | `ortal-tactical-series-10` |

- **Tactical** posts: dual CTAs, OPS + `pinComment`, `conversion` block (lead magnet) — same lane as `ortal-tactical-series-01`…`05` in part 1.
- **Comic** posts: scene-first, lighter close (no dual hiring block by default) — same lane as `ortal-gijane-comic-2026-04-01`…`05`.
- **Imagegen:** one locked GI Jane / tactical heroine for **both** slug families; see [../visual-hooks/README.md](../visual-hooks/README.md).

Stub pointers (do not schedule from these): [2026-04-19-gijane-series-part2-nine-leads-and-hiring.json](./2026-04-19-gijane-series-part2-nine-leads-and-hiring.json), [2026-04-18-gijane-comic-series-part2-nine.json](./2026-04-18-gijane-comic-series-part2-nine.json).

Add `feed-hero-v1.png` under each **new** slug folder above before scheduling (commit + push to `main` if using raw/jsDelivr URLs).

**Batch schedule Part 2 to Buffer (after push to `main`):** from repo root, `. .\local-secrets\buffer_ids.ps1` then `.\scripts\Schedule-OrtalPart2LinkedInBuffer.ps1` — uses `dueAt` cadence in the Part 2 manifests (Apr 20–25 UTC window).

## `2026-04-15-five-slots.json`

Five **custom-scheduled** LinkedIn posts: full post text + **Raw GitHub** image per slot (`buffer-linkedin/visual-hooks/<slug>/feed-hero-v1.png`).

**Before scheduling:** commit + push to `main` so every `raw.githubusercontent.com` URL returns **200**.

## Same path as Iris (token + GraphQL)

`Buffer-QueueOrtalFiveSlots.ps1` does **not** pass the token manually. It calls `scripts/buffer-queue-image-post.ps1`, which dot-sources `scripts/buffer-common.ps1` and reads **`local-secrets/buffer_access_token.txt`** — same as the Scheduler Worker / `invoke-buffer-approved-image-post` stack (`docs/agents/scheduler-worker.md`, `docs/buffer-publisher-worker.md`).

**Channel ID:** set **`BUFFER_PROFILE_LINKEDIN_ORTAL`** in `local-secrets/buffer_ids.ps1` (alongside IG/FB). Re-verify with:

```powershell
. .\local-secrets\buffer_ids.ps1
.\scripts\buffer-list-channels.ps1
```

**Run (from repo root):**

```powershell
& .\scripts\buffer\Buffer-QueueOrtalFiveSlots.ps1
```

Dry run (no API calls):

```powershell
& .\scripts\buffer\Buffer-QueueOrtalFiveSlots.ps1 -WhatIf
```

**Buffer Free:** if you see `LimitReachedError`, the **LinkedIn** channel already has **10** posts in the queue for that channel — delete or publish some, then re-run (or queue a subset by editing the JSON).

Re-verify `channelId` when Buffer reconnects channels. Canonical pattern: `brain/roadmaps/linkedin/2026-04-22-linkedin-buffer-post-roadmap.md`.
