import Tilt from "react-parallax-tilt";
import { BackgroundBeams } from "../ui/background-beams";

const RoadToLegacy = () => {
  return (
    <Tilt className="relative rounded-xl m-5 bg-[#1F2227] border-none flex items-center justify-center text-white text-lg font-semibold text-center p-6">
      <p className="text-sm opacity-80">
        A transformative IT career experience designed to bridge the gap between
        university learning and industry expectations. Gain insights, develop
        skills, and build valuable connections for your future.
      </p>
      <BackgroundBeams />
    </Tilt>
  );
};

export default RoadToLegacy;
