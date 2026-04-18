# Schedules Ortal LinkedIn Part 2 to Buffer. Run from repo root:
#   . .\local-secrets\buffer_ids.ps1
#   .\buffer-linkedin\queue\Schedule-OrtalPart2LinkedInBuffer.ps1
#
# Repo root = two levels above this file (buffer-linkedin/queue -> repo).

[CmdletBinding()]
param()

$ErrorActionPreference = "Stop"
$repoRoot = (Resolve-Path (Join-Path $PSScriptRoot "..\..")).Path
Set-Location $repoRoot

$idsPath = Join-Path $repoRoot "local-secrets\buffer_ids.ps1"
if (-not (Test-Path -LiteralPath $idsPath)) { throw "Missing $idsPath" }
. $idsPath

$channelId = $env:BUFFER_PROFILE_LINKEDIN_ORTAL
if (-not $channelId) { throw "BUFFER_PROFILE_LINKEDIN_ORTAL not set in buffer_ids.ps1" }

$tacticalPath = Join-Path $repoRoot "buffer-linkedin\queue\2026-04-22-ortal-part2-tactical-series-five.json"
$comicPath = Join-Path $repoRoot "buffer-linkedin\queue\2026-04-22-ortal-part2-gijane-comic-four.json"
$tactical = (Get-Content -LiteralPath $tacticalPath -Raw | ConvertFrom-Json)
$comic = (Get-Content -LiteralPath $comicPath -Raw | ConvertFrom-Json)

function Get-PostBySlug($manifest, [string]$slug) {
  @($manifest.posts | Where-Object { $_.slug -eq $slug } | Select-Object -First 1)
}

$imgBase = "https://raw.githubusercontent.com/ortall0201/Social/main/buffer-linkedin/visual-hooks"
$v = [DateTimeOffset]::UtcNow.ToUnixTimeSeconds()

$jobs = @(
  @{ slug = "ortal-tactical-series-06"; due = "2026-04-20T08:00:00Z"; manifest = $tactical }
  @{ slug = "ortal-gijane-comic-2026-04-06"; due = "2026-04-20T19:00:00Z"; manifest = $comic }
  @{ slug = "ortal-gijane-comic-2026-04-07"; due = "2026-04-21T19:00:00Z"; manifest = $comic }
  @{ slug = "ortal-tactical-series-07"; due = "2026-04-22T08:00:00Z"; manifest = $tactical }
  @{ slug = "ortal-gijane-comic-2026-04-08"; due = "2026-04-22T19:00:00Z"; manifest = $comic }
  @{ slug = "ortal-tactical-series-08"; due = "2026-04-23T08:00:00Z"; manifest = $tactical }
  @{ slug = "ortal-gijane-comic-2026-04-09"; due = "2026-04-23T19:00:00Z"; manifest = $comic }
  @{ slug = "ortal-tactical-series-09"; due = "2026-04-24T19:00:00Z"; manifest = $tactical }
  @{ slug = "ortal-tactical-series-10"; due = "2026-04-25T08:00:00Z"; manifest = $tactical }
)

$queueScript = Join-Path $repoRoot "scripts\buffer-queue-image-post.ps1"
if (-not (Test-Path -LiteralPath $queueScript)) { throw "Missing $queueScript" }

$results = @()
foreach ($j in $jobs) {
  $post = Get-PostBySlug $j.manifest $j.slug
  if (-not $post) { throw "No post for slug $($j.slug)" }
  $text = [string]$post.text
  if (-not $text.Trim()) { throw "Empty text for $($j.slug)" }
  $url = "$imgBase/$($j.slug)/feed-hero-v1.png?v=$v"
  Write-Host "Scheduling $($j.slug) due $($j.due)"
  $json = & $queueScript -ChannelId $channelId -Text $text -ImageUrl $url -DueAt $j.due
  $parsed = $json | ConvertFrom-Json
  $results += [pscustomobject]@{ slug = $j.slug; dueAt = $j.due; bufferPostId = $parsed.post.id }
  Start-Sleep -Seconds 2
}

$results | Format-Table -AutoSize
Write-Host "Done. Add pin comments in Buffer for tactical posts (LEAD-GEN-PLAYBOOK)."
