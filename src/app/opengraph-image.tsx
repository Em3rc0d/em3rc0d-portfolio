import { ImageResponse } from "next/og";

export const alt = "Eduardo Merino — THE BUILD ROOM";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#0A0D0F",
          color: "#F1EFE8",
          padding: "64px 72px",
          fontFamily: "Arial, sans-serif",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: "32px",
            border: "1px solid #292D32",
            display: "flex",
          }}
        />

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: 22,
            letterSpacing: "0.12em",
            color: "#ADB2B7",
          }}
        >
          <span>EDUARDO MERINO</span>
          <span>BUILD ROOM / 01</span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 18,
              fontSize: 24,
              letterSpacing: "0.14em",
              color: "#EF513D",
            }}
          >
            <span style={{ width: 64, height: 2, background: "#EF513D" }} />
            <span>THE BUILD ROOM</span>
          </div>

          <div
            style={{
              display: "flex",
              fontSize: 74,
              fontWeight: 700,
              lineHeight: 0.96,
              letterSpacing: "-0.045em",
              maxWidth: 930,
            }}
          >
            I turn messy operational problems into working software.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            borderTop: "1px solid #292D32",
            paddingTop: 24,
          }}
        >
          <span style={{ fontSize: 27, fontWeight: 600 }}>
            Software Developer — Systems, Full Stack & Applied AI
          </span>
          <span
            style={{
              display: "flex",
              width: 56,
              height: 56,
              alignItems: "center",
              justifyContent: "center",
              border: "1px solid #ADB2B7",
              borderRadius: "50%",
              fontSize: 18,
              letterSpacing: "0.08em",
            }}
          >
            EM
          </span>
        </div>
      </div>
    ),
    size,
  );
}
