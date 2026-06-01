[CmdletBinding()]
param(
  [Parameter(Mandatory = $true)]
  [string]$ChannelId,

  [Parameter(Mandatory = $true)]
  [string]$Text,

  [Parameter(Mandatory = $true)]
  [string]$VideoUrl,

  [Parameter()]
  [string]$DueAt,

  [Parameter()]
  [ValidateSet("instagram", "facebook")]
  [string]$Service,

  [Parameter()]
  [ValidateSet("post", "story", "reel")]
  [string]$PostType = "reel",

  [Parameter()]
  [bool]$ShouldShareToFeed = $true,

  [Parameter()]
  [string]$ThumbnailUrl = ""
,
  [Parameter()]
  [bool]$UseStableCdnForGithub = $true,

  [Parameter()]
  [string]$CacheBustVersion = "",

  [Parameter()]
  [switch]$SkipCaptionGate
)

$ErrorActionPreference = "Stop"
. (Join-Path $PSScriptRoot "buffer-common.ps1")
. (Join-Path $PSScriptRoot "Test-DeviFeedCaption.ps1")

if (-not $Text.Trim()) {
  throw "Text cannot be empty."
}

if (-not $SkipCaptionGate) {
  Test-DeviFeedCaption -Text $Text | Out-Null
}

if (-not [Uri]::IsWellFormedUriString($VideoUrl, [UriKind]::Absolute)) {
  throw "VideoUrl must be an absolute public URL."
}

function Resolve-StableVideoUrl {
  param(
    [Parameter(Mandatory = $true)]
    [string]$InputUrl,

    [Parameter(Mandatory = $true)]
    [bool]$UseStableCdnForGithub,

    [Parameter()]
    [string]$CacheBustVersion
  )

  $resolved = $InputUrl.Trim()

  if ($UseStableCdnForGithub -and $resolved -match "^https://raw\.githubusercontent\.com/([^/]+)/([^/]+)/([^/]+)/(.+)$") {
    $owner = $Matches[1]
    $repo = $Matches[2]
    $branch = $Matches[3]
    $path = $Matches[4]
    $resolved = "https://cdn.jsdelivr.net/gh/{0}/{1}@{2}/{3}" -f $owner, $repo, $branch, $path
  }

  $effectiveCacheBust = $CacheBustVersion
  if ([string]::IsNullOrWhiteSpace($effectiveCacheBust) -and $resolved -match "^https://cdn\.jsdelivr\.net/gh/") {
    $effectiveCacheBust = [DateTimeOffset]::UtcNow.ToUnixTimeMilliseconds().ToString()
  }

  if (-not [string]::IsNullOrWhiteSpace($effectiveCacheBust)) {
    if ($resolved.Contains("?")) {
      if ($resolved -notmatch "([?&])v=") {
        $resolved = "{0}&v={1}" -f $resolved, $effectiveCacheBust
      }
    }
    else {
      $resolved = "{0}?v={1}" -f $resolved, $effectiveCacheBust
    }
  }

  return $resolved
}

$resolvedVideoUrl = Resolve-StableVideoUrl `
  -InputUrl $VideoUrl `
  -UseStableCdnForGithub $UseStableCdnForGithub `
  -CacheBustVersion $CacheBustVersion

if (-not [Uri]::IsWellFormedUriString($resolvedVideoUrl, [UriKind]::Absolute)) {
  throw "Resolved video URL is not valid: $resolvedVideoUrl"
}

$normalizedDueAt = $null
if ($DueAt) {
  try {
    $normalizedDueAt = ([DateTimeOffset]::Parse($DueAt)).ToUniversalTime().ToString("yyyy-MM-ddTHH:mm:ss.fffZ")
  }
  catch {
    throw "DueAt must be a valid ISO UTC timestamp, for example 2026-04-06T18:30:00Z."
  }
}

function Invoke-CreateVideoPost {
  param(
    [Parameter(Mandatory = $true)]
    [string]$Mode
  )

  $query = @'
mutation CreateVideoPost($input: CreatePostInput!) {
  createPost(input: $input) {
    __typename
    ... on PostActionSuccess {
      post {
        id
        text
        dueAt
        assets {
          id
          mimeType
        }
      }
    }
    ... on MutationError {
      message
    }
    ... on UnexpectedError {
      message
    }
  }
}
'@

  $videoAsset = @{ url = $resolvedVideoUrl }
  if ($ThumbnailUrl.Trim()) {
    $videoAsset.thumbnailUrl = $ThumbnailUrl.Trim()
  }

  $input = @{
    channelId = $ChannelId
    text = $Text
    assets = @(
      @{ video = $videoAsset }
    )
    schedulingType = "automatic"
    mode = $Mode
  }

  if ($Service -eq "instagram") {
    $input.metadata = @{
      instagram = @{
        type = $PostType
        shouldShareToFeed = $ShouldShareToFeed
      }
    }
  }
  elseif ($Service -eq "facebook") {
    $input.metadata = @{
      facebook = @{
        type = $PostType
      }
    }
  }

  if ($normalizedDueAt) {
    $input.dueAt = $normalizedDueAt
  }

  $data = Invoke-BufferGraphQl -Query $query -Variables @{ input = $input }
  return $data.createPost
}

$selectedMode = if ($normalizedDueAt) { "customScheduled" } else { "addToQueue" }
$result = Invoke-CreateVideoPost -Mode $selectedMode

if (-not $result) {
  throw "Buffer did not return a createPost result."
}

if ($result.__typename -eq "MutationError") {
  throw ("Buffer createPost returned MutationError: {0}" -f $result.message)
}

if ($result.__typename -eq "UnexpectedError") {
  if ($result.message) {
    throw ("Buffer createPost returned UnexpectedError: {0}" -f $result.message)
  }

  throw "Buffer createPost returned UnexpectedError."
}

if ($result.__typename -eq "LimitReachedError") {
  $msg = if ($result.message) { $result.message } else { "Queue or plan limit reached (Buffer Free: 10 scheduled posts per channel)." }
  throw ("Buffer createPost LimitReachedError: {0}" -f $msg)
}

if ($result.__typename -eq "InvalidInputError") {
  $msg = if ($result.message) { $result.message } else { "Buffer rejected the post input." }
  throw ("Buffer createPost InvalidInputError: {0}" -f $msg)
}

if ($result.__typename -ne "PostActionSuccess") {
  throw ("Buffer createPost returned unexpected type '{0}'." -f $result.__typename)
}

[pscustomobject]@{
  channelId = $ChannelId
  mode = $selectedMode
  dueAt = $normalizedDueAt
  originalVideoUrl = $VideoUrl
  videoUrl = $resolvedVideoUrl
  service = $Service
  postType = if ($Service) { $PostType } else { $null }
  post = [pscustomobject]@{
    id = $result.post.id
    text = $result.post.text
    dueAt = $result.post.dueAt
    assets = $result.post.assets
  }
} | ConvertTo-Json -Depth 10
