# 🌸 DEVI AI Fashion Influencer - Complete System Documentation

## 🎯 System Overview

**DEVI** (Devine) is a fully automated AI Fashion Influencer that analyzes Instagram trends weekly and creates multi-platform content including blog posts, Instagram carousels, TikTok scripts, and affiliate product recommendations.

**Status**: ✅ FULLY INSTALLED & READY TO USE

---

## 📁 File Structure

```
n8n/
├── workflows/
│   └── fashion-insights-INFLUENCER-PRODUCTS.json ✅ (UPDATED WITH DEVI)
│
├── DEVI SYSTEM FILES:
│   ├── DEVI-PERSONA.md ✅                    # Complete personality guide
│   ├── DEVI-IMAGE-PROMPTS.md ✅             # AI image generation prompts
│   ├── devi-content-nodes.json ✅           # Content generator nodes
│   ├── devi-lovable-update-nodes.json ✅    # Website updater nodes
│   ├── install-devi-system.js ✅            # Installation script (EXECUTED)
│   └── DEVI-SYSTEM-README.md ✅             # This file
│
├── ORIGINAL GUIDES (Reference):
│   ├── AI-INFLUENCER-QUICKSTART.md          # Old MAYA.AI quickstart
│   ├── AI-INFLUENCER-AGENT-GUIDE.md         # Old MAYA.AI full guide
│   ├── EMAIL-DELIVERABILITY-GUIDE.md        # Email DNS setup
│   ├── AFFILIATE-MONETIZATION-GUIDE.md      # Affiliate programs
│   ├── THIS-WEEK-ROADMAP.md                 # 7-day launch plan
│   └── WEEK-1-CHECKLIST.md                  # Week 1 tasks
│
└── figma-connect-landing/                   # Lovable website (target)
    ├── pages/blog/                          # Blog posts (auto-generated)
    ├── public/blog/                         # Blog JSON data
    ├── public/content/
    │   ├── instagram/                       # IG scripts
    │   └── tiktok/                          # TikTok scripts
    └── public/ai_influencer_context.json    # Voice chat context
```

---

## 🌸 Meet Devi

### Core Identity
- **Full Name**: Devine
- **Nickname**: Devi
- **Handle**: @devine.me
- **Age**: Early 20s representation
- **Aesthetic**: Seoul-meets-Paris soft editorial
- **Voice**: Warm, stylish, friendly, authentic, fashion-forward
- **Visual Style**: Non-sexual, elegant, K-beauty meets European minimalism

### What Makes Devi Different
✅ **Authentic** - Real recommendations, honest opinions
✅ **Inclusive** - All body types, budgets, and styles
✅ **Educational** - Explains WHY trends work
✅ **Non-exploitative** - Never pressuring, always empowering
✅ **Consistent** - Same voice, values, every week

---

## ⚙️ How The System Works

### Weekly Automation Flow

```
Monday 9 AM ⏰ Schedule Trigger
    ↓
┌─────────────────────────────────────┐
│  EXISTING WORKFLOW                  │
│  ├─ Scrape Instagram Posts          │
│  ├─ AI Analysis (OpenAI GPT-4)      │
│  ├─ Extract Products & Links        │
│  └─ Format Final Report             │
└─────────────────────────────────────┘
    ↓
    ├─────→ Send Newsletter Email 📧 (existing)
    │
    └─────→ 🌸 DEVI CONTENT SYSTEM (NEW!)
            │
            ├─→ Devi Master Content Generator
            │     ├─→ Blog Post Generator (Markdown + HTML)
            │     ├─→ Instagram Carousel (7-slide script)
            │     └─→ TikTok/Reels (30-60s script)
            │           ↓
            ├─→ Affiliate Link Processor
            │     (Auto-tags Amazon, LTK, Rakuten links)
            │           ↓
            ├─→ Voice Chat Context Generator
            │     (Updates talk points for AI chat)
            │           ↓
            └─→ LOVABLE AUTO-UPDATE
                  ├─→ Blog Page (.tsx React component)
                  ├─→ IG Content JSON
                  ├─→ TikTok Content JSON
                  └─→ Voice Context JSON
```

