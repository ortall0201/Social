import json

# Read the workflow
with open('old_workflows/production8 - Apify scraper PRODUCTION NEW !!!!!!.json', 'r', encoding='utf-8') as f:
    workflow = json.load(f)

# Find the "Prepare Email with Products" node
for node in workflow['nodes']:
    if node['name'] == 'Prepare Email with Products':
        js_code = node['parameters']['jsCode']

        # Check for video/reel sections
        if 'Instagram Video' in js_code or 'reel' in js_code.lower():
            print("YES - Video section found in newsletter!")

            # Find the video section
            start = js_code.find('Instagram Video')
            if start != -1:
                end = start + 1000
                video_section = js_code[start:end]
                print("\n=== VIDEO SECTION ===")
                print(video_section[:500])
        else:
            print("NO - No video section found in newsletter")

        break
