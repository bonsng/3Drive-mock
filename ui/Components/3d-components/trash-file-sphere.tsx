import React, { useEffect, useRef, useState } from "react";
import FileModel from "@/lib/file-model";
import FolderModel from "@/lib/folder-model";
import { getTypeFromExtension } from "@/lib/extension";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import clsx from "clsx";

interface PTrashFileSphere {
  id: string;
  position: [number, number, number];
  type: string;
  title?: string;
  onHover: (title: string | undefined) => void;
}

const TrashFileSphere = (props: PTrashFileSphere) => {
  const { id, position, type, title, onHover } = props;
  const groupRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);

  useFrame(() => {
    if (!groupRef.current) return;

    const targetScale = hovered ? 1.5 : 1;
    groupRef.current.scale.lerp(
      new THREE.Vector3(targetScale, targetScale, targetScale),
      0.1,
    );
  });

  useEffect(() => {
    const current = document.body.style.cursor;
    const next = hovered ? "pointer" : "auto";
    if (current !== next) {
      document.body.style.cursor = next;
    }
  }, [hovered]);

  const handlePointerOver = (e: PointerEvent) => {
    e.stopPropagation();
    setHovered(true);
    onHover(title);
  };

  const handlePointerOut = (e: PointerEvent) => {
    e.stopPropagation();
    setHovered(false);
    onHover(undefined);
  };

  return (
    <>
      <group
        ref={groupRef}
        position={[...position]}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
      >
        {type === "folder" ? (
          <FolderModel />
        ) : (
          <FileModel
            extension={getTypeFromExtension(
              title?.split(".").pop()?.toLowerCase(),
            )}
          />
        )}

        {title && (
          <Html
            center
            position={[0, 0.06, 0]}
            distanceFactor={1.3}
            zIndexRange={[0, 5]}
          >
            <div
              className={clsx(
                "bg-transparent text-xs whitespace-nowrap transition-opacity pointer-events-none rounded-sm p-1",
                { "text-white": hovered },
                { "text-gray-400": !hovered },
              )}
            >
              {title}
            </div>
          </Html>
        )}
      </group>
    </>
  );
};

export default TrashFileSphere;
