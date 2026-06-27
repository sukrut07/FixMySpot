import { NextResponse } from "next/server";
import { getIssue } from "@/lib/data";

export async function GET(_: Request, { params }: { params: { id: string } }) {
  const issue = await getIssue(params.id);
  return NextResponse.json({ comments: issue?.comments ?? [] });
}

export async function POST(request: Request, { params }: { params: { id: string } }) {
  const body = await request.json();
  return NextResponse.json({
    comment: {
      id: `comment-${Date.now()}`,
      issue_id: params.id,
      body: body.body,
      created_at: new Date().toISOString(),
      author: { id: "u1", full_name: "Demo User" }
    }
  }, { status: 201 });
}
