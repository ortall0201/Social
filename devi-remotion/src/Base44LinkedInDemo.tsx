import React from "react";
import {
  AbsoluteFill,
  Audio,
  Easing,
  Img,
  Sequence,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
} from "remotion";

const FPS = 30;

const Scene: React.FC<{
  src: string;
  durationInFrames: number;
  title: string;
  subtitle?: string;
  cta?: string;
  zoomToTop?: boolean;
}> = ({ src, durationInFrames, title, subtitle, cta, zoomToTop }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const opacity = interpolate(frame, [0, 0.4 * fps], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.quad),
  });
  const scale = interpolate(frame, [0, durationInFrames], [1.01, 1.06], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.inOut(Easing.quad),
  });

  return (
    <AbsoluteFill style={{ backgroundColor: "#0b0b12" }}>
      <Img
        src={staticFile(src)}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          objectPosition: zoomToTop ? "top center" : "center",
          transform: `scale(${scale})`,
          opacity,
        }}
      />
      <AbsoluteFill
        style={{
          background:
            "linear-gradient(180deg, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.7) 55%, rgba(0,0,0,0.85) 100%)",
        }}
      />
      <div
        style={{
          position: "absolute",
          left: 120,
          right: 120,
          bottom: 150,
          color: "#f8f8ff",
          opacity,
        }}
      >
        <div
          style={{
            fontSize: 64,
            fontWeight: 700,
            letterSpacing: -1,
            lineHeight: 1.05,
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
        {cta ? (
          <div
            style={{
              marginTop: 22,
              display: "inline-block",
              padding: "14px 26px",
              borderRadius: 999,
              background: "rgba(86, 92, 255, 0.9)",
              fontSize: 26,
              fontWeight: 700,
            }}
          >
            {cta}
          </div>
        ) : null}
      </div>
    </AbsoluteFill>
  );
};

export const Base44LinkedInDemo: React.FC = () => {
  const { fps } = useVideoConfig();
  const total = 45 * fps;

  return (
    <AbsoluteFill>
      <Audio src={staticFile("base44/narration-video.mp4")} endAt={total} />

      <Sequence from={0} durationInFrames={6 * fps} premountFor={1 * fps}>
        <Scene
          src="base44/demo-github.png"
          durationInFrames={6 * fps}
          title="Most repos never become products."
          subtitle="They stay as code and docs."
        />
      </Sequence>

      <Sequence from={6 * fps} durationInFrames={8 * fps} premountFor={1 * fps}>
        <Scene
          src="base44/demo-github.png"
          durationInFrames={8 * fps}
          title="Base44 turns a repo into a launch-ready story."
          subtitle="Positioning, features, and proof — instantly."
        />
      </Sequence>

      <Sequence from={14 * fps} durationInFrames={10 * fps} premountFor={1 * fps}>
        <Scene
          src="base44/demo-base44-landing.png"
          durationInFrames={10 * fps}
          title="Repo → Product page"
          subtitle="A polished landing experience, ready to share."
        />
      </Sequence>

      <Sequence from={24 * fps} durationInFrames={10 * fps} premountFor={1 * fps}>
        <Scene
          src="base44/demo-base44-section-1.png"
          durationInFrames={10 * fps}
          title="Show the value"
          subtitle="Clear benefits, proof points, and momentum."
        />
      </Sequence>

      <Sequence from={34 * fps} durationInFrames={7 * fps} premountFor={1 * fps}>
        <Scene
          src="base44/demo-base44-section-2.png"
          durationInFrames={7 * fps}
          title="Make it feel real"
          subtitle="Preview the product before you ship."
        />
      </Sequence>

      <Sequence from={41 * fps} durationInFrames={4 * fps} premountFor={1 * fps}>
        <Scene
          src="base44/demo-base44-landing.png"
          durationInFrames={4 * fps}
          title="Build on Base44"
          subtitle="Finish the product on Base44."
          cta="Go finish the product"
          zoomToTop
        />
      </Sequence>
    </AbsoluteFill>
  );
};
