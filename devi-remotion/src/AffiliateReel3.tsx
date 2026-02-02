import React from 'react';
import {
  AbsoluteFill,
  Sequence,
  OffthreadVideo,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from 'remotion';

// REEL 3: "Proof vibe" - Confident without fake claims
// Length: 10 seconds (300 frames @ 30fps)
// Structure: Hook with confident walk → Proof statements → CTA

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

const ZoomPunchVideo: React.FC<{
  src: string;
  startFrame: number;
  duration: number;
  zoomAmount?: number;
}> = ({ src, startFrame, duration, zoomAmount = 1.08 }) => {
  const frame = useCurrentFrame();
  const relativeFrame = frame - startFrame;

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

export const AffiliateReel3: React.FC<{ showText?: boolean }> = ({ showText = true }) => {
  const clips = [
    'https://github.com/ortall0201/n8n/raw/master/devi-videos/videos/reel-YYYY01Jan 19, 2026155521.mp4',
    'https://github.com/ortall0201/n8n/raw/master/devi-videos/videos/reel-YYYY01Jan 22, 2026071348.mp4',
    'https://github.com/ortall0201/n8n/raw/master/devi-videos/videos/reel-YYYY01Jan 22, 2026063139.mp4',
    'https://github.com/ortall0201/n8n/raw/master/devi-videos/videos/reel-YYYY01Jan 18, 2026230132.mp4',
  ];

  return (
    <AbsoluteFill style={{ backgroundColor: '#000000' }}>
      {/* SECTION 1: Hook (0-2s = 0-60 frames) */}
      <Sequence from={0} durationInFrames={60}>
        <ZoomPunchVideo src={clips[0]} startFrame={0} duration={60} zoomAmount={1.06} />
        {showText && (
          <FastTextOverlay text="If your product is good..." startFrame={0} endFrame={60} size={64} position="center" />
        )}
      </Sequence>

      {/* SECTION 2: Irresistible claim (2-5s = 60-150 frames) */}
      <Sequence from={60} durationInFrames={90}>
        <ZoomPunchVideo src={clips[1]} startFrame={60} duration={90} zoomAmount={1.07} />
        {showText && (
          <FastTextOverlay text="I can make it look irresistible." startFrame={60} endFrame={150} size={58} position="center" />
        )}
      </Sequence>

      {/* SECTION 3: Affiliate only (5-7s = 150-210 frames) */}
      <Sequence from={150} durationInFrames={60}>
        <ZoomPunchVideo src={clips[2]} startFrame={150} duration={60} zoomAmount={1.08} />
        {showText && (
          <>
            <FastTextOverlay text="Affiliate only." startFrame={150} endFrame={180} size={70} position="top" />
            <FastTextOverlay text="Commission-based." startFrame={180} endFrame={210} size={60} position="center" />
          </>
        )}
      </Sequence>

      {/* SECTION 4: CTA (7-10s = 210-300 frames) */}
      <Sequence from={210} durationInFrames={90}>
        <ZoomPunchVideo src={clips[3]} startFrame={210} duration={90} zoomAmount={1.09} />
        {showText && (
          <>
            <FastTextOverlay text="DM 'DEVI'" startFrame={210} endFrame={240} size={80} position="center" />
            <FastTextOverlay text="for a sample reel" startFrame={240} endFrame={300} size={52} position="bottom" />
          </>
        )}
      </Sequence>

      {/* Watermark */}
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
