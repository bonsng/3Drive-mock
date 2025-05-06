"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import Finder from "@/ui/Components/finder";
import CameraZoomControl from "@/ui/Components/3d-components/camera-zoom-control";
import FileViewer from "@/ui/FileViewer";
import FloatingFile from "@/ui/Components/3d-components/floating-file";
import React from "react";
import { useFileTree } from "@/ui/Components/context/file-tree-context";

export default function MainPage3D() {
  const { nodeMap, fileDragging, draggingNodeId } = useFileTree();
  return (
    <div className="h-[90vh] mt-6 ">
      <div className="z-0 h-full">
        <Canvas dpr={[1, 2]} camera={{ position: [-3, 0, 0], fov: 60 }}>
          <ambientLight intensity={1} />
          <directionalLight position={[-3, 3, 0]} intensity={10} />
          <Finder />
          <OrbitControls
            enableZoom={true}
            enableRotate={false}
            enablePan={false}
            target={[0, 0, 0]}
            enableDamping={true}
            dampingFactor={0.03}
            // maxDistance={3.5}
          />
          <CameraZoomControl />
          {/*<axesHelper args={[1000]} />*/}
        </Canvas>

        {fileDragging && draggingNodeId && (
          <FloatingFile
            name={nodeMap.get(draggingNodeId)?.name ?? ""}
            type={nodeMap.get(draggingNodeId)?.type ?? undefined}
          />
        )}
      </div>
      <FileViewer />
    </div>
  );
}
