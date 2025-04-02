import { mission } from "@/assets";
import ExportedImage from "next-image-export-optimizer";
import { BackgroundBeams } from "../ui/background-beams";

const MissionSection = () => {
  return (
    <div className="my-10 w-full h-[550px] xsm:h-[300px] flex flex-col items-start justify-center relative">
      <div className="bg-[#2C3039] text-center xsm:text-start w-[95%] xsm:w-[80%] xsm:h-full h-[60%] rounded-e-2xl flex items-center justify-center relative flex-col">
        <p className="text-white p-6 xsm:mr-32 sm:mr-28 md:mr-16">
          Our mission is to empower IT students by creating a network where they
          can stay up-to-date with the latest trends, innovations, and
          opportunities in the tech industry. We aim to bridge the gap between
          academia and industry by providing a space for networking,
          knowledge-sharing, and awareness-building about the technologies
          shaping our future.
        </p>

        <ExportedImage
          src={mission}
          alt="Background Pattern"
          className="w-[250px] xsm:w-[350px] z-[100]  object-cover absolute -bottom-[200px] right-[50%] translate-x-[50%] xsm:bottom-0 xsm:translate-x-0 xsm:-right-48"
        />

        <BackgroundBeams />
      </div>
    </div>
  );
};
export default MissionSection;
