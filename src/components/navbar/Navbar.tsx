import React from "react";
import "./Navbar.css"
import { useRouter } from "next/navigation";

const Navbar = () => {

  const router = useRouter();

  return (
    <div
      id="floating-navbar"
      className="bg-[#1f2227b9] p-2 w-[90vw] sm:w-[70vw] md:w-[50vw] h-14 backdrop-blur-md border rounded-xl"
    >
      <ul className="flex justify-around items-center h-full">
        <li
          className="cursor-pointer hover:text-gray-300 px-4 py-2 rounded-lg transition duration-300 ease-in-out bg-gradient-to-tr from-red-500 to-[#191B1F] via-[#191B1F]  hover:from-red-400 hover:to-neutral-700"
          onClick={() => router.push("/register")}
        >
          Register
        </li>
        <li
          className="cursor-pointer hover:text-gray-300 px-4 py-2 rounded-lg transition duration-300 ease-in-out bg-gradient-to-tr from-red-500 to-[#191B1F] via-[#191B1F] hover:from-red-400 hover:to-neutral-700"
          //   onClick={() => scrollToSection("sessions")}
        >
          Sessions
        </li>
        <li
          className="cursor-pointer hover:text-gray-300 px-4 py-2 rounded-lg transition duration-300 ease-in-out bg-gradient-to-tr from-red-500 to-[#191B1F] via-[#191B1F] hover:from-red-400 hover:to-neutral-700"
          //   onClick={() => scrollToSection("rtl")}
        >
          RTL
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
