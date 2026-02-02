# 🤖 DEVI - FULL AUTOMATION PLAN

**Goal**: Make Devi a fully autonomous AI influencer with her own Instagram, TikTok, blog, posting weekly with voice, face, videos, and newsletter promotion.

---

## 💰 WEEKLY COST BREAKDOWN

### Current Costs (Already Running):
| Service | Purpose | Weekly Cost |
|---------|---------|-------------|
| Bright Data | Instagram scraping (50 posts) | $3.75 |
| OpenAI GPT-4o-mini | AI trend analysis | $0.50 |
| Mailjet | Email delivery | $0 (free tier) |
| Google Sheets | Data storage | $0 (free) |
| Google Analytics | Click tracking | $0 (free) |
| **CURRENT TOTAL** | | **$4.25/week** |

---

### NEW COSTS - Full Automation:

#### PHASE 1: Visual Identity (One-time setup)
| Service | Purpose | Cost |
|---------|---------|------|
| **Midjourney** | Generate Devi's face/character (100 variations) | $30/month (one month) |
| **Canva Pro** (optional) | Design Instagram carousels | $13/month or use free tier |
| **TOTAL PHASE 1** | | **$30-43 one-time** |

#### PHASE 2: Video + Voice Automation (Weekly)
| Service | Purpose | Weekly Cost |
|---------|---------|-------------|
| **HeyGen** | AI video generation (Devi talking to camera) | $8/week ($29/month ÷ 4) |
| **ElevenLabs** | AI voice for Devi (consistent voice) | $1.25/week ($5/month ÷ 4) |
| **Runway ML** (optional) | Advanced video editing/effects | $3.75/week ($15/month ÷ 4) |
| **TOTAL PHASE 2** | | **$9.25-13/week** |

#### PHASE 3: Social Media Automation (Weekly)
| Service | Purpose | Weekly Cost |
|---------|---------|-------------|
| **Instagram Graph API** | Auto-posting to Instagram | $0 (free) |
| **TikTok API** (approval needed) | Auto-posting to TikTok | $0 (free) |
| **Apify** (alternative) | Instagram/TikTok posting automation | $1.25/week ($5/month ÷ 4) |
| **TOTAL PHASE 3** | | **$0-1.25/week** |

#### PHASE 4: Blog Automation (Weekly)
| Service | Purpose | Weekly Cost |
|---------|---------|-------------|
| **WordPress** | Blog hosting | $1/week ($4/month) |
| **Cloudinary** | Image hosting/CDN | $0 (free tier) |
| **TOTAL PHASE 4** | | **$1/week** |

---

## 🎯 TOTAL WEEKLY COST (Full Automation)

| Tier | What You Get | Weekly Cost |
|------|--------------|-------------|
| **BASIC** (current) | Newsletter only | **$4.25** |
| **STANDARD** | + AI videos + voice | **$13.50-17.25** |
| **PREMIUM** | + Auto-posting + blog | **$14.50-19.50** |

**Recommended**: Start with **STANDARD tier** ($13.50-17.25/week) = **$54-69/month**

---

## 📋 ACCOUNTS & CREDENTIALS NEEDED

### ✅ Already Set Up:
- [x] OpenAI account + API key
- [x] Bright Data account + API token
- [x] Google Sheets (OAuth)
- [x] Mailjet SMTP
- [x] Google Analytics

### 🆕 Need to Create:

