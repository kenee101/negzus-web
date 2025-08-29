"use client";

import React, { useState, useEffect } from "react";
import { Fuel } from "lucide-react";
import { AnimatedBackground } from "@/components/AnimatedBackground";
import { useRouter } from "next/navigation";
import { AuthModal } from "@/components/AuthModal";
// import Spinner from "@/components/Spinner";
import { Spinner } from "@heroui/react";
import Link from "next/link";
import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import { useUser } from "@clerk/nextjs";

// Main Component
export default function NegzusAuth() {
  const router = useRouter();
  const { user, isSignedIn, isLoaded } = useUser();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showDownloadSection, setShowDownloadSection] = useState(false);

  const handleAuthSuccess = () => {
    setShowAuthModal(false);
    setShowDownloadSection(true);
  };

  useEffect(() => {
    if (isLoaded && isSignedIn) {
      router.push("/dashboard");
    }
  }, [isLoaded, isSignedIn]);

  if (user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Spinner size="lg" color="success" />;
      </div>
    );
  }

  // useEffect(() => {
  //   if (showDownloadSection) {
  //     router.push("/downloads");
  //   }
  // }, [showDownloadSection, router]);

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center relative">
      <AnimatedBackground />

      <div className="text-center relative z-10 px-6">
        <div className="flex items-center justify-center space-x-3 mb-8">
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="relative">
              <Fuel className="h-12 w-12 text-emerald-400" />
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-400 rounded-full animate-pulse"></div>
            </div>
            <span className="text-4xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
              Negzus
            </span>
          </Link>
        </div>

        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            Smart Fuel Management
          </span>
          <br />
          <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
            Made Simple
          </span>
        </h1>

        <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
          Join thousands of smart drivers who never run out of fuel again
        </p>

        <div className="flex space-x-16 items-center justify-center">
          {isLoaded ? (
            <>
              <SignedOut>
                <SignInButton>
                  <button className="bg-gradient-to-r from-emerald-400 to-cyan-800 text-white rounded-full font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 cursor-pointer">
                    Sign In
                  </button>
                </SignInButton>
                <SignUpButton>
                  <button className="bg-gradient-to-r from-emerald-400 to-cyan-800 text-white rounded-full font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 cursor-pointer">
                    Sign Up
                  </button>
                </SignUpButton>
              </SignedOut>

              <SignedIn>
                <UserButton />
              </SignedIn>
            </>
          ) : (
            <Spinner color="success" />
          )}
        </div>
      </div>

      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        onSuccess={handleAuthSuccess}
      />
    </div>
  );
}
