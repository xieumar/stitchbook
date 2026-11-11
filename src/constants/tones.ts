/** Pastel surfaces from the Blush palette. Class names are literal so Tailwind can see them. */
export const TILE_BG = {
  butter: 'bg-tile-butter',
  lilac: 'bg-tile-lilac',
  mint: 'bg-tile-mint',
  sky: 'bg-tile-sky',
  hero: 'bg-hero',
  white: 'bg-white',
} as const;

export type TileTone = keyof typeof TILE_BG;

/** Rotation used for initial avatars until a client photo is added. */
export const AVATAR_TONES: readonly TileTone[] = ['hero', 'butter', 'lilac', 'mint', 'sky'];
