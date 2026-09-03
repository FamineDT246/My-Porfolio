import { ImageResponse } from "next/og";

export const alt =
  "Ceejay Cumberbatch: founder-led software studio in Barbados. Four production products live.";
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
          justifyContent: "space-between",
          background: "#06080b",
          padding: "72px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div
            style={{
              width: 52,
              height: 52,
              borderRadius: 12,
              background: "#f2b33d",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 30,
              fontWeight: 700,
              color: "#06080b",
            }}
          >
            C
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 26,
              color: "#93a1ad",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
            }}
          >
            Founder-led software studio · Barbados
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div
            style={{
              display: "flex",
              fontSize: 84,
              fontWeight: 700,
              color: "#e9edf1",
              lineHeight: 1.05,
              letterSpacing: "-0.03em",
            }}
          >
            I build software
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 84,
              fontWeight: 700,
              color: "#f2b33d",
              lineHeight: 1.05,
              letterSpacing: "-0.03em",
            }}
          >
            that Barbados runs on.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            color: "#93a1ad",
            fontSize: 26,
          }}
        >
          <div style={{ display: "flex" }}>ceejayc.vercel.app</div>
          <div style={{ display: "flex" }}>4 products in production</div>
        </div>
      </div>
    ),
    { ...size },
  );
}
