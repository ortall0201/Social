import json

# Read the workflow
with open('old_workflows/production8 - Apify scraper PRODUCTION NEW !!!!!!.json', 'r', encoding='utf-8') as f:
    workflow = json.load(f)

print("Checking for existing Google API usage...\n")

# Check for Google-related nodes
google_nodes = []
google_sheets_nodes = []
google_credentials = set()

for node in workflow['nodes']:
    node_name = node.get('name', '').lower()
    node_type = node.get('type', '').lower()

    # Check for Google in name or type
    if 'google' in node_name or 'google' in node_type:
        google_nodes.append({
            'name': node['name'],
            'type': node['type'],
            'id': node.get('id', '')
        })

        # Check for Google Sheets specifically
        if 'sheet' in node_name or 'sheet' in node_type:
            google_sheets_nodes.append(node['name'])

        # Check credentials
        if 'credentials' in node:
            for cred_name, cred_info in node['credentials'].items():
                if 'google' in cred_name.lower():
                    google_credentials.add(cred_name)

print("=" * 60)
print("EXISTING GOOGLE API USAGE")
print("=" * 60)

if google_nodes:
    print(f"\nFound {len(google_nodes)} Google-related node(s):\n")
    for node in google_nodes:
        print(f"  - {node['name']}")
        print(f"    Type: {node['type']}")
        print()
else:
    print("\nNo Google nodes found in workflow")

if google_sheets_nodes:
    print(f"Google Sheets nodes: {', '.join(google_sheets_nodes)}")

if google_credentials:
    print(f"\nGoogle credentials being used:")
    for cred in google_credentials:
        print(f"  - {cred}")

    print("\n" + "=" * 60)
    print("GOOD NEWS!")
    print("=" * 60)
    print("\nYou can REUSE your existing Google credentials!")
    print("\nThe Google Sheets API and Custom Search API can use")
    print("the SAME Google Cloud Project and API credentials.")
    print("\nYou just need to:")
    print("1. Enable 'Custom Search API' in your existing project")
    print("2. Create a Search Engine ID")
    print("3. Use the same API key you already have!")
    print("\nNo new Google account or project needed!")
else:
    print("\n" + "=" * 60)
    print("No Google credentials found.")
    print("You'll need to set up Google API from scratch.")
    print("=" * 60)
