"use client";

import React, { useEffect, useRef, useState } from "react";
import { Line } from "@react-three/drei";
import * as THREE from "three";
import FileSphere from "@/ui/Components/3d-components/file/file-sphere";
import useGroupRotation from "@/ui/Components/hooks/use-group-rotation";
import useGroupRotationMousePosition from "@/ui/Components/hooks/use-group-rotation-mouse-position";
import { useFileTree } from "@/ui/Components/context/file-tree-context";
import { PositionedNode } from "@/lib/positioning";
import { getDescendantIds } from "@/lib/tree-utils";
import { useThree, useFrame } from "@react-three/fiber";
import { Raycaster } from "three";
import { useShortCutContext } from "@/ui/Components/context/short-cut-context";
import { useFolderRefContext } from "@/ui/Components/context/folder-ref-context";
import { useModal } from "@/ui/Modal/modal.hook";
import Swal from "sweetalert2";
import TrashCan from "@/ui/Components/3d-components/trash/trash-can";
import { useShowNavContext } from "@/ui/Components/context/nav-context";
import SearchGroup from "@/ui/Components/3d-components/search/search-group";
import { useSession } from "next-auth/react";
import { toast } from "react-hot-toast";

const Finder = () => {
  const { data: session } = useSession();
  const groupRef = useRef<THREE.Group>(null);
  const innerGroupRef = useRef<THREE.Group>(null);
  const raycaster = useRef(new Raycaster());
  const { camera, mouse, scene } = useThree();
  const { showSearch, showPreSearch } = useShortCutContext();
  const { isTrash } = useShowNavContext();
  const {
    fileDragging,
    draggingNodeId,
    nodePositionMap,
    setFileDragging,
    setDraggingNodeId,
    moveNodeToFolder,
    matchedNodes,
  } = useFileTree();
  const { getFolderRefs } = useFolderRefContext();
  const { openModal, isOpen } = useModal("UploadModal");
  useGroupRotationMousePosition(groupRef, fileDragging);
  useGroupRotation(groupRef, !fileDragging);

  const hiddenNodeIds = draggingNodeId
    ? getDescendantIds(draggingNodeId, nodePositionMap)
    : new Set();

  const [visibleDepth, setVisibleDepth] = useState(1);

  useFrame(() => {
    const distance = camera.position.distanceTo(new THREE.Vector3(-10, 0, 0));
    let depth;
    if (distance < 0.9) depth = 4;
    else if (distance < 1.8) depth = 5;
    else if (distance < 2.7) depth = 6;
    else if (distance < 3.6) depth = 7;
    else if (distance < 4.5) depth = 8;
    else if (distance < 5.4) depth = 9;
    else if (distance < 6.3) depth = 10;
    else depth = 11;
    setVisibleDepth(depth);

    // Rotate groupRef around the pivot point when showSearch is true
    if (showPreSearch && innerGroupRef.current) {
      const group = innerGroupRef.current;
      const pivot = new THREE.Vector3(-10, 1, 0);

      group.position.sub(pivot);
      group.rotateY(0.001);
      group.position.add(pivot);
    }
  });

  useEffect(() => {
    const handlePointerUp = () => {
      if (fileDragging && draggingNodeId) {
        raycaster.current.setFromCamera(mouse, camera);
        const intersects = raycaster.current.intersectObjects(
          getFolderRefs(),
          true,
        );
        const draggedNode = nodePositionMap.get(draggingNodeId);
        if (!draggedNode) return;

        for (const hit of intersects) {
          const folder = hit.object.parent?.userData;
          if (
            folder &&
            folder.type === "folder" &&
            folder.id !== draggingNodeId
          ) {
            // Swal.fire({
            //   title: "이동하시겠습니까?",
            //   icon: "question",
            //   showCancelButton: true,
            //   confirmButtonText: "이동",
            //   cancelButtonText: "취소",
            // }).then(async (result) => {
            //   if (result.isConfirmed) {
            //     const path =
            //       draggedNode.type === "folder"
            //         ? `/folders/${draggingNodeId}`
            //         : `/files/${draggedNode.parentId}/${draggedNode.name}`;
            //     const formData = new FormData();
            //     formData.append("targetId", folder.id);
            //     try {
            //       const res = await fetch(
            //         `${process.env.NEXT_PUBLIC_BACKEND_URL}${path}`,
            //         {
            //           method: "POST",
            //           headers: {
            //             Authorization: `Bearer ${session?.accessToken}`,
            //           },
            //           body: formData,
            //         },
            //       );
            //
            //       if (!res.ok) {
            //         throw new Error("파일 이동 실패");
            //       }
            //
            //       moveNodeToFolder(draggingNodeId, folder.id);
            //       toast.success("파일이 이동되었습니다.");
            //     } catch {
            //       toast.error("잘못된 위치입니다.");
            //     }
            //   }
            // });
            Swal.fire({
              icon: "question",
              title: "이동하시겠습니까?",
              showCancelButton: true,
              confirmButtonText: "이동",
              cancelButtonText: "취소",
            }).then(async (result) => {
              if (result.isConfirmed) {
                moveNodeToFolder(draggingNodeId, folder.id);
                toast.success("파일이 이동되었습니다.");
              }
            });
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
    session?.accessToken,
  ]);

  return (
    <>
      <group ref={groupRef}>
        <group
          position={[-10, 0, 0]}
          ref={innerGroupRef}
          visible={!showSearch}
          // rotation={[0, Math.PI * 0.64, 0]}
        >
          {[...nodePositionMap.values()].map((node: PositionedNode) => {
            if (
              draggingNodeId === node.id ||
              hiddenNodeIds.has(node.id) ||
              node.depth > visibleDepth
            )
              return null;

            return (
              <React.Fragment key={node.id}>
                <FileSphere
                  id={node.id}
                  position={node.position}
                  type={node.type}
                  title={node.name}
                  showSearch={showSearch}
                  parentId={node.parentId}
                  matched={matchedNodes.includes(node.id)}
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
