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

  const initializePayment = useCallback(async () => {
    if (!plan) {
      console.error("No plan selected");
      return;
    }

    if (plan.price === 0) {
      // Handle free plan signup
      console.log("Signing up for free plan");
      return;
    }

    const planCode = isYearly ? plan.yearlyPlanCode : plan.monthlyPlanCode;

    if (!planCode) {
      console.error(
        "Plan code not found for",
        isYearly ? "yearly" : "monthly",
        "plan"
      );
      return;
    }

    // console.log("Initializing payment for plan:", plan);
    // console.log("Using plan code:", planCode);

    try {
      setIsLoading(true);
      const paystack = new PaystackPop();

      const transaction = paystack.newTransaction({
        key: publicKey,
        reference,
        email,
        currency: "NGN",
        planCode: planCode,
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
      throw error;
    } finally {
      setIsLoading(false);
      //   setSelectedPlan(null);
    }
  }, [email, reference, publicKey, isLoading, isYearly]);
  //   };

  return (
    <Button
      size="lg"
      onPress={() => {
        initializePayment();
      }}
      startContent={startContent}
      isLoading={isLoading}
      className="bg-[#035408] outline-none border-[#96a197] w-full px-8 py-2 rounded-full text-white hover:opacity-90 transition-opacity"
    >
      {text}
    </Button>
  );
}
