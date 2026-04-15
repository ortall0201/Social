# Prints HTTPS image URLs with unique cache-busters so Buffer fetches fresh bytes (GitHub raw is often cached by URL).
# Use when scheduling manually in Buffer after deleting/recreating posts or pushing new PNGs.
#
# Examples (repo root):
#   powershell -File devi-feed/imagegen-buffer-2026-04-16/emit-image-urls-for-buffer.ps1 -Set 1x1
#   powershell -File devi-feed/imagegen-buffer-2026-04-16/emit-image-urls-for-buffer.ps1 -Set feed45
#   powershell -File devi-feed/imagegen-buffer-2026-04-16/emit-image-urls-for-buffer.ps1 -Set 916

[CmdletBinding()]
param(
  [Parameter(Mandatory = $true)]
  [ValidateSet("1x1", "feed45", "916")]
  [string]$Set
)

$ErrorActionPreference = "Stop"
$base = "https://raw.githubusercontent.com/ortall0201/Social/main/devi-feed/imagegen-buffer-2026-04-16"
$ms = [DateTimeOffset]::UtcNow.ToUnixTimeMilliseconds()

1..9 | ForEach-Object {
  $nn = "{0:D2}" -f $_
  $v = $ms + $_
  switch ($Set) {
    "1x1" { Write-Output "$base/with-caption-1x1/devi-buffer-card-$nn-with-caption-1x1.png?v=$v" }
    "feed45" { Write-Output "$base/with-caption-feed45/devi-buffer-card-$nn-with-caption-feed45.png?v=$v" }
    "916" { Write-Output "$base/with-caption/devi-buffer-card-$nn-with-caption.png?v=$v" }
  }
}
