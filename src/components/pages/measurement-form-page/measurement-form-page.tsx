import { router } from 'expo-router';
import { useState } from 'react';

import { KeyboardForm, Screen, ScreenHeader } from '@/components/layout';
import { ClientPicker, MeasurementForm, TemplatePicker } from '@/components/measurements';
import { EmptyState, Text, useAppToast } from '@/components/ui';
import { useAllTemplates, useClient, useClientList, useTemplate } from '@/hooks';
import { useMeasurementsStore, useSettingsStore } from '@/store';

export type MeasurementFormPageProps = {
  /** Skip the client step when opened from a profile. */
  clientId?: string;
  /** Skip the template step when it is already known. */
  templateId?: string;
};

/**
 * Record new measurements in up to three steps: pick a client, pick a template,
 * fill in the form. Every save adds a new record; earlier records are never touched.
 */
export function MeasurementFormPage({ clientId: initialClientId, templateId: initialTemplateId }: MeasurementFormPageProps) {
  const toast = useAppToast();
  const defaultUnit = useSettingsStore((state) => state.defaultUnit);
  const addRecord = useMeasurementsStore((state) => state.addRecord);
  const templates = useAllTemplates();
  const { clients } = useClientList('', 'active');

  const [clientId, setClientId] = useState(initialClientId);
  const [templateId, setTemplateId] = useState(initialTemplateId);
  const client = useClient(clientId);
  const template = useTemplate(templateId);

  if ((clientId && !client) || (templateId && !template)) {
    return (
      <Screen tabBarSpace={false}>
        <ScreenHeader title="New measurements" />
        <EmptyState
          icon="resize-outline"
          tone="mint"
          title="Can't start this record"
          message="The client or template may have been removed."
          actionLabel="Start again"
          onAction={() => router.replace('/add')}
        />
      </Screen>
    );
  }

  if (!client) {
    return (
      <Screen tabBarSpace={false}>
        <ScreenHeader title="Choose a client" />
        <ClientPicker
          clients={clients}
          onPick={(picked) => setClientId(picked.id)}
          onAddClient={() => router.replace('/client/new')}
        />
      </Screen>
    );
  }

  if (!template) {
    return (
      <Screen tabBarSpace={false}>
        <ScreenHeader title="Choose a template" />
        <Text tone="muted">Measurements for {client.name}</Text>
        <TemplatePicker templates={templates} onPick={(picked) => setTemplateId(picked.id)} />
      </Screen>
    );
  }

  return (
    <KeyboardForm>
      <ScreenHeader title={template.name} />
      <Text tone="muted">Measurements for {client.name}</Text>
      <MeasurementForm
        template={template}
        initialUnit={defaultUnit}
        onSubmit={({ unit, values }) => {
          addRecord({ clientId: client.id, templateSnapshot: template, unit, values });
          toast.success('Measurements saved', client.name);
          router.replace({ pathname: '/client/[id]', params: { id: client.id } });
        }}
      />
    </KeyboardForm>
  );
}
