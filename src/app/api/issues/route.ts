import { NextResponse } from "next/server";
import { getIssues } from "@/lib/data";
import type { Issue } from "@/types";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const issues = await getIssues({
    category: searchParams.get("category") as never,
    severity: searchParams.get("severity") as never,
    status: searchParams.get("status") as never,
    sort: (searchParams.get("sort") as never) ?? "newest",
    q: searchParams.get("q") ?? undefined
  });
  return NextResponse.json({ issues });
}

export async function POST(request: Request) {
  const body = await request.json();
  const issue: Issue = {
    id: `iss-${Date.now()}`,
    title: body.title,
    description: body.description,
    category: body.category,
    severity: body.severity,
    status: "reported",
    lat: Number(body.lat),
    lng: Number(body.lng),
    address: body.address,
    locality: body.address?.split(",")[0] ?? "Current locality",
    image_urls: [body.image || "https://images.unsplash.com/photo-1597766353939-9c5da7c88f80?auto=format&fit=crop&w=1200&q=80"],
    ai_confidence: 0.86,
    priority_score: body.severity === "critical" ? 96 : body.severity === "high" ? 78 : 52,
    upvote_count: 1,
    me_too_count: 0,
    comment_count: 0,
    created_at: new Date().toISOString(),
    reporter: { id: "u1", full_name: "Aarav Mehta", locality: "Bandra West" },
    timeline: [{ id: `tl-${Date.now()}`, status: "reported", note: "Issue reported.", created_at: new Date().toISOString() }],
    comments: []
  };
  return NextResponse.json({ issue }, { status: 201 });
}
