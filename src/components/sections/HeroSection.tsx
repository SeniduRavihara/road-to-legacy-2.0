import ExportedImage from "next-image-export-optimizer";
import svgImg from "../../assets/svg-patterns/45.svg";
import RegisterButton from "../home/RegisterButton";
import AnimatedITLEGACY from "../home/animated-itlegacy/AnimatedITLEGACY";

const HeroSection = () => {
  return (
    <section
      className="relative bg-[#191b1f] bg-cover bg-center h-[400px] w-[100vw] overflow-x-hidden flex flex-col justify-center items-center text-white text-center px-6"
      // style={{ backgroundImage: "url('/event-banner.jpg')" }}
    >
      <ExportedImage
        src={svgImg}
        alt=""
        className="absolute opacity-40 w-full mt-20"
      />

      <AnimatedITLEGACY />

      <RegisterButton />
    </section>
  );
};

export default HeroSection;
