// Platform-agnostic domain entities

export enum CampaignStatus {
  ACTIVE = "ACTIVE",
  PAUSED = "PAUSED",
  REMOVED = "REMOVED",
  ARCHIVED = "ARCHIVED",
}

export enum AdChannel {
  SEARCH = "SEARCH",
  DISPLAY = "DISPLAY",
  SOCIAL = "SOCIAL",
  VIDEO = "VIDEO",
  SHOPPING = "SHOPPING",
  PERFORMANCE_MAX = "PERFORMANCE_MAX",
  OTHER = "OTHER",
}

export enum Platform {
  FACEBOOK = "FACEBOOK",
  GOOGLE_ADS = "GOOGLE_ADS",
}

export enum WorkItemStatus {
  TODO = "TODO",
  IN_PROGRESS = "IN_PROGRESS",
  DONE = "DONE",
}

export enum WorkItemPriority {
  HIGHEST = "HIGHEST",
  HIGH = "HIGH",
  MEDIUM = "MEDIUM",
  LOW = "LOW",
  LOWEST = "LOWEST",
}

export interface AdCampaign {
  id: string;
  externalId: string;
  platform: Platform;
  name: string;
  status: CampaignStatus;
  channel: AdChannel;
  dailyBudgetCents?: number;
  lifetimeBudgetCents?: number;
  startDate?: string;
  endDate?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface AdGroup {
  id: string;
  externalId: string;
  platform: Platform;
  campaignId: string;
  name: string;
  status: CampaignStatus;
}

export interface Ad {
  id: string;
  externalId: string;
  platform: Platform;
  adGroupId?: string;
  campaignId: string;
  name: string;
  status: CampaignStatus;
}

export interface PerformanceMetrics {
  campaignId: string;
  platform: Platform;
  impressions: number;
  clicks: number;
  spendCents: number;
  conversions: number;
  ctr: number;
  dateStart: string;
  dateEnd: string;
}

export interface WorkItem {
  id: string;
  externalKey: string;
  projectKey: string;
  summary: string;
  description?: string;
  status: WorkItemStatus;
  priority: WorkItemPriority;
  assignee?: string;
  reporter: string;
  labels: string[];
  createdAt: string;
  updatedAt: string;
}

export interface ProjectSummary {
  key: string;
  name: string;
  totalItems: number;
  todoCount: number;
  inProgressCount: number;
  doneCount: number;
}

export interface CampaignDashboard {
  campaigns: AdCampaign[];
  totalCampaigns: number;
  activeCampaigns: number;
  totalDailyBudgetCents: number;
  byPlatform: Record<Platform, AdCampaign[]>;
  byChannel: Partial<Record<AdChannel, AdCampaign[]>>;
}
