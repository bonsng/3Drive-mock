import React, { useEffect, useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { DragControls, Html, useGLTF } from "@react-three/drei";
import clsx from "clsx";

interface PFileSphere {
  position: number[];
  sphereColor: string;
  title?: string;
}

const FileSphere = (props: PFileSphere) => {
  const { position, sphereColor, title } = props;
  const [hovered, setHovered] = useState(false);
  const meshRef = useRef<THREE.Mesh>(null);
  const { scene } = useGLTF("/models/pdf_sphere_glb.glb");

  useEffect(() => {
    const current = document.body.style.cursor;
    const next = hovered ? "pointer" : "auto";
    if (current !== next) {
      document.body.style.cursor = next;
    }
  }, [hovered]);

  useFrame(() => {
    if (meshRef.current) {
      const targetScale = hovered ? 1.5 : 1;
      meshRef.current.scale.lerp(
        new THREE.Vector3(targetScale, targetScale, targetScale),
        0.1,
      );
    }
  });

  const extension = title?.split(".").pop()?.toLowerCase();
  const isPdf = extension === "pdf";

  return (
    <group
      ref={meshRef}
      position={[position[0], position[1], position[2]]}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
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
      {title && (
        <Html center position={[0, 0.05, 0]} distanceFactor={2}>
          <div
            // style={{
            //   background: "transparent",
            //   fontSize: "12px",
            //   whiteSpace: "nowrap",
            //   pointerEvents: "none",
            //   color: "white",
            // }}
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
