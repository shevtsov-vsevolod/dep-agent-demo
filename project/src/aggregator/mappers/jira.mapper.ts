import type { JiraIssue, JiraProject } from "../../jira/index.js";
import {
  WorkItemPriority,
  WorkItemStatus,
  type ProjectSummary,
  type WorkItem,
} from "../domain-types.js";

function mapJiraStatus(statusCategoryKey: string): WorkItemStatus {
  switch (statusCategoryKey) {
    case "new":
    case "undefined":
      return WorkItemStatus.TODO;
    case "indeterminate":
      return WorkItemStatus.IN_PROGRESS;
    case "done":
      return WorkItemStatus.DONE;
    default:
      return WorkItemStatus.TODO;
  }
}

function mapJiraPriority(priorityName: string): WorkItemPriority {
  const normalized = priorityName.toLowerCase();
  if (normalized === "highest" || normalized === "critical" || normalized === "blocker") {
    return WorkItemPriority.HIGHEST;
  }
  if (normalized === "high" || normalized === "major") {
    return WorkItemPriority.HIGH;
  }
  if (normalized === "medium" || normalized === "normal") {
    return WorkItemPriority.MEDIUM;
  }
  if (normalized === "low" || normalized === "minor") {
    return WorkItemPriority.LOW;
  }
  if (normalized === "lowest" || normalized === "trivial") {
    return WorkItemPriority.LOWEST;
  }
  return WorkItemPriority.MEDIUM;
}

export function mapJiraIssue(issue: JiraIssue): WorkItem {
  return {
    id: issue.id,
    externalKey: issue.key,
    projectKey: issue.fields.project.key,
    summary: issue.fields.summary,
    description: issue.fields.description ?? undefined,
    status: mapJiraStatus(issue.fields.status.statusCategory.key),
    priority: mapJiraPriority(issue.fields.priority.name),
    assignee: issue.fields.assignee?.displayName,
    reporter: issue.fields.reporter.displayName,
    labels: issue.fields.labels,
    createdAt: issue.fields.created,
    updatedAt: issue.fields.updated,
  };
}

export function mapJiraProject(
  project: JiraProject,
  items: WorkItem[],
): ProjectSummary {
  const projectItems = items.filter((item) => item.projectKey === project.key);
  return {
    key: project.key,
    name: project.name,
    totalItems: projectItems.length,
    todoCount: projectItems.filter((i) => i.status === WorkItemStatus.TODO).length,
    inProgressCount: projectItems.filter((i) => i.status === WorkItemStatus.IN_PROGRESS).length,
    doneCount: projectItems.filter((i) => i.status === WorkItemStatus.DONE).length,
  };
}
