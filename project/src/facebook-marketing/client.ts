import axios, { type AxiosInstance } from "axios";

export interface FacebookClientConfig {
  accessToken: string;
}

export interface FacebookClient {
  get<T>(path: string, params?: Record<string, unknown>): Promise<T>;
  post<T>(path: string, data?: Record<string, unknown>): Promise<T>;
  delete(path: string): Promise<void>;
}

export function createFacebookClient(
  config: FacebookClientConfig,
): FacebookClient {
  const http: AxiosInstance = axios.create({
    baseURL: "https://graph.facebook.com/v22.0/",
    params: { access_token: config.accessToken },
  });

  return {
    async get<T>(path: string, params?: Record<string, unknown>): Promise<T> {
      const response = await http.get<T>(path, { params });
      return response.data;
    },

    async post<T>(
      path: string,
      data?: Record<string, unknown>,
    ): Promise<T> {
      const response = await http.post<T>(path, data);
      return response.data;
    },

    async delete(path: string): Promise<void> {
      await http.delete(path);
    },
  };
}
