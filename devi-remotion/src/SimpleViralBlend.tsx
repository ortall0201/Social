import React from 'react';
import { AbsoluteFill, Video, staticFile, interpolate, useCurrentFrame, Sequence } from 'remotion';

export type SimpleViralBlendProps = {
  showText?: boolean;
};

export const SimpleViralBlend: React.FC<SimpleViralBlendProps> = ({ showText = true }) => {
  const frame = useCurrentFrame();

  // Each video is ~10 seconds (240 frames at 24fps)
  const clipDuration = 240; // Full 10 seconds per clip at 24fps
  const transitionDuration = 48; // 2 second crossfade at 24fps

  return (
    <AbsoluteFill style={{ backgroundColor: '#000' }}>
      {/* Video 1: Full duration */}
      <Sequence from={0} durationInFrames={clipDuration}>
        <AbsoluteFill>
          <Video
            src={staticFile('videos/viral-1.mp4')}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
            volume={0.5}
          />
          {/* Fade out at end */}
          <AbsoluteFill
            style={{
              opacity: interpolate(
                frame,
                [clipDuration - transitionDuration, clipDuration],
                [0, 1]
              ),
              backgroundColor: '#000',
            }}
          />
        </AbsoluteFill>
      </Sequence>

      {/* Video 2: Overlaps with Video 1 by transition duration */}
      <Sequence from={clipDuration - transitionDuration} durationInFrames={clipDuration}>
        <AbsoluteFill
          style={{
            opacity: interpolate(
              frame - (clipDuration - transitionDuration),
              [0, transitionDuration],
              [0, 1]
            ),
          }}
        >
          <Video
            src={staticFile('videos/viral-2.mp4')}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
            volume={0.5}
          />
          {/* Fade out at end */}
          <AbsoluteFill
            style={{
              opacity: interpolate(
                frame - (clipDuration - transitionDuration),
                [clipDuration - transitionDuration, clipDuration],
                [0, 1]
              ),
              backgroundColor: '#000',
            }}
          />
        </AbsoluteFill>
      </Sequence>

      {/* Video 3: Overlaps with Video 2 */}
      <Sequence from={(clipDuration - transitionDuration) * 2} durationInFrames={clipDuration}>
        <AbsoluteFill
          style={{
            opacity: interpolate(
              frame - (clipDuration - transitionDuration) * 2,
              [0, transitionDuration],
              [0, 1]
            ),
          }}
        >
          <Video
            src={staticFile('videos/viral-3.mp4')}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
            volume={0.5}
          />
        </AbsoluteFill>
      </Sequence>

      {/* Simple text overlays */}
      {showText && (
        <>
          {/* Opening text */}
          <Sequence from={15} durationInFrames={60}>
            <AbsoluteFill
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'flex-start',
                paddingTop: 150,
              }}
            >
              <div
                style={{
                  fontSize: 64,
                  fontWeight: 800,
                  color: '#fff',
                  textAlign: 'center',
                  textShadow: '0 4px 20px rgba(0,0,0,0.9)',
                  opacity: interpolate(frame - 15, [0, 20, 40, 60], [0, 1, 1, 0]),
                }}
              >
                Satisfying Blend ✨
              </div>
            </AbsoluteFill>
          </Sequence>

          {/* Bottom branding - always visible */}
          <AbsoluteFill
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'flex-end',
              paddingBottom: 80,
            }}
          >
            <div
              style={{
                fontSize: 32,
                fontWeight: 500,
                color: '#fff',
                textShadow: '0 3px 15px rgba(0,0,0,0.9)',
                opacity: 0.7,
              }}
            >
              Created by Devi AI
            </div>
          </AbsoluteFill>
        </>
      )}
    </AbsoluteFill>
  );
};
