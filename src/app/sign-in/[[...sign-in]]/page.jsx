"use client";

import { SignedIn, SignIn } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { useUser } from "@clerk/nextjs";
import { Spinner } from "@heroui/react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Page() {
  // const { isSignedIn, user, isLoaded } = useUser();
  // const router = useRouter();

  // useEffect(() => {
  //   if (isSignedIn && user) return router.push("/dashboard");
  // }, []);

  // if (!isLoaded) {
  //   return (
  //     <div className="flex flex-1 items-center justify-center min-h-screen">
  //       <Spinner color="success" />
  //     </div>
  //   );
  // }

  // if (!isSignedIn) {
  //   return <div>Sign in to view this page</div>;
  // }

  return (
    <div className="min-h-screen flex items-center justify-center bg-black p-4">
      <SignIn
        appearance={{
          theme: dark,
          elements: {
            formButtonPrimary:
              "bg-gradient-to-r from-emerald-700 to-cyan-800 text-white",
            // card: "bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-lg border-white/10",
            // headerTitle: "text-white",
            // headerSubtitle: "text-gray-400",
            // socialButtonsBlockButton:
            //   "bg-gray-700 hover:bg-gray-600 text-white",
            // footerActionText: "text-gray-400",
            // footerActionLink: "text-emerald-400 hover:text-emerald-300",
          },
        }}
      />
    </div>
  );
}
