# Devi — learning patterns (Librarian output)

**Purpose:** Consolidated lessons from **`brain/reel-cases/*.case.json`**. Iris reads this (and tag-greps cases) **before** growth approval, risky archetypes, hook/payoff/share work, or scaling a series.

**Writer:** **Librarian** subagent (`.claude/agents/librarian.md`), on a schedule (e.g. monthly) or on-demand. Iris also appends **operator curator rules** when the human says "persist this."

**Do not delete old sections** — append new `## YYYY-MM — Pattern refresh` blocks.

---

## Bootstrap — 2026-03-29

**Cases reviewed:** 0 (no real cases yet — Analyst will populate `reel-cases/`.)

### Confirmed patterns (keep doing)

- (Populated after first Librarian run over real cases.)

### Anti-patterns (stop / watch)

- (Populated after first Librarian run.)

### Open questions (need more data)

- Which archetype rows correlate with lowest skip for Devi after N≥10 cases?

### Retrieve tags (for Iris grep)

`editorial`, `viral`, `hook`, `payoff`, `share-trigger`, `follow-conversion`, `trial`, `operator-taste`, `kill-mechanism`, `mutate-mechanism`, `repeat-mechanism`

---

## 2026-06-01 — Operator taste score system (PERSIST)

**Source:** Operator (Ortal), 2026-06-01 — Iris internal taste calibration.  
**Canon:** **`brain/devi-operator-taste-score.md`** · JSON template **`brain/memory/taste-scores/TEMPLATE.taste-score.json`** · index **`brain/memory/facts/taste-scores-index.json`**

### The rule

After Ortal scores a reel (Hook, Visual weirdness, Devi/Iris personality, Shareability, Cringe, Verdict), Iris **must** answer: (1) what did I misjudge? (2) what rule to update? (3) what to try differently next time? — then persist taste JSON.

### Verdict → pattern memory

| Verdict | Librarian / Iris action |
|---------|-------------------------|
| **kill mechanism** | Anti-pattern append |
| **repeat mechanism** | Confirmed pattern append |
| **mutate mechanism** | Open question + bisociation/execution mutate note |

**Pre-publish gate:** High cringe or kill verdict blocks Buffer until mutate/regen.

---

## 2026-06-01 — Bisociation: shared creative axis (PERSIST)

**Source:** Operator (Ortal), 2026-06-01 — upgrade bisociation rule.  
**Canon:** **`brain/devi-bisociation-reels-rule.md` §2b**

### Confirmed patterns (keep doing)

- **Matrix A + Matrix B + shared creative axis** — strongest collisions have semantic overlap with Devi (fashion → body → performance → object → artwork → icon), not random weird domains.
- **Four axis checks before Matrix B lock:** visual surprise · deep axis with Devi · frame-0 without text · icon behavior (not new dress only).
- **FIA "inspired by art" worked** because Met = fashion is art, Devi = fashion persona as icon/object, bridge = inspired by art — overlap + distance.

### Anti-patterns (stop)

- **Weird-for-weird Matrix B** — weak shared axis → random, creepy, or dead (elevator kill validates this).
- **Foreign domain needing explanation or text** — weak axis → Plaque-class failure.

### Retrieve tags (append)

`shared-creative-axis` `icon-behavior` `fia-inspired-by-art` `semantic-overlap`

---

## 2026-06-01 — Content creator collision logic (PERSIST)

**Source:** Operator (Ortal), 2026-06-01.  
**Canon:** **`brain/devi-bisociation-reels-rule.md` §2c**

### The rule (5 steps)

1. Cultural frame (Matrix A)  
2. Replace **one core element** with foreign domain  
3. **Keep original seriousness** — foreign element behaves like original role (model not joke)  
4. **Painfully simple bridge** (shared axis)  
5. **Image before caption**

### Confirmed patterns

- Element swap + earnest genre grammar beats whole-scene randomizer.
- Bridge in one parallel line (fashion is art → food is art) — not essay.

### Anti-patterns

- Foreign element plays **skit/meme** — breaks seriousness lock.
- Caption carries joke image failed to show.
- **Runway Devi default** — single-scene walk; see **`brain/devi-commercial-reel-grammar.md`**.

---

## 2026-06-01 — Commercial Devi grammar (PERSIST)

**Source:** Operator (Ortal), 2026-06-01.  
**Canon:** **`brain/devi-commercial-reel-grammar.md`**

### Confirmed patterns (keep doing)

- Commercial default: luxury ad / beauty film — 4–6 beats, hook + transform/reveal, object interaction.
- Pre-gen test: if removing walking kills the concept → reject brief.

### Anti-patterns (stop)

- Single-scene forward walk as main mechanism; catwalk / model-walk-only prompts.
- Approving output describable as "Devi walking in a place."

### Retrieve tags (append)

`commercial-devi` `not-runway` `beat-map` `commercial-grammar`

---

## 2026-06-01 — Flash-swap mechanism (PERSIST — operator taste T3 v5)

**Source:** Operator taste score · asset `m-fia-parody-t3-limo-flash` (v5 art-forward)  
**Scores:** Hook 3 · Weirdness 1 · Personality 4 · Shareability 4 · Cringe **low** · Verdict **repeat mechanism**  
**Canon:** **`brain/devi-flash-swap-mechanism.md`**

### Confirmed patterns (keep doing)

- **Light-is-art** bisociation for T3 / exposure editorial — art read landed; personality + shareability strong; low cringe.
- **Commercial stitch** (detail → MS → WS) with Devi active micro-beats, not runway walk.

### Mutate execution (next regen — v6)

- **Flash = editorial cut, not shimmer texture.** Each strobe changes **ONE** dimension only: **outfit color** OR **scene/view** OR **outfit silhouette** — never all three in one flash.
- **Devi does something** during the flash rhythm (pivot, clutch, chin) — not static light-painting hold.
- **Frame-0:** first flash must already show the swap grammar (fixes low visual weirdness).

