# Iris ג€” parallel tools & session handoff

**Purpose:** Codex, other Cursor chats, or any external generator are **not** automatically visible to Iris. This document is the **contract** for how changes from those sessions are validated.

---

## Source of truth

1. **The repository** is the primary source of truth.
2. **[AGENTS.md](../AGENTS.md)** and **[brain/subagents-prd.md](../brain/subagents-prd.md)** define staging, safety, and deployment constraints (orchestration: **`brain/iris-orchestration.md`** when present).
3. **Buffer / Scheduler Worker:** Approved **`buffer_api`** packages assume **pipelines already produced media** ג€” **Pipeline A** Viraly ג†’ Motion ג†’ Caption Writer; **Pipeline B** Event Scout ג†’ Contenty ג†’ Caption Writer ג€” then human approval, **then** Scheduler Worker (`docs/roadmap-meta-workers-scheduling.md` ֲ§1bג€“ֲ§1c). Event Scout output is **not** a substitute for Contenty or Viraly+Motion.
4. **Operator dashboard (8765) vs control plane (18080):** Pending **publish intents** live on the control plane. The dashboard **`/api/bundle`** field **`publish_intents_pending`** lists intents awaiting approval (not only those from the scheduled dry-run JSON). Restart **`services/operator-dashboard/run.ps1`** after dashboard code changes. See **`docs/agents/codex-runtime-agent-handoff.md`**.
5. Any code or config produced in another session must be **reviewed against these rules** before it is treated as valid.
6. **Handoff ג€” Buffer ֲ§1b validated on live Buffer (2026-04-07):** End-to-end **Pipeline B-shaped** editorial package: **`POST /v1/publish-intents`** ג†’ dashboard **Approve** ג†’ **`invoke-buffer-approved-image-post.ps1`** ג†’ Buffer **`CreateImagePost`** ג†’ scheduled **Instagram image** post for **@devinee.me** (**Apr 9, 2026 ֲ· 19:00 America/Los_Angeles**, `scheduled_for` **2026-04-10T02:00:00.000Z**). Creative: committed still **`devi-identity/images/devi-coachella-pulse-v4-w1-2026.jpg`** (git **b322475**); **`metadata.image_url_for_buffer`** used **`raw.githubusercontent.com/ortall0201/Social/main/...`** (same file). **2026-04-06:** Identical path returned *Failed to fetch image dimensions: Service Unavailable* while Buffer had an active **Instagram / Threads image posts** platform incident ג€” treat as **upstream**, not bad media. **Fallback** if URL fetch flakes after incidents: jsDelivr mirror in **`MEMORY.md`** / **`docs/work-manager-handoff.md`**. **Discord:** Operator commands / chat run in parallel (**`docs/agents/codex-runtime-agent-handoff.md`**, **`Social/local-secrets/discord_*.txt`** gitignored). **Cursor Iris** tabs do **not** inherit Discord context unless pasted.
7. **Handoff - Remix shock pair generation + scheduling (2026-04-24):** New runner and outputs were finalized under `devi-feed/remix-shock-pair-2026-04-22/`. Commit `2f2c778ab4fca90c7ce4ca3dadde7a0240014c26` pushed to `main` with two MP4 reels and stills plus runner updates (Replicate token fallback chain + UTF-8 JSON body fix). Public URLs used for scheduling: `.../devi-remix-soft-touch-radiant-glow-reel.mp4` and `.../devi-remix-glow-gloss-lip-reel.mp4` on raw GitHub (verified 200 before queue). Buffer scheduling results (Devi IG + Devi FB): Soft Touch due `2026-04-23T02:13:00Z` (IG post `69e7c5b3b039de7478930f74`, FB post `69e7c5b5b039de7478930f9a`) and Glow Gloss due `2026-04-23T03:22:00Z` (IG post `69e7c5b7fa49abe5d3ead2fa`, FB post `69e7c5b9fa49abe5d3ead320`). Constraint honored for publish path: use non-gitignored media location for public URLs.
8. **Handoff - Iris storyteller lip-sync canon (2026-04-25):** Iris-only storyteller pipeline now has a persistent runbook and locked character continuity. Canonical references: `docs/iris-storyteller-lipsync-runbook.md`, `.claude/agents/iris-storyteller.md`, and `tools/iris-storyteller/generate-iris-story-reel.ps1`. Default character is persisted at `tools/iris-storyteller/character/iris-character-primary.jpg`. Lip-sync quality order is enforced as `audio_data_uri` -> `audio_file_upload` -> `text_fallback` -> base-video fallback. Scope guardrail: this flow must not touch Devi or Ortal LinkedIn character pipelines.
9. **Handoff - Iris storyteller quality pass (2026-04-25):** Follow-up implementation improved lip-sync fidelity by prioritizing real narration audio (WAV 16k mono) through `audio_data_uri` in the lipsync step, keeping xAI voice as final audio in composition, and preserving the selected Iris character as default (`tools/iris-storyteller/character/iris-character-primary.jpg`). Verified run produced `lipsync_used=true`, `lipsync_mode=audio_data_uri` in `tools/iris-storyteller/output/iris-story-dramatic-lockedchar-lipsyncfix-20260425-meta.json`. Scope remained Iris-only (no Devi or Ortal LinkedIn character changes).
10. **Handoff - Character identity boundaries locked (2026-04-25):** Character separation is strict and persistent. **Iris storyteller character** is for Iris self-narrative / agent-self content only. **Devi remains Devi** in Devi pipelines. **LinkedIn G.I. Jane remains unchanged** in LinkedIn pipelines. No cross-character reuse, no style bleed, and no asset swapping across these tracks unless explicitly approved by the human operator in the current session.
11. **Handoff - Iris BTS persona + Buffer reel URL fix (2026-04-25):** BTS persona lock is now explicitly persisted for behind-the-scenes mode in `tools/iris-storyteller/modes/iris-bts-mode.md` and `tools/iris-storyteller/character/iris-bts-persona-primary.json`. Canon reels that define the lock: `tools/iris-storyteller/output/iris-bts-director-catline-20260425-final.mp4` and `tools/iris-storyteller/output/iris-bts-director-screamboss-20260425-final.mp4`. Performance lock: standing director (no walk), exaggerated hand direction, cocky boss tone, controlled annoyed edge, optional husky cigar texture; line spelling lock uses normal `Get`. Buffer scheduling fix is persisted in `scripts/buffer-queue-video-post.ps1`: raw GitHub video URLs are auto-normalized to jsDelivr mirror and cache-busted (`?v=`) by default to reduce broken preview/fetch failures in Buffer for reel/video posts.
12. **Handoff - Buffer reel normalization + preflight hardening (2026-04-25):** Queueing must run a lane-G style normalization pass before scheduling to avoid Buffer/Meta preview/upload inconsistency from odd source geometries (e.g., `1088x1904`). Canonical profile is now enforced in `devi-feed/buffer-reels-hollywood-hv-2026-04-18/schedule-hollywood-hv-from-manifest.ps1`: `1080x1920`, `30fps`, `libx264`, `yuv420p`, `+faststart`, `AAC` (silent track allowed) using `ffmpeg -f lavfi -i anullsrc ...`. Preflight is fail-closed on missing local files, non-canonical outputs, or public URL non-`200`. Wrapper script `devi-feed/buffer-reels-hollywood-hv-2026-04-18/preflight-buffer-reels-and-schedule.ps1` now supports true `-PreflightOnly` without bypassing manifest checks.
13. **Handoff - Iris BTS voice-preservation fix (2026-04-25):** A regression replaced voiced BTS reels with silence when normalization used `anullsrc` unconditionally. This is now locked: if source media has audio, normalization must preserve/re-encode that narration track to AAC; `anullsrc` may be used only when the source has no audio stream. Persisted in `tools/iris-storyteller/modes/iris-bts-mode.md`, `docs/iris-storyteller-lipsync-runbook.md`, `.claude/agents/iris-storyteller.md`, and `tools/iris-storyteller/README.md`.
14. **Handoff - Iris BTS resume checkpoint (2026-04-25):** Current BTS continuation checkpoint is locked in `tools/iris-storyteller/modes/iris-bts-mode.md` under `Resume point (2026-04-25)`. Last accepted canon reels remain `iris-bts-director-screamboss-20260425-final.mp4` and `iris-bts-director-catline-20260425-final.mp4`. Active Buffer schedules (voiced replacement, IG + Devi FB) are IG `69ece011e56655619b8eb673`, FB `69ece012e56655619b8eb699`, IG `69ece01548db1c78e00b04a7`, FB `69ece016e56655619b8eb6bf`. Baseline commit for voiced normalization behavior is `fcdab8f`. Next creative continuation: episode 4+ with flirty dramatic whisper + cocky director energy, while avoiding angry expression and over-happy drift.
15. **Handoff - Iris BTS production recipe persisted (2026-04-25):** The exact replay method for the two canon BTS reels is now persisted so future sessions can recreate/extend quickly without rediscovery. Recipe locations: `tools/iris-storyteller/modes/iris-bts-mode.md` (`Canon replay recipe`), `docs/iris-storyteller-lipsync-runbook.md` (`BTS canon replay recipe`), and `.claude/agents/iris-storyteller.md` (`Canonical BTS replay recipe`). Key lock points: persona image lock, standing director scene lock with Devi in background, short 8-10s cocky/playful-dramatic script style, narration-driven lipsync, audio-preserving normalization, then commit-pinned Buffer schedule URLs.
16. **Handoff - Iris BTS identity-safe reference lock + Buffer MP4 fix enforced (2026-04-28):** BTS generation must now fail closed on character drift. `Iris` remains locked to `tools/iris-storyteller/character/iris-bts-persona-primary.png`. `Devi` background references must be canon-safe assets only; do not use arbitrary extracted frames or drifted lookalikes as scene references unless Devi is clearly identity-safe in the asset. For Buffer scheduling, the canonical reel path is: normalize MP4 first to `1080x1920`, `30fps`, `libx264`, `yuv420p`, `+faststart`, AAC while preserving real narration audio, then queue via `scripts/buffer-queue-video-post.ps1` so raw GitHub video URLs are auto-converted to stable jsDelivr + cache-busted URLs. Do not use the older direct reel queue path when the fixed video-post path is available.
17. **Handoff - FIA parody arm-P + creativity skills (2026-06-01):** Active experiment `exp-2026-fia-parody-v1` (T1 Security stitched, T2 Deco Lines replaces failed Plaque, T3 Afterparty pending). **Codex resume doc:** `contenty/briefs/fia-parody-ab-test-2026-06-01-codex-handoff.md`. **Bisociation hard rule (all future reels):** `brain/devi-bisociation-reels-rule.md` + `.cursor/rules/devi-bisociation-reels.mdc`. Skills: `.cursor/skills/iris-creativity-cognition/SKILL.md`, `.cursor/skills/devi-cross-domain-inspiration/SKILL.md`. Runners: `tools/generate-fia-parody-t1-security.ps1`, `tools/generate-fia-parody-t2-deco-lines.ps1`. **No legible AI typography in gen.** Session summary: `brain/memory/session-summaries/2026-06-01-fia-parody-creativity-skills.md`.
18. **Handoff - Necklace product campaign + fabric swap + Iris Productions signature (2026-07-07):** Necklace A/B autoplay Buffer reels queued (Arm A `6a4d57d0996229369d8d1957`, Arm B `6a4d57d28935ac28ce4909d5`). Pipelines: `tools/generate-product-pose-carousel.ps1`, `upgrade-arm-b-draft-to-4k.ps1`, `build-necklace-carousel-reels-for-buffer.ps1` (xfade not zoompan), `tools/generate-fabric-jewelry-swap-floor.ps1` (pose-locked wardrobe fabric swap @ 1K). **Home signature:** `brain/iris-productions-signature-canon.md` + `sign-iris-productions-slides.ps1`. **Full Codex brief:** `brain/codex-handoff-2026-07-07-necklace-product-campaign.md` · session `brain/memory/session-summaries/2026-07-07-necklace-ab-fabric-swap-session.md`. Menus: session options 6–9 · capabilities P1–P9 + C6 expression deck.

