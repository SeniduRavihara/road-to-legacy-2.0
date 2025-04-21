import LoaderProvider from "@/components/LoaderProvider";
import { Toaster } from "@/components/ui/sonner";
import AuthContextProvider from "@/context/AuthContext";
import DataContextProvider from "@/context/DataContext";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Script from "next/script";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "@leenguyen/react-flip-clock-countdown/dist/index.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "RoadToLegacy",
  description:
    "Road to Legacy 2.0 is a transformative IT career event uniting top universities in Sri Lanka. Explore industry insights, hands-on sessions, and expert guidance to shape your future in tech.",
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* Load three.js before Vanta.js */}
        <Script
          src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r134/three.min.js"
          strategy="beforeInteractive"
        />
        <Script
          src="https://cdn.jsdelivr.net/npm/vanta/dist/vanta.birds.min.js"
          strategy="lazyOnload"
        />
        
        <LoaderProvider>
          <DataContextProvider>
            <AuthContextProvider>
              {children}
            </AuthContextProvider>
          </DataContextProvider>
        </LoaderProvider>

        <Toaster />
      </body>
    </html>
  );
}
