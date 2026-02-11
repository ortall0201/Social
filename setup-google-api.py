import json

print("=" * 60)
print("   GOOGLE CUSTOM SEARCH API - CREDENTIAL SETUP")
print("=" * 60)
print("\nThis script will add your Google API credentials to the workflow.")
print("\nFirst, get your credentials from:")
print("1. API Key: https://console.cloud.google.com/apis/credentials")
print("2. Search Engine ID: https://programmablesearchengine.google.com/")
print("\nSee GOOGLE-API-SETUP.md for detailed instructions.")
print("\n" + "=" * 60)

# Get user input
api_key = input("\nEnter your Google API Key (starts with AIza...): ").strip()
search_engine_id = input("Enter your Search Engine ID (format: abc123:xyz): ").strip()

if not api_key or not search_engine_id:
    print("\n❌ ERROR: Both API Key and Search Engine ID are required!")
    exit(1)

print("\n⏳ Updating workflow...")

# Read the workflow
with open('old_workflows/production8 - Apify scraper PRODUCTION NEW !!!!!!.json', 'r', encoding='utf-8') as f:
    workflow = json.load(f)

# Find and update the Google Image Search node
updated = False
for node in workflow['nodes']:
    if '🖼️ Fetch Trending Image from Google' in node.get('name', '') or 'Fetch Trending Image from Google' in node.get('name', ''):
        # Update the query string parameters
        if 'parameters' in node and 'qs' in node['parameters']:
            node['parameters']['qs']['key'] = api_key
            node['parameters']['qs']['cx'] = search_engine_id
            updated = True
            print(f"✓ Updated node: {node['name']}")

if not updated:
    print("\n❌ WARNING: Could not find Google Image Search node.")
    print("Make sure you've run 'add-google-image-fetch.py' first!")
else:
    # Save the updated workflow
    with open('old_workflows/production8 - Apify scraper PRODUCTION NEW !!!!!!.json', 'w', encoding='utf-8') as f:
        json.dump(workflow, f, indent=2, ensure_ascii=False)

    print("\n" + "=" * 60)
    print("✓ SUCCESS! Workflow updated with your API credentials")
    print("=" * 60)
    print("\nNext steps:")
    print("1. Re-import the workflow in n8n")
    print("2. Test the workflow")
    print("3. Your newsletter will now fetch trending images!")
    print("\nFree tier: 100 queries/day (more than enough!)")
    print("=" * 60)
