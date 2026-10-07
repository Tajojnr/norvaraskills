import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

export async function POST(req: NextRequest) {
  const rawBody = await req.text();
  const signature = req.headers.get("x-paystack-signature") || "";

  const hash = crypto
    .createHmac("sha512", process.env.PAYSTACK_SECRET_KEY || "")
    .update(rawBody)
    .digest("hex");

  if (hash !== signature) {
    return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
  }

  const event = JSON.parse(rawBody);

  if (event.event === "charge.success") {
    const data = event.data;
    console.log("PAYSTACK SUCCESS", {
      email: data.customer?.email,
      reference: data.reference,
      amount: data.amount,
      meta: data.metadata,
    });
    // TODO: insert purchase in Supabase with service role
  }

  return NextResponse.json({ received: true });
}