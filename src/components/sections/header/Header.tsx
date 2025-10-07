"use client";

import { useLoading } from "@/context/LoadingContext";
import ExportedImage from "next-image-export-optimizer";
import { useEffect, useState } from "react";
import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";
import "./Header.css";

const Header = () => {
  const { loading } = useLoading();
  const [animationEnabled, setAnimationEnabled] = useState<boolean>(false);

  // Start animations after loading is complete
  useEffect(() => {
    if (!loading) {
      setAnimationEnabled(true);
    }
  }, [loading]);

  return (
    <header
      id="header"
      className={`text-white py-4 px-6 flex justify-between items-center bg-transparent absolute left-0 top-0 w-full z-10 ${
        animationEnabled ? "header-animation" : "header-hidden"
      }`}
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
        >
          <div
            className={`social-icon-wrapper ${animationEnabled ? "social-icon-container instagram-icon" : ""}`}
          >
            <FaInstagram className="w-8 h-8 sm:w-10 sm:h-10 social-icon hover:text-gray-400 transition-colors duration-300 cursor-pointer" />
          </div>
        </a>
        <a
          href="http://facebook.com/ITlegacySL"
          target="_blank"
          rel="noopener noreferrer"
        >
          <div
            className={`social-icon-wrapper ${animationEnabled ? "social-icon-container facebook-icon" : ""}`}
          >
            <FaFacebook className="w-8 h-8 sm:w-10 sm:h-10 social-icon hover:text-gray-400 transition-colors duration-300 cursor-pointer" />
          </div>
        </a>
        <a
          href="http://linkedin.com/company/it-legacy"
          target="_blank"
          rel="noopener noreferrer"
        >
          <div
            className={`social-icon-wrapper ${animationEnabled ? "social-icon-container linkedin-icon" : ""}`}
          >
            <FaLinkedin className="w-8 h-8 sm:w-10 sm:h-10 social-icon hover:text-gray-400 transition-colors duration-300 cursor-pointer" />
          </div>
        </a>
      </div>
    </header>
  );
};

export default Header;
