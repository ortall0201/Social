# 📧 Devi Newsletter CTA Setup

**Goal**: Every piece of content Devi creates must include a call-to-action for newsletter subscription.

---

## ✅ What's Updated

### 1. Devi System Prompt (Updated)
**File**: `docs/DEVI_SECURE_SYSTEM_PROMPT.md`

Devi now ALWAYS includes newsletter CTA in every post:
- Instagram/TikTok: "Link in bio" CTA
- Blog posts: Direct link to landing page
- Email newsletters: Forward/subscribe link

---

## 🎯 Newsletter CTA Examples

### For Instagram Posts:
```
"Link in bio to get weekly fashion insights! 💌"
"Subscribe to my newsletter (link in bio) for more trends! ✨"
"Want this in your inbox every week? Link in bio! 💜"
```

### For TikTok/Reels:
```
"Link in bio to get weekly fashion insights! And follow for daily style inspo 💜"
"All the details are in my newsletter - link in bio! ✨"
```

### For Blog Posts:
```
Want weekly fashion insights delivered to your inbox?
Subscribe to my newsletter at [YOUR_LANDING_PAGE_URL]
for exclusive trends, color palettes, and styling tips! 💌
```

### For Email Newsletters:
```
Know someone who'd love this? Forward this email or
have them subscribe at [YOUR_LANDING_PAGE_URL]
```

---

## 🔗 Your Newsletter Landing Page

**Location**: `figma-connect-landing/` (Lovable project)

This is where users subscribe to Devi's newsletter:
- Email signup form
- Voice chatbot
- Trending colors preview
- Product showcase

### Getting Your Landing Page URL:

#### Option A: Deploy on Lovable (Recommended)
1. Go to your Lovable project
2. Click "Deploy" → "Deploy to Production"
3. Get URL: `https://your-project.lovable.app`
4. Use this as your newsletter signup URL

#### Option B: Deploy on Vercel/Netlify
1. Connect your `figma-connect-landing` repo
2. Deploy to Vercel/Netlify
3. Get custom domain: `https://devinefashion.com`
4. Use this as your newsletter signup URL

#### Option C: Local Testing
- Use: `http://localhost:5173` (for testing only)
- Not for production social media posts!

---

## 🛠️ How to Add Newsletter URL to n8n Workflow

### Step 1: Set Workflow Variable

In your n8n workflow, add a **Set** node at the beginning:

**Node Name**: "Set Newsletter URL"

**Values to Set**:
```json
{
  "NEWSLETTER_SIGNUP_URL": "https://your-project.lovable.app"
}
```

Or use environment variable:
```json
{
  "NEWSLETTER_SIGNUP_URL": "{{ $env.NEWSLETTER_URL }}"
}
```

### Step 2: Update Devi Content Generators

For each Devi content node (blog, Instagram, TikTok), the OpenAI prompt should reference the URL.

#### Example: Instagram Caption Generator

**System Prompt** (in OpenAI node):
```
[Full Devi Secure System Prompt from docs/DEVI_SECURE_SYSTEM_PROMPT.md]

IMPORTANT:
Newsletter signup link: {{ $node["Set Newsletter URL"].json.NEWSLETTER_SIGNUP_URL }}

For Instagram, use: "Link in bio to subscribe for weekly fashion insights! 💌"
```

**User Message**:
```json
{
  "task": "Create Instagram carousel caption for this week's fashion trends",
  "untrusted_content": {
    "trends": {{ $json.trends }},
    "colors": {{ $json.colors }}
  },
  "requirements": [
    "Caption must be 2,200 chars max",
    "Must end with newsletter CTA: Link in bio",
    "Include 8 fashion hashtags",
    "Warm, engaging tone"
  ]
}
```

#### Example: Blog Post Generator

