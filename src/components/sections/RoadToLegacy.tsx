"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

// Define types for component props and state
interface MousePosition {
  x: number;
  y: number;
}

interface Node {
  cx: number;
  cy: number;
}

const RoadToLegacy: React.FC = () => {
  const [mousePosition, setMousePosition] = useState<MousePosition>({
    x: 0,
    y: 0,
  });
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isHovered, setIsHovered] = useState<boolean>(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent): void => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      setMousePosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener("mousemove", handleMouseMove);
    }

    return () => {
      if (container) {
        container.removeEventListener("mousemove", handleMouseMove);
      }
    };
  }, []);

  const calculateDistance = (
    x: number,
    y: number,
    cx: number,
    cy: number
  ): number => {
    return Math.sqrt(Math.pow(x - cx, 2) + Math.pow(y - cy, 2));
  };

  // Define the nodes array
  const nodes: Node[] = [
    { cx: 100, cy: 100 },
    { cx: 300, cy: 80 },
    { cx: 500, cy: 120 },
    { cx: 700, cy: 90 },
    { cx: 150, cy: 300 },
    { cx: 350, cy: 280 },
    { cx: 550, cy: 320 },
    { cx: 650, cy: 250 },
  ];

  return (
    <div className="w-full flex items-center justify-center p-8">
      <motion.div
        ref={containerRef}
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.3 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative w-full max-w-4xl rounded-2xl overflow-hidden bg-[#1f2227] text-white p-8"
        style={{ minHeight: "240px" }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Dynamic SVG Background */}
        <svg
          className="absolute inset-0 w-full h-full z-0"
          viewBox="0 0 800 400"
          preserveAspectRatio="none"
        >
          {/* Gradient Background */}
          <defs>
            <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#191b1f" />
              <stop offset="100%" stopColor="#262930" />
            </linearGradient>

            {/* Enhanced mouse glow with multiple gradients */}
            <radialGradient
              id="mouseGlowOuter"
              cx="50%"
              cy="50%"
              r="50%"
              fx="50%"
              fy="50%"
            >
              <stop offset="0%" stopColor="rgba(51, 56, 66, 0.4)" />
              <stop offset="70%" stopColor="rgba(44, 48, 57, 0.1)" />
              <stop offset="100%" stopColor="rgba(25, 27, 31, 0)" />
            </radialGradient>

            {/* Inner glow with subtle red accent */}
            <radialGradient
              id="mouseGlowInner"
              cx="50%"
              cy="50%"
              r="30%"
              fx="50%"
              fy="50%"
            >
              <stop offset="0%" stopColor="rgba(180, 60, 60, 0.15)" />
              <stop offset="70%" stopColor="rgba(100, 40, 40, 0.05)" />
              <stop offset="100%" stopColor="rgba(51, 56, 66, 0)" />
            </radialGradient>

            {/* Accent glow for nodes */}
            <radialGradient
              id="nodeGlow"
              cx="50%"
              cy="50%"
              r="50%"
              fx="50%"
              fy="50%"
            >
              <stop offset="0%" stopColor="#333842" />
              <stop offset="100%" stopColor="#2c3039" />
            </radialGradient>

            {/* Connection lines gradient */}
            <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#333842" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#2c3039" stopOpacity="0.3" />
            </linearGradient>
          </defs>

          <rect width="100%" height="100%" fill="url(#grad1)" />

          {/* Dynamic Grid Pattern */}
          <g className="opacity-30">
            {Array.from({ length: 20 }).map((_, i) => (
              <line
                key={`h-${i}`}
                x1="0"
                y1={i * 20}
                x2="800"
                y2={i * 20}
                stroke="#475569"
                strokeWidth="0.5"
                strokeDasharray="4 6"
              />
            ))}
            {Array.from({ length: 40 }).map((_, i) => (
              <line
                key={`v-${i}`}
                x1={i * 20}
                y1="0"
                x2={i * 20}
                y2="400"
                stroke="#475569"
                strokeWidth="0.5"
                strokeDasharray="4 6"
              />
            ))}
          </g>

          {/* Enhanced node connections with dynamic opacity based on mouse position */}
          {isHovered &&
            nodes.map((node, i) => {
              const mouseX =
                (mousePosition.x * 800) /
                (containerRef.current?.offsetWidth || 1);
              const mouseY =
                (mousePosition.y * 400) /
                (containerRef.current?.offsetHeight || 1);
              const distance = calculateDistance(
                mouseX,
                mouseY,
                node.cx,
                node.cy
              );

              // Only draw connections if mouse is close enough
              if (distance < 150) {
                const opacity = Math.max(0, 1 - distance / 150);
                return (
                  <line
                    key={`connection-${i}`}
                    x1={mouseX}
                    y1={mouseY}
                    x2={node.cx}
                    y2={node.cy}
                    stroke="url(#lineGrad)"
                    strokeWidth={Math.max(0.5, 2 - distance / 100)}
                    opacity={opacity * 200}
                    strokeDasharray={distance > 100 ? "4 2" : "none"}
                  />
                );
              }
              return null;
            })}

          {/* Connection Nodes */}
          {nodes.map((node, i) => {
            const distance = isHovered
              ? calculateDistance(
                  (mousePosition.x * 800) /
                    (containerRef.current?.offsetWidth || 1),
                  (mousePosition.y * 400) /
                    (containerRef.current?.offsetHeight || 1),
                  node.cx,
                  node.cy
                )
              : 1000;
            const scale = isHovered
              ? Math.max(0.5, Math.min(1.8, 100 / (distance + 20)))
              : 1;

            // Add slight red highlight for close nodes
            const fillColor = distance < 80 ? "#3d2a33" : "#2c3039";
            const strokeColor = distance < 80 ? "#b04a4a" : "#333842";
            const pulseAnimation = distance < 100;

            return (
              <g key={i}>
                {/* Node glow effect */}
                {isHovered && distance < 150 && (
                  <circle
                    cx={node.cx}
                    cy={node.cy}
                    r={15 * scale}
                    fill="url(#nodeGlow)"
                    opacity={0.3}
                    className="transition-all duration-300"
                  />
                )}

                {/* Main node circle */}
                <circle
                  cx={node.cx}
                  cy={node.cy}
                  r={4 * scale}
                  fill={fillColor}
                  className={`transition-all duration-100 ${pulseAnimation ? "animate-pulse" : ""}`}
                />

                {/* Node outer ring */}
                <circle
                  cx={node.cx}
                  cy={node.cy}
                  r={10 * scale}
                  fill="transparent"
                  stroke={strokeColor}
                  strokeWidth="1"
                  opacity={0.6}
                  className="transition-all duration-100"
                />
              </g>
            );
          })}

          {/* Multi-layer mouse interaction glow */}
          {isHovered && (
            <>
              {/* Outer glow */}
              <circle
                cx={
                  (mousePosition.x * 800) /
                  (containerRef.current?.offsetWidth || 1)
                }
                cy={
                  (mousePosition.y * 400) /
                  (containerRef.current?.offsetHeight || 1)
                }
                r="180"
                fill="url(#mouseGlowOuter)"
              />

              {/* Inner glow with subtle red accent */}
              <circle
                cx={
                  (mousePosition.x * 800) /
                  (containerRef.current?.offsetWidth || 1)
                }
                cy={
                  (mousePosition.y * 400) /
                  (containerRef.current?.offsetHeight || 1)
                }
                r="100"
                fill="url(#mouseGlowInner)"
              />

              {/* Center dot */}
              <circle
                cx={
                  (mousePosition.x * 800) /
                  (containerRef.current?.offsetWidth || 1)
                }
                cy={
                  (mousePosition.y * 400) /
                  (containerRef.current?.offsetHeight || 1)
                }
                r="4"
                fill="#333842"
                stroke="#b04a4a"
                strokeWidth="1"
                opacity="0.7"
              />
            </>
          )}
        </svg>

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center">
          <motion.div
            initial={{ scale: 1 }}
            animate={{
              scale: [1, 1.03, 1],
              transition: {
                duration: 5,
                repeat: Infinity,
                repeatType: "mirror",
              },
            }}
            className="mb-6"
          >
            <svg width="80" height="80" viewBox="0 0 200 200">
              <path
                d="M100,20 L160,50 L160,150 L100,180 L40,150 L40,50 Z"
                fill="none"
                stroke="#333842"
                strokeWidth="4"
              />
              <path
                d="M100,40 L140,60 L140,140 L100,160 L60,140 L60,60 Z"
                fill="none"
                stroke="#2c3039"
                strokeWidth="3"
              />
              <path
                d="M100,60 L120,70 L120,130 L100,140 L80,130 L80,70 Z"
                fill="#1f2227"
                fillOpacity="0.6"
                stroke="#3b5c7d"
                strokeWidth="2"
              />
              <text
                x="100"
                y="105"
                textAnchor="middle"
                fill="white"
                fontSize="14"
                fontWeight="bold"
              >
                IT
              </text>
            </svg>
          </motion.div>

          <motion.h2
            className="text-2xl font-bold mb-4 text-center bg-clip-text text-transparent bg-gradient-to-r from-gray-200 to-gray-100"
            whileHover={{ scale: 1.03 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            IT Legacy Connection
          </motion.h2>

          <motion.p
            className="text-base text-center max-w-2xl leading-relaxed opacity-80"
            initial={{ opacity: 0.7 }}
            whileHover={{ opacity: 1 }}
          >
            IT Legacy connects IT students from UOM, USJ, and UOC, fostering
            collaboration, networking, and professional growth. Our platform
            unites tech enthusiasts, keeping them informed and engaged with the
            evolving industry.
          </motion.p>

          <motion.button
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.98 }}
            className="mt-6 px-6 py-2 bg-[#262930] hover:bg-[#2c3039] rounded-lg text-white font-medium flex items-center border border-[#333842]"
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <span>Join the Network</span>
            <svg
              className="ml-2 w-4 h-4"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

export default RoadToLegacy;
