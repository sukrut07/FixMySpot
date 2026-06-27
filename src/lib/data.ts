import { demoAnalytics, demoIssues, demoProfiles } from "@/lib/demo-data";
import { createServerSupabaseClient, hasSupabaseEnv } from "@/lib/supabase";
import type { Issue, IssueCategory, IssueStatus, Severity } from "@/types";

export type IssueFilters = {
  category?: IssueCategory;
  severity?: Severity;
  status?: IssueStatus;
  sort?: "newest" | "priority" | "upvotes";
  q?: string;
};

export async function getIssues(filters: IssueFilters = {}): Promise<Issue[]> {
  if (hasSupabaseEnv()) {
    const supabase = createServerSupabaseClient();
    const query = supabase?.from("issues").select("*");
    if (query) {
      const { data, error } = await query.order("created_at", { ascending: false });
      if (!error && data?.length) return data as Issue[];
    }
  }

  let issues = [...demoIssues];
  if (filters.category) issues = issues.filter((issue) => issue.category === filters.category);
  if (filters.severity) issues = issues.filter((issue) => issue.severity === filters.severity);
  if (filters.status) issues = issues.filter((issue) => issue.status === filters.status);
  if (filters.q) {
    const needle = filters.q.toLowerCase();
    issues = issues.filter((issue) => `${issue.title} ${issue.description} ${issue.locality}`.toLowerCase().includes(needle));
  }
  if (filters.sort === "priority") issues.sort((a, b) => b.priority_score - a.priority_score);
  else if (filters.sort === "upvotes") issues.sort((a, b) => b.upvote_count - a.upvote_count);
  else issues.sort((a, b) => +new Date(b.created_at) - +new Date(a.created_at));
  return issues;
}

export async function getIssue(id: string) {
  const issues = await getIssues();
  return issues.find((issue) => issue.id === id) ?? null;
}

export async function getAnalytics() {
  return demoAnalytics;
}

export async function getLeaderboard() {
  return [...demoProfiles].sort((a, b) => b.xp_points - a.xp_points);
}

export async function getCurrentProfile() {
  return demoProfiles[0];
}
