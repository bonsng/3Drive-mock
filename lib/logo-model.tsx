import { useGLTF } from "@react-three/drei";
import * as THREE from "three";
import { useEffect, useRef } from "react";
import { useFrame } from "@react-three/fiber";

export default function LogoModel() {
  const { scene } = useGLTF("/models/Logo.glb");
  const groupRef = useRef<THREE.Group>(null);

  useFrame(() => {
    if (groupRef.current) {
      const axis = new THREE.Vector3(0, 1, 0).normalize();
      groupRef.current.rotateOnWorldAxis(axis, 0.003);
    }
  });

  useEffect(() => {
    scene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        (child as THREE.Mesh).material = new THREE.MeshPhysicalMaterial({
          metalness: 1,
          roughness: 0.1,
          color: "#dddddd",
        });
      }
    });
  }, [scene]);

  return (
    <group ref={groupRef}>
      <primitive position={[0.75, -0.2, 0]} scale={2} object={scene} />
    </group>
  );
}
