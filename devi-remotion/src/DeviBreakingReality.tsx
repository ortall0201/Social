import React from "react";
import { AbsoluteFill, OffthreadVideo, Sequence, useCurrentFrame, useVideoConfig, staticFile, spring, interpolate, Img } from "remotion";

interface TextOverlayProps {
  text: string;
  startFrame: number;
  endFrame: number;
  size?: number;
  position?: "top" | "center" | "bottom";
  glitchEffect?: boolean;
}

const GlitchTextOverlay: React.FC<TextOverlayProps> = ({
  text,
  startFrame,
  endFrame,
  size = 80,
  position = "center",
  glitchEffect = false,
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

  // Glitch effect: random offset
  const glitchOffset = glitchEffect && relativeFrame % 4 === 0
    ? Math.random() * 10 - 5
    : 0;

  const scale = interpolate(entrance, [0, 1], [0.9, 1]) * exit;
  const opacity = interpolate(entrance, [0, 1], [0, 1]) * exit;

  const verticalPosition =
    position === "top" ? "25%" : position === "bottom" ? "75%" : "50%";

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
          transform: `scale(${scale}) translateX(${glitchOffset}px)`,
          opacity,
          fontSize: size,
          fontWeight: 800,
          fontFamily: "'Arial Black', 'Arial', sans-serif",
          color: glitchEffect ? "#00ff00" : "#ffffff",
          textAlign: "center",
          textTransform: "uppercase",
          letterSpacing: "4px",
          lineHeight: 1.3,
          padding: "0 50px",
          textShadow: glitchEffect
            ? `
              2px 2px 0 #ff00ff,
              -2px -2px 0 #00ffff,
              0 0 40px rgba(0,255,0,0.8)
            `
            : `
              0 0 40px rgba(0,0,0,1),
              0 0 80px rgba(0,0,0,0.9),
              5px 5px 25px rgba(0,0,0,1)
            `,
          WebkitTextStroke: glitchEffect ? "1px #00ff00" : "2.5px rgba(0,0,0,0.9)",
          maxWidth: "950px",
        }}
      >
        {text}
      </div>
    </AbsoluteFill>
  );
};

interface GlitchOverlayProps {
  startFrame: number;
  endFrame: number;
  intensity?: number;
}

const GlitchOverlay: React.FC<GlitchOverlayProps> = ({
  startFrame,
  endFrame,
  intensity = 0.5,
}) => {
  const frame = useCurrentFrame();

  if (frame < startFrame || frame > endFrame) {
    return null;
  }

  const relativeFrame = frame - startFrame;

  // Flickering effect
  const flickerOpacity = relativeFrame % 2 === 0 ? intensity : intensity * 0.5;

  // Random glitch bars
  const glitchBars = Array.from({ length: 5 }, (_, i) => {
    const shouldShow = (relativeFrame + i) % 3 === 0;
    return shouldShow ? (
      <div
        key={i}
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: `${i * 20}%`,
          height: "5%",
          backgroundColor: i % 2 === 0 ? "#ff00ff" : "#00ffff",
          opacity: 0.3,
          mixBlendMode: "screen",
        }}
      />
    ) : null;
  });

  return (
    <AbsoluteFill>
      {/* RGB Split Effect */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "rgba(255, 0, 0, 0.1)",
          mixBlendMode: "screen",
          transform: "translateX(2px)",
          opacity: flickerOpacity,
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "rgba(0, 255, 0, 0.1)",
          mixBlendMode: "screen",
          transform: "translateX(-2px)",
          opacity: flickerOpacity,
        }}
      />

      {/* Glitch Bars */}
      {glitchBars}

      {/* Scanlines */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,255,0,0.05) 2px, rgba(0,255,0,0.05) 4px)",
          pointerEvents: "none",
          opacity: flickerOpacity,
        }}
      />
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

