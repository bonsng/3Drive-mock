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
    position: { x: -102, y: 0, z: 0 },
    target: { x: -102, y: 3, z: 0 },
  },
];

// { x: 20, y: 15, z: 50 },
