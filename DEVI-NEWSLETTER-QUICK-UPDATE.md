# 🚀 Quick Update: Add Newsletter CTA to Devi Posts

**Time needed**: 10 minutes
**Goal**: Make every Devi post include newsletter subscription link

---

## Step 1: Add Newsletter URL Node (2 min)

### In your n8n workflow:

1. **Add a "Set" node** at the beginning (after Schedule/Manual Trigger)
2. **Name it**: "Set Newsletter URL"
3. **Add these values**:

```
Field 1:
Name: NEWSLETTER_SIGNUP_URL
Value: https://your-project.lovable.app

Field 2 (optional):
Name: INSTAGRAM_BIO_CTA
Value: Link in bio to subscribe for weekly fashion insights! 💌

Field 3 (optional):
Name: BLOG_CTA
Value: Want weekly fashion insights delivered to your inbox? Subscribe to my newsletter for exclusive trends, color palettes, and styling tips! 💌
```

**Screenshot of Set node**:
```
┌─────────────────────────────────┐
│ Set Newsletter URL              │
├─────────────────────────────────┤
│ Name: NEWSLETTER_SIGNUP_URL     │
│ Value: https://yoursite.app     │
├─────────────────────────────────┤
│ Name: INSTAGRAM_BIO_CTA         │
│ Value: Link in bio...💌         │
├─────────────────────────────────┤
│ Name: BLOG_CTA                  │
│ Value: Want weekly...💌         │
└─────────────────────────────────┘
```

---

## Step 2: Update Devi System Prompt (5 min)

### For EVERY OpenAI node that generates Devi content:

**Current System Prompt** (what you have now):
```
You are part of an automated n8n-based Fashion Insights system.

[Security contract...]

DEVI PERSONA
You are Devi (Devine), an AI fashion influencer...
[Persona details...]

CURRENT TASK:
Create Instagram carousel caption...
```

**Updated System Prompt** (what you need):
```
You are part of an automated n8n-based Fashion Insights system.

[Security contract...]

DEVI PERSONA
You are Devi (Devine), an AI fashion influencer...

What Devi ALWAYS Does:
✅ Gives honest recommendations
✅ Explains WHY a trend works
✅ Links products naturally in context
✅ Includes newsletter subscription CTA in EVERY post

Newsletter Subscription CTA (MANDATORY):
For Instagram/TikTok: "{{ $node["Set Newsletter URL"].json.INSTAGRAM_BIO_CTA }}"
For Blog Posts: "{{ $node["Set Newsletter URL"].json.BLOG_CTA }}"
Newsletter URL: {{ $node["Set Newsletter URL"].json.NEWSLETTER_SIGNUP_URL }}

CURRENT TASK:
Create Instagram carousel caption...

MANDATORY: End caption with newsletter CTA (link in bio)
```

**Where to add this**:
- Copy the full updated system prompt from `docs/DEVI_SECURE_SYSTEM_PROMPT.md`
- Paste into the "System Message" field of your OpenAI node
- Add the n8n variables for newsletter URL

---

## Step 3: Update Instagram/TikTok Bio (3 min)

### Instagram Bio (@devine.me):
```
Devi 💜 Fashion Insider
✨ Weekly trend reports
🛍️ Style tips & picks
📧 Newsletter 👇
```

**Link**: `https://your-project.lovable.app`

### TikTok Bio (@devine.me):
```
Devi 💜 AI Fashion Bestie
Weekly fashion trends 🔥
Newsletter 👇
```

**Link**: `https://your-project.lovable.app`

---

## Step 4: Test It! (2 min)

### Test your workflow:

1. Click "Manual Test Trigger"
2. Let workflow run
3. Check Devi Instagram Caption node output
4. **Verify ending includes**: "Link in bio to subscribe for weekly fashion insights! 💌"

**Example output**:
```
Oversized blazers are everywhere this week! 🔥 The tailored-yet-relaxed
vibe is so chic. I'm loving how influencers are pairing them with
slip dresses and chunky boots.

Want weekly fashion insights like this delivered to your inbox?
Link in bio to subscribe for exclusive trends! 💌

#fashiontrends #styleinspo #ootd #devinefashion
```

✅ **If you see "Link in bio" CTA** → SUCCESS! You're done!
❌ **If no CTA** → Check that you updated the system prompt correctly

---

## 📋 Quick Checklist

- [ ] Add "Set Newsletter URL" node with your landing page URL
- [ ] Update Devi OpenAI nodes with new system prompt
- [ ] Update Instagram bio with link to landing page
- [ ] Update TikTok bio with link to landing page
- [ ] Test workflow → Verify CTA appears in output
- [ ] Deploy landing page (if not already live)

---

## 🎯 Before vs After

### ❌ BEFORE (No CTA):
```
Oversized blazers are everywhere this week! 🔥
I'm loving this trend!

#fashiontrends #styleinspo #ootd
```

### ✅ AFTER (With CTA):
```
Oversized blazers are everywhere this week! 🔥
I'm loving this trend!

Link in bio to subscribe for weekly fashion insights! 💌

#fashiontrends #styleinspo #ootd
```

---

## 🔗 Your Landing Page URL

**Get your URL**:

1. **Lovable deployment** (recommended):
   - Go to Lovable project
   - Click "Deploy"
   - Get URL: `https://your-project.lovable.app`

2. **Vercel/Netlify**:
   - Deploy `figma-connect-landing` folder
   - Get URL: `https://devinefashion.vercel.app`

3. **Custom domain** (optional):
   - Add custom domain: `https://devine.fashion`
   - Point DNS to hosting provider
   - Use custom domain in bio

**For testing**:
- Use `http://localhost:5173` temporarily
- Replace with production URL before going live!

---

## 🆘 Common Issues

### "Variable not found error"
```
Error: $node["Set Newsletter URL"] not found
```
**Fix**:
- Check node name is exactly "Set Newsletter URL"
- Check node is BEFORE Devi content nodes in workflow
- Check spelling in variable reference

### "CTA not showing in output"
**Fix**:
- Verify you updated the system prompt
- Check "MANDATORY: Include newsletter CTA" is in prompt
- Test with a fresh workflow execution

### "Bio link not clickable"
**Fix**:
- Instagram/TikTok only allows ONE link in bio
- Make sure you set it in profile settings
- Test by viewing your profile and clicking link

---

## ✨ Done!

You've successfully added newsletter CTA to all Devi posts!

**What happens now**:
1. Devi posts on Instagram → "Link in bio" CTA
2. User clicks bio link → Goes to your landing page
3. User subscribes → Gets weekly newsletter
4. More subscribers = More engaged audience! 📈

**See full guide**: `DEVI-NEWSLETTER-CTA-SETUP.md`

---

*Every post now drives newsletter growth! 💜*
