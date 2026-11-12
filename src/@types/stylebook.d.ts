// Global ambient types for the stylebook domain (no import/export: available everywhere).
// Use specific names to avoid collisions with DOM / React Native globals.

interface AlterationNote {
  id: string;
  text: string;
  createdAt: string;
}

interface StylebookEntry {
  clientId: string;
  styles: string[];
  colors: string[];
  fabrics: string[];
  fit?: string;
  instructions?: string;
  alterationNotes: AlterationNote[];
  /** Local URIs of reference images. */
  referenceImages: string[];
  updatedAt: string;
}

type StylebookPreferences = Partial<
  Pick<StylebookEntry, 'styles' | 'colors' | 'fabrics' | 'fit' | 'instructions'>
>;
