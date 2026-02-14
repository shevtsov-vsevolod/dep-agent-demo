import type { GoogleAdsClient } from "../client.js";
import type {
  GoogleAdsCampaign,
  GoogleAdsCampaignBudget,
  GoogleAdsMutateResponse,
  GoogleAdsRow,
} from "../types.js";

export interface CampaignWithBudget {
  campaign: GoogleAdsCampaign;
  budget: GoogleAdsCampaignBudget;
}

export interface CampaignService {
  list(customerId: string): Promise<GoogleAdsRow[]>;
  getById(customerId: string, campaignId: string): Promise<GoogleAdsRow>;
  listWithBudgets(customerId: string): Promise<CampaignWithBudget[]>;
  create(
    customerId: string,
    campaign: Partial<GoogleAdsCampaign>,
  ): Promise<GoogleAdsMutateResponse>;
  update(
    customerId: string,
    resourceName: string,
    fields: Partial<GoogleAdsCampaign>,
  ): Promise<GoogleAdsMutateResponse>;
  remove(
    customerId: string,
    resourceName: string,
  ): Promise<GoogleAdsMutateResponse>;
}

export function createCampaignService(
  client: GoogleAdsClient,
): CampaignService {
  return {
    async list(customerId) {
      const response = await client.search(
        customerId,
        `SELECT campaign.id, campaign.name, campaign.status,
                campaign.advertising_channel_type, campaign.start_date,
                campaign.end_date, campaign.bidding_strategy_type,
                campaign_budget.amount_micros
         FROM campaign
         ORDER BY campaign.id`,
      );
      return response.results;
    },

    async getById(customerId, campaignId) {
      const response = await client.search(
        customerId,
        `SELECT campaign.id, campaign.name, campaign.status,
                campaign.advertising_channel_type, campaign.start_date,
                campaign.end_date, campaign.campaign_budget,
                campaign_budget.amount_micros
         FROM campaign
         WHERE campaign.id = ${campaignId}`,
      );
      return response.results[0];
    },

    async listWithBudgets(customerId) {
      const response = await client.search(
        customerId,
        `SELECT campaign.id, campaign.name, campaign.status,
                campaign.advertising_channel_type,
                campaign_budget.id, campaign_budget.amount_micros,
                campaign_budget.delivery_method
         FROM campaign
         WHERE campaign.status != 'REMOVED'
         ORDER BY campaign.id`,
      );
      return response.results
        .filter(
          (row): row is GoogleAdsRow &
            Required<Pick<GoogleAdsRow, "campaign" | "campaignBudget">> =>
            row.campaign !== undefined && row.campaignBudget !== undefined,
        )
        .map((row) => ({
          campaign: row.campaign,
          budget: row.campaignBudget,
        }));
    },

    async create(customerId, campaign) {
      return client.mutate(customerId, "campaigns", [
        { create: campaign as unknown as Record<string, unknown> },
      ]);
    },

    async update(customerId, resourceName, fields) {
      return client.mutate(customerId, "campaigns", [
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
      return client.mutate(customerId, "campaigns", [
        { remove: resourceName },
      ]);
    },
  };
}
