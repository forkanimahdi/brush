/**
 * Artworks for the portfolio. Add title, image, description, category (for filters).
 * Components render via .map() — no hardcoded blocks.
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
    category: 'ink',
  },
  {
    id: 'artwork-2',
    slug: 'golden-script',
    title: 'Golden Script',
    image: PICSUM('artwork-2'),
    alt: 'Golden Script',
    description: 'Gold leaf and traditional calligraphy.',
    category: 'gold-leaf',
  },
  {
    id: 'artwork-3',
    slug: 'silent-flow',
    title: 'Silent Flow',
    image: PICSUM('artwork-3'),
    alt: 'Silent Flow',
    description: 'Brush and sumi ink.',
    category: 'brush',
  },
  {
    id: 'artwork-4',
    slug: 'morning-stroke',
    title: 'Morning Stroke',
    image: PICSUM('artwork-4'),
    alt: 'Morning Stroke',
    description: 'Ink on rice paper.',
    category: 'ink',
  },
  {
    id: 'artwork-5',
    slug: 'crimson-script',
    title: 'Crimson Script',
    image: PICSUM('artwork-5'),
    alt: 'Crimson Script',
    description: 'Gold leaf accents on deep red.',
    category: 'gold-leaf',
  },
  {
    id: 'artwork-6',
    slug: 'flowing-form',
    title: 'Flowing Form',
    image: PICSUM('artwork-6'),
    alt: 'Flowing Form',
    description: 'Brush and ink, contemporary spacing.',
    category: 'brush',
  },
];

export const artworkCategories = [
  { id: 'all', label: 'All', value: '' },
  { id: 'ink', label: 'Ink', value: 'ink' },
  { id: 'gold-leaf', label: 'Gold leaf', value: 'gold-leaf' },
  { id: 'brush', label: 'Brush', value: 'brush' },
];

export function getArtworkById(id) {
  return artworks.find((item) => item.id === id) ?? null;
}

export function getArtworksByCategory(category) {
  if (!category) return artworks;
  return artworks.filter((item) => item.category === category);
}
