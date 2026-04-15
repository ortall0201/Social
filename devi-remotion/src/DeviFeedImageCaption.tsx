import React from "react";
import { AbsoluteFill, Img, staticFile } from "remotion";

export type DeviFeedImageCaptionProps = {
  /** Path under `devi-remotion/public/` e.g. `devi-feed-buffer/devi-buffer-card-01.png` */
  imageFile: string;
  /** 3-word or punch hook (Viraly / caption card line). */
  headline: string;
  /** Devi-voice subline tied to the moment (festival / Met / tunnel / western). */
  subline: string;
  /** Place copy block for legibility on busy stills. */
  textZone: "top" | "bottom";
};

/**
 * Instagram9:16 feed still: full-bleed image + editorial type (fashion-first, not meme UI).
 * Typography tuned for Devi: high-contrast scrim, serif headline, clean sans subline.
 */
export const DeviFeedImageCaption: React.FC<DeviFeedImageCaptionProps> = ({
  imageFile,
  headline,
  subline,
  textZone,
}) => {
  const isBottom = textZone === "bottom";

  return (
    <AbsoluteFill style={{ backgroundColor: "#0A0A0A" }}>
      <Img
        src={staticFile(imageFile)}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
        }}
      />

      <AbsoluteFill
        style={{
          background: isBottom
            ? "linear-gradient(to top, rgba(6,6,8,0.92) 0%, rgba(6,6,8,0.45) 38%, rgba(6,6,8,0) 58%)"
            : "linear-gradient(to bottom, rgba(6,6,8,0.88) 0%, rgba(6,6,8,0.35) 42%, rgba(6,6,8,0) 62%)",
          pointerEvents: "none",
        }}
      />

      <AbsoluteFill
        style={{
          justifyContent: isBottom ? "flex-end" : "flex-start",
          paddingTop: isBottom ? 0 : 96,
          paddingBottom: isBottom ? 96 : 0,
          paddingLeft: 64,
          paddingRight: 64,
        }}
      >
        <div style={{ maxWidth: 920 }}>
          <div
            style={{
              fontFamily: "Georgia, 'Times New Roman', serif",
              fontWeight: 700,
              fontSize: 68,
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
              marginTop: 22,
              fontFamily:
                "system-ui, 'Segoe UI', 'Helvetica Neue', Arial, sans-serif",
              fontWeight: 500,
              fontSize: 34,
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
