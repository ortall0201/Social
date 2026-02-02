import React from 'react';
import {
  AbsoluteFill,
  Sequence,
  OffthreadVideo,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
  Easing,
} from 'remotion';

// Viral text overlays with hot couture captions
const viralCaptions = [
  {
    text: "SHEER LUXURY",
    subtext: "when less is MORE ✨",
    timing: [0, 120], // First 4 seconds
  },
  {
    text: "RED CARPET",
    subtext: "elegance redefined 🔥",
    timing: [120, 240], // 4-8 seconds
  },
  {
    text: "CONFIDENCE",
    subtext: "is the best accessory 💎",
    timing: [240, 360], // 8-12 seconds
  },
];

// Text overlay component with viral styling
const ViralTextOverlay: React.FC<{
  text: string;
  subtext: string;
  startFrame: number;
  endFrame: number;
}> = ({ text, subtext, startFrame, endFrame }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Calculate relative frame for this text segment
  const relativeFrame = frame - startFrame;
  const duration = endFrame - startFrame;

  // Spring animation for entrance
  const entrance = spring({
    frame: relativeFrame,
    fps,
    config: {
      damping: 15,
      mass: 0.5,
    },
  });

  // Exit animation
  const exit = interpolate(
    relativeFrame,
    [duration - 20, duration],
    [1, 0],
    {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
      easing: Easing.out(Easing.ease),
    }
  );

  const opacity = Math.min(entrance, exit);
  const scale = interpolate(entrance, [0, 1], [0.8, 1]);

  // Pulsing effect for engagement
  const pulse = interpolate(
    Math.sin((relativeFrame / 15) * Math.PI),
    [-1, 1],
    [0.98, 1.02]
  );

  if (frame < startFrame || frame >= endFrame) return null;

  return (
    <AbsoluteFill
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 10,
      }}
    >
      <div
        style={{
          opacity,
          transform: `scale(${scale * pulse})`,
          textAlign: 'center',
          padding: '40px',
        }}
      >
        {/* Main text */}
        <div
          style={{
            fontFamily: 'Inter, Arial Black, sans-serif',
            fontSize: 120,
            fontWeight: 900,
            color: '#ffffff',
            textTransform: 'uppercase',
            letterSpacing: '8px',
            textShadow: `
              0 0 20px rgba(0,0,0,0.8),
              0 0 40px rgba(255,255,255,0.3),
              4px 4px 10px rgba(0,0,0,0.9)
            `,
            WebkitTextStroke: '2px rgba(0,0,0,0.5)',
            marginBottom: 20,
            lineHeight: 1.2,
          }}
        >
          {text}
        </div>

        {/* Subtext */}
        <div
          style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: 48,
            fontWeight: 600,
            color: '#ffffff',
            fontStyle: 'italic',
            textShadow: `
              0 0 15px rgba(0,0,0,0.9),
              2px 2px 8px rgba(0,0,0,1)
            `,
            letterSpacing: '2px',
          }}
        >
          {subtext}
        </div>
      </div>
    </AbsoluteFill>
  );
};

// Glitch effect overlay for viral aesthetic
const GlitchOverlay: React.FC<{ intensity?: number }> = ({ intensity = 0.3 }) => {
  const frame = useCurrentFrame();

  // Random glitch moments
  const shouldGlitch = frame % 90 === 0 || frame % 97 === 0;

  if (!shouldGlitch) return null;

  const offset = Math.random() * 20 - 10;

  return (
    <AbsoluteFill
      style={{
        mixBlendMode: 'screen',
        opacity: intensity,
        transform: `translateX(${offset}px)`,
      }}
    >
      <div
        style={{
          width: '100%',
          height: '100%',
          background: `linear-gradient(90deg,
            rgba(255,0,255,0.2) 0%,
            transparent 50%,
            rgba(0,255,255,0.2) 100%
          )`,
        }}
      />
    </AbsoluteFill>
  );
};

// Flash transition effect
const FlashTransition: React.FC<{ atFrame: number; duration?: number }> = ({
  atFrame,
  duration = 8,
}) => {
  const frame = useCurrentFrame();
  const relativeFrame = frame - atFrame;

  if (relativeFrame < 0 || relativeFrame > duration) return null;

  const opacity = interpolate(
    relativeFrame,
    [0, duration / 2, duration],
    [0, 1, 0],
    {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    }
  );

  return (
    <AbsoluteFill
      style={{
        backgroundColor: '#ffffff',
        opacity,
        zIndex: 20,
      }}
    />
  );
};

// Main viral reel composition
export const SheerViralReel: React.FC = () => {
  const { fps } = useVideoConfig();

  // Video URLs from GitHub
  const videos = [
    {
      url: 'https://github.com/ortall0201/n8n/raw/master/devi-videos/videos/reel-YYYY01Jan 22, 2026012845.mp4',
      start: 0,
      duration: 120, // 4 seconds
    },
    {
      url: 'https://github.com/ortall0201/n8n/raw/master/devi-videos/videos/reel-YYYY01Jan 22, 2026012003.mp4',
      start: 120,
      duration: 120, // 4 seconds
    },
    {
      url: 'https://github.com/ortall0201/n8n/raw/master/devi-videos/videos/reel-YYYY01Jan 19, 2026155537.mp4',
      start: 240,
      duration: 120, // 4 seconds
    },
  ];

  return (
    <AbsoluteFill style={{ backgroundColor: '#000000' }}>
      {/* Video clips */}
      {videos.map((video, index) => (
        <Sequence
          key={index}
          from={video.start}
          durationInFrames={video.duration}
        >
          <OffthreadVideo
            src={video.url}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
            volume={0.8}
          />

          {/* Vignette effect for drama */}
          <AbsoluteFill
            style={{
              background: 'radial-gradient(circle, transparent 40%, rgba(0,0,0,0.6) 100%)',
              pointerEvents: 'none',
            }}
          />

          {/* Glitch overlay for viral aesthetic */}
          <GlitchOverlay intensity={0.2} />
        </Sequence>
      ))}

      {/* Flash transitions between clips */}
      <FlashTransition atFrame={118} duration={6} />
      <FlashTransition atFrame={238} duration={6} />

      {/* Viral text overlays */}
      {viralCaptions.map((caption, index) => (
        <ViralTextOverlay
          key={index}
          text={caption.text}
          subtext={caption.subtext}
          startFrame={caption.timing[0]}
          endFrame={caption.timing[1]}
        />
      ))}

      {/* Bottom CTA banner (appears throughout) */}
      <AbsoluteFill
        style={{
          justifyContent: 'flex-end',
          alignItems: 'center',
          paddingBottom: 100,
          zIndex: 5,
        }}
      >
        <div
          style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: 28,
            fontWeight: 700,
            color: '#ffffff',
            textShadow: '0 0 15px rgba(0,0,0,0.9)',
            letterSpacing: '1px',
            padding: '12px 30px',
            background: 'rgba(0,0,0,0.4)',
            backdropFilter: 'blur(10px)',
            borderRadius: 50,
            border: '2px solid rgba(255,255,255,0.3)',
          }}
        >
          @devisignals • K-Style Fashion
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
