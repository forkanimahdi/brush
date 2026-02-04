/**
 * Gallery types used to filter/group arts. Shown in gallery as category tabs or filters.
 */
export const galleryTypes = [
  { id: 'marriage', label: 'Marriage' },
  { id: 'religion', label: 'Religion' },
  { id: 'omrah', label: 'Omrah' },
  { id: 'celebration', label: 'Celebration' },
  { id: 'heritage', label: 'Heritage' },
  { id: 'custom', label: 'Custom' },
  { id: 'invitation', label: 'Invitation' },
];

/** Map category number (from filename prefix) to gallery type id */
const categoryToType = {
  1: 'marriage',
  2: 'religion',
  3: 'omrah',
  4: 'celebration',
  5: 'heritage',
  6: 'custom',
  7: 'invitation',
};

/**
 * Build arts list from the arts folder pattern: [category]-[item].webp
 * Image paths are under /arts/ (place arts folder in public/).
 */
function buildArts() {
  const entries = [
    { cat: 1, item: 1 }, { cat: 1, item: 2 },
    { cat: 2, item: 1 }, { cat: 2, item: 2 },
    { cat: 3, item: 1 }, { cat: 3, item: 2 }, { cat: 3, item: 3 },
    { cat: 4, item: 1 }, { cat: 4, item: 2 },
    { cat: 5, item: 1 }, { cat: 5, item: 2 },
    { cat: 6, item: 1 }, { cat: 6, item: 2 },
    { cat: 7, item: 1 }, { cat: 7, item: 2 }, { cat: 7, item: 3 },
  ];

  const typeLabels = Object.fromEntries(galleryTypes.map((t) => [t.id, t.label]));

  return entries.map(({ cat, item }, index) => {
    const typeId = categoryToType[cat] ?? 'custom';
    const typeLabel = typeLabels[typeId] ?? 'Custom';
    const filename = `${cat}-${item}.webp`;
    return {
      id: `art-${cat}-${item}`,
      name: `${typeLabel} — Piece ${item}`,
      description: `Calligraphic work for ${typeLabel.toLowerCase()}. Handcrafted with traditional script and contemporary sensibility.`,
      image: `/arts/${filename}`,
      type: typeId,
    };
  });
}

export const arts = buildArts();

export function getArtsByType(type) {
  if (!type) return arts;
  return arts.filter((art) => art.type === type);
}

export function getArtById(id) {
  return arts.find((a) => a.id === id) ?? null;
}