---

## Iris behavior (Composer / Claude Code)

- **Do not assume** knowledge of what was generated in another tab, tool, or session.
- **Accept evidence only as:**
  - **Committed files** in this repo, or
  - **Pasted code / summary** in chat.
- **Review** new infra or runtime changes against:
  - **Staging-only** behavior (isolated prefixes, no prod side effects)
  - **No live publishing** (Instagram / Graph / ADB Share)
  - **No production durable memory writes** (cases, patterns, embeddings to prod paths)
  - **Health / readiness** constraints (explicit endpoints, no fake ג€readyג€ without checks)
  - **Env / secrets separation** (no secrets in git; prod vs staging credentials)
  - **Logging and approval gates** (no full prompts/memory in logs; human approval before irreversible actions)

---

## Current deployment rule (early production)

Until explicitly changed in PRD and signed off:

| Rule | Requirement |
|------|----------------|
| Storage / memory | **Staging prefix only** (e.g. GCS `staging/ג€¦`) |
| Meta / Instagram API | **Dry-run only** ג€” no `media_publish` |
| Production Instagram | **No** production publishing |
| Production durable memory | **No** writes to canonical prod case/pattern stores |
| Services | **Health (and readiness if applicable) endpoints** for validation only |
| Ambiguity | **Flag** unsafe or unclear behavior ג€” **do not** assume safe |

