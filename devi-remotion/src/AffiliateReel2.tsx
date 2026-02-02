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

// REEL 2: "Sunglasses = instant upgrade" - Value/Trend Hook
// Length: 9 seconds (270 frames @ 30fps)
// Structure: Hook (0-1s) → 3 Styling Rules (1-6s) → CTA (6-9s)

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

export const AffiliateReel2: React.FC<{ showText?: boolean }> = ({ showText = true }) => {
  const clips = [
    'https://github.com/ortall0201/n8n/raw/master/devi-videos/videos/reel-YYYY01Jan 18, 2026230132.mp4',
    'https://github.com/ortall0201/n8n/raw/master/devi-videos/videos/reel-YYYY01Jan 18, 2026225636.mp4',
    'https://github.com/ortall0201/n8n/raw/master/devi-videos/videos/reel-YYYY01Jan 22, 2026063139.mp4',
    'https://github.com/ortall0201/n8n/raw/master/devi-videos/videos/reel-YYYY01Jan 19, 2026175504.mp4',
  ];

  return (
    <AbsoluteFill style={{ backgroundColor: '#000000' }}>
      {/* SECTION 1: Hook (0-1s = 0-30 frames) */}
      <Sequence from={0} durationInFrames={30}>
        <ZoomPunchVideo src={clips[0]} startFrame={0} duration={30} zoomAmount={1.06} />
        {showText && (
          <FastTextOverlay text="This is why sunglasses sell." startFrame={0} endFrame={30} size={62} position="center" />
        )}
      </Sequence>

      {/* SECTION 2: Rule 1 (1-3s = 30-90 frames) */}
      <Sequence from={30} durationInFrames={60}>
        <ZoomPunchVideo src={clips[1]} startFrame={30} duration={60} zoomAmount={1.07} />
        {showText && (
          <>
            <FastTextOverlay text="RULE 1:" startFrame={30} endFrame={45} size={70} position="top" />
            <FastTextOverlay text="Match frame to vibe" startFrame={45} endFrame={90} size={58} position="center" />
          </>
        )}
      </Sequence>

      {/* SECTION 3: Rule 2 (3-5s = 90-150 frames) */}
      <Sequence from={90} durationInFrames={60}>
        <ZoomPunchVideo src={clips[2]} startFrame={90} duration={60} zoomAmount={1.06} />
        {showText && (
          <>
            <FastTextOverlay text="RULE 2:" startFrame={90} endFrame={105} size={70} position="top" />
            <FastTextOverlay text="Gold jewelry = luxury" startFrame={105} endFrame={150} size={58} position="center" />
          </>
        )}
      </Sequence>

      {/* SECTION 4: Rule 3 (5-6.5s = 150-195 frames) */}
      <Sequence from={150} durationInFrames={45}>
        <ZoomPunchVideo src={clips[3]} startFrame={150} duration={45} zoomAmount={1.08} />
        {showText && (
          <>
            <FastTextOverlay text="RULE 3:" startFrame={150} endFrame={165} size={70} position="top" />
            <FastTextOverlay text="One statement piece" startFrame={165} endFrame={195} size={58} position="center" />
          </>
        )}
      </Sequence>

      {/* SECTION 5: CTA (6.5-9s = 195-270 frames) */}
      <Sequence from={195} durationInFrames={75}>
        <ZoomPunchVideo src={clips[0]} startFrame={195} duration={75} zoomAmount={1.09} />
        {showText && (
          <>
            <FastTextOverlay text="Brands:" startFrame={195} endFrame={210} size={76} position="top" />
            <FastTextOverlay text="Send affiliate links" startFrame={210} endFrame={240} size={60} position="center" />
            <FastTextOverlay text="I'll style + convert" startFrame={240} endFrame={270} size={56} position="center" />
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
