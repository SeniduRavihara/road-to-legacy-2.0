"use client";

import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ExportedImage from "next-image-export-optimizer";
import { useEffect } from "react";
import svgImg from "../../assets/svg-patterns/45.svg";
import AnimatedRoadToLegacy from "../home/animated-road-to-legacy/AnimatedRoadToLegacy";
import RegisterButton from "../home/RegisterButton";

gsap.registerPlugin(ScrollTrigger);

const HeroSection = () => {
  useEffect(() => {
    // Hero section animations
    // gsap.from(".hero-title", {
    //   opacity: 0,
    //   y: 50,
    //   duration: 1,
    //   delay: 2,
    //   ease: "power2.out",
    // });

    // gsap.from(".hero-text", {
    //   opacity: 0,
    //   y: 30,
    //   duration: 1.5,
    //   delay: 2,
    //   ease: "power2.out",
    // });

    // gsap.from(".register-btn", {
    //   opacity: 0,
    //   scale: 0.8,
    //   duration: 1.5,
    //   delay: 2,
    //   ease: "back.out(1.7)",
    // });

    // Parallax Effect for Background Image
    gsap.to(".parallax-bg", {
      y: 100, // Adjust this value to control the parallax depth
      ease: "none",
      scrollTrigger: {
        trigger: ".hero-section",
        start: "top top",
        end: "bottom top",
        scrub: true, // Smooth parallax effect
      },
    });
  }, []);

  return (
    <section className="hero-section relative h-screen w-full overflow-hidden flex flex-col justify-center items-center text-white text-center px-6 ">
      {/* Background Image with Parallax Effect */}
      <ExportedImage
        src={svgImg}
        alt="Background Pattern"
        className="parallax-bg absolute opacity-20 w-full object-cover -top-20 h-[800px]"
      />

      {/* <h1 className="relative -top-10 hero-title text-4xl sm:text-6xl font-bold">
        ROAD TO LEGACY 2.0
      </h1> */}

      <div className="mt">
        {/* <AnimatedITLEGACY /> */}
        <AnimatedRoadToLegacy />
      </div>

      <p className="relative hero-text backdrop-blur-sm p-5 mt-10 z-10">
        Welcome to IT Legacy—where innovation, collaboration, and growth bring
        Tech minds together.
      </p>

      <div className="register-btn z-10 mt-5">
        <RegisterButton />
      </div>

      <div className="w-full flex justify-center items-center opacity-30 absolute bottom-5">
        <a
          href="#begin"
          onClick={(e) => {
            e.preventDefault();
            document.querySelector("#begin")?.scrollIntoView({
              behavior: "smooth",
            });
          }}
        >
          <div className="w-[35px] h-[64px]  rounded-3xl border-4 border-primary flex justify-center items-start p-2">
            <motion.div
              animate={{ y: [0, 24, 0] }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatType: "loop",
              }}
              className="w-3 h-3 rounded-full bg-primary mb-1"
            />
          </div>
        </a>
      </div>
    </section>
  );
};

export default HeroSection;
