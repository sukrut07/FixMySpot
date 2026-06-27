import { NextResponse } from "next/server";
import { getAnalytics } from "@/lib/data";

export async function GET() {
  return NextResponse.json(await getAnalytics());
}
