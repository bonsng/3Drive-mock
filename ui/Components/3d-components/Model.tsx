import { useGLTF } from "@react-three/drei";
import React, { useEffect } from "react";
import * as THREE from "three";

interface ModelProps {
  path: string;
}

export default function Model({ path }: ModelProps) {
  const { scene } = useGLTF(path);

  useEffect(() => {
    console.log("GLTF loaded scene:", scene);
    scene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        console.log("Mesh:", child.name, child.visible, child);
      }
    });
  }, [scene]);

  return <primitive object={scene.children[0]} scale={1} />;
}
