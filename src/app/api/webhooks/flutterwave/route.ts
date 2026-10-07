import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const secretHash = process.env.FLUTTERWAVE_WEBHOOK_HASH;
  const signature = req.headers.get("verif-hash");

  if (!secretHash || signature !== secretHash) {
    return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
  }

  const event = await req.json();

  if (event.event === "charge.completed" && event.data?.status === "successful") {
    const data = event.data;
    console.log("FLUTTERWAVE SUCCESS", {
      email: data.customer?.email,
      txRef: data.tx_ref,
      amount: data.amount,
      meta: data.meta,
    });
    // TODO: insert purchase in Supabase with service role
  }

  return NextResponse.json({ received: true });
}