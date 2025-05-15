import React, { useRef, useEffect, useState } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useFileTree } from "@/ui/Components/context/file-tree-context";
import { Node } from "@/lib/sample-tree";
import TrashFileSphere from "@/ui/Components/3d-components/trash-file-sphere";
import { useShowNavContext } from "@/ui/Components/context/nav-context";
import { Billboard, Html, Text } from "@react-three/drei";

export default function TrashCan() {
  const { trashData } = useFileTree();
  const { isTrash } = useShowNavContext();
  const groupRef = useRef<THREE.Group>(null);
  const [hoveredFile, setHoveredFile] = useState<string | undefined>(undefined);
  const targetRotation = useRef(0);

  useEffect(() => {
    if (!isTrash) return;
    const handleWheel = (e: WheelEvent) => {
      targetRotation.current += e.deltaY * 0.001;
    };
    window.addEventListener("wheel", handleWheel);
    return () => {
      window.removeEventListener("wheel", handleWheel);
    };
  }, [isTrash]);

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y +=
        (targetRotation.current - groupRef.current.rotation.y) * 0.1;
    }
  });

  return (
    <>
      <Html
        position={[0, 0.4, 0]}
        rotation={[0, Math.PI, 0]}
        distanceFactor={1}
        zIndexRange={[6, 10]}
        transform
      >
        <div className="bg-white text-black px-2 py-1 rounded shadow w-48 h-64">
          {hoveredFile}
        </div>
      </Html>
      <Billboard>
        <Text
          fontSize={0.07}
          position={[0.3, 0.6, 0]}
          anchorX="left"
          color="white"
        >
          {hoveredFile !== undefined
            ? `${hoveredFile}`
            : `Trash Can\n${trashData.length} files/folders`}
        </Text>
      </Billboard>
      <group ref={groupRef}>
        <Carousel
          count={trashData.length}
          trashData={trashData}
          setHoveredFile={setHoveredFile}
        />
      </group>
    </>
  );
}

function Carousel({
  radius = 0.75,
  count = 8,
  trashData,
  setHoveredFile,
}: {
  radius?: number;
  count?: number;
  trashData: Node[];
  setHoveredFile: (title: string | undefined) => void;
}) {
  return trashData.map((node, idx) => {
    return (
      <TrashFileSphere
        key={`trash-${idx}`}
        id={node.id}
        position={[
          Math.sin((idx / count) * Math.PI * 2) * radius,
          0,
          Math.cos((idx / count) * Math.PI * 2) * radius,
        ]}
        type={node.type}
        title={node.name}
        onHover={setHoveredFile}
      />
    );
  });
}

//
