import { EmptyState, IconBadge, ListCard, ListRow, type IconName } from '@/components/ui';
import { formatRelativeTime } from '@/lib';

export type ClientActivityListProps = {
  entries: readonly ActivityEntry[];
};

function iconFor(type: ActivityType): IconName {
  if (type.startsWith('measurement.')) return 'resize-outline';
  if (type.startsWith('stylebook.')) return 'color-palette-outline';
  if (type.startsWith('template.')) return 'document-text-outline';
  if (type === 'client.archived') return 'archive-outline';
  return 'person-outline';
}

/** Chronological log of what happened for one client. */
export function ClientActivityList({ entries }: ClientActivityListProps) {
  if (entries.length === 0) {
    return (
      <EmptyState
        icon="time-outline"
        tone="sky"
        title="No activity yet"
        message="Changes to this client and their measurements are listed here."
      />
    );
  }

  return (
    <ListCard>
      {entries.map((entry) => (
        <ListRow
          key={entry.id}
          title={entry.message}
          detail={formatRelativeTime(entry.createdAt)}
          leading={<IconBadge name={iconFor(entry.type)} tone="sky" />}
        />
      ))}
    </ListCard>
  );
}
