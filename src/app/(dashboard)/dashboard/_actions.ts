"use server";

import { createClerkSupabaseClient } from "@/utils/supabase";
import { revalidatePath } from "next/cache";
import { auth } from "@clerk/nextjs/server";

export async function createOrder(orderData: any) {
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
