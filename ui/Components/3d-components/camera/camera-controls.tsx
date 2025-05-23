import { useThree } from "@react-three/fiber";
import { Angle } from "@/lib/angles";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { OrbitControls } from "@react-three/drei";
import { OrbitControls as OrbitControlsImpl } from "three-stdlib";
import { useShowNavContext } from "@/ui/Components/context/nav-context";

const CameraControls = ({ position, target }: Angle) => {
  const { camera } = useThree();
  const { toDefault, isTrash } = useShowNavContext();
  const ref = useRef<OrbitControlsImpl | null>(null);

  useEffect(() => {
    const resetCamera = () => {
      if (ref.current) {
        gsap.timeline().to(camera.position, {
          duration: 1.0,
          repeat: 0,
          x: -11,
          y: 0,
          z: 0,
          ease: "power3.inOut",
        });
        ref.current?.reset();
      }
    };
    resetCamera();
  }, [camera.position, toDefault]);

  useEffect(() => {
    function cameraAnimate(): void {
      if (ref.current) {
        gsap.timeline().to(camera.position, {
          duration: 1.5,
          repeat: 0,
          x: position.x,
          y: position.y,
          z: position.z,
          ease: "power3.inOut",
        });

        gsap.timeline().to(
          ref.current.target,
          {
            duration: 1.5,
            repeat: 0,
            x: target.x,
            y: target.y,
            z: target.z,
            ease: "power3.inOut",
          },
          "<",
        );
      }
    }
    cameraAnimate();
  }, [target, position, camera.position]);

  return (
    <OrbitControls
      ref={ref}
      makeDefault
      enableZoom={!isTrash}
      enableRotate={false}
      enablePan={false}
      target={[0, 0, 0]}
      enableDamping={true}
      dampingFactor={0.03}
    />
  );
};

export default CameraControls;
