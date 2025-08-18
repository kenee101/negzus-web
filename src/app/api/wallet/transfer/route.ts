import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { userId, stationId, amount } = await req.json();

  //   const user = await db.user.findUnique({ where: { id: userId } });
  //   const station = await db.station.findUnique({ where: { id: stationId } });

  //   if (!user || !station) {
  //     return NextResponse.json({ error: "Invalid user or station" }, { status: 400 });
  //   }

  //   if (user.walletBalance < amount) {
  //     return NextResponse.json({ error: "Insufficient balance" }, { status: 400 });
  //   }

  //   // Deduct from user
  //   await db.user.update({
  //     where: { id: userId },
  //     data: { walletBalance: { decrement: amount } },
  //   });

  //   // Record transaction (station earnings tracked internally)
  //   await db.transaction.create({
  //     data: {
  //       userId,
  //       stationId,
  //       amount,
  //       status: "success",
  //       type: "wallet_payment",
  //       reference: crypto.randomUUID(),
  //     },
  //   });

  //   return NextResponse.json({ success: true, message: "Payment successful" });
}
