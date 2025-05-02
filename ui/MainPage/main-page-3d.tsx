"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import PointSphere from "@/ui/Components/point-sphere";

export default function MainPage3D() {
  return (
    <div className="h-[90vh] mt-6 z-50">
      <Canvas dpr={[1, 2]} camera={{ position: [-3, 0, 0], fov: 60 }}>
        <ambientLight intensity={1} />
        <directionalLight position={[-3, 3, 0]} intensity={10} />
        <PointSphere />
        <OrbitControls
          enableZoom={true}
          enableRotate={false}
          target={[0, 0, 0]}
          enableDamping={true}
          dampingFactor={0.03}
          // maxDistance={3.5}
        />
        {/*<axesHelper args={[1000]} />*/}
      </Canvas>
    </div>
  );
}
