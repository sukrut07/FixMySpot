import { NextResponse } from "next/server";
import { classifyCivicImage } from "@/lib/gemini";

export async function POST(request: Request) {
  const { image } = await request.json();
  const classification = await classifyCivicImage(image);
  return NextResponse.json(classification);
}
