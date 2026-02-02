# n8n-brain.md

> Comprehensive knowledge base for understanding and developing the n8n workflow automation platform.
> Generated: 2025-11-24

## Table of Contents

- [Quick Reference](#quick-reference)
- [Architecture Overview](#architecture-overview)
- [Package Structure](#package-structure)
- [Development Workflow](#development-workflow)
- [Backend Deep Dive](#backend-deep-dive)
- [Frontend Deep Dive](#frontend-deep-dive)
- [Node System](#node-system)
- [Testing Strategy](#testing-strategy)
- [Code Patterns & Conventions](#code-patterns--conventions)
- [Data Flow](#data-flow)
- [Security & Permissions](#security--permissions)
- [Scaling & Performance](#scaling--performance)
- [Common Tasks](#common-tasks)
- [Troubleshooting](#troubleshooting)

---

## Quick Reference

### Essential Commands

```bash
# Development
pnpm dev              # Full stack (backend + frontend + hot reload)
pnpm dev:be           # Backend only
pnpm dev:fe           # Frontend only
pnpm dev:ai           # AI/LangChain nodes development

# Building (ALWAYS redirect output)
pnpm build > build.log 2>&1
tail -n 20 build.log  # Check for errors

# Testing
pnpm test                              # All tests
pnpm test:affected                     # Changed packages only
pnpm --filter=n8n-playwright test:local  # E2E tests
pushd packages/cli && pnpm test <file>  # Specific test file
popd                                   # Return to root

# Code Quality (run from package directory)
pushd packages/cli
pnpm lint             # Lint code
pnpm typecheck        # Type check (CRITICAL before committing)
popd

# Full repo check (only for final PR)
pnpm lint
pnpm typecheck

# Git Operations
gh pr create --draft  # Create draft PR
git status            # Check current state
```

### Critical Rules

✅ **DO:**
- Use proper types or `unknown` - NEVER use `any`
- Use i18n for ALL UI text
- Use CSS variables (--spacing-*, --color-*) - never hardcode px
- Use UnexpectedError, OperationalError, UserError for errors
- Run `pnpm typecheck` before committing
- Redirect build output to files
- Work from package directory for tests
- Confirm test cases with user before writing
- Use `pushd`/`popd` for directory navigation

❌ **DON'T:**
- Use ApplicationError (deprecated)
- Use data-test-id with spaces (single value only)
- Skip typecheck before committing
- Add emojis unless requested
- Create unnecessary files
- Hardcode values - use CSS variables
- Use feature flags for new code
- Add backwards-compatibility hacks

### Technology Stack

| Layer | Technologies |
|-------|-------------|
| **Backend** | Node.js 22+, Express 5, TypeScript 5.9, TypeORM |
| **Frontend** | Vue 3.5, Vite, Pinia, Element Plus, @vue-flow |
| **Database** | SQLite, PostgreSQL, MySQL, MariaDB |
| **Testing** | Jest (backend), Vitest (frontend), Playwright (E2E) |
| **Code Quality** | Biome (formatter), ESLint, Stylelint, lefthook |
| **Build** | Turbo, pnpm workspaces, tsup/tsdown |
| **Package Manager** | pnpm@10.22.0 |

---

## Architecture Overview

### High-Level System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                         User (Browser)                       │
└───────────────────────────┬─────────────────────────────────┘
                            │
                ┌───────────┴──────────┐
                │                      │
        REST API (axios)      WebSocket (Push)
                │                      │
┌───────────────┴──────────────────────┴─────────────────────┐
│              Vue 3 Frontend (editor-ui)                     │
│  ┌──────────────┐  ┌─────────────┐  ┌──────────────┐      │
│  │ Pinia Stores │  │ Components  │  │ Design System│      │
│  └──────────────┘  └─────────────┘  └──────────────┘      │
└────────────────────────────┬────────────────────────────────┘
                             │ @n8n/api-types (shared types)
┌────────────────────────────┴────────────────────────────────┐
│                Express Server (CLI package)                 │
│  ┌──────────────────────────────────────────────────────┐  │
│  │ Middleware Chain → Controllers → Services            │  │
│  └────────────────────┬─────────────────────────────────┘  │
│                       │                                     │
│  ┌────────────────────┴─────────────────────────────────┐  │
│  │ Repositories (TypeORM) ↔ Database                    │  │
│  └────────────────────┬─────────────────────────────────┘  │
└───────────────────────┴─────────────────────────────────────┘
                        │
┌───────────────────────┴─────────────────────────────────────┐
│              Workflow Execution Engine (core)               │
│  ┌──────────────┐  ┌─────────────┐  ┌──────────────┐      │
│  │ Node Context │  │ Credentials │  │ Binary Data  │      │
│  └──────────────┘  └─────────────┘  └──────────────┘      │
└────────────────────────────┬────────────────────────────────┘
                             │
┌────────────────────────────┴────────────────────────────────┐
│                    Node Execution Layer                     │
│  ┌───────────────────┐  ┌──────────────────────────────┐   │
│  │ nodes-base (400+) │  │ nodes-langchain (AI/LLM)     │   │
│  └───────────────────┘  └──────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
```

### Architectural Patterns

1. **Monorepo Structure**: pnpm workspaces + Turbo orchestration
2. **Dependency Injection**: Custom @n8n/di with @Service() decorators
3. **Controller-Service-Repository**: Clean separation of concerns
4. **Event-Driven**: Internal EventBus for decoupled communication
5. **Type-Safe Communication**: Shared @n8n/api-types between FE/BE
6. **Design System**: Centralized @n8n/design-system for UI consistency
7. **Plugin Architecture**: Extensible node system with 400+ integrations

### Monorepo Organization

```
n8n/
├── packages/
│   ├── cli/                    # Main Express server & API
│   ├── core/                   # Workflow execution engine
│   ├── workflow/               # Core interfaces & types
│   ├── nodes-base/             # 400+ integration nodes
│   ├── node-dev/               # Node development CLI
│   ├── @n8n/
│   │   ├── api-types/          # Shared FE/BE types
│   │   ├── db/                 # TypeORM entities & repos
│   │   ├── config/             # Configuration management
│   │   ├── di/                 # Dependency injection
│   │   ├── errors/             # Error classes
│   │   ├── permissions/        # RBAC system
│   │   ├── nodes-langchain/    # AI/LangChain nodes
│   │   └── ...
│   ├── frontend/
│   │   ├── editor-ui/          # Main Vue 3 app
│   │   ├── @n8n/design-system/ # Component library
│   │   ├── @n8n/i18n/          # Internationalization
│   │   ├── @n8n/stores/        # Shared Pinia stores
│   │   ├── @n8n/composables/   # Vue composables
│   │   └── ...
│   ├── testing/
│   │   ├── playwright/         # E2E tests
│   │   └── containers/         # Docker test containers
│   └── extensions/
├── docker/                     # Docker images
├── scripts/                    # Build & tooling scripts
├── .github/workflows/          # CI/CD pipelines
├── pnpm-workspace.yaml         # Workspace config
├── turbo.json                  # Build orchestration
├── CLAUDE.md                   # AI assistant guidelines
└── package.json                # Root package
```

---

## Package Structure

### Backend Core Packages

#### packages/cli (Main Application)
**Purpose**: Express server, REST API, CLI commands, main entry point
**Version**: 1.121.0
**Lines of Code**: ~60,000+

**Key Directories**:
```
cli/src/
├── controllers/          # REST API controllers (@RestController)
│   ├── auth.controller.ts
│   ├── workflows.controller.ts
│   ├── executions.controller.ts
│   ├── users.controller.ts
│   └── ...
├── services/            # Business logic layer
│   ├── workflow.service.ts
│   ├── execution.service.ts
│   ├── credentials.service.ts
│   └── ...
├── databases/           # Database configuration
│   ├── config.ts
│   └── migrations/      # Per-database migrations
├── webhooks/           # Webhook handling
├── auth/               # Authentication logic (JWT, LDAP, SAML, MFA)
├── modules/            # Feature modules
│   ├── breaking-changes/
│   ├── chat-hub/
│   ├── community-packages/
│   ├── data-table/
│   ├── external-secrets.ee/
│   ├── insights/
│   ├── mcp/           # Model Context Protocol
│   ├── provisioning.ee/
│   └── workflow-index/
├── commands/           # CLI commands
├── middlewares/        # Express middlewares
├── executions/         # Execution management
├── workflows/          # Workflow operations
├── events/             # Event system
├── eventbus/           # Event bus implementation
├── scaling/            # Scaling & queue mode (Bull/Redis)
├── push/               # WebSocket push notifications
└── server.ts           # Main server entry point
```

**Key Features**:
- Express 5.1.0 with Helmet security
- JWT authentication with MFA support
- LDAP/SAML integration
- Webhook handling (production & test webhooks)
- Active workflow management
- Queue mode for scaling (Bull + Redis)
- External secrets (AWS, Azure, GCP, Infisical)
- Event bus for internal messaging
- Push notifications via WebSocket

**Module Pattern**: Each module follows:
```
module/
├── module.controller.ts    # REST endpoints
├── module.service.ts       # Business logic
├── module.repository.ts    # Data access (if needed)
└── __tests__/             # Tests
```

#### packages/core (Execution Engine)
**Purpose**: Workflow execution engine, node execution context
**Version**: 1.120.0

**Key Components**:
- `WorkflowExecute` - Main execution orchestrator
- `NodeExecuteFunctions` - Node execution helpers
- `ActiveWebhooks` - Webhook lifecycle management
- `CredentialsHelper` - Credential resolution
- `BinaryDataService` - File handling (S3, local)
- `WorkflowStaticData` - Persistent workflow state

**Dependencies**: n8n-workflow, axios, lodash, luxon, cron-parser, ssh2

#### packages/workflow (Core Interfaces)
**Purpose**: Shared workflow types, interfaces, and utilities
**Version**: 1.118.0
**Export Modes**: ESM (dist/esm) and CommonJS (dist/cjs)

**Key Exports**:
- `IWorkflowBase`, `IWorkflowExecuteAdditionalData`
- `INode`, `INodeType`, `INodeTypeDescription`
- `INodeExecutionData`, `INodeProperties`
- `Expression` class - Expression resolver
- `Workflow` class - Workflow representation
- Error types: `NodeOperationError`, `NodeApiError`

**Dependencies**: lodash, luxon, jmespath, esprima-next, recast, zod

#### packages/@n8n/db (Database Layer)
**Purpose**: TypeORM entities, repositories, migrations
**Version**: 0.32.0

**Key Entities** (30+):
- `User`, `Role`, `Project`, `ProjectRelation`
- `Credentials`, `SharedCredentials`
- `Workflow`, `SharedWorkflow`
- `Execution`, `ExecutionData`, `ExecutionMetadata`
- `Settings`, `Tag`, `Folder`, `Variables`
- `ApiKey`, `AuthIdentity`, `AuthProviderSyncHistory`
- `Annotation`, `TestRun`, `TestDefinition` (enterprise)

**Repositories**: Custom repositories with query builders for complex operations

**Migrations**: Separate migrations for:
- SQLite (`sqlite/`)
- PostgreSQL (`postgres/`)
- MySQL/MariaDB (`mysql/`, `mariadb/`)

### Shared/Utility Packages

#### packages/@n8n/api-types
**Purpose**: Shared TypeScript interfaces between frontend and backend

**Pattern**: Define all API request/response types here
```typescript
// Example
export interface IWorkflowResponse {
  id: string;
  name: string;
  active: boolean;
  nodes: INode[];
  connections: IConnections;
  // ...
}
```

#### packages/@n8n/config
**Purpose**: Centralized configuration with Zod schemas
**Version**: 1.63.0

**Features**:
- Type-safe config using Zod
- Environment variable parsing
- DI container integration
- Feature flag management

#### packages/@n8n/di
**Purpose**: Dependency injection container (fork of typedi)

**Why Custom**: typedi no longer maintained, needed stage-3 decorators

**Usage**:
```typescript
import { Service } from '@n8n/di';

@Service()
export class MyService {
  constructor(private readonly otherService: OtherService) {}
}

// Resolution
const service = Container.get(MyService);
```

#### packages/@n8n/errors
**Purpose**: Error classes and error handling

**Key Classes**:
- `UnexpectedError` - Internal errors (500)
- `OperationalError` - Expected runtime errors (400)
- `UserError` - User-facing errors with helpful messages
- ~~`ApplicationError`~~ - **DEPRECATED - DO NOT USE**

**Usage**:
```typescript
import { UserError } from '@n8n/errors';

throw new UserError('Invalid workflow configuration', { cause: originalError });
```

#### packages/@n8n/permissions
**Purpose**: Scope-based RBAC system
**Version**: 0.42.0

**Features**:
- Scope definitions using Zod
- Project-based access control
- Resource-level permissions
- License-based feature gating

#### Other Utility Packages
- `@n8n/utils` - Shared utilities
- `@n8n/backend-common` - Backend helpers & logger
- `@n8n/constants` - Shared constants
- `@n8n/decorators` - Controller/route decorators
- `@n8n/client-oauth2` - OAuth2 client

### Frontend Packages

#### packages/frontend/editor-ui (Main Application)
**Purpose**: Vue 3 workflow editor
**Version**: 1.121.0
**Lines of Code**: ~60,000+

**Tech Stack**:
- Vue 3.5.13 (Composition API)
- Vite (build tool)
- Pinia 2.x (state management)
- Vue Router 4.x (routing)
- Element Plus 2.4.3 (UI framework)
- @vue-flow (workflow canvas)
- CodeMirror 6 (code editor)
- Chart.js (visualizations)

**Directory Structure**:
```
editor-ui/src/
├── app/
│   ├── App.vue              # Root component
│   ├── main.ts              # Entry point
│   ├── router.ts            # Vue Router config
│   ├── components/          # Vue components
│   │   ├── Node/
│   │   ├── Canvas/
│   │   ├── Executions/
│   │   └── ...
│   ├── stores/              # Pinia stores (25+)
│   │   ├── workflows.store.ts (60K+ lines!)
│   │   ├── ui.store.ts
│   │   ├── settings.store.ts
│   │   ├── nodeTypes.store.ts
│   │   ├── rbac.store.ts
│   │   ├── posthog.store.ts
│   │   └── ...
│   ├── views/               # Route views
│   │   ├── WorkflowsView.vue
│   │   ├── NodeView.vue
│   │   ├── CredentialsView.vue
│   │   └── ...
│   ├── composables/         # Composition API composables
│   │   ├── useActions.ts
│   │   ├── useCanvasMapping.ts
│   │   └── ...
│   └── plugins/             # Vue plugins
├── features/                # Feature modules
└── __tests__/              # Vitest tests
```

**Key Pinia Stores**:
- `workflows.store.ts` - Main workflow state (60K+ lines!)
- `ui.store.ts` - UI state (modals, panels, etc.)
- `settings.store.ts` - Application settings
- `nodeTypes.store.ts` - Node type registry
- `versions.store.ts` - Version management
- `posthog.store.ts` - Analytics
- `pushConnection.store.ts` - WebSocket connection
- `rbac.store.ts` - RBAC state
- `cloudPlan.store.ts` - Cloud plan info

#### packages/frontend/@n8n/design-system
**Purpose**: Reusable Vue component library with Storybook

**Features**:
- Pure Vue components for consistency
- Storybook 8.x for preview
- CSS custom properties (design tokens)
- Mixins and directives
- Accessibility features

**CSS Variables** (from CLAUDE.md):
```css
/* Spacing */
--spacing--5xs: 2px
--spacing--4xs: 4px
--spacing--3xs: 6px
--spacing--2xs: 8px
--spacing--xs: 12px
--spacing--sm: 16px
--spacing--md: 20px
--spacing--lg: 24px
--spacing--xl: 32px
--spacing--2xl: 48px
--spacing--3xl: 64px
--spacing--4xl: 128px
--spacing--5xl: 256px

/* Colors */
--color--primary, --color--primary--shade-1, --color--primary--tint-1/2/3
--color--secondary, --color--secondary--shade-1, --color--secondary--tint-1/2
--color--success, --color--warning, --color--danger (+ shades/tints)
--color--text, --color--text--shade-1, --color--text--tint-1/2/3
--color--foreground, --color--background (+ shades/tints)

/* Typography */
--font-size--3xs: 10px to --font-size--2xl: 28px
--line-height--sm: 1.25 to --line-height--xl: 1.5
--font-weight--regular: 400, --font-weight--bold: 600
--font-family: InterVariable, sans-serif

/* Borders */
--radius--sm: 2px, --radius: 4px, --radius--lg: 8px, --radius--xl: 12px
```

#### packages/frontend/@n8n/i18n
**Purpose**: Internationalization
**Version**: 1.25.0

**CRITICAL RULE**: ALL UI text must use i18n!

**Usage**:
```vue
<template>
  <div>{{ $locale.baseText('myKey') }}</div>
</template>
```

**Adding Translations**:
1. Add key to `@n8n/i18n` package
2. Use in component
3. Never hardcode text

#### packages/frontend/@n8n/rest-api-client
**Purpose**: Type-safe API client
**Version**: 1.24.0

**Features**:
- Axios-based REST client
- Type-safe requests using @n8n/api-types
- Interceptors for auth
- Error handling

#### Other Frontend Packages
- `@n8n/stores` - Shared Pinia stores
- `@n8n/composables` - Reusable composition functions
- `@n8n/chat` - Chat interface components
- `@n8n/storybook` - Storybook configuration
- `@n8n/codemirror-lang` - CodeMirror language support
- `@n8n/codemirror-lang-sql` - SQL language support

### Node Packages

#### packages/nodes-base
**Purpose**: Built-in integration nodes (400+ integrations)

**Structure**:
```
nodes-base/
├── nodes/                  # Node implementations
│   ├── ActionNetwork/
│   ├── ActiveCampaign/
│   ├── Airtable/
│   ├── Asana/
│   ├── Aws/
│   │   ├── S3/
│   │   ├── Lambda/
│   │   ├── DynamoDb/
│   │   └── ...
│   ├── Google/
│   │   ├── Drive/
│   │   ├── Sheets/
│   │   ├── Calendar/
│   │   └── ...
│   ├── HttpRequest/        # Generic HTTP node
│   ├── Code/               # JavaScript/Python code node
│   └── ...
├── credentials/            # Credential definitions
│   ├── AirtableApi.credentials.ts
│   ├── AwsApi.credentials.ts
│   └── ...
└── utils/                 # Shared node utilities
```

**Node Development Pattern**:
```typescript
import { INodeType, INodeTypeDescription } from 'n8n-workflow';

export class MyNode implements INodeType {
  description: INodeTypeDescription = {
    displayName: 'My Node',
    name: 'myNode',
    icon: 'file:mynode.svg',
    group: ['transform'],
    version: 1,
    description: 'Does something',
    defaults: {
      name: 'My Node',
    },
    inputs: ['main'],
    outputs: ['main'],
    credentials: [],
    properties: [
      // Node parameters
    ],
  };

  async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
    // Node logic
  }
}
```

#### packages/@n8n/nodes-langchain
**Purpose**: AI/LangChain integration
**Version**: 1.120.0

**Node Categories**:
- **LLM Nodes**: OpenAI, Anthropic, Google Gemini, Mistral, Ollama, HuggingFace
- **Vector Stores**: Pinecone, Qdrant, Weaviate, Chroma, Supabase
- **Agents**: OpenAI Agent, Conversational Agent, Tool Agent
- **Embeddings**: OpenAI, Cohere, HuggingFace
- **Memory**: Buffer Memory, Window Memory, Vector Store Memory
- **Tools**: Calculator, Web Scraper, API tools
- **MCP**: Model Context Protocol integration

**Dependencies**: @langchain/*, openai, anthropic, cohere-ai, vector DB clients

#### packages/node-dev
**Purpose**: CLI for developing custom nodes
**Version**: 1.119.0

**Commands**:
```bash
n8n-node-dev new           # Create new node
n8n-node-dev build         # Build node
n8n-node-dev watch         # Watch for changes
```

### Testing Packages

#### packages/testing/playwright
**Purpose**: E2E testing with Playwright

**Structure**:
```
playwright/
├── pages/                 # Page Object Model
│   ├── BasePage.ts
│   ├── WorkflowPage.ts
│   ├── CredentialsPage.ts
│   └── ...
├── composables/          # Multi-page interactions
├── fixtures/             # Test fixtures
│   ├── base.ts          # Standard tests
│   ├── cloud-only.ts    # Cloud-specific tests
│   └── ...
├── tests/               # Test files
│   ├── workflows/
│   ├── credentials/
│   ├── executions/
│   └── ...
├── proxy-server/        # API mocking proxy
└── containers/          # Docker test setups
```

**Test Commands**:
```bash
pnpm test:local              # Local server
pnpm test:container:standard # SQLite container
pnpm test:container:postgres # PostgreSQL
pnpm test:container:queue    # Queue mode
pnpm test:container:multi    # Multi-main
pnpm test:performance        # Performance
pnpm test:chaos              # Chaos testing
```

**Test Tags**:
- `@mode:postgres` - PostgreSQL specific
- `@db:reset` - Needs clean database
- `@chaostest` - Chaos testing
- `@cloud:trial` - Cloud resource constraints
- `@capability:proxy` - Requires proxy server

**Best Practices**:
- Use Page Object Model
- Tag tests appropriately
- Reset database when needed
- Use composables for complex flows

#### packages/@n8n/backend-test-utils
**Purpose**: Backend testing utilities

**Features**:
- Test helpers
- Mock factories
- Database fixtures
- API test utilities

### Tool/Config Packages

#### packages/@n8n/typescript-config
**Purpose**: Shared TypeScript configurations

**Usage**:
```json
{
  "extends": "@n8n/typescript-config/tsconfig.common.json"
}
```

#### Other Tool Packages
- `@n8n/eslint-config` - Shared ESLint config
- `@n8n/stylelint-config` - Shared Stylelint config
- `@n8n/vitest-config` - Shared Vitest config
- `@n8n/benchmark` - Performance benchmarking

### Enterprise Packages (.ee)

#### packages/@n8n/ai-workflow-builder.ee
**Purpose**: AI workflow builder (enterprise)

**Features**:
- AI-powered workflow generation
- Workflow evaluations
- Smart suggestions

#### Other Enterprise Packages
- External secrets integration
- Advanced provisioning
- Test definitions and runs
- Annotations

---

## Development Workflow

### Initial Setup

```bash
# Clone repository
git clone https://github.com/n8n-io/n8n.git
cd n8n

# Install dependencies (pnpm required)
pnpm install

# Build all packages
pnpm build > build.log 2>&1
tail -n 20 build.log

# Start development
pnpm dev  # Full stack
```

### Development Modes

```bash
# Full stack (recommended)
pnpm dev

# Backend only (Express server)
pnpm dev:be

# Frontend only (Vue app)
pnpm dev:fe

# AI/LangChain nodes development
pnpm dev:ai

# Node development (hot reload)
N8N_DEV_RELOAD=true pnpm dev
```

### Branch Management

**Creating New Branch** (from Linear ticket):
```bash
# Always create from fresh master
git checkout master
git pull origin master

# Use branch name suggested by Linear
git checkout -b feature/N8N-1234-add-new-node

# Make changes...

# Create draft PR
gh pr create --draft \
  --title "feat: Add new node" \
  --body "## Summary
- Implements new node

## Linear
https://linear.app/n8n/issue/N8N-1234

## Test plan
- [ ] Unit tests pass
- [ ] E2E tests pass"
```

### Building

**ALWAYS redirect build output to a file:**
```bash
pnpm build > build.log 2>&1

# Check for errors
tail -n 20 build.log

# Or search for errors
grep -i error build.log
```

**Build Individual Package**:
```bash
pushd packages/cli
pnpm build
popd
```

**Build Dependencies**:
When modifying:
- Type definitions
- Interfaces in `@n8n/api-types`
- Cross-package dependencies

You MUST build before linting/typechecking:
```bash
pnpm build > build.log 2>&1
pushd packages/cli
pnpm typecheck
pnpm lint
popd
```

### Testing

**Unit Tests**:
```bash
# All tests
pnpm test

# Affected tests only
pnpm test:affected

# Specific package
pushd packages/cli
pnpm test
popd

# Specific test file (MUST be in package directory)
pushd packages/cli
pnpm test src/services/workflow.service.test.ts
popd

# Watch mode
pushd packages/cli
pnpm test --watch
popd
```

**Frontend Tests** (Vitest):
```bash
pushd packages/frontend/editor-ui
pnpm test
popd
```

**E2E Tests** (Playwright):
```bash
# Local server
pnpm --filter=n8n-playwright test:local

# Container-based
pnpm --filter=n8n-playwright test:container:standard

# Specific test
pnpm --filter=n8n-playwright test:local tests/workflows/workflow.spec.ts

# Debug mode
pnpm --filter=n8n-playwright test:local --debug

# UI mode
pnpm --filter=n8n-playwright test:local --ui
```

**Testing Best Practices**:
- Always work from package directory
- Confirm test cases with user before writing
- Mock all external dependencies (use nock for HTTP)
- Use jest-mock-extended for mocks
- Tag Playwright tests appropriately
- Reset database when needed (@db:reset)

### Code Quality

**Linting** (run from package directory):
```bash
pushd packages/cli
pnpm lint          # Check
pnpm lint:fix      # Fix automatically
popd

# Full repo (only for final PR)
pnpm lint
```

**Type Checking** (CRITICAL before committing):
```bash
pushd packages/cli
pnpm typecheck
popd

# Full repo
pnpm typecheck
```

**Formatting**:
- Biome (automatic via lefthook)
- Prettier (Vue, YAML, Markdown)
- Runs on pre-commit hook

**Pre-commit Checklist**:
1. ✅ All tests pass
2. ✅ `pnpm typecheck` passes
3. ✅ `pnpm lint` passes
4. ✅ No `any` types used
5. ✅ All UI text uses i18n
6. ✅ CSS variables used (no hardcoded px)

### Git Hooks (lefthook)

Automatically runs on:
- **Pre-commit**:
  - Biome (format JavaScript/TypeScript/JSON)
  - Prettier (format Vue/YAML/Markdown)
  - Stylelint (lint CSS)
  - actionlint (lint GitHub Actions)

**Bypass hooks** (not recommended):
```bash
git commit --no-verify
```

### Pull Requests

**Creating PR**:
```bash
# Create draft PR
gh pr create --draft

# Follow conventions:
# - .github/pull_request_template.md
# - .github/pull_request_title_conventions.md
```

**PR Title Conventions**:
- `feat: Add new feature`
- `fix: Fix bug`
- `feat(editor): Add new editor feature`
- `fix(core): Fix execution issue`
- `docs: Update documentation`
- `test: Add tests`
- `refactor: Refactor code`

**PR Description Must Include**:
- Summary (1-3 bullet points)
- Linear ticket link: `https://linear.app/n8n/issue/[TICKET-ID]`
- GitHub issue link (if mentioned in Linear)
- Test plan (checklist)

**Merging**:
- Squash and merge
- Use conventional commit message
- Delete branch after merge

---

## Backend Deep Dive

### Request Flow

```
HTTP Request
  ↓
Express Middleware Chain
  ↓ 1. Helmet (security headers)
  ↓ 2. CORS
  ↓ 3. Body Parser
  ↓ 4. Cookie Parser
  ↓ 5. Compression
  ↓
Auth Middleware
  ↓ - JWT token validation
  ↓ - User session loading
  ↓ - MFA check (if enabled)
  ↓
License Middleware
  ↓ - Feature flag check
  ↓ - License validation
  ↓
RBAC Middleware
  ↓ - Scope-based permission check
  ↓ - Resource access validation
  ↓
Controller Method
  ↓ - @RestController decorator
  ↓ - @Get/@Post/@Put/@Delete decorator
  ↓ - Request validation (Zod)
  ↓
Service Layer
  ↓ - Business logic
  ↓ - Transaction management
  ↓ - Event publishing
  ↓
Repository Layer
  ↓ - TypeORM query building
  ↓ - Database operations
  ↓
Database
  ↓
Response Serialization
  ↓
HTTP Response
```

### Dependency Injection Pattern

**Service Definition**:
```typescript
import { Service } from '@n8n/di';

@Service()
export class WorkflowService {
  constructor(
    private readonly workflowRepository: WorkflowRepository,
    private readonly nodeTypes: NodeTypes,
    private readonly executionService: ExecutionService,
  ) {}

  async findById(id: string): Promise<Workflow> {
    return this.workflowRepository.findById(id);
  }
}
```

**Service Resolution**:
```typescript
import { Container } from '@n8n/di';

const workflowService = Container.get(WorkflowService);
```

**Testing with DI**:
```typescript
import { Container } from '@n8n/di';
import { mock } from 'jest-mock-extended';

// Setup
beforeEach(() => {
  const mockRepository = mock<WorkflowRepository>();
  Container.set(WorkflowRepository, mockRepository);
});

// Teardown
afterEach(() => {
  Container.reset();
});
```

### Controller Pattern

**Controller Definition**:
```typescript
import { RestController, Get, Post, Param, Body } from '@n8n/decorators';
import { WorkflowService } from './workflow.service';
import { CreateWorkflowDto } from '@n8n/api-types';

@RestController('/workflows')
export class WorkflowsController {
  constructor(private readonly workflowService: WorkflowService) {}

  @Get('/')
  async getAll() {
    return this.workflowService.findAll();
  }

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

**Available Decorators** (@n8n/decorators):
- `@RestController(path)` - Define controller
- `@Get(path)`, `@Post(path)`, `@Put(path)`, `@Delete(path)`, `@Patch(path)`
- `@Param(name)` - Route parameter
- `@Body()` - Request body
- `@Query()` - Query parameters
- `@Headers()` - Request headers
- `@Middleware(middleware)` - Add middleware
- `@Licensed(feature)` - License check

### Service Pattern

**Service Structure**:
```typescript
import { Service } from '@n8n/di';
import { WorkflowRepository } from '@n8n/db';
import { EventService } from './event.service';
import { UserError } from '@n8n/errors';

@Service()
export class WorkflowService {
  constructor(
    private readonly workflowRepository: WorkflowRepository,
    private readonly eventService: EventService,
  ) {}

  async create(data: CreateWorkflowDto): Promise<Workflow> {
    // Validation
    if (!data.name) {
      throw new UserError('Workflow name is required');
    }

    // Business logic
    const workflow = await this.workflowRepository.create(data);

    // Emit event
    this.eventService.emit('workflow-created', { workflowId: workflow.id });

    return workflow;
  }

  async activate(id: string): Promise<void> {
    const workflow = await this.workflowRepository.findById(id);

    if (!workflow) {
      throw new UserError('Workflow not found');
    }

    // Activate workflow
    await this.activeWorkflowRunner.add(id);

    // Update database
    await this.workflowRepository.update(id, { active: true });

    // Emit event
    this.eventService.emit('workflow-activated', { workflowId: id });
  }
}
```

### Repository Pattern

**Repository Definition**:
```typescript
import { DataSource, Repository } from '@n8n/typeorm';
import { Service } from '@n8n/di';
import { WorkflowEntity } from './workflow.entity';

@Service()
export class WorkflowRepository extends Repository<WorkflowEntity> {
  constructor(dataSource: DataSource) {
    super(WorkflowEntity, dataSource.manager);
  }

  async findById(id: string): Promise<WorkflowEntity | null> {
    return this.findOne({ where: { id } });
  }

  async findActive(): Promise<WorkflowEntity[]> {
    return this.find({ where: { active: true } });
  }

  async findByUser(userId: string): Promise<WorkflowEntity[]> {
    return this.createQueryBuilder('workflow')
      .innerJoin('workflow.shared', 'shared')
      .where('shared.userId = :userId', { userId })
      .getMany();
  }
}
```

### Entity Pattern

**Entity Definition**:
```typescript
import {
  Entity,
  Column,
  PrimaryColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from '@n8n/typeorm';

@Entity()
export class WorkflowEntity {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column({ type: 'boolean', default: false })
  active: boolean;

  @Column({ type: 'json' })
  nodes: INode[];

  @Column({ type: 'json' })
  connections: IConnections;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => SharedWorkflow, (shared) => shared.workflow)
  shared: SharedWorkflow[];
}
```

### Event System

**Publishing Events**:
```typescript
import { Service } from '@n8n/di';
import { EventService } from './event.service';

@Service()
export class WorkflowService {
  constructor(private readonly eventService: EventService) {}

  async activate(id: string): Promise<void> {
    // ... activation logic

    this.eventService.emit('workflow-activated', {
      workflowId: id,
      userId: this.user.id,
    });
  }
}
```

**Subscribing to Events**:
```typescript
import { Service, OnEvent } from '@n8n/di';

@Service()
export class WorkflowAnalytics {
  @OnEvent('workflow-activated')
  handleWorkflowActivated(data: { workflowId: string; userId: string }) {
    // Track analytics
  }
}
```

### Error Handling

**Error Classes**:
```typescript
import { UserError, OperationalError, UnexpectedError } from '@n8n/errors';

// User-facing errors (400-level)
throw new UserError('Invalid workflow configuration');

// Expected runtime errors
throw new OperationalError('Database connection failed', { cause: error });

// Internal errors (500-level)
throw new UnexpectedError('Unexpected state', { cause: error });
```

**Error Middleware**:
```typescript
app.use((error, req, res, next) => {
  if (error instanceof UserError) {
    return res.status(400).json({ message: error.message });
  }

  if (error instanceof OperationalError) {
    logger.error('Operational error', { error });
    return res.status(500).json({ message: 'Internal server error' });
  }

  logger.error('Unexpected error', { error });
  return res.status(500).json({ message: 'Internal server error' });
});
```

### Authentication

**JWT Authentication**:
```typescript
import jwt from 'jsonwebtoken';

// Generate token
const token = jwt.sign(
  { id: user.id, email: user.email },
  config.get('jwt.secret'),
  { expiresIn: '7d' },
);

// Verify token
const payload = jwt.verify(token, config.get('jwt.secret'));
```

**Auth Middleware**:
```typescript
export const authMiddleware = async (req, res, next) => {
  const token = req.cookies['n8n-auth'] || req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    const payload = jwt.verify(token, config.get('jwt.secret'));
    req.user = await userRepository.findById(payload.id);
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};
```

### Database Migrations

**Creating Migration**:
```bash
# Generate migration
pnpm --filter @n8n/db migration:generate AddUserRole

# Run migrations
pnpm --filter @n8n/db migration:run

# Revert migration
pnpm --filter @n8n/db migration:revert
```

**Migration Structure**:
```typescript
import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddUserRole1234567890123 implements MigrationInterface {
  async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE user
      ADD COLUMN role VARCHAR(50) DEFAULT 'member'
    `);
  }

  async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE user
      DROP COLUMN role
    `);
  }
}
```

**Database-Specific Migrations**:
- SQLite: `packages/@n8n/db/src/databases/migrations/sqlite/`
- PostgreSQL: `packages/@n8n/db/src/databases/migrations/postgres/`
- MySQL: `packages/@n8n/db/src/databases/migrations/mysql/`

### Workflow Execution

**Execution Flow**:
```typescript
// 1. Load workflow
const workflow = await workflowRepository.findById(workflowId);

// 2. Create execution record
const execution = await executionRepository.create({
  workflowId,
  status: 'running',
  mode: 'manual',
});

// 3. Execute workflow
const workflowExecute = new WorkflowExecute(
  additionalData,
  mode,
  runData,
);

try {
  const result = await workflowExecute.run(workflow);

  // 4. Update execution status
  await executionRepository.update(execution.id, {
    status: 'success',
    data: result,
    finishedAt: new Date(),
  });

  // 5. Emit event
  eventService.emit('execution-finished', {
    executionId: execution.id,
    status: 'success',
  });
} catch (error) {
  // Handle error
  await executionRepository.update(execution.id, {
    status: 'error',
    stoppedAt: new Date(),
  });
}
```

### Webhook Handling

**Production Webhooks**:
```typescript
app.post('/webhook/:path(*)', async (req, res) => {
  const path = req.params.path;

  // Find workflow with matching webhook
  const webhook = await activeWebhooksService.get(path);

  if (!webhook) {
    return res.status(404).json({ message: 'Webhook not found' });
  }

  // Execute workflow
  const result = await workflowExecute.runWebhook(webhook, req);

  res.json(result);
});
```

**Test Webhooks**:
```typescript
// Register test webhook
await testWebhooksService.register(workflowId, webhookData);

// Wait for webhook call
const result = await testWebhooksService.waitForWebhook(workflowId);
```

### Queue Mode (Scaling)

**Bull Queue Setup**:
```typescript
import Bull from 'bull';

const queue = new Bull('n8n-jobs', {
  redis: config.get('redis'),
});

// Add job to queue
await queue.add('run-workflow', {
  workflowId,
  executionId,
  data,
});

// Process jobs (worker)
queue.process('run-workflow', async (job) => {
  const { workflowId, executionId, data } = job.data;
  await workflowRunner.run(workflowId, executionId, data);
});
```

**Multi-Main Setup**:
- Multiple n8n instances (HA)
- Redis for coordination
- Leader election for scheduled workflows

---

## Frontend Deep Dive

### Component Structure

**Composition API Pattern**:
```vue
<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useWorkflowsStore } from '@/stores/workflows.store';
import { useI18n } from '@/composables/useI18n';

// Stores
const workflowsStore = useWorkflowsStore();

// i18n
const i18n = useI18n();

// Refs
const workflowName = ref('');
const isLoading = ref(false);

// Computed
const hasWorkflows = computed(() => workflowsStore.allWorkflows.length > 0);

// Methods
const saveWorkflow = async () => {
  isLoading.value = true;
  try {
    await workflowsStore.saveWorkflow({ name: workflowName.value });
  } finally {
    isLoading.value = false;
  }
};

// Lifecycle
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

    <div v-if="hasWorkflows">
      <workflow-card
        v-for="workflow in workflowsStore.allWorkflows"
        :key="workflow.id"
        :workflow="workflow"
      />
    </div>
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

### Pinia Store Pattern

**Store Definition**:
```typescript
import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { restApiClient } from '@n8n/rest-api-client';

export const useWorkflowsStore = defineStore('workflows', () => {
  // State
  const workflows = ref<IWorkflowDb[]>([]);
  const activeWorkflow = ref<IWorkflowDb | null>(null);

  // Getters
  const allWorkflows = computed(() => workflows.value);
  const activeWorkflowId = computed(() => activeWorkflow.value?.id);
  const hasActiveWorkflow = computed(() => activeWorkflow.value !== null);

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

  function setActiveWorkflow(workflow: IWorkflowDb) {
    activeWorkflow.value = workflow;
  }

  return {
    // State
    workflows,
    activeWorkflow,

    // Getters
    allWorkflows,
    activeWorkflowId,
    hasActiveWorkflow,

    // Actions
    fetchAllWorkflows,
    saveWorkflow,
    setActiveWorkflow,
  };
});
```

**Using Store in Component**:
```typescript
import { useWorkflowsStore } from '@/stores/workflows.store';

const workflowsStore = useWorkflowsStore();

// Access state
console.log(workflowsStore.workflows);

// Access getters
console.log(workflowsStore.allWorkflows);

// Call actions
await workflowsStore.fetchAllWorkflows();
```

### Composables Pattern

**Composable Definition**:
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
      toast.showMessage({
        title: i18n.baseText('workflows.activateSuccess'),
        type: 'success',
      });
    } catch (error) {
      toast.showError(error, i18n.baseText('workflows.activateError'));
    }
  }

  async function deleteWorkflow(id: string) {
    const confirmed = await confirm(i18n.baseText('workflows.deleteConfirm'));
    if (!confirmed) return;

    try {
      await workflowsStore.deleteWorkflow(id);
      toast.showMessage({
        title: i18n.baseText('workflows.deleteSuccess'),
        type: 'success',
      });
    } catch (error) {
      toast.showError(error, i18n.baseText('workflows.deleteError'));
    }
  }

  return {
    activateWorkflow,
    deleteWorkflow,
  };
}
```

**Using Composable**:
```vue
<script setup lang="ts">
import { useWorkflowActions } from '@/composables/useWorkflowActions';

const { activateWorkflow, deleteWorkflow } = useWorkflowActions();
</script>
```

### Internationalization (i18n)

**Adding Translations**:
```typescript
// In @n8n/i18n package
export const translations = {
  en: {
    workflows: {
      title: 'Workflows',
      namePlaceholder: 'Enter workflow name',
      save: 'Save',
      activateSuccess: 'Workflow activated',
      deleteConfirm: 'Are you sure you want to delete this workflow?',
    },
  },
};
```

**Using in Component**:
```vue
<script setup lang="ts">
import { useI18n } from '@/composables/useI18n';

const i18n = useI18n();
</script>

<template>
  <div>
    <!-- Method 1: Composable -->
    <h1>{{ i18n.baseText('workflows.title') }}</h1>

    <!-- Method 2: Global $locale -->
    <h1>{{ $locale.baseText('workflows.title') }}</h1>

    <!-- With interpolation -->
    <p>{{ i18n.baseText('workflows.count', { count: 5 }) }}</p>
  </div>
</template>
```

**CRITICAL**: ALL UI text must use i18n. Never hardcode text.

### CSS Styling Best Practices

**Using CSS Variables**:
```vue
<style module lang="scss">
.container {
  /* Spacing - ALWAYS use variables */
  padding: var(--spacing--lg);
  margin-bottom: var(--spacing--md);
  gap: var(--spacing--sm);

  /* Colors */
  background-color: var(--color--background);
  color: var(--color--text);
  border: var(--border-width) var(--border-style) var(--color--foreground);

  /* Typography */
  font-size: var(--font-size--md);
  line-height: var(--line-height--lg);
  font-weight: var(--font-weight--regular);

  /* Borders */
  border-radius: var(--radius--lg);
}

/* ❌ WRONG - Never hardcode */
.wrong {
  padding: 24px;
  margin: 16px;
  font-size: 14px;
  color: #333;
}

/* ✅ CORRECT - Use variables */
.correct {
  padding: var(--spacing--lg);
  margin: var(--spacing--sm);
  font-size: var(--font-size--sm);
  color: var(--color--text);
}
</style>
```

**Module Styles** (preferred):
```vue
<template>
  <div :class="$style.container">
    <span :class="$style.text">Text</span>
  </div>
</template>

<style module lang="scss">
.container {
  /* Styles scoped to component */
}

.text {
  /* Styles scoped to component */
}
</style>
```

### Design System Components

**Using Design System**:
```vue
<script setup lang="ts">
import { N8nButton, N8nInput, N8nCard } from '@n8n/design-system';
</script>

<template>
  <n8n-card>
    <n8n-input
      v-model="value"
      placeholder="Enter value"
    />

    <n8n-button
      type="primary"
      :loading="isLoading"
      @click="handleClick"
    >
      Submit
    </n8n-button>
  </n8n-card>
</template>
```

**Available Components** (@n8n/design-system):
- `N8nButton` - Buttons
- `N8nInput` - Text inputs
- `N8nCard` - Cards
- `N8nModal` - Modals
- `N8nToast` - Toast notifications
- `N8nSpinner` - Loading spinners
- `N8nIcon` - Icons
- `N8nMenu` - Menus
- `N8nTooltip` - Tooltips
- And many more...

### API Communication

**REST API Client**:
```typescript
import { restApiClient } from '@n8n/rest-api-client';

// Get all workflows
const workflows = await restApiClient.workflows.getAll();

// Get workflow by ID
const workflow = await restApiClient.workflows.get(id);

// Create workflow
const created = await restApiClient.workflows.create({
  name: 'My Workflow',
  nodes: [],
  connections: {},
});

// Update workflow
await restApiClient.workflows.update(id, { name: 'Updated' });

// Delete workflow
await restApiClient.workflows.delete(id);
```

**Type-Safe Requests**:
```typescript
import type { IWorkflowDb } from '@n8n/api-types';

const workflow: IWorkflowDb = await restApiClient.workflows.get(id);
```

### WebSocket (Push) Connection

**Push Store**:
```typescript
import { usePushConnectionStore } from '@/stores/pushConnection.store';

const pushStore = usePushConnectionStore();

// Connect
await pushStore.connect();

// Subscribe to events
pushStore.addEventListener((event) => {
  if (event.type === 'executionStarted') {
    console.log('Execution started:', event.data);
  }
});

// Disconnect
pushStore.disconnect();
```

**Execution Updates**:
```typescript
// Listen for execution events
pushStore.addEventListener((event) => {
  switch (event.type) {
    case 'executionStarted':
      // Handle execution start
      break;
    case 'executionFinished':
      // Handle execution finish
      break;
    case 'nodeExecuteBefore':
      // Handle node execution start
      break;
    case 'nodeExecuteAfter':
      // Handle node execution finish
      break;
  }
});
```

### Routing

**Router Definition**:
```typescript
// router.ts
import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/workflows',
      name: 'workflows',
      component: WorkflowsView,
    },
    {
      path: '/workflow/:id',
      name: 'workflow',
      component: WorkflowView,
      props: true,
    },
  ],
});

export default router;
```

**Navigation**:
```typescript
import { useRouter } from 'vue-router';

const router = useRouter();

// Navigate
await router.push({ name: 'workflows' });
await router.push({ name: 'workflow', params: { id: '123' } });

// Go back
router.back();
```

**Route Guards**:
```typescript
router.beforeEach(async (to, from, next) => {
  const settingsStore = useSettingsStore();

  if (!settingsStore.isUserLoggedIn && to.name !== 'login') {
    return next({ name: 'login' });
  }

  next();
});
```

### Testing (Vitest)

**Component Test**:
```typescript
import { describe, it, expect, beforeEach } from 'vitest';
import { mount } from '@vue/test-library';
import { createPinia } from 'pinia';
import MyComponent from '../MyComponent.vue';

describe('MyComponent', () => {
  let pinia;

  beforeEach(() => {
    pinia = createPinia();
  });

  it('renders correctly', () => {
    const wrapper = mount(MyComponent, {
      global: {
        plugins: [pinia],
      },
    });

    expect(wrapper.text()).toContain('Hello');
  });

  it('handles click', async () => {
    const wrapper = mount(MyComponent, {
      global: {
        plugins: [pinia],
      },
    });

    await wrapper.find('button').trigger('click');
    expect(wrapper.emitted('click')).toBeTruthy();
  });
});
```

**Store Test**:
```typescript
import { describe, it, expect, beforeEach } from 'vitest';
import { setActivePinia, createPinia } from 'pinia';
import { useWorkflowsStore } from '../workflows.store';

describe('workflowsStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it('fetches workflows', async () => {
    const store = useWorkflowsStore();

    await store.fetchAllWorkflows();

    expect(store.workflows.length).toBeGreaterThan(0);
  });
});
```

---

## Node System

### Node Structure

**Basic Node**:
```typescript
import {
  IExecuteFunctions,
  INodeExecutionData,
  INodeType,
  INodeTypeDescription,
} from 'n8n-workflow';

