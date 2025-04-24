"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import ExportedImage from "next-image-export-optimizer";
import { BackgroundBeams } from "../ui/background-beams";
import { motion } from "framer-motion";

gsap.registerPlugin(ScrollTrigger);

const MissionSection = () => {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Main mission box animation
      gsap.from("#mission-box", {
        opacity: 0,
        y: 60,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: "#mission-box",
          start: "top 70%",
          onEnter: () => setIsVisible(true),
          toggleActions: "play none none none",
        },
      });

      // Enhanced parallax effect for the image
      gsap.to("#mission-image", {
        y: -15,
        x: 5,
        rotation: 2,
        duration: 3,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
        scrollTrigger: {
          trigger: "#mission-box",
          start: "top 80%",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
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

  return (
    <div ref={sectionRef} className="w-screen h-[580px] xsm:h-[380px]">
      <div className="-top-16 xsm:top-10 w-full h-[550px] xsm:h-[300px] flex flex-col items-start justify-center relative">
        <div
          id="mission-box"
          className="bg-[#2C3039] text-center xsm:text-start w-[95%] xsm:w-[80%] xsm:h-full h-[60%] rounded-e-2xl flex items-center justify-center relative flex-col"
        >
          {/* Background grid */}
          <div className="absolute inset-0 bg-grid-white/[0.03] bg-[size:20px_20px]" />

          <div className="relative z-10 w-full h-full flex flex-col xsm:flex-row items-center justify-between p-6">
            <motion.div
              className="w-full xsm:w-2/3 text-left mb-6 xsm:mb-0 xsm:mr-6"
              initial="hidden"
              animate={isVisible ? "visible" : "hidden"}
              variants={textVariants}
            >
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
              {/* <div className="absolute -inset-0.5 bg-gradient-to-r from-[#1F2227] to-[#333842] rounded-full blur opacity-75"></div> */}
              <div id="mission-image" className="relative">
                <ExportedImage
                  src="/images/mission.png"
                  alt="Mission Illustration"
                  className="w-[250px] xsm:w-[350px] z-[100] object-cover "
                  width={500}
                  height={375}
                />
              </div>
            </div>
          </div>

          {/* Decorative elements */}
          <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-[#191B1F] rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
          <div className="absolute -top-8 -right-8 w-32 h-32 bg-[#262930] rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>

          <BackgroundBeams className="opacity-30" />
        </div>
      </div>
    </div>
  );
};

export default MissionSection;
