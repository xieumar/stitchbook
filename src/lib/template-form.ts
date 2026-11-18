/** A field being typed in the template form. `key` is kept once a field has been saved. */
export type DraftField = { id: string; key?: string; label: string };
export type DraftCategory = { id: string; label: string; fields: DraftField[] };

/** Lowercase, underscore-separated key from a label, e.g. "Upper Arm" -> "upper_arm". */
export function slugifyKey(label: string): string {
  const slug = label
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '_')
    .replace(/^_+|_+$/g, '');
  return slug || 'field';
}

/** Turns a saved template into editable drafts. Saved keys are kept so old records still match. */
export function templateToDrafts(
  template: MeasurementTemplate,
  makeId: () => string,
): DraftCategory[] {
  return template.categories.map((category) => ({
    id: category.id,
    label: category.label,
    fields: category.fields.map((field) => ({ id: makeId(), key: field.key, label: field.label })),
  }));
}

/** First problem with the form, or undefined when it can be saved. */
export function validateTemplateDraft(
  name: string,
  categories: readonly DraftCategory[],
): { name?: string; fields?: string } {
  const errors: { name?: string; fields?: string } = {};
  if (!name.trim()) errors.name = 'Give the template a name';
  const hasField = categories.some((c) => c.fields.some((f) => f.label.trim()));
  if (!hasField) errors.fields = 'Add at least one measurement';
  return errors;
}

/**
 * Builds the template to save: trims labels, drops blank fields and empty
 * categories, keeps existing field keys and makes new keys unique.
 */
export function toTemplateInput(
  name: string,
  categories: readonly DraftCategory[],
): TemplateInput {
  const taken = new Set(
    categories.flatMap((c) => c.fields.filter((f) => f.label.trim() && f.key).map((f) => f.key!)),
  );
  const result: TemplateCategory[] = [];

  for (const category of categories) {
    const fields: TemplateField[] = [];
    for (const field of category.fields) {
      const label = field.label.trim();
      if (!label) continue;
      let key = field.key;
      if (!key) {
        const base = slugifyKey(label);
        key = base;
        for (let n = 2; taken.has(key); n++) key = `${base}_${n}`;
        taken.add(key);
      }
      fields.push({ key, label });
    }
    if (fields.length > 0) {
      result.push({ id: category.id, label: category.label.trim() || 'Measurements', fields });
    }
  }
  return { name: name.trim(), categories: result };
}
