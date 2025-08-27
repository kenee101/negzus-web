"use client";

import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/AppHeader";
import { useAuth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

export default function DashboardLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { isLoaded, userId } = useAuth();

  if (isLoaded && !userId) {
    redirect("/sign-in");
  }

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header setSidebarOpen={setSidebarOpen} />
        <main className="flex-1 overflow-x-hidden overflow-y-auto border-l border-gray-100 lg:dark:border-gray-600 p-6 no-scrollbar">
          {children}
        </main>
      </div>
    </div>
  );
}
