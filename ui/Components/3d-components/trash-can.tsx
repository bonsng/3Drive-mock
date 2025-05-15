import React from "react";

export default function TrashCan() {
  return (
    <mesh position={[-102, 1, 0]}>
      <sphereGeometry args={[0.02, 8, 8]} />
      <meshBasicMaterial color={"blue"} />
    </mesh>
  );
}
