# Hanane Brush

Luxury calligraphic artist portfolio & gallery website. Light-dominant, minimal, editorial design with a 3D gallery carousel and image detail pages.

## Tech stack

- **React** (JSX) + **Vite**
- **Tailwind CSS** only (no separate CSS files; theme variables in `src/index.css`)
- **GSAP** for animations (scroll reveals, modal transitions, 3D carousel rotation)
- **React Router** for routes (home, gallery detail)
- Fully responsive (mobile-first → ultra-wide)

## What’s included

### Design

- **Light-dominant theme**: main content on light backgrounds (`surface`, `primary`); dark used for hero and one statement band.
- **Tailwind theme**: `primary`, `secondary`, `tertiary`, `quaternary`, `surface` (no hardcoded colors in UI).
- **Typography**: clear hierarchy, uppercase section titles, editorial feel.

### 3D gallery carousel

- Fullscreen modal opened from the “Enter Gallery” CTA on the home page.
- **3D effect**: center image dominant and flat; left/right images angled and partially visible (~2/3) for a real sliding view.
- **Click any image** → navigates to a **gallery detail page** (`/gallery/:id`) with that image and its caption/description.
- Prev/Next arrows on the far left and far right of the carousel; GSAP animates ring rotation.

### Routing

- **`/`** — Home (hero, gallery CTA, statement band, artworks, about, contact).
- **`/gallery/:id`** — Gallery item detail (image, caption, description, back link). Data from `src/data/gallery.js`.

### Responsive navbar

- **Desktop (md+)**: horizontal nav + social icons.
- **Mobile**: hamburger opens a **slide-in panel from the right** (max 280px), overlay behind; nav links + “Follow” social; tap overlay or close to dismiss. No full-screen takeover.

### Data & placeholders

- **Gallery** (`src/data/gallery.js`): `galleryItems` with id, slug, src, alt, caption, description. Placeholder images use [Picsum](https://picsum.photos) (replace `src` with real paths when ready).
- **Artworks** (`src/data/artworks.js`): same pattern with Picsum placeholders.
- **Navigation** (`src/data/navigation.js`), **Social** (`src/data/social.js`): data-driven; UI renders via `.map()`.

### GSAP (centralized in hooks)

- `useGsapReveal` — scroll-triggered entrance.
- `useGsapStagger` — staggered children reveal.
- `useModalTransition` — modal open/close timeline.
- `useCarousel3D` — 3D ring rotation for carousel.

## Commands

```bash
npm install
npm run dev    # dev server
npm run build  # production build
npm run preview # preview build
```

## Project structure (high level)

```
src/
├── components/
│   ├── layout/     # Header, Footer, PageLayout
│   ├── gallery/    # GallerySection, GalleryCarousel
│   └── ui/         # Logo, Hero, SocialLinks
├── data/           # navigation, social, gallery, artworks (all .js)
├── pages/          # Home, GalleryDetail
├── hooks/          # useGsap, useCarousel3D, useModalTransition
├── theme/          # tailwindTheme.js (reference)
├── docs/           # documentation.md
└── assets/
```

## Replacing placeholders

- **Gallery images**: Edit `src/data/gallery.js` — set `src` to your image paths (e.g. `/gallery/your-image.jpg` in `public/` or imported from `assets/`).
- **Artworks**: Same in `src/data/artworks.js` for `image`.
- **Social links**: Update `href` (and optionally `ariaLabel`) in `src/data/social.js`.

## Deployment

Single-page app: serve `index.html` for all routes (e.g. `/gallery/1`) so React Router works. Most hosts (Vercel, Netlify, etc.) do this by default for SPAs.

## Documentation

See `src/docs/documentation.md` for design direction, theme, components, data, GSAP hooks, and how to extend.
# test
# test
