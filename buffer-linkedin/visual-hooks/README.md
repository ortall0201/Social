# LinkedIn visual hooks (Buffer heroes)

## Character lock (G.I. Jane / tactical heroine)

For **Ortal LinkedIn** imagegen batches that use the comic / tactical heroine (GI Jane lane), **keep the same character** across every new `feed-hero-v1.png` (or variant) — including both `ortal-gijane-comic-*` and `ortal-tactical-series-*` slug folders in the same campaign wave.

**Source of truth**

- Full visual DNA, bans, typography, and **paste-ready motion / imagegen stem:**  
  [`docs/agents/ortal-linkedin-gijane-supergirl-visual-persona.md`](../../docs/agents/ortal-linkedin-gijane-supergirl-visual-persona.md)
- **Locked face + wardrobe reference PNG:**  
  `docs/agents/assets/ortal-gijane-supergirl-persona-reference.png`

**Imagegen rules**

1. Use the **reference PNG** as `image_input` / style anchor whenever the brief says G.I. Jane, Supergirl (visual), or tactical split-panel — do not drift to a generic “presenter” look.
2. Preserve: **olive field jacket + cargo + boots**, **long dark wind-swept hair**, **handheld diagnostic + cable** (when it fits the scene), **no weapons / flags / rank / franchise likeness** (per persona doc). **Composition is not locked** to one desk layout — vary environment, pose, and camera per post so each hero matches the story beat.
3. On-image type: follow the **track** below (poster vs comic overlay) — the **figure** stays this persona either way.

## Two tracks = two color moods (CTA goal)

Same heroine, **different grade** so the feed reads which lane the post is in:

| Track | Slug pattern | CTA goal | Look |
|--------|----------------|-----------|------|
| **Tactical / lead authority** | `ortal-tactical-series-*` | OPS, dual CTAs, implementation + hiring | **Warm key:** orange–amber accents, “live / urgency” contrast, chiaroscuro with heat on the decision moment. Aligns with LIVE-side energy in the persona doc. |
| **Comic / career & community fit** | `ortal-gijane-comic-*` | Lighter close, relationship to reader / fit | **Cool key:** blue-grey / slate / desaturated teal, softer daylight or cool night fill — “recruiter trust,” calm builder, **not** hot sales orange as the dominant wash. |

Typography: tactical heroes → **ALL CAPS** two-line poster (white + orange) when using poster type. Comic heroes → **shorter** sentence-case or title-case overlay; keep glance-readable.

**New slug folder**

When adding `buffer-linkedin/visual-hooks/<new-slug>/feed-hero-v1.png`, match **track** (`tactical-series` vs `gijane-comic`) for color mood and type treatment; vary **scene and pose** so each image is distinct and on-brief for that post.

## CDN URL pattern

After push to `main`:

`https://cdn.jsdelivr.net/gh/ortall0201/Social@main/buffer-linkedin/visual-hooks/<slug>/feed-hero-v1.png`

Raw GitHub:

`https://raw.githubusercontent.com/ortall0201/Social/main/buffer-linkedin/visual-hooks/<slug>/feed-hero-v1.png`
