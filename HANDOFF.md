# Srimanasa rebuild: handover (2026-11-21)

Written for whoever works on this next. It is a static single-page rebuild
of srimanasa.in, a financial services firm (investments, payroll, EPF,
ESIC, GST, accounting, income tax) based in Bidar and Hyderabad, run by
Mallikarjun Reddy. No build step, no framework.

## Live resources

| Thing | Value |
| --- | --- |
| Live demo | https://pashyamisoul.github.io/srimanasa-rebuild/ (GitHub Pages, main branch, root) |
| Repo | https://github.com/pashyamisoul/srimanasa-rebuild (public) |
| Production domain | srimanasa.in still runs the ORIGINAL site, built by Vision Digital Ads (visiondigitalads.com, info@visiondigitalads.com) |
| Domain cutover | Amith emailed Vision Digital Ads on 2026-11-21 asking for hosting and registrar details; waiting on their reply. Contact at the business: Chaya Malshetty |

Deploy flow: push to main and GitHub Pages rebuilds in about a minute.
There is no staging; the Pages demo IS the preview.

## Structure

- `index.html` plus `css/style.css` and `js/main.js` is the real site.
- Four palettes switched via `data-theme` on `<html>` (navy, espresso,
  light, sand), persisted in localStorage under `srimanasa-theme`. All
  colors come from CSS variables, so new components must use variables,
  never hard-coded colors.
- `dist/` holds five STANDALONE demo pages (one per palette plus a
  combined switcher). Each inlines all CSS and JS, and embeds the two
  logos as base64 data URIs. **Every change to index.html or style.css
  must be mirrored into all five dist files**, with image paths changed
  from `images/...` to `../images/...`. Past sessions scripted this with
  python string replacement; anchors like the section comments
  (`<!-- ===== Services ===== -->`) work well. Do not replace the dist
  footer logo with a file path; it is a base64 URI on purpose.

## Changes made 2026-11-21

1. **Copy style**: all em dashes removed site-wide (commit `42e1709`).
   Amith's standing rule: no em dashes in any copy, docs, or commits.
   Use commas, colons, or semicolons.
2. **Footer** (commit `e2552f7`): four-column business footer with brand
   tagline, social icons (only WhatsApp is wired; LinkedIn, Facebook,
   Instagram are `#` placeholders), quick links, services list, both
   office addresses, phones, email, business hours placeholder, mutual
   fund risk disclaimer, general disclaimer with a bracketed ARN/SEBI
   placeholder, Privacy Policy and Terms `#` placeholders, and the
   credit line "Website designed & built by Amith Rajolkar · PashyamiSoul"
   linking to https://pashyamisoul-site.vercel.app.
3. **Imagery** (commits `630a09d`, `2f7ef5c`, `07f7eed`): six Unsplash
   photos (free license, no attribution needed), resized with sips:
   - `images/hero-towers.jpg`: hero background at 0.16 opacity under a
     fade gradient, tinted by whichever palette is active
   - `images/about-analytics.jpg`: About section figure
   - `images/band-advisors.jpg`: full-width image band before Services
   - `images/services-market.jpg`: rising market chart, Services figure
   - `images/why-growth.jpg`: sprout-from-coins, Why Us figure
   - `images/band-handshake.jpg`: image band before Contact
   Components: `.about-photo` (framed figure with caption) and
   `.img-band` (full-width strip with italic caption). Rejected on
   purpose: falling charts, US dollars, US tax forms, Bitcoin; keep
   imagery upward-trending and country-neutral or Indian.

## Open items

- Replace bracketed placeholders when Chaya provides details: business
  hours, AMFI ARN / SEBI registration (or delete that line if none),
  social profile URLs, Privacy Policy and Terms pages.
- Domain cutover to srimanasa.in once Vision Digital Ads replies
  (point DNS at GitHub Pages or Vercel, or upload to their hosting).
- Real office and team photos from the client would beat the stock
  photos; swap them in when available.
- The business also uses srimanasapayrollsolutions@gmail.com and phones
  +91 80884 23301 and +91 70260 00312 (already in the site).
