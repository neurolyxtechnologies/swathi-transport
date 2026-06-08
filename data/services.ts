export interface Service {
  id: string;
  title: string;
  description: string;
  /** Inline SVG path data for the icon (24x24 viewBox). */
  icon: string;
}

export const services: Service[] = [
  {
    id: "auto-carrier",
    title: "Automobiles Carrier",
    description:
      "A car-carrier pioneer since 2008 — 150 GPS-tracked carriers for four-wheelers, three-wheelers and tractors, on a strict Zero-Damage policy.",
    icon: "M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4",
  },
  {
    id: "goods",
    title: "Goods Transportation",
    description:
      "200+ containerized goods carriers, 100% GPS-enabled — cost-effective long-haul and short-distance freight.",
    icon: "M3 3h18v4H3V3zm0 8h18v10H3V11zm6 4h6",
  },
  {
    id: "ptl",
    title: "Part-Truck-Load (PTL)",
    description:
      "Move partial loads without booking a full truck — pay only for the space you use, with real-time tracking.",
    icon: "M12 2l9 5-9 5-9-5 9-5zM3 12l9 5 9-5M3 17l9 5 9-5",
  },
];
