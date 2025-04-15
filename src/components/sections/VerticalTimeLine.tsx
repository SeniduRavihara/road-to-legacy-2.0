"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ExportedImage from "next-image-export-optimizer";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import NET, { VantaEffect } from "vanta/dist/vanta.net.min";
import { BackgroundBeams } from "../ui/background-beams";

gsap.registerPlugin(ScrollTrigger);

const timelineEvents = [
  { event: "SE Session" },
  { event: "Cybersecurity & AI" },
  { event: "Project Management & Business Analysis" },
  { event: "Gaming Development" },
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

        timeline.call(() => {
          setCurrentSlide(index);
        });

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
    <div
      className="relative w-full bg-green-20 h-screen flex  flex-col md:flex-row  items-center justify-between overflow-hidden mt-20"
      ref={section}
    >
      <div className="w-full bg-blue-40 flex flex-col md:hidden justify-center mt-4 mb-6 px-4">
        
        <div className="h-[3px] w-full bg-[#333842] relative">
          {/* <div className="w-5 h-5 bg-[#333842] rounded-full absolute -top-2 left-0"></div>
          <div className="w-5 h-5 bg-[#333842] rounded-full absolute -top-2 right-0"></div> */}
        </div>

        <div className="w-full bg-blue-20 relative">
          <div className="flex flex-row gap-5 w-full justify-center">
            {timelineEvents.map((item, index) => (
              <div key={index} className="flex flex-col items-center mb-6">
              
                <div
                  className={`w-5 h-5 bg-[#191b1f] rounded-full left-2 relative -top-3 border-2 border-[#333842] ${
                    currentSlide === index ? "bg-[#333842]" : ""
                  }`}
                ></div>

                <div className="left-2 relative -top-3 ">
                  <p
                    className={`text-xs text-center mt-2 ${
                      currentSlide === index
                        ? "text-white font-semibold"
                        : "text-[#a0a4a8]"
                    }`}
                  >
                    {item.event}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="w-2/3 relative md:top-0 -top-[50%] bg-red-500">
        <div
          role="list"
          className="list  relative flex items-center justify-center gap-5"
        >
          {speakers.map((speaker, index) => (
            <div
              key={index}
              className="item bg-[#2C3039] w-[350px] xsm:w-[450px] sm:w-[550px] sm:h-[450px] absolute overflow-hidden rounded-xl shadow-lg  "
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

      <div className=" w-1/3 hidden md:flex">
        <div className="h-[450px] w-[3px] bg-[#333842] relative">
          <div className="w-5 h-5 bg-[#333842] rounded-full absolute top-0 -left-2"></div>
          <div className="w-5 h-5 bg-[#333842] rounded-full absolute bottom-0 -left-2"></div>
        </div>

        <div className="w-[200px] h-[350px] relative">
          <div className="mt-24 flex flex-col gap-5 h-full">
            {timelineEvents.map((item, index) => (
              <div key={index} className="ml-4 mb-6">
                <div
                  className={`absolute -left-[12px] w-5 h-5 bg-[#191b1f] rounded-full border-2 border-[#333842] ${
                    currentSlide === index ? "bg-[#333842]" : ""
                  }`}
                ></div>
                <p
                  className={`${currentSlide === index ? "text-white font-semibold" : "text-[#a0a4a8]"}`}
                >
                  {item.event}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div
        ref={myRef}
        className="absolute w-full h-screen -top-10 -z-10 opacity-30"
      ></div>
    </div>
  );
};

export default VerticalTimeLine;
