import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { name, phone, email, amount, purpose, tag_id } = await req.json();

    const appId = process.env.CASHFREE_APP_ID;
    const secretKey = process.env.CASHFREE_SECRET_KEY;

    if (!appId || !secretKey) {
      console.error("❌ Keys missing!");
      return NextResponse.json({ error: "Keys missing" }, { status: 500 });
    }

    const orderId = "order_" + tag_id + "_" + Date.now();

    const res = await fetch("https://sandbox.cashfree.com/pg/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-version": "2023-08-01",
        "x-client-id": appId,
        "x-client-secret": secretKey,
      },
      body: JSON.stringify({
        order_id: orderId,
        order_amount: amount,
        order_currency: "INR",
        customer_details: {
          customer_id: phone,
          customer_name: name,
          customer_email: email,
          customer_phone: phone,
        },
        order_meta: {
          return_url: `${process.env.NEXT_PUBLIC_BASE_URL}/success?tag_id=${tag_id}`,
          notify_url: `${process.env.NEXT_PUBLIC_BASE_URL}/api/payment-webhook`,
        },
        order_note: purpose,
      }),
    });

    const raw = await res.text();
    console.log("✅ Cashfree status:", res.status);
    console.log("✅ Cashfree response:", raw);

    const data = JSON.parse(raw);

    if (data.payment_session_id) {
      return NextResponse.json({
        payment_session_id: data.payment_session_id,
        order_id: orderId,
      });
    }

    return NextResponse.json({ error: data }, { status: 400 });

  } catch (err: any) {
    console.error("💥 Route crash:", err.message);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}