import { NextRequest, NextResponse } from "next/server";
import { PRODUCTS, ProductId } from "@/lib/products";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, productId, userId } = body as {
      email: string;
      productId: ProductId;
      userId?: string;
    };

    const product = PRODUCTS[productId];
    if (!product || !email) {
      return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
    }

    if (!process.env.PAYSTACK_SECRET_KEY) {
      return NextResponse.json({ error: "Paystack not configured" }, { status: 500 });
    }

    const amountKobo = product.amountNgn * 100;
    const reference = `nv_ps_${productId}_${Date.now()}`;
    const base = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

    const res = await fetch("https://api.paystack.co/transaction/initialize", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        amount: amountKobo,
        currency: "NGN",
        reference,
        callback_url: `${base}/payment/success?gateway=paystack&ref=${reference}`,
        metadata: {
          product_id: product.id,
          product_title: product.title,
          user_id: userId || null,
          platform: "norvara",
        },
      }),
    });

    const data = await res.json();
    if (!data.status) {
      return NextResponse.json(
        { error: data.message || "Paystack init failed" },
        { status: 400 }
      );
    }

    return NextResponse.json({
      authorization_url: data.data.authorization_url,
      access_code: data.data.access_code,
      reference: data.data.reference,
    });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}