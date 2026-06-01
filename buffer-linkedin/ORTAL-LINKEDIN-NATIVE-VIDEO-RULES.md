# Ortal LinkedIn — native video (reel-related, no persona heroes)

Use when Ortal posts **short native video** on LinkedIn instead of `feed-hero-v1.png` tactical/comic imagegen.

## When to use this track

- **Agentic era** and ops-proof posts: show **frame-0 / kill / mutate** from real agent production runs.
- Operator wants **reels-related** media without the GI Jane / blue-comic character packs.
- LEAD-GEN playbook rotation: occasional **30–60s** native video (not every slot).

## What “reel-related” means here

| In scope | Out of scope |
|----------|----------------|
| Clips from **agent production** (gen output, kill review, stitch) | GI Jane / `ortal-gijane-comic-*` imagegen heroes |
| **Mechanism** in caption; video is evidence | Fashion parody as the *story* (no carpet recap copy) |
| Blur or crop UI if needed; no moat dump in caption | Naming subagent registry, full prompt dumps, brain paths in post text |
| “What we killed / mutated / shipped” BTS tone | Pretending the clip is a polished brand ad |

Copy stays **Ortal operator voice** per `docs/specs/ortal-linkedin-codex-execution-spec.md`. Video can show AI social production; post explains **gates, axis, taste loop** — not outfit commentary.

## File layout

```text
buffer-linkedin/reels/agentic-era/<slug>/feed-reel-v1.mp4
buffer-linkedin/reels/agentic-era/<slug>/feed-reel-v1-poster.jpg   # optional Buffer thumbnail
```

**CDN URL after push to `main`:**

```text
https://cdn.jsdelivr.net/gh/ortall0201/Social@main/buffer-linkedin/reels/agentic-era/<slug>/feed-reel-v1.mp4
```

## Technical spec (Buffer + LinkedIn native video)

| Field | Target |
|-------|--------|
| Duration | **6–45s** preferred for feed (30–60s max if one continuous lesson) |
| Aspect | **9:16** (1080×1920) or **4:5** (1080×1350) — pick one per batch and stay consistent |
| Codec | H.264, yuv420p, `+faststart` |
| Audio | Optional; burn key line in caption if silent |
| Normalize | Same discipline as IG Buffer reels: `scripts/buffer-queue-video-post.ps1` path via jsDelivr when source is GitHub |

**LinkedIn:** upload as **native video** (not YouTube link). First 2 lines of post text still carry the hook; video is proof, not the essay.

## Queue manifest fields

Per post (in addition to `text`, `pinComment`):

```json
"mediaFormat": "linkedin_native_video",
"visualMode": "reel_native_bts",
"videoFile": "feed-reel-v1.mp4",
"videoUrl": null,
"videoSourceLocal": "devi-feed/... or buffer-linkedin/reels/...",
"videoRole": "kill_review | mutate_review | ship_proof | operator_screen",
"characterPack": "none",
"imagePrompt": null
```

Set `videoUrl` after copy + push. Do **not** schedule until URL returns 200.

## Production sources (priority order)

1. **Reuse** Fashion is Art clips from `devi-feed/buffer-reels-met-gala-fashion-is-art-2026-05/` (`m-fia-r*.mp4`) when the mechanism matches the slot. **Do not** default to `buffer-reels-fia-parody-ab-2026-05/` unless the operator asks for parody BTS.
2. **Screen record** 10–20s: taste-score doc, bisociation block in editor, handoff markdown scroll (`videoRole: operator_screen`).
3. **Remotion** only if a slot has no reel asset and operator requests a composed hook card.

## Moat-safe video captions

- OK: “This is what frame-0 looked like before we killed the mechanism.”
- OK: “Agent output — weak shared axis.”
- Not OK: Devi / Met / FIA / celebrity names in Ortal post text unless operator explicitly overrides for a cross-brand post.

## Batch reference

**Agentic era (8 slots, video mode):** `buffer-linkedin/queue/2026-06-01-ortal-agentic-era-eight.json`
