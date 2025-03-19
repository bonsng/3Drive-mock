import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "3Drive",
  description: "3D Cloud Storage Service",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
