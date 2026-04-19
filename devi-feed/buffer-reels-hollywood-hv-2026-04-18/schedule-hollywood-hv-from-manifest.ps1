# Queue Hollywood high-volume week Reels (IG + FB) from contenty manifest JSON.
# Prereq: MP4s uploaded to a public HTTPS base (e.g. raw GitHub) matching manifest "file" names.
# Requires: local-secrets/buffer_access_token.txt, buffer_ids.ps1 with
#   BUFFER_PROFILE_IG_DEVI, BUFFER_PROFILE_FB_PAGE_DEVI
#
# From repo root:
#   powershell -ExecutionPolicy Bypass -File devi-feed/buffer-reels-hollywood-hv-2026-04-18/schedule-hollywood-hv-from-manifest.ps1
#
# Optional:
#   -MediaBaseUrl "https://raw.githubusercontent.com/ortall0201/Social/main/devi-feed/buffer-reels-hollywood-hv-2026-04-18"
#   -Manifest "c:\path\to\schedule-manifest.json"

[CmdletBinding()]
param(
  [string]$MediaBaseUrl = "https://raw.githubusercontent.com/ortall0201/Social/main/devi-feed/buffer-reels-hollywood-hv-2026-04-18",
  [string]$Manifest = ""
)

$ErrorActionPreference = "Stop"
$repoRoot = (Resolve-Path (Join-Path $PSScriptRoot "..\..")).Path
if (-not $Manifest) {
  $Manifest = Join-Path $repoRoot "contenty\hollywood-high-volume-week-2026-04-18\schedule-manifest.json"
}
$idsPath = Join-Path $repoRoot "local-secrets\buffer_ids.ps1"
if (-not (Test-Path -LiteralPath $idsPath)) {
  throw "Missing $idsPath"
}
. $idsPath
if ([string]::IsNullOrWhiteSpace($env:BUFFER_PROFILE_IG_DEVI) -or [string]::IsNullOrWhiteSpace($env:BUFFER_PROFILE_FB_PAGE_DEVI)) {
  throw "BUFFER_PROFILE_IG_DEVI and BUFFER_PROFILE_FB_PAGE_DEVI must be set in buffer_ids.ps1"
}

$ig = $env:BUFFER_PROFILE_IG_DEVI.Trim()
$fb = $env:BUFFER_PROFILE_FB_PAGE_DEVI.Trim()
$queueScript = Join-Path $repoRoot "scripts\buffer-queue-video-post.ps1"
. (Join-Path $repoRoot "scripts\buffer-common.ps1")

$j = Get-Content -LiteralPath $Manifest -Raw | ConvertFrom-Json
$ms = [DateTimeOffset]::UtcNow.ToUnixTimeMilliseconds()
$i = 0
foreach ($slot in $j.slots) {
  $v = $ms + $i
  $url = ("{0}/{1}?v={2}" -f $MediaBaseUrl.TrimEnd("/"), $slot.file, $v)
  $body = "{0}`n`n{1}" -f $slot.caption, $slot.tags
  $due = $slot.dueAt
  Write-Host ("[{0}] IG reel due {1}" -f $slot.file, $due)
  & $queueScript -ChannelId $ig -Service instagram -PostType reel -ShouldShareToFeed $true -Text $body -VideoUrl $url -DueAt $due | Out-Null
  Start-Sleep -Milliseconds 800
  Write-Host ("[{0}] FB reel due {1}" -f $slot.file, $due)
  & $queueScript -ChannelId $fb -Service facebook -PostType reel -Text $body -VideoUrl $url -DueAt $due | Out-Null
  Start-Sleep -Milliseconds 800
  $i++
}

Write-Host "Done. Queued $($j.slots.Count) slots x2 (IG+FB). Confirm media URLs resolve before due times."
