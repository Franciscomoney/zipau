import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Zipa | Stablecoin Bank for IP-Backed Investments",
  description:
    "Invest globally with USDT/USDC in projects backed by intellectual property. Acquire real equity shares, receive quarterly dividends. No banks, no borders, instant settlement.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[--background] text-[--foreground]`}
      >
        {children}
      </body>
    </html>
  );
}
