import { Activity, CheckCircle2, Gauge, MapPin, type LucideIcon } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Section } from "@/components/common/section";
import { DashboardCharts } from "@/components/dashboard/charts";
import { getAnalytics, getIssues } from "@/lib/data";

export default async function DashboardPage() {
  const [analytics, issues] = await Promise.all([getAnalytics(), getIssues()]);
  return (
    <Section eyebrow="Analytics" title="Neighborhood civic dashboard">
      <div className="mb-6 grid gap-4 md:grid-cols-4">
        {([
          ["Total Issues", analytics.total, MapPin],
          ["Resolved", analytics.resolved, CheckCircle2],
          ["Active", analytics.active, Activity],
          ["Resolution Rate", `${analytics.resolutionRate}%`, Gauge]
        ] as Array<[string, string | number, LucideIcon]>).map(([label, value, Icon]) => (
          <Card key={String(label)}>
            <Icon className="mb-3 text-orange" />
            <p className="text-3xl font-bold text-white">{String(value)}</p>
            <p className="text-sm text-muted">{String(label)}</p>
          </Card>
        ))}
      </div>
      <DashboardCharts analytics={analytics} />
      <Card className="mt-6">
        <h3 className="mb-4 font-semibold text-white">Recent activity</h3>
        <div className="space-y-3">
          {issues.slice(0, 5).map((issue) => <p key={issue.id} className="text-sm text-muted"><span className="text-white">{issue.title}</span> was reported in {issue.locality}</p>)}
        </div>
      </Card>
    </Section>
  );
}
