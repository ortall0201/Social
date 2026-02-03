# Devi Videos Output Folder

This folder stores the generated images and videos created by the **Devi Viral Video Generator** workflow.

## Folder Structure

```
devi-videos/
├── images/           # Generated images from ElevenLabs
├── videos/           # Generated videos from OpenArt
├── concepts/         # JSON files with concept details
└── archive/          # Archived content (older than 30 days)
```

## File Naming Convention

### Images
```
devi-image-{run_id}-{concept_id}.png
Example: devi-image-20251229103045-001-c1.png
```

### Videos
```
devi-video-{run_id}-{concept_id}.mp4
Example: devi-video-20251229103045-001-c1.mp4
```

### Concepts
```
devi-concept-{run_id}.json
Example: devi-concept-20251229103045-001.json
```

## Concept JSON Schema

Each concept file contains the selected video concept and metadata:

```json
{
  "run_id": "20251229103045-001",
  "timestamp": "2025-12-29T10:30:45.123Z",
  "selected_concept": {
    "concept_id": "c1",
    "title": "Pastel Winter Layers",
    "hook_text": "Layer up, stay cozy",
    "on_screen_text": "Winter vibes only",
    "visual_direction": "Soft focus, pastel tones, layered outfit transition",
    "image_prompt": "K-pop idol in pastel winter coat, soft pink background",
    "video_prompt": "Smooth outfit reveal, upbeat K-pop music",
    "why_it_works": "Trending aesthetic + seasonal relevance"
  },
  "scraped_handles": ["fashionista_us", "kstyle_daily"],
  "image_url": "https://elevenlabs.io/generated/abc123.png",
  "video_url": "https://openart.ai/videos/xyz789.mp4",
  "status": "success"
}
```

## Storage Options

### Option 1: Local Storage (Current)
Files are saved locally in this folder.

### Option 2: Cloud Storage (Recommended for Production)
Configure the workflow to save to:
- **AWS S3**: Set `AWS_S3_BUCKET` environment variable
- **Google Drive**: Use Google Drive node in n8n
- **Dropbox**: Use Dropbox node in n8n

## Cleanup Policy

To prevent storage overflow:
- Archive videos older than 30 days to `archive/` folder
- Delete archive content older than 90 days
- Keep concept JSON files indefinitely (small size)

## Usage Notes

1. **Download Generated Assets**: After each workflow run, assets are logged in `../logs/devi-runs.csv`
2. **Review Before Publishing**: Always review generated videos before posting to social media
3. **Backup Important Content**: Copy successful videos to a separate backup location
4. **Monitor Disk Space**: Check folder size regularly if using local storage

## Integration with Workflow

The main workflow (`devi-viral-video-generator.json`) automatically:
1. Downloads images from ElevenLabs
2. Downloads videos from OpenArt
3. Saves concept metadata as JSON
4. Logs file paths to Google Sheets

## Manual File Management

To manually save files, add these nodes to the workflow:

```javascript
// Node: Download Image
const fs = require('fs');
const path = require('path');
const https = require('https');

const imageUrl = $json.image_url;
const runId = $('Set Run Variables').item.json.run_id;
const conceptId = $json.selected_concept.concept_id;
const fileName = `devi-image-${runId}-${conceptId}.png`;
const filePath = path.join(__dirname, '../../devi-videos/images/', fileName);

// Download logic here
```

## Questions?

See the main workflow documentation in `workflows/devi-viral-video-generator.json` or contact the workflow maintainer.
