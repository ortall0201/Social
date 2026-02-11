import json

print("Creating Bad Bunny Super Bowl Scene Workflow...")
print("This will generate a 30-second reel in 3 segments\n")

# Read the existing workflow
with open('workflows/Devi SUPERBOWL (Nano Banana + Kling v2.5 Turbo Pro) SATISFYING copy copy copy copy (1).json', 'r', encoding='utf-8') as f:
    workflow = json.load(f)

# Read the scene prompts
with open('bad-bunny-scene-prompts.json', 'r', encoding='utf-8') as f:
    scene = json.load(f)

print("Scene: " + scene['scene_name'])
print("Duration: " + str(scene['duration']) + " seconds")
print("Segments: " + str(len(scene['segments'])) + "\n")

# Find the "Parse Reel Concept" node and update it
for node in workflow['nodes']:
    if 'Parse Reel Concept' in node.get('name', ''):
        # Update the node to generate our Bad Bunny scene
        node['parameters']['jsCode'] = f'''// BAD BUNNY SUPER BOWL SCENE GENERATOR
const reelId = $('Set Variables').first().json.reel_id;

// Scene segments with detailed prompts
const segments = {json.dumps(scene['segments'], indent=2)};

// For now, we'll generate the first segment
// You can loop through all 3 segments to create full 30-second video
const currentSegment = segments[0];

const reelConcept = {{
  reel_id: reelId,
  concept: "{scene['scene_name']}",
  style: "cinematic fashion editorial",
  duration: 10,

  // Image generation prompt (Nano Banana)
  image_prompt: currentSegment.image_prompt,

  // Video generation prompt (Kling)
  video_prompt: currentSegment.video_prompt,

  // Technical specs
  aspect_ratio: "9:16",
  negative_prompt: "{scene['technical_specs']['negative_prompt']}",

  // Metadata
  outfit_reference: "Bad Bunny Super Bowl 2026 Zara",
  key_moment: "Standing on car with lipstick"
}};

return [{{ json: reelConcept }}];'''

        print(f"Updated node: {node['name']}")
        break

# Update workflow name
workflow['name'] = "Devi - Bad Bunny Super Bowl Scene (30s Reel)"

# Save the new workflow
output_file = 'workflows/Devi-BadBunny-SuperBowl-Scene.json'
with open(output_file, 'w', encoding='utf-8') as f:
    json.dump(workflow, f, indent=2, ensure_ascii=False)

print(f"\nWorkflow saved to: {output_file}")
print("\nNext steps:")
print("1. Import this workflow in n8n")
print("2. Run it to generate Segment 1 (10 seconds)")
print("3. Run 2 more times for Segments 2 and 3")
print("4. Use video editing tool to stitch 3 segments together")
print("\nOr...")
print("I can create an automated version that generates all 3 segments")
print("and stitches them together automatically!")
