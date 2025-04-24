"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ExportedImage from "next-image-export-optimizer";
import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import svgImg from "../../assets/svg-patterns/45.svg";
import FlipCounter from "../flip-count/FlipCounter";
import Animated2 from "../home/animated-road-to-legacy/Animated2";
import AnimatedRoadToLegacy from "../home/animated-road-to-legacy/AnimatedRoadToLegacy";
import RegisterButton from "../home/RegisterButton";

gsap.registerPlugin(ScrollTrigger);

const HeroSection = () => {
  const sectionRef = useRef(null);
  const bgRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const bg = bgRef.current;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: "bottom top",
        scrub: 1,
      },
    });

    tl.to(bg, { y: 100, ease: "none" });

    return () => {
      tl.kill();
    };
  }, []);

  // Text animation variants
  // const textVariants = {
  //   hidden: { opacity: 0, y: 50 },
  //   visible: {
  //     opacity: 1,
  //     y: 0,
  //     transition: {
  //       duration: 0.8,
  //       ease: "easeOut",
  //       delay: 1.5, // Keeping the same delay as your GSAP timeline
  //     },
  //   },
  // };

  // Button animation variants
  const buttonVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
        delay: 1.7, // Slightly after text animation starts (matches your GSAP delay + 0.2)
      },
    },
  };

  // Word animation variants for text reveal effect
  const wordVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 1.5 + i * 0.1,
        duration: 0.5,
        ease: "easeOut",
      },
    }),
  };

  const text =
    "Welcome to RTL—where innovation, collaboration, and growth bring Tech minds together. Join us in shaping the future of technology.";
  const words = text.split(" ");

  return (
    <section
      ref={sectionRef}
      className="relative h-screen w-full overflow-hidde flex flex-col justify-center items-center text-white text-center px-6"
    >
      <ExportedImage
        ref={bgRef}
        src={svgImg}
        alt="Background Pattern"
        className="absolute opacity-20 w-full object-cover -top-20 h-[800px]"
      />

      <div className="mt-10 z-10">
        <AnimatedRoadToLegacy />
        <Animated2 />
      </div>

      <motion.p
        className="relative backdrop-blur-sm p-5 text-sm mt-10 z-10 max-w-2xl"
        initial="hidden"
        animate="visible"
      >
        {words.map((word, i) => (
          <motion.span
            key={i}
            custom={i}
            variants={wordVariants}
            className="inline-block"
            style={{ marginRight: "4px" }}
          >
            {word}
          </motion.span>
        ))}
      </motion.p>

      <motion.div
        className="z-10 mt-8"
        variants={buttonVariants}
        initial="hidden"
        animate="visible"
      >
        <RegisterButton />
      </motion.div>

      <FlipCounter />

      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2">
        <ScrollIndicator />
      </div>
    </section>
  );
};

const ScrollIndicator = () => (
  <div className="animate-bounce">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-6 w-6 text-white opacity-50"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M19 14l-7 7m0 0l-7-7m7 7V3"
      />
    </svg>
  </div>
);

export default HeroSection;
