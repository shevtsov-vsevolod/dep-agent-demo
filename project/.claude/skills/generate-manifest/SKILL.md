---
name: generate-manifest
description: Analyze a source module and generate a manifest.md documenting its API usage and endpoints.
argument-hint: [module-name]
allowed-tools: Read, Grep, Glob, Bash, Write, Edit, Task
---

# Generate Module Manifest

Analyze the module `src/$ARGUMENTS/` in the project and produce a file `src/$ARGUMENTS/manifest.md` that documents the module's external API usage.

## Steps

### 1. Discover module files

Use Glob to find all `.ts` files under `src/$ARGUMENTS/`. Read every file.

### 2. Extract API metadata from the client file

Find the file that creates an axios instance (typically `client.ts`). From it extract:

- **API name**: Infer from the base URL or module name (e.g. `https://graph.facebook.com` → "Facebook Graph API").
- **API version**: Extract from the base URL path (e.g. `/v22.0/` → "v22.0").
- **Base URL**: The full `baseURL` string passed to `axios.create()`.
- **Auth method**: Determine from the code how authentication is handled (query param, Bearer header, Basic auth header, etc.) and describe it in one sentence.

### 3. Catalog every API request

Scan every service file under `services/`. For each call to the client (`client.get`, `client.post`, `client.put`, `client.delete`, `client.search`, `client.mutate`, or any method on the client), record:

- **HTTP method** (GET, POST, PUT, DELETE — for custom methods like `search` or `mutate`, determine the underlying HTTP method from the client implementation)
- **Endpoint path** as written in code (e.g. `` `act_${adAccountId}/campaigns` ``)
- **Short description** of what the request does
- **Service method name** in `ServiceName.method` format
- **Source file** (relative to the module root)
- **Line number** where the client call starts

Number requests sequentially starting from 1 across all services.

### 4. Group requests by service / resource

Group the requests into logical sections based on the service file they come from. Name each section after the resource (e.g. "Campaigns", "Ad Sets", "Issues"). Each section gets its own markdown table.

### 5. Write manifest.md

Create the file `src/$ARGUMENTS/manifest.md` using **exactly** this structure (match the formatting of the reference example below):

```
# {Module Display Name} Module

## Overview

| Field       | Value                          |
|-------------|--------------------------------|
| Module      | `{module-name}`                |
| API         | {API display name}             |
| API Version | {version}                      |
| Base URL    | `{base url}`                   |
| Auth        | {auth description}             |

---

## API Requests

### {Resource Group 1}

| # | Method | Endpoint | Description | Service Method | File | Line |
|---|--------|----------|-------------|----------------|------|------|
| 1 | ...    | ...      | ...         | ...            | ...  | ...  |

### {Resource Group 2}

(same table format, numbering continues)
```

## Rules

- Do NOT invent or hallucinate endpoints — only document calls that actually exist in the code.
- Every line number must be accurate — verify by reading the file.
- Endpoint paths must be shown exactly as they appear in the source, wrapped in backticks.
- Do not include a Summary section or Cross-Module References section at the end.

## Reference Example

Read [reference-example.md](reference-example.md) as the gold-standard example of the expected output format and level of detail. Read it before generating output.
