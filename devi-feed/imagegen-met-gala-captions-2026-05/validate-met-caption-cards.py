from __future__ import annotations

import json
from collections import Counter
from datetime import datetime, timezone
from pathlib import Path

from PIL import Image


def parse_dt(value: str) -> datetime:
    return datetime.fromisoformat(value.replace("Z", "+00:00")).astimezone(timezone.utc)


def average_hash(image_path: Path, size: int = 16) -> str:
    image = Image.open(image_path).convert("L").resize((size, size), Image.LANCZOS)
    pixels = list(image.tobytes())
    avg = sum(pixels) / len(pixels)
    bits = "".join("1" if p >= avg else "0" for p in pixels)
    return bits


def hash_distance(a: str, b: str) -> int:
    return sum(1 for x, y in zip(a, b) if x != y)


def main() -> None:
    root = Path(__file__).resolve().parent
    content_path = root / "caption-cards-manifest.json"
    schedule_path = root / "schedule-manifest.json"
    shortlist_path = root / "strongest-looks-today.json"

    missing = [str(path.name) for path in (content_path, schedule_path, shortlist_path) if not path.exists()]
    if missing:
        raise SystemExit(f"Missing required files: {', '.join(missing)}")

    content = json.loads(content_path.read_text(encoding="utf-8"))
    schedule = json.loads(schedule_path.read_text(encoding="utf-8"))
    shortlist = json.loads(shortlist_path.read_text(encoding="utf-8"))

    cards = content.get("cards", [])
    posts = schedule.get("posts", [])
    looks = shortlist.get("looks", [])

    issues: list[str] = []
    if len(cards) != 20:
        issues.append(f"Expected 20 cards in content manifest, found {len(cards)}")
    if len(posts) != 20:
        issues.append(f"Expected 20 posts in schedule manifest, found {len(posts)}")
    if len(looks) < 5:
        issues.append(f"Expected at least 5 strongest looks, found {len(looks)}")

    card_ids = [card.get("id", "") for card in cards]
    files = [card.get("file", "") for card in cards]
    lines = [card.get("line", "") for card in cards]
    overlay_lines = [card.get("overlay_line", "") for card in cards]
    visuals = [card.get("visual_direction", "") for card in cards]
    combos = [
        (
            card.get("source_key", ""),
            card.get("layout", ""),
            card.get("crop_bias", ""),
            card.get("text_zone", ""),
            card.get("align", ""),
            card.get("tint", ""),
        )
        for card in cards
    ]

    for label, values in (("id", card_ids), ("file", files), ("line", lines), ("visual_direction", visuals), ("composition tuple", combos)):
        counts = Counter(values)
        dupes = [key for key, count in counts.items() if key and count > 1]
        if dupes:
            issues.append(f"Duplicate {label} values: {dupes}")

    if lines != overlay_lines:
        issues.append("Overlay lines do not exactly match manifest lines.")

    schedule_map = {post.get("id"): post for post in posts}
    for card in cards:
        post = schedule_map.get(card["id"])
        if not post:
            issues.append(f"Missing schedule entry for {card['id']}")
            continue
        if post.get("line") != card.get("line"):
            issues.append(f"Line mismatch between content and schedule for {card['id']}")

    daily_counts: Counter[str] = Counter()
    due_times: list[str] = []
    previous = None
    for post in posts:
        due = parse_dt(post["dueAtUtc"])
        daily_counts[due.strftime("%Y-%m-%d")] += 1
        due_times.append(due.strftime("%H:%M:%SZ"))
        if previous and due <= previous:
            issues.append("Schedule dueAtUtc values are not strictly increasing.")
        previous = due

    bad_days = [day for day, count in daily_counts.items() if count != 2]
    if bad_days:
        issues.append(f"Expected exactly 2 posts/day, failed for: {bad_days}")

    if any(slot not in {"12:00:00Z", "18:00:00Z"} for slot in due_times):
        issues.append("Found dueAtUtc outside the required 12:00Z / 18:00Z slots.")

    hashes: dict[str, str] = {}
    for card in cards:
        image_path = root / card["file"]
        if not image_path.exists():
            issues.append(f"Missing image file: {card['file']}")
            continue
        hashes[card["id"]] = average_hash(image_path)

    ids = list(hashes.keys())
    near_duplicates = []
    for idx, left in enumerate(ids):
        for right in ids[idx + 1 :]:
            dist = hash_distance(hashes[left], hashes[right])
            if dist < 18:
                near_duplicates.append(f"{left} vs {right} (distance {dist})")
    if near_duplicates:
        issues.append("Near-duplicate visual pairs: " + "; ".join(near_duplicates))

    if issues:
        print("FAIL")
        for issue in issues:
            print(f"- {issue}")
        raise SystemExit(1)

    print("PASS")
    print(f"- cards: {len(cards)}")
    print(f"- strongest looks: {len(looks)}")
    print(f"- schedule days: {len(daily_counts)}")
    print("- no duplicate lines or files")
    print("- no near-duplicate visual pairs under the current hash threshold")


if __name__ == "__main__":
    main()
