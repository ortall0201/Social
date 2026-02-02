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

// Hot couture viral text overlays for shopping
const viralCaptions = [
  {
    text: "YOUR STYLIST",
    subtext: "curated just for YOU 💎",
    timing: [0, 150], // First 5 seconds
  },
  {
    text: "SHOP THE LOOK",
    subtext: "exclusive links 🛍️",
    timing: [150, 300], // 5-10 seconds
  },
  {
    text: "GET DISCOUNTS",
    subtext: "through my shop 💰",
    timing: [300, 420], // 10-14 seconds
  },
];

// Affiliate CTA overlay
const AffiliateCTA: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Start appearing at 14 seconds (frame 420)
  const startFrame = 420;
  const relativeFrame = frame - startFrame;

  if (frame < startFrame) return null;

  // Spring entrance
  const entrance = spring({
    frame: relativeFrame,
    fps,
    config: {
      damping: 12,
      mass: 0.8,
    },
  });

  const scale = interpolate(entrance, [0, 1], [0.5, 1]);
  const opacity = entrance;

  // Pulsing effect
  const pulse = interpolate(
    Math.sin((relativeFrame / 20) * Math.PI),
    [-1, 1],
    [0.96, 1.04]
  );

  return (
    <AbsoluteFill
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 20,
        background: 'linear-gradient(135deg, rgba(0,0,0,0.85) 0%, rgba(20,20,20,0.9) 100%)',
        backdropFilter: 'blur(15px)',
      }}
    >
      <div
        style={{
          opacity,
          transform: `scale(${scale * pulse})`,
          textAlign: 'center',
          padding: '60px 40px',
          maxWidth: 900,
        }}
      >
        {/* Main headline */}
        <div
          style={{
            fontFamily: 'Inter, Arial Black, sans-serif',
            fontSize: 100,
            fontWeight: 900,
            color: '#ffffff',
            textTransform: 'uppercase',
            letterSpacing: '6px',
            textShadow: `
              0 0 30px rgba(255,255,255,0.5),
              0 0 60px rgba(255,100,255,0.3),
              4px 4px 15px rgba(0,0,0,0.9)
            `,
            WebkitTextStroke: '3px rgba(255,100,255,0.4)',
            marginBottom: 40,
            lineHeight: 1.1,
          }}
        >
          SHOP
          <br />
          CURATED LOOKS
        </div>

        {/* Subheadline */}
        <div
          style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: 52,
            fontWeight: 700,
            color: '#ffffff',
            textShadow: '0 0 20px rgba(0,0,0,0.9)',
            marginBottom: 50,
            letterSpacing: '2px',
          }}
        >
          Exclusive Discounts • Top K-Style Brands
        </div>

        {/* Website URL - Large frosted glass card */}
        <div
          style={{
            display: 'inline-block',
            padding: '30px 60px',
            background: 'linear-gradient(135deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.08) 100%)',
            backdropFilter: 'blur(20px)',
            borderRadius: 25,
            border: '3px solid rgba(255,255,255,0.3)',
            boxShadow: '0 10px 40px rgba(0,0,0,0.5)',
            marginBottom: 45,
          }}
        >
          <div
            style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: 68,
              fontWeight: 800,
              color: '#ffffff',
              letterSpacing: '3px',
              textShadow: '0 2px 20px rgba(0,0,0,0.8)',
            }}
          >
            devisignals.com
          </div>
        </div>

        {/* Benefits */}
        <div
          style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: 40,
            fontWeight: 600,
            color: '#ffffff',
            textShadow: '0 2px 15px rgba(0,0,0,0.9)',
            letterSpacing: '1px',
            lineHeight: 1.6,
          }}
        >
          ✨ Handpicked Fashion from Top Brands
          <br />
          💰 Exclusive Affiliate Discounts
          <br />
          🛍️ Direct Links to Shop
        </div>
      </div>
    </AbsoluteFill>
  );
};

