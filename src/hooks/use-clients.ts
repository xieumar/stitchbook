import { useMemo } from 'react';

import { countByStatus, filterClients, sortClients, type ClientStatusFilter } from '@/lib';
import { useClientsStore } from '@/store';

/** Every client, newest data first-class: derived from the store, never stored itself. */
export function useAllClients(): ClientRecord[] {
  const clients = useClientsStore((state) => state.clients);
  return useMemo(() => Object.values(clients), [clients]);
}

/** Clients in one status that match the search, sorted A to Z, plus counts for both statuses. */
export function useClientList(query: string, status: ClientStatusFilter) {
  const all = useAllClients();
  return useMemo(
    () => ({
      clients: sortClients(filterClients(all, { query, status })),
      counts: countByStatus(all),
      total: all.length,
    }),
    [all, query, status],
  );
}

/** One client by id, or undefined when it does not exist. */
export function useClient(id: string | undefined): ClientRecord | undefined {
  return useClientsStore((state) => (id ? state.clients[id] : undefined));
}
