# Schedule all Remotion 4:5 feed cards to Buffer (Devi IG + Devi FB Page) with manifest copy + hashtags.
# Requires: local-secrets/buffer_access_token.txt, local-secrets/buffer_ids.ps1 (BUFFER_PROFILE_IG_DEVI, BUFFER_PROFILE_FB_PAGE_DEVI)
# Run from repo root:
#   powershell -ExecutionPolicy Bypass -File devi-feed/imagegen-buffer-2026-04-16/schedule-feed45-buffer-batch.ps1
#
# Optional: -StartUtc "2026-04-16T17:00:00Z" (first slot; +1 day per card). Default: tomorrow 17:00 UTC.

[CmdletBinding()]
param(
  [string]$StartUtc = ""
)

$ErrorActionPreference = "Stop"
$repoRoot = (Resolve-Path (Join-Path $PSScriptRoot "..\..")).Path
$idsPath = Join-Path $repoRoot "local-secrets\buffer_ids.ps1"
if (-not (Test-Path -LiteralPath $idsPath)) {
  throw "Missing $idsPath - copy buffer_ids.example.ps1 and set BUFFER_PROFILE_IG_DEVI / BUFFER_PROFILE_FB_PAGE_DEVI"
}
. $idsPath
if (-not $env:BUFFER_PROFILE_IG_DEVI -or -not $env:BUFFER_PROFILE_FB_PAGE_DEVI) {
  throw "BUFFER_PROFILE_IG_DEVI and BUFFER_PROFILE_FB_PAGE_DEVI must be set in buffer_ids.ps1"
}

$ig = $env:BUFFER_PROFILE_IG_DEVI.Trim()
$fb = $env:BUFFER_PROFILE_FB_PAGE_DEVI.Trim()
$manifestPath = Join-Path $PSScriptRoot "with-caption-feed45\manifest.json"
if (-not (Test-Path -LiteralPath $manifestPath)) {
  throw "Missing manifest: $manifestPath"
}
$manifest = (Get-Content -LiteralPath $manifestPath -Raw -Encoding utf8 | ConvertFrom-Json)
$base = "https://raw.githubusercontent.com/ortall0201/Social/main/devi-feed/imagegen-buffer-2026-04-16/with-caption-feed45"
$ms = [DateTimeOffset]::UtcNow.ToUnixTimeMilliseconds()

# Up to 5 hashtags per card, moment-tinted (Pipeline B editorial / events windows).
$hashtagsPerCard = @(
  "#fashion #editorial #archive #quietluxury #devi",
  "#fashion #oldhollywood #weekendstyle #glam #devi",
  "#fashion #editorial #minimal #mood #devi",
  "#fashion #festival #desert #nightout #devi",
  "#fashion #western #country #refined #devi",
  "#fashion #metgala #art #couture #devi",
  "#fashion #editorial #art #paint #devi",
  "#fashion #silver #power #streetstyle #devi",
  "#fashion #tunnel #gameday #nbastyle #devi"
)

if ($StartUtc) {
  $cursor = [DateTimeOffset]::Parse($StartUtc).ToUniversalTime()
}
else {
  $tomorrow = [DateTimeOffset]::UtcNow.Date.AddDays(1)
  $cursor = [DateTimeOffset]::new($tomorrow.Year, $tomorrow.Month, $tomorrow.Day, 17, 0, 0, [TimeSpan]::Zero)
}

$queueScript = Join-Path $repoRoot "scripts\buffer-queue-image-post.ps1"
$i = 0
foreach ($slide in $manifest.slides) {
  $num = [int]($slide.file -replace '\D', '')
  $nn = "{0:D2}" -f $num
  $v = $ms + $num
  $url = "$base/devi-buffer-card-$nn-with-caption-feed45.png?v=$v"
  $tags = $hashtagsPerCard[$i]
  $sub = $slide.subline.Replace([char]0x2014, "-")
  $body = "{0}`n{1}`n`n{2}" -f $slide.headline, $sub, $tags
  $due = $cursor.ToString("yyyy-MM-ddTHH:mm:ss.fffZ")
  Write-Host "[$nn] IG+FB due $due"

  & $queueScript -ChannelId $ig -Service instagram -PostType post -ShouldShareToFeed $true -Text $body -ImageUrl $url -DueAt $due | Out-Null
  Start-Sleep -Milliseconds 750
  & $queueScript -ChannelId $fb -Service facebook -PostType post -Text $body -ImageUrl $url -DueAt $due | Out-Null
  Start-Sleep -Milliseconds 750

  $cursor = $cursor.AddDays(1)
  $i++
}

Write-Host "Done. $($manifest.slides.Count) cards x2 channels queued."
