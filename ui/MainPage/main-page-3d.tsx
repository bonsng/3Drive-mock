"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import Finder from "@/ui/Components/finder";
import CameraZoomControl from "@/ui/Components/3d-components/camera-zoom-control";
import FloatingFile from "@/ui/Components/3d-components/floating-file";
import React, { useEffect } from "react";
import { useFileTree } from "@/ui/Components/context/file-tree-context";
import SearchBar from "@/ui/Components/3d-components/search-bar";
import ContextMenu from "@/ui/Components/3d-components/context-menu";

export default function MainPage3D() {
  const {
    nodeMap,
    fileDragging,
    draggingNodeId,
    isMenu,
    menuNodeId,
    setIsMenu,
  } = useFileTree();

  useEffect(() => {
    const handleClick = () => {
      setIsMenu(false);
    };

    window.addEventListener("click", handleClick);
    return () => window.removeEventListener("click", handleClick);
  }, [setIsMenu]);

  return (
    <div className="h-[90vh] mt-6 ">
      <div className="z-0 h-full">
        <Canvas
          dpr={[1, 2]}
          camera={{
            position: [-4, 0, 0],
            fov: 60,
          }}
        >
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
        {isMenu && menuNodeId && (
          <ContextMenu
            id={menuNodeId}
            type={nodeMap.get(menuNodeId)?.type ?? undefined}
          />
        )}
      </div>
      <SearchBar />
    </div>
  );
}