export class MyNode implements INodeType {
  description: INodeTypeDescription = {
    displayName: 'My Node',
    name: 'myNode',
    icon: 'file:mynode.svg',
    group: ['transform'],
    version: 1,
    description: 'Does something useful',
    defaults: {
      name: 'My Node',
    },
    inputs: ['main'],
    outputs: ['main'],
    credentials: [
      {
        name: 'myNodeApi',
        required: true,
      },
    ],
    properties: [
      {
        displayName: 'Resource',
        name: 'resource',
        type: 'options',
        noDataExpression: true,
        options: [
          {
            name: 'User',
            value: 'user',
          },
          {
            name: 'Post',
            value: 'post',
          },
        ],
        default: 'user',
      },
      {
        displayName: 'Operation',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: {
          show: {
            resource: ['user'],
          },
        },
        options: [
          {
            name: 'Get',
            value: 'get',
            action: 'Get a user',
          },
          {
            name: 'Create',
            value: 'create',
            action: 'Create a user',
          },
        ],
        default: 'get',
      },
    ],
  };

  async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
    const items = this.getInputData();
    const returnData: INodeExecutionData[] = [];

    const resource = this.getNodeParameter('resource', 0) as string;
    const operation = this.getNodeParameter('operation', 0) as string;

    for (let i = 0; i < items.length; i++) {
      try {
        if (resource === 'user') {
          if (operation === 'get') {
            const userId = this.getNodeParameter('userId', i) as string;
            const credentials = await this.getCredentials('myNodeApi');

            const response = await this.helpers.request({
              method: 'GET',
              url: `https://api.example.com/users/${userId}`,
              headers: {
                'Authorization': `Bearer ${credentials.apiKey}`,
              },
              json: true,
            });

            returnData.push({ json: response });
          }
        }
      } catch (error) {
        if (this.continueOnFail()) {
          returnData.push({ json: { error: error.message } });
          continue;
        }
        throw error;
      }
    }

