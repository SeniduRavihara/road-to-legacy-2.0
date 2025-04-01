import { mission } from "@/assets";
import ExportedImage from "next-image-export-optimizer";

const MissionSection = () => {
  return (
    <div className="my-10 w-full h-[300px] flex flex-col items-start justify-center relative">
      <div className="bg-[#2C3039] w-[80%] h-full rounded-e-2xl flex items-center justify-center ">
        <p className="text-white font-semibold  p-6 mr-20">
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
          className="w-[350px] object-cover absolute top-[50%] -right-5 translate-y-[-50%]"
        />
      </div>
    </div>
  );
};
export default MissionSection;
