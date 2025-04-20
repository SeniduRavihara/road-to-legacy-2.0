"use client";

import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";
import Tilt from "react-parallax-tilt";
import { BackgroundBeams } from "../ui/background-beams";

gsap.registerPlugin(ScrollTrigger);

const RoadToLegacy = () => {
  const boxRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(boxRef.current, {
        opacity: 0,
        y: 40,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: boxRef.current,
          start: "top 80%",
          toggleActions: "play none none none", // replay on re-enter
          // markers: true, // uncomment for debugging
        },
      });
    }, boxRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="w-full flex items-center justify-center" ref={boxRef}>
      <Tilt
        tiltMaxAngleX={5} // Reduce X-axis tilt
        tiltMaxAngleY={5} // Reduce Y-axis tilt
        scale={1.02} // Slight scale effect on hover
        transitionSpeed={200} // Smoother transition
        className="relative w-[80%] rounded-xl m-5 bg-[#1F2227] border-none flex items-center justify-center text-white text-lg font-semibold text-center p-6"
      >
        <p className="text-sm opacity-80">
          IT Legacy connects IT students from UOM, USJ, and UOC, fostering
          collaboration, networking, and professional growth. Our platform
          unites tech enthusiasts, keeping them informed and engaged with the
          evolving industry.
        </p>
        <BackgroundBeams />
      </Tilt>
    </div>
  );
};

export default RoadToLegacy;
