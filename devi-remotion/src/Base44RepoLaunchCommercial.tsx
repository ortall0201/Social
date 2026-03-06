import React from "react";
import {
  AbsoluteFill,
  Audio,
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

type Base44RepoLaunchCommercialProps = {
  includeVoiceover?: boolean;
  voiceoverSrc?: string;
  showNarrator?: boolean;
  narratorSrc?: string;
  showNarratorVideo?: boolean;
  narratorVideoSrc?: string;
  assets?: {
    github?: string;
    hero?: string;
    features?: string;
    dashboard?: string;
  };
};

const FPS = 30;
const FADE_DURATION = 0.4 * FPS;

const useFadeInOut = (durationInFrames: number) => {
  const frame = useCurrentFrame();
  const fadeIn = interpolate(frame, [0, FADE_DURATION], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.quad),
  });
  const fadeOut = interpolate(
    frame,
    [durationInFrames - FADE_DURATION, durationInFrames],
    [1, 0],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.in(Easing.quad),
    }
  );
  return Math.min(fadeIn, fadeOut);
};

const SceneShell: React.FC<{
  durationInFrames: number;
  background?: string;
  children: React.ReactNode;
}> = ({ durationInFrames, background = "#0b0b12", children }) => {
  const opacity = useFadeInOut(durationInFrames);
  return (
    <AbsoluteFill style={{ background, opacity }}>
      {children}
    </AbsoluteFill>
  );
};

const useKenBurns = ({
  durationInFrames,
  startScale = 1.02,
  endScale = 1.06,
  startX = 0,
  endX = 0,
  startY = 0,
  endY = 0,
}: {
  durationInFrames: number;
  startScale?: number;
  endScale?: number;
  startX?: number;
  endX?: number;
  startY?: number;
  endY?: number;
}) => {
  const frame = useCurrentFrame();
  const scale = interpolate(frame, [0, durationInFrames], [startScale, endScale], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.inOut(Easing.quad),
  });
  const x = interpolate(frame, [0, durationInFrames], [startX, endX], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.inOut(Easing.quad),
  });
  const y = interpolate(frame, [0, durationInFrames], [startY, endY], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.inOut(Easing.quad),
  });
  return { scale, x, y };
};

const TextBlock: React.FC<{
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  y?: number;
}> = ({ title, subtitle, align = "left", y = 120 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const reveal = spring({
    frame,
    fps,
    config: { damping: 200 },
    durationInFrames: 14,
  });
  const opacity = interpolate(reveal, [0, 1], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const translateY = interpolate(reveal, [0, 1], [16, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        position: "absolute",
        left: align === "left" ? 80 : 0,
        right: align === "left" ? 80 : 0,
        top: y,
        textAlign: align,
        color: "#f8f8ff",
        opacity,
        transform: `translateY(${translateY}px)`,
      }}
    >
      <div
        style={{
          fontSize: 66,
          fontWeight: 700,
          letterSpacing: -1,
          lineHeight: 1.05,
          textShadow: "0 12px 30px rgba(0,0,0,0.35)",
        }}
      >
        {title}
      </div>
      {subtitle ? (
        <div
          style={{
            marginTop: 16,
            fontSize: 34,
            fontWeight: 500,
            opacity: 0.85,
            lineHeight: 1.25,
          }}
        >
          {subtitle}
        </div>
      ) : null}
    </div>
  );
};

const FullBleedImage: React.FC<{
  src: string;
  durationInFrames: number;
  highlight?: boolean;
}> = ({ src, durationInFrames, highlight }) => {
  const { scale, x, y } = useKenBurns({
    durationInFrames,
    startScale: 1.02,
    endScale: 1.06,
    startX: -12,
    endX: 12,
    startY: -8,
    endY: 8,
  });

  return (
    <>
      <Img
        src={staticFile(src)}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          transform: `scale(${scale}) translate(${x}px, ${y}px)`,
          filter: highlight ? "drop-shadow(0 20px 60px rgba(32, 48, 255, 0.35))" : "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(180deg, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.6) 55%, rgba(0,0,0,0.8) 100%)",
        }}
      />
    </>
  );
};

