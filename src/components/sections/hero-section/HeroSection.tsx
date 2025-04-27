"use client";

import FlipCounter from "@/components/flip-count/FlipCounter";
import Animated2 from "@/components/home/animated-road-to-legacy/Animated2";
import AnimatedRoadToLegacy from "@/components/home/animated-road-to-legacy/AnimatedRoadToLegacy";
import RegisterButton from "@/components/home/register-button/RegisterButton";
import { useLoading } from "@/context/LoadingContext";
import ExportedImage from "next-image-export-optimizer";
import { useEffect, useRef, useState } from "react";
import "./HeroSection.css";

const HeroSection = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const { loading } = useLoading();
  const [animationEnabled, setAnimationEnabled] = useState<boolean>(false);

  // Start animations after loading is complete
  useEffect(() => {
    if (!loading) {
      setAnimationEnabled(true);
    }
  }, [loading]);

  const text =
    "Welcome to RTL—where innovation, collaboration, and growth bring Tech minds together. Join us in shaping the future of technology.";
  const words = text.split(" ");

  return (
    <section
      ref={sectionRef}
      className="relative h-screen w-full overflow-hidden flex flex-col justify-center items-center text-white text-center px-6 bg-[#191b1f]"
    >
      {/* Background container with fade effect */}
      <div className="absolute inset-0 w-full h-full background-container">
        {/* Image with animation */}
        <ExportedImage
          src="/images/legacyCover.jpg"
          fill
          alt="Team Legacy"
          loading="eager"
          priority
          className="absolute opacity-20 w-full object-cover background-image object-[50%_100%]"
        />

        {/* Gradient overlay to fade bottom of image */}
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#191b1f] to-transparent"></div>
      </div>

      <div className="mt-10 z-10">
        <AnimatedRoadToLegacy />
        <Animated2 />
      </div>

      <p className="relative backdrop-blur-sm p-5 text-sm mt-10 z-10 max-w-2xl animated-paragraph">
        {words.map((word, i) => (
          <span
            key={i}
            className={`word-span ${animationEnabled ? "animated-word" : ""}`}
            style={{
              marginRight: "4px",
              display: "inline-block",
              animationDelay: animationEnabled ? `${0.5 + i * 0.1}s` : "0s",
            }}
          >
            {word}
          </span>
        ))}
      </p>

      <div
        className={`z-10 mt-8 ${animationEnabled ? "register-button-container" : "invisible"}`}
      >
        <RegisterButton />
      </div>

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
