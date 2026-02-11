import json

print("Creating FULLY AUTOMATED 30-Second Reel Workflow...")
print("This will generate all 3 segments + stitch them together automatically\n")

# Read the base workflow
with open('workflows/Devi SUPERBOWL (Nano Banana + Kling v2.5 Turbo Pro) SATISFYING copy copy copy copy (1).json', 'r', encoding='utf-8') as f:
    workflow = json.load(f)

# Read the scene prompts
with open('bad-bunny-scene-prompts.json', 'r', encoding='utf-8') as f:
    scene = json.load(f)

print("Building workflow that will:")
print("1. Generate Segment 1 (0-10s)")
print("2. Generate Segment 2 (10-20s)")
print("3. Generate Segment 3 (20-30s)")
print("4. Stitch all 3 together with FFmpeg")
print("5. Output final 30s reel\n")

# Update Parse Reel Concept to generate all segments
for node in workflow['nodes']:
    if 'Parse Reel Concept' in node.get('name', ''):
        node['parameters']['jsCode'] = f'''// BAD BUNNY 30-SECOND REEL - ALL SEGMENTS
const reelId = $('Set Variables').first().json.reel_id;

// All 3 segments with prompts
const segments = {json.dumps(scene['segments'], indent=2)};

// Get current segment from loop (or default to segment 1)
const loopIndex = $input.item?.json?.loop_index || 0;
const currentSegment = segments[loopIndex];

const reelConcept = {{
  reel_id: reelId,
  segment_number: loopIndex + 1,
  concept: "{scene['scene_name']}",

  // Prompts for current segment
  image_prompt: currentSegment.image_prompt,
  video_prompt: currentSegment.video_prompt,

  // Technical specs
  aspect_ratio: "9:16",
  duration: 10,
  negative_prompt: "{scene['technical_specs']['negative_prompt']}",

  // Metadata
  total_segments: 3,
  is_final_segment: loopIndex === 2
}};

return [{{ json: reelConcept }}];'''
        print(f"Updated: {node['name']}")
        break

# Add loop node to generate all 3 segments
loop_node = {
    "parameters": {
        "jsCode": """// Create loop items for 3 segments
const segments = [
  { loop_index: 0, segment_name: 'entrance' },
  { loop_index: 1, segment_name: 'fall' },
  { loop_index: 2, segment_name: 'lipstick' }
];

return segments.map(seg => ({ json: seg }));"""
    },
    "id": "segment-loop-generator",
    "name": "Generate 3 Segments Loop",
    "type": "n8n-nodes-base.code",
    "typeVersion": 2,
    "position": [-3400, 320],
    "notes": "Creates loop items for all 3 segments"
}

# Add loop node after Set Variables
for i, node in enumerate(workflow['nodes']):
    if node['name'] == 'Set Variables':
        workflow['nodes'].insert(i + 1, loop_node)
        print("Added: Generate 3 Segments Loop")
        break

# Add FFmpeg stitch node (after all segments are generated)
ffmpeg_node = {
    "parameters": {
        "command": "=ffmpeg -i {{ $('Download Segment 1').first().json.file_path }} -i {{ $('Download Segment 2').first().json.file_path }} -i {{ $('Download Segment 3').first().json.file_path }} -filter_complex '[0:v][1:v][2:v]concat=n=3:v=1:a=0,format=yuv420p[v]' -map '[v]' -r 30 -c:v libx264 -preset fast -crf 23 devi-videos/videos/bad-bunny-reel-{{ $('Set Variables').first().json.reel_id }}-FINAL.mp4",
        "options": {}
    },
    "id": "ffmpeg-stitch-videos",
    "name": "Stitch 3 Segments FFmpeg",
    "type": "n8n-nodes-base.executeCommand",
    "typeVersion": 1,
    "position": [-1200, 320],
    "notes": "Combines all 3 video segments into final 30s reel"
}

workflow['nodes'].append(ffmpeg_node)
print("Added: Stitch 3 Segments (FFmpeg)")

# Add wait nodes between segments to avoid rate limiting
wait_node = {
    "parameters": {
        "amount": 30,
        "unit": "seconds"
    },
    "id": "wait-between-segments",
    "name": "Wait Between Segments",
    "type": "n8n-nodes-base.wait",
    "typeVersion": 1.1,
    "position": [-2000, 320],
    "notes": "Prevents API rate limiting between segment generations"
}

workflow['nodes'].append(wait_node)
print("Added: Wait Between Segments")

# Update workflow name and description
workflow['name'] = "Devi - Bad Bunny 30s Reel (FULLY AUTOMATED)"
workflow['settings'] = {
    "executionTimeout": 3600,
    "saveExecutionProgress": True
}

# Save
output_file = 'workflows/Devi-BadBunny-30s-AUTOMATED.json'
with open(output_file, 'w', encoding='utf-8') as f:
    json.dump(workflow, f, indent=2, ensure_ascii=False)

print(f"\n{'='*50}")
print("SUCCESS! Workflow created")
print(f"{'='*50}")
print(f"\nFile: {output_file}")
print("\nWhat it does:")
print("1. Loops through 3 segments automatically")
print("2. Generates image + video for each (Nano Banana + Kling)")
print("3. Waits between segments (avoid rate limits)")
print("4. Stitches all 3 videos with FFmpeg")
print("5. Saves final 30s reel to devi-videos/videos/")
print("\nOne click = Complete 30-second reel!")
print("\nNote: You'll need FFmpeg installed on your n8n server")
print("Install: apt-get install ffmpeg (Linux) or brew install ffmpeg (Mac)")