// Animated text overlay for scenes
const ViralTextOverlay: React.FC<{
  text: string;
  subtext: string;
  startFrame: number;
  endFrame: number;
}> = ({ text, subtext, startFrame, endFrame }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const relativeFrame = frame - startFrame;
  const duration = endFrame - startFrame;

  // Spring animation
  const entrance = spring({
    frame: relativeFrame,
    fps,
    config: {
      damping: 14,
      mass: 0.6,
    },
  });

  // Exit fade
  const exit = interpolate(
    relativeFrame,
    [duration - 25, duration],
    [1, 0],
    {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
      easing: Easing.out(Easing.ease),
    }
  );

  const opacity = Math.min(entrance, exit);
  const scale = interpolate(entrance, [0, 1], [0.7, 1]);

  // Pulsing
  const pulse = interpolate(
    Math.sin((relativeFrame / 18) * Math.PI),
    [-1, 1],
    [0.97, 1.03]
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
          padding: '50px',
        }}
      >
        {/* Main text */}
        <div
          style={{
            fontFamily: 'Inter, Arial Black, sans-serif',
            fontSize: 140,
            fontWeight: 900,
            color: '#ffffff',
            textTransform: 'uppercase',
            letterSpacing: '10px',
            textShadow: `
              0 0 25px rgba(0,0,0,0.9),
              0 0 50px rgba(255,255,255,0.4),
              5px 5px 15px rgba(0,0,0,1)
            `,
            WebkitTextStroke: '3px rgba(0,0,0,0.6)',
            marginBottom: 25,
            lineHeight: 1.1,
          }}
        >
          {text}
        </div>

        {/* Subtext */}
        <div
          style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: 56,
            fontWeight: 700,
            color: '#ffffff',
            fontStyle: 'italic',
            textShadow: `
              0 0 20px rgba(0,0,0,1),
              3px 3px 10px rgba(0,0,0,1)
            `,
            letterSpacing: '3px',
          }}
        >
          {subtext}
        </div>
      </div>
    </AbsoluteFill>
  );
};

// Flash transition
const FlashTransition: React.FC<{ atFrame: number; duration?: number }> = ({
  atFrame,
  duration = 10,
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
        zIndex: 25,
      }}
    />
  );
};

// Glitch effect
const GlitchOverlay: React.FC<{ intensity?: number }> = ({ intensity = 0.25 }) => {
  const frame = useCurrentFrame();

  // Random glitch moments
  const shouldGlitch = frame % 85 === 0 || frame % 93 === 0;

  if (!shouldGlitch) return null;

  const offset = Math.random() * 25 - 12;

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
            rgba(255,0,255,0.25) 0%,
            transparent 50%,
            rgba(0,255,255,0.25) 100%
          )`,
        }}
      />
    </AbsoluteFill>
  );
};

// Main composition
export const SunglassesAffiliateReel: React.FC = () => {
  const { fps } = useVideoConfig();

  // Video clips from GitHub
  const videos = [
    {
      url: 'https://github.com/ortall0201/n8n/raw/master/devi-videos/videos/reel-YYYY01Jan 22, 2026071348.mp4',
      start: 0,
      duration: 150, // 5 seconds
    },
    {
      url: 'https://github.com/ortall0201/n8n/raw/master/devi-videos/videos/reel-YYYY01Jan 22, 2026063139.mp4',
      start: 150,
      duration: 150, // 5 seconds
    },
    {
      url: 'https://github.com/ortall0201/n8n/raw/master/devi-videos/videos/reel-YYYY01Jan 19, 2026175504.mp4',
      start: 300,
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
            volume={0.7}
          />

          {/* Vignette for drama */}
          <AbsoluteFill
            style={{
              background: 'radial-gradient(circle, transparent 35%, rgba(0,0,0,0.7) 100%)',
              pointerEvents: 'none',
            }}
          />

          {/* Glitch effect */}
          <GlitchOverlay intensity={0.2} />
        </Sequence>
      ))}

      {/* Flash transitions */}
      <FlashTransition atFrame={148} duration={8} />
      <FlashTransition atFrame={298} duration={8} />

      {/* Viral text overlays for first 14 seconds */}
      {viralCaptions.map((caption, index) => (
        <ViralTextOverlay
          key={index}
          text={caption.text}
          subtext={caption.subtext}
          startFrame={caption.timing[0]}
          endFrame={caption.timing[1]}
        />
      ))}

      {/* Affiliate CTA screen (last 6 seconds) */}
      <AffiliateCTA />

      {/* Persistent bottom banner (first 14 seconds only) */}
      <Sequence from={0} durationInFrames={420}>
        <AbsoluteFill
          style={{
            justifyContent: 'flex-end',
            alignItems: 'center',
            paddingBottom: 110,
            zIndex: 5,
          }}
        >
          <div
            style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: 32,
              fontWeight: 800,
              color: '#ffffff',
              textShadow: '0 0 20px rgba(0,0,0,1)',
              letterSpacing: '2px',
              padding: '15px 40px',
              background: 'rgba(0,0,0,0.5)',
              backdropFilter: 'blur(12px)',
              borderRadius: 60,
              border: '3px solid rgba(255,255,255,0.4)',
            }}
          >
            devisignals.com • Shop Now
          </div>
        </AbsoluteFill>
      </Sequence>
    </AbsoluteFill>
  );
};
