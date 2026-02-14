import type { FacebookClient } from "../client.js";
import type {
  FbAd,
  FbCreateAdPayload,
  FbCreateResponse,
  FbListResponse,
} from "../types.js";

export interface AdService {
  list(adAccountId: string): Promise<FbListResponse<FbAd>>;
  listByAdSet(adSetId: string): Promise<FbListResponse<FbAd>>;
  getById(adId: string): Promise<FbAd>;
  create(
    adAccountId: string,
    payload: FbCreateAdPayload,
  ): Promise<FbCreateResponse>;
  update(adId: string, payload: Partial<FbCreateAdPayload>): Promise<void>;
  delete(adId: string): Promise<void>;
}

const AD_FIELDS =
  "id,name,adset_id,campaign_id,status,creative,created_time,updated_time";

export function createAdService(client: FacebookClient): AdService {
  return {
    async list(adAccountId) {
      return client.get<FbListResponse<FbAd>>(`act_${adAccountId}/ads`, {
        fields: AD_FIELDS,
      });
    },

    async listByAdSet(adSetId) {
      return client.get<FbListResponse<FbAd>>(`${adSetId}/ads`, {
        fields: AD_FIELDS,
      });
    },

    async getById(adId) {
      return client.get<FbAd>(adId, { fields: AD_FIELDS });
    },

    async create(adAccountId, payload) {
      return client.post<FbCreateResponse>(
        `act_${adAccountId}/ads`,
        payload as unknown as Record<string, unknown>,
      );
    },

    async update(adId, payload) {
      await client.post(adId, payload as unknown as Record<string, unknown>);
    },

    async delete(adId) {
      await client.delete(adId);
    },
  };
}
