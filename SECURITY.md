# Security, privacy and resilience

This is an educational static document, not a social-media service.

## Boundaries

- No server-side input, user accounts, database, analytics, trackers, comments wall, or hidden submission endpoint.
- Interactive feed and message content is fixed within `app.js`. User-selected options are kept in page memory only. No content is stored in localStorage, cookies or a backend.
- `textContent`, `replaceChildren`, predefined object lists and `DOM` APIs are used instead of constructing user-provided HTML. The generated SVG escapes XML-sensitive characters.
- Exports happen only in response to a button press, with an object URL revoked shortly after download.
- The narration engine uses the browser's built-in speech synthesis where supported. Interface sounds use an on-demand Web Audio oscillator. Neither records input. Both require a click; sound does not autoplay.
- Scroll animation libraries are optional and isolated in try/catch. Without external JS or Google Fonts, native controls and system fonts still work.

## CSP

The HTML contains an enforcing **meta CSP**:

`default-src 'self'; script-src 'self' https://cdn.jsdelivr.net; style-src 'self' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data:; connect-src 'self'; media-src 'self'; object-src 'none'; base-uri 'self'; form-action 'none'; upgrade-insecure-requests`

All scripts are external resources or first-party files. Inline styles were removed from markup. The `_headers` file is for hosts that support custom response headers: on those hosts it also adds `frame-ancestors 'none'`, `nosniff`, framing protection and referrer/permissions policies.

**GitHub Pages limitation:** GitHub Pages does not interpret `_headers`. Its live site still enforces the meta CSP, but `frame-ancestors`/other HTTP-only protections cannot be enforced by that file. Do not claim that GitHub Pages provides those HTTP response headers.

**Third-party network requests:** Fonts download from Google Fonts, and optional GSAP/Lenis libraries download from jsDelivr. Those providers may receive normal request metadata; the site itself neither collects nor transmits user choices. For an entirely first-party-only deployment, remove the optional CDN script tags and font stylesheet and use CSS system fallbacks.

**Threat assumptions:** GitHub deployment credentials and hosting configuration remain the repository owner's responsibility. Review dependencies and hosted response headers before claiming a hardened production environment.

## Accessibility and stability

- Range slider: keyboard arrows, native touch, focus indicator, meaningful label.
- Scene image text alternatives, semantic headings, skip link, reading progress, live status text.
- Buttons have accessible names and pressed/expanded state where appropriate.
- `prefers-reduced-motion` disables motion and tones; no blocking loading screen.
- Small-screen layout avoids horizontal overflow and does not rely on hover.
- No WebGL or canvas: no GPU context requirement and no fallback complexity.
