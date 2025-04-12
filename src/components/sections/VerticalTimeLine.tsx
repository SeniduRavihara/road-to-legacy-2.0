"use client"

import { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

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

  const wrapper = useRef<HTMLDivElement | null>(null);
  const section = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    if (!wrapper.current || !section.current) return;

    const ctx = gsap.context(() => {
      if (!wrapper.current || !section.current) return;
      const items = wrapper.current.querySelectorAll(".item");
      if (!items.length) return;

      items.forEach((item, index) => {
        if (index !== 0) {
          gsap.set(
            item,
            direction === "horizontal" ? { xPercent: 200 } : { yPercent: 100 }
          );
        }
      });

    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: section.current,
        pin: true,
        start: "53% center",
        end: () => `+=${items.length * 100}%`,
        scrub: 1,
        invalidateOnRefresh: true,
        markers: true,
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
    }, wrapper);

    return () => ctx.revert(); // Cleanup GSAP animations on unmount
  }, [direction]);

  return (
    <div className="flex items-center justify-between space-y-6 py-8 text-whit">
      <div className="bg-blue-200 flex w-2/3 h-[350px]" ref={section}>
        <div ref={wrapper}>
          <div
            role="list"
            className="list relative flex items-center justify-center gap-5"
          >
            <div
              role="listitem"
              className="item w-40 h-40 bg-red-500 absolute"
            ></div>
            <div
              role="listitem"
              className="item w-40 h-40 bg-green-500 absolute"
            ></div>
            <div
              role="listitem"
              className="item w-40 h-40 bg-blue-500 absolute"
            ></div>
            <div
              role="listitem"
              className="item w-40 h-40 bg-yellow-500 absolute"
            ></div>
          </div>
        </div>
      </div>

      <div className="flex w-1/3">
        <div className="h-[350px] w-[3px] bg-[#333842] relative">
          <div className="w-5 h-5 bg-[#333842] rounded-full absolute top-0 -left-2"></div>
          <div className="w-5 h-5 bg-[#333842] rounded-full absolute bottom-0 -left-2"></div>
        </div>

        <div className="w-[200px] h-[350px] relative">
          <div className="mt-20">
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
