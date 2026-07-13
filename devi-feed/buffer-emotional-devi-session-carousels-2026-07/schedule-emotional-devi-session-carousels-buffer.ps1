# Prepare 9:16 IG/FB reels + schedule all Emotional Devi session carousels to Buffer.
# powershell -ExecutionPolicy Bypass -File devi-feed/buffer-emotional-devi-session-carousels-2026-07/schedule-emotional-devi-session-carousels-buffer.ps1
# powershell -ExecutionPolicy Bypass -File devi-feed/buffer-emotional-devi-session-carousels-2026-07/schedule-emotional-devi-session-carousels-buffer.ps1 -DryRun

[CmdletBinding()]
param(
  [switch]$DryRun,
  [switch]$SkipEncode,
  [switch]$CancelPriorV16
)

$ErrorActionPreference = "Stop"
$repoRoot = (Resolve-Path (Join-Path $PSScriptRoot "..\..")).Path
$bufDir = Join-Path $repoRoot "buffer-delivery"
$manifestPath = Join-Path $PSScriptRoot "schedule-manifest.json"
$manifest = Get-Content -LiteralPath $manifestPath -Raw | ConvertFrom-Json

. (Join-Path $repoRoot "local-secrets\buffer_ids.ps1")
. (Join-Path $repoRoot "scripts\buffer-common.ps1")
$queueScript = Join-Path $repoRoot "scripts\buffer-queue-video-post.ps1"

$profiles = @{ instagram = $env:BUFFER_PROFILE_IG_DEVI.Trim() }
if ($env:BUFFER_PROFILE_FB_PAGE_DEVI) { $profiles.facebook = $env:BUFFER_PROFILE_FB_PAGE_DEVI.Trim() }

function Ensure-Ig916([string]$MasterFile, [string]$Ig916File) {
  $src = Join-Path $bufDir $MasterFile
  $dst = Join-Path $bufDir $Ig916File
  if (-not (Test-Path $src)) { throw "Missing master: $MasterFile" }
  if ((Test-Path $dst) -and -not $SkipEncode) {
    $sw = ffprobe -v error -select_streams v:0 -show_entries stream=width,height -of csv=p=0 $dst 2>$null
    if ($sw -eq "1080,1920") {
      Write-Host "[ig916] exists $Ig916File"
      return $dst
    }
  }
  if ($SkipEncode -and -not (Test-Path $dst)) { throw "Missing ig916 and -SkipEncode: $Ig916File" }
  Write-Host "[ig916] encode $MasterFile -> $Ig916File"
  & ffmpeg -y -hide_banner -loglevel error -i $src `
    -vf "scale=1080:1920:force_original_aspect_ratio=decrease,pad=1080:1920:(ow-iw)/2:(oh-ih)/2,setsar=1" `
    -c:v libx264 -pix_fmt yuv420p -c:a copy -movflags +faststart $dst
  if ($LASTEXITCODE -ne 0) { throw "ffmpeg failed: $Ig916File" }
  return $dst
}

if (-not $SkipEncode) {
  foreach ($post in $manifest.posts) {
    if ($post.ig916File -eq "emotional-devi-food-fight-v16-ig916-reel.mp4" -and (Test-Path (Join-Path $bufDir $post.ig916File))) {
      Write-Host "[ig916] skip v16 (already exists)"
      continue
    }
    if ($post.ig916File -eq "emotional-devi-food-fight-v17-acting-ig916-reel.mp4" -and (Test-Path (Join-Path $bufDir $post.ig916File))) {
      Write-Host "[ig916] skip v17 (already exists)"
      continue
    }
    Ensure-Ig916 $post.masterFile $post.ig916File
  }
}

if ($CancelPriorV16 -and -not $DryRun) {
  $mutDel = @'
mutation DeletePost($input: DeletePostInput!) {
  deletePost(input: $input) {
    __typename
    ... on DeletePostSuccess { id }
    ... on MutationError { message }
  }
}
'@
  foreach ($oldId in @("6a550783c4f11105fe462949", "6a550786cfcbeef502ba568e")) {
    try {
      Write-Host "[cancel] delete prior v16 post $oldId"
      $del = (Invoke-BufferGraphQl -Query $mutDel -Variables @{ input = @{ id = $oldId } }).deletePost
      if ($del.__typename -ne "DeletePostSuccess") { Write-Warning "deletePost: $($del.message)" }
      Start-Sleep -Milliseconds 600
    } catch { Write-Warning $_.Exception.Message }
  }
}

$start = [DateTimeOffset]::Parse($manifest.startDateUtc)
$baseUrl = $manifest.defaults.mediaBaseUrl.TrimEnd("/")
$results = @()

foreach ($post in $manifest.posts) {
  $due = $start.AddDays([int]$post.dayOffset).ToUniversalTime().ToString("yyyy-MM-ddTHH:mm:ss.fffZ")
  $caption = $post.caption.Trim()
  $hashtags = @($manifest.defaults.hashtags)
  $body = "{0}`n`n{1}" -f $caption, ($hashtags -join " ")
  $v = [DateTimeOffset]::UtcNow.ToUnixTimeMilliseconds()
  $videoUrl = "{0}/{1}?v={2}" -f $baseUrl, $post.ig916File, $v

  foreach ($channel in @($manifest.defaults.channels)) {
    $key = "$channel".ToLowerInvariant()
    if (-not $profiles.ContainsKey($key)) { continue }
    $row = [ordered]@{
      id = $post.id
      channel = $key
      dueAtUtc = $due
      file = $post.ig916File
      videoUrl = $videoUrl
      status = "pending"
      postId = $null
      error = $null
    }
    if ($DryRun) {
      Write-Host "[DRY] $($post.id) -> $key due $due ($($post.ig916File))"
      $row.status = "dry_run"
      $results += [pscustomobject]$row
      continue
    }
    try {
      Write-Host "Queue $($post.id) -> $key due $due"
      $out = & $queueScript `
        -ChannelId $profiles[$key] `
        -Service $key `
        -PostType reel `
        -Text $body `
        -VideoUrl $videoUrl `
        -DueAt $due `
        -ShouldShareToFeed $true `
        -ThumbnailOffsetMs 0 `
        -UseStableCdnForGithub $true | ConvertFrom-Json
      $row.status = "scheduled"
      $row.postId = $out.post.id
      $row.videoUrl = $out.videoUrl
      Write-Host "  -> $($out.post.id)"
    } catch {
      $row.status = "failed"
      $row.error = $_.Exception.Message
      Write-Warning $row.error
    }
    $results += [pscustomobject]$row
    Start-Sleep -Milliseconds 900
  }
}

$outPath = Join-Path $PSScriptRoot ("buffer-schedule-results-{0}.json" -f (Get-Date -Format "yyyyMMdd-HHmmss"))
$results | ConvertTo-Json -Depth 6 | Set-Content -LiteralPath $outPath -Encoding UTF8
$results | Format-Table -AutoSize
Write-Host "Wrote $outPath"
