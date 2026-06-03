import type { Metadata, Viewport } from "next";
import { Archivo, Hanken_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import SmoothScrollProvider from "@/components/providers/SmoothScrollProvider";

const archivo = Archivo({
  subsets: ["latin"],
  weight: ["400", "600", "700", "800", "900"],
  variable: "--font-archivo",
  display: "swap",
});

const hanken = Hanken_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-hanken",
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-jetbrains",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Swathi Lorry Transport — B2B Car Carrier Logistics",
  description:
    "B2B car carrier logistics across India. We move OEM and dealer vehicle inventory in bulk — from manufacturing plants to showroom floors, insured and live-tracked.",
  keywords: [
    "car carrier",
    "B2B vehicle logistics",
    "plant to dealer transport",
    "dealer inventory logistics",
    "OEM car transport India",
    "bulk car carrier",
  ],
  openGraph: {
    title: "Swathi Lorry Transport",
    description:
      "B2B car carrier logistics — plant to showroom, in bulk, on time.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#0b0f1a",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${archivo.variable} ${hanken.variable} ${jetbrains.variable}`}
    >
      <body className="grain antialiased">
        <SmoothScrollProvider>{children}</SmoothScrollProvider>
      </body>
    </html>
  );
}
