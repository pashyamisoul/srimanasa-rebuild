# Srimanasa — The Power of Synergy

A modern, single-page rebuild of the [Srimanasa](https://srimanasa.in) financial-services website —
investment advisory, payroll, EPF, ESIC, GST, accounting and income-tax, all under one roof since 2012.

Built with plain **HTML, CSS and JavaScript** (no build step), so it deploys anywhere static.

## Highlights

- **Single-page** experience with smooth anchor navigation
- **Modern fintech / premium** design, built around the orange "Power of Synergy" logo
- **Four switchable color palettes** — Midnight Navy, Warm Espresso, Clean Light, Sand & Terracotta
- Animated aurora background, glassmorphism cards, scroll-reveal and animated stat counters
- Fully **responsive** and respects `prefers-reduced-motion`
- SEO + Open Graph meta tags

## Project structure

```text
srimanasa-rebuild/
├── index.html          # the site (uses the theme switcher)
├── css/style.css       # design system + 4 themes (CSS variables + color-mix)
├── js/main.js          # nav, theme switcher, scroll-reveal, counters, contact form
├── images/             # logo-full.png (with tagline) + logo-mark.png (ripple only)
└── dist/               # self-contained single-file builds (one per palette + combined)
```

## Local preview

Open `index.html` directly in a browser, or serve the folder with any static server.

The `dist/` files are fully self-contained (CSS, JS and logo inlined) — each opens standalone,
useful for sharing on a phone.

## Notes

- The contact form opens the visitor's email client (`mailto:`) since this is a static site.
  It can be wired to Formspree / Web3Forms for real submissions.

---

© 2026 Srimanasa · Bidar & Hyderabad, India