export const DeviBreakingReality: React.FC<{ showText?: boolean }> = ({ showText = true }) => {
  const { fps } = useVideoConfig();

  // Video durations (in frames at 30fps)
  const segment1 = 180; // 6s - Fashion reality (looks human)
  const glitchSegment = 60; // 2s - Glitch transition
  const segment2 = 180; // 6s - Digital reveal
  const segment3 = 120; // 4s - Final message

  const video1 = staticFile("videos/devi-fashion.mp4");
  const video2 = staticFile("videos/devi-commercial.mp4");
  const video3 = staticFile("videos/jason-cat.mp4");

  return (
    <AbsoluteFill style={{ backgroundColor: "#000" }}>
      {/* PHASE 1: Fashion Reality (0-180 frames / 0-6s) */}
      <Sequence from={0} durationInFrames={segment1}>
        <ZoomVideo src={video1} startFrame={0} duration={segment1} zoomAmount={1.12} />
      </Sequence>

      {/* PHASE 2: Glitch Break (180-240 frames / 6-8s) */}
      <Sequence from={segment1} durationInFrames={glitchSegment}>
        <ZoomVideo src={video1} startFrame={segment1} duration={glitchSegment} zoomAmount={1.05} />
        <GlitchOverlay startFrame={segment1} endFrame={segment1 + glitchSegment} intensity={0.7} />
      </Sequence>

      {/* PHASE 3: Digital Reveal (240-420 frames / 8-14s) */}
      <Sequence from={segment1 + glitchSegment} durationInFrames={segment2}>
        <ZoomVideo src={video2} startFrame={segment1 + glitchSegment} duration={segment2} zoomAmount={1.1} />
      </Sequence>

      {/* PHASE 4: Jason + Final Message (420-540 frames / 14-18s) */}
      <Sequence from={segment1 + glitchSegment + segment2} durationInFrames={segment3}>
        <ZoomVideo src={video3} startFrame={segment1 + glitchSegment + segment2} duration={segment3} zoomAmount={1.08} />
      </Sequence>

      {/* Text Overlays */}
      {showText && (
        <>
          {/* Phase 1: Setup (0-6s) */}
          <GlitchTextOverlay
            text="EVERYONE THINKS I'M"
            startFrame={0}
            endFrame={90}
            size={70}
            position="top"
          />
          <GlitchTextOverlay
            text="JUST ANOTHER FASHION INFLUENCER"
            startFrame={0}
            endFrame={90}
            size={65}
            position="center"
          />

          <GlitchTextOverlay
            text="BUT..."
            startFrame={90}
            endFrame={180}
            size={95}
            position="center"
          />

          {/* Phase 2: Glitch Break (6-8s) */}
          <GlitchTextOverlay
            text="I'M NOT HUMAN"
            startFrame={180}
            endFrame={240}
            size={85}
            position="center"
            glitchEffect={true}
          />
          <GlitchOverlay startFrame={180} endFrame={240} intensity={0.8} />

          {/* Phase 3: Digital Reveal (8-14s) */}
          <GlitchTextOverlay
            text="I'M DIGITAL FASHION INTELLIGENCE"
            startFrame={240}
            endFrame={360}
            size={68}
            position="top"
            glitchEffect={true}
          />
          <GlitchTextOverlay
            text="TURNING TREND NOISE"
            startFrame={240}
            endFrame={360}
            size={62}
            position="center"
          />
          <GlitchTextOverlay
            text="INTO CLEAR SIGNALS"
            startFrame={240}
            endFrame={360}
            size={58}
            position="bottom"
          />

          {/* Phase 4: Final Message (14-18s) */}
          <GlitchTextOverlay
            text="EARLY. WEARABLE. REAL."
            startFrame={420}
            endFrame={510}
            size={72}
            position="center"
          />

          <GlitchTextOverlay
            text="THIS IS DEVI"
            startFrame={510}
            endFrame={540}
            size={95}
            position="center"
            glitchEffect={true}
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
                color: "rgba(255,255,255,0.9)",
                textShadow: "0 2px 15px rgba(0,0,0,1)",
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
