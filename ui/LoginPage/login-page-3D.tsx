import { Canvas } from "@react-three/fiber";
import PointSphere from "@/ui/Components/point-sphere";
import { OrbitControls } from "@react-three/drei";

export function LoginPage3D() {
  return (
    <Canvas dpr={[1, 2]} camera={{ position: [3, 3, 3], fov: 60 }}>
      {/*<Sky />*/}
      <ambientLight />
      <mesh>
        <meshBasicMaterial color="red" />
        <sphereGeometry />
      </mesh>
      <OrbitControls />
      {/*<axesHelper args={[1000]} />*/}
    </Canvas>
  );
}
