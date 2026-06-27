import { NextResponse } from "next/server";
import { generateComplaint } from "@/lib/gemini";

export async function POST(request: Request) {
  const { issue } = await request.json();
  const letter = await generateComplaint(issue);
  return NextResponse.json({ letter });
}
