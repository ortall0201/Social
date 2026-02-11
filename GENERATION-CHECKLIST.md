# Bad Bunny Reel Generation Checklist

## 📋 Quick Reference

Total time: ~1-1.5 hours (mostly AI processing)
Output: 3 video files (10s each)

---

## ✅ SEGMENT 1: The Entrance (Car Scene)

**Time:** 15-20 minutes

### Steps:
- [ ] Open n8n workflow: "Devi - Bad Bunny Super Bowl Scene"
- [ ] Check "Parse Reel Concept" node has Segment 1 prompts
- [ ] Click "Execute Workflow"
- [ ] Wait for completion (~15 min)
- [ ] Check output: `devi-videos/videos/reel-[timestamp].mp4`
- [ ] Download/save as: `segment-1-entrance.mp4`

### What you'll see:
- Devi standing on luxury car
- Wearing cream Zara blazer
- Holding pink lipstick
- Crowd in background
- Camera slowly zooms in

---

## ✅ SEGMENT 2: The Fall (Crowd Scene)

**Time:** 15-20 minutes

### Steps:
- [ ] Open "Parse Reel Concept" node
- [ ] **Replace prompts** with Segment 2 (see `segment-2-prompts.txt`)
- [ ] Update these fields:
  - `image_prompt`: [copy from segment-2-prompts.txt]
  - `video_prompt`: [copy from segment-2-prompts.txt]
- [ ] Click "Execute Workflow"
- [ ] Wait for completion (~15 min)
- [ ] Download/save as: `segment-2-fall.mp4`

### What you'll see:
- Devi falling gracefully from car
- Slow-motion effect
- Blazer flowing dramatically
- Crowd reaching up
- Dynamic camera movement

---

## ✅ SEGMENT 3: The Lipstick (Close-up)

**Time:** 15-20 minutes

### Steps:
- [ ] Open "Parse Reel Concept" node again
- [ ] **Replace prompts** with Segment 3 (see `segment-3-prompts.txt`)
- [ ] Update these fields:
  - `image_prompt`: [copy from segment-3-prompts.txt]
  - `video_prompt`: [copy from segment-3-prompts.txt]
- [ ] Click "Execute Workflow"
- [ ] Wait for completion (~15 min)
- [ ] Download/save as: `segment-3-lipstick.mp4`

### What you'll see:
- Extreme close-up of lips
- Smooth lipstick application
- SATISFYING motion
- Bokeh background lights
- Beauty commercial style

---

## 🎬 STEP 4: Stitch Videos Together

Once you have all 3 segments:

### Option A: Use Online Tool (Easiest)
1. Go to: https://www.kapwing.com/tools/combine-video
2. Upload all 3 segments in order:
   - segment-1-entrance.mp4
   - segment-2-fall.mp4
   - segment-3-lipstick.mp4
3. Add transitions (optional):
   - Crossfade (0.5s between each)
4. Export as: `bad-bunny-reel-final.mp4`

### Option B: Use CapCut (More Control)
1. Open CapCut
2. Create new project (9:16 vertical)
3. Import all 3 segments
4. Drag to timeline in order
5. Add transitions:
   - Between 1-2: Crossfade
   - Between 2-3: Zoom transition
6. Add music (optional):
   - Search: Bad Bunny Super Bowl
   - Or: Trending sound
7. Export: 1080x1920, 30fps

### Option C: Use Remotion (Programmatic)
1. I can create a Remotion script
2. Automatically stitches + adds transitions
3. Export with one command

---

## 🎨 Enhancement Options (After Stitching)

### Text Overlays:
- Start: "Recreating Bad Bunny's Super Bowl Moment"
- End: "@devinee.me" + "ZARA"

### Music:
- Bad Bunny Super Bowl performance track
- Or trending sound for virality

### Color Grading:
- Warm cinematic LUT
- Boost pink lipstick color
- Enhance stadium lights

### Sound Effects:
- Crowd roar (Segment 1-2)
- Lipstick cap pop (Segment 3)

---

## 📊 Timeline

```
0:00 ──────────── 0:10 ──────────── 0:20 ──────────── 0:30
│               │               │               │
│  ENTRANCE     │    FALL       │   LIPSTICK    │
│  (Power)      │  (Drama)      │  (Satisfy)    │
│               │               │               │
└───────────────┴───────────────┴───────────────┘
```

---

## 🚨 Troubleshooting

### "Video generation failed"
- Check Replicate API credits
- Verify prompts don't have special characters
- Try simpler prompt

### "Image looks wrong"
- Regenerate image (run again)
- Adjust lighting in prompt
- Check Devi reference image is loading

### "Video is choppy"
- This is normal during generation
- Final video will be smooth
- If not, increase duration to 12s

---

## 📱 Ready to Post?

### Instagram Reels:
- Caption: "Recreating Bad Bunny's iconic Super Bowl moment 💄✨ #SuperBowl #Fashion #Zara"
- Hashtags: #BadBunny #SuperBowlFashion #Zara #OOTD #FashionReel
- Tag: @zara (they might repost!)

### TikTok:
- Sound: Use trending Super Bowl audio
- Text: "POV: You're the main character at the Super Bowl"
- Hashtags: #SuperBowl #Fashion #BadBunny

---

## ✅ Final Checklist

- [ ] Segment 1 generated (entrance)
- [ ] Segment 2 generated (fall)
- [ ] Segment 3 generated (lipstick)
- [ ] All 3 stitched together
- [ ] Transitions added
- [ ] Music/sound added (optional)
- [ ] Text overlays added (optional)
- [ ] Exported final video
- [ ] Posted to Instagram/TikTok

**You're done!** 🎉
