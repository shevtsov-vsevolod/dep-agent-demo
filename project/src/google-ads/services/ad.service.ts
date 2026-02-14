import type { GoogleAdsClient } from "../client.js";
import type {
  GoogleAdsMutateResponse,
  GoogleAdsRow,
} from "../types.js";

export interface AdGroupAdService {
  list(customerId: string, adGroupId: string): Promise<GoogleAdsRow[]>;
  listByCampaign(customerId: string, campaignId: string): Promise<GoogleAdsRow[]>;
  getById(customerId: string, adGroupAdId: string): Promise<GoogleAdsRow>;
  create(
    customerId: string,
    adGroupAd: Record<string, unknown>,
  ): Promise<GoogleAdsMutateResponse>;
  update(
    customerId: string,
    resourceName: string,
    fields: Record<string, unknown>,
  ): Promise<GoogleAdsMutateResponse>;
  remove(
    customerId: string,
    resourceName: string,
  ): Promise<GoogleAdsMutateResponse>;
}

export function createAdGroupAdService(
  client: GoogleAdsClient,
): AdGroupAdService {
  return {
    async list(customerId, adGroupId) {
      const response = await client.search(
        customerId,
        `SELECT ad_group_ad.resource_name, ad_group_ad.status,
                ad_group_ad.ad.id, ad_group_ad.ad.type,
                ad_group_ad.ad.final_urls,
                ad_group_ad.ad.responsive_search_ad.headlines,
                ad_group_ad.ad.responsive_search_ad.descriptions,
                ad_group.id, ad_group.name
         FROM ad_group_ad
         WHERE ad_group.id = ${adGroupId}
         ORDER BY ad_group_ad.ad.id`,
      );
      return response.results;
    },

    async listByCampaign(customerId, campaignId) {
      const response = await client.search(
        customerId,
        `SELECT ad_group_ad.resource_name, ad_group_ad.status,
                ad_group_ad.ad.id, ad_group_ad.ad.type,
                ad_group_ad.ad.final_urls,
                ad_group.id, ad_group.name,
                campaign.id, campaign.name
         FROM ad_group_ad
         WHERE campaign.id = ${campaignId}
         ORDER BY ad_group_ad.ad.id`,
      );
      return response.results;
    },

    async getById(customerId, adGroupAdId) {
      const response = await client.search(
        customerId,
        `SELECT ad_group_ad.resource_name, ad_group_ad.status,
                ad_group_ad.ad.id, ad_group_ad.ad.type,
                ad_group_ad.ad.final_urls,
                ad_group_ad.ad.responsive_search_ad.headlines,
                ad_group_ad.ad.responsive_search_ad.descriptions,
                ad_group.id, ad_group.name
         FROM ad_group_ad
         WHERE ad_group_ad.ad.id = ${adGroupAdId}`,
      );
      return response.results[0];
    },

    async create(customerId, adGroupAd) {
      return client.mutate(customerId, "adGroupAds", [
        { create: adGroupAd },
      ]);
    },

    async update(customerId, resourceName, fields) {
      return client.mutate(customerId, "adGroupAds", [
        {
          update: { resourceName, ...fields },
          updateMask: Object.keys(fields).join(","),
        },
      ]);
    },

    async remove(customerId, resourceName) {
      return client.mutate(customerId, "adGroupAds", [
        { remove: resourceName },
      ]);
    },
  };
}
