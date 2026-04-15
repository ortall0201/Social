# Ortal LinkedIn hero series (`ortal-tactical-series-01` … `05`)

**Voice + on-image copy:** **Batch 2** — sentence case, persona-aligned hooks (`_shared-imagegen-persona-brief.md` § LinkedIn five-slot Batch 2). **Pack:** `brain/roadmaps/linkedin/2026-04-15-five-slot-imagegen-pack.md`.

**Figure — G.I. Jane / Supergirl (default for this folder):** `docs/agents/ortal-linkedin-gijane-supergirl-visual-persona.md` + `docs/agents/assets/ortal-gijane-supergirl-persona-reference.png`. For a **blazer-only** run, use **Track A** in `_shared-imagegen-persona-brief.md` instead.

**Queue:** [`buffer-linkedin/queue/2026-04-15-five-slots.json`](../queue/2026-04-15-five-slots.json) — fields `imagegenCaptionLine1` / `imagegenCaptionLine2`, `batch2Id`, `imagegenIntent`.

**Buffer:** push `main`, then `Buffer-QueueOrtalFiveSlots.ps1`. To replace the Apr 15–19 batch only: `Buffer-DeleteAllScheduledLinkedInOrtal.ps1` (local script; `scripts/` may be gitignored).
