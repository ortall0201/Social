import json
import re

# Read the workflow
with open('old_workflows/production8 - Apify scraper PRODUCTION NEW !!!!!!.json', 'r', encoding='utf-8') as f:
    workflow = json.load(f)

# Find the "Prepare Email with Products" node
for node in workflow['nodes']:
    if node['name'] == 'Prepare Email with Products':
        js_code = node['parameters']['jsCode']

        # Add likes and comments to influencerPosts mapping
        js_code = js_code.replace(
            'link: post.post_url\n      };',
            'link: post.post_url,\n        likes: post.likes || 0,\n        comments: post.comments || 0\n      };'
        )

        # Update the email HTML to show engagement
        # Find the section that displays post.text and add engagement below it
        js_code = re.sub(
            r"(\$\{post\.text\})</p><a",
            r"\1</p><p style=\"color: #999; font-size: 13px; margin: 0 0 12px 0;\">❤️ \${post.likes?.toLocaleString() || 0} likes • 💬 \${post.comments || 0} comments</p><a",
            js_code
        )

        node['parameters']['jsCode'] = js_code
        print("Updated 'Prepare Email with Products' node")
        break

# Save the updated workflow
with open('old_workflows/production8 - Apify scraper PRODUCTION NEW !!!!!!.json', 'w', encoding='utf-8') as f:
    json.dump(workflow, f, indent=2, ensure_ascii=False)

print("Newsletter updated with Instagram engagement metrics!")
