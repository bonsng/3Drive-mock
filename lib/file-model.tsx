import { useGLTF } from "@react-three/drei";
import React from "react";

const pathMap: Record<string, string> = {
  pdf: "/models/pdf_sphere_glb.glb",
  word: "/models/word_sphere_glb.glb",
  excel: "/models/excel_sphere_glb.glb",
  image: "/models/image_sphere_glb.glb",
  photoshop: "/models/photoshop_sphere_glb.glb",
  video: "/models/video_sphere_glb.glb",
  ppt: "/models/ppt_sphere_glb.glb",
  pptx: "/models/pptx_sphere_glb.glb",
  music: "/models/music_sphere_glb.glb",
  zip: "/models/zip_sphere_glb.glb",
  free: "/models/free_sphere_glb.glb",
};

type FileModelProps = {
  extension?: string;
};

const FileModel = ({ extension = "unknown" }: FileModelProps) => {
  const path = pathMap[extension];
  const { scene } = useGLTF(path);

  return (
    <primitive
      receiveShadow={false}
      object={scene.children[0].clone()}
      scale={2}
      position={[0, 0, 0]}
    />
  );
};

export default FileModel;
