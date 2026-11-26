# Final refinement, self-audit, and verification

## Three specific initial flaws found and corrected

1. **A static graphic would look impressive but be passive.** The core concept was reworked into a native-keyboard-operable two-image mirror, three genuinely different feed-sorting lenses, and two replayable branching conversations, not a dead mockup.
2. **CSP could block inline styling used to size evidence bars.** Those inline styles were removed and replaced with authored CSS custom properties declared in the stylesheet. No inline JavaScript, input echo into `innerHTML`, or iframe dependency remains.
3. **The aural mode was just sound-effect decoration.** Added a real optional spoken introduction using the browser speech engine, visible written equivalents, manual stop, no autoplay and a safe no-support fallback.

## Local automated checks

- JavaScript: `node --check app.js` — passed after syntax repair.
- SVG XML: all five original SVG illustrations parsed successfully.
- Browser environment: local navigation is prohibited by the managed Chromium policy. **Workaround for smoke tests:** `page.set_content` with CSS and original SVGs embedded; load the same application JavaScript via `add_script_tag`. This tests actual DOM rendering and interaction handlers in Chromium, **not** GitHub Pages network deployment or live CSP headers.
- Tested viewport sizes: **1440×900 desktop**, **768×1024 tablet**, **390×844 mobile**.
- Browser `pageerror` exceptions: **0 in each viewport**.
- Horizontal viewport overflow: **0px in each viewport**.
- Scrolled every chapter: **9/9 progressive-reveal targets appeared** in each viewport.
- Mirror slider updated the scene to **86%** when set to 86 in all three viewports.
- Connection lens reordered the first post to **Just Checking In** (`night`) in all three viewports.
- Photo conversation first choice produced the intended visible reflection in all three viewports.
- Selecting three manifesto rules enabled the SVG download control in all three viewports.
- Clicking the download created **`my-digital-code.svg`**, and each downloaded file parsed as valid SVG/XML in all three viewports.
- Opening the mirror takeaway worked at every viewport.
- Mobile/tablet menu opened successfully.

## Remaining verification before submission

- [ ] Open the **actual GitHub Pages URL** and confirm scripts, fonts and images load over HTTPS.
- [ ] Check the browser developer console for CSP messages on the actual host.
- [ ] Verify your repository Actions and Pages permissions; a website link is not created by this ZIP automatically.
- [ ] Click **Hear the Intro** on an actual device to verify the browser's voice support and manual stop.
- [ ] Click **Save as SVG** and inspect the generated file in a real device download folder.
- [ ] Try keyboard-only, mobile touch and reduced-motion settings on real hardware.
- [ ] Check colour contrast with a dedicated WCAG audit tool and run an accessibility audit before claiming WCAG conformance.
- [ ] Correct any content to match the student's own voice before submitting the reflection.

## Claim boundary

“10× better” / "$100,000 agency-grade" is an **art-direction target**, not a verified tenfold-quality score, monetary appraisal, award, performance or accessibility certification. No public deployment has been made.

## Contrast correction

The early design used a brighter vermilion with insufficient contrast on pale paper. The main accent was adjusted to `#EA4B2B` (approximately 3.25:1 on the paper background and 4.65:1 on carbon ink). A darker supporting shade is used for small accent labels on paper. Formal WCAG assessment remains to be performed.