const SplitBeforeAfter: React.FC<{
  beforeSrc: string;
  afterSrc: string;
}> = ({ beforeSrc, afterSrc }) => {
  const { width, height } = useVideoConfig();
  const isVertical = height > width;

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: isVertical ? "1fr" : "1fr 1fr",
        gridTemplateRows: isVertical ? "1fr 1fr" : "1fr",
        gap: 24,
        padding: 80,
        height: "100%",
        boxSizing: "border-box",
      }}
    >
      <Img
        src={staticFile(beforeSrc)}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          borderRadius: 28,
          boxShadow: "0 30px 80px rgba(0,0,0,0.45)",
        }}
      />
      <Img
        src={staticFile(afterSrc)}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          borderRadius: 28,
          boxShadow: "0 30px 80px rgba(0,0,0,0.45)",
        }}
      />
    </div>
  );
};

const NarratorBadge: React.FC<{ src: string }> = ({ src }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const pop = spring({
    frame: frame - 10,
    fps,
    config: { damping: 200 },
    durationInFrames: 18,
  });
  const scale = interpolate(pop, [0, 1], [0.9, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const opacity = interpolate(pop, [0, 1], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        position: "absolute",
        bottom: 36,
        left: "50%",
        transform: `translateX(-50%) scale(${scale})`,
        opacity,
        width: 180,
        height: 180,
        borderRadius: 999,
        overflow: "hidden",
        boxShadow: "0 18px 50px rgba(0,0,0,0.5)",
        border: "4px solid rgba(255,255,255,0.5)",
        background: "#0b0b12",
      }}
    >
      <Img
        src={staticFile(src)}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
        }}
      />
    </div>
  );
};

const NarratorVideoBadge: React.FC<{ src: string }> = ({ src }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const pop = spring({
    frame: frame - 10,
    fps,
    config: { damping: 200 },
    durationInFrames: 18,
  });
  const scale = interpolate(pop, [0, 1], [0.9, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const opacity = interpolate(pop, [0, 1], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        position: "absolute",
        bottom: 36,
        left: "50%",
        transform: `translateX(-50%) scale(${scale})`,
        opacity,
        width: 180,
        height: 180,
        borderRadius: 999,
        overflow: "hidden",
        boxShadow: "0 18px 50px rgba(0,0,0,0.5)",
        border: "4px solid rgba(255,255,255,0.5)",
        background: "#0b0b12",
      }}
    >
      <Video
        src={staticFile(src)}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
        }}
      />
    </div>
  );
};

const CTAOverlay: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const start = 1 * fps;
  const progress = spring({
    frame: frame - start,
    fps,
    config: { damping: 200 },
    durationInFrames: 20,
  });
  const opacity = interpolate(progress, [0, 1], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const translateY = interpolate(progress, [0, 1], [12, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        position: "absolute",
        left: 80,
        right: 80,
        bottom: 120,
        padding: "22px 34px",
        borderRadius: 999,
        background: "rgba(86, 92, 255, 0.9)",
        color: "#ffffff",
        fontSize: 34,
        fontWeight: 700,
        textAlign: "center",
        letterSpacing: -0.2,
        opacity,
        transform: `translateY(${translateY}px)`,
        boxShadow: "0 22px 60px rgba(86, 92, 255, 0.4)",
      }}
    >
      Go finish the product on Base44.
    </div>
  );
};

