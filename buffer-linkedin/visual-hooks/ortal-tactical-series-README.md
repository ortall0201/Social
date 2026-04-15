# Ortal tactical comic series (LinkedIn / Buffer)

**Figure:** **Tactical heroine** — `artifacts/linkedin/visual-hooks/ortal-tactical-heroine-animation-persona.md`.

**On-image type:** ALL CAPS, two lines (white / orange), top-left. **Each slot’s lines are different** and map to **that slot’s LinkedIn post text** (`imagegenRelevance` in the queue JSON).

| Folder | Line 1 (white) | Line 2 (orange) |
|--------|----------------|-----------------|
| `ortal-tactical-series-01` | I DON'T OPTIMIZE FOR NODS. | I OPTIMIZE FOR THE WEIRD PATH. |
| `ortal-tactical-series-02` | YOU DON'T HAVE A SYSTEM. | YOU HAVE A PET THAT BEGS FOR TICKETS. |
| `ortal-tactical-series-03` | NO HUMAN ON THE PACKAGE? | IT DOESN'T GO LIVE. |
| `ortal-tactical-series-04` | EMPTY OWNER FIELDS DON'T DELETE WORK. | THEY ROUTE TO THE SOFTEST BOUNDARY. |
| `ortal-tactical-series-05` | INTEGRATION ISN'T A PERSONALITY FLAW. | IT'S WHERE THE BUSINESS GETS REAL. |

**Queue:** [`buffer-linkedin/queue/2026-04-15-five-slots.json`](../queue/2026-04-15-five-slots.json).

**Buffer:** clear Apr 15–19 scheduled posts on Ortal LinkedIn only: `scripts/buffer/Buffer-DeleteAllScheduledLinkedInOrtal.ps1`, then `scripts/buffer/Buffer-QueueOrtalFiveSlots.ps1`.
