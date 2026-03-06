import React from "react";
import {
  AbsoluteFill,
  Sequence,
  Video,
  interpolate,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

// Narrator video cuts at t=48s — after that the OpenArt outro appears.
const NARRATOR_END_S = 48;

// ─── Narrator blur segments (composition time, seconds) ──────────────────────
// Narrator is clear by default; blurs only while a demo overlay is active.
const BLUR_SEGMENTS = [
  { from: 5,  to: 9  },  // Clip 1: GitHub repo
  { from: 15, to: 22 },  // Clip 2: Generate flow
  { from: 30, to: 36 },  // Clip 3: Landing page reveal
  { from: 38, to: 41 },  // Clip 4: Star + Base44 button zoom
] as const;

const BLUR_RAMP_S = 0.4;

// ─── Demo overlay clip ───────────────────────────────────────────────────────
type OverlayClipProps = {
  src: string;
  /** Start position inside the source video, in frames */
  startFrom: number;
  durationInFrames: number;
  /**
   * Zoom slowly into the top of the clip (2× → 2.4×) to spotlight
   * nav-bar buttons like "Star the repo" and "Build on Base44".
   */
  zoomIntoTop?: boolean;
};

const OverlayClip: React.FC<OverlayClipProps> = ({
  src,
  startFrom,
  durationInFrames,
  zoomIntoTop = false,
}) => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();

  const FADE  = Math.round(0.3 * fps);
  const SLIDE = Math.round(0.4 * fps);

  const fadeIn  = interpolate(frame, [0, FADE], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const fadeOut = interpolate(frame, [durationInFrames - FADE, durationInFrames], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const opacity = 0.93 * Math.min(fadeIn, fadeOut);

  const containerScale = interpolate(frame, [0, SLIDE], [0.96, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const translateY     = interpolate(frame, [0, SLIDE], [20, 0],   { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  // For the button-zoom clip: slowly push in 2.0× → 2.4× from the top
  const innerZoom = zoomIntoTop
    ? interpolate(frame, [0, durationInFrames], [2.0, 2.4], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })
    : 1;

  const w = width * 0.62;
  const h = height * 0.68;
  const x = (width - w) / 2;
  const y = (height - h) / 2;

  return (
    <div
      style={{
        position: "absolute",
        left: x, top: y, width: w, height: h,
        borderRadius: 20,
        overflow: "hidden",
        boxShadow: "0 32px 80px rgba(0,0,0,0.55), 0 0 0 1px rgba(255,255,255,0.08)",
        transform: `translateY(${translateY}px) scale(${containerScale})`,
        opacity,
      }}
    >
      <Video
        src={staticFile(src)}
        startFrom={startFrom}
        endAt={startFrom + durationInFrames}
        muted
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          transform: `scale(${innerZoom})`,
          transformOrigin: "top center",
        }}
      />
    </div>
  );
};

// ─── Main composition ─────────────────────────────────────────────────────────
export const Base44NarratorDemo: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const RAMP = Math.round(BLUR_RAMP_S * fps);

  // Narrator blur: max blur + min brightness across all active segments
  let blurPx = 0;
  let brightness = 1;

  for (const seg of BLUR_SEGMENTS) {
    const f0 = Math.round(seg.from * fps);
    const f1 = Math.round(seg.to * fps);

    blurPx = Math.max(blurPx,
      interpolate(frame, [f0 - RAMP, f0, f1, f1 + RAMP], [0, 6, 6, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })
    );
    brightness = Math.min(brightness,
      interpolate(frame, [f0 - RAMP, f0, f1, f1 + RAMP], [1, 0.72, 0.72, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })
    );
  }

  const narratorFilter = blurPx > 0.05
    ? `blur(${blurPx.toFixed(2)}px) brightness(${brightness.toFixed(3)})`
    : "none";

  return (
    <AbsoluteFill style={{ backgroundColor: "#080a10" }}>
      {/*
        Single narrator — only audio source.
        endAt cuts before the OpenArt "Make Wonders" outro at t=48s.
      */}
      <Video
        src={staticFile("base44/narration-video.mp4")}
        endAt={Math.round(NARRATOR_END_S * fps)}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          filter: narratorFilter,
          willChange: "filter",
        }}
      />

      {/*
        Clip 1 (5–9s) — GitHub repo
        Raw langchain repo: the "before" state.
        demo.mp4 t=12s → 16s
      */}
      <Sequence from={5 * fps} durationInFrames={4 * fps} premountFor={fps}>
        <OverlayClip
          src="base44/demo.mp4"
          startFrom={12 * fps}
          durationInFrames={4 * fps}
        />
      </Sequence>

      {/*
        Clip 2 (15–22s) — Generate flow
        Clicking Generate → Fetching → AI build steps → progress bar.
        demo.mp4 t=21s → 28s
      */}
      <Sequence from={15 * fps} durationInFrames={7 * fps} premountFor={fps}>
        <OverlayClip
          src="base44/demo.mp4"
          startFrom={21 * fps}
          durationInFrames={7 * fps}
        />
      </Sequence>

      {/*
        Clip 3 (30–36s) — Landing page reveal
        "LangChain Studio — Build powerful AI workflows effortlessly"
        + "Build this on Base44" CTA visible.
        demo.mp4 t=69s → 75s
      */}
      <Sequence from={30 * fps} durationInFrames={6 * fps} premountFor={fps}>
        <OverlayClip
          src="base44/demo.mp4"
          startFrom={69 * fps}
          durationInFrames={6 * fps}
        />
      </Sequence>

      {/*
        Clip 4 (38–41s) — Star + Base44 button zoom
        2× slow push-in into the top nav bar where "Star the repo" (⭐) and
        "Build on Base44" (orange) buttons are both clearly visible.
        demo.mp4 t=73s → 76s
      */}
      <Sequence from={38 * fps} durationInFrames={3 * fps} premountFor={fps}>
        <OverlayClip
          src="base44/demo.mp4"
          startFrom={73 * fps}
          durationInFrames={3 * fps}
          zoomIntoTop
        />
      </Sequence>
    </AbsoluteFill>
  );
};
