import json, uuid
from datetime import datetime, timezone

with open('old_workflows/Production_old.json', 'r', encoding='utf-8') as f:
    workflow = json.load(f)

# ─────────────────────────────────────────────────────────────────────────────
# Shared callMCP helper (reused in both new nodes)
# ─────────────────────────────────────────────────────────────────────────────
CALL_MCP = r"""const https = require('https');
const MCP_HOST = 'vuxscfphcqkgkaduzrod.supabase.co';
const MCP_PATH = '/functions/v1/mcp';
const API_KEY  = process.env.MCP_API_KEY || '';

const callMCP = (tool, args) => new Promise((resolve, reject) => {
  const body = JSON.stringify({
    jsonrpc: '2.0', method: 'tools/call',
    params: { name: tool, arguments: { api_key: API_KEY, ...args } },
    id: Date.now()
  });
  const req = https.request({
    hostname: MCP_HOST, path: MCP_PATH, method: 'POST',
    headers: { 'Authorization': `Bearer ${API_KEY}`, 'Content-Type': 'application/json', 'Content-Length': Buffer.byteLength(body) }
  }, res => {
    let raw = '';
    res.on('data', c => raw += c);
    res.on('end', () => {
      try {
        const d = JSON.parse(raw);
        if (d.error) return reject(new Error(d.error.message));
        resolve(JSON.parse(d.result.content[0].text));
      } catch(e) { reject(e); }
    });
  });
  req.on('error', reject);
  req.write(body);
  req.end();
});
"""

# ─────────────────────────────────────────────────────────────────────────────
# Node 1 (NEW): Create Draft & Notify
# Runs once — creates the MCP draft and stores the resume URL for Lovable
# ─────────────────────────────────────────────────────────────────────────────
CREATE_DRAFT_CODE = CALL_MCP + r"""
// Pull data from existing nodes
const insights   = $('Format Final Report').first().json;
const aggregated = $('📦 Content Aggregator').first().json;
const config     = $('🤖 Workflow Controller Agent').first().json;
const allPosts   = $('Filter Posts & Extract Product Links').all();

const weekNumber = Math.ceil((new Date() - new Date(new Date().getFullYear(), 0, 1)) / 604800000);

// Build post selection — top 12 by engagement rate
const posts = allPosts
  .map(i => i.json)
  .filter(p => p?.image_url && p?.post_url)
  .sort((a, b) => (parseFloat(b.engagement_rate) || 0) - (parseFloat(a.engagement_rate) || 0))
  .slice(0, 12)
  .map(p => ({
    image_url: p.image_url,
    post_url:  p.post_url,
    caption:   (p.caption || (Array.isArray(p.hashtags) ? p.hashtags.join(' ') : p.hashtags) || '').toString().slice(0, 120)
  }));

// Create draft — no webhook_url needed, n8n polls for approval instead
const draft = await callMCP('create_newsletter', {
  title:       `Devi Fashion Insights - Week ${weekNumber}`,
  template:    'fashion-weekly',
  data: {
    header: { title: 'Fashion Insights', subtitle: `Week ${weekNumber}`, date: new Date().toLocaleDateString('en-US', { weekday:'long', year:'numeric', month:'long', day:'numeric' }) },
    greeting: 'Your weekly fashion intelligence, curated by AI.',
    summary:  insights.summary || '',
    top_trends:     insights.top_trends    || [],
    popular_colors: insights.popular_colors || [],
    moodboard_images: aggregated.moodboard_images || [],
    featured_posts: posts,
    affiliate_products: (aggregated.affiliate_products || []).map(p => ({ name: p.name, image: p.image, shop_link: p.shop_link })),
    quiz: insights.quiz_question ? { question: insights.quiz_question, options: insights.quiz_options || [], correct_option_index: insights.quiz_correct_index || 0, explanation: insights.quiz_explanation || '' } : undefined,
    next_week_forecast: insights.next_week_focus ? { focus: insights.next_week_focus, summary: insights.next_week_summary || '', mood: insights.next_week_mood || 'stylish', trends_to_watch: insights.next_week_trends || [] } : undefined,
    cta: { text: 'Chat with Devi', url: config.newsletter_url || 'https://design-link-luxe.lovable.app' }
  }
});

return {
  draft_id:    draft.id,
  review_url:  `https://newsletter-studio-to-automation.lovable.app/review/${draft.id}`,
  message:     'Draft created — n8n will poll every 60s until you approve.',
  debug_draft: draft
};
"""

