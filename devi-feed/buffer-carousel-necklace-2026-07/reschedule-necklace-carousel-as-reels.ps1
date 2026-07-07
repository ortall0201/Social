# Swap necklace Buffer image carousels -> autoplay MP4 reels (same captions/slots).
#
# powershell -ExecutionPolicy Bypass -File devi-feed/buffer-carousel-necklace-2026-07/reschedule-necklace-carousel-as-reels.ps1
# powershell -ExecutionPolicy Bypass -File devi-feed/buffer-carousel-necklace-2026-07/reschedule-necklace-carousel-as-reels.ps1 -DryRun

[CmdletBinding()]
param(
  [switch]$DryRun,
  [ValidateSet("", "A", "B")]
  [string]$OnlyArm = ""
)

$ErrorActionPreference = "Stop"
$repoRoot = (Resolve-Path (Join-Path $PSScriptRoot "..\..")).Path
$idsPath = Join-Path $repoRoot "local-secrets\buffer_ids.ps1"
. $idsPath
if ([string]::IsNullOrWhiteSpace($env:BUFFER_PROFILE_IG_DEVI)) { throw "BUFFER_PROFILE_IG_DEVI missing" }

$ig = $env:BUFFER_PROFILE_IG_DEVI.Trim()
. (Join-Path $repoRoot "scripts\buffer-common.ps1")
$queueScript = Join-Path $repoRoot "scripts\buffer-queue-video-post.ps1"
$manifestPath = Join-Path $PSScriptRoot "schedule-buffer-carousel-ab.json"
$manifest = Get-Content -LiteralPath $manifestPath -Raw -Encoding utf8 | ConvertFrom-Json
$baseUrl = $manifest.defaults.mediaBaseUrl.TrimEnd("/")
$hashtags = $manifest.defaults.hashtags
$v = [DateTimeOffset]::UtcNow.ToUnixTimeMilliseconds()

$oldPostIds = @(
  "6a4d301ce84dab11043a7a0f",
  "6a4d301e81f8953d53497930"
)

$extraDeleteIds = @(
  "6a4d38a90fa0fd290d59b3b5",
  "6a4d38a7b61c8b0fcf0a2d65",
  "6a4d55df2dad114360181300"
)

$videoFiles = @{
  "necklace-carousel-arm-a-hq" = @{
    file = "necklace-carousel-arm-a-hq-reel.mp4"
    thumb = "necklace-carousel-arm-a-hq-thumb.jpg"
  }
  "necklace-carousel-arm-b-draft" = @{
    file = "necklace-carousel-arm-b-draft-reel.mp4"
    thumb = "necklace-carousel-arm-b-draft-thumb.jpg"
  }
}

$mutDel = @'
mutation DeletePost($input: DeletePostInput!) {
  deletePost(input: $input) {
    __typename
    ... on DeletePostSuccess { id }
    ... on VoidMutationError { message }
    ... on MutationError { message }
  }
}
'@

$results = @()
foreach ($oldId in ($oldPostIds + $extraDeleteIds)) {
  if ($DryRun) {
    Write-Host "[DRY] delete old carousel post $oldId"
    continue
  }
  Write-Host "Delete post $oldId"
  $del = (Invoke-BufferGraphQl -Query $mutDel -Variables @{ input = @{ id = $oldId } }).deletePost
  if ($del.__typename -ne "DeletePostSuccess") {
    Write-Warning "deletePost skip $oldId : $($del.message)"
  }
  Start-Sleep -Milliseconds 600
}

foreach ($post in $manifest.posts) {
  if ($OnlyArm -and $post.arm -ne $OnlyArm) { continue }
  $pack = $videoFiles[$post.id]
  $file = $pack.file
  $thumbFile = $pack.thumb
  $videoUrl = ("{0}/{1}?v={2}" -f $baseUrl, $file, $v)
  $body = "{0}`n`n{1}" -f $post.caption.Trim(), $hashtags
  $due = ([DateTimeOffset]::Parse($post.dueAtUtc)).ToUniversalTime().ToString("yyyy-MM-ddTHH:mm:ss.fffZ")

  $row = [ordered]@{
    id = $post.id
    arm = $post.arm
    format = "reel-mp4"
    file = $file
    dueAtUtc = $due
    status = "pending"
    postId = $null
    error = $null
  }

  if ($DryRun) {
    Write-Host "[DRY] $($post.id) reel due $due -> $file"
    $row.status = "dry_run"
    $results += [pscustomobject]$row
    continue
  }

  try {
    Write-Host "Queue $($post.id) reel due $due"
    $out = & $queueScript `
      -ChannelId $ig `
      -Service instagram `
      -PostType reel `
      -Text $body `
      -VideoUrl $videoUrl `
      -ThumbnailOffsetMs 0 `
      -DueAt $due `
      -ShouldShareToFeed $true `
      -UseStableCdnForGithub $false `
      -SkipCaptionGate | ConvertFrom-Json
    $row.status = "scheduled"
    $row.postId = $out.post.id
    Write-Host "  -> postId $($out.post.id)"
  }
  catch {
    $row.status = "failed"
    $row.error = $_.Exception.Message
    Write-Warning $row.error
  }

  $results += [pscustomobject]$row
  Start-Sleep -Milliseconds 900
}

$outPath = Join-Path $PSScriptRoot ("buffer-reel-reschedule-results-{0}.json" -f (Get-Date -Format "yyyyMMdd-HHmmss"))
$results | ConvertTo-Json -Depth 6 | Set-Content -LiteralPath $outPath -Encoding utf8
Write-Host "Wrote $outPath"