### Content Generated Every Week

| Content Type | Format | Output | Purpose |
|--------------|--------|--------|---------|
| **Blog Post** | React TSX + JSON | `/pages/blog/[date].tsx` | SEO, detailed breakdown |
| **Instagram** | 7-slide script | `/public/content/instagram/week-X.json` | Social engagement |
| **TikTok/Reels** | 30-60s voiceover | `/public/content/tiktok/week-X.json` | Video scripts |
| **Affiliate Links** | Tagged URLs | Embedded in all content | Monetization |
| **Voice Context** | JSON data | `/public/ai_influencer_context.json` | Chat assistant sync |

---

## 🚀 Getting Started

### Step 1: Import Workflow to n8n (5 minutes)

```bash
# 1. Make sure n8n is running
cd C:\Users\user\Desktop\n8n
pnpm start

# 2. Open browser
# → http://localhost:5678
```

**In n8n UI:**
1. Click **"Workflows"** in sidebar
2. Find: **"fashion-insights-INFLUENCER-PRODUCTS"**
3. Click **"⋮"** (three dots) → **"Import from File"**
4. Select: `workflows/fashion-insights-INFLUENCER-PRODUCTS.json`
5. Click **"Import"**
6. Toggle **"Active"** to ON

**Expected Result:**
- ✅ See 11 new Devi nodes after "Format Final Report"
- ✅ All nodes connected in workflow canvas
- ✅ Workflow active and ready to run

---

### Step 2: Generate Devi Images (30-60 minutes)

Use the prompts in `DEVI-IMAGE-PROMPTS.md` to generate consistent photos of Devi.

**Recommended Tools:**
- **DALL-E 3** (via ChatGPT Plus or API) - Best for realistic portraits
- **Midjourney v6** - Best for editorial fashion style
- **Stable Diffusion** (Realistic Vision V5.1) - Free, self-hosted

**Images to Generate:**

| Image Type | Priority | Use Case | Prompt File Section |
|------------|----------|----------|---------------------|
| Profile Picture | 🔴 CRITICAL | IG/TikTok profile | "Profile Picture (Main Portrait)" |
| Café Portrait | 🟡 High | Blog headers, social posts | "Café Portrait" |
| Rooftop Golden Hour | 🟡 High | Instagram carousel covers | "Rooftop Golden Hour" |
| Boutique Interior | 🟢 Medium | Product-focused posts | "Boutique Interior" |
| Street Style | 🟢 Medium | Blog post variety | "Street Style (European)" |

**Quick Start (DALL-E 3):**
1. Go to ChatGPT Plus or API
2. Copy the **"Example Prompt for First Portrait (RECOMMENDED START)"** from `DEVI-IMAGE-PROMPTS.md`
3. Generate profile picture first
4. Save seed/reference for consistency
5. Generate variations for other scenes

---

### Step 3: Configure Lovable API (10 minutes)

**Option A: Using Lovable API (Recommended)**

1. Get Lovable API token:
   - Go to https://lovable.dev/
   - Project: `figma-connect-landing`
   - Settings → API → Generate Token

2. Add to n8n:
   - n8n → Credentials → **"Add Credential"**
   - Type: **"HTTP Header Auth"**
   - Name: `Lovable API`
   - Header Name: `Authorization`
   - Header Value: `Bearer YOUR_TOKEN_HERE`

3. Update nodes:
   - Open workflow
   - Click **"Write Blog to Lovable"** node
   - Authentication: Select "Lovable API" credential
   - Repeat for **"Write Voice Context to Lovable"** node

**Option B: Using Local File System (Fallback)**

If Lovable API is not available, modify nodes to use Execute Command with local file writes (see `ai-influencer-nodes-fixed.json` for reference).

