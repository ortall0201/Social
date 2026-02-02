import React from "react";
import {
  AbsoluteFill,
  OffthreadVideo,
  Sequence,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  Easing,
  staticFile,
} from "remotion";

interface MakeupBlendProps {
  showText?: boolean;
}

export const MakeupBlend: React.FC<MakeupBlendProps> = ({
  showText = false,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Video paths (local references)
  const video1 = staticFile("videos/makeup-1.mp4"); // reel-YYYY01Jan 28, 2026215137
  const video2 = staticFile("videos/makeup-2.mp4"); // reel-YYYY01Jan 28, 2026213614
  const video3 = staticFile("videos/makeup-3.mp4"); // reel-YYYY01Jan 28, 2026202352

  // Each video is 10 seconds at 30fps = 300 frames
  const videoLengthFrames = 10 * fps;

  // Transition duration: 1 second = 30 frames
  const transitionFrames = 1 * fps;

  // Video 1: 0-300 frames
  const video1Start = 0;
  const video1End = videoLengthFrames;

  // Video 2: Start at 270 (30 frames overlap for transition)
  const video2Start = video1End - transitionFrames;
  const video2End = video2Start + videoLengthFrames;

  // Video 3: Start at 540 (30 frames overlap)
  const video3Start = video2End - transitionFrames;
  const video3End = video3Start + videoLengthFrames;

  // Total duration: 870 frames (29 seconds)
  // But we want it to loop, so we can add a final transition back to the beginning

  // Crossfade transitions using opacity
  const getVideo1Opacity = () => {
    if (frame < video2Start) return 1;
    if (frame >= video2Start && frame < video1End) {
      // Fade out during transition
      return interpolate(
        frame,
        [video2Start, video1End],
        [1, 0],
        {
          easing: Easing.inOut(Easing.ease),
        }
      );
    }
    return 0;
  };

  const getVideo2Opacity = () => {
    if (frame < video2Start) return 0;
    if (frame >= video2Start && frame < video1End) {
      // Fade in during transition
      return interpolate(
        frame,
        [video2Start, video1End],
        [0, 1],
        {
          easing: Easing.inOut(Easing.ease),
        }
      );
    }
    if (frame >= video1End && frame < video3Start) return 1;
    if (frame >= video3Start && frame < video2End) {
      // Fade out during transition
      return interpolate(
        frame,
        [video3Start, video2End],
        [1, 0],
        {
          easing: Easing.inOut(Easing.ease),
        }
      );
    }
    return 0;
  };

  const getVideo3Opacity = () => {
    if (frame < video3Start) return 0;
    if (frame >= video3Start && frame < video2End) {
      // Fade in during transition
      return interpolate(
        frame,
        [video3Start, video2End],
        [0, 1],
        {
          easing: Easing.inOut(Easing.ease),
        }
      );
    }
    return 1;
  };

  // Scale effect for smooth zoom during transitions
  const getVideo1Scale = () => {
    if (frame >= video2Start && frame < video1End) {
      return interpolate(
        frame,
        [video2Start, video1End],
        [1, 1.05],
        {
          easing: Easing.inOut(Easing.ease),
        }
      );
    }
    return 1;
  };

  const getVideo2Scale = () => {
    if (frame >= video2Start && frame < video1End) {
      return interpolate(
        frame,
        [video2Start, video1End],
        [1.05, 1],
        {
          easing: Easing.inOut(Easing.ease),
        }
      );
    }
    if (frame >= video3Start && frame < video2End) {
      return interpolate(
        frame,
        [video3Start, video2End],
        [1, 1.05],
        {
          easing: Easing.inOut(Easing.ease),
        }
      );
    }
    return 1;
  };

  const getVideo3Scale = () => {
    if (frame >= video3Start && frame < video2End) {
      return interpolate(
        frame,
        [video3Start, video2End],
        [1.05, 1],
        {
          easing: Easing.inOut(Easing.ease),
        }
      );
    }
    return 1;
  };

  return (
    <AbsoluteFill style={{ backgroundColor: "#000" }}>
      {/* Video 1 */}
      <Sequence from={video1Start} durationInFrames={video1End}>
        <AbsoluteFill
          style={{
            opacity: getVideo1Opacity(),
            transform: `scale(${getVideo1Scale()})`,
          }}
        >
          <OffthreadVideo
            src={video1}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        </AbsoluteFill>
      </Sequence>

      {/* Video 2 */}
      <Sequence from={video2Start} durationInFrames={video2End - video2Start}>
        <AbsoluteFill
          style={{
            opacity: getVideo2Opacity(),
            transform: `scale(${getVideo2Scale()})`,
          }}
        >
          <OffthreadVideo
            src={video2}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        </AbsoluteFill>
      </Sequence>

      {/* Video 3 */}
      <Sequence from={video3Start} durationInFrames={video3End - video3Start}>
        <AbsoluteFill
          style={{
            opacity: getVideo3Opacity(),
            transform: `scale(${getVideo3Scale()})`,
          }}
        >
          <OffthreadVideo
            src={video3}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        </AbsoluteFill>
      </Sequence>

      {/* Optional Text Overlay */}
      {showText && (
        <AbsoluteFill
          style={{
            justifyContent: "flex-end",
            alignItems: "center",
            padding: 80,
            paddingBottom: 120,
          }}
        >
          <div
            style={{
              fontSize: 48,
              fontWeight: "bold",
              color: "white",
              textAlign: "center",
              textShadow: "0 2px 20px rgba(0,0,0,0.8)",
              fontFamily: "Arial, sans-serif",
              opacity: interpolate(frame, [0, 30, video3End - 30, video3End], [0, 1, 1, 0]),
            }}
          >
            Satisfying Makeup Application
          </div>
        </AbsoluteFill>
      )}
    </AbsoluteFill>
  );
};
