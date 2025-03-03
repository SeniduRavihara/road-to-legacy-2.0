"use client";

import Uni3Section from "@/components/Uni3Section";
import Footer from "@/components/sections/Footer";
import Header from "@/components/sections/Header";
import HeroSection from "@/components/sections/HeroSection";
import RoadToLegacy from "@/components/sections/RoadToLegacy";
import VerticalTimeLine from "@/components/sections/VerticalTimeLine";
import TestaimonialSection from "@/components/sections/testaimonials/TestaimonialSection";

export default function Home() {
  return (
    <div className="bg-[#191b1f] text-white">
      {/* <video
        className="video"
        autoPlay
        loop
        muted
        poster=""
        role="none"
      >
        <source
          src="https://raw.githubusercontent.com/mobalti/open-props-interfaces/main/dynamic-content-lockups-v2/assets/bg-gradient-animation.mp4"
          type="video/mp4"
        />
      </video> */}
      {/* <div className="grid-overlay test"></div> */}
      {/* <HighlightGrid /> */}
      {/* <HighlightedMesh /> */}

      <Header />

      <HeroSection />

      <RoadToLegacy />

      <VerticalTimeLine />

      <div className="bg-whit ">
        <Uni3Section />
      </div>

      <TestaimonialSection />

      <Footer />
    </div>
  );
}
