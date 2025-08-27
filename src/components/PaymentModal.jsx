"use client";

import { useState } from "react";
import axios from "axios";
import PaystackPop from "@paystack/inline-js";

const PaymentModal = ({
  isOpen,
  onClose,
  amount,
  stationId,
  stationName,
  customerEmail,
  customerName,
}) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const initializePayment = async () => {
    setLoading(true);
    setError("");

    try {
      // Initialize transaction
      const response = await axios.post("/api/payment/initialize", {
        email: customerEmail,
        amount: amount,
        customerName: customerName,
        stationId: stationId,
        serviceType: "fuel_purchase",
      });

      if (response.data.success) {
        // Use Paystack Inline
        const paystack = new PaystackPop();
        paystack.newTransaction({
          key: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY,
          email: customerEmail,
          amount: amount * 100, // Convert to kobo
          currency: "NGN",
          ref: response.data.data.reference,
          callback: function (response) {
            verifyPayment(response.reference);
          },
          onClose: function () {
            setLoading(false);
            console.log("Payment window closed");
          },
        });
      }
    } catch (error) {
      setError(error.response?.data?.message || "Failed to initialize payment");
      setLoading(false);
    }
  };

  const verifyPayment = async (reference) => {
    try {
      const response = await axios.post("/api/payment/verify", {
        reference: reference,
      });

      if (response.data.success) {
        // Payment successful
        alert("Payment successful!");
        onClose();
        // Redirect or update UI
      } else {
        setError("Payment verification failed");
      }
    } catch (error) {
      setError("Payment verification failed");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Complete Payment</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>

        <div className="mb-6">
          <div className="border-b pb-4 mb-4">
            <h3 className="font-semibold">{stationName}</h3>
            <p className="text-gray-600">Fuel Purchase</p>
          </div>

          <div className="flex justify-between items-center text-lg font-bold">
            <span>Total:</span>
            <span className="text-emerald-600">₦{amount.toLocaleString()}</span>
          </div>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 py-2 px-4 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
            disabled={loading}
          >
            Cancel
          </button>
          <button
            onClick={initializePayment}
            disabled={loading}
            className="flex-1 py-2 px-4 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 disabled:opacity-50"
          >
            {loading ? "Processing..." : "Pay Now"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentModal;
