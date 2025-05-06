import React, { useEffect, useRef, useState } from "react";
import { ThreeEvent, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { Html, useGLTF } from "@react-three/drei";
import clsx from "clsx";
import { useFileViewer } from "@/ui/Components/context/file-viewer-context";
import { useFileTree } from "@/ui/Components/context/file-tree-context";

interface PFileSphere {
  id: string;
  position: number[];
  sphereColor: string;
  title?: string;
}

const FileSphere = (props: PFileSphere) => {
  const { id, position, sphereColor, title } = props;
  const [hovered, setHovered] = useState(false);
  const { fileDragging, setFileDragging, setDraggingNodeId } = useFileTree();
  const meshRef = useRef<THREE.Group>(null);
  const { scene } = useGLTF("/models/pdf_sphere_glb.glb");
  const { openFile, selectedFile } = useFileViewer();
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

  const extension = title?.split(".").pop()?.toLowerCase();
  const isPdf = extension === "pdf";

  return (
    <group
      ref={meshRef}
      position={[position[0], position[1], position[2]]}
      onPointerOver={() => setHovered(true)}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      onPointerOut={handlePointerOut}
      onDoubleClick={(e) => {
        e.stopPropagation();
        if (title) openFile(title);
      }}
    >
      {isPdf ? (
        <primitive
          object={scene.children[0].clone()}
          scale={2}
          position={[0, 0, 0]}
        />
      ) : (
        <mesh>
          <sphereGeometry args={[0.02, 8, 8]} />
          <meshBasicMaterial color={sphereColor} />
        </mesh>
      )}
      {title && !selectedFile && (
        <Html center position={[0, 0.05, 0]} distanceFactor={2}>
          <div
            className={clsx(
              "bg-transparent text-xs whitespace-nowrap transition-colors pointer-events-none rounded-sm p-1",
              { "text-black bg-white font-bold": hovered },
              { "text-gray-400": !hovered },
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
