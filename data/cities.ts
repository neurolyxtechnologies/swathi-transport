/**
 * Cities plotted on the coverage map. x/y are percentage coordinates inside
 * the 0–100 viewBox of the stylized India map in CoverageMap.tsx.
 */
export interface City {
  name: string;
  x: number;
  y: number;
  hub?: boolean;
}

export const cities: City[] = [
  { name: "Delhi", x: 41, y: 26, hub: true },
  { name: "Jaipur", x: 33, y: 31 },
  { name: "Ahmedabad", x: 25, y: 44 },
  { name: "Mumbai", x: 24, y: 56, hub: true },
  { name: "Pune", x: 28, y: 59 },
  { name: "Hyderabad", x: 40, y: 60, hub: true },
  { name: "Bengaluru", x: 38, y: 72, hub: true },
  { name: "Chennai", x: 46, y: 74 },
  { name: "Kolkata", x: 60, y: 45, hub: true },
  { name: "Nagpur", x: 43, y: 49 },
];

/** Routes are index pairs into `cities`, drawn as animated arcs. */
export const routes: [number, number][] = [
  [0, 1],
  [1, 2],
  [2, 3],
  [3, 4],
  [3, 5],
  [5, 6],
  [6, 7],
  [5, 9],
  [9, 8],
  [0, 8],
  [0, 5],
];
