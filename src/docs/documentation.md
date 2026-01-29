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

- **layout/Header** — Fixed, light bg; logo `variant="light-bg"`; nav from `data/navigation.js`; artist social from `data/social.js`.
- **layout/Footer** — Light tint, nav + **SocialLinks** + copyright.
- **layout/PageLayout** — Header + main (bg-surface) + Footer.
- **ui/Logo** — `variant="dark-bg"` (default) or `"light-bg"` for header.
- **ui/SocialLinks** — Artist social links from `data/social.js`; icons by id; theme classes only.
- **ui/Hero** — Dark hero; title + tagline; GSAP reveal.
- **gallery/GallerySection** — CTA “Enter Gallery” opens fullscreen 3D carousel; GSAP reveal.
- **gallery/GalleryCarousel** — Fullscreen modal 3D carousel; renders `data/gallery.js`; GSAP open/close (useModalTransition) and ring rotation (useCarousel3D); prev/next, close, caption.
- **gallery/ArtworksSection** — Renders `data/artworks.js`; light section; stagger reveal.

## Data

- `data/navigation.js` — `navigationItems` (id, label, href).
- `data/social.js` — `socialLinks` (id, label, href, ariaLabel). Artist social; add/remove here.
- `data/gallery.js` — `galleryItems` (id, src, alt, caption). Used by 3D carousel.
- `data/artworks.js` — `artworks` (id, title, image, alt, description).

Add/remove entries there; UI uses `.map()` only.

## Animations (GSAP)

Centralized in hooks; no GSAP in JSX.

- **hooks/useGsap.js** — useGsapReveal(options): single element entrance, ScrollTrigger 85%. useGsapStagger(options): parent with `[data-reveal]` children; staggered entrance.
- **hooks/useModalTransition.js** — useModalTransition(options): backdropRef, contentRef, animateIn(), animateOut(onComplete). Premium open/close timeline for modals.
- **hooks/useCarousel3D.js** — useCarousel3D(items, options): ringRef, currentIndex, goNext, goPrev, setCurrentIndex, angleStep. GSAP animates ring rotateY for 3D carousel.

## Extending

- New section: add to `pages/Home.jsx` or a new page; keep sections data-driven where possible.
- New nav item: add to `data/navigation.js`.
- New social link: add to `data/social.js`; add icon in `ui/SocialLinks.jsx` icons map by id.
- New gallery image: add to `data/gallery.js`; 3D carousel picks it up via `.map()`.
- New theme color: add in `@theme` in `index.css` and in `theme/tailwindTheme.js`; use only via Tailwind classes.
