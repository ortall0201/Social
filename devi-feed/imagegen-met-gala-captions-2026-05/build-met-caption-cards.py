from __future__ import annotations

import json
import math
import shutil
import subprocess
from dataclasses import dataclass
from datetime import datetime, timedelta, timezone
from pathlib import Path

from PIL import Image, ImageColor, ImageDraw, ImageEnhance, ImageFilter, ImageFont


CANVAS = (1080, 1350)
SAFE_X = 88
SAFE_Y = 86
REPO_ROOT = Path(__file__).resolve().parents[2]
OUT_DIR = Path(__file__).resolve().parent
SOURCE_DIR = OUT_DIR / "source-frames"

FONT_BOLD_CANDIDATES = [
    Path("C:/Windows/Fonts/segoeuib.ttf"),
    Path("C:/Windows/Fonts/arialbd.ttf"),
]
FONT_REGULAR_CANDIDATES = [
    Path("C:/Windows/Fonts/segoeui.ttf"),
    Path("C:/Windows/Fonts/arial.ttf"),
]


def font_path(candidates: list[Path]) -> str:
    for candidate in candidates:
        if candidate.exists():
            return str(candidate)
    raise FileNotFoundError("No usable system font found.")


FONT_BOLD = font_path(FONT_BOLD_CANDIDATES)
FONT_REGULAR = font_path(FONT_REGULAR_CANDIDATES)


@dataclass(frozen=True)
class Look:
    id: str
    label: str
    still: str
    video: str
    selected_because: list[str]
    face_fidelity: str
    glam_impact: str
    outfit_clarity: str
    lighting_polish: str
    frame_points: list[tuple[str, float]]


