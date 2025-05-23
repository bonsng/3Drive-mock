import React, { useRef, useEffect, useState } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useFileTree } from "@/ui/Components/context/file-tree-context";
import { Node } from "@/lib/sample-tree";
import TrashFileSphere from "@/ui/Components/3d-components/trash/trash-file-sphere";
import { useShowNavContext } from "@/ui/Components/context/nav-context";
import { Billboard, Html, useGLTF } from "@react-three/drei";
import { getTypeFromExtension } from "@/lib/extension";

export default function TrashCan() {
  const { trashData } = useFileTree();
  const { isTrash } = useShowNavContext();
  const groupRef = useRef<THREE.Group>(null);
  const [hoveredFile, setHoveredFile] = useState<
    { id: number; type: string; title: string } | undefined
  >(undefined);
  const targetRotation = useRef(0);
  const trashCan3D = useGLTF("/models/recycle_bin.glb");
  const pdf = useGLTF("/models/pdf_3d.glb");
  const excel = useGLTF("/models/excel_3d.glb");
  const image = useGLTF("/models/image_3d.glb");
  const video = useGLTF("/models/video_3d.glb");
  const ppt = useGLTF("/models/ppt_3d.glb");
  const pptx = useGLTF("/models/pptx_3d.glb");
  const music = useGLTF("/models/mp3_3d.glb");
  const zip = useGLTF("/models/zip_3d.glb");
  const folder = useGLTF("/models/folder_3d.glb");
  const free = useGLTF("/models/free_format_3d.glb");
  const ext = getTypeFromExtension(
    hoveredFile?.title?.split(".").pop()?.toLowerCase(),
  );
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const dummy = useGLTF("/models/pdf_3d.glb");
  type GLTFResult = typeof dummy;

  const modelMap: Record<string, GLTFResult> = {
    pdf,
    excel,
    image,
    video,
    ppt,
    pptx,
    music,
    zip,
    free,
    word: free,
  };

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
      <group position={[-102, 0, 0]}>
        <pointLight
          position={[0, 1, -1.5]}
          intensity={20}
          distance={30}
          decay={2}
        />
        <pointLight position={[0, 0.5, 1]} intensity={3} />
        <Billboard>
          {hoveredFile === undefined ? (
            <primitive
              object={trashCan3D.scene.children[0].clone()}
              scale={0.08}
              position={[0, -0.1, 0]}
              rotation={[Math.PI * 0.1, 0, 0]}
            />
          ) : (
            <primitive
              receiveShadow={false}
              object={
                hoveredFile?.type === "file"
                  ? modelMap[ext]?.scene.children[0].clone()
                  : folder.scene.children[0].clone()
              }
              scale={0.06}
              position={[0, 0.13, 0]}
              rotation={[0, Math.PI * -0.15, 0]}
            />
          )}
        </Billboard>
        <Billboard>
          <Html position={[0.5, 0.7, 0]} distanceFactor={2}>
            <div className="flex flex-col w-50 text-2xl">
              <p className="font-bold">Trash Can</p>
              <hr className="my-1" />
              <div className="mt-2">
                <p className="font-newsreader font-bold">
                  {hoveredFile !== undefined
                    ? `${hoveredFile.title}`
                    : `${trashData.length} files/folders`}
                </p>
                {hoveredFile !== undefined && (
                  <div className="text-lg">
                    <p>
                      Kind: {ext !== "free" ? `${ext} ` : ""}
                      {hoveredFile?.type}
                    </p>
                    {/*<p>Where: {getPathFromNodeId(hoveredFile.id).join("/")}</p>*/}
                  </div>
                )}
              </div>
            </div>
          </Html>
        </Billboard>
        <group ref={groupRef}>
          <Carousel
            count={trashData.length}
            trashData={trashData}
            setHoveredFile={setHoveredFile}
          />
        </group>
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
  setHoveredFile: (
    file: { id: number; type: string; title: string } | undefined,
  ) => void;
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
        onHover={(hovered) =>
          setHoveredFile(
            hovered
              ? { id: node.id, type: node.type, title: node.name }
              : undefined,
          )
        }
      />
    );
  });
}

//
