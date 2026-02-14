import type { IssueService } from "../../jira/index.js";
import {
  type AdCampaign,
  type ProjectSummary,
  type WorkItem,
  WorkItemStatus,
} from "../domain-types.js";
import { mapJiraIssue } from "../mappers/jira.mapper.js";

export interface WorkTrackerService {
  getWorkItems(projectKey: string): Promise<WorkItem[]>;
  getProjectSummary(projectKey: string): Promise<ProjectSummary>;
  createCampaignTrackingIssue(
    projectKey: string,
    campaign: AdCampaign,
  ): Promise<WorkItem>;
}

export function createWorkTrackerService(
  issueService: IssueService,
): WorkTrackerService {
  return {
    async getWorkItems(projectKey) {
      const result = await issueService.search(
        `project = "${projectKey}" ORDER BY created DESC`,
      );
      return result.issues.map(mapJiraIssue);
    },

    async getProjectSummary(projectKey) {
      const items = await this.getWorkItems(projectKey);
      return {
        key: projectKey,
        name: projectKey,
        totalItems: items.length,
        todoCount: items.filter((i) => i.status === WorkItemStatus.TODO).length,
        inProgressCount: items.filter(
          (i) => i.status === WorkItemStatus.IN_PROGRESS,
        ).length,
        doneCount: items.filter((i) => i.status === WorkItemStatus.DONE).length,
      };
    },

    async createCampaignTrackingIssue(projectKey, campaign) {
      const response = await issueService.create({
        fields: {
          project: { key: projectKey },
          summary: `[${campaign.platform}] Review campaign: ${campaign.name}`,
          description: [
            `Campaign: ${campaign.name}`,
            `Platform: ${campaign.platform}`,
            `Status: ${campaign.status}`,
            `Channel: ${campaign.channel}`,
            campaign.dailyBudgetCents
              ? `Daily Budget: $${(campaign.dailyBudgetCents / 100).toFixed(2)}`
              : null,
          ]
            .filter(Boolean)
            .join("\n"),
          issuetype: { name: "Task" },
          labels: ["auto-created", "campaign-review", campaign.platform.toLowerCase()],
        },
      });

      const issue = await issueService.getByKey(response.key);
      return mapJiraIssue(issue);
    },
  };
}
