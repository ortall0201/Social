import json

print("Fixing automated workflow for FAST 3-minute generation...")
print("Removing unnecessary wait times\n")

# Read the workflow
with open('workflows/Devi-BadBunny-30s-AUTOMATED.json', 'r', encoding='utf-8') as f:
    workflow = json.load(f)

# Remove the long wait nodes
nodes_to_remove = []
for i, node in enumerate(workflow['nodes']):
    if 'Wait Between Segments' in node.get('name', '') or 'wait' in node.get('type', '').lower():
        nodes_to_remove.append(i)
        print(f"Removing: {node['name']}")

# Remove in reverse order to maintain indices
for i in reversed(nodes_to_remove):
    del workflow['nodes'][i]

print("\nUpdated timeline:")
print("- Segment 1: ~3 minutes (Nano Banana + Kling Turbo)")
print("- Segment 2: ~3 minutes")
print("- Segment 3: ~3 minutes")
print("- FFmpeg stitch: ~10 seconds")
print("-" * 50)
print("TOTAL: ~10 minutes (not 60!)")

# Update workflow settings
workflow['settings'] = {
    "executionTimeout": 900,  # 15 minutes max (plenty of buffer)
    "saveExecutionProgress": True
}

# Save
with open('workflows/Devi-BadBunny-30s-FAST.json', 'w', encoding='utf-8') as f:
    json.dump(workflow, f, indent=2, ensure_ascii=False)

print("\nSaved: workflows/Devi-BadBunny-30s-FAST.json")
print("\nOne click = 30-second reel in ~10 minutes!")
