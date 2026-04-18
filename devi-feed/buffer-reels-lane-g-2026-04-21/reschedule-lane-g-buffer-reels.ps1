# Replace scheduled lane G reel posts (IG + FB) that use this folder's MP4s: delete old, create new with fresh ?v= URLs.
# Preserves dueAt times from existing Instagram posts when present; otherwise 2026-04-21 21:00 UTC + 1 day per slot.
#
# Requires: local-secrets/buffer_access_token.txt, buffer_ids.ps1 with
#   BUFFER_ORGANIZATION_ID, BUFFER_PROFILE_IG_DEVI, BUFFER_PROFILE_FB_PAGE_DEVI
#
# From repo root (after git push + normalize-lane-g-reels-1080x1920.ps1):
#   powershell -ExecutionPolicy Bypass -File devi-feed/buffer-reels-lane-g-2026-04-21/reschedule-lane-g-buffer-reels.ps1

[CmdletBinding()]
param(
  [string]$MediaBaseUrl = "https://raw.githubusercontent.com/ortall0201/Social/main/devi-feed/buffer-reels-lane-g-2026-04-21"
)

$ErrorActionPreference = "Stop"
$repoRoot = (Resolve-Path (Join-Path $PSScriptRoot "..\..")).Path
$idsPath = Join-Path $repoRoot "local-secrets\buffer_ids.ps1"
if (-not (Test-Path -LiteralPath $idsPath)) { throw "Missing $idsPath" }
. $idsPath
foreach ($k in @("BUFFER_ORGANIZATION_ID", "BUFFER_PROFILE_IG_DEVI", "BUFFER_PROFILE_FB_PAGE_DEVI")) {
  $val = [Environment]::GetEnvironmentVariable($k, "Process")
  if ([string]::IsNullOrWhiteSpace($val)) {
    throw "Set $k in local-secrets/buffer_ids.ps1 (dot-sourced env vars)."
  }
}

$orgId = $env:BUFFER_ORGANIZATION_ID.Trim()
$ig = $env:BUFFER_PROFILE_IG_DEVI.Trim()
$fb = $env:BUFFER_PROFILE_FB_PAGE_DEVI.Trim()
. (Join-Path $repoRoot "scripts\buffer-common.ps1")
$queueScript = Join-Path $repoRoot "scripts\buffer-queue-video-post.ps1"

$qList = @'
query ($input: PostsInput!, $first: Int) {
  posts(input: $input, first: $first) {
    edges {
      node {
        id
        dueAt
        text
        metadata {
          ... on InstagramPostMetadata { type }
          ... on FacebookPostMetadata { type }
        }
        assets { ... on VideoAsset { source } }
      }
    }
  }
}
'@

$mutDel = @'
mutation DeletePost($input: DeletePostInput!) {
  deletePost(input: $input) {
    __typename
    ... on DeletePostSuccess { id }
    ... on VoidMutationError { message }
  }
}
'@

function Get-ScheduledLaneGVideoPosts([string]$channelId) {
  $v = @{
    input = @{
      organizationId = $orgId
      filter = @{ channelIds = @($channelId); status = @("scheduled") }
      sort = @(@{ field = "dueAt"; direction = "asc" })
    }
    first = 100
  }
  $edges = (Invoke-BufferGraphQl -Query $qList -Variables $v).posts.edges
  $out = @()
  foreach ($e in $edges) {
    $n = $e.node
    $src = ($n.assets | ForEach-Object { $_.source }) | Select-Object -First 1
    if (-not $src) { continue }
    $base = $src -replace "\?.*$", ""
    if ($base -notmatch "buffer-reels-lane-g-2026-04-21/.+\.mp4") { continue }
    $out += $n
  }
  return $out
}

function Get-DueByFileFromNodes($nodes) {
  $byFile = @{}
  foreach ($n in $nodes) {
    $src = ($n.assets | ForEach-Object { $_.source }) | Select-Object -First 1
    if (-not $src) { continue }
    if ($src -match "buffer-reels-lane-g-2026-04-21/([^?]+\.mp4)") {
      $byFile[$matches[1]] = $n.dueAt
    }
  }
  return $byFile
}

