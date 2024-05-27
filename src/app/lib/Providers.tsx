"use client";

import { NextUIProvider } from "@nextui-org/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { usePathname } from "next/navigation";
import React, { useEffect } from "react";
import { Toaster } from "sonner";
import { refreshTokenGen } from "../(WithCommonLayout)/actions/auth";
import { AuthProvider } from "./AuthProviders";
import { Provider } from "react-redux";
import { store } from "../redux/store";
const Providers = ({ children }: { children: React.ReactNode }) => {
  const location = usePathname();

  useEffect(() => {
    refreshTokenGen();
  }, [location]);
  return (
    <React.Fragment>
      <Provider store={store}>
        <NextUIProvider>
          <NextThemesProvider attribute="class" defaultTheme="dark">
            <Toaster />
            <AuthProvider> {children}</AuthProvider>
          </NextThemesProvider>
        </NextUIProvider>
      </Provider>
    </React.Fragment>
  );
};

export default Providers;
