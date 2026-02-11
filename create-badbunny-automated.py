import json

print("Creating Bad Bunny 3-Segment Automated Workflow...")
print("Using your proven Trend Scout + Reel Crafter structure\n")

# Read your base workflow
with open('workflows/Devi SUPERBOWL (Nano Banana + Kling v2.5 Turbo Pro) SATISFYING copy copy copy copy (1).json', 'r', encoding='utf-8') as f:
    workflow = json.load(f)

# Read scene prompts
with open('bad-bunny-scene-prompts.json', 'r', encoding='utf-8') as f:
    scene = json.load(f)

print("Building workflow that:")
print("1. Loops through 3 segments")
print("2. Each segment has custom Trend Scout + Reel Crafter prompts")
print("3. Each segment uses previous output as reference image")
print("4. Stitches all 3 videos at the end\n")

# Define prompts for each segment
segment_prompts = {
    1: {
        "trend_scout_system": """You are Devi's US beauty and fashion trend scout.

Your role is to identify the SINGLE dominant beauty-led editorial trend
peaking TODAY in the United States.

Focus on: Power poses, elevated fashion moments, stadium energy,
confident beauty rituals before big moments.

Rules:
- Focus on ONE dominant trend only
- Editorial language only
- No brand names, event names, or celebrity names

Output:
3-5 editorial sentences describing the trend.""",

        "trend_scout_user": """Context:
A confident figure stands elevated on a luxury car rooftop
in a stadium setting. She wears cream/beige oversized editorial blazer
(similar to recent Super Bowl fashion moments).

She holds pink lipstick, about to apply it.
The crowd below is excited and cheering.
This is a power moment before beauty ritual.

Task:
Identify the dominant US trend connecting:
- Elevated fashion poses (on cars, platforms)
- Stadium/concert energy
- Pre-ritual confidence
- Cream/neutral power dressing

Return 3-5 editorial sentences.""",

        "reel_crafter_system": """You are generating structured data for an automation pipeline.

CRITICAL OUTPUT RULE:
- You MUST output valid JSON only
- No markdown, no explanations

IDENTITY LOCK:
- Devi's face MUST remain identical to reference image

WARDROBE:
- Oversized cream/beige blazer (editorial, Zara-inspired)
- Wide-leg matching trousers
- White sneakers
- Bold pink lipstick in hand

SCENE LOGIC:
- Devi stands ON TOP OF car roof (elevated above crowd)
- Feet positioned on vehicle rooftop
- Confident pose, holding lipstick
- Stadium crowd cheering below
- Dramatic lighting, cinematic

STYLE:
- Fashion editorial
- Power moment
- Confident and cinematic

You MUST return ONLY a JSON object with keys:
script, image_prompt, video_prompt, caption, hashtags""",

        "reel_crafter_user": """Generate the JSON object now for Segment 1: Car Roof Entrance.

script:
Describe the 8-10 second scene: Devi standing on car roof in stadium,
holding pink lipstick, crowd below cheering.

image_prompt:
Devi standing elevated ON THE ROOF of luxury car, feet on rooftop,
wearing oversized cream Zara blazer with wide-leg trousers and white sneakers,
holding pink lipstick, stadium crowd below, cinematic lighting, fashion editorial, 9:16 vertical.

video_prompt:
Devi standing confidently on car rooftop in stadium, wearing cream blazer and trousers,
holding pink lipstick, crowd cheering below, camera slowly zooms toward face,
dramatic lighting, smooth cinematic movement, fashion editorial style, no sudden movements.

caption:
Short viral caption about power moments and confidence.

hashtags:
Array of relevant hashtags.

Return ONLY valid JSON."""
    },

    2: {
        "trend_scout_system": """You are Devi's US beauty and fashion trend scout.

Focus on: Concert culture, crowd surfing, festival energy,
horizontal crowd-carried moments, communal celebration.

Rules:
- Focus on ONE dominant trend only
- Editorial language only
- No brand names or celebrity names

Output:
3-5 editorial sentences describing the trend.""",

        "trend_scout_user": """Context:
A figure falls gracefully from an elevated position
and is caught horizontally by a crowd.

She is carried on the crowd's hands (crowd surfing),
like at a music festival or concert.

The crowd energy is euphoric, supportive, communal.
She holds pink lipstick while being carried.

Task:
Identify the US trend connecting:
- Crowd surfing / festival culture
- Being carried by supportive crowds
- Fashion in motion (blazer flowing)
- Communal euphoria

Return 3-5 editorial sentences.""",

        "reel_crafter_system": """You are generating structured data for an automation pipeline.

CRITICAL OUTPUT RULE:
- You MUST output valid JSON only
- No markdown, no explanations

IDENTITY LOCK:
- Devi's face MUST remain identical to reference image

WARDROBE:
- Cream blazer (flowing dramatically)
- Wide-leg trousers
- White sneakers
- Pink lipstick in hand

SCENE LOGIC:
- Devi falls from car roof
- Crowd catches her HORIZONTALLY (crowd surfing)
- She is carried on crowd's hands like at a concert
- Crowd energy is euphoric and supportive
- Slow-motion, cinematic

STYLE:
- Festival/concert vibe
- Euphoric and dynamic
- Satisfying motion

You MUST return ONLY a JSON object with keys:
script, image_prompt, video_prompt, caption, hashtags""",

        "reel_crafter_user": """Generate JSON for Segment 2: Crowd Surfing.

image_prompt:
Devi being carried horizontally by crowd (crowd surfing),
cream blazer and trousers flowing, pink lipstick in raised hand,
multiple crowd hands supporting her from below,
stadium atmosphere, dynamic angle, motion blur, 9:16 vertical.

video_prompt:
Devi gracefully falls from car roof and is caught horizontally by crowd,
crowd surfing like at concert, carried on crowd's hands,
cream blazer flowing dramatically, lipstick in hand,
slow-motion, euphoric crowd energy, cinematic lighting, smooth fluid motion.

caption:
Short viral caption about festival energy and freedom.

hashtags:
Array of relevant hashtags.

Return ONLY valid JSON."""
    },

    3: {
        "trend_scout_system": """You are Devi's US beauty and fashion trend scout.

Focus on: ASMR beauty content, satisfying makeup application,
close-up beauty moments, tactile satisfaction, calm ritual.

Rules:
- Focus on satisfying beauty rituals
- Editorial language only
- No brand names

Output:
3-5 editorial sentences.""",

        "trend_scout_user": """Context:
A figure is being carried by a crowd (crowd surfing)
and applies bold pink lipstick in one smooth, satisfying motion.

The close-up captures the lipstick gliding across lips.
Crowd hands are visible supporting from below.
This is an ASMR-style beauty moment during a communal celebration.

Task:
Identify the US trend connecting:
- ASMR satisfying makeup application
- Beauty rituals in unexpected moments
- Close-up tactile beauty content
- Confidence and celebration

Return 3-5 editorial sentences.""",

        "reel_crafter_system": """You are generating structured data for an automation pipeline.

CRITICAL OUTPUT RULE:
- You MUST output valid JSON only
- No markdown, no explanations

IDENTITY LOCK:
- Devi's face MUST remain identical to reference image

SCENE LOGIC:
- Devi is being carried horizontally by crowd (crowd surfing)
- She applies pink lipstick in ONE smooth motion
- Extreme close-up of lips and face
- Crowd hands visible supporting her from below
- ASMR aesthetic: smooth, satisfying, butter-like application

STYLE:
- Beauty commercial
- ASMR / satisfying content
- Close-up, tactile, sensual
- Ultra-realistic

You MUST return ONLY a JSON object with keys:
script, image_prompt, video_prompt, caption, hashtags""",

        "reel_crafter_user": """Generate JSON for Segment 3: Lipstick Close-Up While Crowd Surfing.

image_prompt:
Extreme close-up of Devi applying bold pink lipstick while being
carried horizontally by crowd, crowd hands visible supporting from below,
satisfying smooth motion, stadium lights bokeh, ASMR aesthetic,
hyper-detailed lips and makeup, beauty shot, 9:16 vertical.

video_prompt:
Extreme close-up of Devi applying pink lipstick in one smooth satisfying motion
while being crowd surfed (carried on crowd's hands),
camera focuses on lips and face, crowd hands visible supporting her,
butter-smooth lipstick application, ASMR visual, glowing stadium lights bokeh,
beauty commercial aesthetic, ultra-realistic, slow deliberate movement.

caption:
Short viral caption about satisfying beauty moments.

hashtags:
Array of relevant hashtags.

Return ONLY valid JSON."""
    }
}

