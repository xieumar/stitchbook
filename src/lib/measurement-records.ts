import { formatMeasurement, UNIT_LABEL } from './units';

/** Newest measurement first. Ties fall back to creation time. Does not mutate the input. */
export function sortRecordsNewestFirst(records: readonly MeasurementRecord[]): MeasurementRecord[] {
  return [...records].sort(
    (a, b) => b.measuredAt.localeCompare(a.measuredAt) || b.createdAt.localeCompare(a.createdAt),
  );
}

/** How many of a record's fields have a value, out of the fields it holds. */
export function countMeasured(record: MeasurementRecord): { measured: number; total: number } {
  const measured = record.values.filter((entry) => entry.value != null).length;
  return { measured, total: record.values.length };
}

/** "42.5 cm", or "Not measured" for a blank field. */
export function formatRecordValue(value: number | null, unit: MeasurementUnit): string {
  return value == null ? 'Not measured' : `${formatMeasurement(value)} ${UNIT_LABEL[unit]}`;
}

/** Looks up a record's value for one template field key. */
export function valueForKey(record: MeasurementRecord, key: string): number | null {
  return record.values.find((entry) => entry.key === key)?.value ?? null;
}
