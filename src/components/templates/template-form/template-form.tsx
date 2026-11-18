import { useState } from 'react';
import { View } from 'react-native';

import { FormField, PillButton, SectionTitle, Text } from '@/components/ui';
import {
  createId,
  moveItem,
  toTemplateInput,
  validateTemplateDraft,
  type DraftCategory,
} from '@/lib';

import { RowActions } from './row-actions';

export type TemplateFormProps = {
  initialName?: string;
  /** Prefill when editing; a new template starts with one empty group. */
  initialCategories?: DraftCategory[];
  submitLabel?: string;
  onSubmit: (input: TemplateInput) => void;
};

const newField = () => ({ id: createId(), label: '' });
const newCategory = (label = ''): DraftCategory => ({
  id: createId(),
  label,
  fields: [newField()],
});

/** Name, groups and measurement fields of a custom template. */
export function TemplateForm({
  initialName = '',
  initialCategories,
  submitLabel = 'Save template',
  onSubmit,
}: TemplateFormProps) {
  const [name, setName] = useState(initialName);
  const [categories, setCategories] = useState<DraftCategory[]>(
    () => initialCategories ?? [newCategory('Body')],
  );
  const [showErrors, setShowErrors] = useState(false);

  const errors = validateTemplateDraft(name, categories);

  const updateCategory = (id: string, change: (c: DraftCategory) => DraftCategory) =>
    setCategories((all) => all.map((c) => (c.id === id ? change(c) : c)));

  const submit = () => {
    if (errors.name || errors.fields) {
      setShowErrors(true);
      return;
    }
    onSubmit(toTemplateInput(name, categories));
  };

  return (
    <View className="gap-section">
      <FormField
        label="Template name"
        value={name}
        onChangeText={setName}
        placeholder="e.g. Agbada"
        error={showErrors ? errors.name : undefined}
        isRequired
      />

      {categories.map((category, categoryIndex) => (
        <View key={category.id} className="gap-3">
          <FormField
            label="Group name"
            value={category.label}
            onChangeText={(label) => updateCategory(category.id, (c) => ({ ...c, label }))}
            placeholder="e.g. Upper body"
          />
          <RowActions
            label={category.label.trim() || 'group'}
            canMoveUp={categoryIndex > 0}
            canMoveDown={categoryIndex < categories.length - 1}
            onMoveUp={() => setCategories((all) => moveItem(all, categoryIndex, -1))}
            onMoveDown={() => setCategories((all) => moveItem(all, categoryIndex, 1))}
            onRemove={() => setCategories((all) => all.filter((c) => c.id !== category.id))}
          />
          {category.fields.map((field, fieldIndex) => (
            <View key={field.id} className="gap-2">
              <FormField
                label="Measurement"
                value={field.label}
                onChangeText={(label) =>
                  updateCategory(category.id, (c) => ({
                    ...c,
                    fields: c.fields.map((f) => (f.id === field.id ? { ...f, label } : f)),
                  }))
                }
                placeholder="e.g. Chest"
              />
              <RowActions
                label={field.label.trim() || 'measurement'}
                canMoveUp={fieldIndex > 0}
                canMoveDown={fieldIndex < category.fields.length - 1}
                onMoveUp={() =>
                  updateCategory(category.id, (c) => ({
                    ...c,
                    fields: moveItem(c.fields, fieldIndex, -1),
                  }))
                }
                onMoveDown={() =>
                  updateCategory(category.id, (c) => ({
                    ...c,
                    fields: moveItem(c.fields, fieldIndex, 1),
                  }))
                }
                onRemove={() =>
                  updateCategory(category.id, (c) => ({
                    ...c,
                    fields: c.fields.filter((f) => f.id !== field.id),
                  }))
                }
              />
            </View>
          ))}
          <PillButton
            label="Add measurement"
            icon="add"
            tone="soft"
            className="self-start"
            onPress={() =>
              updateCategory(category.id, (c) => ({ ...c, fields: [...c.fields, newField()] }))
            }
          />
        </View>
      ))}

      <SectionTitle title="Groups" />
      {showErrors && errors.fields ? (
        <Text variant="caption" className="text-danger">
          {errors.fields}
        </Text>
      ) : null}
      <PillButton
        label="Add group"
        icon="add"
        tone="soft"
        className="self-start"
        onPress={() => setCategories((all) => [...all, newCategory()])}
      />

      <PillButton label={submitLabel} onPress={submit} />
    </View>
  );
}