---

### Step 4: Test the System (15 minutes)

```bash
# 1. In n8n UI, open the workflow
# 2. Click "Test workflow" button (play icon)
# 3. Watch the execution

# Expected timeline:
# - Instagram scrape: ~30s
# - AI analysis: ~20s
# - Content generation: ~10s
# - Lovable updates: ~10s
# Total: ~70 seconds
```

**Verification Checklist:**

- [ ] All nodes turned green (success)
- [ ] No error messages in execution log
- [ ] Check blog post generated:
  ```bash
  ls figma-connect-landing/pages/blog/
  # Should see: YYYY-MM-DD.tsx
  ```
- [ ] Check JSON files created:
  ```bash
  ls figma-connect-landing/public/blog/
  ls figma-connect-landing/public/content/instagram/
  ls figma-connect-landing/public/content/tiktok/
  cat figma-connect-landing/public/ai_influencer_context.json
  ```
- [ ] Visit Lovable site:
  ```
  http://localhost:5173/blog/[today's-date]
  ```

---

## 📊 Content Strategy

### Weekly Content Calendar

| Day | Content | Platform | CTA |
|-----|---------|----------|-----|
| **Monday 9 AM** | Newsletter Email | Email | Read blog + voice chat |
| **Monday 10 AM** | Blog Post Published | Website | Subscribe + shop |
| **Monday 10 AM** | Instagram Carousel | Instagram | Link in bio |
| **Monday 2 PM** | TikTok/Reels Video | TikTok/IG Reels | Link in bio |
| **Throughout Week** | Voice Chat Support | Website | Product questions |

### Content Funnel

```
Instagram/TikTok Post (Discovery)
    ↓ "Link in bio"
Weekly Newsletter Page (Landing)
    ↓ "Read full breakdown"
Blog Post (Deep Dive)
    ↓ "Shop my picks"
Affiliate Product Links (Monetization)
    ↓ "Need help?"
Voice Chat Support (Retention)
```

---

## 💰 Monetization

### Affiliate Programs (Auto-Integrated)

| Program | Commission | Cookie | Best For |
|---------|------------|--------|----------|
| **LTK (ShopLTK)** | 10-20% | 30 days | Fashion, luxury |
| **Amazon Associates** | 4-10% | 24 hours | General products |
| **Rakuten** | 2-15% | 7-30 days | Fashion retailers |
| **RewardStyle** | 15-20% | 30 days | Premium brands |
| **AliExpress** | 5-8% | 30 days | Budget fashion |

### Revenue Projections

| Subscribers | Click-Through | Conversion | Avg Order | Monthly Revenue |
|-------------|---------------|------------|-----------|-----------------|
| 100 | 20 clicks | 2 sales | $80 | $16-32 |
| 500 | 100 clicks | 10 sales | $85 | $85-170 |
| 1,000 | 200 clicks | 20 sales | $90 | $180-360 |
| 5,000 | 1,000 clicks | 100 sales | $95 | $950-1,900 |

**Formula**: `Revenue = Subscribers × 20% × 10% × Average Order × Commission Rate`

### Adding Affiliate IDs

Edit the **"Devi Affiliate Link Processor"** node in n8n:

```javascript
// In the node's JavaScript code:
const affiliatePrograms = {
  amazon: { tag: 'YOUR-AMAZON-TAG-20', domain: 'amazon.com' },
  ltk: { creator_id: 'YOUR-LTK-ID', domain: 'shopltk.com' },
  rakuten: { affiliate_id: 'YOUR-RAKUTEN-ID', domain: 'rakuten.com' }
};

// Replace YOUR-AMAZON-TAG-20, YOUR-LTK-ID, etc. with your actual IDs
```

---

## 🎨 Customization

### Changing Devi's Name

If you want to use a different influencer name:

1. **Update DEVI-PERSONA.md**:
   - Change "Devine" to your chosen name
   - Update handle from `@devine.me`

