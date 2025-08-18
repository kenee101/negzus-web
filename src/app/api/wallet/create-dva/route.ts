import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { userId, email } = await req.json();

  const res = await fetch("https://api.paystack.co/dedicated_account", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      customer: email,
      preferred_bank: "wema-bank", // supported banks only
    }),
  });

  const data = await res.json();

  if (data.status) {
    // await db.user.update({
    //   where: { id: userId },
    //   data: { virtualAcct: data.data.account_number },
    // });
  }

  return NextResponse.json(data);
}