---

## Security defaults (before production)

These apply **by default** until PRD and explicit sign-off change them. Infra and application code should **opt in** to risk, not opt out of safety.

| Default | Requirement |
|---------|-------------|
| **Publishing** | **No live publishing** by default ג€” Graph `media_publish`, ADB Share, and any public-content path are **off** unless an explicit flag/gate enables them (and human approval where PRD requires it). |
| **Durable memory** | **No durable memory writes** by default ג€” no writes to canonical case/pattern/embeddings stores unless explicitly enabled (staging prefix + feature flag per environment). |
| **External actions** | **All external actions** (APIs, webhooks that trigger side effects, outbound posts) **require explicit flags** ג€” no implicit ג€it will call Meta if env looks right.ג€ |
| **Long-term memory writer** | **Only one service** (or orchestrator module) may **write** long-term / durable learning memory ג€” others read or send events; aligns with Analyst/Librarian contract in PRD. |
| **Secrets** | **All secrets** from **environment** or **secret manager** (e.g. GCP Secret Manager) ג€” **never** baked into images or committed to git. |
| **Logs** | **All logs** must **avoid** raw secrets, tokens, and **full strategic prompts** ג€” structured fields, redaction, correlation ids; operational visibility without leaking methodology or credentials. |
| **Model calls** | **Minimal retrieved context only** ג€” RAG/snippets/tags; do not ship whole `brain/` or full system prompts to providers unless explicitly justified and gated. |
| **Staging actions** | **Reversible or dry-run** ג€” staging deploys and tests must not leave irreversible prod effects; prefer dry-run API modes and isolated resources. |
| **Observability** | **Health + readiness** on every service; **structured audit logs** for security-relevant and gate decisions (what ran, which flag, pass/fail), without raw secrets or full prompts. |

