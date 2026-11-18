import { router } from 'expo-router';
import { useMemo } from 'react';

import { KeyboardForm, Screen, ScreenHeader } from '@/components/layout';
import { TemplateForm } from '@/components/templates';
import { EmptyState, useAppToast } from '@/components/ui';
import { useTemplate } from '@/hooks';
import { createId, templateToDrafts } from '@/lib';
import { useTemplatesStore } from '@/store';

export type TemplateFormPageProps = {
  /** Edit this custom template; omit to create a new one. */
  templateId?: string;
};

/**
 * Create or edit a custom template. Saved records keep their own snapshot, so
 * editing a template never changes measurements that were already recorded.
 */
export function TemplateFormPage({ templateId }: TemplateFormPageProps) {
  const toast = useAppToast();
  const template = useTemplate(templateId);
  const addTemplate = useTemplatesStore((state) => state.addTemplate);
  const updateTemplate = useTemplatesStore((state) => state.updateTemplate);
  const drafts = useMemo(
    () => (template ? templateToDrafts(template, createId) : undefined),
    [template],
  );

  const editing = !!templateId;
  if (editing && (!template || template.kind !== 'custom')) {
    return (
      <Screen tabBarSpace={false}>
        <ScreenHeader title="Edit template" />
        <EmptyState
          icon="resize-outline"
          tone="mint"
          title="Can't edit this template"
          message="It may have been removed, or it is a built-in template. Duplicate a built-in template to customise it."
          actionLabel="Go back"
          onAction={() => router.back()}
        />
      </Screen>
    );
  }

  return (
    <KeyboardForm>
      <ScreenHeader title={editing ? 'Edit template' : 'New template'} />
      <TemplateForm
        initialName={template?.name}
        initialCategories={drafts}
        submitLabel={editing ? 'Save changes' : 'Save template'}
        onSubmit={(input) => {
          if (editing) {
            updateTemplate(templateId, input);
            toast.success('Template updated', input.name);
            router.back();
          } else {
            const id = addTemplate(input);
            toast.success('Template created', input.name);
            router.replace({ pathname: '/templates/[id]', params: { id } });
          }
        }}
      />
    </KeyboardForm>
  );
}
