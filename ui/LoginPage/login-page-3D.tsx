import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import LogoModel from "@/lib/logo-model";

export function LoginPage3D() {
  return (
    <Canvas dpr={[1, 2]} camera={{ position: [0, 0, 1], fov: 60 }}>
      <ambientLight intensity={2} />
      <directionalLight position={[1, 0.5, 1]} intensity={300} />
      <directionalLight position={[-1, 0.5, 1]} intensity={300} />
      <directionalLight position={[0, 0, 1]} intensity={100} />

      <LogoModel />

      <OrbitControls />
    </Canvas>
  );
}
