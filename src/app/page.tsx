"use client";

import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/sections/Footer";
import Header from "@/components/sections/header/Header";
import HeroSection from "@/components/sections/HeroSection";
import RoadToLegacy from "@/components/sections/RoadToLegacy";
import SessionsStack from "@/components/sections/sessionsStack/SessionsStack";
import TestaimonialSection from "@/components/sections/testaimonials/TestaimonialSection";
import Uni3Section from "@/components/sections/uni3Section/Uni3Section";

export default function Home() {
  return (
    <div className="bg-[#191b1f] text-white">
      {/* <div className="grid-overlay test"></div> */}
      {/* <HighlightGrid /> */}
      {/* <HighlightedMesh /> */}

      <div className="h-screen">
        <Header />
        <HeroSection />
      </div>

      <div id="begin" className="pt-2">
        <RoadToLegacy />
        <SessionsStack />
      </div>

      <div className="relative " id="about">
        <Uni3Section />
        <TestaimonialSection />
        {/* <Spotlight /> */}
        {/* <StarsCanvas /> */}
      </div>

      <Footer />

      <div className="fixed bottom-5 left-1/2 transform -translate-x-1/2 z-[1000]">
        <Navbar />
      </div>
    </div>
  );
}
