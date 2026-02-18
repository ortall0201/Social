# 🏗️ Devi Newsletter Studio - System Architecture

**Version:** 1.0.0
**Last Updated:** 2026-02-18
**Project:** Human-in-the-Loop Newsletter Automation

---

## 📋 Table of Contents

1. [Overview](#overview)
2. [System Architecture](#system-architecture)
3. [Component Breakdown](#component-breakdown)
4. [Data Flow](#data-flow)
5. [Review Mode Flow](#review-mode-flow)
6. [Autopilot Mode Flow](#autopilot-mode-flow)
7. [API Communication](#api-communication)
8. [Technology Stack](#technology-stack)
9. [Security](#security)
10. [Deployment](#deployment)

---

## 🎯 Overview

The Devi Newsletter Studio is a **dual-mode newsletter automation system** that combines:
- **Automated content generation** (AI-powered fashion trend analysis)
- **Human-in-the-loop review** (visual editor with approval workflow)
- **Multi-channel delivery** (email via Mailjet)

### Key Features
- ✅ **Two operational modes:** Autopilot (immediate send) and Review (human approval)
- ✅ **Visual editor:** Edit newsletters before sending via Lovable app
- ✅ **AI-powered content:** OpenAI GPT-4o-mini analyzes Instagram fashion trends
- ✅ **Scalable:** Handles multiple subscribers with batch processing
- ✅ **Webhook-driven:** Async approval workflow

---

## 🏗️ System Architecture

```mermaid
graph TB
    subgraph "External Data Sources"
        IG[Instagram API<br/>via Apify]
        GH[GitHub<br/>Moodboard Images]
        GS[Google Sheets<br/>Subscribers & Products]
    end

    subgraph "n8n Workflow Engine"
        TRIGGER[Manual/Schedule Trigger]
        CONTROLLER[Workflow Controller<br/>Budget & Frequency Check]
        SCRAPER[Apify Instagram Scraper]
        FILTER[Filter & Extract<br/>Product Links]
        AI[OpenAI GPT-4o-mini<br/>Trend Analysis]
        AGGREGATOR[Content Aggregator<br/>AI + Images + Products]

        subgraph "Mode Selection"
            SELECTOR[Mode Selector<br/>autopilot/review]
            SWITCH[Mode Switch]
        end

        subgraph "Autopilot Path"
            PREPARE_AUTO[Prepare Email HTML<br/>Inline Generation]
            SEND_AUTO[Send via Mailjet]
        end

        subgraph "Review Path"
            PREPARE_LOVABLE[Prepare Lovable Payload<br/>Transform to Schema]
            SAVE_DRAFT[Save Draft<br/>HTTP POST to Supabase]
            LOG_URL[Log Review URL]
        end

        WEBHOOK[Webhook Listener<br/>newsletter-approved]
        PROCESS[Process Approved<br/>Extract HTML]
        SEND_REVIEW[Send via Mailjet<br/>All Subscribers]
    end

    subgraph "Lovable Platform"
        SUPABASE[Supabase Edge Functions]
        DB[(PostgreSQL<br/>newsletter_drafts)]
        LOVABLE_APP[Lovable React App<br/>Visual Editor]
    end

    subgraph "Email Delivery"
        MAILJET[Mailjet SMTP/API]
        SUBSCRIBERS[Subscribers]
    end

    %% Data Flow
    IG --> SCRAPER
    GH --> AGGREGATOR
    GS --> AGGREGATOR

    TRIGGER --> CONTROLLER
    CONTROLLER --> SCRAPER
    SCRAPER --> FILTER
    FILTER --> AI
    AI --> AGGREGATOR
    AGGREGATOR --> SELECTOR

    SELECTOR --> SWITCH
    SWITCH -->|autopilot| PREPARE_AUTO
    SWITCH -->|review| PREPARE_LOVABLE

    PREPARE_AUTO --> SEND_AUTO
    SEND_AUTO --> MAILJET

    PREPARE_LOVABLE --> SAVE_DRAFT
    SAVE_DRAFT --> SUPABASE
    SUPABASE --> DB
    SUPABASE --> LOG_URL
    SUPABASE -.->|review_url| LOVABLE_APP

    LOVABLE_APP -->|approve| SUPABASE
    SUPABASE -->|webhook POST| WEBHOOK
    WEBHOOK --> PROCESS
    PROCESS --> SEND_REVIEW
    SEND_REVIEW --> MAILJET

    MAILJET --> SUBSCRIBERS

    style SELECTOR fill:#667eea
    style SWITCH fill:#764ba2
    style LOVABLE_APP fill:#ff6b9d
    style SUPABASE fill:#3ecf8e
    style WEBHOOK fill:#f59e0b
```

---

## 🔧 Component Breakdown

### 1. **n8n Workflow Engine**

The orchestration layer that manages the entire newsletter generation and delivery process.

#### Key Nodes:

| Node | Type | Purpose |
|------|------|---------|
| **🤖 Workflow Controller** | Code | Budget/frequency validation, config management |
| **📸 Apify Scraper** | HTTP Request | Scrapes Instagram posts from fashion influencers |
| **🎨 AI Fashion Analysis** | OpenAI | Analyzes trends, generates summary, quiz, forecast |
| **📦 Content Aggregator** | Code | Merges AI insights, images, and products |
| **🔀 Mode Selector** | Code | Chooses between autopilot/review modes |
| **✨ Mode Switch** | Switch | Routes execution based on mode |
| **💾 Save Newsletter Draft** | HTTP Request | POSTs to Supabase edge function |
| **🎯 Webhook** | Webhook | Receives approval callback |
| **📧 Send via Mailjet** | Email Send | Delivers to subscribers |

---

### 2. **Lovable Platform**

The review and editing layer built on Supabase and React.

```mermaid
graph LR
    subgraph "Lovable Architecture"
        subgraph "Frontend"
            REACT[React App<br/>TypeScript + Vite]
            ROUTER[React Router<br/>/review/:id]
            EDITOR[Visual Editor<br/>Components]
            PREVIEW[Live Preview<br/>Real-time]
        end

        subgraph "Backend - Supabase"
            EDGE[Edge Functions<br/>Deno Runtime]
            SAVE[save-newsletter-draft]
            APPROVE[approve-newsletter]
            GENERATE[generate-newsletter]
            DB[(PostgreSQL<br/>newsletter_drafts)]
        end

        REACT --> ROUTER
        ROUTER --> EDITOR
        EDITOR --> PREVIEW
        EDITOR --> SAVE
        EDITOR --> APPROVE
        APPROVE --> GENERATE
        SAVE --> DB
        APPROVE --> DB
    end

    style REACT fill:#61dafb
    style EDGE fill:#3ecf8e
    style DB fill:#336791
```

#### Edge Functions:

1. **`save-newsletter-draft`**
   - Accepts newsletter payload + webhook URL
   - Validates and saves to database
   - Returns draft ID and review URL
   - **Method:** POST
   - **Auth:** Bearer token (Supabase anon key)

2. **`approve-newsletter`**
   - Loads draft from database
   - Calls `generate-newsletter` to create HTML
   - Updates draft status to "approved"
   - Calls n8n webhook with HTML
   - **Method:** POST
   - **Auth:** Bearer token

3. **generate-newsletter****
   - Receives newsletter data payload
   - Generates HTML email using template system
   - Returns HTML string
   - **Method:** POST (internal call)

---

### 3. **External Services**

```mermaid
graph TB
    subgraph "Data Sources"
        APIFY[Apify<br/>Instagram Scraper API]
        GITHUB[GitHub<br/>Moodboard Images]
        GSHEETS[Google Sheets<br/>Subscribers & Products]
    end

    subgraph "AI Services"
        OPENAI[OpenAI<br/>GPT-4o-mini]
    end

    subgraph "Delivery"
        MAILJET[Mailjet<br/>Email API/SMTP]
    end

    N8N[n8n Workflow] --> APIFY
    N8N --> GITHUB
    N8N --> GSHEETS
    N8N --> OPENAI
    N8N --> MAILJET

    style APIFY fill:#e74c3c
    style OPENAI fill:#10a37f
    style MAILJET fill:#ff6f61
```

---

## 🔄 Data Flow

### Newsletter Data Schema

```mermaid
graph LR
    subgraph "Input Data"
        A[Instagram Posts<br/>Apify]
        B[Moodboard Images<br/>GitHub]
        C[Products<br/>Google Sheets]
    end

    subgraph "AI Processing"
        D[OpenAI Analysis<br/>Trends, Quiz, Forecast]
    end

    subgraph "n8n Transform"
        E[Format Final Report<br/>Structured JSON]
        F[Content Aggregator<br/>Merge All Sources]
    end

    subgraph "Lovable Schema"
        G[Newsletter Payload<br/>toEdgeFunctionPayload]
    end

    A --> D
    D --> E
    E --> F
    B --> F
    C --> F
    F --> G

    style D fill:#10a37f
    style G fill:#ff6b9d
```

### Data Transformation

```typescript
// n8n Output Format
{
  top_trends: string[],
  popular_colors: string[],
  quiz_question: string,
  quiz_options: string[],
  quiz_correct_index: number,
  next_week_forecast: {...},
  summary: string  // with **SECTION:** formatting
}

// ↓ Transform to ↓

// Lovable Input Format
{
  subscriber_name: string,
  header: { badge, title, subtitle },
  insights: {
    summary: string,
    top_trends: { name, link }[],
    popular_colors: string[],
    quiz_question: string,
    quiz_options: string[],
    quiz_correct_index: number,
    next_week_focus: string,
    next_week_trends: string[],
    next_week_mood: string,
    next_week_summary: string
  },
  moodboard_images: string[],
  featured_posts: { image, username, caption, post_link }[],
  affiliate_products: { name, image, shop_link, price }[],
  cta: {...},
  footer: {...}
}
```

---

## 🎬 Review Mode Flow

### Sequence Diagram

```mermaid
sequenceDiagram
    participant N8N as n8n Workflow
    participant SB as Supabase Edge Function
    participant DB as PostgreSQL Database
    participant LA as Lovable App
    participant Human as Human Reviewer
    participant MJ as Mailjet

    Note over N8N: Mode = "review"

    N8N->>N8N: Generate content (Apify + AI)
    N8N->>N8N: Transform to Lovable schema
    N8N->>SB: POST /save-newsletter-draft<br/>{payload + webhook_url}

    SB->>DB: INSERT into newsletter_drafts
    DB-->>SB: Draft saved (id, timestamp)
    SB-->>N8N: {id, review_url, status: "draft"}

    N8N->>N8N: Log review URL
    Note over N8N: Workflow STOPS<br/>Waits for human

    Human->>LA: Opens review_url in browser
    LA->>SB: GET draft data
    SB->>DB: SELECT from newsletter_drafts
    DB-->>SB: Draft data
    SB-->>LA: Newsletter payload
    LA->>LA: Render visual editor

    Note over Human,LA: Human edits content<br/>(optional)

    Human->>LA: Click "Approve & Send"
    LA->>SB: POST /approve-newsletter<br/>{id, updated_data}

    SB->>SB: Call generate-newsletter<br/>Create HTML
    SB->>DB: UPDATE status = "approved"

    SB->>N8N: POST /webhook/newsletter-approved<br/>{id, status, html}

    Note over N8N: New execution starts<br/>(webhook triggered)

    N8N->>N8N: Extract HTML
    N8N->>N8N: Get ALL subscribers
    N8N->>N8N: Prepare emails

    loop For each subscriber
        N8N->>MJ: Send email
        MJ-->>N8N: Delivery status
    end

    N8N->>N8N: Log analytics
    Note over N8N: Workflow COMPLETE
```

### Step-by-Step Explanation

#### Phase 1: Draft Creation (n8n → Supabase)

1. **n8n generates content**
   - Scrapes Instagram posts via Apify
   - Analyzes trends with OpenAI
   - Fetches moodboard images from GitHub
   - Retrieves products from Google Sheets

2. **Transform data**
   - Converts n8n format to Lovable schema
   - Maps quiz/forecast fields
   - Formats featured posts

3. **Save draft**
   - HTTP POST to Supabase edge function
   - Includes webhook URL for callback
   - Receives draft ID and review URL

4. **Workflow pauses**
   - Logs review URL to console
   - Execution completes
   - Waits for human action

#### Phase 2: Human Review (Browser)

5. **Open review URL**
   - Human opens `https://devi-newsletter-studio.lovable.app/review/{id}`
   - React app loads and fetches draft data
   - Visual editor displays with live preview

6. **Edit (optional)**
   - Human can edit headline, sections, colors
   - Toggle sections on/off
   - Manage products and featured posts
   - Changes saved to state (not DB yet)

7. **Approve**
   - Human clicks "Approve & Send"
   - Frontend POSTs to `approve-newsletter` function

#### Phase 3: Approval & Sending (Supabase → n8n)

8. **Generate HTML**
   - `approve-newsletter` calls `generate-newsletter`
   - HTML email is created from template
   - Draft status updated to "approved"

9. **Webhook callback**
   - Supabase POSTs to n8n webhook
   - Payload: `{ id, status: "approved", html }`

10. **Send emails**
    - New n8n execution triggered by webhook
    - Retrieves ALL active subscribers
    - Sends email to each via Mailjet
    - Logs analytics

---

## ⚡ Autopilot Mode Flow

### Sequence Diagram

```mermaid
sequenceDiagram
    participant N8N as n8n Workflow
    participant MJ as Mailjet
    participant SUB as Subscribers

    Note over N8N: Mode = "autopilot"

    N8N->>N8N: Generate content (Apify + AI)
    N8N->>N8N: Get active subscribers

    loop For each subscriber
        N8N->>N8N: Generate HTML inline
        N8N->>MJ: Send email
        MJ->>SUB: Deliver email
        MJ-->>N8N: Delivery status
    end

    N8N->>N8N: Log analytics
    Note over N8N: Workflow COMPLETE<br/>No human intervention
```

### Key Differences from Review Mode

| Aspect | Review Mode | Autopilot Mode |
|--------|-------------|----------------|
| **HTML Generation** | Lovable edge function | n8n inline code |
| **Human Approval** | Required | None |
| **Workflow Duration** | Minutes to hours | ~30 seconds |
| **External Calls** | Supabase, Lovable | None (except Mailjet) |
| **Flexibility** | High (visual editor) | None (automated) |
| **Use Case** | Important campaigns | Scheduled updates |

---

## 🔌 API Communication

### Connection Method: **HTTP REST API + Webhooks**

**Not using MCP (Model Context Protocol)** because:
- ✅ Simple HTTP requests are sufficient
- ✅ Standard n8n HTTP Request node
- ✅ No need for AI agent context access
- ✅ Webhooks handle async callbacks

### API Endpoints

```mermaid
graph TB
    subgraph "n8n API Calls"
        N8N[n8n Workflow]
    end

    subgraph "Supabase Edge Functions"
        EP1[POST /functions/v1/save-newsletter-draft]
        EP2[POST /functions/v1/approve-newsletter]
        EP3[POST /functions/v1/generate-newsletter<br/>Internal only]
    end

    subgraph "n8n Webhooks"
        WH1[POST /webhook/newsletter-approved]
    end

    N8N -->|1. Save draft| EP1
    EP1 -.->|Returns review_url| N8N

    EP2 -->|3. Generate HTML| EP3
    EP3 -.->|Returns HTML| EP2

    EP2 -->|4. Callback| WH1
    WH1 -.->|Triggers new execution| N8N

    style EP1 fill:#3ecf8e
    style EP2 fill:#3ecf8e
    style EP3 fill:#67c23a
    style WH1 fill:#f59e0b
```

### 1. Save Draft API

```http
POST https://zunlwpukvcjcuxjbfgdm.supabase.co/functions/v1/save-newsletter-draft
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
Content-Type: application/json

{
  "subscriber_name": "Sarah",
  "header": { ... },
  "insights": { ... },
  "moodboard_images": [...],
  "featured_posts": [...],
  "affiliate_products": [...],
  "cta": { ... },
  "footer": { ... },
  "webhook_url": "https://n8n.onsight-analytics.com/webhook/newsletter-approved"
}
```

**Response:**
```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "review_url": "https://devi-newsletter-studio.lovable.app/review/550e8400-e29b-41d4-a716-446655440000",
  "status": "draft",
  "created_at": "2026-02-18T01:30:00.000Z"
}
```

### 2. Approve Newsletter API

```http
POST https://zunlwpukvcjcuxjbfgdm.supabase.co/functions/v1/approve-newsletter
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
Content-Type: application/json

{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "data": { /* optional updated newsletter data */ },
  "webhook_url": "https://n8n.onsight-analytics.com/webhook/newsletter-approved"
}
```

**Response:**
```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "status": "approved",
  "html": "<html>...</html>",
  "webhook_result": {
    "status": 200,
    "ok": true
  }
}
```

### 3. Webhook Callback (Supabase → n8n)

```http
POST https://n8n.onsight-analytics.com/webhook/newsletter-approved
Content-Type: application/json

{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "status": "approved",
  "html": "<html>...</html>"
}
```

**Response (from n8n):**
```json
{
  "success": true,
  "message": "Newsletter approved and queued for sending"
}
```

---

## 🛠️ Technology Stack

### Infrastructure

```mermaid
graph TB
    subgraph "Orchestration"
        N8N[n8n<br/>Self-hosted/Cloud]
    end

    subgraph "Backend"
        SUPABASE[Supabase<br/>PostgreSQL + Edge Functions]
        DENO[Deno Runtime<br/>Edge Functions]
    end

    subgraph "Frontend"
        REACT[React 18<br/>TypeScript]
        VITE[Vite<br/>Build Tool]
        TAILWIND[Tailwind CSS<br/>Styling]
    end

    subgraph "External Services"
        APIFY[Apify<br/>Web Scraping]
        OPENAI[OpenAI<br/>GPT-4o-mini]
        MAILJET[Mailjet<br/>Email Delivery]
        GITHUB[GitHub<br/>Asset Storage]
        GSHEETS[Google Sheets<br/>Data Source]
    end

    style N8N fill:#ea4b71
    style SUPABASE fill:#3ecf8e
    style REACT fill:#61dafb
    style OPENAI fill:#10a37f
```

### Detailed Stack

| Layer | Technology | Version | Purpose |
|-------|------------|---------|---------|
| **Orchestration** | n8n | Latest | Workflow automation |
| **Database** | PostgreSQL | 15+ | Draft storage (Supabase) |
| **Backend Runtime** | Deno | 1.x | Edge functions |
| **Frontend Framework** | React | 18.x | Visual editor UI |
| **Build Tool** | Vite | 5.x | Frontend bundling |
| **Language** | TypeScript | 5.x | Type safety |
| **Styling** | Tailwind CSS | 3.x | Utility-first CSS |
| **AI Model** | GPT-4o-mini | Latest | Trend analysis |
| **Web Scraping** | Apify | API | Instagram scraper |
| **Email Delivery** | Mailjet | SMTP/API | Email sending |
| **Version Control** | GitHub | - | Code + assets |
| **Data Source** | Google Sheets | API | Subscribers/products |

### Dependencies

```json
{
  "n8n": {
    "nodes-base": "^1.0.0",
    "workflow": "^1.0.0"
  },
  "supabase": {
    "@supabase/supabase-js": "^2.0.0"
  },
  "frontend": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-router-dom": "^6.20.0",
    "typescript": "^5.0.0",
    "vite": "^5.0.0",
    "tailwindcss": "^3.4.0"
  }
}
```

---

## 🔒 Security

### Authentication & Authorization

```mermaid
graph LR
    subgraph "n8n → Supabase"
        N8N[n8n HTTP Request]
        AUTH1[Bearer Token<br/>Supabase Anon Key]
        SB[Supabase Edge Functions]
    end

    subgraph "Lovable App → Supabase"
        LA[Lovable Frontend]
        AUTH2[Bearer Token<br/>Supabase Anon Key]
        SB2[Supabase Edge Functions]
    end

    subgraph "Supabase → n8n"
        SB3[Supabase Edge Function]
        WEBHOOK[n8n Webhook<br/>Public URL]
    end

    N8N -->|Authorization Header| AUTH1
    AUTH1 --> SB

    LA -->|Authorization Header| AUTH2
    AUTH2 --> SB2

    SB3 -->|POST with payload| WEBHOOK

    style AUTH1 fill:#f59e0b
    style AUTH2 fill:#f59e0b
```

### Security Measures

| Component | Security | Details |
|-----------|----------|---------|
| **Supabase API** | Bearer token auth | Anon key for client-side calls |
| **n8n Webhook** | Public URL | Consider adding webhook auth |
| **Database** | Row-level security | Supabase RLS policies |
| **Edge Functions** | CORS headers | Restricted origins |
| **Subscriber Data** | Encrypted at rest | PostgreSQL encryption |
| **Email Credentials** | n8n credentials vault | Encrypted storage |

### Sensitive Data

```typescript
// ⚠️ Sensitive - Never commit to Git
SUPABASE_URL=https://zunlwpukvcjcuxjbfgdm.supabase.co
SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
OPENAI_API_KEY=sk-...
MAILJET_API_KEY=...
MAILJET_API_SECRET=...
```

### Recommendations

1. **Add Webhook Authentication**
   ```javascript
   // In n8n webhook node:
   headerParameters: {
     "X-Webhook-Secret": "your-secret-key"
   }
   ```

2. **Rotate API Keys**
   - Supabase anon key: Every 90 days
   - OpenAI API key: Every 180 days
   - Mailjet credentials: As needed

3. **Implement Rate Limiting**
   - Supabase edge functions: 100 req/min
   - n8n webhook: Monitor for abuse
   - Mailjet: Respect sending limits

4. **Enable Audit Logging**
   - Log all draft creations
   - Track approval actions
   - Monitor email deliveries

---

## 🚀 Deployment

### Deployment Architecture

```mermaid
graph TB
    subgraph "Production Environment"
        subgraph "n8n Instance"
            N8N[n8n Workflow<br/>self-hosted/cloud]
        end

        subgraph "Supabase Cloud"
            EDGE[Edge Functions<br/>Global CDN]
            DB[(PostgreSQL<br/>Managed)]
        end

        subgraph "Lovable Platform"
            APP[React App<br/>Static Hosting]
        end

        subgraph "External Services"
            API1[Apify API]
            API2[OpenAI API]
            API3[Mailjet API]
        end
    end

    N8N --> EDGE
    N8N --> API1
    N8N --> API2
    N8N --> API3

    APP --> EDGE
    EDGE --> DB

    style N8N fill:#ea4b71
    style APP fill:#ff6b9d
    style EDGE fill:#3ecf8e
```

### Deployment Steps

#### 1. Deploy Lovable App

```bash
# Already deployed at:
https://devi-newsletter-studio.lovable.app

# Connected to:
GitHub: ortall0201/devi-newsletter-studio
Supabase: zunlwpukvcjcuxjbfgdm
```

#### 2. Deploy n8n Workflow

```bash
# Import workflow file:
production8 - Apify scraper - WITH REVIEW MODE.json

# Configure:
1. Set webhook URL in "Save Newsletter Draft" node
2. Set mode in "Mode Selector" node
3. Verify credentials (OpenAI, Mailjet, Google Sheets)
4. Activate workflow
```

#### 3. Configure Environment

```bash
# Supabase Edge Functions
supabase functions deploy save-newsletter-draft
supabase functions deploy approve-newsletter
supabase functions deploy generate-newsletter

# Verify deployments
supabase functions list
```

### Monitoring

```mermaid
graph LR
    subgraph "Monitoring Points"
        M1[n8n Executions<br/>Success/Failure Rate]
        M2[Supabase Logs<br/>Edge Function Errors]
        M3[Mailjet Dashboard<br/>Delivery Stats]
        M4[Database Metrics<br/>Draft Count]
    end

    ALERT[Alert System<br/>Email/Slack]

    M1 --> ALERT
    M2 --> ALERT
    M3 --> ALERT
    M4 --> ALERT

    style ALERT fill:#f59e0b
```

**Key Metrics:**
- ✅ Workflow success rate (>95%)
- ✅ Draft creation time (<5s)
- ✅ Email delivery rate (>98%)
- ✅ Webhook callback latency (<2s)
- ✅ Database query time (<100ms)

---

## 📊 Performance & Scaling

### Current Capacity

| Metric | Current | Target |
|--------|---------|--------|
| **Subscribers** | ~50 | 10,000+ |
| **Workflow Duration** | 2-3 min | <5 min |
| **Draft Creation** | 2-5s | <3s |
| **Email Sending** | 30s/batch | Parallel |
| **Database Size** | <100 drafts | 10,000+ |

### Scaling Strategies

1. **Horizontal Scaling**
   - Deploy n8n in cluster mode
   - Use Supabase read replicas
   - Add Mailjet sending IPs

2. **Optimization**
   - Cache moodboard images
   - Batch email sending
   - Optimize AI prompts
   - Use database indexes

3. **Future Enhancements**
   - Redis caching layer
   - CDN for static assets
   - Queue system for emails
   - A/B testing framework

---

## 📖 Related Documentation

- **[README-REVIEW-MODE.md](./README-REVIEW-MODE.md)** - Overview and features
- **[IMPLEMENTATION-COMPLETE.md](./IMPLEMENTATION-COMPLETE.md)** - Deployment guide
- **[QUICK-START.md](./QUICK-START.md)** - 3-step setup
- **[FLOW-DIAGRAM.md](./FLOW-DIAGRAM.md)** - Detailed flow diagrams
- **[GitHub Repo](https://github.com/ortall0201/devi-newsletter-studio)** - Source code

---

## 🤝 Contributing

See the main repository for contribution guidelines:
https://github.com/ortall0201/devi-newsletter-studio

---

## 📄 License

All rights reserved © 2026 Devi Fashion

---

**Architecture Version:** 1.0.0
**Last Updated:** 2026-02-18
**Maintained by:** N8N-BRAIN (Claude Code)
