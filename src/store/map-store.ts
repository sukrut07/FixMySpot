"use client";

import { create } from "zustand";
import type { IssueCategory, IssueStatus, Severity } from "@/types";

type MapState = {
  categories: IssueCategory[];
  severities: Severity[];
  statuses: IssueStatus[];
  heatmap: boolean;
  toggleCategory: (category: IssueCategory) => void;
  toggleSeverity: (severity: Severity) => void;
  toggleStatus: (status: IssueStatus) => void;
  setHeatmap: (value: boolean) => void;
};

function toggle<T>(values: T[], value: T) {
  return values.includes(value) ? values.filter((item) => item !== value) : [...values, value];
}

export const useMapStore = create<MapState>((set) => ({
  categories: [],
  severities: [],
  statuses: [],
  heatmap: false,
  toggleCategory: (category) => set((state) => ({ categories: toggle(state.categories, category) })),
  toggleSeverity: (severity) => set((state) => ({ severities: toggle(state.severities, severity) })),
  toggleStatus: (status) => set((state) => ({ statuses: toggle(state.statuses, status) })),
  setHeatmap: (heatmap) => set({ heatmap })
}));
