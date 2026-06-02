# Ortal LinkedIn — Bisociation series operations canon

**Applies to:** `ortal-bisociation-eleven` and future Ortal native-video series that teach Iris/Devi creative collisions.  
**Not for:** Devi IG Buffer (caption gate, three-word rule) or tactical/comic image posts.

---

## Series registry

| Series | Posts | Manifest(s) | Status |
|--------|-------|---------------|--------|
| Agentic Era | 8 | `buffer-linkedin/queue/2026-06-01-ortal-agentic-era-eight.json` | LIVE Jun 1–8 2026 |
| Bisociation eleven | 11 | `2026-06-02-ortal-bisociation-collisions-four.json` + `2026-06-19-ortal-bisociation-scene-morph-v2-seven.json` | LIVE Jun 9–19 2026 |

**Rule:** Before scheduling a new Ortal video series, grep `buffer-linkedin/queue/*.json` for `reelId` / `fiaReelId` — do not reuse reels unless operator overrides in writing.

---

## Voice contract (LinkedIn native video)

1. **Conversational operator story** — real doubt, Iris dialogue, batch that spiked then dipped.
2. **No em dashes** — periods and short paragraphs for mobile.
3. **Every post includes:**
   - Arthur Koestler + **bisociation** + *The Act of Creation* (1964), ≥2 plain lines
   - **Devi** = @devinee.me AI influencer; **Iris** = super-agent Ortal built (briefs, gen, taste, memory)
   - What the clip shows (collision visible in frame, not caption rescue)
   - `Post X of N` when part of a series
   - CTA: comment **FIELD** + domain + one line on what worked
4. **Reject:** OPS-framework spam, consultant bullet stacks, generic “AI creativity” hype, long `Inspired by…` paste from IG manifests.

**Contrast:** Agentic Era CTA = **diss/roast the takeout**. Bisociation CTA = **FIELD** (crowdsource collision domains).

---

## Reel selection (operator-first)

Prefer reels where bisociation is **seen and felt** in frame zero:

- Art-history concept transfer (FIA 46): sculpture, myth, floral anatomy, surreal garden, etc.
- Scene-morph v2: dance-morph crossfade OR jump-land snap (`brain/devi-scene-morph-mechanisms.md`)

Operator may lock reels by **caption line** (e.g. Marble / Born from shell / She blooms loud / Welcome to the garden) — manifest `operatorLockedReels` + `artRef` fields.

---

## Buffer scheduling runbook

```powershell
# 1) Stage MP4s (see buffer-linkedin/reels/bisociation-collisions/README.md)
# 2) Force-add if needed (global *.mp4 gitignore)
git add -f buffer-linkedin/reels/bisociation-collisions/**/feed-reel-v1.mp4
git commit -m "..."
git push origin main

# 3) Schedule (explicit dueAtUtc in manifest when set)
. .\local-secrets\buffer_ids.ps1
.\buffer-linkedin\queue\Schedule-OrtalBisociationCollisionsBuffer.ps1 -ManifestPath buffer-linkedin\queue\<manifest>.json
```

**Chain dates:** last post of prior series + 1 day, **19:00 UTC**, unless manifest has `useExplicitDueAt: true`.

**Media URL base:** `https://raw.githubusercontent.com/ortall0201/Social/main/buffer-linkedin/reels/bisociation-collisions`

**After schedule:** add `pinComment` in Buffer UI; save export under `buffer-linkedin/exports/`.

---

## Files to read (Ortal lane startup)

1. `buffer-linkedin/queue/README.md`
2. `brain/ortal-linkedin-bisociation-operations-canon.md` (this file)
3. `brain/ortal-linkedin-bisociation-collisions-four.md`
4. Active manifest for the series being edited
5. `docs/specs/ortal-linkedin-codex-execution-spec.md` if drafting new copy

---

## North star (persisted)

Fine-tune **Iris** as a creative content creator whose **instincts hit** (collision, taste, memory of kills) — not more output volume.
