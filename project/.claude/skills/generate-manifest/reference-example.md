# Facebook Marketing Module

## Overview

| Field       | Value                                  |
|-------------|----------------------------------------|
| Module      | `facebook-marketing`                   |
| API         | Facebook Graph API (Marketing)         |
| API Version | v22.0                                  |
| Base URL    | `https://graph.facebook.com/v22.0/`    |
| Auth        | Access token passed as `access_token` query parameter |

---

## API Requests

### Campaigns

| # | Method | Endpoint                         | Description           | Service Method              | File                            | Line |
|---|--------|----------------------------------|-----------------------|-----------------------------|---------------------------------|------|
| 1 | GET    | `act_{adAccountId}/campaigns`    | List all campaigns    | `CampaignService.list`      | `services/campaign.service.ts`  | 26   |
| 2 | GET    | `{campaignId}`                   | Get campaign by ID    | `CampaignService.getById`   | `services/campaign.service.ts`  | 36   |
| 3 | POST   | `act_{adAccountId}/campaigns`    | Create a campaign     | `CampaignService.create`    | `services/campaign.service.ts`  | 43   |
| 4 | POST   | `{campaignId}`                   | Update a campaign     | `CampaignService.update`    | `services/campaign.service.ts`  | 50   |
| 5 | DELETE | `{campaignId}`                   | Delete a campaign     | `CampaignService.delete`    | `services/campaign.service.ts`  | 57   |

### Ad Sets

| #  | Method | Endpoint                       | Description                | Service Method              | File                          | Line |
|----|--------|--------------------------------|----------------------------|-----------------------------|-------------------------------|------|
| 6  | GET    | `act_{adAccountId}/adsets`     | List all ad sets           | `AdSetService.list`         | `services/adset.service.ts`   | 30   |
| 7  | GET    | `{campaignId}/adsets`          | List ad sets by campaign   | `AdSetService.listByCampaign` | `services/adset.service.ts` | 37   |
| 8  | GET    | `{adSetId}`                    | Get ad set by ID           | `AdSetService.getById`      | `services/adset.service.ts`   | 42   |
| 9  | POST   | `act_{adAccountId}/adsets`     | Create an ad set           | `AdSetService.create`       | `services/adset.service.ts`   | 47   |
| 10 | POST   | `{adSetId}`                    | Update an ad set           | `AdSetService.update`       | `services/adset.service.ts`   | 54   |
| 11 | DELETE | `{adSetId}`                    | Delete an ad set           | `AdSetService.delete`       | `services/adset.service.ts`   | 61   |

### Ads

| #  | Method | Endpoint                     | Description           | Service Method            | File                       | Line |
|----|--------|------------------------------|-----------------------|---------------------------|----------------------------|------|
| 12 | GET    | `act_{adAccountId}/ads`      | List all ads          | `AdService.list`          | `services/ad.service.ts`   | 27   |
| 13 | GET    | `{adSetId}/ads`              | List ads by ad set    | `AdService.listByAdSet`   | `services/ad.service.ts`   | 33   |
| 14 | GET    | `{adId}`                     | Get ad by ID          | `AdService.getById`       | `services/ad.service.ts`   | 39   |
| 15 | POST   | `act_{adAccountId}/ads`      | Create an ad          | `AdService.create`        | `services/ad.service.ts`   | 43   |
| 16 | POST   | `{adId}`                     | Update an ad          | `AdService.update`        | `services/ad.service.ts`   | 50   |
| 17 | DELETE | `{adId}`                     | Delete an ad          | `AdService.delete`        | `services/ad.service.ts`   | 54   |

### Insights / Reporting

| #  | Method | Endpoint                        | Description                 | Service Method                      | File                            | Line |
|----|--------|---------------------------------|-----------------------------|-------------------------------------|---------------------------------|------|
| 18 | GET    | `{campaignId}/insights`         | Get campaign insights       | `InsightsService.getCampaignInsights` | `services/insights.service.ts` | 53   |
| 19 | GET    | `{adSetId}/insights`            | Get ad set insights         | `InsightsService.getAdSetInsights`    | `services/insights.service.ts` | 60   |
| 20 | GET    | `{adId}/insights`               | Get ad insights             | `InsightsService.getAdInsights`       | `services/insights.service.ts` | 67   |
| 21 | GET    | `act_{adAccountId}/insights`    | Get account-level insights  | `InsightsService.getAccountInsights`  | `services/insights.service.ts` | 74   |

