export type {
  AdCampaign,
  AdGroup,
  Ad,
  PerformanceMetrics,
  WorkItem,
  ProjectSummary,
  CampaignDashboard,
} from "./domain-types.js";
export {
  CampaignStatus,
  AdChannel,
  Platform,
  WorkItemStatus,
  WorkItemPriority,
} from "./domain-types.js";

export {
  mapFbCampaign,
  mapFbAdSet,
  mapFbInsight,
} from "./mappers/facebook.mapper.js";
export {
  mapGoogleCampaign,
  mapGoogleAdGroup,
  mapGoogleAdGroupAd,
  mapGoogleMetrics,
} from "./mappers/google-ads.mapper.js";
export { mapJiraIssue, mapJiraProject } from "./mappers/jira.mapper.js";

export type { CampaignDashboardService } from "./services/campaign-dashboard.service.js";
export { createCampaignDashboardService } from "./services/campaign-dashboard.service.js";

export type { WorkTrackerService } from "./services/work-tracker.service.js";
export { createWorkTrackerService } from "./services/work-tracker.service.js";

import {
  createFacebookClient,
  type FacebookClientConfig,
} from "../facebook-marketing/index.js";
import { createCampaignService as createFbCampaignService } from "../facebook-marketing/index.js";
import {
  createGoogleAdsClient,
  type GoogleAdsClientConfig,
} from "../google-ads/index.js";
import { createCampaignService as createGoogleCampaignService } from "../google-ads/index.js";
import {
  createJiraClient,
  type JiraClientConfig,
} from "../jira/index.js";
import { createIssueService } from "../jira/index.js";
import { createCampaignDashboardService } from "./services/campaign-dashboard.service.js";
import { createWorkTrackerService } from "./services/work-tracker.service.js";

export interface AggregatorConfig {
  facebook: FacebookClientConfig;
  googleAds: GoogleAdsClientConfig;
  jira: JiraClientConfig;
}

export interface Aggregator {
  campaignDashboard: ReturnType<typeof createCampaignDashboardService>;
  workTracker: ReturnType<typeof createWorkTrackerService>;
}

export function createAggregator(config: AggregatorConfig): Aggregator {
  const fbClient = createFacebookClient(config.facebook);
  const fbCampaigns = createFbCampaignService(fbClient);

  const googleClient = createGoogleAdsClient(config.googleAds);
  const googleCampaigns = createGoogleCampaignService(googleClient);

  const jiraClient = createJiraClient(config.jira);
  const issues = createIssueService(jiraClient);

  return {
    campaignDashboard: createCampaignDashboardService(
      fbCampaigns,
      googleCampaigns,
    ),
    workTracker: createWorkTrackerService(issues),
  };
}
