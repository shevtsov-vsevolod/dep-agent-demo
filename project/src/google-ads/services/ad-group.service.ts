import type { GoogleAdsClient } from "../client.js";
import type {
  GoogleAdsAdGroup,
  GoogleAdsMutateResponse,
  GoogleAdsRow,
} from "../types.js";

export interface AdGroupService {
  list(customerId: string, campaignId: string): Promise<GoogleAdsRow[]>;
  getById(customerId: string, adGroupId: string): Promise<GoogleAdsRow>;
  create(
    customerId: string,
    adGroup: Partial<GoogleAdsAdGroup>,
  ): Promise<GoogleAdsMutateResponse>;
  update(
    customerId: string,
    resourceName: string,
    fields: Partial<GoogleAdsAdGroup>,
  ): Promise<GoogleAdsMutateResponse>;
  remove(
    customerId: string,
    resourceName: string,
  ): Promise<GoogleAdsMutateResponse>;
}

export function createAdGroupService(
  client: GoogleAdsClient,
): AdGroupService {
  return {
    async list(customerId, campaignId) {
      const response = await client.search(
        customerId,
        `SELECT ad_group.id, ad_group.name, ad_group.status,
                ad_group.campaign, ad_group.cpc_bid_micros, ad_group.type
         FROM ad_group
         WHERE campaign.id = ${campaignId}
         ORDER BY ad_group.id`,
      );
      return response.results;
    },

    async getById(customerId, adGroupId) {
      const response = await client.search(
        customerId,
        `SELECT ad_group.id, ad_group.name, ad_group.status,
                ad_group.campaign, ad_group.cpc_bid_micros, ad_group.type
         FROM ad_group
         WHERE ad_group.id = ${adGroupId}`,
      );
      return response.results[0];
    },

    async create(customerId, adGroup) {
      return client.mutate(customerId, "adGroups", [
        { create: adGroup as unknown as Record<string, unknown> },
      ]);
    },

    async update(customerId, resourceName, fields) {
      return client.mutate(customerId, "adGroups", [
        {
          update: {
            resourceName,
            ...fields,
          } as unknown as Record<string, unknown>,
          updateMask: Object.keys(fields).join(","),
        },
      ]);
    },

    async remove(customerId, resourceName) {
      return client.mutate(customerId, "adGroups", [
        { remove: resourceName },
      ]);
    },
  };
}
