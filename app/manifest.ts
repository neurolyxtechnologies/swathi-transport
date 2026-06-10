import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Swathi Supply Chain Services",
    short_name: "Swathi",
    description:
      "Chennai's car-carrier pioneers — FTL & PTL auto logistics across India on a 350+ vehicle, GPS-tracked fleet.",
    start_url: "/",
    display: "standalone",
    background_color: "#0b0f1a",
    theme_color: "#0b0f1a",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
  };
}