# Add segment loop generator node (creates 3 loop items)
loop_generator = {
    "parameters": {
        "jsCode": """// Generate 3 segment loop items
const segments = [
  { segment_number: 1, segment_name: 'car_roof' },
  { segment_number: 2, segment_name: 'crowd_surf' },
  { segment_number: 3, segment_name: 'lipstick_closeup' }
];

return segments.map(seg => ({ json: seg }));"""
    },
    "id": "segment-loop-generator",
    "name": "Generate 3 Segments",
    "type": "n8n-nodes-base.code",
    "typeVersion": 2,
    "position": [-3400, 320],
    "notes": "Creates 3 loop items for the Bad Bunny segments"
}

# Find Set Variables node and insert loop generator after it
for i, node in enumerate(workflow['nodes']):
    if node['name'] == 'Set Variables':
        workflow['nodes'].insert(i + 1, loop_generator)
        print("Added: Segment Loop Generator")
        break

# Update Trend Scout node to use conditional prompts based on segment
for node in workflow['nodes']:
    if node['name'] == '🔍 Devi Trend Scout':
        # Make prompts conditional on segment number
        node['parameters']['messages']['values'][0]['content'] = f"""={{
const segNum = $input.item.json.segment_number;
const prompts = {json.dumps({str(k): v['trend_scout_system'] for k, v in segment_prompts.items()})};
return prompts[segNum.toString()];
}}"""

        node['parameters']['messages']['values'][1]['content'] = f"""={{
const segNum = $input.item.json.segment_number;
const prompts = {json.dumps({str(k): v['trend_scout_user'] for k, v in segment_prompts.items()})};
return prompts[segNum.toString()];
}}"""

        print("Updated: Trend Scout (conditional prompts)")
        break

