import FolderModel from "@/lib/folder-model";
import FileModel from "@/lib/file-model";
import { getTypeFromExtension } from "@/lib/extension";
import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import clsx from "clsx";

interface SearchFileSphereProps {
  id: string;
  position: [number, number, number];
  type: "file" | "folder" | "root";
  title: string;
  delay?: number;
}

const SearchFileSphere = ({
  id,
  position,
  type,
  title,
  delay = 0,
}: SearchFileSphereProps) => {
  const groupRef = useRef<THREE.Group>(null);
  const modelRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);
  const [initialScale, setInitialScale] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  useEffect(() => {
    if (!visible) return;
    let frameId: number;
    let phase = 0;

    const animate = () => {
      setInitialScale((prev) => {
        let next = prev;
        if (phase === 0) {
          next = prev + 0.1;
          if (next >= 1.5) {
            next = 1.5;
            phase = 1;
          }
        } else if (phase === 1) {
          next = prev - 0.05;
          if (next <= 1.0) {
            next = 1.0;
            cancelAnimationFrame(frameId);
            return next;
          }
        }
        frameId = requestAnimationFrame(animate);
        return next;
      });
    };

    frameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frameId);
  }, [visible]);

  useFrame(() => {
    if (!groupRef.current) return;
    const target = hovered ? 1.5 : initialScale;
    const current = groupRef.current.scale.x;
    const scale = THREE.MathUtils.lerp(current, target, 0.1);
    groupRef.current.scale.set(scale, scale, scale);
    if (modelRef.current) {
      modelRef.current.rotation.y += 0.001;
    }
  });
  useEffect(() => {
    const current = document.body.style.cursor;
    const next = hovered ? "pointer" : "auto";
    if (current !== next) {
      document.body.style.cursor = next;
    }
  }, [hovered]);

  if (!visible) return null;

  const handlePointerOver = (e: PointerEvent) => {
    e.stopPropagation();
    setHovered(true);
  };

  const handlePointerOut = (e: PointerEvent) => {
    e.stopPropagation();
    setHovered(false);
  };
  return (
    <>
      <group
        ref={groupRef}
        position={[...position]}
        onPointerEnter={handlePointerOver}
        onPointerLeave={handlePointerOut}
      >
        <group ref={modelRef}>
          {type === "folder" ? (
            <FolderModel />
          ) : (
            <FileModel
              extension={getTypeFromExtension(
                title?.split(".").pop()?.toLowerCase(),
              )}
            />
          )}
        </group>
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
      </group>
    </>
  );
};

export default SearchFileSphere;
