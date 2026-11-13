import { convertMeasurement, formatMeasurement, parseMeasurement } from './units';

/** Form state is raw text per field key, so half-typed numbers like "42." survive. */
export type FormTexts = Record<string, string>;

/** Every field key in a template, in display order. */
export function templateFieldKeys(template: MeasurementTemplate): string[] {
  return template.categories.flatMap((category) => category.fields.map((field) => field.key));
}

/** The field to focus after `key`, or null when `key` is the last (or unknown). */
export function nextFieldKey(keys: readonly string[], key: string): string | null {
  const index = keys.indexOf(key);
  return index === -1 ? null : (keys[index + 1] ?? null);
}

/** Initial form text: empty for every field, or prefilled from an existing record's values. */
export function buildFormTexts(
  template: MeasurementTemplate,
  existing: readonly MeasurementValue[] = [],
): FormTexts {
  const byKey = new Map(existing.map((entry) => [entry.key, entry.value]));
  const texts: FormTexts = {};
  for (const key of templateFieldKeys(template)) {
    const value = byKey.get(key);
    texts[key] = value == null ? '' : formatMeasurement(value);
  }
  return texts;
}

/** Converts every filled field to another unit. Empty or unparsable fields are left alone. */
export function convertFormTexts(
  texts: FormTexts,
  from: MeasurementUnit,
  to: MeasurementUnit,
): FormTexts {
  if (from === to) return texts;
  const converted: FormTexts = {};
  for (const [key, text] of Object.entries(texts)) {
    const value = parseMeasurement(text);
    converted[key] = value == null ? text : formatMeasurement(convertMeasurement(value, from, to));
  }
  return converted;
}

/**
 * Turns form text into record values, one per template field in template order.
 * Blank or invalid fields are saved as `null` ("not measured").
 */
export function toMeasurementValues(
  template: MeasurementTemplate,
  texts: FormTexts,
  existing: readonly MeasurementValue[] = [],
): MeasurementValue[] {
  const notes = new Map(existing.map((entry) => [entry.key, entry.note]));
  return template.categories.flatMap((category) =>
    category.fields.map((field): MeasurementValue => {
      const note = notes.get(field.key);
      return {
        key: field.key,
        label: field.label,
        value: parseMeasurement(texts[field.key] ?? ''),
        ...(note ? { note } : {}),
      };
    }),
  );
}

/** True when at least one field has a valid number. Used to block saving an empty form. */
export function hasAnyValue(texts: FormTexts): boolean {
  return Object.values(texts).some((text) => parseMeasurement(text) != null);
}