# Update Reel Crafter node to use conditional prompts
for node in workflow['nodes']:
    if node['name'] == '🎬 Devi Reel Crafter':
        node['parameters']['messages']['values'][0]['content'] = f"""={{
const segNum = $input.item.json.segment_number;
const prompts = {json.dumps({str(k): v['reel_crafter_system'] for k, v in segment_prompts.items()})};
return prompts[segNum.toString()];
}}"""

        node['parameters']['messages']['values'][1]['content'] = f"""={{
const segNum = $input.item.json.segment_number;
const prompts = {json.dumps({str(k): v['reel_crafter_user'] for k, v in segment_prompts.items()})};
return prompts[segNum.toString()];
}}"""

        print("Updated: Reel Crafter (conditional prompts)")
        break

# Update Nano Banana node to use conditional reference image
for node in workflow['nodes']:
    if '🍌 Generate Image' in node.get('name', '') or 'Nano Banana' in node.get('name', ''):
        # Parse existing body to update image_input
        node['parameters']['body'] = """={
const segNum = $('Parse Reel Concept').first().json.segment_number || 1;

// Segment 1: use base reference
// Segment 2: use output from segment 1
// Segment 3: use output from segment 2
let referenceImage;
if (segNum === 1) {
  referenceImage = "https://raw.githubusercontent.com/ortall0201/Social/main/devi-identity/images/devi-face-primary.png";
} else if (segNum === 2) {
  referenceImage = $('Download Generated Image', 0).first().json.image_url;
} else {
  referenceImage = $('Download Generated Image', 1).first().json.image_url;
}

return {
  "version": "d05a591283da31be3eea28d5634ef9e26989b351718b6489bd308426ebd0a3e8",
  "input": {
    "prompt": $('Parse Reel Concept').first().json.image_prompt,
    "image_input": [referenceImage],
    "aspect_ratio": "9:16",
    "output_format": "jpg"
  }
};
}"""
        print("Updated: Nano Banana (conditional reference image)")
        break

