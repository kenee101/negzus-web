"use client";

import React, { useState, useEffect } from "react";
import {
  Calendar,
  Filter,
  Download,
  Search,
  Eye,
  RotateCcw,
  CheckCircle,
  XCircle,
  Clock,
  Fuel,
  MapPin,
  Receipt,
  SearchIcon,
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
  Modal,
  ModalHeader,
  ModalBody,
  ModalContent,
  ModalFooter,
  useDisclosure,
} from "@heroui/react";

// Order Card Component
const OrderCard = ({
  order,
  onViewDetails,
  getStatusIcon,
  getStatusColor,
  formatCurrency,
  getRatingStars,
}) => {
  const StatusIcon = getStatusIcon(order.status);

  return (
    <Card key={order.id} className="hover:shadow-md transition-shadow">
      <CardBody>
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                {order.id}
              </h3>
              <div
                className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                  order.status
                )}`}
              >
                <StatusIcon className="w-4 h-4 inline mr-1" />
                {order.status.toUpperCase()}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
              <div>
                <p className="text-sm mb-2 text-gray-600 dark:text-gray-100">
                  Fuel Type & Quantity
                </p>
                <p className="font-medium text-gray-500">{order.fuelType}</p>
                <p className="text-sm text-gray-400">{order.quantity} Liters</p>
              </div>
              <div>
                <p className="text-sm mb-2 text-gray-600 dark:text-gray-100">
                  Station
                </p>
                <p className="font-medium text-gray-500">{order.station}</p>
              </div>
              <div>
                <p className="text-sm mb-2 text-gray-600 dark:text-gray-100">
                  Order Date
                </p>
                <p className="font-medium text-gray-500">
                  {order.orderDate.toLocaleDateString()}
                </p>
                <p className="text-sm text-gray-600">
                  {order.orderDate.toLocaleTimeString()}
                </p>
              </div>
              <div>
                <p className="text-sm mb-2 text-gray-600 dark:text-gray-100">
                  Total Amount
                </p>
                <p className="font-semibold text-lg text-gray-500">
                  {formatCurrency(order.totalAmount)}
                </p>
              </div>
            </div>

            {order.status === "delivered" && order.rating && (
              <div className="flex items-center mb-3">
                <span className="text-sm text-gray-600 dark:text-gray-100 mr-2">
                  Your rating:
                </span>
                {getRatingStars(order.rating)}
              </div>
            )}

            <div className="flex space-x-3 justify-center">
              <Button
                onPress={() => onViewDetails(order)}
                startContent={<Eye className="w-4 h-4" />}
                variant="flat"
                color="success"
                className="flex-1 outline-none"
              >
                View Details
              </Button>
            </div>
          </div>
        </div>
      </CardBody>
    </Card>
  );
};

// Order Details Modal Component
const OrderDetailsModal = ({
  isOpen,
  onClose,
  order,
  getStatusColor,
  formatCurrency,
  getRatingStars,
}) => {
  if (!order) return null;

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onClose}
      size="2xl"
      classNames={{
        wrapper: "overflow-y-auto no-scrollbar",
      }}
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              <h2 className="text-xl font-bold">Order Details</h2>
              <p className="text-sm text-gray-500 font-normal">
                {order.id} • {order.orderDate.toLocaleDateString()}
              </p>
            </ModalHeader>

            <ModalBody className="max-h-[70vh] overflow-y-auto no-scrollbar">
              <div className="space-y-6">
                {/* Order Status & Basic Info */}
                <Card>
                  <CardBody>
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                          {order.id}
                        </h3>
                        <p className="text-sm text-gray-500">
                          Ordered on {order.orderDate.toLocaleDateString()} at{" "}
                          {order.orderDate.toLocaleTimeString()}
                        </p>
                      </div>
                      <div
                        className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                          order.status
                        )}`}
                      >
                        {order.status.toUpperCase()}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-medium text-gray-700 dark:text-gray-100">
                          Fuel Type
                        </h4>
                        <p className="text-gray-500">{order.fuelType}</p>
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-700 dark:text-gray-100">
                          Quantity
                        </h4>
                        <p className="text-gray-500">{order.quantity} Liters</p>
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-700 dark:text-gray-100">
                          Total Amount
                        </h4>
                        <p className="text-gray-500 font-semibold">
                          {formatCurrency(order.totalAmount)}
                        </p>
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-700 dark:text-gray-100">
                          Payment Method
                        </h4>
                        <p className="text-gray-500">{order.paymentMethod}</p>
                      </div>
                    </div>
                  </CardBody>
                </Card>

                {/* Station & Delivery Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card>
                    <CardBody>
                      <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-3 flex items-center">
                        <Fuel className="w-4 h-4 mr-2" />
                        Station Information
                      </h4>
                      <p className="text-gray-500 font-medium">
                        {order.station}
                      </p>
                      <p className="text-sm text-gray-500">
                        {order.stationAddress}
                      </p>
                    </CardBody>
                  </Card>

                  <Card>
                    <CardBody>
                      <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-3 flex items-center">
                        <MapPin className="w-4 h-4 mr-2" />
                        Delivery Address
                      </h4>
                      <p className="text-gray-500">{order.deliveryAddress}</p>
                    </CardBody>
                  </Card>
                </div>

                {/* Driver Info (if delivered) */}
                {order.status === "delivered" && order.driverName && (
                  <Card>
                    <CardBody>
                      <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-3">
                        Driver Information
                      </h4>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-gray-500">Driver Name</p>
                          <p className="text-gray-90 dark:text-gray-1000">
                            {order.driverName}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">
                            Vehicle Number
                          </p>
                          <p className="text-gray-900 dark:text-gray-100">
                            {order.vehicleNumber}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Delivered At</p>
                          <p className="text-gray-900 dark:text-gray-100">
                            {order.deliveryDate.toLocaleDateString()} at{" "}
                            {order.deliveryDate.toLocaleTimeString()}
                          </p>
                        </div>
                        {order.rating && (
                          <div>
                            <p className="text-sm text-gray-500">Your Rating</p>
                            <div className="flex items-center">
                              {getRatingStars(order.rating)}
                              <span className="ml-2 text-sm text-gray-600 dark:text-gray-100">
                                ({order.rating}/5)
                              </span>
                            </div>
                          </div>
                        )}
                      </div>
                    </CardBody>
                  </Card>
                )}

                {/* Cancellation Info */}
                {order.status === "cancelled" && (
                  <Card className="">
                    <CardBody>
                      <h4 className="font-semibold text-red-500 mb-1">
                        Cancellation Details
                      </h4>
                      <p className="text-sm text-red-500">
                        Reason: {order.cancelReason}
                      </p>
                      <p className="text-sm text-red-500">
                        Cancelled on: {order.cancelledDate.toLocaleDateString()}{" "}
                        at {order.cancelledDate.toLocaleTimeString()}
                      </p>
                      {order.refundStatus && (
                        <p className="text-sm text-red-500">
                          Refund Status: {order.refundStatus}
                        </p>
                      )}
                    </CardBody>
                  </Card>
                )}
              </div>
            </ModalBody>

            <ModalFooter>
              <div className="flex space-x-3 w-full">
                <Button
                  variant="flat"
                  color="success"
                  onPress={onClose}
                  startContent={<Receipt className="w-4 h-4" />}
                  className="flex-1"
                >
                  Download Receipt
                </Button>
                {order.status === "delivered" && (
                  <Button
                    variant="bordered"
                    color="success"
                    onPress={onClose}
                    startContent={<RotateCcw className="w-4 h-4" />}
                    className="flex-1"
                  >
                    Reorder
                  </Button>
                )}
              </div>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [dateFilter, setDateFilter] = useState("all");
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 10;

  // Mock data - replace with actual Supabase queries
  useEffect(() => {
    const mockOrders = [
      {
        id: "ORD-2024-001",
        status: "delivered",
        fuelType: "PMS (Petrol)",
        quantity: 50,
        totalAmount: 45000,
        station: "Ikeja Station",
        stationAddress: "15 Allen Avenue, Ikeja, Lagos",
        deliveryAddress: "123 Victoria Street, Lagos Island",
        orderDate: new Date("2024-03-10T14:30:00"),
        deliveryDate: new Date("2024-03-10T16:15:00"),
        driverName: "Ibrahim Mohammed",
        vehicleNumber: "ABC-123-XY",
        paymentMethod: "Card",
        rating: 5,
      },
      {
        id: "ORD-2024-002",
        status: "delivered",
        fuelType: "AGO (Diesel)",
        quantity: 100,
        totalAmount: 95000,
        station: "Victoria Island Station",
        stationAddress: "45 Ahmadu Bello Way, Victoria Island",
        deliveryAddress: "67 Surulere Street, Surulere, Lagos",
        orderDate: new Date("2024-03-08T10:15:00"),
        deliveryDate: new Date("2024-03-08T12:00:00"),
        driverName: "Aminu Kano",
        vehicleNumber: "DEF-456-ZY",
        paymentMethod: "Transfer",
        rating: 4,
      },
      {
        id: "ORD-2024-003",
        status: "cancelled",
        fuelType: "PMS (Petrol)",
        quantity: 25,
        totalAmount: 22500,
        station: "Lekki Station",
        stationAddress: "89 Lekki-Epe Expressway, Lekki",
        deliveryAddress: "45 Chevron Drive, Lekki",
        orderDate: new Date("2024-03-05T09:45:00"),
        cancelledDate: new Date("2024-03-05T10:30:00"),
        cancelReason: "Customer request",
        paymentMethod: "Card",
        refundStatus: "processed",
      },
      {
        id: "ORD-2024-004",
        status: "delivered",
        fuelType: "DPK (Kerosene)",
        quantity: 20,
        totalAmount: 18000,
        station: "Surulere Station",
        stationAddress: "23 Bode Thomas Street, Surulere",
        deliveryAddress: "12 Herbert Macaulay Way, Yaba",
        orderDate: new Date("2024-03-03T16:20:00"),
        deliveryDate: new Date("2024-03-03T17:45:00"),
        driverName: "Chinedu Okafor",
        vehicleNumber: "GHI-789-WX",
        paymentMethod: "Cash",
        rating: 5,
      },
      {
        id: "ORD-2024-005",
        status: "delivered",
        fuelType: "LPG",
        quantity: 12.5,
        totalAmount: 15000,
        station: "Ikeja Station",
        stationAddress: "15 Allen Avenue, Ikeja, Lagos",
        deliveryAddress: "78 Oregun Road, Ikeja",
        orderDate: new Date("2024-02-28T13:10:00"),
        deliveryDate: new Date("2024-02-28T14:30:00"),
        driverName: "Fatima Hassan",
        vehicleNumber: "JKL-012-VU",
        paymentMethod: "Transfer",
        rating: 4,
      },
    ];

    setTimeout(() => {
      setOrders(mockOrders);
      setFilteredOrders(mockOrders);
      setIsLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    let filtered = orders;

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(
        (order) =>
          order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
          order.fuelType.toLowerCase().includes(searchTerm.toLowerCase()) ||
          order.station.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply status filter
    if (statusFilter !== "all") {
      filtered = filtered.filter((order) => order.status === statusFilter);
    }

    // Apply date filter
    if (dateFilter !== "all") {
      const now = new Date();
      const filterDate = new Date();

      switch (dateFilter) {
        case "today":
          filterDate.setHours(0, 0, 0, 0);
          filtered = filtered.filter((order) => order.orderDate >= filterDate);
          break;
        case "week":
          filterDate.setDate(now.getDate() - 7);
          filtered = filtered.filter((order) => order.orderDate >= filterDate);
          break;
        case "month":
          filterDate.setMonth(now.getMonth() - 1);
          filtered = filtered.filter((order) => order.orderDate >= filterDate);
          break;
        case "3months":
          filterDate.setMonth(now.getMonth() - 3);
          filtered = filtered.filter((order) => order.orderDate >= filterDate);
          break;
      }
    }

    setFilteredOrders(filtered);
    setCurrentPage(1);
  }, [searchTerm, statusFilter, dateFilter, orders]);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
    }).format(amount);
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "delivered":
        return CheckCircle;
      case "cancelled":
        return XCircle;
      case "pending":
        return Clock;
      default:
        return Clock;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "delivered":
        return "text-green-600 bg-green-50";
      case "cancelled":
        return "text-red-600 bg-red-50";
      case "pending":
        return "text-yellow-600 bg-yellow-50";
      default:
        return "text-gray-600 bg-gray-50";
    }
  };

  const getRatingStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span
        key={i}
        className={`text-sm ${
          i < rating ? "text-yellow-400" : "text-gray-300"
        }`}
      >
        ★
      </span>
    ));
  };

  const statusList = [
    {
      key: "all",
      label: "All Status",
    },
    {
      key: "delivered",
      label: "Delivered",
    },
    {
      key: "cancelled",
      label: "Cancelled",
    },
    {
      key: "pending",
      label: "Pending",
    },
  ];

  const dateList = [
    {
      key: "all",
      label: "All Time",
    },
    {
      key: "today",
      label: "Today",
    },
    {
      key: "week",
      label: "Last 7 days",
    },
    {
      key: "month",
      label: "Last 30 days",
    },
    {
      key: "quarter",
      label: "Last 3 months",
    },
  ];

  // Pagination
  const totalPages = Math.ceil(filteredOrders.length / ordersPerPage);
  const startIndex = (currentPage - 1) * ordersPerPage;
  const endIndex = startIndex + ordersPerPage;
  const currentOrders = filteredOrders.slice(startIndex, endIndex);

  const {
    isOpen: isOrderOpen,
    onOpen: onOrderOpen,
    onOpenChange: onOrderChange,
  } = useDisclosure();

  const handleViewDetails = (order) => {
    setSelectedOrder(order);
    onOrderOpen();
  };

  if (isLoading) {
    return (
      <div className="min-h-screen p-6">
        <div className="max-w-7xl mx-auto">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-300 rounded w-64 mb-8"></div>
            <div className="space-y-4">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="h-24 bg-gray-300 rounded-lg"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
              Order History
            </h1>
            <p className="text-gray-500 mt-1">
              View and manage your past fuel orders
            </p>
          </div>
          <Chip color="success" variant="flat" size="lg" className="capitalize">
            {filteredOrders.length} Total Orders
          </Chip>
        </div>

        {/* Filters */}
        <Card className="mb-6">
          <CardBody>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {/* Search */}
              <div className="flex items-center">
                <Input
                  placeholder="Search orders..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  startContent={
                    <SearchIcon className="w-4 h-4 text-gray-400" />
                  }
                  className="sm:max-w-xs"
                />
              </div>

              {/* Status Filter */}
              <Select
                label="Status"
                placeholder="Filter status"
                selectedKeys={[statusFilter]}
                onSelectionChange={(keys) =>
                  setStatusFilter(Array.from(keys)[0])
                }
              >
                {statusList.map((status) => (
                  <SelectItem key={status.key} value={status.key}>
                    {status.label}
                  </SelectItem>
                ))}
              </Select>

              {/* Date Filter */}
              <Select
                label="Period"
                placeholder="Filter date"
                selectedKeys={[dateFilter]}
                onSelectionChange={(keys) => setDateFilter(Array.from(keys)[0])}
              >
                {dateList.map((date) => (
                  <SelectItem key={date.key} value={date.key}>
                    {date.label}
                  </SelectItem>
                ))}
              </Select>

              {/* Export Button */}
              <div className="flex items-center">
                <Button
                  startContent={<Download className="w-4 h-4" />}
                  variant="flat"
                  color="success"
                  className="flex-1"
                >
                  Export Statement
                </Button>
              </div>
            </div>
          </CardBody>
        </Card>

        {/* Orders List */}
        <div className="space-y-4 mb-6">
          {currentOrders.map((order) => (
            <OrderCard
              key={order.id}
              order={order}
              onViewDetails={handleViewDetails}
              getStatusIcon={getStatusIcon}
              getStatusColor={getStatusColor}
              formatCurrency={formatCurrency}
              getRatingStars={getRatingStars}
            />
          ))}
        </div>

        {/* Empty State */}
        {filteredOrders.length === 0 && (
          <div className="text-center py-12">
            <Calendar className="w-16 h-16 text-gray-500 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              No orders found
            </h3>
            <p className="text-gray-500 mb-4">
              Try adjusting your search or filter criteria
            </p>
            <button
              onClick={() => {
                setSearchTerm("");
                setStatusFilter("all");
                setDateFilter("all");
              }}
              className="text-black dark:text-white hover:text-green-800 dark:hover:text-green-600 font-medium"
            >
              Clear all filters
            </button>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center space-x-2 mt-8">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-3 py-2 border text-black dark:text-white border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
            >
              Previous
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`px-3 py-2 rounded-lg ${
                  currentPage === page
                    ? "bg-green-700 text-white dark:text-black"
                    : "border text-black dark:text-white border-gray-400 hover:bg-gray-200"
                }`}
              >
                {page}
              </button>
            ))}

            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
              className="px-3 py-2 text-black dark:text-white border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
            >
              Next
            </button>
          </div>
        )}

        {/* Order Details Modal */}
        <OrderDetailsModal
          isOpen={isOrderOpen}
          onClose={onOrderChange}
          order={selectedOrder}
          getStatusColor={getStatusColor}
          formatCurrency={formatCurrency}
          getRatingStars={getRatingStars}
        />
      </div>
    </div>
  );
};

export default OrderHistory;
