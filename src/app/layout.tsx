"use client";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import React from "react";
import { LocalityProvider } from "../context/LocalityContext";

import { QueryClient, QueryClientProvider, useQuery } from "react-query";
import Search_Section from "./Components/HomePage/Search_Section";

const inter = Inter({ subsets: ["latin"] });

// export const metadata: Metadata = {
//   title: "Create Next App",
//   description: "Generated by create next app",
// };

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const queryClient = new QueryClient();
  return (
    <html lang="en">
      <QueryClientProvider client={queryClient}>
        <body className={inter.className}>
          <LocalityProvider>{children}</LocalityProvider>
        </body>
      </QueryClientProvider>
    </html>
  );
}
