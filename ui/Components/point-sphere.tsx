"use client";

import React, { useRef } from "react";
import { Line } from "@react-three/drei";
import { sampleTree } from "@/lib/sample-tree";
import { assignPositions } from "@/lib/positioning";
import * as THREE from "three";
import FileSphere from "@/ui/Components/3d-components/file-sphere";
import useGroupRotation from "@/ui/Components/hooks/use-group-rotation";

const PointSphere = () => {
  const groupRef = useRef<THREE.Group>(null);
  useGroupRotation(groupRef);

  const positionedNodes = assignPositions(sampleTree);

  return (
    <>
      <group ref={groupRef}>
        <group position={[-3, 0, 0]}>
          {positionedNodes.map((node, idx) => (
            // <FileSphere
            //   key={idx}
            //   position={node.position}
            //   sphereColor={node.type === "folder" ? "orange" : "blue"}
            //   title={node.name}
            // />
            <React.Fragment key={idx}>
              <FileSphere
                position={node.position}
                sphereColor={node.type === "folder" ? "orange" : "blue"}
                title={node.name}
              />
              {node.parentPosition && (
                <Line
                  points={[node.parentPosition, node.position]}
                  color="gray"
                  lineWidth={0.5}
                />
              )}
            </React.Fragment>
          ))}
        </group>
        {/* 
        <group position={[-3, 0, 0]}>
          {points.map((group, groupIdx) => (
            <Line key={`${groupIdx}`} points={lineArr(group)} lineWidth={0.2} />
          ))}
        </group>
        */}
      </group>
    </>
  );
};

export default PointSphere;
