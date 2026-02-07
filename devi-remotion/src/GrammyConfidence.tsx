import React from "react";
import {
  AbsoluteFill,
  Img,
  Sequence,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
  staticFile,
} from "remotion";

interface CaptionLineProps {
  text: string;
  startFrame: number;
  durationFrames: number;
  emphasis?: boolean;
  position?: "top" | "center" | "bottom";
}

const TypewriterCaption: React.FC<CaptionLineProps> = ({
  text,
  startFrame,
  durationFrames,
  emphasis = false,
  position = "center",
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  if (frame < startFrame || frame > startFrame + durationFrames) {
    return null;
  }

  const relativeFrame = frame - startFrame;

  // Typewriter effect - reveal characters gradually
  const charsToShow = Math.floor(
    interpolate(relativeFrame, [0, 30], [0, text.length], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    })
  );

  const visibleText = text.slice(0, charsToShow);

  // Spring animation for entrance
  const entrance = spring({
    frame: relativeFrame,
    fps,
    config: {
      damping: 100,
      mass: 0.5,
    },
  });

  // Fade out animation near the end
  const fadeOutStart = durationFrames - 10;
  const opacity = relativeFrame > fadeOutStart
    ? interpolate(relativeFrame, [fadeOutStart, durationFrames], [1, 0])
    : entrance;

  const verticalPosition =
    position === "top" ? "20%" : position === "bottom" ? "75%" : "50%";

  return (
    <AbsoluteFill
      style={{
        justifyContent: "center",
        alignItems: "center",
        top: verticalPosition,
        transform: "translateY(-50%)",
      }}
    >
      <div
        style={{
          opacity,
          fontSize: emphasis ? 70 : 60,
          fontWeight: emphasis ? 700 : 400,
          fontFamily: emphasis
            ? "'Playfair Display', 'Georgia', serif"
            : "'Montserrat', 'Arial', sans-serif",
          color: emphasis ? "#D4AF37" : "#FFFFFF",
          textAlign: "center",
          letterSpacing: emphasis ? "2px" : "1px",
          lineHeight: 1.4,
          padding: "0 80px",
          textShadow: emphasis
            ? `
              0 0 20px rgba(212, 175, 55, 0.8),
              0 4px 15px rgba(0, 0, 0, 0.9),
              2px 2px 4px rgba(0, 0, 0, 1)
            `
            : `
              0 2px 10px rgba(0, 0, 0, 0.9),
              0 0 30px rgba(0, 0, 0, 0.7)
            `,
          maxWidth: "900px",
        }}
      >
        {visibleText}
        {relativeFrame < 30 && charsToShow === text.length && (
          <span
            style={{
              opacity: Math.sin(relativeFrame * 0.5) > 0 ? 1 : 0,
              color: emphasis ? "#D4AF37" : "#FFFFFF",
            }}
          >
            |
          </span>
        )}
      </div>
    </AbsoluteFill>
  );
};

interface GrammyConfidenceProps {
  showText?: boolean;
}

export const GrammyConfidence: React.FC<GrammyConfidenceProps> = ({
  showText = true,
}) => {
  const { durationInFrames } = useVideoConfig();
  const frame = useCurrentFrame();

  // Background image opacity - subtle fade in
  const bgOpacity = interpolate(frame, [0, 30], [0, 0.4], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ backgroundColor: "#000000" }}>
      {/* Grammy stage background image */}
      <AbsoluteFill>
        <Img
          src="https://raw.githubusercontent.com/ortall0201/Social/main/devi-identity/images/devi-face-primary.png"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            opacity: bgOpacity,
          }}
        />
      </AbsoluteFill>

      {/* Dark overlay for text readability */}
      <AbsoluteFill
        style={{
          backgroundColor: "rgba(0, 0, 0, 0.65)",
        }}
      />

      {showText && (
        <>
          {/* Line 1: "Everyone claps for big words" */}
          <Sequence from={0} durationInFrames={60}>
            <TypewriterCaption
              text="Everyone claps for big words"
              startFrame={0}
              durationFrames={60}
              position="center"
            />
          </Sequence>

          {/* Line 2: "on big stages." (emphasis) */}
          <Sequence from={60} durationInFrames={45}>
            <TypewriterCaption
              text="on big stages."
              startFrame={60}
              durationFrames={45}
              emphasis={true}
              position="center"
            />
          </Sequence>

          {/* Line 3: "But confidence isn't about applause." (emphasis) */}
          <Sequence from={120} durationInFrames={75}>
            <TypewriterCaption
              text="But confidence isn't about applause."
              startFrame={120}
              durationFrames={75}
              emphasis={true}
              position="center"
            />
          </Sequence>

          {/* Line 4: "It's about knowing what you're standing on" */}
          <Sequence from={210} durationInFrames={75}>
            <TypewriterCaption
              text="It's about knowing what you're standing on"
              startFrame={210}
              durationFrames={75}
              position="center"
            />
          </Sequence>

          {/* Line 5: "before you speak." (emphasis) */}
          <Sequence from={285} durationInFrames={50}>
            <TypewriterCaption
              text="before you speak."
              startFrame={285}
              durationFrames={50}
              emphasis={true}
              position="center"
            />
          </Sequence>

          {/* Line 6: "Watching the Grammys 2026" */}
          <Sequence from={345} durationInFrames={60}>
            <TypewriterCaption
              text="Watching the Grammys 2026"
              startFrame={345}
              durationFrames={60}
              position="center"
            />
          </Sequence>

          {/* Line 7: "made that very clear." (emphasis) */}
          <Sequence from={405} durationInFrames={60}>
            <TypewriterCaption
              text="made that very clear."
              startFrame={405}
              durationFrames={60}
              emphasis={true}
              position="center"
            />
          </Sequence>
        </>
      )}
    </AbsoluteFill>
  );
};
