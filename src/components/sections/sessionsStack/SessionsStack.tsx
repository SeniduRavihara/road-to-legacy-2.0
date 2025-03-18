"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLayoutEffect, useRef } from "react";
import "./SessionsStack.css";

gsap.registerPlugin(ScrollTrigger);

const SessionsStack = ({ direction = "vertical" }) => {
  const wrapper = useRef<HTMLDivElement | null>(null);
  const section = useRef<HTMLDivElement | null>(null);

   useLayoutEffect(() => {
     if (!wrapper.current || !section.current) return;

     let ctx = gsap.context(() => {
       const items = wrapper.current.querySelectorAll(".item");
       if (!items.length) return;

       items.forEach((item, index) => {
         if (index !== 0) {
           gsap.set(
             item,
             direction === "horizontal" ? { xPercent: 100 } : { yPercent: 100 }
           );
         }
       });

       const timeline = gsap.timeline({
         scrollTrigger: {
           trigger: section.current,
           pin: true,
           start: "top top",
           end: () => `+=${items.length * 100}%`,
           scrub: 1,
           invalidateOnRefresh: true,
          //  markers: true, // Debugging markers
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
      <div className="h-[20vh] w-full flex items-center justify-center">
        <h1 className="">But Vertical Scroll Is Also Cool!</h1>
      </div>

      <div className="">
        <div className="scroll-section" ref={section}>
          <div className="wrapper" ref={wrapper}>
            <div role="list" className="list">
              <div role="listitem" className="item">
                <div className="item_content">
                  <h2 className="item_number">1</h2>
                  <h2>
                    Wildlife in Action: A Glimpse into Nature’s Daily Drama
                  </h2>
                  <p className="item_p">
                    Witness the fascinating lives of animals in their natural
                    habitats, from playful cubs to stealthy predators.
                  </p>
                </div>
                <video
                  src="https://videos.pexels.com/video-files/4763824/4763824-uhd_2560_1440_24fps.mp4"
                  loading="lazy"
                  autoPlay
                  muted
                  loop
                  className="item_media"
                ></video>
              </div>

              <div role="listitem" className="item">
                <div className="item_content">
                  <h2 className="item_number">2</h2>
                  <h2>The Changing Seasons: Nature’s Everlasting Cycle</h2>
                  <p className="item_p">
                    Experience the beauty of nature's transitions, from blooming
                    spring flowers to snowy winter landscapes.
                  </p>
                </div>
                <video
                  src="https://videos.pexels.com/video-files/3214448/3214448-uhd_2560_1440_25fps.mp4"
                  loading="lazy"
                  autoPlay
                  muted
                  loop
                  className="item_media"
                ></video>
              </div>

              <div role="listitem" className="item">
                <div className="item_content">
                  <h2 className="item_number">3</h2>
                  <h2>Guardians of Nature: Protecting Our Planet’s Future</h2>
                  <p className="item_p">
                    Learn about the importance of conservation and how we can
                    work together to preserve the beauty of nature for
                    generations to come.
                  </p>
                </div>
                <video
                  src="https://videos.pexels.com/video-files/4328514/4328514-uhd_2560_1440_30fps.mp4"
                  loading="lazy"
                  autoPlay
                  muted
                  loop
                  className="item_media"
                ></video>
              </div>

              <div role="listitem" className="item">
                <div className="item_content">
                  <h2 className="item_number">4</h2>
                  <h2>Astral Aesthetics: Portraits from the Infinite</h2>
                  <p className="item_p">
                    Experience the boundless beauty of the cosmos through
                    striking portraits that capture its infinite aesthetic
                    appeal.
                  </p>
                </div>
                <video
                  src="https://videos.pexels.com/video-files/2871916/2871916-hd_1920_1080_30fps.mp4"
                  loading="lazy"
                  autoPlay
                  muted
                  loop
                  className="item_media"
                ></video>
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
