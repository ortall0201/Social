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
  [string]$Manifest = "",
  [string]$LocalMediaFolder = "",
  [switch]$SkipPreflight,
  [switch]$SkipNormalize,
  [switch]$PreflightOnly
)

$ErrorActionPreference = "Stop"
$repoRoot = (Resolve-Path (Join-Path $PSScriptRoot "..\..")).Path
if (-not $Manifest) {
  $Manifest = Join-Path $repoRoot "contenty\hollywood-high-volume-week-2026-04-18\schedule-manifest.json"
}
if (-not $LocalMediaFolder) {
  $LocalMediaFolder = $PSScriptRoot
}

function Convert-RawGithubToJsDelivr {
  param([Parameter(Mandatory = $true)][string]$Url)
  if ($Url -match "^https://raw\.githubusercontent\.com/([^/]+)/([^/]+)/([^/]+)/(.+)$") {
    $owner = $Matches[1]
    $repo = $Matches[2]
    $branch = $Matches[3]
    $path = $Matches[4]
    return ("https://cdn.jsdelivr.net/gh/{0}/{1}@{2}/{3}" -f $owner, $repo, $branch, $path)
  }
  return $Url
}

function Test-UrlReturns200 {
  param([Parameter(Mandatory = $true)][string]$Url)
  $curl = Get-Command curl.exe -ErrorAction SilentlyContinue
  if ($curl) {
    $code = (& curl.exe -L -I -s -o NUL -w "%{http_code}" "$Url").Trim()
    return ($code -eq "200")
  }
  try {
    $resp = Invoke-WebRequest -Uri $Url -Method Head -TimeoutSec 30
    return ($resp.StatusCode -eq 200)
  } catch {
    return $false
  }
}

function Get-ReelMediaInfo {
  param([Parameter(Mandatory = $true)][string]$Path)
  $raw = & ffprobe -v error -show_streams -of json "$Path"
  if ($LASTEXITCODE -ne 0 -or [string]::IsNullOrWhiteSpace($raw)) {
    throw "ffprobe failed for $Path"
  }
  return ($raw | ConvertFrom-Json)
}

function Convert-RateToDouble {
  param([Parameter(Mandatory = $true)][string]$Rate)
  if ([string]::IsNullOrWhiteSpace($Rate) -or $Rate -eq "0/0") {
    return 0.0
  }
  if ($Rate -match "^(\d+(?:\.\d+)?)/(\d+(?:\.\d+)?)$") {
    $n = [double]$Matches[1]
    $d = [double]$Matches[2]
    if ($d -eq 0) { return 0.0 }
    return ($n / $d)
  }
  try {
    return [double]$Rate
  } catch {
    return 0.0
  }
}

function Test-ReelCompliance {
  param([Parameter(Mandatory = $true)][string]$Path)
  $info = Get-ReelMediaInfo -Path $Path
  $video = $info.streams | Where-Object { $_.codec_type -eq "video" } | Select-Object -First 1
  $audio = $info.streams | Where-Object { $_.codec_type -eq "audio" } | Select-Object -First 1
  if (-not $video) { return $false }
  if (-not $audio) { return $false }
  if ([int]$video.width -ne 1080 -or [int]$video.height -ne 1920) { return $false }
  if ([string]$video.codec_name -ne "h264") { return $false }
  if ([string]$video.pix_fmt -ne "yuv420p") { return $false }
  $fps = Convert-RateToDouble -Rate ([string]$video.avg_frame_rate)
  if ([Math]::Abs($fps - 30.0) -gt 0.05) { return $false }
  if ([string]$audio.codec_name -ne "aac") { return $false }
  return $true
}

