import { useMemo } from 'react';

import {
  countByStatus,
  filterByListFilter,
  filterClients,
  sortClients,
  type ClientListFilter,
  type ClientStatusFilter,
} from '@/lib';
import { useClientsStore } from '@/store';

import { useAllRecords } from './use-measurement-records';

/** Every client, newest data first-class: derived from the store, never stored itself. */
export function useAllClients(): ClientRecord[] {
  const clients = useClientsStore((state) => state.clients);
  return useMemo(() => Object.values(clients), [clients]);
}

/** Clients in one status that match the search, sorted A to Z, plus counts for both statuses. */
export function useClientList(
  query: string,
  status: ClientStatusFilter,
  listFilter: ClientListFilter = 'all',
) {
  const all = useAllClients();
  const records = useAllRecords();
  return useMemo(
    () => ({
      clients: sortClients(
        filterByListFilter(filterClients(all, { query, status }), records, listFilter),
      ),
      counts: countByStatus(all),
      total: all.length,
    }),
    [all, records, query, status, listFilter],
  );
}

/** One client by id, or undefined when it does not exist. */
export function useClient(id: string | undefined): ClientRecord | undefined {
  return useClientsStore((state) => (id ? state.clients[id] : undefined));
}
