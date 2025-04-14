"use client"

import FlipClockCountdown from "@leenguyen/react-flip-clock-countdown";
import './FlipCount.css'

const FlipCounter = () => {
  return (
    <div className="senu">
      <FlipClockCountdown
        className="flip-clock relative "
        to={new Date().getTime() + 24 * 3600 * 1000 + 5000}
      />
    </div>
  );
}
export default FlipCounter