import React from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
  staticFile,
  Easing,
  Img,
} from "remotion";
import { Video } from "@remotion/media";
import { TransitionSeries, linearTiming } from "@remotion/transitions";
import { wipe } from "@remotion/transitions/wipe";
import { fade } from "@remotion/transitions/fade";

// ─── Duration constants (frames @ 30 fps) ─────────────────────────────────────
const INTRO_FRAMES   = 90;    // 3 s   — title card
const BEFORE_FRAMES  = 750;   // 25 s  — 14.mp4 (ugly newsletter, trimmed to 25s)
const AFTER_FRAMES   = 963;   // 32.1s — full 11.mp4 (beautiful swipe newsletter)
const DESIGN_FRAMES  = 750;   // 25 s  — 15.mp4 (design control, trimmed to 25s)
const AGENT_FRAMES   = 210;   // 7 s   — 16.png + 17.png (Claude Code MCP)
const GROWTH_FRAMES  = 1200;  // 40 s  — 13.mp4 (SEO/GEO/AEO, trimmed from 49.8s)
const OUTRO_FRAMES   = 150;   // 5 s   — CTA

const FADE_F = 20;
const WIPE_F = 20;

// 6 transitions: fade, wipe, wipe, wipe, wipe, fade = 120 frames overlap
export const NEWSLETTER_COMMERCIAL_DURATION =
  INTRO_FRAMES + BEFORE_FRAMES + AFTER_FRAMES + DESIGN_FRAMES +
  AGENT_FRAMES + GROWTH_FRAMES + OUTRO_FRAMES
  - FADE_F - WIPE_F - WIPE_F - WIPE_F - WIPE_F - FADE_F;
// 90+750+963+750+210+1200+150 − 120 = 3993 frames ≈ 2m13s

// ─── Zoom helper ───────────────────────────────────────────────────────────────
// Returns 0→1→0 over (ramp + hold + ramp) frames
const zoomProg = (frame: number, start: number, hold: number, ramp = 22) => {
  const inEnd    = start + ramp;
  const outStart = inEnd + hold;
  const outEnd   = outStart + ramp;
  if (frame <= start)    return 0;
  if (frame >= outEnd)   return 0;
  if (frame <= inEnd)    return interpolate(frame, [start,    inEnd   ], [0, 1], { easing: Easing.out(Easing.quad), extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  if (frame <= outStart) return 1;
  return                        interpolate(frame, [outStart, outEnd  ], [1, 0], { easing: Easing.in(Easing.quad),  extrapolateLeft: "clamp", extrapolateRight: "clamp" });
};

// ─── VideoFrame ── blurred fill behind + zoomable crisp video ─────────────────
const VideoFrame: React.FC<{
  src: string;
  scale?: number;
  originX?: number;
  originY?: number;
  colorFilter?: string;
}> = ({ src, scale = 1, originX = 0.5, originY = 0.5, colorFilter = "" }) => (
  <AbsoluteFill style={{ backgroundColor: "#000", overflow: "hidden" }}>

    {/* Blurred background — fills letterbox areas */}
    <Video
      src={src}
      muted
      style={{
        position: "absolute",
        width: "140%", height: "140%",
        top: "-20%", left: "-20%",
        objectFit: "cover",
        filter: "blur(32px) brightness(0.32) saturate(0.5)",
      }}
    />

    {/* Crisp video with zoom */}
    <AbsoluteFill style={{ overflow: "hidden" }}>
      <div style={{
        width: "100%", height: "100%",
        transform: `scale(${scale})`,
        transformOrigin: `${originX * 100}% ${originY * 100}%`,
        filter: colorFilter || undefined,
        willChange: "transform",
      }}>
        <Video
          src={src}
          style={{ width: "100%", height: "100%", objectFit: "contain" }}
        />
      </div>
    </AbsoluteFill>
  </AbsoluteFill>
);

// ─── SceneBadge ── slams in large → shrinks to corner badge ───────────────────
const SceneBadge: React.FC<{
  label: string;
  border: string;
  color: string;
  glow: string;
}> = ({ label, border, color, glow }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const stampProg    = spring({ frame, fps, config: { damping: 8 }, durationInFrames: 18 });
  const stampScale   = interpolate(stampProg, [0, 1], [3.2, 1]);
  const stampOpacity = interpolate(frame, [0, 4, 52, 68], [0, 1, 1, 0], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
  });

  const badgeOpacity = interpolate(frame, [58, 75], [0, 1], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
  });
  const pulse = Math.abs(Math.sin((frame / 14) * Math.PI)) * 0.35 + 0.65;

  return (
    <>
      {stampOpacity > 0.01 && (
        <AbsoluteFill style={{ display: "flex", alignItems: "center", justifyContent: "center", pointerEvents: "none" }}>
          <div style={{
            opacity: stampOpacity,
            transform: `scale(${stampScale}) rotate(-8deg)`,
            border: `7px solid ${border}`,
            color, fontSize: 100, fontWeight: 900,
            fontFamily: "Arial Black, Impact, sans-serif",
            padding: "8px 48px", letterSpacing: 10, textTransform: "uppercase",
            textShadow: `0 0 50px ${glow}`,
            boxShadow: `0 0 60px ${glow}55, inset 0 0 24px ${glow}25`,
            whiteSpace: "nowrap",
          }}>
            {label}
          </div>
        </AbsoluteFill>
      )}

      {/* Persistent corner badge */}
      <div style={{
        position: "absolute", top: 28, right: 36,
        opacity: badgeOpacity, transform: "rotate(-5deg)",
        border: `3px solid ${border}`,
        color, fontSize: 21, fontWeight: 900,
        fontFamily: "Arial Black, Impact, sans-serif",
        padding: "6px 22px", letterSpacing: 6, textTransform: "uppercase",
        textShadow: `0 0 ${16 * pulse}px ${glow}`,
        boxShadow: `0 0 ${22 * pulse}px ${glow}40`,
        backgroundColor: "rgba(0,0,0,0.55)",
        backdropFilter: "blur(8px)",
        borderRadius: 4, whiteSpace: "nowrap", pointerEvents: "none",
      }}>
        {label}
      </div>
    </>
  );
};

