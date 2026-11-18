import { router } from 'expo-router';
import { useState } from 'react';
import { View } from 'react-native';

import { HeroCard, Screen, ScreenHeader } from '@/components/layout';
import { RecordValues } from '@/components/measurements';
import {
  ConfirmDialog,
  EmptyState,
  ListCard,
  ListRow,
  PillButton,
  Tag,
  useAppToast,
} from '@/components/ui';
import { useClient, useRecord } from '@/hooks';
import { formatDate } from '@/lib';
import { useMeasurementsStore } from '@/store';

export type MeasurementDetailPageProps = {
  recordId: string;
};

/** One saved record: every value as it was recorded, in the unit it was saved in. */
export function MeasurementDetailPage({ recordId }: MeasurementDetailPageProps) {
  const record = useRecord(recordId);
  const client = useClient(record?.clientId);
  const toast = useAppToast();
  const duplicateRecord = useMeasurementsStore((state) => state.duplicateRecord);
  const deleteRecord = useMeasurementsStore((state) => state.deleteRecord);
  const [confirmingDelete, setConfirmingDelete] = useState(false);

  /** Leaves the screen first so the "not found" state never flashes. */
  const remove = () => {
    setConfirmingDelete(false);
    router.back();
    deleteRecord(recordId);
    toast.success('Measurements deleted');
  };

  /** Copies the record as a new one dated now, then opens it so it can be adjusted. */
  const duplicate = () => {
    const newId = duplicateRecord(recordId);
    if (!newId) return;
    toast.success('Duplicated', 'Edit the copy to update its values');
    router.replace({ pathname: '/measurement/[id]', params: { id: newId } });
  };

  if (!record) {
    return (
      <Screen tabBarSpace={false}>
        <ScreenHeader title="Measurements" />
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
    <Screen tabBarSpace={false}>
      <ScreenHeader title="Measurements" />
      <HeroCard
        title={record.templateSnapshot.name}
        subtitle={`${client?.name ?? 'Unknown client'} · ${formatDate(record.measuredAt)}`}
      />
      <Tag label={record.unit === 'cm' ? 'Centimetres' : 'Inches'} tone="sky" />
      <View className="flex-row gap-3">
        <PillButton
          label="Edit"
          icon="create-outline"
          tone="soft"
          className="flex-1"
          onPress={() =>
            router.push({ pathname: '/measurement/[id]/edit', params: { id: record.id } })
          }
        />
        <PillButton
          label="Duplicate"
          icon="copy-outline"
          tone="soft"
          className="flex-1"
          onPress={duplicate}
        />
        <PillButton
          label="Delete"
          icon="trash-outline"
          tone="danger"
          className="flex-1"
          onPress={() => setConfirmingDelete(true)}
        />
      </View>
      <RecordValues record={record} />
      {record.notes ? (
        <ListCard>
          <ListRow title={record.notes} detail="Notes" />
        </ListCard>
      ) : null}
      <ConfirmDialog
        visible={confirmingDelete}
        title="Delete these measurements?"
        message="This record is removed permanently. Your other records for this client are not affected."
        confirmLabel="Delete"
        destructive
        onConfirm={remove}
        onCancel={() => setConfirmingDelete(false)}
      />
    </Screen>
  );
}
