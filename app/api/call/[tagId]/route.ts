import { createClient } from "@supabase/supabase-js";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ tagId: string }> }
) {
  const { tagId } = await params;

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  const { data: vehicle } = await supabase
    .from("vehicles")
    .select("phone")
    .eq("tag_id", tagId)
    .maybeSingle();

  if (vehicle?.phone) {
    return NextResponse.redirect(`tel:${vehicle.phone}`);
  }

  const { data: pet } = await supabase
    .from("pets")
    .select("phone")
    .eq("tag_id", tagId)
    .maybeSingle();

  if (pet?.phone) {
    return NextResponse.redirect(`tel:${pet.phone}`);
  }

  return NextResponse.json({ error: "Not found" }, { status: 404 });
}