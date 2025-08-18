import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { stationId, amount, bankCode, accountNumber } = await req.json();

  //   const station = await db.station.findUnique({ where: { id: stationId } });

  //   if (!station) return NextResponse.json({ error: "Station not found" }, { status: 400 });

  // 1. Debit station’s balance in your DB
  // 2. Trigger Paystack Transfer
  const res = await fetch("https://api.paystack.co/transfer", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      source: "balance",
      amount: amount * 100, // kobo
      recipient: {
        type: "nuban",
        // name: station.name,
        account_number: accountNumber,
        bank_code: bankCode,
        currency: "NGN",
      },
    }),
  });

  const data = await res.json();
  return NextResponse.json(data);
}
