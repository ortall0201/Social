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

/** Share of frame height for the photo (rest is a dedicated type strip — full image visible, no cover crop). */
const IMAGE_FRAC_916 = 0.74;
const TEXT_FRAC_916 = 1 - IMAGE_FRAC_916;

/**
 * Instagram 9:16 feed still: photo **contained** in its band + editorial type in a separate strip
 * (not overlaid on full bleed) so the **entire** source image and all copy stay in frame.
 */
export const DeviFeedImageCaption: React.FC<DeviFeedImageCaptionProps> = ({
  imageFile,
  headline,
  subline,
  textZone,
}) => {
  const isBottom = textZone === "bottom";

  const textStrip = (
    <div
      style={{
        flex: `0 0 ${TEXT_FRAC_916 * 100}%`,
        boxSizing: "border-box",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        paddingLeft: 56,
        paddingRight: 56,
        paddingTop: isBottom ? 20 : 36,
        paddingBottom: isBottom ? 40 : 20,
        background: isBottom
          ? "linear-gradient(to top, #0A0A0A 0%, #121016 72%, #15151a 100%)"
          : "linear-gradient(to bottom, #0A0A0A 0%, #121016 72%, #15151a 100%)",
      }}
    >
      <div style={{ maxWidth: 920 }}>
        <div
          style={{
            fontFamily: "Georgia, 'Times New Roman', serif",
            fontWeight: 700,
            fontSize: 62,
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
            marginTop: 18,
            fontFamily:
              "system-ui, 'Segoe UI', 'Helvetica Neue', Arial, sans-serif",
            fontWeight: 500,
            fontSize: 32,
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
        flex: `0 0 ${IMAGE_FRAC_916 * 100}%`,
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
