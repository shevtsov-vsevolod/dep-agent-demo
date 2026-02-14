// Google Ads REST API v20 types

export enum GoogleAdsCampaignStatus {
  UNSPECIFIED = "UNSPECIFIED",
  ENABLED = "ENABLED",
  PAUSED = "PAUSED",
  REMOVED = "REMOVED",
}

export enum GoogleAdsAdGroupStatus {
  UNSPECIFIED = "UNSPECIFIED",
  ENABLED = "ENABLED",
  PAUSED = "PAUSED",
  REMOVED = "REMOVED",
}

export enum GoogleAdsAdGroupAdStatus {
  UNSPECIFIED = "UNSPECIFIED",
  ENABLED = "ENABLED",
  PAUSED = "PAUSED",
  REMOVED = "REMOVED",
}

export enum GoogleAdsCampaignType {
  UNSPECIFIED = "UNSPECIFIED",
  SEARCH = "SEARCH",
  DISPLAY = "DISPLAY",
  SHOPPING = "SHOPPING",
  VIDEO = "VIDEO",
  PERFORMANCE_MAX = "PERFORMANCE_MAX",
  DEMAND_GEN = "DEMAND_GEN",
}

export enum GoogleAdsAdType {
  UNSPECIFIED = "UNSPECIFIED",
  RESPONSIVE_SEARCH_AD = "RESPONSIVE_SEARCH_AD",
  RESPONSIVE_DISPLAY_AD = "RESPONSIVE_DISPLAY_AD",
  VIDEO_AD = "VIDEO_AD",
  SHOPPING_PRODUCT_AD = "SHOPPING_PRODUCT_AD",
}

export interface GoogleAdsCampaign {
  resourceName: string;
  id: string;
  name: string;
  status: GoogleAdsCampaignStatus;
  advertisingChannelType: GoogleAdsCampaignType;
  campaignBudget: string;
  startDate: string;
  endDate?: string;
  biddingStrategyType?: string;
}

export interface GoogleAdsCampaignBudget {
  resourceName: string;
  id: string;
  amountMicros: string;
  deliveryMethod: string;
}

export interface GoogleAdsAdGroup {
  resourceName: string;
  id: string;
  name: string;
  status: GoogleAdsAdGroupStatus;
  campaign: string;
  cpcBidMicros?: string;
  type: string;
}

export interface GoogleAdsAd {
  resourceName: string;
  id: string;
  type: GoogleAdsAdType;
  finalUrls: string[];
  responsiveSearchAd?: {
    headlines: Array<{ text: string; pinnedField?: string }>;
    descriptions: Array<{ text: string; pinnedField?: string }>;
  };
}

export interface GoogleAdsAdGroupAd {
  resourceName: string;
  adGroup: string;
  status: GoogleAdsAdGroupAdStatus;
  ad: GoogleAdsAd;
}

export interface GoogleAdsMetrics {
  impressions: string;
  clicks: string;
  costMicros: string;
  conversions: number;
  ctr: number;
  averageCpc: string;
}

export interface GoogleAdsRow {
  campaign?: GoogleAdsCampaign;
  campaignBudget?: GoogleAdsCampaignBudget;
  adGroup?: GoogleAdsAdGroup;
  adGroupAd?: GoogleAdsAdGroupAd;
  metrics?: GoogleAdsMetrics;
}

export interface GoogleAdsSearchResponse {
  results: GoogleAdsRow[];
  fieldMask: string;
  totalResultsCount?: string;
  nextPageToken?: string;
}

export interface GoogleAdsMutateOperation {
  create?: Record<string, unknown>;
  update?: Record<string, unknown>;
  remove?: string;
  updateMask?: string;
}

export interface GoogleAdsMutateResult {
  resourceName: string;
}

export interface GoogleAdsMutateResponse {
  results: GoogleAdsMutateResult[];
  partialFailureError?: {
    code: number;
    message: string;
  };
}
