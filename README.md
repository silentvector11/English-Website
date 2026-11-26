# WHO AM I ONLINE?
### A five-chapter interactive digital story by Avi (student assignment, 2026)

A complete, responsive website about **the impact of social media on identity and relationships**. Designed for Year 10 English's **Multimodality in Digital Texts — Websites & Blogs** activity.

**Start:** Open `index.html` in a browser or visit the GitHub Pages link after deployment. No local build tools are required. The core interactions work without the external motion libraries or Google Fonts (system-font fallback).

## GitHub Pages deployment — no coding or terminal required

1. Create a GitHub repository, e.g. `who-am-i-online`.
2. Unzip the package. Upload the **contents of the `WHO_AM_I_ONLINE` folder** to the repository root. Make sure `index.html`, `app.js`, `styles.css`, the `assets` directory, and `.github/workflows/pages.yml` are all present. (Do not upload the outer folder as an extra nesting level.)
3. Commit to the repository's `main` branch.
4. Go to **Settings → Pages → Build and deployment → Source: GitHub Actions**.
5. Go to the **Actions** tab and check that **Deploy to GitHub Pages** succeeds. The deployment link will appear in the deployment details and Settings → Pages. Depending on repository settings, the owner may need to allow Actions or trigger the workflow manually.
6. Open the published URL in an incognito browser, test the interactions, then submit that URL to your assignment.

**Alternative:** Under **Settings → Pages**, set **Deploy from a branch** → main / (root). Since this is a static website, branch publishing also works. If you choose branch publishing, the workflow isn't required.

**Important:** If the repository is public, the source code and website are public. A *private repository* alone does not necessarily make a GitHub Pages website private; verify the actual publication visibility and avoid sharing personal information. No backend, sign-up, actual social feed, or real public comment feature is included.

## What to test

- On desktop, tablet and phone: tap the navigation links; verify there is no sideways scrolling.
- In **The Mirror**: drag the split, then Tab to the range and press Left/Right arrows.
- In **The Feed**: test Attention, Connection and Creativity and verify the first post changes.
- In **Between the Lines**: make one choice in each of two conversations, inspect the illustrated outcome and reset.
- In **Your Code**: select exactly 3 rules; deselect one, replace it and download the SVG poster.
- Click **Hear the Intro** (uses the browser speech engine, if available) and **Sound** (user-controlled optional audio effects).
- Use keyboard-only navigation and try a device with `prefers-reduced-motion: reduce`.
- Check the live hosted page as well: the testing report covers local page injection, not live third-party/CDN delivery.

## Design + implementation

- Original visual identity: warm paper `#F2EDE4`, carbon ink `#191916`, hot vermilion `#EA4B2B`, supporting ink `#645F59`.
- Typography: Space Grotesk × Instrument Serif; DM Mono for micro-labels. All are Google Fonts loaded remotely (system fallbacks provided, no font file included).
- Original vector drawings: `identity-poster.svg`, `mirror-curated.svg`, `mirror-life.svg`, `cover.svg`, `favicon.svg`.
- **Actual external repositories/libraries used as runtime enhancement:** [GSAP](https://github.com/greensock/GSAP) pinned to 3.13.0 and [Lenis](https://github.com/darkroomengineering/lenis) pinned to 1.3.27 via jsDelivr. Both are optional; no React, WebGL, scroll-plugin conflict or build step.
- **Research/design process:** [UI UX Pro Max](https://github.com/nextlevelbuilder/ui-ux-pro-max-skill) accessibility and UX guidance informed the design checklist; [Awwwards MCP](https://github.com/INSANE0777/Awwwards-mcp) was reviewed as a reference-finding option, **not integrated into runtime**. [Stitch skills](https://github.com/google-labs-code/stitch-skills), [diagram-design](https://github.com/cathrynlavery/diagram-design) and heavyweight 3D stacks were deliberately excluded as unnecessary for a static documentary.
- Every dynamic text update uses `textContent` / DOM nodes. No unsanitised HTML injection, storage of personal content, API calls or public comments.

## Evidence and suitability

The claims and interactive contexts were informed by:

- Pew Research Center (22 April 2025): [Social Media and Teens' Mental Health](https://www.pewresearch.org/internet/2025/04/22/teens-social-media-and-mental-health/). US survey data, not Australian prevalence estimates.
- Australia's eSafety Commissioner: [Pressures from social media](https://www.esafety.gov.au/young-people/pressures-from-social-media) and [minimum-age requirements](https://www.esafety.gov.au/about-us/industry-regulation/social-media-age-restrictions).

Feed prioritisation and chat outcomes are **illustrative educational simulations**, not measurements or claims about specific algorithms or individual psychology.

## Files

| File | Description |
|---|---|
| `index.html` | Accessible semantic chapters and metadata |
| `styles.css` | All styling, responsive layouts, reduced motion |
| `app.js` | Interactive mirror, 3 lenses, 2 chats, manifesto, opt-in audio |
| `assets/*.svg` | Original vector artwork |
| `.github/workflows/pages.yml` | GitHub Pages deployment |
| `_headers` | Hardening on header-compatible hosts, **not GitHub Pages** |
| `SECURITY.md` | Threat model and limitations |
| `DESIGN_BLUEPRINT.md` | Creative direction, selected repositories and choreography |
| `QA_REPORT.md` | Self-audit, test results, unresolved verification |
| `ACTIVITY_3_REFLECTION_DRAFT.md` | Editable student reflection, check against real use before submitting |

## License

Original student project. Third-party libraries and external fonts retain their respective licenses. Do not claim award recognition or a professional valuation; “$100,000 level” was the requested *quality ambition*, not an independent appraisal.
