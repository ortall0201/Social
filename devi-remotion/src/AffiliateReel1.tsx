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

// REEL 1: "I drive sales" - Brand Hook
// Length: 10 seconds (300 frames @ 30fps)
// Structure: Hook (0-1s) → 3 Fast Looks (1-8s) → CTA (8-10s)

interface TextOverlayProps {
  text: string;
  startFrame: number;
  endFrame: number;
  size?: number;
  position?: 'top' | 'center' | 'bottom';
}

const FastTextOverlay: React.FC<TextOverlayProps> = ({
  text,
  startFrame,
  endFrame,
  size = 72,
  position = 'center',
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const relativeFrame = frame - startFrame;

  if (frame < startFrame || frame >= endFrame) return null;

  // Fast snap-in animation (0.15s)
  const entrance = spring({
    frame: relativeFrame,
    fps,
    config: {
      damping: 20,
      mass: 0.3,
    },
  });

  const scale = interpolate(entrance, [0, 1], [0.85, 1]);
  const opacity = interpolate(entrance, [0, 1], [0, 1]);

  const verticalPos = position === 'top' ? '25%' : position === 'bottom' ? '75%' : '50%';

  return (
    <AbsoluteFill
      style={{
        justifyContent: position === 'center' ? 'center' : 'flex-start',
        alignItems: 'center',
        paddingTop: position === 'top' ? '20%' : 0,
        paddingBottom: position === 'bottom' ? '15%' : 0,
        zIndex: 10,
      }}
    >
      <div
        style={{
          opacity,
          transform: `scale(${scale})`,
          fontFamily: 'Inter, Arial Black, sans-serif',
          fontSize: size,
          fontWeight: 900,
          color: '#ffffff',
          textAlign: 'center',
          textTransform: 'uppercase',
          letterSpacing: '2px',
          textShadow: `
            0 0 30px rgba(0,0,0,1),
            0 0 60px rgba(0,0,0,0.8),
            4px 4px 20px rgba(0,0,0,1)
          `,
          WebkitTextStroke: '2px rgba(0,0,0,0.8)',
          padding: '0 60px',
          lineHeight: 1.2,
          maxWidth: '90%',
        }}
      >
        {text}
      </div>
    </AbsoluteFill>
  );
};

// Micro text overlay (bottom)
const MicroText: React.FC<{ text: string; startFrame: number }> = ({ text, startFrame }) => {
  const frame = useCurrentFrame();
  if (frame < startFrame) return null;

  return (
    <AbsoluteFill
      style={{
        justifyContent: 'flex-end',
        alignItems: 'center',
        paddingBottom: 80,
        zIndex: 5,
      }}
    >
      <div
        style={{
          fontFamily: 'Inter, sans-serif',
          fontSize: 20,
          fontWeight: 600,
          color: '#ffffff',
          textShadow: '0 2px 10px rgba(0,0,0,1)',
          padding: '8px 20px',
          background: 'rgba(0,0,0,0.6)',
          borderRadius: 20,
        }}
      >
        {text}
      </div>
    </AbsoluteFill>
  );
};

// Zoom punch effect
const ZoomPunchVideo: React.FC<{
  src: string;
  startFrame: number;
  duration: number;
  zoomAmount?: number;
}> = ({ src, startFrame, duration, zoomAmount = 1.08 }) => {
  const frame = useCurrentFrame();
  const relativeFrame = frame - startFrame;

  // Zoom in over duration
  const zoom = interpolate(
    relativeFrame,
    [0, duration],
    [1, zoomAmount],
    {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    }
  );

  return (
    <AbsoluteFill>
      <div
        style={{
          width: '100%',
          height: '100%',
          transform: `scale(${zoom})`,
        }}
      >
        <OffthreadVideo
          src={src}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
          volume={0}
        />
      </div>
    </AbsoluteFill>
  );
};

export const AffiliateReel1: React.FC<{ showText?: boolean }> = ({ showText = true }) => {
  const { fps } = useVideoConfig();

  // Video clips (6 total, using best 4)
  const clips = [
    'https://github.com/ortall0201/n8n/raw/master/devi-videos/videos/reel-YYYY01Jan 22, 2026071348.mp4',
    'https://github.com/ortall0201/n8n/raw/master/devi-videos/videos/reel-YYYY01Jan 22, 2026063139.mp4',
    'https://github.com/ortall0201/n8n/raw/master/devi-videos/videos/reel-YYYY01Jan 19, 2026175504.mp4',
    'https://github.com/ortall0201/n8n/raw/master/devi-videos/videos/reel-YYYY01Jan 19, 2026155521.mp4',
  ];

  return (
    <AbsoluteFill style={{ backgroundColor: '#000000' }}>
      {/* SECTION 1: Hook (0-1s = 0-30 frames) */}
      <Sequence from={0} durationInFrames={30}>
        <ZoomPunchVideo src={clips[0]} startFrame={0} duration={30} zoomAmount={1.05} />
        {showText && (
          <>
            <FastTextOverlay text="BRANDS:" startFrame={0} endFrame={15} size={80} position="top" />
            <FastTextOverlay text="Want affiliates who" startFrame={15} endFrame={30} size={60} position="center" />
          </>
        )}
      </Sequence>

      {/* SECTION 2: Watch this (1-3s = 30-90 frames) */}
      <Sequence from={30} durationInFrames={60}>
        <ZoomPunchVideo src={clips[1]} startFrame={30} duration={60} zoomAmount={1.06} />
        {showText && (
          <>
            <FastTextOverlay text="actually SELL?" startFrame={30} endFrame={45} size={66} position="top" />
            <FastTextOverlay text="Watch this." startFrame={45} endFrame={90} size={80} position="center" />
          </>
        )}
      </Sequence>

      {/* SECTION 3: Fast Look 1 (3-5s = 90-150 frames) */}
      <Sequence from={90} durationInFrames={60}>
        <ZoomPunchVideo src={clips[2]} startFrame={90} duration={60} zoomAmount={1.07} />
        {showText && (
          <FastTextOverlay text="I post → you get clicks" startFrame={90} endFrame={150} size={58} position="center" />
        )}
      </Sequence>

      {/* SECTION 4: Fast Look 2 (5-7s = 150-210 frames) */}
      <Sequence from={150} durationInFrames={60}>
        <ZoomPunchVideo src={clips[3]} startFrame={150} duration={60} zoomAmount={1.06} />
        {showText && (
          <FastTextOverlay text="You get sales → I get commission" startFrame={150} endFrame={210} size={52} position="center" />
        )}
      </Sequence>

      {/* SECTION 5: Fast Look 3 (7-8.5s = 210-255 frames) */}
      <Sequence from={210} durationInFrames={45}>
        <ZoomPunchVideo src={clips[0]} startFrame={210} duration={45} zoomAmount={1.05} />
        {showText && (
          <FastTextOverlay text="No 'shipping fee' collabs" startFrame={210} endFrame={255} size={56} position="center" />
        )}
      </Sequence>

      {/* SECTION 6: CTA (8.5-10s = 255-300 frames) */}
      <Sequence from={255} durationInFrames={45}>
        <ZoomPunchVideo src={clips[1]} startFrame={255} duration={45} zoomAmount={1.08} />
        {showText && (
          <>
            <FastTextOverlay text="Drop 'COLLAB'" startFrame={255} endFrame={300} size={70} position="center" />
            <FastTextOverlay text="if you do affiliate-only deals" startFrame={270} endFrame={300} size={40} position="bottom" />
          </>
        )}
      </Sequence>

      {/* Micro text disclosure (appears at 8s) */}
      {showText && (
        <MicroText text="Affiliate partnerships only • #ad when applicable" startFrame={240} />
      )}

      {/* Subtle watermark */}
      <AbsoluteFill
        style={{
          justifyContent: 'flex-end',
          alignItems: 'flex-end',
          padding: 30,
          zIndex: 3,
        }}
      >
        <div
          style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: 18,
            fontWeight: 700,
            color: 'rgba(255,255,255,0.6)',
            textShadow: '0 1px 5px rgba(0,0,0,0.8)',
          }}
        >
          DEVI
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
