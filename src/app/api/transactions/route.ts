import { NextRequest, NextResponse } from "next/server";
import { PaystackService } from "@/utils/paystack";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const params = Object.fromEntries(searchParams.entries());

    const result = await PaystackService.listTransactions(params);

    if (result.success) {
      return NextResponse.json(result);
    } else {
      return NextResponse.json(
        {
          message: result.error || "Failed to fetch transactions",
        },
        {
          status: 500,
        }
      );
    }
  } catch (error) {
    console.error("Error fetching transactions:", error);
    return NextResponse.json(
      {
        message: "An error occurred while fetching transactions.",
      },
      {
        status: 500,
      }
    );
  }
}
