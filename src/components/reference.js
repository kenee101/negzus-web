"use client";

import { useCallback } from "react";
import { Button } from "@heroui/react";

export default function PaystackButton({
  amount,
  email,
  onSuccess,
  onClose,
  reference,
  publicKey,
}) {
  const initializePayment = useCallback(async () => {
    try {
      const { loadPaystack } = await import("@paystack/inline-js");
      const paystack = loadPaystack(publicKey);

      const handleSuccess = (response) => {
        console.log("Payment successful:", response);
        if (typeof onSuccess === "function") {
          onSuccess(response);
        }
      };

      const handleClose = () => {
        console.log("Payment closed");
        if (typeof onClose === "function") {
          onClose();
        }
      };

      paystack.newPage({
        key: publicKey,
        email,
        amount: amount * 100, // Convert to kobo
        ref: reference,
        currency: "NGN",
        onSuccess: handleSuccess,
        onClose: handleClose,
        metadata: {
          cancel_action:
            typeof window !== "undefined" ? window.location.href : "",
        },
      });
    } catch (error) {
      console.error("Error initializing Paystack:", error);
    }
  }, [amount, email, reference, publicKey, onSuccess, onClose]);

  return (
    <Button
      onPress={initializePayment}
      color="success"
      variant="solid"
      className="bg-[#035408] px-8 py-2 rounded-full text-white hover:opacity-90 transition-opacity"
    >
      Pay Now
    </Button>
  );
}

// npm i react-paystack --legacy-peer-deps
// "use client";

// import { PaystackButton as PaystackPay } from "react-paystack";

// export default function PaystackButton({
//   amount,
//   email,
//   onSuccess,
//   onClose,
//   reference,
//   publicKey,
// }) {
//   const componentProps = {
//     reference,
//     email,
//     amount,
//     publicKey,
//     currency: "NGN",
//     text: "Pay Now",
//     onSuccess: (response) => {
//       console.log("Payment successful:", response);
//       if (typeof onSuccess === "function") {
//         onSuccess(response);
//       }
//     },
//     onClose: () => {
//       console.log("Payment closed");
//       if (typeof onClose === "function") {
//         onClose();
//       }
//     },
//     metadata: {
//       cancel_action: typeof window !== "undefined" ? window.location.href : "",
//     },
//   };

//   return (
//     <div
//       style={{
//         backgroundColor: "#035408",
//         padding: "8px",
//         paddingRight: "32px",
//         paddingLeft: "32px",
//         borderRadius: "24px",
//         width: "fit-content",
//         color: "white",
//         cursor: "pointer",
//       }}
//     >
//       <PaystackPay {...componentProps} />
//     </div>
//   );
// }
