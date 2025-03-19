import ExportedImage from "next-image-export-optimizer";
import svgImg from "../../assets/svg-patterns/45.svg";
import RegisterButton from "../home/RegisterButton";

const HeroSection = () => {
  return (
    <section
      className="bg-cover bg-center h-[400px] w-[100vw] overflow-hidden flex flex-col justify-center items-center text-white text-center px-6"
      // style={{ backgroundImage: "url('/event-banner.jpg')" }}
    >
      <ExportedImage
        src={svgImg}
        alt=""
        className="absolute opacity-40 sm:opacity-20 w-full  object-contain"
      />

      {/* <AnimatedITLEGACY /> */}

      <h1 className="text-4xl sm:text-6xl font-bold">ROAD TO LEGACY2.0</h1>

      <p className="sm:backdrop-blur-sm p-5 mt-5">
        We are a community of 1st-year IT students from Sri Lanka&apos;s leading
        universities.
      </p>

      <RegisterButton />
    </section>
  );
};

export default HeroSection;
