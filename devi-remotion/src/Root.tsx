import React from "react";
import { Composition, Still, Folder } from "remotion";
import { DeviReel } from "./DeviReel";
import { DeviReelProps, Manifest } from "./types";
import { SheerViralReel } from "./SheerViralReel";
import { SunglassesAffiliateReel } from "./SunglassesAffiliateReel";
import { AffiliateReel1 } from "./AffiliateReel1";
import { AffiliateReel2 } from "./AffiliateReel2";
import { AffiliateReel3 } from "./AffiliateReel3";
import { AffiliateViralCombo } from "./AffiliateViralCombo";
import { DeviBreakingReality } from "./DeviBreakingReality";
import { DeviTrueStory } from "./DeviTrueStory";
import { MakeupInfluencer } from "./MakeupInfluencer";
import { MakeupBlend } from "./MakeupBlend";
import { MindvalleyCarousel } from "./MindvalleyCarousel";
import { ViralBlend } from "./ViralBlend";
import { SimpleViralBlend } from "./SimpleViralBlend";
import { SatisfyingBeautyBlend } from "./SatisfyingBeautyBlend";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition<DeviReelProps>
        id="DeviReel"
        component={DeviReel}
        durationInFrames={300}
        fps={30}
        width={1080}
        height={1920}
        calculateMetadata={({ props }) => {
          const manifest = props.manifest;
          if (!manifest || !manifest.scenes || manifest.scenes.length === 0) {
            return {
              durationInFrames: 300,
              fps: 30,
              width: 1080,
              height: 1920,
            };
          }

          // Calculate total duration from scenes
          const totalFrames = manifest.scenes.reduce(
            (sum, scene) => sum + scene.durationFrames,
            0
          );

          return {
            durationInFrames: totalFrames > 0 ? totalFrames : 300,
            fps: manifest.fps || 30,
            width: manifest.width || 1080,
            height: manifest.height || 1920,
          };
        }}
        defaultProps={{
          manifest: {
            reel_id: "example",
            fps: 30,
            width: 1080,
            height: 1920,
            scenes: [
              {
                image: "https://via.placeholder.com/1080x1920",
                durationFrames: 60,
                text: "Example scene",
                textPosition: "bottom"
              }
            ],
          },
        } satisfies DeviReelProps}
      />

      <Composition
        id="SheerViralReel"
        component={SheerViralReel}
        durationInFrames={360}
        fps={30}
        width={1080}
        height={1920}
      />

      <Composition
        id="SunglassesAffiliateReel"
        component={SunglassesAffiliateReel}
        durationInFrames={600}
        fps={30}
        width={1080}
        height={1920}
      />

      {/* Professional Affiliate Marketing Reels */}
      <Composition
        id="AffiliateReel1-WithText"
        component={() => <AffiliateReel1 showText={true} />}
        durationInFrames={300}
        fps={30}
        width={1080}
        height={1920}
      />
      <Composition
        id="AffiliateReel1-Clean"
        component={() => <AffiliateReel1 showText={false} />}
        durationInFrames={300}
        fps={30}
        width={1080}
        height={1920}
      />

      <Composition
        id="AffiliateReel2-WithText"
        component={() => <AffiliateReel2 showText={true} />}
        durationInFrames={270}
        fps={30}
        width={1080}
        height={1920}
      />
      <Composition
        id="AffiliateReel2-Clean"
        component={() => <AffiliateReel2 showText={false} />}
        durationInFrames={270}
        fps={30}
        width={1080}
        height={1920}
      />

      <Composition
        id="AffiliateReel3-WithText"
        component={() => <AffiliateReel3 showText={true} />}
        durationInFrames={300}
        fps={30}
        width={1080}
        height={1920}
      />
      <Composition
        id="AffiliateReel3-Clean"
        component={() => <AffiliateReel3 showText={false} />}
        durationInFrames={300}
        fps={30}
        width={1080}
        height={1920}
      />

      {/* Viral Combo Reel - 3 videos combined (18 seconds) */}
      <Composition
        id="AffiliateViralCombo-WithText"
        component={() => <AffiliateViralCombo showText={true} />}
        durationInFrames={540}
        fps={30}
        width={1080}
        height={1920}
      />
      <Composition
        id="AffiliateViralCombo-Clean"
        component={() => <AffiliateViralCombo showText={false} />}
        durationInFrames={540}
        fps={30}
        width={1080}
        height={1920}
      />

      {/* Breaking Reality - Devi's Story (18 seconds) */}
      <Composition
        id="DeviBreakingReality-WithText"
        component={() => <DeviBreakingReality showText={true} />}
        durationInFrames={540}
        fps={30}
        width={1080}
        height={1920}
      />
      <Composition
        id="DeviBreakingReality-Clean"
        component={() => <DeviBreakingReality showText={false} />}
        durationInFrames={540}
        fps={30}
        width={1080}
        height={1920}
      />

      {/* Devi True Story - Full Narrative Arc (25 seconds) */}
      <Composition
        id="DeviTrueStory-WithText"
        component={() => <DeviTrueStory showText={true} />}
        durationInFrames={750}
        fps={30}
        width={1080}
        height={1920}
      />
      <Composition
        id="DeviTrueStory-Clean"
        component={() => <DeviTrueStory showText={false} />}
        durationInFrames={750}
        fps={30}
        width={1080}
        height={1920}
      />

      {/* Makeup Influencer - Professional Technique (16 seconds) */}
      <Composition
        id="MakeupInfluencer-WithText"
        component={() => <MakeupInfluencer showText={true} />}
        durationInFrames={480}
        fps={30}
        width={1080}
        height={1920}
      />
      <Composition
        id="MakeupInfluencer-Clean"
        component={() => <MakeupInfluencer showText={false} />}
        durationInFrames={480}
        fps={30}
        width={1080}
        height={1920}
      />

      {/* Makeup Blend - 3 Reels Blended (29 seconds) */}
      <Composition
        id="MakeupBlend-WithText"
        component={() => <MakeupBlend showText={true} />}
        durationInFrames={870}
        fps={30}
        width={1080}
        height={1920}
      />
      <Composition
        id="MakeupBlend-Clean"
        component={() => <MakeupBlend showText={false} />}
        durationInFrames={870}
        fps={30}
        width={1080}
        height={1920}
      />

      {/* Instagram Carousel - Mindvalley Affiliate (6 Slides) */}
      <Folder name="Mindvalley-Carousel">
        <Still
          id="Slide-1"
          component={() => <MindvalleyCarousel slideNumber={1} />}
          width={1080}
          height={1080}
        />
        <Still
          id="Slide-2"
          component={() => <MindvalleyCarousel slideNumber={2} />}
          width={1080}
          height={1080}
        />
        <Still
          id="Slide-3"
          component={() => <MindvalleyCarousel slideNumber={3} />}
          width={1080}
          height={1080}
        />
        <Still
          id="Slide-4"
          component={() => <MindvalleyCarousel slideNumber={4} />}
          width={1080}
          height={1080}
        />
        <Still
          id="Slide-5"
          component={() => <MindvalleyCarousel slideNumber={5} />}
          width={1080}
          height={1080}
        />
        <Still
          id="Slide-6"
          component={() => <MindvalleyCarousel slideNumber={6} />}
          width={1080}
          height={1080}
        />
      </Folder>

      {/* Viral Blend - 3 Makeup Techniques (10 seconds) */}
      <Composition
        id="ViralBlend-WithText"
        component={() => <ViralBlend showText={true} />}
        durationInFrames={300}
        fps={30}
        width={1080}
        height={1920}
      />
      <Composition
        id="ViralBlend-Clean"
        component={() => <ViralBlend showText={false} />}
        durationInFrames={300}
        fps={30}
        width={1080}
        height={1920}
      />

      {/* Simple Viral Blend - Clean 3-Video Blend (26 seconds) */}
      <Composition
        id="SimpleViralBlend-WithText"
        component={() => <SimpleViralBlend showText={true} />}
        durationInFrames={624}
        fps={24}
        width={1088}
        height={1904}
      />
      <Composition
        id="SimpleViralBlend-Clean"
        component={() => <SimpleViralBlend showText={false} />}
        durationInFrames={624}
        fps={24}
        width={1088}
        height={1904}
      />

      {/* Satisfying Beauty Blend - 3 Makeup Reels Combined (26 seconds) */}
      <Composition
        id="SatisfyingBeautyBlend-WithText"
        component={() => <SatisfyingBeautyBlend showText={true} />}
        durationInFrames={600}
        fps={24}
        width={1088}
        height={1904}
      />
      <Composition
        id="SatisfyingBeautyBlend-Clean"
        component={() => <SatisfyingBeautyBlend showText={false} />}
        durationInFrames={600}
        fps={24}
        width={1088}
        height={1904}
      />
    </>
  );
};
