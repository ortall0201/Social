import React from "react";
import {
  AbsoluteFill,
  Img,
  Sequence,
  Video,
  interpolate,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

type OverlayImageProps = {
  src: string;
  x: number;
  y: number;
  w: number;
  h: number;
};

export const REPO_LAUNCH_AD_VIDEO_SRC = "base44/narration-video.mp4";

const OverlayImage: React.FC<OverlayImageProps> = ({ src, x, y, w, h }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const opacity = interpolate(frame, [0, 0.35 * fps], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const scale = interpolate(frame, [0, 0.4 * fps], [0.95, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const translateY = interpolate(frame, [0, 0.4 * fps], [16, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        width: w,
        height: h,
        borderRadius: 28,
        overflow: "hidden",
        boxShadow: "0 26px 60px rgba(0, 0, 0, 0.35)",
        transform: `translateY(${translateY}px) scale(${scale})`,
        opacity,
        background: "rgba(15, 17, 26, 0.45)",
        backdropFilter: "blur(10px)",
        WebkitBackdropFilter: "blur(10px)",
      }}
    >
      <Img
        src={staticFile(src)}
        style={{ width: "100%", height: "100%", objectFit: "cover" }}
      />
    </div>
  );
};

export const RepoLaunchAd: React.FC = () => {
  const { fps, width, height, durationInFrames } = useVideoConfig();

  const isSquare = width === height;
  const rightColumnX = isSquare ? width * 0.5 : width * 0.58;
  const topY = height * 0.12;
  const midY = height * 0.2;
  const lowerY = height * 0.5;

  const cardW = isSquare ? width * 0.42 : width * 0.36;
  const cardH = isSquare ? height * 0.48 : height * 0.62;

  const wideCardW = isSquare ? width * 0.44 : width * 0.38;
  const wideCardH = isSquare ? height * 0.38 : height * 0.42;

  const endStart = 42 * fps;
  const endDuration = Math.max(1, durationInFrames - endStart);

  return (
    <AbsoluteFill style={{ backgroundColor: "#0b0b12" }}>
      <Video
        src={staticFile(REPO_LAUNCH_AD_VIDEO_SRC)}
        style={{ width: "100%", height: "100%", objectFit: "cover" }}
      />

      {/* 5–12s GitHub before */}
      <Sequence from={5 * fps} durationInFrames={7 * fps} premountFor={1 * fps}>
        <OverlayImage
        src="base44/github-before.png.png"
          x={rightColumnX}
          y={topY}
          w={cardW}
          h={cardH}
        />
      </Sequence>

      {/* 12–20s GitHub after */}
      <Sequence from={12 * fps} durationInFrames={8 * fps} premountFor={1 * fps}>
        <OverlayImage
        src="base44/github-after.png.png"
          x={rightColumnX}
          y={midY}
          w={cardW}
          h={cardH}
        />
      </Sequence>

      {/* 20–32s RepoLaunch landing */}
      <Sequence from={20 * fps} durationInFrames={12 * fps} premountFor={1 * fps}>
        <OverlayImage
          src="base44/base44-landing.png"
          x={rightColumnX}
          y={topY}
          w={cardW}
          h={cardH}
        />
      </Sequence>

      {/* 32–42s Before/after comparison */}
      <Sequence from={32 * fps} durationInFrames={10 * fps} premountFor={1 * fps}>
        <OverlayImage
          src="base44/github-before.png.png"
          x={rightColumnX}
          y={lowerY}
          w={wideCardW}
          h={wideCardH}
        />
        <OverlayImage
          src="base44/github-after.png.png"
          x={rightColumnX + wideCardW * 0.05}
          y={lowerY + wideCardH * 0.55}
          w={wideCardW}
          h={wideCardH}
        />
      </Sequence>

      {/* 42s–end: zoom to "Build on Base44" area */}
      <Sequence from={endStart} durationInFrames={endDuration} premountFor={1 * fps}>
        <ZoomLanding
          src="base44/base44-landing.png"
          x={rightColumnX}
          y={topY * 0.8}
          w={cardW}
          h={cardH}
          durationInFrames={endDuration}
        />
      </Sequence>
    </AbsoluteFill>
  );
};

const ZoomLanding: React.FC<{
  src: string;
  x: number;
  y: number;
  w: number;
  h: number;
  durationInFrames: number;
}> = ({ src, x, y, w, h, durationInFrames }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const scale = interpolate(frame, [0, durationInFrames], [1, 1.1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const opacity = interpolate(frame, [0, 0.4 * fps], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        width: w,
        height: h,
        borderRadius: 28,
        overflow: "hidden",
        boxShadow: "0 26px 60px rgba(0, 0, 0, 0.35)",
        background: "rgba(15, 17, 26, 0.45)",
        backdropFilter: "blur(10px)",
        WebkitBackdropFilter: "blur(10px)",
        transformOrigin: "top center",
        transform: `scale(${scale})`,
        opacity,
      }}
    >
      <Img
        src={staticFile(src)}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          objectPosition: "top center",
        }}
      />
    </div>
  );
};
