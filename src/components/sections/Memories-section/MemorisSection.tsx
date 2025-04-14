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
import { useState } from "react";

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

  // This runs when Embla API becomes available
  const onApiReady = (api: CarouselApi) => {
    setApi(api);

    const onSelect = () => {
      setCurrentIndex(api.selectedScrollSnap());
    };

    // Set current index immediately
    onSelect();

    // Listen to carousel changes
    api.on("select", onSelect);

    // Cleanup on unmount
    return () => {
      api.off("select", onSelect);
    };
  };

  return (
    <div className="w-full h-[500px] px-4">
      <Carousel
        opts={{ align: "start" }}
        className="w-full"
        setApi={onApiReady}
      >
        <CarouselContent>
          {memories.map((memory) => (
            <CarouselItem
              key={memory.id}
              className="basis-full sm:basis-full md:basis-1/2 lg:basis-1/3"
            >
              <div className="p-2">
                <Card className="transition-all duration-300 hover:scale-105 hover:shadow-xl overflow-hidden">
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
              currentIndex === index ? "bg-blue-500" : "bg-gray-400"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default MemorisSection;
