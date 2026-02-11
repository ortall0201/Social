import json

# Read the workflow
with open('old_workflows/production8 - Apify scraper PRODUCTION NEW !!!!!!.json', 'r', encoding='utf-8') as f:
    workflow = json.load(f)

# Find the "Format Final Report" node to add image fetch after it
format_node_index = None
format_node_position = [-1500, -1000]  # Default position

for i, node in enumerate(workflow['nodes']):
    if node['name'] == 'Format Final Report':
        format_node_index = i
        format_node_position = node['position']
        break

if format_node_index is None:
    print("ERROR: Could not find 'Format Final Report' node")
    exit(1)

# Create new node: Google Image Search for trending headline
google_image_node = {
    "parameters": {
        "method": "GET",
        "url": "https://www.googleapis.com/customsearch/v1",
        "authentication": "predefinedCredentialType",
        "nodeCredentialType": "googleCustomSearchApi",
        "qs": {
            "key": "={{$credentials.googleApiKey}}",
            "cx": "={{$credentials.searchEngineId}}",
            "q": "={{ $json.top_trends && $json.top_trends[0] ? $json.top_trends[0] + ' fashion' : 'fashion trend 2026' }}",
            "searchType": "image",
            "num": "3",
            "imgSize": "large",
            "safe": "active"
        },
        "options": {}
    },
    "id": "google-image-fetch-" + str(hash('google-image'))[-8:],
    "name": "🖼️ Fetch Trending Image from Google",
    "type": "n8n-nodes-base.httpRequest",
    "typeVersion": 4.2,
    "position": [
        format_node_position[0] + 250,
        format_node_position[1]
    ],
    "notes": "Fetches hero image based on trending headline from Google Images (Free: 100 queries/day)"
}

# Create node: Extract Image URL
extract_image_node = {
    "parameters": {
        "jsCode": """// Extract best image from Google search results
const searchResults = $json;

let heroImageUrl = '';
let heroImageAlt = '';

if (searchResults.items && searchResults.items.length > 0) {
    // Get first high-quality image
    const firstImage = searchResults.items[0];
    heroImageUrl = firstImage.link || '';
    heroImageAlt = firstImage.title || 'Trending fashion moment';

    console.log(`🖼️ Found hero image: ${heroImageAlt}`);
} else {
    // Fallback to placeholder
    heroImageUrl = 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1200';
    heroImageAlt = 'Fashion trends';
    console.log('⚠️ No Google image found, using fallback');
}

// Get the report data and add hero image
const reportData = $('Format Final Report').first().json;

return [{
    json: {
        ...reportData,
        hero_image_url: heroImageUrl,
        hero_image_alt: heroImageAlt
    }
}];"""
    },
    "id": "extract-hero-image-" + str(hash('extract'))[-8:],
    "name": "📸 Extract Hero Image",
    "type": "n8n-nodes-base.code",
    "typeVersion": 2,
    "position": [
        format_node_position[0] + 500,
        format_node_position[1]
    ],
    "notes": "Extracts the best trending image URL from Google results"
}

# Add the new nodes
workflow['nodes'].insert(format_node_index + 1, google_image_node)
workflow['nodes'].insert(format_node_index + 2, extract_image_node)

# Update connections: Format Final Report -> Google Image Search -> Extract Hero Image -> Devi Master Content Generator
# Find the current connections
if 'connections' not in workflow:
    workflow['connections'] = {}

# Update Format Final Report connections
workflow['connections']['Format Final Report'] = {
    "main": [[{
        "node": "🖼️ Fetch Trending Image from Google",
        "type": "main",
        "index": 0
    }]]
}

# Add Google Image Search connections
workflow['connections']['🖼️ Fetch Trending Image from Google'] = {
    "main": [[{
        "node": "📸 Extract Hero Image",
        "type": "main",
        "index": 0
    }]]
}

# Add Extract Hero Image connections (connects to existing Devi Master Content Generator)
workflow['connections']['📸 Extract Hero Image'] = {
    "main": [[{
        "node": "Devi Master Content Generator",
        "type": "main",
        "index": 0
    }]]
}

print("Added Google Image fetch nodes:")
print("  1. Fetch Trending Image from Google (HTTP Request)")
print("  2. Extract Hero Image (Code)")
print("\nNOTE: You'll need to set up Google Custom Search API:")
print("  1. Go to: https://console.cloud.google.com/apis/credentials")
print("  2. Create API key for Custom Search API")
print("  3. Create Search Engine ID at: https://programmablesearchengine.google.com/")
print("  4. Add credentials in n8n")

# Now update blog generator to use hero image
for node in workflow['nodes']:
    if node['name'] == 'Devi Blog Post Generator':
        js_code = node['parameters']['jsCode']

        # Add hero image section after header
        hero_image_section = '''
    <!-- Hero Image - Trending Fashion Moment -->
    <div style="width: 100%; max-width: 650px; margin: 0 auto; overflow: hidden;">
      <img src="${content.hero_image_url || 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1200'}"
           alt="${content.hero_image_alt || 'Fashion trend'}"
           style="width: 100%; height: auto; display: block; max-height: 450px; object-fit: cover;">
    </div>

    <!-- Section Separator -->
    <div style="height: 3px; background: linear-gradient(90deg, #FF1493 0%, #FF69B4 50%, #FFB6C1 100%); margin: 0;"></div>
'''

        # Insert hero image after the header (after </div> that closes header)
        js_code = js_code.replace(
            '    <!-- Confidence Booster Alert -->',
            hero_image_section + '\n    <!-- Confidence Booster Alert -->'
        )

        # Add better section separators
        section_separator = '''
      <!-- Professional Section Separator -->
      <div style="margin: 50px 0;">
        <div style="height: 1px; background: linear-gradient(90deg, transparent 0%, #FFB6C1 20%, #FF69B4 50%, #FFB6C1 80%, transparent 100%);"></div>
      </div>
'''

        # Add separators between major sections
        js_code = js_code.replace(
            '      <!-- Trends Section -->',
            section_separator + '\n      <!-- Trends Section -->'
        )
        js_code = js_code.replace(
            '      <!-- Color Palette -->',
            section_separator + '\n      <!-- Color Palette -->'
        )
        js_code = js_code.replace(
            '      <!-- Shop Section -->',
            section_separator + '\n      <!-- Shop Section -->'
        )

        node['parameters']['jsCode'] = js_code
        print("\nUpdated blog generator with:")
        print("  - Hero image section")
        print("  - Professional section separators")
        break

# Save the updated workflow
with open('old_workflows/production8 - Apify scraper PRODUCTION NEW !!!!!!.json', 'w', encoding='utf-8') as f:
    json.dump(workflow, f, indent=2, ensure_ascii=False)

print("\nWorkflow updated successfully!")
print("\nNext steps:")
print("1. Set up Google Custom Search API (FREE - 100 queries/day)")
print("2. Re-import workflow in n8n")
print("3. Add Google API credentials")
print("4. Test with a trending headline!")
