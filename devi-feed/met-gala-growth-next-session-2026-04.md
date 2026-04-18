# Devi — Met Gala growth pack (read next session)

**Purpose:** One place for **public reference URLs**, **Devi hair/outfit locks**, and **ops hygiene** before the **May 4, 2026** beat.  
**Reminder:** At the **start of the next** Iris / growth chat about Met, open this file **first** — then `contenty/briefs/met-gala-countdown-reel-2026-04.md`.

---

## 1. Event facts (for captions / timing)

| Item | Detail |
|------|--------|
| **Gala date** | **Monday, May 4, 2026** (first Monday in May) |
| **Exhibition** | **Costume Art** — Costume Institute spring 2026 show |
| **Exhibition on view** | May 10, 2026 → January 10, 2027 (public) |
| **Dress code** | **Fashion is Art** |
| **Social tags (official)** | `#MetGala` `#MetCostumeArt` `#CostumeInstitute` — use sparingly with Devi tags |

---

## 2. Public reference URLs — primary + alternates

Use these to fill **Viral reference** tables, cite press tone, or sanity-check theme language. **Do not** copy a specific guest look wholesale; **do** match **dress-code energy** (body as canvas / sculptural / art-to-wear).

| Field | URL |
|-------|-----|
| **Primary (institution)** | https://www.metmuseum.org/press-releases/costume-institute-spring-2026 |
| **Primary (EN press page)** | https://www.metmuseum.org/en/press-releases/costume-institute-spring-2026 |
| **Alt — long-read context** | https://www.wallpaper.com/fashion-beauty/met-gala-2026-costume-art-exhibition-everything-you-need-to-know |
| **Alt — Vogue Scandinavia** | https://www.voguescandinavia.com/articles/met-gala-2026-everything-you-need-to-know |
| **Alt — roundup / guide** | https://www.brandsynario.com/theme-guests-dress-code-everything-you-need-to-know-about-met-gala-2026/ |

**Operator note:** If one URL **403s** in automation, try another row; browsers often still load.

---

## 3. Devi consistency locks (non-negotiable — lane G lessons)

Applies to **nano-banana** stills and **Kling** i2v for Met (and all high-glam lanes).

| Lock | Specification |
|------|----------------|
| **Face reference** | `https://raw.githubusercontent.com/ortall0201/Social/main/devi-identity/images/devi-face-primary.png` in `image_input` |
| **Eyes** | **Heterochromia** — green on **her right** eye, purple on **her left** (viewer’s left = green, etc. — match the PNG) |
| **Hair** | **Shoulder-length** layered **pastel pink** base; **yellow + blue** streaks in bangs/layers; **straight bangs**; **soft loose waves only** |
| **Hair — never** | Barrel curls, spiral perm, Hollywood **set waves**, long mermaid extensions, random **chignon/updo** unless the brief explicitly matches **this** reference and you re-verify against the PNG |
| **Jewelry** | **Large gold hoop earrings** default unless brief overrides |
| **Motion** | Prefer **fabric / train / camera** leadership; if i2v keeps curling hair, use **negatives**: `curly hair`, `ringlets`, `face swap`, `wrong identity` and prompt **hair identical to frame one** |
| **Persona** | Read `.cursor/skills/persona-control-skill/SKILL.md` before prompts |

---

## 4. Met outfit directions for Devi (prompt-safe)

**Dress code:** *Fashion is Art* — interpret as **sculpture, canvas, museum gravity**, not cosplay of a real attendee.

| Lane | Outfit vocabulary (examples) | Setting |
|------|------------------------------|---------|
| **Cinematic (Mode 1)** | Sculptural couture gown or tailored column; train; matte or controlled sheen; **no** fake brand logos | Museum staircase, dark gallery, chiaroscuro stone |
| **Dance-adjacent (Mode 2)** | Full skirt or train that **blooms** on a **slow pivot**; bodice structured like object / installation | Same world; **ballet-adjacent** motion, not TikTok dance |
| **Prop hero (optional)** | Jewelry, metal corsetry, mask element, gloves — **first frame readable** as object story | Gallery light, single hero prop |

**Avoid in imagegen:** “Same as [celebrity name]’s Met dress,” knockoff logos, or **copying** a specific 2026 look before the carpet. Use **original** “art-to-wear / embodied art” phrasing.

---

## 5. Motion + copy — canonical brief

- **Full brief + Kling paste-ins:** `contenty/briefs/met-gala-countdown-reel-2026-04.md`  
- **Mode 1:** cinematic slow dolly / train / icon frontal  
- **Mode 2:** one clean spin phrase → **locked** pose  
- **Captions (examples):** `Fashion. Is. Art.` · `Body. Canvas. May.` · `Painted. Moving. Still.`  
- **Hashtags (max 5):** `#MetGala` `#fashion` `#devi` + up to 2 (`#editorial` `#AIFashion` / `#CostumeArt`)

---

## 6. Production + Buffer checklist

1. Still → **nano-banana** with face URL + **§3 hair locks** in the prompt.  
2. Video → **Kling** from still; **§3 motion / negatives**.  
3. **Normalize** to **1080×1920** (see `devi-feed/buffer-reels-lane-g-2026-04-21/normalize-lane-g-reels-1080x1920.ps1` pattern).  
4. Drop MP4 under tracked `devi-feed/` path (or `iris-media` approved HTTPS) → **approval** → Buffer / Publisher.  
5. **Pipeline A** for countdown reach; **B** only if pairing editorial / affiliate later.

---

## 7. Tie-in to master growth plan

- Inventory row: **`brain/devi-growth-plan-1m-2026-04.md`** §3.1 **R-Met-1** / **R-Met-2** (if `brain/` available locally).  
- After **May 4:** plan **R-Met-React** (new Viraly pass; no 1:1 copy of attendee looks).

---

*Iris / operator: **next chat** — say “open Met growth pack” or use keyword **met** in the session menu; start from **§3** before generating.*
