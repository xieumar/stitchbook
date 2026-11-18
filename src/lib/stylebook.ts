/** Adds a chip: trimmed, ignored when empty or already there (case-insensitive). */
export function addChip(chips: readonly string[], text: string): string[] {
  const value = text.trim();
  if (!value) return [...chips];
  if (chips.some((chip) => chip.toLowerCase() === value.toLowerCase())) return [...chips];
  return [...chips, value];
}

/** Removes one chip by its text. */
export function removeChip(chips: readonly string[], text: string): string[] {
  return chips.filter((chip) => chip !== text);
}

export type StylebookDraft = {
  styles: string[];
  colors: string[];
  fabrics: string[];
  fit: string;
  instructions: string;
};

/** Form values for an entry; an empty draft when the client has no stylebook yet. */
export function entryToDraft(entry: StylebookEntry | undefined): StylebookDraft {
  return {
    styles: entry?.styles ?? [],
    colors: entry?.colors ?? [],
    fabrics: entry?.fabrics ?? [],
    fit: entry?.fit ?? '',
    instructions: entry?.instructions ?? '',
  };
}

/** Preferences to save: trimmed text, and empty text stored as undefined. */
export function toStylebookPreferences(draft: StylebookDraft): StylebookPreferences {
  return {
    styles: draft.styles,
    colors: draft.colors,
    fabrics: draft.fabrics,
    fit: draft.fit.trim() || undefined,
    instructions: draft.instructions.trim() || undefined,
  };
}

/** True when the client has any style preference saved. */
export function hasPreferences(entry: StylebookEntry | undefined): boolean {
  if (!entry) return false;
  return (
    entry.styles.length > 0 ||
    entry.colors.length > 0 ||
    entry.fabrics.length > 0 ||
    !!entry.fit ||
    !!entry.instructions
  );
}
