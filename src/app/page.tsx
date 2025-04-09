"use client";

import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/sections/Footer";
import Header from "@/components/sections/header/Header";
import HeroSection from "@/components/sections/HeroSection";
import MissionSection from "@/components/sections/MissionSection";
import RoadToLegacy from "@/components/sections/RoadToLegacy";
import SessionsStack from "@/components/sections/sessionsStack/SessionsStack";
import SpeakerSection from "@/components/sections/speakerSection/SpeakerSection";
import TestaimonialSection from "@/components/sections/testaimonials/TestaimonialSection";
import Uni3Section from "@/components/sections/uni3Section/Uni3Section";

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

      <div className="relative " id="about">
        <Uni3Section />
      </div>

      <MissionSection />

      <SessionsStack />

      <SpeakerSection />

      <TestaimonialSection />



      <Footer />

      <div className="fixed bottom-5 left-1/2 transform -translate-x-1/2 z-[1000]">
        <Navbar />
      </div>
    </div>
  );
}