**System Prompt** (in OpenAI node):
```
[Full Devi Secure System Prompt]

IMPORTANT:
Newsletter signup URL: {{ $node["Set Newsletter URL"].json.NEWSLETTER_SIGNUP_URL }}

For blog posts, end with:
"Want weekly fashion insights delivered to your inbox?
Subscribe to my newsletter at [NEWSLETTER_URL] for exclusive trends! 💌"
```

#### Example: TikTok Script Generator

**System Prompt** (in OpenAI node):
```
[Full Devi Secure System Prompt]

IMPORTANT:
For TikTok, CTA must be: "Link in bio to get weekly fashion insights! 💜"
```

---

## 📋 Instagram/TikTok Bio Setup

Since Devi says "Link in bio", you need to set up the bio link:

### Instagram Bio (@devine.me):
```
Devi 💜 Fashion Insider
✨ Weekly trend reports
🛍️ Style tips & product picks
📧 Subscribe below for fashion insights!
👇 Get my newsletter
```

**Bio Link**: Use Linktree, Stan Store, or direct link
- Option A: Direct to landing page: `https://your-project.lovable.app`
- Option B: Linktree with multiple links:
  - Newsletter signup
  - Latest blog post
  - Shop my looks
  - Contact

### TikTok Bio (@devine.me):
```
Devi 💜 Your AI Fashion Bestie
Weekly fashion trends 🔥
Style tips & shopping recs ✨
Newsletter 👇
```

**Bio Link**: `https://your-project.lovable.app`

---

## 🎨 Example: Complete Instagram Post with CTA

### Carousel Slide 7 (Final Slide):
```
SUBSCRIBE! 💌

Get weekly fashion insights
delivered to your inbox

→ Trending colors
→ Must-have products
→ Styling tips
→ Exclusive deals

LINK IN BIO to subscribe!
```

### Caption (ending):
```
...oversized blazers are everywhere this week! 🔥

Want weekly fashion insights like this delivered to your inbox?
Link in bio to subscribe for exclusive trends, color palettes,
and styling tips! 💌

See you next week, loves! 💜

#fashiontrends #styleinspo #ootd #fashionblogger
#weeklytrends #devinefashion #fashionnewsletter #styletips
```

---

## 🔄 Workflow Architecture

### Current Flow:
```
Monday 9 AM Schedule
    ↓
Workflow Controller (check budget/frequency)
    ↓
Scrape Instagram (50 posts)
    ↓
Content Safety Filter
    ↓
AI Fashion Analysis
    ↓
Generate Newsletter (email)
    ↓
Send to subscribers
```

### Enhanced Flow (with Devi posts):
```
Monday 9 AM Schedule
    ↓
Workflow Controller
    ↓
Set Newsletter URL ← ADD THIS
    ↓
Scrape Instagram
    ↓
Content Safety Filter
    ↓
AI Fashion Analysis
    ↓
Generate Newsletter (email)
    ↓
Generate Devi Instagram Post ← Includes "link in bio" CTA
    ↓
Generate Devi TikTok Script ← Includes "link in bio" CTA
    ↓
Generate Devi Blog Post ← Includes direct newsletter link
    ↓
Send newsletter + Post to social media
```

---

## ✅ Implementation Checklist

