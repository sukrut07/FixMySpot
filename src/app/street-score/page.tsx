"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Section } from "@/components/common/section";
import { demoIssues } from "@/lib/demo-data";
import { scoreArea } from "@/lib/utils";

export default function StreetScorePage() {
  const [query, setQuery] = useState("Bandra");
  const matches = useMemo(() => demoIssues.filter((issue) => `${issue.locality} ${issue.address}`.toLowerCase().includes(query.toLowerCase())), [query]);
  const active = matches.filter((issue) => issue.status !== "resolved").length;
  const resolved = matches.filter((issue) => issue.status === "resolved").length;
  const score = scoreArea(active, resolved);
  return (
    <Section eyebrow="Street Score" title="Measure area health">
      <div className="mb-6 flex items-center gap-3 rounded-lg border border-border bg-card p-3">
        <Search className="text-orange" />
        <Input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search area or street" />
      </div>
      <div className="grid gap-6 lg:grid-cols-[360px_1fr]">
        <Card className="text-center">
          <div className="mx-auto grid h-56 w-56 place-items-center rounded-full border-[18px] border-teal/70 bg-background">
            <span className="text-6xl font-black text-white">{score}</span>
          </div>
          <p className="mt-4 text-muted">City average: 71</p>
        </Card>
        <Card>
          <h2 className="mb-4 text-xl font-bold text-white">Active issues in this area</h2>
          <div className="space-y-3">
            {matches.length ? matches.map((issue) => <p key={issue.id} className="rounded-md border border-border bg-background p-3 text-sm">{issue.title} <span className="text-muted">· {issue.status.replace("_", " ")}</span></p>) : <p className="text-muted">No tracked issues found for this search.</p>}
          </div>
        </Card>
      </div>
    </Section>
  );
}