# ─────────────────────────────────────────────────────────────────────────────
# Node 2a (NEW): Fetch Newsletter HTML
# Runs ONCE — fetches approved HTML + seo_data before the subscriber loop
# ─────────────────────────────────────────────────────────────────────────────
FETCH_HTML_CODE = CALL_MCP + r"""
// Called once — not per subscriber
const draft_id = $('Create Draft & Notify').first().json.draft_id;

if (!draft_id) throw new Error('No draft_id found. Did the Create Draft & Notify node run?');

const newsletter = await callMCP('get_newsletter', { newsletter_id: draft_id });
const html = newsletter?.html_output;

if (!html) throw new Error('No approved HTML found. Did you approve the newsletter in Newsletter Studio?');

const insights = $('Format Final Report').first().json;

// Pick best subject line once — AI-ranked if available, fallback to trend-based
const seoSubject = newsletter?.seo_data?.subject_lines?.[0]?.text;
const topTrend   = insights.top_trends?.[0] || 'This Week in Fashion';
const subject    = seoSubject || `${topTrend.substring(0, 55)} - Devi Fashion Intelligence`;

return {
  draft_id,
  html,
  subject
};
"""

# ─────────────────────────────────────────────────────────────────────────────
# Node 2b (MODIFIED): Prepare Email with Products
# Runs per subscriber — NO MCP calls, just reads from Fetch Newsletter HTML
# ─────────────────────────────────────────────────────────────────────────────
PREPARE_EMAIL_CODE = r"""
// Read HTML and subject fetched once upstream — no MCP call here
const fetched = $('Fetch Newsletter HTML').first().json;
const html    = fetched.html;
const subject = fetched.subject;

const email          = $json.email || '';
const subscriberName = $json.name || email.split('@')[0] || 'Subscriber';

// Replace unsubscribe placeholder with per-subscriber URL
const unsubscribeUrl = `https://n8n.onsight-analytics.com/webhook/newsletter-unsubscribe?email=${encodeURIComponent(email)}`;
const finalHtml = html.replace(/\{\{unsubscribe_url\}\}/g, unsubscribeUrl);

return {
  to:      email,
  name:    subscriberName,
  subject,
  html:    finalHtml
};
"""

# ─────────────────────────────────────────────────────────────────────────────
# Fix "Process GitHub Image URLs" — wrong repo (n8n) and branch (master)
# Correct: repo=Social, branch=main
# ─────────────────────────────────────────────────────────────────────────────
FIXED_GITHUB_CODE = """// PROCESS GITHUB IMAGE URLS FOR MOODBOARD
const files = $input.all();

const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp'];
const imageFiles = files.filter(file => {
  const fileName = file.json.name || '';
  return imageExtensions.some(ext => fileName.toLowerCase().endsWith(ext));
});

const moodboardImages = imageFiles.map(file => {
  const filePath = file.json.path;
  return `https://raw.githubusercontent.com/ortall0201/Social/main/${filePath}`;
});

return [{
  json: {
    moodboard_images: moodboardImages,
    image_count: moodboardImages.length,
    source: 'github_devi_identity'
  }
}];"""

for node in workflow['nodes']:
    if node.get('name') == 'Process GitHub Image URLs':
        node['parameters']['jsCode'] = FIXED_GITHUB_CODE
        print("Fixed: Process GitHub Image URLs (repo: Social, branch: main)")
        break

# ─────────────────────────────────────────────────────────────────────────────
# Modify "Prepare Email with Products" node
# ─────────────────────────────────────────────────────────────────────────────
for node in workflow['nodes']:
    if node.get('name') == 'Prepare Email with Products':
        node['parameters']['jsCode'] = PREPARE_EMAIL_CODE
        print("Modified: Prepare Email with Products")
        break

# ─────────────────────────────────────────────────────────────────────────────
# Add "Create Draft & Notify" code node
# Positioned between Devi Affiliate Link Processor and Get Subscribers
# ─────────────────────────────────────────────────────────────────────────────
create_draft_node = {
    "id": str(uuid.uuid4()),
    "name": "Create Draft & Notify",
    "type": "n8n-nodes-base.code",
    "typeVersion": 2,
    "position": [-1060, -964],
    "parameters": {
        "jsCode": CREATE_DRAFT_CODE
    }
}

