"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLayoutEffect, useRef } from "react";
// import "./SessionsStack.css";

gsap.registerPlugin(ScrollTrigger);

// const sessionsList = [
//   { title: "" },
//   { title: "" },
//   { title: "" },
//   { title: "" },
// ];

const SessionsStack = ({ direction = "vertical" }) => {
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
            direction === "horizontal" ? { xPercent: 200 } : { yPercent: 150 }
          );
        }
      });

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: section.current,
          pin: true,
          start: "60% center",
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
    }, section);

    return () => ctx.revert(); // Cleanup GSAP animations on unmount
  }, [direction]);

  return (
    <div className="w-full top-20" ref={section}>
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
  );
};
export default SessionsStack;
