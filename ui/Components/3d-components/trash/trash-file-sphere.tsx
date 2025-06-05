import React, { useEffect, useRef, useState } from "react";
import FileModel from "@/lib/file-model";
import FolderModel from "@/lib/folder-model";
import { getTypeFromExtension } from "@/lib/extension";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import clsx from "clsx";
import Swal from "sweetalert2";
import { useFileTree } from "@/ui/Components/context/file-tree-context";

interface PTrashFileSphere {
  id: number;
  position: [number, number, number];
  type: string;
  title?: string;
  onHover: (
    file: { id: number; type: string; title: string } | undefined,
  ) => void;
}

const TrashFileSphere = (props: PTrashFileSphere) => {
  const { id, position, type, title, onHover } = props;
  const groupRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);
  const { restoreNodeFromTrash } = useFileTree();

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
    onHover({ id, type, title: title || "" });
  };

  const handlePointerOut = (e: PointerEvent) => {
    e.stopPropagation();
    setHovered(false);
    onHover(undefined);
  };

  const handleDoubleClick = (e: MouseEvent) => {
    e.stopPropagation();
    Swal.fire({
      title: `이 ${type === "file" ? "파일" : "폴더"}는 휴지통에 있습니다.`,
      text: `이 ${type === "file" ? "파일" : "폴더"}를 보려면 휴지통에서 복원해야 합니다.`,
      showCancelButton: true,
      confirmButtonText: "복원",
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        restoreNodeFromTrash(id);
        Swal.fire("Success!", "", "success");
      }
    });
  };

  return (
    <>
      <group
        ref={groupRef}
        position={[...position]}
        onPointerEnter={handlePointerOver}
        onPointerLeave={handlePointerOut}
        onDoubleClick={handleDoubleClick}
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
        <mesh visible={false}>
          <boxGeometry args={[0.1, 0.1, 0.1]} />
          <meshBasicMaterial transparent={true} opacity={0} />
        </mesh>
      </group>
    </>
  );
};

export default TrashFileSphere;