    return [returnData];
  }
}
```

### Node Properties

**Property Types**:
```typescript
// String
{
  displayName: 'Name',
  name: 'name',
  type: 'string',
  default: '',
  placeholder: 'Enter name',
  description: 'The name of the resource',
}

// Number
{
  displayName: 'Age',
  name: 'age',
  type: 'number',
  default: 0,
  typeOptions: {
    minValue: 0,
    maxValue: 120,
  },
}

// Boolean
{
  displayName: 'Active',
  name: 'active',
  type: 'boolean',
  default: false,
}

// Options (dropdown)
{
  displayName: 'Status',
  name: 'status',
  type: 'options',
  options: [
    { name: 'Draft', value: 'draft' },
    { name: 'Published', value: 'published' },
  ],
  default: 'draft',
}

// Multi-select
{
  displayName: 'Tags',
  name: 'tags',
  type: 'multiOptions',
  options: [
    { name: 'Tag 1', value: 'tag1' },
    { name: 'Tag 2', value: 'tag2' },
  ],
  default: [],
}

// JSON
{
  displayName: 'JSON Data',
  name: 'jsonData',
  type: 'json',
  default: '{}',
}

// Collection (nested properties)
{
  displayName: 'Options',
  name: 'options',
  type: 'collection',
  placeholder: 'Add Option',
  default: {},
  options: [
    {
      displayName: 'Timeout',
      name: 'timeout',
      type: 'number',
      default: 30,
    },
  ],
}

