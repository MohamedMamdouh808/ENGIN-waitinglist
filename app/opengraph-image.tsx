import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          backgroundColor: "#0A0B0D",
          color: "#EDEFF2",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div style={{ fontSize: 28, color: "#7FA6FF", fontFamily: "monospace" }}>
          from_intent_to_software
        </div>
        <div style={{ fontSize: 84, fontWeight: 700, marginTop: 16, lineHeight: 1 }}>
          ENGIN
        </div>
        <div style={{ fontSize: 32, color: "#8A919C", marginTop: 20 }}>
          Describe what you want. Get working software.
        </div>
      </div>
    ),
    { ...size }
  );
}
