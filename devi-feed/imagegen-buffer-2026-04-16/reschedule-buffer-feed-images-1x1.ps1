# Point scheduled Buffer IG+FB feed image posts at 1:1 Remotion overlays (full frame + type).
# Run from repo root: pwsh -File devi-feed/imagegen-buffer-2026-04-16/reschedule-buffer-feed-images-1x1.ps1
# Requires: scripts/buffer-common.ps1, local-secrets/buffer_access_token.txt
# Matches URLs from 9:16 with-caption, feed-4x5, or existing 1x1 (no-op if already 1x1).

[CmdletBinding()]
param()

$ErrorActionPreference = "Stop"
$repoRoot = (Resolve-Path (Join-Path $PSScriptRoot "..\..")).Path
. (Join-Path $repoRoot "scripts\buffer-common.ps1")

$ig = "69d28aa3031bfa423cd1532e"
$fb = "69d28ac6031bfa423cd153e1"
$orgId = "68a179f4005e1814510b14b0"
$base = "https://raw.githubusercontent.com/ortall0201/Social/main/devi-feed/imagegen-buffer-2026-04-16"
$raw1x1 = "$base/with-caption-1x1"

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
        assets { ... on ImageAsset { source } }
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

$mutImg = @'
mutation CreateImagePost($input: CreatePostInput!) {
  createPost(input: $input) {
    __typename
    ... on PostActionSuccess { post { id dueAt } }
    ... on MutationError { message }
    ... on UnexpectedError { message }
  }
}
'@

function Get-CardNumberFromUrl([string]$src) {
  if ($src -match "with-caption/devi-buffer-card-(\d+)-with-caption\.png") { return [int]$matches[1] }
  if ($src -match "feed-4x5/devi-buffer-card-(\d+)-with-caption-feed-4x5\.png") { return [int]$matches[1] }
  return $null
}

function Invoke-ScheduledImages($channelId, $serviceName) {
  $v = @{
    input = @{
      organizationId = $orgId
      filter = @{ channelIds = @($channelId); status = @("scheduled") }
      sort       = @(@{ field = "dueAt"; direction = "asc" })
    }
    first = 80
  }
  $edges = (Invoke-BufferGraphQl -Query $qList -Variables $v).posts.edges
  foreach ($e in $edges) {
    $n = $e.node
    $meta = $n.metadata.type
    if ($meta -ne "post") { continue }
    $src = ($n.assets | ForEach-Object { $_.source }) | Select-Object -First 1
    if (-not $src) { continue }
    if ($src -match "with-caption-1x1/devi-buffer-card-\d+-with-caption-1x1\.png") {
      continue
    }
    $num = Get-CardNumberFromUrl $src
    if (-not $num) { continue }
    $nn = "{0:D2}" -f $num
    $newUrl = "$raw1x1/devi-buffer-card-$nn-with-caption-1x1.png"
    Write-Host "[$serviceName] $($n.id) -> 1:1 card $nn"
    $del = (Invoke-BufferGraphQl -Query $mutDel -Variables @{ input = @{ id = $n.id } }).deletePost
    if ($del.__typename -ne "DeletePostSuccess") { throw "Delete failed: $($del | ConvertTo-Json)" }
    $norm = ([DateTimeOffset]::Parse($n.dueAt)).ToUniversalTime().ToString("yyyy-MM-ddTHH:mm:ss.fffZ")
    $input = @{
      channelId      = $channelId
      text           = $n.text
      assets         = @{ images = @(@{ url = $newUrl }) }
      schedulingType = "automatic"
      mode           = "customScheduled"
      dueAt          = $norm
    }
    if ($serviceName -eq "instagram") {
      $input.metadata = @{ instagram = @{ type = "post"; shouldShareToFeed = $true } }
    }
    else {
      $input.metadata = @{ facebook = @{ type = "post" } }
    }
    $cr = (Invoke-BufferGraphQl -Query $mutImg -Variables @{ input = $input }).createPost
    if ($cr.__typename -ne "PostActionSuccess") { throw "createPost failed: $($cr | ConvertTo-Json)" }
    Write-Host "  new id $($cr.post.id)"
    Start-Sleep -Milliseconds 600
  }
}

Invoke-ScheduledImages $ig "instagram"
Invoke-ScheduledImages $fb "facebook"
Write-Host "Done."
