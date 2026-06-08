import type { Metadata, Viewport } from "next";
import { Archivo, Hanken_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import SmoothScrollProvider from "@/components/providers/SmoothScrollProvider";
import ThemeSwitcher from "@/components/ui/ThemeSwitcher";

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
  title: "Swathi Supply Chain Services — Auto Logistics, FTL & PTL, Chennai",
  description:
    "Swathi Supply Chain Services Pvt. Ltd. is a Chennai-based auto-logistics carrier offering full-truck-load (FTL) and part-truck-load (PTL) services, warehousing, car transport, auto parts and container freight across India on a modern Tata Signa & Eicher fleet — insured and GPS-tracked.",
  keywords: [
    "Swathi Supply Chain Services",
    "auto logistics Chennai",
    "full truck load FTL",
    "part truck load PTL",
    "car transportation India",
    "warehousing Tamil Nadu",
    "Tata Signa fleet",
  ],
  openGraph: {
    title: "Swathi Supply Chain Services",
    description:
      "Auto logistics, FTL & PTL from Chennai — on a Tata Signa & Eicher fleet.",
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
      suppressHydrationWarning
      className={`${archivo.variable} ${hanken.variable} ${jetbrains.variable}`}
    >
      <head>
        {/* Apply saved preview theme before paint (no flash) */}
        <script
          dangerouslySetInnerHTML={{
            __html: `try{var t=localStorage.getItem('swathi-theme');if(t)document.documentElement.dataset.theme=t;}catch(e){}`,
          }}
        />
      </head>
      <body className="grain antialiased">
        <SmoothScrollProvider>{children}</SmoothScrollProvider>
        <ThemeSwitcher />
      </body>
    </html>
  );
}