function Normalize-ReelCanonical {
  param(
    [Parameter(Mandatory = $true)][string]$InputPath,
    [Parameter(Mandatory = $true)][string]$OutputPath
  )
  $info = Get-ReelMediaInfo -Path $InputPath
  $hasAudio = @($info.streams | Where-Object { $_.codec_type -eq "audio" }).Count -gt 0

  if ($hasAudio) {
    & ffmpeg -y -i "$InputPath" `
      -vf "scale=1080:1920:force_original_aspect_ratio=decrease,pad=1080:1920:(ow-iw)/2:(oh-ih)/2,format=yuv420p" `
      -r 30 `
      -c:v libx264 -pix_fmt yuv420p `
      -movflags +faststart `
      -c:a aac -ar 44100 -ac 2 -b:a 128k `
      "$OutputPath"
  } else {
    & ffmpeg -y -i "$InputPath" `
      -f lavfi -i anullsrc=channel_layout=stereo:sample_rate=44100 `
      -shortest `
      -vf "scale=1080:1920:force_original_aspect_ratio=decrease,pad=1080:1920:(ow-iw)/2:(oh-ih)/2,format=yuv420p" `
      -r 30 `
      -c:v libx264 -pix_fmt yuv420p `
      -movflags +faststart `
      -c:a aac -ar 44100 -ac 2 -b:a 128k `
      "$OutputPath"
  }
  if ($LASTEXITCODE -ne 0) {
    throw "ffmpeg normalization failed for $InputPath"
  }
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
$files = @($j.slots | ForEach-Object { $_.file } | Where-Object { -not [string]::IsNullOrWhiteSpace($_) } | Sort-Object -Unique)

if (-not $SkipPreflight) {
  Write-Host "Preflight: local files + canonical normalization + public URL checks..."
  $ffprobe = Get-Command ffprobe -ErrorAction SilentlyContinue
  if (-not $ffprobe) { throw "ffprobe not found on PATH. Install ffmpeg suite before scheduling." }
  $ffmpeg = Get-Command ffmpeg -ErrorAction SilentlyContinue
  if (-not $ffmpeg) { throw "ffmpeg not found on PATH. Install ffmpeg before scheduling." }

  $missingLocal = @()
  $complianceFailures = @()
  $urlFailures = @()
  foreach ($f in $files) {
    $localPath = Join-Path $LocalMediaFolder $f
    if (-not (Test-Path -LiteralPath $localPath)) {
      $missingLocal += $f
      continue
    }

    if (-not $SkipNormalize) {
      $tmp = "$localPath.tmp-normalized.mp4"
      Write-Host ("Normalizing {0} to canonical 1080x1920/30fps/x264/yuv420p/+faststart/AAC..." -f $f)
      Normalize-ReelCanonical -InputPath $localPath -OutputPath $tmp
      Move-Item -LiteralPath $tmp -Destination $localPath -Force
    }

    if (-not (Test-ReelCompliance -Path $localPath)) {
      $complianceFailures += $f
    }

    $probeBase = ("{0}/{1}" -f $MediaBaseUrl.TrimEnd("/"), $f)
    $probeBase = Convert-RawGithubToJsDelivr -Url $probeBase
    $probeUrl = "{0}?v={1}" -f $probeBase, [DateTimeOffset]::UtcNow.ToUnixTimeMilliseconds()
    if (-not (Test-UrlReturns200 -Url $probeUrl)) {
      $urlFailures += $probeUrl
    }
  }

  if ($missingLocal.Count -gt 0) {
    throw ("Preflight failed. Missing local files: {0}" -f ($missingLocal -join ", "))
  }
  if ($complianceFailures.Count -gt 0) {
    throw ("Preflight failed. Non-canonical reel(s) after normalization/validation: {0}" -f ($complianceFailures -join ", "))
  }
  if ($urlFailures.Count -gt 0) {
    throw ("Preflight failed. Public URL(s) not returning HTTP 200: {0}" -f ($urlFailures -join ", "))
  }
  Write-Host "Preflight passed."
}

if ($PreflightOnly) {
  Write-Host "PreflightOnly set. Exiting before Buffer queue."
  return
}

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
