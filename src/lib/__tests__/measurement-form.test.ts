import {
  buildFormTexts,
  convertFormTexts,
  hasAnyValue,
  templateFieldKeys,
  toMeasurementValues,
} from '../measurement-form';

const template: MeasurementTemplate = {
  id: 't1',
  name: 'Test',
  kind: 'custom',
  categories: [
    {
      id: 'upper',
      label: 'Upper',
      fields: [
        { key: 'bust', label: 'Bust' },
        { key: 'waist', label: 'Waist' },
      ],
    },
    { id: 'lower', label: 'Lower', fields: [{ key: 'hip', label: 'Hip' }] },
  ],
};

describe('templateFieldKeys', () => {
  it('lists keys across categories in order', () => {
    expect(templateFieldKeys(template)).toEqual(['bust', 'waist', 'hip']);
  });
});

describe('buildFormTexts', () => {
  it('starts every field empty', () => {
    expect(buildFormTexts(template)).toEqual({ bust: '', waist: '', hip: '' });
  });

  it('prefills from existing values and ignores keys not in the template', () => {
    const existing: MeasurementValue[] = [
      { key: 'bust', label: 'Bust', value: 90.5 },
      { key: 'waist', label: 'Waist', value: null },
      { key: 'gone', label: 'Gone', value: 10 },
    ];
    expect(buildFormTexts(template, existing)).toEqual({ bust: '90.5', waist: '', hip: '' });
  });
});

describe('convertFormTexts', () => {
  it('converts filled fields and leaves empty ones empty', () => {
    expect(convertFormTexts({ bust: '10', waist: '', hip: '25.4' }, 'in', 'cm')).toEqual({
      bust: '25.4',
      waist: '',
      hip: '64.5',
    });
  });

  it('leaves half-typed text untouched', () => {
    expect(convertFormTexts({ bust: '.', waist: '', hip: '' }, 'cm', 'in').bust).toBe('.');
  });

  it('is a no-op for the same unit', () => {
    const texts = { bust: '90', waist: '', hip: '' };
    expect(convertFormTexts(texts, 'cm', 'cm')).toBe(texts);
  });
});

describe('toMeasurementValues', () => {
  it('returns one value per field in template order, null when blank', () => {
    expect(toMeasurementValues(template, { bust: '90', waist: '', hip: '98,5' })).toEqual([
      { key: 'bust', label: 'Bust', value: 90 },
      { key: 'waist', label: 'Waist', value: null },
      { key: 'hip', label: 'Hip', value: 98.5 },
    ]);
  });

  it('keeps notes from existing values', () => {
    const existing: MeasurementValue[] = [{ key: 'bust', label: 'Bust', value: 88, note: 'loose' }];
    const [bust] = toMeasurementValues(template, { bust: '90', waist: '', hip: '' }, existing);
    expect(bust).toEqual({ key: 'bust', label: 'Bust', value: 90, note: 'loose' });
  });
});

describe('hasAnyValue', () => {
  it('is false for an empty form and true once one field is filled', () => {
    expect(hasAnyValue({ bust: '', waist: ' ', hip: '.' })).toBe(false);
    expect(hasAnyValue({ bust: '', waist: '70', hip: '' })).toBe(true);
  });
});
