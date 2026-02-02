# 🎨 DEVI Image Generation Prompts

## Profile Picture (Main Portrait)

### Primary Prompt (DALL-E/Midjourney/Stable Diffusion)

```
Professional portrait photograph of a fashion influencer named Devi, early 20s Asian-European mixed ethnicity woman, shoulders-up composition, wearing light pastel knit sweater, soft glossy straight hair with gentle waves, warm gentle smile, natural K-beauty inspired makeup with soft glam aesthetic, shot with 50mm portrait lens at f/1.8, diffused soft lighting, champagne beige background with subtle texture, slight warm color grading, natural skin texture visible, editorial fashion photography style, Seoul-meets-Paris aesthetic, non-sexualized elegant pose, professional Instagram profile picture quality, hyper-realistic, 8k

Camera: Canon EOS R5, 50mm f/1.8, ISO 100
Lighting: Softbox diffused natural light
Style: Editorial fashion portrait, K-beauty meets European minimalism
Mood: Warm, approachable, sophisticated
```

### Negative Prompt
```
revealing clothing, cleavage, sexualized pose, overly smooth skin, plastic look, harsh lighting, dark colors, heavy makeup, sultry expression, provocative, artificial background, oversaturation, low quality, blurry, distorted face
```

---

## Content Images (Variations)

### 1. Café Portrait
```
Fashion influencer Devi sitting at minimalist café, light wood table, latte cup, wearing cream cashmere turtleneck, natural window light from left, blurred café background, candid relaxed expression, 50mm lens f/2.0, pastel color palette, Seoul-style café interior, elegant casual pose, realistic photography, fashion editorial style, warm inviting atmosphere
```

### 2. Rooftop Golden Hour
```
Devi on modern rooftop at golden hour, wearing oversized beige blazer over white blouse, city skyline softly blurred background, warm sunset lighting, gentle breeze in hair, looking at camera with soft smile, 85mm lens f/1.4, pastel sky tones, editorial fashion shoot, sophisticated urban style, non-sexualized elegant standing pose
```

### 3. Boutique Interior
```
Devi in minimalist fashion boutique, white and wood interior, holding pastel clothing item, soft overhead lighting, clean modern aesthetic, wearing light pink blouse, professional fashion content creator vibe, 35mm lens f/2.2, shallow depth of field, editorial style, approachable friendly expression
```

### 4. Street Style (European)
```
Devi walking on quiet European cobblestone street, wearing long neutral trench coat, carrying minimal leather bag, soft natural overcast lighting, blurred old building background, candid fashion moment, 50mm lens f/2.0, muted pastel color grading, editorial street style photography, elegant movement, Seoul-meets-Paris aesthetic
```

### 5. Studio Portrait (Product Focus)
```
Clean studio portrait of Devi against seamless champagne backdrop, wearing soft lavender knit sweater, holding fashion item, professional studio lighting with softbox, medium close-up composition, 85mm lens f/2.8, hyper-realistic skin texture, warm color palette, fashion e-commerce editorial style, friendly approachable expression
```

---

## Consistency Guidelines

### Face & Features (CRITICAL - Keep Consistent)
- **Ethnicity**: Asian-European mixed features
- **Face Shape**: Oval with defined cheekbones
- **Eyes**: Almond-shaped, warm brown
- **Eyebrows**: Natural, softly defined
- **Nose**: Delicate, slightly upturned
- **Lips**: Natural rose tone, medium fullness
- **Skin**: Light-medium tone, natural texture
- **Expression**: Gentle smile or warm neutral

### Hair (Keep Consistent)
- **Length**: Long, past shoulders
- **Texture**: Straight to soft waves
- **Color**: Dark brown with subtle warm highlights
- **Style**: Loose, natural, glossy finish
- **Volume**: Medium, healthy appearance

### Makeup (K-Beauty Inspired)
- **Base**: Natural dewy finish, visible skin texture
- **Eyes**: Soft brown/taupe shadow, subtle liner
- **Lashes**: Natural-looking, not overly dramatic
- **Brows**: Soft, feathered, natural
- **Cheeks**: Soft coral/peach blush
- **Lips**: MLBB (my lips but better) nude-pink

### Clothing Style
- **Colors**: Pastel, neutral, soft tones
- **Fabrics**: Cashmere, silk, linen, soft knits
- **Cuts**: Oversized blazers, turtlenecks, minimal blouses
- **Style**: Korean minimalism meets French elegance
- **Coverage**: Always modest, elegant, professional

### Poses (Non-Sexualized)
- Sitting: Relaxed, leaning slightly forward
- Standing: One foot slightly forward, hands natural
- Upper body: Shoulders relaxed, chest not emphasized
- Hands: Holding coffee, phone, product, or resting naturally
- Head: Slight tilt, engaging with camera warmly

---

## Platform-Specific Specs

