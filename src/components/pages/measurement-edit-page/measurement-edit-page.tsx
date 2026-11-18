import { router } from 'expo-router';

import { KeyboardForm, Screen, ScreenHeader } from '@/components/layout';
import { MeasurementForm } from '@/components/measurements';
import { EmptyState, Text, useAppToast } from '@/components/ui';
import { useClient, useRecord } from '@/hooks';
import { useMeasurementsStore } from '@/store';

export type MeasurementEditPageProps = {
  recordId: string;
};

/**
 * Correct one saved record. The form is built from the record's own template
 * snapshot, so later template changes never alter or reshape it.
 */
export function MeasurementEditPage({ recordId }: MeasurementEditPageProps) {
  const toast = useAppToast();
  const record = useRecord(recordId);
  const client = useClient(record?.clientId);
  const updateRecord = useMeasurementsStore((state) => state.updateRecord);

  if (!record) {
    return (
      <Screen tabBarSpace={false}>
        <ScreenHeader title="Edit measurements" />
        <EmptyState
          icon="resize-outline"
          tone="mint"
          title="Record not found"
          message="This measurement record may have been removed."
          actionLabel="Go back"
          onAction={() => router.back()}
        />
      </Screen>
    );
  }

  return (
    <KeyboardForm>
      <ScreenHeader title="Edit measurements" />
      <Text tone="muted">
        {record.templateSnapshot.name} for {client?.name ?? 'an unknown client'}
      </Text>
      <MeasurementForm
        template={record.templateSnapshot}
        initialUnit={record.unit}
        initialValues={record.values}
        initialNotes={record.notes}
        submitLabel="Save changes"
        onSubmit={({ unit, values, notes }) => {
          updateRecord(record.id, { unit, values, notes });
          toast.success('Changes saved');
          router.back();
        }}
      />
    </KeyboardForm>
  );
}
