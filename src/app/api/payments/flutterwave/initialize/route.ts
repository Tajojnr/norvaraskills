import { NextRequest, NextResponse } from "next/server";
import { PRODUCTS, ProductId } from "@/lib/products";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, productId, userId, name } = body as {
      email: string;
      productId: ProductId;
      userId?: string;
      name?: string;
    };

    const product = PRODUCTS[productId];
    if (!product || !email) {
      return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
    }

    if (!process.env.FLUTTERWAVE_SECRET_KEY) {
      return NextResponse.json({ error: "Flutterwave not configured" }, { status: 500 });
    }

    const txRef = `nv_flw_${productId}_${Date.now()}`;
    const base = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

    const res = await fetch("https://api.flutterwave.com/v3/payments", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.FLUTTERWAVE_SECRET_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        tx_ref: txRef,
        amount: product.amountNgn,
        currency: "NGN",
        redirect_url: `${base}/payment/success?gateway=flutterwave&ref=${txRef}`,
        customer: { email, name: name || email },
        customizations: {
          title: "Norvara",
          description: product.title,
          logo: `${base}/logo.png`,
        },
        meta: {
          product_id: product.id,
          user_id: userId || null,
          platform: "norvara",
        },
      }),
    });

    const data = await res.json();
    if (data.status !== "success") {
      return NextResponse.json(
        { error: data.message || "Flutterwave init failed" },
        { status: 400 }
      );
    }

    return NextResponse.json({
      payment_link: data.data.link,
      tx_ref: txRef,
    });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}