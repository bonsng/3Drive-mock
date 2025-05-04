import React, { useEffect } from "react";
import * as THREE from "three";

export default function useGroupRotation(
  ref: React.RefObject<THREE.Group | null>,
  enabled: boolean,
) {
  useEffect(() => {
    if (!enabled) return;

    const group = ref.current;
    if (!group) return;

    let isDragging = false;
    let lastX = 0;
    let lastY = 0;

    const onMouseDown = (e: MouseEvent) => {
      isDragging = true;
      lastX = e.clientX;
      lastY = e.clientY;
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      const deltaX = e.clientX - lastX;
      const deltaY = e.clientY - lastY;
      lastX = e.clientX;
      lastY = e.clientY;

      const damping = 0.002; // smaller value = smoother, slower rotation
      const angleY = deltaX * damping;
      const angleZ = deltaY * damping;

      const pivotY = new THREE.Vector3(-3, 1, 0);
      const pivotZ = new THREE.Vector3(-3, 0, 1);

      // Y-axis 회전
      group.position.sub(pivotY);
      group.position.applyAxisAngle(new THREE.Vector3(0, 1, 0), angleY);
      group.position.add(pivotY);
      group.rotateOnWorldAxis(new THREE.Vector3(0, 1, 0), angleY);

      // Z-axis 회전
      group.position.sub(pivotZ);
      group.position.applyAxisAngle(new THREE.Vector3(0, 0, 1), angleZ);
      group.position.add(pivotZ);
      group.rotateOnWorldAxis(new THREE.Vector3(0, 0, 1), angleZ);
    };

    const onMouseUp = () => {
      isDragging = false;
    };

    window.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);

    return () => {
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    };
  }, [enabled, ref]);
}
