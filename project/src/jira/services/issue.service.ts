import type { JiraClient } from "../client.js";
import type {
  JiraCreateIssuePayload,
  JiraCreateResponse,
  JiraIssue,
  JiraSearchResult,
  JiraTransitionsResponse,
  JiraUpdateIssuePayload,
} from "../types.js";

export interface IssueService {
  search(jql: string, maxResults?: number, startAt?: number): Promise<JiraSearchResult>;
  getByKey(issueKey: string): Promise<JiraIssue>;
  create(payload: JiraCreateIssuePayload): Promise<JiraCreateResponse>;
  update(issueKey: string, payload: JiraUpdateIssuePayload): Promise<void>;
  delete(issueKey: string): Promise<void>;
  getTransitions(issueKey: string): Promise<JiraTransitionsResponse>;
  transition(issueKey: string, transitionId: string): Promise<void>;
}

export function createIssueService(client: JiraClient): IssueService {
  return {
    async search(jql, maxResults = 50, startAt = 0) {
      return client.post<JiraSearchResult>("search", {
        jql,
        maxResults,
        startAt,
        fields: [
          "summary",
          "description",
          "status",
          "priority",
          "issuetype",
          "project",
          "assignee",
          "reporter",
          "created",
          "updated",
          "labels",
          "components",
        ],
      });
    },

    async getByKey(issueKey) {
      return client.get<JiraIssue>(`issue/${issueKey}`);
    },

    async create(payload) {
      return client.post<JiraCreateResponse>("issue", payload);
    },

    async update(issueKey, payload) {
      await client.put(`issue/${issueKey}`, payload);
    },

    async delete(issueKey) {
      await client.delete(`issue/${issueKey}`);
    },

    async getTransitions(issueKey) {
      return client.get<JiraTransitionsResponse>(
        `issue/${issueKey}/transitions`,
      );
    },

    async transition(issueKey, transitionId) {
      await client.post(`issue/${issueKey}/transitions`, {
        transition: { id: transitionId },
      });
    },
  };
}
