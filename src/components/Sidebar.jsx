// components/Sidebar.js
"use client";
import { Fragment } from "react";
import { Dialog, DialogPanel, Transition } from "@headlessui/react";
import {
  HomeIcon,
  ChartBarIcon,
  ClockIcon,
  FileTextIcon,
  WalletIcon,
  CreditCardIcon,
  SettingsIcon,
} from "lucide-react";
import { usePathname } from "next/navigation";
import { SidebarContent } from "./SidebarContent";

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: HomeIcon },
  { name: "Analytics", href: "/analytics", icon: ChartBarIcon },
  { name: "Track Orders", href: "/orders/tracking", icon: ClockIcon },
  {
    name: "Order History",
    href: "/orders/history",
    icon: FileTextIcon,
  },
  { name: "Wallet", href: "/wallet", icon: WalletIcon },
  {
    name: "Transactions",
    href: "/transactions",
    icon: CreditCardIcon,
  },
  { name: "Settings", href: "/settings", icon: SettingsIcon },
];

export default function Sidebar({ sidebarOpen, setSidebarOpen }) {
  const pathname = usePathname();

  return (
    <>
      {/* Mobile sidebar */}
      <Transition show={sidebarOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-50 lg:hidden"
          open={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        >
          <div className="fixed inset-0 z-50">
            <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
            <div className="fixed inset-y-0 left-0 flex max-w-full">
              <DialogPanel className="relative flex w-80 max-w-xs flex-1">
                <SidebarContent
                  navigation={navigation}
                  pathname={pathname}
                  setSidebarOpen={setSidebarOpen}
                  showClose={true}
                />
              </DialogPanel>
            </div>
          </div>
        </Dialog>
      </Transition>

      {/* Static sidebar for desktop (in-flow, not overlaying) */}
      <div className="hidden lg:sticky lg:top-0 lg:h-screen lg:flex lg:flex-col lg:w-16 lg:hover:w-72 transition-[width] duration-300 ease-in-out group">
        <SidebarContent
          navigation={navigation}
          pathname={pathname}
          setSidebarOpen={setSidebarOpen}
          showClose={false}
          collapsible={true}
        />
      </div>
    </>
  );
}
