import axios, { type AxiosInstance } from "axios";
import type {
  GoogleAdsMutateOperation,
  GoogleAdsMutateResponse,
  GoogleAdsSearchResponse,
} from "./types.js";

export interface GoogleAdsClientConfig {
  accessToken: string;
  developerToken: string;
  loginCustomerId?: string;
}

export interface GoogleAdsClient {
  search(
    customerId: string,
    query: string,
    pageToken?: string,
  ): Promise<GoogleAdsSearchResponse>;
  get<T>(resourceName: string): Promise<T>;
  mutate(
    customerId: string,
    resource: string,
    operations: GoogleAdsMutateOperation[],
  ): Promise<GoogleAdsMutateResponse>;
}

export function createGoogleAdsClient(
  config: GoogleAdsClientConfig,
): GoogleAdsClient {
  const http: AxiosInstance = axios.create({
    baseURL: "https://googleads.googleapis.com/v20/",
    headers: {
      Authorization: `Bearer ${config.accessToken}`,
      "developer-token": config.developerToken,
      ...(config.loginCustomerId
        ? { "login-customer-id": config.loginCustomerId }
        : {}),
    },
  });

  return {
    async search(customerId, query, pageToken) {
      const response = await http.post<GoogleAdsSearchResponse>(
        `customers/${customerId}/googleAds:search`,
        { query, pageToken },
      );
      return response.data;
    },

    async get<T>(resourceName: string): Promise<T> {
      const response = await http.get<T>(resourceName);
      return response.data;
    },

    async mutate(customerId, resource, operations) {
      const response = await http.post<GoogleAdsMutateResponse>(
        `customers/${customerId}/${resource}:mutate`,
        { operations },
      );
      return response.data;
    },
  };
}
