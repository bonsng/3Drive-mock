import type { Metadata } from "next";
import "./globals.css";
import GlobalNav from "@/ui/Components/global-nav";
import Providers from "@/ui/providers";
import React from "react";
import { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
  title: "3Drive",
  description: "3D Cloud Storage Service",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`antialiased dark:text-white text-white overflow-y-hidden`}
      >
        <Toaster position="bottom-center" />
        <Providers>
          <GlobalNav />
          {children}
        </Providers>
      </body>
    </html>
  );
}
