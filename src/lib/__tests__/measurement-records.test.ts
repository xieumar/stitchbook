import {
  countMeasured,
  formatRecordValue,
  sortRecordsNewestFirst,
  valueForKey,
} from '../measurement-records';

const template: MeasurementTemplate = { id: 't', name: 'T', kind: 'custom', categories: [] };

function record(id: string, measuredAt: string, values: MeasurementValue[] = []): MeasurementRecord {
  return {
    id,
    clientId: 'c',
    templateId: 't',
    templateSnapshot: template,
    unit: 'cm',
    measuredAt,
    values,
    createdAt: measuredAt,
    updatedAt: measuredAt,
  };
}

describe('sortRecordsNewestFirst', () => {
  it('orders by measured date, newest first, without mutating the input', () => {
    const input = [
      record('old', '2026-01-01T10:00:00.000Z'),
      record('new', '2026-03-01T10:00:00.000Z'),
      record('mid', '2026-02-01T10:00:00.000Z'),
    ];
    expect(sortRecordsNewestFirst(input).map((r) => r.id)).toEqual(['new', 'mid', 'old']);
    expect(input.map((r) => r.id)).toEqual(['old', 'new', 'mid']);
  });
});

describe('countMeasured', () => {
  it('counts only fields that have a value', () => {
    const r = record('a', '2026-01-01T10:00:00.000Z', [
      { key: 'waist', label: 'Waist', value: 70 },
      { key: 'hip', label: 'Hip', value: null },
      { key: 'bust', label: 'Bust', value: 0 },
    ]);
    expect(countMeasured(r)).toEqual({ measured: 2, total: 3 });
  });
});

describe('formatRecordValue', () => {
  it('shows the number with its unit, or "Not measured"', () => {
    expect(formatRecordValue(42.5, 'cm')).toBe('42.5 cm');
    expect(formatRecordValue(30, 'in')).toBe('30 in');
    expect(formatRecordValue(null, 'cm')).toBe('Not measured');
  });
});

describe('valueForKey', () => {
  it('returns null for a missing key', () => {
    const r = record('a', '2026-01-01T10:00:00.000Z', [{ key: 'waist', label: 'Waist', value: 70 }]);
    expect(valueForKey(r, 'waist')).toBe(70);
    expect(valueForKey(r, 'hip')).toBeNull();
  });
});
