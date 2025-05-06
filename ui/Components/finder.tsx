"use client";

import React, { useRef } from "react";
import { Line } from "@react-three/drei";
import * as THREE from "three";
import FileSphere from "@/ui/Components/3d-components/file-sphere";
import useGroupRotation from "@/ui/Components/hooks/use-group-rotation";
import useGroupRotationMousePosition from "@/ui/Components/hooks/use-group-rotation-mouse-position";
import { useFileTree } from "@/ui/Components/context/file-tree-context";
import { PositionedNode } from "@/lib/positioning";
import { getDescendantIds } from "@/lib/tree-utils";

const Finder = () => {
  const groupRef = useRef<THREE.Group>(null);
  const { fileDragging, draggingNodeId } = useFileTree();
  useGroupRotationMousePosition(groupRef, fileDragging);
  useGroupRotation(groupRef, !fileDragging);

  const { nodeMap } = useFileTree();
  const hiddenNodeIds = draggingNodeId
    ? getDescendantIds(draggingNodeId, nodeMap)
    : new Set();

  return (
    <>
      <group ref={groupRef}>
        <group position={[-3, 0, 0]}>
          {[...nodeMap.values()].map((node: PositionedNode) => {
            if (draggingNodeId === node.id || hiddenNodeIds.has(node.id))
              return null;

            return (
              <React.Fragment key={node.id}>
                <FileSphere
                  id={node.id}
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
            );
          })}
        </group>
      </group>
    </>
  );
};

export default Finder;
