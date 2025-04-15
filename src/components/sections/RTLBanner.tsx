import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ExportedImage from "next-image-export-optimizer";
import { useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

const RTLBanner = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (sectionRef.current) {
      gsap.to(sectionRef.current, {
        x: 200,
        duration: 1,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
          // markers: true,
        },
      });
    }
  }, [sectionRef]);

  return (
    <div className="w-full h-20 bg-[#262930 mt-10">
      <div ref={sectionRef} className="flex items-center gap-10">
        <ExportedImage
          src="/images/logos/ITLegacy-logo-transparent.png"
          width={80}
          height={80}
          alt="logo"
          className="object-cover mt-3"
        />
        <span className="text-white">RTLBanner</span>
        <ExportedImage
          src="/images/logos/full_logo.png"
          width={60}
          height={60}
          alt="logo"
          className="object-cover mt-3"
        />
      </div>
    </div>
  );
};

export default RTLBanner;
