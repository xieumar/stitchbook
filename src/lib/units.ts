export const CM_PER_INCH = 2.54;

/** Decimal places kept when converting or displaying a measurement. */
export const MEASUREMENT_PRECISION = 1;

export const UNIT_LABEL: Record<MeasurementUnit, string> = {
  cm: 'cm',
  in: 'in',
};

/** Rounds to a fixed number of decimals, avoiding float noise like 1.005 -> 1. */
export function roundTo(value: number, decimals: number = MEASUREMENT_PRECISION): number {
  const factor = 10 ** decimals;
  return Math.round((value + Number.EPSILON) * factor) / factor;
}

/** Converts between cm and inches, rounded to the measurement precision. */
export function convertMeasurement(
  value: number,
  from: MeasurementUnit,
  to: MeasurementUnit,
  decimals: number = MEASUREMENT_PRECISION,
): number {
  if (from === to) return roundTo(value, decimals);
  const converted = from === 'in' ? value * CM_PER_INCH : value / CM_PER_INCH;
  return roundTo(converted, decimals);
}

/**
 * Parses what a user typed into a measurement. Accepts a comma as the decimal
 * separator. Returns null for empty, non-numeric or negative input.
 */
export function parseMeasurement(text: string): number | null {
  const normalised = text.trim().replace(',', '.');
  if (normalised === '') return null;
  if (!/^\d*\.?\d+$|^\d+\.$/.test(normalised)) return null;
  const value = Number(normalised);
  return Number.isFinite(value) ? value : null;
}

/** Formats a value for display, dropping a trailing `.0` ("42" not "42.0"). */
export function formatMeasurement(value: number, decimals: number = MEASUREMENT_PRECISION): string {
  return String(roundTo(value, decimals));
}
