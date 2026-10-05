import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans, Playfair_Display } from "next/font/google";
import "./globals.css";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  title: "Aurevia™ | Luxury Salon Management, Scheduling & Beauty SaaS Platform",
  description:
    "The all-in-one scheduling, CRM, and salon operations platform built for luxury hair salons, spas, and beauty businesses. Salon management, reimagined.",
  keywords: [
    "salon booking software",
    "salon management software",
    "hair salon scheduling",
    "spa appointment software",
    "salon CRM",
    "Aurevia",
    "luxury salon SaaS",
  ],
  authors: [{ name: "Aurevia" }],
};

import { AuthProvider } from "@/context/AuthContext";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${plusJakartaSans.variable} ${playfairDisplay.variable} scroll-smooth`}
    >
      <body className="min-h-screen bg-[#0B0C10] text-[#1A1A24] antialiased selection:bg-[#E6397A] selection:text-white">
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