export const Base44RepoLaunchCommercial: React.FC<Base44RepoLaunchCommercialProps> = ({
  includeVoiceover = false,
  voiceoverSrc = "audio/base44-vo.mp3",
  showNarrator = false,
  narratorSrc = "base44/narrator.png",
  showNarratorVideo = false,
  narratorVideoSrc = "base44/Voice over.mp4",
  assets,
}) => {
  const { fps } = useVideoConfig();
  const github = assets?.github ?? "base44/langchain-github.png";
  const hero = assets?.hero ?? "base44/base44-hero.png";
  const features = assets?.features ?? "base44/base44-features.png";
  const dashboard = assets?.dashboard ?? "base44/base44-dashboard.png";

  return (
    <AbsoluteFill style={{ backgroundColor: "#07070c" }}>
      {includeVoiceover && !showNarratorVideo ? (
        <Audio src={staticFile(voiceoverSrc)} />
      ) : null}

      <Sequence from={0} durationInFrames={5 * fps} premountFor={1 * fps}>
        <SceneShell durationInFrames={5 * fps}>
          <FullBleedImage src={github} durationInFrames={5 * fps} />
          <TextBlock title="Most repos never become products." />
          {showNarrator ? <NarratorBadge src={narratorSrc} /> : null}
          {showNarratorVideo ? <NarratorVideoBadge src={narratorVideoSrc} /> : null}
        </SceneShell>
      </Sequence>

      <Sequence from={5 * fps} durationInFrames={5 * fps} premountFor={1 * fps}>
        <SceneShell durationInFrames={5 * fps}>
          <FullBleedImage
            src={github}
            durationInFrames={5 * fps}
            highlight
          />
          <TextBlock title="They stay… code." subtitle="Ship-worthy stories never get told." />
          {showNarrator ? <NarratorBadge src={narratorSrc} /> : null}
          {showNarratorVideo ? <NarratorVideoBadge src={narratorVideoSrc} /> : null}
        </SceneShell>
      </Sequence>

      <Sequence from={10 * fps} durationInFrames={5 * fps} premountFor={1 * fps}>
        <SceneShell durationInFrames={5 * fps}>
          <FullBleedImage src={hero} durationInFrames={5 * fps} highlight />
          <TextBlock title="Base44 turns a repo into a product." />
          {showNarrator ? <NarratorBadge src={narratorSrc} /> : null}
          {showNarratorVideo ? <NarratorVideoBadge src={narratorVideoSrc} /> : null}
        </SceneShell>
      </Sequence>

      <Sequence from={15 * fps} durationInFrames={6 * fps} premountFor={1 * fps}>
        <SceneShell durationInFrames={6 * fps}>
          <FullBleedImage src={features} durationInFrames={6 * fps} />
          <TextBlock title="Positioning, features, and proof." subtitle="Instantly assembled." />
          {showNarrator ? <NarratorBadge src={narratorSrc} /> : null}
          {showNarratorVideo ? <NarratorVideoBadge src={narratorVideoSrc} /> : null}
        </SceneShell>
      </Sequence>

      <Sequence from={21 * fps} durationInFrames={7 * fps} premountFor={1 * fps}>
        <SceneShell durationInFrames={7 * fps}>
          <FullBleedImage src={dashboard} durationInFrames={7 * fps} />
          <TextBlock title="A real product experience." subtitle="Feels live before you ship." />
          {showNarrator ? <NarratorBadge src={narratorSrc} /> : null}
          {showNarratorVideo ? <NarratorVideoBadge src={narratorVideoSrc} /> : null}
        </SceneShell>
      </Sequence>

      <Sequence from={28 * fps} durationInFrames={7 * fps} premountFor={1 * fps}>
        <SceneShell durationInFrames={7 * fps} background="#0c0e18">
          <SplitBeforeAfter
            beforeSrc={github}
            afterSrc={hero}
          />
          <TextBlock title="Before → After" align="center" y={60} />
          {showNarrator ? <NarratorBadge src={narratorSrc} /> : null}
          {showNarratorVideo ? <NarratorVideoBadge src={narratorVideoSrc} /> : null}
        </SceneShell>
      </Sequence>

      <Sequence from={35 * fps} durationInFrames={10 * fps} premountFor={1 * fps}>
        <SceneShell durationInFrames={10 * fps}>
          <FullBleedImage src={hero} durationInFrames={10 * fps} highlight />
          <TextBlock title="Go finish the product on Base44." />
          <CTAOverlay />
          {showNarrator ? <NarratorBadge src={narratorSrc} /> : null}
          {showNarratorVideo ? <NarratorVideoBadge src={narratorVideoSrc} /> : null}
        </SceneShell>
      </Sequence>
    </AbsoluteFill>
  );
};