// Fixed Collection
{
  displayName: 'Headers',
  name: 'headers',
  type: 'fixedCollection',
  typeOptions: {
    multipleValues: true,
  },
  default: {},
  options: [
    {
      displayName: 'Header',
      name: 'header',
      values: [
        {
          displayName: 'Name',
          name: 'name',
          type: 'string',
          default: '',
        },
        {
          displayName: 'Value',
          name: 'value',
          type: 'string',
          default: '',
        },
      ],
    },
  ],
}
```

### Node Credentials

**Credential Definition**:
```typescript
import {
  ICredentialType,
  INodeProperties,
} from 'n8n-workflow';

export class MyNodeApi implements ICredentialType {
  name = 'myNodeApi';
  displayName = 'My Node API';
  documentationUrl = 'https://example.com/docs';

  properties: INodeProperties[] = [
    {
      displayName: 'API Key',
      name: 'apiKey',
      type: 'string',
      typeOptions: {
        password: true,
      },
      default: '',
    },
    {
      displayName: 'Domain',
      name: 'domain',
      type: 'string',
      default: 'https://api.example.com',
    },
  ];

  async authenticate(
    credentials: ICredentialDataDecryptedObject,
    requestOptions: IHttpRequestOptions,
  ): Promise<IHttpRequestOptions> {
    requestOptions.headers = {
      ...requestOptions.headers,
      'Authorization': `Bearer ${credentials.apiKey}`,
    };
    return requestOptions;
  }
}
```

**Using Credentials**:
```typescript
const credentials = await this.getCredentials('myNodeApi');
const apiKey = credentials.apiKey as string;
```

### Node Helpers

**HTTP Request**:
```typescript
const response = await this.helpers.request({
  method: 'GET',
  url: 'https://api.example.com/data',
  headers: {
    'Authorization': `Bearer ${apiKey}`,
  },
  json: true,
});
```

**HTTP Request with Pagination**:
```typescript
const response = await this.helpers.requestWithAuthentication.call(
  this,
  'myNodeApi',
  {
    method: 'GET',
    url: 'https://api.example.com/data',
    qs: {
      page: 1,
      limit: 100,
    },
  },
);
```

**Binary Data**:
```typescript
// Download binary data
const binaryData = await this.helpers.getBinaryDataBuffer(0, 'data');