function Remove-LaneGPosts([string]$channelId, [string]$label) {
  $nodes = @(Get-ScheduledLaneGVideoPosts $channelId)
  foreach ($n in $nodes) {
    Write-Host "[$label] delete $($n.id) due $($n.dueAt)"
    $del = (Invoke-BufferGraphQl -Query $mutDel -Variables @{ input = @{ id = $n.id } }).deletePost
    if ($del.__typename -ne "DeletePostSuccess") {
      throw "deletePost failed: $($del | ConvertTo-Json -Compress)"
    }
    Start-Sleep -Milliseconds 500
  }
}

function New-LaneGBatch {
  param(
    [string]$ChannelId,
    [string]$ServiceName,
    [string]$PostType,
    [hashtable]$DueByFile,
    [int]$MsBase
  )

  $posts = @(
    @{ file = "r-g-001-headliner-red-sequin-reel.mp4"; caption = "Red. Live. Loud."; tags = "#Coachella2026 #fashion #devi #editorial #AIFashion" },
    @{ file = "r-g-002-slip-colorblock-reel.mp4"; caption = "Gold. Pink. Desert."; tags = "#Coachella2026 #fashion #devi #vintagevibes #festivalstyle" },
    @{ file = "r-g-003-revolve-futurism-reel.mp4"; caption = "Silver. Sun. Surreal."; tags = "#Coachella2026 #fashion #devi #editorial #AIFashion" },
    @{ file = "r-g-004-sheer-lean-reel.mp4"; caption = "Sheer. Bold. Still."; tags = "#Coachella2026 #fashion #devi #editorial #glam" },
    @{ file = "r-g-005-poolside-reel.mp4"; caption = "Pool. Side. Main."; tags = "#Coachella2026 #fashion #devi #poolside #glam" },
    @{ file = "r-g-006-mesh-cape-reel.mp4"; caption = "Cape. Drama. Drop."; tags = "#Coachella2026 #fashion #devi #editorial #festival" }
  )

  $cursor = [DateTimeOffset]::Parse("2026-04-21T21:00:00Z").ToUniversalTime()
  $i = 0
  foreach ($p in $posts) {
    if ($DueByFile -and $DueByFile.ContainsKey($p.file)) {
      $due = ([DateTimeOffset]::Parse($DueByFile[$p.file])).ToUniversalTime().ToString("yyyy-MM-ddTHH:mm:ss.fffZ")
    }
    else {
      $due = $cursor.AddDays($i).ToString("yyyy-MM-ddTHH:mm:ss.fffZ")
    }
    $v = $MsBase + $i
    $url = ("{0}/{1}?v={2}" -f $MediaBaseUrl.TrimEnd("/"), $p.file, $v)
    $body = "{0}`n`n{1}" -f $p.caption, $p.tags
    Write-Host "[$ServiceName] create $($p.file) due $due"

    $args = @{
      ChannelId = $ChannelId
      Service = $ServiceName
      PostType = $PostType
      Text = $body
      VideoUrl = $url
      DueAt = $due
    }
    if ($ServiceName -eq "instagram") {
      $args.ShouldShareToFeed = $true
    }

    & $queueScript @args | Out-Null
    Start-Sleep -Milliseconds 800
    $i++
  }
}

$igNodes = @(Get-ScheduledLaneGVideoPosts $ig)
$dueByFile = Get-DueByFileFromNodes $igNodes
if ($dueByFile.Count -eq 0) {
  $dueByFile = Get-DueByFileFromNodes @(Get-ScheduledLaneGVideoPosts $fb)
}

$ms = [DateTimeOffset]::UtcNow.ToUnixTimeMilliseconds()

Remove-LaneGPosts $ig "IG"
Remove-LaneGPosts $fb "FB"

New-LaneGBatch -ChannelId $ig -ServiceName "instagram" -PostType "reel" -DueByFile $dueByFile -MsBase $ms
$ms2 = [DateTimeOffset]::UtcNow.ToUnixTimeMilliseconds()
New-LaneGBatch -ChannelId $fb -ServiceName "facebook" -PostType "reel" -DueByFile $dueByFile -MsBase $ms2

Write-Host "Done. IG + FB lane-g reels rescheduled (1080x1920 media + fresh URLs)."
