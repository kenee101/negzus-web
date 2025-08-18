import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { email, userId, amount } = await req.json();

  if (!email || !userId || !amount) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  const res = await fetch("https://api.paystack.co/transaction/initialize", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      amount: amount * 100, // kobo
      metadata: { userId },
    }),
  });

  const data = await res.json();
  return NextResponse.json(data);
}
