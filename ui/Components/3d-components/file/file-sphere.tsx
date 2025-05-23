import React, { useEffect, useRef, useState } from "react";
import { OrbitControls as OrbitControlsImpl } from "three-stdlib";
import { ThreeEvent, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { Html } from "@react-three/drei";
import clsx from "clsx";
import { useFileTree } from "@/ui/Components/context/file-tree-context";
import FolderModel from "@/lib/folder-model";
import FileModel from "@/lib/file-model";
import { getTypeFromExtension } from "@/lib/extension";
import { useModal } from "@/ui/Modal/modal.hook";
import { useFolderRefContext } from "@/ui/Components/context/folder-ref-context";
import RootModel from "@/lib/root-model";

interface PFileSphere {
  id: number;
  position: number[];
  type: string;
  title?: string;
  showSearch: boolean;
  parentId: number | null;
}

const FileSphere = (props: PFileSphere) => {
  const { id, position, type, title, showSearch, parentId } = props;
  const [hovered, setHovered] = useState(false);
  const {
    fileDragging,
    setFileDragging,
    setDraggingNodeId,
    setIsMenu,
    setMenuNodeId,
    setContextMenuPos,
  } = useFileTree();
  const meshRef = useRef<THREE.Group>(null);
  const { openModal } = useModal("FileModal");
  const pressTimer = useRef<NodeJS.Timeout | null>(null);
  const isFile = type === "file";
  const { registerFolderRef, unregisterFolderRef } = useFolderRefContext();
  const { camera } = useThree();
  const controls = useThree((state) => state.controls) as OrbitControlsImpl;

  const handlePointerDown = (e: ThreeEvent<PointerEvent>) => {
    e.stopPropagation();
    pressTimer.current = setTimeout(() => {
      setFileDragging(true);
      setDraggingNodeId(id);
    }, 350);
  };

  const handlePointerUp = (e: ThreeEvent<PointerEvent>) => {
    e.stopPropagation();
    if (pressTimer.current) {
      clearTimeout(pressTimer.current);
      pressTimer.current = null;
    }

    setFileDragging(false);
    setDraggingNodeId(null);
  };

  const handlePointerOut = () => {
    setHovered(false);
    if (pressTimer.current) {
      clearTimeout(pressTimer.current);
      pressTimer.current = null;
    }
  };

  const focusCameraOnGroup = () => {
    if (!meshRef.current) return;

    const targetPosition = new THREE.Vector3();
    meshRef.current.getWorldPosition(targetPosition);

    const basePosition = new THREE.Vector3(-10, 0, 0);
    const direction = new THREE.Vector3()
      .subVectors(targetPosition, basePosition)
      .normalize();
    const newCameraPosition = targetPosition
      .clone()
      .sub(direction.clone().multiplyScalar(0.3));

    camera.position.copy(newCameraPosition);

    // OrbitControls가 있다면 target 도 갱신
    if (controls && controls.target) {
      controls.target.copy(targetPosition);
      controls.update();
    } else {
      camera.lookAt(targetPosition);
    }
  };

  const handleDoubleClick = (e: ThreeEvent<MouseEvent>) => {
    e.stopPropagation();
    if (title) openModal({ title, ext: extension, parentId });
  };

  useEffect(() => {
    const current = document.body.style.cursor;
    const next = hovered || fileDragging ? "pointer" : "auto";
    if (current !== next) {
      document.body.style.cursor = next;
    }
  }, [hovered, fileDragging]);

  useFrame(() => {
    if (!meshRef.current) return;

    const targetScale = hovered ? 1.5 : 1;
    meshRef.current.scale.lerp(
      new THREE.Vector3(targetScale, targetScale, targetScale),
      0.1,
    );
    meshRef.current.lookAt(camera.position);
  });

  const extension = getTypeFromExtension(
    title?.split(".").pop()?.toLowerCase(),
  );

  useEffect(() => {
    if (type === "folder" && meshRef.current) {
      registerFolderRef(id, meshRef.current);
      return () => unregisterFolderRef(id);
    }
  }, [type, id, registerFolderRef, unregisterFolderRef]);

  const handleContextMenu = (e: ThreeEvent<MouseEvent>) => {
    e.stopPropagation();
    const { clientX, clientY } = e.nativeEvent;
    setContextMenuPos({ x: clientX, y: clientY });
    setIsMenu(true);
    setMenuNodeId(id);
  };

  return (
    <group
      ref={meshRef}
      position={[position[0], position[1], position[2]]}
      userData={{ id, type: isFile ? "file" : "folder" }}
      onPointerOver={() => setHovered(true)}
      onPointerDown={id && handlePointerDown}
      onPointerUp={handlePointerUp}
      onPointerOut={handlePointerOut}
      onDoubleClick={isFile ? handleDoubleClick : focusCameraOnGroup}
      onContextMenu={handleContextMenu}
    >
      {type === "folder" ? (
        parentId ? (
          <FolderModel />
        ) : (
          <RootModel />
        )
      ) : (
        <FileModel extension={extension} />
      )}

      {title && (
        <Html
          center
          position={[0, 0.05, 0]}
          distanceFactor={2}
          zIndexRange={[0, 10]}
        >
          <div
            className={clsx(
              "bg-transparent text-xs whitespace-nowrap transition-opacity pointer-events-none rounded-sm p-1 font-poppins",
              { "text-white font-bold": hovered },
              { "text-gray-400": !hovered },
              { "opacity-0 pointer-events-none": showSearch },
            )}
          >
            {title}
          </div>
        </Html>
      )}
    </group>
  );
};

export default FileSphere;
