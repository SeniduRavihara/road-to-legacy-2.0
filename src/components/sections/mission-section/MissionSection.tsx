"use client";

import { useEffect, useRef, useState } from "react";
import ExportedImage from "next-image-export-optimizer";
import { BackgroundBeams } from "../../ui/background-beams";
import { motion } from "framer-motion";
import "./MissionSection.css"

const MissionSection = () => {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Create intersection observer to detect when the section is visible
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
          observer.disconnect(); // Only need to trigger once
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const textVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.5,
      },
    },
  };

  const wordVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: "easeOut",
      },
    },
  };

  const missionText =
    "Our mission is to empower IT students by creating a network where they can stay up-to-date with the latest trends, innovations, and opportunities in the tech industry. We aim to bridge the gap between academia and industry by providing a space for networking, knowledge-sharing, and awareness-building about the technologies shaping our future.";
  const words = missionText.split(" ");

  // Create decorative dots grid
  const createDots = () => {
    const dots = [];
    for (let i = 0; i < 20; i++) {
      for (let j = 0; j < 3; j++) {
        dots.push(
          <div
            key={`${i}-${j}`}
            className={`dot absolute w-1 h-1 bg-white rounded-full ${isVisible ? "animate-fadeIn" : "opacity-0"}`}
            style={{
              left: `${i * 5}%`,
              top: `${j * 10 + 5}%`,
              animationDelay: `${(i + j) * 10}ms`,
            }}
          />
        );
      }
    }
    return dots;
  };

  return (
    <div ref={sectionRef} className="w-screen h-[580px] xsm:h-[380px] mt-20">
      <div className="-top-16 xsm:top-10 w-full h-[550px] xsm:h-[400px] md:h-[380px] flex flex-col items-start justify-center relative">
        {/* Floating decorative circles */}
        <div
          className={`absolute -top-10 right-10 w-20 h-20 border border-white/10 rounded-full ${
            isVisible ? "animate-scaleIn" : "opacity-0 scale-0"
          }`}
          style={{ animationDelay: "100ms" }}
        ></div>
        <div
          className={`absolute top-20 right-40 w-12 h-12 border border-white/10 rounded-full ${
            isVisible ? "animate-scaleIn" : "opacity-0 scale-0"
          }`}
          style={{ animationDelay: "200ms" }}
        ></div>
        <div
          className={`absolute bottom-10 left-20 w-16 h-16 border border-white/10 rounded-full ${
            isVisible ? "animate-scaleIn" : "opacity-0 scale-0"
          }`}
          style={{ animationDelay: "300ms" }}
        ></div>

        <div
          id="mission-box"
          className={`bg-[#2C3039] text-center xsm:text-start w-[95%] xsm:w-[80%] xsm:h-full h-[80%] rounded-e-2xl flex items-center justify-center relative flex-col ${
            isVisible ? "animate-slideUp" : "opacity-0 translate-y-16"
          }`}
        >
          {/* Background grid */}
          <div className="absolute inset-0 bg-grid-white/[0.03] bg-[size:20px_20px]" />

          {/* Decorative dots */}
          <div className="absolute opacity-10 inset-0 overflow-hidden">
            {createDots()}
          </div>

          {/* Accent borders */}
          <div
            className={`absolute top-10 left-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent ${
              isVisible ? "animate-expandWidth" : "w-0"
            }`}
            style={{ animationDelay: "600ms" }}
          ></div>
          <div
            className={`absolute bottom-10 left-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent ${
              isVisible ? "animate-expandWidth" : "w-0"
            }`}
            style={{ animationDelay: "800ms" }}
          ></div>

          {/* Content container */}
          <div className="relative z-10 w-full h-full flex flex-col xsm:flex-row items-center justify-between p-6">
            <motion.div
              className="w-full xsm:w-2/3 text-left mb-6 xsm:mb-0 xsm:mr-6"
              initial="hidden"
              animate={isVisible ? "visible" : "hidden"}
              variants={textVariants}
            >
              {/* Accent slash before heading */}
              <div className="flex items-center mb-4">
                <div className="w-6 h-[2px] bg-gradient-to-r from-blue-400 to-purple-500 mr-3"></div>
                <h3 className="text-white text-lg font-medium tracking-wide">
                  OUR MISSION
                </h3>
              </div>

              <p className="text-white leading-relaxed">
                {words.map((word, i) => (
                  <motion.span
                    key={i}
                    className="inline-block mr-1"
                    variants={wordVariants}
                  >
                    {word}
                  </motion.span>
                ))}
              </p>
            </motion.div>

            <div className="relative w-full xsm:w-1/3 flex justify-center">
              {/* Animated rings around image */}
              <div className="absolute inset-0 border border-white/10 rounded-full animate-ping opacity-30"></div>
              <div
                className="absolute inset-4 border border-white/5 rounded-full animate-ping opacity-20"
                style={{ animationDelay: "700ms" }}
              ></div>

              <div
                className={`relative ${isVisible ? "animate-float" : ""}`}
                id="mission-image"
              >
                <ExportedImage
                  src="/images/mission.png"
                  alt="Mission Illustration"
                  className="w-[250px] xsm:w-[350px] z-[100] object-cover"
                  width={500}
                  height={375}
                />
              </div>
            </div>
          </div>

          {/* Corner accent */}
          <div className="absolute top-0 right-0 w-20 h-20">
            <div className="absolute top-0 right-0 w-20 h-[1px] bg-gradient-to-l from-white/20 to-transparent"></div>
            <div className="absolute top-0 right-0 w-[1px] h-20 bg-gradient-to-b from-white/20 to-transparent"></div>
          </div>

          <BackgroundBeams className="opacity-30" />
        </div>
      </div>
    </div>
  );
};

export default MissionSection;