LOOKS = [
    Look(
        id="rev-met-r06",
        label="Noir crystal column",
        still="devi-feed/buffer-reels-met-gala-reversed-2026-05/stills/rev-met-r06.jpg",
        video="devi-feed/buffer-reels-met-gala-reversed-2026-05/rev-met-r06.mp4",
        selected_because=[
            "Closest overall match to Devi's face shape and pastel hair lock.",
            "Black sequined silhouette reads instantly even with short feed-view attention.",
            "Plain editorial background gives us reliable negative space for text overlays.",
        ],
        face_fidelity="Strongest direct resemblance in the clean-skin pool.",
        glam_impact="High-contrast noir glamour with camera-ready sparkle.",
        outfit_clarity="Full-body column gown remains readable after 4:5 conversion.",
        lighting_polish="Controlled studio light keeps skin and sequins clean.",
        frame_points=[("f01", 2.1), ("f02", 6.6)],
    ),
    Look(
        id="rev-met-r07",
        label="Classic champagne couture",
        still="devi-feed/buffer-reels-met-gala-reversed-2026-05/stills/rev-met-r07.jpg",
        video="devi-feed/buffer-reels-met-gala-reversed-2026-05/rev-met-r07.mp4",
        selected_because=[
            "Very stable face read with Devi's softer glam expression.",
            "Champagne satin and gala aisle give prestige without visual clutter.",
            "Works well for both wide silhouette cards and tighter phrase-led crops.",
        ],
        face_fidelity="Strong and recognizable with good eye shape continuity.",
        glam_impact="Elegant, understated Met-level polish.",
        outfit_clarity="Architectural bodice and full skirt stay legible in feed crop.",
        lighting_polish="Warm carpet lights and soft flash read beautifully.",
        frame_points=[("f01", 2.0), ("f02", 6.2)],
    ),
    Look(
        id="rev-met-r08",
        label="Floral staircase statement",
        still="devi-feed/buffer-reels-met-gala-reversed-2026-05/stills/rev-met-r08.jpg",
        video="devi-feed/buffer-reels-met-gala-reversed-2026-05/rev-met-r08.mp4",
        selected_because=[
            "Highest glam impact in the set with unmistakable floral couture drama.",
            "Hair still reads as Devi, while the color story feels premium and editorial.",
            "Stair architecture supports strong top- or bottom-text compositions.",
        ],
        face_fidelity="Strong enough to keep Devi recognizable while carrying a bigger look.",
        glam_impact="Top-tier visual drama and lush couture texture.",
        outfit_clarity="3D floral applique and train stay readable at first glance.",
        lighting_polish="Warm staircase glow flatters both skin and fabric depth.",
        frame_points=[("f01", 1.7), ("f02", 5.7)],
    ),
    Look(
        id="rev-met-r10",
        label="Grand staircase cape hero",
        still="devi-feed/buffer-reels-met-gala-reversed-2026-05/stills/rev-met-r10.jpg",
        video="devi-feed/buffer-reels-met-gala-reversed-2026-05/rev-met-r10.mp4",
        selected_because=[
            "Stable face fidelity with prestige red-carpet posture.",
            "The cape-and-column silhouette feels like classic Met closing-night glamour.",
            "Symmetrical staircase layout gives us polished, luxury-safe text placement.",
        ],
        face_fidelity="Stable and flattering with good resemblance to the identity reference.",
        glam_impact="Grand but controlled, with strong luxury-finale energy.",
        outfit_clarity="Cape shape and corseted bodice read immediately.",
        lighting_polish="Even staircase light supports both warm and neutral card grades.",
        frame_points=[("f01", 2.4), ("f02", 6.8)],
    ),
    Look(
        id="rev-met-r02",
        label="Sculptural cape architecture",
        still="devi-feed/buffer-reels-met-gala-reversed-2026-05/stills/rev-met-r02.jpg",
        video="devi-feed/buffer-reels-met-gala-reversed-2026-05/rev-met-r02.mp4",
        selected_because=[
            "Best of the more dramatic sculptural looks while still preserving Devi's core features.",
            "Massive cape architecture makes this feel unmistakably Met instead of generic gala.",
            "Dark arch framing gives built-in luxury contrast for copy-led cards.",
        ],
        face_fidelity="Good enough to use as a drama anchor in the shortlist.",
        glam_impact="Strong sculptural authority and deep-carpet presence.",
        outfit_clarity="Upper-shell structure and cape spread are obvious from distance.",
        lighting_polish="Soft monumental light keeps the mood expensive.",
        frame_points=[("f01", 2.8), ("f02", 7.0)],
    ),
    Look(
        id="met-gala-2026-05-r07",
        label="Iridescent carpet power gown",
        still="devi-feed/buffer-reels-met-gala-2026-05/stills/met-gala-2026-05-r07.jpg",
        video="devi-feed/buffer-reels-met-gala-2026-05/met-gala-2026-05-r07.mp4",
        selected_because=[
            "Strong clean-skin result from the earlier Met pack with premium shoulder architecture.",
            "The jewel-tone surface gives the set a darker, cooler fashion note.",
            "Excellent paparazzi-lane environment for sharper editorial one-liners.",
        ],
        face_fidelity="Good face continuity with a more polished carpet finish.",
        glam_impact="Rich iridescent fabric and broad shoulders feel current and expensive.",
        outfit_clarity="Shoulder line, waist structure, and train stay distinct in feed.",
        lighting_polish="Balanced paparazzi corridor light keeps details crisp.",
        frame_points=[("f01", 2.3), ("f02", 6.1)],
    ),
]


