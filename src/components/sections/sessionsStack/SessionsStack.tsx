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
          start: "53% center",
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
          <div className="h-[20vh] text-center w-full flex flex-col items-center justify-center z-10 relative ">
            <h1 className="text-3xl font-bold text-white">
              🚀 Shape Your Future in Tech
            </h1>
            <p className="text-white text-lg mt-2 text-center">
              Join Road to Legacy 2.0 for industry insights, networking, and
              career growth.
            </p>
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
              {/* Card 1: Cybersecurity & AI */}
              <div
                role="listitem"
                className="item bg-[#191b1fad] backdrop-blur-md border w-[90vw] md:w-[70vw] h-[70vh] absolute "
              >
                <h2 className="text-xl font-bold text-white mt-6 ml-6">
                  🛡️ Cybersecurity & Artificial Intelligence (AI)
                </h2>
                <p className="text-white ml-6 mt-4">
                  Stay ahead of digital threats and AI innovations. Learn how AI
                  is revolutionizing cybersecurity and how you can build a
                  career in this rapidly growing field.
                </p>
                <ul className="text-white ml-6 mt-4">
                  <li>Understand the latest cybersecurity challenges 🚨</li>
                  <li>Learn AI-driven security solutions 🤖</li>
                  <li>
                    Explore career opportunities in AI and cybersecurity 🌐
                  </li>
                </ul>
                <p className="text-white ml-6 mt-4">
                  🎯 Interactive Activity: Participate in a hands-on quiz or
                  discussion led by experts!
                </p>
              </div>

              {/* Card 2: Project Management & Business Analysis */}
              <div
                role="listitem"
                className="item bg-[#191b1fad] backdrop-blur-md border w-[90vw] md:w-[70vw] h-[70vh] absolute"
              >
                <h2 className="text-xl font-bold text-white mt-6 ml-6">
                  📊 Project Management & Business Analysis
                </h2>
                <p className="text-white ml-6 mt-4">
                  Master the art of project planning, execution, and business
                  analysis. Learn how these skills drive success in the tech
                  world.
                </p>
                <ul className="text-white ml-6 mt-4">
                  <li>
                    Discover effective project management methodologies 📅
                  </li>
                  <li>
                    Learn the role of business analysis in bridging IT and
                    business needs 🔍
                  </li>
                  <li>Explore career opportunities in project management 📈</li>
                </ul>
                <p className="text-white ml-6 mt-4">
                  🎯 Interactive Activity: Collaborate on a real-world project
                  scenario!
                </p>
              </div>

              {/* Card 3: Game Development */}
              <div
                role="listitem"
                className="item bg-[#191b1fad] backdrop-blur-md border w-[90vw] md:w-[70vw] h-[70vh] absolute"
              >
                <h2 className="text-xl font-bold text-white mt-6 ml-6">
                  🎮 Game Development
                </h2>
                <p className="text-white ml-6 mt-4">
                  Turn your passion for gaming into a career. Learn the
                  fundamentals of game design, tools, and industry insights to
                  get started in this exciting field.
                </p>
                <ul className="text-white ml-6 mt-4">
                  <li>Learn the basics of game design 🕹️</li>
                  <li>Get hands-on with popular game development tools 🛠️</li>
                  <li>Explore career pathways in game development 🎮</li>
                </ul>
                <p className="text-white ml-6 mt-4">
                  🎯 Interactive Activity: Design a mini-game or take on a quick
                  coding challenge!
                </p>
              </div>

              <div
                role="listitem"
                className="item bg-[#191b1fad] backdrop-blur-md border w-[90vw] md:w-[70vw] h-[70vh]"
              >
                <h2 className="text-2xl text-white font-bold p-4">
                  👩‍💻 Software Engineering
                </h2>
                <p className="text-white text-lg p-4">
                  Explore the fundamentals of software development, from coding
                  practices to project life cycles, and discover the career
                  opportunities in Software Engineering.
                </p>
              </div>
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
