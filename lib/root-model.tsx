import { useGLTF } from "@react-three/drei";
import React from "react";

const RootModel = () => {
  const { scene } = useGLTF("/models/root_sphere_glb.glb");
  return (
    <primitive
      object={scene.children[0].clone()}
      scale={2}
      position={[0, 0, 0]}
    />
  );
};

export default RootModel;
