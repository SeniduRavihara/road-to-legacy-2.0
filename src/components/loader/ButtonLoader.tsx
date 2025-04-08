import React from "react";
import "./ButtonLoader.css";

interface ButtonLoaderProps {
  size?: string; // Accepts Tailwind CSS size classes like 'w-8 h-8'
}

const ButtonLoader: React.FC<ButtonLoaderProps> = ({ size = "w-10 h-10" }) => {
  return (
    <div
      className={`profile-main-loader flex items-center justify-center ${size}`}
    >
      <div className={`loader relative ${size}`}>
        <svg
          className="circular-loader"
          viewBox="25 25 50 50"
          style={{ width: "100%", height: "100%" }}
        >
          <circle
            className="loader-path"
            cx="50"
            cy="50"
            r="20"
            fill="none"
            stroke="#70c542"
            strokeWidth="2"
          />
        </svg>
      </div>
    </div>
  );
};

export default ButtonLoader;
