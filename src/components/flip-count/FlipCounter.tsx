"use client";

import { useEffect, useState } from "react";
import FlipClockCountdown from "@leenguyen/react-flip-clock-countdown";
import "./FlipCount.css";

const FlipCounter = () => {
  const [targetTime, setTargetTime] = useState<number | null>(null);

  useEffect(() => {
    // Set target time to May 31, 2025 at 00:00:00
    const targetDate = new Date("2025-05-31T00:00:00");
    // const targetDate = new Date("2025-05-15T20:00:00");
    setTargetTime(targetDate.getTime());
  }, []);

  if (!targetTime) return null; // or a loading spinner

  return (
    <div className="relative top-1 md:top-5">
      <FlipClockCountdown className="flip-clock relative" to={targetTime} />
    </div>
  );
};

export default FlipCounter;
