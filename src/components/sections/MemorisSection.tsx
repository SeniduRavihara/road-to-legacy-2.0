"use client";

import { Card } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import { motion } from "framer-motion";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import ExportedImage from "next-image-export-optimizer";
import { useEffect, useRef, useState } from "react";

gsap.registerPlugin(ScrollTrigger);

const memories = [
  {
    id: 1,
    src: "/images/memories/mem6.jpg",
    alt: "Memory 1",
    link: "https://web.facebook.com/photo/?fbid=122128819454091765&set=pcb.122128823096091765",
  },
  {
    id: 5,
    src: "/images/memories/mem1-1.jpg",
    alt: "Memory 5",
    link: "https://web.facebook.com/photo/?fbid=122128783280091765&set=pcb.122128823096091765",
  },
  {
    id: 2,
    src: "/images/memories/mem1-2.jpg",
    alt: "Memory 2",
    link: "https://web.facebook.com/photo?fbid=122128788746091765&set=pcb.122128823096091765",
  },
  {
    id: 3,
    src: "/images/memories/mem1-3.jpg",
    alt: "Memory 3",
    link: "https://www.facebook.com/photo/?fbid=323456789",
  },
  {
    id: 4,
    src: "/images/memories/mem1-4.jpg",
    alt: "Memory 4",
    link: "https://www.facebook.com/photo/?fbid=423456789",
  },
];

const MemorySection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [api, setApi] = useState<CarouselApi | null>(null);
  const [isHovering, setIsHovering] = useState<number | null>(null);

  const sectionRef = useRef<HTMLDivElement | null>(null);
  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  const onApiReady = (api: CarouselApi) => {
    if (!api) return;

    setApi(api);
    const onSelect = () => setCurrentIndex(api.selectedScrollSnap());
    onSelect();
    api.on("select", onSelect);
    return () => api.off("select", onSelect);
  };

  // GSAP animation using context
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation with clip path
      gsap.fromTo(
        titleRef.current,
        {
          clipPath: "polygon(0 0, 0 0, 0 100%, 0 100%)",
          opacity: 0,
        },
        {
          clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
          opacity: 1,
          duration: 1.2,
          ease: "power3.inOut",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 90%",
            // markers: true,
          },
        }
      );

      // Subtitle line animation
      gsap.fromTo(
        ".title-line",
        { width: 0 },
        {
          width: "80px",
          duration: 1,
          ease: "power2.out",
          delay: 0.5,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 90%",
          },
        }
      );

      // Staggered card animations
      gsap.fromTo(
        cardsRef.current,
        {
          y: 80,
          opacity: 0,
          scale: 0.9,
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.12,
          scrollTrigger: {
            trigger: ".cards-container",
            start: "top 85%",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={sectionRef}
      className="w-full h-full px-6 md:px-10 mt-0 md:mt-40"
      // style={{ backgroundColor: "#191b1f" }}
    >
      <div className="max-w-6xl mx-auto">
        <div className="text-center overflow-hidden">
          <h2 ref={titleRef} className="text-5xl font-bold mb-4 text-white">
            OUR MEMORIES
          </h2>
          <div className="flex justify-center mb-8">
            <div
              className="title-line h-1 rounded-full"
              style={{ backgroundColor: "#333842" }}
            ></div>
          </div>
          <p className="text-gray-400 max-w-xl mx-auto">
            Relive the unforgettable moments from our journey together
          </p>
        </div>

        <div className="cards-container relative w-full mt-6">
          <Carousel
            opts={{ align: "start", loop: true }}
            className="w-full"
            setApi={onApiReady}
          >
            <CarouselContent className="-ml-4">
              {memories.map((memory, index) => (
                <CarouselItem
                  key={memory.id}
                  className="pl-4 basis-full xsm:basis-1/2 md:basis-1/3 lg:basis-1/4"
                >
                  <div
                    ref={(el) => {
                      cardsRef.current[index] = el;
                    }}
                    className="h-full"
                    onMouseEnter={() => setIsHovering(index)}
                    onMouseLeave={() => setIsHovering(null)}
                  >
                    <Card
                      className="border-0 overflow-hidden"
                      style={{ backgroundColor: "transparent" }}
                    >
                      <div className="relative overflow-hidden rounded-xl">
                        {/* Overlay that appears on hover */}
                        <motion.div
                          className="absolute inset-0 z-10 flex items-center justify-center"
                          initial={{ opacity: 0 }}
                          animate={{
                            opacity: isHovering === index ? 0.7 : 0,
                          }}
                          transition={{ duration: 0.3 }}
                          style={{ backgroundColor: "#191b1f" }}
                        >
                          <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{
                              scale: isHovering === index ? 1 : 0.8,
                              opacity: isHovering === index ? 1 : 0,
                            }}
                            transition={{ duration: 0.3 }}
                          >
                            <a
                              href={memory.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-white border border-white rounded-full p-3 hover:bg-white hover:text-black transition-colors duration-300 inline-block"
                            >
                              View
                            </a>
                          </motion.div>
                        </motion.div>

                        {/* Image */}
                        <div className="aspect-square">
                          <ExportedImage
                            src={memory.src}
                            alt={memory.alt}
                            width={400}
                            height={400}
                            className={`object-cover w-full h-full transition-transform duration-700 ${
                              isHovering === index ? "scale-110" : "scale-100"
                            }`}
                            priority={memory.id === 1}
                            // unoptimized={true}
                          />
                        </div>
                      </div>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>

        {/* Modern dot indicators with animated active state */}
        <div className="flex justify-center mt-10">
          {memories.map((_, index) => (
            <button
              key={index}
              onClick={() => api?.scrollTo(index)}
              className="relative w-8 h-2 mx-1 focus:outline-none"
              aria-label={`Go to slide ${index + 1}`}
            >
              <span
                className="absolute inset-0 rounded-full transition-all duration-300"
                style={{
                  backgroundColor:
                    currentIndex === index ? "#333842" : "#262930",
                  transform:
                    currentIndex === index ? "scaleX(1.2)" : "scaleX(1)",
                }}
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MemorySection;
