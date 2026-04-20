import { NextResponse } from "next/server";
import crypto from "crypto";
import { createClient } from "@supabase/supabase-js";

export async function POST(req: Request) {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  try {
    const body = await req.text();
    const signature = req.headers.get("x-webhook-signature");
    const timestamp = req.headers.get("x-webhook-timestamp");

    // ✅ Step 1: Signature verify karo
    const secretKey = process.env.CASHFREE_SECRET_KEY!;
    const signedPayload = timestamp + body;

    const expectedSignature = crypto
      .createHmac("sha256", secretKey)
      .update(signedPayload)
      .digest("base64");

    if (expectedSignature !== signature) {
      console.error("❌ Invalid webhook signature");
      return NextResponse.json(
        { error: "Invalid signature" },
        { status: 400 }
      );
    }

    // ✅ Step 2: Parse webhook data
    const data = JSON.parse(body);
    console.log("✅ Webhook received:", data);

    const orderId = data?.data?.order?.order_id as string;
    const paymentStatus = data?.data?.payment?.payment_status;
    const paymentId = data?.data?.payment?.cf_payment_id;

    // order_PKT123_1234567890 → PKT123
    const tag_id = orderId?.split("_")[1];

    // ✅ Step 3: Success payment
    if (paymentStatus === "SUCCESS" && tag_id) {
      await supabase
        .from("vehicles")
        .update({
          payment_status: "paid",
          payment_id: String(paymentId),
        })
        .eq("tag_id", tag_id);

      await supabase
        .from("pets")
        .update({
          payment_status: "paid",
          payment_id: String(paymentId),
        })
        .eq("tag_id", tag_id);

      console.log("✅ Payment updated:", orderId);
    }

    return NextResponse.json({ success: true });

  } catch (err: any) {
    console.error("💥 Webhook crash:", err.message);

    return NextResponse.json(
      { error: err.message },
      { status: 500 }
    );
  }
}