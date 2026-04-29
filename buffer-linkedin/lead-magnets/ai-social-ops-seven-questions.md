# 7 questions before you let AI touch publish

A one-page checklist for **marketing ops**, **social leads**, and **founders** wiring AI into social. Use it to vet vendors or your own stack.

---

## 1. Who approves the creative package?

- Name the **single approval gate** before anything hits a scheduler or API.
- If the answer is “whoever is online,” you do not have a gate yet.

## 2. What is the execution plane today?

Pick what actually ships: **native app**, **scheduler (e.g. Buffer)**, **official Graph API**, or **mixed**.  
“AI said post” is not a plane. **How** does the binary leave your org?

## 3. Where does the media URL live?

Schedulers need **HTTPS fetch**. Is the file **public-approved only**, or are you accidentally exposing a whole bucket?

## 4. What is STOP?

Define **wrong output**, **first detector**, and **who can halt** automation without a meeting.

## 5. What happens when the API says no?

**Rate limits**, **quota**, **incidents**: what is the **human fallback** (UI, alternate channel, delay)?

## 6. What is logged for audit?

Intent ID, approver, timestamp, asset hash or URL, channel: can you answer “who approved what” in 5 minutes?

## 7. What will you not automate?

Write one line. Examples: DMs without opt-in, delete-without-backup, live publish without dry-run in staging.

---

## Bonus: one sentence to align the team

**Content pipeline** (brief, creative) and **publish execution** (API, taps, schedule) are **different layers**. Mixing them is how scope explodes.

---

*Ortal / Tactical Technical Ventures. Copy freely; attribution welcome.*