# ─────────────────────────────────────────────────────────────────────────────
# Add "Notify via Gmail" node — sends review link to ortalgr@gmail.com
# ─────────────────────────────────────────────────────────────────────────────
gmail_node = {
    "id": str(uuid.uuid4()),
    "name": "Notify via Gmail",
    "type": "n8n-nodes-base.emailSend",
    "typeVersion": 2.1,
    "position": [-1060, -1180],
    "credentials": {
        "smtp": {
            "id": "lPucH75vCSXpyWMf",
            "name": "SMTP account"
        }
    },
    "parameters": {
        "fromEmail": "Devi - Fashion Insights <hello@devisignals.com>",
        "toEmail": "ortalgr@gmail.com",
        "subject": "Devi Newsletter Ready — Approve Now",
        "html": "={{ '<h2>Your Devi newsletter draft is ready for review</h2><p><a href=\"' + $json.review_url + '\" style=\"background:#000;color:#fff;padding:12px 24px;text-decoration:none;border-radius:4px;\">Review & Approve</a></p><p style=\"color:#999;font-size:12px;\">' + $json.review_url + '</p>' }}",
        "options": {}
    }
}

# ─────────────────────────────────────────────────────────────────────────────
# Add "Wait 60s" node — polls every 60s instead of using a webhook
# ─────────────────────────────────────────────────────────────────────────────
wait_60s_node = {
    "id": str(uuid.uuid4()),
    "name": "Wait 60s",
    "type": "n8n-nodes-base.wait",
    "typeVersion": 1.1,
    "position": [-1060, -1296],
    "parameters": {
        "resume": "timeInterval",
        "amount": 60,
        "unit": "seconds",
        "options": {}
    }
}

# ─────────────────────────────────────────────────────────────────────────────
# Add "Check Approval" node — calls get_newsletter, checks approval status
# ─────────────────────────────────────────────────────────────────────────────
CHECK_APPROVAL_CODE = CALL_MCP + r"""
const draft_id = $('Create Draft & Notify').first().json.draft_id;
if (!draft_id) throw new Error('No draft_id found.');

const newsletter = await callMCP('get_newsletter', { newsletter_id: draft_id });

// Approved when status is 'approved' OR html_output is present
const approved = newsletter?.status === 'approved' || !!newsletter?.html_output;

return {
  draft_id,
  approved,
  status: newsletter?.status || 'pending'
};
"""

check_approval_node = {
    "id": str(uuid.uuid4()),
    "name": "Check Approval",
    "type": "n8n-nodes-base.code",
    "typeVersion": 2,
    "position": [-1060, -1412],
    "parameters": {
        "jsCode": CHECK_APPROVAL_CODE
    }
}

# ─────────────────────────────────────────────────────────────────────────────
# Add "IF Approved?" node — routes to SEO if approved, loops back if not
# ─────────────────────────────────────────────────────────────────────────────
if_approved_node = {
    "id": str(uuid.uuid4()),
    "name": "IF Approved?",
    "type": "n8n-nodes-base.if",
    "typeVersion": 1,
    "position": [-1060, -1528],
    "parameters": {
        "conditions": {
            "boolean": [
                {
                    "value1": "={{ $json.approved }}",
                    "value2": True
                }
            ]
        }
    }
}

# ─────────────────────────────────────────────────────────────────────────────
# Add "Generate SEO Data" node — calls MCP generate_seo_data after approval
# ─────────────────────────────────────────────────────────────────────────────
GENERATE_SEO_CODE = CALL_MCP + r"""
// Trigger SEO/AEO/GEO analysis for the approved newsletter
// Results include 5 AI-ranked subject line alternatives with open-rate scores
const draft_id = $('Create Draft & Notify').first().json.draft_id;

if (!draft_id) throw new Error('No draft_id found.');

const result = await callMCP('generate_seo_data', { newsletter_id: draft_id });

return {
  draft_id,
  seo_started: true,
  message: result.message || 'SEO analysis started — waiting 15s for results'
};
"""

generate_seo_node = {
    "id": str(uuid.uuid4()),
    "name": "Generate SEO Data",
    "type": "n8n-nodes-base.code",
    "typeVersion": 2,
    "position": [-1060, -1644],
    "parameters": {
        "jsCode": GENERATE_SEO_CODE
    }
}

# ─────────────────────────────────────────────────────────────────────────────
# Add "Wait 15s for SEO" node — gives seo-agent time to finish
# ─────────────────────────────────────────────────────────────────────────────
wait_seo_node = {
    "id": str(uuid.uuid4()),
    "name": "Wait 15s for SEO",
    "type": "n8n-nodes-base.wait",
    "typeVersion": 1.1,
    "position": [-1060, -1760],
    "parameters": {
        "resume": "timeInterval",
        "amount": 15,
        "unit": "seconds",
        "options": {}
    }
}

fetch_html_node = {
    "id": str(uuid.uuid4()),
    "name": "Fetch Newsletter HTML",
    "type": "n8n-nodes-base.code",
    "typeVersion": 2,
    "position": [-1060, -1876],
    "parameters": {
        "jsCode": FETCH_HTML_CODE
    }
}

