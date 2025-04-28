import NetworkBackground from "@/components/backgrounds/NetworkBackground";
import RegistrationForm from "@/components/registrationForm/RegistrationForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Register for Road to Legacy 2.0 | Secure Your Spot!",
  description:
    "Complete your registration for Sri Lanka's top IT career event — Road to Legacy 2.0. Seats are limited, register now!",
  keywords: [
    "Road to Legacy registration",
    "RTL2.0",
    "itlegacy2.0 registration",
    "IT event registration",
    "Sri Lanka IT events",
    "register Road to Legacy 2.0",
    "tech career event registration",
    "IT Legacy 2.0 signup",
    "student tech events",
  ],
  openGraph: {
    title: "Register for Road to Legacy 2.0",
    description: "Complete your registration for the ultimate IT career event!",
    url: "https://roadtolegacy.team/register", // Adjust your URL
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: "Road to Legacy Registration",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Register Now - Road to Legacy 2.0",
    description:
      "Secure your place at Sri Lanka's premier student IT career event!",
    images: ["/logo.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

const RegisterPage = () => {
  return (
    <div>
      <RegistrationForm />
      <NetworkBackground />
    </div>
  );
};

export default RegisterPage;
