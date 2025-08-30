"use client";

import { useState, useEffect } from "react";
import {
  Card,
  CardBody,
  Button,
  Input,
  Select,
  SelectItem,
  Chip,
  Spinner,
} from "@heroui/react";
import { CreditCardIcon, FuelIcon, MapPinIcon, TruckIcon } from "lucide-react";
import { addToast } from "@heroui/toast";
import generateReference from "@/utils/generateReference";
import { useUser } from "@clerk/nextjs";
import { formatPrice } from "@/utils/formatPrice";
import dynamic from "next/dynamic";

const PaystackButton = dynamic(
  () =>
    import("@/components/PaystackButton").then((mod) => {
      console.log("PaystackButton loaded successfully");
      return mod.default || mod;
    }),
  {
    ssr: false,
    loading: () => <Spinner color="success" />,
  }
);

const gasStations = [
  {
    id: 1,
    name: "Total Energies",
    distance: "0.8 km",
    price: 650,
    fuel: "Petrol",
    available: true,
  },
  {
    id: 2,
    name: "Shell Nigeria",
    distance: "1.2 km",
    price: 645,
    fuel: "Petrol",
    available: true,
  },
  {
    id: 3,
    name: "Mobil Nigeria",
    distance: "1.5 km",
    price: 655,
    fuel: "Petrol",
    available: false,
  },
  {
    id: 4,
    name: "Oando Plc",
    distance: "2.1 km",
    price: 630,
    fuel: "Petrol",
    available: true,
  },
];

const fuelTypes = [
  { key: "petrol", label: "Petrol (PMS)", price: "865" },
  { key: "diesel", label: "Diesel (AGO)", price: "765" },
  { key: "gas", label: "Cooking Gas (LPG)", price: "1200" },
];

export default function Dashboard() {
  const [selectedFuel, setSelectedFuel] = useState("petrol");
  const [quantity, setQuantity] = useState("");
  const [location, setLocation] = useState("");
  const [amount, setAmount] = useState(0);
  const [isClient, setIsClient] = useState(false);
  const { user } = useUser();

  useEffect(() => {
    setIsClient(true);
    const price =
      (parseInt(quantity) || 0) *
      (parseInt(fuelTypes.find((f) => f.key === selectedFuel)?.price) || 0);
    setAmount(price);
  }, [quantity, selectedFuel]);

  const handlePaymentSuccess = (response) => {
    // Reset form
    setAmount(0);
    setLocation("");
    setQuantity("");

    // Show success toast
    addToast({
      classNames: {
        base: [
          `bg-default-50 dark:bg-background shadow-lg`,
          `border border-l-4 rounded-3xl`,
          `flex flex-col items-start`,
          `border-success-200 dark:border-success-100 border-l-success`,
        ],
        closeButton: "opacity-100 absolute right-4 top-1/2 -translate-y-1/2",
      },
      placement: "top-right",
      title: "Payment successful!",
      description: `Your order has been placed successfully.`,
      radius: "lg",
      duration: 10000,
      pauseonhover: "true",
      closeIcon: (
        <svg
          fill="none"
          height="32"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          width="32"
        >
          <path d="M18 6 6 18" />
          <path d="m6 6 12 12" />
        </svg>
      ),
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#02740f"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="lucide lucide-fuel-icon lucide-fuel"
          style={{ color: "transparent" }}
        >
          <line x1="3" x2="15" y1="22" y2="22" />
          <line x1="4" x2="14" y1="9" y2="9" />
          <path d="M14 22V4a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v18" />
          <path d="M14 13h2a2 2 0 0 1 2 2v2a2 2 0 0 0 2 2a2 2 0 0 0 2-2V9.83a2 2 0 0 0-.59-1.42L18 5" />
        </svg>
      ),
    });
  };

  const handlePaymentCancel = () => {
    setAmount(0);
    setLocation("");
    setQuantity("");
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
          Welcome! 👋
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Ready to fuel up? Find the best stations near you.
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardBody>
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <FuelIcon className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-100">
                  Active Orders
                </p>
                <p className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
                  2
                </p>
              </div>
            </div>
          </CardBody>
        </Card>

        <Card>
          <CardBody>
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <TruckIcon className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-100">
                  Total Orders
                </p>
                <p className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
                  24
                </p>
              </div>
            </div>
          </CardBody>
        </Card>

        <Card>
          <CardBody>
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <MapPinIcon className="h-6 w-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-100">
                  Nearby Stations
                </p>
                <p className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
                  12
                </p>
              </div>
            </div>
          </CardBody>
        </Card>

        <Card>
          <CardBody>
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="h-6 w-6 rounded-full bg-green-600 flex items-center justify-center">
                  <span className="text-xs font-medium text-white">₦</span>
                </div>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-100">
                  Wallet Balance
                </p>
                <p className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
                  ₦750,000
                </p>
              </div>
            </div>
          </CardBody>
        </Card>
      </div>

      {/* Order Form */}
      <Card>
        <CardBody>
          <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4">
            Place New Order
          </h3>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <Select
              label="Fuel Type"
              placeholder="Select fuel type"
              selectedKeys={[selectedFuel]}
              onSelectionChange={(keys) => setSelectedFuel(Array.from(keys)[0])}
            >
              {fuelTypes.map((fuel) => (
                <SelectItem key={fuel.key} value={fuel.key}>
                  {fuel.label}
                </SelectItem>
              ))}
            </Select>
            <Input
              type="number"
              label={`Quantity ${selectedFuel === "gas" ? "(Kg)" : "(Liters)"}`}
              placeholder={`Enter quantity in ${
                selectedFuel === "gas" ? "kg" : "liters"
              }`}
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
            />
            <Input
              label="Delivery Location"
              placeholder="Enter your location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>

          {amount > 0 && (
            <div className="flex justify-center">
              <Chip
                color="default"
                className="mt-4 p-4"
                variant="solid"
                size="md"
                startContent={<CreditCardIcon className="h-5 w-5 mr-2" />}
              >
                {formatPrice(amount)}
              </Chip>
            </div>
          )}

          {isClient &&
            parseInt(quantity) > 0 &&
            location.trim() !== "" &&
            amount > 0 && (
              <div className="mt-6 flex justify-center">
                <PaystackButton
                  amount={Math.round(amount * 100)}
                  email={user?.emailAddresses?.[0]?.emailAddress}
                  onSuccess={handlePaymentSuccess}
                  onClose={handlePaymentCancel}
                  reference={generateReference()}
                  publicKey={process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY}
                />
              </div>
            )}
        </CardBody>
      </Card>

      {/* Nearby Gas Stations */}
      <Card>
        <CardBody>
          <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4">
            Nearby Gas Stations
          </h3>
          <div className="space-y-4">
            {gasStations.map((station) => (
              <div
                key={station.id}
                className="flex items-center justify-between p-4 dark:bg-white/5 bg-gray-200 rounded-lg hover:bg-gray-400 dark:hover:bg-white/20"
              >
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0">
                    <FuelIcon className="h-8 w-8 text-green-800" />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-900 dark:text-gray-100">
                      {station.name}
                    </h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {station.distance} away
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                      ₦{station.price}/L
                    </p>
                    <p
                      className={`text-sm ${
                        station.available ? "text-green-600" : "text-red-600"
                      }`}
                    >
                      {station.available ? "Available" : "Out of Stock"}
                    </p>
                  </div>
                  <Button
                    color="success"
                    size="sm"
                    disabled={!station.available}
                    style={{
                      opacity: !station.available && "50%",
                      cursor: !station.available ? "default" : "pointer",
                    }}
                  >
                    Order Now
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
