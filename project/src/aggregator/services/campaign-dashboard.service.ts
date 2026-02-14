import type { CampaignService as FbCampaignService } from "../../facebook-marketing/index.js";
import type { CampaignService as GoogleCampaignService } from "../../google-ads/index.js";
import {
  CampaignStatus,
  Platform,
  type AdCampaign,
  type AdChannel,
  type CampaignDashboard,
} from "../domain-types.js";
import { mapFbCampaign } from "../mappers/facebook.mapper.js";
import { mapGoogleCampaign } from "../mappers/google-ads.mapper.js";

export interface CampaignDashboardService {
  getDashboard(
    fbAdAccountId: string,
    googleCustomerId: string,
  ): Promise<CampaignDashboard>;
  getCampaigns(
    fbAdAccountId: string,
    googleCustomerId: string,
  ): Promise<AdCampaign[]>;
}

export function createCampaignDashboardService(
  fbCampaigns: FbCampaignService,
  googleCampaigns: GoogleCampaignService,
): CampaignDashboardService {
  async function fetchAllCampaigns(
    fbAdAccountId: string,
    googleCustomerId: string,
  ): Promise<AdCampaign[]> {
    const [fbResponse, googleRows] = await Promise.all([
      fbCampaigns.list(fbAdAccountId),
      googleCampaigns.listWithBudgets(googleCustomerId),
    ]);

    const fbMapped = fbResponse.data.map(mapFbCampaign);
    const googleMapped = googleRows.map((row) =>
      mapGoogleCampaign(row.campaign, row.budget),
    );

    return [...fbMapped, ...googleMapped];
  }

  function buildDashboard(campaigns: AdCampaign[]): CampaignDashboard {
    const byPlatform: Record<Platform, AdCampaign[]> = {
      [Platform.FACEBOOK]: [],
      [Platform.GOOGLE_ADS]: [],
    };

    const byChannel: Partial<Record<AdChannel, AdCampaign[]>> = {};

    for (const campaign of campaigns) {
      byPlatform[campaign.platform].push(campaign);

      if (!byChannel[campaign.channel]) {
        byChannel[campaign.channel] = [];
      }
      byChannel[campaign.channel]!.push(campaign);
    }

    return {
      campaigns,
      totalCampaigns: campaigns.length,
      activeCampaigns: campaigns.filter(
        (c) => c.status === CampaignStatus.ACTIVE,
      ).length,
      totalDailyBudgetCents: campaigns.reduce(
        (sum, c) => sum + (c.dailyBudgetCents ?? 0),
        0,
      ),
      byPlatform,
      byChannel,
    };
  }

  return {
    async getDashboard(fbAdAccountId, googleCustomerId) {
      const campaigns = await fetchAllCampaigns(
        fbAdAccountId,
        googleCustomerId,
      );
      return buildDashboard(campaigns);
    },

    async getCampaigns(fbAdAccountId, googleCustomerId) {
      return fetchAllCampaigns(fbAdAccountId, googleCustomerId);
    },
  };
}
