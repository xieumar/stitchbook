// Global ambient types for the template domain (no import/export: available everywhere).
// Use specific names to avoid collisions with DOM / React Native globals.

interface TemplateField {
  key: string;
  label: string;
}

interface TemplateCategory {
  id: string;
  label: string;
  fields: TemplateField[];
}

interface MeasurementTemplate {
  id: string;
  name: string;
  /** Predefined templates are seeded and read-only; custom ones are user-made. */
  kind: 'predefined' | 'custom';
  categories: TemplateCategory[];
  createdAt?: string;
  updatedAt?: string;
}

type TemplateInput = Pick<MeasurementTemplate, 'name' | 'categories'>;
