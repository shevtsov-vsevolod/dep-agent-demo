import axios, { type AxiosInstance } from "axios";

export interface JiraClientConfig {
  domain: string;
  email: string;
  apiToken: string;
}

export interface JiraClient {
  get<T>(path: string, params?: Record<string, unknown>): Promise<T>;
  post<T>(path: string, data?: unknown): Promise<T>;
  put<T>(path: string, data?: unknown): Promise<T>;
  delete(path: string): Promise<void>;
}

export function createJiraClient(config: JiraClientConfig): JiraClient {
  const credentials = Buffer.from(
    `${config.email}:${config.apiToken}`,
  ).toString("base64");

  const http: AxiosInstance = axios.create({
    baseURL: `https://${config.domain}.atlassian.net/rest/api/2/`,
    headers: {
      Authorization: `Basic ${credentials}`,
      "Content-Type": "application/json",
    },
  });

  return {
    async get<T>(path: string, params?: Record<string, unknown>): Promise<T> {
      const response = await http.get<T>(path, { params });
      return response.data;
    },

    async post<T>(path: string, data?: unknown): Promise<T> {
      const response = await http.post<T>(path, data);
      return response.data;
    },

    async put<T>(path: string, data?: unknown): Promise<T> {
      const response = await http.put<T>(path, data);
      return response.data;
    },

    async delete(path: string): Promise<void> {
      await http.delete(path);
    },
  };
}
