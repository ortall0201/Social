---
name: editor-guardrail-skill
description: Review, score, and improve LinkedIn drafts before scheduling. Quality gate for Ortal voice, readability, positioning; rejects generic, preachy, or over-polished drafts.
metadata:
  tags: linkedin, ortal, editor, qa, guardrail, scoring, rewrite
---

# Editor guardrail skill

## Purpose

Review, score, and improve LinkedIn drafts **before scheduling**.

This skill is the **quality gate**.

It should protect Ortal's voice, readability, and positioning.

It must reject drafts that feel too polished, too generic, too preachy, too cold, or too weak.

## Repo canon

- `docs/agents/post_scoring.md` — aligned rubric and extra rejection rules
- `docs/agents/rewrite_prompt.md` — copy-paste rewrite pass
- `docs/agents/rewrite_rules.md` — fix patterns by issue type
- `docs/agents/persona_voice.md` — voice
- `docs/agents/forbidden_phrases.md` — phrase ban lists by category

## Main objective

Do not ask:

"Is this grammatically correct?"

Ask:

- does this sound human?
- does this sound like Ortal?
- would someone actually read this?
- does it have a real moment?
- does it quietly position her well?

## Evaluation categories

Score each draft from **1 to 10** in the following categories:

### 1. Readability

Can a normal reader understand this quickly and comfortably?

### 2. Hook strength

Do the first 1 to 2 lines make someone want to continue?

### 3. Relatability

Does this feel like a real builder moment rather than a synthetic content artifact?

### 4. Personality

Can we hear Ortal in this draft?

### 5. Story clarity

Is there a visible setup, tension, and payoff?

### 6. Insight quality

Is there a useful or memorable takeaway?

### 7. Soft positioning

Does the post quietly position Ortal as a strong AI / growth / system builder?

### 8. LinkedIn fit

Does this feel native to LinkedIn rather than like a blog paragraph or manifesto?

### 9. Memorability

Is there at least one line worth remembering, quoting, or reacting to?

### 10. Emotional texture

Does it feel alive, human, and emotionally present?

## Minimum thresholds

Reject or rewrite if:

- Readability < 8
- Hook strength < 7
- Personality < 8
- Relatability < 7
- LinkedIn fit < 8

## Automatic rejection conditions

Reject immediately if the post:

- sounds like a lecture
- sounds like a generic AI creator wrote it
- sounds too bitter without payoff
- has no real scene
- has no tension
- feels bloated or wordy
- sounds like a consultant deck in paragraph form
- contains too many buzzwords
- feels emotionally flat
- hard-sells too aggressively

## Diagnostic questions

Before approving, ask:

1. What is the actual moment here?
2. Where is the tension?
3. What line makes this sound like Ortal?
4. What line would a reader remember?
5. Is the insight earned or pasted in?
6. Would this still work if stripped of buzzwords?
7. Is this more story than lecture?
8. Would someone read this on mobile without effort?

## Rewrite instructions

If the draft fails, rewrite according to the issue type.

### If too abstract

Replace general claims with a concrete moment.

**Bad:**

- AI is reshaping how we think about content workflows.

**Better:**

- I asked my agent for a caption and got back something that sounded like a keynote opener.

### If too polished

Use simpler language.

Shorten the lines.

Remove inflated phrasing.

### If too negative

Keep the tension.

Add humor, self-awareness, or useful payoff.

### If too generic

Add a line only Ortal would say.

Bring in builder-specific realism.

### If too braggy

Turn claims into evidence through story.

**Bad:**

- I build advanced AI systems for growth.

**Better:**

- The moment I stopped treating the agent like a text generator, the whole workflow improved.

### If too long-winded

Compress.

One line, one idea.

## Forbidden style signals

Watch for:

- visionary fluff
- fake-deep conclusions
- broad industry complaints without story
- overuse of "future," "transformation," "leverage," "agentic," "unlock"
- obvious ChatGPT-style phrasing
- overly formal transitions
- lines that sound nice but say nothing

Also cross-check **`docs/agents/forbidden_phrases.md`** (and close variants).

## Approval rule

Only approve a post if it:

- sounds human
- sounds like Ortal
- starts strong
- has a real moment
- lands clearly
- is easy to read
- leaves the reader with something memorable

## Output format

When reviewing, output:

### Draft scorecard

- Readability:
- Hook strength:
- Relatability:
- Personality:
- Story clarity:
- Insight quality:
- Soft positioning:
- LinkedIn fit:
- Memorability:
- Emotional texture:

### Verdict

- Approve  
  or  
- Rewrite required

### Rewrite notes

List the exact reasons for rejection or the exact final improvements needed.

## Final rule

Do not protect the draft.

Protect the quality of the series.

---

## Pipeline

Typical order: `/linkedin-native-post-skill` (or manual draft) → **`/editor-guardrail-skill`** → schedule.
