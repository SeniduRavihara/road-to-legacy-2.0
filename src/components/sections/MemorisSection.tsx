"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import ExportedImage from "next-image-export-optimizer";

gsap.registerPlugin(ScrollTrigger);

const memories = [
  { id: 1, src: "/images/memories/mem1-1.jpg", alt: "Memory 1" },
  { id: 2, src: "/images/memories/mem1-2.jpg", alt: "Memory 2" },
  { id: 3, src: "/images/memories/mem1-3.jpg", alt: "Memory 3" },
  { id: 4, src: "/images/memories/mem1-4.jpg", alt: "Memory 4" },
  { id: 5, src: "/images/memories/mem1-5.jpg", alt: "Memory 5" },
];

const MemorisSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [api, setApi] = useState<CarouselApi | null>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]); // Ref array for all cards

  const onApiReady = (api: CarouselApi) => {
    if (!api) return;

    setApi(api);
    const onSelect = () => setCurrentIndex(api.selectedScrollSnap());
    onSelect();
    api.on("select", onSelect);
    return () => api.off("select", onSelect);
  };

  // 🔥 GSAP animation
  useEffect(() => {
    cardsRef.current.forEach((card, i) => {
      if (!card) return;

      gsap.from(card, {
        opacity: 0,
        y: 40,
        duration: 0.8,
        ease: "bounce.out",
        scrollTrigger: {
          trigger: card,
          start: "top 90%",
          toggleActions: "play none none reset", // replay when re-entering
        },
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div className="w-full h-[500px] px-4 mt-10 mb-20 flex flex-col items-center justify-center">
      <h2 className="text-4xl font-bold text-center mb-6">OUR MEMORIES</h2>

      <Carousel
        opts={{ align: "start" }}
        className="w-full"
        setApi={onApiReady}
      >
        <CarouselContent>
          {memories.map((memory, index) => (
            <CarouselItem
              key={memory.id}
              className="basis-full xsm:basis-1/2 md:basis-1/3"
            >
              <div className="p-2">
                <Card
                  className="transition-all duration-300 hover:scale-105 hover:shadow-xl overflow-hidden"
                  ref={(el) => (cardsRef.current[index] = el!)}
                >
                  <CardContent className="relative aspect-square p-0">
                    <ExportedImage
                      src={memory.src}
                      alt={memory.alt}
                      className="object-cover"
                      fill
                      priority={memory.id === 1}
                    />
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        <CarouselPrevious />
        <CarouselNext />
      </Carousel>

      {/* Navigation Dots */}
      <div className="flex justify-center mt-4">
        {memories.map((_, index) => (
          <button
            key={index}
            onClick={() => api?.scrollTo(index)}
            className={`w-3 h-3 mx-2 rounded-full transition-colors duration-200 ${
              currentIndex === index ? "bg-gray-400" : "bg-[#333842]"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default MemorisSection;
