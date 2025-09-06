import { NextRequest, NextResponse } from "next/server";
import { PaystackService } from "@/utils/paystack";

export async function GET(req: NextRequest) {
  const userId = req.headers.get("x-user-id");
  const authType = req.headers.get("x-auth-type");

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  console.log(`User ${userId} authenticated via ${authType}`);

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