### Anti-patterns (stop)

- Static gold brushstrokes on sequins with no per-beat swap — reads pretty, not viral-weird.
- Cumulative sparkle without discrete before/after per flash.

### Retrieve tags (append)

`flash-swap` `one-dimension-per-flash` `light-is-art` `repeat-mechanism` `t3-limo-flash-v5`

---

## 2026-06-01 — Scene-flash batch ×30 (PERSIST — operator taste T3 v8)

**Source:** Operator taste · `m-fia-parody-t3-limo-flash` v8  
**Scores:** Hook 1 · Weirdness 1 · Personality 3 · Shareability **5** · Cringe low · Verdict **repeat mechanism**  
**Brief:** **`contenty/briefs/fia-scene-flash-batch-30-2026-06-brief.md`** · batch `exp-2026-fia-scene-flash-batch-v1`

### Confirmed patterns (keep doing)

- **Scene-flash ON THE GO** — fast environment jumps while Devi moves (road → market → coffee booth pattern scales).
- **Shareability-led batch** — operator loves sendable scene jumps; scale to 30 for Buffer IG + Facebook.
- **3-seg stitch** · scene dimension only · same glam per reel.

### Pilot note

- Hook still 1 — tighten seg A / mid-stride start on slots 02–05 before full batch gen.

### Retrieve tags (append)

`exp-2026-fia-scene-flash-batch-v1` `batch-30` `scene-flash-on-the-go` `shareability-5`

---  
**Scores:** Hook 1 · Weirdness 5 · Personality 1 · Shareability 1 · Cringe **high** · Verdict **kill mechanism**  
**Note:** "creepy ass shit"

### Anti-patterns (stop)

- **Service elevator + mirror trap as Devi glam set** — brass cage, amber enclosed light, reflection hold reads **creepy/uncanny**, not tired-glam icon. Do not reuse for arm-P T3 or similar intimate parody.
- **High visual weirdness without Devi personality read** — if weirdness scores 4–5 but personality/hook/shareability are 1, the mechanism is horror-adjacent slop, not commercial parody. Reject before gen or regen with open space + active motion.
- **Confined mirror compositions without anti-creepy gate** — require bright/playful mood check (T1 v3 dark-corridor lesson extended): no static stare in metal box.

### Open questions (need more data)

- What Matrix B replaces elevator for T3 while keeping hook-lane E + amber warm row in batch matrix?
- **T3 limo-flash mutate:** Does v2 without MCU push-in fix face drift while keeping mechanism? (Ortal: close-up face uglier/changes)

### Mutate notes (operator taste — persist when regen)

- **Limo × flash rhythm (arm-P):** Mechanism **keep** — open exit beats elevator kill. **Mutate execution:** ban Kling MCU/ECU face push on parody arm-P; hold MS/WS; repeat beauty block every mark; regen still without fallback before i2v.

### Retrieve tags (append)

`kill-mechanism` `uncanny-creepy` `elevator-mirror` `t3-afterparty` `operator-taste`

---

## 2026-05-08 — Operator curator rule: **Concept-first, WOW-effect, no model-walk** (PERSIST)

**Source:** Operator (Ortal), 2026-05-08 chat after Met Gala 2026 Event Scout report.
**Trigger:** Operator wants Devi reels to be **viral, relatable, funny, surreal, surprising** — not just "Devi walks the carpet in a pretty dress."
**Status:** Hard rule. Applies to **Event Scout**, **Viraly**, **Motion**, **Contenty**, and Iris orchestration **before** any reel brief is approved.

### The rule (verbatim intent)

> When investigating an event for Devi content, the **editorial fashion concept is more important than the carpet itself**. The concept is what's viral and shareable. Find the **twist** — hilarious, surreal, unexpected — so people relate to Devi's posts.
>
> **Do not** make Devi "walk like a shitty model." Boring runway/model walks are forbidden as a default.
>
> Devi reels should be **realistic with an AI touch into them** — something no one expected. The **WOW effect is critical**: WOW can be unexpected-funny, unexpected-surreal, unexpected-payoff. Devi looks realistic — that's the strength — but the *twist* is where the AI medium gets to do something a human couldn't.

### Confirmed patterns (keep doing)

- **Concept first, costume second.** Event Scout / Viraly must lead with the **editorial concept** of the event (the artistic throughline, the cultural meaning, the joke the internet is already telling) — *then* derive Devi's outfit/motion. Never start with "what should she wear."
- **Hunt the twist.** Every brief must include a **WOW twist hypothesis** — one of: *funny, surreal, unexpected payoff, AI-only impossible move, scale flip, role flip, reaction flip, prop hero, broken-fourth-wall*.
- **Realistic + AI touch.** The composite that performs is **photoreal Devi** + a moment **only AI can do** (an object morphs, scale breaks, a sculpture turns its head, the dress paints itself, a Magritte sky inside the gallery). Devi's identity stays locked; the *world* does the unexpected.
- **Relatability beats glamour.** A funny/relatable beat (Devi reacts to the chaos, breaks character, drops a one-liner gesture) outperforms pure glamour silence.
- **Caption + visual must align with the concept twist** — caption-writer should tease/pay-off the twist, not describe the dress.

### Anti-patterns (stop)

- **"Devi walks slowly down the red carpet."** Banned as the default motion. Boring, indistinguishable, low-share. Must always be paired with a twist beat.
- **Generic "model walk," "elegant stride," "confident slow pivot"** as the *only* motion in the prompt — these read as stock and skip-rate kills.
- **Carpet-recap reels** that just translate "what celebs wore" into "Devi wore similar." Low-uniqueness, high competition, zero share trigger.
- **Pretty + silent** reels with no editorial concept and no twist — "she looks gorgeous" is not a hook.
- **Surreal-without-anchor.** Random surrealism without a cultural-moment hook (event concept, internet joke, art reference) reads as gibberish.

### How Event Scout must change (next run)

