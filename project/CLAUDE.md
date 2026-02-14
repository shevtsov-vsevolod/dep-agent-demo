# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Build & Development Commands

- **Type check:** `npm run typecheck` (runs `tsc --noEmit`)
- **No test runner is configured.** There is no Jest, Vitest, or other test framework.
- **No linter is configured.**

## Architecture

This is a TypeScript ESM project (`"type": "module"`) that aggregates data from three external APIs — Facebook Marketing, Google Ads, and Jira — into a unified domain model.

### Layered Design

```
src/
├── facebook-marketing/   # Facebook Marketing API v22.0 wrapper
├── google-ads/           # Google Ads API v20 wrapper
├── jira/                 # Jira Cloud API v2 wrapper
└── aggregator/           # Unified domain layer
    ├── domain-types.ts   # Platform-agnostic entities (AdCampaign, WorkItem, etc.)
    ├── mappers/           # Platform → domain type transformers
    ├── services/          # Cross-platform business logic
    └── index.ts           # Composition root: createAggregator(config)
```

Each platform module follows the same internal pattern:
- `client.ts` — Axios-based HTTP client with auth handling
- `types.ts` — Platform-specific TypeScript types and enums
- `services/*.service.ts` — CRUD operations as factory functions: `createXxxService(client)`
- `index.ts` — Public exports for the module

### Data Flow

1. **Clients** make HTTP requests to external APIs
2. **Services** provide domain-specific operations using clients
3. **Mappers** transform platform types to domain types (status enums, currency conversions)
4. **Aggregator services** combine data across platforms into unified views

### Key Entry Point

`createAggregator(config)` in `src/aggregator/index.ts` is the composition root. It wires up all clients, services, and mappers, returning an `Aggregator` with:
- `campaignDashboard` — Unifies Facebook + Google Ads campaigns
- `workTracker` — Manages Jira work items linked to campaigns

### Currency Conventions

- Facebook budgets: string dollar amounts → converted to cents (integer)
- Google Ads budgets: micros (millionths of currency unit) → converted to cents
- Domain model stores all budgets in **cents**

### ID Prefixing

Aggregated entities use platform prefixes (`fb_`, `google_`) on IDs to avoid collisions.

### Adding a New Platform

1. Create `src/{platform}/` with `client.ts`, `types.ts`, `services/`, `index.ts`
2. Add mapper in `src/aggregator/mappers/{platform}.mapper.ts`
3. Wire into `src/aggregator/index.ts`
