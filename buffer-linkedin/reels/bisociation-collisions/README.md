# Bisociation collisions — 4 LinkedIn native videos

**Manifest:** `buffer-linkedin/queue/2026-06-02-ortal-bisociation-collisions-four.json`

## Copy locally

```powershell
$map = @{
  "ortal-bisociation-r12-marble-move" = "devi-feed/buffer-reels-met-gala-fashion-is-art-2026-05/m-fia-r12.mp4"
  "ortal-bisociation-r11-born-shell" = "devi-feed/buffer-reels-met-gala-fashion-is-art-2026-05/m-fia-r11.mp4"
  "ortal-bisociation-r21-she-blooms" = "devi-feed/buffer-reels-met-gala-fashion-is-art-2026-05/m-fia-r21.mp4"
  "ortal-bisociation-r32-welcome-garden" = "devi-feed/buffer-reels-met-gala-fashion-is-art-2026-05/m-fia-r32.mp4"
}
# Operator-locked 2026-06-02. r21 also in agentic-era (operator override).

## Part 2 — scene-morph v2 (posts 5–11)

```powershell
$src = "devi-feed/buffer-reels-fia-scene-morph-10-2026-06"
$dest = "buffer-linkedin/reels/bisociation-collisions"
$map = @{
  "ortal-bisociation-sm02v2-lily-cube-column" = "m-fia-sm-02-v2-balletart.mp4"
  "ortal-bisociation-sm03v2-ice-light-silver" = "m-fia-sm-03-v2-balletart.mp4"
  "ortal-bisociation-sm04v2-bauhaus-opera" = "m-fia-sm-04-v2-balletart.mp4"
  "ortal-bisociation-sm05v2-ruins-canvas-points" = "m-fia-sm-05-v2-balletart.mp4"
  "ortal-bisociation-sm07v2-sky-rio-blue" = "m-fia-sm-07-v2-jumpland.mp4"
  "ortal-bisociation-sm08v2-balcony-riad-bloom" = "m-fia-sm-08-v2-jumpland.mp4"
  "ortal-bisociation-sm10v2-gallery-aurora" = "m-fia-sm-10-v2-jumpland.mp4"
}
```

**Manifest:** `buffer-linkedin/queue/2026-06-19-ortal-bisociation-scene-morph-v2-seven.json`

**Schedule (explicit dueAt):**

```powershell
. .\local-secrets\buffer_ids.ps1
.\buffer-linkedin\queue\Schedule-OrtalBisociationCollisionsBuffer.ps1 -ManifestPath buffer-linkedin\queue\2026-06-19-ortal-bisociation-scene-morph-v2-seven.json
```
$dest = "buffer-linkedin/reels/bisociation-collisions"
foreach ($slug in $map.Keys) {
  $dir = Join-Path $dest $slug
  New-Item -ItemType Directory -Force -Path $dir | Out-Null
  Copy-Item $map[$slug] (Join-Path $dir "feed-reel-v1.mp4") -Force
}
```

## Schedule (after approval)

```powershell
. .\local-secrets\buffer_ids.ps1
.\buffer-linkedin\queue\Schedule-OrtalBisociationCollisionsBuffer.ps1 -OnePerDay -StartDateUtc "YYYY-MM-DD"
```
