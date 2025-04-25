import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface DotProps {
  id: number;
  x: number;
  y: number;
  size: number;
  opacity: number;
  speed: number;
}

interface NavItemProps {
  id: string;
  label: string;
  destination: string;
}

const Navbar: React.FC = () => {
  const router = useRouter();
  const [activeItem, setActiveItem] = useState<string | null>(null);
  const [hoverItem, setHoverItem] = useState<string | null>(null);

  // For animated dots in background
  const [dots, setDots] = useState<DotProps[]>([]);

  useEffect(() => {
    // Create animated background dots
    const newDots: DotProps[] = [];
    for (let i = 0; i < 12; i++) {
      newDots.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 3 + 1,
        opacity: Math.random() * 0.3 + 0.1,
        speed: Math.random() * 0.4 + 0.1,
      });
    }
    setDots(newDots);

    // Animate dots
    const animateDots = () => {
      setDots((prevDots) =>
        prevDots.map((dot) => ({
          ...dot,
          x: (dot.x + dot.speed) % 100,
        }))
      );
    };

    const intervalId = setInterval(animateDots, 100);
    return () => clearInterval(intervalId);
  }, []);

  // SVG pattern for button backgrounds
  const AccentPattern: React.FC = () => (
    <svg
      className="absolute inset-0 w-full h-full opacity-20"
      preserveAspectRatio="none"
      viewBox="0 0 100 100"
    >
      <rect width="100" height="100" fill="#191B1F" />
      <path
        d="M0,0 L100,100 M20,0 L100,80 M0,20 L80,100 M40,0 L100,60 M0,40 L60,100 M60,0 L100,40 M0,60 L40,100 M80,0 L100,20 M0,80 L20,100"
        stroke="#333842"
        strokeWidth="0.5"
        strokeLinecap="round"
      />
    </svg>
  );

  const handleClick = (destination: string, id: string): void => {
    setActiveItem(id);

    if (destination === "register") {
      router.push("/register");
    } else {
      document.querySelector(`#${destination}`)?.scrollIntoView({
        behavior: "smooth",
      });
    }

    // Reset active after animation completes
    setTimeout(() => setActiveItem(null), 600);
  };

  const navItems: NavItemProps[] = [
    { id: "register", label: "Register", destination: "register" },
    { id: "sessions", label: "Sessions", destination: "sessions" },
    { id: "contact", label: "Contact", destination: "contact" },
  ];

  return (
    <div
      id="floating-navbar"
      className="relative bg-[#1f2227] bg-opacity-70 p-3 w-full backdrop-blur-lg border border-[#333842]/30 rounded-2xl shadow-lg shadow-black/20 overflow-hidden"
    >
      {/* Animated background dots */}
      <div className="absolute inset-0 overflow-hidden">
        {dots.map((dot) => (
          <div
            key={dot.id}
            className="absolute rounded-full bg-red-500"
            style={{
              left: `${dot.x}%`,
              top: `${dot.y}%`,
              width: `${dot.size}px`,
              height: `${dot.size}px`,
              opacity: dot.opacity,
              transition: "left 0.5s linear",
            }}
          ></div>
        ))}
      </div>

      {/* Navigation items */}
      <ul className="flex justify-around sm:gap-5 items-center h-full relative z-10">
        {navItems.map((item) => (
          <li
            key={item.id}
            className={`
              relative cursor-pointer px-5 py-2 rounded-lg 
              transition duration-300 ease-in-out
              ${activeItem === item.id ? "scale-95" : "hover:scale-105"}
              group
            `}
            onClick={() => handleClick(item.destination, item.id)}
            onMouseEnter={() => setHoverItem(item.id)}
            onMouseLeave={() => setHoverItem(null)}
          >
            {/* Button background */}
            <div
              className={`
              absolute inset-0 rounded-lg bg-gradient-to-tr from-[#2c3039] to-[#191B1F] 
              transition-all duration-300
              ${hoverItem === item.id ? "opacity-100" : "opacity-90"}
              overflow-hidden
            `}
            >
              <AccentPattern />

              {/* Red accent line */}
              <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-red-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>

            {/* Text content */}
            <div className="relative z-10 flex items-center justify-center">
              <span
                className={`
                font-medium tracking-wide
                transition-all duration-300
                ${hoverItem === item.id ? "text-gray-200" : "text-gray-300"}
              `}
              >
                {item.label}
              </span>
            </div>

            {/* Animated highlight effect */}
            <div
              className={`
              absolute -inset-0.5 rounded-lg bg-gradient-to-r from-red-500/20 to-red-500/0 opacity-0
              transition-opacity duration-300 -z-10
              ${hoverItem === item.id ? "opacity-60" : ""}
            `}
            ></div>

            {/* Subtle animated indicator */}
            <div
              className={`
              absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-0 bg-red-500
              transition-all duration-300
              ${hoverItem === item.id ? "h-1/2" : ""}
            `}
            ></div>
          </li>
        ))}
      </ul>

      {/* Bottom border effect */}
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-[#191B1F] via-[#333842] to-[#191B1F]"></div>
    </div>
  );
};

export default Navbar;
