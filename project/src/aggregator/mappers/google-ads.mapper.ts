import type {
  GoogleAdsCampaign,
  GoogleAdsCampaignBudget,
  GoogleAdsAdGroup,
  GoogleAdsAdGroupAd,
  GoogleAdsMetrics,
} from "../../google-ads/index.js";
import {
  GoogleAdsCampaignStatus,
  GoogleAdsCampaignType,
  GoogleAdsAdGroupStatus,
  GoogleAdsAdGroupAdStatus,
} from "../../google-ads/index.js";
import {
  AdChannel,
  CampaignStatus,
  Platform,
  type Ad,
  type AdCampaign,
  type AdGroup,
  type PerformanceMetrics,
} from "../domain-types.js";

function mapGoogleCampaignStatus(
  status: GoogleAdsCampaignStatus,
): CampaignStatus {
  switch (status) {
    case GoogleAdsCampaignStatus.ENABLED:
      return CampaignStatus.ACTIVE;
    case GoogleAdsCampaignStatus.PAUSED:
      return CampaignStatus.PAUSED;
    case GoogleAdsCampaignStatus.REMOVED:
      return CampaignStatus.REMOVED;
    case GoogleAdsCampaignStatus.UNSPECIFIED:
      return CampaignStatus.PAUSED;
  }
}

function mapGoogleAdGroupStatus(
  status: GoogleAdsAdGroupStatus,
): CampaignStatus {
  switch (status) {
    case GoogleAdsAdGroupStatus.ENABLED:
      return CampaignStatus.ACTIVE;
    case GoogleAdsAdGroupStatus.PAUSED:
      return CampaignStatus.PAUSED;
    case GoogleAdsAdGroupStatus.REMOVED:
      return CampaignStatus.REMOVED;
    case GoogleAdsAdGroupStatus.UNSPECIFIED:
      return CampaignStatus.PAUSED;
  }
}

function mapGoogleAdStatus(
  status: GoogleAdsAdGroupAdStatus,
): CampaignStatus {
  switch (status) {
    case GoogleAdsAdGroupAdStatus.ENABLED:
      return CampaignStatus.ACTIVE;
    case GoogleAdsAdGroupAdStatus.PAUSED:
      return CampaignStatus.PAUSED;
    case GoogleAdsAdGroupAdStatus.REMOVED:
      return CampaignStatus.REMOVED;
    case GoogleAdsAdGroupAdStatus.UNSPECIFIED:
      return CampaignStatus.PAUSED;
  }
}

function mapGoogleChannelType(type: GoogleAdsCampaignType): AdChannel {
  switch (type) {
    case GoogleAdsCampaignType.SEARCH:
      return AdChannel.SEARCH;
    case GoogleAdsCampaignType.DISPLAY:
      return AdChannel.DISPLAY;
    case GoogleAdsCampaignType.VIDEO:
      return AdChannel.VIDEO;
    case GoogleAdsCampaignType.SHOPPING:
      return AdChannel.SHOPPING;
    case GoogleAdsCampaignType.PERFORMANCE_MAX:
      return AdChannel.PERFORMANCE_MAX;
    case GoogleAdsCampaignType.DEMAND_GEN:
      return AdChannel.DISPLAY;
    case GoogleAdsCampaignType.UNSPECIFIED:
      return AdChannel.OTHER;
  }
}

function microsToCents(micros: string): number {
  return Math.round(parseInt(micros, 10) / 10000);
}

export function mapGoogleCampaign(
  campaign: GoogleAdsCampaign,
  budget?: GoogleAdsCampaignBudget,
): AdCampaign {
  return {
    id: `google_${campaign.id}`,
    externalId: campaign.id,
    platform: Platform.GOOGLE_ADS,
    name: campaign.name,
    status: mapGoogleCampaignStatus(campaign.status),
    channel: mapGoogleChannelType(campaign.advertisingChannelType),
    dailyBudgetCents: budget ? microsToCents(budget.amountMicros) : undefined,
    startDate: campaign.startDate,
    endDate: campaign.endDate,
  };
}

export function mapGoogleAdGroup(
  adGroup: GoogleAdsAdGroup,
): AdGroup {
  const campaignResourceParts = adGroup.campaign.split("/");
  const campaignId = campaignResourceParts[campaignResourceParts.length - 1];
  return {
    id: `google_${adGroup.id}`,
    externalId: adGroup.id,
    platform: Platform.GOOGLE_ADS,
    campaignId: `google_${campaignId}`,
    name: adGroup.name,
    status: mapGoogleAdGroupStatus(adGroup.status),
  };
}

export function mapGoogleAdGroupAd(
  adGroupAd: GoogleAdsAdGroupAd,
  campaignId: string,
): Ad {
  const adGroupResourceParts = adGroupAd.adGroup.split("/");
  const adGroupId = adGroupResourceParts[adGroupResourceParts.length - 1];
  return {
    id: `google_${adGroupAd.ad.id}`,
    externalId: adGroupAd.ad.id,
    platform: Platform.GOOGLE_ADS,
    adGroupId: `google_${adGroupId}`,
    campaignId: `google_${campaignId}`,
    name: adGroupAd.ad.finalUrls?.[0] ?? `Ad ${adGroupAd.ad.id}`,
    status: mapGoogleAdStatus(adGroupAd.status),
  };
}

export function mapGoogleMetrics(
  metrics: GoogleAdsMetrics,
  campaignId: string,
  dateRange: { start: string; end: string },
): PerformanceMetrics {
  return {
    campaignId: `google_${campaignId}`,
    platform: Platform.GOOGLE_ADS,
    impressions: parseInt(metrics.impressions, 10),
    clicks: parseInt(metrics.clicks, 10),
    spendCents: microsToCents(metrics.costMicros),
    conversions: metrics.conversions,
    ctr: metrics.ctr,
    dateStart: dateRange.start,
    dateEnd: dateRange.end,
  };
}
