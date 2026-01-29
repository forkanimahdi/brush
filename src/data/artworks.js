/**
 * Featured artworks for the portfolio. Add title, image, description.
 * Components render via .map() — no hardcoded blocks.
 * Placeholder images: Picsum (replace with real paths when ready).
 */
const PICSUM = (seed, w = 800, h = 600) =>
  `https://picsum.photos/seed/${seed}/${w}/${h}`;

export const artworks = [
  {
    id: 'artwork-1',
    slug: 'first-light',
    title: 'First Light',
    image: PICSUM('artwork-1'),
    alt: 'First Light',
    description: 'Ink on handmade paper.',
  },
  {
    id: 'artwork-2',
    slug: 'golden-script',
    title: 'Golden Script',
    image: PICSUM('artwork-2'),
    alt: 'Golden Script',
    description: 'Gold leaf and traditional calligraphy.',
  },
  {
    id: 'artwork-3',
    slug: 'silent-flow',
    title: 'Silent Flow',
    image: PICSUM('artwork-3'),
    alt: 'Silent Flow',
    description: 'Brush and sumi ink.',
  },
];

export function getArtworkById(id) {
  return artworks.find((item) => item.id === id) ?? null;
}
