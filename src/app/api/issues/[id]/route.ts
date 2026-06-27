import { NextResponse } from "next/server";
import { getIssue } from "@/lib/data";

export async function GET(_: Request, { params }: { params: { id: string } }) {
  const issue = await getIssue(params.id);
  if (!issue) return NextResponse.json({ error: "Issue not found" }, { status: 404 });
  return NextResponse.json({ issue });
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  const body = await request.json();
  return NextResponse.json({ issue: { id: params.id, ...body } });
}
