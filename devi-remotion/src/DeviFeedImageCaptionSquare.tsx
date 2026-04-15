import React from "react";
import { AbsoluteFill, Img, staticFile } from "remotion";

export type DeviFeedImageCaptionSquareProps = {
  imageFile: string;
  headline: string;
  subline: string;
  textZone: "top" | "bottom";
};

/**
 * 1:1 (1080×1080) feed still: full source frame via object-fit contain (no body crop),
 * plus editorial type. Instagram/Facebook show square without vertical center-crop of the subject.
 */
export const DeviFeedImageCaptionSquare: React.FC<
  DeviFeedImageCaptionSquareProps
> = ({ imageFile, headline, subline, textZone }) => {
  const isBottom = textZone === "bottom";

  return (
    <AbsoluteFill style={{ backgroundColor: "#0A0A0A" }}>
      <AbsoluteFill
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Img
          src={staticFile(imageFile)}
          style={{
            maxWidth: "100%",
            maxHeight: "100%",
            width: "100%",
            height: "100%",
            objectFit: "contain",
            objectPosition: "50% 50%",
          }}
        />
      </AbsoluteFill>

      <AbsoluteFill
        style={{
          background: isBottom
            ? "linear-gradient(to top, rgba(6,6,8,0.94) 0%, rgba(6,6,8,0.5) 42%, rgba(6,6,8,0) 65%)"
            : "linear-gradient(to bottom, rgba(6,6,8,0.9) 0%, rgba(6,6,8,0.38) 45%, rgba(6,6,8,0) 68%)",
          pointerEvents: "none",
        }}
      />

      <AbsoluteFill
        style={{
          justifyContent: isBottom ? "flex-end" : "flex-start",
          paddingTop: isBottom ? 0 : 72,
          paddingBottom: isBottom ? 120 : 0,
          paddingLeft: 48,
          paddingRight: 48,
        }}
      >
        <div style={{ maxWidth: 984 }}>
          <div
            style={{
              fontFamily: "Georgia, 'Times New Roman', serif",
              fontWeight: 700,
              fontSize: 52,
              lineHeight: 1.08,
              letterSpacing: "-0.02em",
              color: "#FAF7F2",
              textShadow: "0 4px 28px rgba(0,0,0,0.75)",
            }}
          >
            {headline}
          </div>
          <div
            style={{
              marginTop: 16,
              fontFamily:
                "system-ui, 'Segoe UI', 'Helvetica Neue', Arial, sans-serif",
              fontWeight: 500,
              fontSize: 28,
              lineHeight: 1.35,
              letterSpacing: "0.02em",
              color: "rgba(250,247,242,0.92)",
              textShadow: "0 2px 16px rgba(0,0,0,0.65)",
            }}
          >
            {subline}
          </div>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
