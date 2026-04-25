# Schedule only HV day-2 reels (8 slots) to Devi IG + FB via Buffer.
# Uses same 8 time grid as content pack; shifts to first UTC calendar day where
# slot 1 is at least 30 minutes in the future (so "today" works if times not past).
#
# Prereq: MP4s on HTTPS (push hv-20260419-01..08 to main or set -MediaBaseUrl).
# Requires: local-secrets/buffer_access_token.txt, buffer_ids.ps1 with
#   BUFFER_PROFILE_IG_DEVI, BUFFER_PROFILE_FB_PAGE_DEVI
#
# From repo root:
#   powershell -ExecutionPolicy Bypass -File devi-feed/buffer-reels-hollywood-hv-2026-04-18/schedule-hollywood-hv-day2-only.ps1
#
# Optional:
#   -MediaBaseUrl "https://raw.githubusercontent.com/ortall0201/Social/main/devi-feed/buffer-reels-hollywood-hv-2026-04-18"
#   -StartDateUtc "2026-04-20"   # force calendar day (UTC midnight anchor for slot times)

[CmdletBinding()]
param(
  [string]$MediaBaseUrl = "https://raw.githubusercontent.com/ortall0201/Social/main/devi-feed/buffer-reels-hollywood-hv-2026-04-18",
  [string]$StartDateUtc = ""
)

$ErrorActionPreference = "Stop"
$repoRoot = (Resolve-Path (Join-Path $PSScriptRoot "..\..")).Path
$idsPath = Join-Path $repoRoot "local-secrets\buffer_ids.ps1"
if (-not (Test-Path -LiteralPath $idsPath)) { throw "Missing $idsPath" }
. $idsPath
if ([string]::IsNullOrWhiteSpace($env:BUFFER_PROFILE_IG_DEVI) -or [string]::IsNullOrWhiteSpace($env:BUFFER_PROFILE_FB_PAGE_DEVI)) {
  throw "BUFFER_PROFILE_IG_DEVI and BUFFER_PROFILE_FB_PAGE_DEVI must be set in buffer_ids.ps1"
}

$ig = $env:BUFFER_PROFILE_IG_DEVI.Trim()
$fb = $env:BUFFER_PROFILE_FB_PAGE_DEVI.Trim()
$queueScript = Join-Path $repoRoot "scripts\buffer-queue-video-post.ps1"
. (Join-Path $repoRoot "scripts\buffer-common.ps1")

$posts = @(
  @{ file = "hv-20260419-01.mp4"; caption = "Ballet rebel. Soft chaos."; tags = "#devi #beauty #ugc #AIFashion" },
  @{ file = "hv-20260419-02.mp4"; caption = "Liquid silver. Late night."; tags = "#devi #fashion #nightout #AIFashion" },
  @{ file = "hv-20260419-03.mp4"; caption = "Velvet after. Slow burn."; tags = "#devi #beauty #glam #AIFashion" },
  @{ file = "hv-20260419-04.mp4"; caption = "Cameras. Coat. Confidence."; tags = "#devi #fashion #paparazzi #AIFashion" },
  @{ file = "hv-20260419-05.mp4"; caption = "Emerald swing. Pearl light."; tags = "#devi #beauty #festival #AIFashion" },
  @{ file = "hv-20260419-06.mp4"; caption = "Neon core. Clean beat."; tags = "#devi #fitness #dance #AIFashion" },
  @{ file = "hv-20260419-07.mp4"; caption = "Slip light. Hard flash."; tags = "#devi #fashion #editorial #AIFashion" },
  @{ file = "hv-20260419-08.mp4"; caption = "Trench spin. Pink bolt."; tags = "#devi #beauty #AIFashion" }
)

# Slot clock times (UTC) — same grid as schedule-manifest day 2
$clock = @(
  @{ h = 11; m = 0 },
  @{ h = 12; m = 45 },
  @{ h = 14; m = 30 },
  @{ h = 16; m = 15 },
  @{ h = 18; m = 0 },
  @{ h = 19; m = 45 },
  @{ h = 21; m = 30 },
  @{ h = 23; m = 15 }
)

if ($StartDateUtc) {
  $anchor = [DateTimeOffset]::Parse(($StartDateUtc.Trim() + "T00:00:00Z"))
} else {
  $u = [DateTimeOffset]::UtcNow
  $anchor = [DateTimeOffset]::new($u.Year, $u.Month, $u.Day, 0, 0, 0, [TimeSpan]::Zero)
  $firstSlot = [DateTimeOffset]::new($anchor.Year, $anchor.Month, $anchor.Day, $clock[0].h, $clock[0].m, 0, [TimeSpan]::Zero)
  while ($firstSlot -lt [DateTimeOffset]::UtcNow.AddMinutes(30)) {
    $anchor = $anchor.AddDays(1)
    $firstSlot = [DateTimeOffset]::new($anchor.Year, $anchor.Month, $anchor.Day, $clock[0].h, $clock[0].m, 0, [TimeSpan]::Zero)
  }
}

Write-Host "HV day-2 anchor date (UTC): $($anchor.ToString('yyyy-MM-dd'))"

$ms = [DateTimeOffset]::UtcNow.ToUnixTimeMilliseconds()
$i = 0
for ($k = 0; $k -lt $posts.Count; $k++) {
  $p = $posts[$k]
  $t = $clock[$k]
  $due = ([DateTimeOffset]::new($anchor.Year, $anchor.Month, $anchor.Day, $t.h, $t.m, 0, [TimeSpan]::Zero)).ToString("yyyy-MM-ddTHH:mm:ss.fffZ")
  $v = $ms + $i
  $url = ("{0}/{1}?v={2}" -f $MediaBaseUrl.TrimEnd("/"), $p.file, $v)
  $body = "{0}`n`n{1}" -f $p.caption, $p.tags
  Write-Host ("[{0}] IG reel due {1}" -f $p.file, $due)
  & $queueScript -ChannelId $ig -Service instagram -PostType reel -ShouldShareToFeed $true -Text $body -VideoUrl $url -DueAt $due | Out-Null
  Start-Sleep -Milliseconds 800
  Write-Host ("[{0}] FB reel due {1}" -f $p.file, $due)
  & $queueScript -ChannelId $fb -Service facebook -PostType reel -Text $body -VideoUrl $url -DueAt $due | Out-Null
  Start-Sleep -Milliseconds 800
  $i++
}

Write-Host "Done. Queued 8 HV day-2 reels x2 (IG+FB). Confirm raw GitHub URLs return 200 for each MP4 before due times."
