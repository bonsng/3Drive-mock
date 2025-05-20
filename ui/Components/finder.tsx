"use client";

import React, { useEffect, useRef } from "react";
import { Line } from "@react-three/drei";
import * as THREE from "three";
import FileSphere from "@/ui/Components/3d-components/file/file-sphere";
import useGroupRotation from "@/ui/Components/hooks/use-group-rotation";
import useGroupRotationMousePosition from "@/ui/Components/hooks/use-group-rotation-mouse-position";
import { useFileTree } from "@/ui/Components/context/file-tree-context";
import { PositionedNode } from "@/lib/positioning";
import { getDescendantIds } from "@/lib/tree-utils";
import { useThree } from "@react-three/fiber";
import { Raycaster } from "three";
import { useShortCutContext } from "@/ui/Components/context/short-cut-context";
import { useFolderRefContext } from "@/ui/Components/context/folder-ref-context";
import { useModal } from "@/ui/Modal/modal.hook";
import Swal from "sweetalert2";
import TrashCan from "@/ui/Components/3d-components/trash/trash-can";
import { useShowNavContext } from "@/ui/Components/context/nav-context";
import SearchGroup from "@/ui/Components/3d-components/search/search-group";

const Finder = () => {
  const groupRef = useRef<THREE.Group>(null);
  const raycaster = useRef(new Raycaster());
  const { camera, mouse, scene } = useThree();
  const { showSearch } = useShortCutContext();
  const { isTrash } = useShowNavContext();
  const {
    fileDragging,
    draggingNodeId,
    nodePositionMap,
    setFileDragging,
    setDraggingNodeId,
    moveNodeToFolder,
  } = useFileTree();
  const { getFolderRefs } = useFolderRefContext();
  const { openModal, isOpen } = useModal("UploadModal");
  useGroupRotationMousePosition(groupRef, fileDragging);
  useGroupRotation(groupRef, !fileDragging);

  const hiddenNodeIds = draggingNodeId
    ? getDescendantIds(draggingNodeId, nodePositionMap)
    : new Set();

  useEffect(() => {
    const handlePointerUp = () => {
      if (fileDragging && draggingNodeId) {
        raycaster.current.setFromCamera(mouse, camera);
        const intersects = raycaster.current.intersectObjects(
          getFolderRefs(),
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

    const handleDrop = (e: DragEvent) => {
      e.preventDefault();
      if (isOpen) return;

      const files = e.dataTransfer?.files;
      if (files && files.length > 0) {
        const fileArray = Array.from(files);
        console.log("드롭된 파일들:", fileArray.map((f) => f.name).join(", "));

        const pointer = new THREE.Vector2(
          (e.clientX / window.innerWidth) * 2 - 1,
          -(e.clientY / window.innerHeight) * 2 + 1,
        );

        raycaster.current.setFromCamera(pointer, camera);
        const intersects = raycaster.current.intersectObjects(
          getFolderRefs(),
          true,
        );

        const folderHit = intersects.find(
          (hit) => hit.object.parent?.userData?.type === "folder",
        );

        if (folderHit) {
          openModal({
            title: folderHit.object.parent?.userData.id,
            folderId: folderHit.object.parent?.userData.id,
            files: fileArray,
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "잘못된 위치입니다.",
          });
        }
      }
    };

    const handleDragOver = (e: DragEvent) => {
      e.preventDefault();
    };

    window.addEventListener("pointerup", handlePointerUp);
    window.addEventListener("drop", handleDrop);
    window.addEventListener("dragover", handleDragOver);
    return () => {
      window.removeEventListener("pointerup", handlePointerUp);
      window.removeEventListener("drop", handleDrop);
      window.removeEventListener("dragover", handleDragOver);
    };
  }, [
    fileDragging,
    draggingNodeId,
    mouse,
    camera,
    scene,
    nodePositionMap,
    setFileDragging,
    setDraggingNodeId,
    moveNodeToFolder,
    getFolderRefs,
    openModal,
    isOpen,
  ]);

  return (
    <>
      <group ref={groupRef}>
        <group
          position={[-3, 0, 0]}
          visible={!showSearch}
          rotation={[0, Math.PI * 0.64, 0]}
        >
          {[...nodePositionMap.values()].map((node: PositionedNode) => {
            if (draggingNodeId === node.id || hiddenNodeIds.has(node.id))
              return null;

            return (
              <React.Fragment key={node.id}>
                <FileSphere
                  id={node.id}
                  position={node.position}
                  type={node.type}
                  title={node.name}
                  url={node.url ?? "https://folder"}
                  showSearch={showSearch}
                  parentId={node.parentId}
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

      {isTrash && <TrashCan />}

      {showSearch && <SearchGroup />}
    </>
  );
};

export default Finder;
