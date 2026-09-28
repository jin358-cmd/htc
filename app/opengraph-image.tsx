import { ImageResponse } from "next/og";

export const alt = "弘泰科技";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#F3EFE7",
          color: "#1C1915",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px",
        }}
      >
        <div style={{ fontSize: 24, letterSpacing: 6, color: "#3F4F3A" }}>HONG TAI</div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 68, lineHeight: 1.15 }}>A quieter way to choose.</div>
          <div style={{ marginTop: 20, fontSize: 28, color: "#4E483F" }}>Hong Tai Living</div>
        </div>
      </div>
    ),
    size,
  );
}
