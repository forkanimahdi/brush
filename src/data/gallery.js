/**
 * Gallery images for the portfolio. Add image paths and captions here.
 * Components render via .map() — no hardcoded blocks.
 * Placeholder images: Picsum (replace with real paths when ready).
 */
const PICSUM = (seed, w = 800, h = 600) =>
  `https://picsum.photos/seed/${seed}/${w}/${h}`;

export const galleryItems = [
  {
    id: 'gallery-1',
    slug: 'ink-and-paper',
    src: PICSUM('calligraphy-1'),
    alt: 'Calligraphic work one',
    caption: 'Ink & paper',
    description: 'Traditional ink on handmade paper. A study in contrast and flow.',
  },
  {
    id: 'gallery-2',
    slug: 'gold-leaf-script',
    src: PICSUM('calligraphy-2'),
    alt: 'Calligraphic work two',
    caption: 'Gold leaf & script',
    description: 'Gold leaf and classical script. Commissioned piece.',
  },
  {
    id: 'gallery-3',
    slug: 'traditional-script',
    src: PICSUM('calligraphy-3'),
    alt: 'Calligraphic work three',
    caption: 'Traditional script',
    description: 'Brush and sumi ink. Traditional script with contemporary spacing.',
  },
  {
    id: 'gallery-4',
    slug: 'flowing-strokes',
    src: PICSUM('calligraphy-4'),
    alt: 'Calligraphic work four',
    caption: 'Flowing strokes',
    description: 'Ink and brush on rice paper.',
  },
  {
    id: 'gallery-5',
    slug: 'minimal-script',
    src: PICSUM('calligraphy-5'),
    alt: 'Calligraphic work five',
    caption: 'Minimal script',
    description: 'Minimalist calligraphy with ample negative space.',
  },
  {
    id: 'gallery-6',
    slug: 'gold-accents',
    src: PICSUM('calligraphy-6'),
    alt: 'Calligraphic work six',
    caption: 'Gold accents',
    description: 'Black ink with gold leaf accents.',
  },
  {
    id: 'gallery-7',
    slug: 'contemporary-form',
    src: PICSUM('calligraphy-7'),
    alt: 'Calligraphic work seven',
    caption: 'Contemporary form',
    description: 'Contemporary calligraphic form on canvas.',
  },
];

export function getGalleryItemById(id) {
  return galleryItems.find((item) => item.id === id) ?? null;
}
