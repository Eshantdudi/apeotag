import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const t = req.nextUrl.searchParams.get("t");
  if (!t) return new NextResponse("Bad request", { status: 400 });
  const phone = Buffer.from(t, "base64").toString("utf-8");
  return NextResponse.redirect(`tel:${phone}`);
}