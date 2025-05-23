import React from "react";
import { useFileTree } from "@/ui/Components/context/file-tree-context";
import SearchFileSphere from "@/ui/Components/3d-components/search/search-file-sphere";

export default function SearchGroup() {
  const { matchedNodes } = useFileTree();
  return (
    <>
      <pointLight position={[-3, 0, 0]} intensity={5} distance={30} decay={2} />
      <group position={[-3, 0, 0]}>
        <>
          {matchedNodes.map((node, idx) => {
            const columns = 5; // adjust based on desired spacing
            const spacingX = (0.6 - -0.6) / (columns - 1);
            const spacingY = 0.13; // vertical gap
            const col = idx % columns;
            const row = Math.floor(idx / columns);
            const x = -0.6 + col * spacingX;
            const y = 0.2 - row * spacingY;
            const z = -0.7;
            return (
              <React.Suspense fallback={null} key={node.id}>
                <SearchFileSphere
                  position={[x, y, z]}
                  type={node.type}
                  title={node.name}
                  delay={((Math.random() + 1) / 2) * 500}
                />
              </React.Suspense>
            );
          })}
        </>
      </group>
    </>
  );
}
