# Hanane Brush — Documentation

## Design direction: light-dominant merge

The site merges two references: **light-dominant** (calligraphic artist style) with **structured sections** (clean layout). Result:

- **Light backgrounds** for most content: `bg-surface`, `bg-primary/40`, `bg-primary/60`. Dark text: `text-tertiary`, `text-tertiary/80`.
- **Dark used only for impact**: hero (`bg-quaternary`) and one **Statement band** between Gallery and Artworks.
- **Accents**: `text-secondary`, `border-tertiary/10`, uppercase nav for editorial feel.

## Theme (Tailwind)

Defined in `src/index.css` via `@theme`. Reference in `src/theme/tailwindTheme.js`.

| Token       | Role |
|------------|------|
| `surface`  | Main content background (light). |
| `primary`  | Light grey; subtle panels, footer tint. |
| `secondary`| Gold accent; hover, focus. |
| `tertiary` | Dark brown; text and borders on light. |
| `quaternary` | Black; hero and statement band. |

Use only Tailwind classes (e.g. `bg-surface`, `text-tertiary`). No hardcoded hex.

## Components

- **layout/Header** — Fixed, light bg; logo `variant="light-bg"` (inverted for light), nav from `data/navigation.js`.
- **layout/Footer** — Light tint, same nav data; copyright.
- **layout/PageLayout** — Header + main (with `bg-surface`) + Footer.
- **ui/Logo** — `variant="dark-bg"` (default) or `"light-bg"` for header.
- **ui/Hero** — Dark hero; title + tagline; GSAP reveal.
- **gallery/GalleryGrid** — Renders `data/gallery.js`; light section; stagger reveal.
- **gallery/ArtworksSection** — Renders `data/artworks.js`; light section; stagger reveal.

## Data

- `data/navigation.js` — `navigationItems` (id, label, href).
- `data/gallery.js` — `galleryItems` (id, src, alt, caption).
- `data/artworks.js` — `artworks` (id, title, image, alt, description).

Add/remove entries there; UI uses `.map()` only.

## Animations (GSAP)

Centralized in `hooks/useGsap.js`:

- **useGsapReveal(options)** — Single element: from y + opacity, ScrollTrigger at 85%.
- **useGsapStagger(options)** — Parent with `[data-reveal]` children; staggered entrance.

No GSAP in JSX; pass refs from hooks.

## Extending

- New section: add to `pages/Home.jsx` or a new page; keep sections data-driven where possible.
- New nav item: add to `data/navigation.js`.
- New theme color: add in `@theme` in `index.css` and in `theme/tailwindTheme.js`; use only via Tailwind classes.
