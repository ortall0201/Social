# Re-time HV reels 01-04 that are already on *today* (UTC calendar day): delete + recreate
# with comfortable future spacing (default: first slot >= 50 min from now, then 2h apart).
#
# From repo root:
#   powershell -ExecutionPolicy Bypass -File devi-feed/buffer-reels-hollywood-hv-2026-04-18/rebalance-hv-today-four-reels.ps1
#
# Optional:
#   -FirstOffsetMinutes 55
#   -HoursBetweenSlots 2
#   -DayUtc "2026-04-19"   # override calendar day filter (default: UTC today)

[CmdletBinding()]
param(
  [string]$MediaBaseUrl = "https://raw.githubusercontent.com/ortall0201/Social/main/devi-feed/buffer-reels-hollywood-hv-2026-04-18",
  [int]$FirstOffsetMinutes = 50,
  [double]$HoursBetweenSlots = 2,
  [string]$DayUtc = ""
)

$ErrorActionPreference = "Stop"
$repoRoot = (Resolve-Path (Join-Path $PSScriptRoot "..\..")).Path
$idsPath = Join-Path $repoRoot "local-secrets\buffer_ids.ps1"
if (-not (Test-Path -LiteralPath $idsPath)) { throw "Missing $idsPath" }
. $idsPath
foreach ($k in @("BUFFER_ORGANIZATION_ID", "BUFFER_PROFILE_IG_DEVI", "BUFFER_PROFILE_FB_PAGE_DEVI")) {
  if ([string]::IsNullOrWhiteSpace([Environment]::GetEnvironmentVariable($k, "Process"))) {
    throw "Set $k in local-secrets\buffer_ids.ps1"
  }
}

$orgId = $env:BUFFER_ORGANIZATION_ID.Trim()
$ig = $env:BUFFER_PROFILE_IG_DEVI.Trim()
$fb = $env:BUFFER_PROFILE_FB_PAGE_DEVI.Trim()
. (Join-Path $repoRoot "scripts\buffer-common.ps1")
$queueScript = Join-Path $repoRoot "scripts\buffer-queue-video-post.ps1"

if (-not $DayUtc) {
  $DayUtc = [DateTimeOffset]::UtcNow.ToString("yyyy-MM-dd")
}

$files = @(
  "hv-20260418-01.mp4",
  "hv-20260418-02.mp4",
  "hv-20260418-03.mp4",
  "hv-20260418-04.mp4"
)

$posts = @(
  @{ file = "hv-20260418-01.mp4"; caption = "Pearls. Fringe. Flash."; tags = "#devi #glam #beauty #festival #AIFashion" },
  @{ file = "hv-20260418-02.mp4"; caption = "Blue heat. Bold lines."; tags = "#devi #fitness #dance #editorial #AIFashion" },
  @{ file = "hv-20260418-03.mp4"; caption = "Vintage soul. New chrome."; tags = "#devi #fashion #streetstyle #AIFashion" },
  @{ file = "hv-20260418-04.mp4"; caption = "Rose vinyl. Red pulse."; tags = "#devi #beauty #glam #AIFashion" }
)

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

function Get-HvFourOnDay([string]$channelId, [string]$dayPrefix) {
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
    if ($base -notmatch "buffer-reels-hollywood-hv-2026-04-18/(hv-20260418-0[1-4]\.mp4)$") { continue }
    $out += [pscustomobject]@{ Node = $n; File = $matches[1] }
  }
  return $out
}

$now = [DateTimeOffset]::UtcNow
$first = $now.AddMinutes([math]::Max(35, $FirstOffsetMinutes))
# Round up to next whole minute for cleaner Buffer UI
$first = [DateTimeOffset]::new($first.Year, $first.Month, $first.Day, $first.Hour, $first.Minute, 0, [TimeSpan]::Zero)
if ($first -le $now.AddMinutes(30)) {
  $first = $first.AddMinutes(1)
}

$dueList = @()
$c = $first
for ($i = 0; $i -lt $files.Count; $i++) {
  $dueList += $c
  $c = $c.AddHours($HoursBetweenSlots)
}

# Ensure last slot still same UTC day; if not, compress gap slightly
$dayEnd = [DateTimeOffset]::Parse(($DayUtc + "T23:58:00Z"))
if ($dueList[-1] -gt $dayEnd) {
  Write-Warning "Spread would cross UTC midnight; compressing to fit $DayUtc."
  $first = $now.AddMinutes([math]::Max(40, $FirstOffsetMinutes))
  $first = [DateTimeOffset]::new($first.Year, $first.Month, $first.Day, $first.Hour, $first.Minute, 0, [TimeSpan]::Zero)
  $span = ($dayEnd - $first).TotalHours
  $gap = [math]::Max(1.25, $span / 3.0)
  $dueList = @()
  $c = $first
  for ($i = 0; $i -lt $files.Count; $i++) {
    $dueList += $c
    $c = $c.AddHours($gap)
  }
}

Write-Host "UTC now: $($now.ToString('yyyy-MM-ddTHH:mm:ssZ'))"
Write-Host "Rebalancing HV 01-04 on $DayUtc (UTC) ->"
for ($i = 0; $i -lt $files.Count; $i++) {
  Write-Host ("  {0} -> {1}" -f $files[$i], $dueList[$i].ToString("yyyy-MM-ddTHH:mm:ss.fffZ"))
}

foreach ($ch in @(@{ id = $ig; svc = "instagram"; label = "IG" }, @{ id = $fb; svc = "facebook"; label = "FB" })) {
  $rows = @(Get-HvFourOnDay $ch.id $DayUtc)
  foreach ($file in $files) {
    $row = $rows | Where-Object { $_.File -eq $file } | Select-Object -First 1
    if (-not $row) {
      Write-Warning "[$($ch.label)] No scheduled $file on $DayUtc - skip delete."
      continue
    }
    Write-Host "[$($ch.label)] delete $($row.Node.id) $file was $($row.Node.dueAt)"
    $del = (Invoke-BufferGraphQl -Query $mutDel -Variables @{ input = @{ id = $row.Node.id } }).deletePost
    if ($del.__typename -ne "DeletePostSuccess") {
      throw "deletePost failed: $($del | ConvertTo-Json -Compress)"
    }
    Start-Sleep -Milliseconds 600
  }
}

$ms = [DateTimeOffset]::UtcNow.ToUnixTimeMilliseconds()
$slot = 0
foreach ($ch in @(@{ id = $ig; svc = "instagram"; label = "IG" }, @{ id = $fb; svc = "facebook"; label = "FB" })) {
  for ($i = 0; $i -lt $files.Count; $i++) {
    $file = $files[$i]
    $due = $dueList[$i].ToString("yyyy-MM-ddTHH:mm:ss.fffZ")
    $url = ("{0}/{1}?v={2}" -f $MediaBaseUrl.TrimEnd("/"), $file, ($ms + $slot))
    $p = $posts | Where-Object { $_.file -eq $file } | Select-Object -First 1
    $body = "{0}`n`n{1}" -f $p.caption, $p.tags
    Write-Host "[$($ch.label)] create $file due $due"
    if ($ch.svc -eq "instagram") {
      & $queueScript -ChannelId $ch.id -Service instagram -PostType reel -ShouldShareToFeed $true -Text $body -VideoUrl $url -DueAt $due | Out-Null
    } else {
      & $queueScript -ChannelId $ch.id -Service facebook -PostType reel -Text $body -VideoUrl $url -DueAt $due | Out-Null
    }
    Start-Sleep -Milliseconds 800
    $slot++
  }
}

Write-Host "Done."
