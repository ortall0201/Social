# Ortal LinkedIn — G.I. Jane / “Supergirl” visual persona (source of truth)

**Voice + values** (what the words must still sound like): `docs/agents/ortal-linkedin-persona.md`.

**Visual source of truth (locked panel):** committed reference image:

`docs/agents/assets/ortal-gijane-supergirl-persona-reference.png`

Use this file anytime a brief says **G.I. Jane**, **Supergirl** (visual), or **tactical split-panel** heroine for Ortal LinkedIn imagegen / motion — **do not** substitute a softer “blazer only” look unless the brief explicitly chooses the **civilian builder** track in `artifacts/linkedin/visual-hooks/_shared-imagegen-persona-brief.md`.

---

## One-line read

**Builder-engineer at the threshold:** private rigor (lab) on one side, public consequence (**LIVE FEED**) on the other — **tactical competence**, hands-on tools, **no war fantasy**, no weapons, no flags, no rank.

---

## Visual DNA (match the reference)

| Layer | Lock |
|--------|------|
| **Composition** | **Vertical split**: cool, cluttered **private lab/workshop** (left) vs hot **public stage / crowd** (right). She **stands in the seam** (doorway/pillar), bridging both worlds. |
| **Face** | Adult woman; **serious, intense**, accountable — **not** cute influencer, **not** exhausted victim. |
| **Hair** | **Long, dark**; **wind-swept** from the bright / public side. |
| **Wardrobe** | **Dark olive field jacket** (multi-pocket), **cargo pants**, **heavy black boots** — reads **tactical technician**, not evening wear. **No** rank insignia, **no** unit patches, **no** flags, **no** dog tags as hero detail. |
| **Props** | **Handheld electronic tool** (comms/diagnostic) + **coiled black cable** — **work**, never weapons. |
| **Right world** | **LIVE FEED** marquee or equivalent readable; band/crowd energy; **orange–amber** light, lens flare OK. |
| **Left world** | Bench, monitor (schematic/code), lamp, glassware, shelves of gear; **blue-grey** cool palette. |
| **Style** | Graphic novel / cel-shade, **heavy outlines**, **chiaroscuro** between sides. **Not** Disney, **not** Pixar, **not** named DC/Marvel likeness. |

---

## On-image typography (when this arc uses poster type)

Reference panel treatment:

- **Line 1:** **ALL CAPS**, **white** (e.g. `PRIVATE EXPERIMENTS LIE.`)
- **Line 2:** **ALL CAPS**, **orange** matching the feed-side light (e.g. `THE FEED REMEMBERS.`)
- **Placement:** upper area, anchored over the **darker / lab** side for legibility.
- **Rule:** **Exact copy** from the content brief — no paraphrase, no extra slogan line.

Other campaigns may use **sentence-case** overlays (Batch 2) on the **same figure**; the **figure** still matches this doc when the brief says G.I. Jane / Supergirl.

**Short comic-style on-image lines** (punchy, not poster-ALL-CAPS): [`comic_caption_rules.md`](./comic_caption_rules.md).

**Imagegen brief checklist:** [`image_prompt_style_guide.md`](./image_prompt_style_guide.md). **Full series pipeline:** [`master_orchestrator_skill.md`](./master_orchestrator_skill.md).

---

## Hard bans

- **No weapons** (firearms, blades, etc.).
- **No flags**, **no national symbols**, **no military rank** or unit insignia.
- **No** named superhero **likeness** or franchise character.

---

## Motion / i2v stem (paste + scene)

```text
Original character matching reference PNG ortal-gijane-supergirl-persona-reference.png: long dark windblown hair, intense expression, olive field jacket, cargo pants, black combat boots, handheld diagnostic/comms and coiled cable, standing at threshold between cool cluttered private lab and blazing LIVE FEED concert stage. Graphic-novel lighting, deliberate movement, hair and jacket respond to wind from the bright side. No weapons, no flags, no rank insignia. Not Disney, not Pixar, not named heroes.
```

---

## Cross-links

- Imagegen voice + **dual tracks** (this vs civilian builder): `artifacts/linkedin/visual-hooks/_shared-imagegen-persona-brief.md`
- Buffer heroes: `buffer-linkedin/visual-hooks/ortal-tactical-series-*/feed-hero-v1.png`
- Legacy mirror (animation notes): `artifacts/linkedin/visual-hooks/ortal-tactical-heroine-animation-persona.md` (gitignored clone of this canon — prefer **this** file in `docs/agents/` for repo truth)
