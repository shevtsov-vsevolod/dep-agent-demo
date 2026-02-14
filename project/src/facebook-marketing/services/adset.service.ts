import type { FacebookClient } from "../client.js";
import type {
  FbAdSet,
  FbCreateAdSetPayload,
  FbCreateResponse,
  FbListResponse,
} from "../types.js";

export interface AdSetService {
  list(adAccountId: string): Promise<FbListResponse<FbAdSet>>;
  listByCampaign(campaignId: string): Promise<FbListResponse<FbAdSet>>;
  getById(adSetId: string): Promise<FbAdSet>;
  create(
    adAccountId: string,
    payload: FbCreateAdSetPayload,
  ): Promise<FbCreateResponse>;
  update(
    adSetId: string,
    payload: Partial<FbCreateAdSetPayload>,
  ): Promise<void>;
  delete(adSetId: string): Promise<void>;
}

const AD_SET_FIELDS =
  "id,name,campaign_id,status,daily_budget,lifetime_budget,billing_event,optimization_goal,targeting,start_time,end_time,created_time,updated_time";

export function createAdSetService(client: FacebookClient): AdSetService {
  return {
    async list(adAccountId) {
      return client.get<FbListResponse<FbAdSet>>(
        `act_${adAccountId}/adsets`,
        { fields: AD_SET_FIELDS },
      );
    },

    async listByCampaign(campaignId) {
      return client.get<FbListResponse<FbAdSet>>(`${campaignId}/adsets`, {
        fields: AD_SET_FIELDS,
      });
    },

    async getById(adSetId) {
      return client.get<FbAdSet>(adSetId, { fields: AD_SET_FIELDS });
    },

    async create(adAccountId, payload) {
      return client.post<FbCreateResponse>(
        `act_${adAccountId}/adsets`,
        payload as unknown as Record<string, unknown>,
      );
    },

    async update(adSetId, payload) {
      await client.post(
        adSetId,
        payload as unknown as Record<string, unknown>,
      );
    },

    async delete(adSetId) {
      await client.delete(adSetId);
    },
  };
}
