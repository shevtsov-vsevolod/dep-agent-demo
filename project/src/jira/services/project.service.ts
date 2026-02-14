import type { JiraClient } from "../client.js";
import type { JiraProject, JiraProjectListResponse } from "../types.js";

export interface ProjectService {
  list(startAt?: number, maxResults?: number): Promise<JiraProjectListResponse>;
  getByKey(projectKey: string): Promise<JiraProject>;
}

export function createProjectService(client: JiraClient): ProjectService {
  return {
    async list(startAt = 0, maxResults = 50) {
      return client.get<JiraProjectListResponse>("project/search", {
        startAt,
        maxResults,
      });
    },

    async getByKey(projectKey) {
      return client.get<JiraProject>(`project/${projectKey}`);
    },
  };
}
