import React from "react";
import { AbsoluteFill, Video, interpolate, staticFile, useCurrentFrame } from "remotion";

export type DeviCaptionMinimalReelProps = {
  videoSrc: string;
  onScreenText: string;
  textPosition: "upper" | "lower";
};

export const DeviCaptionMinimalReel: React.FC<DeviCaptionMinimalReelProps> = ({
  videoSrc,
  onScreenText,
  textPosition,
}) => {
  const frame = useCurrentFrame();

  // 8 frames at 30fps ~= 267ms fade in.
  const textOpacity = interpolate(frame, [0, 8], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ backgroundColor: "#000000" }}>
      <Video
        src={staticFile(videoSrc)}
        muted
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
        }}
      />

      {onScreenText !== "none" ? (
        <AbsoluteFill
          style={{
            pointerEvents: "none",
            justifyContent: textPosition === "upper" ? "flex-start" : "flex-end",
            alignItems: "flex-start",
            paddingTop: textPosition === "upper" ? 120 : 0,
            paddingBottom: textPosition === "lower" ? 120 : 0,
            paddingLeft: 72,
            paddingRight: 72,
          }}
        >
          <div
            style={{
              fontFamily: "Inter, Helvetica Neue, Arial, sans-serif",
              fontWeight: 500,
              fontSize: 62,
              lineHeight: 1.05,
              letterSpacing: 0,
              color: "#F7F7F7",
              opacity: textOpacity,
              maxWidth: 760,
              textShadow: "0 2px 14px rgba(0,0,0,0.52)",
            }}
          >
            {onScreenText}
          </div>
        </AbsoluteFill>
      ) : null}
    </AbsoluteFill>
  );
};
