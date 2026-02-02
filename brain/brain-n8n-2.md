# brain-n8n-2.md

> Comprehensive LLM-Optimized n8n Documentation Knowledge Base
> Source: awesome-n8n repository (n8n-docs-llms.txt - 42,161 lines)
> Documentation scraped: June 24th, 2025
> Generated: 2025-11-24

## Table of Contents

- [About This Documentation](#about-this-documentation)
- [Core n8n Concepts](#core-n8n-concepts)
- [Workflow Patterns & Templates](#workflow-patterns--templates)
- [Node Reference Guide](#node-reference-guide)
- [Expressions & Code](#expressions--code)
- [Credentials & Authentication](#credentials--authentication)
- [Environment Variables](#environment-variables)
- [Source Control & Environments](#source-control--environments)
- [Best Practices](#best-practices)
- [Common Tasks & Examples](#common-tasks--examples)
- [Troubleshooting](#troubleshooting)

---

## About This Documentation

### What is awesome-n8n?

**awesome-n8n** is a community-driven knowledge base created by **Synaptiv AI** that provides:
- **LLM-ready n8n documentation** in a clean, structured format
- **Complete official n8n docs** (scraped June 24th, 2025)
- **1.4MB** of pure documentation (**42,161 lines**)
- **No HTML artifacts** - perfectly formatted for AI/LLM consumption

### Key Features

✅ **Comprehensive Coverage**:
- Every node (400+ integrations)
- Every feature
- Every integration
- All configuration options

✅ **LLM-Optimized Format**:
- Clean markdown structure
- No broken formatting
- No HTML artifacts
- Perfect for RAG pipelines

✅ **Use Cases**:
- Build custom n8n AI assistants
- Power RAG applications
- Train custom models
- Enhanced development workflows
- Instant accurate answers

### File Structure

```
awesome-n8n/
├── README.md                   # Community project overview
├── n8n-docs-llms.txt          # Complete n8n documentation (42K lines)
└── .gitignore                 # Git ignore rules
```

---

## Core n8n Concepts

### What is n8n?

**n8n** is a fair-code licensed **workflow automation tool** that enables:
- Connecting any app with an API
- Data manipulation with minimal coding
- Highly flexible workflows
- Customizable nodes
- Self-hosting capabilities

### Hosting Methods

1. **n8n Cloud** - Managed service by n8n
2. **npm** - Install via Node.js package manager
3. **Docker** - Container-based deployment
4. **Self-hosting** - Full control over infrastructure

### Key Components

#### 1. **Workflows**
- Visual flowcharts that automate tasks
- Consist of connected nodes
- Execute in specific order
- Can be triggered manually, on schedule, or via webhook

#### 2. **Nodes**
- Building blocks of workflows
- Each node performs a specific action
- Types:
  - **Trigger Nodes** - Start workflow execution
  - **Regular Nodes** - Process data
  - **AI Nodes** - LangChain integration
  - **Core Nodes** - Built-in functionality

#### 3. **Connections**
- Links between nodes that pass data
- Control flow of execution
- Can have multiple connections (branching)

#### 4. **Executions**
- Individual runs of a workflow
- Store execution data and logs
- Can be viewed and debugged

#### 5. **Credentials**
- Secure storage for API keys and auth data
- Reusable across workflows
- Support for external secrets managers

#### 6. **Variables**
- Reusable values across workflows
- Environment-specific values
- Can be overridden per instance

---

## Workflow Patterns & Templates

### Common Workflow Patterns

#### 1. **API Endpoint Creation**
```
Webhook Trigger → Process Data → Return Response
```
- Create custom REST API endpoints
- Process incoming requests
- Return structured responses

#### 2. **AI Agent Chat**
```
Chat Trigger → AI Agent → OpenAI/Claude → Memory → Response
```
- Interactive chat interfaces
- Context-aware conversations
- Memory management for continuity

#### 3. **Web Scraping & AI Summarization**
```
Schedule Trigger → HTTP Request → HTML Extract → AI Summarize → Send Notification
```
- Automated content extraction
- AI-powered summarization
- Scheduled execution

#### 4. **Data Integration**
```
Trigger → Fetch Data (API 1) → Transform → Send Data (API 2)
```
- Connect different systems
- Transform data formats
- Sync information

#### 5. **Backup to GitHub**
```
Schedule Trigger → Get Workflows → HTTP Request (GitHub API) → Commit
```
- Automated workflow backups
- Version control integration
- Disaster recovery

#### 6. **JSON to Excel**
```
Trigger → JSON Input → Spreadsheet File → Email/Save
```
- Data format conversion
- Report generation
- Automated exports

### Example Workflows Included

#### AI Tutorial Workflow
**Nodes**:
1. **Chat Trigger** - Receives user messages
2. **AI Agent** - Processes with LangChain
3. **OpenAI Chat Model** (gpt-4o-mini)
4. **Simple Memory** - Maintains conversation context

**Connections**: Chat → Agent → OpenAI + Memory

#### Agents vs Chains Workflow
**Features**:
- Demonstrates difference between AI agents and chains
- Wikipedia tool integration
- Memory management
- Dynamic routing based on user input

#### Weekly Report Workflow
**Flow**:
```
Schedule Trigger (Weekly, Monday 9am)
  ↓
HTTP Request (Custom ERP)
  ↓
If (orderStatus == "processing")
  ↓
├─→ Edit Fields → Airtable (Log data)
└─→ Code (Calculate totals) → Discord (Send report)
```

**Features**:
- Scheduled execution
- Conditional logic
- Data transformation
- Multi-destination output

#### "Ask a Human" Workflow
**Advanced Pattern**:
- AI agent with fallback to human
- Email extraction via regex
- Conditional branching
- Tool integration (dont_know_tool)

**Flow**:
1. Chat Trigger receives question
2. AI Agent attempts to answer
3. If uncertain, uses "dont_know_tool"
4. Checks for email in user message
5. Either prompts for email or sends to human

---

## Node Reference Guide

### Trigger Nodes

#### Manual Trigger
- Manual workflow execution
- Testing and development
- No parameters required

#### Schedule Trigger
- Time-based automation
- **Intervals**: Minutes, hours, days, weeks, months
- **Cron expressions** supported
- **Example**: Every Monday at 9am

#### Webhook Trigger
- HTTP endpoint creation
- GET, POST, PUT, DELETE methods
- Authentication options
- Test and production modes

#### Chat Trigger
- LangChain integration
- Chat interface trigger
- Memory support
- WebSocket communication

#### Execute Workflow Trigger
- Called by other workflows
- Pass data between workflows
- Workflow composition

### Core Nodes

#### HTTP Request
**Most versatile node** - Make HTTP requests to any API

**Features**:
- All HTTP methods (GET, POST, PUT, DELETE, PATCH)
- Authentication support (Basic, OAuth2, API Key, etc.)
- Custom headers
- Query parameters
- Pagination support
- Binary data handling

**Pagination Modes**:
1. **Response Contains Next URL**: Use `$response.body['next-page']`
2. **Update Parameter**: Use `$pageCount + 1` for page numbers
3. **Body Parameters**: For POST requests

**Example**:
```javascript
// GET request with pagination
{
  "method": "GET",
  "url": "https://api.example.com/data",
  "qs": {
    "page": "{{ $pageCount + 1 }}",
    "limit": 100
  }
}
```

#### Code Node
**Execute JavaScript or Python** code

**JavaScript Features**:
- Access to `$input` data
- Helper functions (`$jmespath`, `$json`, `$binary`)
- Luxon for date/time
- Return data via `return []`

**Python Features**:
- Access to `_input` data
- Return data via `return []`
- Limited library support (requires env vars)

**Enable External Modules**:
```bash
# Built-in modules
export NODE_FUNCTION_ALLOW_BUILTIN=crypto,fs

# External modules
export NODE_FUNCTION_ALLOW_EXTERNAL=moment,lodash
```

**Example**:
```javascript
// Calculate sum and count
let items = $input.all();
let totalBooked = items.length;
let bookedSum = 0;

for (let i=0; i < items.length; i++) {
  bookedSum = bookedSum + items[i].json.orderPrice;
}

return [{ json: {totalBooked, bookedSum} }];
```

#### If Node
**Conditional branching**

**Features**:
- Multiple conditions
- AND/OR combinators
- String, number, boolean, date comparisons
- Regex matching
- Two outputs: true/false branches

**Example**:
```javascript
{
  "conditions": {
    "combinator": "and",
    "conditions": [
      {
        "leftValue": "={{ $json.orderStatus }}",
        "rightValue": "processing",
        "operator": { "type": "string", "operation": "equals" }
      }
    ]
  }
}
```

#### Switch Node
**Multiple condition routing**

**Features**:
- Route to different outputs based on conditions
- Support for regular expressions
- Default fallback route
- Check multiple values

#### Edit Fields (Set Node)
**Transform and manipulate data**

**Operations**:
- Set field values
- Remove fields
- Rename fields
- Type conversion (string, number, boolean)

**Example**:
```javascript
{
  "assignments": [
    { "name": "orderID", "value": "={{ $json.orderID }}", "type": "number" },
    { "name": "employeeName", "value": "={{ $json.employeeName }}", "type": "string" }
  ]
}
```

#### Merge Node
**Combine data from multiple nodes**

**Modes**:
- **Append**: Combine all items
- **Keep Matches**: Only matching items
- **Remove Matches**: Exclude matching items
- **Choose Branch**: Select specific branch

### AI/LangChain Nodes

#### AI Agent
**Intelligent automation with LLM**

**Features**:
- Tool integration
- Memory support
- System message customization
- Multiple LLM providers

**Connected Components**:
- Language Model (OpenAI, Anthropic, etc.)
- Memory (Buffer, Window, Vector Store)
- Tools (Wikipedia, Calculator, Custom)

#### OpenAI Chat Model
**GPT integration**

**Models**:
- gpt-4o
- gpt-4o-mini
- gpt-4-turbo
- gpt-3.5-turbo

**Parameters**:
- Temperature (creativity)
- Max tokens (response length)
- Top P (diversity)

#### Basic LLM Chain
**Simple LLM workflow**

**Features**:
- Prompt templates
- Message history
- No tool support
- Faster than agents

#### Memory Nodes

##### Simple Memory (Buffer Window)
- Maintains recent conversation history
- Window size configuration
- Automatic pruning

##### Vector Store Memory
- Semantic search in conversation
- Embeddings-based retrieval
- Long-term context

#### Tool Nodes

##### Wikipedia Tool
- Search Wikipedia articles
- Return relevant content
- No authentication required

##### Calculator Tool
- Mathematical operations
- Expression evaluation

##### Workflow Tool
- Execute other workflows
- Pass parameters
- Compose complex automation

### Integration Nodes (400+)

#### Popular Services

##### **Google Services**
- **Google Sheets** - Spreadsheet operations
- **Gmail** - Email automation
- **Google Drive** - File management
- **Google Calendar** - Event scheduling

##### **Communication**
- **Slack** - Team messaging
- **Discord** - Community management
- **Telegram** - Bot integration
- **Microsoft Teams** - Enterprise chat

##### **CRM & Sales**
- **Salesforce** - Complete CRM operations
- **HubSpot** - Marketing automation
- **Pipedrive** - Sales pipeline
- **Zendesk** - Customer support

##### **Databases**
- **PostgreSQL** - SQL queries and operations
- **MySQL** - Database management
- **MongoDB** - NoSQL operations
- **Redis** - Key-value operations

##### **Development**
- **GitHub** - Repository management
- **GitLab** - CI/CD integration
- **Jira** - Issue tracking
- **Jenkins** - Build automation

##### **Cloud Storage**
- **AWS S3** - Object storage
- **Dropbox** - File sync
- **OneDrive** - Microsoft cloud
- **Box** - Enterprise storage

##### **Marketing**
- **Mailchimp** - Email campaigns
- **SendGrid** - Transactional email
- **HubSpot** - Marketing automation
- **ActiveCampaign** - CRM + Marketing

##### **E-commerce**
- **Shopify** - Store management
- **WooCommerce** - WordPress integration
- **Stripe** - Payment processing
- **PayPal** - Payment gateway

##### **Social Media**
- **Twitter** - Tweet automation
- **LinkedIn** - Professional networking
- **Facebook** - Social posting
- **Instagram** - Content management

##### **Productivity**
- **Notion** - Workspace management
- **Airtable** - Database operations
- **Trello** - Board management
- **Asana** - Project management

##### **AI Services**
- **OpenAI** - GPT models
- **Anthropic** - Claude models
- **Google Gemini** - Google AI
- **Mistral** - Open-source LLMs
- **Ollama** - Local LLMs

##### **Data & Analytics**
- **QuickChart** - Chart generation
- **Google Analytics** - Web analytics
- **Elasticsearch** - Search engine
- **Kibana** - Data visualization

##### **Other Popular Nodes**
- **HTTP Request** - Universal API connector
- **Webhook** - Receive HTTP requests
- **Code** - JavaScript/Python execution
- **If** - Conditional logic
- **Switch** - Multiple conditions
- **Split In Batches** - Process large datasets
- **Read/Write Files** - Local file operations
- **FTP** - File transfer
- **SSH** - Remote execution
- **RabbitMQ** - Message queue
- **Kafka** - Event streaming
- **QuickBooks** - Accounting
- **Salesmate** - CRM operations
- **Reddit** - Social automation
- **Rocket.Chat** - Team chat
- **Rundeck** - Job scheduler

### Node Operations Examples

#### Airtable Operations
```javascript
{
  "operation": "create",
  "base": "app9nOVsRxdypoknP",
  "table": "tblTIOsm4BLJD9Tql",
  "columns": {
    "orderID": { "type": "number" },
    "employeeName": { "type": "string" }
  }
}
```

#### Discord Message
```javascript
{
  "authentication": "webhook",
  "content": "This week we've {{$json['totalBooked']}} booked orders"
}
```

#### Hacker News
```javascript
{
  "resource": "all",
  "limit": 10,
  "additionalFields": {
    "keyword": "automation"
  }
}
```

---

## Expressions & Code

### Expression Basics

**Format**: All expressions use `{{ expression }}`

**Toggle**: Hover over parameter → Select **Expressions** toggle

**Editor**: Use **Open expression editor** for Variable selector access

### Accessing Data

#### Current Node Data
```javascript
{{ $json.fieldName }}
{{ $json['field-with-spaces'] }}
{{ $json.nested.property }}
```

#### From Webhook Body
```javascript
{{ $json.body.city }}
{{ $json.body.name }}
```

#### Previous Node Data
```javascript
{{ $('NodeName').item.json.field }}
{{ $('HTTP Request').all() }}
```

#### Binary Data
```javascript
await this.helpers.getBinaryDataBuffer(0, 'data')
```

### Built-in Variables

#### n8n Variables
- `$json` - Current item JSON data
- `$binary` - Current item binary data
- `$input` - All input data
- `$node` - Current node info
- `$workflow` - Workflow metadata
- `$execution` - Execution info
- `$now` - Current DateTime (Luxon)
- `$today` - Today at midnight (Luxon)
- `$pageCount` - Pagination counter
- `$response` - HTTP response data

### Date & Time with Luxon

**Luxon** is included by default in n8n for date/time operations.

#### Custom Variables
```javascript
$now     // Current timestamp (DateTime.now())
$today   // Today at 00:00:00 (DateTime.now().startOf('day'))
```

#### Convert String to Date
```javascript
// ISO 8601 format
{{ DateTime.fromISO('2019-06-23T00:00:00.00') }}

// Custom format
{{ DateTime.fromFormat("23-06-2019", "dd-MM-yyyy") }}
```

#### Date Math
```javascript
// 7 days ago
{{ $today.minus({days: 7}) }}

// Add 1 month
{{ $now.plus({months: 1}) }}

// Get difference
{{ DateTime.fromISO('2019-06-23').diff(DateTime.fromISO('2019-05-23'), 'months') }}
```

#### Format Dates
```javascript
// Human readable
{{ $today.toLocaleString() }}

// Custom format
{{ $now.toFormat('yyyy-MM-dd HH:mm:ss') }}

// ISO string
{{ $now.toISO() }}
```

#### Countdown Example
```javascript
{{"There are " + $today.diff(DateTime.fromISO($today.year + '-12-25'), 'days').toObject().days.toString().substring(1) + " days to Christmas!"}}
```

#### Timezone
- Default: `America/New_York`
- Set via `GENERIC_TIMEZONE` environment variable
- Per-workflow override available

### JMESPath for JSON Queries

**JMESPath** is a query language for JSON data extraction.

#### Syntax
```javascript
$jmespath(object, searchString)   // JavaScript
_jmespath(object, searchString)   // Python
```

#### Examples

Given JSON:
```json
{
  "people": [
    {"first": "James", "last": "Green"},
    {"first": "Jacob", "last": "Jones"},
    {"first": "Jayden", "last": "Smith"}
  ],
  "dogs": {
    "Fido": {"color": "brown", "age": 7},
    "Spot": {"color": "black and white", "age": 5}
  }
}
```

**Get all first names**:
```javascript
{{ $jmespath($json.people, "[*].first") }}
// Returns: ["James", "Jacob", "Jayden"]
```

**Slice (first two)**:
```javascript
{{ $jmespath($json.people, "[:2].first") }}
// Returns: ["James", "Jacob"]
```

**Get dog ages**:
```javascript
{{ $jmespath($json.dogs, "*.age") }}
// Returns: [7, 5]
```

**Multi-select**:
```javascript
{{ $jmespath($json.people, "[].[first, last]") }}
// Returns: [["James","Green"], ["Jacob","Jones"], ["Jayden","Smith"]]
```

**Filter by condition**:
```javascript
{{ $jmespath($("Code").all(), "[?json.name=='Lenovo'].json.category_id") }}
```

### JavaScript Code Examples

#### Count Items from Previous Node
```javascript
if (Object.keys(items[0].json).length === 0) {
    return [{
        json: { results: 0 }
    }];
}
return [{
    json: { results: items.length }
}];
```

#### Check for Empty Value
```javascript
{{ $json["variable_name"] ? $json["variable_name"] : "not found" }}

// Or use nullish coalescing
{{ $json.variable ?? "default value" }}

// Or logical OR
{{ $json.variable || "default value" }}
```

#### Process All Input Items
```javascript
let items = $input.all();
let results = [];

for (let i = 0; i < items.length; i++) {
  let item = items[i].json;
  // Process item
  results.push({
    json: {
      processed: item.value * 2
    }
  });
}

return results;
```

### Python Code Examples

#### Count Items
```python
if len(items[0].json) == 0:
    return [{"json": {"results": 0}}]
else:
    return [{"json": {"results": len(items)}}]
```

#### Process Items
```python
results = []
for item in items:
    results.append({
        "json": {
            "processed": item.json["value"] * 2
        }
    })
return results
```

### Binary Data Handling

#### Get Binary Buffer
```javascript
let binaryDataBuffer = await this.helpers.getBinaryDataBuffer(0, 'data');
// Returns the buffer for the first input item
```

#### Prepare Binary Data
```javascript
const buffer = await this.helpers.prepareBinaryData(
  Buffer.from('file content'),
  'filename.txt',
  'text/plain'
);
```

### Common Expression Issues

#### "Can't get data for expression"
**Cause**: Referenced node hasn't executed yet

**Solution**:
- Test workflow up to the named node
- Check if node is executed: `$("<node-name>").isExecuted`

#### "Invalid JSON" in JSON mode
**Cause**: Invalid JSON object or undefined input data

**Solution**:
- Validate JSON syntax
- Check if input data has consistent fields

#### "Invalid Syntax"
**Cause**: Syntax error in expression (trailing periods, etc.)

**Solution**: Verify expression format

---

## Credentials & Authentication

### Authentication Methods

n8n supports multiple authentication methods for different services:

#### 1. **API Key**
- Simple key-based auth
- Usually in header or query parameter
- Example: `Authorization: Bearer YOUR_API_KEY`

#### 2. **OAuth2**
- Three-legged authentication
- User authorization flow
- Token refresh handling
- **n8n Cloud users**: Use "Connect my account" button

#### 3. **OAuth1**
- Legacy OAuth protocol
- Used by Twitter, etc.

#### 4. **Basic Auth**
- Username + Password
- Base64 encoded in header

#### 5. **Header Auth**
- Custom header authentication
- Flexible header names/values

#### 6. **JWT (JSON Web Token)**
- Token-based authentication
- Supports HS256, RS256, ES256, etc.
- Passphrase or PEM key

#### 7. **Service Account**
- Google, AWS service accounts
- JSON key files

### Popular Service Credentials

#### OpenAI
**Method**: API Key
**Setup**:
1. Get API key from OpenAI dashboard
2. Enter in n8n credentials

#### Anthropic (Claude)
**Method**: API Key
**Setup**:
1. Get API key from Anthropic Console
2. Enter in n8n credentials

#### Google Services
**Method**: OAuth2 or Service Account
**Setup**:
1. Create project in Google Cloud Console
2. Enable APIs
3. Create OAuth2 credentials or Service Account
4. Enter Client ID/Secret in n8n

#### Slack
**Method**: OAuth2
**Setup**:
1. Create Slack app
2. Configure OAuth scopes
3. Get Client ID/Secret
4. Use OAuth Redirect URL from n8n

#### GitHub
**Method**: OAuth2 or Personal Access Token
**Setup**:
1. Create GitHub OAuth app or Personal Access Token
2. Enter credentials in n8n
3. Grant necessary scopes

#### AWS
**Method**: Access Key + Secret
**Setup**:
1. Create IAM user in AWS
2. Generate Access Key
3. Enter Access Key ID + Secret Access Key

#### PostgreSQL / MySQL
**Method**: Username + Password
**Setup**:
1. Host, Port, Database name
2. Username, Password
3. Optional: SSL configuration

#### SMTP (Email)
**Method**: Username + Password
**Setup**:
1. SMTP server host
2. Port (usually 587 or 465)
3. Username (email)
4. Password
5. Security: TLS/STARTTLS

### Credential Management

#### External Secrets
n8n supports external secret managers:
- **AWS Secrets Manager**
- **Azure Key Vault**
- **Google Cloud Secret Manager**
- **Infisical**
- **HashiCorp Vault**

**Configuration**:
```bash
N8N_EXTERNAL_SECRETS_UPDATE_INTERVAL=300  # Check every 5 minutes
```

#### Credential Overwrites
Set credentials via environment variables:
```bash
CREDENTIALS_OVERWRITE_DATA='{"credential_name": {"field": "value"}}'
```

#### Security Best Practices
1. **Never commit credentials** to version control
2. **Use external secrets** for production
3. **Rotate credentials** regularly
4. **Use least privilege** access
5. **Enable MFA** where possible

---

## Environment Variables

### Configuration Methods

#### 1. Command Line (npm)
```bash
export VARIABLE_NAME=value
```

#### 2. Docker
```bash
docker run -e N8N_HOST=0.0.0.0 -e N8N_PORT=5678 n8nio/n8n
```

#### 3. Docker Compose
```yaml
services:
  n8n:
    environment:
      - N8N_HOST=0.0.0.0
      - N8N_PORT=5678
```

#### 4. Configuration File
```bash
export N8N_CONFIG_FILES=/path/to/config.json
```

```json
{
  "executions": {
    "saveDataOnSuccess": "none"
  },
  "generic": {
    "timezone": "Europe/Berlin"
  }
}
```

#### 5. File-Based Variables
Append `_FILE` to variable name:
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
| `N8N_PATH` | `/` | Deployment path |
| `N8N_LISTEN_ADDRESS` | `0.0.0.0` | IP to listen on |
| `WEBHOOK_URL` | - | Webhook URL (for reverse proxy) |

#### Database

| Variable | Default | Description |
|----------|---------|-------------|
| `DB_TYPE` | `sqlite` | Database type (sqlite/postgresdb) |
| `DB_POSTGRESDB_HOST` | `localhost` | PostgreSQL host |
| `DB_POSTGRESDB_PORT` | `5432` | PostgreSQL port |
| `DB_POSTGRESDB_DATABASE` | `n8n` | Database name |
| `DB_POSTGRESDB_USER` | `postgres` | Database user |
| `DB_POSTGRESDB_PASSWORD` | - | Database password |
| `DB_POSTGRESDB_SCHEMA` | `public` | Schema name |
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
| `N8N_CONCURRENCY_PRODUCTION_LIMIT` | `-1` | Max concurrent executions |

#### Queue Mode (Scaling)

| Variable | Default | Description |
|----------|---------|-------------|
| `EXECUTIONS_MODE` | `regular` | Set to `queue` for scaling |
| `QUEUE_BULL_REDIS_HOST` | `localhost` | Redis host |
| `QUEUE_BULL_REDIS_PORT` | `6379` | Redis port |
| `QUEUE_BULL_REDIS_DB` | `0` | Redis database |
| `QUEUE_BULL_REDIS_PASSWORD` | - | Redis password |

#### Security

| Variable | Default | Description |
|----------|---------|-------------|
| `N8N_ENCRYPTION_KEY` | Auto-generated | Credential encryption key |
| `N8N_USER_MANAGEMENT_JWT_SECRET` | Auto-generated | JWT secret |
| `N8N_MFA_ENABLED` | `true` | Enable MFA |

#### Features

| Variable | Default | Description |
|----------|---------|-------------|
| `N8N_TEMPLATES_ENABLED` | `false` | Enable workflow templates |
| `N8N_DIAGNOSTICS_ENABLED` | `true` | Share anonymous telemetry |
| `N8N_VERSION_NOTIFICATIONS_ENABLED` | `true` | Version update notifications |
| `N8N_PERSONALIZATION_ENABLED` | `true` | Personalization questions |
| `N8N_PUBLIC_API_DISABLED` | `false` | Disable public API |

#### Endpoints

| Variable | Default | Description |
|----------|---------|-------------|
| `N8N_ENDPOINT_REST` | `rest` | REST endpoint path |
| `N8N_ENDPOINT_WEBHOOK` | `webhook` | Webhook path |
| `N8N_ENDPOINT_WEBHOOK_TEST` | `webhook-test` | Test webhook path |
| `N8N_PAYLOAD_SIZE_MAX` | `16` | Max payload size (MiB) |

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

#### Timezone & Localization

| Variable | Default | Description |
|----------|---------|-------------|
| `GENERIC_TIMEZONE` | `America/New_York` | Default timezone |
| `N8N_DEFAULT_LOCALE` | `en` | Default locale |

#### Nodes

| Variable | Default | Description |
|----------|---------|-------------|
| `NODE_FUNCTION_ALLOW_BUILTIN` | - | Allowed built-in modules |
| `NODE_FUNCTION_ALLOW_EXTERNAL` | - | Allowed external modules |
| `NODES_EXCLUDE` | - | Excluded node types |
| `NODES_INCLUDE` | - | Only include these nodes |

#### Metrics (Prometheus)

| Variable | Default | Description |
|----------|---------|-------------|
| `N8N_METRICS` | `false` | Enable /metrics endpoint |
| `N8N_METRICS_PREFIX` | `n8n_` | Metric name prefix |
| `N8N_METRICS_INCLUDE_DEFAULT_METRICS` | `true` | System metrics |
| `N8N_METRICS_INCLUDE_WORKFLOW_ID_LABEL` | `false` | Workflow ID in metrics |

#### Development

| Variable | Default | Description |
|----------|---------|-------------|
| `N8N_DEV_RELOAD` | `false` | Auto-reload on file changes |
| `N8N_PREVIEW_MODE` | `false` | Preview mode |
| `N8N_DISABLE_UI` | `false` | Disable UI |

### Isolation Configuration

To prevent n8n from connecting to n8n servers:
```bash
N8N_DIAGNOSTICS_ENABLED=false
N8N_VERSION_NOTIFICATIONS_ENABLED=false
N8N_TEMPLATES_ENABLED=false
EXTERNAL_FRONTEND_HOOKS_URLS=
N8N_DIAGNOSTICS_CONFIG_FRONTEND=
N8N_DIAGNOSTICS_CONFIG_BACKEND=
```

---

## Source Control & Environments

### Overview

**n8n Enterprise** supports Git-based source control for:
- Multiple environments (dev, staging, production)
- Version control workflows
- Team collaboration
- Change tracking

### Core Concepts

#### Environments
An **environment** consists of:
1. **n8n Instance** - Where workflows run
2. **Git Branch** - Where workflows are stored

#### What Gets Synced
- ✅ Workflows (including tags, owner email)
- ✅ Credential stubs (ID, name, type) - **NOT actual values**
- ✅ Variable stubs (ID, name) - **NOT actual values**
- ✅ Projects
- ✅ Folders

#### What Doesn't Get Synced
- ❌ Credential values (must be set manually)
- ❌ Variable values (must be set manually)
- ❌ Execution history
- ❌ User accounts

### Branch Patterns

#### 1. Multi-Instance, Multi-Branch (Recommended)
```
Development Instance → dev branch
                         ↓ (Pull Request)
Production Instance  → prod branch
```

**Advantages**:
- Safety for production (requires PR approval)
- Supports more than 2 instances
- Clear separation

**Disadvantages**:
- More manual steps

#### 2. Multi-Instance, Single-Branch
```
Development Instance ← → shared branch ← → Production Instance
```

**Advantages**:
- Instant availability after push

**Disadvantages**:
- Risk of accidental prod changes
- Potential data loss from conflicts

#### 3. One Instance, Multiple Branches
```
Single Instance can switch between branches
```

**Use Case**: Review work from different users

**Note**: Workflows from all branches coexist (no automatic cleanup)

### Setup Instructions

#### Step 1: Create Repository
```bash
# Create private repository on GitHub/GitLab
# Add branches: production, development
```

#### Step 2: Configure Git in n8n
1. Go to **Settings** > **Environments**
2. Enter **Git repository URL** (SSH URL)
3. Select SSH key type (ED25519 or RSA)
4. Copy SSH key

#### Step 3: Set Up Deploy Key
1. Add deploy key to GitHub/GitLab
2. Enable **write access**

#### Step 4: Connect n8n
1. Select **Connect**
2. Choose branch for this instance
3. For production: Enable **Protected instance**
4. **Save settings**

### Using Source Control

#### Push Changes
**Permissions**: Instance owner, instance admin, or project admin

1. Select **Push** in main menu
2. Filter/select workflows to push
3. Enter commit message
4. Select **Commit and Push**

#### Pull Changes
**Permissions**: Instance owner or instance admin

1. Select **Pull** in main menu
2. Review changes
3. Confirm pull

**Warning**: Pulling overwrites local unsaved changes!

#### Copy Work Between Environments

**Single Branch**:
```bash
1. Push from dev instance
2. Pull to prod instance
```

**Multiple Branches**:
```bash
1. Push from dev to dev branch
2. Create PR: dev → prod
3. Merge PR
4. Pull in prod instance
```

#### Automate Pulls (GitHub Action)
```yaml
name: Auto Pull to Production
on:
  push:
    branches: [ "production" ]
jobs:
  run-pull:
    runs-on: ubuntu-latest
    steps:
      - name: Pull to n8n
        run: |
          curl --location '${{ secrets.INSTANCE_URL }}/api/v1/source-control/pull' \
               --header 'X-N8N-API-KEY: ${{ secrets.INSTANCE_API_KEY }}' \
               --header 'Content-Type: application/json' \
               --data '{"force": true}'
```

### Merge Conflicts

#### Automatic Resolution
- ✅ Credentials: n8n auto-resolves
- ✅ Variables: n8n auto-resolves
- ❌ Workflows: Manual resolution required

#### Best Practices
1. **Push immediately** after finishing workflow
2. **One-way flow**: Either push OR pull, not both
3. **Pull before editing** in multi-user environments
4. **Use protected instance** for production
5. **Review changes** before pulling
6. **Test in dev** before pushing to prod

### Protected Instance

**What it does**:
- Prevents direct workflow editing
- All changes must come via pull
- Ensures all changes go through review

**Enable**:
Settings > Environments > Protected instance toggle

---

## Best Practices

### Workflow Design

#### 1. **Keep Workflows Simple**
- Break complex automation into smaller workflows
- Use Execute Workflow node for composition
- One workflow = one clear purpose

#### 2. **Error Handling**
```
Try-Catch Pattern:
  Main Flow
    ↓
  (If Error)
    ↓
  Error Handler → Notification → Retry/Log
```

**Use**:
- If node to check for errors
- Error Trigger to catch failures
- Code node for custom error handling

#### 3. **Testing**
- Use **Manual Trigger** for testing
- Test with real data samples
- Enable **Execute Once** for single-item testing
- Check execution logs

#### 4. **Performance**
- Use **Split In Batches** for large datasets
- Enable pagination in HTTP Request
- Limit concurrent executions
- Use queue mode for scaling

#### 5. **Data Validation**
- Validate input data early
- Use If node for conditional checks
- Handle missing/null values gracefully

#### 6. **Credentials**
- Use external secrets for production
- Never hardcode API keys
- Test credential connectivity
- Rotate credentials regularly

### Node Configuration

#### HTTP Request Node
```javascript
✅ DO:
- Set timeout appropriately
- Handle pagination
- Use authentication properly
- Check response status
- Handle rate limits

❌ DON'T:
- Ignore error responses
- Hardcode URLs
- Skip authentication
- Process unlimited pages
```

#### Code Node
```javascript
✅ DO:
- Comment your code
- Handle edge cases
- Return proper format
- Use helper functions
- Log important steps

❌ DON'T:
- Use complex logic (split to multiple nodes)
- Ignore error handling
- Modify input items directly
- Use blocking operations
```

#### Database Nodes
```javascript
✅ DO:
- Use parameterized queries
- Handle connection errors
- Close connections properly
- Use transactions for multiple operations
- Index frequently queried fields

❌ DON'T:
- Use string concatenation for queries (SQL injection!)
- Query without WHERE clause (unless needed)
- Fetch all columns when you need few
- Run queries in loops (use batch operations)
```

### Security Best Practices

#### 1. **Authentication**
- Enable user management
- Use strong passwords
- Enable MFA
- Limit API access
- Use SAML/LDAP for enterprise

#### 2. **Network Security**
- Use HTTPS in production
- Configure reverse proxy properly
- Set `N8N_PROXY_HOPS` correctly
- Use firewall rules
- Enable rate limiting

#### 3. **Data Protection**
- Set `EXECUTIONS_DATA_SAVE_ON_SUCCESS=none` for sensitive data
- Use external secrets
- Encrypt credentials properly
- Set `N8N_ENCRYPTION_KEY` securely
- Regular backups

#### 4. **Access Control**
- Use project-based permissions
- Limit workflow sharing
- Review user access regularly
- Use protected instances for prod

### Deployment Best Practices

#### Docker Deployment
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
    volumes:
      - n8n_data:/home/node/.n8n
    secrets:
      - db_password
    depends_on:
      - postgres

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

volumes:
  n8n_data:
  postgres_data:

secrets:
  db_password:
    file: ./db_password.txt
```

#### Queue Mode Setup
```yaml
# Main instance
n8n-main:
  environment:
    - EXECUTIONS_MODE=queue
    - QUEUE_BULL_REDIS_HOST=redis
    - QUEUE_BULL_REDIS_PORT=6379

# Worker instance
n8n-worker:
  environment:
    - EXECUTIONS_MODE=queue
    - QUEUE_BULL_REDIS_HOST=redis
    - N8N_DISABLE_UI=true  # Workers don't need UI
```

#### Monitoring
```bash
# Enable Prometheus metrics
N8N_METRICS=true
N8N_METRICS_INCLUDE_DEFAULT_METRICS=true
N8N_METRICS_INCLUDE_WORKFLOW_ID_LABEL=true
N8N_METRICS_INCLUDE_API_ENDPOINTS=true

# Set up alerts for:
- Failed executions
- High execution time
- Queue depth
- Memory usage
- Database connections
```

---

## Common Tasks & Examples

### Task 1: Build a REST API

```
Webhook Trigger (POST /api/users)
  ↓
Code (Validate input)
  ↓
If (Valid)
  ↓ TRUE                    ↓ FALSE
PostgreSQL (Insert)      Respond (400 Error)
  ↓
Respond (201 Created)
```

**Webhook Config**:
- Method: POST
- Path: users
- Response: Immediately

**Code Node**:
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

### Task 2: Scheduled Report

```
Schedule Trigger (Every Monday 9am)
  ↓
PostgreSQL (Query sales data)
  ↓
Code (Calculate metrics)
  ↓
QuickChart (Generate chart)
  ↓
Gmail (Send report)
```

**Schedule**: Weekly, Monday, 9:00 AM

**Query**:
```sql
SELECT DATE(created_at) as date, SUM(amount) as total
FROM sales
WHERE created_at >= DATE_SUB(NOW(), INTERVAL 7 DAY)
GROUP BY DATE(created_at)
```

### Task 3: AI Customer Support

```
Chat Trigger
  ↓
AI Agent
  ├─→ OpenAI (GPT-4)
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

### Task 5: Webhook to Slack

```
Webhook Trigger
  ↓
Code (Parse & validate)
  ↓
If (Alert type)
  ├─→ ERROR: Slack (#alerts)
  ├─→ WARNING: Slack (#warnings)
  └─→ INFO: Slack (#info)
```

### Task 6: Form Submission Handler

```
Webhook Trigger
  ↓
Google Sheets (Append row)
  ↓
If (Requires approval)
  ↓ TRUE                    ↓ FALSE
Slack (Send to manager)   Email (Auto-confirm)
  ↓
Wait for approval
  ↓
Email (Notify user)
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
- Ensure trigger nodes are connected
- Check workflow activation status

#### 2. "Can't get data for expression"
**Cause**: Referenced node hasn't executed

**Solutions**:
- Execute workflow up to that node first
- Check node execution order
- Verify node is executed: `$("NodeName").isExecuted`

#### 3. "Timeout" errors
**Causes**:
- Long-running API calls
- Large data processing
- Database query timeout

**Solutions**:
- Increase `EXECUTIONS_TIMEOUT`
- Use pagination for large datasets
- Optimize database queries
- Split into multiple workflows

#### 4. Webhook not receiving data
**Causes**:
- Incorrect webhook URL
- Workflow not activated
- Reverse proxy misconfiguration

**Solutions**:
- Verify webhook URL matches external service
- Activate workflow
- Set `WEBHOOK_URL` environment variable
- Check reverse proxy headers

#### 5. Database connection errors
**Causes**:
- Wrong credentials
- Network issues
- Connection pool exhausted

**Solutions**:
- Verify DB credentials
- Check network connectivity
- Increase `DB_POSTGRESDB_POOL_SIZE`
- Review connection timeout settings

#### 6. Memory issues
**Causes**:
- Large datasets in memory
- Binary data processing
- Many concurrent executions

**Solutions**:
- Use Split In Batches
- Enable binary data on filesystem/S3
- Limit concurrent executions
- Increase container memory

#### 7. Credentials not working
**Causes**:
- Expired tokens
- Insufficient permissions
- OAuth flow incomplete

**Solutions**:
- Refresh OAuth credentials
- Check service permissions
- Re-authenticate
- Verify API key is valid

### Debugging Techniques

#### 1. **Execution Logs**
- View execution history
- Check node outputs
- Review error messages
- Check execution time

#### 2. **Test Individually**
- Execute nodes one at a time
- Check each node's output
- Verify data transformation

#### 3. **Webhook Testing**
```bash
# Test webhook with curl
curl -X POST https://your-n8n.com/webhook/test \
  -H "Content-Type: application/json" \
  -d '{"test": "data"}'
```

#### 4. **Enable Debug Logging**
```bash
N8N_LOG_LEVEL=debug
N8N_LOG_OUTPUT=console
```

#### 5. **Check Browser Console**
- Open browser DevTools
- Check for JavaScript errors
- Review network requests

### Performance Optimization

#### 1. **Large Datasets**
```
Use Split In Batches:
- Process in chunks (100-1000 items)
- Reduce memory usage
- Better error handling
```

#### 2. **API Rate Limits**
```
Add Wait node between requests:
- Calculate delay from rate limit
- Use expressions for dynamic waiting
```

#### 3. **Database Queries**
```
Optimize queries:
- Add WHERE clauses
- Use indexes
- Limit result sets
- Use EXPLAIN ANALYZE
```

#### 4. **Binary Data**
```
Configure storage:
N8N_DEFAULT_BINARY_DATA_MODE=filesystem
# or
N8N_DEFAULT_BINARY_DATA_MODE=s3
```

#### 5. **Queue Mode**
```
Scale horizontally:
- Multiple worker instances
- Redis queue
- Load balancing
```

### Error Messages Reference

| Error | Cause | Solution |
|-------|-------|----------|
| "Node is not defined" | Node doesn't exist | Check node name spelling |
| "Invalid JSON" | Malformed JSON | Validate JSON syntax |
| "Connection refused" | Network issue | Check host/port/firewall |
| "401 Unauthorized" | Invalid credentials | Verify API key/token |
| "429 Too Many Requests" | Rate limit exceeded | Add delays, reduce frequency |
| "500 Internal Server Error" | API server issue | Check API status, retry |
| "Execution timeout" | Workflow took too long | Increase timeout, optimize |
| "Out of memory" | Insufficient RAM | Use batches, increase memory |

---

## Additional Resources

### Official Documentation
- **n8n Docs**: https://docs.n8n.io
- **Community Forum**: https://community.n8n.io
- **GitHub**: https://github.com/n8n-io/n8n

### awesome-n8n Resources
- **Repository**: https://github.com/ortall0201/awesome-n8n
- **LLM Documentation**: n8n-docs-llms.txt (42,161 lines)
- **Created by**: Synaptiv AI
- **Last Updated**: June 24th, 2025

### Integration Documentation
- Each node has detailed docs at: `https://docs.n8n.io/integrations/builtin/app-nodes/`
- Credential setup: `https://docs.n8n.io/integrations/builtin/credentials/`

### Learning Resources
- **Workflow Templates**: Browse n8n template library
- **Video Tutorials**: n8n YouTube channel
- **Blog**: Latest features and use cases

### API References
- **n8n API**: `https://docs.n8n.io/api/`
- **Public API**: Available at `/api/v1/`
- **Swagger UI**: `/api-docs` (if enabled)

### Community Projects
- **Custom Nodes**: Community node packages
- **Workflow Examples**: Shared templates
- **Integration Guides**: Community tutorials

---

## Appendix

### Version History (Recent Releases)

#### n8n@0.236.3 (2023-07-18)
- Bug fix release

#### n8n@0.236.0 (2023-07-05)
- New node: crowd.dev (open source engagement)
- Enhancements and bug fixes

#### n8n@0.235.0 (2023-06-28)
- New features and nodes
- Enhancements

#### n8n@0.234.0 (2023-06-22)
- New features and nodes
- Bug fixes

### File Format

This documentation file (n8n-docs-llms.txt) contains:
- **42,161 lines** of documentation
- **1.4MB** of text content
- **Clean markdown format**
- **No HTML artifacts**
- **Comprehensive coverage** of all n8n features

### Usage Examples

#### 1. Load into LLM Context
```python
with open('n8n-docs-llms.txt', 'r') as f:
    docs = f.read()

# Use in RAG pipeline
embeddings = create_embeddings(docs)
vector_store.add(embeddings)
```

#### 2. Build Custom GPT
- Upload n8n-docs-llms.txt to ChatGPT
- Create custom instructions
- Ask n8n-specific questions

#### 3. Fine-tune Model
```python
# Use as training data
from transformers import AutoTokenizer, AutoModel

tokenizer = AutoTokenizer.from_pretrained("model-name")
# Tokenize n8n docs for fine-tuning
```

### Contributing to awesome-n8n

The awesome-n8n project welcomes:
- ✅ Workflow templates
- ✅ Documentation improvements
- ✅ Bug reports
- ✅ Feature suggestions
- ✅ Tutorial contributions

**Repository**: https://github.com/ortall0201/awesome-n8n

---

**End of brain-n8n-2.md**

This comprehensive documentation provides complete knowledge of n8n workflow automation from the LLM-optimized awesome-n8n repository. Use it as a reference for building workflows, understanding integrations, configuring deployments, and troubleshooting issues.

**Built with ❤️ by the n8n community and Synaptiv AI**
