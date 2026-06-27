"use client";

import dynamic from "next/dynamic";
import { Card } from "@/components/ui/card";
import type { Issue } from "@/types";

const IssueMap = dynamic(() => import("@/components/map/issue-map").then((mod) => mod.IssueMap), {
  ssr: false,
  loading: () => <Card className="grid h-[420px] place-items-center text-muted">Loading civic map...</Card>
});

export function MapLoader(props: { issues: Issue[]; full?: boolean }) {
  return <IssueMap {...props} />;
}