CARD_SPECS = [
    {"id": "met-caption-01", "line": "Who am I wearing? Patience.", "tone": "dry-couture", "source": "rev-met-r08-still", "layout": "full_bleed", "crop_bias": "upper", "text_zone": "bottom", "align": "left", "tint": "#6a2233", "frame": False},
    {"id": "met-caption-02", "line": "Yes, this dress has its own schedule.", "tone": "insider-wry", "source": "rev-met-r10-still", "layout": "framed", "crop_bias": "center", "text_zone": "top", "align": "center", "tint": "#8f7351", "frame": True},
    {"id": "met-caption-03", "line": "Couture first. Breathing second.", "tone": "sharp-glam", "source": "rev-met-r02-still", "layout": "full_bleed", "crop_bias": "upper", "text_zone": "bottom", "align": "left", "tint": "#1d1d26", "frame": False},
    {"id": "met-caption-04", "line": "Fashionably late. Structurally on time.", "tone": "architectural", "source": "met-gala-2026-05-r07-still", "layout": "framed_offset", "crop_bias": "center", "text_zone": "top", "align": "left", "tint": "#243c4c", "frame": True},
    {"id": "met-caption-05", "line": "This train needs its own security.", "tone": "carpet-drama", "source": "rev-met-r10-f01", "layout": "full_bleed", "crop_bias": "lower", "text_zone": "bottom", "align": "center", "tint": "#514033", "frame": False},
    {"id": "met-caption-06", "line": "If it looks easy, it is custom.", "tone": "quiet-authority", "source": "rev-met-r07-still", "layout": "framed", "crop_bias": "center", "text_zone": "bottom", "align": "left", "tint": "#826a4f", "frame": True},
    {"id": "met-caption-07", "line": "Tonight's theme: controlled chaos.", "tone": "editorial-deadpan", "source": "rev-met-r08-f01", "layout": "full_bleed", "crop_bias": "lower", "text_zone": "top", "align": "left", "tint": "#7f2a3f", "frame": False},
    {"id": "met-caption-08", "line": "Art on body. Balance on stairs.", "tone": "fashion-native", "source": "rev-met-r10-f02", "layout": "framed_offset", "crop_bias": "lower", "text_zone": "bottom", "align": "right", "tint": "#4d3a30", "frame": True},
    {"id": "met-caption-09", "line": "I planned the pose, not the weather.", "tone": "witty-control", "source": "met-gala-2026-05-r07-f01", "layout": "full_bleed", "crop_bias": "lower", "text_zone": "top", "align": "center", "tint": "#2f4152", "frame": False},
    {"id": "met-caption-10", "line": "Serving silhouette, not small talk.", "tone": "cool-dismissive", "source": "rev-met-r06-still", "layout": "framed", "crop_bias": "center", "text_zone": "bottom", "align": "center", "tint": "#111111", "frame": True},
    {"id": "met-caption-11", "line": "The corset said no. I said watch.", "tone": "confidence-line", "source": "rev-met-r02-f01", "layout": "full_bleed", "crop_bias": "upper", "text_zone": "bottom", "align": "right", "tint": "#202028", "frame": False},
    {"id": "met-caption-12", "line": "One look. Ten camera flashes.", "tone": "paparazzi-hero", "source": "met-gala-2026-05-r07-f02", "layout": "framed_offset", "crop_bias": "center", "text_zone": "top", "align": "center", "tint": "#253446", "frame": True},
    {"id": "met-caption-13", "line": "Red carpet physics are different.", "tone": "fashion-science", "source": "rev-met-r08-f02", "layout": "full_bleed", "crop_bias": "lower", "text_zone": "bottom", "align": "left", "tint": "#71233a", "frame": False},
    {"id": "met-caption-14", "line": "Wearing architecture with confidence.", "tone": "structural-glam", "source": "rev-met-r02-f02", "layout": "framed", "crop_bias": "upper", "text_zone": "top", "align": "left", "tint": "#26262d", "frame": True},
    {"id": "met-caption-15", "line": "Glamour is a full-time operation.", "tone": "operations-glam", "source": "rev-met-r07-f01", "layout": "full_bleed", "crop_bias": "center", "text_zone": "bottom", "align": "center", "tint": "#705a43", "frame": False},
    {"id": "met-caption-16", "line": "This is not a dress. It's strategy.", "tone": "strategic-couture", "source": "rev-met-r06-f01", "layout": "framed_offset", "crop_bias": "center", "text_zone": "bottom", "align": "right", "tint": "#151515", "frame": True},
    {"id": "met-caption-17", "line": "If it sparkles, it schedules itself.", "tone": "meta-witty", "source": "rev-met-r06-f02", "layout": "full_bleed", "crop_bias": "lower", "text_zone": "top", "align": "left", "tint": "#101010", "frame": False},
    {"id": "met-caption-18", "line": "Grace under impossible tailoring.", "tone": "luxury-restraint", "source": "rev-met-r10-still", "layout": "framed", "crop_bias": "center", "text_zone": "bottom", "align": "right", "tint": "#655246", "frame": True},
    {"id": "met-caption-19", "line": "Afterparty energy, museum standards.", "tone": "afterparty-polish", "source": "rev-met-r07-f02", "layout": "framed_offset", "crop_bias": "center", "text_zone": "top", "align": "left", "tint": "#7d6448", "frame": True},
    {"id": "met-caption-20", "line": "Fashion is art with deadlines.", "tone": "editorial-close", "source": "met-gala-2026-05-r07-still", "layout": "full_bleed", "crop_bias": "center", "text_zone": "bottom", "align": "center", "tint": "#2b3f4c", "frame": False},
]


