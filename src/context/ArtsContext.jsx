import { createContext, useContext, useMemo } from 'react';
import { arts, galleryTypes, getArtsByType, getArtById } from '../data/arts';

const ArtsContext = createContext(null);

export function useArts() {
  const ctx = useContext(ArtsContext);
  if (!ctx) throw new Error('useArts must be used within ArtsProvider');
  return ctx;
}

/**
 * Provides arts data: list (name, description, image, type) and gallery types
 * for filtering (marriage, religion, omrah, etc.).
 */
export function ArtsProvider({ children }) {
  const value = useMemo(
    () => ({
      arts,
      galleryTypes,
      getArtsByType,
      getArtById,
    }),
    []
  );

  return <ArtsContext.Provider value={value}>{children}</ArtsContext.Provider>;
}
