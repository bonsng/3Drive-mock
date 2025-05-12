import React, { useEffect, useRef, useState } from "react";
import { ThreeEvent, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { Html } from "@react-three/drei";
import clsx from "clsx";
import { useFileTree } from "@/ui/Components/context/file-tree-context";
import FolderModel from "@/lib/folder-model";
import FileModel from "@/lib/file-model";
import { getTypeFromExtension } from "@/lib/extension";
import { useModal } from "@/ui/Modal/modal.hook";

interface PFileSphere {
  id: string;
  position: number[];
  type: string;
  title?: string;
  showSearch: boolean;
}

const FileSphere = (props: PFileSphere) => {
  const { id, position, type, title, showSearch } = props;
  const [hovered, setHovered] = useState(false);
  const { fileDragging, setFileDragging, setDraggingNodeId } = useFileTree();
  const meshRef = useRef<THREE.Group>(null);
  const { openModal } = useModal("FileModal");
  const pressTimer = useRef<NodeJS.Timeout | null>(null);

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
  });

  const extension = getTypeFromExtension(
    title?.split(".").pop()?.toLowerCase(),
  );
  const isFile = type === "file";

  return (
    <group
      ref={meshRef}
      position={[position[0], position[1], position[2]]}
      userData={{ id, type: isFile ? "file" : "folder" }}
      onPointerOver={() => setHovered(true)}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      onPointerOut={handlePointerOut}
      onDoubleClick={(e) => {
        e.stopPropagation();
        if (title) openModal({ title, ext: extension });
      }}
    >
      {type === "folder" ? (
        <FolderModel />
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
              "bg-transparent text-xs whitespace-nowrap transition-opacity pointer-events-none rounded-sm p-1",
              { "text-black bg-white font-bold": hovered },
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
