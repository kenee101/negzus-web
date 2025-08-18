import { PaystackService } from "@/utils/paystack";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { reference } = await req.json();

    if (!reference) {
      return NextResponse.json(
        {
          message: "Transaction reference is required",
        },
        {
          status: 400,
        }
      );
    }

    // Verify transaction
    const result = await PaystackService.verifyTransaction(reference);

    if (result.success) {
      const transaction = result.data;

      // Here you can save transaction to your database
      // await saveTransactionToDatabase(transaction);

      return NextResponse.json({
        success: true,
        data: {
          reference: transaction.reference,
          amount: transaction.amount / 100, // Convert from kobo
          status: transaction.status,
          customer: transaction.customer,
          paidAt: transaction.paid_at,
          metadata: transaction.metadata,
        },
      });
    } else {
      return NextResponse.json({
        success: false,
        message: result.error,
      });
    }
  } catch (error) {
    console.error("Verify payment error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Internal server error",
      },
      {
        status: 500,
      }
    );
  }
}
