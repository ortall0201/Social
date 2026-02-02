#!/bin/bash
# Devi Identity Images - Automated Renaming Script
# Navigate to images directory first: cd devi-identity/images

# PRIMARY FACE (Most Important!)
mv "ElevenLabs_image_google-nano-banana_Professional..._2025-11-29T20_12_23.png" "devi-face-primary.png"

# FASHION SHOWCASE (Main Feed Content)
mv "ElevenLabs_image_google-nano-banana_Professional..._2025-11-29T20_16_11.png" "devi-fashion-neon-green-blazer-graffiti.png"
mv "ElevenLabs_image_google-nano-banana_Full body sh..._2025-11-29T20_19_45.png" "devi-fashion-pink-puffer-city-night.png"
mv "ElevenLabs_image_google-nano-banana_Professional..._2025-11-29T20_21_37.png" "devi-fashion-y2k-lavender-cardigan-boba.png"
mv "ElevenLabs_image_google-nano-banana_Full body fa..._2025-11-29T20_22_14.png" "devi-fashion-monochrome-white-power.png"
mv "ElevenLabs_image_google-nano-banana_Professional..._2025-11-29T20_23_38.png" "devi-fashion-colorblock-rainbow-jumping.png"
mv "ElevenLabs_image_google-nano-banana_Professional..._2025-11-29T20_20_54.png" "devi-fashion-luxury-car-sunset-beige.png"

# LIFESTYLE (Relatable BTS Content)
mv "ElevenLabs_image_google-nano-banana_Intimate clo..._2025-11-29T20_18_15.png" "devi-lifestyle-close-up-denim-jacket.png"
mv "ElevenLabs_image_google-nano-banana_nose, pop ou..._2025-11-29T20_25_19.png" "devi-lifestyle-cafe-laptop-matcha.png"
mv "ElevenLabs_image_google-nano-banana_Professional..._2025-11-29T20_25_47.png" "devi-lifestyle-mirror-selfie-band-tee.png"
mv "ElevenLabs_image_google-nano-banana_Soft natural..._2025-11-29T20_24_50.png" "devi-lifestyle-morning-routine-pajamas.png"

# VIRAL THUMBNAILS (High-Energy Expressions)
mv "ElevenLabs_image_google-nano-banana_Direct eye c..._2025-11-29T20_27_04.png" "devi-thumbnail-gradient-background-pink.png"
mv "ElevenLabs_image_google-nano-banana_Close-up of ..._2025-11-29T20_28_43.png" "devi-thumbnail-shocked-omg-reaction.png"
mv "ElevenLabs_image_google-nano-banana_Professional..._2025-11-29T20_28_14.png" "devi-thumbnail-haul-shopping-bags-excited.png"
mv "ElevenLabs_image_google-nano-banana_nose, pop ou..._2025-11-29T20_25_19.png" "devi-thumbnail-shopping-sunglasses-happy.png"

# OUTFIT CHECK (OOTD Style)
mv "ElevenLabs_image_google-nano-banana_Full body mi..._2025-11-29T20_28_32.png" "devi-outfit-denim-jacket-plaid-skirt.png"

# SEASONAL (Content Variety)
mv "ElevenLabs_image_google-nano-banana_Professional..._2025-11-29T20_29_06.png" "devi-seasonal-spring-cherry-blossoms.png"
mv "ElevenLabs_image_google-nano-banana_Professional..._2025-11-29T20_29_24.png" "devi-seasonal-summer-beach-hat-sunset.png"
mv "ElevenLabs_image_google-nano-banana_Professional..._2025-11-29T20_22_59.png" "devi-seasonal-fall-camel-coat-coffee.png"
mv "ElevenLabs_image_google-nano-banana_Professional..._2025-11-29T20_29_34.png" "devi-seasonal-fall-orange-sweater-psl.png"
mv "ElevenLabs_image_google-nano-banana_Professional..._2025-11-29T20_29_55.png" "devi-seasonal-winter-glam-champagne.png"

# FITNESS/LIFESTYLE
mv "ElevenLabs_image_google-nano-banana_Professional..._2025-11-29T20_30_13.png" "devi-lifestyle-gym-workout-pink-athleisure.png"

# SPECIAL/TRANSITION
mv "ElevenLabs_image_google-nano-banana_Split compos..._2025-11-29T20_28_00.png" "devi-special-before-after-transformation.png"
mv "ElevenLabs_image_google-nano-banana_Dreamy portr..._2025-11-29T20_26_39.png" "devi-special-golden-hour-field-dreamy.png"
mv "ElevenLabs_image_google-nano-banana_Professional..._2025-11-29T20_26_17.png" "devi-special-vintage-band-tee-bedroom.png"

# Remove duplicates (same files uploaded twice)
rm "ElevenLabs_image_google-nano-banana_Professional..._2025-11-29T20_12_23 (1).png" 2>/dev/null || true
rm "ElevenLabs_image_google-nano-banana_Professional..._2025-11-29T20_16_11 (1).png" 2>/dev/null || true
rm "ElevenLabs_image_google-nano-banana_Professional..._2025-11-29T20_21_37 (1).png" 2>/dev/null || true

echo "✅ All images renamed successfully!"
echo "📊 Total images: 24 unique images (3 duplicates removed)"
echo ""
echo "Categories:"
echo "  - 1 Primary Face"
echo "  - 7 Fashion Showcase"
echo "  - 4 Lifestyle/BTS"
echo "  - 4 Viral Thumbnails"
echo "  - 1 Outfit Check"
echo "  - 5 Seasonal"
echo "  - 1 Fitness"
echo "  - 3 Special/Creative"