// ─── Annotation pill ───────────────────────────────────────────────────────────
const Pill: React.FC<{
  text: string; bg: string; fg: string;
  x: number; y: number;
  showFrom: number; hideAt: number;
}> = ({ text, bg, fg, x, y, showFrom, hideAt }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  if (frame < showFrom - 2 || frame > hideAt + 2) return null;

  const appear = spring({ frame: frame - showFrom, fps, config: { damping: 12 }, durationInFrames: 14 });
  const opacity = interpolate(frame,
    [showFrom, showFrom + 6, hideAt - 8, hideAt],
    [0, 1, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  return (
    <div style={{
      position: "absolute",
      left: `${x * 100}%`, top: `${y * 100}%`,
      transform: `translate(-50%, -50%) scale(${appear})`,
      opacity,
      backgroundColor: bg, color: fg,
      fontSize: 27, fontWeight: 800,
      fontFamily: "Arial, sans-serif",
      padding: "13px 32px", borderRadius: 50,
      whiteSpace: "nowrap",
      boxShadow: `0 6px 36px ${bg}99`,
      zIndex: 20, pointerEvents: "none",
    }}>
      {text}
    </div>
  );
};

// ─── Vignette ──────────────────────────────────────────────────────────────────
const Vignette: React.FC<{ color: string; strength?: number }> = ({ color, strength = 0.28 }) => (
  <AbsoluteFill style={{
    background: `radial-gradient(ellipse at center, transparent 52%, ${color} 100%)`,
    opacity: strength, pointerEvents: "none",
  }} />
);

// ─── Top banner ────────────────────────────────────────────────────────────────
const TopBanner: React.FC<{ label: string; bg: string; shadow: string }> = ({ label, bg, shadow }) => {
  const frame = useCurrentFrame();
  const bannerFade = interpolate(frame, [0, 22], [0, 1], { extrapolateRight: "clamp" });
  const bannerY    = interpolate(frame, [0, 22], [-45, 0], { extrapolateRight: "clamp" });
  return (
    <AbsoluteFill style={{ pointerEvents: "none" }}>
      <div style={{
        position: "absolute", top: 26, left: "50%",
        transform: `translateX(-50%) translateY(${bannerY}px)`,
        opacity: bannerFade,
        backgroundColor: bg, color: "#fff",
        fontSize: 20, fontWeight: 800,
        fontFamily: "Arial, sans-serif",
        padding: "10px 38px", borderRadius: 50,
        letterSpacing: 4, textTransform: "uppercase",
        boxShadow: shadow, whiteSpace: "nowrap",
      }}>
        {label}
      </div>
    </AbsoluteFill>
  );
};

// ─── INTRO ─────────────────────────────────────────────────────────────────────
const IntroScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const t1 = spring({ frame,           fps, config: { damping: 200 } });
  const t2 = spring({ frame: frame - 16, fps, config: { damping: 200 } });
  const t3 = spring({ frame: frame - 30, fps, config: { damping: 200 } });
  const t4 = spring({ frame: frame - 44, fps, config: { damping: 200 } });
  const lineW = interpolate(frame, [8, 50], [0, 520], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill style={{
      backgroundColor: "#070707",
      display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 20,
    }}>
      <AbsoluteFill style={{ background: "radial-gradient(ellipse at 50% 50%, rgba(155,50,200,0.16) 0%, transparent 65%)" }} />

      <div style={{
        opacity: t1,
        transform: `translateY(${interpolate(t1, [0, 1], [55, 0])}px)`,
        color: "#fff", fontSize: 82, fontWeight: 900,
        fontFamily: "Arial Black, sans-serif", letterSpacing: 4, textAlign: "center",
      }}>
        Newsletter Studio
      </div>

      <div style={{ width: lineW, height: 2.5, backgroundColor: "#9B32C8" }} />

      <div style={{
        opacity: Math.max(0, t2),
        transform: `translateY(${interpolate(Math.max(0, t2), [0, 1], [30, 0])}px)`,
        color: "#bbb", fontSize: 26, fontWeight: 400,
        fontFamily: "Arial, sans-serif", letterSpacing: 6, textTransform: "uppercase", textAlign: "center",
      }}>
        The Complete AI Newsletter System
      </div>

      <div style={{
        opacity: Math.max(0, t3),
        color: "#9B32C8", fontSize: 18,
        fontFamily: "Arial, sans-serif", letterSpacing: 3, textAlign: "center",
        marginTop: 6,
      }}>
        newsletter-studio-to-automation.lovable.app
      </div>

      <div style={{
        opacity: Math.max(0, t4),
        color: "#555", fontSize: 15,
        fontFamily: "Arial, sans-serif", letterSpacing: 1.5, textAlign: "center",
      }}>
        Before → After → Design Control → AI Agent → Growth Intelligence
      </div>
    </AbsoluteFill>
  );
};

// ─── BEFORE scene ── 14.mp4 ── ugly newsletter ────────────────────────────────
// 14.mp4: 1512×678 (2.23:1), contained in 1920×1080 → letterboxed ~109px top/bottom
// Newsletter content runs from canvas y=0.101 to y=0.899
// Raw markdown text (top section, ~20% down in newsletter): canvas y≈0.26
// Shop the Trends section (~60% down in newsletter): canvas y≈0.58
const BeforeScene: React.FC = () => {
  const frame = useCurrentFrame();

  const z1 = zoomProg(frame,  80, 100);   // zoom on raw markdown text  (~2.7–7.4s)
  const z2 = zoomProg(frame, 370, 100);   // zoom on shop section        (~12.3–16.3s)

  const activeZoom = z1 > 0 ? { p: z1, ox: 0.5, oy: 0.26 }
                   : z2 > 0 ? { p: z2, ox: 0.5, oy: 0.58 }
                   : null;

  const scale   = activeZoom ? 1 + activeZoom.p * 1.25 : 1;
  const originX = activeZoom?.ox ?? 0.5;
  const originY = activeZoom?.oy ?? 0.5;

  return (
    <AbsoluteFill>
      <VideoFrame
        src={staticFile("videos/newsletter-before.mp4")}
        scale={scale}
        originX={originX}
        originY={originY}
        colorFilter="saturate(0.55) brightness(0.85) contrast(1.08)"
      />
      <Vignette color="rgba(160,0,0,0.9)" strength={0.32} />

      <SceneBadge label="BEFORE" border="#ff2d2d" color="#ff2d2d" glow="rgba(255,45,45,0.85)" />

      <Pill text="⚠️  Raw Markdown Visible"     bg="#c40000" fg="#fff" x={0.5} y={0.14} showFrom={94}  hideAt={175} />
      <Pill text="⚠️  No Design Consistency"    bg="#c40000" fg="#fff" x={0.5} y={0.14} showFrom={384} hideAt={465} />
    </AbsoluteFill>
  );
};

// ─── AFTER scene ── 11.mp4 ── beautiful newsletter ────────────────────────────
// 11.mp4: 1404×624 (2.25:1), letterboxed ~114px top/bottom
// Swipe carousel appears ~8s in: canvas y≈0.54
// Real featured posts ~18s in: canvas y≈0.55
const AfterScene: React.FC = () => {
  const frame = useCurrentFrame();

  const z1 = zoomProg(frame, 218, 130);   // swipe gallery   (~7–12s)
  const z2 = zoomProg(frame, 530, 100);   // real photos     (~18–22s)

  const activeZoom = z1 > 0 ? { p: z1, ox: 0.57, oy: 0.54 }
                   : z2 > 0 ? { p: z2, ox: 0.57, oy: 0.55 }
                   : null;

  const scale   = activeZoom ? 1 + activeZoom.p * 1.3 : 1;
  const originX = activeZoom?.ox ?? 0.5;
  const originY = activeZoom?.oy ?? 0.5;

  return (
    <AbsoluteFill>
      <VideoFrame
        src={staticFile("videos/newsletter-after.mp4")}
        scale={scale}
        originX={originX}
        originY={originY}
        colorFilter="saturate(1.18) brightness(1.05)"
      />
      <Vignette color="rgba(160,120,0,0.8)" strength={0.18} />

      <SceneBadge label="AFTER" border="#FFD700" color="#FFD700" glow="rgba(255,215,0,0.85)" />

      <Pill text="✨  Swipe Gallery"           bg="#FFD700" fg="#000" x={0.5} y={0.12} showFrom={228} hideAt={348} />
      <Pill text="✨  Real Instagram Photos"   bg="#FFD700" fg="#000" x={0.5} y={0.12} showFrom={544} hideAt={630} />
    </AbsoluteFill>
  );
};

// ─── DESIGN scene ── 15.mp4 ── design control interface ──────────────────────
// 15.mp4: 1886×826 (2.28:1), letterboxed ~119px top/bottom
// Vivid violet color picker at video x≈0.60, y≈0.57 → canvas ox≈0.60, oy≈0.56
// Right properties panel: canvas ox≈0.78, oy≈0.50
const DesignScene: React.FC = () => {
  const frame = useCurrentFrame();

  const z1 = zoomProg(frame,  80, 110);   // color picker    (~2.7–7.4s)
  const z2 = zoomProg(frame, 370, 110);   // right panel     (~12.3–16.6s)

  const activeZoom = z1 > 0 ? { p: z1, ox: 0.60, oy: 0.56 }
                   : z2 > 0 ? { p: z2, ox: 0.78, oy: 0.50 }
                   : null;

  const scale   = activeZoom ? 1 + activeZoom.p * 1.4 : 1;
  const originX = activeZoom?.ox ?? 0.5;
  const originY = activeZoom?.oy ?? 0.5;

  return (
    <AbsoluteFill>
      <VideoFrame
        src={staticFile("videos/newsletter-design.mp4")}
        scale={scale}
        originX={originX}
        originY={originY}
      />
      <Vignette color="rgba(0,80,140,0.8)" strength={0.20} />

      <SceneBadge label="DESIGN" border="#00B4FF" color="#00B4FF" glow="rgba(0,180,255,0.85)" />

      <TopBanner
        label="DESIGN CONTROL  •  NEWSLETTER STUDIO"
        bg="rgba(0,100,180,0.90)"
        shadow="0 4px 36px rgba(0,100,180,0.55)"
      />

      <Pill text="🎨  Live Color Picker"        bg="#0064B4" fg="#fff" x={0.5} y={0.88} showFrom={94}  hideAt={187} />
      <Pill text="⚙️  Full Design System"       bg="#6350C8" fg="#fff" x={0.5} y={0.88} showFrom={384} hideAt={477} />
    </AbsoluteFill>
  );
};

// ─── AGENT scene ── 16.png + 17.png ── Claude Code MCP agent ─────────────────
// Slide 1 (16.png): Claude Code connects, discovers 9 MCP tools, runs validation
// Slide 2 (17.png): Agent Memory System — learns brand voice automatically
const SLIDE1_HOLD_END = 115;
const SLIDE2_START    = 100;

const AgentScene: React.FC = () => {
  const frame = useCurrentFrame();

  const slide1Opacity = interpolate(frame,
    [0, 10, SLIDE1_HOLD_END - 10, SLIDE1_HOLD_END],
    [0, 1,  1,                    0               ],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  const slide2Opacity = interpolate(frame,
    [SLIDE2_START, SLIDE2_START + 15, 200, 210],
    [0,            1,                 1,   0  ],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  const bannerFade = interpolate(frame, [0, 22], [0, 1], { extrapolateRight: "clamp" });
  const bannerY    = interpolate(frame, [0, 22], [-45, 0], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill style={{ backgroundColor: "#0d0d14" }}>
      <AbsoluteFill style={{ background: "radial-gradient(ellipse at 50% 50%, rgba(80,50,200,0.22) 0%, transparent 70%)" }} />

      {/* Slide 1 — 16.png — MCP connection */}
      <AbsoluteFill style={{ opacity: slide1Opacity, padding: "60px 120px" }}>
        <Img
          src={staticFile("images/newsletter-agent-16.png")}
          style={{ width: "100%", height: "100%", objectFit: "contain" }}
        />
      </AbsoluteFill>

      {/* Slide 2 — 17.png — Agent Memory System */}
      <AbsoluteFill style={{ opacity: slide2Opacity, padding: "60px 120px" }}>
        <Img
          src={staticFile("images/newsletter-agent-17.png")}
          style={{ width: "100%", height: "100%", objectFit: "contain" }}
        />
      </AbsoluteFill>

      {/* Top banner */}
      <AbsoluteFill style={{ pointerEvents: "none" }}>
        <div style={{
          position: "absolute", top: 26, left: "50%",
          transform: `translateX(-50%) translateY(${bannerY}px)`,
          opacity: bannerFade,
          backgroundColor: "rgba(60,30,160,0.92)",
          color: "#fff",
          fontSize: 20, fontWeight: 800,
          fontFamily: "Arial, sans-serif",
          padding: "10px 38px", borderRadius: 50,
          letterSpacing: 4, textTransform: "uppercase",
          boxShadow: "0 4px 36px rgba(60,30,160,0.55)",
          whiteSpace: "nowrap",
        }}>
          CLAUDE CODE  •  MCP AGENT
        </div>
      </AbsoluteFill>

      <Pill text="🤖  9 MCP Tools Connected"     bg="#3C1EA0" fg="#fff" x={0.5} y={0.92} showFrom={10}  hideAt={95} />
      <Pill text="🧠  Agent Memory System"        bg="#FF6B00" fg="#fff" x={0.5} y={0.92} showFrom={115} hideAt={200} />
    </AbsoluteFill>
  );
};

// ─── GROWTH scene ── 13.mp4 ── SEO / GEO / AEO ───────────────────────────────
// 13.mp4: 1876×822 (2.28:1), letterboxed ~120px top/bottom
// Left panel (GEO metrics): canvas ox≈0.25, oy≈0.52  (~14–18s)
// Subject line scores: canvas ox≈0.25, oy≈0.50        (~27–32s)
const GrowthScene: React.FC = () => {
  const frame = useCurrentFrame();

  const z1 = zoomProg(frame, 438, 110);   // GEO panel       (~14.6–18.4s)
  const z2 = zoomProg(frame, 825, 130);   // subject lines   (~27.5–32.0s)

  const activeZoom = z1 > 0 ? { p: z1, ox: 0.25, oy: 0.52 }
                   : z2 > 0 ? { p: z2, ox: 0.25, oy: 0.50 }
                   : null;

  const scale   = activeZoom ? 1 + activeZoom.p * 1.5 : 1;
  const originX = activeZoom?.ox ?? 0.5;
  const originY = activeZoom?.oy ?? 0.5;

  return (
    <AbsoluteFill>
      <VideoFrame
        src={staticFile("videos/newsletter-growth.mp4")}
        scale={scale}
        originX={originX}
        originY={originY}
      />
      <Vignette color="rgba(80,0,140,0.9)" strength={0.22} />

      <TopBanner
        label="GROWTH INTELLIGENCE  •  SEO / GEO / AEO"
        bg="rgba(130,30,190,0.92)"
        shadow="0 4px 36px rgba(130,30,190,0.55)"
      />

      <Pill text="GEO  Generative Engine Optimization"  bg="#7B22C8" fg="#fff" x={0.5} y={0.88} showFrom={452} hideAt={545} />
      <Pill text="AI-Ranked Subject Lines  9/10 → 7/10" bg="#FF6B00" fg="#fff" x={0.5} y={0.88} showFrom={840} hideAt={955} />
    </AbsoluteFill>
  );
};

// ─── OUTRO ─────────────────────────────────────────────────────────────────────
const OutroScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const t1 = spring({ frame,           fps, config: { damping: 200 } });
  const t2 = spring({ frame: frame - 14, fps, config: { damping: 200 } });
  const t3 = spring({ frame: frame - 26, fps, config: { damping: 200 } });
  const t4 = spring({ frame: frame - 38, fps, config: { damping: 200 } });
  const t5 = spring({ frame: frame - 50, fps, config: { damping: 200 } });
  const t6 = spring({ frame: frame - 64, fps, config: { damping: 200 } });

  const row = (prog: number, children: React.ReactNode) => (
    <div style={{
      opacity: Math.max(0, prog),
      transform: `translateY(${interpolate(Math.max(0, prog), [0, 1], [35, 0])}px)`,
      fontFamily: "Arial, sans-serif", textAlign: "center",
    }}>
      {children}
    </div>
  );

  return (
    <AbsoluteFill style={{
      backgroundColor: "#070707",
      display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 22,
    }}>
      <AbsoluteFill style={{ background: "radial-gradient(ellipse at 50% 50%, rgba(155,50,200,0.18) 0%, transparent 65%)" }} />

      {row(t1,
        <span style={{ color: "#fff", fontSize: 78, fontWeight: 900, fontFamily: "Arial Black, sans-serif", letterSpacing: 4 }}>
          Newsletter Studio
        </span>
      )}

      {row(t2,
        <span style={{ color: "#FFD700", fontWeight: 700, letterSpacing: 3, fontSize: 24 }}>
          AI-Powered  •  Beautiful  •  Autonomous
        </span>
      )}

      {row(t3,
        <span style={{ color: "#9B32C8", letterSpacing: 2, fontSize: 19 }}>
          newsletter-studio-to-automation.lovable.app
        </span>
      )}

      {row(t4,
        <div style={{ display: "flex", gap: 36, justifyContent: "center" }}>
          {["✓ Before & After", "✓ Design Control", "✓ Claude Code MCP", "✓ SEO / GEO / AEO"].map(item => (
            <span key={item} style={{ color: "#777", fontSize: 16, letterSpacing: 1 }}>{item}</span>
          ))}
        </div>
      )}

      {row(t5,
        <div style={{
          backgroundColor: "#9B32C8", color: "#fff",
          padding: "18px 64px", borderRadius: 50,
          fontSize: 23, fontWeight: 800, letterSpacing: 3, textTransform: "uppercase",
          boxShadow: "0 6px 40px rgba(155,50,200,0.55)",
          display: "inline-block",
        }}>
          Try Newsletter Studio →
        </div>
      )}

      {row(t6,
        <span style={{ color: "#444", fontSize: 15, letterSpacing: 2 }}>
          Automate your newsletter. Impress your readers.
        </span>
      )}
    </AbsoluteFill>
  );
};

// ─── Root composition ──────────────────────────────────────────────────────────
export const NewsletterCommercial: React.FC = () => (
  <TransitionSeries>
    <TransitionSeries.Sequence durationInFrames={INTRO_FRAMES}>
      <IntroScene />
    </TransitionSeries.Sequence>

    <TransitionSeries.Transition
      presentation={fade()}
      timing={linearTiming({ durationInFrames: FADE_F })}
    />

    <TransitionSeries.Sequence durationInFrames={BEFORE_FRAMES}>
      <BeforeScene />
    </TransitionSeries.Sequence>

    <TransitionSeries.Transition
      presentation={wipe({ direction: "from-left" })}
      timing={linearTiming({ durationInFrames: WIPE_F })}
    />

    <TransitionSeries.Sequence durationInFrames={AFTER_FRAMES}>
      <AfterScene />
    </TransitionSeries.Sequence>

    <TransitionSeries.Transition
      presentation={wipe({ direction: "from-left" })}
      timing={linearTiming({ durationInFrames: WIPE_F })}
    />

    <TransitionSeries.Sequence durationInFrames={DESIGN_FRAMES}>
      <DesignScene />
    </TransitionSeries.Sequence>

    <TransitionSeries.Transition
      presentation={wipe({ direction: "from-left" })}
      timing={linearTiming({ durationInFrames: WIPE_F })}
    />

    <TransitionSeries.Sequence durationInFrames={AGENT_FRAMES}>
      <AgentScene />
    </TransitionSeries.Sequence>

    <TransitionSeries.Transition
      presentation={wipe({ direction: "from-left" })}
      timing={linearTiming({ durationInFrames: WIPE_F })}
    />

    <TransitionSeries.Sequence durationInFrames={GROWTH_FRAMES}>
      <GrowthScene />
    </TransitionSeries.Sequence>

    <TransitionSeries.Transition
      presentation={fade()}
      timing={linearTiming({ durationInFrames: FADE_F })}
    />

    <TransitionSeries.Sequence durationInFrames={OUTRO_FRAMES}>
      <OutroScene />
    </TransitionSeries.Sequence>
  </TransitionSeries>
);
