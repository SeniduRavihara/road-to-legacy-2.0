"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import ExportedImage from "next-image-export-optimizer";
import { BackgroundBeams } from "../ui/background-beams";

gsap.registerPlugin(ScrollTrigger);

const MissionSection = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Fade-in & slide-up animation on scroll
      gsap.from("#mission-box", {
        opacity: 0,
        y: 60,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: "#mission-box",
          start: "top 70%", // when the top of the box hits 80% of the viewport height
          toggleActions: "play reverse play reverse",
          // scrub: true,
          // markers: true,
        },
      });

      // Float animation starts only when section is visible
      gsap.to("#mission-image", {
        y: -10,
        duration: 2,
        // repeat: -1,
        // yoyo: true,
        ease: "sine.inOut",
        scrollTrigger: {
          trigger: "#mission-box",
          start: "top 80%",
          toggleActions: "play reverse play reverse",
          // scrub: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert(); // clean up animations
  }, []);

  return (
    <div ref={sectionRef} className="w-screen h-[580px] xsm:h-[380px]">
      <div className="-top-16 xsm:top-10 w-full h-[550px] xsm:h-[300px] flex flex-col items-start justify-center relative">
        <div
          id="mission-box"
          className="bg-[#2C3039] text-center xsm:text-start w-[95%] xsm:w-[80%] xsm:h-full h-[60%] rounded-e-2xl flex items-center justify-center relative flex-col"
        >
          <p className="text-white p-6 xsm:mr-32 sm:mr-28 md:mr-16">
            Our mission is to empower IT students by creating a network where
            they can stay up-to-date with the latest trends, innovations, and
            opportunities in the tech industry. We aim to bridge the gap between
            academia and industry by providing a space for networking,
            knowledge-sharing, and awareness-building about the technologies
            shaping our future.
          </p>

          <ExportedImage
            id="mission-image"
            src="/images/mission.png"
            alt="Background Pattern"
            className="w-[250px] xsm:w-[350px] z-[100] object-cover absolute -bottom-[200px] right-[50%] translate-x-[50%] xsm:-bottom-8 xsm:translate-x-0 xsm:-right-48"
            width={500}
            height={375}
          />

          <BackgroundBeams />
        </div>
      </div>
    </div>
  );
};

export default MissionSection;
