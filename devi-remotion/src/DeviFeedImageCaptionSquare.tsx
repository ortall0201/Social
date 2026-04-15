import React from "react";
import {
  AbsoluteFill,
  Img,
  staticFile,
  useVideoConfig,
} from "remotion";

export type DeviFeedImageCaptionSquareProps = {
  imageFile: string;
  headline: string;
  subline: string;
  textZone: "top" | "bottom";
};

/**
 * Feed still with full source frame (object-fit contain — no body crop) + editorial type.
 * Used for **1:1** (`DeviFeedImageCaptionSquare`) and **4:5** (`DeviFeedImageCaptionFeed4x5`) Stills.
 *
 * Copy is **not** flush to the frame edge: Buffer/IG often preview with a zoomed/cropped viewport;
 * we anchor type in a **safe band** (large inset from bottom/top).
 */
export const DeviFeedImageCaptionSquare: React.FC<
  DeviFeedImageCaptionSquareProps
> = ({ imageFile, headline, subline, textZone }) => {
  const { height } = useVideoConfig();
  const isFeed45 = height === 1350;
  const isBottom = textZone === "bottom";

  const bottomInset = isFeed45 ? 300 : 268;
  const topInset = isFeed45 ? 216 : 172;
  const horizontalPad = isFeed45 ? 52 : 48;
  const headlineSize = isFeed45 ? 56 : 50;
  const sublineSize = isFeed45 ? 30 : 26;
  const sublineMarginTop = isFeed45 ? 18 : 14;

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
            ? "linear-gradient(to top, rgba(6,6,8,0.96) 0%, rgba(6,6,8,0.55) 46%, rgba(6,6,8,0) 74%)"
            : "linear-gradient(to bottom, rgba(6,6,8,0.92) 0%, rgba(6,6,8,0.42) 44%, rgba(6,6,8,0) 72%)",
          pointerEvents: "none",
        }}
      />

      <AbsoluteFill style={{ pointerEvents: "none" }}>
        <div
          style={{
            position: "absolute",
            left: horizontalPad,
            right: horizontalPad,
            ...(isBottom
              ? { bottom: bottomInset }
              : { top: topInset }),
            maxWidth: isFeed45 ? 980 : 984,
          }}
        >
          <div
            style={{
              fontFamily: "Georgia, 'Times New Roman', serif",
              fontWeight: 700,
              fontSize: headlineSize,
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
              marginTop: sublineMarginTop,
              fontFamily:
                "system-ui, 'Segoe UI', 'Helvetica Neue', Arial, sans-serif",
              fontWeight: 500,
              fontSize: sublineSize,
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