2. **Update n8n Nodes**:
   - Edit **"Devi Master Content Generator"** node
   - Find: `const intro = ...` section
   - Replace "Devi" in greetings
   - Search/replace across all content generator nodes

3. **Update Documentation**:
   - Rename DEVI-* files to YOUR-NAME-* files
   - Update README references

### Customizing Content Style

Edit these nodes to change Devi's voice:

| Node | What to Change | Example |
|------|----------------|---------|
| **Devi Master Content Generator** | Intro templates | "Hey loves" → "Hi friends" |
| **Devi Blog Post Generator** | Blog tone | Formal vs. casual |
| **Devi Instagram Script Generator** | Slide text style | Short vs. detailed |
| **Devi TikTok Script Generator** | Hook templates | Trendy vs. educational |

### Adding New Affiliate Programs

1. Edit **"Devi Affiliate Link Processor"** node
2. Add program to `affiliatePrograms` object:
   ```javascript
   sharedasale: {
     affiliate_id: 'YOUR-ID',
     merchant_id: 'MERCHANT-ID',
     domain: 'shareasale.com'
   }
   ```
3. Add URL transformation logic:
   ```javascript
   if (product.url.includes('targetmerchant.com')) {
     affiliateUrl = `https://shareasale.com/r.cfm?b=XXXXX&u=${affiliatePrograms.sharedasale.affiliate_id}&m=XXXXX&urllink=${encodeURIComponent(product.url)}`;
   }
   ```

---

## 🔧 Troubleshooting

### Issue: "Cannot find module 'fs'" Error

**Problem**: Code nodes trying to use `fs` module (file system)
**Solution**: Use HTTP Request nodes or Execute Command nodes instead
**Reference**: See `ai-influencer-nodes-fixed.json` for fixed version

---

### Issue: Workflow Import Fails

**Symptoms**: JSON parse error when importing workflow
**Solutions**:
1. Check JSON file is valid: `node -e "console.log(JSON.parse(require('fs').readFileSync('workflows/fashion-insights-INFLUENCER-PRODUCTS.json', 'utf8')))"`
2. Re-run installation: `node install-devi-system.js`
3. Manual import: Copy workflow JSON content directly into n8n

---

### Issue: No Content Generated

**Check These**:
1. **Instagram scraping works**:
   - Test "Scrape Instagram" node individually
   - Verify posts are being retrieved
   - Check API rate limits

2. **OpenAI API connected**:
   - n8n → Credentials → OpenAI
   - Verify API key is valid
   - Check usage limits

3. **Workflow connections**:
   - All nodes should be connected
   - No red error indicators
   - Green success on test run

---

### Issue: Lovable Website Not Updating

**Check These**:
1. **Lovable API credentials**:
   - Credential type: HTTP Header Auth
   - Header: `Authorization: Bearer TOKEN`
   - Token is valid and not expired

2. **Project path correct**:
   - In HTTP Request nodes
   - URL should match your Lovable project ID

3. **Fallback to local writes**:
   ```bash
   # Manually copy generated files
   cp public/blog/*.json figma-connect-landing/public/blog/
   cp pages/blog/*.tsx figma-connect-landing/pages/blog/
   ```

---

### Issue: Images Don't Match Devi's Look

**Solutions**:
1. Use **seed-based generation** (Stable Diffusion):
   - Generate first portrait
   - Note the seed number
   - Use same seed for all variations
   - Only change: clothing, background, lighting

2. Use **reference image** (Midjourney):
   ```
   /imagine [base prompt] --ref https://your-first-image-url --refstyle 0.8
   ```

3. Use **consistent negative prompts**:
   - Always include: "revealing clothing, sexualized, overly smooth skin"

---

## 📈 Optimization Tips

### Improving AI Analysis Quality

1. **Increase posts analyzed**:
   - Edit "Scrape Instagram" node
   - Increase limit from 500 to 1000+

2. **Refine OpenAI prompt**:
   - Edit "Analyze with AI" node
   - Add: "Focus on wearable trends for everyday fashion"
   - Add: "Include budget-friendly alternatives"

### Boosting Engagement

1. **Personalize greetings**:
   - Rotate intro templates weekly
   - Add seasonal references
   - Include subscriber count milestones

2. **Test content timing**:
   - A/B test Monday 9 AM vs. 10 AM
   - Try Tuesday for TikTok posts
   - Track engagement metrics

### Increasing Affiliate Revenue

1. **Add product comparisons**:
   - "Budget vs. Luxury" sections
   - "Dupe Finder" feature

2. **Create urgency**:
   - "Trending this week only"
   - "Before it sells out"
   - (But never fake scarcity!)

3. **Track performance**:
   - Use affiliate dashboard analytics
   - Identify top-converting products
   - Double down on winners

---

## 📚 Additional Resources

### Documentation Files

| File | Purpose | When to Use |
|------|---------|-------------|
| `DEVI-PERSONA.md` | Complete personality guide | Customizing voice/style |
| `DEVI-IMAGE-PROMPTS.md` | AI image generation | Creating Devi photos |
| `EMAIL-DELIVERABILITY-GUIDE.md` | DNS setup for emails | Avoiding spam folder |
| `AFFILIATE-MONETIZATION-GUIDE.md` | Detailed affiliate setup | Adding new programs |
| `THIS-WEEK-ROADMAP.md` | 7-day launch plan | First week guidance |

### External Tools

| Tool | Use Case | Cost |
|------|----------|------|
| **DALL-E 3** | Image generation | $0.04/image |
| **Midjourney** | Fashion editorial images | $10/month |
| **Stable Diffusion** | Free image generation | Free (GPU required) |
| **mail-tester.com** | Test email deliverability | Free |
| **Mailjet** | Email SMTP service | Free (200/day) |
| **Lovable** | Website hosting | Free tier |

---

## 🎯 Success Metrics

### Week 1 Goals
- [ ] 50 email subscribers
- [ ] 100 Instagram followers
- [ ] 50 TikTok followers
- [ ] 10 affiliate clicks
- [ ] 1 affiliate sale

### Month 1 Goals
- [ ] 200 email subscribers
- [ ] 500 Instagram followers
- [ ] 200 TikTok followers
- [ ] 100 affiliate clicks
- [ ] $50-100 in commissions

### Month 3 Goals
- [ ] 1,000 email subscribers
- [ ] 2,000 Instagram followers
- [ ] 1,000 TikTok followers
- [ ] 500 affiliate clicks
- [ ] $200-400 in commissions

---

## 💜 Final Notes

### What Makes This System Unique

1. **100% n8n-Native**: Everything runs in one workflow
2. **Multi-Platform**: Email, blog, IG, TikTok, voice chat
3. **Fully Automated**: Monday 9 AM → complete content suite
4. **Affiliate-First**: Monetization built into every piece
5. **Authentic Voice**: Devi's personality is consistent and genuine

### System Philosophy

Devi exists to make fashion accessible, not intimidating. Every piece of content should:
- **Educate** - Explain why trends work
- **Empower** - Help people feel confident
- **Never exploit** - No fake urgency, no body shaming
- **Always honest** - Real recommendations only

---

## 🚀 You're Ready to Launch!

The Devi AI Fashion Influencer system is fully installed and ready to use.

**Next Steps**:
1. Import workflow to n8n ✅
2. Generate Devi's images 🎨
3. Add affiliate IDs 💰
4. Test the workflow ✅
5. Launch Monday 9 AM! 🚀

**Questions?**
Check the troubleshooting section or review individual documentation files.

**Let's make fashion fun and accessible for everyone! 💜**

---

*Last Updated: 2025-11-27*
*System Version: 1.0*
*Status: Production Ready*
