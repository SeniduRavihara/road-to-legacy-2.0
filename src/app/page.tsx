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

      <div className="md:h-[450px] h-[400px]">
        <MemorisSection />
      </div>

      <VerticalTimeLine />

      <AgendaSheet>
        <div className="w-screen relative -top-20 md:-top-5 flex justify-center">
          <h1 className="text-white bg-[#262930] px-6 py-3 rounded-full shadow-lg text-xl font-bold hover:bg-[#333] transition duration-300 cursor-pointer">
            Full Agenda
          </h1>
        </div>
      </AgendaSheet>

      {/* <SessionsStack /> */}

      {/* <SpeakerSection /> */}

      <FAQ />

      {/* <TestaimonialSection /> */}

      <ContactSection />

      <Footer />

      <div className="fixed bottom-5 left-1/2 transform -translate-x-1/2 z-[1000]">
        <Navbar />
      </div>
    </div>
  );
}
