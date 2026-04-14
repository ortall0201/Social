# Devi caption-card assets (Buffer-ready)

**Preferred delivery for production:** copy approved binaries to the VPS public edge (`https://iris-media.onsight-analytics.com/approved/<filename>`) per `AGENTS.md` — keeps large/reel assets off the public Social repo if you want that boundary. This folder also supports **raw GitHub** URLs for small static cards when VPS upload is not available from the local agent session.

These PNGs are committed so Buffer can load them via **raw GitHub** after `git push`:

- `devi-caption-card-met-season-main-character.png` — Met season / red-carpet energy  
- `devi-caption-card-stagecoach-not-costume.png` — Stagecoach prep (no reference-face creative)

**After push**, public URLs:

- `https://raw.githubusercontent.com/ortall0201/Social/main/artifacts/devi-captions/devi-caption-card-met-season-main-character.png`
- `https://raw.githubusercontent.com/ortall0201/Social/main/artifacts/devi-captions/devi-caption-card-stagecoach-not-costume.png`

Then schedule (example):

```powershell
powershell -ExecutionPolicy Bypass -File scripts/buffer/buffer-queue-image-post.ps1 `
  -ChannelId "<IG_BUFFER_CHANNEL_ID>" -Service instagram -PostType post `
  -DueAt "2026-04-15T22:00:00Z" `
  -ImageUrl "https://raw.githubusercontent.com/ortall0201/Social/main/artifacts/devi-captions/devi-caption-card-met-season-main-character.png" `
  -Text "Main character energy. Met season starts now."
```

Ensure IG pending queue is **under** Buffer’s cap (often 10) before scheduling.
