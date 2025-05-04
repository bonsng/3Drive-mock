import { useThree, useFrame } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

export default function CameraZoomControl() {
  const { camera } = useThree();
  const [zoomTarget] = useState(new THREE.Vector3(0, 0, 0)); // OrbitControls target
  const zoomDistance = useRef(camera.position.distanceTo(zoomTarget));
  const targetChanged = useRef(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const step = 0.5;
      if (e.key === "=") {
        zoomDistance.current = Math.max(1, zoomDistance.current - step);
        targetChanged.current = true;
      } else if (e.key === "-") {
        zoomDistance.current = Math.min(20, zoomDistance.current + step);
        targetChanged.current = true;
      }

      if (targetChanged.current) {
        setTimeout(() => {
          targetChanged.current = false;
        }, 100);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useFrame(() => {
    if (!targetChanged.current) return;
    const direction = new THREE.Vector3()
      .subVectors(camera.position, zoomTarget)
      .normalize();
    const newPosition = direction
      .multiplyScalar(zoomDistance.current)
      .add(zoomTarget);
    camera.position.lerp(newPosition, 0.1);
  });

  return null;
}
