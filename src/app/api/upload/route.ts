import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const formData = await request.formData();
  const file = formData.get("file");
  if (!file) return NextResponse.json({ error: "No file supplied" }, { status: 400 });
  return NextResponse.json({ url: "https://images.unsplash.com/photo-1597766353939-9c5da7c88f80?auto=format&fit=crop&w=1200&q=80" });
}
