import json

# Read the workflow
with open('old_workflows/production8 - Apify scraper PRODUCTION NEW !!!!!!.json', 'r', encoding='utf-8') as f:
    workflow = json.load(f)

# Find and update the AI prompt for better headlines
for node in workflow['nodes']:
    if node['name'] == 'Prepare AI Analysis':
        js_code = node['parameters']['jsCode']

        # Add trending headline instruction
        new_instruction = """
TRENDING HEADLINE RULES (CRITICAL):
- Create headlines that feel CURRENT and EXCITING
- Reference popular culture moments (award shows, sports events, celebrity moments)
- Make it feel like BREAKING FASHION NEWS
- Examples of exciting headlines:
  • "Bad Bunny's Super Bowl Look Just Changed the Fashion Game"
  • "The Grammy's Red Carpet Moment Everyone's Copying"
  • "This Confidence Hack From [Event] Is Going Viral"
- Connect the headline to what you see in the Instagram posts
- Make readers think "I NEED to know this!"

CONFIDENCE BOOSTER (MANDATORY):
- Include a confidence-boosting message that relates to the main trend
- Examples:
  • "Your style doesn't need permission to shine"
  • "Confidence looks good on everyone - here's how to wear it"
  • "The best accessory? Owning who you are"
- Place it prominently in the summary section
"""

        # Insert before "Instagram Posts (anonymized):"
        js_code = js_code.replace(
            'Instagram Posts (anonymized):',
            new_instruction + '\nInstagram Posts (anonymized):'
        )

        node['parameters']['jsCode'] = js_code
        print("Updated AI prompt for exciting headlines")
        break

