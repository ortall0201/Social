import React from 'react';
import { AbsoluteFill, Video, staticFile, interpolate, useCurrentFrame, Sequence } from 'remotion';

export type ViralBlendProps = {
  showText?: boolean;
};

export const ViralBlend: React.FC<ViralBlendProps> = ({ showText = true }) => {
  const frame = useCurrentFrame();

  // Video timing (30fps) - shorter clips, smoother transitions
  const clipDuration = 120; // 4 seconds per clip (was 5)
  const transitionDuration = 30; // 1 second smooth crossfade (was 0.5)

  // Skip first 30 frames (1 second) of each video to avoid shaky starts
  const videoStartOffset = 30;

  return (
    <AbsoluteFill style={{ backgroundColor: '#000' }}>
      {/* Video 1: 0-120 frames (0-4 seconds) */}
      <Sequence from={0} durationInFrames={clipDuration}>
        <AbsoluteFill>
          <AbsoluteFill
            style={{
              // Subtle zoom to stabilize and add motion
              transform: `scale(${interpolate(frame, [0, clipDuration], [1.05, 1.15])})`,
              transformOrigin: 'center center',
            }}
          >
            <Video
              src={staticFile('videos/viral-1.mp4')}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
              }}
              startFrom={videoStartOffset}
              endAt={videoStartOffset + clipDuration}
              volume={0.8}
            />
          </AbsoluteFill>
          {/* Fade out at end with longer transition */}
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

      {/* Video 2: 90-210 frames (3-7 seconds) - 1 second overlap */}
      <Sequence from={clipDuration - transitionDuration} durationInFrames={clipDuration}>
        <AbsoluteFill>
          {/* Fade in at start */}
          <AbsoluteFill
            style={{
              opacity: interpolate(
                frame - (clipDuration - transitionDuration),
                [0, transitionDuration],
                [0, 1]
              ),
              // Subtle zoom to stabilize
              transform: `scale(${interpolate(
                frame - (clipDuration - transitionDuration),
                [0, clipDuration],
                [1.05, 1.15]
              )})`,
              transformOrigin: 'center center',
            }}
          >
            <Video
              src={staticFile('videos/viral-2.mp4')}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
              }}
              startFrom={videoStartOffset}
              endAt={videoStartOffset + clipDuration}
              volume={0.8}
            />
          </AbsoluteFill>
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

      {/* Video 3: 180-300 frames (6-10 seconds) - 1 second overlap */}
      <Sequence from={clipDuration * 2 - transitionDuration * 2} durationInFrames={clipDuration}>
        <AbsoluteFill
          style={{
            opacity: interpolate(
              frame - (clipDuration * 2 - transitionDuration * 2),
              [0, transitionDuration],
              [0, 1]
            ),
            // Subtle zoom to stabilize
            transform: `scale(${interpolate(
              frame - (clipDuration * 2 - transitionDuration * 2),
              [0, clipDuration],
              [1.05, 1.15]
            )})`,
            transformOrigin: 'center center',
          }}
        >
          <Video
            src={staticFile('videos/viral-3.mp4')}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
            startFrom={videoStartOffset}
            endAt={videoStartOffset + clipDuration}
            volume={0.8}
          />
        </AbsoluteFill>
      </Sequence>

      {/* Text Overlay (if enabled) */}
      {showText && (
        <>
          {/* Opening text - shorter, cleaner */}
          <Sequence from={0} durationInFrames={45}>
            <AbsoluteFill
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'flex-start',
                paddingTop: 120,
              }}
            >
              <div
                style={{
                  fontSize: 68,
                  fontWeight: 800,
                  color: '#fff',
                  textAlign: 'center',
                  textShadow: '0 6px 30px rgba(0,0,0,0.95)',
                  opacity: interpolate(frame, [0, 12, 33, 45], [0, 1, 1, 0]),
                  transform: `scale(${interpolate(frame, [0, 12], [0.95, 1])})`,
                }}
              >
                3 Satisfying Techniques ✨
              </div>
            </AbsoluteFill>
          </Sequence>

          {/* Technique labels - adjusted for 10 second video */}
          <Sequence from={50} durationInFrames={40}>
            <AbsoluteFill
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'flex-end',
                paddingBottom: 180,
              }}
            >
              <div
                style={{
                  fontSize: 52,
                  fontWeight: 700,
                  color: '#FFD700',
                  textShadow: '0 4px 20px rgba(0,0,0,0.95)',
                  opacity: interpolate(frame - 50, [0, 8, 32, 40], [0, 1, 1, 0]),
                }}
              >
                #1
              </div>
            </AbsoluteFill>
          </Sequence>

          <Sequence from={135} durationInFrames={40}>
            <AbsoluteFill
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'flex-end',
                paddingBottom: 180,
              }}
            >
              <div
                style={{
                  fontSize: 52,
                  fontWeight: 700,
                  color: '#FFD700',
                  textShadow: '0 4px 20px rgba(0,0,0,0.95)',
                  opacity: interpolate(frame - 135, [0, 8, 32, 40], [0, 1, 1, 0]),
                }}
              >
                #2
              </div>
            </AbsoluteFill>
          </Sequence>

          <Sequence from={220} durationInFrames={40}>
            <AbsoluteFill
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'flex-end',
                paddingBottom: 180,
              }}
            >
              <div
                style={{
                  fontSize: 52,
                  fontWeight: 700,
                  color: '#FFD700',
                  textShadow: '0 4px 20px rgba(0,0,0,0.95)',
                  opacity: interpolate(frame - 220, [0, 8, 32, 40], [0, 1, 1, 0]),
                }}
              >
                #3
              </div>
            </AbsoluteFill>
          </Sequence>

          {/* Closing CTA - adjusted for 10 second video */}
          <Sequence from={270} durationInFrames={30}>
            <AbsoluteFill
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <div
                style={{
                  fontSize: 56,
                  fontWeight: 800,
                  color: '#fff',
                  textAlign: 'center',
                  textShadow: '0 4px 30px rgba(0,0,0,0.95)',
                  opacity: interpolate(frame - 270, [0, 8], [0, 1]),
                  marginBottom: 15,
                }}
              >
                Which one? 💄
              </div>
              <div
                style={{
                  fontSize: 44,
                  fontWeight: 600,
                  color: '#FFD700',
                  textShadow: '0 4px 30px rgba(0,0,0,0.95)',
                  opacity: interpolate(frame - 270, [4, 12], [0, 1]),
                }}
              >
                1️⃣ 2️⃣ 3️⃣
              </div>
            </AbsoluteFill>
          </Sequence>

          {/* Bottom branding - always visible */}
          <AbsoluteFill
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'flex-end',
              paddingBottom: 60,
            }}
          >
            <div
              style={{
                fontSize: 28,
                fontWeight: 500,
                color: '#fff',
                textShadow: '0 3px 15px rgba(0,0,0,0.95)',
                opacity: 0.75,
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
