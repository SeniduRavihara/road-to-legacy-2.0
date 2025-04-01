import Tilt from "react-parallax-tilt";
import { BackgroundBeams } from "../ui/background-beams";

const RoadToLegacy = () => {
  return (
    <div className="w-full flex items-center justify-center">
      <Tilt
        tiltMaxAngleX={5} // Reduce X-axis tilt
        tiltMaxAngleY={5} // Reduce Y-axis tilt
        scale={1.02} // Slight scale effect on hover
        transitionSpeed={200} // Smoother transition
        className="relative w-[80%] rounded-xl m-5 bg-[#1F2227] border-none flex items-center justify-center text-white text-lg font-semibold text-center p-6"
      >
        <p className="text-sm opacity-80">
          IT Legacy connects IT students from UOM, USJ, and UOC, fostering
          collaboration, networking, and professional growth. Our platform
          unites tech enthusiasts, keeping them informed and engaged with the
          evolving industry.
        </p>
        <BackgroundBeams />
      </Tilt>
    </div>
  );
};

export default RoadToLegacy;
