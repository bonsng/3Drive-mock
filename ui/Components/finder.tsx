"use client";

import React, { useEffect, useRef } from "react";
import { Line } from "@react-three/drei";
import * as THREE from "three";
import FileSphere from "@/ui/Components/3d-components/file-sphere";
import useGroupRotation from "@/ui/Components/hooks/use-group-rotation";
import useGroupRotationMousePosition from "@/ui/Components/hooks/use-group-rotation-mouse-position";
import { useFileTree } from "@/ui/Components/context/file-tree-context";
import { PositionedNode } from "@/lib/positioning";
import { getDescendantIds } from "@/lib/tree-utils";
import { useThree } from "@react-three/fiber";
import { Raycaster } from "three";
import { useShortCutContext } from "@/ui/Components/context/short-cut-context";

const Finder = () => {
  const groupRef = useRef<THREE.Group>(null);
  const raycaster = useRef(new Raycaster());
  const { camera, mouse, scene } = useThree();
  const { showSearch } = useShortCutContext();
  const {
    fileDragging,
    draggingNodeId,
    nodeMap,
    setFileDragging,
    setDraggingNodeId,
    moveNodeToFolder,
  } = useFileTree();
  useGroupRotationMousePosition(groupRef, fileDragging);
  useGroupRotation(groupRef, !fileDragging);

  const hiddenNodeIds = draggingNodeId
    ? getDescendantIds(draggingNodeId, nodeMap)
    : new Set();

  useEffect(() => {
    const handlePointerUp = () => {
      if (fileDragging && draggingNodeId) {
        raycaster.current.setFromCamera(mouse, camera);
        const intersects = raycaster.current.intersectObjects(
          scene.children,
          true,
        );

        for (const hit of intersects) {
          const folder = hit.object.parent?.userData;
          console.log(folder);
          if (
            folder &&
            folder.type === "folder" &&
            folder.id !== draggingNodeId
          ) {
            moveNodeToFolder(draggingNodeId, folder.id);
            break;
          }
        }

        setFileDragging(false);
        setDraggingNodeId(null);
      }
    };

    window.addEventListener("pointerup", handlePointerUp);
    return () => window.removeEventListener("pointerup", handlePointerUp);
  }, [
    fileDragging,
    draggingNodeId,
    mouse,
    camera,
    scene,
    nodeMap,
    setFileDragging,
    setDraggingNodeId,
  ]);

  return (
    <>
      <group ref={groupRef}>
        <group
          position={[-3, 0, 0]}
          visible={!showSearch}
          rotation={[0, Math.PI * 0.64, Math.PI * 0.3]}
        >
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
                  showSearch={showSearch}
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
