import { EmptyState, ListCard, ListRowSkeleton } from '@/components/ui';
import type { ClientStatusFilter } from '@/lib';

import { ClientRow } from '../client-row';

export type ClientDirectoryProps = {
  clients: readonly ClientRecord[];
  status: ClientStatusFilter;
  /** The current search text, to tell "nothing matches" from "nothing yet". */
  query: string;
  /** True when no clients exist at all (in any status). */
  isEmpty: boolean;
  isLoading?: boolean;
  onAddClient: () => void;
};

/** The client list with its loading, empty and no-match states. */
export function ClientDirectory({
  clients,
  status,
  query,
  isEmpty,
  isLoading = false,
  onAddClient,
}: ClientDirectoryProps) {
  if (isLoading) {
    return (
      <ListCard>
        {[0, 1, 2, 3].map((key) => (
          <ListRowSkeleton key={key} />
        ))}
      </ListCard>
    );
  }

  if (clients.length > 0) {
    return (
      <ListCard>
        {clients.map((client) => (
          <ClientRow key={client.id} client={client} />
        ))}
      </ListCard>
    );
  }

  if (isEmpty) {
    return (
      <EmptyState
        icon="people-outline"
        title="No clients yet"
        message="Add your first client to start keeping their measurements."
        actionLabel="Add client"
        onAction={onAddClient}
      />
    );
  }

  if (query.trim() !== '') {
    return (
      <EmptyState
        icon="search-outline"
        tone="butter"
        title="No matches"
        message={`No ${status} client matches “${query.trim()}”. Check the spelling or the other tab.`}
      />
    );
  }

  return status === 'archived' ? (
    <EmptyState
      icon="archive-outline"
      tone="sky"
      title="Nothing archived"
      message="Clients you archive are kept here, with all their measurements."
    />
  ) : (
    <EmptyState
      icon="people-outline"
      title="No active clients"
      message="Every client is archived. Restore one from the Archived tab."
    />
  );
}
