"use server";

import { createClerkSupabaseClient } from "@/utils/supabase";
import { revalidatePath } from "next/cache";
import { auth } from "@clerk/nextjs/server";

interface OrderData {
  user_id: string;
  fuel_type: string;
  reference: string;
  quantity: number;
  unit_price: number;
  total_price: number;
  shipping_address: string;
  status:
    | "pending"
    | "refunded"
    | "delivered"
    | "cancelled"
    | "failed"
    | "in_transit"
    | "confirmed"
    | "preparing";
  created_at?: string;
  payment_reference?: string;
}

export async function createOrder(orderData: OrderData) {
  const { getToken } = await auth();
  const supabase = createClerkSupabaseClient(getToken);

  const { data, error } = await supabase
    .from("orders")
    .insert([orderData])
    .select();

  if (error) {
    console.error("Error creating order:", error);
    throw new Error("Failed to create order");
  }

  revalidatePath("/dashboard/orders/history");
  return data[0];
}
