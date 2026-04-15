# Writes feed45-buffer-queue.json (no API) for manual import reference or a later schedule run.
# Run from repo root:
#   powershell -File devi-feed/imagegen-buffer-2026-04-16/emit-feed45-buffer-payload.ps1

$ErrorActionPreference = "Stop"
$here = $PSScriptRoot
$manifestPath = Join-Path $here "with-caption-feed45\manifest.json"
$manifest = (Get-Content -LiteralPath $manifestPath -Raw -Encoding utf8 | ConvertFrom-Json)
$base = "https://raw.githubusercontent.com/ortall0201/Social/main/devi-feed/imagegen-buffer-2026-04-16/with-caption-feed45"
$ms = [DateTimeOffset]::UtcNow.ToUnixTimeMilliseconds()

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

$tomorrow = [DateTimeOffset]::UtcNow.Date.AddDays(1)
$cursor = [DateTimeOffset]::new($tomorrow.Year, $tomorrow.Month, $tomorrow.Day, 17, 0, 0, [TimeSpan]::Zero)

$items = @()
$i = 0
foreach ($slide in $manifest.slides) {
  $num = [int]($slide.file -replace '\D', '')
  $nn = "{0:D2}" -f $num
  $v = $ms + $num
  $url = "$base/devi-buffer-card-$nn-with-caption-feed45.png?v=$v"
  $sub = $slide.subline.Replace([char]0x2014, "-")
  $tags = $hashtagsPerCard[$i]
  $text = "{0}`n{1}`n`n{2}" -f $slide.headline, $sub, $tags
  $due = $cursor.ToString("yyyy-MM-ddTHH:mm:ss.fffZ")
  $items += [ordered]@{
    card      = $nn
    dueAtUtc  = $due
    imageUrl  = $url
    caption   = $text
  }
  $cursor = $cursor.AddDays(1)
  $i++
}

$out = Join-Path $here "feed45-buffer-queue.json"
($items | ConvertTo-Json -Depth 5) | Set-Content -LiteralPath $out -Encoding utf8
Write-Host "Wrote $out ($($items.Count) posts). Use caption + imageUrl + dueAtUtc in Buffer or run schedule-feed45-buffer-batch.ps1 when API limit clears."
