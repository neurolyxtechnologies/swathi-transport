/**
 * Cities plotted on the coverage map, using real [lng, lat] coordinates.
 * CoverageMap projects these onto an accurate India geometry with d3-geo.
 * Hubs (Chennai, Bengaluru, Hyderabad, Pune) are Swathi's real operating bases.
 */
export interface City {
  name: string;
  lng: number;
  lat: number;
  hub?: boolean;
}

export const cities: City[] = [
  { name: "Delhi", lng: 77.21, lat: 28.61 },
  { name: "Jaipur", lng: 75.79, lat: 26.91 },
  { name: "Ahmedabad", lng: 72.57, lat: 23.02 },
  { name: "Mumbai", lng: 72.88, lat: 19.08 },
  { name: "Pune", lng: 73.86, lat: 18.52, hub: true },
  { name: "Hyderabad", lng: 78.49, lat: 17.39, hub: true },
  { name: "Bengaluru", lng: 77.59, lat: 12.97, hub: true },
  { name: "Chennai", lng: 80.27, lat: 13.08, hub: true },
  { name: "Kolkata", lng: 88.36, lat: 22.57 },
  { name: "Nagpur", lng: 79.09, lat: 21.15 },
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
