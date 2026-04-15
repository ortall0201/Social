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
 * Feed still: photo **contained** in its band + type in a **separate** strip (no full-bleed overlap).
 * Used for **1:1** and **4:5** Stills so the full image and all copy stay visible (“zoomed out” vs cover).
 */
export const DeviFeedImageCaptionSquare: React.FC<
  DeviFeedImageCaptionSquareProps
> = ({ imageFile, headline, subline, textZone }) => {
  const { height } = useVideoConfig();
  const isFeed45 = height === 1350;
  const isBottom = textZone === "bottom";

  const imageFrac = isFeed45 ? 0.73 : 0.72;
  const textFrac = 1 - imageFrac;

  const horizontalPad = isFeed45 ? 52 : 48;
  const headlineSize = isFeed45 ? 52 : 48;
  const sublineSize = isFeed45 ? 28 : 26;
  const sublineMarginTop = isFeed45 ? 14 : 12;

  const textStrip = (
    <div
      style={{
        flex: `0 0 ${textFrac * 100}%`,
        boxSizing: "border-box",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        paddingLeft: horizontalPad,
        paddingRight: horizontalPad,
        paddingTop: isBottom ? 16 : 28,
        paddingBottom: isBottom ? 32 : 16,
        background: isBottom
          ? "linear-gradient(to top, #0A0A0A 0%, #121016 75%, #15151a 100%)"
          : "linear-gradient(to bottom, #0A0A0A 0%, #121016 75%, #15151a 100%)",
      }}
    >
      <div style={{ maxWidth: 984 }}>
        <div
          style={{
            fontFamily: "Georgia, 'Times New Roman', serif",
            fontWeight: 700,
            fontSize: headlineSize,
            lineHeight: 1.08,
            letterSpacing: "-0.02em",
            color: "#FAF7F2",
            textShadow: "0 2px 18px rgba(0,0,0,0.55)",
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
            textShadow: "0 2px 12px rgba(0,0,0,0.45)",
          }}
        >
          {subline}
        </div>
      </div>
    </div>
  );

  const imageBand = (
    <div
      style={{
        flex: `0 0 ${imageFrac * 100}%`,
        minHeight: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#0A0A0A",
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
    </div>
  );

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#0A0A0A",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {isBottom ? (
        <>
          {imageBand}
          {textStrip}
        </>
      ) : (
        <>
          {textStrip}
          {imageBand}
        </>
      )}
    </AbsoluteFill>
  );
};
