# Simple Image Search for Newsletter - n8n Native Options

## Option 1: SerpAPI Node (Easiest - Recommended)

**If you have SerpAPI community node installed:**

### Setup:
1. Install SerpAPI community node in n8n (if not already):
   - Go to: Settings → Community Nodes
   - Search: `n8n-nodes-serpapi`
   - Install

2. Get FREE SerpAPI key:
   - Go to: https://serpapi.com/
   - Sign up (FREE: 100 searches/month)
   - Copy API key

3. In workflow, add SerpAPI node:
   - Operation: **Google Images**
   - Query: `={{ $json.top_trends[0] }} fashion`
   - Number of results: `3`
   - API Key: Your SerpAPI key

**Pros:**
- ✅ Super simple - just drag & drop node
- ✅ 100 free searches/month
- ✅ High-quality Google Image results
- ✅ No complicated setup

**Cons:**
- Requires installing community node

---

## Option 2: Unsplash API (FREE, Unlimited)

**Free stock photos - no API key limits!**

### Setup:
1. Get Unsplash API key:
   - Go to: https://unsplash.com/developers
   - Sign up FREE
   - Create app → Copy Access Key

2. Add HTTP Request node:
   ```
   Method: GET
   URL: https://api.unsplash.com/search/photos
   Query Parameters:
     - query: {{ $json.top_trends[0] }} fashion
     - per_page: 3
     - orientation: landscape
   Headers:
     - Authorization: Client-ID YOUR_ACCESS_KEY
   ```

3. Extract image URL in Code node:
   ```javascript
   const results = $json.results;
   const heroImage = results[0]?.urls?.regular || 'fallback-url';
   return [{ json: { hero_image_url: heroImage } }];
   ```

**Pros:**
- ✅ Completely FREE (50 requests/hour)
- ✅ Beautiful high-quality fashion photos
- ✅ No complicated Google setup
- ✅ Simple HTTP Request node

**Cons:**
- Stock photos (not real-time news images)
- May not have specific events like "Bad Bunny Super Bowl"

---

## Option 3: DuckDuckGo Search (Completely Free)

**No API key needed at all!**

### Setup:
Use HTTP Request to DuckDuckGo's unofficial image API:

```
Method: GET
URL: https://api.duckduckgo.com/
Query Parameters:
  - q: {{ $json.top_trends[0] }} fashion
  - format: json
  - t: devi-newsletter
```

**Pros:**
- ✅ No API key required
- ✅ Completely free
- ✅ Real search results

**Cons:**
- Unofficial API (may change)
- Limited image quality control

---

## 🎯 My Recommendation:

### For REAL trending images (Super Bowl, red carpet):
→ **SerpAPI** (100 free/month is perfect for weekly newsletter)

### For STOCK fashion images (reliable, always works):
→ **Unsplash** (unlimited free requests)

### For NO API KEY at all:
→ **DuckDuckGo** (quick and dirty)

---

## Quick Setup - SerpAPI (Best Option):

1. Sign up: https://serpapi.com/users/sign_up
2. Copy API key
3. In n8n:
   - Add Community Node: `n8n-nodes-serpapi`
   - Add SerpAPI node to workflow
   - Configure:
     - Engine: Google Images
     - Query: `={{ $json.top_trends[0] }} fashion`
     - API Key: [your key]
   - Connect to your blog generator

Done! 🎉

**FREE tier: 100 searches/month = 25 newsletters/month!**

Which option do you prefer?
