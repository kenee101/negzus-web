import { FuelIcon, XIcon } from "lucide-react";
import Link from "next/link";
import { useUser, UserButton } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

export const SidebarContent = ({
  navigation,
  pathname,
  setSidebarOpen,
  showClose = false,
  collapsible = false,
}) => {
  const { user } = useUser();
  const router = useRouter();

  return (
    <div
      className={`flex grow flex-col gap-y-5 overflow-y-auto no-scrollbar bg-white dark:bg-gray-900 pb-4 shadow-lg ${
        collapsible ? "px-2 lg:px-4" : "px-6"
      }`}
    >
      <div className="flex items-center justify-between">
        <div
          className="flex h-16 shrink-0 items-center cursor-pointer"
          onClick={() => router.replace("/dashboard")}
        >
          <FuelIcon className="h-8 w-8 text-green-600" />
          <span
            className={`ml-2 text-xl font-bold text-gray-900 dark:text-gray-200 ${
              collapsible ? "hidden lg:group-hover:inline" : ""
            }`}
          >
            Negzus
          </span>
        </div>
        {showClose ? (
          <button
            type="button"
            className="-m-2.5 p-2.5 hover:bg-gray-100 dark:hover:bg-gray-500 rounded-full cursor-pointer"
            onClick={() => setSidebarOpen(false)}
          >
            <XIcon className="h-6 w-6 text-black dark:text-gray-100" />
          </button>
        ) : null}
      </div>
      <nav className="flex flex-1 flex-col">
        <ul role="list" className="flex flex-1 flex-col gap-y-4">
          <li>
            <ul role="list" className="-mx-2 space-y-1">
              {navigation.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className={`group flex items-center gap-x-3 rounded-md p-2 text-sm font-semibold ${
                      pathname === item.href
                        ? "bg-gray-400 text-gray-100"
                        : "text-gray-700 dark:text-gray-200 hover:bg-gray-400 hover:text-gray-100"
                    }`}
                  >
                    <item.icon
                      className={`h-6 w-6 shrink-0 ${
                        pathname === item.href
                          ? "text-green-700"
                          : "text-gray-400 group-hover:text-green-700"
                      }`}
                    />
                    <span
                      className={`text-gray-800 dark:text-gray-100 ${
                        collapsible ? "hidden lg:group-hover:inline" : ""
                      }`}
                    >
                      {item.name}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </li>
          <li className="mt-auto">
            <div className="flex items-center gap-x-4 py-3">
              <UserButton />
              <div
                className={`flex-1 ${
                  collapsible ? "hidden lg:group-hover:block" : ""
                }`}
              >
                <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                  {user?.firstName}
                </p>
              </div>
            </div>
          </li>
        </ul>
      </nav>
    </div>
  );
};
