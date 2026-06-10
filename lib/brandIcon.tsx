import { ImageResponse } from "next/og";

/**
 * Branded app icon — the Swathi "motion streak + chevron" mark in cargo
 * orange on the dark asphalt background. Shared by the favicon (app/icon),
 * the Apple touch icon, and the generated favicon.ico.
 */
export function renderBrandIcon(px: number, rounded = false) {
  const mark = Math.round(px * 0.62);
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#0b0f1a",
          borderRadius: rounded ? Math.round(px * 0.22) : 0,
        }}
      >
        <svg
          width={mark}
          height={Math.round((mark * 28) / 38)}
          viewBox="0 0 38 28"
          fill="none"
        >
          <path d="M2 20 L14 20" stroke="#ffb44d" strokeWidth="3.4" strokeLinecap="round" opacity="0.5" />
          <path d="M8 16 L20 16" stroke="#ff8f33" strokeWidth="3.4" strokeLinecap="round" opacity="0.78" />
          <path d="M14 12 L26 12" stroke="#ff7a18" strokeWidth="3.4" strokeLinecap="round" />
          <path
            d="M24 6 L34 14 L24 22"
            stroke="#ff7a18"
            strokeWidth="3.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
        </svg>
      </div>
    ),
    { width: px, height: px }
  );
}
