import React from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
  Easing,
  staticFile,
} from "remotion";
import { Video } from "@remotion/media";
import { TransitionSeries, linearTiming } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";

interface HotContourEditProps {
  showText?: boolean;
}

export const HotContourEdit: React.FC<HotContourEditProps> = ({
  showText = true,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Hot contour color grading filter
  const hotContourFilter = `
    brightness(1.1)
    contrast(1.3)
    saturate(1.4)
    hue-rotate(-5deg)
    sepia(0.15)
  `;

  // Vignette effect for cinematic look
  const Vignette: React.FC = () => {
    return (
      <AbsoluteFill
        style={{
          background:
            "radial-gradient(circle at center, transparent 40%, rgba(0, 0, 0, 0.4) 100%)",
          pointerEvents: "none",
        }}
      />
    );
  };

  // Scene 1: Car lean clip
  const Scene1: React.FC = () => {
    const sceneFrame = useCurrentFrame();
    const { fps } = useVideoConfig();

    // Entrance animation
    const entrance = spring({
      frame: sceneFrame,
      fps,
      config: { damping: 200 },
      durationInFrames: 20,
    });

    const scale = interpolate(entrance, [0, 1], [1.05, 1]);
    const opacity = interpolate(entrance, [0, 1], [0.7, 1]);

    return (
      <AbsoluteFill
        style={{
          transform: `scale(${scale})`,
          opacity,
        }}
      >
        <Video
          src={staticFile("videos/car-lean.mp4")}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            filter: hotContourFilter,
          }}
          volume={0.7}
        />
        <Vignette />

        {showText && (
          <AbsoluteFill
            style={{
              justifyContent: "flex-end",
              alignItems: "center",
              padding: 60,
            }}
          >
            <div
              style={{
                fontSize: 56,
                fontWeight: 900,
                color: "#FFFFFF",
                textAlign: "center",
                textShadow: "0 4px 20px rgba(0, 0, 0, 0.6)",
                letterSpacing: "-0.02em",
                fontFamily: "Helvetica, Arial, sans-serif",
                opacity: interpolate(
                  sceneFrame,
                  [10, 30],
                  [0, 1],
                  {
                    extrapolateRight: "clamp",
                  }
                ),
                transform: `translateY(${interpolate(
                  sceneFrame,
                  [10, 30],
                  [20, 0],
                  {
                    extrapolateRight: "clamp",
                  }
                )}px)`,
              }}
            >
              Confidence
            </div>
          </AbsoluteFill>
        )}
      </AbsoluteFill>
    );
  };

  // Scene 2: Second clip
  const Scene2: React.FC = () => {
    const sceneFrame = useCurrentFrame();
    const { fps } = useVideoConfig();

    // Smooth entrance
    const entrance = spring({
      frame: sceneFrame,
      fps,
      config: { damping: 200 },
      durationInFrames: 15,
    });

    const scale = interpolate(entrance, [0, 1], [1.03, 1]);

    return (
      <AbsoluteFill
        style={{
          transform: `scale(${scale})`,
        }}
      >
        <Video
          src={staticFile("videos/second-clip.mp4")}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            filter: hotContourFilter,
          }}
          volume={0.7}
        />
        <Vignette />

        {showText && (
          <AbsoluteFill
            style={{
              justifyContent: "flex-end",
              alignItems: "center",
              padding: 60,
            }}
          >
            <div
              style={{
                fontSize: 56,
                fontWeight: 900,
                color: "#FFFFFF",
                textAlign: "center",
                textShadow: "0 4px 20px rgba(0, 0, 0, 0.6)",
                letterSpacing: "-0.02em",
                fontFamily: "Helvetica, Arial, sans-serif",
                opacity: interpolate(
                  sceneFrame,
                  [10, 30],
                  [0, 1],
                  {
                    extrapolateRight: "clamp",
                  }
                ),
                transform: `translateY(${interpolate(
                  sceneFrame,
                  [10, 30],
                  [20, 0],
                  {
                    extrapolateRight: "clamp",
                  }
                )}px)`,
              }}
            >
              Unstoppable
            </div>
          </AbsoluteFill>
        )}
      </AbsoluteFill>
    );
  };

  return (
    <AbsoluteFill style={{ backgroundColor: "#000000" }}>
      <TransitionSeries>
        {/* First clip - Car lean scene */}
        <TransitionSeries.Sequence durationInFrames={240}>
          <Scene1 />
        </TransitionSeries.Sequence>

        {/* Smooth fade transition */}
        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: 20 })}
        />

        {/* Second clip */}
        <TransitionSeries.Sequence durationInFrames={240}>
          <Scene2 />
        </TransitionSeries.Sequence>
      </TransitionSeries>

      {/* Final overlay with light glow effect */}
      <AbsoluteFill
        style={{
          background: `radial-gradient(circle at 50% 50%,
            rgba(255, 120, 60, ${interpolate(frame, [0, 30, 450, 480], [0, 0.05, 0.05, 0], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            })}) 0%,
            transparent 60%)`,
          pointerEvents: "none",
          mixBlendMode: "screen",
        }}
      />
    </AbsoluteFill>
  );
};
