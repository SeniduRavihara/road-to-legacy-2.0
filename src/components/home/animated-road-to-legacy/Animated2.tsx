import { useLoading } from "@/context/LoadingContext";
import { useEffect, useRef } from "react";
import "./AnimatedRoadToLegacy.css";


const Animated2 = () => {
  const { loading } = useLoading();
    const svgRef = useRef<SVGSVGElement | null>(null);
  
     useEffect(() => {
       if (!loading) {
         function setTextAnimation(
           delay: number,
           duration: number,
           strokeWidth: number,
           timingFunction: string,
           strokeColor: string,
           repeat: boolean
         ) {
           const paths = svgRef.current?.querySelectorAll("path");
           const mode = repeat ? "infinite" : "forwards";
           paths?.forEach((path, i) => {
             const length = (path as SVGPathElement).getTotalLength();
             path.style.strokeDashoffset = `${length}px`;
             path.style.strokeDasharray = `${length}px`;
             path.style.strokeWidth = `${strokeWidth}px`;
             path.style.stroke = strokeColor;
             path.style.animation = `${duration}s svg-text-animation ${mode} ${timingFunction}`;
             path.style.animationDelay = `${i * delay}s`;
           });
         }

         // Trigger animation when loading finishes
         setTextAnimation(0.1, 3.2, 2, "ease-in", "#ffffff", false);
       }
     }, [loading]); // Re-run when loading changes

     // Only render after loading is false
     if (loading) return null;

  return (
    <div className="flex items-center justify-center w-[300px] sm:w-[450px] md:w-[450px] lg:w-[500px] ">
      <svg
        width="62.281"
        height="21.751"
        viewBox="0 0 62.281 21.751"
        xmlns="http://www.w3.org/2000/svg"
        className="custom-porto-svg-logo active"
        ref={svgRef}
      >
        <g
          id="svgGroup"
          strokeLinecap="round"
          fillRule="evenodd"
          fontSize="9pt"
          stroke="#000"
          strokeWidth="0.25mm"
          fill="none"
          style={{ stroke: "#000", strokeWidth: "0.25mm", fill: "none" }}
        >
          <path
            d="M 23.37 21.6 L 0 21.6 L 0 15.24 Q 0 12.24 1.68 10.59 A 5.377 5.377 0 0 1 3.897 9.303 Q 5.066 8.94 6.57 8.94 L 16.44 8.94 A 4.866 4.866 0 0 0 17.511 8.833 Q 19.009 8.494 19.246 7.08 A 3.448 3.448 0 0 0 19.29 6.51 A 2.939 2.939 0 0 0 19.123 5.476 Q 18.6 4.08 16.44 4.08 L 0.48 4.08 L 0.48 0.18 L 17.37 0.18 A 9.314 9.314 0 0 1 19.309 0.37 Q 21.07 0.745 22.215 1.86 A 5.53 5.53 0 0 1 23.746 4.661 A 8.301 8.301 0 0 1 23.94 6.51 A 8.226 8.226 0 0 1 23.727 8.439 A 5.509 5.509 0 0 1 22.215 11.16 Q 20.49 12.84 17.37 12.84 L 7.23 12.84 Q 5.94 12.84 5.295 13.485 Q 4.682 14.099 4.652 15.186 A 4.106 4.106 0 0 0 4.65 15.3 L 4.65 17.73 L 23.37 17.73 L 23.37 21.6 Z"
            id="0"
            vectorEffect="non-scaling-stroke"
          />
          <path
            d="M 31.44 21.6 L 26.64 21.6 L 26.64 17.31 L 31.44 17.31 L 31.44 21.6 Z"
            id="1"
            vectorEffect="non-scaling-stroke"
          />
          <path
            d="M 50.04 21.75 L 46.14 21.75 A 19.698 19.698 0 0 1 42.617 21.455 Q 40.643 21.096 39.077 20.299 A 9.965 9.965 0 0 1 37.125 19.005 Q 34.009 16.353 33.904 11.221 A 17.641 17.641 0 0 1 33.9 10.86 Q 33.9 5.49 37.125 2.745 A 10.712 10.712 0 0 1 41.062 0.665 Q 42.594 0.208 44.42 0.065 A 22.062 22.062 0 0 1 46.14 0 L 50.04 0 Q 54.256 0 57.103 1.441 A 9.87 9.87 0 0 1 59.07 2.745 A 8.787 8.787 0 0 1 61.866 7.34 Q 62.241 8.781 62.277 10.502 A 17.53 17.53 0 0 1 62.28 10.86 A 14.458 14.458 0 0 1 61.951 14.047 Q 61.47 16.173 60.289 17.72 A 8.394 8.394 0 0 1 59.07 19.005 A 10.603 10.603 0 0 1 55.208 21.064 Q 52.95 21.75 50.04 21.75 Z M 46.47 17.85 L 49.71 17.85 A 13.71 13.71 0 0 0 51.869 17.692 Q 52.98 17.514 53.873 17.138 A 5.959 5.959 0 0 0 55.44 16.185 A 5.104 5.104 0 0 0 56.933 13.938 Q 57.233 13.083 57.336 12.027 A 11.987 11.987 0 0 0 57.39 10.86 A 10.581 10.581 0 0 0 57.232 8.969 Q 57.039 7.908 56.61 7.074 A 5.137 5.137 0 0 0 55.77 5.88 L 43.98 17.64 Q 45.09 17.85 46.47 17.85 Z M 40.38 15.84 L 52.14 4.11 Q 51.06 3.9 49.71 3.9 L 46.47 3.9 A 13.871 13.871 0 0 0 44.337 4.054 Q 43.216 4.228 42.317 4.603 A 5.974 5.974 0 0 0 40.74 5.55 A 5.049 5.049 0 0 0 39.25 7.781 Q 38.79 9.084 38.79 10.86 Q 38.79 13.112 39.544 14.624 A 5.145 5.145 0 0 0 40.38 15.84 Z"
            id="2"
            vectorEffect="non-scaling-stroke"
          />
        </g>
      </svg>
    </div>
  );
}
export default Animated2