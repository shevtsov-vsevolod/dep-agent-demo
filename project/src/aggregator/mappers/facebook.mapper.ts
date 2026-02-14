import type { FbAdSet, FbCampaign, FbInsight } from "../../facebook-marketing/index.js";
import { FbCampaignStatus } from "../../facebook-marketing/index.js";
import {
  AdChannel,
  CampaignStatus,
  Platform,
  type AdCampaign,
  type AdGroup,
  type PerformanceMetrics,
} from "../domain-types.js";

function mapFbStatus(status: FbCampaignStatus): CampaignStatus {
  switch (status) {
    case FbCampaignStatus.ACTIVE:
      return CampaignStatus.ACTIVE;
    case FbCampaignStatus.PAUSED:
      return CampaignStatus.PAUSED;
    case FbCampaignStatus.DELETED:
      return CampaignStatus.REMOVED;
    case FbCampaignStatus.ARCHIVED:
      return CampaignStatus.ARCHIVED;
  }
}

function dollarsToCents(dollarString?: string): number | undefined {
  if (!dollarString) return undefined;
  return Math.round(parseFloat(dollarString) * 100);
}

export function mapFbCampaign(campaign: FbCampaign): AdCampaign {
  return {
    id: `fb_${campaign.id}`,
    externalId: campaign.id,
    platform: Platform.FACEBOOK,
    name: campaign.name,
    status: mapFbStatus(campaign.status),
    channel: AdChannel.SOCIAL,
    dailyBudgetCents: dollarsToCents(campaign.daily_budget),
    lifetimeBudgetCents: dollarsToCents(campaign.lifetime_budget),
    startDate: campaign.start_time,
    endDate: campaign.stop_time,
    createdAt: campaign.created_time,
    updatedAt: campaign.updated_time,
  };
}

export function mapFbAdSet(adSet: FbAdSet): AdGroup {
  return {
    id: `fb_${adSet.id}`,
    externalId: adSet.id,
    platform: Platform.FACEBOOK,
    campaignId: `fb_${adSet.campaign_id}`,
    name: adSet.name,
    status: mapFbStatus(adSet.status),
  };
}

export function mapFbInsight(
  insight: FbInsight,
  campaignId: string,
): PerformanceMetrics {
  return {
    campaignId: `fb_${campaignId}`,
    platform: Platform.FACEBOOK,
    impressions: parseInt(insight.impressions, 10),
    clicks: parseInt(insight.clicks, 10),
    spendCents: Math.round(parseFloat(insight.spend) * 100),
    conversions: insight.conversions ? parseInt(insight.conversions, 10) : 0,
    ctr: insight.ctr ? parseFloat(insight.ctr) : 0,
    dateStart: insight.date_start,
    dateEnd: insight.date_stop,
  };
}
