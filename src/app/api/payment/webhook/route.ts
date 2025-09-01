import { NextResponse } from "next/server";
import crypto from "crypto";
import { createClerkSupabaseClient } from "@/utils/supabase";
import { auth, clerkClient, User } from "@clerk/nextjs/server";

// Verify Paystack signature
function verifySignature(reqBody: string, signature: string | undefined) {
  const hash = crypto
    .createHmac("sha512", process.env.PAYSTACK_SECRET_KEY!)
    .update(reqBody)
    .digest("hex");
  return hash === signature;
}

export async function POST(req: Request) {
  const { userId, getToken } = await auth();
  const supabase = createClerkSupabaseClient(getToken);

  try {
    const rawBody = await req.text();
    const signature = req.headers.get("x-paystack-signature");

    if (!verifySignature(rawBody, signature || "")) {
      return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
    }

    const event = JSON.parse(rawBody);

    switch (event.event) {
      case "subscription.create": {
        // New subscription created
        console.log("🔄 Subscription Created:", event.data.subscription_code);
        const { data, error } = await supabase
          .from("user_subscriptions")
          .upsert(
            {
              user_id: userId,
              status: event.data.status,
              subscription_code: event.data.subscription_code,
              plan_id: event.data.plan.name.toLowerCase().replace(" ", "_"),
              subscription_start: new Date(event.data.createdAt).toISOString(),
              subscription_end: new Date(
                event.data.next_payment_date
              ).toISOString(),
              customer: JSON.stringify(event.data.customer),
              authorization: JSON.stringify(event.data.authorization),
            },
            { onConflict: "user_id" }
          );

        if (error) {
          return NextResponse.json(
            { error: "Failed to update subscription." },
            { status: 400 }
          );
        }
        break;
      }

      case "subscription.disable": {
        // Subscription disabled
        console.log("⏸️ Subscription Disabled:", event.data.subscription_code);
        const { data, error } = await supabase
          .from("user_subscriptions")
          .upsert(
            {
              user_id: userId,
              status: event.data.status,
              subscription_code: event.data.subscription_code,
              plan_id: event.data.plan.name.toLowerCase().replace(" ", "_"),
              subscription_start: new Date(event.data.createdAt).toISOString(),
              subscription_end: new Date(
                event.data.next_payment_date
              ).toISOString(),
              customer: JSON.stringify(event.data.customer),
              authorization: JSON.stringify(event.data.authorization),
            },
            { onConflict: "user_id" }
          );

        if (error) {
          return NextResponse.json(
            { error: "Failed to update subscription." },
            { status: 400 }
          );
        }
        break;
      }

      case "subscription.expiring_cards": {
        // Subscription disabled
        console.log(
          "⏸️ Subscription with expiring cards:",
          event.data.subscription_code
        );
        break;
      }

      case "invoice.create": {
        // New invoice created for subscription
        console.log("📄 Invoice Created:", event.data.invoice_number);
        // Example: Store invoice details
        // await db.invoice.create({
        //   data: {
        //     invoiceNumber: event.data.invoice_number,
        //     amount: event.data.amount / 100,
        //     status: event.data.status,
        //     dueDate: new Date(event.data.due_date),
        //     subscriptionId: event.data.subscription_code,
        //     userId: event.data.customer.email
        //   },
        // });
        break;
      }

      case "invoice.payment_failed": {
        // Payment failed for subscription
        console.log(
          "❌ Payment Failed for Invoice:",
          event.data.invoice_number
        );
        // Example: Notify user of payment failure
        // await db.notification.create({
        //   data: {
        //     userId: event.data.customer.email,
        //     type: 'payment_failed',
        //     message: `Payment failed for invoice ${event.data.invoice_number}. Please update your payment method.`
        //   }
        // });
        break;
      }

      case "subscription.not_renew": {
        // Subscription will not renew
        console.log(
          "🛑 Subscription Not Renewing:",
          event.data.subscription_code
        );
        // Example: Update subscription status
        // await db.user.update({
        //   where: { subscriptionId: event.data.subscription_code },
        //   data: { willRenew: false },
        // });
        break;
      }

      case "transfer.success": {
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
      }

      case "transfer.failed": {
        console.log("❌ Transfer Failed:", event.data.reference);
        // Example:
        // await db.transaction.update({
        //   where: { reference: event.data.reference },
        //   data: { status: "failed" },
        // });
        break;
      }

      default: {
        console.log("Unhandled Event:", event.event);
      }
    }

    return NextResponse.json({ received: true }, { status: 200 });
  } catch (error) {
    console.error("WEBHOOK ERROR:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
