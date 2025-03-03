// import React, { useState, useRef, useEffect } from "react";
// import meshSVG from "../../assets/svg-patterns/45.svg"; // Import your external SVG file
// import ExportedImage from "next-image-export-optimizer";

// export default function HighlightedMesh() {
//   const [position, setPosition] = useState({ x: -100, y: -100 });
//   const svgRef = useRef(null);

//   useEffect(() => {
//     const svgElement = svgRef.current;

//     const handleMouseMove = (e) => {
//       if (!svgElement) return;
//       const rect = svgElement.getBoundingClientRect();
//       setPosition({
//         x: e.clientX - rect.left,
//         y: e.clientY - rect.top,
//       });
//     };

//     svgElement?.addEventListener("mousemove", handleMouseMove);
//     return () => svgElement?.removeEventListener("mousemove", handleMouseMove);
//   }, []);

//   return (
//     <div style={{ position: "relative", width: "100vw", height: "100vh" }}>
//       {/* Mesh SVG */}
//       <ExportedImage
//         ref={svgRef}
//         src={meshSVG}
//         alt="Mesh Background"
//         style={{ width: "100%", height: "100%", display: "block" }}
//       />

//       {/* Highlight Circle */}
//       <div
//         style={{
//           position: "absolute",
//           top: position.y - 40, // Adjust to center the highlight
//           left: position.x - 40,
//           width: "80px",
//           height: "80px",
//           background:
//             "radial-gradient(circle, rgba(255,255,255,0.5) 0%, rgba(255,255,255,0) 80%)",
//           borderRadius: "50%",
//           pointerEvents: "none",
//           filter: "blur(10px)",
//           transition: "transform 0.05s ease-out",
//         }}
//       />
//     </div>
//   );
// }
