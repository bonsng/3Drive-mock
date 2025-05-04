"use client";

import React, { useMemo, useRef } from "react";
import { Line } from "@react-three/drei";
import { sampleTree } from "@/lib/sample-tree";
import { assignPositions } from "@/lib/positioning";
import * as THREE from "three";
import FileSphere from "@/ui/Components/3d-components/file-sphere";
import useGroupRotation from "@/ui/Components/hooks/use-group-rotation";
import useGroupRotationMousePosition from "@/ui/Components/hooks/use-group-rotation-mouse-position";
import { useFileDrag } from "@/ui/Components/context/file-drag-context";

const PointSphere = () => {
  const groupRef = useRef<THREE.Group>(null);
  const { fileDragging } = useFileDrag();
  useGroupRotationMousePosition(groupRef, fileDragging);
  useGroupRotation(groupRef, !fileDragging);

  const positionedNodes = useMemo(() => assignPositions(sampleTree), []);

  return (
    <>
      <group ref={groupRef}>
        <group position={[-3, 0, 0]}>
          {positionedNodes.map((node, idx) => (
            <React.Fragment key={idx}>
              <FileSphere
                position={node.position}
                sphereColor={node.type === "folder" ? "orange" : "blue"}
                title={node.name}
              />

              {node.parentPosition && (
                <Line
                  points={[node.parentPosition, node.position]}
                  color="gray"
                  lineWidth={0.5}
                />
              )}
            </React.Fragment>
          ))}
        </group>
      </group>
    </>
  );
};

export default PointSphere;