# Update Kling node to use Veo 2 for segment 3
for node in workflow['nodes']:
    if 'Kling' in node.get('name', '') or 'Video Generation' in node.get('name', ''):
        # Add conditional model selection
        if 'body' in node['parameters']:
            original_body = node['parameters']['body']
            # Wrap in conditional to use veo-2 for segment 3
            node['parameters']['body'] = """={
const segNum = $('Parse Reel Concept').first().json.segment_number || 1;
const model = segNum === 3 ? "google/veo-2" : "kling-ai/kling-v2.5-turbo-pro";

const imageUrl = $('Download Generated Image').first().json.image_url;
const videoPrompt = $('Parse Reel Concept').first().json.video_prompt;

return {
  "version": model === "google/veo-2" ? "latest" : "latest",
  "input": {
    "prompt": videoPrompt,
    "image_url": imageUrl,
    "duration": 10,
    "aspect_ratio": "9:16"
  }
};
}"""
        print("Updated: Video Generation (Veo 2 for Segment 3)")
        break

# Add FFmpeg stitch node at the end
ffmpeg_stitch = {
    "parameters": {
        "command": """=const videos = $('Download Video').all();
const paths = videos.map((v, i) => v.json.video_path).join(' -i ');
const reelId = $('Set Variables').first().json.reel_id;
return `ffmpeg -i ${paths} -filter_complex '[0:v][1:v][2:v]concat=n=3:v=1:a=0,format=yuv420p[v]' -map '[v]' -r 30 -c:v libx264 -preset fast -crf 23 devi-videos/videos/bad-bunny-${reelId}-FINAL.mp4`;"""
    },
    "id": "ffmpeg-stitch-final",
    "name": "Stitch 3 Segments (FFmpeg)",
    "type": "n8n-nodes-base.executeCommand",
    "typeVersion": 1,
    "position": [-800, 320],
    "notes": "Combines all 3 segments into final 30s reel"
}

workflow['nodes'].append(ffmpeg_stitch)
print("Added: FFmpeg Stitching Node")

# Update workflow metadata
workflow['name'] = "Devi - Bad Bunny 30s Reel (Automated - Trend Scout + Reel Crafter)"
workflow['settings'] = {
    "executionTimeout": 1800,  # 30 minutes
    "saveExecutionProgress": True
}

# Save
output_file = 'workflows/Devi-BadBunny-TrendScout-AUTOMATED.json'
with open(output_file, 'w', encoding='utf-8') as f:
    json.dump(workflow, f, indent=2, ensure_ascii=False)

print(f"\n{'='*60}")
print("SUCCESS! Automated workflow created")
print(f"{'='*60}")
print(f"\nFile: {output_file}")
print("\nWhat it does:")
print("1. Loops through 3 segments automatically")
print("2. Each segment uses custom Trend Scout + Reel Crafter prompts")
print("3. Segment 1: Base Devi reference")
print("4. Segment 2: Uses Segment 1 output as reference")
print("5. Segment 3: Uses Segment 2 output as reference + Veo 2")
print("6. Stitches all 3 with FFmpeg")
print("7. Outputs final 30s reel")
print("\nOne click = Complete Bad Bunny reel in ~12 minutes!")
