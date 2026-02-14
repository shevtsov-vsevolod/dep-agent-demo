export type {
  JiraIssue,
  JiraIssueFields,
  JiraProject,
  JiraUser,
  JiraStatus,
  JiraStatusCategory,
  JiraPriority,
  JiraIssueType,
  JiraSearchResult,
  JiraCreateIssuePayload,
  JiraUpdateIssuePayload,
  JiraTransition,
  JiraTransitionsResponse,
  JiraCreateResponse,
  JiraProjectListResponse,
} from "./types.js";

export type { JiraClient, JiraClientConfig } from "./client.js";
export { createJiraClient } from "./client.js";

export type { IssueService } from "./services/issue.service.js";
export { createIssueService } from "./services/issue.service.js";

export type { ProjectService } from "./services/project.service.js";
export { createProjectService } from "./services/project.service.js";

import { createJiraClient, type JiraClientConfig } from "./client.js";
import { createIssueService } from "./services/issue.service.js";
import { createProjectService } from "./services/project.service.js";

export interface Jira {
  issues: ReturnType<typeof createIssueService>;
  projects: ReturnType<typeof createProjectService>;
}

export function createJira(config: JiraClientConfig): Jira {
  const client = createJiraClient(config);
  return {
    issues: createIssueService(client),
    projects: createProjectService(client),
  };
}
