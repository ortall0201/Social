import React from "react";
import { AbsoluteFill, OffthreadVideo, Sequence, useCurrentFrame, useVideoConfig, staticFile, spring, interpolate } from "remotion";

interface TextOverlayProps {
  text: string;
  startFrame: number;
  endFrame: number;
  size?: number;
  position?: "top" | "center" | "bottom";
  glitchEffect?: boolean;
}

const ViralTextOverlay: React.FC<TextOverlayProps> = ({
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

  // Intense glitch offset
  const glitchOffset = glitchEffect && relativeFrame % 3 === 0
    ? Math.random() * 15 - 7.5
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
          letterSpacing: glitchEffect ? "6px" : "4px",
          lineHeight: 1.3,
          padding: "0 50px",
          textShadow: glitchEffect
            ? `
              3px 3px 0 #ff00ff,
              -3px -3px 0 #00ffff,
              0 0 50px rgba(0,255,0,1),
              0 0 100px rgba(0,255,0,0.5)
            `
            : `
              0 0 40px rgba(0,0,0,1),
              0 0 80px rgba(0,0,0,0.9),
              5px 5px 25px rgba(0,0,0,1)
            `,
          WebkitTextStroke: glitchEffect ? "2px #00ff00" : "2.5px rgba(0,0,0,0.9)",
          maxWidth: "950px",
          filter: glitchEffect ? "brightness(1.5)" : "none",
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

  const flickerOpacity = relativeFrame % 2 === 0 ? intensity : intensity * 0.6;

  const glitchBars = Array.from({ length: 8 }, (_, i) => {
    const shouldShow = (relativeFrame + i) % 2 === 0;
    return shouldShow ? (
      <div
        key={i}
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: `${i * 12.5}%`,
          height: `${Math.random() * 8 + 2}%`,
          backgroundColor: i % 2 === 0 ? "#ff00ff" : "#00ffff",
          opacity: 0.4,
          mixBlendMode: "screen",
          transform: `translateX(${Math.random() * 20 - 10}px)`,
        }}
      />
    ) : null;
  });

  return (
    <AbsoluteFill>
      {/* RGB Split - Stronger */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "rgba(255, 0, 0, 0.15)",
          mixBlendMode: "screen",
          transform: `translateX(${relativeFrame % 4}px)`,
          opacity: flickerOpacity,
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "rgba(0, 255, 0, 0.15)",
          mixBlendMode: "screen",
          transform: `translateX(-${relativeFrame % 4}px)`,
          opacity: flickerOpacity,
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "rgba(0, 0, 255, 0.1)",
          mixBlendMode: "screen",
          transform: `translateY(${relativeFrame % 3}px)`,
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
          background: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,255,0,0.08) 2px, rgba(0,255,0,0.08) 4px)",
          pointerEvents: "none",
          opacity: flickerOpacity,
        }}
      />

      {/* Digital noise */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `radial-gradient(circle at ${Math.random() * 100}% ${Math.random() * 100}%, rgba(0,255,0,0.1), transparent)`,
          opacity: flickerOpacity * 0.5,
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

export const DeviTrueStory: React.FC<{ showText?: boolean }> = ({ showText = true }) => {
  const { fps } = useVideoConfig();

  // Narrative Arc (25 seconds total)
  const streetClothes = 120;      // 0-4s: Street clothes (looks real)
  const kStyle = 120;              // 4-8s: K-style fashion
  const glitchBreak = 60;          // 8-10s: REALITY BREAKS
  const aiReveal = 120;            // 10-14s: AI reveal
  const redCarpet1 = 90;           // 14-17s: Red carpet authority
  const redCarpet2 = 90;           // 17-20s: More high fashion
  const walkAway = 150;            // 20-25s: Slow walk away

  const videos = {
    streetClothes: staticFile("videos/street-clothes.mp4"),
    kStyle: staticFile("videos/k-style.mp4"),
    aiReveal: staticFile("videos/ai-reveal.mp4"),
    redCarpet1: staticFile("videos/red-carpet-1.mp4"),
    redCarpet2: staticFile("videos/red-carpet-2.mp4"),
    walkAway: staticFile("videos/walk-away.mp4"),
  };

  return (
    <AbsoluteFill style={{ backgroundColor: "#000" }}>
      {/* PHASE 1: Street Clothes (0-120 frames / 0-4s) */}
      <Sequence from={0} durationInFrames={streetClothes}>
        <ZoomVideo src={videos.streetClothes} startFrame={0} duration={streetClothes} zoomAmount={1.1} />
      </Sequence>

      {/* PHASE 2: K-Style Fashion (120-240 frames / 4-8s) */}
      <Sequence from={streetClothes} durationInFrames={kStyle}>
        <ZoomVideo src={videos.kStyle} startFrame={streetClothes} duration={kStyle} zoomAmount={1.12} />
      </Sequence>

      {/* PHASE 3: GLITCH BREAK (240-300 frames / 8-10s) */}
      <Sequence from={streetClothes + kStyle} durationInFrames={glitchBreak}>
        <ZoomVideo
          src={videos.kStyle}
          startFrame={streetClothes + kStyle}
          duration={glitchBreak}
          zoomAmount={1.05}
        />
        <GlitchOverlay
          startFrame={streetClothes + kStyle}
          endFrame={streetClothes + kStyle + glitchBreak}
          intensity={0.9}
        />
      </Sequence>

      {/* PHASE 4: AI Reveal (300-420 frames / 10-14s) */}
      <Sequence from={streetClothes + kStyle + glitchBreak} durationInFrames={aiReveal}>
        <ZoomVideo
          src={videos.aiReveal}
          startFrame={streetClothes + kStyle + glitchBreak}
          duration={aiReveal}
          zoomAmount={1.1}
        />
      </Sequence>

      {/* PHASE 5: Red Carpet Authority 1 (420-510 frames / 14-17s) */}
      <Sequence from={streetClothes + kStyle + glitchBreak + aiReveal} durationInFrames={redCarpet1}>
        <ZoomVideo
          src={videos.redCarpet1}
          startFrame={streetClothes + kStyle + glitchBreak + aiReveal}
          duration={redCarpet1}
          zoomAmount={1.15}
        />
      </Sequence>

      {/* PHASE 6: Red Carpet Authority 2 (510-600 frames / 17-20s) */}
      <Sequence from={streetClothes + kStyle + glitchBreak + aiReveal + redCarpet1} durationInFrames={redCarpet2}>
        <ZoomVideo
          src={videos.redCarpet2}
          startFrame={streetClothes + kStyle + glitchBreak + aiReveal + redCarpet1}
          duration={redCarpet2}
          zoomAmount={1.12}
        />
      </Sequence>

      {/* PHASE 7: Walk Away (600-750 frames / 20-25s) */}
      <Sequence from={streetClothes + kStyle + glitchBreak + aiReveal + redCarpet1 + redCarpet2} durationInFrames={walkAway}>
        <ZoomVideo
          src={videos.walkAway}
          startFrame={streetClothes + kStyle + glitchBreak + aiReveal + redCarpet1 + redCarpet2}
          duration={walkAway}
          zoomAmount={1.08}
        />
      </Sequence>

      {/* Text Overlays */}
      {showText && (
        <>
          {/* Phase 1-2: Setup (0-8s) */}
          <ViralTextOverlay
            text="JUST ANOTHER FASHION GIRL"
            startFrame={0}
            endFrame={120}
            size={75}
            position="center"
          />

          <ViralTextOverlay
            text="STYLED. CONFIDENT. REAL."
            startFrame={120}
            endFrame={210}
            size={68}
            position="center"
          />

          <ViralTextOverlay
            text="...RIGHT?"
            startFrame={210}
            endFrame={240}
            size={85}
            position="center"
          />

          {/* Phase 3: GLITCH BREAK (8-10s) */}
          <ViralTextOverlay
            text="WAIT..."
            startFrame={240}
            endFrame={300}
            size={110}
            position="center"
            glitchEffect={true}
          />

          {/* Phase 4: AI Reveal (10-14s) */}
          <ViralTextOverlay
            text="I'M NOT REAL"
            startFrame={300}
            endFrame={360}
            size={95}
            position="top"
            glitchEffect={true}
          />

          <ViralTextOverlay
            text="I'M AN AI CURATOR"
            startFrame={300}
            endFrame={420}
            size={78}
            position="center"
            glitchEffect={true}
          />

          <ViralTextOverlay
            text="HAND-PICKING TRENDY CHIC LOOKS"
            startFrame={360}
            endFrame={420}
            size={58}
            position="bottom"
            glitchEffect={true}
          />

          {/* Phase 5-6: Red Carpet Authority (14-20s) */}
          <ViralTextOverlay
            text="FROM U.S. FASHION INDUSTRY"
            startFrame={420}
            endFrame={510}
            size={65}
            position="top"
          />

          <ViralTextOverlay
            text="HOT COUTURE"
            startFrame={420}
            endFrame={510}
            size={88}
            position="center"
          />

          <ViralTextOverlay
            text="RED CARPET READY"
            startFrame={510}
            endFrame={600}
            size={72}
            position="center"
          />

          {/* Phase 7: Final Identity (20-25s) */}
          <ViralTextOverlay
            text="THIS IS DEVI"
            startFrame={600}
            endFrame={720}
            size={100}
            position="center"
            glitchEffect={true}
          />

          <ViralTextOverlay
            text="DIGITAL FASHION INTELLIGENCE"
            startFrame={720}
            endFrame={750}
            size={55}
            position="bottom"
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
                fontSize: 34,
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
