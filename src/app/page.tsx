"use client";

import dynamic from "next/dynamic";

// 🧠 Direct imports for first view
import Navbar from "@/components/navbar/Navbar";
import Header from "@/components/sections/header/Header";
import HeroSection from "@/components/sections/hero-section/HeroSection";

// 🧠 Lazy (dynamic) imports for other sections
const RoadToLegacy = dynamic(
  () => import("@/components/sections/road-to-legacy/RoadToLegacy")
);
const MissionSection = dynamic(
  () => import("@/components/sections/mission-section/MissionSection")
);
const MemorisSection = dynamic(
  () => import("@/components/sections/MemorisSection")
);
const VerticalTimeLine = dynamic(
  () => import("@/components/sections/VerticalTimeLine")
);
const AgendaSheet = dynamic(() => import("@/components/agenda/AgendaSheet"));
const FAQ = dynamic(() => import("@/components/sections/FAQ/FAQ"));
const ContactSection = dynamic(
  () => import("@/components/sections/contact-section/ContactSection")
);
const SponsersSection = dynamic(
  () => import("@/components/sections/SponsersSection")
);
const Footer = dynamic(() => import("@/components/sections/Footer"));

export default function Home() {
  return (
    <div className="bg-[#191b1f] text-white">
      <div>
        <Header />
        <HeroSection />
      </div>

      <div id="begin" className="pt-2">
        <RoadToLegacy />
      </div>

      <MissionSection />

      <div className="md:h-[450px] h-[500px] xsm:h-[400px] mt-20 mb-20">
        <MemorisSection />
      </div>

      <VerticalTimeLine />

      <div className="flex items-center justify-center w-full relative -top-6">
        <AgendaSheet />
      </div>

      <FAQ />
      <ContactSection />
      <SponsersSection />
      <Footer />

      <div className="fixed bottom-5 left-1/2 transform -translate-x-1/2 z-[1000]">
        <Navbar />
      </div>
    </div>
  );
}
