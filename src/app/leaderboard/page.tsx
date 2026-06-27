import Image from "next/image";
import { Award, Trophy } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Section } from "@/components/common/section";
import { getLeaderboard } from "@/lib/data";

export default async function LeaderboardPage() {
  const leaders = await getLeaderboard();
  const badges = Array.from(new Set(leaders.flatMap((profile) => profile.badges)));
  return (
    <Section eyebrow="Community" title="Leaderboard">
      <div className="mb-5 flex gap-2">
        {["Weekly", "Monthly", "All-time"].map((tab, index) => <Badge key={tab} className={index === 2 ? "border-orange bg-orange/10 text-orange" : "border-border bg-card text-muted"}>{tab}</Badge>)}
      </div>
      <Card className="overflow-x-auto p-0">
        <table className="w-full min-w-[760px] text-sm">
          <thead className="border-b border-border text-left text-muted">
            <tr>
              {["Rank", "Reporter", "Reports", "Resolved", "XP", "Badges"].map((head) => <th key={head} className="p-4 font-medium">{head}</th>)}
            </tr>
          </thead>
          <tbody>
            {leaders.map((profile, index) => (
              <tr key={profile.id} className={index === 0 ? "bg-orange/10" : "border-t border-border"}>
                <td className="p-4 font-bold text-white">#{index + 1}</td>
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    {profile.avatar_url && <Image src={profile.avatar_url} alt={profile.full_name} width={36} height={36} className="rounded-full" />}
                    <div><p className="font-semibold text-white">{profile.full_name}</p><p className="text-muted">{profile.locality}</p></div>
                  </div>
                </td>
                <td className="p-4">{profile.total_reports}</td>
                <td className="p-4">{profile.resolved_reports}</td>
                <td className="p-4 font-bold text-orange">{profile.xp_points}</td>
                <td className="p-4"><div className="flex flex-wrap gap-2">{profile.badges.map((badge) => <Badge key={badge} className="border-teal/40 bg-teal/10 text-teal">{badge}</Badge>)}</div></td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
      <div className="mt-6 grid gap-4 md:grid-cols-3">
        {badges.map((badge) => (
          <Card key={badge} className="flex items-center gap-3">
            {badge.includes("Founding") ? <Trophy className="text-orange" /> : <Award className="text-teal" />}
            <span className="font-semibold text-white">{badge}</span>
          </Card>
        ))}
      </div>
    </Section>
  );
}
