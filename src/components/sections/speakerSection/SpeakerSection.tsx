import { BackgroundBeams } from "@/components/ui/background-beams";
import { Card } from "@/components/ui/card";
import ExportedImage from "next-image-export-optimizer";

export const posts = [
  "/images/speakers/1.png",
  "/images/speakers/2.png",
  "/images/speakers/3.png",
  "/images/speakers/4.png",
];

const SpeakerSection = () => {
  return (
    <div className="container mx-auto px-4 py-10">
      <h2 className="text-center text-2xl md:text-3xl font-bold mb-8">
        Featured Speakers
      </h2>
      {/* Adjusted grid to show 2 cards on mobile */}
      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {posts.map((post, id) => (
          <Card
            key={id}
            className="relative overflow-hidden rounded-xl shadow-lg transition-transform transform hover:scale-105"
          >
            <div className="relative w-full h-[300px] md:h-[350px] lg:h-[400px]">
              <ExportedImage
                src={post}
                alt={`Speaker ${id + 1}`}
                className="object-cover rounded-xl"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <BackgroundBeams />
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default SpeakerSection;
