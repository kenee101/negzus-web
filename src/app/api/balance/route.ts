import { NextRequest, NextResponse } from "next/server";
import { PaystackService } from "@/utils/paystack";

export async function GET(req: NextRequest) {
  try {
    const result = await PaystackService.getBalance();

    if (result.success) {
      return NextResponse.json(result.data);
    } else {
      return NextResponse.json(
        {
          message: result.error || "Failed to fetch balance",
        },
        {
          status: 500,
        }
      );
    }
  } catch (error) {
    console.error("Error fetching balance:", error);
    return NextResponse.json(
      {
        message: "An error occurred while fetching the balance.",
      },
      {
        status: 500,
      }
    );
  }
}
