"use client";

import { useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Spinner,
} from "@heroui/react";
import { createOrder } from "@/app/(dashboard)/dashboard/_actions";
import dynamic from "next/dynamic";

const PaystackButton = dynamic(
  () =>
    import("./PaystackButton").then((mod) => {
      console.log("PaystackButton loaded successfully");
      return mod.default || mod;
    }),
  {
    ssr: false,
    loading: () => <Spinner color="success" />,
  }
);

export default function OrderModal({
  isOpen,
  onOpenChange,
  onClose,
  onPaymentCancel,
  email,
  orderDetails,
  onPaymentSuccess,
}) {
  const [isLoading, setIsLoading] = useState(false);

  const handlePaymentSuccess = async (response) => {
    try {
      setIsLoading(true);
      // Create order in the database
      await createOrder({
        ...orderDetails,
        payment_reference: response.reference,
      });
      onPaymentSuccess(response);
      onClose();
    } catch (error) {
      console.error("Error creating order:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (!orderDetails) return null;

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="lg">
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1">
          Confirm Your Order
        </ModalHeader>
        <ModalBody>
          <div className="space-y-4">
            <div className="flex justify-between">
              <span className="text-default-500">Fuel Type:</span>
              <span className="font-medium">{orderDetails.fuel_type}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-default-500">
                Quantity{" "}
                {orderDetails.fuel_type === "gas" ? "(kg)" : "(litres)"}:
              </span>
              <span className="font-medium">{orderDetails.quantity}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-default-500">
                Price per {orderDetails.fuel_type === "gas" ? "kg" : "litre"}:
              </span>
              <span className="font-medium">₦{orderDetails.unit_price}</span>
            </div>
            <div className="flex justify-between border-t border-default-200 pt-2">
              <span className="font-semibold">Total Amount:</span>
              <span className="font-bold text-lg">
                ₦{orderDetails.total_price}
              </span>
            </div>
            <div className="mt-4">
              <p className="text-sm text-default-500">
                By placing this order, you agree to our terms and conditions.
              </p>
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button
            color="danger"
            variant="light"
            onPress={() => {
              onPaymentCancel();
            }}
            disabled={isLoading}
          >
            Cancel
          </Button>
          <PaystackButton
            amount={orderDetails.total_price * 100} // Convert to kobo
            onSuccess={handlePaymentSuccess}
            className="bg-success text-white"
            disabled={isLoading}
            email={email}
            reference={orderDetails.reference}
            publicKey={process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY}
          >
            {isLoading ? (
              <div className="flex items-center gap-2">
                <Spinner size="sm" color="success" />
              </div>
            ) : (
              "Pay Now"
            )}
          </PaystackButton>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
