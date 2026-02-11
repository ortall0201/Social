# SerpAPI Setup Guide for Devi Newsletter

## Step 1: Create SerpAPI Account

1. **Go to**: https://serpapi.com/users/sign_up

2. **Fill in the form**:
   - Email: [your email]
   - Password: [create password]
   - Click **"Sign Up"**

3. **Verify email** (check inbox)

4. **You're in!** You'll see the dashboard

## Step 2: Get Your API Key

1. You should see your **API Key** on the dashboard immediately
   - It looks like: `a1b2c3d4e5f6...` (long string)

2. **Copy the API key** (click the copy icon)

3. **Save it** somewhere safe (you'll need it in 2 minutes)

## Step 3: Install SerpAPI Community Node in n8n

1. **Open n8n**

2. **Click the user icon** (top right) → **Settings**

3. **Go to**: **Community Nodes** (left sidebar)

4. **Click**: **"Install Community Node"** button

5. **Enter**: `n8n-nodes-serpapi`

6. **Click**: **"Install"**

7. **Wait 30-60 seconds** for installation

8. You'll see: **"Successfully installed n8n-nodes-serpapi"** ✓

## Step 4: Add SerpAPI Credential in n8n

1. **Close Settings**, go back to workflow editor

2. **Click**: **Credentials** menu (left sidebar, looks like a key icon)

3. **Click**: **"Add Credential"** (top right)

4. **Search**: Type "serpapi" in the search box

5. **Click**: **"SerpAPI"** from the list

6. **Paste your API key** in the field

7. **Name it**: "SerpAPI" (or any name you like)

8. **Click**: **"Save"**

## Step 5: Import Updated Workflow

1. **Export your current workflow** (as backup):
   - Click ⋮ (three dots) → Download

2. **Import the new workflow**:
   - Click ⋮ → Import from File
   - Select: `old_workflows/production8 - Apify scraper PRODUCTION NEW !!!!!!.json`
   - Click **"Import"**

3. **Open the workflow**

4. **Find the node**: "🖼️ SerpAPI Image Search"

5. **Click on it**

6. **Select your credential**:
   - Click the "Credential" dropdown
   - Select "SerpAPI" (the one you just created)

7. **Click**: **"Save"** (top right)

## Step 6: Test It!

1. **Click**: **"Execute Workflow"** button

2. **Watch the nodes execute**:
   - Format Final Report ✓
   - 🖼️ SerpAPI Image Search ✓ (this will search Google Images)
   - 📸 Extract Hero Image ✓
   - Devi Blog Post Generator ✓

3. **Check the output**:
   - Click on "📸 Extract Hero Image" node
   - Look at the output JSON
   - You should see: `hero_image_url: "https://...image.jpg"`

4. **Check your newsletter**:
   - Look in `devi-content/week-X/blog.html`
   - You should see a beautiful hero image below the headline!

## Troubleshooting

### "Community node not found"
- Make sure you typed: `n8n-nodes-serpapi` (with hyphens)
- Wait a minute and try again
- Restart n8n if needed

### "API key invalid"
- Make sure you copied the entire key
- Check for extra spaces
- Get a new key from SerpAPI dashboard

### "No images returned"
- Check your headline has searchable terms
- Try a simpler search query
- Check SerpAPI dashboard for usage/errors

## Free Tier Info

✓ **100 searches per month FREE**
✓ No credit card required
✓ Perfect for weekly newsletter (4-5 uses/month)
✓ Auto-renews monthly

## What Happens Now?

Every time your workflow runs:
1. AI generates exciting headline (e.g., "Bad Bunny's Super Bowl Look")
2. SerpAPI searches Google Images for that trend
3. Gets top 3 high-quality images
4. Newsletter displays the best image as hero
5. Your readers see TRENDING, CURRENT fashion images!

---

**You're all set!** 🎉

Your newsletter now has:
✓ Pink trendy design
✓ NYT-style fonts
✓ Professional section separators
✓ Confidence boosters
✓ AUTO-FETCHED trending hero images
✓ Better engagement and WOW factor!
