import { useGLTF } from "@react-three/drei";
import React from "react";

const FolderModel = () => {
  const { scene } = useGLTF("/models/folder_sphere_glb.glb");
  return (
    <primitive
      object={scene.children[0].clone()}
      scale={2}
      position={[0, 0, 0]}
    />
  );
};

export default FolderModel;