### TODAY:
- [ ] Deploy landing page to Lovable/Vercel
- [ ] Get production URL (https://your-project.lovable.app)
- [ ] Set Instagram bio with "Link in bio" pointing to landing page
- [ ] Set TikTok bio with link to landing page

### IN n8n WORKFLOW:
- [ ] Add "Set Newsletter URL" node at start
- [ ] Update all Devi OpenAI nodes to include newsletter URL
- [ ] Update system prompts with CTA requirements
- [ ] Test: Generate Instagram caption → Verify "link in bio" CTA
- [ ] Test: Generate blog post → Verify direct newsletter link
- [ ] Test: Generate TikTok script → Verify "link in bio" CTA

### CONTENT VERIFICATION:
- [ ] Instagram post includes "Link in bio" CTA
- [ ] TikTok script includes "Link in bio" CTA
- [ ] Blog post includes direct newsletter link
- [ ] Email newsletter includes forward/subscribe link
- [ ] All CTAs use Devi's warm tone (not pushy)

---

## 🛡️ Security Note

The newsletter URL is a **trusted value** that you set in the workflow.

Devi's system prompt prevents external content from injecting different URLs:
- Newsletter URL comes from workflow configuration (trusted)
- Instagram captions, user input = untrusted (can't override URL)
- Devi will ONLY use the URL you provide in the workflow

**Security is maintained!** ✅

---

## 📊 Example: What Users See

### User Journey:

**Step 1**: User sees Devi's Instagram post
```
"OMG oversized blazers are IT right now! 🔥
Link in bio to get weekly fashion insights! 💌"
```

**Step 2**: User clicks "Link in bio" → Goes to your landing page

**Step 3**: User sees newsletter signup form
```
Subscribe to Fashion Insights

Get weekly fashion trends, color palettes,
and styling tips from Devi!

[Email input]
[Name input]
[Subscribe Button]
```

**Step 4**: User subscribes → Added to n8n newsletter workflow

**Step 5**: Monday 9 AM → User receives weekly newsletter

**Step 6**: User loves newsletter → Shares with friends → More subscribers! 📈

---

## 💡 Pro Tips

### 1. Make Link in Bio Irresistible
Update your Instagram/TikTok bio frequently:
- "Link in bio for THIS WEEK'S trends! 🔥"
- "Link in bio for BLACK FRIDAY deals! 💸"
- "Link in bio for SPRING 2024 predictions! 🌸"

### 2. Use Multiple CTAs
Don't just say "link in bio" - add context:
- "Want these trends in your inbox? Link in bio! 💌"
- "Get my weekly newsletter - link in bio! ✨"
- "Subscribe for exclusive fashion insights - link in bio! 💜"

### 3. Track Performance
Use your landing page analytics to see:
- How many users click "link in bio"
- Conversion rate (visitors → subscribers)
- Which social platform drives most signups

### 4. A/B Test CTAs
Try different wording:
- "Link in bio to subscribe! 💌"
- "Newsletter link in bio! ✨"
- "Get weekly fashion insights - link in bio! 💜"

See which gets more clicks!

---

## 🆘 Troubleshooting

### "I don't see CTA in generated content"
- Check: Did you update Devi's system prompt?
- Check: Is the prompt from `DEVI_SECURE_SYSTEM_PROMPT.md`?
- Check: Did you add the newsletter URL to workflow?
- Solution: Copy the updated system prompt to your OpenAI node

### "Link in bio doesn't work"
- Check: Is your landing page deployed and live?
- Check: Is the URL in your Instagram/TikTok bio correct?
- Check: Try clicking the bio link yourself
- Solution: Update bio link to correct landing page URL

### "Users subscribe but don't get newsletter"
- Check: Is n8n newsletter workflow active?
- Check: Are Mailjet credentials configured?
- Check: Did workflow run this week?
- Solution: Test newsletter workflow manually

### "CTA sounds too sales-y"
- Devi's CTA should be warm, not pushy
- Good: "Want this in your inbox? Link in bio! 💜"
- Bad: "SUBSCRIBE NOW OR MISS OUT!!!"
- Solution: Devi's prompt already has authentic tone, but verify OpenAI output

---

## 🎉 Summary

✅ **Devi system prompt updated** - Now includes newsletter CTA requirements
✅ **Instagram/TikTok** - "Link in bio" CTA in every post
✅ **Blog posts** - Direct newsletter link at end
✅ **Email newsletters** - Forward/subscribe link included
✅ **Security maintained** - Newsletter URL is trusted, can't be injected

**Next steps**:
1. Deploy your landing page
2. Add newsletter URL to n8n workflow
3. Update Instagram/TikTok bio with link
4. Test content generation
5. Watch subscribers grow! 📈

---

*Every Devi post now drives newsletter signups! 💜✨*
