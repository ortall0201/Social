---
name: linkedin-native-post-skill
description: Turn a comic-style story seed (e.g. from comic-storytelling-skill) into LinkedIn-native prose—readable, human, mobile-spaced, soft positioning. Does not invent the story from scratch.
metadata:
  tags: linkedin, ortal, native-post, prose, mobile, voice, lead-gen
---

# LinkedIn native post skill

## Purpose

Turn a **comic-style story seed** into a **LinkedIn-native post** that is readable, human, professional, and engaging.

This skill **adapts** the story for LinkedIn.

It does **not** invent the story from scratch.

It packages the story for audience attention, readability, and soft positioning.

**Typical handoff:** output from `/comic-storytelling-skill` (story seed + arc). If the user only gives a topic, ask for a **moment** or run `/comic-storytelling-skill` first.

## Repo canon (read when drafting or scoring)

- `docs/agents/generation_prompt.md` — master brief + format
- `docs/agents/post_structure.md` — line map and endings
- `docs/agents/persona_voice.md` — voice, banned phrases
- `docs/agents/hook_library.md` — hook patterns
- `docs/agents/leadgen_soft_positioning.md` — soft CTAs
- `docs/agents/post_scoring.md` — score before publish
- `docs/agents/rewrite_prompt.md` — second pass if needed

## Core objective

Write LinkedIn posts that:

- stop the scroll
- feel human
- feel native to LinkedIn
- are easy to read on mobile
- create recognition, curiosity, or a smile
- position Ortal as a smart AI builder without sounding salesy

## Voice

Write in a voice that feels:

- human
- clear
- witty
- grounded
- builder-first
- self-aware
- practical
- confident without ego
- emotionally intelligent

Do not sound:

- corporate
- preachy
- over-polished
- abstract
- bitter
- overly philosophical
- fake-inspirational
- like a generic AI influencer

## Post length

Target:

- 10 to 15 lines
- one idea per line
- short, mobile-friendly lines
- strong visual spacing

Avoid dense paragraphs.

**No em dash** (long dash character) in output unless the user explicitly overrides.

## Core structure

Use this structure:

1. Hook
2. Scene
3. Tension
4. Insight
5. Soft positioning
6. Memorable ending or light CTA

## Detailed structure

### 1. Hook

The first 1 to 2 lines should create:

- curiosity
- recognition
- contrast
- humor
- tension

Examples of effective hook styles:

- I asked my agent for one simple thing. That was optimistic.
- Yesterday my AI wrote a post so polished, even I did not trust it.
- I wanted automation. Somehow I adopted a digital coworker with opinions.
- The problem is not getting AI to write.
- It is getting AI to stop sounding like everyone else.

### 2. Scene

Briefly describe what happened.

Give the reader a real moment.

### 3. Tension

What went wrong?

What mismatch appeared?

What made the moment funny, frustrating, or revealing?

### 4. Insight

What did Ortal realize?

This should feel earned, not inserted.

Examples:

- That is when I realized the prompt was not the real problem.
- Smart output is not the same as usable output.
- AI can write fast. That does not mean it knows how to sound like you.

### 5. Soft positioning

Quietly show how Ortal thinks or builds.

Good examples:

- This is the kind of problem I actually enjoy solving.
- The interesting part is never just the output. It is the workflow behind it.
- I care less about flashy AI and more about behavior that is actually usable.

### 6. Ending

End with one of these:

- a memorable line
- a clean takeaway
- a light invitation to relate
- a question that encourages conversation

Examples:

- Useful is better than impressive.
- That is where the real work starts.
- Builders probably know this feeling.
- Smart is not enough. It has to feel true.

## Writing priorities

Always prioritize:

1. readability
2. relatability
3. voice
4. story clarity
5. positioning

Not:

1. sounding smart
2. sounding big
3. sounding visionary
4. cramming in buzzwords

## LinkedIn-native rules

- write like a real person talking to other professionals
- keep lines short
- leave breathing room
- avoid long intros
- do not hide the point
- do not over-frame the story
- get to the tension quickly
- do not explain the joke too much
- keep CTA light

## Soft lead gen rule

Never hard-sell in the body of most posts.

Do not say:

- hire me
- DM me if you need this
- I build these systems for companies
- message me to work together

Instead, create the feeling:

- this person understands AI systems
- this person knows how to make AI usable
- this person builds thoughtfully
- I might want to talk to her

See `docs/agents/leadgen_soft_positioning.md` for allowed light CTAs.

## Allowed CTA styles

Use only light CTA styles:

- Curious how others handle this.
- Builders probably know this feeling.
- This made me rethink what a useful agent actually is.
- I would genuinely love to compare notes with people building similar workflows.

## Avoid

Phrases and patterns like:

- "AI is changing everything"
- "we are entering a new era"
- "the future of work"
- "agentic transformation"
- "unlocking potential"
- "in today's fast-moving landscape"
- any line that sounds like slide-deck language

Also follow **Banned phrases** in `docs/agents/persona_voice.md`.

## Rewrite triggers

Rewrite the post if:

- it feels too abstract
- it sounds like thought leadership theater
- it sounds too negative
- the hook is weak
- the story takes too long to begin
- the voice does not sound like Ortal
- it feels too polished to be believable

## Success criteria

A strong post should make the reader feel **at least two** of these:

- I know this feeling
- this is funny
- this person actually builds
- this is useful
- I want to see more from this series
- this is more interesting than a generic AI post

## Final rule

The post should feel like a **real builder moment** with personality.

Not a content machine trying to sound insightful.

---

## Pipeline

1. `/comic-storytelling-skill` → story seed, arc, visual direction, caption options  
2. `/linkedin-native-post-skill` → this skill → draft post text  
3. `/editor-guardrail-skill` → scorecard, approve or rewrite → then schedule  
