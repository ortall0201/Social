# Buffer queue manifests (Ortal LinkedIn)

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
