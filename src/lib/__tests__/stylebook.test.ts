import {
  addChip,
  entryToDraft,
  hasPreferences,
  removeChip,
  toStylebookPreferences,
} from '../stylebook';

const entry = (extra: Partial<StylebookEntry> = {}): StylebookEntry => ({
  clientId: 'c1',
  styles: [],
  colors: [],
  fabrics: [],
  alterationNotes: [],
  referenceImages: [],
  updatedAt: '2026-01-01T00:00:00.000Z',
  ...extra,
});

describe('chips', () => {
  it('adds trimmed text and ignores blanks and duplicates', () => {
    expect(addChip(['Kaftan'], '  Agbada ')).toEqual(['Kaftan', 'Agbada']);
    expect(addChip(['Kaftan'], '   ')).toEqual(['Kaftan']);
    expect(addChip(['Kaftan'], 'kaftan')).toEqual(['Kaftan']);
  });

  it('removes by text', () => {
    expect(removeChip(['a', 'b'], 'a')).toEqual(['b']);
  });
});

describe('stylebook drafts', () => {
  it('starts empty for a client without an entry', () => {
    expect(entryToDraft(undefined)).toEqual({
      styles: [],
      colors: [],
      fabrics: [],
      fit: '',
      instructions: '',
    });
  });

  it('stores blank fit and instructions as undefined', () => {
    const prefs = toStylebookPreferences({
      ...entryToDraft(undefined),
      fit: ' ',
      instructions: ' Loose sleeves ',
    });
    expect(prefs.fit).toBeUndefined();
    expect(prefs.instructions).toBe('Loose sleeves');
  });

  it('reports whether anything is saved', () => {
    expect(hasPreferences(undefined)).toBe(false);
    expect(hasPreferences(entry())).toBe(false);
    expect(hasPreferences(entry({ fabrics: ['Lace'] }))).toBe(true);
    expect(hasPreferences(entry({ fit: 'Slim' }))).toBe(true);
  });
});
