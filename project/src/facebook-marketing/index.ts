export type {
  FbCampaign,
  FbAdSet,
  FbAd,
  FbInsight,
  FbListResponse,
  FbCreateCampaignPayload,
  FbCreateAdSetPayload,
  FbCreateAdPayload,
  FbCreateResponse,
  FbInsightsParams,
} from "./types.js";
export {
  FbCampaignStatus,
  FbCampaignObjective,
  FbAdSetBillingEvent,
  FbAdSetOptimizationGoal,
} from "./types.js";

export type { FacebookClient, FacebookClientConfig } from "./client.js";
export { createFacebookClient } from "./client.js";

export type { CampaignService } from "./services/campaign.service.js";
export { createCampaignService } from "./services/campaign.service.js";

export type { AdSetService } from "./services/adset.service.js";
export { createAdSetService } from "./services/adset.service.js";

export type { AdService } from "./services/ad.service.js";
export { createAdService } from "./services/ad.service.js";

export type { InsightsService } from "./services/insights.service.js";
export { createInsightsService } from "./services/insights.service.js";

import { createFacebookClient, type FacebookClientConfig } from "./client.js";
import { createCampaignService } from "./services/campaign.service.js";
import { createAdSetService } from "./services/adset.service.js";
import { createAdService } from "./services/ad.service.js";
import { createInsightsService } from "./services/insights.service.js";

export interface FacebookMarketing {
  campaigns: ReturnType<typeof createCampaignService>;
  adSets: ReturnType<typeof createAdSetService>;
  ads: ReturnType<typeof createAdService>;
  insights: ReturnType<typeof createInsightsService>;
}

export function createFacebookMarketing(
  config: FacebookClientConfig,
): FacebookMarketing {
  const client = createFacebookClient(config);
  return {
    campaigns: createCampaignService(client),
    adSets: createAdSetService(client),
    ads: createAdService(client),
    insights: createInsightsService(client),
  };
}
