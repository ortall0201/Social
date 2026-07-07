# Redhead necklace-heist stop-motion Buffer pack

**Campaign:** `2026-07-07-fia-stop-motion-necklace-thief`  
**Mechanism:** Frozen Devi floor pose + photoreal redhead co-model stop-motion duo poses → steals gold coin pendant  
**Signed:** Iris Productions (`brain/iris-productions-signature-canon.md`)

## Schedule

```powershell
# 1. Sign reel + push buffer-delivery/fia-redhead-necklace-heist-reel.mp4 to GitHub first
powershell -ExecutionPolicy Bypass -File contenty/product-campaigns/2026-07-07-fia-stop-motion-necklace-thief/sign-iris-productions-reel.ps1
git add -f buffer-delivery/fia-redhead-necklace-heist-reel.mp4 devi-feed/buffer-redhead-necklace-heist-2026-07/
git push origin main

# 2. Queue Buffer
powershell -ExecutionPolicy Bypass -File devi-feed/buffer-redhead-necklace-heist-2026-07/schedule-redhead-necklace-heist-buffer.ps1
```

**Slot:** 2026-07-15T14:00:00Z (after fabric-swap Jul 13)
