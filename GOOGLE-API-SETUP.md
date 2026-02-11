# Google Custom Search API Setup for Devi Newsletter

## Step 1: Create Google Cloud Project

1. Go to: https://console.cloud.google.com/
2. Click **"Select a project"** (top left, near Google Cloud logo)
3. Click **"NEW PROJECT"**
4. Name it: **"Devi Newsletter"**
5. Click **"CREATE"**
6. Wait 10 seconds for project to be created

## Step 2: Enable Custom Search API

1. In the Google Cloud Console, click the **☰ menu** (top left)
2. Go to: **"APIs & Services"** → **"Library"**
3. Search for: **"Custom Search API"**
4. Click on **"Custom Search API"**
5. Click **"ENABLE"** button
6. Wait for it to enable (5-10 seconds)

## Step 3: Create API Key

1. Click **☰ menu** → **"APIs & Services"** → **"Credentials"**
2. Click **"+ CREATE CREDENTIALS"** (top of page)
3. Select **"API key"**
4. A popup shows your API key: **"AIza..."**
5. **COPY THIS KEY** and save it somewhere safe!
6. Click **"RESTRICT KEY"** (recommended for security)
7. Under **"API restrictions"**, select **"Restrict key"**
8. Check only: **"Custom Search API"**
9. Click **"SAVE"**

✅ **You now have your API KEY!**

## Step 4: Create Custom Search Engine

1. Go to: https://programmablesearchengine.google.com/
2. Click **"Add"** button
3. Fill in the form:
   - **Search engine name**: `Devi Fashion Trends`
   - **What to search**: Select **"Search the entire web"**
   - **SafeSearch**: Keep **ON**
4. Click **"Create"**
5. Click **"Customize"** on your new search engine
6. Find **"Search engine ID"** (looks like: `0123456789abcdef:xyz`)
7. **COPY THIS ID** and save it!

✅ **You now have your SEARCH ENGINE ID!**

## Step 5: Configure Image Search

1. Still in the "Customize" page
2. Scroll down to **"Image search"**
3. Turn **ON** the toggle for "Image search"
4. Click **"Update"**

✅ **Image search is now enabled!**

## Step 6: Add Credentials to n8n

1. Open n8n
2. Go to: **Settings** (gear icon) → **Credentials**
3. Click **"Add Credential"**
4. Search for: **"HTTP Request"** or create **"Custom Credential"**

Since n8n doesn't have built-in Google Custom Search credential, we'll use HTTP Request with Query Parameters:

**Option A: Use Generic Auth (Easiest)**

The workflow is already configured! Just add these as environment variables in n8n:

- In the HTTP Request node, the URL parameters include:
  - `key`: Your API Key from Step 3
  - `cx`: Your Search Engine ID from Step 4

**Option B: Create Custom Credential**

1. Click **"Add Credential"** → **"Generic Credential Type"**
2. Name: `Google Custom Search API`
3. Add fields:
   - Field 1: `apiKey` = [Your API Key]
   - Field 2: `searchEngineId` = [Your Search Engine ID]

## Step 7: Update Workflow Nodes

1. Re-import the workflow in n8n
2. Open node: **"🖼️ Fetch Trending Image from Google"**
3. In the **URL Parameters (qs)**, update:
   - `key`: Replace with your actual API key OR use `={{$credentials.apiKey}}`
   - `cx`: Replace with your actual Search Engine ID OR use `={{$credentials.searchEngineId}}`
4. Click **"Save"**

## Testing

1. Run the workflow
2. Check the **"🖼️ Fetch Trending Image from Google"** node output
3. You should see JSON with image results!
4. The **"📸 Extract Hero Image"** node will grab the first image URL
5. Your newsletter will now have the trending hero image!

## Troubleshooting

**Error: "API key not valid"**
- Make sure you copied the entire key (starts with `AIza...`)
- Check that Custom Search API is enabled in Step 2

**Error: "Invalid Value"**
- Check that Search Engine ID is correct (format: `abc123:xyz`)
- Make sure Image Search is turned ON in Step 5

**No images returned:**
- Check that your headline has searchable terms
- Try searching manually on Google Images to verify results exist
- Make sure SafeSearch is not blocking results

## Free Tier Limits

✅ **100 queries per day** = FREE
✅ Perfect for weekly newsletter (4-5 queries/month)
✅ No credit card required!

If you need more than 100/day, pricing is $5 per 1,000 queries.

---

**Quick Reference:**
- API Console: https://console.cloud.google.com/apis/credentials
- Search Engine: https://programmablesearchengine.google.com/
- API Docs: https://developers.google.com/custom-search/v1/overview
