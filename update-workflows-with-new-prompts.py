import json

print("Updating all workflows with clearer 'ON THE CAR ROOF' prompts...\n")

# Read the updated scene prompts
with open('bad-bunny-scene-prompts.json', 'r', encoding='utf-8') as f:
    scene = json.load(f)

# Update both workflow files
workflow_files = [
    'workflows/Devi-BadBunny-30s-FAST.json',
    'workflows/Devi-BadBunny-30s-VEO2.json'
]

for workflow_file in workflow_files:
    print(f"Updating: {workflow_file}")

    with open(workflow_file, 'r', encoding='utf-8') as f:
        workflow = json.load(f)

    # Find and update Parse Reel Concept node
    for node in workflow['nodes']:
        if 'Parse Reel Concept' in node.get('name', ''):
            # Update the jsCode with new prompts
            node['parameters']['jsCode'] = f'''// BAD BUNNY 30-SECOND REEL - ALL SEGMENTS (UPDATED PROMPTS)
const reelId = $('Set Variables').first().json.reel_id;

// All 3 segments with CLEAR "ON CAR ROOF" prompts
const segments = {json.dumps(scene['segments'], indent=2)};

// Get current segment from loop (or default to segment 1)
const loopIndex = $input.item?.json?.loop_index || 0;
const currentSegment = segments[loopIndex];

const reelConcept = {{
  reel_id: reelId,
  segment_number: loopIndex + 1,
  concept: "{scene['scene_name']}",

  // Prompts for current segment (CLEAR: She stands ON THE CAR ROOF)
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

            print(f"  - Updated Parse Reel Concept node with clearer prompts")
            break

    # Save updated workflow
    with open(workflow_file, 'w', encoding='utf-8') as f:
        json.dump(workflow, f, indent=2, ensure_ascii=False)

    print(f"  - Saved!\n")

print("="*60)
print("SUCCESS! All workflows updated")
print("="*60)
print("\nKey changes in prompts:")
print("1. Segment 1: 'standing elevated ON THE ROOF of a luxury sports car'")
print("2. Segment 1: 'feet positioned on car rooftop'")
print("3. Segment 2: 'falling from car ROOFTOP down into crowd'")
print("4. Segment 2: 'from elevated car roof position'")
print("\nNow the AI will DEFINITELY understand she's on the car roof!")