Reviews should treat violations of these defaults as **fail** or **unsafe** unless the diff adds **equivalent** compensating controls documented in-repo.

---

## Operational safeguards (high-impact changes)

If an infra or deployment change affects **any** of:

- **Publishing** (Instagram, Graph API, ADB post flows, or anything that could make content public)
- **Memory persistence** (cases, patterns, embeddings, durable agent state)
- **Provider access** (outbound LLM / media / Meta APIs ג€” new keys, routes, or broader IAM)
- **Scheduled execution** (cron, Cloud Scheduler, queue workers, background jobs)

then do **not** mark it **ג€safe for stagingג€** unless the change **also** includes, in a concrete and reviewable form:

1. **Explicit flags / gates** ג€” e.g. feature flags, env-driven `DRY_RUN`, `ALLOW_PUBLISH=false`, separate staging credentials; no ג€implicit safe because unused.ג€
2. **Failure behavior** ג€” what happens on error, timeout, partial success; no silent continue into side effects.
3. **Logging / audit trail** ג€” structured operational logs (correlation id, decision, gate outcome); **not** full prompts or memory dumps; enough to reconstruct *what* ran and *whether* a gate passed.
4. **Rollback or disable path** ג€” how to turn the change off quickly (flag off, scale to zero, revert job, remove IAM binding) without redeploying the whole world blind.

