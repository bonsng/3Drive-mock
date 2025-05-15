export type Point = {
  x: number;
  y: number;
  z: number;
};

export type Angle = {
  position: Point;
  target: Point;
};

export const angles: Angle[] = [
  // default
  {
    position: { x: -3.6, y: 0, z: 0 },
    target: { x: 0, y: 0, z: 0 },
  },
  // trashcan
  {
    position: { x: -102, y: 0.5, z: -1.4 },
    target: { x: -102, y: 0, z: 0.3 },
  },
];

// { x: 20, y: 15, z: 50 },
