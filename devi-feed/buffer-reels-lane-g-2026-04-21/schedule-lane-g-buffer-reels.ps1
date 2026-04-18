# Schedule lane G Coachella homage reels (R-G-001–006) to Devi Instagram via Buffer.
# Requires: local-secrets/buffer_access_token.txt, local-secrets/buffer_ids.ps1 (BUFFER_PROFILE_IG_DEVI)
# Media must be fetchable HTTPS — default: raw GitHub after you push this folder.
#
# From repo root:
#   powershell -ExecutionPolicy Bypass -File devi-feed/buffer-reels-lane-g-2026-04-21/schedule-lane-g-buffer-reels.ps1
#
# Optional:
#   -StartUtc "2026-04-21T21:00:00Z"   # first reel; each next +1 day (6 total)
#   -MediaBaseUrl "https://iris-media.onsight-analytics.com/approved/lane-g-2026-04/"

[CmdletBinding()]
param(
  [string]$StartUtc = "2026-04-21T21:00:00Z",
  [string]$MediaBaseUrl = "https://raw.githubusercontent.com/ortall0201/Social/main/devi-feed/buffer-reels-lane-g-2026-04-21"
)

$ErrorActionPreference = "Stop"
$repoRoot = (Resolve-Path (Join-Path $PSScriptRoot "..\..")).Path
$idsPath = Join-Path $repoRoot "local-secrets\buffer_ids.ps1"
if (-not (Test-Path -LiteralPath $idsPath)) {
  throw "Missing $idsPath - copy buffer_ids.example.ps1 and set BUFFER_PROFILE_IG_DEVI"
}
. $idsPath
if (-not $env:BUFFER_PROFILE_IG_DEVI) {
  throw "BUFFER_PROFILE_IG_DEVI must be set in buffer_ids.ps1"
}

$ig = $env:BUFFER_PROFILE_IG_DEVI.Trim()
$queueScript = Join-Path $repoRoot "scripts\buffer-queue-video-post.ps1"
if (-not (Test-Path -LiteralPath $queueScript)) {
  throw "Missing $queueScript (buffer-queue-video-post.ps1)"
}

$cursor = [DateTimeOffset]::Parse($StartUtc).ToUniversalTime()
$ms = [DateTimeOffset]::UtcNow.ToUnixTimeMilliseconds()

$posts = @(
  @{
    file = "r-g-001-headliner-red-sequin-reel.mp4"
    caption = "Red. Live. Loud."
    tags = "#Coachella2026 #fashion #devi #editorial #AIFashion"
  },
  @{
    file = "r-g-002-slip-colorblock-reel.mp4"
    caption = "Gold. Pink. Desert."
    tags = "#Coachella2026 #fashion #devi #vintagevibes #festivalstyle"
  },
  @{
    file = "r-g-003-revolve-futurism-reel.mp4"
    caption = "Silver. Sun. Surreal."
    tags = "#Coachella2026 #fashion #devi #editorial #AIFashion"
  },
  @{
    file = "r-g-004-sheer-lean-reel.mp4"
    caption = "Sheer. Bold. Still."
    tags = "#Coachella2026 #fashion #devi #editorial #glam"
  },
  @{
    file = "r-g-005-poolside-reel.mp4"
    caption = "Pool. Side. Main."
    tags = "#Coachella2026 #fashion #devi #poolside #glam"
  },
  @{
    file = "r-g-006-mesh-cape-reel.mp4"
    caption = "Cape. Drama. Drop."
    tags = "#Coachella2026 #fashion #devi #editorial #festival"
  }
)

$i = 0
foreach ($p in $posts) {
  $v = $ms + $i
  $url = ("{0}/{1}?v={2}" -f $MediaBaseUrl.TrimEnd("/"), $p.file, $v)
  $body = "{0}`n`n{1}" -f $p.caption, $p.tags
  $due = $cursor.ToString("yyyy-MM-ddTHH:mm:ss.fffZ")
  Write-Host ("[{0}] IG reel due {1}" -f $p.file, $due)

  & $queueScript `
    -ChannelId $ig `
    -Service instagram `
    -PostType reel `
    -ShouldShareToFeed $true `
    -Text $body `
    -VideoUrl $url `
    -DueAt $due | Out-Null

  Start-Sleep -Milliseconds 800
  $cursor = $cursor.AddDays(1)
  $i++
}

Write-Host "Done. 6 Instagram reels queued."
