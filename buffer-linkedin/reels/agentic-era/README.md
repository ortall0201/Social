# Agentic era — LinkedIn native video (Fashion is Art reels)

**Source pack:** `devi-feed/buffer-reels-met-gala-fashion-is-art-2026-05/` (`m-fia-r*.mp4`)

**Not used:** `devi-feed/buffer-reels-fia-parody-ab-2026-05/` (parody A/B trial, 2026-06-01).

**Excluded from this batch (weak / wrong lesson):** `m-fia-r27` (10/10 skip), `m-fia-r37` (weak cobalt case), `m-fia-r44` (weakest A0 in operator review).

Manifest: `buffer-linkedin/queue/2026-06-01-ortal-agentic-era-eight.json`

## Copy before Buffer schedule

```powershell
$src = "devi-feed/buffer-reels-met-gala-fashion-is-art-2026-05"
$dest = "buffer-linkedin/reels/agentic-era"
$map = @{
  "ortal-agentic-taste-score" = "m-fia-r41.mp4"
  "ortal-agentic-comic-creepy-gate" = "m-fia-r43.mp4"
  "ortal-agentic-kill-mechanisms" = "m-fia-r07.mp4"
  "ortal-agentic-comic-no-typography" = "m-fia-r45.mp4"
  "ortal-agentic-shared-axis" = "m-fia-r42.mp4"
  "ortal-agentic-comic-repo-not-chat" = "m-fia-r46.mp4"
  "ortal-agentic-one-element" = "m-fia-r05.mp4"
  "ortal-agentic-no-brief-no-ship" = "m-fia-r06.mp4"
}
foreach ($slug in $map.Keys) {
  $dir = Join-Path $dest $slug
  New-Item -ItemType Directory -Force -Path $dir | Out-Null
  Copy-Item (Join-Path $src $map[$slug]) (Join-Path $dir "feed-reel-v1.mp4") -Force
}
```

Commit, push `main`, verify each `videoUrl` in the manifest returns **200**.

## Rules

`buffer-linkedin/ORTAL-LINKEDIN-NATIVE-VIDEO-RULES.md`
