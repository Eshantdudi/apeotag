import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const t   = req.nextUrl.searchParams.get("t");
  const msg = req.nextUrl.searchParams.get("msg") ?? "";
  if (!t) return new NextResponse("Bad request", { status: 400 });
  const phone = Buffer.from(t, "base64").toString("utf-8");
  return NextResponse.redirect(`https://wa.me/${phone}?text=${msg}`);
}