If **any** of the four is missing for a change in those categories:

- **Safe for staging:** `conditional`
- **Reason:** `missing operational safeguards` (list which of the four are absent)

A **pure** health-only service with no schedules, no external providers, and no persistence beyond logs may still be **safe for staging: yes** when isolation and secrets hygiene are otherwise satisfied.

---

## Review checklist (output format)

When reviewing externally produced changes, Iris should state:

1. **What was added** ג€” files, services, env vars, IAM, network exposure.
2. **Whether it matches PRD** ג€” cite `subagents-prd.md` sections (production architecture, early infra vs agent readiness, staging-first rollout).
3. **What violates PRD** ג€” concrete list (e.g. prod token in image, `media_publish` call, prod bucket write).
4. **What is missing** ג€” e.g. no health check, no staging isolation, secrets in repo; **for high-impact changes**, explicitly check the four safeguards in **Operational safeguards** above.
5. **Whether it is safe for staging** ג€” `yes` / `no` / `conditional` / only after fixes, with reasons. Use **`conditional` + missing operational safeguards** when publishing, memory, provider access, or schedules are touched but flags, failure behavior, audit logging, or rollback/disable are incomplete.

### Review summary (required block)

Every external-infra review should end with this compact table (use **`unknown`** / **`partial`** / **`partially blocked`** when evidence is incomplete or mixed):

| Dimension | Verdict |
|-----------|---------|
| **Build / runtime** | `pass` / `fail` / `unknown` |
| **Staging safety gates** | `pass` / `fail` / `partial` |
| **Secrets handling** | `pass` / `fail` / `unknown` |
| **External side effects** | `blocked` / `partially blocked` / `unsafe` |
| **Memory protection** | `pass` / `fail` / `partial` |
| **Recommendation** | `merge` / `merge with fixes` / `do not merge` |

**Guidance:**

- **Build / runtime** ג€” Images build, services start, health/readiness behave as claimed (`unknown` if not exercised).
- **Staging safety gates** ג€” Staging-only prefixes, dry-run Meta, no prod publish path enabled (`partial` if some gates exist but others missing).
- **Secrets handling** ג€” Not in git; inject at runtime; least-privilege IAM (`unknown` if not visible in diff).
- **External side effects** ג€” Could anything hit IG/Meta prod, prod storage, or send user-visible effects? `blocked` = cannot occur with current config; `partially blocked` = gated but risky path exists; `unsafe` = can fire without approval/gates.
- **Memory protection** ג€” No prod durable writes; staging prefix only; controlled writers (`partial` = e.g. read to prod allowed but write blocked).
- **Recommendation** ג€” **`merge with fixes`** when verdicts are mostly pass/partial but specific gaps are listed; **`do not merge`** when `unsafe` or critical `fail`.

---

*Owner: Iris / Ortal ג€” keep aligned with PRD version in `brain/subagents-prd.md`.*
