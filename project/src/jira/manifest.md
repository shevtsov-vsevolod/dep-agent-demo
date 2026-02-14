# Jira Module

## Overview

| Field       | Value                                                        |
|-------------|--------------------------------------------------------------|
| Module      | `jira`                                                       |
| API         | Jira Cloud REST API                                          |
| API Version | v2                                                           |
| Base URL    | `https://{domain}.atlassian.net/rest/api/2/`                 |
| Auth        | Basic auth with Base64-encoded `email:apiToken` in the `Authorization` header |

---

## API Requests

### Issues

| # | Method | Endpoint                       | Description                        | Service Method               | File                           | Line |
|---|--------|--------------------------------|------------------------------------|------------------------------|--------------------------------|------|
| 1 | POST   | `search`                       | Search issues using JQL            | `IssueService.search`        | `services/issue.service.ts`    | 24   |
| 2 | GET    | `issue/{issueKey}`             | Get an issue by key                | `IssueService.getByKey`      | `services/issue.service.ts`    | 46   |
| 3 | POST   | `issue`                        | Create an issue                    | `IssueService.create`        | `services/issue.service.ts`    | 50   |
| 4 | PUT    | `issue/{issueKey}`             | Update an issue                    | `IssueService.update`        | `services/issue.service.ts`    | 54   |
| 5 | DELETE | `issue/{issueKey}`             | Delete an issue                    | `IssueService.delete`        | `services/issue.service.ts`    | 58   |
| 6 | GET    | `issue/{issueKey}/transitions` | Get available transitions          | `IssueService.getTransitions`| `services/issue.service.ts`    | 62   |
| 7 | POST   | `issue/{issueKey}/transitions` | Transition an issue to a new status| `IssueService.transition`    | `services/issue.service.ts`    | 68   |

### Projects

| # | Method | Endpoint               | Description          | Service Method            | File                             | Line |
|---|--------|------------------------|----------------------|---------------------------|----------------------------------|------|
| 8 | GET    | `project/search`       | List projects        | `ProjectService.list`     | `services/project.service.ts`    | 12   |
| 9 | GET    | `project/{projectKey}` | Get a project by key | `ProjectService.getByKey` | `services/project.service.ts`    | 19   |
