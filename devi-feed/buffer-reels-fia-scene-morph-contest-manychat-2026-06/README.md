# Manychat #MyRealJob — Times Square contest reel

**Status:** **v5c SUBMITTED** (Buffer IG scheduled 2026-06-12)  
**Brief:** `contenty/briefs/manychat-deploy-devi-v5-storyboard-2026-06.md`  
**Session:** `brain/memory/session-summaries/2026-06-12-manychat-myrealjob-contest-v5c.md`

## Final asset (approved)

| File | Role |
|------|------|
| **`m-manychat-myrealjob-v5c.mp4`** | Contest entry (~18s) |
| `buffer-delivery/m-manychat-myrealjob-v5c.mp4` | Public CDN copy for Buffer |

**Beat map:** sm-06 fall/yacht/shore + click inserts + IG notification crawl + Iris café BTS + smoke + 💅 end slide.

## Submit

1. **Buffer:** `schedule-manychat-contest-buffer-reel.ps1` (post ID `6a2c6c59768f4d60d56793b8`)
2. **Caption (approved):** one line + `#MyRealJob` — see storyboard brief
3. **After live:** [manychat.com/timessquare](https://manychat.com/timessquare) with IG reel URL

## Reassemble v5c

```powershell
.\tools\assemble-manychat-contest-reel-v5c.ps1
# -RegenClicks to regen click inserts only
```

## Legacy paths (do not use for contest)

| Version | Status |
|---------|--------|
| v1 | KILLED — typography-only |
| v4 / v4b | Superseded / killed |
| v5 / v5b | Wrong middle or partial fix — use **v5c** |

Old v1 build: `tools/generate-manychat-contest-reel.ps1` + `tools/assemble-manychat-contest-reel.ps1`
