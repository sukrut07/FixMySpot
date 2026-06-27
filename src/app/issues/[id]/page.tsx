import Image from "next/image";
import { notFound } from "next/navigation";
import { MapPin, MessageCircle, Share2, Timer, User } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Section } from "@/components/common/section";
import { MapLoader } from "@/components/map/map-loader";
import { UpvoteButton } from "@/components/issues/upvote-button";
import { ComplaintGenerator } from "@/components/complaint/complaint-generator";
import { CATEGORY_LABELS, SEVERITY_STYLES, STATUS_STYLES } from "@/lib/constants";
import { daysAgo, formatDate } from "@/lib/utils";
import { getIssue, getIssues } from "@/lib/data";

export default async function IssueDetailPage({ params }: { params: { id: string } }) {
  const issue = await getIssue(params.id);
  if (!issue) notFound();
  const similar = (await getIssues()).filter((item) => item.id !== issue.id && item.locality === issue.locality).slice(0, 3);

  return (
    <Section>
      <div className="grid gap-6 lg:grid-cols-[1fr_340px]">
        <div className="space-y-6">
          <div className="relative h-[460px] overflow-hidden rounded-lg border border-border">
            <Image src={issue.image_urls[0]} alt={issue.title} fill className="object-cover" />
          </div>
          <Card>
            <div className="mb-4 flex flex-wrap gap-2">
              <Badge className="border-blue/40 bg-blue/10 text-blue-100">{CATEGORY_LABELS[issue.category]}</Badge>
              <Badge className={SEVERITY_STYLES[issue.severity].className}>{SEVERITY_STYLES[issue.severity].label}</Badge>
              <Badge className={STATUS_STYLES[issue.status].className}>{STATUS_STYLES[issue.status].label}</Badge>
            </div>
            <h1 className="text-3xl font-bold text-white">{issue.title}</h1>
            <p className="mt-4 leading-7 text-text">{issue.description}</p>
            <p className="mt-4 flex items-center gap-2 text-sm text-muted"><MapPin size={16} /> {issue.address}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <UpvoteButton issueId={issue.id} initialCount={issue.upvote_count} />
              <ComplaintGenerator issue={issue} />
              <button className="inline-flex h-10 items-center gap-2 rounded-md border border-border px-4 text-sm text-muted"><Share2 size={17} /> Share</button>
            </div>
          </Card>
          <Card>
            <h2 className="mb-4 text-xl font-bold text-white">Location</h2>
            <MapLoader issues={[issue]} />
          </Card>
          <Card>
            <h2 className="mb-4 text-xl font-bold text-white">Timeline</h2>
            <div className="space-y-4">
              {(issue.timeline ?? []).map((item) => (
                <div key={item.id} className="border-l-2 border-orange pl-4">
                  <p className="font-semibold capitalize text-white">{item.status.replace("_", " ")}</p>
                  <p className="text-sm text-muted">{item.note} · {formatDate(item.created_at)}</p>
                </div>
              ))}
            </div>
          </Card>
          <Card>
            <h2 className="mb-4 flex items-center gap-2 text-xl font-bold text-white"><MessageCircle size={20} /> Comments</h2>
            <div className="space-y-4">
              {(issue.comments ?? []).map((comment) => (
                <div key={comment.id} className="rounded-md border border-border bg-background p-4">
                  <p className="text-sm text-text">{comment.body}</p>
                  <p className="mt-2 text-xs text-muted">{comment.author.full_name} · {formatDate(comment.created_at)}</p>
                </div>
              ))}
              <textarea className="min-h-24 w-full rounded-md border border-border bg-background p-3 text-sm" placeholder="Add a comment..." />
            </div>
          </Card>
        </div>
        <aside className="space-y-6">
          <Card>
            <h3 className="mb-4 font-semibold text-white">Reporter</h3>
            <div className="flex items-center gap-3">
              <User className="text-orange" />
              <div><p className="font-medium text-white">{issue.reporter.full_name}</p><p className="text-sm text-muted">{issue.reporter.locality}</p></div>
            </div>
          </Card>
          <Card>
            <h3 className="mb-4 font-semibold text-white">Quick stats</h3>
            <div className="grid gap-3 text-sm">
              <p className="flex items-center justify-between"><span className="text-muted">Days open</span><span className="font-semibold text-white">{daysAgo(issue.created_at)}</span></p>
              <p className="flex items-center justify-between"><span className="text-muted">Priority</span><span className="font-semibold text-orange">{issue.priority_score}</span></p>
              <p className="flex items-center justify-between"><span className="text-muted">Me too</span><span className="font-semibold text-white">{issue.me_too_count}</span></p>
            </div>
          </Card>
          <Card>
            <h3 className="mb-4 flex items-center gap-2 font-semibold text-white"><Timer size={18} /> Similar nearby</h3>
            <div className="space-y-3">
              {similar.length ? similar.map((item) => <p key={item.id} className="text-sm text-muted">{item.title}</p>) : <p className="text-sm text-muted">No close duplicates found.</p>}
            </div>
          </Card>
        </aside>
      </div>
    </Section>
  );
}
