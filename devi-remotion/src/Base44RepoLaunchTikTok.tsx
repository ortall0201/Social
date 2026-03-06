import React from "react";
import {
  AbsoluteFill,
  Easing,
  Img,
  Sequence,
  Video,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";

type Base44RepoLaunchTikTokProps = {
  narratorVideoSrc?: string;
  assets?: {
    github?: string;
    hero?: string;
    features?: string;
    dashboard?: string;
  };
};

const PopImage: React.FC<{
  src: string;
  x: number;
  y: number;
  w: number;
  h: number;
  delayFrames?: number;
}> = ({ src, x, y, w, h, delayFrames = 0 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const progress = spring({
    frame: frame - delayFrames,
    fps,
    config: { damping: 200 },
    durationInFrames: 16,
  });
  const scale = interpolate(progress, [0, 1], [0.92, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const opacity = interpolate(progress, [0, 1], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const lift = interpolate(progress, [0, 1], [16, 0], {
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
        borderRadius: 22,
        overflow: "hidden",
        boxShadow: "0 24px 60px rgba(0,0,0,0.45)",
        transform: `translateY(${lift}px) scale(${scale})`,
        opacity,
        background: "#10121a",
        border: "1px solid rgba(255,255,255,0.08)",
      }}
    >
      <Img
        src={staticFile(src)}
        style={{ width: "100%", height: "100%", objectFit: "cover" }}
      />
    </div>
  );
};

const CaptionChip: React.FC<{ text: string }> = ({ text }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const opacity = interpolate(frame, [0, 12], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.quad),
  });

  return (
    <div
      style={{
        position: "absolute",
        left: 54,
        bottom: 120,
        padding: "14px 22px",
        borderRadius: 999,
        background: "rgba(0,0,0,0.55)",
        color: "#ffffff",
        fontSize: 28,
        fontWeight: 600,
        opacity,
        backdropFilter: "blur(6px)",
      }}
    >
      {text}
    </div>
  );
};

export const Base44RepoLaunchTikTok: React.FC<Base44RepoLaunchTikTokProps> = ({
  narratorVideoSrc = "base44/Voice over.mp4",
  assets,
}) => {
  const { fps } = useVideoConfig();
  const github = assets?.github ?? "base44/langchain-github.png.png";
  const hero = assets?.hero ?? "base44/base44-hero.png.png";
  const features = assets?.features ?? "base44/base44-features.png.png";
  const dashboard = assets?.dashboard ?? "base44/base44-dashboard.png.png";

  return (
    <AbsoluteFill style={{ backgroundColor: "#0b0b12" }}>
      <Video
        src={staticFile(narratorVideoSrc)}
        style={{ width: "100%", height: "100%", objectFit: "cover" }}
      />

      <Sequence from={0} durationInFrames={5 * fps} premountFor={1 * fps}>
        <CaptionChip text="Most repos never become products." />
        <PopImage src={github} x={560} y={120} w={440} h={620} />
      </Sequence>

      <Sequence from={5 * fps} durationInFrames={5 * fps} premountFor={1 * fps}>
        <CaptionChip text="They stay… code." />
        <PopImage src={github} x={520} y={160} w={470} h={640} />
      </Sequence>

      <Sequence from={10 * fps} durationInFrames={5 * fps} premountFor={1 * fps}>
        <CaptionChip text="Base44 turns a repo into a product." />
        <PopImage src={hero} x={480} y={100} w={520} h={700} />
      </Sequence>

      <Sequence from={15 * fps} durationInFrames={6 * fps} premountFor={1 * fps}>
        <CaptionChip text="Positioning, features, and proof." />
        <PopImage src={features} x={480} y={120} w={520} h={700} />
      </Sequence>

      <Sequence from={21 * fps} durationInFrames={7 * fps} premountFor={1 * fps}>
        <CaptionChip text="A real product experience." />
        <PopImage src={dashboard} x={480} y={140} w={520} h={660} />
      </Sequence>

      <Sequence from={28 * fps} durationInFrames={7 * fps} premountFor={1 * fps}>
        <CaptionChip text="Before → After" />
        <PopImage src={github} x={520} y={120} w={420} h={600} />
        <PopImage src={hero} x={520} y={740} w={420} h={520} delayFrames={8} />
      </Sequence>

      <Sequence from={35 * fps} durationInFrames={10 * fps} premountFor={1 * fps}>
        <CaptionChip text="Go finish the product on Base44." />
        <PopImage src={hero} x={480} y={120} w={520} h={700} />
      </Sequence>
    </AbsoluteFill>
  );
};
