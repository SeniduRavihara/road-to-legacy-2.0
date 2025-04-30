"use client";

import FlipCounter from "@/components/flip-count/FlipCounter";
import Animated2 from "@/components/home/animated-road-to-legacy/Animated2";
import AnimatedRoadToLegacy from "@/components/home/animated-road-to-legacy/AnimatedRoadToLegacy";
import RegisterButton from "@/components/home/register-button/RegisterButton";
import { useLoading } from "@/context/LoadingContext";
import ExportedImage from "next-image-export-optimizer";
import { useEffect, useRef, useState } from "react";
import "./HeroSection.css";
import GameRegisterButton from "@/components/home/register-button/GameRegisterButton";

const HeroSection = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const { loading } = useLoading();
  const [animationEnabled, setAnimationEnabled] = useState<boolean>(false);
  const [gameOpen, setGameOpen] = useState(false);

  useEffect(() => {
    // Set target time to May 31, 2025 at 00:55:00
    const targetDateTime = new Date("2025-05-31T00:55:00");
          setGameOpen(true);

    if (Date.now() >= targetDateTime.getTime()) {
      setGameOpen(true);
    }
  }, []);

  // Start animations after loading is complete
  useEffect(() => {
    if (!loading) {
      setAnimationEnabled(true);
    }
  }, [loading]);

  // Handle scroll for parallax effect
  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;

      const section = sectionRef.current;
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const scrollPosition = window.scrollY;

      // Calculate scroll progress (0 to 1)
      const progress = Math.min(
        Math.max(scrollPosition - sectionTop, 0) / sectionHeight,
        1
      );

      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const text =
    "Welcome to RTL—where innovation, collaboration, and growth bring Tech minds together. Join us in shaping the future of technology.";
  const words = text.split(" ");

  return (
    <section
      ref={sectionRef}
      className="relative h-screen w-full overflow-hidden flex flex-col justify-center items-center text-white text-center px-6"
    >
      {/* Background with CSS-based parallax effect */}
      <div
        className="absolute inset-0 w-full h-full parallax-background"
        style={{ transform: `translateY(${scrollProgress * 100}px)` }}
      >
        <ExportedImage
          src="/images/herobackground.png"
          fill
          alt="Background Pattern"
          loading="eager"
          priority
          className="absolute opacity-20 w-full object-cover -top-20 h-[800px]"
        />
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
        className={`z-10 mt-4 md:mt-8 ${animationEnabled ? "register-button-container" : "invisible"}`}
      >
        {gameOpen ? <GameRegisterButton /> : <RegisterButton />}
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
