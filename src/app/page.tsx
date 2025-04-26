"use client";

import AgendaSheet from "@/components/agenda/AgendaSheet";
import Navbar from "@/components/navbar/Navbar";
import ContactSection from "@/components/sections/ContactSection/ContactSection";
import FAQ from "@/components/sections/FAQ/FAQ";
import Footer from "@/components/sections/Footer";
import Header from "@/components/sections/header/Header";
import HeroSection from "@/components/sections/HeroSection";
import MemorisSection from "@/components/sections/MemorisSection";
import MissionSection from "@/components/sections/MissionSection";
import RoadToLegacy from "@/components/sections/RoadToLegacy";
import SponsersSection from "@/components/sections/SponsersSection";
import VerticalTimeLine from "@/components/sections/VerticalTimeLine";

export default function Home() {
  return (
    <div className="bg-[#191b1f] text-white">
      <div className="">
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
