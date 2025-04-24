"use client";

import AgendaSheet from "@/components/agenda/AgendaSheet";
import FAQ from "@/components/sections/FAQ/FAQ";
import Navbar from "@/components/navbar/Navbar";
import ContactSection from "@/components/sections/ContactSection/ContactSection";
import Footer from "@/components/sections/Footer";
import Header from "@/components/sections/header/Header";
import HeroSection from "@/components/sections/HeroSection";
import MemorisSection from "@/components/sections/MemorisSection";
import MissionSection from "@/components/sections/MissionSection";
import RoadToLegacy from "@/components/sections/RoadToLegacy";
import VerticalTimeLine from "@/components/sections/VerticalTimeLine";
import SponsersSection from "@/components/sections/SponsersSection";

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

      {/* <div className="relative " id="about">
        <Uni3Section />
      </div> */}

      <MissionSection />

      {/* <RTLBanner /> */}

      <div className="md:h-[450px] h-[500px] xsm:h-[400px] mt-20 mb-20">
        <MemorisSection />
      </div>

      <VerticalTimeLine />

      <div className="flex items-center justify-center w-full relative -top-6">
        <AgendaSheet />
      </div>

      {/* <SessionsStack /> */}

      {/* <SpeakerSection /> */}

      <FAQ />

      {/* <TestaimonialSection /> */}

      <ContactSection />

      <SponsersSection />

      <Footer />

      <div className="fixed bottom-5 left-1/2 transform -translate-x-1/2 z-[1000]">
        <Navbar />
      </div>
    </div>
  );
}
