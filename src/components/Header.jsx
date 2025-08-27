"use client";

import Link from "next/link";
import React, { useState, useEffect } from "react";
import { Fuel } from "lucide-react";
import { NavLink } from "@/components/NavLink";
import { ThemeToggle } from "@/components/ThemeToggle";

export const Header = ({ isMenuOpen, setIsMenuOpen }) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out ${
          isScrolled
            ? "border-b bg-black/80 border-neutral-200 dark:border-white/10 backdrop-blur-4xl"
            : "bg-transparent"
        }`}
      >
        <nav className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo with smooth navigation */}
            <NavLink href="/" className="flex items-center space-x-3 group">
              <div className="relative">
                <Fuel className="h-8 w-8 text-emerald-400 group-hover:text-emerald-300 transition-all duration-300 group-hover:rotate-12" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-400 rounded-full animate-pulse group-hover:bg-emerald-300"></div>
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent group-hover:from-emerald-300 group-hover:to-cyan-300 transition-all duration-300">
                Negzus
              </span>
            </NavLink>

            {/* Desktop Menu */}
            <div className="hidden lg:flex items-center space-x-8">
              <NavLink
                href="#features"
                className="text-white hover:text-emerald-400 font-medium px-3 py-2 rounded-lg hover:bg-emerald-500/10"
              >
                Features
              </NavLink>
              <NavLink
                href="#how-it-works"
                className="text-white hover:text-emerald-400 font-medium px-3 py-2 rounded-lg hover:bg-emerald-500/10"
              >
                How It Works
              </NavLink>
              <NavLink
                href="#pricing"
                className="text-white hover:text-emerald-400 font-medium px-3 py-2 rounded-lg hover:bg-emerald-500/10"
              >
                Pricing
              </NavLink>
              <NavLink
                href="#testimonials"
                className="text-white hover:text-emerald-400 font-medium px-3 py-2 rounded-lg hover:bg-emerald-500/10"
              >
                Reviews
              </NavLink>
              <NavLink
                href="#cta"
                className="text-white hover:text-emerald-400 font-medium px-3 py-2 rounded-lg hover:bg-emerald-500/10"
              >
                Download
              </NavLink>
              <Link
                href="/get-started"
                className="bg-gradient-to-r from-emerald-500 to-cyan-500 text-white px-6 py-2 rounded-full hover:shadow-lg hover:shadow-emerald-500/25 font-medium hover:from-emerald-400 hover:to-cyan-400"
              >
                Get Started
              </Link>
              <ThemeToggle />
            </div>

            <div className="flex items-center lg:hidden">
              <ThemeToggle />
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-white p-2 rounded-lg hover:bg-white/10 transition-all duration-300"
              >
                <div className="relative w-6 h-6">
                  <span
                    className={`absolute block w-6 h-0.5 bg-current transition-all duration-300 ${
                      isMenuOpen ? "rotate-45 top-3" : "top-1"
                    }`}
                  ></span>
                  <span
                    className={`absolute block w-6 h-0.5 bg-current transition-all duration-300 top-3 ${
                      isMenuOpen ? "opacity-0" : ""
                    }`}
                  ></span>
                  <span
                    className={`absolute block w-6 h-0.5 bg-current transition-all duration-300 ${
                      isMenuOpen ? "-rotate-45 top-3" : "top-5"
                    }`}
                  ></span>
                </div>
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          <div
            className={`lg:hidden overflow-hidden transition-all duration-500 ease-out ${
              isMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
            }`}
          >
            <div className="mt-4 bg-black/95 rounded-2xl p-6 backdrop-blur-lg border border-white/10">
              <div className="flex flex-col space-y-4">
                <NavLink
                  href="#features"
                  onClick={closeMenu}
                  className="text-white hover:text-emerald-400 font-medium px-3 py-2 rounded-lg hover:bg-emerald-500/10"
                >
                  Features
                </NavLink>
                <NavLink
                  href="#how-it-works"
                  onClick={closeMenu}
                  className="text-white hover:text-emerald-400 font-medium px-3 py-2 rounded-lg hover:bg-emerald-500/10"
                >
                  How It Works
                </NavLink>
                <NavLink
                  href="#testimonials"
                  onClick={closeMenu}
                  className="text-white hover:text-emerald-400 font-medium px-3 py-2 rounded-lg hover:bg-emerald-500/10"
                >
                  Reviews
                </NavLink>
                <NavLink
                  href="#pricing"
                  onClick={closeMenu}
                  className="text-white hover:text-emerald-400 font-medium px-3 py-2 rounded-lg hover:bg-emerald-500/10"
                >
                  Pricing
                </NavLink>
                <Link
                  href="/get-started"
                  onClick={closeMenu}
                  className="bg-gradient-to-r from-emerald-500 to-cyan-500 text-white px-6 py-2 rounded-full hover:shadow-lg hover:shadow-emerald-500/25 font-medium hover:from-emerald-400 hover:to-cyan-400"
                >
                  Get Started
                </Link>
              </div>
            </div>
          </div>
        </nav>
      </header>
    </>
  );
};
