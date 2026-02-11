import React from "react";
import { AbsoluteFill, Img, staticFile } from "remotion";

export const BeautyViralTipsOverlay: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: "#000000" }}>
      <Img
        src={staticFile("images/reel-20260124-172827.webp")}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
        }}
      />

      <AbsoluteFill
        style={{
          background:
            "linear-gradient(to top, rgba(0,0,0,0.90) 0%, rgba(0,0,0,0.34) 48%, rgba(0,0,0,0.72) 100%)",
        }}
      />

      <AbsoluteFill
        style={{
          padding: "64px 64px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div
            style={{
              alignSelf: "flex-start",
              fontFamily: "'Montserrat', 'Arial', sans-serif",
              fontSize: 25,
              fontWeight: 700,
              letterSpacing: 1.2,
              textTransform: "uppercase",
              color: "#F8DFEA",
              background: "rgba(28, 15, 23, 0.66)",
              border: "1px solid rgba(255, 255, 255, 0.24)",
              borderRadius: 999,
              padding: "10px 18px",
            }}
          >
            Save This
          </div>

          <div
            style={{
              fontFamily: "'Playfair Display', 'Georgia', serif",
              fontSize: 58,
              fontWeight: 700,
              lineHeight: 1.04,
              color: "#FCECF3",
              textShadow: "0 4px 22px rgba(0,0,0,0.90)",
            }}
          >
            3 Viral Beauty Moves for 2026
          </div>
        </div>

        <div
          style={{
            alignSelf: "stretch",
            background: "linear-gradient(145deg, rgba(29, 14, 23, 0.84), rgba(10, 8, 14, 0.88))",
            border: "2px solid rgba(255, 255, 255, 0.35)",
            borderRadius: 34,
            padding: "34px 36px",
            backdropFilter: "blur(6px)",
            boxShadow: "0 18px 44px rgba(0,0,0,0.50), 0 0 0 1px rgba(255,255,255,0.10) inset",
            transform: "translateY(-8px)",
          }}
        >
          <div
            style={{
              fontFamily: "'Montserrat', 'Arial', sans-serif",
              fontSize: 37,
              fontWeight: 650,
              lineHeight: 1.3,
              color: "#FFFFFF",
              textShadow: "0 2px 12px rgba(0,0,0,0.84)",
            }}
          >
            1. Blur your blush: diffused cheeks are still trending.
            <br />
            2. Do a soft-focus lip: stain + blurred edge + satin pink.
            <br />
            3. Keep base light: serum foundation, then spot-conceal.
          </div>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
