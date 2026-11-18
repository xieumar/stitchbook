import { router } from 'expo-router';

import { Icon, IconBadge, ListCard, ListRow } from '@/components/ui';
import { countMeasured, formatDate } from '@/lib';

export type RecordHistoryListProps = {
  /** Already sorted, newest first. */
  records: readonly MeasurementRecord[];
  /** Show the client's name as the title (used when records of many clients are mixed). */
  clientNames?: Readonly<Record<string, string>>;
};

/** One row per saved record: what was measured, when, and how complete it is. */
export function RecordHistoryList({ records, clientNames }: RecordHistoryListProps) {
  return (
    <ListCard>
      {records.map((record) => {
        const { measured, total } = countMeasured(record);
        const name = record.templateSnapshot.name;
        const title = clientNames ? (clientNames[record.clientId] ?? 'Unknown client') : name;
        const summary = `${formatDate(record.measuredAt)} · ${measured} of ${total} measured`;
        return (
          <ListRow
            key={record.id}
            title={title}
            detail={clientNames ? `${name} · ${summary}` : summary}
            leading={<IconBadge name="resize-outline" tone="mint" />}
            trailing={<Icon name="chevron-forward" tone="muted" size={20} />}
            onPress={() => router.push({ pathname: '/measurement/[id]', params: { id: record.id } })}
          />
        );
      })}
    </ListCard>
  );
}
