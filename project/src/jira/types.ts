// Jira Cloud REST API v2 types

export interface JiraUser {
  accountId: string;
  displayName: string;
  emailAddress?: string;
  avatarUrls: Record<string, string>;
  active: boolean;
}

export interface JiraStatusCategory {
  id: number;
  key: string;
  name: string;
  colorName: string;
}

export interface JiraStatus {
  id: string;
  name: string;
  statusCategory: JiraStatusCategory;
}

export interface JiraPriority {
  id: string;
  name: string;
  iconUrl: string;
}

export interface JiraIssueType {
  id: string;
  name: string;
  subtask: boolean;
  iconUrl: string;
}

export interface JiraProject {
  id: string;
  key: string;
  name: string;
  projectTypeKey: string;
  lead?: JiraUser;
  avatarUrls: Record<string, string>;
}

export interface JiraIssueFields {
  summary: string;
  description?: string;
  status: JiraStatus;
  priority: JiraPriority;
  issuetype: JiraIssueType;
  project: JiraProject;
  assignee?: JiraUser;
  reporter: JiraUser;
  created: string;
  updated: string;
  labels: string[];
  components: Array<{ id: string; name: string }>;
}

export interface JiraIssue {
  id: string;
  key: string;
  self: string;
  fields: JiraIssueFields;
}

export interface JiraSearchResult {
  startAt: number;
  maxResults: number;
  total: number;
  issues: JiraIssue[];
}

export interface JiraCreateIssuePayload {
  fields: {
    project: { key: string };
    summary: string;
    description?: string;
    issuetype: { name: string };
    priority?: { name: string };
    assignee?: { accountId: string };
    labels?: string[];
    components?: Array<{ name: string }>;
  };
}

export interface JiraUpdateIssuePayload {
  fields: Partial<{
    summary: string;
    description: string;
    priority: { name: string };
    assignee: { accountId: string } | null;
    labels: string[];
  }>;
}

export interface JiraTransition {
  id: string;
  name: string;
  to: JiraStatus;
}

export interface JiraTransitionsResponse {
  transitions: JiraTransition[];
}

export interface JiraCreateResponse {
  id: string;
  key: string;
  self: string;
}

export interface JiraProjectListResponse {
  values: JiraProject[];
  startAt: number;
  maxResults: number;
  total: number;
  isLast: boolean;
}
