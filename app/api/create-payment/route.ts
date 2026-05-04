import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { name, phone, email, amount, purpose, tag_id } =
      await req.json();

    // 🔥 VALIDATION (IMPORTANT)
    if (!name || !phone || !email || !amount || !tag_id) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const appId = process.env.CASHFREE_APP_ID;
    const secretKey = process.env.CASHFREE_SECRET_KEY;

    

    if (!appId || !secretKey) {
      return NextResponse.json(
        { error: "Cashfree keys missing" },
        { status: 500 }
      );
    }

    // 🔥 SAFE ORDER ID
    const orderId = `order_${tag_id}_${Date.now()}`;

    const payload = {
      order_id: orderId,
      order_amount: Number(amount), // 🔥 FIXED
      order_currency: "INR",
      customer_details: {
        customer_id: phone,
        customer_name: name,
        customer_email: email,
        customer_phone: phone,
      },
      order_meta: {
        return_url: `${process.env.NEXT_PUBLIC_BASE_URL}/success?tag_id=${tag_id}&order_id=${orderId}`,
        notify_url: `${process.env.NEXT_PUBLIC_BASE_URL}/api/payment-webhook`,
      },
      order_note: purpose || "Payment",
    };

    console.log("🚀 Cashfree Payload:", payload);

    const res = await fetch("https://api.cashfree.com/pg/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-version": "2023-08-01",
        "x-client-id": appId,
        "x-client-secret": secretKey,
      },
      body: JSON.stringify(payload),
    });

    const data = await res.json();
    console.log("Cashfree Status:", res.status);
console.log("Cashfree Response:", data);

    console.log("📦 Cashfree Response:", data);

    if (!res.ok) {
      return NextResponse.json(
        { error: data },
        { status: 400 }
      );
    }

    return NextResponse.json({
      payment_session_id: data.payment_session_id,
      order_id: orderId,
    });

  } catch (err: any) {
    console.error("💥 Crash:", err);
    return NextResponse.json(
      { error: err.message },
      { status: 500 }
    );
  }
}