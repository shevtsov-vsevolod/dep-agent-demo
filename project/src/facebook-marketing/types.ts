// Facebook Marketing API v22 types

export enum FbCampaignStatus {
  ACTIVE = "ACTIVE",
  PAUSED = "PAUSED",
  DELETED = "DELETED",
  ARCHIVED = "ARCHIVED",
}

export enum FbCampaignObjective {
  OUTCOME_AWARENESS = "OUTCOME_AWARENESS",
  OUTCOME_ENGAGEMENT = "OUTCOME_ENGAGEMENT",
  OUTCOME_LEADS = "OUTCOME_LEADS",
  OUTCOME_SALES = "OUTCOME_SALES",
  OUTCOME_TRAFFIC = "OUTCOME_TRAFFIC",
  OUTCOME_APP_PROMOTION = "OUTCOME_APP_PROMOTION",
}

export enum FbAdSetBillingEvent {
  IMPRESSIONS = "IMPRESSIONS",
  LINK_CLICKS = "LINK_CLICKS",
  APP_INSTALLS = "APP_INSTALLS",
}

export enum FbAdSetOptimizationGoal {
  REACH = "REACH",
  IMPRESSIONS = "IMPRESSIONS",
  LINK_CLICKS = "LINK_CLICKS",
  LANDING_PAGE_VIEWS = "LANDING_PAGE_VIEWS",
  CONVERSIONS = "CONVERSIONS",
  LEAD_GENERATION = "LEAD_GENERATION",
}

export interface FbCampaign {
  id: string;
  name: string;
  status: FbCampaignStatus;
  objective: FbCampaignObjective;
  daily_budget?: string;
  lifetime_budget?: string;
  created_time: string;
  updated_time: string;
  start_time?: string;
  stop_time?: string;
}

export interface FbAdSet {
  id: string;
  name: string;
  campaign_id: string;
  status: FbCampaignStatus;
  daily_budget?: string;
  lifetime_budget?: string;
  billing_event: FbAdSetBillingEvent;
  optimization_goal: FbAdSetOptimizationGoal;
  targeting: Record<string, unknown>;
  start_time: string;
  end_time?: string;
  created_time: string;
  updated_time: string;
}

export interface FbAd {
  id: string;
  name: string;
  adset_id: string;
  campaign_id: string;
  status: FbCampaignStatus;
  creative: { id: string };
  created_time: string;
  updated_time: string;
}

export interface FbInsight {
  campaign_id?: string;
  adset_id?: string;
  ad_id?: string;
  impressions: string;
  clicks: string;
  spend: string;
  cpc?: string;
  cpm?: string;
  ctr?: string;
  conversions?: string;
  date_start: string;
  date_stop: string;
}

export interface FbListResponse<T> {
  data: T[];
  paging?: {
    cursors: { before: string; after: string };
    next?: string;
    previous?: string;
  };
}

export interface FbCreateCampaignPayload {
  name: string;
  objective: FbCampaignObjective;
  status: FbCampaignStatus;
  daily_budget?: string;
  lifetime_budget?: string;
  special_ad_categories: string[];
}

export interface FbCreateAdSetPayload {
  name: string;
  campaign_id: string;
  status: FbCampaignStatus;
  daily_budget?: string;
  lifetime_budget?: string;
  billing_event: FbAdSetBillingEvent;
  optimization_goal: FbAdSetOptimizationGoal;
  targeting: Record<string, unknown>;
  start_time: string;
  end_time?: string;
}

export interface FbCreateAdPayload {
  name: string;
  adset_id: string;
  status: FbCampaignStatus;
  creative: { creative_id: string };
}

export interface FbInsightsParams {
  time_range?: { since: string; until: string };
  fields?: string[];
  level?: "campaign" | "adset" | "ad";
  breakdowns?: string[];
  limit?: number;
}

export interface FbCreateResponse {
  id: string;
}
