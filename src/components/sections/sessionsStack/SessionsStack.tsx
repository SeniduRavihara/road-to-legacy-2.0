"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import NET, { VantaEffect } from "vanta/dist/vanta.net.min";
import "./SessionsStack.css";

gsap.registerPlugin(ScrollTrigger);

// const sessionsList = [
//   { title: "" },
//   { title: "" },
//   { title: "" },
//   { title: "" },
// ];

const SessionsStack = ({ direction = "vertical" }) => {
  const wrapper = useRef<HTMLDivElement | null>(null);
  const section = useRef<HTMLDivElement | null>(null);

  const [vantaEffect, setVantaEffect] = useState<VantaEffect | null>(null); // Corrected type
  const myRef = useRef<HTMLDivElement | null>(null); // Typing useRef for HTMLDivElement specifically

  useEffect(() => {
    if (!vantaEffect && myRef.current) {
      // Ensure myRef.current is not null
      const effect = NET({
        el: myRef.current, // Now TypeScript knows myRef.current will be an HTMLDivElement
        color: 0x333842,
        backgroundColor: 0x191b1f,
      });
      setVantaEffect(effect); // Set the effect object
    }

    return () => {
      vantaEffect?.destroy(); // Cleanup when the component unmounts
    };
  }, [vantaEffect]);

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
            direction === "horizontal" ? { xPercent: 200 } : { yPercent: 200 }
          );
        }
      });

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: section.current,
          pin: true,
          start: "center center",
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
    }, wrapper);

    return () => ctx.revert(); // Cleanup GSAP animations on unmount
  }, [direction]);

  return (
    <div>
      <div className="relative">
        <div className="scroll-section " ref={section}>
          <div className="h-[20vh] w-full flex items-center justify-center z-10">
            <h1 className="">But Vertical Scroll Is Also Cool!</h1>
          </div>
          <div
            ref={myRef}
            className="absolute w-screen h-screen -top-10 -z-10"
          ></div>

          <div className="wrapper" ref={wrapper}>
            <div
              role="list"
              className="list relative flex items-center justify-center gap-5"
            >
              <div
                role="listitem"
                className="item bg-[#2C3039] w-[90vw] md:w-[70vw] h-[50vh] absolute  border border-white"
              ></div>

              <div
                role="listitem"
                className="item bg-[#999ca5] w-[90vw] md:w-[70vw] h-[50vh]  absolute"
              ></div>

              <div
                role="listitem"
                className="item bg-[#172033] w-[90vw] md:w-[70vw] h-[50vh] absolute"
              ></div>

              <div
                role="listitem"
                className="item bg-[#3d7518] w-[90vw] md:w-[70vw] h-[50vh]"
              ></div>
            </div>
          </div>
        </div>
      </div>

      {/* <div className=" bg-amber-500 h-[100vh]">
        <h1 className="heading">But Vertical Scroll Is Also Cool!</h1>
      </div> */}
    </div>
  );
};
export default SessionsStack;
