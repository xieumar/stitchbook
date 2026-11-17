import { router } from 'expo-router';

import { HeroCard, Screen, ScreenHeader } from '@/components/layout';
import { RecordValues } from '@/components/measurements';
import { EmptyState, ListCard, ListRow, Tag } from '@/components/ui';
import { useClient, useRecord } from '@/hooks';
import { formatDate } from '@/lib';

export type MeasurementDetailPageProps = {
  recordId: string;
};

/** One saved record: every value as it was recorded, in the unit it was saved in. */
export function MeasurementDetailPage({ recordId }: MeasurementDetailPageProps) {
  const record = useRecord(recordId);
  const client = useClient(record?.clientId);

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
      <RecordValues record={record} />
      {record.notes ? (
        <ListCard>
          <ListRow title={record.notes} detail="Notes" />
        </ListCard>
      ) : null}
    </Screen>
  );
}
