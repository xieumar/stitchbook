import {
  slugifyKey,
  templateToDrafts,
  toTemplateInput,
  validateTemplateDraft,
  type DraftCategory,
} from '../template-form';

const draft = (labels: string[], keys: (string | undefined)[] = []): DraftCategory[] => [
  {
    id: 'cat',
    label: 'Body',
    fields: labels.map((label, i) => ({ id: `f${i}`, key: keys[i], label })),
  },
];

describe('slugifyKey', () => {
  it('lowercases and joins words with underscores', () => {
    expect(slugifyKey('  Upper Arm ')).toBe('upper_arm');
    expect(slugifyKey('Waist (natural)')).toBe('waist_natural');
  });

  it('falls back to "field" when nothing usable is left', () => {
    expect(slugifyKey('???')).toBe('field');
  });
});

describe('validateTemplateDraft', () => {
  it('requires a name and at least one non-blank field', () => {
    expect(validateTemplateDraft(' ', draft(['  ']))).toEqual({
      name: 'Give the template a name',
      fields: 'Add at least one measurement',
    });
    expect(validateTemplateDraft('Shirt', draft(['Chest']))).toEqual({});
  });
});

describe('toTemplateInput', () => {
  it('drops blank fields and empty categories', () => {
    const input = toTemplateInput('  Shirt ', [
      ...draft(['Chest', '  ']),
      { id: 'empty', label: 'Unused', fields: [{ id: 'x', label: '' }] },
    ]);
    expect(input.name).toBe('Shirt');
    expect(input.categories).toHaveLength(1);
    expect(input.categories[0].fields).toEqual([{ key: 'chest', label: 'Chest' }]);
  });

  it('makes new keys unique, also against saved keys', () => {
    const input = toTemplateInput('T', draft(['Arm', 'Arm', 'Other'], ['arm_2', undefined, undefined]));
    expect(input.categories[0].fields.map((f) => f.key)).toEqual(['arm_2', 'arm', 'other']);
  });

  it('keeps the key of an existing field when its label is renamed', () => {
    const input = toTemplateInput('T', draft(['Chest girth'], ['chest']));
    expect(input.categories[0].fields[0]).toEqual({ key: 'chest', label: 'Chest girth' });
  });
});

describe('templateToDrafts', () => {
  it('carries saved keys into the drafts', () => {
    let n = 0;
    const drafts = templateToDrafts(
      {
        id: 't',
        name: 'T',
        kind: 'custom',
        categories: [{ id: 'c', label: 'Body', fields: [{ key: 'chest', label: 'Chest' }] }],
      },
      () => `id${n++}`,
    );
    expect(drafts[0].fields[0]).toEqual({ id: 'id0', key: 'chest', label: 'Chest' });
  });
});
