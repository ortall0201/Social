import React from "react";
import { AbsoluteFill, Img, staticFile } from "remotion";

export const GrammyConfidenceCover: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: "#000000" }}>
      {/* Grammy stage background image */}
      <AbsoluteFill>
        <Img
          src={staticFile("grammy-stage.webp")}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
      </AbsoluteFill>

      {/* Dark overlay for text readability */}
      <AbsoluteFill
        style={{
          background: "linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.3) 50%, rgba(0,0,0,0.5) 100%)",
        }}
      />

      {/* Caption Text - Centered */}
      <AbsoluteFill
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          padding: "120px 80px",
          textAlign: "center",
        }}
      >
        <div
          style={{
            fontFamily: "'Playfair Display', 'Georgia', serif",
            fontSize: 64,
            fontWeight: 700,
            color: "#FFFFFF",
            lineHeight: 1.3,
            marginBottom: 40,
            textShadow: `
              0 2px 20px rgba(0, 0, 0, 0.9),
              0 0 40px rgba(0, 0, 0, 0.7)
            `,
            maxWidth: "900px",
          }}
        >
          Everyone claps for big words on big stages.
        </div>

        <div
          style={{
            fontFamily: "'Playfair Display', 'Georgia', serif",
            fontSize: 70,
            fontWeight: 700,
            color: "#D4AF37",
            lineHeight: 1.3,
            marginBottom: 40,
            textShadow: `
              0 0 30px rgba(212, 175, 55, 0.6),
              0 4px 20px rgba(0, 0, 0, 1),
              2px 2px 8px rgba(0, 0, 0, 1)
            `,
            maxWidth: "900px",
          }}
        >
          But confidence isn't about applause.
        </div>

        <div
          style={{
            fontFamily: "'Montserrat', 'Arial', sans-serif",
            fontSize: 56,
            fontWeight: 400,
            color: "#FFFFFF",
            lineHeight: 1.4,
            marginBottom: 30,
            textShadow: `
              0 2px 15px rgba(0, 0, 0, 0.9),
              0 0 30px rgba(0, 0, 0, 0.7)
            `,
            maxWidth: "900px",
          }}
        >
          It's about knowing what you're standing on
          <br />
          before you speak.
        </div>

        <div
          style={{
            fontFamily: "'Montserrat', 'Arial', sans-serif",
            fontSize: 52,
            fontWeight: 600,
            color: "#D4AF37",
            lineHeight: 1.3,
            marginTop: 30,
            letterSpacing: "2px",
            textShadow: `
              0 0 25px rgba(212, 175, 55, 0.5),
              0 3px 15px rgba(0, 0, 0, 1)
            `,
          }}
        >
          Grammys 2026
        </div>
      </AbsoluteFill>

      {/* Bottom signature */}
      <AbsoluteFill
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-end",
          padding: "0 0 60px 0",
        }}
      >
        <div
          style={{
            fontFamily: "'Montserrat', 'Arial', sans-serif",
            fontSize: 32,
            fontWeight: 300,
            color: "rgba(255, 255, 255, 0.7)",
            letterSpacing: "3px",
            textShadow: "0 2px 10px rgba(0, 0, 0, 0.8)",
          }}
        >
          DEVI
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
