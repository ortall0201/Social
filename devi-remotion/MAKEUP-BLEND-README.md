# Makeup Blend - 3 Reels Combined

## Overview

A satisfying, seamless blend of 3 makeup application reels with smooth crossfade transitions and subtle zoom effects.

## Videos Used

1. **reel-YYYY01Jan 28, 2026215137** → `makeup-1.mp4`
2. **reel-YYYY01Jan 28, 2026213614** → `makeup-2.mp4`
3. **reel-YYYY01Jan 28, 2026202352** → `makeup-3.mp4`

## Technical Details

- **Total Duration:** 29 seconds (870 frames at 30fps)
- **Resolution:** 1080x1920 (9:16 vertical)
- **Transitions:** 1-second crossfade with scale effect
- **Quality:** CRF 18 (visually lossless)

## How It Works

### Transition Design

Each video plays for 10 seconds, with 1-second overlapping transitions:

```
Video 1: 0s ────────────────────────────────────> 10s
                              Video 2: 9s ────────────────────────────────────> 19s
                                                        Video 3: 18s ────────────────────────────────────> 28s
         └─ Crossfade ─┘              └─ Crossfade ─┘
```

### Effects Applied

1. **Crossfade Opacity**
   - Smooth fade-in/fade-out during 1-second overlap
   - Easing: `inOut(ease)` for natural feel

2. **Subtle Zoom**
   - Outgoing video: scales from 1.0 → 1.05 (slight zoom out)
   - Incoming video: scales from 1.05 → 1.0 (slight zoom in)
   - Creates smooth transition feel

3. **Optional Text Overlay**
   - "Satisfying Makeup Application"
   - Fades in/out at beginning/end
   - Positioned at bottom center

## Usage

### Preview in Remotion Studio

```bash
cd devi-remotion
pnpm dev
```

Then select either:
- `MakeupBlend-Clean` (no text)
- `MakeupBlend-WithText` (with overlay)

### Render Final Video

```bash
cd devi-remotion
pnpm render:makeup-blend
```

Output: `devi-videos/videos/makeup-blend-[timestamp].mp4`

### Customization

Edit `src/MakeupBlend.tsx` to adjust:

- **Transition duration:** Change `transitionFrames` (line 30)
- **Zoom intensity:** Modify scale values (lines 95, 105, 121, 131, 148, 158)
- **Easing curves:** Update `Easing` functions (lines 67, 93, etc.)
- **Text content:** Change overlay text (line 189)

## Making It Loop Seamlessly

To make this video loop perfectly:

### Option 1: Add Loop Transition
Add a 4th sequence that crossfades back to video 1 at the end.

### Option 2: Duplicate Last Frame
Export the last frame and create a fade-to-black → fade-from-black transition using the first frame.

### Option 3: Platform Looping
Most social media platforms (Instagram, TikTok) will auto-loop the video. The current transition is smooth enough that the loop won't feel jarring.

## Why This Works for Social Media

1. **Satisfying Visuals**
   - Smooth transitions keep viewers engaged
   - No jarring cuts
   - Professional feel

2. **Watch Time Optimization**
   - 29 seconds is perfect for retention
   - Long enough to be valuable
   - Short enough to loop

3. **Hypnotic Quality**
   - Crossfades create mesmerizing effect
   - Subtle zoom adds movement
   - People will watch multiple times

## Next Steps

### For Instagram Reels:
1. Render the clean version (no text)
2. Add captions/text in Instagram's editor
3. Use trending audio for reach

### For TikTok:
1. Same render as Instagram
2. Add trending sound
3. Caption: "POV: Satisfying makeup application 💄✨"

### For Looping Content:
1. Export as GIF (lower quality but loops perfectly)
2. Or add a fade transition at the end that loops back to start

## Files Created

- `src/MakeupBlend.tsx` - Main composition
- `scripts/render-makeup-blend.mjs` - Render script
- `public/videos/makeup-1.mp4` - First reel
- `public/videos/makeup-2.mp4` - Second reel
- `public/videos/makeup-3.mp4` - Third reel

## Performance Notes

- Rendering takes ~2-5 minutes depending on hardware
- CRF 18 creates large file (~50-100MB)
- Can reduce to CRF 23 for smaller size with minimal quality loss
- Hardware acceleration (GPU) speeds up rendering if available

---

**Created:** 2026-01-28
**Purpose:** Satisfying, loopable content for social media engagement