1. Add a **§ Editorial Concept** section to every event report — *what is this event editorially about, beyond the dress code?*
2. Add a **§ Twist hypotheses (5)** section per top-pick event — five candidate WOW twists Devi can ride (funny/surreal/AI-only/relatable/scale-flip).
3. Score each event not only on cultural weight but on **twist potential** (1–10): can Devi do something WOW here that nobody else can?
4. Hand-off to Iris must include the **best twist** + 2 alternates, not just the event.

### How Motion must change (next run)

1. **Banned default openings:** "She walks slowly down…", "She walks confidently in her gown…", "She turns slowly in the wind…" as the *only* beat. These need a paired twist.
2. **Every Kling prompt** must specify a **WOW micro-beat** — what moment makes the viewer go *wait, what?* (e.g. the marble statue blinks, her shadow doesn't match, the gallery painting moves with her, a museum guard walks by deadpan, the dress unfolds into a frame, she steps *into* a painting, her reflection is wearing a different outfit, the chandelier reacts to her pace).
3. Realistic Devi + **one impossible AI moment** = the formula. Persona-control + motion-intelligence still apply.
4. Caption-writer must reflect the twist, not describe the dress.

### How Iris must change

- **Before approving any reel brief:** verify the brief has (a) a clear **editorial concept**, (b) a named **WOW twist**, and (c) a Devi role beyond "model walking." If missing, kick back to Event Scout / Viraly.
- **Add a fork** in the Iris session menu when concept is unclear: *"Editorial-concept-first or carpet-recap? Recap is banned as a default — should we find the twist?"*
- **Reel-cases (Analyst)** should tag concept type, twist type, AI-only beat type — so Librarian can later confirm which twist categories actually drive shares/follows.

### Retrieve tags (for Iris grep)

`concept-first` `wow-effect` `twist` `surreal` `funny` `relatable` `ai-only-beat` `no-model-walk` `editorial-concept` `share-trigger`

### Why this matters (operator reasoning persisted)

- Devi's photorealism is now table stakes. The differentiator is **editorial concept + AI-only twist**.
- People share what makes them laugh, gasp, or relate. They don't share "pretty AI girl walking."
- The Met Gala 2026 carpet itself proved the point: the most-shared looks were the ones with a *concept* (Klum's marble illusion, Cardi B's Bellmer dolls, Chase Infiniti's trompe-l'oeil Venus) — not the ones with a "pretty walk."

---

## 2026-05-08 — Operator curator rule: **Try-on with minor changes (copyright-safe)** — SUPERSEDED by canonical guardrails

> **⚠️ This rule was superseded the same day by the canonical doc:**
> **`brain/devi-fashion-tryon-legal-creative-guardrails.md`** (operator full legal/creative spec, 2026-05-08 PM).
>
> Stricter requirements there: **4-axis minimum** (was 2), formal similarity check, banned/safe caption lists, Safe Prompt Template to append verbatim, explicit logo/monogram negative-prompt rule.
>
> **Read the canonical doc first.** This morning section is preserved below for context only.

**Source:** Operator (Ortal), 2026-05-08, immediately after the concept-first rule above.
**Trigger:** Operator clarified the active Met Gala workstream (`current-focus.md` #21, formerly "reversed Met") — it should not be a *reverse-engineered 1:1 recreation* of celeb looks. It should be a **Devi try-on** of the *recognizable* look, with **minor changes** to avoid copyright/IP issues.
**Status:** Hard rule. Replaces the "reversed Met" framing for #21 and applies to **every** event-driven Devi reel going forward (Met, Cannes, Oscars, Grammys, VMAs, fashion weeks, every recognizable carpet look).

### The rule (verbatim intent)

> When Devi recreates a real celebrity carpet look, frame it as a **try-on** (Devi tries on the look) with **minor changes in the costume/dress so it doesn't have copyright issues**. The reference is recognizable; the execution is intentionally varied so it's not a 1:1 copy of the designer's work.

### What this means in practice

**Always do (try-on with minor changes):**
- Recognizable silhouette, vibe, and editorial reference — the viewer should *feel* the source
- **Shift one or two of:** color · neckline · sleeve · hemline · fabric texture · embellishment density · trim · accessory swap
- **Reframe the styling context** — different lighting, different pose family, different prop, different setting
- **No logos, no brand marks, no house monograms.** No "Margiela," "Saint Laurent," "Dior," "Chanel" written or printed anywhere
- **No designer names** in the prompt or in the caption (caption can name the *event*, not the *house*)
- **No 1:1 recreations** of famous original artworks owned by living artists — abstract the reference
- Keep all **Devi identity locks** (face, heterochromia eyes, pastel pink hair with yellow/blue streaks, soft loose waves, gold hoops default — see `devi-feed/met-gala-growth-next-session-2026-04.md` § 3)

**Never do:**
- ❌ "Devi wears [Designer]'s [Year] [Look]" — direct designer attribution in any prompt or caption
- ❌ Exact color + silhouette + embellishment match to a single living-designer original
- ❌ Reproduce a living artist's specific painting/sculpture exactly (Klimt 1907 is fine — public domain; living surrealist's signature work is not)
- ❌ "Same as [celebrity name]'s Met dress" copy phrasing — already in `devi-feed/met-gala-growth-next-session-2026-04.md` § 4

### Minor-change menu (pick at least 2 per reel)

| Change axis | Example |
|-------------|---------|
| **Color shift** | Bronze → silver, Yves Klein blue → cobalt, jet black → deep aubergine |
| **Silhouette tweak** | Floor-length → tea-length · mermaid → A-line · column → trumpet · halter → off-shoulder |
| **Neckline/sleeve** | Strapless → single-strap (Sargent-coded) · long sleeve → 3/4 · plunge → modest V |
| **Material shift** | Sequins → matte beadwork · velvet → silk faille · feathers → fringe · 24K gold → brushed gold-tone |
| **Embellishment density** | Heavy crystal → scattered crystal · all-over print → corseted print · full beading → bodice-only beading |
| **Accessory swap** | Designer bag → simple clutch · house heels → unbranded sandals · branded gloves → plain opera gloves |
| **Setting/lighting** | Met steps → museum interior · paparazzi flash → gallery chiaroscuro · daylight → blue-hour |

**Two-axis-minimum rule:** every Devi try-on must shift at least **two** of the above versus the source — anything less is too close to copy.

### Combine with concept-first / WOW twist (compounding rules)

The previous rule (concept-first, WOW-effect, no model-walk) **still applies on top**. The full pipeline for a Devi event try-on is:

1. **Editorial concept** of the event (Event Scout) — what the carpet was *about*
2. **Pick a recognizable reference look** (1–2 carpet standouts) — e.g. Klum's marble Vestal, Rihanna's bronze cathedral, Klimt-coded gold mosaic
3. **Apply minor-change menu** (2+ axes) — variant that's recognizable but not copy
4. **Add the WOW twist** (funny/surreal/AI-only/role-flip/scale-flip/prop-hero/reaction-flip) — the viewer go-*wait-what* moment
5. **No designer/house names anywhere** in prompt or caption
6. **Keep Devi identity locks** intact

### How this changes #21 (the active Met workstream)

The folder name `buffer-reels-met-gala-reversed-2026-05/` and existing brief stay for now (already on disk), but **the framing pivots from "reverse-engineered" to "try-on with minor changes + WOW twist."** Concretely:

- **r01–r10** (already approved by operator) — stay. Operator already approved these under the older approach.
- **r11+ (next batch)** — must comply with this rule + the concept-first/WOW rule. Each reel needs (a) a named editorial reference look from the actual May 4 carpet, (b) at least 2 minor-change axes shifted, (c) one WOW twist, (d) no designer names, (e) Devi identity locks honored.
- The handoff doc `contenty/briefs/reversed-outfits-met-gala-40-total-codex-handoff-2026-05-06.md` is now **legacy framing** — read it for context but follow `brain/learning-patterns.md` (this section + the 7:22 rule) for r11+.

### Retrieve tags (for Iris grep)

`try-on` `tryon` `minor-changes` `copyright-safe` `no-designer-names` `recognizable-not-copy` `two-axis-shift` `event-recreation`

### Why this matters (operator reasoning persisted)

- **IP exposure is real.** Copying a designer look 1:1 — even on an AI model — invites takedowns, account flags, and reputational risk.
- **Recognition + variation = the algorithm sweet spot.** Viewers love "I know exactly what this is *referencing*" — they share variants, they ignore copies.
- **Devi's value is the variation.** A 1:1 recreation has zero authorial fingerprint. A clever variation *is* Devi's editorial voice.

---

## 2026-05-08 — Operator curator rule: **Fashion Try-On Legal & Creative Guardrails (canonical)** (PERSIST)

**Source:** Operator (Ortal), 2026-05-08 — three hardening passes the same day (PM #1 13:15 · PM #2 13:22 · PM #3 13:27).
**Status:** **Hard rule. Single source of truth.** Supersedes all morning + PM #1 + PM #2 framings.
**Canonical doc:** **`brain/devi-fashion-tryon-legal-creative-guardrails.md`** — read in full before any try-on still / reel / brief / caption is generated. Always read the latest version.

### Evolution of the rule across 2026-05-08

| Version | Time | Min axes | Menu size | Signature framework | Similarity Q | Pre-flight gates | Artist-respect / stand-alone | Architectural rule |
|---------|------|---------|-----------|---------------------|--------------|------------------|------------------------------|--------------------|
| AM | 07:30 | 2 | 7 | none | 4 | informal | implicit | none |
| PM #1 | 13:15 | 4 | 9 | none | 4 | 10 | implicit | none |
| PM #2 | 13:22 | 5 | 11 | yes | 5 | 12 | implicit | none |
| PM #3 | 13:27 | 5 | 11 | yes | 7 | 16 | explicit | none |
| **PM #4 (current)** | **14:00** | **5** | **11** | **yes** | **7** | **18** | **explicit** | **banned visual inputs + image-input allow-list + inspiration-well canon** |

### PM #4 trigger — the `tryon-met-r01..r06` failure case

**What happened:** On 2026-05-08 AM, a batch of 6 try-on Met reels was generated. The brief (`contenty/met-gala-try-on-2026-05/reference-map.json`) included structured fields per row: `signatureElements`, `transformTargets`, `forbiddenFingerprints`. For r01 the brief explicitly forbade *black floral lace over nude illusion* / *cobalt train* / *padded chest cluster* / *padded hem ring* / *bodycon catsuit*. **The output kept all five.** All 6 reels came out as near 1:1 carpet copies (Cardi B / Beyoncé / Mugler / floral couture / Schiaparelli / sheer-cape lineage).

**Root cause:** The reference-map had `outfitImageUrl` pointing at celebrity carpet photos (ynet-pic1.yit.co.il, hips.hearstapps.com), passed as `image_input` to nano-banana. **Visual signal dominates text-based transform discipline.** Text-only "do not keep X" instructions cannot overpower a celeb carpet photo handed to the image model.

**Operator audit (2026-05-08 PM):** Operator personally reviewed `tryon-met-r01.jpg` and confirmed it was "a total copy." Iris ran visual audit on r02–r06 and confirmed the same pattern.

**Fix (PM #4):** Banned visual inputs architectural rule + inspiration-well canon. The 6 reels are quarantined (do-not-publish). r11+ regen requires PM #4 architecture.

### PM #2 + PM #3 + PM #4 hardening (current)

1. **Signature Element framework** (PM #2). Identify 3–7 signature elements from the source; preserve ≤ 2; replace the rest. Regenerate if instantly recognizable.
2. **5-of-11 mandatory transformation** (PM #2). Change at least 5 of: silhouette · neckline · sleeve/shoulder construction · hem structure · fabric type · surface pattern · color palette · train style · waist detail · embellishment logic · transparency level. Brief must include explicit source-vs-Devi transform table covering all 11 axes.
3. **Artist-respect & emotional-direction-only principle** (PM #3). Use the reference **only** to understand the emotional family (*surreal · theatrical · couture · red-carpet · dramatic · funny · exaggerated*). Goal is **homage-level inspiration, not imitation.** Devi's version must have a **different silhouette · different focal points · different textile language · different embellishment logic · different color story**. The output must **trigger the same emotional reaction through a different look** — *make people laugh for the same reason, not because it looks like the same dress.*
4. **Stand-alone test** (PM #3). Could Devi's gown stand alone as her own fashion concept — no reference image attached, no source designer named, no inside knowledge that it's "inspired by [X]"? If no → revise.
5. **7-question similarity check** (PM #3). Adds same-emotional-reason test + stand-alone test to the previous 5.
6. **18-gate Iris pre-flight** (PM #4). Adds 6 gates over PM #1's 10: emotional direction named · 5 different-axes named · same-emotional-reason hypothesis · stand-alone test passed · **no banned visual inputs** · **inspiration sources from the well**.
7. **Architectural rule — banned visual inputs** (PM #4). Never pass celebrity / designer / paparazzi photos as `image_input` / `start_image` / `reference_image`. Allow-list: Devi identity · Wikimedia · NASA · Smithsonian Open Access · Unsplash CC0 · LOC · repo-controlled paths. Banned domain patterns: Conde Nast, Hearst, Getty, paparazzi syndication, news tabloids, ynet, designer sites. Generator scripts must validate URLs and fail closed.
8. **Inspiration-well canon** (PM #4). Companion doc `brain/devi-inspiration-sources-canon.md` — public-domain art history (Tier 1) · architecture (Tier 2) · nature (Tier 3) · aesthetic vocabularies (Tier 4) · material/process (Tier 5) · public-domain literature/myth (Tier 6) · Devi's own canon (Tier 7).
9. **Reference-map structure switch** (PM #4). Replace `outfitImageUrl: <celeb photo>` with `inspirationWellSources: [allow-listed URLs]` + text-only `emotionalDirection` / `moodDescriptors` / `signatureElementsToAvoid`.

### Iris pre-flight checklist (every try-on, 18 gates — current)

editorial concept · **no banned visual inputs (URLs validated against allow-list)** · **inspiration sources from the well (per `brain/devi-inspiration-sources-canon.md`)** · broad-inspiration-only · emotional direction named (surreal/theatrical/couture/red-carpet/dramatic/funny/exaggerated) · signature elements listed (3–7) · ≤ 2 signature elements preserved · 5+ of 11 axes transformed (with explicit source-vs-Devi table) · 5 different-axes named (silhouette · focal points · textile language · embellishment logic · color story) · same-emotional-reason hypothesis stated · stand-alone test passed · no designer/celeb/brand/event names in prompt · no logos/monograms in negative prompt · Safe Prompt Template appended · WOW twist named · safe caption vocabulary · Devi identity locks intact · 7-question Similarity Check passed.

If **any** gate fails → kick back to upstream agent. Do not approve, do not schedule.

### Banned captions (do not use)

`same dress` · `exact replica` · `Met Gala dress` · `worn by [celebrity]` · `designer-inspired by [brand]` · any designer/house/brand name · any event-name + dress in same line.

### Safe captions (use)

`red-carpet energy` · `couture-inspired` · `AI fashion fantasy` · `high-drama gala look` · `Devi's version`.

### Affected workstreams

- **#21 Met Gala try-on (40 reels)** — r01–r10 stay; r11+ requires script patch (7 items now, not 5) + full canonical-doc compliance including signature-element framework + source-vs-Devi transform table per row.
- **All future event try-ons** (Cannes, Oscars, Grammys, VMAs, fashion weeks) — gates apply from day 1.

### Retrieve tags (for Iris grep)

`legal-guardrails` `tryon-legal` `copyright-safe` `5-axis` `5-of-11` `signature-elements` `signature-element-framework` `similarity-check` `safe-prompt-template` `banned-captions` `safe-captions` `no-designer-names` `no-logos` `inspired-not-identical` `devi-version` `red-carpet-energy` `transform-table` `artist-respect` `homage-not-imitation` `emotional-direction-only` `same-emotional-reason` `stand-alone-test` `laugh-for-the-same-reason`

### Why this matters (operator reasoning persisted)

- **IP exposure is now an explicit operator priority.** The afternoon spec converts that into sixteen enforceable gates (not vibes).
- **Signature elements are the actual lawsuit risk.** A 5-axis change that still keeps Beyoncé's skeletal beadwork or Klum's marble illusion is still recognizable — the signature framework forces the agent to design *out* the recognizable features, not just tweak around them.
- **PM #3's stand-alone test is the philosophical guard.** Mechanical axis-counting can still produce a derivative look that screams "shortcut version of [Designer]." The stand-alone test asks: *if you stripped the source attribution, would this gown still read as a Devi original?* That's the test for actual artistic respect.
- **PM #3's "same emotional reason, different look" is the comedy/share guard.** Cardi B's Bellmer dress is funny *because* of surrealist proportional play. Devi can be funny for the same reason without copying the gown — by inventing her own visual joke in the same emotional family. That's what makes it shareable rather than a knock-off.
- **Caption Writer + Motion + Contenty + Devi-Tryon all need the same checklist.** Without explicit lists, agents drift back to "Met Gala dress" / "worn by [name]" phrasing.
- **The Safe Prompt Template** is the cheapest enforcement — appending it to every nano-banana / VTON call costs nothing and produces materially different (and safer) output.
- **The source-vs-Devi transform table** turns "trust the agent" into a reviewable artifact — Iris can see, per row, which 5+ axes were transformed before approving.

---

## 2026-05-10 — Operator curator rule: **Iris BTS pack rules — five durable rules for reaction packs** (PERSIST)

**Source:** Operator session 2026-05-09 PM → 2026-05-10 PM. Five drift fixes on the Met Gala 2026 "Fashion is Art" Iris BTS pack produced five rules that generalize to every future BTS reaction pack.

**Canonical doc (read this — do not duplicate it here):** `brain/iris-bts-pack-rules-canon.md` (event-agnostic; companion to `brain/replicate-prompt-safety-canon.md` and `brain/devi-fashion-is-art-workflow-canon.md`).

**The five rules in one line each:**

1. **Same-scene visual rule** — Iris is in-frame with Devi, same set/lighting/world; never control room or behind a monitor.
2. **Reaction-pack tone rule** — script is exactly two pack-JSON lines; generator's `-ReactionPackMode` switch disables intro/CTA/word-floor padders.
3. **Replicate prompt-safety + submission-path** — clean positive prompt + separate `negative_prompt` file + curl-via-temp-file submission via `Start-ReplicatePrediction` (UTF-8 no BOM). See `brain/replicate-prompt-safety-canon.md`.
4. **Lipsync architecture / Iris-only plates** — Devi silent by default; lipsync runs on Iris-only video plates so face-detection cannot auto-target Devi's mouth.
5. **Devi-visible source-frame rule** — every BTS still starts from a source-MP4 frame where Devi is clearly visible (waist-up min); imagegen composites Iris into that frame; reject crowd-only / empty-set frames.

### Librarian candidate patterns (event-agnostic, all five generalize)

> *In multi-character reel packs, the speaker assignment must be a top-level pack rule, not a per-reel decision. Face-detection lipsync silently auto-targets the dominant face — "default silent for non-speaking characters" must be explicit at the pack level so wrappers / helpers can enforce per-character video plates without re-deriving intent each time.*

> *Source-frame extraction for BTS / reaction packs must enforce subject visibility at the pack level. Without this rule, generators pick visually convenient frames that omit the protagonist, forcing imagegen to invent the subject and breaking identity-lock.*

> *Same-scene visual continuity for reaction reels must specify "in-frame with subject," not "behind the scenes." Without that anchor, generators default to genre conventions (control rooms, monitors, adjacent platforms).*

> *Reaction-pack scripts must come from the pack lines verbatim. Generators with hardcoded intro / CTA / word-floor templates will always wrap brief content in template bloat. Mode-switch flags that disable the templates and **require** overrides are the only durable fix.*

> *When two independent root causes stack, fixing only one looks like "the fix didn't work." Before abandoning a fix, ask: are there two independent causes? Test minimal-valid-input via direct curl to separate content-failure from environment-failure in 30 seconds.*

> *Code-level fixes (helper functions in `tools/`) are MORE durable than prompt-content fixes (wrapper text cleanup in `contenty/`) because they live in tracked files and survive across environments.*

> *Lipsync models are face-detection-based and auto-target the dominant face. Same-scene + lipsync is a contradiction unless you split shots. Decide the lipsync architecture BEFORE the corrective directive.*

> *Still creation and motion creation are different jobs and should run on different models. The composite still where two characters share the frame must be produced by a dedicated imagegen tool (nano-banana / image-to-image with image_input refs), not by a motion / video / lipsync model. Hard-separating the pipeline (ffmpeg frame → imagegen still → save → motion on top) prevents agents from collapsing the two steps into a single video-model call.*

### Affected workstreams

- **Iris BTS Met Gala "Fashion is Art" pack** (`contenty/briefs/iris-bts-met-gala-fashion-is-art-2026-05-09-pack.json`) — fully wired with all five rules.
- **All future Iris BTS reaction packs** (Cannes, Oscars, Grammys, VMAs, fashion week, designer drops) — gates apply from day 1 via `brain/iris-bts-pack-rules-canon.md` checklist.
- **Devi main packs that call Replicate** — Rule 3 (prompt-safety + submission-path) applies even outside BTS via `brain/replicate-prompt-safety-canon.md`.

### Retrieve tags (for Iris grep)

`bts-pack-rules` `iris-bts` `reaction-pack` `same-scene` `reaction-pack-tone` `replicate-prompt-safety` `submission-path` `lipsync-architecture` `iris-only-plates` `devi-silent` `devi-visible-frame` `source-frame-extraction` `multi-character-lipsync` `mode-switch-required-overrides` `librarian-candidate-pattern` `drift-fix-ledger`

### Why this matters (operator reasoning persisted)

- **Five drift fixes in 36 hours is a signal that the rules belong at the pack-canon layer, not in chat.** Any future BTS pack will hit the same drifts unless the rules are durable in the repo.
- **The fourth and fifth fixes (lipsync + Devi-visible frame) only became visible when the first three were resolved.** Once same-scene + tone + Replicate API stopped failing, the architectural failures surfaced. Future packs benefit from inheriting all five at once instead of re-discovering them in sequence.
- **Pack-level rules > per-reel rules.** Anything wired into the pack JSON's top-level fields (with a propagation in `complianceLocks`) cannot be silently dropped by a wrapper or generator that doesn't read every reel object. This is how multi-character lipsync architecture stays correct across 6 / 12 / 40 reels.

---

## 2026-05-31 — Pattern refresh (Librarian / Analyst)

**Cases reviewed:** 4  
**Window:** 2026-05-31 pack audit + r27 / r37 / r04 reel postmortems  
**Sources:** `brain/reel-cases/2026-05-31-*.case.json` · Edits ADB audit § Weekly Audit 2026-05-31 · Buffer schedule caption evidence

### Confirmed patterns (keep doing)

- **Cadence + cultural window lifts distribution** even when individual reels skip badly — Met FIA queue correlated with **+345%** 30d reel views vs Apr 2021 audit (657 → 2922); keep Buffer reliability and event timing.
- **Material / object clarity in frame 0** is the best predictor within the FIA batch — *Gold-plated anatomy* (37 views, **5/10** skip) beat mood/tableau siblings (5–11 views, **7–10/10**); gold/body/contrast reads faster than blue-period gallery mood.
- **Three-word manifest captions are correct** — problem is downstream schedule layer appending explainer paragraphs; fix ops gate, not copy strategy.
- **Net followers can flip positive (+16)** while likes stay thin (20 on ~2.9K views) — reach→follow path exists; likes need star-moment / prop / peak-motion grammar per `brain/hook-templates-devi.md`.

### Anti-patterns (stop / watch)

- **`caption-bloat` (HARD):** Any feed caption containing `Inspired by`, `created to let`, or art-history explainer after the hook line. Evidence: live Edits text + `buffer-schedule-results-2026-05-15-20-missing-reels.json`. **Stop** at Buffer/Publisher; art context → pinned comment or Story only.
- **`hook-wow-tension`:** WOW canon STAGE-1 classical setup (~1.5–2s) without hook-first open reproduces **7–10/10** skip badges on FIA batch; **watch** every multi-stage brief — open in medias res (STAGE 3–4) or add lane F/G frame 0.
- **Tableau / seated authority cold opens** (*Sit. Stay. Slay.* **10/10**) — same failure family as *Silent. Desert. Power.*; banned unless payoff hits ≤2s with peak motion.
- **Scaling new archetype without Trial / 72h skip gate** — do not queue Batch 4+ until at least one regen clears **≤6/10** badge.
- **Museum-label tone in copy** — weakens parasocial pull and like rate; captions confirm feeling, never curate.

### Open questions (need more data)

- Does **caption-only fix** (strip explainer, same video) move skip badge at 72h, or is **re-cut hook** required? (Trial on r37 recommended.)
- Full-library skip-rate rank for all 46 FIA reels after 14d — first-screen Edits capture only.
- Whether **hashtag stack** (6 tags) materially hurts vs caption bloat alone.

### Retrieve tags (for Iris grep)

`caption-bloat` `hook-wow-tension` `wow-multi-stage` `concept-first` `fashion-is-art` `met-gala` `skip-badge` `hook-first-wow` `buffer-api` `trial-candidate` `positive-contrast` `audience-memory` `cross-event` `mobile-first`

### Cross-event transfer (2026-05-31)

FIA lessons apply to **all** future events — load `brain/devi-audience-creative-memory-canon.md` + `event-lessons-index.json` before any new pack. Transfers: layer-split, frame-0 hook, one-line captions, interleave proven hooks, object > tableau.

### Iris pre-flight (before next FIA batch / Buffer schedule)

1. Read **`brain/iris-content-digestion-canon.md`** — layer-split audit; metric read order; stack trace if caption mismatch.
2. Grep `caption-bloat` + `hook-wow-tension` in cases and read this section.
2. Reject Buffer payload via **`scripts/Test-DeviFeedCaption.ps1`** / `brain/devi-caption-publish-gate-canon.md` (banned: `/Inspired by|created to let/i`, second paragraph, >12 words).
3. Verify motion brief: frame **0–1s** = face OR object OR peak motion (hook-templates v2).
4. Require **≤6/10** skip or Trial pass before scheduling next mixed batch slot.

---

## 2026-05-31 — arm-P parody pose refresh

**Case:** `brain/reel-cases/2026-05-31-fia-parody-t1-security-robotic-pose.case.json`  
**Skills:** `.cursor/skills/devi-visual-parody-craft/` · `.cursor/skills/devi-commercial-model-pose/`

### Confirmed

- **Parody needs two frames** (genre + violation) resolved in head — theory skill documents incongruity-resolution, image-text pairing, deadpan earnest.
- **Deadpan ≠ robotic:** L2 restrained luxe expression + contrapposto + prop-hand asymmetry. Symmetric arms-at-sides + blank stare kills Frame A (luxury spot) before joke lands.

### Anti-patterns

- **`deadpan-misread`:** Prompting "cold deadpan" without pose block → mannequin output.
- **`symmetric-soldier`:** Full-front, both arms down, dead-center corridor — AI tell; reject at QA.

### Pre-flight (arm-P gen)

1. `/devi-visual-parody-craft` — Frame A/B + blend line  
2. `/devi-commercial-model-pose` — pose output block in brief + still prompt  
3. Negative: mannequin, symmetric soldier, blank stare  
4. T1 regen: `still-prompt-v2.txt` + `motion-prompt-v2.txt`

### Retrieve tags

`visual-parody` `anti-robotic` `deadpan-misread` `commercial-model-pose` `arm-P` `pose-failure`

---

## 2026-06-01 — Ortal LinkedIn Agentic Era (diss the takeout)

**Lane:** Ortal LinkedIn (not Devi IG). **Canon:** `brain/ortal-linkedin-agentic-era-canon.md`

### Confirmed (Ortal voice)

- **Diss the takeout** beats victory-lap agent posts — invite specific roasts in comments; dual loop (operator + Iris) without exposing methodology.
- Frame Iris as **creative taste recommender** (generates data, digests hybrid memory, recommends takeouts) — not "unlimited AI creativity" or OPS-framework lists.
- **Creator LinkedIn voice** (story, humility, one clear CTA) — rejected: generic BUILD/WORKFLOW spam, consultant tone, repeated bullet systems.

### Retrieve tags (Ortal lane)

`ortal-linkedin` `agentic-era` `diss-takeout` `iris-showcase` `growth-agents`

---

## 2026-06-02 — FIA scene-morph v2 (ballet-art + Vogue jump-land)

**Operator verdict:** NAILED IT — repeat mechanisms. **Menu:** `brain/devi-repeat-mechanisms-menu.md`

### Confirmed patterns

- **Bisociation + mechanism:** FIA art lane (Matrix A: Fashion is Art / PD art process) + ballet or Vogue leap grammar (Matrix B) on shared icon/object axis — operator: "finally got bisociated."
- **dance-morph v2:** Ballet-art in place (port de bras, arabesque) + **0.5s crossfade** stitch + art-history scenes — NOT club/tiktok dance.
- **jump-land v2:** Launch from **height** (rooftop, plane, balcony, mezzanine) + land **surprised AND happy** + **0.12s snap** — NOT mundane crosswalk/subway (v1 dead).
- **Buffer delivery:** Versioned filenames (`*-v2-balletart`, `*-v2-jumpland`) after creative pivot — same filename = cache/duplicate queue trap.

### Anti-patterns

- **`generic-pop-dance`:** Shoulder roll / hip sway without ballet-art vocabulary → reject for dance-morph lane.
- **`scared-land`:** Horror/panic landing — operator wants chic Vogue delight.
- **`buffer-filename-reuse`:** Re-scheduling same mp4 name after regen.

### Retrieve tags

`dance-morph-v2` `jump-land-v2` `fia-art-lane` `bisociation-nailed` `repeat-mechanisms` `ballet-art` `vogue-jump`

---

## 2026-06-02 — Ortal LinkedIn Bisociation eleven (Iris showcase)

**Lane:** Ortal LinkedIn native video. **Canon:** `brain/ortal-linkedin-bisociation-operations-canon.md` · session `brain/memory/session-summaries/2026-06-02-ortal-bisociation-eleven-buffer.md`

### Confirmed (Ortal voice)

- **Bisociation story arc** beats generic agent hype: batch spike → ask Iris → name Koestler → show clips where collision reads in frame → FIELD CTA for collision domains.
- **Human LinkedIn prose:** short paragraphs, **no em dashes**, Koestler + Iris/Devi reveal every post, `Post X of 11` series marker.
- **Operator locks reels by art caption** (FIA 46 + scene-morph v2), not only internal collision tier lists.
- **Schedule chain:** start day after prior Ortal series ends (Agentic Era Jun 8 → Bisociation Jun 9–19), one post/day 19:00 UTC.

### Anti-patterns

- **`linkedin-robotic-emdash`:** em-dash heavy copy reads like AI consultant spam — reject before Buffer.
- **`buffer-404-no-push`:** scheduling before `git push` of `buffer-linkedin/reels/<series>/` → Buffer video URL 404.
- **`cross-series-reel-dup`:** reusing same FIA reel in two Ortal series without operator override (r21 in Agentic + Bisociation).
- **`ig-caption-paste`:** dumping `Inspired by…` IG manifest paragraphs into LinkedIn post body.

### Ops checklist (next Ortal video series)

1. Grep prior queue manifests for reel IDs.  
2. Stage + `git push` reels.  
3. `Schedule-OrtalBisociationCollisionsBuffer.ps1 -ManifestPath …` with `dueAtUtc`.  
4. Pin comments manual in Buffer.

### Retrieve tags

`ortal-linkedin` `bisociation-eleven` `FIELD-cta` `koestler` `iris-showcase` `scene-morph-v2` `no-emdash` `buffer-push-preflight`

---

## 2026-06-12 — Manychat #MyRealJob contest (PERSIST)

**Source:** Operator session — Times Square billboard contest · v5c approved submit.  
**Canon asset:** `devi-feed/buffer-reels-fia-scene-morph-contest-manychat-2026-06/m-manychat-myrealjob-v5c.mp4`  
**Taste score:** `brain/memory/taste-scores/2026-06-12-manychat-myrealjob-v5c.taste-score.json` · **repeat mechanism**

### Confirmed patterns (keep doing)

- **Compose on approved footage** — reuse operator sm-06 jump-land (fall/yacht/shore); do not regen Devi middle for contest variants.
- **Real click inserts** — generated nail-polish trackpad clips between beats; hard cuts, no black placeholders.
- **IG notification crawl overlays** — CapCut-style business hints (DM sent, scheduled) on yacht/shore beats.
- **Iris BTS café + smoke payoff** — `iris-bts-persona-primary` (not cozy reader ref); operator praised this ending.
- **Contest hook in video** — 💅 censor on NOT + sticker slide → IT'S A REAL JOB; caption confirms, does not re-storyboard.

### Anti-patterns (stop / watch)

- **`contest-typography-only`** — full-screen stacked type reels without Devi story (v1 killed).
- **`contest-regen-approved-middle`** — regen sm-06 segments when operator reel exists (v5 wrong).
- **`wrong-iris-persona-ref`** — `iris-character-primary.jpg` for BTS director beats.
- **`black-click-placeholder`** — never ship black frames between scenes.
- **`buffer-caption-gate-skip`** — multi-line caption before hashtags fails `Test-DeviFeedCaption`; contest posts still need one-line hook.
- **`schedule-before-caption-approval`** — do not queue contest/special posts with placeholder caption; operator picks caption first.
- **`buffer-404-no-push`** — `git push` `buffer-delivery/` mp4 before Buffer schedule; verify raw/jsDelivr 200.

### Caption vocabulary (contest)

- **Use:** real DMs, real schedules, real clicks, real operator, someone at the keyboard, Devi glam / Iris ops.
- **Avoid in feed caption:** super agent, hybrid memory, stack architecture (save for LinkedIn / pinned comment if needed).
- **Required tags:** `@Manychat` + `#MyRealJob` · open with **IT'S NOT A REAL JOB** in caption too.

### Submit checklist (next contest / one-off)

1. Operator approves final mp4 + **caption** (one line + hashtag block).  
2. Copy mp4 → `buffer-delivery/` · `git add -f` · push · verify HTTPS 200.  
3. Run `validate-manychat-contest-manifest-and-media.ps1` · `schedule-manychat-contest-buffer-reel.ps1`.  
4. After IG live → operator submits reel URL at [manychat.com/timessquare](https://manychat.com/timessquare).

### Retrieve tags

`manychat` `myrealjob` `contest` `compose-only` `iris-bts` `sm-06-reuse` `click-inserts` `caption-gate` `buffer-push-preflight`

---

*Next refresh: run Librarian when ≥3 new case files exist or at month-end. Append new `## YYYY-MM — Pattern refresh` blocks above this line; keep operator curator rule sections intact.*