workflow['nodes'].append(create_draft_node)
workflow['nodes'].append(gmail_node)
workflow['nodes'].append(wait_60s_node)
workflow['nodes'].append(check_approval_node)
workflow['nodes'].append(if_approved_node)
workflow['nodes'].append(generate_seo_node)
workflow['nodes'].append(wait_seo_node)
workflow['nodes'].append(fetch_html_node)
print("Added: Create Draft & Notify")
print("Added: Notify via Gmail")
print("Added: Wait 60s (polling)")
print("Added: Check Approval")
print("Added: IF Approved?")
print("Added: Generate SEO Data")
print("Added: Wait 15s for SEO")
print("Added: Fetch Newsletter HTML")

# ─────────────────────────────────────────────────────────────────────────────
# Update connections
# Remove: Devi Affiliate Link Processor --> Get Subscribers from Google Sheets
# Add:    Devi Affiliate Link Processor --> Create Draft & Notify
#         Create Draft & Notify         --> Notify via Gmail
#         Notify via Gmail              --> Wait 60s
#         Wait 60s                      --> Check Approval
#         Check Approval                --> IF Approved?
#         IF Approved? (true/0)         --> Generate SEO Data
#         IF Approved? (false/1)        --> Wait 60s  (loop back)
#         Generate SEO Data             --> Wait 15s for SEO
#         Wait 15s for SEO              --> Fetch Newsletter HTML
#         Fetch Newsletter HTML         --> Get Subscribers from Google Sheets
# ─────────────────────────────────────────────────────────────────────────────
conns = workflow['connections']

# Remove Get Subscribers from Devi Affiliate Link Processor's outputs
dali = conns.get('Devi Affiliate Link Processor', {})
if 'main' in dali:
    for port in dali['main']:
        port[:] = [c for c in port if c['node'] != 'Get Subscribers from Google Sheets']

# Add Devi Affiliate Link Processor --> Create Draft & Notify
if 'Devi Affiliate Link Processor' not in conns:
    conns['Devi Affiliate Link Processor'] = {'main': [[]]}
conns['Devi Affiliate Link Processor']['main'][0].append(
    {'node': 'Create Draft & Notify', 'type': 'main', 'index': 0}
)

# Add Create Draft & Notify --> Notify via Gmail
conns['Create Draft & Notify'] = {
    'main': [[{'node': 'Notify via Gmail', 'type': 'main', 'index': 0}]]
}

# Add Notify via Gmail --> Wait 60s
conns['Notify via Gmail'] = {
    'main': [[{'node': 'Wait 60s', 'type': 'main', 'index': 0}]]
}

# Add Wait 60s --> Check Approval
conns['Wait 60s'] = {
    'main': [[{'node': 'Check Approval', 'type': 'main', 'index': 0}]]
}

# Add Check Approval --> IF Approved?
conns['Check Approval'] = {
    'main': [[{'node': 'IF Approved?', 'type': 'main', 'index': 0}]]
}

# Add IF Approved?: true (0) --> Generate SEO Data, false (1) --> Wait 60s (loop)
conns['IF Approved?'] = {
    'main': [
        [{'node': 'Generate SEO Data', 'type': 'main', 'index': 0}],  # true
        [{'node': 'Wait 60s', 'type': 'main', 'index': 0}]            # false — loop back
    ]
}

# Add Generate SEO Data --> Wait 15s for SEO
conns['Generate SEO Data'] = {
    'main': [[{'node': 'Wait 15s for SEO', 'type': 'main', 'index': 0}]]
}

# Add Wait 15s for SEO --> Fetch Newsletter HTML
conns['Wait 15s for SEO'] = {
    'main': [[{'node': 'Fetch Newsletter HTML', 'type': 'main', 'index': 0}]]
}

# Add Fetch Newsletter HTML --> Get Subscribers from Google Sheets
conns['Fetch Newsletter HTML'] = {
    'main': [[{'node': 'Get Subscribers from Google Sheets', 'type': 'main', 'index': 0}]]
}

print("Updated connections")

# ─────────────────────────────────────────────────────────────────────────────
# Save
# ─────────────────────────────────────────────────────────────────────────────
workflow['name'] = 'production9 - Devi Newsletter (MCP)'
workflow['versionId'] = str(uuid.uuid4())
workflow['updatedAt'] = datetime.now(timezone.utc).strftime('%Y-%m-%dT%H:%M:%S.000Z')

with open('workflows/production9 - Devi Newsletter (MCP).json', 'w', encoding='utf-8') as f:
    json.dump(workflow, f, ensure_ascii=False, indent=2)

print("Saved: workflows/production9 - Devi Newsletter (MCP).json")
print("Total nodes:", len(workflow['nodes']), "(was 41, now 49)")
