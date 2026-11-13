import {
  convertMeasurement,
  formatMeasurement,
  parseMeasurement,
  roundTo,
} from '../units';

describe('roundTo', () => {
  it('rounds to one decimal by default', () => {
    expect(roundTo(12.34)).toBe(12.3);
    expect(roundTo(12.35)).toBe(12.4);
  });

  it('avoids float noise on half values', () => {
    expect(roundTo(1.005, 2)).toBe(1.01);
  });
});

describe('convertMeasurement', () => {
  it('converts inches to cm', () => {
    expect(convertMeasurement(10, 'in', 'cm')).toBe(25.4);
    expect(convertMeasurement(38, 'in', 'cm')).toBe(96.5);
  });

  it('converts cm to inches', () => {
    expect(convertMeasurement(25.4, 'cm', 'in')).toBe(10);
    expect(convertMeasurement(100, 'cm', 'in')).toBe(39.4);
  });

  it('returns the rounded value when units match', () => {
    expect(convertMeasurement(42.26, 'cm', 'cm')).toBe(42.3);
  });

  it('handles zero', () => {
    expect(convertMeasurement(0, 'cm', 'in')).toBe(0);
  });

  it('respects a custom precision', () => {
    expect(convertMeasurement(10, 'in', 'cm', 0)).toBe(25);
    expect(convertMeasurement(100, 'cm', 'in', 2)).toBe(39.37);
  });
});

describe('parseMeasurement', () => {
  it('parses whole and decimal numbers', () => {
    expect(parseMeasurement('42')).toBe(42);
    expect(parseMeasurement('42.5')).toBe(42.5);
    expect(parseMeasurement('.5')).toBe(0.5);
  });

  it('accepts a comma decimal separator and surrounding spaces', () => {
    expect(parseMeasurement(' 42,5 ')).toBe(42.5);
  });

  it('rejects empty, negative and non-numeric input', () => {
    expect(parseMeasurement('')).toBeNull();
    expect(parseMeasurement('  ')).toBeNull();
    expect(parseMeasurement('-3')).toBeNull();
    expect(parseMeasurement('abc')).toBeNull();
    expect(parseMeasurement('1.2.3')).toBeNull();
  });
});

describe('formatMeasurement', () => {
  it('drops a trailing .0', () => {
    expect(formatMeasurement(42)).toBe('42');
    expect(formatMeasurement(42.04)).toBe('42');
  });

  it('keeps one decimal', () => {
    expect(formatMeasurement(42.56)).toBe('42.6');
  });
});
