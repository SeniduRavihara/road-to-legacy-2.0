import { logo } from "@/assets";
import gsap from "gsap";
import ExportedImage from "next-image-export-optimizer";
import { useEffect } from "react";
import { FaFacebook, FaLinkedin } from "react-icons/fa";
import "./Header.css";

const Header = () => {
  useEffect(() => {
    gsap.from("#header", {
      opacity: 0,
      delay: 2,
      x: 20,
      duration: 1,
    });
  }, []);

  return (
    <header
      id="header"
      className="text-white py-4 px-6 flex justify-between items-center bg-transparent"
    >
      <div id="floating-logo" className="flex">
        <ExportedImage
          src={logo}
          alt="logo"
          className="w-8 h-8 sm:w-14 sm:h-14"
        />
        <h1 className="text-3xl sm:text-5xl">RTL</h1>
      </div>

      <div className="hidden sm:flex">UOM-USJ-UOC</div>

      <div className="flex sm:flex gap-2">
        <FaFacebook className="w-8 h-8" />
        <FaLinkedin className="w-8 h-8" />
      </div>
    </header>
  );
};

export default Header;
