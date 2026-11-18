import { router } from 'expo-router';
import { View } from 'react-native';

import { HeroCard, Screen, ScreenHeader } from '@/components/layout';
import { templateFieldCount } from '@/components/templates';
import {
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

  return (
    <Screen tabBarSpace={false}>
      <ScreenHeader title="Template" />
      <HeroCard
        title={template.name}
        subtitle={`${templateFieldCount(template)} measurements in ${template.categories.length} groups`}
      />
      <Tag label={isPredefined ? 'Built-in · read-only' : 'Custom'} tone={isPredefined ? 'sky' : 'mint'} />
      <PillButton
        label={isPredefined ? 'Duplicate to customise' : 'Duplicate'}
        icon="copy-outline"
        tone="soft"
        onPress={duplicate}
      />
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
    </Screen>
  );
}
