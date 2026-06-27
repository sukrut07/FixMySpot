import Image from "next/image";
import Link from "next/link";
import { MessageCircle, ThumbsUp } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { CATEGORY_LABELS, SEVERITY_STYLES, STATUS_STYLES } from "@/lib/constants";
import { formatDate } from "@/lib/utils";
import type { Issue } from "@/types";

export function IssueCard({ issue }: { issue: Issue }) {
  return (
    <Link href={`/issues/${issue.id}`}>
      <Card className="group overflow-hidden p-0 transition hover:border-orange/60">
        <div className="relative h-44">
          <Image src={issue.image_urls[0]} alt={issue.title} fill className="object-cover transition group-hover:scale-105" />
        </div>
        <div className="space-y-3 p-4">
          <div className="flex flex-wrap gap-2">
            <Badge className={SEVERITY_STYLES[issue.severity].className}>{SEVERITY_STYLES[issue.severity].label}</Badge>
            <Badge className={STATUS_STYLES[issue.status].className}>{STATUS_STYLES[issue.status].label}</Badge>
          </div>
          <div>
            <h3 className="line-clamp-2 font-semibold text-white">{issue.title}</h3>
            <p className="mt-1 text-sm text-muted">{CATEGORY_LABELS[issue.category]} in {issue.locality}</p>
          </div>
          <div className="flex items-center justify-between text-xs text-muted">
            <span>{formatDate(issue.created_at)}</span>
            <span className="flex items-center gap-3">
              <span className="inline-flex items-center gap-1"><ThumbsUp size={14} />{issue.upvote_count}</span>
              <span className="inline-flex items-center gap-1"><MessageCircle size={14} />{issue.comment_count}</span>
            </span>
          </div>
        </div>
      </Card>
    </Link>
  );
}