// Upload binary data
const buffer = await this.helpers.prepareBinaryData(
  Buffer.from('file content'),
  'filename.txt',
  'text/plain',
);
```

### Node Development

**Development Workflow**:
```bash
# Create new node
cd packages/nodes-base
pnpm exec n8n-node-dev new

# Development mode (hot reload)
N8N_DEV_RELOAD=true pnpm dev

# Build node
pnpm build

# Test node manually in n8n UI
```

**Node Testing**:
```typescript
import { describe, it, expect } from 'vitest';
import { getWorkflowFilenames, testWorkflows } from '@n8n/backend-test-utils';

describe('MyNode', () => {
  const workflows = getWorkflowFilenames(__dirname);
  testWorkflows(workflows);
});
```

**Workflow Test JSON**:
```json
{
  "name": "My Node Test",
  "nodes": [
    {
      "parameters": {
        "resource": "user",
        "operation": "get",
        "userId": "123"
      },
      "name": "My Node",
      "type": "n8n-nodes-base.myNode",
      "position": [250, 300],
      "credentials": {
        "myNodeApi": {
          "id": "1",
          "name": "My Node API Account"
        }
      }
    }
  ],
  "connections": {}
}
```

---

## Testing Strategy

### Unit Testing (Jest)

**Backend Unit Test**:
```typescript
import { describe, it, expect, beforeEach, afterEach } from '@jest/globals';
import { mock } from 'jest-mock-extended';
import { Container } from '@n8n/di';
import { WorkflowService } from '../workflow.service';
import { WorkflowRepository } from '../workflow.repository';

