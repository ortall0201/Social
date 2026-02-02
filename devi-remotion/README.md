# Devi Remotion - Deterministic Video Rendering

Remotion-based video rendering for Devi fashion reels. Replaces expensive Replicate/Kling pipeline with free, deterministic GitHub Actions rendering.

## Quick Start

### Install Dependencies
```bash
npm install
```

### Render Example
```bash
npm run render:reel renders/example/manifest.json
```

**Output**: `renders/example/reel-example-20260123.mp4`

### Render All Reels in Folder
```bash
npm run render:folder renders
```

## Project Structure

```
devi-remotion/
├── src/
│   ├── DeviReel.tsx       # Main video composition
│   ├── Root.tsx            # Composition registry
│   ├── types.ts            # TypeScript interfaces
│   └── index.ts            # Entry point
├── scripts/
│   ├── render-reel.mjs     # Single reel renderer
│   └── render-folder.mjs   # Batch renderer
├── renders/
│   └── {reel-id}/
│       ├── manifest.json   # Scene definitions
│       └── {reel-id}.mp4   # Rendered output
└── package.json
```

## Manifest Format

Create `renders/{reel-id}/manifest.json`:

```json
{
  "reel_id": "reel-20260123-example",
  "fps": 30,
  "width": 1080,
  "height": 1920,
  "scenes": [
    {
      "image": "https://github.com/USER/REPO/raw/master/path/to/image.webp",
      "durationFrames": 45,
      "text": "YOUR TEXT HERE",
      "textPosition": "bottom"
    }
  ],
  "style": {
    "font": "Inter, sans-serif",
    "textPosition": "bottom",
    "safeMargin": 120,
    "textColor": "#ffffff",
    "textShadow": true
  }
}
```

## Features

- **Ken Burns Effects**: Subtle zoom and pan on images
- **Text Overlays**: Animated text with spring physics
- **Cross-Dissolve**: Smooth transitions between scenes
- **Configurable**: Font, colors, timing, positioning
- **Deterministic**: Same input = exact same output

## Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Open Remotion Studio (preview) |
| `npm run render:reel <path>` | Render single manifest |
| `npm run render:folder <dir>` | Batch render all manifests in folder |

## Timing Guide

| Duration (frames) | Duration (seconds) | Use Case |
|-------------------|-------------------|----------|
| 30 | 1.0s | Quick flashes, transitions |
| 45 | 1.5s | Standard scene (recommended) |
| 60 | 2.0s | Longer scenes, important text |
| 90 | 3.0s | Call-to-action, final frame |

**Formula**: `frames / fps = seconds` (e.g., 45 frames ÷ 30 fps = 1.5 seconds)

## Text Positioning

- **"bottom"**: Safe for most platforms (default)
- **"center"**: Use for final CTA or important messages
- **"top"**: Rarely used, ensure no UI overlap

**Safe Margin**: 120px from edge (avoids Instagram/TikTok UI elements)

## Development

### Preview in Studio
```bash
npm run dev
```

Opens browser at `http://localhost:3000` with live preview.

### Test Render
```bash
npm run render:reel renders/example/manifest.json
```

### Verify Output
- Check dimensions: 1080x1920 (9:16 vertical)
- Check duration: Matches total scene frames
- Check text: Readable on mobile
- Check transitions: Smooth cross-fades

## Integration

### n8n Workflow
1. Generate manifest.json
2. Commit to `devi-remotion/renders/{reel-id}/manifest.json`
3. GitHub Actions auto-renders
4. Video saved to `devi-videos/videos/{reel-id}.mp4`

### GitHub Actions
Workflow: `.github/workflows/render-remotion.yml`
- Triggers: On manifest.json push
- Renders: All changed reels
- Outputs: Commits MP4s back to repo

## Troubleshooting

### "Manifest file not found"
- Ensure path is relative to project root
- Example: `renders/reel-123/manifest.json` (not `./renders/...`)

### "Image failed to load"
- Use raw GitHub URLs: `https://github.com/USER/REPO/raw/master/...`
- OR use public CDN (Cloudflare R2, S3)

### "Text cut off on mobile"
- Increase `safeMargin` to 150px
- Test on actual device (iPhone, Android)

### "Render takes too long"
- Reduce scene count
- Use smaller images (1080px width max)
- Simplify animations

## Cost

**Local**: Free (uses your CPU)
**GitHub Actions**: Free (2000 min/month public repos)

**Typical render**: 3-5 minutes per 10s video

**Monthly limit**: ~400-600 reels (well above typical usage)

## Next Steps

1. Test locally: `npm install && npm run render:reel renders/example/manifest.json`
2. Commit to GitHub
3. Configure GitHub Actions (see main docs)
4. Integrate with n8n workflow

---

**For full documentation**: See `/REMOTION-MIGRATION-COMPLETE.md`
