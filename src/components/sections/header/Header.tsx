"use client";

import gsap from "gsap";
import ExportedImage from "next-image-export-optimizer";
import { useEffect } from "react";
import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";
import "./Header.css";

const Header = () => {
  useEffect(() => {
    // Header fade-in animation
    const ctx = gsap.context(() => {
      gsap.from("#header", {
        opacity: 0,
        delay: 2,
        x: 20,
        duration: 1,
      });

      // Sea wave effect on social media icons
      gsap.to(".social-icon", {
        y: -5, // Move up slightly
        duration: 1.5, // Smooth animation
        repeat: -1, // Infinite loop
        yoyo: true, // Reverse animation
        ease: "sine.inOut", // Smooth wave motion
        stagger: 0.5,
      });
    });

    return () => ctx.revert(); // Cleanup animation
  }, []);

  return (
    <header
      id="header"
      className="text-white py-4 px-6 flex justify-between items-center bg-transparent absolute left-0 top-0 w-full z-10 "
    >
      <div id="floating-logo" className="flex">
        <a href="#">
          <ExportedImage
            src="/images/logos/full_logo.png"
            alt="UOM-USJ-UOC logo"
            priority
            className="w-16 h-16 sm:w-20 sm:h-20 cursor-pointer"
            width={64}
            height={64}
            placeholder="blur"
            // unoptimized
          />
        </a>
      </div>

      {/* <div className="hidden sm:flex text-xl font-boldonse absolute left-[50%] transform -translate-x-[50%]">
        UOM-USJ-UOC
      </div> */}

      <div className="flex gap-2 z-[1000]">
        <a
          href="http://instagram.com/itlegacy.team"
          target="_blank"
          rel="noopener noreferrer"
          // className="cursor-pointer"
        >
          <FaInstagram className="w-8 h-8 sm:w-10 sm:h-10 social-icon hover:text-gray-400 transition-colors duration-300 cursor-pointer" />
        </a>
        <a
          href="http://facebook.com/ITlegacySL"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaFacebook className="w-8 h-8 sm:w-10 sm:h-10 social-icon hover:text-gray-400 transition-colors duration-300 cursor-pointer" />
        </a>
        <a
          href="http://linkedin.com/company/it-legacy"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaLinkedin className="w-8 h-8 sm:w-10 sm:h-10 social-icon hover:text-gray-400 transition-colors duration-300 cursor-pointer" />
        </a>
      </div>
    </header>
  );
};

export default Header;
