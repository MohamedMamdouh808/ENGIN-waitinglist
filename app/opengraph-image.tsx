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
        <div style={{ fontSize: 26, color: "#7FA6FF", fontFamily: "monospace" }}>no_code_just_describe_it</div>
        <div style={{ fontSize: 84, fontWeight: 700, marginTop: 16, lineHeight: 1 }}>ENGIN</div>
        <div style={{ fontSize: 30, color: "#8A919C", marginTop: 18 }}>Describe your idea. Get working software.</div>
        <div style={{ marginTop: 24, display: "flex", gap: 12, fontSize: 16, color: "#7FA6FF" }}>
          <span style={{ border: "1px solid #1E232B", padding: "6px 12px", borderRadius: 999 }}>Free to join</span>
          <span style={{ border: "1px solid #1E232B", padding: "6px 12px", borderRadius: 999 }}>No spam</span>
        </div>
      </div>
    ),
    { ...size }
  );
}
