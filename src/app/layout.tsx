import LoaderProvider from "@/components/LoaderProvider";
import { Toaster } from "@/components/ui/sonner";
import AuthContextProvider from "@/context/AuthContext";
import DataContextProvider from "@/context/DataContext";
import "@leenguyen/react-flip-clock-countdown/dist/index.css";
import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["400", "700"], // only the weights you need
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
      <body className={`${montserrat.variable} antialiased`}>
        <LoaderProvider>
          <DataContextProvider>
            <AuthContextProvider>{children}</AuthContextProvider>
          </DataContextProvider>
        </LoaderProvider>

        <Toaster />
      </body>
    </html>
  );
}
