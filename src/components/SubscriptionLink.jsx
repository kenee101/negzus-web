"use client";

import { useState } from "react";
import { Spinner } from "@heroui/react";
import { useUser } from "@clerk/nextjs";
// import { toast } from "sonner";

export default function SubscriptionLink({
  plan,
  isYearly,
  text,
  startContent,
  className = "",
}) {
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useUser();

  const getSubscriptionLink = () => {
    if (!plan) return "/subscriptions";

    const links = {
      premium: {
        monthly: `https://paystack.shop/pay/bhcdy7a0m9?metadata[user_id]=${user.id}`,
        yearly: `https://paystack.shop/pay/iqfy8r6l6o?metadata[user_id]=${user.id}`,
      },
      business: {
        monthly: `https://paystack.shop/pay/yd8yg45h66?metadata[user_id]=${user.id}`,
        yearly: `https://paystack.shop/pay/4rmnn524e5?metadata[user_id]=${user.id}`,
      },
    };

    const planType = plan.name.toLowerCase();
    const billingType = isYearly ? "yearly" : "monthly";

    return links[planType]?.[billingType];
  };

  const handleFreePlan = async () => {
    try {
      setIsLoading(true);
      // Call your API to handle free plan activation
      const response = await fetch("/api/subscriptions/activate-free", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          planId: plan.id,
          isYearly,
        }),
      });
      const res = await response.json();
      console.log(res);

      if (!response.ok) {
        throw new Error("Failed to activate free plan");
      }

      window.location.reload();
    } catch (error) {
      console.error("Error activating free plan:", error);
      // toast.error('Failed to activate free plan. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleClick = (e) => {
    e.preventDefault();

    // For free plan
    if (plan.price === 0) {
      handleFreePlan();
      return;
    }

    // For paid plans, open Paystack subscription page
    const link = getSubscriptionLink();
    if (link) {
      window.open(link, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <button
      onClick={handleClick}
      disabled={isLoading}
      className={`bg-[#035408] text-center outline-none border-[#96a197] w-full px-8 py-2 rounded-full text-white hover:opacity-90 transition-opacity flex items-center justify-center gap-2 ${className} ${
        isLoading ? "opacity-70 cursor-not-allowed" : ""
      }`}
    >
      {isLoading ? (
        <Spinner color="success" />
      ) : (
        <>
          {startContent}
          {text}
        </>
      )}
    </button>
  );
}
// Test link, https://paystack.shop/pay/fo-iuxbkz0