def ensure_dir(path: Path) -> None:
    path.mkdir(parents=True, exist_ok=True)


def ffmpeg_extract(video: Path, seconds: float, target: Path) -> None:
    ensure_dir(target.parent)
    cmd = [
        "ffmpeg",
        "-y",
        "-ss",
        f"{seconds:.3f}",
        "-i",
        str(video),
        "-frames:v",
        "1",
        str(target),
    ]
    subprocess.run(cmd, check=True, capture_output=True)


def build_sources() -> dict[str, Path]:
    ensure_dir(SOURCE_DIR)
    source_map: dict[str, Path] = {}
    for look in LOOKS:
        still_src = REPO_ROOT / look.still
        still_out = SOURCE_DIR / f"{look.id}-still{still_src.suffix.lower()}"
        shutil.copy2(still_src, still_out)
        source_map[f"{look.id}-still"] = still_out

        video_src = REPO_ROOT / look.video
        for label, seconds in look.frame_points:
            frame_out = SOURCE_DIR / f"{look.id}-{label}.png"
            ffmpeg_extract(video_src, seconds, frame_out)
            source_map[f"{look.id}-{label}"] = frame_out
    return source_map


def balance_wrap(draw: ImageDraw.ImageDraw, line: str, font: ImageFont.FreeTypeFont, max_width: int, max_lines: int = 2) -> list[str]:
    words = line.split()
    if not words:
        return [line]
    if len(words) == 1:
        return [line]

    best = [line]
    best_score = None
    for split_count in range(1, min(len(words), max_lines) + 1):
        if split_count == 1:
            candidate = [line]
            width = draw.textbbox((0, 0), candidate[0], font=font)[2]
            if width <= max_width:
                return candidate
            continue

        for idx in range(1, len(words)):
            candidate = [" ".join(words[:idx]), " ".join(words[idx:])]
            widths = [draw.textbbox((0, 0), part, font=font)[2] for part in candidate]
            if max(widths) > max_width:
                continue
            score = abs(widths[0] - widths[1])
            if best_score is None or score < best_score:
                best_score = score
                best = candidate
    return best


