import React, { useEffect } from "react";
import * as THREE from "three";

export default function useGroupRotationMousePosition(
  ref: React.RefObject<THREE.Group | null>,
  enabled: boolean,
) {
  useEffect(() => {
    if (!enabled) return;

    const group = ref.current;
    if (!group) return;

    const pivot = new THREE.Vector3(-3, 0, 0);
    const damping = 0.005;
    const mouse = { x: 0, y: 0 };
    let animationId: number;

    const onMouseMove = (e: MouseEvent) => {
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;

      mouse.x = (e.clientX - centerX) / centerX;
      mouse.y = (e.clientY - centerY) / centerY;
    };

    const animate = () => {
      const strengthX = Math.pow(Math.abs(mouse.x), 2);
      const strengthY = Math.pow(Math.abs(mouse.y), 2);

      const angleY = mouse.x * strengthX * damping;
      const angleZ = mouse.y * strengthY * damping;

      group.position.sub(pivot);
      group.position.applyAxisAngle(new THREE.Vector3(0, 1, 0), angleY);
      group.position.add(pivot);
      group.rotateOnWorldAxis(new THREE.Vector3(0, 1, 0), angleY);

      group.position.sub(pivot);
      group.position.applyAxisAngle(new THREE.Vector3(0, 0, 1), angleZ);
      group.position.add(pivot);
      group.rotateOnWorldAxis(new THREE.Vector3(0, 0, 1), angleZ);

      animationId = requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", onMouseMove);
    animationId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      cancelAnimationFrame(animationId);
    };
  }, [enabled, ref]);
}
