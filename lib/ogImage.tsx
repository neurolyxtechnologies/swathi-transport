import { ImageResponse } from "next/og";

/**
 * Shared 1200×630 social-share card, rendered by both the Open Graph and
 * Twitter image routes so previews stay identical. Brand tokens mirror the
 * default (dark) theme in app/globals.css.
 */
export const ogSize = { width: 1200, height: 630 };
export const ogAlt =
  "Swathi Supply Chain Services — auto logistics, FTL & PTL from Chennai on a 350+ vehicle, GPS-tracked fleet.";
export const ogContentType = "image/png";

const stats = [
  ["350+", "Fleet vehicles"],
  ["₹100 Cr+", "Annual revenue"],
  ["100%", "GPS-tracked"],
  ["20+", "Enterprise clients"],
];

export function renderOgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background:
            "radial-gradient(1100px 600px at 78% -10%, rgba(255,122,24,0.20), transparent 55%), linear-gradient(135deg, #0b0f1a 0%, #131a2a 100%)",
          color: "#f4f7fb",
          fontFamily: "sans-serif",
          position: "relative",
        }}
      >
        {/* left accent rail */}
        <div
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            bottom: 0,
            width: 12,
            background: "linear-gradient(180deg, #ff7a18, #ffb44d)",
          }}
        />

        {/* eyebrow */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            fontSize: 24,
            letterSpacing: 6,
            textTransform: "uppercase",
            color: "#ff7a18",
            fontWeight: 700,
          }}
        >
          <span style={{ display: "flex", gap: 8 }}>
            <span style={{ width: 34, height: 5, borderRadius: 4, background: "#ffb44d", opacity: 0.4 }} />
            <span style={{ width: 46, height: 5, borderRadius: 4, background: "#ff7a18", opacity: 0.7 }} />
            <span style={{ width: 58, height: 5, borderRadius: 4, background: "#ff7a18" }} />
          </span>
          <span>Auto Logistics · FTL &amp; PTL · Since 2008</span>
        </div>

        {/* headline */}
        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div style={{ fontSize: 92, fontWeight: 800, lineHeight: 1, letterSpacing: -2 }}>
            Swathi Supply
          </div>
          <div style={{ fontSize: 92, fontWeight: 800, lineHeight: 1, letterSpacing: -2 }}>
            Chain Services
          </div>
          <div style={{ fontSize: 34, color: "#8a97ac", fontWeight: 500, marginTop: 8 }}>
            Chennai&apos;s car-carrier pioneers — moving India&apos;s freight, zero-damage.
          </div>
        </div>

        {/* stat strip */}
        <div style={{ display: "flex", gap: 64, marginTop: 8 }}>
          {stats.map(([value, label]) => (
            <div key={label} style={{ display: "flex", flexDirection: "column" }}>
              <span style={{ fontSize: 46, fontWeight: 800, color: "#f4f7fb" }}>{value}</span>
              <span style={{ fontSize: 22, color: "#8a97ac", marginTop: 4 }}>{label}</span>
            </div>
          ))}
        </div>

        {/* footer */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderTop: "1px solid #4a5468",
            paddingTop: 28,
            fontSize: 24,
          }}
        >
          <span style={{ color: "#ff7a18", letterSpacing: 3, fontWeight: 600 }}>
            LIVE THE EXPERIENCE · FEEL THE EXPERIENCE
          </span>
          <span style={{ color: "#8a97ac" }}>swathigroups.com</span>
        </div>
      </div>
    ),
    { ...ogSize }
  );
}
