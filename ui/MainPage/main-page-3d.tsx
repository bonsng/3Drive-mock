"use client";

import { Canvas } from "@react-three/fiber";
import Finder from "@/ui/Components/finder";
import CameraZoomControl from "@/ui/Components/3d-components/camera/camera-zoom-control";
import FloatingFile from "@/ui/Components/3d-components/file/floating-file";
import React, { useEffect } from "react";
import { useFileTree } from "@/ui/Components/context/file-tree-context";
import SearchBar from "@/ui/Components/3d-components/search/search-bar";
import ContextMenu from "@/ui/Components/3d-components/file/context-menu";
import SideNav from "@/ui/Components/side-nav";
import { angles } from "@/lib/angles";
import CameraControls from "@/ui/Components/3d-components/camera/camera-controls";
import { useShowNavContext } from "@/ui/Components/context/nav-context";

export default function MainPage3D() {
  const {
    nodePositionMap,
    fileDragging,
    draggingNodeId,
    isMenu,
    menuNodeId,
    setIsMenu,
  } = useFileTree();

  const { showNav, viewState } = useShowNavContext();

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
            position: [-5, 0, 0],
            fov: 60,
          }}
        >
          <ambientLight intensity={2.0} />
          <directionalLight position={[-3, 3, 0]} intensity={10} />

          <Finder />
          <CameraControls
            position={angles[viewState].position}
            target={angles[viewState].target}
          />
          <CameraZoomControl />
          {/*<axesHelper args={[1000]} />*/}
        </Canvas>

        {fileDragging && draggingNodeId && (
          <FloatingFile
            name={nodePositionMap.get(draggingNodeId)?.name ?? ""}
            type={nodePositionMap.get(draggingNodeId)?.type ?? undefined}
          />
        )}
        {isMenu && menuNodeId && (
          <ContextMenu
            id={menuNodeId}
            type={nodePositionMap.get(menuNodeId)?.type ?? undefined}
          />
        )}
      </div>
      {showNav && <SideNav />}
      <SearchBar />
    </div>
  );
}
