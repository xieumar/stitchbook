import { useState } from 'react';
import { View } from 'react-native';

import { MeasurementInput, PillButton, SectionTitle } from '@/components/ui';
import {
  buildFormTexts,
  convertFormTexts,
  hasAnyValue,
  toMeasurementValues,
  type FormTexts,
} from '@/lib';

import { UnitToggle } from './unit-toggle';

export type MeasurementFormProps = {
  template: MeasurementTemplate;
  /** Unit shown first; the settings default for a new record, the record's own unit for an edit. */
  initialUnit: MeasurementUnit;
  /** Prefill when editing or duplicating an existing record. */
  initialValues?: readonly MeasurementValue[];
  submitLabel?: string;
  onSubmit: (result: { unit: MeasurementUnit; values: MeasurementValue[] }) => void;
};

/**
 * Template-driven entry form: one section per category, one large input per field.
 * Switching the unit converts what is already typed. Saving needs at least one value.
 */
export function MeasurementForm({
  template,
  initialUnit,
  initialValues,
  submitLabel = 'Save measurements',
  onSubmit,
}: MeasurementFormProps) {
  const [unit, setUnit] = useState<MeasurementUnit>(initialUnit);
  const [texts, setTexts] = useState<FormTexts>(() => buildFormTexts(template, initialValues));

  const changeUnit = (next: MeasurementUnit) => {
    if (next === unit) return;
    setTexts((current) => convertFormTexts(current, unit, next));
    setUnit(next);
  };

  const setText = (key: string, text: string) => setTexts((current) => ({ ...current, [key]: text }));

  return (
    <View className="gap-section">
      <UnitToggle value={unit} onChange={changeUnit} />

      {template.categories.map((category) => (
        <View key={category.id} className="gap-3">
          <SectionTitle title={category.label} />
          {category.fields.map((field) => (
            <MeasurementInput
              key={field.key}
              label={field.label}
              unit={unit}
              value={texts[field.key] ?? ''}
              onChangeText={(text) => setText(field.key, text)}
            />
          ))}
        </View>
      ))}

      <PillButton
        label={submitLabel}
        isDisabled={!hasAnyValue(texts)}
        onPress={() => onSubmit({ unit, values: toMeasurementValues(template, texts, initialValues) })}
      />
    </View>
  );
}
