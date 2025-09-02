"use client";

import { useCallback } from "react";
import { Button } from "@heroui/react";
import PaystackPop from "@paystack/inline-js";
import { PostgrestError } from "@supabase/supabase-js";

export default function PaystackButton({
  amount,
  email,
  onOrder,
  onClose,
  reference,
  publicKey,
  isLoading,
  setIsLoading,
}) {
  // const [isLoading, setIsLoading] = useState(false);
  const initializePayment = useCallback(async () => {
    let redirectTimer;
    let transaction;

    try {
      if (typeof onOrder === "function") {
        await onOrder();
      }

      // Show a brief delay to ensure the order is created and toast is shown
      await new Promise((resolve) => setTimeout(() => resolve(), 5000));
      setIsLoading(false);

      const paystack = new PaystackPop();

      const handleSuccess = (response) => {
        console.log("Payment successful:", response);
        clearInterval(redirectTimer);
        onClose();
      };

      const handleClose = () => {
        console.log("Payment closed by user");
        clearInterval(redirectTimer);
        if (typeof onClose === "function") {
          onClose();
        }
      };

      // Initialize the transaction
      transaction = paystack.newTransaction({
        key: publicKey,
        email,
        amount,
        reference,
        currency: "NGN",
        onSuccess: handleSuccess,
        onClose: handleClose,
        onLoad: () => {
          console.log("Paystack loaded");
        },
        metadata: {
          cancel_action:
            typeof window !== "undefined" ? window.location.href : "",
        },
      });

      // Auto-cancel after 10 minutes of inactivity (Paystack's default is 30 minutes)
      const timeLimit = 10 * 60; // 10 minutes in seconds
      let timeElapsed = 0;
      const redirectURL = "https://negzus.vercel.app/dashboard";
      // console.log("transaction", transaction);

      redirectTimer = setInterval(() => {
        timeElapsed += 1;
        if (timeElapsed >= timeLimit && transaction.id) {
          console.log("Transaction timed out");
          paystack.cancelTransaction(transaction.id);
          clearInterval(redirectTimer);
          window.location.href = redirectURL;
          handleClose();
        }
      }, 1000);

      // Cleanup function to clear the interval when component unmounts
      return () => {
        clearInterval(redirectTimer);
      };
    } catch (error) {
      onClose();
      if (error instanceof PostgrestError) {
        console.error("Error setting up order:", error.message);
        throw error;
      } else {
        console.error("Error initializing Paystack:", error);
        clearInterval(redirectTimer);
        throw error;
      }
    }
  }, [amount, email, reference, publicKey, onOrder, onClose]);

  return (
    <Button
      onPress={initializePayment}
      color="success"
      variant="solid"
      isLoading={isLoading}
      className="bg-[#035408] px-8 py-2 rounded-full text-white hover:opacity-90 transition-opacity"
    >
      Pay Now
    </Button>
  );
}