def fit_text(draw: ImageDraw.ImageDraw, line: str, max_width: int) -> tuple[ImageFont.FreeTypeFont, list[str], int]:
    for size in range(92, 59, -4):
        font = ImageFont.truetype(FONT_BOLD, size=size)
        lines = balance_wrap(draw, line, font, max_width=max_width, max_lines=2)
        widths = [draw.textbbox((0, 0), part, font=font)[2] for part in lines]
        if widths and max(widths) <= max_width:
            spacing = max(14, size // 5)
            return font, lines, spacing
    font = ImageFont.truetype(FONT_BOLD, size=60)
    return font, balance_wrap(draw, line, font, max_width=max_width), 14


def cover_crop(image: Image.Image, size: tuple[int, int], bias: str) -> Image.Image:
    target_w, target_h = size
    scale = max(target_w / image.width, target_h / image.height)
    new_size = (math.ceil(image.width * scale), math.ceil(image.height * scale))
    resized = image.resize(new_size, Image.LANCZOS)
    left = max(0, (resized.width - target_w) // 2)
    if bias == "upper":
        top = 0
    elif bias == "lower":
        top = max(0, resized.height - target_h)
    else:
        top = max(0, (resized.height - target_h) // 2)
    return resized.crop((left, top, left + target_w, top + target_h))


def contain_fit(image: Image.Image, max_size: tuple[int, int]) -> Image.Image:
    copy = image.copy()
    copy.thumbnail(max_size, Image.LANCZOS)
    return copy


def tint_layer(size: tuple[int, int], color: str, opacity: int) -> Image.Image:
    rgb = ImageColor.getrgb(color)
    return Image.new("RGBA", size, rgb + (opacity,))


def add_scrim(base: Image.Image, zone: str) -> Image.Image:
    overlay = Image.new("RGBA", base.size, (0, 0, 0, 0))
    draw = ImageDraw.Draw(overlay)
    height = 430
    steps = 18
    for i in range(steps):
        alpha = int(190 * ((i + 1) / steps))
        if zone == "top":
            y0 = 0 + (height // steps) * i
            y1 = 0 + (height // steps) * (i + 1)
        else:
            y1 = base.height - (height // steps) * i
            y0 = base.height - (height // steps) * (i + 1)
        draw.rectangle((0, y0, base.width, y1), fill=(0, 0, 0, alpha))
    return Image.alpha_composite(base.convert("RGBA"), overlay)


def render_base(source_path: Path, layout: str, bias: str, tint: str, frame: bool, text_zone: str) -> Image.Image:
    image = Image.open(source_path).convert("RGB")

    if layout == "full_bleed":
        canvas = cover_crop(image, CANVAS, bias).convert("RGBA")
        canvas = Image.blend(canvas, tint_layer(CANVAS, tint, 84), 0.18)
        return canvas

    bg = cover_crop(image, CANVAS, bias).filter(ImageFilter.GaussianBlur(radius=28))
    bg = ImageEnhance.Brightness(bg).enhance(0.64)
    bg = Image.blend(bg.convert("RGBA"), tint_layer(CANVAS, tint, 110), 0.22)

    if layout == "framed":
        fg = contain_fit(image, (860, 1140))
        x = (CANVAS[0] - fg.width) // 2
        y = (CANVAS[1] - fg.height) // 2
    else:
        fg = contain_fit(image, (760, 1080))
        x = 70 if frame else 96
        y = (CANVAS[1] - fg.height) // 2

    if text_zone == "top":
        y = min(CANVAS[1] - fg.height - 48, y + 96)

    fg_rgba = fg.convert("RGBA")
    shadow = Image.new("RGBA", (fg_rgba.width + 24, fg_rgba.height + 24), (0, 0, 0, 0))
    shadow_draw = ImageDraw.Draw(shadow)
    shadow_draw.rounded_rectangle((12, 12, shadow.width - 12, shadow.height - 12), radius=20, fill=(0, 0, 0, 120))
    shadow = shadow.filter(ImageFilter.GaussianBlur(radius=12))
    bg.alpha_composite(shadow, (x - 12, y - 6))

    if frame:
        frame_img = Image.new("RGBA", (fg_rgba.width + 18, fg_rgba.height + 18), (255, 255, 255, 0))
        frame_draw = ImageDraw.Draw(frame_img)
        frame_draw.rounded_rectangle((0, 0, frame_img.width - 1, frame_img.height - 1), radius=22, outline=(255, 255, 255, 190), width=3)
        bg.alpha_composite(frame_img, (x - 9, y - 9))

    bg.alpha_composite(fg_rgba, (x, y))
    return bg


def draw_text(card: Image.Image, line: str, zone: str, align: str) -> Image.Image:
    card = add_scrim(card, zone)
    draw = ImageDraw.Draw(card)
    max_width = CANVAS[0] - SAFE_X * 2
    font, lines, spacing = fit_text(draw, line, max_width=max_width)
    text_height = 0
    line_boxes = []
    for part in lines:
        bbox = draw.textbbox((0, 0), part, font=font)
        line_boxes.append(bbox)
        text_height += bbox[3] - bbox[1]
    text_height += spacing * (len(lines) - 1)
    if zone == "top":
        y = SAFE_Y + 12
    else:
        y = CANVAS[1] - SAFE_Y - text_height - 18

    for idx, part in enumerate(lines):
        bbox = line_boxes[idx]
        line_width = bbox[2] - bbox[0]
        line_height = bbox[3] - bbox[1]
        if align == "center":
            x = (CANVAS[0] - line_width) // 2
        elif align == "right":
            x = CANVAS[0] - SAFE_X - line_width
        else:
            x = SAFE_X

        for dx, dy in ((0, 3), (2, 2), (-2, 2)):
            draw.text((x + dx, y + dy), part, font=font, fill=(0, 0, 0, 140))
        draw.text((x, y), part, font=font, fill=(255, 255, 255, 255))
        y += line_height + spacing
    return card


def build_shortlist_json() -> None:
    payload = {
        "generatedAtUtc": datetime.now(timezone.utc).isoformat().replace("+00:00", "Z"),
        "selectionPolicy": [
            "Use only today's strongest clean-skin Devi looks from the latest Met outputs.",
            "Exclude stills with obvious face drift, hair lock break, or tattoo/body-art visibility.",
            "Prioritize looks that stay readable after 4:5 feed conversion.",
        ],
        "looks": [],
    }
    for look in LOOKS:
        payload["looks"].append(
            {
                "id": look.id,
                "label": look.label,
                "still": look.still.replace("\\", "/"),
                "video": look.video.replace("\\", "/"),
                "face_fidelity": look.face_fidelity,
                "glam_impact": look.glam_impact,
                "outfit_clarity": look.outfit_clarity,
                "lighting_polish": look.lighting_polish,
                "why_selected": look.selected_because,
            }
        )
    (OUT_DIR / "strongest-looks-today.json").write_text(json.dumps(payload, indent=2), encoding="utf-8")


def build_cards(source_map: dict[str, Path]) -> list[dict]:
    manifest_cards = []
    for spec in CARD_SPECS:
        source_path = source_map[spec["source"]]
        base = render_base(source_path, spec["layout"], spec["crop_bias"], spec["tint"], spec["frame"], spec["text_zone"])
        card = draw_text(base, spec["line"], spec["text_zone"], spec["align"]).convert("RGB")
        out_name = f"{spec['id']}.png"
        out_path = OUT_DIR / out_name
        card.save(out_path, format="PNG", optimize=True)
        manifest_cards.append(
            {
                "id": spec["id"],
                "file": out_name,
                "line": spec["line"],
                "overlay_line": spec["line"],
                "tone": spec["tone"],
                "visual_direction": (
                    f"{spec['layout']} layout, {spec['text_zone']} text zone, {spec['align']} alignment, "
                    f"{spec['crop_bias']} crop bias, source {spec['source']}"
                ),
                "source_key": spec["source"],
                "text_zone": spec["text_zone"],
                "crop_bias": spec["crop_bias"],
                "layout": spec["layout"],
                "tint": spec["tint"],
            }
        )
    return manifest_cards


def write_manifests(cards: list[dict]) -> None:
    content_manifest = {
        "generatedAtUtc": datetime.now(timezone.utc).isoformat().replace("+00:00", "Z"),
        "format": {"width": 1080, "height": 1350, "ratio": "4:5"},
        "cards": cards,
    }
    (OUT_DIR / "caption-cards-manifest.json").write_text(json.dumps(content_manifest, indent=2), encoding="utf-8")

    start = datetime(2026, 5, 8, 12, 0, 0, tzinfo=timezone.utc)
    posts = []
    cursor = start
    slot_toggle = 0
    for card in cards:
        due = cursor.isoformat().replace("+00:00", "Z")
        posts.append(
            {
                "id": card["id"],
                "file": card["file"],
                "line": card["line"],
                "caption": card["line"],
                "dueAtUtc": due,
                "channels": ["instagram", "facebook"],
            }
        )
        if slot_toggle == 0:
            cursor = cursor.replace(hour=18)
            slot_toggle = 1
        else:
            cursor = (cursor + timedelta(days=1)).replace(hour=12)
            slot_toggle = 0

    schedule_manifest = {
        "defaults": {
            "mediaBaseUrl": "https://raw.githubusercontent.com/ortall0201/Social/main/devi-feed/imagegen-met-gala-captions-2026-05",
            "channels": ["instagram", "facebook"],
            "hashtags": ["#MetGala", "#fashion", "#devi"],
            "slotTemplateUtc": ["12:00:00Z", "18:00:00Z"],
        },
        "posts": posts,
    }
    (OUT_DIR / "schedule-manifest.json").write_text(json.dumps(schedule_manifest, indent=2), encoding="utf-8")


def main() -> None:
    ensure_dir(OUT_DIR)
    ensure_dir(SOURCE_DIR)
    build_shortlist_json()
    source_map = build_sources()
    cards = build_cards(source_map)
    write_manifests(cards)
    print(f"Built {len(cards)} cards in {OUT_DIR}")


if __name__ == "__main__":
    main()