### Instagram Profile (400x400px)
```
Square crop, shoulders-up, centered, champagne background, soft lighting, 50mm lens, gentle smile, minimal jewelry, light pastel sweater, natural hair down, warm color grading
```

### Blog Header (1200x630px)
```
Horizontal composition, Devi on left third, negative space on right for text overlay, soft background blur, warm editorial lighting, Seoul-meets-Paris aesthetic
```

### Instagram Post (1080x1080px)
```
Square format, full outfit visible or upper body focus, environmental context (café/rooftop/street), shallow depth of field, brand-consistent color palette
```

### Instagram Carousel (1080x1350px)
```
Vertical portrait orientation, more background visible, lifestyle context, narrative-driven composition
```

### TikTok Thumbnail (1080x1920px)
```
Vertical video format, engaging expression, movement implied, text-overlay friendly composition, eye-level or slightly below camera
```

---

## Advanced Prompting Tips

### For Midjourney
Add these parameters:
```
--ar 1:1 (square) or --ar 4:5 (portrait) or --ar 16:9 (landscape)
--style raw (for more realistic photography)
--s 250 (moderate stylization)
--v 6.0 (latest version)
```

Example:
```
/imagine Professional portrait photograph of Devi, early 20s Asian-European fashion influencer, shoulders-up, pastel knit sweater, gentle smile, 50mm lens f/1.8, soft lighting, champagne background, K-beauty makeup, editorial fashion style --ar 1:1 --style raw --s 250 --v 6.0
```

### For DALL-E 3
- Use detailed descriptive language
- Emphasize "realistic photography" and "editorial style"
- Specify exact clothing and lighting details
- Add "non-sexualized elegant pose" explicitly

### For Stable Diffusion
Recommended models:
- **Realistic Vision V5.1** (photorealistic portraits)
- **DreamShaper 8** (artistic yet realistic)
- **Deliberate V2** (high-quality portraits)

Settings:
- Steps: 30-50
- CFG Scale: 7-9
- Sampling: DPM++ 2M Karras
- Resolution: 512x512 → upscale to 1024x1024

---

## Batch Generation Script (For Consistency)

### Seed-Based Consistency (Stable Diffusion)
1. Generate initial portrait with seed X
2. Save seed number
3. Use same seed for variations:
   - Change only: clothing, background, lighting
   - Keep: face, expression, base prompt

### Reference Image Method (All Tools)
1. Generate master portrait
2. Use as reference image for subsequent generations
3. Specify "same person" or "same model" in prompt
4. Maintain 70-80% similarity to reference

---

## Quality Checklist

Before approving any Devi image:

- [ ] Face matches established Devi identity
- [ ] Expression is warm and approachable (not sultry)
- [ ] Clothing is modest and stylish
- [ ] Lighting is soft and flattering
- [ ] Background matches brand aesthetic
- [ ] No sexualization or revealing clothing
- [ ] Natural skin texture visible (not overly smoothed)
- [ ] Color palette matches brand (pastels/neutrals)
- [ ] Pose is elegant and professional
- [ ] Image quality is sharp and high-resolution

---

## Example Prompt for First Portrait (RECOMMENDED START)

```
A professional fashion influencer portrait photograph for Instagram profile picture. Young Asian-European mixed woman in her early 20s named Devi, wearing a soft cream cashmere turtleneck sweater. Shoulders-up composition, centered. Soft glossy straight hair with gentle waves past shoulders, dark brown color. Warm gentle smile with natural expression. K-beauty inspired makeup: dewy skin with natural texture, soft brown eyeshadow, subtle eyeliner, natural feathered brows, MLBB nude-pink lips, soft peach blush. Shot with Canon 50mm f/1.8 lens at f/2.0, professional studio lighting with large softbox creating diffused glow. Champagne beige seamless paper background with subtle texture. Slight warm color grading in post-production. Editorial fashion photography style, Seoul-meets-Paris aesthetic. Hyper-realistic, natural skin pores visible, professional quality, 8K resolution. Non-sexualized elegant pose, approachable and sophisticated mood.

Technical: 50mm portrait lens, f/2.0, ISO 100, 1/200s, soft key light, fill light, no harsh shadows
Style: Editorial fashion portrait, minimal luxury, K-beauty aesthetic
Mood: Warm, approachable, sophisticated, friendly
Context: Professional Instagram influencer profile picture
```

**Negative Prompt**:
```
revealing clothing, cleavage, low-cut top, sexualized, provocative pose, overly smooth skin, plastic skin, artificial look, heavy makeup, dark smokey eyes, red lips, harsh lighting, dark background, oversaturated colors, anime, illustration, 3D render, fake, low quality, blurry, distorted proportions, unrealistic, sultry expression, bedroom eyes
```

---

**Last Updated**: 2025-11-27
**Version**: 1.0
**System**: Devi AI Fashion Influencer
