---
name: master-orchestrator-skill
description: Coordinate Ortal LinkedIn comic-series workflow (story seed, visual package, native post, editor guardrail, scheduling readiness). Does not replace sub-skills; decides order and when to reject or rewrite.
metadata:
  tags: linkedin, ortal, orchestrator, comic, pipeline, scheduling
---

# Master orchestrator skill

## Purpose

Coordinate the **full workflow** for Ortal's LinkedIn comic-series content.

This skill does **not** write the final post by itself.

It decides:

- what kind of post to create
- which skill to call
- in what order
- when to reject or rewrite
- when the content is ready for scheduling

## Repo canon (docs + packaged skills)

| Doc / skill | Role |
|-------------|------|
| `/comic-storytelling-skill` · `docs/agents/comic_storytelling_skill.md` | Story seed, arc, visual direction, caption options |
| `docs/agents/image_prompt_style_guide.md` | Imagegen brief checklist + visual lock |
| `docs/agents/caption_library.md` | Caption type buckets + lines |
| `/linkedin-native-post-skill` · `docs/agents/linkedin_native_post_skill.md` | LinkedIn-native post prose from seed |
| `/editor-guardrail-skill` · `docs/agents/editor_guardrail_skill.md` | Pre-schedule scorecard + verdict |
| `docs/agents/forbidden_phrases.md` | Phrase ban |
| `docs/agents/content_pillars.md` | Ratio guidance (aligns with batch mix) |

## Core objective

Turn a raw content idea into a LinkedIn-ready comic post that is:

- story-driven
- visually coherent
- human
- readable
- on-brand for Ortal
- soft-positioned for AI builder / growth roles
- safe to schedule

## Main workflow

### Stage 1: Identify the raw idea

Start from one of these inputs:

- a real moment that happened to Ortal
- a technical frustration
- a funny AI-agent behavior
- a workflow insight
- a growth or builder lesson
- a scene that would work well visually

If the idea is abstract, convert it into a **moment** before doing anything else.

**Bad input:**

- write about agent workflows

**Better input:**

- my agent wrote a polished post that sounded nothing like me

### Stage 2: Classify the post type

Choose one main type:

**A. Relatable AI life** — funny AI interactions, prompt failures, tone mismatch, automation irony.

**B. Builder story** — technical workflows, structure lessons, what broke and why, how Ortal solves AI problems.

**C. Soft authority** — positioning through insight, usable systems, output vs workflow.

**D. Career-facing** — what Ortal enjoys building, growth + AI fit, work she wants more of.

### Stage 3: Generate story seed

Run **`/comic-storytelling-skill`**.

Required output:

- story seed
- story arc (setup → friction → escalation → realization → payoff)
- visual scene direction
- caption options (3–5)
- emotional tone

**Story validation** before moving forward:

- is there a real scene?
- is there tension?
- is it visual?
- is it specific?
- does it feel like something that actually happened?

If not, revise the story seed first.

### Stage 4: Generate visual direction

Using the story output + **`docs/agents/image_prompt_style_guide.md`** + **`docs/agents/caption_library.md`**:

- create the **image prompt**
- choose **1–3** possible image captions
- ensure the scene fits the recurring **G.I. Jane tactical supergirl** identity (`docs/agents/ortal-linkedin-gijane-supergirl-visual-persona.md`)

**Visual validation:**

- does the image show **action**?
- does it match the **emotional tone**?
- is there room for a **short overlay** caption?
- does it feel like part of a **recurring series**?

If not, rewrite the image prompt.

### Stage 5: Write the LinkedIn post

Run **`/linkedin-native-post-skill`**.

**Input** should include:

- story seed
- story arc
- chosen image caption
- desired emotional tone
- post type
- intended positioning angle

**Writing rule:** adapt the story for LinkedIn. **Do not** invent a new story that loses the original moment.

### Stage 6: Run editorial review

Run **`/editor-guardrail-skill`**.

Score / review per that skill (readability, hook, relatability, personality, story clarity, insight, soft positioning, LinkedIn fit, memorability, emotional texture).

## Approval logic

Approve only if:

- Readability >= 8
- Hook strength >= 7
- Personality >= 8
- Relatability >= 7
- LinkedIn fit >= 8

If any fail: **rewrite** the post, **keep** the story, improve packaging.

## Rewrite path rules

**Too abstract** → `/linkedin-native-post-skill` — more scene-based; replace general claims with specifics.

**Too polished** → `/linkedin-native-post-skill` — simpler language, shorter lines, more human.

**Too generic** → `/comic-storytelling-skill` — sharpen the moment; tension more unique to Ortal.

**Too negative** → `/linkedin-native-post-skill` — keep conflict; add humor, warmth, or insight payoff.

**Image disconnected from post** → revise image prompt per **`docs/agents/image_prompt_style_guide.md`** — show key action; align caption and tone.

**Forbidden phrases** → strip per **`docs/agents/forbidden_phrases.md`**.

## Scheduling readiness checklist

Ready to schedule only if **all** true:

- image concept is clear
- caption overlay is short and strong
- post has a real hook
- post is **10–15 lines** (line-broken for mobile)
- story starts quickly
- ending lands
- voice sounds like Ortal
- no forbidden phrases (unless deliberate exception)
- no hard-sell
- series tone consistent

## Forbidden output conditions

Do **not** schedule if:

- sounds like a lecture
- sounds like a generic AI creator
- sounds too corporate
- sounds too bitter (without payoff)
- lacks a real moment
- weak first line
- overexplains the joke
- too many buzzwords
- polished filler

## Series consistency

Across posts, maintain:

- same visual protagonist
- tactical-builder energy
- readable LinkedIn formatting
- human, witty voice
- balance of funny / technical / positioning

Do not make every post identical. **Rotate:** chaos, tone correction, workflow insight, soft authority, builder realism.

## Ratio guidance

Across a batch, aim for:

- **40%** relatable AI life
- **30%** builder stories
- **20%** soft authority
- **10%** career-facing  

(Aligns with `docs/agents/content_pillars.md`.)

## Batch planning

When generating multiple posts:

1. avoid repeating the same joke pattern
2. avoid repeating the same hook type too often
3. avoid repeating the same lesson
4. vary emotional tone slightly
5. keep series identity consistent

## Post record (track internally)

- post_type  
- raw_idea  
- story_seed  
- core_tension  
- visual_scene  
- image_caption  
- emotional_tone  
- post_draft  
- scorecard  
- verdict  

## Final output format

When this orchestrator completes a post, output:

### 1. Post strategy

- Post type  
- Core angle  
- Emotional tone  

### 2. Comic story base

- Story seed  
- Tension  
- Payoff  

### 3. Visual package

- Image prompt  
- Chosen image caption  

### 4. LinkedIn post

- Final approved post text  

### 5. Review result

- Score summary  
- Approved for scheduling: yes / no  

## Golden rule

The workflow exists for posts that feel **true**, **visual**, **human**, **smart**, **memorable**. Not just polished.

If it is impressive but not **alive**, it is not ready.
