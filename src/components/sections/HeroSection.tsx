import { useEffect } from "react";
import gsap from "gsap";
import ExportedImage from "next-image-export-optimizer";
import svgImg from "../../assets/svg-patterns/45.svg";
import RegisterButton from "../home/RegisterButton";
import { motion } from "framer-motion";

const HeroSection = () => {
  useEffect(() => {
    gsap.from(".hero-title", {
      opacity: 0,
      y: 50,
      duration: 1,
      delay: 0.5,
      ease: "power2.out",
    });

    gsap.from(".hero-text", {
      opacity: 0,
      y: 30,
      duration: 1,
      delay: 1,
      ease: "power2.out",
    });

    gsap.from(".register-btn", {
      opacity: 0,
      scale: 0.8,
      duration: 0.8,
      delay: 1.5,
      ease: "back.out(1.7)",
    });
  }, []);

  return (
    <section className="relative h-[600px] w-full overflow-hidden flex flex-col justify-center items-center text-white text-center px-6">
      <ExportedImage
        src={svgImg}
        alt=""
        className="absolute opacity-20 w-full object-cover -top-20 h-[800px]"
      />

      <h1 className="relative -top-10 hero-title text-4xl sm:text-6xl font-bold">
        ROAD TO LEGACY 2.0
      </h1>

      <p className="relative -top-5 hero-text backdrop-blur-sm p-5 mt-5">
        We are a community of 1st-year IT students from Sri Lanka&apos;s leading
        universities.
      </p>

      <div className="register-btn">
        <RegisterButton />
      </div>

      <div className="w-full flex justify-center items-center relative top-[60px] opacity-30">
        <a
          href="#begin"
          onClick={(e) => {
            e.preventDefault(); // Prevent default anchor behavior
            document.querySelector("#begin")?.scrollIntoView({
              behavior: "smooth",
            });
          }}
        >
          <div className="w-[35px] h-[64px] rounded-3xl border-4 border-primary flex justify-center items-start p-2">
            <motion.div
              animate={{ y: [0, 24, 0] }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatType: "loop",
              }}
              className="w-3 h-3 rounded-full bg-primary mb-1"
            />
          </div>
        </a>
      </div>
    </section>
  );
};

export default HeroSection;
