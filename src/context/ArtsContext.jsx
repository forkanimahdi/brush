import { createContext, useContext, useMemo } from 'react';
import { arts as artsData, galleryTypes, getArtsByType as getArtsByTypeOrig, getArtById as getArtByIdOrig } from '../data/arts';

// Resolve art images from src/assets/images/arts/ (Vite serves these with correct URLs)
const artImageUrls = import.meta.glob('../assets/images/arts/*.webp', { eager: true, as: 'url' });
const imageUrlByFilename = Object.fromEntries(
  Object.entries(artImageUrls).map(([path, url]) => [path.split('/').pop(), url])
);

function resolveArtsWithUrls() {
  return artsData.map((art) => {
    const filename = art.image.replace(/^\/arts\//, '');
    return { ...art, image: imageUrlByFilename[filename] || art.image };
  });
}

const artsResolved = resolveArtsWithUrls();

function getArtsByType(type) {
  return type ? artsResolved.filter((a) => a.type === type) : artsResolved;
}

function getArtById(id) {
  return artsResolved.find((a) => a.id === id) ?? null;
}

const ArtsContext = createContext(null);

export function useArts() {
  const ctx = useContext(ArtsContext);
  if (!ctx) throw new Error('useArts must be used within ArtsProvider');
  return ctx;
}

/**
 * Provides arts data: list (name, description, image, type) and gallery types.
 * Image URLs are resolved from src/assets/images/arts/.
 */
export function ArtsProvider({ children }) {
  const value = useMemo(
    () => ({
      arts: artsResolved,
      galleryTypes,
      getArtsByType,
      getArtById,
    }),
    []
  );

  return <ArtsContext.Provider value={value}>{children}</ArtsContext.Provider>;
}
