import { router } from 'expo-router';
import { useState } from 'react';
import { View } from 'react-native';

import { HeroCard, Screen, ScreenHeader } from '@/components/layout';
import { templateFieldCount } from '@/components/templates';
import {
  ConfirmDialog,
  EmptyState,
  ListCard,
  ListRow,
  PillButton,
  SectionTitle,
  Tag,
  useAppToast,
} from '@/components/ui';
import { useTemplate } from '@/hooks';
import { useTemplatesStore } from '@/store';

export type TemplateDetailPageProps = {
  templateId: string;
};

/** A template's categories and fields. Built-in templates can only be duplicated. */
export function TemplateDetailPage({ templateId }: TemplateDetailPageProps) {
  const template = useTemplate(templateId);
  const toast = useAppToast();
  const addTemplate = useTemplatesStore((state) => state.addTemplate);
  const removeTemplate = useTemplatesStore((state) => state.removeTemplate);
  const [confirmingDelete, setConfirmingDelete] = useState(false);

  if (!template) {
    return (
      <Screen tabBarSpace={false}>
        <ScreenHeader title="Template" />
        <EmptyState
          icon="resize-outline"
          tone="mint"
          title="Template not found"
          message="This template may have been removed."
          actionLabel="Go back"
          onAction={() => router.back()}
        />
      </Screen>
    );
  }

  const isPredefined = template.kind === 'predefined';

  /** Copies the template as a custom one, then opens it. */
  const duplicate = () => {
    const newId = addTemplate({
      name: `${template.name} (copy)`,
      categories: template.categories.map((category) => ({
        ...category,
        fields: category.fields.map((field) => ({ ...field })),
      })),
    });
    toast.success('Template duplicated', 'The copy is yours to customise');
    router.replace({ pathname: '/templates/[id]', params: { id: newId } });
  };

  /** Leaves first so the "not found" state never flashes. Saved records keep their own copy. */
  const remove = () => {
    setConfirmingDelete(false);
    router.back();
    removeTemplate(templateId);
    toast.success('Template deleted', template.name);
  };

  return (
    <Screen tabBarSpace={false}>
      <ScreenHeader title="Template" />
      <HeroCard
        title={template.name}
        subtitle={`${templateFieldCount(template)} measurements in ${template.categories.length} groups`}
      />
      <Tag label={isPredefined ? 'Built-in · read-only' : 'Custom'} tone={isPredefined ? 'sky' : 'mint'} />
      <View className="flex-row gap-3">
        {isPredefined ? null : (
          <PillButton
            label="Edit"
            icon="create-outline"
            tone="soft"
            className="flex-1"
            onPress={() =>
              router.push({ pathname: '/templates/[id]/edit', params: { id: template.id } })
            }
          />
        )}
        <PillButton
          label={isPredefined ? 'Duplicate to customise' : 'Duplicate'}
          icon="copy-outline"
          tone="soft"
          className="flex-1"
          onPress={duplicate}
        />
      </View>
      {isPredefined ? null : (
        <PillButton
          label="Delete template"
          icon="trash-outline"
          tone="danger"
          onPress={() => setConfirmingDelete(true)}
        />
      )}
      <View className="gap-section">
        {template.categories.map((category) => (
          <View key={category.id} className="gap-3">
            <SectionTitle title={category.label} />
            <ListCard>
              {category.fields.map((field) => (
                <ListRow key={field.key} title={field.label} />
              ))}
            </ListCard>
          </View>
        ))}
      </View>
      <ConfirmDialog
        visible={confirmingDelete}
        title="Delete this template?"
        message="Measurements already saved with it are kept exactly as recorded. Only the template is removed."
        confirmLabel="Delete"
        destructive
        onConfirm={remove}
        onCancel={() => setConfirmingDelete(false)}
      />
    </Screen>
  );
}
