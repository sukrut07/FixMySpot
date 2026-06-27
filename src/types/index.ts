export type IssueCategory =
  | "pothole"
  | "garbage"
  | "streetlight"
  | "water_leak"
  | "waterlogging"
  | "fallen_tree"
  | "broken_footpath"
  | "electrical_hazard"
  | "construction_debris"
  | "traffic_sign"
  | "drainage"
  | "other";

export type Severity = "low" | "medium" | "high" | "critical";
export type IssueStatus = "reported" | "verified" | "in_progress" | "resolved";

export type Profile = {
  id: string;
  full_name: string;
  email: string;
  avatar_url?: string;
  locality: string;
  city: string;
  pin_code: string;
  total_reports: number;
  resolved_reports: number;
  xp_points: number;
  report_streak: number;
  badges: string[];
};

export type Comment = {
  id: string;
  issue_id: string;
  body: string;
  created_at: string;
  author: Pick<Profile, "id" | "full_name" | "avatar_url">;
};

export type TimelineEntry = {
  id: string;
  status: IssueStatus;
  note: string;
  created_at: string;
};

export type Issue = {
  id: string;
  title: string;
  description: string;
  category: IssueCategory;
  severity: Severity;
  status: IssueStatus;
  lat: number;
  lng: number;
  address: string;
  locality: string;
  image_urls: string[];
  ai_confidence: number;
  priority_score: number;
  upvote_count: number;
  me_too_count: number;
  comment_count: number;
  created_at: string;
  reporter: Pick<Profile, "id" | "full_name" | "avatar_url" | "locality">;
  comments?: Comment[];
  timeline?: TimelineEntry[];
};

export type Analytics = {
  total: number;
  resolved: number;
  active: number;
  resolutionRate: number;
  byCategory: Array<{ name: string; value: number }>;
  trend: Array<{ date: string; issues: number }>;
  worstAreas: Array<{ area: string; issues: number }>;
};
