import React from "react";
import { AbsoluteFill } from "remotion";

export type DeviViralCaptionMinimalProps = {
  caption: string;
  theme?: "dark" | "warm" | "soft" | "bold";
};

// Emotional viral captions aligned with Devi's beauty & confidence concepts
export const VIRAL_CAPTIONS = {
  // Emotional vulnerability (tear-jerker)
  emotional: [
    "The version of you that once felt impossible? You're becoming her.",
    "You weren't hard to love. They just weren't ready for your depth.",
    "Some mornings you wake up and realize you've outgrown who you used to be.",
    "It's okay to look in the mirror and not recognize the person staring back. Growth is supposed to feel unfamiliar.",
    "The woman you're becoming scares the girl you used to be. That's how you know you're on the right path.",
  ],

  // Quick confidence hits (relatable)
  confidence: [
    "She's soft. She's tough. She's both, and she doesn't need to pick one.",
    "Main character energy isn't loud. It's quiet certainty.",
    "You don't glow to prove anything to anyone. You glow because you finally stopped dimming yourself.",
    "Not cocky. Just done pretending I'm not that girl.",
    "Romanticize your life until you fall back in love with it.",
  ],

  // Self-love reality checks
  selfLove: [
    "Being 'too much' is only a problem for people who can't handle depth.",
    "The people meant for you will never make you feel like you're asking for too much.",
    "You can be a masterpiece and a work in progress at the same time.",
    "Healing isn't linear, and neither is your glow-up.",
    "Stop trying to shrink yourself to make others comfortable.",
  ],

  // Beauty & self-perception (subtle, not preachy)
  beauty: [
    "Pretty privilege is real, but so is the confidence you build when you stop caring who notices.",
    "You look different when you stop seeking validation from people who never saw you.",
    "Beauty standards change. The only one that matters is how you feel when you catch yourself in the mirror.",
    "She doesn't wear makeup to impress anyone. She wears it to remind herself who she's becoming.",
    "The version of you that stopped apologizing for taking up space? That's the prettiest one.",
  ],

  // Funny/relatable (light-hearted)
  funny: [
    "POV: You finally understand the assignment.",
    "Whoever said money can't buy happiness clearly never invested in themselves.",
    "Being delusional and being confident is the same thing. Choose your side.",
    "Not interested in going back to the version of me that accepted crumbs.",
    "Some people deserve closure. Some people just deserve to be blocked.",
  ],

  // Morning motivation (quick hit)
  morning: [
    "Start your day like you already won.",
    "Soft girl era with sharp boundaries.",
    "Choose peace. Choose you. Repeat.",
    "You're not behind. You're just on your own timeline.",
    "What if this is the year everything changes?",
  ],

  // Late-night reflections (deep)
  night: [
    "The universe will keep giving you the same lesson until you finally learn it.",
    "Sometimes the hardest part of growth is letting go of the version of you that got you here.",
    "You're not losing friends. You're just finding out who was never really there.",
    "Everything you've survived was preparation for what's coming next.",
    "One day you'll look back and realize you were never stuck. You were just planting roots.",
  ],
};

const THEME_CONFIGS = {
  dark: {
    background: "linear-gradient(160deg, #0A0A0A 0%, #1A1520 50%, #0E0B14 100%)",
    textColor: "#F5F5F5",
    accentColor: "#E8D6E8",
  },
  warm: {
    background: "linear-gradient(160deg, #2A1F1F 0%, #3D2828 50%, #1F1515 100%)",
    textColor: "#FFF5F0",
    accentColor: "#FFD4C4",
  },
  soft: {
    background: "linear-gradient(160deg, #F8F4F0 0%, #E8DDD8 50%, #D8CCC4 100%)",
    textColor: "#2A2020",
    accentColor: "#9B8B7E",
  },
  bold: {
    background: "linear-gradient(160deg, #1C0F1F 0%, #2A1535 50%, #120A15 100%)",
    textColor: "#FFFFFF",
    accentColor: "#C77DFF",
  },
};

export const DeviViralCaptionMinimal: React.FC<DeviViralCaptionMinimalProps> = ({
  caption,
  theme = "dark",
}) => {
  const themeConfig = THEME_CONFIGS[theme];

  return (
    <AbsoluteFill
      style={{
        background: themeConfig.background,
      }}
    >
      <AbsoluteFill
        style={{
          padding: "80px 72px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          style={{
            fontFamily: "'Inter', 'Helvetica Neue', 'Arial', sans-serif",
            fontSize: 64,
            fontWeight: 500,
            lineHeight: 1.15,
            letterSpacing: "-0.02em",
            color: themeConfig.textColor,
            textAlign: "center",
            maxWidth: 920,
            textShadow: theme === "soft" ? "none" : "0 2px 16px rgba(0,0,0,0.35)",
          }}
        >
          {caption}
        </div>

        {/* Subtle accent line at bottom */}
        <div
          style={{
            position: "absolute",
            bottom: 80,
            width: 120,
            height: 3,
            background: themeConfig.accentColor,
            borderRadius: 999,
            opacity: 0.6,
          }}
        />
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
