import * as THREE from "three";
const spheres = [new THREE.SphereGeometry(0.3), new THREE.SphereGeometry(0.8)];

export const pointArr = (points: number[]): number[][] => {
  const positions: number[][] = [];

  points.forEach((p, idx) => {
    const vertex = new THREE.Vector3();
    const sphereType = idx === 0 ? 0 : 1;
    vertex.fromBufferAttribute(
      spheres[sphereType].attributes.position as never,
      p,
    );
    positions.push([vertex.x, vertex.y, vertex.z]);
  });

  return positions;
};

export const lineArr = (points: number[][]): THREE.Vector3[] => {
  const result: THREE.Vector3[] = [];

  for (let i = 1; i < points.length; i++) {
    result.push(new THREE.Vector3(...points[i]));
    if (i !== points.length - 1) result.push(new THREE.Vector3(...points[0]));
  }

  return result;
};
