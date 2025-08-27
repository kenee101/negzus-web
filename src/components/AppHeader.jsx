"use client";

import { useState } from "react";
import { MenuIcon, BellIcon, FuelIcon, XIcon } from "lucide-react";
import { Badge, Button } from "@heroui/react";
import { ThemeToggle } from "./ThemeToggle";

export default function Header({ setSidebarOpen }) {
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  // Sample notifications - replace with real data
  const notifications = [
    {
      id: 1,
      title: "Payment Successful",
      message: "Your payment of $50 has been processed successfully.",
      time: "2 minutes ago",
      type: "success",
    },
    {
      id: 2,
      title: "New Transaction",
      message: "A new transaction of $25 has been added to your wallet.",
      time: "1 hour ago",
      type: "info",
    },
    {
      id: 3,
      title: "Low Balance Alert",
      message: "Your wallet balance is below $10. Consider topping up.",
      time: "3 hours ago",
      type: "warning",
    },
    {
      id: 4,
      title: "Account Update",
      message: "Your profile information has been updated successfully.",
      time: "1 day ago",
      type: "info",
    },
    {
      id: 5,
      title: "Security Alert",
      message: "New login detected from a new device.",
      time: "2 days ago",
      type: "warning",
    },
  ];

  return (
    <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-900 px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
      <button
        type="button"
        className="-m-2.5 p-2.5 text-gray-700 dark:text-white lg:hidden"
        onClick={() => setSidebarOpen(true)}
      >
        <MenuIcon className="h-6 w-6" />
      </button>

      <div className="h-6 w-px bg-gray-900/10 dark:bg-white/10 lg:hidden" />

      <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
        <div className="relative flex flex-1"></div>
        <div className="flex items-center gap-x-4 lg:gap-x-6">
          <div className="relative">
            <Badge content={notifications.length} color="danger">
              <Button
                isIconOnly
                variant="light"
                onPress={() => setNotificationsOpen(!notificationsOpen)}
              >
                <BellIcon className="h-6 w-6" />
              </Button>
            </Badge>

            {/* Notifications Dropdown */}
            {notificationsOpen && (
              <div className="absolute right-0 top-full mt-2 w-80 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-50">
                <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Notifications
                  </h3>
                  <button
                    onClick={() => setNotificationsOpen(false)}
                    className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                  >
                    <XIcon className="h-5 w-5" />
                  </button>
                </div>

                <div className="max-h-96 overflow-y-auto no-scrollbar">
                  {notifications.length > 0 ? (
                    <div className="p-2">
                      {notifications.map((notification) => (
                        <div
                          key={notification.id}
                          className="p-3 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors cursor-pointer"
                        >
                          <div className="flex items-start gap-3">
                            <div
                              className={`w-2 h-2 rounded-full mt-2 ${
                                notification.type === "success"
                                  ? "bg-green-700"
                                  : notification.type === "warning"
                                  ? "bg-yellow-700"
                                  : "bg-blue-700"
                              }`}
                            />
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                                {notification.title}
                              </p>
                              <p className="text-sm text-gray-600 dark:text-gray-300 mt-1 line-clamp-2">
                                {notification.message}
                              </p>
                              <p className="text-xs text-gray-400 dark:text-gray-500 mt-2">
                                {notification.time}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="p-4 text-center text-gray-500 dark:text-gray-400">
                      No notifications
                    </div>
                  )}
                </div>

                {notifications.length > 0 && (
                  <div className="p-3 border-t border-gray-200 dark:border-gray-700">
                    <button className="w-full text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium">
                      Mark all as read
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
          <ThemeToggle />
        </div>
      </div>
    </div>
  );
}
