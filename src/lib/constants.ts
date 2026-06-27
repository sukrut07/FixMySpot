import type { IssueCategory, IssueStatus, Severity } from "@/types";

export const CATEGORY_LABELS: Record<IssueCategory, string> = {
  pothole: "Pothole",
  garbage: "Garbage",
  streetlight: "Streetlight",
  water_leak: "Water leak",
  waterlogging: "Waterlogging",
  fallen_tree: "Fallen tree",
  broken_footpath: "Broken footpath",
  electrical_hazard: "Electrical hazard",
  construction_debris: "Construction debris",
  traffic_sign: "Traffic sign",
  drainage: "Drainage",
  other: "Other"
};

export const SEVERITY_STYLES: Record<Severity, { label: string; color: string; className: string }> = {
  low: { label: "Low", color: "#2EC4B6", className: "border-teal/40 bg-teal/10 text-teal" },
  medium: { label: "Medium", color: "#F2C94C", className: "border-yellow-400/40 bg-yellow-400/10 text-yellow-200" },
  high: { label: "High", color: "#FF6B35", className: "border-orange/40 bg-orange/10 text-orange" },
  critical: { label: "Critical", color: "#E71D36", className: "border-red/40 bg-red/10 text-red" }
};

export const STATUS_STYLES: Record<IssueStatus, { label: string; className: string }> = {
  reported: { label: "Reported", className: "border-blue-300/30 bg-blue-400/10 text-blue-200" },
  verified: { label: "Verified", className: "border-orange/40 bg-orange/10 text-orange" },
  in_progress: { label: "In progress", className: "border-yellow-300/40 bg-yellow-300/10 text-yellow-100" },
  resolved: { label: "Resolved", className: "border-teal/40 bg-teal/10 text-teal" }
};

export const ISSUE_CATEGORIES = Object.keys(CATEGORY_LABELS) as IssueCategory[];
export const SEVERITIES = Object.keys(SEVERITY_STYLES) as Severity[];
export const STATUSES = Object.keys(STATUS_STYLES) as IssueStatus[];

export const DEFAULT_CENTER: [number, number] = [19.076, 72.8777];