describe('WorkflowService', () => {
  let service: WorkflowService;
  let mockRepository: jest.Mocked<WorkflowRepository>;

  beforeEach(() => {
    mockRepository = mock<WorkflowRepository>();
    Container.set(WorkflowRepository, mockRepository);
    service = Container.get(WorkflowService);
  });

  afterEach(() => {
    Container.reset();
  });

  it('should create workflow', async () => {
    const workflow = { name: 'Test' };
    mockRepository.create.mockResolvedValue({ id: '1', ...workflow });

    const result = await service.create(workflow);

    expect(result.id).toBe('1');
    expect(mockRepository.create).toHaveBeenCalledWith(workflow);
  });
});
```

**HTTP Mocking with nock**:
```typescript
import nock from 'nock';

describe('HTTP Request Node', () => {
  it('should make GET request', async () => {
    nock('https://api.example.com')
      .get('/data')
      .reply(200, { result: 'success' });

    const result = await node.execute();

    expect(result[0][0].json).toEqual({ result: 'success' });
  });
});
```

### Frontend Testing (Vitest)

**Component Test**:
```typescript
import { describe, it, expect } from 'vitest';
import { render, fireEvent } from '@testing-library/vue';
import { createPinia } from 'pinia';
import MyComponent from '../MyComponent.vue';

describe('MyComponent', () => {
  it('renders and handles click', async () => {
    const { getByText, getByRole } = render(MyComponent, {
      global: {
        plugins: [createPinia()],
      },
    });

    expect(getByText('Hello')).toBeTruthy();

    const button = getByRole('button');
    await fireEvent.click(button);

    expect(getByText('Clicked')).toBeTruthy();
  });
});
```

### E2E Testing (Playwright)

**Page Object Model**:
```typescript
// pages/WorkflowPage.ts
import { BasePage } from './BasePage';

export class WorkflowPage extends BasePage {
  async open(workflowId: string) {
    await this.page.goto(`/workflow/${workflowId}`);
  }

  async addNode(nodeType: string) {
    await this.page.click('[data-test-id="add-node-button"]');
    await this.page.fill('[data-test-id="node-search"]', nodeType);
    await this.page.click(`[data-test-id="node-item-${nodeType}"]`);
  }

  async executeWorkflow() {
    await this.page.click('[data-test-id="execute-workflow-button"]');
  }

  async waitForExecution() {
    await this.page.waitForSelector('[data-test-id="execution-success"]');
  }
}
```

**Test File**:
```typescript
import { test, expect } from './fixtures/base';

test.describe('Workflow Execution', () => {
  test('should execute simple workflow', async ({ page, workflowPage }) => {
    await workflowPage.open('new');
    await workflowPage.addNode('httpRequest');
    await workflowPage.executeWorkflow();
    await workflowPage.waitForExecution();

    const status = await page.textContent('[data-test-id="execution-status"]');
    expect(status).toBe('Success');
  });
});
```

**Test Tags**:
```typescript
test.describe('Database Tests', () => {
  test('should save workflow @mode:postgres @db:reset', async ({ workflowPage }) => {
    // Test that requires PostgreSQL and clean database
  });

  test('should handle chaos @chaostest', async ({ workflowPage }) => {
    // Chaos test
  });
});
```

**Running E2E Tests**:
```bash
# Local server
pnpm --filter=n8n-playwright test:local

# Container-based
pnpm --filter=n8n-playwright test:container:standard
pnpm --filter=n8n-playwright test:container:postgres

# Specific test
pnpm --filter=n8n-playwright test:local tests/workflows.spec.ts

# Debug mode
pnpm --filter=n8n-playwright test:local --debug

# UI mode
pnpm --filter=n8n-playwright test:local --ui
```

### Test Best Practices

1. **Unit Tests**:
   - Mock all external dependencies
   - Use jest-mock-extended for mocks
   - Test one unit in isolation
   - Use nock for HTTP mocking

2. **Frontend Tests**:
   - Use @testing-library/vue
   - Test user interactions
   - Mock stores when needed
   - Use data-test-id for selectors

3. **E2E Tests**:
   - Use Page Object Model
   - Tag tests appropriately
   - Reset database when needed
   - Use meaningful data-test-id attributes
   - Test critical user flows

4. **General**:
   - Confirm test cases with user before writing
   - Work from package directory
   - Run typecheck before committing
   - Write descriptive test names

---

## Code Patterns & Conventions

### TypeScript Best Practices

**✅ DO**:
```typescript
// Use proper types
function process(data: string): number {
  return data.length;
}

// Use unknown for truly unknown data
function parse(input: unknown): string {
  if (typeof input === 'string') {
    return input;
  }
  throw new Error('Invalid input');
}

// Use type guards
function isWorkflow(value: unknown): value is IWorkflowDb {
  return (
    typeof value === 'object' &&
    value !== null &&
    'id' in value &&
    'name' in value
  );
}

// Use generics
function first<T>(arr: T[]): T | undefined {
  return arr[0];
}
```

**❌ DON'T**:
```typescript
// Never use any
function process(data: any): any {  // ❌
  return data.length;
}

// Don't use type casting unnecessarily
const value = data as string;  // ❌ Use type guards instead

// Don't use non-null assertion unnecessarily
const value = data!.property;  // ❌ Handle null case
```

### Error Handling Patterns

**✅ DO**:
```typescript
import { UserError, OperationalError, UnexpectedError } from '@n8n/errors';

// User errors
throw new UserError('Workflow name is required');

// Expected runtime errors
try {
  await database.connect();
} catch (error) {
  throw new OperationalError('Database connection failed', { cause: error });
}

// Unexpected internal errors
if (workflow === undefined) {
  throw new UnexpectedError('Workflow should be defined');
}
```

**❌ DON'T**:
```typescript
import { ApplicationError } from 'n8n-workflow';

// Don't use ApplicationError (deprecated)
throw new ApplicationError('Error');  // ❌
```

### Naming Conventions

**Files**:
- Components: `PascalCase.vue` (e.g., `WorkflowCard.vue`)
- Stores: `camelCase.store.ts` (e.g., `workflows.store.ts`)
- Composables: `camelCase.ts` (e.g., `useWorkflowActions.ts`)
- Services: `PascalCase.service.ts` (e.g., `WorkflowService.ts`)
- Repositories: `PascalCase.repository.ts` (e.g., `WorkflowRepository.ts`)
- Controllers: `PascalCase.controller.ts` (e.g., `WorkflowsController.ts`)

**Variables**:
- camelCase for variables and functions
- PascalCase for classes and types
- UPPER_SNAKE_CASE for constants

```typescript
// Good
const workflowName = 'My Workflow';
const MAX_RETRIES = 3;
class WorkflowService {}
type WorkflowData = {};
```

### Import Organization

```typescript
// 1. Node modules
import { ref, computed } from 'vue';
import { defineStore } from 'pinia';

// 2. @n8n packages
import type { IWorkflowDb } from '@n8n/api-types';
import { UserError } from '@n8n/errors';

// 3. Local imports (absolute paths)
import { useWorkflowsStore } from '@/stores/workflows.store';
import { restApiClient } from '@/api';

// 4. Relative imports
import { formatDate } from '../utils';
import WorkflowCard from './WorkflowCard.vue';
```

### CSS Conventions

**✅ DO**:
```scss
.container {
  // Use CSS variables
  padding: var(--spacing--lg);
  color: var(--color--text);
  font-size: var(--font-size--md);

  // Use nesting (SCSS)
  .title {
    font-weight: var(--font-weight--bold);
  }
}
```

**❌ DON'T**:
```scss
.container {
  // Never hardcode values
  padding: 24px;  // ❌
  color: #333;  // ❌
  font-size: 16px;  // ❌
}
```

### Component Patterns

**Composition API (preferred)**:
```vue
<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';

const count = ref(0);
const doubled = computed(() => count.value * 2);

function increment() {
  count.value++;
}

onMounted(() => {
  console.log('Mounted');
});
</script>
```

**Props & Emits**:
```vue
<script setup lang="ts">
interface Props {
  workflow: IWorkflowDb;
  readonly?: boolean;
}

interface Emits {
  (e: 'save', workflow: IWorkflowDb): void;
  (e: 'delete', id: string): void;
}

const props = withDefaults(defineProps<Props>(), {
  readonly: false,
});

