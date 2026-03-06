import React from "react";
import {
  AbsoluteFill,
  Audio,
  Easing,
  Sequence,
  Video,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
} from "remotion";

const TextOverlay: React.FC<{
  title: string;
  subtitle?: string;
}> = ({ title, subtitle }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const opacity = interpolate(frame, [0, 0.4 * fps], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.quad),
  });
  const translateY = interpolate(frame, [0, 0.4 * fps], [18, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.quad),
  });

  return (
    <div
      style={{
        position: "absolute",
        left: 120,
        right: 120,
        bottom: 150,
        color: "#f8f8ff",
        opacity,
        transform: `translateY(${translateY}px)`,
      }}
    >
      <div
        style={{
          fontSize: 64,
          fontWeight: 700,
          letterSpacing: -1,
          lineHeight: 1.05,
          textShadow: "0 10px 30px rgba(0,0,0,0.45)",
        }}
      >
        {title}
      </div>
      {subtitle ? (
        <div
          style={{
            marginTop: 14,
            fontSize: 30,
            opacity: 0.85,
            lineHeight: 1.3,
          }}
        >
          {subtitle}
        </div>
      ) : null}
    </div>
  );
};

export const Base44GenerateFlowDemo: React.FC = () => {
  const { fps } = useVideoConfig();
  const total = 45 * fps;

  return (
    <AbsoluteFill style={{ backgroundColor: "#0b0b12" }}>
      <Video
        src={staticFile("base44/playwright/generate-flow.webm")}
        style={{ width: "100%", height: "100%", objectFit: "cover" }}
      />
      <AbsoluteFill
        style={{
          background:
            "linear-gradient(180deg, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.55) 55%, rgba(0,0,0,0.7) 100%)",
        }}
      />

      <Audio src={staticFile("base44/narration-video.mp4")} endAt={total} />

      <Sequence from={0} durationInFrames={7 * fps} premountFor={1 * fps}>
        <TextOverlay
          title="Watch a repo turn into a product."
          subtitle="No setup. No waiting. Just generate."
        />
      </Sequence>

      <Sequence from={7 * fps} durationInFrames={8 * fps} premountFor={1 * fps}>
        <TextOverlay
          title="Pick a repo and hit Generate."
          subtitle="Base44 builds the product story for you."
        />
      </Sequence>

      <Sequence from={15 * fps} durationInFrames={10 * fps} premountFor={1 * fps}>
        <TextOverlay
          title="Positioning, features, and proof."
          subtitle="A launch‑ready landing page in minutes."
        />
      </Sequence>

      <Sequence from={25 * fps} durationInFrames={10 * fps} premountFor={1 * fps}>
        <TextOverlay
          title="Make it feel real before you ship."
          subtitle="Show the product while it’s still in progress."
        />
      </Sequence>

      <Sequence from={35 * fps} durationInFrames={10 * fps} premountFor={1 * fps}>
        <TextOverlay
          title="Finish the product on Base44."
          subtitle="Turn repo momentum into growth."
        />
      </Sequence>
    </AbsoluteFill>
  );
};
