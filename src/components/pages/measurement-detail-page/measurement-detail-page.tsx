import { router } from 'expo-router';
import { View } from 'react-native';

import { HeroCard, Screen, ScreenHeader } from '@/components/layout';
import { RecordValues } from '@/components/measurements';
import { EmptyState, ListCard, ListRow, PillButton, Tag, useAppToast } from '@/components/ui';
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
      </View>
      <RecordValues record={record} />
      {record.notes ? (
        <ListCard>
          <ListRow title={record.notes} detail="Notes" />
        </ListCard>
      ) : null}
    </Screen>
  );
}
