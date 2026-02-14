import type { FacebookClient } from "../client.js";
import type {
  FbCampaign,
  FbCreateCampaignPayload,
  FbCreateResponse,
  FbListResponse,
} from "../types.js";

export interface CampaignService {
  list(adAccountId: string): Promise<FbListResponse<FbCampaign>>;
  getById(campaignId: string): Promise<FbCampaign>;
  create(
    adAccountId: string,
    payload: FbCreateCampaignPayload,
  ): Promise<FbCreateResponse>;
  update(
    campaignId: string,
    payload: Partial<FbCreateCampaignPayload>,
  ): Promise<void>;
  delete(campaignId: string): Promise<void>;
}

export function createCampaignService(client: FacebookClient): CampaignService {
  return {
    async list(adAccountId) {
      return client.get<FbListResponse<FbCampaign>>(
        `act_${adAccountId}/campaigns`,
        {
          fields:
            "id,name,status,objective,daily_budget,lifetime_budget,created_time,updated_time,start_time,stop_time",
        },
      );
    },

    async getById(campaignId) {
      return client.get<FbCampaign>(campaignId, {
        fields:
          "id,name,status,objective,daily_budget,lifetime_budget,created_time,updated_time,start_time,stop_time",
      });
    },

    async create(adAccountId, payload) {
      return client.post<FbCreateResponse>(
        `act_${adAccountId}/campaigns`,
        payload as unknown as Record<string, unknown>,
      );
    },

    async update(campaignId, payload) {
      await client.post(
        campaignId,
        payload as unknown as Record<string, unknown>,
      );
    },

    async delete(campaignId) {
      await client.delete(campaignId);
    },
  };
}
