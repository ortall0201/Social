# N8N Unified Brain

> Comprehensive knowledge base combining source code, documentation, and community ecosystem
> Sources: n8n-brain.md, brain-n8n-2.md, brain-n8n-3.md
> Last Updated: 2025-11-24

## Table of Contents

- [Quick Reference](#quick-reference)
- [Core Concepts](#core-concepts)
- [Architecture & Code Structure](#architecture--code-structure)
- [Development Patterns](#development-patterns)
- [Node System & Integrations](#node-system--integrations)
- [Community Ecosystem](#community-ecosystem)
- [Workflow Design Patterns](#workflow-design-patterns)
- [Expression & Data Handling](#expression--data-handling)
- [Environment & Configuration](#environment--configuration)
- [Testing & Quality](#testing--quality)
- [Common Tasks](#common-tasks)
- [Troubleshooting](#troubleshooting)

---

## Quick Reference

### Essential Commands

```bash
# Development
pnpm dev              # Full stack (backend + frontend)
pnpm dev:ai           # AI/LangChain nodes development

# Building (ALWAYS redirect output)
pnpm build > build.log 2>&1
tail -n 20 build.log

# Testing
pnpm test                              # All tests
pnpm test:affected                     # Changed packages only
pushd packages/cli && pnpm test <file> # Specific test
popd

# Code Quality (run from package directory)
pushd packages/cli
pnpm lint
pnpm typecheck        # CRITICAL before committing
popd
```

### Critical Development Rules

**TypeScript**:
- ❌ NEVER use `any` type → Use proper types or `unknown`
- ❌ Avoid `as` casting → Use type guards
- ✅ Define shared types in `@n8n/api-types`

**Frontend**:
- ✅ ALL UI text must use i18n (`$locale.baseText()`)
- ✅ ALWAYS use CSS variables (`--spacing-*`, `--color-*`)
- ❌ Never hardcode px values
- ❌ data-test-id must be single value (no spaces)

**Backend**:
- ✅ Use `UnexpectedError`, `OperationalError`, `UserError`
- ❌ NEVER use `ApplicationError` (deprecated)
- ✅ Run `pnpm typecheck` before committing
- ✅ Work from package directory for tests

**Building**:
- When modifying type definitions, interfaces in `@n8n/api-types`, or cross-package dependencies
- Build BEFORE linting/typechecking

### Technology Stack

| Layer | Technologies |
|-------|-------------|
| **Backend** | Node.js 22+, Express 5, TypeScript 5.9, TypeORM |
| **Frontend** | Vue 3.5, Vite, Pinia, Element Plus, @vue-flow |
| **Database** | SQLite, PostgreSQL, MySQL, MariaDB |
| **Testing** | Jest (backend), Vitest (frontend), Playwright (E2E) |
| **AI/LLM** | LangChain, OpenAI, Anthropic, MCP Protocol |

---

## Core Concepts

### What is n8n?

**n8n** is a fair-code licensed **workflow automation platform** that enables:
- Visual workflow creation with 5,065+ nodes
- Connecting any app with an API
- Self-hosting capabilities
- AI-powered automation (LangChain integration)

### Hosting Methods

1. **n8n Cloud** - Managed service
2. **Docker** - Container-based (recommended)
3. **npm** - Node.js package
4. **Self-hosting** - Full control

### Key Components

#### 1. Workflows
- Visual flowcharts that automate tasks
- Consist of connected nodes
- Execute in specific order
- Triggered manually, scheduled, or via webhook

#### 2. Nodes (5,065+ total)
- **400+ Built-in Nodes** - Official integrations
- **4,665+ Community Nodes** - Community-created (growing 17.1/day)
- **Types**:
  - Trigger Nodes → Start workflow execution
  - Regular Nodes → Process data
  - AI Nodes → LangChain integration
  - Core Nodes → Built-in utilities

#### 3. Executions
- Individual runs of a workflow
- Store execution data and logs
- Can be viewed and debugged
- Support queue mode for scaling

#### 4. Credentials
- Secure storage for API keys and auth data
- Reusable across workflows
- Support for external secrets managers (AWS, Azure, GCP, Infisical, HashiCorp Vault)
- Encrypted storage with `N8N_ENCRYPTION_KEY`

#### 5. Variables
- Reusable values across workflows
- Environment-specific values
- Can be overridden per instance

---

## Architecture & Code Structure

### Monorepo Organization

```
n8n/
├── packages/
│   ├── cli/                    # Express server, REST API, main app (60K+ LOC)
│   │   ├── controllers/        # @RestController pattern
│   │   ├── services/           # Business logic layer
│   │   ├── modules/            # Feature modules
│   │   │   ├── mcp/            # Model Context Protocol
│   │   │   ├── chat-hub/       # Chat interface
│   │   │   ├── community-packages/
│   │   │   └── ...
│   │   └── databases/          # TypeORM config + migrations
│   ├── core/                   # Workflow execution engine
│   ├── workflow/               # Core interfaces & types
│   ├── nodes-base/             # 400+ built-in nodes
│   ├── @n8n/
│   │   ├── api-types/          # Shared FE/BE types (CRITICAL)
│   │   ├── db/                 # TypeORM entities + repos (30+ entities)
│   │   ├── config/             # Zod-based configuration
│   │   ├── di/                 # Dependency injection (fork of typedi)
│   │   ├── errors/             # Error classes
│   │   ├── permissions/        # RBAC system
│   │   ├── nodes-langchain/    # AI/LLM nodes
│   │   └── ...
│   ├── frontend/
│   │   ├── editor-ui/          # Vue 3 main app (60K+ LOC)
│   │   │   ├── stores/         # Pinia stores (workflows.store.ts = 60K LOC!)
│   │   │   ├── components/     # Vue components
│   │   │   ├── views/          # Route views
│   │   │   └── composables/    # Composition API
│   │   ├── @n8n/design-system/ # Reusable components (Storybook)
│   │   ├── @n8n/i18n/          # Translations
│   │   └── @n8n/stores/        # Shared Pinia stores
│   └── testing/
│       └── playwright/         # E2E tests (Page Object Model)
```

### Request Flow (Backend)

```
HTTP Request
  ↓
Express Middleware Chain
  ↓ Helmet → CORS → Body Parser → Cookie Parser → Compression
  ↓
Auth Middleware (JWT + MFA check)
  ↓
License Middleware (Feature flags)
  ↓
RBAC Middleware (Scope-based permissions)
  ↓
Controller Method (@RestController)
  ↓
Service Layer (Business logic)
  ↓
Repository Layer (TypeORM)
  ↓
Database
  ↓
Response Serialization
  ↓
HTTP Response
```

### Frontend Architecture

```
User (Browser)
  ↓
Vue 3 Frontend (editor-ui)
  ├─ Pinia Stores (State management)
  ├─ Components (Vue 3 Composition API)
  └─ Design System (@n8n/design-system)
  ↓
REST API (axios) + WebSocket (Push)
  ↓
@n8n/api-types (Shared types)
  ↓
Express Server (CLI package)
```

---

## Development Patterns

### Backend Patterns

#### 1. Controller-Service-Repository

**Controller** (REST endpoints):
```typescript
import { RestController, Get, Post, Param, Body } from '@n8n/decorators';

@RestController('/workflows')
export class WorkflowsController {
  constructor(private readonly workflowService: WorkflowService) {}

  @Get('/:id')
  async get(@Param('id') id: string) {
    return this.workflowService.findById(id);
  }

  @Post('/')
  async create(@Body() body: CreateWorkflowDto) {
    return this.workflowService.create(body);
  }
}
```

**Service** (Business logic):
```typescript
import { Service } from '@n8n/di';
import { UserError } from '@n8n/errors';

@Service()
export class WorkflowService {
  constructor(
    private readonly workflowRepository: WorkflowRepository,
    private readonly eventService: EventService,
  ) {}

  async findById(id: string): Promise<Workflow> {
    const workflow = await this.workflowRepository.findById(id);
    if (!workflow) throw new UserError('Workflow not found');
    return workflow;
  }

  async create(data: CreateWorkflowDto): Promise<Workflow> {
    const workflow = await this.workflowRepository.create(data);
    this.eventService.emit('workflow-created', { workflowId: workflow.id });
    return workflow;
  }
}
```

**Repository** (Data access):
```typescript
import { Service } from '@n8n/di';
import { DataSource, Repository } from '@n8n/typeorm';

@Service()
export class WorkflowRepository extends Repository<WorkflowEntity> {
  constructor(dataSource: DataSource) {
    super(WorkflowEntity, dataSource.manager);
  }

  async findById(id: string): Promise<WorkflowEntity | null> {
    return this.findOne({ where: { id } });
  }
}
```

#### 2. Dependency Injection

```typescript
import { Service } from '@n8n/di';

@Service()
export class MyService {
  constructor(
    private readonly dependency1: Dependency1,
    private readonly dependency2: Dependency2,
  ) {}
}

// Resolution
import { Container } from '@n8n/di';
const service = Container.get(MyService);
```

#### 3. Error Handling

```typescript
import { UserError, OperationalError, UnexpectedError } from '@n8n/errors';

// ✅ User-facing errors (400-level)
throw new UserError('Invalid workflow configuration');

// ✅ Expected runtime errors
throw new OperationalError('Database connection failed', { cause: error });

// ✅ Internal errors (500-level)
throw new UnexpectedError('Unexpected state', { cause: error });

// ❌ DEPRECATED - DO NOT USE
throw new ApplicationError('Error'); // NEVER use this
```

#### 4. Event-Driven Architecture

```typescript
// Publishing events
@Service()
export class WorkflowService {
  constructor(private readonly eventService: EventService) {}

  async activate(id: string): Promise<void> {
    // ... activation logic
    this.eventService.emit('workflow-activated', { workflowId: id });
  }
}

// Subscribing to events
@Service()
export class WorkflowAnalytics {
  @OnEvent('workflow-activated')
  handleWorkflowActivated(data: { workflowId: string }) {
    // Track analytics
  }
}
```

### Frontend Patterns

#### 1. Composition API + Pinia

**Component**:
```vue
<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useWorkflowsStore } from '@/stores/workflows.store';
import { useI18n } from '@/composables/useI18n';

const workflowsStore = useWorkflowsStore();
const i18n = useI18n();

const workflowName = ref('');
const isLoading = ref(false);

const hasWorkflows = computed(() => workflowsStore.allWorkflows.length > 0);

const saveWorkflow = async () => {
  isLoading.value = true;
  try {
    await workflowsStore.saveWorkflow({ name: workflowName.value });
  } finally {
    isLoading.value = false;
  }
};

onMounted(() => {
  workflowsStore.fetchAllWorkflows();
});
</script>

<template>
  <div :class="$style.container">
    <h1>{{ i18n.baseText('workflows.title') }}</h1>

    <n8n-input
      v-model="workflowName"
      :placeholder="i18n.baseText('workflows.namePlaceholder')"
    />

    <n8n-button
      :loading="isLoading"
      :disabled="!workflowName"
      @click="saveWorkflow"
    >
      {{ i18n.baseText('workflows.save') }}
    </n8n-button>
  </div>
</template>

<style module lang="scss">
.container {
  padding: var(--spacing--lg);

  h1 {
    font-size: var(--font-size--xl);
    margin-bottom: var(--spacing--md);
  }
}
</style>
```

**Pinia Store**:
```typescript
import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { restApiClient } from '@n8n/rest-api-client';

export const useWorkflowsStore = defineStore('workflows', () => {
  // State
  const workflows = ref<IWorkflowDb[]>([]);

  // Getters
  const allWorkflows = computed(() => workflows.value);

  // Actions
  async function fetchAllWorkflows() {
    const data = await restApiClient.workflows.getAll();
    workflows.value = data;
  }

  async function saveWorkflow(workflow: IWorkflowDb) {
    const saved = await restApiClient.workflows.create(workflow);
    workflows.value.push(saved);
    return saved;
  }

  return {
    workflows,
    allWorkflows,
    fetchAllWorkflows,
    saveWorkflow,
  };
});
```

#### 2. Composables for Reusable Logic

```typescript
// composables/useWorkflowActions.ts
import { useWorkflowsStore } from '@/stores/workflows.store';
import { useToast } from './useToast';
import { useI18n } from './useI18n';

export function useWorkflowActions() {
  const workflowsStore = useWorkflowsStore();
  const toast = useToast();
  const i18n = useI18n();

  async function activateWorkflow(id: string) {
    try {
      await workflowsStore.activateWorkflow(id);
      toast.showSuccess(i18n.baseText('workflows.activateSuccess'));
    } catch (error) {
      toast.showError(error, i18n.baseText('workflows.activateError'));
    }
  }

  return { activateWorkflow };
}
```

#### 3. Mandatory i18n

```vue
<template>
  <!-- ✅ CORRECT -->
  <h1>{{ $locale.baseText('workflows.title') }}</h1>
  <p>{{ i18n.baseText('workflows.count', { count: 5 }) }}</p>

  <!-- ❌ WRONG - Never hardcode text -->
  <h1>Workflows</h1>
</template>
```

**Adding translations** (in `@n8n/i18n` package):
```typescript
export const translations = {
  en: {
    workflows: {
      title: 'Workflows',
      namePlaceholder: 'Enter workflow name',
      save: 'Save',
      count: 'You have {count} workflows',
    },
  },
};
```

#### 4. CSS Variables Only

```scss
// ✅ CORRECT
.container {
  padding: var(--spacing--lg);        // 24px
  margin: var(--spacing--md);         // 20px
  gap: var(--spacing--sm);            // 16px

  color: var(--color--text);
  background: var(--color--background);

  font-size: var(--font-size--md);   // 16px
  font-weight: var(--font-weight--regular); // 400

  border-radius: var(--radius--lg);  // 8px
}

// ❌ WRONG - Never hardcode
.container {
  padding: 24px;
  margin: 20px;
  color: #333;
  font-size: 16px;
}
```

**Available CSS Variables**:
```css
/* Spacing */
--spacing--5xs: 2px    --spacing--xs: 12px   --spacing--lg: 24px
--spacing--4xs: 4px    --spacing--sm: 16px   --spacing--xl: 32px
--spacing--3xs: 6px    --spacing--md: 20px   --spacing--2xl: 48px
--spacing--2xs: 8px                          --spacing--3xl: 64px

/* Typography */
--font-size--3xs: 10px  --font-size--sm: 14px   --font-size--xl: 20px
--font-size--2xs: 12px  --font-size--md: 16px   --font-size--2xl: 28px
--font-size--xs: 13px   --font-size--lg: 18px

--font-weight--regular: 400
--font-weight--bold: 600

/* Colors */
--color--primary, --color--secondary, --color--success, --color--warning, --color--danger
--color--text, --color--foreground, --color--background (+ shades/tints)

/* Borders */
--radius--sm: 2px, --radius: 4px, --radius--lg: 8px, --radius--xl: 12px
```

---

## Node System & Integrations

### Built-in Nodes (400+)

**Core Nodes**:
- **HTTP Request** - Universal API connector
- **Code** - JavaScript/Python execution
- **If** - Conditional branching
- **Switch** - Multiple condition routing
- **Edit Fields (Set)** - Data transformation
- **Merge** - Combine data from multiple nodes
- **Split In Batches** - Process large datasets

**Trigger Nodes**:
- **Manual Trigger** - Manual execution
- **Schedule Trigger** - Cron-based scheduling
- **Webhook Trigger** - HTTP endpoints
- **Chat Trigger** - LangChain integration
- **Execute Workflow Trigger** - Workflow composition

**AI/LangChain Nodes** (@n8n/nodes-langchain):
- **LLM Nodes**: OpenAI, Anthropic, Google Gemini, Mistral, Ollama, HuggingFace
- **Vector Stores**: Pinecone, Qdrant, Weaviate, Chroma, Supabase
- **Agents**: OpenAI Agent, Conversational Agent, Tool Agent
- **Memory**: Buffer Memory, Window Memory, Vector Store Memory
- **Tools**: Calculator, Web Scraper, Wikipedia, Workflow Tool
- **MCP**: Model Context Protocol integration

**Popular Integration Nodes**:
- **Google**: Sheets, Gmail, Drive, Calendar
- **Communication**: Slack, Discord, Telegram, Microsoft Teams
- **CRM**: Salesforce, HubSpot, Pipedrive, Zendesk
- **Databases**: PostgreSQL, MySQL, MongoDB, Redis
- **Development**: GitHub, GitLab, Jira, Jenkins
- **Cloud Storage**: AWS S3, Dropbox, OneDrive, Box
- **E-commerce**: Shopify, WooCommerce, Stripe, PayPal

### Community Nodes (4,665+)

**Ecosystem Statistics** (as of 2025-11-16):
- **Total Nodes**: 4,665
- **Growth Rate**: 17.1 new nodes per day
- **9-Month Growth**: +3,590 nodes (334% increase)

**Top 10 Community Nodes by Downloads**:

| Rank | Package | Category | Downloads | Use Case |
|------|---------|----------|-----------|----------|
| #1 | **n8n-nodes-evolution-api** | WhatsApp | 7.7M | WhatsApp automation (dominant) |
| #2 | **n8n-nodes-mcp** | AI Protocol | 950K | Model Context Protocol (emerging standard) |
| #3 | **n8n-nodes-elevenlabs** | Voice AI | 827K | AI voice generation & TTS |
| #4 | n8n-nodes-quepasa | WhatsApp | 428K | WhatsApp (Brazil market) |
| #5 | n8n-nodes-kommo | CRM | 413K | Kommo CRM integration |
| #6 | n8n-nodes-pdfkit | PDF | 403K | Image to PDF conversion |
| #7 | n8n-nodes-chatwoot | Support | 394K | Customer support platform |
| #8 | n8n-nodes-notificame-hub | Multi-channel | 335K | Communication automation |
| #9 | @tavily/core | AI Search | 241K | AI-powered search |
| #10 | n8n-nodes-serpapi | Search | 208K | Google Search API |

**Community Node Categories**:

1. **Communication & Messaging** (20 nodes in top 100)
   - WhatsApp integrations dominate (Evolution API, Quepasa, Uazapi, Wuzapi)
   - Chat platforms (Chatwoot, Discord, Telegram)
   - Email (IMAP integration)

2. **AI, LLM & Voice** (9 nodes)
   - MCP Protocol (#2) - new AI context standard
   - ElevenLabs (#3) - voice generation
   - DeepSeek - OpenAI alternative
   - Perplexity AI, GitHub Copilot
   - UseAPI - Multi-modal AI (Midjourney, Runway, etc.)

3. **Browser Automation & Web Scraping** (9 nodes)
   - SerpAPI (#10) - Google Search
   - Firecrawl, Playwright, Puppeteer
   - Browserless, ScrapeNinja

4. **API & Cloud Integrations** (32 nodes - largest category)
   - Power BI, Apify, LinkedIn, Instagram
   - MinIO, Qdrant (vector DB), Hostinger
   - Brazilian payment systems (Asaas, Efibank, OpenPix, Eduzz)

5. **Document & Content Generation** (3 nodes)
   - PDForge - AI-powered PDF generation
   - ZapSign - Digital signatures
   - QRCode generation

6. **Data Processing & Utilities** (6 nodes)
   - Cronlytic - Advanced cron scheduling
   - Phone number parser
   - Global variables
   - TesseractJS - OCR

**Installation Methods**:

**Via n8n UI** (Recommended):
```
Settings → Community Nodes → Install → Enter package name → Install → Restart
```

**Via npm**:
```bash
cd ~/.n8n
npm install <package-name>
pm2 restart n8n
```

**Docker**:
```dockerfile
FROM n8nio/n8n
RUN cd /usr/local/lib/node_modules/n8n && \
    npm install n8n-nodes-evolution-api n8n-nodes-chatwoot
```

**Choosing Community Nodes**:

**Green Flags** ✅:
- 10,000+ downloads
- Updated within 4 weeks
- Version 1.0 or higher
- Clear documentation
- Known company/developer

**Red Flags** ⚠️:
- No updates in 100+ weeks
- Very low downloads (< 1,000)
- Version 0.0.x (very early)
- No documentation
- Unverified author

---

## Workflow Design Patterns

### 1. REST API Endpoint Creation

```
Webhook Trigger (POST /api/users)
  ↓
Code Node (Validate input)
  ↓
If Node (Valid?)
  ↓ TRUE                    ↓ FALSE
PostgreSQL (Insert)       Respond (400 Error)
  ↓
Respond (201 Created)
```

**Use Cases**: Custom APIs, integrations, form handling

### 2. AI Agent Chat

```
Chat Trigger
  ↓
AI Agent
  ├─→ OpenAI (GPT-4) / Claude / DeepSeek
  ├─→ Memory (Buffer/Vector Store)
  └─→ Tools (Wikipedia, Calculator, Custom)
  ↓
Response
```

**Use Cases**: Customer support, chatbots, AI assistants

### 3. Web Scraping + AI Summarization

```
Schedule Trigger (Daily)
  ↓
HTTP Request / Playwright (Extract data)
  ↓
AI Summarize (OpenAI/Claude)
  ↓
Send Notification (Slack/Email)
```

**Use Cases**: Content monitoring, competitor research, news aggregation

### 4. Data Integration & Sync

```
Trigger (Schedule/Webhook)
  ↓
Fetch Data (API 1 / Database)
  ↓
Transform (Code/Edit Fields)
  ↓
Send Data (API 2 / Database)
```

**Use Cases**: CRM sync, data migration, system integration

### 5. Scheduled Reports

```
Schedule Trigger (Weekly, Monday 9am)
  ↓
Query Data (Database/API)
  ↓
Code (Calculate metrics)
  ↓
QuickChart (Generate visualizations)
  ↓
Gmail/Slack (Send report)
```

**Use Cases**: Business intelligence, analytics, KPI tracking

### 6. Error Handling Pattern

```
Try Flow
  ↓
Main Workflow Logic
  ↓ (On Error)
Error Handler
  ↓
├─→ Notification (Slack/Email)
├─→ Log Error (Database/File)
└─→ Retry (If appropriate)
```

**Best Practices**:
- Use If node to check for errors
- Use Error Trigger to catch failures
- Log errors for debugging
- Implement retry logic with delays
- Notify relevant team members

### 7. WhatsApp Automation (Most Popular)

```
Webhook (Evolution API)
  ↓
Parse Message
  ↓
If (Message Type?)
  ├─→ Text: AI Response (OpenAI)
  ├─→ Media: Process & Store
  └─→ Button: Execute Action
  ↓
Evolution API (Send Response)
```

**Popular Stack**: Evolution API + Chatwoot + OpenAI

**Use Cases**: Customer support, order notifications, lead qualification

---

## Expression & Data Handling

### Expression Basics

**Format**: All expressions use `{{ expression }}`

**Toggle**: Hover over parameter → Select **Expressions** toggle

### Accessing Data

```javascript
// Current node data
{{ $json.fieldName }}
{{ $json['field-with-spaces'] }}
{{ $json.nested.property }}

// From webhook body
{{ $json.body.city }}
{{ $json.body.name }}

// Previous node data
{{ $('NodeName').item.json.field }}
{{ $('HTTP Request').all() }}

// Check if node executed
{{ $("NodeName").isExecuted }}
```

### Built-in Variables

```javascript
$json          // Current item JSON data
$binary        // Current item binary data
$input         // All input data
$node          // Current node info
$workflow      // Workflow metadata
$execution     // Execution info
$now           // Current DateTime (Luxon)
$today         // Today at midnight (Luxon)
$pageCount     // Pagination counter
$response      // HTTP response data
```

### Date & Time with Luxon

**Luxon** is included by default for date/time operations.

```javascript
// Current date/time
{{ $now }}                          // Current timestamp
{{ $today }}                        // Today at 00:00:00

// Convert string to date
{{ DateTime.fromISO('2019-06-23T00:00:00.00') }}
{{ DateTime.fromFormat("23-06-2019", "dd-MM-yyyy") }}

// Date math
{{ $today.minus({days: 7}) }}       // 7 days ago
{{ $now.plus({months: 1}) }}        // Add 1 month
{{ DateTime.fromISO('2019-06-23').diff(DateTime.fromISO('2019-05-23'), 'months') }}

// Format dates
{{ $today.toLocaleString() }}       // Human readable
{{ $now.toFormat('yyyy-MM-dd HH:mm:ss') }}  // Custom format
{{ $now.toISO() }}                  // ISO string

// Timezone (set via GENERIC_TIMEZONE env var)
// Default: America/New_York
```

### JMESPath for JSON Queries

**Syntax**: `$jmespath(object, searchString)`

```javascript
// Given JSON:
{
  "people": [
    {"first": "James", "last": "Green"},
    {"first": "Jacob", "last": "Jones"}
  ],
  "dogs": {
    "Fido": {"color": "brown", "age": 7},
    "Spot": {"color": "black", "age": 5}
  }
}

// Get all first names
{{ $jmespath($json.people, "[*].first") }}
// Returns: ["James", "Jacob"]

// Slice (first two)
{{ $jmespath($json.people, "[:2].first") }}

// Get dog ages
{{ $jmespath($json.dogs, "*.age") }}
// Returns: [7, 5]

// Filter by condition
{{ $jmespath($("Code").all(), "[?json.name=='Lenovo'].json.category_id") }}
```

### JavaScript/Python Code

**JavaScript Example**:
```javascript
// Process all input items
let items = $input.all();
let results = [];

for (let i = 0; i < items.length; i++) {
  let item = items[i].json;
  results.push({
    json: {
      processed: item.value * 2,
      timestamp: new Date().toISOString()
    }
  });
}

return results;
```

**Python Example**:
```python
# Process items
results = []
for item in items:
    results.append({
        "json": {
            "processed": item.json["value"] * 2
        }
    })
return results
```

**Enable External Modules**:
```bash
# Built-in modules
export NODE_FUNCTION_ALLOW_BUILTIN=crypto,fs

# External modules
export NODE_FUNCTION_ALLOW_EXTERNAL=moment,lodash
```

### Conditionals & Default Values

```javascript
// Ternary operator
{{ $json.status === "active" ? "Yes" : "No" }}

// Logical OR (default value)
{{ $json.price || 0 }}

// Null coalescing
{{ $json.email ?? "no-email" }}

// Check for empty
{{ $json.variable ? $json.variable : "not found" }}
```

### Pagination

```javascript
// Next page number
{{ $pageCount + 1 }}

// Next URL from response
{{ $response.body['next-url'] }}
{{ $response.body.pagination.next }}
```

---

## Environment & Configuration

### Configuration Methods

1. **Command Line (npm)**:
```bash
export VARIABLE_NAME=value
```

2. **Docker**:
```bash
docker run -e N8N_HOST=0.0.0.0 -e N8N_PORT=5678 n8nio/n8n
```

3. **Docker Compose**:
```yaml
services:
  n8n:
    environment:
      - N8N_HOST=0.0.0.0
      - N8N_PORT=5678
```

4. **File-Based Variables** (append `_FILE`):
```bash
DB_POSTGRESDB_PASSWORD_FILE=/path/to/password
```

### Essential Environment Variables

#### Deployment

| Variable | Default | Description |
|----------|---------|-------------|
| `N8N_HOST` | `localhost` | Host name |
| `N8N_PORT` | `5678` | HTTP port |
| `N8N_PROTOCOL` | `http` | Protocol (http/https) |
| `N8N_EDITOR_BASE_URL` | - | Public URL for editor |
| `WEBHOOK_URL` | - | Webhook URL (for reverse proxy) |

#### Database

| Variable | Default | Description |
|----------|---------|-------------|
| `DB_TYPE` | `sqlite` | Database type (sqlite/postgresdb/mysqldb/mariadb) |
| `DB_POSTGRESDB_HOST` | `localhost` | PostgreSQL host |
| `DB_POSTGRESDB_PORT` | `5432` | PostgreSQL port |
| `DB_POSTGRESDB_DATABASE` | `n8n` | Database name |
| `DB_POSTGRESDB_USER` | `postgres` | Database user |
| `DB_POSTGRESDB_PASSWORD` | - | Database password |
| `DB_POSTGRESDB_POOL_SIZE` | `2` | Connection pool size |

#### Executions

| Variable | Default | Description |
|----------|---------|-------------|
| `EXECUTIONS_MODE` | `regular` | Execution mode (regular/queue) |
| `EXECUTIONS_TIMEOUT` | `-1` | Default timeout (seconds) |
| `EXECUTIONS_DATA_SAVE_ON_ERROR` | `all` | Save data on error |
| `EXECUTIONS_DATA_SAVE_ON_SUCCESS` | `all` | Save data on success |
| `EXECUTIONS_DATA_PRUNE` | `true` | Auto-delete old executions |
| `EXECUTIONS_DATA_MAX_AGE` | `336` | Max age (hours) |

#### Queue Mode (Scaling)

| Variable | Default | Description |
|----------|---------|-------------|
| `EXECUTIONS_MODE` | `regular` | Set to `queue` for scaling |
| `QUEUE_BULL_REDIS_HOST` | `localhost` | Redis host |
| `QUEUE_BULL_REDIS_PORT` | `6379` | Redis port |
| `QUEUE_BULL_REDIS_PASSWORD` | - | Redis password |

#### Security

| Variable | Default | Description |
|----------|---------|-------------|
| `N8N_ENCRYPTION_KEY` | Auto-generated | Credential encryption key |
| `N8N_USER_MANAGEMENT_JWT_SECRET` | Auto-generated | JWT secret |
| `N8N_MFA_ENABLED` | `true` | Enable MFA |

#### Nodes

| Variable | Default | Description |
|----------|---------|-------------|
| `NODE_FUNCTION_ALLOW_BUILTIN` | - | Allowed built-in modules |
| `NODE_FUNCTION_ALLOW_EXTERNAL` | - | Allowed external modules |
| `NODES_EXCLUDE` | - | Excluded node types |
| `NODES_INCLUDE` | - | Only include these nodes |

#### Timezone & Localization

| Variable | Default | Description |
|----------|---------|-------------|
| `GENERIC_TIMEZONE` | `America/New_York` | Default timezone |
| `N8N_DEFAULT_LOCALE` | `en` | Default locale |

#### Binary Data

| Variable | Default | Description |
|----------|---------|-------------|
| `N8N_DEFAULT_BINARY_DATA_MODE` | `default` | Storage mode (default/filesystem/s3) |
| `N8N_BINARY_DATA_STORAGE_PATH` | `~/.n8n/binaryData` | Storage path |

#### External Storage (S3)

| Variable | Description |
|----------|-------------|
| `N8N_EXTERNAL_STORAGE_S3_HOST` | S3 host |
| `N8N_EXTERNAL_STORAGE_S3_BUCKET_NAME` | Bucket name |
| `N8N_EXTERNAL_STORAGE_S3_BUCKET_REGION` | Region |
| `N8N_EXTERNAL_STORAGE_S3_ACCESS_KEY` | Access key |
| `N8N_EXTERNAL_STORAGE_S3_ACCESS_SECRET` | Secret key |

### Docker Compose Example (Production)

```yaml
version: '3.8'
services:
  n8n:
    image: n8nio/n8n
    restart: unless-stopped
    ports:
      - "5678:5678"
    environment:
      - N8N_HOST=n8n.example.com
      - N8N_PROTOCOL=https
      - N8N_PORT=5678
      - WEBHOOK_URL=https://n8n.example.com/
      - DB_TYPE=postgresdb
      - DB_POSTGRESDB_HOST=postgres
      - DB_POSTGRESDB_DATABASE=n8n
      - DB_POSTGRESDB_USER=n8n
      - DB_POSTGRESDB_PASSWORD_FILE=/run/secrets/db_password
      - EXECUTIONS_MODE=queue
      - QUEUE_BULL_REDIS_HOST=redis
      - QUEUE_BULL_REDIS_PORT=6379
    volumes:
      - n8n_data:/home/node/.n8n
    secrets:
      - db_password
    depends_on:
      - postgres
      - redis

  postgres:
    image: postgres:15
    restart: unless-stopped
    environment:
      - POSTGRES_USER=n8n
      - POSTGRES_PASSWORD_FILE=/run/secrets/db_password
      - POSTGRES_DB=n8n
    volumes:
      - postgres_data:/var/lib/postgresql/data
    secrets:
      - db_password

  redis:
    image: redis:7
    restart: unless-stopped

volumes:
  n8n_data:
  postgres_data:

secrets:
  db_password:
    file: ./db_password.txt
```

---

## Testing & Quality

### Testing Strategy

**Backend Tests** (Jest):
- Unit tests for services
- Integration tests for controllers
- Repository tests with mocked database
- Mock external dependencies with `nock`

**Frontend Tests** (Vitest):
- Component tests
- Store tests
- Composable tests

**E2E Tests** (Playwright):
- Workflow creation
- Node execution
- Credential management
- User workflows

### Running Tests

```bash
# All tests
pnpm test

# Affected tests only (faster)
pnpm test:affected

# Specific package test
pushd packages/cli
pnpm test
popd

# Specific test file (MUST be in package directory)
pushd packages/cli
pnpm test src/services/workflow.service.test.ts
popd

# Frontend tests
pushd packages/frontend/editor-ui
pnpm test
popd

# E2E tests (Playwright)
pnpm --filter=n8n-playwright test:local
pnpm --filter=n8n-playwright test:container:postgres
pnpm --filter=n8n-playwright test:local --ui  # UI mode
```

### Testing Best Practices

1. **Always work from package directory** when running tests
2. **Mock all external dependencies** in unit tests
3. **Confirm test cases with user** before writing unit tests
4. **Use nock** for server mocking
5. **Tag Playwright tests** appropriately (@db:reset, @mode:postgres)

### Type Checking (CRITICAL)

```bash
# From package directory
pushd packages/cli
pnpm typecheck
popd

# Full repo (before PR)
pnpm typecheck
```

**CRITICAL**: ALWAYS run `pnpm typecheck` before committing!

### Linting

```bash
# From package directory
pushd packages/cli
pnpm lint          # Check
pnpm lint:fix      # Fix automatically
popd

# Full repo (only for final PR)
pnpm lint
```

### Pre-commit Checklist

1. ✅ All tests pass (`pnpm test`)
2. ✅ Type check passes (`pnpm typecheck`)
3. ✅ Linting passes (`pnpm lint`)
4. ✅ No `any` types used
5. ✅ All UI text uses i18n
6. ✅ CSS variables used (no hardcoded px)
7. ✅ Proper error classes used (no ApplicationError)

---

## Common Tasks

### Task 1: Build a REST API

```
Webhook Trigger (POST /api/users)
  ↓
Code (Validate input)
  ↓
If (Valid?)
  ↓ TRUE                    ↓ FALSE
PostgreSQL (Insert)       Respond (400 Error)
  ↓
Respond (201 Created)
```

**Code Node (Validation)**:
```javascript
const body = $json.body;

if (!body.email || !body.name) {
  return [{
    json: {
      valid: false,
      error: "Missing required fields"
    }
  }];
}

return [{
  json: {
    valid: true,
    email: body.email,
    name: body.name
  }
}];
```

### Task 2: AI Customer Support

```
Chat Trigger
  ↓
AI Agent
  ├─→ OpenAI (GPT-4) / Claude / DeepSeek
  ├─→ Vector Store (Knowledge base)
  ├─→ Tool: Search Tickets
  └─→ Tool: Create Ticket
```

**Agent System Message**:
```
You are a helpful customer support agent.
You have access to:
1. Knowledge base for common questions
2. Search past support tickets
3. Create new support tickets

Always be friendly and professional.
If you can't answer, create a ticket for human review.
```

### Task 3: WhatsApp Automation

```
Evolution API (Webhook)
  ↓
Parse Message
  ↓
If (Message Type?)
  ├─→ Text: AI Response (OpenAI)
  ├─→ Order: Process & Store
  └─→ Question: Search FAQ
  ↓
Evolution API (Send Response)
```

**Installation**:
```bash
npm install n8n-nodes-evolution-api
```

### Task 4: Data Sync

```
Schedule Trigger (Every hour)
  ↓
Airtable (Get new records)
  ↓
Split In Batches (100 items)
  ↓
Loop:
  ├─→ Transform Data
  ├─→ PostgreSQL (Upsert)
  └─→ (Next batch)
  ↓
Slack (Notify completion)
```

### Task 5: Scheduled Report

```
Schedule Trigger (Weekly, Monday 9am)
  ↓
PostgreSQL (Query sales data)
  ↓
Code (Calculate metrics)
  ↓
QuickChart (Generate chart)
  ↓
Gmail (Send report)
```

**SQL Query**:
```sql
SELECT DATE(created_at) as date, SUM(amount) as total
FROM sales
WHERE created_at >= DATE_SUB(NOW(), INTERVAL 7 DAY)
GROUP BY DATE(created_at)
```

---

## Troubleshooting

### Common Issues

#### 1. "Workflow could not be started"

**Causes**:
- Missing credentials
- Invalid node configuration
- Trigger not enabled

**Solutions**:
- Check all credentials are configured
- Verify node parameters
- Ensure workflow is activated

#### 2. "Can't get data for expression"

**Cause**: Referenced node hasn't executed yet

**Solutions**:
- Execute workflow up to that node first
- Check node execution order
- Verify: `$("NodeName").isExecuted`

#### 3. Timeout Errors

**Causes**:
- Long-running API calls
- Large data processing
- Database query timeout

**Solutions**:
- Increase `EXECUTIONS_TIMEOUT`
- Use pagination for large datasets
- Optimize database queries
- Split into multiple workflows

#### 4. Webhook Not Receiving Data

**Causes**:
- Incorrect webhook URL
- Workflow not activated
- Reverse proxy misconfiguration

**Solutions**:
- Verify webhook URL matches external service
- Activate workflow
- Set `WEBHOOK_URL` environment variable
- Check reverse proxy headers

#### 5. Memory Issues

**Causes**:
- Large datasets in memory
- Binary data processing
- Many concurrent executions

**Solutions**:
- Use Split In Batches
- Enable binary data on filesystem/S3:
  ```bash
  N8N_DEFAULT_BINARY_DATA_MODE=filesystem
  # or
  N8N_DEFAULT_BINARY_DATA_MODE=s3
  ```
- Limit concurrent executions
- Increase container memory

#### 6. Database Connection Errors

**Causes**:
- Wrong credentials
- Network issues
- Connection pool exhausted

**Solutions**:
- Verify DB credentials
- Check network connectivity
- Increase `DB_POSTGRESDB_POOL_SIZE`
- Review connection timeout settings

### Debugging Techniques

**1. Execution Logs**:
- View execution history
- Check node outputs
- Review error messages
- Check execution time

**2. Test Individually**:
- Execute nodes one at a time
- Check each node's output
- Verify data transformation

**3. Enable Debug Logging**:
```bash
N8N_LOG_LEVEL=debug
N8N_LOG_OUTPUT=console
```

**4. Webhook Testing**:
```bash
curl -X POST https://your-n8n.com/webhook/test \
  -H "Content-Type: application/json" \
  -d '{"test": "data"}'
```

### Performance Optimization

**1. Large Datasets**: Use Split In Batches (100-1000 items per batch)

**2. API Rate Limits**: Add Wait node between requests

**3. Database Queries**:
- Add WHERE clauses
- Use indexes
- Limit result sets

**4. Queue Mode** (for scaling):
```yaml
n8n-main:
  environment:
    - EXECUTIONS_MODE=queue
    - QUEUE_BULL_REDIS_HOST=redis

n8n-worker:
  environment:
    - EXECUTIONS_MODE=queue
    - N8N_DISABLE_UI=true
```

---

## Appendix: Key Statistics

### Ecosystem Overview (2025)

- **Total Nodes**: 5,065 (400 built-in + 4,665 community)
- **Growth Rate**: 17.1 new nodes per day
- **9-Month Growth**: 334% (1,075 → 4,665 nodes)
- **Top Node**: Evolution API (7.7M downloads)
- **Emerging Tech**: MCP Protocol (#2, 950K downloads)

### Technology Versions

- **Node.js**: 22+
- **TypeScript**: 5.9
- **Vue**: 3.5
- **Express**: 5.1
- **pnpm**: 10.22.0

### Repository Metrics

- **Monorepo Packages**: 40+
- **CLI Package**: 60,000+ LOC
- **Frontend Package**: 60,000+ LOC
- **Largest Store**: workflows.store.ts (60,000+ LOC!)
- **TypeORM Entities**: 30+

---

**End of Unified Brain**

This document combines knowledge from:
- `n8n-brain.md` - Source code architecture
- `brain-n8n-2.md` - Official documentation
- `brain-n8n-3.md` - Community ecosystem

Use this as the definitive reference for n8n development, workflow design, and integration selection.
