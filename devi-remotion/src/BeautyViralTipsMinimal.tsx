import React from "react";
import { AbsoluteFill } from "remotion";

export const BeautyViralTipsMinimal: React.FC = () => {
  return (
    <AbsoluteFill
      style={{
        background: "linear-gradient(160deg, #120E14 0%, #1A1320 45%, #0E0E16 100%)",
      }}
    >
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
              background: "rgba(255, 255, 255, 0.10)",
              border: "1px solid rgba(255, 255, 255, 0.30)",
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
              textShadow: "0 4px 22px rgba(0,0,0,0.60)",
              maxWidth: 920,
            }}
          >
            3 Viral Beauty Moves for 2026
          </div>
        </div>

        <div
          style={{
            alignSelf: "stretch",
            background: "linear-gradient(145deg, rgba(41, 23, 35, 0.82), rgba(18, 14, 25, 0.90))",
            border: "2px solid rgba(255, 255, 255, 0.36)",
            borderRadius: 34,
            padding: "34px 36px",
            backdropFilter: "blur(4px)",
            boxShadow: "0 18px 44px rgba(0,0,0,0.44), 0 0 0 1px rgba(255,255,255,0.10) inset",
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
              textShadow: "0 2px 10px rgba(0,0,0,0.55)",
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