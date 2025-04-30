"use client";

import { useRouter } from "next/navigation";

// Simple game register button with the specified color theme
export default function GameRegisterButton() {
  const router = useRouter();

  const handleClick = () => {
    router.push("/register-team");
  };

  return (
    <button
      onClick={handleClick}
      className="relative w-64 py-4 rounded-lg overflow-hidden hover:scale-105 transition-transform duration-300 ease-in-out"
    >
      {/* Button background with gradient using the provided color theme */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#191b1f] via-[#262930] to-[#333842]"></div>

      {/* Subtle border */}
      <div className="absolute inset-0 border border-[#2c3039] rounded-lg opacity-50"></div>

      {/* Button content */}
      <div className="relative flex items-center justify-center gap-3">
        {/* Icon */}
        <svg
          className="w-5 h-5 text-[#2c3039]"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M12 8L12 16"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M8 12L16 12"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>

        {/* Text */}
        <span className="text-lg font-bold tracking-wider text-gray-200">
          REGISTER GAME
        </span>
      </div>
    </button>
  );
}
