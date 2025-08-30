"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import { type ThemeProviderProps } from "next-themes";
import { HeroUIProvider } from "@heroui/react";
import { ToastProvider } from "@heroui/toast";

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return (
    <NextThemesProvider {...props}>
      <HeroUIProvider>
        <ToastProvider placement="top-right" toastOffset={70} />
        {children}
      </HeroUIProvider>
    </NextThemesProvider>
  );
}
