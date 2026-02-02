import { AbsoluteFill, Sequence, staticFile, useVideoConfig, Img, spring, useCurrentFrame, interpolate } from 'remotion';
import { DeviReelProps, Manifest, Scene } from './types';

export const DeviReel: React.FC<DeviReelProps> = ({ manifest }) => {
  if (!manifest) {
    return (
      <AbsoluteFill style={{ backgroundColor: '#000', justifyContent: 'center', alignItems: 'center' }}>
        <div style={{ color: '#fff', fontSize: 32, padding: 40, textAlign: 'center' }}>
          ❌ Error: No manifest data provided
        </div>
      </AbsoluteFill>
    );
  }

  // Calculate scene start frames
  let currentFrame = 0;
  const scenesWithTiming = manifest.scenes.map((scene) => {
    const startFrame = currentFrame;
    currentFrame += scene.durationFrames;
    return { ...scene, startFrame };
  });

  return (
    <AbsoluteFill style={{ backgroundColor: '#000' }}>
      {scenesWithTiming.map((scene, index) => (
        <Sequence
          key={index}
          from={scene.startFrame}
          durationInFrames={scene.durationFrames}
        >
          <SceneWithText
            scene={scene}
            style={manifest.style}
            isFirst={index === 0}
            isLast={index === scenesWithTiming.length - 1}
          />
        </Sequence>
      ))}
    </AbsoluteFill>
  );
};

// Scene with Ken Burns effect and text overlay
const SceneWithText: React.FC<{
  scene: Scene;
  style?: Manifest['style'];
  isFirst: boolean;
  isLast: boolean;
}> = ({ scene, style, isFirst, isLast }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Ken Burns effect: subtle zoom and pan
  const scale = interpolate(
    frame,
    [0, scene.durationFrames],
    [1.0, 1.15],
    { extrapolateRight: 'clamp' }
  );

  const translateX = interpolate(
    frame,
    [0, scene.durationFrames],
    [0, -50],
    { extrapolateRight: 'clamp' }
  );

  // Text animation
  const textOpacity = spring({
    frame,
    fps,
    config: { damping: 20, stiffness: 100 },
    from: 0,
    to: 1,
    durationInFrames: 20,
  });

  const textScale = spring({
    frame,
    fps,
    config: { damping: 15, stiffness: 120 },
    from: 0.8,
    to: 1,
    durationInFrames: 20,
  });

  // Cross-dissolve transition
  const fadeIn = interpolate(frame, [0, 15], [0, 1], { extrapolateRight: 'clamp' });
  const fadeOut = interpolate(
    frame,
    [scene.durationFrames - 15, scene.durationFrames],
    [1, 0],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );
  const opacity = isFirst ? fadeOut : (isLast ? fadeIn : Math.min(fadeIn, fadeOut));

  const textPosition = scene.textPosition || style?.textPosition || 'bottom';
  const safeMargin = style?.safeMargin || 90;
  const textColor = style?.textColor || '#ffffff';

  // Determine text position
  const textPositionStyle = textPosition === 'top'
    ? { top: `${safeMargin}px` }
    : textPosition === 'center'
    ? { top: '50%', transform: `translateY(-50%) scale(${textScale})` }
    : { bottom: `${safeMargin}px` };

  return (
    <AbsoluteFill style={{ opacity }}>
      {/* Image with Ken Burns effect */}
      <AbsoluteFill style={{ overflow: 'hidden' }}>
        <div
          style={{
            width: '100%',
            height: '100%',
            transform: `scale(${scale}) translateX(${translateX}px)`,
          }}
        >
          <Img
            src={scene.image}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
          />
        </div>
      </AbsoluteFill>

      {/* Text overlay */}
      {scene.text && (
        <AbsoluteFill style={{ justifyContent: textPosition === 'center' ? 'center' : 'flex-start', alignItems: 'center', pointerEvents: 'none' }}>
          <div
            style={{
              ...textPositionStyle,
              ...(textPosition !== 'center' && { transform: `scale(${textScale})` }),
              opacity: textOpacity,
              padding: '20px 40px',
              textAlign: 'center',
              maxWidth: '90%',
            }}
          >
            <h1
              style={{
                fontSize: '56px',
                fontWeight: 'bold',
                color: textColor,
                margin: 0,
                fontFamily: style?.font || 'Inter, sans-serif',
                textShadow: style?.textShadow !== false
                  ? '0 4px 12px rgba(0,0,0,0.8), 0 2px 4px rgba(0,0,0,0.6)'
                  : 'none',
                lineHeight: 1.2,
              }}
            >
              {scene.text}
            </h1>
          </div>
        </AbsoluteFill>
      )}
    </AbsoluteFill>
  );
};
