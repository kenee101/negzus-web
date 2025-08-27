"use client";

import React, { useState, useEffect } from "react";
import {
  MapPin,
  Clock,
  Truck,
  CheckCircle,
  Phone,
  MessageSquare,
  Navigation,
} from "lucide-react";
import {
  Spinner,
  Card,
  CardBody,
  Select,
  SelectItem,
  Input,
  Button,
  Chip,
} from "@heroui/react";

const OrderTracking = () => {
  const [activeOrders, setActiveOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Mock data - replace with actual Supabase queries
  useEffect(() => {
    const mockOrders = [
      {
        id: "ORD-001",
        status: "in_transit",
        fuelType: "PMS (Petrol)",
        quantity: 50,
        totalAmount: 45000,
        station: "Ikeja Station",
        stationAddress: "15 Allen Avenue, Ikeja, Lagos",
        customerName: "John Adebayo",
        customerPhone: "+234 801 234 5678",
        orderTime: new Date("2024-03-15T10:30:00"),
        estimatedDelivery: new Date("2024-03-15T11:30:00"),
        driverName: "Ibrahim Mohammed",
        driverPhone: "+234 802 345 6789",
        vehicleNumber: "ABC-123-XY",
        timeline: [
          {
            status: "placed",
            time: "10:30 AM",
            completed: true,
            description: "Order placed successfully",
          },
          {
            status: "confirmed",
            time: "10:32 AM",
            completed: true,
            description: "Order confirmed by station",
          },
          {
            status: "preparing",
            time: "10:35 AM",
            completed: true,
            description: "Fuel preparation started",
          },
          {
            status: "in_transit",
            time: "10:45 AM",
            completed: true,
            description: "Driver en route to delivery",
          },
          {
            status: "delivered",
            time: "11:30 AM",
            completed: false,
            description: "Order delivered",
          },
        ],
        location: {
          lat: 6.5244,
          lng: 3.3792,
          address: "123 Victoria Street, Lagos Island",
        },
      },
      {
        id: "ORD-002",
        status: "preparing",
        fuelType: "AGO (Diesel)",
        quantity: 100,
        totalAmount: 95000,
        station: "Victoria Island Station",
        stationAddress: "45 Ahmadu Bello Way, Victoria Island",
        customerName: "Sarah Okafor",
        customerPhone: "+234 803 456 7890",
        orderTime: new Date("2024-03-15T11:15:00"),
        estimatedDelivery: new Date("2024-03-15T12:45:00"),
        timeline: [
          {
            status: "placed",
            time: "11:15 AM",
            completed: true,
            description: "Order placed successfully",
          },
          {
            status: "confirmed",
            time: "11:17 AM",
            completed: true,
            description: "Order confirmed by station",
          },
          {
            status: "preparing",
            time: "11:20 AM",
            completed: true,
            description: "Fuel preparation in progress",
          },
          {
            status: "in_transit",
            time: "Pending",
            completed: false,
            description: "Driver will be assigned",
          },
          {
            status: "delivered",
            time: "Pending",
            completed: false,
            description: "Order delivered",
          },
        ],
        location: {
          lat: 6.4281,
          lng: 3.4219,
          address: "67 Surulere Street, Surulere, Lagos",
        },
      },
    ];

    setTimeout(() => {
      setActiveOrders(mockOrders);
      setSelectedOrder(mockOrders[0]);
      setIsLoading(false);
    }, 1000);
  }, []);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
    }).format(amount);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "placed":
        return "text-blue-600";
      case "confirmed":
        return "text-green-600";
      case "preparing":
        return "text-yellow-600";
      case "in_transit":
        return "text-purple-600";
      case "delivered":
        return "text-green-600";
      default:
        return "text-gray-600";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "placed":
        return Clock;
      case "confirmed":
        return CheckCircle;
      case "preparing":
        return Clock;
      case "in_transit":
        return Truck;
      case "delivered":
        return CheckCircle;
      default:
        return Clock;
    }
  };

  const OrderCard = ({ order, isSelected, onClick }) => {
    const StatusIcon = getStatusIcon(order.status);
    // console.log(order);

    return (
      <Card
        className={`p-4 mb-4 rounded-full cursor-pointer dark:bg-black transition-all duration-200 ${
          isSelected
            ? "border-4 dark:border-green-700"
            : "border-none hover:bg-black/20 dark:hover:bg-black/50"
        }`}
      >
        <CardBody
          onClick={onClick}
          className="flex mb-3 items-center justify-center overflow-hidden no-scrollbar"
        >
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-gray-100 text-center">
              {order.id}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-100 text-center">
              {order.fuelType} • {order.quantity}L
            </p>
          </div>
          <Chip
            classNames={{
              base: `mt-2 mb-2 ${getStatusColor(order.status)}`,
            }}
            variant="flat"
            size="lg"
            className="capitalize"
          >
            <StatusIcon className="w-3 h-3 inline mr-1" />
            {order.status.replace("_", " ")}{" "}
          </Chip>

          <div className="flex flex-col space-y-1 justify-center items-center">
            <span className="font-semibold text-gray-900 dark:text-gray-100">
              {formatCurrency(order.totalAmount)}
            </span>
            <span className="text-sm text-gray-500 text-center">
              {order.estimatedDelivery.toLocaleTimeString("en-US", {
                hour: "2-digit",
                minute: "2-digit",
              })}{" "}
              ETA
            </span>
          </div>
        </CardBody>
      </Card>
    );
  };

  const TimelineStep = ({ step, isLast }) => (
    <div className="flex items-start">
      <div className="flex flex-col items-center">
        <div
          className={`w-8 h-8 rounded-full flex items-center justify-center ${
            step.completed ? "bg-green-500" : "bg-gray-300"
          }`}
        >
          {step.completed ? (
            <CheckCircle className="w-5 h-5 text-white" />
          ) : (
            <div className="w-3 h-3 bg-white rounded-full"></div>
          )}
        </div>
        {!isLast && (
          <div
            className={`w-0.5 h-16 ${
              step.completed ? "bg-green-500" : "bg-gray-300"
            }`}
          ></div>
        )}
      </div>
      <div className="ml-4 pb-8">
        <h4 className="font-medium text-gray-900 dark:text-gray-100 capitalize">
          {step.status.replace("_", " ")}
        </h4>
        <p className="text-sm text-gray-500">{step.description}</p>
        <p className="text-xs text-gray-500 mt-1">{step.time}</p>
      </div>
    </div>
  );

  if (isLoading) {
    return (
      <div className="min-h-screen p-6">
        <div className="max-w-7xl mx-auto">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-300 rounded w-64 mb-8"></div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="space-y-4">
                {[1, 2].map((i) => (
                  <div key={i} className="h-32 bg-gray-300 rounded-lg"></div>
                ))}
              </div>
              <div className="lg:col-span-2 h-96 bg-gray-300 rounded-lg"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
              Track Your Orders
            </h1>
            <p className="text-gray-500 mt-1">
              Monitor your delivery in real-time
            </p>
          </div>
          <Chip color="success" variant="flat" size="lg" className="capitalize">
            Active Orders
          </Chip>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Orders List */}
          <Card className="h-fit">
            <CardBody className="p-4">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
                Active Orders
              </h2>
              <div className="space-y-4">
                {activeOrders.map((order) => (
                  <OrderCard
                    key={order.id}
                    order={order}
                    isSelected={selectedOrder?.id === order.id}
                    onClick={() => setSelectedOrder(order)}
                  />
                ))}

                {activeOrders.length === 0 && (
                  <div className="text-center py-8 text-gray-500">
                    <Truck className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                    <p>No active orders found</p>
                  </div>
                )}
              </div>
            </CardBody>
          </Card>

          {/* Order Details */}
          {selectedOrder && (
            <div className="lg:col-span-2 space-y-6">
              {/* Order Info Card */}
              <Card>
                <CardBody>
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">
                        {selectedOrder.id}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-100">
                        Ordered at{" "}
                        {selectedOrder.orderTime.toLocaleTimeString()}
                      </p>
                    </div>
                    <div
                      className={`px-4 py-2 rounded-full font-medium ${getStatusColor(
                        selectedOrder.status
                      )}`}
                    >
                      {selectedOrder.status.replace("_", " ").toUpperCase()}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-2">
                        Fuel Details
                      </h4>
                      <p className="text-sm text-gray-500 dark:text-gray-100">
                        {selectedOrder.fuelType}
                      </p>
                      <p className="text-sm text-gray-400 dark:text-gray-100">
                        {selectedOrder.quantity} Liters
                      </p>
                      <p className="font-semibold text-lg text-gray-900 dark:text-gray-100">
                        {formatCurrency(selectedOrder.totalAmount)}
                      </p>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-2">
                        Station
                      </h4>
                      <p className="text-sm text-gray-500 dark:text-gray-100">
                        {selectedOrder.station}
                      </p>
                      <p className="text-xs text-gray-400 dark:text-gray-100">
                        {selectedOrder.stationAddress}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-2">
                        Delivery Address
                      </h4>
                      <div className="flex items-start space-x-2">
                        <MapPin className="w-4 h-4 text-gray-500" />
                        <p className="text-sm text-gray-400">
                          {selectedOrder.location.address}
                        </p>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-2">
                        Estimated Delivery
                      </h4>
                      <div className="flex items-center space-x-2">
                        <Clock className="w-4 h-4 text-gray-500" />
                        <p className="text-sm text-gray-400">
                          {selectedOrder.estimatedDelivery.toLocaleString()}
                        </p>
                      </div>
                    </div>
                  </div>
                </CardBody>
              </Card>

              {/* Driver Info (if available) */}
              {selectedOrder.driverName && (
                <Card>
                  <CardBody>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
                      Driver Information
                    </h3>
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-medium text-gray-900 dark:text-gray-100">
                          {selectedOrder.driverName}
                        </p>
                        <p className="text-sm text-gray-400">
                          Vehicle: {selectedOrder.vehicleNumber}
                        </p>
                      </div>
                      <div className="flex space-x-3">
                        <button className="p-2 cursor-pointer bg-green-100 text-green-600 rounded-lg hover:bg-green-200 transition-colors">
                          <Phone className="w-4 h-4" />
                        </button>
                        <button className="p-2 cursor-pointer bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors">
                          <MessageSquare className="w-4 h-4" />
                        </button>
                        <button className="p-2 cursor-pointer bg-purple-100 text-purple-600 rounded-lg hover:bg-purple-200 transition-colors">
                          <Navigation className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </CardBody>
                </Card>
              )}

              {/* Order Timeline */}
              <Card>
                <CardBody>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-6">
                    Order Timeline
                  </h3>
                  <div className="space-y-2">
                    {selectedOrder.timeline.map((step, index) => (
                      <TimelineStep
                        key={step.status}
                        step={step}
                        isLast={index === selectedOrder.timeline.length - 1}
                      />
                    ))}
                  </div>
                </CardBody>
              </Card>

              {/* Map Placeholder */}
              <Card>
                <CardBody>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
                    Live Tracking
                  </h3>
                  <div className="h-80 rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <MapPin className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                      <p className="text-gray-500">
                        Map integration coming soon
                      </p>
                      <p className="text-sm text-gray-400">
                        Real-time driver location
                      </p>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderTracking;
