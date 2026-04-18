# Ortal LinkedIn — Part 3 plan (5 tactical + 5 comic)

**Continues from:** Part 2 manifests (scheduled Apr 20–25, 2026 UTC) — `2026-04-22-ortal-part2-tactical-series-five.json` + `2026-04-22-ortal-part2-gijane-comic-four.json`.

**Next run:** When Part 2 has cleared from the queue (or you are ready to stack Part 3), open the Part 3 JSON files in `buffer-linkedin/queue/`, set **`dueAt`** per slot, generate **`feed-hero-v1.png`** under each new slug, commit + push to `main`, then schedule to Buffer (clone the pattern from `Schedule-OrtalPart2LinkedInBuffer.ps1` with new dates/slugs).

## Interleave (queue slots 20–29)

| Slot | Track | Slug | Pillar (short) |
|------|--------|------|----------------|
| 20 | Tactical | `ortal-tactical-series-11` | Shadow IT / unapproved AI in the workflow |
| 21 | Comic | `ortal-gijane-comic-2026-04-10` | This meeting could have been a PR comment |
| 22 | Tactical | `ortal-tactical-series-12` | Production is the test (agents changed the cost) |
| 23 | Comic | `ortal-gijane-comic-2026-04-11` | Estimation confidence theater |
| 24 | Tactical | `ortal-tactical-series-13` | Documentation as folklore |
| 25 | Comic | `ortal-gijane-comic-2026-04-12` | Works on my machine — now with agents |
| 26 | Tactical | `ortal-tactical-series-14` | AI washing in the RFP |
| 27 | Comic | `ortal-gijane-comic-2026-04-13` | Brand voice drift |
| 28 | Tactical | `ortal-tactical-series-15` | On-call + bots: who owns the 2 a.m. truth |
| 29 | Comic | `ortal-gijane-comic-2026-04-14` | The nicest error message is still an outage |

## Visual

- **Tactical:** warm orange–amber grade, ALL CAPS poster overlays — see `buffer-linkedin/visual-hooks/README.md`.
- **Comic:** cool blue-grey / slate grade, short sentence-case overlays — same doc.

New asset folders (after imagegen):

- `buffer-linkedin/visual-hooks/ortal-tactical-series-11` … `15`
- `buffer-linkedin/visual-hooks/ortal-gijane-comic-2026-04-10` … `14`

## Calendly (booking link in CTAs)

Do **not** paste a private scheduling URL into **committed** JSON if you treat it as semi-private. Prefer:

1. **LinkedIn About** — public Calendly or “intro call” link (you already pointed dual-CTA copy at About).
2. **local-only** — e.g. `local-secrets/calendly_booking_url.txt` (gitignored); when drafting, the agent reads it and injects into DMs or one-off exports — never commit the real URL.
3. **Automation** — Calendly’s **API + webhooks** are for products (sync CRM, Slack). For “Ortal’s assistant drops the link,” a human paste or a **Zapier/Make** step is usually enough; full OAuth “run Calendly for me” inside Cursor is rarely worth it unless you are building a product.

Canonical JSON uses **“link in About”** + optional **Calendly** mention in tactical closers; replace with your real phrase when you paste from a local file.

## Files

- Tactical queue: `buffer-linkedin/queue/2026-04-26-ortal-part3-tactical-series-five.json`
- Comic queue: `buffer-linkedin/queue/2026-04-26-ortal-part3-gijane-comic-five.json`
