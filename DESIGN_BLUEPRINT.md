# Architectural and art-direction blueprint

**Concept:** WHO AM I ONLINE? / The version the internet knows

**Big idea:** Two simultaneous realities exist: what we share and the life around it. The audience does not merely read this concept; they manipulate a split portrait, change the rules of a fictional feed, practise interpreting ambiguous messages, and publish a personal manifesto to their own device.

**Audience:** Teenagers and teachers assessing multimodal digital composition. Educational experience, no underage social signup, and no dependency on personal accounts.

**4 primary palette tokens:**

| Role | Token | Value |
|---|---|---|
| Background | paper | `#F2EDE4` |
| Surface | ink | `#191916` |
| Primary accent | vermilion | `#EA4B2B` |
| Muted ink | graphite | `#645F59` |

**Typography pairing:** Space Grotesk (tight and monumental; page headlines) × Instrument Serif italic (humanity, nuance, counterpoint); DM Mono is strictly a tiny operational annotation face.

**Art direction:** anti-polished digital magazine. No generic blue/purple glow, glass panels, repeated three-column icon cards, stock photos or faceless AI imagery. Original vector portraits and a repeatable ink/paper/red identity draw from print, zines and poster design. Typographic contrast represents public vs private, not good vs evil.

**Scroll choreography:**

1. **00 / Cover** — staggered headline lines; slightly tilted original split portrait; manual start CTA and optional speech narration.
2. **01 / Mirror** — original aligned `SVG` paintings; one range-controlled vertical reveal; question + optional written takeaway.
3. **02 / Feed** — darker inversion; experiment stage shows four fictional posts; three lenses reorder with an optional staggered GSAP transition.
4. **03 / Receipts** — editorial data break; proportionate bars animate only after visible; US context and age-restriction disclosure.
5. **04 / Messages** — tap-to-branch conversations; no dead ends; outcomes labelled fictional and replayable.
6. **05 / Your Code** — warm-paper return; choose 3 of 6 habits; live editorial manifesto; export SVG and clipboard on secure origins.
7. **End card** — full-bleed vermilion with the closing line “You are not content.”

**Motion spec:** `cubic-bezier(.16,1,.3,1)` for authored CSS timing; GSAP `power3.out` for entrance staggering; Lenis only for optional smooth-wheel experience. Reduced-motion means no animations, no easing layer, no interface tones. All critical functionality remains in native HTML+JS.

**Why only these repositories:**

- **greensock/GSAP** — direct integration for headline and card entrance physics, with fallback.
- **darkroomengineering/lenis** — direct optional smooth-scroll integration; no competing scroll libraries.
- **nextlevelbuilder/ui-ux-pro-max-skill** — research-only design review checklist (semantic structure, contrast, focus, touch sizes, line length).
- **INSANE0777/Awwwards-mcp** — inspected for design reference methodology, not required in final runtime.
- **Others listed in the initial brief:** skipped intentionally because React rendering stacks, WebGL engines, transition routers, UI kits, and multiple concurrent animation libraries introduce bundle and lifecycle costs with no meaningful instructional payoff here.

**Security model:** Fully static HTML/CSS/JS, all fixed text via safe DOM APIs, no user-entered free-text, no accounts, no database. Optional CDN and Google Fonts are the only cross-origin downloads. Host headers require server support; GitHub Pages cannot set those via `_headers`.
