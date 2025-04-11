"use client";

import { useEffect, useRef, useState } from "react";
import NET, { VantaEffect } from "vanta/dist/vanta.net.min";

const VantaBackgroundProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [vantaEffect, setVantaEffect] = useState<VantaEffect | null>(null); // Corrected type
  const myRef = useRef<HTMLDivElement | null>(null); // Typing useRef for HTMLDivElement specifically

  useEffect(() => {
    if (!vantaEffect && myRef.current) {
      // Ensure myRef.current is not null
      const effect = NET({
        el: myRef.current, // Now TypeScript knows myRef.current will be an HTMLDivElement
        color: 0x333842,
        backgroundColor: 0x191b1f,
      });
      setVantaEffect(effect); // Set the effect object
    }

    return () => {
      vantaEffect?.destroy(); // Cleanup when the component unmounts
    };
  }, [vantaEffect]);

  return (
    <div>
      <div ref={myRef} className="w-screen h-screen fixed top-0 left-0"></div>
      {children}
    </div>
  );
};

export default VantaBackgroundProvider;
