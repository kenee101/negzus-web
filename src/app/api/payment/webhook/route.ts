import { NextResponse } from "next/server";
import crypto from "crypto";
import { createSupabaseClient } from "@/utils/supabase";

// Verify Paystack signature
function verifySignature(reqBody: string, signature: string | undefined) {
  const hash = crypto
    .createHmac("sha512", process.env.PAYSTACK_SECRET_KEY!)
    .update(reqBody)
    .digest("hex");
  return hash === signature;
}

export async function POST(req: Request) {
  const supabase = createSupabaseClient();

  try {
    const rawBody = await req.text();
    const signature = req.headers.get("x-paystack-signature");

    if (!verifySignature(rawBody, signature || "")) {
      return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
    }

    const event = JSON.parse(rawBody);

    switch (event.event) {
      case "subscription.create": {
        console.log("🔄 Event Data:", event.data);
        const { data: userData, error: userError } = await supabase
          .from("clerk_users")
          .select("id")
          .eq("email_address", event.data.customer.email)
          .single();

        if (userError) {
          console.error("Error fetching user:", userError);
          throw userError;
        }

        console.log(userData);

        const { error: subscriptionError } = await supabase
          .from("user_subscriptions")
          .upsert(
            {
              user_id: userData?.id,
              status: event.data.status,
              subscription_code: event.data.subscription_code,
              plan_id: event.data.plan.name.toLowerCase().replaceAll(" ", "_"),
              subscription_start: new Date(event.data.createdAt).toISOString(),
              subscription_end: new Date(
                event.data.next_payment_date
              ).toISOString(),
              customer: JSON.stringify(event.data.customer),
              authorization: JSON.stringify(event.data.authorization),
            },
            { onConflict: "user_id" }
          );

        if (subscriptionError) {
          console.error("Error saving subscription:", subscriptionError);
          throw subscriptionError;
        }
        break;
      }

      case "subscription.disable": {
        const { data: userData, error: userError } = await supabase
          .from("clerk_users")
          .select("id")
          .eq("email_address", event.data.customer.email)
          .single();

        if (userError) {
          console.error("Error fetching user:", userError);
          throw userError;
        }
        console.log(userData);

        const { error } = await supabase.from("user_subscriptions").upsert(
          {
            user_id: userData?.id,
            status: event.data.status,
            disabled_at: new Date().toISOString(),
            subscription_end: event.data.next_payment_date
              ? new Date(event.data.next_payment_date).toISOString()
              : null,
          },
          {
            onConflict: "user_id",
          }
        );
        console.log("⏸️ Subscription Disabled:", event.data);
        if (error) {
          console.error("Error saving subscription:", error);
          throw error;
        }
        break;
      }

      case "subscription.expiring_cards": {
        const { data: userData, error: userError } = await supabase
          .from("clerk_users")
          .select("id")
          .eq("email_address", event.data.customer.email)
          .single();

        if (userError) {
          console.error("Error fetching user:", userError);
          throw userError;
        }
        console.log(userData);

        const { error } = await supabase.from("user_subscriptions").upsert(
          {
            user_id: userData?.id,
            status: event.data.status,
            subscription_end: event.data.next_payment_date
              ? new Date(event.data.next_payment_date).toISOString()
              : null,
            card_expiry_date: event.data.expiry_date,
          },
          {
            onConflict: "user_id",
          }
        );
        console.log("⏸️ Subscription with expiring cards:", event.data);
        if (error) {
          console.error("Error saving subscription:", error);
          throw error;
        }
        break;
      }

      case "subscription.not_renew": {
        const { data: userData, error: userError } = await supabase
          .from("clerk_users")
          .select("id")
          .eq("email_address", event.data.customer.email)
          .single();

        if (userError) {
          console.error("Error fetching user:", userError);
          throw userError;
        }
        console.log(userData);

        const { error } = await supabase.from("user_subscriptions").upsert(
          {
            user_id: userData?.id,
            status: event.data.status,
            subscription_end: event.data.next_payment_date
              ? new Date(event.data.next_payment_date).toISOString()
              : null,
          },
          {
            onConflict: "user_id",
          }
        );
        console.log("🛑 Subscription Not Renewing:", event.data);
        if (error) {
          console.error("Error saving subscription:", error);
          throw error;
        }
        break;
      }

      case "charge.success": {
        let userId = event.data.metadata?.user_id;
        try {
          if (!userId && event.data.customer?.email) {
            const { data: userData, error: userError } = await supabase
              .from("clerk_users")
              .select("id")
              .eq("email_address", event.data.customer.email)
              .single();

            if (userError) {
              console.error("Error fetching user:", userError);
              throw userError;
            }

            if (!userError && userData) {
              userId = userData.id;
            }
          }
          console.log(
            "plan_id",
            event.data.plan.name.toLowerCase().replaceAll(" ", "_")
          );

          const { error } = await supabase.from("payments").upsert(
            {
              user_id: userId,
              paystack_reference: event.data.reference,
              paystack_transaction_id: event.data.id,
              plan_id: event.data.plan.name.toLowerCase().replaceAll(" ", "_"),
              payment_method: event.data.channel,
              amount: event.data.amount / 100,
              fees: event.data.fees / 100,
              status: event.data.status,
              metadata:
                typeof event.data.metadata === "object"
                  ? JSON.stringify(event.data.metadata)
                  : null,
              paid_at: new Date(event.data.paid_at).toISOString(),
              customer: JSON.stringify(event.data.customer),
              authorization: JSON.stringify(event.data.authorization),
            },
            {
              onConflict: "paystack_reference",
            }
          );
          if (error) {
            console.error("Error saving transaction:", error);
            throw error;
          }
          console.log("✅ Transaction Successful:", event.data.reference);
          console.log("🔥 Transaction:", event.data);
        } catch (error) {
          console.error("Error saving transaction:", error);
          throw error;
        }
        break;
      }
      // case "transfer.success":
      //   console.log("✅ Transfer Successful:", event.data.reference);
      //   try {
      //     await supabase
      //       .from("transfers")
      //       .update({
      //         status: "success",
      //         transferred_at: new Date().toISOString(),
      //       })
      //       .eq("reference", event.data.reference);
      //   } catch (error) {
      //     console.error("Error updating transfer status:", error);
      //   }
      //   break;

      // case "transfer.failed":
      //   console.log("❌ Transfer Failed:", event.data.reference);
      //   try {
      //     await supabase
      //       .from("transfers")
      //       .update({
      //         status: "failed",
      //         failure_reason: event.data.reason || "Unknown error",
      //         failed_at: new Date().toISOString(),
      //       })
      //       .eq("reference", event.data.reference);
      //   } catch (error) {
      //     console.error("Error updating failed transfer:", error);
      //   }
      //   break;

      // case "invoice.create":
      //   // New invoice created
      //   console.log("📄 Invoice Created:", event.data.invoice_number);
      //   try {
      //     await supabase.from("invoices").upsert({
      //       invoice_number: event.data.invoice_number,
      //       customer_email: event.data.customer.email,
      //       amount: event.data.amount / 100, // Convert from kobo to naira
      //       status: event.data.status,
      //       due_date: new Date(event.data.due_date).toISOString(),
      //       subscription_id: event.data.subscription_code,
      //       metadata: event.data.metadata,
      //     });
      //   } catch (error) {
      //     console.error("Error saving invoice:", error);
      //   }
      //   break;

      // case "invoice.payment_failed":
      //   console.log("❌ Invoice Payment Failed:", event.data.invoice_number);
      //   try {
      //     await supabase
      //       .from("invoices")
      //       .update({
      //         status: "failed",
      //         last_payment_attempt: new Date().toISOString(),
      //       })
      //       .eq("invoice_number", event.data.invoice_number);
      //   } catch (error) {
      //     console.error("Error updating failed invoice:", error);
      //   }
      //   break;

      // case "invoice.update":
      //   console.log("✅ Invoice Update:", event.data.invoice_number);
      //   try {
      //     await supabase
      //       .from("invoices")
      //       .update({
      //         status: event.data.status,
      //         paid_at: new Date().toISOString(),
      //         payment_reference: event.data.transaction.reference,
      //       })
      //       .eq("invoice_number", event.data.invoice_number);
      //   } catch (error) {
      //     console.error("Error updating paid invoice:", error);
      //   }
      //   break;

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

// (id = (auth.jwt() ->> 'sub'::text))

// using (
//   (auth.jwt() IS NULL) OR  -- Allow webhook (no auth)
//   (user_id = (auth.jwt() ->> 'sub'::text))  -- Normal auth
// );