# Find and update the blog generator for pink design
for node in workflow['nodes']:
    if node['name'] == 'Devi Blog Post Generator':
        # Create new pink-themed HTML template with NYT fonts
        new_blog_template = '''        "jsCode": "// DEVI BLOG POST GENERATOR - PINK TRENDY DESIGN
const content = $json;

// Parse the summary to extract sections
const summaryParts = content.summary.split('**');
const headline = content.summary.split('\\\\n')[0];
const vibe = summaryParts.find(p => p.includes('THE VIBE:'))?.split('THE VIBE:')[1]?.split('\\\\n\\\\n')[0]?.trim() || '';
const looks = summaryParts.find(p => p.includes('THE LOOKS:'))?.split('THE LOOKS:')[1]?.split('\\\\n\\\\n')[0]?.trim() || '';
const colors = summaryParts.find(p => p.includes('THE COLORS & TEXTURES:'))?.split('THE COLORS & TEXTURES:')[1]?.split('\\\\n\\\\n')[0]?.trim() || '';
const takeaway = summaryParts.find(p => p.includes('THE TAKEAWAY:'))?.split('THE TAKEAWAY:')[1]?.trim() || '';

// Confidence booster (extract from summary or create one)
const confidenceBooster = "Your style doesn't need permission to shine. Own it. 💕";

// Varied introductions for each trend
const trendIntros = [
  'This trend is taking over feeds and for good reason.',
  'I spotted this styled in the most creative ways this week.',
  'Can we talk about how stunning this trend looks?',
  'This is the confidence boost your wardrobe needs.',
  'Everyone's doing this - and you should too.'
];

const trendSections = content.trends.slice(0, 3).map((trend, i) => {
  const product = content.products[i];
  const intro = trendIntros[i % trendIntros.length];
  return `
    <div style="background: #ffffff; border-radius: 16px; padding: 28px; margin-bottom: 24px; border-left: 5px solid #FF1493; box-shadow: 0 2px 12px rgba(255,20,147,0.08);">
      <h3 style="color: #1a1a1a; font-size: 22px; font-weight: 700; margin: 0 0 14px 0; font-family: 'Libre Baskerville', Georgia, serif; line-height: 1.3;">
        ${trend}
      </h3>
      <p style="color: #4a4a4a; font-size: 16px; line-height: 1.7; margin: 0 0 18px 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
        ${intro} ${content.recommendations[i] || 'Style it with confidence and make it yours.'}
      </p>
      ${product ? `
      <div style="background: linear-gradient(135deg, #FFF0F5 0%, #FFE4E9 100%); border-radius: 12px; padding: 20px; margin-top: 18px; border: 1px solid #FFB6C1;">
        <p style="color: #FF1493; font-size: 13px; font-weight: 700; margin: 0 0 10px 0; text-transform: uppercase; letter-spacing: 1px;">✨ Shop This Look</p>
        <p style="color: #1a1a1a; font-size: 17px; font-weight: 600; margin: 0 0 6px 0;">${product.name}</p>
        <p style="color: #666; font-size: 15px; margin: 0 0 16px 0;">${product.brand} • ${product.price}</p>
        <a href="${product.url}" style="display: inline-block; background: linear-gradient(135deg, #FF1493 0%, #FF69B4 100%); color: #ffffff; text-decoration: none; padding: 12px 28px; border-radius: 25px; font-size: 15px; font-weight: 600; box-shadow: 0 4px 12px rgba(255,20,147,0.3);">Shop Now →</a>
      </div>
      ` : ''}
    </div>
  `;
}).join('');

const blogPost = {
  ...content,
  blog_html: `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link href="https://fonts.googleapis.com/css2?family=Libre+Baskerville:wght@400;700&family=Playfair+Display:wght@700;900&display=swap" rel="stylesheet">
  <title>${headline}</title>
</head>
<body style="margin: 0; padding: 0; background: linear-gradient(180deg, #FFF5F7 0%, #ffffff 100%); font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
  <div style="max-width: 650px; margin: 0 auto; background-color: #ffffff;">

    <!-- Header - NYT Style with Pink -->
    <div style="background: linear-gradient(135deg, #FF1493 0%, #FF69B4 50%, #FFB6C1 100%); padding: 50px 36px; text-align: center; position: relative; overflow: hidden;">
      <div style="position: absolute; top: 0; left: 0; right: 0; bottom: 0; background: url('data:image/svg+xml,<svg xmlns=\\"http://www.w3.org/2000/svg\\" viewBox=\\"0 0 1200 120\\"><path d=\\"M0,0 Q300,60 600,30 T1200,0 L1200,120 L0,120 Z\\" fill=\\"rgba(255,255,255,0.1)\\"/></svg>') no-repeat bottom; background-size: cover; opacity: 0.3;"></div>
      <div style="position: relative; z-index: 1;">
        <div style="background: rgba(255,255,255,0.95); display: inline-block; padding: 10px 24px; border-radius: 30px; margin-bottom: 20px; backdrop-filter: blur(10px);">
          <p style="color: #FF1493; font-size: 13px; font-weight: 700; margin: 0; text-transform: uppercase; letter-spacing: 2px;">🌟 Devi's Fashion Signals</p>
        </div>
        <h1 style="color: #ffffff; font-size: 36px; font-weight: 900; margin: 0 0 16px 0; line-height: 1.2; text-shadow: 0 3px 8px rgba(0,0,0,0.2); font-family: 'Playfair Display', 'Libre Baskerville', Georgia, serif; letter-spacing: -0.5px;">
          ${headline}
        </h1>
        <p style="color: rgba(255,255,255,0.95); font-size: 15px; margin: 0; font-weight: 500;">By Devi (Devine) • ${new Date(content.issue_date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
      </div>
    </div>

    <!-- Confidence Booster Alert -->
    <div style="background: linear-gradient(135deg, #FFE4E9 0%, #FFF0F5 100%); padding: 24px 36px; border-bottom: 3px solid #FF69B4; border-top: 3px solid #FF69B4;">
      <p style="color: #FF1493; font-size: 18px; line-height: 1.6; margin: 0; font-weight: 600; text-align: center; font-style: italic;">
        💕 ${confidenceBooster}
      </p>
    </div>

    <!-- Intro Section -->
    <div style="padding: 40px 36px;">
      <div style="background: linear-gradient(135deg, #FFF0F5 0%, #FFE4E9 100%); border-radius: 16px; padding: 28px; margin-bottom: 36px; border: 2px solid #FFB6C1;">
        <p style="color: #1a1a1a; font-size: 17px; line-height: 1.8; margin: 0; font-weight: 500;">
          ✨ ${vibe}
        </p>
      </div>

      <!-- The Vibe Summary - NYT Style -->
      <div style="margin-bottom: 32px;">
        <h2 style="color: #1a1a1a; font-size: 28px; font-weight: 700; margin: 0 0 20px 0; padding-bottom: 16px; border-bottom: 3px solid #FF1493; font-family: 'Libre Baskerville', Georgia, serif;">
          This Week's Vibe
        </h2>
        <div style="background: #ffffff; border-left: 5px solid #FF69B4; padding: 24px; margin-bottom: 16px; box-shadow: 0 2px 12px rgba(255,20,147,0.08);">
          <p style="color: #2a2a2a; font-size: 16px; line-height: 1.8; margin: 0 0 18px 0;"><strong style="color: #FF1493; font-size: 15px; text-transform: uppercase; letter-spacing: 0.5px;">The Looks:</strong> ${looks}</p>
          <p style="color: #2a2a2a; font-size: 16px; line-height: 1.8; margin: 0 0 18px 0;"><strong style="color: #FF1493; font-size: 15px; text-transform: uppercase; letter-spacing: 0.5px;">Colors & Textures:</strong> ${colors}</p>
          <p style="color: #FF1493; font-size: 17px; line-height: 1.8; margin: 0; font-weight: 700; font-style: italic;">${takeaway}</p>
        </div>
      </div>

      <!-- Trends Section -->
      <h2 style="color: #1a1a1a; font-size: 28px; font-weight: 700; margin: 40px 0 24px 0; padding-bottom: 16px; border-bottom: 3px solid #FF1493; font-family: 'Libre Baskerville', Georgia, serif;">
        Trends You Need to Know
      </h2>
      ${trendSections}

      <!-- Color Palette -->
      <div style="background: linear-gradient(135deg, #FFF0F5 0%, #FFE4E9 100%); border-radius: 16px; padding: 28px; margin: 40px 0; border: 2px solid #FFB6C1;">
        <h3 style="color: #FF1493; font-size: 22px; font-weight: 700; margin: 0 0 16px 0; font-family: 'Libre Baskerville', Georgia, serif;">🎨 Color Story</h3>
        <div style="display: flex; gap: 12px; flex-wrap: wrap;">
          ${content.colors.slice(0, 3).map(color => `
            <span style="background: #ffffff; color: #FF1493; padding: 10px 20px; border-radius: 25px; font-size: 15px; font-weight: 600; display: inline-block; border: 2px solid #FFB6C1; box-shadow: 0 2px 8px rgba(255,20,147,0.1);">${color}</span>
          `).join('')}
        </div>
      </div>

      <!-- Shop Section -->
      <h2 style="color: #1a1a1a; font-size: 28px; font-weight: 700; margin: 40px 0 24px 0; padding-bottom: 16px; border-bottom: 3px solid #FF1493; font-family: 'Libre Baskerville', Georgia, serif;">
        Shop the Trends 💕
      </h2>
      <div style="display: grid; gap: 20px;">
        ${content.products.map(p => `
          <div style="background: linear-gradient(135deg, #ffffff 0%, #FFF5F7 100%); border: 2px solid #FFB6C1; border-radius: 16px; padding: 24px; transition: all 0.3s; box-shadow: 0 4px 16px rgba(255,20,147,0.1);">
            <h3 style="color: #1a1a1a; font-size: 20px; font-weight: 700; margin: 0 0 10px 0;">${p.name}</h3>
            <p style="color: #FF1493; font-size: 15px; margin: 0 0 6px 0; font-weight: 600;">${p.brand}</p>
            <p style="color: #666; font-size: 15px; margin: 0 0 20px 0;">${p.price}</p>
            <a href="${p.url}" style="display: inline-block; background: linear-gradient(135deg, #FF1493 0%, #FF69B4 100%); color: #ffffff; text-decoration: none; padding: 12px 32px; border-radius: 25px; font-size: 15px; font-weight: 600; box-shadow: 0 4px 12px rgba(255,20,147,0.3);">Shop Now →</a>
          </div>
        `).join('')}
      </div>
      <p style="color: #999; font-size: 13px; font-style: italic; margin: 20px 0 0 0; text-align: center;">
        Contains affiliate links. I may earn a small commission at no extra cost to you. I only recommend products I truly love! 💕
      </p>

      <!-- CTA Section - Pink Gradient -->
      <div style="background: linear-gradient(135deg, #FF1493 0%, #FF69B4 100%); border-radius: 20px; padding: 40px; text-align: center; margin: 50px 0 0 0; box-shadow: 0 8px 24px rgba(255,20,147,0.3);">
        <h2 style="color: #ffffff; font-size: 28px; font-weight: 700; margin: 0 0 14px 0; font-family: 'Playfair Display', Georgia, serif;">💌 Join the Community</h2>
        <p style="color: rgba(255,255,255,0.95); font-size: 17px; margin: 0 0 24px 0; font-weight: 500;">Get exclusive fashion insights & confidence boosters every week</p>
        <a href="https://design-link-luxe.lovable.app" style="display: inline-block; background: #ffffff; color: #FF1493; text-decoration: none; padding: 16px 40px; border-radius: 30px; font-size: 17px; font-weight: 700; box-shadow: 0 6px 16px rgba(0,0,0,0.2);">Subscribe Now ✨</a>
        <p style="color: rgba(255,255,255,0.9); font-size: 14px; margin: 20px 0 0 0;">
          Weekly trends • Style tips • Confidence boosters • Free forever 💕
        </p>
      </div>
    </div>

    <!-- Footer -->
    <div style="background: #1a1a1a; padding: 28px 36px; text-align: center;">
      <p style="color: #FFB6C1; font-size: 14px; margin: 0;">© ${new Date().getFullYear()} Devi Fashion Signals. Empowering your style & confidence.</p>
    </div>
  </div>
</body>
</html>
`,
  blog_markdown: `# ${headline}\\\\n\\\\nBy Devi (Devine) • ${new Date(content.issue_date).toLocaleDateString()}\\\\n\\\\n${confidenceBooster}\\\\n\\\\n${vibe}\\\\n\\\\n## Trends You Need to Know\\\\n\\\\n${content.trends.slice(0, 3).map((t, i) => `### ${i+1}. ${t}\\\\n\\\\n${trendIntros[i]}\\\\n\\\\n${content.products[i] ? `**Shop**: ${content.products[i].name} by ${content.products[i].brand} - [Get it here](${content.products[i].url})` : ''}`).join('\\\\n\\\\n')}\\\\n\\\\n## Shop the Trends 💕\\\\n\\\\n${content.products.map((p, i) => `${i + 1}. **${p.name}** by ${p.brand} (${p.price}) – [Shop here](${p.url})`).join('\\\\n')}\\\\n\\\\n*Contains affiliate links. I earn a small commission at no extra cost to you.*\\\\n\\\\n## 💌 Join the Community\\\\n\\\\nGet exclusive fashion insights & confidence boosters every week! [Subscribe now](https://design-link-luxe.lovable.app) 💕`
};

return [{ json: blogPost }];"'''

        node['parameters']['jsCode'] = new_blog_template
        print("Updated blog generator with pink trendy design")
        break

# Save the updated workflow
with open('old_workflows/production8 - Apify scraper PRODUCTION NEW !!!!!!.json', 'w', encoding='utf-8') as f:
    json.dump(workflow, f, indent=2, ensure_ascii=False)

print("\nNewsletter upgraded successfully!")
print("- Pink color scheme (matching devisignals.com)")
print("- NYT-style headline fonts (Libre Baskerville, Playfair Display)")
print("- Exciting trending headlines")
print("- Confidence booster messaging")
print("- Better engagement structure")
