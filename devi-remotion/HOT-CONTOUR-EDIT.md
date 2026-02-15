# 🔥 Hot Contour Edit - Devi Reels

A professional smart edit combining two Devi video reels with hot contour color grading and smooth transitions.

## 📹 Source Videos

1. **Car Lean Scene** (`reel-YYYY02Feb 15, 2026004428.mp4`)
   - Devi leaning on car
   - Duration: 8 seconds

2. **Second Clip** (`reel-YYYY02Feb 15, 2026003521.mp4`)
   - Follow-up scene
   - Duration: 8 seconds

**Total Duration:** ~16 seconds (460 frames @ 30fps)

## 🎨 Hot Contour Look

The "hot contour" color grading creates a premium, editorial aesthetic:

- **Brightness:** +10% (highlights the subject)
- **Contrast:** +30% (punchy, dramatic look)
- **Saturation:** +40% (vibrant, eye-catching colors)
- **Hue Shift:** -5° (warmer tones - oranges/reds)
- **Sepia:** 15% (vintage warmth)
- **Vignette:** Radial gradient darkening edges (cinematic focus)
- **Warm Glow:** Subtle orange overlay with screen blend mode

## ✨ Smart Edit Features

### Transitions
- **Smooth 20-frame fade** between clips (0.67 seconds)
- Uses `@remotion/transitions` for professional blending

### Animations
- **Dynamic entrance:** Each scene zooms in slightly (1.05x → 1.0x scale)
- **Spring physics:** Natural, organic motion (damping: 200)
- **Opacity fade-in:** Smooth reveal for each scene

### Text Overlays
- **Scene 1:** "Confidence" (fades in, slides up)
- **Scene 2:** "Unstoppable" (fades in, slides up)
- **Typography:** Bold, modern, with strong shadow
- **Positioning:** Bottom center with 60px padding

## 🚀 Usage

### Preview in Remotion Studio
```bash
cd devi-remotion
npm start
```
Look for compositions:
- `HotContourEdit-WithText` (with on-screen text)
- `HotContourEdit-Clean` (no text)

### Render to MP4

**Quick render (with text):**
```bash
cd devi-remotion
./render-hot-contour.sh
```

**Manual render:**
```bash
# With text
npx remotion render HotContourEdit-WithText ../devi-videos/videos/hot-contour-edit-with-text.mp4

# Clean version (no text)
npx remotion render HotContourEdit-Clean ../devi-videos/videos/hot-contour-edit-clean.mp4
```

## 📂 File Structure

```
devi-remotion/
├── src/
│   ├── HotContourEdit.tsx        # Main composition
│   └── Root.tsx                   # Registered compositions
├── public/
│   └── videos/
│       ├── car-lean.mp4           # Scene 1 source
│       └── second-clip.mp4        # Scene 2 source
└── render-hot-contour.sh          # Quick render script
```

## 🎬 Technical Details

- **Resolution:** 1080x1920 (9:16 vertical / Instagram Reels)
- **Frame Rate:** 30fps
- **Duration:** 460 frames (15.33 seconds)
- **Audio:** Volume at 70% for balanced mix
- **Color Space:** sRGB with CSS filters

## 🔧 Customization

Edit `devi-remotion/src/HotContourEdit.tsx` to customize:

### Adjust Color Grading
```tsx
const hotContourFilter = `
  brightness(1.1)      // Adjust 0.0 - 2.0
  contrast(1.3)        // Adjust 0.0 - 2.0
  saturate(1.4)        // Adjust 0.0 - 3.0
  hue-rotate(-5deg)    // Adjust -180deg to 180deg
  sepia(0.15)          // Adjust 0.0 - 1.0
`;
```

### Change Scene Duration
```tsx
<TransitionSeries.Sequence durationInFrames={240}>
  {/* Change 240 to desired frame count */}
</TransitionSeries.Sequence>
```

### Modify Text
```tsx
<div>Confidence</div>  // Change to your text
```

### Adjust Transition Speed
```tsx
<TransitionSeries.Transition
  presentation={fade()}
  timing={linearTiming({ durationInFrames: 20 })}  // Change 20
/>
```

## 🎯 Perfect For

- Instagram Reels
- TikTok videos
- YouTube Shorts
- Fashion/beauty content
- Lifestyle branding
- Editorial style content

## 📱 Export Settings for Social Media

**Instagram Reels / TikTok:**
- Format: MP4
- Codec: H.264
- Resolution: 1080x1920
- Frame Rate: 30fps
- Bitrate: High quality

The composition is optimized for vertical social media formats!
