import Image from "next/image";
import { Edit3 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { IssueCard } from "@/components/issues/issue-card";
import { Section } from "@/components/common/section";
import { getCurrentProfile, getIssues } from "@/lib/data";

export default async function ProfilePage() {
  const [profile, issues] = await Promise.all([getCurrentProfile(), getIssues()]);
  const mine = issues.filter((issue) => issue.reporter.id === profile.id);
  return (
    <Section eyebrow="Profile" title="Your civic footprint">
      <div className="grid gap-6 lg:grid-cols-[340px_1fr]">
        <aside className="space-y-6">
          <Card>
            <div className="flex items-center gap-4">
              {profile.avatar_url && <Image src={profile.avatar_url} alt={profile.full_name} width={72} height={72} className="rounded-full" />}
              <div><h2 className="text-xl font-bold text-white">{profile.full_name}</h2><p className="text-sm text-muted">{profile.email}</p></div>
            </div>
            <div className="mt-5 grid grid-cols-2 gap-3">
              {[
                ["Reports", profile.total_reports],
                ["Resolved", profile.resolved_reports],
                ["XP", profile.xp_points],
                ["Streak", profile.report_streak]
              ].map(([label, value]) => <div key={String(label)} className="rounded-md bg-background p-3"><p className="text-xl font-bold text-white">{String(value)}</p><p className="text-xs text-muted">{String(label)}</p></div>)}
            </div>
          </Card>
          <Card>
            <h3 className="mb-3 font-semibold text-white">Edit locality</h3>
            <div className="space-y-3">
              <Input defaultValue={profile.locality} />
              <Input defaultValue={profile.city} />
              <Input defaultValue={profile.pin_code} />
              <Button className="w-full"><Edit3 size={17} /> Save profile</Button>
            </div>
          </Card>
          <Card>
            <h3 className="mb-3 font-semibold text-white">Badges</h3>
            <div className="flex flex-wrap gap-2">{profile.badges.map((badge) => <Badge key={badge} className="border-orange bg-orange/10 text-orange">{badge}</Badge>)}</div>
          </Card>
        </aside>
        <div className="grid gap-5 md:grid-cols-2">
          {mine.map((issue) => <IssueCard key={issue.id} issue={issue} />)}
        </div>
      </div>
    </Section>
  );
}
