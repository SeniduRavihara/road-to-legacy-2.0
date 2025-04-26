"use client";

import { useRef, useEffect, useState, JSX } from "react";

interface Dimensions {
  width: number;
  height: number;
}

interface Point {
  x: number;
  y: number;
  vx: number;
  vy: number;
  connections: number[];
}

export default function NetworkBackground(): JSX.Element {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [dimensions, setDimensions] = useState<Dimensions>({
    width: 0,
    height: 0,
  });

  useEffect(() => {
    // Set initial dimensions
    setDimensions({
      width: window.innerWidth,
      height: window.innerHeight,
    });

    // Handle resize
    const handleResize = (): void => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const { width, height } = dimensions;

    canvas.width = width;
    canvas.height = height;

    // Theme colors - Change these to modify the background gradient
    const colors = ["#191b1f", "#1f2227", "#262930", "#2c3039", "#333842"];

    // Create a grid of points
    const gridSpacing = 120;
    const jitter = 40; // Random offset for each point
    const pointsX = Math.ceil(width / gridSpacing) + 1;
    const pointsY = Math.ceil(height / gridSpacing) + 1;
    const points: Point[] = [];

    for (let y = 0; y < pointsY; y++) {
      for (let x = 0; x < pointsX; x++) {
        points.push({
          x: x * gridSpacing + (Math.random() * jitter * 2 - jitter),
          y: y * gridSpacing + (Math.random() * jitter * 2 - jitter),
          vx: (Math.random() - 0.5) * 0.8, // Animation speed - increase for faster movement
          vy: (Math.random() - 0.5) * 0.8, // Animation speed - increase for faster movement
          connections: [],
        });
      }
    }

    // Precompute connections for each point
    const connectionDistance = gridSpacing * 1.6; // Slightly more than grid spacing
    for (let i = 0; i < points.length; i++) {
      const p1 = points[i];
      for (let j = i + 1; j < points.length; j++) {
        const p2 = points[j];
        const dx = p1.x - p2.x;
        const dy = p1.y - p2.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < connectionDistance) {
          p1.connections.push(j);
        }
      }
    }

    const animate = (): void => {
      // Create gradient background - Change this to modify the background
      const gradient = ctx.createLinearGradient(0, 0, width, height);
      gradient.addColorStop(0, colors[0]);
      gradient.addColorStop(1, colors[4]);
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      // Update point positions
      for (let i = 0; i < points.length; i++) {
        const point = points[i];

        // Move points
        point.x += point.vx;
        point.y += point.vy;

        // Bounce off edges with some padding
        const padding = 50;
        if (point.x < -padding) point.x = width + padding;
        if (point.x > width + padding) point.x = -padding;
        if (point.y < -padding) point.y = height + padding;
        if (point.y > height + padding) point.y = -padding;
      }

      // Draw connections
      ctx.lineWidth = 0.75;

      for (let i = 0; i < points.length; i++) {
        const point = points[i];

        // Draw connections - Change this to modify the line color
        for (const j of point.connections) {
          const point2 = points[j];
          const dx = point.x - point2.x;
          const dy = point.y - point2.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          // Only draw if still in range
          if (distance < connectionDistance) {
            const opacity = 1 - distance / connectionDistance;
            ctx.beginPath();
            ctx.moveTo(point.x, point.y);
            ctx.lineTo(point2.x, point2.y);
            // Change this to modify the foreground line color
            ctx.strokeStyle = `rgba(80, 100, 140, ${opacity * 0.3})`;
            ctx.stroke();
          }
        }

        // Draw node (very small) - Change this to modify the dot color
        ctx.beginPath();
        ctx.arc(point.x, point.y, 1, 0, Math.PI * 2);
        // Change this to modify the foreground dot color
        ctx.fillStyle = "rgba(120, 140, 180, 0.6)";
        ctx.fill();
      }

      requestAnimationFrame(animate);
    };

    const animationId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationId);
  }, [dimensions]);

  return (
    <div className="absolute inset-0 -z-10">
      <canvas ref={canvasRef} className="w-full h-full" />
    </div>
  );
}
