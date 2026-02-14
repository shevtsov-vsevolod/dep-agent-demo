# Google Ads Module

## Overview

| Field       | Value                                      |
|-------------|--------------------------------------------|
| Module      | `google-ads`                               |
| API         | Google Ads API                             |
| API Version | v20                                        |
| Base URL    | `https://googleads.googleapis.com/v20/`    |
| Auth        | Bearer token via `Authorization` header, plus `developer-token` and optional `login-customer-id` headers |

---

## API Requests

### Campaigns

| # | Method | Endpoint | Description | Service Method | File | Line |
|---|--------|----------|-------------|----------------|------|------|
| 1 | POST | `customers/${customerId}/googleAds:search` | List all campaigns | `CampaignService.list` | `services/campaign.service.ts` | 38 |
| 2 | POST | `customers/${customerId}/googleAds:search` | Get campaign by ID | `CampaignService.getById` | `services/campaign.service.ts` | 51 |
| 3 | POST | `customers/${customerId}/googleAds:search` | List campaigns with budgets | `CampaignService.listWithBudgets` | `services/campaign.service.ts` | 64 |
| 4 | POST | `customers/${customerId}/campaigns:mutate` | Create a campaign | `CampaignService.create` | `services/campaign.service.ts` | 87 |
| 5 | POST | `customers/${customerId}/campaigns:mutate` | Update a campaign | `CampaignService.update` | `services/campaign.service.ts` | 93 |
| 6 | POST | `customers/${customerId}/campaigns:mutate` | Remove a campaign | `CampaignService.remove` | `services/campaign.service.ts` | 105 |

### Ad Groups

| #  | Method | Endpoint | Description | Service Method | File | Line |
|----|--------|----------|-------------|----------------|------|------|
| 7  | POST | `customers/${customerId}/googleAds:search` | List ad groups by campaign | `AdGroupService.list` | `services/ad-group.service.ts` | 31 |
| 8  | POST | `customers/${customerId}/googleAds:search` | Get ad group by ID | `AdGroupService.getById` | `services/ad-group.service.ts` | 43 |
| 9  | POST | `customers/${customerId}/adGroups:mutate` | Create an ad group | `AdGroupService.create` | `services/ad-group.service.ts` | 54 |
| 10 | POST | `customers/${customerId}/adGroups:mutate` | Update an ad group | `AdGroupService.update` | `services/ad-group.service.ts` | 60 |
| 11 | POST | `customers/${customerId}/adGroups:mutate` | Remove an ad group | `AdGroupService.remove` | `services/ad-group.service.ts` | 72 |

### Ads

| #  | Method | Endpoint | Description | Service Method | File | Line |
|----|--------|----------|-------------|----------------|------|------|
| 12 | POST | `customers/${customerId}/googleAds:search` | List ads by ad group | `AdGroupAdService.list` | `services/ad.service.ts` | 31 |
| 13 | POST | `customers/${customerId}/googleAds:search` | List ads by campaign | `AdGroupAdService.listByCampaign` | `services/ad.service.ts` | 47 |
| 14 | POST | `customers/${customerId}/googleAds:search` | Get ad by ID | `AdGroupAdService.getById` | `services/ad.service.ts` | 62 |
| 15 | POST | `customers/${customerId}/adGroupAds:mutate` | Create an ad | `AdGroupAdService.create` | `services/ad.service.ts` | 77 |
| 16 | POST | `customers/${customerId}/adGroupAds:mutate` | Update an ad | `AdGroupAdService.update` | `services/ad.service.ts` | 83 |
| 17 | POST | `customers/${customerId}/adGroupAds:mutate` | Remove an ad | `AdGroupAdService.remove` | `services/ad.service.ts` | 92 |
