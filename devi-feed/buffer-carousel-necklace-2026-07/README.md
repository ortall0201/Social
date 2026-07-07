# Necklace carousel A/B — Buffer (Devi IG)

**Experiment:** `exp-necklace-carousel-ab-2026-07`  
**Source pack:** `contenty/product-campaigns/2026-07-07-necklace-pilot/` (gitignored gen workspace)

| Arm | Folder | Render |
|-----|--------|--------|
| **A** | `arm-a-hq/` | Seedream 4.5 4K → IG export 1080×1350 |
| **B** | `arm-b-draft/` | nano-banana 1K draft |

**Public URL (after `git push`):**  
`https://raw.githubusercontent.com/ortall0201/Social/main/devi-feed/buffer-carousel-necklace-2026-07/<arm>/slide-NN.jpg`

## Schedule

```powershell
# Dry run
powershell -ExecutionPolicy Bypass -File devi-feed/buffer-carousel-necklace-2026-07/schedule-necklace-carousel-buffer.ps1 -DryRun

# Live (requires local-secrets/buffer_ids.ps1 + buffer_access_token.txt)
powershell -ExecutionPolicy Bypass -File devi-feed/buffer-carousel-necklace-2026-07/schedule-necklace-carousel-buffer.ps1
```

**Slots:** Arm A **2026-07-09 14:00 UTC** · Arm B **2026-07-11 14:00 UTC**
