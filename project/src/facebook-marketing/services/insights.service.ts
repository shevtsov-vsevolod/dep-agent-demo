import type { FacebookClient } from "../client.js";
import type { FbInsight, FbInsightsParams, FbListResponse } from "../types.js";

export interface InsightsService {
  getCampaignInsights(
    campaignId: string,
    params?: FbInsightsParams,
  ): Promise<FbListResponse<FbInsight>>;
  getAdSetInsights(
    adSetId: string,
    params?: FbInsightsParams,
  ): Promise<FbListResponse<FbInsight>>;
  getAdInsights(
    adId: string,
    params?: FbInsightsParams,
  ): Promise<FbListResponse<FbInsight>>;
  getAccountInsights(
    adAccountId: string,
    params?: FbInsightsParams,
  ): Promise<FbListResponse<FbInsight>>;
}

function buildInsightsQuery(
  params?: FbInsightsParams,
): Record<string, unknown> {
  const query: Record<string, unknown> = {};
  if (params?.fields) {
    query.fields = params.fields.join(",");
  } else {
    query.fields =
      "impressions,clicks,spend,cpc,cpm,ctr,conversions,date_start,date_stop";
  }
  if (params?.time_range) {
    query.time_range = JSON.stringify(params.time_range);
  }
  if (params?.level) {
    query.level = params.level;
  }
  if (params?.breakdowns) {
    query.breakdowns = params.breakdowns.join(",");
  }
  if (params?.limit) {
    query.limit = params.limit;
  }
  return query;
}

export function createInsightsService(
  client: FacebookClient,
): InsightsService {
  return {
    async getCampaignInsights(campaignId, params) {
      return client.get<FbListResponse<FbInsight>>(
        `${campaignId}/insights`,
        buildInsightsQuery(params),
      );
    },

    async getAdSetInsights(adSetId, params) {
      return client.get<FbListResponse<FbInsight>>(
        `${adSetId}/insights`,
        buildInsightsQuery(params),
      );
    },

    async getAdInsights(adId, params) {
      return client.get<FbListResponse<FbInsight>>(
        `${adId}/insights`,
        buildInsightsQuery(params),
      );
    },

    async getAccountInsights(adAccountId, params) {
      return client.get<FbListResponse<FbInsight>>(
        `act_${adAccountId}/insights`,
        buildInsightsQuery(params),
      );
    },
  };
}
