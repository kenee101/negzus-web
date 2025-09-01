"use client";

import { useCallback, useState } from "react";
import { Button } from "@heroui/react";
import PaystackPop from "@paystack/inline-js";

export default function SubscriptionButton({
  email,
  reference,
  publicKey,
  onOpen,
  plan,
  text,
  startContent,
  isYearly,
}) {
  const [isLoading, setIsLoading] = useState(false);

  //   let timeout;
  //   const initializePayment = useCallback(async () => {
  const initializePayment = async () => {
    setSelectedPlan(plan);
    let transaction;
    if (plan.price === 0) {
      // Handle free plan signup
      console.log("Signing up for free plan");
      return;
    }
    // Initialize Paystack
    // Paystack subscription page for premium monthly, https://paystack.shop/pay/bhcdy7a0m9
    // Paystack subscription page for premium yearly, https://paystack.shop/pay/iqfy8r6l6o
    // Paystack subscription page for business monthly, https://paystack.shop/pay/yd8yg45h66
    // Paystack subscription page for business yearly, https://paystack.shop/pay/4rmnn524e5
    console.log(selectedPlan);
    console.log(plan);

    try {
      setIsLoading(true);
      const paystack = new PaystackPop();

      transaction = paystack.newTransaction({
        key: publicKey,
        reference,
        email,
        currency: "NGN",
        planCode: isYearly
          ? selectedPlan?.yearlyPlanCode
          : selectedPlan?.monthlyPlanCode,
        onLoad: (response) => {
          console.log("onLoad: ", response);
        },
        onSuccess: (response) => {
          // Handle successful payment
          console.log("Payment successful:", response);
          // Update user subscription in Supabase
          // Redirect to dashboard or show success message
          onOpen();
        },
        onCancel: () => {
          console.log("Payment window closed");
          setIsLoading(false);
          //   setSelectedPlan(null);
        },
        onError: (error) => {
          console.log("Error: ", error.message);
        },
      });
      return;
    } catch (error) {
      console.error("Error initializing Paystack:", error);
      //   throw error;
    } finally {
      setIsLoading(false);
      //   setSelectedPlan(null);
    }
  };
  //   }, [email, reference, publicKey, isLoading, isYearly]);

  return (
    <Button
      size="lg"
      onPress={() => {
        initializePayment();
      }}
      startContent={startContent}
      isLoading={isLoading && selectedPlan?.id === plan.id}
      className="bg-[#035408] outline-none border-[#96a197] w-full px-8 py-2 rounded-full text-white hover:opacity-90 transition-opacity"
    >
      {text}
    </Button>
  );
}
