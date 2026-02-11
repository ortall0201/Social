import React from "react";
import { AbsoluteFill, Img, staticFile } from "remotion";

export const BeautyTipsOverlay: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: "#000000" }}>
      <Img
        src={staticFile("images/slide1.png")}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
        }}
      />

      <AbsoluteFill
        style={{
          background:
            "linear-gradient(to top, rgba(0,0,0,0.84) 0%, rgba(0,0,0,0.40) 48%, rgba(0,0,0,0.62) 100%)",
        }}
      />

      <AbsoluteFill
        style={{
          padding: "120px 78px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <div
          style={{
            fontFamily: "'Playfair Display', 'Georgia', serif",
            fontSize: 76,
            fontWeight: 700,
            lineHeight: 1.1,
            color: "#FCE7EF",
            textShadow: "0 3px 20px rgba(0,0,0,0.9)",
          }}
        >
          Beauty Tips
        </div>

        <div
          style={{
            alignSelf: "stretch",
            background: "rgba(16, 9, 13, 0.58)",
            border: "2px solid rgba(255, 255, 255, 0.22)",
            borderRadius: 28,
            padding: "40px 44px",
            backdropFilter: "blur(4px)",
          }}
        >
          <div
            style={{
              fontFamily: "'Montserrat', 'Arial', sans-serif",
              fontSize: 45,
              fontWeight: 500,
              lineHeight: 1.4,
              color: "#FFFFFF",
              textShadow: "0 2px 12px rgba(0,0,0,0.85)",
            }}
          >
            1. Prep skin with lightweight hydration.
            <br />
            2. Blend foundation in thin, buildable layers.
            <br />
            3. Lock glow with setting spray, not heavy powder.
          </div>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
