import json

print("Adding SerpAPI image search to workflow...")
print("This is MUCH simpler than Google Custom Search!")
print("\nYou'll just need to:")
print("1. Install n8n-nodes-serpapi community node")
print("2. Get free SerpAPI key (100/month)")
print("3. Done!\n")

# Read the workflow
with open('old_workflows/production8 - Apify scraper PRODUCTION NEW !!!!!!.json', 'r', encoding='utf-8') as f:
    workflow = json.load(f)

# Find Format Final Report node
format_node = None
for node in workflow['nodes']:
    if node['name'] == 'Format Final Report':
        format_node = node
        break

if not format_node:
    print("ERROR: Could not find Format Final Report node")
    exit(1)

# Create SerpAPI node for Google Images
serpapi_node = {
    "parameters": {
        "engine": "google",
        "search": "images",
        "query": "={{ $json.top_trends && $json.top_trends[0] ? $json.top_trends[0] + ' fashion red carpet' : 'fashion trends 2026' }}",
        "location": "United States",
        "hl": "en",
        "gl": "us",
        "num": "3"
    },
    "id": "serpapi-image-search-node",
    "name": "🖼️ SerpAPI Image Search",
    "type": "n8n-nodes-serpapi.serpapi",
    "typeVersion": 1,
    "position": [
        format_node['position'][0] + 250,
        format_node['position'][1]
    ],
    "credentials": {
        "serpapiApi": {
            "id": "YOUR_SERPAPI_CREDENTIAL_ID",
            "name": "SerpAPI"
        }
    },
    "notes": "Fetches trending fashion images from Google Images (FREE: 100/month)"
}

# Create extract image node
extract_node = {
    "parameters": {
        "jsCode": """// Extract best trending image from SerpAPI results
const searchResults = $json;

let heroImageUrl = '';
let heroImageAlt = '';

if (searchResults.images_results && searchResults.images_results.length > 0) {
    // Get first high-quality image
    const firstImage = searchResults.images_results[0];
    heroImageUrl = firstImage.original || firstImage.thumbnail || '';
    heroImageAlt = firstImage.title || 'Trending fashion moment';

    console.log(`Found hero image: ${heroImageAlt}`);
} else {
    // Fallback to Unsplash
    heroImageUrl = 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1200';
    heroImageAlt = 'Fashion trends';
    console.log('No image found, using fallback');
}

// Get report data and add hero image
const reportData = $('Format Final Report').first().json;

return [{
    json: {
        ...reportData,
        hero_image_url: heroImageUrl,
        hero_image_alt: heroImageAlt
    }
}];"""
    },
    "id": "extract-serpapi-image",
    "name": "📸 Extract Hero Image",
    "type": "n8n-nodes-base.code",
    "typeVersion": 2,
    "position": [
        format_node['position'][0] + 500,
        format_node['position'][1]
    ],
    "notes": "Extracts the best image URL from SerpAPI results"
}

# Find where to insert nodes
insert_index = workflow['nodes'].index(format_node) + 1

# Add nodes
workflow['nodes'].insert(insert_index, serpapi_node)
workflow['nodes'].insert(insert_index + 1, extract_node)

# Update connections
workflow['connections']['Format Final Report'] = {
    "main": [[{
        "node": "🖼️ SerpAPI Image Search",
        "type": "main",
        "index": 0
    }]]
}

workflow['connections']['🖼️ SerpAPI Image Search'] = {
    "main": [[{
        "node": "📸 Extract Hero Image",
        "type": "main",
        "index": 0
    }]]
}

workflow['connections']['📸 Extract Hero Image'] = {
    "main": [[{
        "node": "Devi Master Content Generator",
        "type": "main",
        "index": 0
    }]]
}

# Save
with open('old_workflows/production8 - Apify scraper PRODUCTION NEW !!!!!!.json', 'w', encoding='utf-8') as f:
    json.dump(workflow, f, indent=2, ensure_ascii=False)

print("SUCCESS! SerpAPI nodes added to workflow")
print("\nNext steps:")
print("1. Install community node: n8n-nodes-serpapi")
print("   (Settings > Community Nodes > Install)")
print("2. Sign up at: https://serpapi.com/users/sign_up")
print("3. Get your API key (FREE 100 searches/month)")
print("4. Add SerpAPI credential in n8n")
print("5. Re-import workflow")
print("\nDone! Much simpler than Google Custom Search!")
