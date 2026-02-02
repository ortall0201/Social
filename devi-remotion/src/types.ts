export interface DeviReelProps {
  manifest: Manifest;
}

export interface Scene {
  image: string; // URL or path to image
  durationFrames: number;
  text: string;
  textPosition?: "top" | "center" | "bottom";
}

export interface ManifestStyle {
  font?: string;
  textPosition?: "top" | "center" | "bottom";
  safeMargin?: number;
  textColor?: string;
  textShadow?: boolean;
}

export interface Manifest {
  reel_id: string;
  fps: number;
  width: number;
  height: number;
  scenes: Scene[];
  audio?: string;
  style?: ManifestStyle;
}