const emit = defineEmits<Emits>();

function handleSave() {
  emit('save', props.workflow);
}
</script>
```

### Data-Test-ID Conventions

**✅ DO**:
```vue
<template>
  <!-- Single value, kebab-case -->
  <button data-test-id="save-workflow-button">Save</button>
  <div data-test-id="workflow-card">...</div>
</template>
```

**❌ DON'T**:
```vue
<template>
  <!-- Never use spaces or multiple values -->
  <button data-test-id="save workflow button">Save</button>  ❌
  <div data-test-id="workflow card active">...</div>  ❌
</template>
```

### Dependency Injection Patterns

**Service with DI**:
```typescript
import { Service } from '@n8n/di';

@Service()
export class WorkflowService {
  constructor(
    private readonly repository: WorkflowRepository,
    private readonly events: EventService,
    private readonly logger: Logger,
  ) {}
}
```

**Testing with DI**:
```typescript
import { Container } from '@n8n/di';

beforeEach(() => {
  const mockRepo = mock<WorkflowRepository>();
  Container.set(WorkflowRepository, mockRepo);
});

afterEach(() => {
  Container.reset();
});
```

---

## Data Flow

### Request Lifecycle

```
1. Browser Request
   ↓
2. Express Middleware Chain
   - Security (Helmet)
   - CORS
   - Body Parser
   - Cookie Parser
   - Compression
   ↓
3. Authentication Middleware
   - JWT token validation
   - User session loading
   - MFA check
   ↓
4. License Middleware
   - Feature flag validation
   - License check
   ↓
5. RBAC Middleware
   - Permission check
   - Resource access validation
   ↓
6. Controller
   - Route matching (@Get, @Post, etc.)
   - Request validation
   - Parameter extraction
   ↓
7. Service Layer
   - Business logic
   - Validation
   - Transaction management
   ↓
8. Repository Layer
   - Query building
   - Database operations
   ↓
9. Database
   - Data persistence
   ↓
10. Response Path
   - Event publishing
   - Response serialization
   - Status code setting
   ↓
11. Browser Response
```

### Workflow Execution Flow

```
1. Trigger Event
   - Manual execution
   - Webhook call
   - Scheduled execution
   - Event trigger
   ↓
2. Load Workflow
   - Fetch from database
   - Resolve credentials
   - Validate configuration
   ↓
3. Create Execution Record
   - Generate execution ID
   - Set initial status (running)
   - Store start time
   ↓
4. Register Active Execution
   - Add to active executions map
   - Set up abort handler
   ↓
5. Execute Workflow
   ┌─────────────────────────┐
   │ For each node:          │
   │ - Resolve parameters    │
   │ - Resolve credentials   │
   │ - Execute node logic    │
   │ - Handle errors         │
   │ - Store node output     │
   │ - Emit node events      │
   │ - Pass data to next     │
   └─────────────────────────┘
   ↓
6. Handle Completion
   - Success: Store results
   - Error: Store error details
   - Update execution status
   - Calculate execution time
   ↓
7. Cleanup
   - Remove from active executions
   - Release resources
   - Emit completion event
   ↓
8. Push Notification
   - Send WebSocket update to UI
   - Update execution list
   - Show notification
```

### Frontend State Management

```
1. User Action (Component)
   ↓
2. Composable (optional)
   - Reusable logic
   - Error handling
   - Toast notifications
   ↓
3. Pinia Store Action
   - State mutation
   - API call
   ↓
4. REST API Client
   - HTTP request
   - Type-safe payload
   ↓
5. Backend API
   ↓
6. Response Handling
   - Update store state
   - Update computed properties
   ↓
7. UI Reactivity
   - Component re-renders
   - Show updated data
```

### WebSocket (Push) Flow

```
1. Frontend Connection
   ↓
2. Push Store
   - Connect to /push endpoint
   - Authenticate with JWT
   ↓
3. Backend Push Service
   - Register connection
   - Map user to connection
   ↓
4. Event Emission
   - Workflow execution events
   - Node execution events
   - System events
   ↓
5. Push to Connected Clients
   - Filter by user/session
   - Serialize event data
   - Send via WebSocket
   ↓
6. Frontend Event Handler
   - Receive event
   - Update store state
   - Trigger UI updates
```

---

## Security & Permissions

### Authentication

**JWT Authentication**:
```typescript
// Generate token
const token = jwt.sign(
  {
    id: user.id,
    email: user.email,
  },
  config.get('jwt.secret'),
  { expiresIn: '7d' },
);

// Set cookie
res.cookie('n8n-auth', token, {
  httpOnly: true,
  secure: true,
  sameSite: 'strict',
  maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
});
```

**MFA (Multi-Factor Authentication)**:
```typescript
// Enable MFA
const secret = speakeasy.generateSecret();
const qrCode = await qrcode.toDataURL(secret.otpauth_url);

// Verify MFA token
const isValid = speakeasy.totp.verify({
  secret: user.mfaSecret,
  encoding: 'base32',
  token: mfaToken,
  window: 2,
});
```

### Authorization (RBAC)

**Scope-Based Permissions**:
```typescript
import { Scope } from '@n8n/permissions';

// Check permission
if (!user.hasScope(Scope.WORKFLOW_CREATE)) {
  throw new UnauthorizedError('Permission denied');
}

// Multiple scopes
if (user.hasAnyScope([Scope.WORKFLOW_UPDATE, Scope.WORKFLOW_ADMIN])) {
  // Allow
}
```

**Project-Based Access**:
```typescript
// Check project access
const hasAccess = await projectService.hasAccess(
  userId,
  projectId,
  'workflow:read',
);

if (!hasAccess) {
  throw new UnauthorizedError('No access to project');
}
```

**Resource-Level Permissions**:
```typescript
// Check workflow ownership
const workflow = await workflowRepository.findById(workflowId);
const shared = await sharedWorkflowRepository.findOne({
  where: {
    workflowId,
    userId,
  },
});

if (!shared) {
  throw new UnauthorizedError('No access to workflow');
}

// Check role
if (shared.role !== 'owner' && shared.role !== 'editor') {
  throw new UnauthorizedError('Insufficient permissions');
}
```

### Credential Security

**Encryption**:
```typescript
import { Container } from '@n8n/di';
import { Cipher } from '@/Cipher';

const cipher = Container.get(Cipher);

// Encrypt credentials
const encrypted = cipher.encrypt(credentials);

// Decrypt credentials
const decrypted = cipher.decrypt(encrypted);
```

**External Secrets**:
```typescript
// AWS Secrets Manager
const secret = await awsSecretsManager.getSecret(secretName);

// Azure Key Vault
const secret = await azureKeyVault.getSecret(secretName);

// GCP Secret Manager
const secret = await gcpSecretManager.getSecret(secretName);

// Infisical
const secret = await infisical.getSecret(secretName);
```

### LDAP/SAML Integration

**LDAP**:
```typescript
// LDAP authentication
const ldapUser = await ldapService.authenticate(email, password);

// Sync LDAP user
await userService.createOrUpdateFromLdap(ldapUser);
```

**SAML**:
```typescript
// SAML SSO
app.post('/sso/saml/acs', async (req, res) => {
  const samlResponse = req.body.SAMLResponse;
  const user = await samlService.authenticate(samlResponse);

  const token = generateJWT(user);
  res.cookie('n8n-auth', token);
  res.redirect('/');
});
```

---

## Scaling & Performance

### Queue Mode (Bull + Redis)

**Setup**:
```typescript
import Bull from 'bull';
import { config } from '@n8n/config';

const queue = new Bull('n8n-jobs', {
  redis: config.get('redis'),
  settings: {
    stalledInterval: 30000,
    maxStalledCount: 3,
  },
});
```

**Adding Jobs**:
```typescript
// Add workflow execution to queue
await queue.add(
  'run-workflow',
  {
    executionId,
    workflowId,
    data,
  },
  {
    attempts: 3,
    backoff: {
      type: 'exponential',
      delay: 2000,
    },
    removeOnComplete: true,
  },
);
```

**Processing Jobs** (Worker):
```typescript
// Worker process
queue.process('run-workflow', async (job) => {
  const { executionId, workflowId, data } = job.data;

  await workflowRunner.run(executionId, workflowId, data);

  return { success: true };
});
```

### Multi-Main Setup (High Availability)

**Architecture**:
```
┌───────────────────┐
│   Load Balancer   │
└─────────┬─────────┘
          │
     ┌────┴────┐
     │         │
┌────▼───┐ ┌──▼─────┐
│ Main 1 │ │ Main 2 │
└────┬───┘ └──┬─────┘
     │        │
     └────┬───┘
          │
     ┌────▼────┐
     │  Redis  │
     └─────────┘
```

**Leader Election**:
```typescript
// Acquire leadership for scheduled workflows
const isLeader = await redisService.acquireLock('leader');

if (isLeader) {
  // This instance handles scheduled workflows
  activeWorkflowRunner.activateAll();
}
```

### Caching

**Redis Caching**:
```typescript
import { RedisService } from '@/services/redis.service';

// Cache workflow
await redisService.set(
  `workflow:${workflowId}`,
  JSON.stringify(workflow),
  'EX',
  3600, // 1 hour
);

// Get from cache
const cached = await redisService.get(`workflow:${workflowId}`);
```

**In-Memory Caching**:
```typescript
import { LRUCache } from 'lru-cache';

const cache = new LRUCache<string, Workflow>({
  max: 500,
  ttl: 1000 * 60 * 60, // 1 hour
});

// Set
cache.set(workflowId, workflow);

// Get
const workflow = cache.get(workflowId);
```

### Database Optimization

**Connection Pooling**:
```typescript
// TypeORM config
{
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'n8n',
  password: 'password',
  database: 'n8n',
  extra: {
    max: 20, // Maximum connections
    min: 5,  // Minimum connections
    idleTimeoutMillis: 30000,
  },
}
```

**Query Optimization**:
```typescript
// Use query builder for complex queries
const workflows = await workflowRepository
  .createQueryBuilder('workflow')
  .leftJoinAndSelect('workflow.shared', 'shared')
  .where('shared.userId = :userId', { userId })
  .andWhere('workflow.active = :active', { active: true })
  .orderBy('workflow.createdAt', 'DESC')
  .limit(50)
  .getMany();

// Use indexes
@Index(['userId'])
@Index(['projectId', 'userId'])
export class SharedWorkflow {}
```

### Performance Monitoring

**Metrics**:
```typescript
// Track execution time
const start = Date.now();
await executeWorkflow();
const duration = Date.now() - start;

