"use client";

import React, { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  ShoppingCart,
  Users,
  Fuel,
  Calendar,
  Filter,
} from "lucide-react";
import { Card, CardBody, Select, SelectItem } from "@heroui/react";

const Analytics = () => {
  const [timeRange, setTimeRange] = useState("7d");
  const [isLoading, setIsLoading] = useState(true);

  // Mock data - replace with actual Supabase queries
  const [analyticsData, setAnalyticsData] = useState({
    summary: {
      totalRevenue: 2450000000,
      revenueChange: 12.5,
      totalOrders: 1234,
      ordersChange: -3.2,
      totalCustomers: 856,
      customersChange: 8.7,
      avgOrderValue: 45000,
      avgOrderChange: 15.3,
    },
    revenueData: [
      { day: "Mon", revenue: 320000, orders: 45 },
      { day: "Tue", revenue: 280000, orders: 38 },
      { day: "Wed", revenue: 450000, orders: 62 },
      { day: "Thu", revenue: 390000, orders: 55 },
      { day: "Fri", revenue: 520000, orders: 73 },
      { day: "Sat", revenue: 680000, orders: 92 },
      { day: "Sun", revenue: 310000, orders: 41 },
    ],
    fuelTypesData: [
      { name: "PMS (Petrol)", value: 45, color: "#000" },
      { name: "AGO (Diesel)", value: 30, color: "#0b11b1" },
      { name: "DPK (Kerosene)", value: 15, color: "#08720a" },
      { name: "LPG", value: 10, color: "#F59E0B" },
    ],
    topStations: [
      { name: "Ikeja Station", orders: 245, revenue: 890000 },
      { name: "Victoria Island", orders: 189, revenue: 750000 },
      { name: "Lekki Phase 1", orders: 167, revenue: 650000 },
      { name: "Surulere", orders: 134, revenue: 520000 },
    ],
  });

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => setIsLoading(false), 1200);
    return () => clearTimeout(timer);
  }, [timeRange]);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
    }).format(amount);
  };

  const duration = [
    {
      key: "7d",
      label: "Last 7 days",
    },
    {
      key: "30d",
      label: "Last 30 days",
    },
    {
      key: "90d",
      label: "Last 90 days",
    },
  ];

  const StatCard = ({ title, value, change, icon: Icon, isLoading }) => (
    <Card>
      <CardBody>
        <div className="flex items-center gap-x-2 justify-between p-2 overflow-x-auto no-scrollbar">
          <div className="">
            <p className="text-sm font-medium text-gray-600 dark:text-gray-100">
              {title}
            </p>
            {isLoading ? (
              <div className="h-8 bg-gray-200 rounded animate-pulse mt-2 w-24"></div>
            ) : (
              <div className="text-wrap break-words">
                <p className="text-2xl font-bold break-words whitespace-normal line-clamp-2 text-gray-900 dark:text-gray-100 mt-1">
                  {value}
                </p>
              </div>
            )}
          </div>
        </div>
        {!isLoading && (
          <div className="flex justify-between items-center">
            <div className="flex">
              {change >= 0 ? (
                <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
              ) : (
                <TrendingDown className="h-4 w-4 text-red-500 mr-1" />
              )}
              <span
                className={`text-sm font-medium ${
                  change >= 0 ? "text-green-600" : "text-red-600"
                }`}
              >
                {Math.abs(change)}% from last period
              </span>
            </div>
            <div className="bg-violet-50 p-3 rounded-lg">
              <Icon className="h-6 w-6 text-violet-600" />
            </div>
          </div>
        )}
      </CardBody>
    </Card>
  );

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
              Analytics
            </h1>
            <p className="text-gray-500 mt-1">
              Monitor your gas station performance
            </p>
          </div>
          <div className="flex items-center space-x-3">
            <Select
              label="Timeline"
              placeholder="Select period"
              className="w-36"
              selectedKeys={[timeRange]}
              onSelectionChange={(keys) => setTimeRange(Array.from(keys)[0])}
            >
              {duration.map((time) => (
                <SelectItem key={time.key} value={time.key}>
                  {time.label}
                </SelectItem>
              ))}
            </Select>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Total Revenue"
            value={formatCurrency(analyticsData.summary.totalRevenue)}
            change={analyticsData.summary.revenueChange}
            icon={DollarSign}
            isLoading={isLoading}
          />
          <StatCard
            title="Total Orders"
            value={analyticsData.summary.totalOrders.toLocaleString()}
            change={analyticsData.summary.ordersChange}
            icon={ShoppingCart}
            isLoading={isLoading}
          />
          <StatCard
            title="Total Customers"
            value={analyticsData.summary.totalCustomers.toLocaleString()}
            change={analyticsData.summary.customersChange}
            icon={Users}
            isLoading={isLoading}
          />
          <StatCard
            title="Avg. Order Value"
            value={formatCurrency(analyticsData.summary.avgOrderValue)}
            change={analyticsData.summary.avgOrderChange}
            icon={Fuel}
            isLoading={isLoading}
          />
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardBody>
              {/* Revenue Chart */}
              <div className="flex justify-between items-center p-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                  Revenue Trend
                </h3>
                <div className="text-sm text-gray-500 dark:text-gray-100">
                  Last 7 days
                </div>
              </div>
              {isLoading ? (
                <div className="h-80 bg-gray-100 rounded-lg animate-pulse"></div>
              ) : (
                <ResponsiveContainer
                  width="100%"
                  height={300}
                  className={`overflow-hidden no-scrollbar`}
                >
                  <LineChart data={analyticsData.revenueData}>
                    <CartesianGrid strokeDasharray="2 3" stroke="#f0f0f0" />
                    <XAxis
                      dataKey="day"
                      axisLine={true}
                      tickLine={true}
                      tick={{ fill: "#696ba5", fontSize: 14 }}
                    />
                    <YAxis
                      axisLine={true}
                      tickLine={true}
                      tick={{ fill: "#696ba5", fontSize: 14 }}
                      tickFormatter={(value) => `₦${value / 1000}k`}
                    />
                    <Tooltip
                      formatter={(value) => [formatCurrency(value), "Revenue"]}
                      labelStyle={{ color: "#4aed80" }}
                      contentStyle={{
                        backgroundColor: "#02041d",
                        border: "none",
                        borderRadius: "8px",
                        boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                      }}
                    />
                    <Line
                      type="monotone"
                      dataKey="revenue"
                      stroke="#4aed80"
                      strokeWidth={3}
                      dot={{ fill: "#05140c", r: 6 }}
                      activeDot={{ r: 8, fill: "#fff" }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              )}
            </CardBody>
          </Card>

          {/* Fuel Types Distribution */}
          <Card>
            <CardBody>
              <div className="flex justify-between items-center p-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                  Fuel Types Distribution
                </h3>
                <div className="text-sm text-gray-500 dark:text-gray-100">
                  By orders
                </div>
              </div>
              {isLoading ? (
                <div className="h-80 bg-gray-100 rounded-lg animate-pulse"></div>
              ) : (
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={analyticsData.fuelTypesData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={120}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {analyticsData.fuelTypesData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => [`${value}%`, "Share"]} />
                    <Legend
                      verticalAlign="bottom"
                      height={36}
                      iconType="circle"
                      wrapperStyle={{ paddingTop: "20px" }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              )}
            </CardBody>
          </Card>

          {/* Orders Chart */}
          <Card>
            <CardBody>
              <div className="flex justify-between items-center p-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                  Daily Orders
                </h3>
                <div className="text-sm text-gray-500 dark:text-gray-100">
                  Orders count per day
                </div>
              </div>
              {isLoading ? (
                <div className="h-80 bg-gray-100 rounded-lg animate-pulse"></div>
              ) : (
                <ResponsiveContainer
                  width="100%"
                  height={300}
                  className={`overflow-hidden no-scrollbar`}
                >
                  <BarChart
                    data={analyticsData.revenueData}
                    barSize={40}
                    margin={{
                      top: 5,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="2 3" stroke="#f0f0f0" />
                    <XAxis
                      dataKey="day"
                      axisLine={true}
                      tickLine={true}
                      tick={{ fill: "#696ba5", fontSize: 14 }}
                      scale="point"
                      padding={{ left: 30, right: 40 }}
                    />
                    <YAxis
                      axisLine={true}
                      tickLine={true}
                      tick={{ fill: "#696ba5", fontSize: 14 }}
                    />
                    <Tooltip
                      formatter={(value) => [value, "Orders"]}
                      labelStyle={{ color: "#4aed80" }}
                      contentStyle={{
                        backgroundColor: "#02041d",
                        border: "none",
                        borderRadius: "8px",
                        boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                      }}
                    />
                    <Bar
                      dataKey="orders"
                      fill="#4aed80"
                      radius={[4, 4, 0, 0]}
                      // background={{ fill: "#eee" }}
                    />
                  </BarChart>
                </ResponsiveContainer>
              )}
            </CardBody>
          </Card>

          {/* Top Performing Stations */}
          <Card>
            <CardBody className="p-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
                Top Performing Stations
              </h3>
              {isLoading ? (
                <div className="space-y-4">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="h-16 bg-gray-100 rounded-lg animate-pulse"
                    ></div>
                  ))}
                </div>
              ) : (
                <div className="space-y-4">
                  {analyticsData.topStations.map((station, index) => (
                    <div
                      key={station.name}
                      className="flex items-center justify-between p-4 bg-gray-50 dark:bg-white/10 rounded-lg hover:bg-gray-100 transition-colors duration-200"
                    >
                      <div className="flex items-center space-x-4">
                        <div className="w-8 h-8 bg-violet-100 rounded-full flex items-center justify-center">
                          <span className="text-sm font-semibold text-green-700">
                            #{index + 1}
                          </span>
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900 dark:text-gray-100">
                            {station.name}
                          </h4>
                          <p className="text-sm text-gray-400">
                            {station.orders} orders
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-gray-900 dark:text-gray-100">
                          {formatCurrency(station.revenue)}
                        </p>
                        <p className="text-sm text-gray-400">Revenue</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
