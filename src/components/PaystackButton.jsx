"use client";

import { PaystackButton as PaystackPay } from "react-paystack";

export default function PaystackButton({
  amount,
  email,
  onSuccess,
  onClose,
  reference,
  publicKey,
}) {
  const componentProps = {
    reference,
    email,
    amount,
    publicKey,
    currency: "NGN",
    text: "Pay Now",
    onSuccess: (response) => {
      console.log("Payment successful:", response);
      if (typeof onSuccess === "function") {
        onSuccess(response);
      }
    },
    onClose: () => {
      console.log("Payment closed");
      if (typeof onClose === "function") {
        onClose();
      }
    },
    metadata: {
      cancel_action: typeof window !== "undefined" ? window.location.href : "",
    },
  };

  return (
    <div
      style={{
        backgroundColor: "#035408",
        padding: "8px",
        paddingRight: "32px",
        paddingLeft: "32px",
        borderRadius: "24px",
        width: "fit-content",
        color: "white",
        cursor: "pointer",
      }}
    >
      <PaystackPay {...componentProps} />
    </div>
  );
}
