"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLayoutEffect, useRef, useState } from "react";
import { Card } from "../ui/card";
import ExportedImage from "next-image-export-optimizer";
import { BackgroundBeams } from "../ui/background-beams";

gsap.registerPlugin(ScrollTrigger);

const timelineEvents = [
  { event: "SE Session" },
  { event: "Cybersecurity & AI" },
  { event: "Project Management & Business Analysis" },
  { event: "Game / Gaming Development" },
];

export const speakers = [
  "/images/speakers/1.png",
  "/images/speakers/2.png",
  "/images/speakers/3.png",
  "/images/speakers/4.png",
];

const VerticalTimeLine = ({ direction = "vertical" }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const section = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    if (!section.current) return;

    const ctx = gsap.context(() => {
      if (!section.current) return;
      const items = section.current.querySelectorAll(".item");
      if (!items.length) return;

      items.forEach((item, index) => {
        if (index !== 0) {
          gsap.set(
            item,
            direction === "horizontal" ? { xPercent: 200 } : { yPercent: 200 }
          );
        }
      });

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: section.current,
          pin: true,
          start: "50% center",
          end: () => `+=${items.length * 100}%`,
          scrub: 1,
          invalidateOnRefresh: true,
          // markers: true,
        },
        defaults: { ease: "none" },
      });

      items.forEach((item, index) => {
        timeline.to(item, { scale: 0.8, borderRadius: "10px" });

        if (items[index + 1]) {
          timeline.to(
            items[index + 1],
            direction === "horizontal" ? { xPercent: 0 } : { yPercent: 0 },
            "<"
          );
        }
      });
    }, section);

    return () => ctx.revert(); // Cleanup GSAP animations on unmount
  }, [direction]);

  return (
    <div className="relative w-full flex items-center justify-between overflow-hidden" ref={section}>
      <div className="w-2/3">
        <div
          role="list"
          className="list  relative flex items-center justify-center gap-5"
        >
          {speakers.map((speaker, index) => (
            <div
              key={index}
              className="item bg-[#2C3039] w-[300PX] h-[350PX] absolute overflow-hidden rounded-xl shadow-lg  "
            >
              <div className="relative w-full h-[350px] md:h-[350px] lg:h-[400px]">
                <ExportedImage
                  src={speaker}
                  alt={`Speaker ${index + 1}`}
                  className="object-cover rounded-xl"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <BackgroundBeams />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex w-1/3">
        <div className="h-[450px] w-[3px] bg-[#333842] relative">
          <div className="w-5 h-5 bg-[#333842] rounded-full absolute top-0 -left-2"></div>
          <div className="w-5 h-5 bg-[#333842] rounded-full absolute bottom-0 -left-2"></div>
        </div>

        <div className="w-[200px] h-[350px] relative">
          <div className="mt-24 flex flex-col gap-5 h-full">
            {timelineEvents.map((item, index) => (
              <div key={index} className="ml-4 mb-6">
                <div className="absolute -left-[12px] w-5 h-5 bg-[#191b1f] rounded-full border-2 border-[#333842]"></div>
                <p className="text-[#a0a4a8]">{item.event}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerticalTimeLine;
