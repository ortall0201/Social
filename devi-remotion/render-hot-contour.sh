#!/bin/bash

# Hot Contour Edit Render Script
# Renders the hot contour smart edit combining the two Devi reels

echo "🎬 Rendering Hot Contour Edit..."
echo ""

# With text version
echo "📝 Rendering version with text..."
npx remotion render HotContourEdit-WithText "../devi-videos/videos/hot-contour-edit-with-text.mp4" --overwrite

echo ""
echo "✅ Rendering complete!"
echo ""
echo "📁 Output location: devi-videos/videos/hot-contour-edit-with-text.mp4"
echo ""
echo "🎨 Features:"
echo "  • Hot contour color grading (warm, saturated, high contrast)"
echo "  • Smooth fade transitions between clips"
echo "  • Cinematic vignette effect"
echo "  • Dynamic entrance animations"
echo "  • On-screen text: 'Confidence' → 'Unstoppable'"
echo ""
echo "To preview in Remotion Studio:"
echo "  npm start"
echo ""
echo "To render the clean version (no text):"
echo "  npx remotion render HotContourEdit-Clean ../devi-videos/videos/hot-contour-edit-clean.mp4"
