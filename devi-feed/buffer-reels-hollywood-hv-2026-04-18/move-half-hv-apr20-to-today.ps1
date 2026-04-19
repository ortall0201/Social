# Move first 4 HV day-1 reels (01-04) from 2026-04-20 to today (UTC), IG + FB.
# Delete + recreate with new dueAt (Buffer has no update dueAt in our stack).
#
# Requires: local-secrets, BUFFER_ORGANIZATION_ID, BUFFER_PROFILE_IG_DEVI, BUFFER_PROFILE_FB_PAGE_DEVI
#
# From repo root:
#   powershell -ExecutionPolicy Bypass -File devi-feed/buffer-reels-hollywood-hv-2026-04-18/move-half-hv-apr20-to-today.ps1
#
# Optional:
#   -SourceDayPrefix "2026-04-20"   # match dueAt date (UTC)
#   -MediaBaseUrl "https://raw.githubusercontent.com/ortall0201/Social/main/devi-feed/buffer-reels-hollywood-hv-2026-04-18"
#   -FirstMinutesFromNow 45        # first slot offset from UTC now
#   -HoursBetweenSlots 1.75        # spacing between the 4 posts

[CmdletBinding()]
param(
  [string]$MediaBaseUrl = "https://raw.githubusercontent.com/ortall0201/Social/main/devi-feed/buffer-reels-hollywood-hv-2026-04-18",
  [string]$SourceDayPrefix = "2026-04-20",
  [int]$FirstMinutesFromNow = 45,
  [double]$HoursBetweenSlots = 1.75
)

$ErrorActionPreference = "Stop"
$repoRoot = (Resolve-Path (Join-Path $PSScriptRoot "..\..")).Path
$idsPath = Join-Path $repoRoot "local-secrets\buffer_ids.ps1"
if (-not (Test-Path -LiteralPath $idsPath)) { throw "Missing $idsPath" }
. $idsPath
foreach ($k in @("BUFFER_ORGANIZATION_ID", "BUFFER_PROFILE_IG_DEVI", "BUFFER_PROFILE_FB_PAGE_DEVI")) {
  $val = [Environment]::GetEnvironmentVariable($k, "Process")
  if ([string]::IsNullOrWhiteSpace($val)) { throw "Set $k in local-secrets\buffer_ids.ps1" }
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

$filesToMove = @(
  "hv-20260418-01.mp4",
  "hv-20260418-02.mp4",
  "hv-20260418-03.mp4",
  "hv-20260418-04.mp4"
)

function Get-HvScheduledOnDay([string]$channelId, [string]$dayPrefix) {
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
    if (-not $n.dueAt -or $n.dueAt -notlike "$dayPrefix*") { continue }
    $src = ($n.assets | ForEach-Object { $_.source }) | Select-Object -First 1
    if (-not $src) { continue }
    $base = $src -replace "\?.*$", ""
    if ($base -notmatch "buffer-reels-hollywood-hv-2026-04-18/([^/]+\.mp4)$") { continue }
    $out += [pscustomobject]@{ Node = $n; File = $matches[1] }
  }
  return $out
}

function New-DueTimesUtc([int]$firstMin, [double]$hoursGap, [int]$count) {
  $cursor = [DateTimeOffset]::UtcNow.AddMinutes([math]::Max(15, $firstMin))
  $list = @()
  for ($i = 0; $i -lt $count; $i++) {
    $list += $cursor
    $cursor = $cursor.AddHours($hoursGap)
  }
  return $list
}

$dueList = New-DueTimesUtc -firstMin $FirstMinutesFromNow -hoursGap $HoursBetweenSlots -count $filesToMove.Count
Write-Host "Moving $($filesToMove.Count) HV reels off $SourceDayPrefix -> today UTC, first due $($dueList[0].ToString('yyyy-MM-ddTHH:mm:ss.fffZ'))"

$ms = [DateTimeOffset]::UtcNow.ToUnixTimeMilliseconds()
$slot = 0

foreach ($ch in @(@{ id = $ig; svc = "instagram"; label = "IG" }, @{ id = $fb; svc = "facebook"; label = "FB" })) {
  $rows = @(Get-HvScheduledOnDay $ch.id $SourceDayPrefix)
  foreach ($file in $filesToMove) {
    $row = $rows | Where-Object { $_.File -eq $file } | Select-Object -First 1
    if (-not $row) {
      Write-Warning "[$($ch.label)] No scheduled $file on $SourceDayPrefix - skip."
      continue
    }
    $n = $row.Node
    Write-Host "[$($ch.label)] delete $($n.id) $file was $($n.dueAt)"
    $del = (Invoke-BufferGraphQl -Query $mutDel -Variables @{ input = @{ id = $n.id } }).deletePost
    if ($del.__typename -ne "DeletePostSuccess") {
      throw "deletePost failed: $($del | ConvertTo-Json -Compress)"
    }
    Start-Sleep -Milliseconds 600
  }
}

$slot = 0
foreach ($ch in @(@{ id = $ig; svc = "instagram"; label = "IG" }, @{ id = $fb; svc = "facebook"; label = "FB" })) {
  for ($i = 0; $i -lt $filesToMove.Count; $i++) {
    $file = $filesToMove[$i]
    $due = $dueList[$i].ToString("yyyy-MM-ddTHH:mm:ss.fffZ")
    $v = $ms + $slot
    $url = ("{0}/{1}?v={2}" -f $MediaBaseUrl.TrimEnd("/"), $file, $v)
    # Text must match prior posts: read from pack (same as schedule-hollywood-hv-day1-only.ps1)
    $posts = @(
      @{ file = "hv-20260418-01.mp4"; caption = "Pearls. Fringe. Flash."; tags = "#devi #glam #beauty #festival #AIFashion" },
      @{ file = "hv-20260418-02.mp4"; caption = "Blue heat. Bold lines."; tags = "#devi #fitness #dance #editorial #AIFashion" },
      @{ file = "hv-20260418-03.mp4"; caption = "Vintage soul. New chrome."; tags = "#devi #fashion #streetstyle #AIFashion" },
      @{ file = "hv-20260418-04.mp4"; caption = "Rose vinyl. Red pulse."; tags = "#devi #beauty #glam #AIFashion" }
    )
    $p = $posts | Where-Object { $_.file -eq $file } | Select-Object -First 1
    $body = "{0}`n`n{1}" -f $p.caption, $p.tags
    Write-Host "[$($ch.label)] create $file due $due"
    $share = ($ch.svc -eq "instagram")
    if ($share) {
      & $queueScript -ChannelId $ch.id -Service $ch.svc -PostType reel -ShouldShareToFeed $true -Text $body -VideoUrl $url -DueAt $due | Out-Null
    } else {
      & $queueScript -ChannelId $ch.id -Service $ch.svc -PostType reel -Text $body -VideoUrl $url -DueAt $due | Out-Null
    }
    Start-Sleep -Milliseconds 800
    $slot++
  }
}

Write-Host "Done. Reels 05-08 remain on $SourceDayPrefix (unchanged)."
