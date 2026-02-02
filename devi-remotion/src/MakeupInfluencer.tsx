import React from "react";
import { AbsoluteFill, OffthreadVideo, Sequence, useCurrentFrame, useVideoConfig, staticFile, spring, interpolate } from "remotion";

interface TextOverlayProps {
  text: string;
  startFrame: number;
  endFrame: number;
  size?: number;
  position?: "top" | "center" | "bottom";
  style?: "bold" | "elegant" | "technique";
}

const MakeupTextOverlay: React.FC<TextOverlayProps> = ({
  text,
  startFrame,
  endFrame,
  size = 75,
  position = "center",
  style = "bold",
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  if (frame < startFrame || frame > endFrame) {
    return null;
  }

  const relativeFrame = frame - startFrame;
  const duration = endFrame - startFrame;

  const entrance = spring({
    frame: relativeFrame,
    fps,
    config: {
      damping: 25,
      mass: 0.5,
    },
  });

  const exitStart = duration - 15;
  const exitProgress = relativeFrame > exitStart ? (relativeFrame - exitStart) / 15 : 0;
  const exit = 1 - exitProgress;

  const scale = interpolate(entrance, [0, 1], [0.95, 1]) * exit;
  const opacity = interpolate(entrance, [0, 1], [0, 1]) * exit;

  const verticalPosition =
    position === "top" ? "25%" : position === "bottom" ? "75%" : "50%";

  // Style variations for different text types
  const getTextStyle = () => {
    switch (style) {
      case "elegant":
        return {
          fontFamily: "'Playfair Display', 'Georgia', serif",
          fontWeight: 600,
          letterSpacing: "2px",
          color: "#ffffff",
          textTransform: "capitalize" as const,
          fontStyle: "italic" as const,
        };
      case "technique":
        return {
          fontFamily: "'Arial Black', 'Arial', sans-serif",
          fontWeight: 800,
          letterSpacing: "4px",
          color: "#ffb6c1",
          textTransform: "uppercase" as const,
        };
      default: // bold
        return {
          fontFamily: "'Arial Black', 'Arial', sans-serif",
          fontWeight: 800,
          letterSpacing: "3px",
          color: "#ffffff",
          textTransform: "uppercase" as const,
        };
    }
  };

  const textStyle = getTextStyle();

  return (
    <AbsoluteFill
      style={{
        justifyContent: "center",
        alignItems: "center",
        top: verticalPosition,
        transform: `translateY(-50%)`,
      }}
    >
      <div
        style={{
          transform: `scale(${scale})`,
          opacity,
          fontSize: size,
          textAlign: "center",
          lineHeight: 1.3,
          padding: "0 50px",
          textShadow: `
            0 0 40px rgba(0,0,0,1),
            0 0 80px rgba(0,0,0,0.9),
            5px 5px 25px rgba(0,0,0,1),
            -2px -2px 10px rgba(0,0,0,0.8)
          `,
          WebkitTextStroke: "2px rgba(0,0,0,0.7)",
          maxWidth: "950px",
          ...textStyle,
        }}
      >
        {text}
      </div>
    </AbsoluteFill>
  );
};

interface ZoomVideoProps {
  src: string;
  startFrame: number;
  duration: number;
  zoomAmount?: number;
}

const ZoomVideo: React.FC<ZoomVideoProps> = ({ src, startFrame, duration, zoomAmount = 1.08 }) => {
  const frame = useCurrentFrame();
  const relativeFrame = frame - startFrame;

  const zoom = interpolate(
    relativeFrame,
    [0, duration],
    [1, zoomAmount],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        transform: `scale(${zoom})`,
      }}
    >
      <OffthreadVideo
        src={src}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
        }}
        volume={0}
      />
    </div>
  );
};

export const MakeupInfluencer: React.FC<{ showText?: boolean }> = ({ showText = true }) => {
  const { fps } = useVideoConfig();

  // Video durations (16 seconds total / 480 frames at 30fps)
  const video1Duration = 240; // 8 seconds - First makeup technique
  const video2Duration = 240; // 8 seconds - Second makeup technique

  const makeup1 = staticFile("videos/makeup-1.mp4");
  const makeup2 = staticFile("videos/makeup-2.mp4");

  return (
    <AbsoluteFill style={{ backgroundColor: "#000" }}>
      {/* VIDEO 1: First Makeup Technique (0-240 frames / 0-8s) */}
      <Sequence from={0} durationInFrames={video1Duration}>
        <ZoomVideo src={makeup1} startFrame={0} duration={video1Duration} zoomAmount={1.1} />
      </Sequence>

      {/* VIDEO 2: Second Makeup Technique (240-480 frames / 8-16s) */}
      <Sequence from={video1Duration} durationInFrames={video2Duration}>
        <ZoomVideo src={makeup2} startFrame={video1Duration} duration={video2Duration} zoomAmount={1.12} />
      </Sequence>

      {/* Text Overlays */}
      {showText && (
        <>
          {/* Phase 1: Intro Hook (0-2.5s) */}
          <MakeupTextOverlay
            text="WATCH A PRO WORK"
            startFrame={0}
            endFrame={75}
            size={80}
            position="top"
            style="bold"
          />

          {/* Phase 2: Technique Focus 1 (2.5-5.5s) */}
          <MakeupTextOverlay
            text="Years of Practice"
            startFrame={75}
            endFrame={165}
            size={68}
            position="center"
            style="elegant"
          />

          <MakeupTextOverlay
            text="IN EVERY STROKE"
            startFrame={120}
            endFrame={210}
            size={62}
            position="bottom"
            style="technique"
          />

          {/* Phase 3: Transition (5.5-6.5s) */}
          <MakeupTextOverlay
            text="THIS IS MASTERY"
            startFrame={165}
            endFrame={195}
            size={75}
            position="center"
            style="bold"
          />

          {/* Phase 4: Second Technique (6.5-10s) */}
          <MakeupTextOverlay
            text="CONFIDENCE"
            startFrame={195}
            endFrame={270}
            size={85}
            position="top"
            style="bold"
          />

          <MakeupTextOverlay
            text="Precision. Control. Skill."
            startFrame={240}
            endFrame={300}
            size={60}
            position="center"
            style="elegant"
          />

          {/* Phase 5: Technique Details (10-12.5s) */}
          <MakeupTextOverlay
            text="PROFESSIONAL TECHNIQUE"
            startFrame={300}
            endFrame={375}
            size={65}
            position="top"
            style="technique"
          />

          <MakeupTextOverlay
            text="NO HESITATION"
            startFrame={330}
            endFrame={390}
            size={72}
            position="center"
            style="bold"
          />

          {/* Phase 6: Final Message (12.5-16s) */}
          <MakeupTextOverlay
            text="This is Devi"
            startFrame={375}
            endFrame={450}
            size={95}
            position="center"
            style="elegant"
          />

          <MakeupTextOverlay
            text="MAKEUP ARTIST"
            startFrame={420}
            endFrame={480}
            size={68}
            position="bottom"
            style="technique"
          />

          {/* Instagram handle throughout */}
          <AbsoluteFill
            style={{
              justifyContent: "flex-end",
              alignItems: "center",
              padding: "40px",
            }}
          >
            <div
              style={{
                fontSize: 32,
                fontWeight: 700,
                color: "rgba(255,255,255,0.95)",
                textShadow: "0 3px 20px rgba(0,0,0,1), 0 0 10px rgba(0,0,0,0.8)",
                letterSpacing: "2px",
              }}
            >
              @devinee.me
            </div>
          </AbsoluteFill>
        </>
      )}
    </AbsoluteFill>
  );
};
