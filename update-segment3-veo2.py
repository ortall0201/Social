import json

print("Updating workflow to use Google Veo 2 for Segment 3 (lipstick close-up)...")
print("This will give ultra-realistic lipstick application\n")

# Read the fast workflow
with open('workflows/Devi-BadBunny-30s-FAST.json', 'r', encoding='utf-8') as f:
    workflow = json.load(f)

# Find the video generation nodes and update Segment 3 to use Veo 2
for node in workflow['nodes']:
    # Look for Replicate nodes that generate video
    if node.get('type') == 'n8n-nodes-base.replicate' and 'video' in node.get('name', '').lower():

        # Check if this is for segment 3 (lipstick scene)
        # We'll add conditional logic based on segment number
        node['parameters']['modelEndpoint'] = '={{ $json.segment_number === 3 ? "google/veo-2" : "kling-ai/kling-v2.5-turbo-pro" }}'

        print(f"Updated: {node['name']}")
        print("  - Segments 1-2: kling-ai/kling-v2.5-turbo-pro (fast)")
        print("  - Segment 3: google/veo-2 (ultra-realistic)")
        break

# Update workflow description
workflow['name'] = "Devi - Bad Bunny 30s Reel (Veo 2 for Lipstick)"
workflow['notes'] = "Hybrid approach: Kling Turbo for wide shots, Google Veo 2 for close-up lipstick application"

# Save
output_file = 'workflows/Devi-BadBunny-30s-VEO2.json'
with open(output_file, 'w', encoding='utf-8') as f:
    json.dump(workflow, f, indent=2, ensure_ascii=False)

print(f"\n{'='*60}")
print("SUCCESS! Workflow updated with Veo 2")
print(f"{'='*60}")
print(f"\nFile: {output_file}")
print("\nWhat changed:")
print("- Segment 1 (car entrance): Kling v2.5 Turbo Pro (fast, ~3 min)")
print("- Segment 2 (fall): Kling v2.5 Turbo Pro (fast, ~3 min)")
print("- Segment 3 (lipstick): Google Veo 2 (ultra-realistic, ~5 min)")
print("\nTotal time: ~11-12 minutes")
print("\nVeo 2 advantages for lipstick scene:")
print("- Best-in-class realism for human movements")
print("- Perfect for close-up facial details")
print("- Smooth, satisfying motion (ASMR aesthetic)")
print("- Cinematic quality")
