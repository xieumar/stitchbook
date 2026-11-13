// Global ambient types for the measurement domain (no import/export: available everywhere).
// Use specific names to avoid collisions with DOM / React Native globals.

/** Values are stored as entered, in the record's own unit (no canonical conversion on write). */
type MeasurementUnit = 'cm' | 'in';

interface MeasurementValue {
  key: string;
  label: string;
  value: number | null;
  note?: string;
}

interface MeasurementRecord {
  id: string;
  clientId: string;
  templateId: string;
  /** Copy of the template at save time so later template edits never alter history. */
  templateSnapshot: MeasurementTemplate;
  unit: MeasurementUnit;
  measuredAt: string;
  notes?: string;
  values: MeasurementValue[];
  createdAt: string;
  updatedAt: string;
}

type MeasurementInput = Pick<
  MeasurementRecord,
  'clientId' | 'templateSnapshot' | 'unit' | 'notes' | 'values'
> & { measuredAt?: string };
