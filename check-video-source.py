import json
import re

# Read the workflow
with open('old_workflows/production8 - Apify scraper PRODUCTION NEW !!!!!!.json', 'r', encoding='utf-8') as f:
    workflow = json.load(f)

# Find the "Prepare Email with Products" node
for node in workflow['nodes']:
    if node['name'] == 'Prepare Email with Products':
        js_code = node['parameters']['jsCode']

        # Check if it references newsletter-video folder
        if 'newsletter-video' in js_code:
            print("YES - Newsletter pulls video from newsletter-video folder dynamically!")
        else:
            print("NO - Video is hardcoded (not pulling from newsletter-video folder)")

        # Check for hardcoded Instagram URLs
        instagram_urls = re.findall(r'https://www\.instagram\.com/reel/[^/\'\"]+', js_code)
        if instagram_urls:
            print(f"\nFound {len(instagram_urls)} hardcoded Instagram reel URL(s):")
            for url in instagram_urls[:3]:
                print(f"  - {url}")

        # Check for hardcoded image URLs
        if 'scontent.cdninstagram.com' in js_code:
            print("\nFound hardcoded Instagram CDN image URL (video thumbnail)")

        break
