"use client";

import { useState, useEffect } from "react";
import {
  Card,
  CardBody,
  Button,
  Input,
  Select,
  SelectItem,
} from "@heroui/react";
import { FuelIcon, MapPinIcon, TruckIcon } from "lucide-react";

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
    name: "NNPC Retail",
    distance: "2.1 km",
    price: 630,
    fuel: "Petrol",
    available: true,
  },
];

const fuelTypes = [
  { key: "petrol", label: "Petrol (PMS)" },
  { key: "diesel", label: "Diesel (AGO)" },
  { key: "gas", label: "Cooking Gas (LPG)" },
];

export default function Dashboard() {
  const [selectedFuel, setSelectedFuel] = useState("petrol");
  const [quantity, setQuantity] = useState("");
  const [location, setLocation] = useState("");

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
                  ₦25,500
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
              label="Quantity (Liters)"
              placeholder="Enter quantity"
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
