import Uni3Section from "@/components/Uni3Section";
import Footer from "@/components/sections/Footer";
import Header from "@/components/sections/Header";
import HeroSection from "@/components/sections/HeroSection";
import VerticalTimeLine from "@/components/sections/VerticalTimeLine";
import TestaimonialSection from "@/components/sections/testaimonials/TestaimonialSection";

export default function Home() {
  return (
    <div className="bg-[#191b1f] text-white">
      <Header />

      <HeroSection />

      <VerticalTimeLine />

      <Uni3Section />

      <TestaimonialSection />

     

      <Footer />
    </div>
  );
}
