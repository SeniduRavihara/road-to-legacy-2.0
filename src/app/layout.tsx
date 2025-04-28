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
  metadataBase: new URL("https://roadtolegacy.team/"),
  title: "Road to Legacy 2.0",
  description:
    "Join Road to Legacy 2.0, the transformative IT career event in Sri Lanka. Connect with experts, explore hands-on workshops, and shape your tech future with insights from top universities.",
  keywords: [
    "Road to Legacy",
    "IT Legacy",
    "RTL",
    "IT Legacy 2.0",
    "IT Legacy 2025",
    "RTL 2.0",
    "Legacy 2.0",
    "ITLegacy",
    "IT career event",
    "Sri Lanka events",
    "university workshops",
    "tech networking",
    "career guidance",
    "student IT events",
    "tech events Sri Lanka",
  ],
  openGraph: {
    title: "Road to Legacy 2.0",
    description:
      "Join the biggest IT career event in Sri Lanka. Workshops, networking, and expert guidance await you!",
    url: "https://roadtolegacy.team",
    siteName: "Road to Legacy",
    images: [
      {
        url: "/logo.png", // make sure you add a good image for social sharing
        width: 1200,
        height: 630,
        alt: "Road to Legacy Event Poster",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Road to Legacy 2.0",
    description:
      "Sri Lanka's biggest student IT career event. Explore, learn, and connect at Road to Legacy 2.0!",
    images: ["/logo.png"], // same image
  },
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
