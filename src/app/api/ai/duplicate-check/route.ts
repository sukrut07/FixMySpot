import { NextResponse } from "next/server";
import { getIssues } from "@/lib/data";

export async function POST(request: Request) {
  const body = await request.json();
  const issues = await getIssues({ category: body.category });
  return NextResponse.json({ duplicates: issues.slice(0, 3) });
}
