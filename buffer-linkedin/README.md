# LinkedIn media for Buffer (raw GitHub)

These PNGs are **committed** so Buffer can load them via **`raw.githubusercontent.com`** (HTTPS) without a separate CDN.

## URL pattern

After you **push** to GitHub, each image is:

```text
https://raw.githubusercontent.com/<user>/<repo>/<branch>/buffer-linkedin/visual-hooks/<slug>/feed-hero-v1.png
```

This repo’s remote is typically **`ortall0201/Social`**. If your default branch is **`main`**, the **media base** for scripts is:

```text
https://raw.githubusercontent.com/ortall0201/Social/main/buffer-linkedin/visual-hooks
```

Use that value for **`BUFFER_PUBLIC_MEDIA_BASE_URL`** (no trailing slash) when running:

`scripts/buffer/buffer-queue-linkedin-roadmap-2026-04-22-batch.ps1`

## Regenerate / add slugs

1. Export or copy new `feed-hero-v1.png` into `buffer-linkedin/visual-hooks/<slug>/` (same `<slug>` strings as the roadmap batch script).
2. Commit + push.
3. Re-queue or edit Buffer posts so `ImageUrl` matches the new raw URL.

## Default for scripts

`buffer-linkedin/MEDIA_BASE_URL.txt` holds one line: the **raw GitHub** base URL (no trailing slash).  
`buffer-queue-linkedin-roadmap-2026-04-22-batch.ps1` reads it automatically if `BUFFER_PUBLIC_MEDIA_BASE_URL` is not set.

**Important:** URLs only work **after** you `git push` so GitHub serves the files. If your default branch is not `main`, edit that file.

## Note

`artifacts/` stays **gitignored**; **this folder** is the public, versioned mirror for Buffer image URLs only.
