import { NextResponse } from "next/server";
import { getAnalytics } from "@/lib/data";

export async function GET() {
  const analytics = await getAnalytics();
  return NextResponse.json({
    report: `This week, residents reported ${analytics.total} tracked civic issues. ${analytics.resolved} are resolved and ${analytics.active} remain active. Drainage and road safety should be prioritized next.`
  });
}