#### For Devi's Social Media Presence:
1. **Instagram Account for @devine.me**
   - ⚠️ **YES, create a NEW Instagram account** specifically for Devi
   - Username: `@devine.me` or `@devi.fashionai` (check availability)
   - Set up as **Creator/Business account** (required for API access)
   - Fill out bio with newsletter link
   - Add profile picture (Devi's AI-generated face)

2. **TikTok Account for Devi**
   - ⚠️ **YES, create a NEW TikTok account** for Devi
   - Username matching Instagram
   - Apply for **TikTok Creator API** access (can take 1-2 weeks)

3. **Facebook Developer Account**
   - Required for Instagram Graph API
   - Create app → Get Instagram access token
   - Set up permissions: `instagram_basic`, `instagram_content_publish`

#### For Visual Content Generation:
4. **Midjourney Account**
   - Sign up: https://midjourney.com
   - Subscribe to **Standard plan** ($30/month)
   - Use for 1 month to generate 100+ Devi images

5. **HeyGen Account**
   - Sign up: https://heygen.com
   - **Creator plan** ($29/month) - includes 15 min video/month
   - Upload Devi's face → Create AI avatar

6. **ElevenLabs Account**
   - Sign up: https://elevenlabs.io
   - **Starter plan** ($5/month) - 30,000 characters/month
   - Create custom voice for Devi

#### For Automation:
7. **Apify Account** (alternative to official APIs)
   - Sign up: https://apify.com
   - Free tier: $5 credit/month
   - Use if Instagram/TikTok APIs denied

8. **WordPress/Blog Hosting**
   - Option A: WordPress.com ($4/month)
   - Option B: Lovable + custom domain (already have?)

---

## 🚀 IMPLEMENTATION ROADMAP

### ✅ DONE (Current State):
- [x] Email newsletter automation
- [x] AI trend analysis
- [x] Instagram scraping
- [x] Content generation (blog, IG, TikTok scripts)
- [x] **File saving (blog HTML, IG script, TikTok script to Desktop)** ✅ NEW!
- [x] **Auto-open blog in browser for preview** ✅ NEW!

---

### 📅 WEEK 1-2: Visual Identity (Devi's Face)

**Goal**: Create Devi as a consistent AI character

#### Step 1: Generate Devi's Face (Midjourney)
```
Midjourney prompts to use:

1. Base character:
"beautiful AI fashion influencer woman, age 25-30, warm smile,
confident expression, modern style, photorealistic portrait,
studio lighting, professional photography, fashion magazine quality"

2. Multiple expressions:
- Smiling: "...warm genuine smile..."
- Serious: "...confident determined expression..."
- Excited: "...enthusiastic happy expression..."
- Thinking: "...thoughtful contemplative look..."

3. Multiple poses:
- Direct to camera (for TikTok hooks)
- Side profile (for carousel slides)
- Fashion pose (for Instagram feed)
- Casual candid (for stories)

Generate 20-30 base images, pick best one, create 100+ variations.
```

**Deliverable**:
- 1 main Devi face (profile picture)
- 50+ expressions/poses for videos
- 50+ fashion poses for carousels

**Cost**: $30 (one-time)

---

### 📅 WEEK 2-3: Video Generation Setup (Devi Talks!)

**Goal**: Make Devi talk on camera about fashion trends

#### Step 2: Create HeyGen AI Avatar
1. Upload best Devi face to HeyGen
2. Train avatar (takes 24-48 hours)
3. Test with sample script: "Hey loves! This week in fashion..."

#### Step 3: Create ElevenLabs Voice
1. Choose voice type: Warm, friendly, enthusiastic
2. Generate sample: Read TikTok script
3. Fine-tune: Speed, tone, emphasis

#### Step 4: Test Full Video Generation
- Input: TikTok script from n8n workflow
- Output: 30-60s video of Devi talking
- Save to: `C:\Users\user\Desktop\devi-video-week-XX.mp4`

**Deliverable**:
- HeyGen avatar trained
- Custom voice created
- First test video generated

**New weekly cost**: +$9.25

---

### 📅 WEEK 3-4: Instagram Automation

**Goal**: Auto-post carousels to Instagram every Monday

#### Step 5: Set Up Instagram Business Account
1. Create @devine.me account
2. Switch to Business/Creator account
3. Connect to Facebook Page
4. Get Instagram Graph API access

#### Step 6: Design Carousel Templates
Option A: Manual (use Canva)
- Create 7 slide templates
- Add Devi's face, text overlays
- Export as images

Option B: Automated (use n8n + Cloudinary)
- Generate images with text overlays
- Use Devi's poses from Midjourney
- Auto-create carousel format

#### Step 7: Add Instagram Posting to n8n Workflow
New nodes to add:
1. **Generate Carousel Images** (from IG script)
2. **Upload to Instagram** (Graph API)
3. **Post Carousel** (with caption from workflow)

**Deliverable**:
- @devine.me Instagram active
- First carousel auto-posted
- Monitor engagement

**New weekly cost**: $0-1.25 (if using Apify)

---

### 📅 WEEK 4-5: TikTok Automation

**Goal**: Auto-post videos to TikTok every Monday

#### Step 8: Set Up TikTok Account + API
1. Create TikTok account for Devi
2. Apply for TikTok Creator API (1-2 weeks approval)
3. Alternative: Use Apify TikTok Actor

#### Step 9: Add TikTok Posting to n8n Workflow
New nodes to add:
1. **Generate Video** (HeyGen API)
2. **Add Captions** (auto-generate from script)
3. **Upload to TikTok** (API or Apify)

**Deliverable**:
- TikTok account active
- First video auto-posted
- Monitor views/engagement

**New weekly cost**: Already included in HeyGen/ElevenLabs

---

### 📅 WEEK 5-6: Blog Automation

**Goal**: Auto-publish blog posts every Monday

#### Step 10: Set Up WordPress
1. Create WordPress.com site or use Lovable
2. Custom domain: `devi.fashion` or `devine.me`
3. Get WordPress API credentials

#### Step 11: Add Blog Posting to n8n Workflow
New nodes to add:
1. **Format Blog Post** (already generated)
2. **Upload to WordPress** (WordPress API)
3. **Publish Post** (set to Monday 10 AM)

**Deliverable**:
- Blog live
- First post auto-published
- Newsletter CTAs working

**New weekly cost**: +$1/week

---

## 🎨 DEVI'S INSTAGRAM STRATEGY

### Profile Setup:
```
Username: @devine.me
Name: Devi | AI Fashion Insights
Bio:
✨ AI Fashion Analyst
💜 Weekly Trend Reports
🎤 Voice Chat on Site
💌 Newsletter → [link]
📧 ortal@onsight-analytics.com

Profile Picture: Devi's main AI face
Highlights:
- This Week
- Products
- Newsletter
- Voice Chat
```

### Content Calendar (Every Monday):
| Time | Content | Purpose |
|------|---------|---------|
| 10:00 AM | Instagram Carousel (7 slides) | Share trends + products |
| 2:00 PM | Instagram Reels (30-60s) | Devi talking about trends |
| 6:00 PM | Instagram Story | "Link in bio for newsletter!" |

### Engagement Strategy:
- Auto-reply to comments (OpenAI + Instagram API)
- Repost user content (with permission)
- Weekly giveaway (product from newsletter)

---

## 🔧 n8n WORKFLOW ADDITIONS NEEDED

### New Nodes to Add (Phase 2-4):

```
Current workflow:
... → Devi Content Generators → Save Files → Email

NEW workflow branches:

1. INSTAGRAM BRANCH:
Devi IG Script → Generate Carousel Images → Upload to Instagram → Post

2. TIKTOK BRANCH:
Devi TikTok Script → Generate Video (HeyGen) → Add Voice (ElevenLabs) → Upload to TikTok → Post

3. BLOG BRANCH:
Devi Blog HTML → Format for WordPress → Upload Images → Publish Post

4. ANALYTICS BRANCH:
Check Instagram Analytics → Check TikTok Analytics → Log to Google Sheets
```

---

## 🎯 PRIORITY ORDER (What to Build First)

### Phase 1: FILE SAVING (✅ DONE TODAY!)
- ✅ Save blog HTML to Desktop
- ✅ Save Instagram script to Desktop
- ✅ Save TikTok script to Desktop
- ✅ Auto-open blog in browser

**Status**: COMPLETE! Test now by running workflow.

---

### Phase 2: VISUAL IDENTITY (Start This Week)
**Priority**: HIGH
**Time**: 2-3 days
**Cost**: $30 one-time

1. Subscribe to Midjourney ($30)
2. Generate Devi's face (50+ images)
3. Create style guide

**Why first**: Need Devi's face before videos/carousels

---

### Phase 3: VIDEO GENERATION (Week 2)
**Priority**: HIGH
**Time**: 3-4 days
**Cost**: $9.25/week ongoing

1. Set up HeyGen ($29/month)
2. Set up ElevenLabs ($5/month)
3. Test video generation
4. Add to n8n workflow

**Why second**: Most engaging content format

---

### Phase 4: INSTAGRAM AUTOMATION (Week 3)
**Priority**: MEDIUM
**Time**: 5-7 days
**Cost**: $0-1.25/week

1. Create @devine.me Instagram
2. Set up Business account
3. Get API access
4. Auto-post carousels

**Why third**: Main social media platform

---

### Phase 5: TIKTOK + BLOG (Week 4-5)
**Priority**: LOW (Nice to have)
**Time**: 5-7 days
**Cost**: +$1/week

1. TikTok account + API
2. WordPress setup
3. Auto-posting

**Why last**: Can do manually at first

---

## 📊 SUCCESS METRICS

### Week 1 (Current):
- [ ] Newsletter sent to 10+ subscribers
- [ ] Files saved successfully
- [ ] Blog HTML opens in browser

### Week 4 (After Phase 2):
- [ ] Devi's face generated (100+ images)
- [ ] First AI video created
- [ ] Video plays in browser preview

### Week 8 (After Phase 3):
- [ ] @devine.me Instagram active
- [ ] First carousel auto-posted
- [ ] 100+ followers gained

### Week 12 (After Phase 4):
- [ ] TikTok account active
- [ ] Blog auto-publishing
- [ ] 1,000+ Instagram followers
- [ ] 100+ newsletter subscribers

---

## ⚠️ IMPORTANT NOTES

### Instagram/TikTok Account Setup:
**YES, you need to create NEW accounts for Devi:**
- Use a new email: `devi@your-domain.com` or `devine.fashion@gmail.com`
- Set up as Business/Creator account (required for API)
- Don't use your personal account
- Devi is her own identity/brand

### API Approval Timeline:
- **Instagram Graph API**: Instant (if Facebook app approved)
- **TikTok Creator API**: 1-2 weeks approval process
- **Backup plan**: Use Apify (no approval needed)

### Content Quality:
- **Week 1-4**: Manual review before posting (test phase)
- **Week 5+**: Fully automated (once you trust it)

### Legal/Disclosure:
- Add to bio: "AI-powered fashion insights"
- Be transparent: Devi is AI, not hiding it
- Affiliate disclosure in every post

---

## 🎉 WHAT YOU'LL HAVE (Final State)

### Every Monday at 9 AM:
1. ✅ Bright Data scrapes Instagram (automatic)
2. ✅ AI analyzes trends (automatic)
3. ✅ Devi generates content (automatic)
4. ✅ Blog post published (automatic)
5. ✅ Instagram carousel posted (automatic)
6. ✅ TikTok video posted (automatic)
7. ✅ Newsletter sent to subscribers (automatic)
8. ✅ Analytics logged (automatic)

### What you do:
- **Week 1-4**: Review content before posting
- **Week 5+**: Check analytics, reply to comments (optional)
- **Monthly**: Review performance, adjust strategy

### What Devi does:
- Analyzes fashion trends
- Creates content (blog, IG, TikTok)
- Posts on all platforms
- Sends newsletter
- Promotes newsletter on social
- Engages with followers (optional AI auto-reply)

---

## 💡 NEXT STEPS (What to Do RIGHT NOW)

### Today:
1. ✅ **Test the updated workflow** (file saving + browser preview)
   - Run "Manual Test Trigger"
   - Check Desktop for files:
     - `devi-blog-week-48.html`
     - `devi-instagram-week-48.txt`
     - `devi-tiktok-week-48.txt`
   - Blog should open in browser automatically
   - **Review Devi's content quality**

2. ✅ **Disable Google Sheets node** (since it's erroring)
   - In n8n, find "📊 Google Sheets - Log Overview"
   - Click → Disable
   - We'll set this up later

### This Week:
3. **Subscribe to Midjourney** ($30)
   - Go to: https://midjourney.com
   - Subscribe to Standard plan
   - Join Discord server
   - Start generating Devi's face

4. **Create Instagram account for Devi**
   - Username: @devine.me (or alternative)
   - Switch to Business account
   - Start posting manually (for now)

### Next Week:
5. **Set up HeyGen + ElevenLabs**
   - Subscribe to both services
   - Create Devi's avatar
   - Generate first test video

6. **Add video generation to workflow**
   - I'll help you add the nodes
   - Connect HeyGen API
   - Test video generation

---

## 📞 SUPPORT

If you get stuck:
1. **Instagram API issues**: Try Apify instead
2. **TikTok API denied**: Use Apify Instagram Reels upload
3. **Video generation too expensive**: Start with image carousels only
4. **Need help with n8n nodes**: Let me know, I'll add them

---

**TOTAL INVESTMENT**:
- **Setup**: $30-43 one-time (Midjourney + optional Canva)
- **Ongoing**: $14.50-19.50/week ($58-78/month)
- **ROI**: If you get 100+ newsletter subscribers → potential $500+/month from affiliate commissions

**THIS IS DOABLE! Let's start with testing file saving TODAY!** 🚀
