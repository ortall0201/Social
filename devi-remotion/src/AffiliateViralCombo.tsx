import React from "react";
import { AbsoluteFill, OffthreadVideo, Sequence, useCurrentFrame, useVideoConfig, staticFile, spring, interpolate } from "remotion";

interface TextOverlayProps {
  text: string;
  startFrame: number;
  endFrame: number;
  size?: number;
  position?: "top" | "center" | "bottom";
}

const FastTextOverlay: React.FC<TextOverlayProps> = ({
  text,
  startFrame,
  endFrame,
  size = 80,
  position = "center",
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  if (frame < startFrame || frame > endFrame) {
    return null;
  }

  const relativeFrame = frame - startFrame;
  const duration = endFrame - startFrame;

  // Slower entrance animation for better readability
  const entrance = spring({
    frame: relativeFrame,
    fps,
    config: {
      damping: 25,
      mass: 0.5,
    },
  });

  // Gentler exit animation
  const exitStart = duration - 15;
  const exitProgress = relativeFrame > exitStart ? (relativeFrame - exitStart) / 15 : 0;
  const exit = 1 - exitProgress;

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
          transform: `scale(${scale})`,
          opacity,
          fontSize: size,
          fontWeight: 800,
          fontFamily: "'Arial Black', 'Arial', 'Helvetica Neue', Helvetica, sans-serif",
          color: "#ffffff",
          textAlign: "center",
          textTransform: "uppercase",
          letterSpacing: "3px",
          lineHeight: 1.3,
          padding: "0 50px",
          textShadow: `
            0 0 40px rgba(0,0,0,1),
            0 0 80px rgba(0,0,0,0.9),
            5px 5px 25px rgba(0,0,0,1),
            -2px -2px 10px rgba(0,0,0,0.8)
          `,
          WebkitTextStroke: "2.5px rgba(0,0,0,0.9)",
          maxWidth: "950px",
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

export const AffiliateViralCombo: React.FC<{ showText?: boolean }> = ({ showText = true }) => {
  const { fps } = useVideoConfig();

  // Each video segment is 6 seconds (180 frames) - total 18 seconds
  const segmentDuration = 180;

  // Video file paths - using staticFile() to reference public folder
  const video1 = staticFile("videos/reel1.mp4");
  const video2 = staticFile("videos/reel2.mp4");
  const video3 = staticFile("videos/reel3.mp4");

  return (
    <AbsoluteFill style={{ backgroundColor: "#000" }}>
      {/* Video 1: 0-180 frames (0-6s) */}
      <Sequence from={0} durationInFrames={segmentDuration}>
        <ZoomVideo src={video1} startFrame={0} duration={segmentDuration} zoomAmount={1.1} />
      </Sequence>

      {/* Video 2: 180-360 frames (6-12s) */}
      <Sequence from={segmentDuration} durationInFrames={segmentDuration}>
        <ZoomVideo src={video2} startFrame={segmentDuration} duration={segmentDuration} zoomAmount={1.08} />
      </Sequence>

      {/* Video 3: 360-540 frames (12-18s) */}
      <Sequence from={segmentDuration * 2} durationInFrames={segmentDuration}>
        <ZoomVideo src={video3} startFrame={segmentDuration * 2} duration={segmentDuration} zoomAmount={1.12} />
      </Sequence>

      {/* Overlay Text - only if showText is true */}
      {showText && (
        <>
          {/* Hook: 0-150 frames (0-5s) - MUCH LONGER */}
          <FastTextOverlay
            text="WANT TO WORK WITH ME?"
            startFrame={0}
            endFrame={150}
            size={85}
            position="center"
          />

          {/* Main message: 150-360 frames (5-12s) - 7 SECONDS */}
          <FastTextOverlay
            text="AFFILIATE ONLY"
            startFrame={150}
            endFrame={360}
            size={100}
            position="top"
          />

          <FastTextOverlay
            text="COMMISSION-BASED"
            startFrame={150}
            endFrame={360}
            size={65}
            position="center"
          />

          <FastTextOverlay
            text="NO SHIPPING FEES"
            startFrame={150}
            endFrame={360}
            size={55}
            position="bottom"
          />

          {/* CTA: 360-540 frames (12-18s) - 6 SECONDS */}
          <FastTextOverlay
            text="DM 'COLLAB'"
            startFrame={360}
            endFrame={540}
            size={105}
            position="center"
          />

          <FastTextOverlay
            text="FOR AFFILIATE PARTNERSHIPS"
            startFrame={360}
            endFrame={540}
            size={52}
            position="bottom"
          />

          {/* Watermark throughout */}
          <AbsoluteFill
            style={{
              justifyContent: "flex-end",
              alignItems: "flex-end",
              padding: "30px",
            }}
          >
            <div
              style={{
                fontSize: 24,
                fontWeight: 700,
                color: "rgba(255,255,255,0.6)",
                textShadow: "0 2px 10px rgba(0,0,0,0.8)",
                letterSpacing: "1px",
              }}
            >
              DEVI
            </div>
          </AbsoluteFill>
        </>
      )}
    </AbsoluteFill>
  );
};
