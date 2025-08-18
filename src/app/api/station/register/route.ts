import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { stationName, bankCode, accountNumber, percentageCharge } = body;

    if (!stationName || !bankCode || !accountNumber) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Call Paystack to create subaccount
    const res = await fetch("https://api.paystack.co/subaccount", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        business_name: stationName,
        bank_code: bankCode,
        account_number: accountNumber,
        percentage_charge: percentageCharge || 0, // optional (0–100)
      }),
    });

    const data = await res.json();

    if (!data.status) {
      return NextResponse.json(
        { error: data.message || "Failed to create subaccount" },
        { status: 400 }
      );
    }

    // Example DB save (replace with Prisma/Supabase/etc.)
    // await db.station.create({
    //   data: {
    //     name: stationName,
    //     subaccountId: data.data.subaccount_code,
    //     bank: data.data.settlement_bank,
    //     accountNumber: data.data.account_number,
    //   },
    // });

    return NextResponse.json({
      stationId: data.data.subaccount_code,
      settlement_bank: data.data.settlement_bank,
      account_number: data.data.account_number,
    });
  } catch (error) {
    console.error("REGISTER STATION ERROR:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
