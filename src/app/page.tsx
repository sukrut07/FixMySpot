import Link from "next/link";
import { ArrowRight, Brain, Camera, CheckCircle2, MapPin, Sparkles, Users, type LucideIcon } from "lucide-react";
import { buttonClassName } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Section } from "@/components/common/section";
import { IssueCard } from "@/components/issues/issue-card";
import { MapLoader } from "@/components/map/map-loader";
import { getAnalytics, getIssues } from "@/lib/data";

export default async function HomePage() {
  const [issues, analytics] = await Promise.all([getIssues({ sort: "priority" }), getAnalytics()]);
  return (
    <>
      <section className="relative overflow-hidden border-b border-border">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1518005020951-eccb494ad742?auto=format&fit=crop&w=1800&q=80')] bg-cover bg-center opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/90 to-background/30" />
        <div className="relative mx-auto grid min-h-[620px] max-w-7xl items-center gap-8 px-4 py-16 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:px-8">
          <div>
            <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-orange/40 bg-orange/10 px-3 py-1 text-sm text-orange">
              <Sparkles size={16} /> Vibe2Ship civic stack
            </p>
            <h1 className="max-w-3xl text-5xl font-black tracking-normal text-white md:text-7xl">Your Street Deserves Better</h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-text">
              Report potholes, garbage, leaks, and broken lights with AI-assisted classification, community validation, live maps, and complaint drafts ready for authorities.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/report" className={buttonClassName({ size: "lg" })}>Report an Issue <ArrowRight size={18} /></Link>
              <Link href="/map" className={buttonClassName({ variant: "secondary", size: "lg" })}>View Map</Link>
            </div>
          </div>
          <div className="hidden lg:block">
            <MapLoader issues={issues.slice(0, 5)} />
          </div>
        </div>
      </section>

      <Section>
        <div className="grid gap-4 md:grid-cols-3">
          {([
            ["Issues reported", analytics.total * 247, MapPin],
            ["Resolved", analytics.resolved * 182, CheckCircle2],
            ["Active reporters", 1320, Users]
          ] as Array<[string, number, LucideIcon]>).map(([label, value, Icon]) => (
            <Card key={String(label)} className="flex items-center gap-4">
              <span className="grid h-12 w-12 place-items-center rounded-md bg-orange/10 text-orange"><Icon size={22} /></span>
              <div><p className="text-3xl font-bold text-white">{String(value)}</p><p className="text-sm text-muted">{String(label)}</p></div>
            </Card>
          ))}
        </div>
      </Section>

      <Section eyebrow="How it works" title="Snap, classify, mobilize">
        <div className="grid gap-4 md:grid-cols-3">
          {([
            [Camera, "Snap", "Capture the civic issue with location and context."],
            [Brain, "AI Analyzes", "Gemini suggests category, severity, title, and complaint language."],
            [Users, "Community Acts", "Neighbors validate, upvote, comment, and escalate to authorities."]
          ] as Array<[LucideIcon, string, string]>).map(([Icon, title, copy]) => (
            <Card key={String(title)}>
              <Icon className="mb-4 text-orange" size={32} />
              <h3 className="text-xl font-bold text-white">{String(title)}</h3>
              <p className="mt-2 text-sm leading-6 text-muted">{String(copy)}</p>
            </Card>
          ))}
        </div>
      </Section>

      <Section eyebrow="Recent priority reports" title="What neighbors are fixing now">
        <div className="grid gap-5 md:grid-cols-3">
          {issues.slice(0, 3).map((issue) => <IssueCard key={issue.id} issue={issue} />)}
        </div>
      </Section>
    </>
  );
}