await metrics.record('workflow_execution_duration', duration);
```

**Logging**:
```typescript
import { Logger } from '@n8n/backend-common';

logger.info('Workflow started', {
  workflowId,
  executionId,
});

logger.error('Workflow failed', {
  workflowId,
  executionId,
  error: error.message,
});
```

---

## Common Tasks

### Adding New API Endpoint

**1. Define Types** (`packages/@n8n/api-types`):
```typescript
export interface CreateWorkflowRequest {
  name: string;
  nodes: INode[];
  connections: IConnections;
}

export interface CreateWorkflowResponse {
  id: string;
  name: string;
  createdAt: string;
}
```

**2. Create Service** (`packages/cli/src/services`):
```typescript
import { Service } from '@n8n/di';
import { WorkflowRepository } from '@n8n/db';

@Service()
export class WorkflowService {
  constructor(private readonly repository: WorkflowRepository) {}

  async create(data: CreateWorkflowRequest): Promise<CreateWorkflowResponse> {
    const workflow = await this.repository.create(data);
    return {
      id: workflow.id,
      name: workflow.name,
      createdAt: workflow.createdAt.toISOString(),
    };
  }
}
```

**3. Create Controller** (`packages/cli/src/controllers`):
```typescript
import { RestController, Post, Body } from '@n8n/decorators';
import { WorkflowService } from '@/services/workflow.service';
import type { CreateWorkflowRequest, CreateWorkflowResponse } from '@n8n/api-types';

@RestController('/workflows')
export class WorkflowsController {
  constructor(private readonly service: WorkflowService) {}

  @Post('/')
  async create(@Body() body: CreateWorkflowRequest): Promise<CreateWorkflowResponse> {
    return this.service.create(body);
  }
}
```

**4. Update Frontend API Client** (`packages/frontend/@n8n/rest-api-client`):
```typescript
export const workflowsApi = {
  create: async (data: CreateWorkflowRequest): Promise<CreateWorkflowResponse> => {
    return axios.post('/workflows', data);
  },
};
```

**5. Use in Component**:
```typescript
import { restApiClient } from '@n8n/rest-api-client';

const createWorkflow = async () => {
  const workflow = await restApiClient.workflows.create({
    name: 'My Workflow',
    nodes: [],
    connections: {},
  });
};
```

### Adding New Database Entity

**1. Create Entity** (`packages/@n8n/db/src/entities`):
```typescript
import {
  Entity,
  Column,
  PrimaryColumn,
  CreateDateColumn,
  Index,
} from '@n8n/typeorm';

@Entity()
@Index(['userId'])
export class MyEntity {
  @PrimaryColumn('uuid')
  id: string;

  @Column()
  userId: string;

  @Column()
  name: string;

  @CreateDateColumn()
  createdAt: Date;
}
```

**2. Create Repository** (`packages/@n8n/db/src/repositories`):
```typescript
import { DataSource, Repository } from '@n8n/typeorm';
import { Service } from '@n8n/di';
import { MyEntity } from '../entities/MyEntity';

@Service()
export class MyRepository extends Repository<MyEntity> {
  constructor(dataSource: DataSource) {
    super(MyEntity, dataSource.manager);
  }

  async findByUserId(userId: string): Promise<MyEntity[]> {
    return this.find({ where: { userId } });
  }
}
```

**3. Create Migration**:
```bash
pnpm --filter @n8n/db migration:generate CreateMyEntity
```

**4. Run Migration**:
```bash
pnpm --filter @n8n/db migration:run
```

### Adding Translation

**1. Add to i18n Package** (`packages/frontend/@n8n/i18n`):
```typescript
export const en = {
  myFeature: {
    title: 'My Feature',
    description: 'This is my feature',
    button: {
      save: 'Save',
      cancel: 'Cancel',
    },
  },
};
```

**2. Use in Component**:
```vue
<template>
  <div>
    <h1>{{ i18n.baseText('myFeature.title') }}</h1>
    <p>{{ i18n.baseText('myFeature.description') }}</p>
    <n8n-button>
      {{ i18n.baseText('myFeature.button.save') }}
    </n8n-button>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from '@/composables/useI18n';

const i18n = useI18n();
</script>
```

### Creating Backend Module

**Follow**: `packages/cli/scripts/backend-module/backend-module.guide.md`

```bash
# Run module generator
pushd packages/cli
node scripts/backend-module/setup.mjs
popd

# Creates:
# - src/modules/my-module/
#   - my-module.controller.ts
#   - my-module.service.ts
#   - my-module.repository.ts (if needed)
#   - __tests__/
```

### Adding Feature Flag

**1. Add to Config** (`packages/@n8n/config`):
```typescript
export const featureFlagsSchema = z.object({
  myFeature: z.boolean().default(false),
});
```

**2. Check in Backend**:
```typescript
import { config } from '@n8n/config';

if (config.get('features.myFeature')) {
  // Feature enabled
}
```

**3. Check in Frontend** (PostHog):
```typescript
import { usePostHogStore } from '@/stores/posthog.store';

const posthog = usePostHogStore();

if (posthog.isFeatureEnabled('my-feature')) {
  // Feature enabled
}
```

---

## Troubleshooting

### Common Build Issues

**TypeScript Errors After Dependency Changes**:
```bash
# Clean and rebuild
rm -rf node_modules
rm -rf packages/*/dist
rm pnpm-lock.yaml
pnpm install
pnpm build > build.log 2>&1
```

**Missing Types**:
```bash
# Build dependencies first
pnpm build:lib
pushd packages/cli
pnpm typecheck
popd
```

### Common Test Issues

**Tests Failing**:
```bash
# Ensure you're in the package directory
pushd packages/cli
pnpm test
popd

# Clean test cache
pnpm test --clearCache
```

**E2E Tests Timing Out**:
```bash
# Increase timeout
pnpm --filter=n8n-playwright test:local --timeout=60000

# Run in debug mode
pnpm --filter=n8n-playwright test:local --debug
```

### Common Runtime Issues

**Database Connection Issues**:
```bash
# Check database config
cat ~/.n8n/config

# Reset database
rm ~/.n8n/database.sqlite

# Run migrations
pnpm --filter @n8n/db migration:run
```

**Port Already in Use**:
```bash
# Find process using port 5678
lsof -i :5678

# Kill process
kill -9 <PID>
```

**Hot Reload Not Working**:
```bash
# Ensure dev reload is enabled
export N8N_DEV_RELOAD=true
pnpm dev
```

### Debugging

**Backend Debugging**:
```bash
# VS Code launch.json
{
  "type": "node",
  "request": "launch",
  "name": "Debug n8n",
  "program": "${workspaceFolder}/packages/cli/bin/n8n",
  "args": ["start"],
  "env": {
    "NODE_ENV": "development",
    "N8N_DEV_RELOAD": "true"
  }
}
```

**Frontend Debugging**:
```bash
# Vue DevTools automatically available in development
pnpm dev:fe
```

**Database Debugging**:
```bash
# Enable query logging
N8N_LOG_LEVEL=debug pnpm dev

# Check logs
tail -f ~/.n8n/logs/n8n.log
```

---

## Additional Resources

### Documentation
- **Main README**: `/README.md`
- **Contributing**: `/CONTRIBUTING.md`
- **Code of Conduct**: `/CODE_OF_CONDUCT.md`
- **CLAUDE Guidelines**: `/CLAUDE.md`, `/packages/frontend/CLAUDE.md`
- **Playwright Guide**: `/packages/testing/playwright/CLAUDE.md`
- **Backend Module Guide**: `/packages/cli/scripts/backend-module/backend-module.guide.md`

### Key Files
- **Workspace Config**: `/pnpm-workspace.yaml`
- **Build Config**: `/turbo.json`
- **TypeScript Config**: `/tsconfig.json`, `@n8n/typescript-config/tsconfig.common.json`
- **ESLint Config**: `@n8n/eslint-config`
- **Biome Config**: `/biome.jsonc`
- **Prettier Config**: `/.prettierrc.js`
- **Git Hooks**: `/lefthook.yml`

### External Links
- **n8n Website**: https://n8n.io
- **Documentation**: https://docs.n8n.io
- **Community Forum**: https://community.n8n.io
- **GitHub**: https://github.com/n8n-io/n8n
- **Linear**: https://linear.app/n8n

---

## Appendix

### Package Version Reference

| Package | Version | Purpose |
|---------|---------|---------|
| n8n | 1.121.0 | Main package |
| packages/cli | 1.121.0 | Express server & API |
| packages/core | 1.120.0 | Execution engine |
| packages/workflow | 1.118.0 | Core interfaces |
| packages/@n8n/db | 0.32.0 | Database layer |
| packages/@n8n/config | 1.63.0 | Configuration |
| packages/@n8n/nodes-langchain | 1.120.0 | AI nodes |
| packages/frontend/editor-ui | 1.121.0 | Vue frontend |

### Command Cheat Sheet

```bash
# Development
pnpm dev                    # Full stack
pnpm dev:be                 # Backend only
pnpm dev:fe                 # Frontend only
N8N_DEV_RELOAD=true pnpm dev  # Hot reload

# Building
pnpm build > build.log 2>&1
tail -n 20 build.log

# Testing
pnpm test                   # All tests
pushd packages/cli && pnpm test && popd  # Package tests
pnpm --filter=n8n-playwright test:local  # E2E tests

# Code Quality
pushd packages/cli
pnpm lint
pnpm typecheck
popd

# Git
git checkout -b feature/N8N-1234-description
gh pr create --draft

# Database
pnpm --filter @n8n/db migration:generate Name
pnpm --filter @n8n/db migration:run

# Node Development
N8N_DEV_RELOAD=true pnpm dev
```

### Frequently Used Paths

```
Root: C:\Users\user\Desktop\n8n

Backend:
- CLI: packages/cli/src/
- Core: packages/core/src/
- DB: packages/@n8n/db/src/
- Nodes: packages/nodes-base/nodes/

Frontend:
- Main App: packages/frontend/editor-ui/src/
- Design System: packages/frontend/@n8n/design-system/
- i18n: packages/frontend/@n8n/i18n/

Testing:
- Playwright: packages/testing/playwright/
- Test Utils: packages/@n8n/backend-test-utils/

Config:
- Root: /
- CLI: packages/cli/
- Frontend: packages/frontend/editor-ui/
```

---

**End of n8n-brain.md**

This document provides comprehensive knowledge about the n8n repository structure, architecture, development workflow, and best practices. Use it as a reference when working on n8n development tasks.
