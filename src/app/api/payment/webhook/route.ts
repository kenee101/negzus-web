import { NextResponse } from "next/server";
import crypto from "crypto";

// Verify Paystack signature
function verifySignature(reqBody: string, signature: string | undefined) {
  const hash = crypto
    .createHmac("sha512", process.env.NEXT_PUBLIC_PAYSTACK_SECRET_KEY!)
    .update(reqBody)
    .digest("hex");
  return hash === signature;
}

export async function POST(req: Request) {
  try {
    const rawBody = await req.text();
    const signature = req.headers.get("x-paystack-signature");

    if (!verifySignature(rawBody, signature || "")) {
      return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
    }

    const event = JSON.parse(rawBody);

    switch (event.event) {
      case "charge.success":
        // Payment successful → update wallet/transaction DB
        console.log("✅ Payment Success:", event.data.reference);
        // Example:
        // await db.transaction.update({
        //   where: { reference: event.data.reference },
        //   data: { status: "success" },
        // });
        // Update user wallet balance
        // await db.user.update({
        //   where: { id: event.data.metadata.userId },
        //   data: { balance: event.data.amount / 100 },
        // });
        break;

      case "transfer.success":
        console.log("✅ Transfer Success:", event.data.reference);
        // Example:
        // await db.transaction.update({
        //   where: { reference: event.data.reference },
        //   data: { status: "success" },
        // });
        // Update station wallet balance
        // await db.station.update({
        //   where: { subaccountId: event.data.metadata.subaccountId },
        //   data: { balance: event.data.amount / 100 },
        // });
        break;

      case "transfer.failed":
        console.log("❌ Transfer Failed:", event.data.reference);
        // Example:
        // await db.transaction.update({
        //   where: { reference: event.data.reference },
        //   data: { status: "failed" },
        // });
        break;

      default:
        console.log("Unhandled Event:", event.event);
    }

    return NextResponse.json({ received: true }, { status: 200 });
  } catch (error) {
    console.error("WEBHOOK ERROR:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
