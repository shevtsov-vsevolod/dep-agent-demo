export type {
  GoogleAdsCampaign,
  GoogleAdsCampaignBudget,
  GoogleAdsAdGroup,
  GoogleAdsAdGroupAd,
  GoogleAdsAd,
  GoogleAdsMetrics,
  GoogleAdsRow,
  GoogleAdsSearchResponse,
  GoogleAdsMutateOperation,
  GoogleAdsMutateResult,
  GoogleAdsMutateResponse,
} from "./types.js";
export {
  GoogleAdsCampaignStatus,
  GoogleAdsAdGroupStatus,
  GoogleAdsAdGroupAdStatus,
  GoogleAdsCampaignType,
  GoogleAdsAdType,
} from "./types.js";

export type { GoogleAdsClient, GoogleAdsClientConfig } from "./client.js";
export { createGoogleAdsClient } from "./client.js";

export type {
  CampaignService,
  CampaignWithBudget,
} from "./services/campaign.service.js";
export { createCampaignService } from "./services/campaign.service.js";

export type { AdGroupService } from "./services/ad-group.service.js";
export { createAdGroupService } from "./services/ad-group.service.js";

export type { AdGroupAdService } from "./services/ad.service.js";
export { createAdGroupAdService } from "./services/ad.service.js";

import {
  createGoogleAdsClient,
  type GoogleAdsClientConfig,
} from "./client.js";
import { createCampaignService } from "./services/campaign.service.js";
import { createAdGroupService } from "./services/ad-group.service.js";
import { createAdGroupAdService } from "./services/ad.service.js";

export interface GoogleAds {
  campaigns: ReturnType<typeof createCampaignService>;
  adGroups: ReturnType<typeof createAdGroupService>;
  adGroupAds: ReturnType<typeof createAdGroupAdService>;
}

export function createGoogleAds(config: GoogleAdsClientConfig): GoogleAds {
  const client = createGoogleAdsClient(config);
  return {
    campaigns: createCampaignService(client),
    adGroups: createAdGroupService(client),
    adGroupAds: createAdGroupAdService(client),
  };
}
