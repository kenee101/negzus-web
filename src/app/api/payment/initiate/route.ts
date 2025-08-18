import { NextResponse } from "next/server";
import { PaystackService } from "@/utils/paystack";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, amount, stationSubaccount } = body;

    if (!email || !amount || !stationSubaccount) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Paystack expects amount in kobo
    const koboAmount = amount * 100;

    const res = await PaystackService.initializeTransaction({
      email,
      amount: koboAmount,
      subaccount: stationSubaccount, // route money to the station
      transaction_charge: Math.floor(amount * 0.05 * 100), // e.g. 5% fee to you
      bearer: "subaccount", // station bears transaction charges
      metadata: {
        custom_fields: [
          {
            display_name: "Platform Fee",
            variable_name: "platform_fee",
            value: "5%",
          },
        ],
      },
    });

    if (!res.success) {
      return NextResponse.json({ error: res.error }, { status: 400 });
    }

    return NextResponse.json({
      authorization_url: res.data.authorization_url,
      reference: res.data.reference,
    });
  } catch (error) {
    console.error("INITIATE ERROR:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
