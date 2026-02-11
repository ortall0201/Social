import React from "react";
import { AbsoluteFill } from "remotion";

export type DeviCaptionStaticMinimalProps = {
  onScreenText: string;
  textPosition: "upper" | "lower";
};

export const DeviCaptionStaticMinimal: React.FC<DeviCaptionStaticMinimalProps> = ({
  onScreenText,
  textPosition,
}) => {
  return (
    <AbsoluteFill style={{ backgroundColor: "#0F1014" }}>
      {onScreenText !== "none" ? (
        <AbsoluteFill
          style={{
            justifyContent: textPosition === "upper" ? "flex-start" : "flex-end",
            alignItems: "flex-start",
            paddingTop: textPosition === "upper" ? 118 : 0,
            paddingBottom: textPosition === "lower" ? 118 : 0,
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
              color: "#F7F7F7",
              maxWidth: 760,
              textShadow: "0 2px 12px rgba(0,0,0,0.32)",
            }}
          >
            {onScreenText}
          </div>
        </AbsoluteFill>
      ) : null}
    </AbsoluteFill>
  );
};
