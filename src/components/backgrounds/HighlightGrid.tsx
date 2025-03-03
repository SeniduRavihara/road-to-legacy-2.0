"use client"

import React, { useState, useEffect } from "react";

function HighlightGrid() {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    // interface Position {
    //   x: number;
    //   y: number;
    // }

    const updatePosition = (e: MouseEvent): void => {
      const gridSize = 45; // Same as --size in CSS
      const x = Math.floor(e.clientX / gridSize) * gridSize;
      const y = Math.floor(e.clientY / gridSize) * gridSize;
      setPosition({ x, y });
    };

    window.addEventListener("mousemove", updatePosition);
    return () => window.removeEventListener("mousemove", updatePosition);
  }, []);

  return (
    <div
      className="grid-highlight"
      style={{
        transform: `translate(${position.x}px, ${position.y}px)`,
      }}
    />
  );
}

export default HighlightGrid