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

- **layout/Header** — Fixed, light bg; logo `variant="light-bg"` (Link to `/`); nav from `data/navigation.js`; artist social from `data/social.js`. **Responsive**: hamburger on mobile opens a **slide-in panel from the right** (max 280px) with nav + Follow social; overlay behind; horizontal nav on md+.
- **layout/Footer** — Light tint, nav + **SocialLinks** + copyright.
- **layout/PageLayout** — Header + main (bg-surface) + Footer.
- **ui/Logo** — `variant="dark-bg"` (default) or `"light-bg"` for header.
- **ui/SocialLinks** — Artist social links from `data/social.js`; icons by id; theme classes only.
- **ui/Hero** — Dark hero; title + tagline; GSAP reveal.
- **gallery/GallerySection** — CTA “Enter Gallery” opens fullscreen 3D carousel; GSAP reveal.
- **gallery/GalleryCarousel** — 3D carousel (reference-style): **soft gradient** background (theme colors), **center card largest**, sides **scale down** by position. Rounded-xl cards, swipe/drag, click → `/gallery/:id`. **Mobile**: smaller slides/radius, less tilt (useCarouselDimensions). No floating decorations (clean). Renders `data/gallery.js`.
- **gallery/ArtworksSection** — Renders `data/artworks.js`; light section; stagger reveal.
- **pages/GalleryDetail** — Detail page for one gallery item (`/gallery/:id`); uses `getGalleryItemById(id)`; image, caption, description, back link.

## Data

- `data/navigation.js` — `navigationItems` (id, label, href e.g. `#gallery`). Nav links use `/${href}` for home + hash.
- `data/social.js` — `socialLinks` (id, label, href, ariaLabel). Artist social; add/remove here.
- `data/gallery.js` — `galleryItems` (id, slug, src, alt, caption, description). Used by 3D carousel and **GalleryDetail** page. `getGalleryItemById(id)` for detail route. Placeholder images: Picsum; replace `src` with real paths.
- `data/artworks.js` — `artworks` (id, slug, title, image, alt, description). Placeholder images: Picsum. `getArtworkById(id)` available.

Add/remove entries there; UI uses `.map()` only.

## Routing

- **React Router**: `/` = Home, `/gallery/:id` = GalleryDetail (image + caption + description, back to home).
- Clicking a slide in the 3D carousel closes the modal and navigates to `/gallery/:id`.

## Animations (GSAP)

Centralized in hooks; no GSAP in JSX.

- **hooks/useGsap.js** — useGsapReveal(options): single element entrance, ScrollTrigger 85%. useGsapStagger(options): parent with `[data-reveal]` children; staggered entrance.
- **hooks/useModalTransition.js** — useModalTransition(options): backdropRef, contentRef, animateIn(), animateOut(onComplete). Premium open/close timeline for modals.
- **hooks/useCarousel.js** — useCarousel(items, options): trackRef, currentIndex, goNext, goPrev. GSAP track translateX (flat carousel).
- **hooks/useCarousel3D.js** — useCarousel3D(items, options): ringRef, currentIndex, goNext, goPrev, angleStep. GSAP ring rotateY for 3D carousel.
- **hooks/useCarouselDimensions.js** — useCarouselDimensions(): returns responsive { slideWidth, slideHeight, radius, perspectiveTilt, viewportMinHeight, perspective } for mobile (<768) vs desktop. Keeps carousel clean on mobile.
- **hooks/useSwipe.js** — useSwipe({ onNext, onPrev }): touch and mouse handlers for swipe/drag. Threshold 50px.

## Extending

- New section: add to `pages/Home.jsx` or a new page; keep sections data-driven where possible.
- New nav item: add to `data/navigation.js`.
- New social link: add to `data/social.js`; add icon in `ui/SocialLinks.jsx` icons map by id.
- New gallery image: add to `data/gallery.js`; 3D carousel picks it up via `.map()`.
- New theme color: add in `@theme` in `index.css` and in `theme/tailwindTheme.js`; use only via Tailwind classes.
