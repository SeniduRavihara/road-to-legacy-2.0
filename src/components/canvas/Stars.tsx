import { JSX, Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { PointMaterial, Points, Preload } from "@react-three/drei";
import * as random from "maath/random";
import { Points as ThreePoints } from "three";

type StarsProps = JSX.IntrinsicElements["group"];

function Stars(props: StarsProps) {
  const ref = useRef<ThreePoints>(null); // Correct ref type for Points

  useFrame((_state, delta) => {
    if (ref.current) {
      ref.current.rotation.x -= delta / 10;
      ref.current.rotation.y -= delta / 15;
    }
  });

  const sphere = random.inSphere(new Float32Array(5000), {
    radius: 1.2,
  }) as Float32Array;

  return (
    <group rotation={[0, 0, Math.PI / 4]} {...props}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled>
        <PointMaterial
          transparent
          color="#333842"
          size={0.002}
          sizeAttenuation={true}
          depthWrite={false}
          opacity={0.8}
        />
      </Points>
    </group>
  );
}

function StarsCanvas() {
  return (
    <div className="w-full h-full inset-0 absolute z-[1]">
      <Canvas camera={{ position: [0, 0, 1] }}>
        <Suspense fallback={null}>
          <Stars />
        </Suspense>
        <Preload all />
      </Canvas>
    </div>
  );
}

export default StarsCanvas;
