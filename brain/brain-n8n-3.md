# brain-n8n-3.md

> n8n Community Nodes Ecosystem Knowledge Base
> Source: restyler-awesome-n8n (Top 100 Community Nodes)
> Last Updated: 2025-11-16
> Total Community Nodes: 4,665
> Generated: 2025-11-24

## Table of Contents

- [About This Resource](#about-this-resource)
- [Community Node Ecosystem Overview](#community-node-ecosystem-overview)
- [Installation Guide](#installation-guide)
- [Top 100 Community Nodes](#top-100-community-nodes)
  - [1. Communication & Messaging](#1-communication--messaging-nodes)
  - [2. Document & Content Generation](#2-document--content-generation-nodes)
  - [3. Browser Automation & Web Scraping](#3-browser-automation--web-scraping-nodes)
  - [4. Data Processing & Utilities](#4-data-processing--utilities-nodes)
  - [5. API & Cloud Integrations](#5-api--cloud-integrations-nodes)
  - [6. AI, LLM & Voice](#6-ai-llm--voice-nodes)
  - [7. File & PDF Manipulation](#7-file--pdf-manipulation-nodes)
  - [8. Miscellaneous & Testing](#8-miscellaneous--testing-nodes)
- [Node Categories Deep Dive](#node-categories-deep-dive)
- [Growth Trends & Statistics](#growth-trends--statistics)
- [Most Downloaded Nodes](#most-downloaded-nodes)
- [Featured Solutions](#featured-solutions)
- [Best Practices](#best-practices)
- [Resources](#resources)

---

## About This Resource

### What is restyler-awesome-n8n?

A **community-curated list** of the **Top 100 n8n community nodes** ranked by:
- Monthly downloads from npmjs.com
- Popularity and usage
- Community engagement
- Recent updates

### Current Statistics (2025-11-16)

- **Total Community Nodes**: 4,665
- **New Nodes in Latest Update**: 6
- **Growth Rate**: 17.1 new nodes per day (average)
- **Total Growth**: 3,590 nodes since tracking began (2025-02-04)

### Why This Matters

Community nodes extend n8n's functionality beyond the 400+ built-in nodes, providing:
- ✅ **Niche integrations** not available in core n8n
- ✅ **Specialized functionality** for specific use cases
- ✅ **Regional services** (e.g., Brazilian payment systems)
- ✅ **Early access** to new service integrations
- ✅ **Custom solutions** built by the community

---

## Community Node Ecosystem Overview

### Rapid Growth Trajectory

The n8n community node ecosystem has experienced **explosive growth**:

| Period | Nodes Added | Daily Rate | Trend |
|--------|-------------|------------|-------|
| Feb 4 - Mar 4, 2025 | 117 | 5.8/day | 📈 Growing |
| Mar 4 - Apr 15, 2025 | 178 | 8.1/day | 📈 Accelerating |
| Apr 15 - Jun 15, 2025 | 445 | 11.7/day | 📈 Strong growth |
| Jun 15 - Aug 25, 2025 | 1,091 | 15.3/day | 📈 Rapid expansion |
| Aug 25 - Nov 16, 2025 | 1,363 | 16.6/day | 📈 Sustained growth |

**Total Growth**: From 1,075 to 4,665 nodes in 286 days (334% increase)

### Distribution by Category

1. **Communication & Messaging** (20 nodes in top 100)
   - WhatsApp integrations dominate
   - Chat platforms (Chatwoot, Discord)
   - Email and messaging APIs

2. **Browser Automation & Web Scraping** (9 nodes)
   - Playwright, Puppeteer, Browserless
   - Firecrawl, SerpAPI
   - Content extraction tools

3. **API & Cloud Integrations** (32 nodes)
   - Largest category
   - Regional payment systems
   - CRM and business tools
   - Cloud services

4. **AI, LLM & Voice** (9 nodes)
   - ElevenLabs (voice generation)
   - DeepSeek AI
   - Perplexity AI
   - GitHub Copilot

5. **Data Processing & Utilities** (6 nodes)
   - Phone number parsing
   - Text manipulation
   - OCR (Tesseract)
   - Global variables

6. **Document & Content Generation** (3 nodes)
   - PDF generation
   - QR codes
   - Digital signatures

7. **File & PDF Manipulation** (3 nodes)
   - PDF creation and conversion
   - Image format conversion

8. **Miscellaneous & Testing** (18 nodes)
   - Debug helpers
   - Specialized tools
   - Industry-specific solutions

---

## Installation Guide

### For Self-Hosted n8n

#### Method 1: Via n8n UI (Recommended)
```
1. Open n8n
2. Go to Settings > Community Nodes
3. Click "Install"
4. Enter package name (e.g., n8n-nodes-evolution-api)
5. Click "Install"
6. Restart n8n
```

#### Method 2: Via npm
```bash
# Navigate to n8n directory
cd ~/.n8n

# Install node package
npm install <package-name>

# Restart n8n
pm2 restart n8n  # or your restart method
```

#### Method 3: Docker
```dockerfile
FROM n8nio/n8n

# Install community nodes
RUN cd /usr/local/lib/node_modules/n8n && \
    npm install n8n-nodes-evolution-api \
                n8n-nodes-chatwoot \
                n8n-nodes-browserless

# Continue with your configuration
```

Or in docker-compose.yml:
```yaml
services:
  n8n:
    image: n8nio/n8n
    volumes:
      - n8n_data:/home/node/.n8n
    environment:
      - N8N_COMMUNITY_PACKAGES_ENABLED=true
```

Then install via UI or exec:
```bash
docker exec -it n8n npm install -g n8n-nodes-evolution-api
docker restart n8n
```

### For n8n Cloud

n8n Cloud users can install community nodes directly from the UI:
1. Settings > Community Nodes
2. Browse or search for nodes
3. Install with one click

### Verification

After installation:
1. Search for the node in the node panel
2. Check Settings > Community Nodes for installed packages
3. Look for the node icon in the workflow editor

---

## Top 100 Community Nodes

### 1. Communication & Messaging Nodes

The most popular category, dominated by WhatsApp and chat platform integrations.

#### Top 10 Communication Nodes

| Rank | Package | Description | Monthly Downloads | Author |
|------|---------|-------------|-------------------|--------|
| **#1** | **n8n-nodes-evolution-api** | WhatsApp channel hub via Evolution API | 7,777,485 | @oriondesign |
| #4 | n8n-nodes-quepasa | Quepasa WhatsApp integration | 428,101 | @hugodeco |
| #7 | n8n-nodes-chatwoot | ChatWoot customer support platform | 394,045 | @hugodeco |
| #8 | n8n-nodes-notificame-hub | Multi-channel communication automation | 335,414 | @oriondesign |
| #12 | n8n-nodes-n8ntools-uazapi | Premium WhatsApp API (Uazapi) | 207,127 | @n8ntools.oficial |
| #17 | @devlikeapro/n8n-nodes-chatwoot | Alternative ChatWoot integration | 124,147 | @devlikeapro |
| #31 | n8n-nodes-chat-data | Chatbot management and lead retrieval | 32,927 | @chatdata |
| #33 | n8n-nodes-imap | IMAP email server integration | 31,786 | @umanamente |
| #39 | n8n-nodes-wuzapi | Wuzapi WhatsApp Multi-Device API | 24,362 | @guilhermejansenoficial |
| #40 | n8n-nodes-thang-zalo-app | Zalo messaging platform (Vietnam) | 23,096 | @ntnguyenthangtn |

#### Featured: Evolution API (#1 - 7.7M downloads)
**What it is**: The most popular community node, providing WhatsApp integration via Evolution API.

**Key Features**:
- Send/receive WhatsApp messages
- Multi-device support
- Media handling (images, videos, documents)
- Group management
- QR code authentication
- Webhook support

**Use Cases**:
- Customer support automation
- Marketing campaigns
- Order notifications
- Appointment reminders
- Lead qualification

**Installation**:
```bash
npm install n8n-nodes-evolution-api
```

#### Featured: ChatWoot (#7 - 394K downloads)
**What it is**: Open-source customer support platform integration.

**Key Features**:
- Conversation management
- Agent assignment
- Ticket creation
- Custom attributes
- Multi-channel support
- Webhook triggers

**Use Cases**:
- Customer support workflows
- Ticket routing
- Agent notifications
- CRM integration
- Analytics and reporting

#### WhatsApp Integration Comparison

| Node | API Provider | Downloads | Best For |
|------|--------------|-----------|----------|
| evolution-api | Evolution API | 7.7M | Most popular, robust |
| uazapi | Uazapi | 207K | Premium features |
| waha | WAHA | 25K | Open-source alternative |
| wuzapi | Wuzapi | 24K | Multi-device |
| quepasa | Quepasa | 428K | Brazilian market |

#### New Additions 🆕

**#73 - n8n-nodes-exotel** (7,770 downloads)
- Exotel and Ameyo communication platforms
- Call management
- SMS integration
- Voice automation

**#90 - n8n-nodes-whatsapp-br** (5,852 downloads)
- WhatsApp Business API (Brazil-focused)
- Simplified trigger with automatic listening
- Media support
- Group management

**#98 - n8n-nodes-instagram-automation-pro** (5,316 downloads)
- Official Meta Instagram login
- DM management
- Comment handling
- Webhook support
- Conversation automation

---

### 2. Document & Content Generation Nodes

Specialized nodes for creating documents, PDFs, and digital content.

| Rank | Package | Description | Monthly Downloads |
|------|---------|-------------|-------------------|
| #38 | **n8n-nodes-pdforge** | AI-powered PDF generation | 25,530 |
| #65 | n8n-nodes-zapsign | ZapSign digital signature API | 9,541 |
| #67 | n8n-nodes-qrcode | QR code generation | 9,024 |

#### Featured: PDForge (#38)
**What it is**: AI-powered PDF generation with customizable templates.

**Key Features**:
- AI-driven content generation
- Customizable templates
- No-code design tools
- Dynamic data insertion
- Batch generation
- Multi-language support

**Use Cases**:
- Invoice generation
- Report automation
- Certificate creation
- Contract generation
- Marketing materials

**Example Use Case**:
```
Trigger (New Order)
  ↓
Get Order Data (Database)
  ↓
PDForge (Generate Invoice)
  ↓
Email (Send to Customer)
```

---

### 3. Browser Automation & Web Scraping Nodes

Essential tools for web scraping, data extraction, and browser automation.

| Rank | Package | Description | Monthly Downloads |
|------|---------|-------------|-------------------|
| #10 | **n8n-nodes-serpapi** | Google Search API integration | 208,534 |
| #14 | n8n-nodes-firecrawl-scraper | Firecrawl web scraper | 197,720 |
| #20 | @mendable/n8n-nodes-firecrawl | Alternative Firecrawl | 107,030 |
| #23 | n8n-nodes-browserless | Browserless platform integration | 68,078 |
| #27 | n8n-nodes-playwright | Playwright browser automation | 52,361 |
| #46 | n8n-nodes-puppeteer | Puppeteer browser automation | 19,226 |
| #75 | n8n-nodes-browserflow | LinkedIn automation | 7,383 |
| #85 | n8n-nodes-webpage-content-extractor | Extract web content | 6,237 |
| #97 | n8n-nodes-firecrawl | FireCrawl nodes | 5,367 |

#### Featured: SerpAPI (#10 - 208K downloads)
**What it is**: Google Search API integration for automated search results.

**Key Features**:
- Google Search results
- Google Shopping data
- Google Images
- Google News
- Local search results
- Autocomplete suggestions
- Pagination support

**Use Cases**:
- SEO monitoring
- Competitor research
- Price monitoring
- Lead generation
- Market research
- Content discovery

#### Featured: Playwright (#27 - 52K downloads)
**What it is**: Modern browser automation using Playwright library.

**Key Features**:
- Multi-browser support (Chrome, Firefox, Safari)
- Headless operation
- Screenshot capture
- PDF generation
- Form filling
- Element interaction
- Network interception

**Use Cases**:
- E2E testing
- Web scraping
- Form automation
- Screenshot generation
- Dynamic content extraction

**Example**:
```
Schedule Trigger (Daily)
  ↓
Playwright (Open competitor site)
  ↓
Playwright (Extract prices)
  ↓
Google Sheets (Log data)
  ↓
If (Price change detected)
  ↓
Slack (Notify team)
```

#### Scraping Tools Comparison

| Tool | Best For | Headless | JavaScript | Complexity |
|------|----------|----------|------------|------------|
| **SerpAPI** | Google search data | N/A | N/A | Low |
| **Firecrawl** | Web crawling | Yes | Yes | Low |
| **Playwright** | Complex automation | Yes | Yes | Medium |
| **Puppeteer** | Chrome automation | Yes | Yes | Medium |
| **Browserless** | Scalable scraping | Yes | Yes | Low |

#### Sponsored: ScrapeNinja
**Professional web scraping API** with:
- Fast engine with TLS fingerprint
- Real browser engine (slower but accurate)
- Smart website crawler
- Rotating proxies (included in free plan)
- HTML body content extraction

---

### 4. Data Processing & Utilities Nodes

Tools for data manipulation, validation, and workflow utilities.

| Rank | Package | Description | Monthly Downloads |
|------|---------|-------------|-------------------|
| #13 | **n8n-nodes-cronlytic** | Advanced cron scheduling | 198,790 |
| #18 | @splainez/n8n-nodes-phonenumber-parser | Phone number parsing | 123,900 |
| #25 | n8n-nodes-globals | Global constants across workflows | 54,325 |
| #47 | n8n-nodes-datastore | In-memory data storage | 17,151 |
| #54 | n8n-nodes-text-manipulation | Text modification tools | 13,620 |
| #74 | n8n-nodes-tesseractjs | OCR (text from images) | 7,565 |

#### Featured: Phone Number Parser (#18)
**What it is**: Parse and validate phone numbers with international support.

**Key Features**:
- Format validation
- Country detection
- Number formatting
- Carrier information
- International format conversion
- Type detection (mobile/landline)

**Use Cases**:
- Lead validation
- Contact normalization
- SMS routing
- International calling
- Data cleaning

**Example**:
```javascript
Input: "+1 (555) 123-4567"
Output: {
  country: "US",
  nationalNumber: "5551234567",
  internationalFormat: "+1 555 123 4567",
  isValid: true,
  type: "MOBILE"
}
```

#### Featured: Global Variables (#25)
**What it is**: Create global constants usable across all workflows.

**Key Features**:
- Cross-workflow constants
- Centralized configuration
- Environment-specific values
- Easy updates
- Type support

**Use Cases**:
- API endpoints
- Configuration values
- Feature flags
- Common credentials
- Shared settings

---

### 5. API & Cloud Integrations Nodes

The largest category with 32 nodes in top 100, covering diverse services.

#### Top API Integrations

| Rank | Package | Description | Monthly Downloads | Region |
|------|---------|-------------|-------------------|--------|
| #5 | **n8n-nodes-kommo** | Kommo CRM integration | 413,181 | Global |
| #11 | @apify/n8n-nodes-apify | Apify web scraping platform | 207,646 | Global |
| #15 | n8n-nodes-powerbi | Microsoft Power BI APIs | 132,829 | Global |
| #22 | n8n-nodes-linked-api | LinkedIn automation | 94,377 | Global |
| #26 | n8n-nodes-instagram-integrations | Instagram API OAuth2 | 52,618 | Global |
| #28 | n8n-nodes-minio | MinIO object storage | 50,296 | Global |
| #30 | n8n-nodes-tavily | Tavily AI search engine | 42,472 | Global |
| #32 | n8n-nodes-qdrant | Qdrant vector search | 32,337 | Global |

#### Regional Payment Systems (Brazil Focus)

| Rank | Package | Service | Downloads |
|------|---------|---------|-----------|
| #53 | n8n-nodes-cnpj | Brazilian company lookup | 14,448 |
| #56 | n8n-nodes-asaas-v2 | Asaas payment API | 12,954 |
| #58 | n8n-nodes-efibank | Efibank (Pix + Charges) | 12,023 |
| #61 | @eduzz/n8n-nodes-eduzz | Eduzz marketplace | 10,334 |
| #64 | n8n-nodes-openpix | OpenPix payment gateway | 9,849 |

#### Cloud Services

| Service | Package | Downloads | Use Case |
|---------|---------|-----------|----------|
| **Power BI** | n8n-nodes-powerbi | 132,829 | Business intelligence |
| **MinIO** | n8n-nodes-minio | 50,296 | Object storage |
| **Qdrant** | n8n-nodes-qdrant | 32,337 | Vector search |
| **Hostinger** | n8n-nodes-hostinger-api | 12,532 | Hosting management |

#### Featured: Apify (#11 - 207K downloads)
**What it is**: Web scraping and automation platform integration.

**Key Features**:
- Pre-built scrapers (Amazon, Google, LinkedIn, etc.)
- Custom actors
- Proxy support
- Scheduled runs
- Data storage
- API access

**Use Cases**:
- Competitive intelligence
- Price monitoring
- Lead generation
- Market research
- Data collection

#### Featured: Power BI (#15 - 132K downloads)
**What it is**: Microsoft Power BI API integration.

**Key Features**:
- Dataset management
- Report creation
- Dashboard updates
- Data refresh
- Workspace management
- Embedding support

**Use Cases**:
- Automated reporting
- Data pipeline
- Business intelligence
- Dashboard updates
- Analytics automation

#### Featured: Qdrant (#32 - 32K downloads)
**What it is**: Vector search engine for AI applications.

**Key Features**:
- Vector similarity search
- High-performance queries
- Filtering
- Payload storage
- Clustering
- Hybrid search

**Use Cases**:
- Semantic search
- Recommendation engines
- AI memory systems
- Document retrieval
- Image similarity

**Example RAG Pipeline**:
```
Webhook (New document)
  ↓
OpenAI (Generate embeddings)
  ↓
Qdrant (Store vectors)
  ↓
--- Query Time ---
  ↓
Qdrant (Search similar)
  ↓
OpenAI (Generate answer with context)
  ↓
Return response
```

#### New Additions 🆕

**#50 - n8n-nodes-sheetbase** (15,900 downloads)
- Use Google Sheets as a database
- Public read access
- Apps Script integration
- Advanced queries

**#79 - n8n-nodes-notion-overlimit-writer** (6,795 downloads)
- Enhanced Notion integration
- Unlimited content management
- Markdown to rich-text conversion
- Property management

**#93 - n8n-nodes-ionos** (5,547 downloads)
- IONOS cloud services
- DNS management
- Domain management
- SSL certificates
- Cloud AI
- Infrastructure management

---

### 6. AI, LLM & Voice Nodes

Cutting-edge AI and voice generation integrations.

| Rank | Package | Description | Monthly Downloads |
|------|---------|-------------|-------------------|
| #2 | **n8n-nodes-mcp** | MCP (Model Context Protocol) | 950,826 |
| #3 | n8n-nodes-elevenlabs | ElevenLabs AI voice generation | 827,850 |
| #19 | @elevenlabs/n8n-nodes-elevenlabs | Official ElevenLabs | 110,437 |
| #21 | n8n-nodes-youtube-transcription-kasha | YouTube transcripts | 99,288 |
| #24 | n8n-nodes-deepseek | DeepSeek AI integration | 56,482 |
| #37 | @watzon/n8n-nodes-perplexity | Perplexity AI API | 26,576 |
| #63 | n8n-nodes-useapi | Multi-AI integration (Midjourney, Runway, etc.) | 10,155 |
| #72 | n8n-nodes-vercel-ai-sdk-universal-temp | Vercel AI SDK universal | 7,927 |
| #95 | n8n-nodes-github-copilot | GitHub Copilot + AI models | 5,474 |

#### Featured: MCP Nodes (#2 - 950K downloads!)
**What it is**: Model Context Protocol integration - NEW standard for AI context.

**Key Features**:
- Standardized AI context protocol
- Multi-model support
- Context management
- Tool integration
- Memory persistence

**Use Cases**:
- AI agent development
- Context-aware AI apps
- Multi-model workflows
- Advanced AI pipelines

**Why It's #2**: MCP is becoming the standard for AI context management, explaining its massive adoption.

#### Featured: ElevenLabs (#3 - 827K downloads)
**What it is**: AI voice generation and text-to-speech.

**Key Features**:
- Natural voice generation
- Voice cloning
- Multi-language support
- Emotion control
- Speed adjustment
- Multiple voices

**Use Cases**:
- Podcast automation
- Video narration
- Audiobook creation
- IVR systems
- Content localization
- Accessibility features

**Example**:
```
Trigger (New blog post)
  ↓
Get article content
  ↓
ElevenLabs (Convert to speech)
  ↓
Store audio file
  ↓
Update CMS with audio link
```

#### Featured: DeepSeek (#24 - 56K downloads)
**What it is**: DeepSeek AI model integration (alternative to OpenAI).

**Key Features**:
- OpenAI-compatible API
- Cost-effective pricing
- Multiple models
- Chat completion
- Function calling
- Streaming responses

**Use Cases**:
- Cost-conscious AI applications
- Alternative to GPT
- Chat applications
- Content generation
- Code assistance

#### Featured: UseAPI (#63 - 10K downloads)
**What it is**: Multi-platform AI integration hub.

**Supported Services**:
- Midjourney (image generation)
- Runway (video generation)
- Riffusion (music generation)
- Mureka (creative AI)
- MiniMax (AI models)
- InsightFaceSwap (face swapping)
- Pika (video AI)

**Use Cases**:
- Creative automation
- Multi-modal AI workflows
- Content generation
- Media processing

---

### 7. File & PDF Manipulation Nodes

Specialized tools for document and image processing.

| Rank | Package | Description | Monthly Downloads |
|------|---------|-------------|-------------------|
| #6 | **n8n-nodes-pdfkit** | Transform images to PDF | 403,678 |
| #49 | n8n-nodes-pdfco | Pdf.co integration | 15,925 |
| #77 | n8n-nodes-convert-image | Image format conversion | 7,015 |

#### Featured: PDFKit (#6 - 403K downloads)
**What it is**: Transform images into PDFs using PDFKit library.

**Key Features**:
- Multiple images to single PDF
- Image to PDF conversion
- Custom page sizes
- Orientation control
- Quality settings
- Batch processing

**Use Cases**:
- Document scanning
- Invoice generation
- Report creation
- Photo albums
- Archive creation

**Example**:
```
Trigger (Upload images)
  ↓
Process images
  ↓
PDFKit (Convert to PDF)
  ↓
Store in cloud storage
  ↓
Send email with PDF
```

---

### 8. Miscellaneous & Testing Nodes

Diverse tools including debug helpers, specialized services, and testing utilities.

| Rank | Package | Description | Monthly Downloads |
|------|---------|-------------|-------------------|
| #9 | **@tavily/core** | Tavily JavaScript library | 241,644 |
| #16 | @reportei/n8n-nodes-reportei | Reportei integration | 129,684 |
| #29 | n8n-nodes-megaapi | MegaAPI WhatsApp automation | 43,598 |
| #35 | n8n-nodes-ffmpeg26 | FFMPEG video processing | 30,454 |
| #96 | n8n-nodes-debughelper | Debug utilities collection | 5,471 |

#### Featured: Tavily Core (#9)
**What it is**: Official JavaScript library for Tavily AI search.

**Key Features**:
- AI-powered search
- Real-time results
- Query suggestions
- Research features
- Content extraction

**Use Cases**:
- Research automation
- Information retrieval
- Competitive intelligence
- Content discovery

#### Featured: FFMPEG (#35 - 30K downloads)
**What it is**: Video and audio processing using FFmpeg.

**Key Features**:
- Format conversion
- Video editing
- Audio extraction
- Thumbnail generation
- Compression
- Streaming

**Use Cases**:
- Media processing pipelines
- Video automation
- Content optimization
- Thumbnail generation
- Format standardization

---

## Node Categories Deep Dive

### Communication & Messaging

**Market Leaders**:
1. **WhatsApp** - Dominated by Evolution API (7.7M downloads)
2. **Chat Platforms** - ChatWoot leading customer support
3. **Email** - IMAP integration for advanced email workflows
4. **Regional** - Zalo (Vietnam), Exotel (India)

**Trends**:
- WhatsApp automation is the killer use case
- Multi-channel communication hubs gaining traction
- Brazilian market particularly active (Quepasa)
- Instagram automation emerging (3 new nodes)

### Browser Automation & Scraping

**Technology Split**:
- **API-based**: SerpAPI, Firecrawl (easier, faster)
- **Browser-based**: Playwright, Puppeteer (more capable)
- **Managed**: Browserless, ScrapeNinja (scalable)

**Best Practices**:
- Use API-based for simple data extraction
- Use browser automation for complex interactions
- Consider managed services for production scale

### API & Cloud Integrations

**Geographic Distribution**:
- **Global**: Power BI, Apify, LinkedIn
- **Brazil**: 5 payment systems in top 100
- **Regional**: Various country-specific services

**Popular Categories**:
- CRM systems
- Payment gateways
- Cloud storage
- Business intelligence
- Vector databases (emerging)

### AI & LLM Integration

**Market Shifts**:
1. **MCP Protocol** - New standard emerging (#2)
2. **Voice AI** - ElevenLabs dominating (#3)
3. **Alternative LLMs** - DeepSeek as OpenAI alternative
4. **Multi-modal** - UseAPI for creative AI

**Trends**:
- Move towards standardized protocols (MCP)
- Voice becoming mainstream
- Cost-conscious alternatives gaining share
- Multi-modal AI workflows increasing

---

## Growth Trends & Statistics

### Ecosystem Growth

```
📊 Growth Timeline:

Feb 2025:  1,075 nodes  (baseline)
Mar 2025:  1,225 nodes  (+150, +14%)
Apr 2025:  1,535 nodes  (+310, +25%)
May 2025:  1,725 nodes  (+115, +8%)
Jun 2025:  2,211 nodes  (+486, +28%)
Jul 2025:  2,515 nodes  (+304, +14%)
Aug 2025:  3,302 nodes  (+787, +31%)
Sep 2025:  3,668 nodes  (+366, +11%)
Oct 2025:  4,187 nodes  (+519, +14%)
Nov 2025:  4,665 nodes  (+478, +11%)

Total Growth: +3,590 nodes (334% increase)
```

### Daily Addition Rates

| Period | Nodes/Day | Trend |
|--------|-----------|-------|
| Feb-Mar | 5.8 | Initial growth |
| Mar-Apr | 8.1 | Accelerating ↑ |
| Apr-Jun | 12.6 | Rapid growth ↑ |
| Jun-Aug | 15.0 | Peak growth ↑ |
| Aug-Nov | 16.4 | Sustained ↔ |

**Current Rate**: **17.1 nodes per day** (highest ever)

### Adoption Patterns

**Top 10 by Downloads**:
1. Evolution API - 7.7M (WhatsApp)
2. MCP - 950K (AI Protocol)
3. ElevenLabs - 827K (Voice AI)
4. Quepasa - 428K (WhatsApp)
5. Kommo - 413K (CRM)
6. PDFKit - 403K (PDF Generation)
7. Chatwoot - 394K (Customer Support)
8. Notificame - 335K (Multi-channel)
9. Tavily - 241K (AI Search)
10. SerpAPI - 208K (Google Search)

**Insights**:
- WhatsApp integrations dominate (3 in top 10)
- AI/LLM nodes growing fastest
- PDF/document tools consistently popular
- Regional services gaining traction

---

## Most Downloaded Nodes

### Million+ Downloads Club

| Package | Downloads | Category |
|---------|-----------|----------|
| **n8n-nodes-evolution-api** | 7,777,485 | WhatsApp |
| **n8n-nodes-mcp** | 950,826 | AI/LLM |

### 500K+ Downloads

| Package | Downloads | Category |
|---------|-----------|----------|
| n8n-nodes-elevenlabs | 827,850 | Voice AI |

### 400K+ Downloads

| Package | Downloads | Category |
|---------|-----------|----------|
| n8n-nodes-quepasa | 428,101 | WhatsApp |
| n8n-nodes-kommo | 413,181 | CRM |
| n8n-nodes-pdfkit | 403,678 | PDF |

---

## Featured Solutions

### WhatsApp Automation Stack
```
Best Overall: evolution-api (7.7M downloads)
Premium: uazapi (207K downloads)
Open Source: waha (25K downloads)
Brazil Market: quepasa (428K downloads)

Recommended Stack:
Evolution API + Chatwoot + Global Variables
```

### Web Scraping Stack
```
Simple Data: SerpAPI (208K downloads)
Advanced Scraping: Playwright (52K downloads)
Managed Service: Browserless (68K downloads)
AI-Powered: Firecrawl (197K downloads)

Recommended Stack:
SerpAPI (search) + Playwright (automation) + Datastore (caching)
```

### AI/LLM Stack
```
Protocol: MCP (950K downloads)
Voice: ElevenLabs (827K downloads)
LLM Alternative: DeepSeek (56K downloads)
Search: Perplexity (26K downloads)

Recommended Stack:
MCP + ElevenLabs + OpenAI/DeepSeek + Qdrant
```

### Document Processing Stack
```
PDF Generation: PDForge (25K downloads)
Image to PDF: PDFKit (403K downloads)
Digital Signature: ZapSign (9K downloads)
OCR: TesseractJS (7K downloads)

Recommended Stack:
PDForge (AI generation) + PDFKit (conversion) + ZapSign (signatures)
```

---

## Best Practices

### Choosing Community Nodes

#### Evaluation Criteria
1. **Download Count** - Higher = more trusted
2. **Update Frequency** - Check "weeks ago" column
3. **Author Reputation** - Known developers/companies
4. **Documentation** - Check npm page for docs
5. **Version Number** - Stable (1.0+) vs beta (0.x)

#### Red Flags
- ⚠️ No updates in 100+ weeks
- ⚠️ Very low download count (< 1,000)
- ⚠️ Version 0.0.x (very early)
- ⚠️ No description or documentation
- ⚠️ Unverified author

#### Green Flags
- ✅ 10,000+ downloads
- ✅ Updated within 4 weeks
- ✅ Version 1.0 or higher
- ✅ Clear documentation
- ✅ Active GitHub repository
- ✅ Known company/developer

### Installation Tips

1. **Test in Development First**
   - Always test in non-production environment
   - Verify compatibility with your n8n version
   - Check for conflicts with existing nodes

2. **Monitor Performance**
   - Some nodes may be resource-intensive
   - Check execution times
   - Monitor memory usage

3. **Update Strategy**
   - Don't auto-update in production
   - Test updates in staging
   - Read changelog before updating

4. **Backup Before Installation**
   - Export workflows before installing new nodes
   - Backup n8n database
   - Document installed nodes

### Security Considerations

1. **Credential Safety**
   - Community nodes have access to credentials
   - Review source code for sensitive operations
   - Use external secrets when possible

2. **Network Access**
   - Some nodes make external API calls
   - Review network requirements
   - Consider firewall rules

3. **Data Privacy**
   - Understand where data is sent
   - Review privacy policies of services
   - Consider data residency requirements

4. **License Compliance**
   - Check node licenses
   - Verify commercial use rights
   - Review dependency licenses

---

## Resources

### Official n8n Documentation
- [Installing Community Nodes](https://docs.n8n.io/integrations/community-nodes/installation/)
- [Docker Installation](https://docs.n8n.io/hosting/installation/docker/)
- [Community Nodes Development](https://docs.n8n.io/integrations/creating-nodes/)

### Community Resources
- **n8n Community Forum**: https://community.n8n.io
- **GitHub Discussions**: https://github.com/n8n-io/n8n/discussions
- **Discord Server**: Active community support

### Related Guides
- [Web Scraping in n8n](https://pixeljets.com/blog/web-scraping-in-n8n/)
- [n8n for Developers](https://pixeljets.com/blog/n8n/)
- [Convert n8n Workflow to SaaS](https://pixeljets.com/n8n-to-saas/)

### Finding More Nodes

1. **npm Search**: https://www.npmjs.com/search?q=n8n-nodes
2. **GitHub Topics**: https://github.com/topics/n8n-nodes
3. **n8n Community**: https://community.n8n.io/c/nodes/
4. **This List**: Updated every ~3-4 weeks

### Contributing to Ecosystem

Want to create your own node?
1. Read [Creating Nodes Documentation](https://docs.n8n.io/integrations/creating-nodes/)
2. Use [n8n-node-dev](https://github.com/n8n-io/n8n/tree/master/packages/node-dev)
3. Follow [Node Development Best Practices](https://docs.n8n.io/integrations/creating-nodes/build/)
4. Publish to npm with `n8n-nodes-` prefix
5. Share in community forum

---

## Appendix

### Update Schedule

This list is updated approximately **every 3-4 weeks** with:
- New node additions marked with 🆕
- Updated download counts
- New ranking positions
- Growth statistics

### Methodology

**Ranking Criteria**:
- Primary: Monthly downloads from npmjs.com
- Data collected via automated crawler
- Includes only nodes with `n8n-nodes-` prefix or official packages
- Top 100 selected from 4,665+ total nodes

**Data Sources**:
- npmjs.com API
- Package metadata
- GitHub repository data
- Community submissions

### Legend

- 🆕 - New node added in latest update
- ↑ - Growth rate increasing
- → - Growth rate stable
- Package versions reflect latest published

### Geographic Notes

**Brazilian Ecosystem**:
The Brazilian n8n community is particularly active with nodes for:
- CNPJ (company lookup)
- Asaas (payments)
- Efibank (Pix + charges)
- Eduzz (marketplace)
- OpenPix (gateway)
- Quepasa (WhatsApp)

This reflects Brazil's strong adoption of n8n and localized automation needs.

### Related Projects

- **awesome-n8n**: Official documentation (brain-n8n-2.md)
- **n8n Repository**: Source code analysis (n8n-brain.md)
- **restyler-awesome-n8n**: This guide (brain-n8n-3.md)

---

**End of brain-n8n-3.md**

This comprehensive guide covers the n8n community node ecosystem with rankings, statistics, and practical guidance. Use it to discover and evaluate community-created nodes for your automation needs.

**Curated by**: restyler-awesome-n8n project
**Data as of**: 2025-11-16
**Total Nodes Indexed**: 4,665
